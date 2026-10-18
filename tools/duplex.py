#!/usr/bin/env python3
"""Erzeugt die Duplex-Vorschauen der Galerie (Entscheidung E6 des Designkonzepts).

Jedes Bildschirmfoto aus assets/galerie/ wird in Graustufen umgerechnet und auf die Druckfarben
seines Bereichs gelegt – wie ein Zweifarbdruck:
- Digitaler Unterricht (lernen):   Petrol tief  -> Fläche
- KI-Training (ki):                Druckschwarz -> Honigplatte -> Fläche
- mit KI entwickelt (beide):       Petrol tief  -> Honigplatte -> Fläche

Ergebnis: assets/galerie/duplex/<name>.webp (640 px breit). Das Original bleibt unverändert und
erscheint auf der Seite beim Überfahren, beim Fokus oder beim Antippen.
Nur zum Bauen nötig (Pillow); die Seite selbst lädt nur die fertigen Bilder.

Aufruf: python3 tools/duplex.py
"""
import json
import subprocess
from pathlib import Path

from PIL import Image, ImageOps

WURZEL = Path(__file__).resolve().parent.parent
ZIEL = WURZEL / "assets" / "galerie" / "duplex"
FARBEN = {
    "lernen": ["#134a47", "#fffffd"],
    "ki": ["#2a2622", "#f2b233", "#fffffd"],
    "beide": ["#134a47", "#f2b233", "#fffffd"],
}


def hex_rgb(h):
    return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))


def verlauf(stufen):
    """256 Farbwerte, linear zwischen den Stufen."""
    farben = [hex_rgb(x) for x in stufen]
    tabelle = []
    abschnitte = len(farben) - 1
    for i in range(256):
        t = i / 255 * abschnitte
        k = min(int(t), abschnitte - 1)
        f = t - k
        a, b = farben[k], farben[k + 1]
        tabelle.append(tuple(round(a[j] + (b[j] - a[j]) * f) for j in range(3)))
    return tabelle


def main():
    daten = json.loads(subprocess.check_output(
        ["node", "-e", "const b=require('./assets/daten/beispiele.js');const g=require('./assets/daten/galerie.js');"
                       "process.stdout.write(JSON.stringify({b:b.map(x=>({id:x.id,bereich:x.bereich})),g}))"], cwd=WURZEL))
    bereich = {x["id"]: x["bereich"] for x in daten["b"]}
    ZIEL.mkdir(parents=True, exist_ok=True)
    n = 0
    for pid, ansichten in daten["g"].items():
        tab = verlauf(FARBEN.get(bereich.get(pid), FARBEN["lernen"]))
        lut = [c[0] for c in tab] + [c[1] for c in tab] + [c[2] for c in tab]
        for a in ansichten:
            quelle = WURZEL / a["bild"]
            bild = Image.open(quelle).convert("L")
            bild = ImageOps.autocontrast(bild, cutoff=1)
            bild = bild.resize((640, round(640 * bild.height / bild.width)), Image.LANCZOS)
            farbig = Image.merge("RGB", (bild, bild, bild)).point(lut)
            farbig.save(ZIEL / quelle.name, "WEBP", quality=72, method=6)
            n += 1
    print(f"Duplex-Vorschauen: {n} Bilder in {ZIEL.relative_to(WURZEL)}")


if __name__ == "__main__":
    main()
