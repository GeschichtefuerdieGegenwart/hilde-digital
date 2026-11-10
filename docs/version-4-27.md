# Version 4.27 – Mein Startpunkt: die Karte füllt sich beim Antworten

Stand: 10. November 2026 · Branch `startpunkt-buehne`

Grundlage: Rückmeldung Mario zu 4.24 (»Layout verändern, dass sie schneller sich orientieren können, dass sie Beispiele kriegen … beim Runterscrollen verändert sich das Tablet nebendran … einmal vormachen, was sie anklicken müssen«). Grammatik aus `fuenf-saetze.html` (feste Bühne, Marke auf der Linie, Reader-Paced) und aus dem Film (Start nur auf Knopfdruck, Standbilder bei weniger Bewegung). Überdruck bleibt das Gestaltungssystem; aus »Gegenwart« kommen nur Grammatik und Regeln (Entscheidung 27.10.2026).

## Neu

- **»So geht es«** oben: drei Karten (Ankreuzen · Karte ansehen · Als PDF sichern) und der Knopf **»Vorführung ansehen (20 Sekunden)«**.
- **Bühne links = die Karte** (`assets/startpunkt-buehne.js`): Linie mit fünf Schritten, die Marke folgt dem Scrollen (Mitte des Bildschirms entscheidet, `aria-live`-Ansage); vier Stanzlöcher Bedienen · Prüfen · Dürfen · Bauen füllen sich sofort mit den Antworten 10–13 (leer · halb · voll, immer mit Wort); Zähler »n von 20 beantwortet«; ab vier Antworten der Satz zur Ausgangslage und die erste Stärke aus `REGELN.startpunkt`; nach dem Fertigstellen ein Link zur vollständigen Karte unten. Nichts läuft von selbst; ohne JavaScript steht die Bühne leer und das Formular ist vollständig.
- **Vorführung**: vier Takte auf der Bühne – Finger tippt eine Antwort, Stanzloch füllt sich, Marke wandert, PDF-Knopf. Start nur auf Knopfdruck, 4,5 s je Takt, »Weiter« und »Vorführung beenden«; bei »weniger Bewegung« vier Standbilder ohne Uhr. Es wird nichts gespeichert, die Vorführung tippt nicht ins Formular.
- **Fünf Abschnitte** mit Überschrift im aktuellen Schritt farbig; **sieben Beispiele** unter den Fragen (»Beispiel: Du hast einmal einen Elternbrief entwerfen lassen … – das ist ›ein- oder zweimal ausprobiert‹«).
- Schmal (unter 900 px): die Bühne wird zur Leiste oben (Linie und vier Stanzlöcher), Sätze ausgeblendet.
- Druck unverändert: nur die fertige Karte (`nur-ergebnis`), eine Seite.

## Regeln, die eingehalten sind

Erst Ruhe, dann Bewegung · Reader-Paced (Marke folgt dem Scrollen) · Visible-at-Rest (ohne JavaScript alles lesbar) · One Moment (die Bühne ist der eine bewegte Moment; die Vorführung läuft nur auf Knopfdruck) · nur `transform`/`opacity`, `--dauer-uebergang` · keine Bewertung, keine Rangfolge · Schrift 16 px.

## Offen

- Erprobung am iPad: Höhe der Leiste oben, Finger-Bedienung der Stanzlöcher.
- Rückblick nach zwei Wochen: Hilft die Vorführung, oder reicht die Leiste »So geht es«?
