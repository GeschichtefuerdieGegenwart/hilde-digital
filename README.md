# Kidu · Künstliche Intelligenz und digitaler Unterricht

Seit 10. November 2026 heißt das Projekt **Kidu** – Künstliche Intelligenz und digitaler Unterricht. Vorher: »Hilde Digital« (bis 1. November 2026), »Papierprobe« (1.–10. November 2026). Kidu ist nicht an eine Schule gebunden. Repository und Adresse heißen `kidu`.

Kidu ist eine Fortbildungsplattform für Lehrkräfte: KI-Training, Digitaler Unterricht in vier Phasen (Grundlagen · Digitalen Unterricht erstellen · Unterrichten · Nach der Stunde) und Unterrichtsbeispiele, analog und digital – beides mit KI erstellt. Kidu ist ohne Auftrag einer Schule entstanden. Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `src/*.html` | Inhalt der Seiten (ohne Kopf- und Fußzeile) |
| `tools/bauen.py` | setzt Kopfzeile, Inhalt und Fußzeile zu fertigen Seiten zusammen |
| `tools/pruefen.py` | prüft Kennzeichnung, Fachbegriffe, Platzhalter, externe Dateien |
| `tools/werkzeugkiste.py` | eine Quelle für alles (ab 4.25): überträgt die »Kurzfassung für Kidu« jedes Skills nach `assets/daten/kurzfassungen.js`, schreibt `docs/pruef-auftrag.md` und packt die Downloads des Methodenkoffers; läuft in `tools/bauen.py` mit |
| `werkzeugkiste/kidu/` | das Plugin »kidu« für das Kollegium – hier werden die Skills gepflegt |
| `assets/hilde.css` | Gestaltungssystem (Farben, Schrift, Bausteine) |
| `assets/daten/beispiele.js` | alle Beispiele an einem Ort |
| `assets/daten/taxonomien.js` | Phasen, Anliegen, Umfang, Rollen, Mehrwert-Arten, Status |
| `assets/daten/texte.js` | Texte des KI-Wegs: Ziele, Ergebnisformen, Bausteine, Prüflisten |
| `assets/regeln.js` | Regeln der Entscheidungskarte und der Selbsteinschätzung, kommentiert |
| `assets/suche.js`, `assets/ki-anfrage.js` | Suche und Filter der Unterrichtsbeispiele (`galerie.html`), Anfrage-Baukasten |
| `assets/hilde.js` | gemeinsame Helfer: Speichern im Browser, Karten, Bildansicht |
| `tools/duplex.py` | erzeugt die Duplex-Vorschauen der Unterrichtsbeispiele in `assets/galerie/duplex/` (braucht Pillow, nur beim Bauen) |
| `src/film/`, `tools/film.py`, `assets/film.js` | Film auf der Startseite (ab 4.40 eine Quelle): Bühne in `src/film/buehne.html`, Kapitel, Standbilder, Abschnitte und der Film als Text in `src/film/kapitel.json`; `tools/film.py` erzeugt `assets/film-buehne.js` (nie von Hand ändern, läuft in `tools/bauen.py`); `assets/film.js` spielt ihn ab – Kapitelleiste, Tastatur, »Als Text«; Bilder in `assets/film/` |
| `assets/daten/galerie.js`, `assets/galerie-buehne.js`, `assets/galerie/` | Unterrichtsbeispiele: echte Ansichten mit Bild- und Alternativtexten, Einblicke; Herkunft in `docs/galerie-quellen.md` |
| `assets/anfangen.js` | Unterrichtsbeispiele: »Zum Anfangen« – sechs erprobte Beispiele, zwei je Umfang (Feld `auswahl` in `beispiele.js`) |
| `assets/daten/schnell.js`, `assets/schnell-anfrage.js`, `assets/ki-schnell.js` | KI-Training: Schnell-Anfrage für häufige Anlässe |
| `assets/daten/digitalisieren.js`, `assets/digitalisieren-prompt.js`, `assets/digitalisieren.js` | Werkzeug »Bisherigen Unterricht digitalisieren« |
| `assets/einheit.js` | »Unterricht neu planen«: eine Stunde oder eine ganze Einheit – bei einer Einheit zuerst Schritt E »Landkarte der Einheit« (ab 4.37, Regel `REGELN.einheit`) |
| `assets/phasen-bild.js` | Schaubild »Wo in der Stunde das Gerät hilft« auf `sechs-hebel.html`: Namen und Aufgaben der Phasen aus `taxonomien.js` (ab 4.37) |
| `assets/rueckmeldebogen.js` | Seite »Mein Rückmeldebogen« (ab 4.36): Rückmeldung nach der Stunde als Text zum Kopieren oder als PDF, für die Leitung der Fortbildung; Kidu verschickt nichts |
| `assets/fortbildungsbogen.js` | Seite »Mein Fortbildungsbogen« (seit 4.36 mit dem früheren »Mein Ist-Stand«): Eröffnung in vier Sätzen (einmal je Sitzung), eine Frage je Bild auf einer Fragekarte, Fragen zu KI und zum Unterricht mit Tablets (bedingt), fertiger Bogen mit Karte, Schritten, Kniffen, Codeblock und »Als PDF sichern« (ab 4.29; Fragekarte und Tablet-Fragen seit 4.30) |
| `assets/sechs-hebel-rad.js` | Seite »Wann funktioniert digitaler Unterricht?«: Prinzipienrad im Kopf – Prinzip antippen, Karte wechselt (Muster Y, ab 4.21); das Rad blättert die Bänder als Register, Weiter/Zurück (Z1, ab 4.22) |
| `assets/sechs-hebel-film.js` | Seite »Film: Was das Gerät kann« (`sechs-hebel-film.html`): Erklärfilm in sieben Kapiteln auf einer Zeitachse, Start nur auf Knopfdruck (Muster AW, ab 4.21) |
| `assets/sechs-hebel-proben.js` | Seite »Wann funktioniert digitaler Unterricht?«: Proben S bis X zu den sechs Prinzipien – erst festlegen, dann ein Zustandswechsel (ab 4.20) |
| `assets/sechs-hebel.js` | Seite »Wann funktioniert digitaler Unterricht?«: Muster R1 – gewählte Prinzipien wandern über die Plenumsstelle an die Tafel (ab 4.19) |
| `assets/pruef-prompt.js`, `assets/digital-check.js` | Digital-Check Weg B: Prüf-Auftrag aus dem Qualitätsmodell zum Kopieren in ein freigegebenes KI-System (keine Anbindung); ab 4.38 mit eigenem Block »Gestaltung« aus dem Skill `digital-check` |
| `tests/` | Unit-Tests (`node --test`) und Browser-Tests (`tests/e2e.py`) |
| `docs/` | Versionen 1 bis 4 im Überblick, Herkunft der Galeriebilder, Annahmen, Datenschutz, Datenlücken zur Prüfung |
| `assets/fonts/` | Bricolage Grotesque (Überschriften) und Atkinson Hyperlegible Next (Text), beide SIL Open Font License (OFL-*.txt) |
| `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json` | Produktbeschreibung und Gestaltungssystem »Überdruck« (Format von Impeccable); ab 4.38 mit elf benannten Gestaltungsregeln und der einzigen Liste erlaubter Ausnahmen von »kein Autoplay« |
| `.taste-skill/direction.json` | begründete Ausnahmen für die Gestaltungsprüfung mit dem Taste Skill |
| `assets/bilder/` | Bildschirmfotos der Beispiele, auch für den Betrieb ohne Netz |

