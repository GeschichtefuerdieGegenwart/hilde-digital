#!/usr/bin/env python3
"""Baut die Seiten von Hilde Digital aus src/*.html (nur Seiteninhalt) und dem gemeinsamen Rahmen.

Aufruf:  python3 tools/bauen.py
Ergebnis: alle Seiten aus SEITEN. showroom.html leitet auf galerie.html weiter (alte Links bleiben gültig).
Kopfzeile, Statuszeile und Fußzeile stehen nur hier – so bleiben sie auf allen Seiten gleich.
"""
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent

SEITEN = [
    # Datei, Titel, Navigationspunkt ("" = kein Hauptbereich)
    ("index.html", "Hilde Digital", ""),
    ("ki.html", "KI-Training – Hilde Digital", "ki"),
    ("unterricht.html", "Digitaler Unterricht – Hilde Digital", "unterricht"),
    ("tablets.html", "Unterricht planen – Hilde Digital", "unterricht"),
    ("passt.html", "Was passt gerade zu mir? – Hilde Digital", "unterricht"),
    ("digitalisieren.html", "Unterricht digitalisieren – Hilde Digital", "unterricht"),
    ("beobachtung.html", "Nach der Stunde: Beobachtungsbogen – Hilde Digital", "unterricht"),
    ("digital-check.html", "Digital-Check – Hilde Digital", "unterricht"),
    ("selbstcheck.html", "Digital-Check: Selbst prüfen – Hilde Digital", "unterricht"),
    ("mehrwert.html", "So arbeitet der Digital-Check – Hilde Digital", "unterricht"),
    ("galerie.html", "Galerie – Hilde Digital", "galerie"),
    ("beispiel.html", "Beispiel – Hilde Digital", "galerie"),
    ("showroom.html", "Galerie – Hilde Digital", "galerie"),
    ("ueber.html", "Über Hilde Digital", ""),
    ("gestaltung.html", "Gestaltungssystem – Hilde Digital", ""),
]

# Wortmarke: zwei überdruckte Druckplatten (Honig, Petrol, Überdruck) neben dem Namen.
PLATTEN = '<span class="strich" aria-hidden="true"><i></i><i></i><i></i></span>'

NAV = [
    # Die drei Kernbereiche. Die Wortmarke führt zum Start.
    ("ki", "ki.html", "KI-Training"),
    ("unterricht", "unterricht.html", "Digitaler Unterricht"),
    ("galerie", "galerie.html", "Galerie"),
]

FUSS = [
    ("ueber.html", "Über Hilde Digital"),
    ("ueber.html#inhalte", "Inhalte und Funktionen"),
    ("ueber.html#t-daten", "Hinweise zu Daten und KI"),
    ("gestaltung.html", "Gestaltungssystem"),
]

KENNZEICHNUNG = "Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept."


def rahmen(titel, aktiv, inhalt, datei):
    nav = "".join(
        f'<a href="{href}"{" aria-current=\"page\"" if key == aktiv and datei == href else (" aria-current=\"true\"" if key == aktiv else "")}>{text}</a>'
        for key, href, text in NAV
    )
    fuss = "".join(f'<li><a href="{href}">{text}</a></li>' for href, text in FUSS)
    weiterleitung = ('<meta http-equiv="refresh" content="0; url=galerie.html">\n<script>location.replace("galerie.html" + location.hash)</script>\n'
                     if datei == "showroom.html" else "")
    return f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<meta name="description" content="Hilde Digital: KI-Training, Digitaler Unterricht und eine Galerie echter Lernanwendungen aus dem Kollegium.">
{weiterleitung}<title>{titel}</title>
<link rel="stylesheet" href="assets/hilde.css">
</head>
<body>
<a class="sprung" href="#inhalt">Zum Inhalt springen</a>
<header class="kopf"><div class="huelle">
  <a class="marke" href="index.html"{' aria-current="page"' if datei == "index.html" else ""}><span class="marke-name">Hilde Digital</span>{PLATTEN}<span class="sr-only">, zum Start</span></a>
  <nav class="nav" aria-label="Bereiche">{nav}</nav>
  <a class="hefter-link" href="galerie.html#hefter" aria-label="Mein Schnellhefter"><svg viewBox="0 0 30 24" aria-hidden="true"><rect x="1" y="2" width="28" height="21" rx="2" fill="#f2b233" stroke="#a26a1c" stroke-width="2"/><rect x="1" y="2" width="6" height="21" fill="#a26a1c"/><circle cx="4" cy="8" r="1.3" fill="#f0eeeb"/><circle cx="4" cy="17" r="1.3" fill="#f0eeeb"/></svg><span class="hefter-zahl" aria-hidden="true">0</span></a>
</div></header>
<main id="inhalt" tabindex="-1">
{inhalt}
</main>
<footer class="fuss"><div class="huelle">
  <p class="fuss-marke" aria-hidden="true">Hilde Digital{PLATTEN}</p>
  <nav class="fusslinks" aria-label="Über Hilde Digital"><ul>{fuss}<li><a href="ueber.html#t-daten">Eingaben löschen</a></li></ul></nav>
  <p class="kennzeichnung">Hilde Digital (Arbeitstitel) · {KENNZEICHNUNG}</p>
</div></footer>
<script src="assets/motion.js"></script>
</body>
</html>
"""


def main():
    for alt in ("lernen.html", "beispiele.html"):  # umbenannt in tablets.html und showroom.html
        (WURZEL / alt).unlink(missing_ok=True)
    for datei, titel, aktiv in SEITEN:
        inhalt = (WURZEL / "src" / datei).read_text(encoding="utf-8")
        (WURZEL / datei).write_text(rahmen(titel, aktiv, inhalt, datei), encoding="utf-8")
        print("gebaut:", datei)


if __name__ == "__main__":
    main()
