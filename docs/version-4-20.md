# Version 4.20 – Jeder Hebel zum Ausprobieren

Stand: 9. November 2026 · Branch `sechs-hebel-kniffe`

Grundlage: Musterbuch »Kniff-Proben S bis X« (zwei Runden, 9.11.2026). Entscheidungen Mario: alle sechs Proben, weiter verbessert; im Codewort-Schritt der Satz »Die Lehrkraft schreibt ein Codewort an die Tafel«; Messen **ohne** Bündeln der Klasse (der Kursvergleich per QR hat in der Erprobung nicht gut funktioniert). Skills `signatur-design` v7.1 (4a: Zustandswechsel), `bewegung-als-lernmittel` v2.1, `website-design-workflow`.

## Neu

- **Die sechs Hebel als Bänder** auf `sechs-hebel.html`: links der Hebel mit Galerie-Beispiel, rechts seine Probe (Muster S bis X in `DESIGN.md`, Skript `assets/sechs-hebel-proben.js`):
  - **S Verdecken** – Entscheidung, Sicherheit, Codewort von der Tafel, drei Schwärzungen lösen sich, Rückblick-Frage.
  - **T Rückmelden** – drei Fälle, gestufte Rückmeldung am Ort, Zwischenstand, Zurücklegen.
  - **U Messen** – Vorhersage, drei Durchgänge mit verdeckter Uhr, Messpunkte, Streuung, Vergleich.
  - **V Variieren** – Vermutung, Hürde verschieben, Balken mit Hürdenlinie, zehn Sitze, Stimmen unter der Hürde.
  - **W Stufen** – drei Lesetiefen am selben Ort, Neues unterlegt, Denkfrage je Stufe.
  - **X Bündeln** – eigene Stimme ins Halbrund, die Klasse vor und nach dem Gespräch (Beispielwerte).
- Token `--dauer-aufdecken` 360 ms; `--dauer-flug` auch für die eigene Stimme in X.
- »Über Papierprobe«: Eintrag »Jeder Hebel zum Ausprobieren«; README.

## Regeln, die eingehalten sind

Erst festlegen, dann zeigen (jede Probe) · ein großer Moment je Seite (R1; die Proben sind Zustandswechsel) · Zahl und Wort neben jedem Bild · Beispielwerte heißen Beispiel · keine Parteifarben, keine dritte Akzentfarbe · Tastatur und »Weniger Bewegung« ohne Bewegung · ohne JavaScript Vertiefungen statt Bedienteilen · nichts gespeichert.

## Geprüft

`python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – Ergebnis im Pull Request. Neue Browser-Tests (2k) je Probe: ohne Festlegung keine Auflösung, Zustandswechsel nach der Festlegung, Zurücklegen, Leertaste, Rastpunkte, Zurücknehmen der Stufen, Beispiel-Kennzeichnung, weniger Bewegung, 390 px, ohne JavaScript.
