# Version 4.21 – Hebelrad und Erklärfilm »Was das Gerät kann«

Stand: 10. November 2026 · Branch `sechs-hebel-rad`

Grundlage: Claude-Design-Canvas »Sechs Hebel – Überblicksgrafik« (9./10.11.2026) mit drei Richtungen (A Setzkastenbrett · B Gerät · Brücke · Raum · C Hebelrad), drei Zuständen, zwei Mockups und dem Storyboard des Films in sieben Standbildern. Entscheidungen Mario: Richtung **C Hebelrad** (9.11.), Drehbuch bestätigt (10.11.), »deine Wahl« in `--lernen-tief` (Empfehlung, zwei Druckfarben bleiben). Skills `schaubild-design` v1, `signatur-design` v7.1, `bewegung-als-lernmittel` v2.1, `website-design-workflow`.

## Neu

- **Hebelrad im Kopf** von `sechs-hebel.html` (Muster **Y** in `DESIGN.md`, `assets/sechs-hebel-rad.js`): Die drei Felder weichen dem Rad – Mitte Gerät, sechs Hebel ohne Reihenfolge, Ring = Plenumsstelle, außen der Raum. Antippen hebt die Kachel auf ihre Platte, die Karte daneben zeigt Satz · Wofür · Beispiel · Ohne Gerät aus dem Band weiter unten. Rechts daneben stehen Einleitungssatz, Karte und die Knöpfe; am Beamer passt alles in 1280 × 720. Ohne JavaScript Sprungmarken und die ganze Karte.
- **Film »Was das Gerät kann«** (`sechs-hebel-film.html`, Muster **AW**, `assets/sechs-hebel-film.js`): sieben Kapitel, zwei Minuten, ein Satz oben je Takt, Kapitelleiste mit »Du bist hier«, Regler, Anhalten, Pfeiltasten. Start nur auf Knopfdruck, davor die Frage »Wann lohnt sich das Tablet?«. Jedes Bild wird aus der Zeit berechnet (wie der Startseiten-Film), darum kann man ziehen und springen. Bei »Weniger Bewegung« sieben Standbilder mit »Weiter«; ohne JavaScript der ganze Text. Knopf »Film: Was das Gerät kann (2 Min.)« im Kopf der Hebel-Seite.
- `tools/bauen.py`, `tools/pruefen.py`: neue Seite und neues Skript eingetragen. »Über Papierprobe«: Eintrag »Das Hebelrad und ein Film«; README.

## Abweichungen vom Prompt (begründet)

- Der Film liegt als eigene Seite im normalen Rahmen, nicht als Tafel im iframe: So trägt er Kopf- und Fußzeile mit der Kennzeichnung und braucht keinen zweiten Rahmen in der Seite.
- Kapitel 4 stellt Variieren in den Vordergrund (Hürden-Bild), Kapitel 3 zeigt Rückmeldung als »Vertretbar – weil …« statt als Treffer.
- Das Rad ist HTML mit Prozentmaßen, kein einzelnes SVG: Jede Kachel ist ein echter Link, am Telefon bleibt es ein Rad.

## Regeln, die eingehalten sind

Erst Ruhe, dann Bewegung (Rad in Ruhe vollständig, Film startet nicht von selbst) · ein großer Moment je Seite (R1 bleibt der Moment der Hebel-Seite; das Rad ist Rückmeldung und Zustandswechsel) · Reader-Paced (Film mit Frage davor, Regler, Anhalten) · zwei Druckfarben (`--lernen`, `--lernen-tief`, kein Kuli-Blau) · Zahl und Wort neben jedem Bild, Beispielwerte heißen Beispiel, Modell heißt Modell · Tastatur und »Weniger Bewegung« ohne Bewegung · ohne JavaScript alles lesbar · nichts gespeichert, nichts aus dem Netz.

## Geprüft

`python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – Ergebnis im Pull Request. Neue Browser-Tests (2l): Rad in Ruhe, 1280 × 720, Antippen und Zurücknehmen, nur ein Hebel gewählt, Tastatur ohne Bewegung, 390 px, ohne JavaScript; Film startet nicht von selbst, Bühne skaliert, Anhalten, Kapitelknopf und Ansage, Pfeiltaste, Beispiel-Kennzeichnung, Ende ohne Schleife, »Noch einmal«, Text unter dem Film, weniger Bewegung als Standbilder, ohne JavaScript.

## Offen

- Übergabe an andere Werkzeuge (Teil 3 des Design-Prompts: Hebel in »Unterricht digitalisieren« und Digital-Check) – eigener Auftrag.
- Standbild des Rads für Handout und Galerie-Vorschau (1200 × 630) aus dem Canvas exportieren.
- Rückblick nach zwei bis drei Wochen: Hilft das Rad beim Verstehen? Wird der Film zu Ende gesehen?
