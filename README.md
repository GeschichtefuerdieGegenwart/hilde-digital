# Hilde Digital (Arbeitstitel)

Ideen für KI und digitalen Unterricht. Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `src/*.html` | Inhalt der Seiten (ohne Kopf- und Fußzeile) |
| `tools/bauen.py` | setzt Kopfzeile, Inhalt und Fußzeile zu fertigen Seiten zusammen |
| `tools/pruefen.py` | prüft Kennzeichnung, Fachbegriffe, Platzhalter, externe Dateien |
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

## Bilder

Die Bildschirmfotos zeigen eigene Unterrichtsmaterialien. Die Folien der Anleiter*innen-Präsentation sind ohne Kopf- und Fußzeile zugeschnitten (kein Logo, keine Namen).
