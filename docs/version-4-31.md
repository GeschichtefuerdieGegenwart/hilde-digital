# Version 4.31 – Werkzeugkiste 0.5.0: Lesen und Strukturlegen

Stand: 11. November 2026 · Branch `aufgaben-lesen`

Grundlage: Auftrag Mario, 11.11.2026 – »Recherchiere vorher die Quellen, insbesondere zum Lesekompetenzerwerb, und aktualisiere danach die Skills«. Vorhaben im Tresor: »Aufgabenmethodik weiterentwickeln« (Aufgaben zur Lesekompetenz; Strukturlegetechniken digital).

## Neu

- **Referenz `werkzeugkiste/kidu/skills/lernmethode-einfuehren/references/lesen-und-strukturlegen.md`:** Lesekompetenz in drei Ebenen (Rosebrock & Nix), Ausgangslage PISA 2022, Strategietrainings (Mayer & Marks 2019; Reziprokes Lehren), Fünf-Schritt-Lesemethode, »Vorher – während – nachher« (LeseNavigator Berufsschulen), Deeper Reading, Markieren (Dunlosky u. a. 2013; Ponce, Mayer & Méndez 2022), Papier oder Bildschirm (Delgado u. a. 2018; Altamura u. a. 2023), Begriffsnetze und Struktur-Lege-Technik (Schroeder u. a. 2018; Fiorella & Mayer 2016; Scheele & Groeben 1984; Wahl 2001), acht Faustregeln, was das Gerät hier wirklich besser kann. Belegstand in vier Stufen, offene Angaben benannt.
- **`lernmethode-einfuehren` v1.2:** Tabelle »Texte erschließen« und »Verständnis aufbauen« erweitert, Haltung und Kurzfassung mit Regeln zu Lesen und Strukturlegen.
- **`unterricht-digitalisieren` v4.4:** Lese-Kriterium geschärft (Selbstüberschätzung, Tiefenaufgabe), neuer Punkt »Lesen und Strukturlegen« in Schritt 5, zwei Regeln in der Kurzfassung.
- **`digital-check` v1.3:** zwei typische Schwächen – Leseaufgabe ohne Weg, Legeaufgabe ohne Beziehungen (auch im Prüf-Auftrag).
- Plugin »kidu« 0.5.0; Downloads, Kurzfassungen und Prüf-Auftrag neu erzeugt (`tools/werkzeugkiste.py`).

Noch nicht gebaut: neue Unterrichtsmuster zu Lesen und Strukturlegen – Vorschläge stehen im Claude-Dokument »Aufgabenrepertoire – Lesen und Strukturlegen«.

## Geprüft

`python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – Ergebnis im Pull Request.