## Arbeiten

Ein Befehl baut und prüft alles:

```
python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py
```

Die Browser-Tests brauchen Python Playwright mit Chromium. Für die Prüfung mit axe-core `axe.min.js` nach `tests/vendor/` legen (nicht im Repository).

Nach Änderungen an den Beispielen: `python3 tools/datenluecken.py` aktualisiert `docs/datenluecken.md`.

Die fertigen Seiten (`index.html`, `ki.html`, `unterricht.html`, `digital-check.html`, `selbstcheck.html`, `tablets.html`, `passt.html`, `galerie.html`, `beispiel.html`, `mehrwert.html`, `ueber.html`, `gestaltung.html`; `showroom.html` leitet zu den Unterrichtsbeispielen weiter, `startpunkt.html` und `ist-stand.html` zum Fortbildungsbogen, `fuenf-saetze.html` zu den fünf Sätzen auf `sechs-hebel.html`) lassen sich ohne Server direkt im Browser öffnen.

## Urheberschaft und Lizenz

Konzept, Leitsätze, Kriterien und Texte: Mario Walter. Umgesetzt mit Unterstützung eines KI-Systems. Wer was beigetragen hat, steht in `ENTSTEHUNG.md`.

- Texte und Daten: CC BY-NC-SA 4.0 – frei für Schulen und Fortbildung, nicht kommerziell, mit Namensnennung. Siehe `LICENSE-TEXTE.md`.
- Programmcode: MIT-Lizenz. Siehe `LICENSE`.
- Bilder: alle Rechte vorbehalten. Schriften: SIL Open Font License.
- Der Name ist von keiner Lizenz erfasst. Für eine kommerzielle Nutzung ist eine eigene Vereinbarung nötig.
- Zitiervorschlag: Walter, Mario (2026): Kidu · Künstliche Intelligenz und digitaler Unterricht. https://github.com/GeschichtefuerdieGegenwart/kidu – maschinenlesbar in `CITATION.cff`.
- Stand vor dem Fortbildungsauftrag der Schule (3. November 2026): siehe `docs/stand-2026-11-03.md`.

## Bilder

Die Bildschirmfotos zeigen eigene Unterrichtsmaterialien. Die Folien der Anleiter*innen-Präsentation sind ohne Kopf- und Fußzeile zugeschnitten (kein Logo, keine Namen).
