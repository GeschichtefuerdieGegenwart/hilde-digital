# Kidu · Künstliche Intelligenz und digitaler Unterricht

Seit 10. November 2026 heißt das Projekt **Kidu** – Künstliche Intelligenz und digitaler Unterricht. Vorher: »Hilde Digital« (bis 1. November 2026), »Papierprobe« (1.–10. November 2026). Kidu ist nicht an eine Schule gebunden. Repository und Adresse heißen `kidu`.

Ideen für KI und digitalen Unterricht. Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `src/*.html` | Inhalt der Seiten (ohne Kopf- und Fußzeile) |
| `tools/bauen.py` | setzt Kopfzeile, Inhalt und Fußzeile zu fertigen Seiten zusammen |
| `tools/pruefen.py` | prüft Kennzeichnung, Fachbegriffe, Platzhalter, externe Dateien |
| `tools/werkzeugkiste.py` | eine Quelle für alles (ab 4.25): überträgt die »Kurzfassung für Kidu« jedes Skills nach `assets/daten/kurzfassungen.js`, schreibt `docs/pruef-auftrag.md` und packt die Downloads der Werkzeugkiste; läuft in `tools/bauen.py` mit |
| `werkzeugkiste/kidu/` | das Plugin »kidu« für das Kollegium – hier werden die Skills gepflegt |
| `assets/hilde.css` | Gestaltungssystem (Farben, Schrift, Bausteine) |
| `assets/daten/beispiele.js` | alle Beispiele an einem Ort |
| `assets/daten/taxonomien.js` | Phasen, Anliegen, Umfang, Rollen, Mehrwert-Arten, Status |
| `assets/daten/texte.js` | Texte des KI-Wegs: Ziele, Ergebnisformen, Bausteine, Prüflisten |
| `assets/regeln.js` | Regeln der Entscheidungskarte und der Selbsteinschätzung, kommentiert |
| `assets/suche.js`, `assets/ki-anfrage.js` | Suche und Filter in der Galerie, Anfrage-Baukasten |
| `assets/hilde.js` | gemeinsame Helfer: Speichern im Browser, Karten, Bildansicht |
| `tools/duplex.py` | erzeugt die Duplex-Vorschauen der Galerie in `assets/galerie/duplex/` (braucht Pillow, nur beim Bauen) |
| `assets/daten/galerie.js`, `assets/galerie-buehne.js`, `assets/galerie/` | Galerie: echte Ansichten mit Bild- und Alternativtexten, Einblicke; Herkunft in `docs/galerie-quellen.md` |
| `assets/anfangen.js` | Galerie: »Zum Anfangen« – sechs erprobte Beispiele, zwei je Umfang (Feld `auswahl` in `beispiele.js`) |
| `assets/daten/schnell.js`, `assets/schnell-anfrage.js`, `assets/ki-schnell.js` | KI-Training: Schnell-Anfrage für häufige Anlässe |
| `assets/daten/digitalisieren.js`, `assets/digitalisieren-prompt.js`, `assets/digitalisieren.js` | Werkzeug »Unterricht digitalisieren« |
| `assets/faecher.js` | Fächer mit Tiefe (Galerie gleitend, Startseite von Hand) |
| `assets/fuenf-saetze.js` | Seite »Guter digitaler Unterricht in fünf Sätzen«: der Weg durch die Stunde folgt dem Scrollen (ab 4.18) |
| `assets/startpunkt.js` | Seite »Mein Startpunkt«: zwanzig Fragen vor einer Fortbildung, Startpunkt-Karte, drei Schritte, zwei Kniffe, Codeblock für die Leitung, »Als PDF sichern« (ab 4.24) |
| `assets/sechs-hebel-rad.js` | Seite »Wann funktioniert digitaler Unterricht?«: Hebelrad im Kopf – Hebel antippen, Karte wechselt (Muster Y, ab 4.21); das Rad blättert die Bänder als Register, Weiter/Zurück (Z1, ab 4.22) |
| `assets/sechs-hebel-film.js` | Seite »Film: Was das Gerät kann« (`sechs-hebel-film.html`): Erklärfilm in sieben Kapiteln auf einer Zeitachse, Start nur auf Knopfdruck (Muster AW, ab 4.21) |
| `assets/sechs-hebel-proben.js` | Seite »Wann funktioniert digitaler Unterricht?«: Proben S bis X zu den sechs Hebeln – erst festlegen, dann ein Zustandswechsel (ab 4.20) |
| `assets/sechs-hebel.js` | Seite »Wann funktioniert digitaler Unterricht?«: Muster R1 – gewählte Hebel wandern über die Plenumsstelle an die Tafel (ab 4.19) |
| `assets/pruef-prompt.js`, `assets/digital-check.js` | Digital-Check Weg B: Prüf-Auftrag aus dem Qualitätsmodell zum Kopieren in ein freigegebenes KI-System (keine Anbindung) |
| `tests/` | Unit-Tests (`node --test`) und Browser-Tests (`tests/e2e.py`) |
| `docs/` | Versionen 1 bis 4 im Überblick, Herkunft der Galeriebilder, Annahmen, Datenschutz, Datenlücken zur Prüfung |
| `assets/fonts/` | Bricolage Grotesque (Überschriften) und Atkinson Hyperlegible Next (Text), beide SIL Open Font License (OFL-*.txt) |
| `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json` | Produktbeschreibung und Gestaltungssystem »Überdruck« (Format von Impeccable) |
| `.taste-skill/direction.json` | begründete Ausnahmen für die Gestaltungsprüfung mit dem Taste Skill |
| `assets/bilder/` | Bildschirmfotos der Beispiele, auch für den Betrieb ohne Netz |

## Arbeiten

Ein Befehl baut und prüft alles:

```
python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py
```

Die Browser-Tests brauchen Python Playwright mit Chromium. Für die Prüfung mit axe-core `axe.min.js` nach `tests/vendor/` legen (nicht im Repository).

Nach Änderungen an den Beispielen: `python3 tools/datenluecken.py` aktualisiert `docs/datenluecken.md`.

Die fertigen Seiten (`index.html`, `ki.html`, `unterricht.html`, `digital-check.html`, `selbstcheck.html`, `tablets.html`, `passt.html`, `galerie.html`, `beispiel.html`, `mehrwert.html`, `ueber.html`, `gestaltung.html`; `showroom.html` leitet zur Galerie weiter) lassen sich ohne Server direkt im Browser öffnen.

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
