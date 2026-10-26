#!/usr/bin/env python3
"""Schreibt docs/datenluecken.md neu: alle markierten Vorschläge und leeren Felder je Beispiel.

Aufruf:  python3 tools/datenluecken.py   (nach jeder Änderung an assets/daten/beispiele.js)
"""
import json
import subprocess
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
FELDER_OFFEN = [("lernaktivitaeten", "Was tun die Lernenden?"), ("lernmehrwert", "Lernmehrwert in eigenen Worten"),
                ("technik", "Was wird benötigt?"), ("anpassungen", "Nötige Anpassungen"),
                ("stolpersteine", "Stolpersteine"), ("dauer", "Dauer"), ("vorbereitung", "Vorbereitungsaufwand"),
                ("sozialformen", "Sozialform"), ("kiEinsatz", "KI-Einsatz"), ("link", "Link")]
NUR_LERNEN = {"lernaktivitaeten", "lernmehrwert", "anpassungen", "sozialformen"}


def main():
    skript = ("const t=require('./assets/daten/taxonomien.js');const b=require('./assets/daten/beispiele.js');"
              "process.stdout.write(JSON.stringify({t,b}))")
    d = json.loads(subprocess.run(["node", "-e", skript], cwd=WURZEL, capture_output=True, text=True, check=True).stdout)
    tax, beispiele = d["t"], d["b"]
    name = lambda liste, i: next((x["name"] for x in tax[liste] if x["id"] == i), i)
    listen = {"phasen": "phasen", "rollen": "rollen", "mehrwerte": "mehrwerte", "anliegen": "anliegen"}

    z = ["# Datenlücken und Vorschläge zur Prüfung", "",
         "Diese Datei entsteht mit `python3 tools/datenluecken.py` aus `assets/daten/beispiele.js`. Nicht von Hand bearbeiten.", "",
         "**So bestätigst du einen Vorschlag:** In `assets/daten/beispiele.js` beim Beispiel den Feldnamen aus `vorschlag` entfernen. "
         "Passt die Zuordnung nicht, den Wert ändern und den Feldnamen ebenfalls entfernen. Danach dieses Skript erneut ausführen.", "",
         "**Leere Felder** zeigt die Oberfläche als »noch offen«. Ergänze sie nur mit Angaben, die du selbst belegen kannst.", "",
         "## Zuordnung der bisherigen Kategorien zu den Anliegen", "",
         "| bisher | jetzt |", "| --- | --- |"]
    for alt, neu in [("Interesse wecken", "Interesse & Motivation"), ("etwas ausprobieren", "Erkunden & entdecken"),
                     ("Zusammenhänge verstehen", "Verstehen & vertiefen"), ("Wissen erarbeiten", "Verstehen & vertiefen"),
                     ("gemeinsam arbeiten", "Zusammenarbeiten"), ("recherchieren und prüfen", "Recherchieren & prüfen"),
                     ("üben und festigen", "Üben & anwenden"), ("Rückmeldung erhalten", "Rückmeldung geben"),
                     ("Leistung feststellen", "Leistung erfassen"), ("Material verbessern", "Material verbessern"),
                     ("Konferenzen strukturieren", "Konferenzen und Abläufe strukturieren")]:
        z.append(f"| {alt} | {neu} |")
    z += ["", "Die Anliegen sind aus den bisherigen Kategorien übernommen und deshalb nicht als Vorschlag markiert. "
          "»Wissen erarbeiten« und »Zusammenhänge verstehen« fallen beide unter »Verstehen & vertiefen«.", "",
          "## Je Beispiel", ""]
    for b in beispiele:
        z.append(f"### {b['titel']} (`{b['id']}`)")
        z.append("")
        vorschlaege = {f: an for f, an in (b.get("vorschlag") or {}).items() if an}
        if vorschlaege:
            z.append("Vorschläge zum Prüfen:")
            for f, an in vorschlaege.items():
                wert = b.get(f)
                if isinstance(wert, list):
                    text = ", ".join(name(listen.get(f, f), w) if f in listen else w for w in wert)
                else:
                    text = name("umfang", wert) if f == "umfang" else str(wert)
                z.append(f"- [ ] {f}: {text}")
                if isinstance(an, str):  # Begründung aus der Quelle (Wert statt true)
                    z.append(f"  - Begründung: {an}")
        else:
            z.append("Keine offenen Vorschläge.")
        offen = [titel for f, titel in FELDER_OFFEN
                 if not b.get(f) and not (b["bereich"] == "ki" and f in NUR_LERNEN)]
        if offen:
            z.append("")
            z.append("Noch offen: " + ", ".join(offen) + ".")
        z.append("")
    (WURZEL / "docs" / "datenluecken.md").write_text("\n".join(z), encoding="utf-8")
    print("geschrieben: docs/datenluecken.md")


if __name__ == "__main__":
    main()
