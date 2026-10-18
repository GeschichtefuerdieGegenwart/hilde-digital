#!/usr/bin/env python3
"""Prüft die gebauten Seiten und die Daten von Hilde Digital auf die vereinbarten Regeln.

Aufruf:  python3 tools/pruefen.py      (nach tools/bauen.py)
Ergebnis: Liste der Verstöße; Rückgabewert 1, wenn etwas gefunden wurde.

Geprüft werden
- Kennzeichnung in der Fußzeile jeder Seite, Hauptnavigation mit genau drei Bereichen,
- alte Namen (»Showroom«, »Mehrwert-Check«, »Hilde-Digital«) nur noch auf der Weiterleitung,
- verbotene Inhalte (Platzhalter, Logo, Kontaktadresse, »offizielles Digitalkonzept«),
- Fachbegriffe auf Start- und Bereichsseiten und in den Texten der geführten Wege,
  auf »Mehrwert« und »Über Hilde Digital« nur in aufklappbaren Vertiefungen,
- externe Dateien und Links in den Seiten (nicht erlaubt),
- interne Links (Ziel muss existieren),
- Schriftgrößen unter 16 Pixel im Seitentext,
- die Beispieldaten: Pflichtfelder, erlaubte Werte, eindeutige IDs und Slugs,
  Links nur auf die freigegebenen Seiten, Konzeptbeispiele ohne Link, Vorschläge nur für vorhandene Felder,
  Qualitätscheck nur mit Datum, höchstens drei Stärken ohne Zahl, Sicherheit mindestens »mittel«,
- die Galerie: jedes Bild vorhanden, eigener Alternativtext, Bildtext, Bilder nur für bekannte Beispiele,
  keine Galeriebilder für Konzeptbeispiele.
"""
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
SEITEN = ["index.html", "ki.html", "unterricht.html", "digitalisieren.html", "tablets.html", "passt.html", "digital-check.html", "selbstcheck.html", "mehrwert.html",
          "galerie.html", "beispiel.html", "showroom.html", "ueber.html", "gestaltung.html"]
# Seiten, auf denen Fachbegriffe nur in aufklappbaren Vertiefungen (<details>) stehen dürfen
MIT_VERTIEFUNG = ["mehrwert.html", "selbstcheck.html", "digital-check.html", "ueber.html"]
EINSTIEG = ["index.html", "ki.html", "unterricht.html", "digitalisieren.html", "tablets.html", "passt.html", "galerie.html"]
# Skripte, deren Texte auf Einstiegs- und Bereichsseiten erscheinen
EINSTIEG_SKRIPTE = ["assets/start.js", "assets/check-weg.js", "assets/check-regeln.js", "assets/tablets-weg.js", "assets/regeln.js", "assets/daten/taxonomien.js",
                    "assets/ki-weg.js", "assets/ki-anfrage.js", "assets/daten/texte.js", "assets/passt.js",
                    "assets/probe.js", "assets/digital-check.js", "assets/ki-schnell.js", "assets/schnell-anfrage.js", "assets/daten/schnell.js", "assets/digitalisieren.js", "assets/daten/digitalisieren.js", "assets/galerie-buehne.js", "assets/daten/galerie.js"]
FACHBEGRIFFE = ["Adaptivität", "kognitive Aktivierung", "formative Diagnostik", "Multimodalität",
                "Gamification", "selbstreguliert", "responsive Lernumgebung", "digitale Transformation"]
# Wörter, die auf Start- und Bereichsseiten und in den geführten Wegen nicht stehen sollen (Kritik vom 18.10.2026)
EINSTIEG_WOERTER = ["Digitalität", "Lernsetting", "HTML-Lernumgebung"]
VERBOTEN = ["ergänzen]", "Schullogo", "Kontaktadresse", "offizielles Digitalkonzept", "@"]
KENNZEICHNUNG = "Hilde Digital (Arbeitstitel) · Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept."
ALTE_NAMEN = ["Showroom", "Mehrwert-Check", "Hilde-Digital", "Über das Modul", "KI für meine Arbeit",
              "mit KI entwickelt", "Mit KI entwickelt"]  # Kategorie gestrichen (Version 4.4)
ERLAUBTE_HOSTS = ("https://geschichtefuerdiegegenwart.github.io/",)

PFLICHT = ["id", "slug", "titel", "kurz", "status", "bereich", "fach"]


def text_ohne_tags(html):
    html = re.sub(r"<(script|style)[\s\S]*?</\1>", " ", html)
    return re.sub(r"<[^>]+>", " ", html)


