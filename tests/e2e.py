#!/usr/bin/env python3
"""Browser-Tests für Hilde Digital (Python Playwright, Chromium).

Aufruf:  python3 tests/e2e.py [Ordner für Bildschirmfotos]
Barrierefreiheit: Liegt axe.min.js unter tests/vendor/ (oder in der Umgebungsvariable AXE_PFAD),
wird jede Seite zusätzlich mit axe-core geprüft. Die Datei gehört nicht ins Repository.

Geprüft: Kernweg Start → Tablet-Weg → Entscheidungskarte → Beispiel → Detail, nur per Tastatur,
Zurück und Ändern, Speichern und Löschen, Lockerung, ohne Internet, Konsolenfehler, reduzierte Bewegung.
"""
import os
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

W = Path(__file__).resolve().parent.parent
SEITEN = ["index.html", "ki.html", "tablets.html", "showroom.html", "beispiel.html#quest", "beispiel.html#anleitertreffen", "ueber.html"]
AXE = Path(os.environ.get("AXE_PFAD", W / "tests" / "vendor" / "axe.min.js"))
fehler = []


def url(s):
    datei, _, anker = s.partition("#")
    return (W / datei).as_uri() + ("#" + anker if anker else "")


def pruefe(bed, text):
    print(("✓ " if bed else "✗ ") + text)
    if not bed:
        fehler.append(text)


def neue_seite(browser, **kw):
    ctx = browser.new_context(viewport=kw.pop("viewport", {"width": 1280, "height": 720}), **kw)
    # Ohne Internet: jede Anfrage außerhalb von file:// wird blockiert und gezählt.
    extern = []
    ctx.route("**/*", lambda r: (extern.append(r.request.url), r.abort()) if not r.request.url.startswith("file:") else r.continue_())
    pg = ctx.new_page()
    pg.konsole = []
    pg.extern = extern
    pg.on("console", lambda m: m.type == "error" and pg.konsole.append(m.text))
    pg.on("pageerror", lambda e: pg.konsole.append(str(e)))
    return pg


def antworte(pg, name, wert):
    pg.check(f'input[name="{name}"][value="{wert}"]')
    pg.click("#weiter")


