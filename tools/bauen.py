#!/usr/bin/env python3
"""Baut die Seiten von Kidu aus src/*.html (nur Seiteninhalt) und dem gemeinsamen Rahmen.

Aufruf:  python3 tools/bauen.py
Ergebnis: alle Seiten aus SEITEN. showroom.html leitet auf galerie.html weiter, startpunkt.html auf fortbildungsbogen.html (alte Links bleiben gültig).
Kopfzeile, Statuszeile und Fußzeile stehen nur hier – so bleiben sie auf allen Seiten gleich.
Im Fuß stehen die Schalter »Weniger Bewegung« (ab Version 4.8) und »Beamer-Ansicht« (ab 4.8 Teil 2); ein kleines Skript im Kopf
setzt die gemerkten Wahlen (hilde.bewegung, hilde.theme) vor dem ersten Zeichnen.
"""
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent

SEITEN = [
    # Datei, Titel, Navigationspunkt ("" = kein Hauptbereich)
    ("index.html", "Kidu · Künstliche Intelligenz und digitaler Unterricht", ""),
    ("ki.html", "KI-Training – Kidu", "ki"),
    ("unterricht.html", "Digitaler Unterricht – Kidu", "unterricht"),
    ("tablets.html", "Unterricht planen – Kidu", "unterricht"),
    ("passt.html", "Was passt gerade zu mir? – Kidu", "unterricht"),
    ("digitalisieren.html", "Unterricht digitalisieren – Kidu", "unterricht"),
    ("beobachtung.html", "Nach der Stunde: Beobachtungsbogen – Kidu", "unterricht"),
    ("tablet-phasen.html", "Tablet-Phasen gut führen – Kidu", "unterricht"),
    ("ist-stand.html", "Mein Ist-Stand – Kidu", "unterricht"),
    ("fortbildungsbogen.html", "Mein Fortbildungsbogen – Kidu", "unterricht"),
    ("startpunkt.html", "Mein Fortbildungsbogen – Kidu", "unterricht"),
    ("fortbildung.html", "Fortbildungsbaustein: 45 Minuten – Kidu", "unterricht"),
    ("beratung.html", "Beratungsstunde: acht Wochen – Kidu", "unterricht"),
    ("leitsaetze.html", "Leitsätze zur Diskussion – Kidu", ""),
    ("fuenf-saetze.html", "Guter digitaler Unterricht in fünf Sätzen – Kidu", "unterricht"),
    ("sechs-hebel.html", "Wann digitaler Unterricht funktioniert – Kidu", "unterricht"),
    ("sechs-hebel-film.html", "Film: Was das Gerät kann – Kidu", "unterricht"),
    ("digital-check.html", "Digital-Check – Kidu", "unterricht"),
    ("selbstcheck.html", "Digital-Check: Selbst prüfen – Kidu", "unterricht"),
    ("mehrwert.html", "So arbeitet der Digital-Check – Kidu", "unterricht"),
    ("muster.html", "Unterrichtsmuster aus der Praxis – Kidu", "unterricht"),
    ("aufgabenkoffer.html", "Aufgabenkoffer – Kidu", "unterricht"),
    ("auftraege.html", "Aufträge zum Kopieren – Kidu", "ki"),
    ("ki-fach.html", "KI für dein Fach einrichten – Kidu", "ki"),
    ("sicher.html", "Sicher arbeiten in fünf Regeln – Kidu", "ki"),
    ("lernende-ki.html", "Wenn deine Lernenden mit KI arbeiten – Kidu", "ki"),
    ("galerie.html", "Galerie – Kidu", "galerie"),
    ("beispiel.html", "Beispiel – Kidu", "galerie"),
    ("showroom.html", "Galerie – Kidu", "galerie"),
    ("ueber.html", "Über Kidu", ""),
    ("gestaltung.html", "Gestaltungssystem – Kidu", ""),
    ("werkzeugkiste.html", "Werkzeugkiste – Kidu", ""),
]

