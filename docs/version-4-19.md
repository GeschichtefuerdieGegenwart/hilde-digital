# Version 4.19 – Wann funktioniert digitaler Unterricht? Sechs Hebel

Stand: 9. November 2026 · Branch `sechs-hebel`

Grundlage: Ausarbeitung »Wann digitaler Unterricht funktioniert« (Claude-Dokument, 9.11.2026) aus den Lernseiten der Galerie, den Erprobungen seit Oktober und den Rückmeldungen von Lernenden; Entscheidungen Mario vom 9.11.2026 (sechs Hebel; neben den fünf Sätzen; zuerst der Kern als Schaubild); Musterbuch R (Wahl: R1). Skills `signatur-design` v7.1, `bewegung-als-lernmittel` v2.1, `schaubild-design`, `website-design-workflow`.

Status: **Entwurf** – auf der Seite gekennzeichnet, kein Beschluss.

## Neu

- **Seite »Wann funktioniert digitaler Unterricht?«** (`sechs-hebel.html`, Bereich Digitaler Unterricht). Steht neben den fünf Sätzen: die Sätze sind die Haltung, die sechs Hebel das Werkzeug zum Planen. Inhalt:
  - Kopf mit Kernsatz und dem Modell **Gerät – Brücke – Raum** als ruhigem Schaubild; am Beamer (1280 × 720) mit erstem Knopf ohne Scrollen.
  - **Probe R1 »Probier es an deiner Stunde«**: Hebel antippen, dann »Ins Plenum« – der eine bewegte Moment der Seite (Muster R in `DESIGN.md`).
  - **Die sechs Hebel**: verdecken · rückmelden · messen · variieren · stufen · bündeln – je Wofür, ein erprobtes Beispiel aus der Galerie und »Ohne Gerät«.
  - **Drei Regeln**: Der Umfang folgt dem Hebel (drei ruhige Stundenlinien mit Gene ohne Reisepass, M19, Politik-Werkstatt; Schema) · Beim Urteilen schweigt das Gerät (Rückmeldung wechselt ihre Form; Fachbegriffe in einer Vertiefung) · Wissen und Können getrennt sichern.
  - **Was Lernende gesagt haben** (Politik-Werkstatt 8.11., NS-Einheit 8.11., Psycho-Labor 6.11.; persönliche Beobachtungen) und **Wo das Fach entscheidet** (Vertiefung).
- **Zugang**: schmale Zeile ganz oben unter den Werkzeugen von »Digitaler Unterricht«, über dem Hauptwerkzeug »Unterricht digitalisieren«; Verweise von »Fünf Sätze«, »Leitsätze« und »Über Papierprobe« (»Was ist neu?«, Inhaltsliste).
- **Prüfwerkzeug** (`tools/pruefen.py`, Entscheidung Mario): »Anforderungsbereich«, »Beutelsbacher«, »Binnendifferenzierung« stehen auf der Liste der Fachbegriffe. Auf Einstiegsseiten sind Fachbegriffe in aufklappbaren Vertiefungen (`<details>`) erlaubt – wie `CLAUDE.md` es verlangt –, sonst nicht.

## Bewusst nicht übernommen

- R2 (Regler Gerät → Raum) und R3 (Umfang ziehen) als Bewegung; R3 steht als ruhige Grafik.
- Die Konflikt-Waage (BEF I) als Beispiel: ein Vorhaben, noch nicht gebaut und nicht in der Galerie. Für »punktuell« steht »Gene ohne Reisepass«.
- Die Kniff-Proben je Hebel: kommen mit Version 4.20 (Musterbuch S ff.).

## Geprüft

`python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – Ergebnis im Pull Request. Neue Browser-Tests (2j): Schaubild und Knopf in 1280 × 720, keine Bewegung ohne Festlegung, Flug mit höchstens sechs Elementen, Stand angesagt, »Neu wählen«, »Keiner davon«, Tastatur ohne Flug, weniger Bewegung, 390 px ohne waagerechtes Scrollen (auch während der Bewegung), ohne JavaScript.
