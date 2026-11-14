#!/usr/bin/env python3
"""Kidu – Film auf der Startseite: erzeugt assets/film-buehne.js aus src/film/ (ab Version 4.40).

Quelle (von Hand bearbeiten):
  src/film/buehne.html   die Bühne, 1280 × 720. Zeilen, die nur aus einem Kommentar <!-- … --> bestehen, entfallen;
                         alle anderen Zeilen bleiben Zeichen für Zeichen (auch die Zeilenumbrüche).
  src/film/kapitel.json  Dauer und Kapitel: Start in Sekunden, Name, Zeit des Standbilds (bild).
Ziel (nie von Hand ändern): assets/film-buehne.js.
Die Zeitachse steht als CSS-Animationen in assets/hilde.css (Abschnitt »Film«), die Steuerung in assets/film.js.

Aufruf: python3 tools/film.py            erzeugt die Datei
        python3 tools/film.py --pruefen  meldet, ob sie zur Quelle passt (läuft auch in tools/pruefen.py)
"""
import json
import pathlib
import re
import sys

WURZEL = pathlib.Path(__file__).resolve().parent.parent
QUELLE = WURZEL / "src" / "film"
ZIEL = WURZEL / "assets" / "film-buehne.js"
KOPF = """/* Kidu – Bühne des Films auf der Startseite (ab Version 4.34, Kamera und 2:50 ab 4.35). NICHT VON HAND ÄNDERN.
   Erzeugt von tools/film.py aus src/film/buehne.html und src/film/kapitel.json (ab Version 4.40; Ursprung: Drehbuch des Pitch-Films,
   Claude Design, Fassung 5 vom 12.11.2026). Jede Bewegung ist eine CSS-Animation mit fester Verzögerung (assets/hilde.css, Abschnitt »Film«);
   assets/film.js steuert Start, Halt, Kapitel und Ende. Die Ansichten in Kapitel 8 sind Bildschirmfotos der Lernseiten und von Kidu selbst
   (assets/film/). kapitel[n].bild ist die Zeit des Standbilds. */
"""
KOMMENTAR = re.compile(r"^\s*<!--.*-->\s*$")


def buehne():
    zeilen = (QUELLE / "buehne.html").read_text(encoding="utf-8").split("\n")
    return "\n".join(z for z in zeilen if not KOMMENTAR.match(z))


def daten():
    d = json.loads((QUELLE / "kapitel.json").read_text(encoding="utf-8"))
    return {"dauer": d["dauer"], "kapitel": d["kapitel"], "buehne": buehne()}


def inhalt():
    return (KOPF + "var KIDU_FILM = " + json.dumps(daten(), ensure_ascii=False) + ";\n").encode("utf-8")


def veraltet():
    """Fehlerliste für tools/pruefen.py: Passt assets/film-buehne.js zur Quelle?"""
    if not ZIEL.exists() or ZIEL.read_bytes() != inhalt():
        return ["assets/film-buehne.js: veraltet – python3 tools/film.py ausführen"]
    return []


def main():
    if "--pruefen" in sys.argv:
        f = veraltet()
        print("\n".join(f) or "Film: aktuell")
        sys.exit(1 if f else 0)
    ZIEL.write_bytes(inhalt())
    print("erzeugt: assets/film-buehne.js")


if __name__ == "__main__":
    main()