def pruefe_seiten(fehler):
    for name in SEITEN:
        pfad = WURZEL / name
        if not pfad.exists():
            fehler.append(f"{name}: Seite fehlt – erst tools/bauen.py ausführen")
            continue
        html = pfad.read_text(encoding="utf-8")
        text = text_ohne_tags(html)
        if KENNZEICHNUNG not in text:
            fehler.append(f"{name}: Kennzeichnung fehlt")
        nav = re.search(r'<nav class="nav"[^>]*>([\s\S]*?)</nav>', html)
        if not nav or re.findall(r"<a [^>]*>([^<]+)</a>", nav.group(1)) != ["KI-Training", "Digitaler Unterricht", "Galerie"]:
            fehler.append(f"{name}: Hauptnavigation muss genau KI-Training · Digitaler Unterricht · Galerie zeigen")
        if name != "showroom.html":
            for alt in ALTE_NAMEN:
                if alt in text:
                    fehler.append(f"{name}: alter Name »{alt}«")
        for wort in VERBOTEN:
            if wort in html:
                fehler.append(f"{name}: verbotener Inhalt »{wort}«")
        if name in MIT_VERTIEFUNG:
            ohne_vertiefung = text_ohne_tags(re.sub(r"<details[\s\S]*?</details>", " ", html))
            for wort in FACHBEGRIFFE:
                if wort.lower() in ohne_vertiefung.lower():
                    fehler.append(f"{name}: Fachbegriff außerhalb einer Vertiefung »{wort}«")
        if name in EINSTIEG:
            for wort in EINSTIEG_WOERTER:
                if wort.lower() in text.lower():
                    fehler.append(f"{name}: schwieriges Wort auf Einstiegsseite »{wort}«")
            for wort in FACHBEGRIFFE:
                if wort.lower() in text.lower():
                    fehler.append(f"{name}: Fachbegriff auf Einstiegsseite »{wort}«")
        for url in re.findall(r'(?:src|href)="(https?://[^"]+)"', html):
            fehler.append(f"{name}: externe Datei oder Link {url}")
        for ziel in re.findall(r'(?:src|href)="([^"#:]+)(?:#[^"]*)?"', html):
            if not (WURZEL / ziel).exists():
                fehler.append(f"{name}: interner Link ohne Ziel {ziel}")
        if re.search(r"font-size:\s*(0?\.[0-8]\d*rem|1[0-5]px)", html):
            fehler.append(f"{name}: Schrift kleiner als 16 Pixel im Seitentext")


def pruefe_css(fehler):
    css = (WURZEL / "assets" / "hilde.css").read_text(encoding="utf-8")
    for zahl, einheit in re.findall(r"font-size:\s*([0-9.]+)(rem|px)", css):
        if (einheit == "rem" and float(zahl) < 1) or (einheit == "px" and float(zahl) < 16):
            fehler.append(f"hilde.css: Schrift kleiner als 16 Pixel ({zahl}{einheit})")


def pruefe_skripte(fehler):
    for pfad in sorted((WURZEL / "assets").rglob("*.js")):
        rel = pfad.relative_to(WURZEL).as_posix()
        inhalt = pfad.read_text(encoding="utf-8")
        for wort in VERBOTEN:
            if wort in inhalt:
                fehler.append(f"{rel}: verbotener Inhalt »{wort}«")
        if rel in EINSTIEG_SKRIPTE:
            for wort in EINSTIEG_WOERTER:
                if wort.lower() in inhalt.lower():
                    fehler.append(f"{rel}: schwieriges Wort in einem geführten Weg »{wort}«")
            for wort in FACHBEGRIFFE:
                if wort.lower() in inhalt.lower():
                    fehler.append(f"{rel}: Fachbegriff in einem geführten Weg »{wort}«")
        for url in re.findall(r'"(https?://[^"]+)"', inhalt):
            if not url.startswith(ERLAUBTE_HOSTS):
                fehler.append(f"{rel}: Link außerhalb der freigegebenen Seiten {url}")


def lade_daten():
    node = shutil.which("node")
    if not node:
        return None, None
    skript = ("const t=require('./assets/daten/taxonomien.js');const b=require('./assets/daten/beispiele.js');"
              "const g=require('./assets/daten/galerie.js');process.stdout.write(JSON.stringify({t,b,g}))")
    aus = subprocess.run([node, "-e", skript], cwd=WURZEL, capture_output=True, text=True, check=True)
    d = json.loads(aus.stdout)
    return d["t"], d["b"], d["g"]


