# Hilde Digital (Arbeitstitel)

Ideen für KI und digitalen Unterricht. Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `src/*.html` | Inhalt der Seiten (ohne Kopf- und Fußzeile) |
| `tools/bauen.py` | setzt Kopfzeile, Inhalt und Fußzeile zu fertigen Seiten zusammen |
| `tools/pruefen.py` | prüft Kennzeichnung, Fachbegriffe, Platzhalter, externe Dateien |
| `assets/hilde.css` | Gestaltungssystem (Farben, Schrift, Bausteine) |
| `assets/beispiele.js` | alle Praxisbeispiele an einem Ort |
| `assets/fonts/` | Atkinson Hyperlegible, SIL Open Font License (OFL.txt) |
| `assets/bilder/` | Bildschirmfotos der Beispiele, auch für den Betrieb ohne Netz |

## Arbeiten

```
python3 tools/bauen.py
python3 tools/pruefen.py
```

Die fertigen Seiten (`index.html`, `ki.html`, `lernen.html`, `beispiele.html`, `gestaltung.html`) lassen sich ohne Server direkt im Browser öffnen.

## Bilder

Die Bildschirmfotos zeigen eigene Unterrichtsmaterialien. Die Folien der Anleiter*innen-Präsentation sind ohne Kopf- und Fußzeile zugeschnitten (kein Logo, keine Namen).