def main():
    fotos = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    with sync_playwright() as p:
        b = p.chromium.launch()

        # 1. Kernweg mit der Maus, Szenario 2: kurzer digitaler Einstieg
        pg = neue_seite(b)
        pg.goto(url("index.html"))
        pruefe(pg.locator(".wahlflaeche").count() == 2, "Start: zwei gleichwertige Einstiege")
        hoehe = pg.locator('a[href="showroom.html"].textlink').bounding_box()
        pruefe(hoehe and hoehe["y"] + hoehe["height"] <= 720, "Start: alles Wesentliche ohne Scrollen bei 1280 × 720")
        pg.click('a.wahlflaeche[href="tablets.html"]')
        pg.click("#weiter")
        pruefe(pg.is_visible("#hinweis"), "Tablet-Weg: Hinweis, wenn nichts gewählt ist")
        antworte(pg, "phase", "einstieg")
        pruefe(pg.locator('input[name="anliegen"]').count() < 14, "Lernabsicht: zuerst nur häufige Anliegen")
        pg.click("#weitere")
        pruefe(pg.locator('input[name="anliegen"]').count() == 14, "Lernabsicht: »Weitere anzeigen« zeigt alle")
        antworte(pg, "anliegen", "interesse")
        antworte(pg, "mehrwert", "experimentieren")
        antworte(pg, "umfang", "offen")
        pg.click("#weiter")
        pruefe(pg.inner_text("#ergebnis-titel") == "Klarer Lernmehrwert erkennbar", "Entscheidungskarte: Einstufung erscheint")
        pruefe("Das ist eine Planungshilfe, keine Bewertung. Du entscheidest." in pg.inner_text(".entscheidung"), "Entscheidungskarte: Schlusssatz")
        n = pg.locator(".mini").count()
        pruefe(1 <= n <= 3, f"Entscheidungskarte: 1–3 Beispiele ({n})")
        if fotos: pg.screenshot(path=fotos / "beamer-entscheidungskarte.png", full_page=True)

        # Zurück und ändern
        pg.click('.schritte button[data-gehe="2"]')
        antworte(pg, "mehrwert", "organisation")
        pg.click('.schritte button[data-gehe="5"]')
        pruefe(pg.inner_text("#ergebnis-titel") == "Vor allem organisatorischer Nutzen", "Ändern: neue Antwort ändert die Karte")

        # Persistenz
        pg.reload()
        pruefe(pg.inner_text("#ergebnis-titel") == "Vor allem organisatorischer Nutzen", "Speichern: Karte bleibt nach dem Neuladen")

        # Beispiel → Detail → zurück zur Karte
        titel = pg.inner_text(".mini b >> nth=0")
        pg.click(".mini a >> nth=0")
        pg.wait_for_selector("#detail-titel")
        pruefe(pg.inner_text("#detail-titel") == titel, "Detail: richtiges Beispiel geöffnet")
        pg.click("#zur-karte")
        pg.wait_for_url("**/tablets.html"); pg.wait_for_selector("#ergebnis-titel", timeout=5000)
        pruefe(pg.is_visible("#ergebnis-titel"), "Detail: »Zurück zu deiner Entscheidungskarte« funktioniert")

        # Löschen
        pg.click("#loeschen")
        pg.reload()
        pruefe(pg.locator('input[name="phase"]:checked').count() == 0, "Eingaben löschen: alles zurückgesetzt")

        # 2. Analog-Ergebnis und Lockerung
        for name, wert in [("phase", "offen"), ("anliegen", "offen"), ("mehrwert", "unklar"), ("umfang", "offen")]:
            antworte(pg, name, wert)
        pg.click("#weiter")
        pruefe(pg.inner_text("#ergebnis-titel") == "Analog oder hybrid vermutlich passender", "Analog oder hybrid ist ein mögliches Ergebnis")
        pg.click("#neu")
        antworte(pg, "phase", "abschluss")
        pg.click("#weitere")
        antworte(pg, "anliegen", "reflektieren")
        antworte(pg, "mehrwert", "zeitort")
        antworte(pg, "umfang", "punktuell")
        pg.check('input[name="rahmen-netz"][value="nein"]')
        pg.click("#weiter")
        pruefe(pg.is_visible(".lockerung") or pg.locator(".mini").count() == 0, "Keine exakte Übereinstimmung: Lockerung wird erklärt")
        pruefe(not pg.konsole, f"Keine Konsolenfehler im Kernweg {pg.konsole}")
        pg.context.close()

        # 2b. KI-Weg (Szenario 1): KI-unerfahrene Lehrkraft, analog genutztes Arbeitsblatt
        pg = neue_seite(b)
        pg.goto(url("ki.html"))
        pg.click("#weiter")
        pruefe(pg.is_visible("#hinweis"), "KI-Weg: Hinweis, wenn kein Ziel gewählt ist")
        antworte(pg, "ziel", "erstellen")
        formen = pg.locator('input[name="form"]').count()
        pruefe(formen == 5, f"KI-Weg: nur passende Ergebnisformen ({formen})")
        antworte(pg, "form", "arbeitsblatt")
        pruefe("Keine Namen, Noten" in pg.inner_text("#weg"), "KI-Weg: Hinweis auf personenbezogene Daten sichtbar")
        pg.fill("#k-fach", "Kfz-Technik"); pg.fill("#k-thema", "Bremsanlage")
        pg.click("#weiter")
        pruefe(pg.locator(".baustein").count() == 5, "KI-Weg: fünf sichtbare Bausteine")
        pruefe("Kfz-Technik" in pg.input_value("#b-kontext"), "KI-Weg: Kontext steht in der Anfrage")
        pruefe("ausgedruckt" in pg.input_value("#b-anforderungen"), "KI-Weg: analoges Material ist ausdrücklich möglich")
        pg.fill("#b-format", "Eigene Formatvorgabe")
        pg.click("#kopieren")
        pg.wait_for_function("document.getElementById('kopiert').textContent.length > 0")
        rueck = pg.is_visible("#rueckfall")
        pruefe((not rueck) or ("Eigene Formatvorgabe" in pg.input_value("#gesamt")), "KI-Weg: Kopieren oder Rückfallebene mit bearbeitetem Text")
        pruefe("freigegebenes KI-System" in pg.inner_text("#weg"), "KI-Weg: Hinweis auf freigegebenes KI-System")
        pg.click("#weiter")
        pruefe(pg.locator(".haken").count() == 7, "KI-Weg: Prüfliste mit Ziel-Punkt")
        pruefe(pg.locator(".naechste-liste > li").count() <= 3 and pg.locator(".naechste .mini").count() == 1, "KI-Weg: höchstens drei nächste Schritte, einer zum Showroom")
        pg.check(".haken input >> nth=0")
        pg.reload()
        pruefe(pg.is_checked(".haken input >> nth=0"), "KI-Weg: Auswahl bleibt nach Neuladen")
        gespeichert = pg.evaluate("localStorage.getItem('hilde.kiweg')")
        pruefe("Kfz" not in gespeichert and "Bremsanlage" not in gespeichert, "KI-Weg: Freitexte werden nicht gespeichert")
        pg.click('.schritte button[data-gehe="3"]')
        pruefe("Frage mich zuerst nach Fach und Thema" in pg.input_value("#b-kontext"), "KI-Weg: nach Neuladen fehlen Freitexte – die KI fragt nach")
        pruefe(not pg.konsole, f"KI-Weg: keine Konsolenfehler {pg.konsole}")
        pg.context.close()

        # 2c. Showroom: Filter, Chips, Lockerung, Zurücksetzen (Szenarien 4, 7, 8, 9)
        pg = neue_seite(b)
        pg.goto(url("showroom.html"))
        pg.select_option("#f-phase", "sicherung")
        pg.select_option("#f-anliegen", "ueben")
        zeile = pg.inner_text("#ergebniszeile")
        pruefe(zeile.startswith(("1 Beispiel", "2 Beispiele", "3 Beispiele", "4 Beispiele")) and "Sicherung · Üben & anwenden" in zeile, f"Showroom: Ergebniszeile »{zeile}«")
        pruefe(pg.locator("#aktive [data-entfernen]").count() == 2, "Showroom: aktive Filter als Chips")
        pg.click('#aktive [data-entfernen="phase"]')
        pruefe(pg.locator("#aktive [data-entfernen]").count() == 1, "Showroom: Chip entfernt Filter")
        pg.click("summary >> text=Weitere Filter")
        pg.select_option("#f-fach", "Psychologie")
        pg.select_option("#f-anliegen", "leistung")
        pruefe(pg.is_visible("#lockerung") and pg.locator(".karte").count() > 0, "Showroom: ohne exakten Treffer nächstpassende Ideen mit Hinweis")
        pg.fill("#suche", "Raumfahrt")
        pruefe("noch kein Beispiel" in pg.inner_text("#lockerung"), "Showroom: Suchwort ohne Treffer wird benannt")
        pg.click("#lockerung [data-zuruecksetzen]")
        pruefe(pg.locator(".karte").count() >= 6 and pg.locator("#aktive li").count() == 0, "Showroom: Alle Filter zurücksetzen")
        pg.fill("#suche", "Kfz")
        pruefe(pg.locator(".karte").count() == 0 and pg.is_visible("#lockerung"), "Showroom: Kfz – ehrlicher Hinweis statt leerer Seite (Konzeptbeispiele folgen)")
        pruefe(not pg.konsole, f"Showroom: keine Konsolenfehler {pg.konsole}")
        pg.context.close()

        # 3. Nur Tastatur (Szenario 10)
        pg = neue_seite(b)
        pg.goto(url("tablets.html"))
        def tab_bis(selektor, max_=40):
            for _ in range(max_):
                pg.keyboard.press("Tab")
                if pg.evaluate("(s) => document.activeElement && document.activeElement.matches(s)", selektor):
                    return True
            return False
        for name in ["phase", "anliegen", "mehrwert", "umfang"]:
            ok = tab_bis(f'input[name="{name}"]')
            pg.keyboard.press("ArrowDown"); pg.keyboard.press("Space")
            tab_bis("#weiter"); pg.keyboard.press("Enter")
            pruefe(ok, f"Tastatur: Auswahl »{name}« erreichbar")
        tab_bis("#weiter"); pg.keyboard.press("Enter")
        pruefe(pg.is_visible("#ergebnis-titel"), "Tastatur: Entscheidungskarte erreicht")
        pruefe(pg.evaluate("document.activeElement.id") == "ergebnis-titel", "Tastatur: Fokus springt auf die Karte")
        ok = tab_bis(".mini a")
        pg.keyboard.press("Enter")
        pg.wait_for_selector("#detail-titel")
        pruefe(ok, "Tastatur: Beispiel aus der Karte öffnen")
        pg.context.close()

        # 4. Ohne Internet, reduzierte Bewegung, Showroom und Detail (Szenarien 8, 11, 12)
        pg = neue_seite(b, reduced_motion="reduce")
        for s in SEITEN:
            pg.goto(url(s))
            pg.wait_for_load_state("load")
        pruefe(not pg.extern, f"Ohne Internet: keine externen Anfragen {pg.extern[:3]}")
        pg.goto(url("showroom.html"))
        pruefe(pg.locator(".karte").count() >= 6, "Showroom: Karten erscheinen ohne Angaben")
        bilder_ok = pg.evaluate("[...document.images].every(i => i.complete && i.naturalWidth > 0)")
        pruefe(bilder_ok, "Showroom: Bildschirmfotos laden ohne Internet")
        pg.goto(url("beispiel.html#psycho-ds2"))
        pruefe(pg.get_attribute(".aktion a.knopf", "target") == "_blank", "Detail: externe Anwendung öffnet in neuem Tab und ist gekennzeichnet")
        pg.goto(url("beispiel.html#gibt-es-nicht"))
        pruefe("gibt es hier nicht" in pg.inner_text("#detail-titel"), "Detail: unbekannte Adresse ohne Sackgasse")
        pruefe(not pg.konsole, f"Keine Konsolenfehler auf den Seiten {pg.konsole}")

        # 5. axe-core
        if AXE.exists():
            quelle = AXE.read_text(encoding="utf-8")
            for s in SEITEN + ["tablets-ergebnis"]:
                if s == "tablets-ergebnis":
                    pg.goto(url("tablets.html"))
                    pg.evaluate("localStorage.setItem('hilde.tabletweg', JSON.stringify({schritt:5,erreicht:5,phase:'sicherung',anliegen:'ueben',mehrwert:'rueckmeldung',umfang:'offen',rahmen:{}}))")
                    pg.reload()
                else:
                    pg.goto(url(s))
                pg.add_script_tag(content=quelle)
                v = pg.evaluate("axe.run(document, {runOnly:{type:'tag', values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}).then(r => r.violations.map(v => v.id + ' (' + v.nodes.length + ')'))")
                pruefe(not v, f"axe-core {s}: {', '.join(v) if v else 'keine Verstöße'}")
        else:
            print("! axe.min.js fehlt unter tests/vendor/ – Prüfung mit axe-core übersprungen")

        # 6. Bildschirmfotos in drei Breiten
        if fotos:
            for name, vp in [("beamer", {"width": 1280, "height": 720}), ("ipad", {"width": 820, "height": 1180}), ("schmal", {"width": 390, "height": 844})]:
                q = neue_seite(b, viewport=vp)
                for s in ["index.html", "tablets.html", "showroom.html", "beispiel.html#ns-ideologie"]:
                    q.goto(url(s))
                    q.screenshot(path=fotos / f"{name}-{s.split('.')[0]}{'-' + s.split('#')[1] if '#' in s else ''}.png", full_page=name != "beamer")
                    breite = q.evaluate("document.documentElement.scrollWidth")
                    pruefe(breite <= vp["width"], f"{name} {s}: kein waagerechtes Scrollen")
                q.context.close()
        b.close()
    print(f"\n{'Alle Browser-Tests bestanden' if not fehler else str(len(fehler)) + ' Fehler'}")
    sys.exit(1 if fehler else 0)


if __name__ == "__main__":
    main()
