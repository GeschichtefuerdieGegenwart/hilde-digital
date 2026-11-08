# Version 4.18 – Fünf Sätze, Prüffragen aus der Erprobung, Selbstprobe

Stand: 8. November 2026 · Branch `fuenf-saetze-und-schnittstellen`

Grundlage: Analyse »Guter digitaler Unterricht – Regelbestand und Schnittstellen der Papierprobe« (Claude-Dokument, 8.11.2026) aus dem Arbeitsgedächtnis des Projekts: die Erprobungen der Politik-Werkstatt und des GGK-Labors vom 8.11.2026, der Baustein »Digitale Didaktik – Prinzipien und Fachgrenzen«, die Skills `signatur-design` v7 und `bewegung-als-lernmittel` v2. Auftrag Mario: »führe alle notwendigen Änderungen durch«.

Status der fünf Sätze: **Entwurf** – aus dem Bestand verdichtet, von Mario gesehen, nicht beschlossen. Alle Seiten kennzeichnen das.

## Neu

- **Seite »Guter digitaler Unterricht in fünf Sätzen«** (`fuenf-saetze.html`, Bereich Digitaler Unterricht): statisches Schaubild (fünf Karten auf der Stundenlinie, Band »Immer«) und »Der Weg durch die Stunde« als Scrollytelling mit fester Bühne (Muster Q in `DESIGN.md`). Verlinkt von »Digitaler Unterricht«, »Leitsätze« und »Über Papierprobe«.
- **Digital-Check:** vier neue Rahmenfragen (`assets/daten/qualitaet.js`), nur bei digitalem Material: Bewegung ohne Handlung · Tipps bis zur ersten eigenen Antwort · Zwischenstand, Zurücknehmen, Weitermachen (nur Quiz, Simulation, HTML-Lernumgebung, Lernpfad, Entscheidungstool) · Ergebnisse außerhalb des Browsers. Je ein Entwicklungsschritt in `assets/check-regeln.js` (mit Tests). Risiko-Sätze von »Anschaulich darstellen« und »Orientierung« ergänzt; zwei beratende Fragen dazu.
- **Prüf-Auftrag (Weg B):** vier Regeln dazu – Erst Ruhe, dann Bewegung · Erst denken, dann zeigen · den Weg zählen · Zwischenstand und Sicherung (`assets/pruef-prompt.js`, Test).
- **Unterricht digitalisieren:** der Prompt trägt vier der fünf Sätze als Regeln (`assets/digitalisieren-prompt.js`, Test); vor dem Regler »Vom Blatt zum Tablet« steht eine Frage.
- **Tablet-Phasen gut führen:** drei Stolpersteine aus den Erprobungen (interaktiver Film ohne Hinweis, viele Karten sortieren, viele neue Seiten); »Geteilte Geräte« nennt den Browser-Speicher; Abschnitt »Ein Vorschlag, noch nicht erprobt«: Erst ohne Gerät erinnern.
- **Nach der Stunde:** zwei freiwillige Fragen am Ende (gilt das nur im Fach oder überall? wo würde es brechen?), nicht gespeichert.
- **Unterrichtsmuster:** elf statt neun – »Übersicht statt Klickstrecke« (GGK-Labor) und »Sortieren mit Zwischenstand« (Politik-Werkstatt), beide »eingesetzt«.
- **Galerie, Politik-Werkstatt:** Beobachtungsbogen vom 8.11.2026 liegt vor; persönliche Beobachtung; neues Feld `nachgeschaerft` (Datum, Änderungen) mit eigenem Abschnitt auf der Detailseite.

## Selbstprobe

- **Einflug beim Scrollen gestrichen** (seit 4.2): Bewegung beim bloßen Lesen widerspricht Satz 4. `hilde.js` setzt die Klassen nicht mehr; Stile bleiben als Dokumentation.
- Vier benannte Bewegungsregeln und das Token `--dauer-uebergang` 320 ms in `DESIGN.md`.
- Offen, nicht geändert: Startseite mit Film und Fächer (zwei Momente, der Fächer gleitet dort nur von Hand), Fächer der Galerie mit einem Durchlauf ohne Handlung – Entscheidung Mario.

## Nicht geändert

- Die zehn Leitsätze und ihr Thesenbogen (Druck auf einer Seite) bleiben; die fünf Sätze stehen auf einer eigenen Seite.
- Status, Titel und Links der Beispiele.
- `auftraege.html` (Kurzfassungen der Skills): wartet auf PR 23.

## Geprüft

`python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – Ergebnis im Pull Request.
