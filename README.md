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
| `assets/regeln.js` | Regeln der Entscheidungskarte, kommentiert |
| `assets/hilde.js` | gemeinsame Helfer: Speichern im Browser, Karten |
| `tests/` | Unit-Tests (`node --test`) und Browser-Tests (`tests/e2e.py`) |
| `docs/` | Annahmen, Datenschutz, Datenlücken zur Prüfung |
| `assets/fonts/` | Atkinson Hyperlegible, SIL Open Font License (OFL.txt) |
| `assets/bilder/` | Bildschirmfotos der Beispiele, auch für den Betrieb ohne Netz |

## Arbeiten

Ein Befehl baut und prüft alles:

```
python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py
```

Die Browser-Tests brauchen Python Playwright mit Chromium. Für die Prüfung mit axe-core `axe.min.js` nach `tests/vendor/` legen (nicht im Repository).

Nach Änderungen an den Beispielen: `python3 tools/datenluecken.py` aktualisiert `docs/datenluecken.md`.

Die fertigen Seiten (`index.html`, `ki.html`, `tablets.html`, `showroom.html`, `beispiel.html`, `ueber.html`, `gestaltung.html`) lassen sich ohne Server direkt im Browser öffnen.

## Bilder

Die Bildschirmfotos zeigen eigene Unterrichtsmaterialien. Die Folien der Anleiter*innen-Präsentation sind ohne Kopf- und Fußzeile zugeschnitten (kein Logo, keine Namen).
