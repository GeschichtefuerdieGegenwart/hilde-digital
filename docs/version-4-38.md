# Version 4.38 – Skills und Gestaltungsregeln nach der Sichtung

Stand: 13. November 2026 · Branch `teil6-skills-4-38` · Teil 6 des Auftrags »Digitaler Unterricht in Kidu – Sichtung, Didaktikanalyse, neue Grundlogik, Skills«

Grundlage: Entscheidungen Mario am Haltepunkt 1 (Fassung B für die ganze Einheit, neue Phasennamen, elf Gestaltungsregeln, Startbildschirme auf Bildschirmbreite) und am Haltepunkt 2 (Freigabe aller Empfehlungen). **Zur Freigabe an Haltepunkt 3** – zusammengeführt wird erst danach.

## Neu

- **Plugin »kidu« 0.6.0** (`werkzeugkiste/kidu/`, eine Quelle für die Website):
  - `unterricht-digitalisieren` v4.5: ganze Einheit mit Schritt E »Landkarte der Einheit« (derselbe Wortlaut wie `taxonomien.js`, `einheit.schritte`), Umfang je Stunde, Einheit im Übergabeblock; zwei Wege in der Weiche (Unterricht neu planen · Bisherigen Unterricht digitalisieren); Prüfraster »Lehrfunktion je Phase« mit den neuen Phasennamen, Modelle und Belegstand in der neuen Referenz `references/lehrfunktionen.md`; Gestaltung als eigener Prüfblock. Kurzfassung: drei neue Regeln.
  - `digital-check` v1.4: zwei Prüfblöcke, getrennt eingeschätzt – Didaktik (neu: Prüffragen je Lehrfunktion, bei mehreren Stunden »Hat jede Stunde ihren eigenen, begründeten Umfang?«) und Gestaltung (zehn Prüffragen zu den elf Regeln). Typische Schwächen aus der Sichtung. Kurzfassung mit neuer Liste »Gestaltung«.
  - `kidu-start` v3.2: neue Wege und Namen, die vier Phasen der Website mit den passenden Skills.
  - `lernmethode-einfuehren` v1.3: »Sichern und üben – mit Methode« (festhalten, üben, später wieder abrufen).
  - `ki-kompetenz-kollegium` v2.2: Kidu als Fortbildungsplattform, »Mein Fortbildungsbogen« vorher, »Mein Rückmeldebogen« danach.
- **Digital-Check, Weg »Mit KI prüfen«:** Der Prüf-Auftrag hat einen eigenen Abschnitt »Gestaltung – ein eigener Prüfblock« aus der neuen Liste des Skills; die Regeln zu Ruhe, Klickweg und Zwischenstand stehen jetzt dort statt unter »Regeln«. Bei Material auf Papier entfällt der Block. `tools/werkzeugkiste.py` liest die Liste »Gestaltung« (`assets/pruef-prompt.js`, drei neue Tests).
- **Kurzfassung von `lernseite-bauen`** (öffentliche Kopie, Stand v2.3): Seiten einer Einheit, Ergebnisse als Datei, keine Lösungen in der Seite für Lernende. Gilt, sobald Mario die Skill-Karte speichert.
- **`DESIGN.md`:** elf benannte Gestaltungsregeln – Brightest-Spot, Screen-Width, One-Order, Line-to-Target, Three-Tap, Device-Switch, Locked-from-Start, Input-First (mit der einzigen Liste erlaubter Ausnahmen von »kein Autoplay«), Quiet Work, Operating-Line, Same-Face – je mit dem Stand in Kidu. Abgleich mit dem Code: Aktion #2B2A24, Text #201F1D, Breiten 76 und 112 rem, Kontraste neu gerechnet; als gestrichen oder ersetzt markiert: Fächer und Bühne der fünf Sätze (4.36), Leitkachel (4.36), Kennzahlen (auf keiner Seite), dunkle Ansicht (nie umgesetzt). Kurzfassung für Lernseiten: richtige Farben (Petrol #2F5D62 statt Moosgrün, Text #201F1D) und fünf neue Regeln.
- `assets/hilde.css`: nur drei Kommentare mit falschen Kontrastwerten berichtigt, keine Gestaltungsänderung. `gestaltung.html`: zwei veraltete Sätze (Fächer, Kennzahlen auf der Startseite).

## Noch offen

- Drei Bewegungen laufen beim Erscheinen ohne Eingabe (Leporello der Einblicke, »Vom Blatt zum Tablet«, Stundenlinie auf der Detailseite und in »Zum Anfangen«) – nach der Input-First Rule still stellen oder als Ausnahme aufnehmen.
- Screen-Width Rule: Startseite, KI-Training und Unterrichtsbeispiele nutzen noch die normale Breite.
- Die Gestaltungsfragen stehen im Skill und im Prüf-Auftrag, nicht im Selbstcheck der Website (dort weiter die vier Fragen seit 4.18).
- Private Skills (»kidu-bau«): Vorschläge über Skill-Karten; der Ordner `kidu-bau` auf dem Desktop muss danach nachgezogen werden.
- Film auf der Startseite: Er nennt noch die »Galerie« (`assets/film-buehne.js`, erzeugt) – Stand lassen oder neu erzeugen.
- `.impeccable/design.json` trägt noch die Farben vor 4.26 – neu erzeugen mit Impeccable.

## Geprüft

Siehe Pull Request.
