#!/usr/bin/env python3
"""Baut die Seiten von Hilde Digital aus src/*.html (nur Seiteninhalt) und dem gemeinsamen Rahmen.

Aufruf:  python3 tools/bauen.py
Ergebnis: index.html, ki.html, tablets.html, showroom.html, beispiel.html, ueber.html, gestaltung.html.
Kopfzeile, Statuszeile und Fußzeile stehen nur hier – so bleiben sie auf allen Seiten gleich.
"""
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent

SEITEN = [
    # Datei, Titel, Navigationspunkt
    ("index.html", "Hilde Digital", "start"),
    ("ki.html", "KI für meine Arbeit – Hilde Digital", "ki"),
    ("tablets.html", "Unterricht mit Tablets gestalten – Hilde Digital", "tablets"),
    ("showroom.html", "Showroom – Hilde Digital", "showroom"),
    ("beispiel.html", "Beispiel – Hilde Digital", "showroom"),
    ("ueber.html", "Über das Modul – Hilde Digital", "ueber"),
    ("gestaltung.html", "Gestaltungssystem – Hilde Digital", "ueber"),
]

MARKE = """<svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="11" cy="14" r="8.5" fill="#f5e8cf" stroke="#a26a1c" stroke-width="1.6"/><circle cx="17" cy="14" r="8.5" fill="#dbeae6" fill-opacity=".75" stroke="#1e6b67" stroke-width="1.6"/></svg>"""

NAV = [
    # höchstens fünf Punkte (Master-Prompt, Abschnitt 4)
    ("start", "index.html", "Start"),
    ("ki", "ki.html", "KI für meine Arbeit"),
    ("tablets", "tablets.html", "Unterricht mit Tablets"),
    ("showroom", "showroom.html", "Showroom"),
    ("ueber", "ueber.html", "Über das Modul"),
]

KENNZEICHNUNG = "Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept."


def rahmen(titel, aktiv, inhalt):
    nav = "".join(
        f'<a href="{href}"{" aria-current=\"page\"" if key == aktiv else ""}>{text}</a>'
        for key, href, text in NAV
    )
    return f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<title>{titel}</title>
<link rel="stylesheet" href="assets/hilde.css">
</head>
<body>
<a class="sprung" href="#inhalt">Zum Inhalt springen</a>
<header class="kopf"><div class="huelle">
  <a class="marke" href="index.html">{MARKE}Hilde Digital</a>
  <nav class="nav" aria-label="Bereiche">{nav}</nav>
</div></header>
<main id="inhalt" tabindex="-1">
{inhalt}
</main>
<footer class="fuss"><div class="huelle">
  <span>Hilde Digital (Arbeitstitel) · {KENNZEICHNUNG}</span>
  <span class="fusslinks"><a href="ueber.html" class="leise">Über das Modul</a> <a href="gestaltung.html" class="leise">Gestaltungssystem</a></span>
</div></footer>
</body>
</html>
"""


def main():
    for alt in ("lernen.html", "beispiele.html"):  # umbenannt in tablets.html und showroom.html
        (WURZEL / alt).unlink(missing_ok=True)
    for datei, titel, aktiv in SEITEN:
        inhalt = (WURZEL / "src" / datei).read_text(encoding="utf-8")
        (WURZEL / datei).write_text(rahmen(titel, aktiv, inhalt), encoding="utf-8")
        print("gebaut:", datei)


if __name__ == "__main__":
    main()