# Logo Kidu (ab Version 4.26, Logo 5f aus Claude Design): Wortmarke »Kidu« in IBM Plex Mono (als Umrisse),
# der i-Punkt sind die zwei versetzten Platten – Ocker = KI, Petrol = digitaler Unterricht, Oliv in der Schnittmenge.
# Dateien in assets/logo/. Darunter immer die ausgeschriebene Zeile, in der K·I ocker und d·U petrol unterstrichen sind.
WORTMARKE = '<img class="kidu-wortmarke" src="assets/logo/kidu-logo.svg" alt="" width="224" height="92">'
PLATTEN = '<span class="kidu-zeichen" aria-hidden="true"><i></i><i></i><i></i></span>'
ZEILE = ('<span class="ini ki">K</span>ünstliche <span class="ini ki">I</span>ntelligenz '
         'und <span class="ini du">d</span>igitaler <span class="ini du">U</span>nterricht')

# Alte Adressen leiten weiter (alte Links bleiben gültig).
WEITERLEITUNGEN = {"showroom.html": "galerie.html", "startpunkt.html": "fortbildungsbogen.html"}

NAV = [
    # Die drei Kernbereiche. Die Wortmarke führt zum Start.
    ("ki", "ki.html", "KI-Training"),
    ("unterricht", "unterricht.html", "Digitaler Unterricht"),
    ("galerie", "galerie.html", "Galerie"),
]

FUSS = [
    ("ueber.html", "Über Kidu"),
    ("ueber.html#inhalte", "Inhalte und Funktionen"),
    ("ueber.html#t-daten", "Hinweise zu Daten und KI"),
    ("gestaltung.html", "Gestaltungssystem"),
    ("werkzeugkiste.html", "Werkzeugkiste"),
    ("fortbildungsbogen.html", "Mein Fortbildungsbogen"),
]

KENNZEICHNUNG = "Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept."
# Urheberzeile (Entscheidung 01.11.2026): Name des Urhebers, keine Kontaktadresse
URHEBER = "© 2026 Mario Walter · entwickelt mit Unterstützung eines KI-Systems · Texte CC BY-NC-SA 4.0 · Code MIT ·"


def rahmen(titel, aktiv, inhalt, datei):
    nav = "".join(
        f'<a href="{href}"{" aria-current=\"page\"" if key == aktiv and datei == href else (" aria-current=\"true\"" if key == aktiv else "")}>{text}</a>'
        for key, href, text in NAV
    )
    fuss = "".join(f'<li><a href="{href}">{text}</a></li>' for href, text in FUSS)
    ziel = WEITERLEITUNGEN.get(datei)
    weiterleitung = (f'<meta http-equiv="refresh" content="0; url={ziel}">\n<script>location.replace("{ziel}" + location.hash)</script>\n' if ziel else "")
    return f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<meta name="description" content="Kidu · Künstliche Intelligenz und digitaler Unterricht: KI-Training, Digitaler Unterricht und eine Galerie echter Lernanwendungen aus dem Kollegium.">
{weiterleitung}<title>{titel}</title>
<link rel="icon" href="assets/logo/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/hilde.css">
<script>/* Schalter »Weniger Bewegung« und »Beamer-Ansicht« (Fuß): die gemerkten Wahlen vor dem ersten Zeichnen setzen, damit nichts flackert. */try{{var b=JSON.parse(localStorage.getItem("hilde.bewegung"));if(b&&b.weniger)document.documentElement.setAttribute("data-bewegung","weniger");var t=JSON.parse(localStorage.getItem("hilde.theme"));if(t&&t.beamer)document.documentElement.setAttribute("data-theme","beamer")}}catch(e){{}}</script>
</head>
<body>
<a class="sprung" href="#inhalt">Zum Inhalt springen</a>
<header class="kopf"><div class="huelle">
  <a class="marke" href="index.html"{' aria-current="page"' if datei == "index.html" else ""}><span class="marke-text"><span class="marke-name"><span class="sr-only">Kidu</span>{WORTMARKE}</span><span class="marke-zeile" aria-hidden="true">{ZEILE}</span></span><span class="sr-only">, zum Start</span></a>
  <nav class="nav" aria-label="Bereiche">{nav}</nav>
  <a class="hefter-link" href="galerie.html#hefter" aria-label="Mein Schnellhefter"><svg viewBox="0 0 30 24" aria-hidden="true"><rect x="1" y="2" width="28" height="21" rx="2" fill="#b68235" stroke="#7d5a1c" stroke-width="2"/><rect x="1" y="2" width="6" height="21" fill="#7d5a1c"/><circle cx="4" cy="8" r="1.3" fill="#efeadf"/><circle cx="4" cy="17" r="1.3" fill="#efeadf"/></svg><span class="hefter-zahl" aria-hidden="true">0</span></a>