def pruefe_daten(fehler):
    try:
        tax, beispiele, galerie = lade_daten()
    except subprocess.CalledProcessError as e:
        fehler.append(f"Daten: lassen sich nicht laden ({e.stderr.strip()[:200]})")
        return
    if tax is None:
        print("! node fehlt – Datenprüfung übersprungen")
        return
    ids = lambda liste: {x["id"] for x in tax[liste]}
    erlaubt = {
        "phasen": ids("phasen"), "anliegen": ids("anliegen"), "rollen": ids("rollen"),
        "mehrwerte": ids("mehrwerte"),
    }
    umfaenge = ids("umfang") | {None}
    bereiche = ids("bereiche")
    ki = ids("kiEinsatz") | {None}
    gesehen_id, gesehen_slug = set(), set()
    for b in beispiele:
        wer = b.get("id", "?")
        for feld in PFLICHT:
            if not b.get(feld):
                fehler.append(f"Beispiel {wer}: Pflichtfeld »{feld}« fehlt")
        if b["id"] in gesehen_id:
            fehler.append(f"Beispiel {wer}: ID doppelt")
        if b["slug"] in gesehen_slug:
            fehler.append(f"Beispiel {wer}: Slug doppelt")
        gesehen_id.add(b["id"]); gesehen_slug.add(b["slug"])
        if not re.fullmatch(r"[a-z0-9-]+", b["slug"] or ""):
            fehler.append(f"Beispiel {wer}: Slug nur aus Kleinbuchstaben, Ziffern und Bindestrich")
        if b["status"] not in tax["status"]:
            fehler.append(f"Beispiel {wer}: Status »{b['status']}« nicht erlaubt")
        if b["bereich"] not in bereiche:
            fehler.append(f"Beispiel {wer}: Bereich »{b['bereich']}« nicht erlaubt")
        if b.get("umfang") not in umfaenge:
            fehler.append(f"Beispiel {wer}: Umfang »{b.get('umfang')}« nicht erlaubt")
        if b.get("kiEinsatz") not in ki:
            fehler.append(f"Beispiel {wer}: KI-Einsatz »{b.get('kiEinsatz')}« nicht erlaubt")
        for feld, werte in erlaubt.items():
            for w in b.get(feld, []):
                if w not in werte:
                    fehler.append(f"Beispiel {wer}: {feld} »{w}« nicht erlaubt")
        link = b.get("link")
        if link and not link.startswith(ERLAUBTE_HOSTS):
            fehler.append(f"Beispiel {wer}: Link außerhalb der freigegebenen Seiten")
        if b.get("vorschauArt") == "konzept" or b["status"] == "Idee":
            if link:
                fehler.append(f"Beispiel {wer}: Konzeptbeispiel darf keinen Link haben")
            if b.get("erfahrung"):
                fehler.append(f"Beispiel {wer}: Konzeptbeispiel darf keine Erfahrung haben")
        if b.get("bild") and not (WURZEL / b["bild"]).exists():
            fehler.append(f"Beispiel {wer}: Bild fehlt {b['bild']}")
        for teil in ("vorher", "nachher"):
            v = (b.get("vergleich") or {}).get(teil)
            if v and not (WURZEL / v["bild"]).exists():
                fehler.append(f"Beispiel {wer}: Vergleichsbild fehlt {v['bild']}")
        q = b.get("qualitaetscheck")
        if q:
            if not q.get("datum") or not q.get("staerken"):
                fehler.append(f"Beispiel {wer}: Qualitätscheck braucht Datum und Stärken")
            if len(q.get("staerken") or []) > 3:
                fehler.append(f"Beispiel {wer}: höchstens drei Stärken")
            if q.get("sicherheit") not in ("hoch", "mittel"):
                fehler.append(f"Beispiel {wer}: Stärken erst ab mittlerer Sicherheit")
            if any(ch.isdigit() for st in q.get("staerken") or [] for ch in st):
                fehler.append(f"Beispiel {wer}: Stärken ohne Zahl")
        for feld in (b.get("vorschlag") or {}):
            if feld not in b:
                fehler.append(f"Beispiel {wer}: Vorschlag für unbekanntes Feld »{feld}«")
    pruefe_galerie(fehler, beispiele, galerie)
    print(f"Daten: {len(beispiele)} Beispiele geprüft")


def pruefe_galerie(fehler, beispiele, galerie):
    nach_id = {b["id"]: b for b in beispiele}
    alts = set()
    zahl = 0
    for pid, ansichten in galerie.items():
        b = nach_id.get(pid)
        if not b:
            fehler.append(f"Galerie {pid}: kein Beispiel mit dieser ID")
            continue
        if b.get("vorschauArt") == "konzept" or b["status"] == "Idee":
            fehler.append(f"Galerie {pid}: Konzeptbeispiel darf kein echtes Bild haben")
        for a in ansichten:
            zahl += 1
            if not (WURZEL / a.get("bild", "")).exists():
                fehler.append(f"Galerie {pid}: Bild fehlt {a.get('bild')}")
            elif not (WURZEL / a["bild"].replace("assets/galerie/", "assets/galerie/duplex/")).exists():
                fehler.append(f"Galerie {pid}: Duplex-Vorschau fehlt – python3 tools/duplex.py ausführen ({a['bild']})")
            if not a.get("alt") or len(a["alt"]) < 20:
                fehler.append(f"Galerie {pid}: Alternativtext fehlt oder ist zu kurz ({a.get('bild')})")
            elif a["alt"] in alts:
                fehler.append(f"Galerie {pid}: Alternativtext doppelt ({a.get('bild')})")
            alts.add(a.get("alt"))
            if not a.get("text"):
                fehler.append(f"Galerie {pid}: Bildtext fehlt ({a.get('bild')})")
    print(f"Galerie: {zahl} Ansichten aus {len(galerie)} Projekten geprüft")


def main():
    fehler = []
    pruefe_seiten(fehler)
    pruefe_skripte(fehler)
    pruefe_css(fehler)
    pruefe_daten(fehler)
    for zeile in fehler:
        print("✗", zeile)
    print("Geprüft:", ", ".join(SEITEN), "–", "keine Verstöße" if not fehler else f"{len(fehler)} Verstöße")
    sys.exit(1 if fehler else 0)


if __name__ == "__main__":
    main()
