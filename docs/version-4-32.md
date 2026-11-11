# Version 4.32 – Aufgabenkoffer, Methodenkoffer, sechs Prinzipien

Stand: 11. November 2026 · Branch `aufgabenkoffer`

Grundlage: Auftrag Mario, 11.11.2026 – ein »Aufgabenkoffer« unter den Werkzeugen von »Digitaler Unterricht« (»welche Aufgaben kann ich wie stellen und was könnte damit gefördert werden … jeweils bewertet mit was macht da Sinn, was macht wenig Sinn«), abgeleitet aus den Prinzipien, der Recherche zu Lesen und Strukturlegen (4.31) und den Erfahrungen aus den Projekten; dazu die Werkzeugkiste entdoppeln (»fünfmal Aufträge zum Kopieren und zweimal Unterricht digitalisieren … unübersichtlich«).

## Aufgabenkoffer (`aufgabenkoffer.html`)

- 18 Aufgabenformen in sieben Zielen: Wissen festigen · Ordnen und verbinden · Texte erschließen · Untersuchen und ausprobieren · Entscheiden und urteilen · Erklären und zeigen · Den eigenen Weg steuern.
- Jede Aufgabe als Zeile zum Aufklappen: was die Lernenden tun · sinnvoll · wenig sinnvoll · auf Papier · am Gerät mit Prinzip (oder »keines der sechs«) · Faustregel · »Aus dem Unterricht« · Belegstand.
- Ort als Marke: »meist Papier« · »Papier und Gerät« · »Gerät lohnt sich oft« – ausdrücklich kein Rang.
- »Aus dem Unterricht« stammt aus dem Tresor (Erfahrungen aus Erprobungen, Nach-der-Stunde-Notizen Politik-Werkstatt 08.11. und Psycho-Labor 06.11., Lernmappe und Lernübersicht, Projektnotizen): persönliche Beobachtung, kein Wirksamkeitsnachweis; Unbekanntes heißt »noch offen«. Drei Aufgaben sind »noch nicht erprobt« (Struktur legen, Lesen in drei Schritten, Erklärvideo).
- Belege nur aus der Recherche von 4.31 (Dunlosky u. a. 2013, Ponce u. a. 2022, Delgado u. a. 2018, Mayer & Marks 2019, Schroeder u. a. 2018, Fiorella & Mayer 2016); zehn Aufgaben tragen »noch offen«. Quellen als Text ohne Link (Regel: keine fremden Links).
- Daten in `assets/daten/aufgaben.js`, Darstellung in `assets/aufgabenkoffer.js`, Test `tests/aufgaben.test.js`. Speichert nichts.
- Verlinkt: erste Zeile im Register »Alle Werkzeuge« auf `unterricht.html`; Verweis auf `muster.html`.
- Offen und auf der Seite benannt: Für »Ein Erklärvideo erstellen«, »Struktur legen« und »Einen Film selbst steuern« passt keines der sechs Prinzipien – ob ein Prinzip fehlt, ist noch offen.

## Methodenkoffer (bisher »Werkzeugkiste«)

- Statt acht Zeilen, in denen »Aufträge zum Kopieren« fünfmal und »Unterricht digitalisieren« zweimal stand: drei Werkzeuge, jedes einmal, darunter die Anleitungen mit Namen, Zweck und Fassung.
- Einleitung und Überschrift in einfacher Sprache neu gefasst.

## Neue Namen (Entscheidung Mario, 11.11.2026)

- **Die »sechs Hebel« heißen »sechs Prinzipien«** – überall im sichtbaren Text (Seite »Wann funktioniert digitaler Unterricht?«, Rad, Register, Film, Bereichsseite, Aufgabenkoffer, Über Kidu). Aus »Hebelrad« wird »Prinzipienrad«, aus »Keiner davon« »Keines davon«.
- **Die »Werkzeugkiste« heißt »Methodenkoffer«** – Seitentitel, Fußzeile, alle Verweise, Einstiegs-Skill und Plugin-README.
- Adressen und Ordner bleiben, damit alte Links und Downloads gültig bleiben: `sechs-hebel.html`, `werkzeugkiste.html`, `werkzeugkiste/`, `tools/werkzeugkiste.py`, Sprungmarken `#sh-…`.
- Ältere Versionsnotizen unter `docs/` behalten die alten Namen.

## Geprüft

`python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – Ergebnis im Pull Request.