</div></header>
<main id="inhalt" tabindex="-1">
{inhalt}
</main>
<footer class="fuss"><div class="huelle">
  <p class="fuss-marke" aria-hidden="true">{WORTMARKE}</p>
  <p class="fuss-unterzeile">{ZEILE}</p>
  <nav class="fusslinks" aria-label="Über Kidu"><ul>{fuss}<li><a href="ueber.html#t-daten">Eingaben löschen</a></li></ul></nav>
  <p class="fuss-einstellung"><button type="button" class="knopf still bewegung-schalter" id="bewegung-schalter" data-bewegung-schalter aria-pressed="false">Weniger Bewegung</button><span class="leise">Gilt in diesem Browser. Nichts gleitet, nichts fliegt, alles steht sofort da.</span></p>
  <p class="fuss-einstellung"><button type="button" class="knopf still theme-schalter" id="theme-schalter" data-theme-schalter aria-pressed="false">Beamer-Ansicht</button><span class="leise">Gilt in diesem Browser. Reines Weiß, tiefes Schwarz, kräftigere Farben – für den Beamer im Klassenzimmer.</span></p>
  <p class="kennzeichnung">Kidu · Künstliche Intelligenz und digitaler Unterricht · {KENNZEICHNUNG}</p>
  <p class="kennzeichnung urheber leise">{URHEBER} <a href="ueber.html#t-entstehung">Entstehung und Lizenz</a></p>
</div></footer>
<script src="assets/motion.js"></script>
</body>
</html>
"""


def mit_stand(html):
    """Hängt an jede eigene CSS- und JS-Datei einen Prüfwert ihres Inhalts (?v=…).
    So lädt der Browser nach einer Änderung die neue Datei und mischt nie neue Seiten mit alten Stilen (ab Version 4.17)."""
    import hashlib, re
    def ersetze(m):
        pfad = WURZEL / m.group(2)
        if not pfad.exists():
            return m.group(0)
        return f'{m.group(1)}="{m.group(2)}?v={hashlib.md5(pfad.read_bytes()).hexdigest()[:8]}"'
    return re.sub(r'(src|href)="(assets/[^"?#]+\.(?:css|js))"', ersetze, html)


def main():
    # ab Version 4.25: zuerst die Kurzfassungen und Downloads aus den Skills (eine Quelle für alles)
    import importlib.util
    spec = importlib.util.spec_from_file_location("werkzeugkiste", WURZEL / "tools" / "werkzeugkiste.py")
    wk = importlib.util.module_from_spec(spec); spec.loader.exec_module(wk); wk.main()
    for alt in ("lernen.html", "beispiele.html"):  # umbenannt in tablets.html und showroom.html
        (WURZEL / alt).unlink(missing_ok=True)
    for datei, titel, aktiv in SEITEN:
        inhalt = (WURZEL / "src" / datei).read_text(encoding="utf-8")
        (WURZEL / datei).write_text(mit_stand(rahmen(titel, aktiv, inhalt, datei)), encoding="utf-8")
        print("gebaut:", datei)


if __name__ == "__main__":
    main()
