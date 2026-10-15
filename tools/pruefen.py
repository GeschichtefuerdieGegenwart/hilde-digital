#!/usr/bin/env python3
"""Prüft die gebauten Seiten von Hilde Digital auf die vereinbarten Regeln.

Aufruf:  python3 tools/pruefen.py      (nach tools/bauen.py)
Ergebnis: Liste der Verstöße; Rückgabewert 1, wenn etwas gefunden wurde.
"""
import re
import sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
SEITEN = ["index.html", "ki.html", "lernen.html", "beispiele.html", "gestaltung.html"]
EINSTIEG = ["index.html", "ki.html", "lernen.html"]
FACHBEGRIFFE = ["Adaptivität", "kognitive Aktivierung", "formative Diagnostik", "Multimodalität",
                "Gamification", "selbstreguliert", "responsive Lernumgebung", "digitale Transformation"]
VERBOTEN = ["ergänzen]", "Schullogo", "Kontaktadresse", "offizielles Digitalkonzept", "@"]
KENNZEICHNUNG = "Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept."
ERLAUBTE_HOSTS = ("https://geschichtefuerdiegegenwart.github.io/",)


def text_ohne_tags(html):
    html = re.sub(r"<(script|style)[\s\S]*?</\1>", " ", html)
    return re.sub(r"<[^>]+>", " ", html)


def main():
    fehler = []
    for name in SEITEN:
        html = (WURZEL / name).read_text(encoding="utf-8")
        text = text_ohne_tags(html)
        if KENNZEICHNUNG not in text:
            fehler.append(f"{name}: Kennzeichnung fehlt")
        for wort in VERBOTEN:
            if wort in html:
                fehler.append(f"{name}: verbotener Inhalt »{wort}«")
        if name in EINSTIEG:
            for wort in FACHBEGRIFFE:
                if wort.lower() in text.lower():
                    fehler.append(f"{name}: Fachbegriff auf Einstiegsseite »{wort}«")
        for url in re.findall(r'(?:src|href)="(https?://[^"]+)"', html):
            fehler.append(f"{name}: externe Datei oder Link {url}")
        if re.search(r"font-size:\s*(0?\.[0-8]\d*rem|1[0-5]px)", html):
            fehler.append(f"{name}: Schrift kleiner als 16 Pixel im Seitentext")
    daten = (WURZEL / "assets" / "beispiele.js").read_text(encoding="utf-8")
    for url in re.findall(r'"(https?://[^"]+)"', daten):
        if not url.startswith(ERLAUBTE_HOSTS):
            fehler.append(f"beispiele.js: Link außerhalb der freigegebenen Seiten {url}")
    for zeile in fehler:
        print("✗", zeile)
    print("Geprüft:", ", ".join(SEITEN), "–", "keine Verstöße" if not fehler else f"{len(fehler)} Verstöße")
    sys.exit(1 if fehler else 0)


if __name__ == "__main__":
    main()
