# Version 4.14 – Neuer Name: Papierprobe

Stand: 1. November 2026 · Branch `papierprobe` (baut auf `buettenpapier`, Version 4.13, auf)

Grundlage: Entscheidung Mario, 1.11.2026 – »Papierprobe · Kompass für KI und digitalen Unterricht« ersetzt »Hilde Digital«, auch vor Abschluss der Markenrecherche. Das Werkzeug »Geht es auf Papier genauso gut?« heißt jetzt »Papierfrage« (Entscheidung vom selben Tag).

## Geändert

- Name auf allen Seiten, in Seitentiteln, Kopf, Fuß und Beschreibung: »Papierprobe«; Startseite und Fuß mit Unterzeile »Kompass für KI und digitalen Unterricht« (`.unterzeile`, `.fuss-unterzeile` in `assets/hilde.css`).
- Kennzeichnung in der Fußzeile: »Papierprobe · Kompass für KI und digitalen Unterricht · Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.« (»Arbeitstitel« entfällt).
- Werkzeug »Papierprobe« → »Papierfrage« in Texten, Links und Tests. Code-Namen (`papierprobe()`, `#t-probe`) bleiben.
- `ueber.html`: früherer Name im Abschnitt »Wie Papierprobe entstanden ist«, Eintrag in »Was ist neu?«.
- `tools/pruefen.py`: »Hilde Digital« gilt als alter Name, erlaubt nur auf `ueber.html`; neue Kennzeichnung.
- `tests/e2e.py`: Wortmarke, Unterzeile, kein alter Name auf der Startseite.
- `CLAUDE.md`, `README.md`, `PRODUCT.md`, `DESIGN.md`, `LICENSE-TEXTE.md`, `ENTSTEHUNG.md`, Kopfkommentare der Skripte.

## Bewusst nicht geändert

- Repository und GitHub-Pages-Adresse heißen weiter `hilde-digital` (GitHub Pages wird nicht geändert).
- Frühere Versionsnotizen in `docs/` behalten den damaligen Namen.
- Verlinkte Lernanwendungen, Designsystem »Gegenwart« und Plugin-Skills liegen woanders.

## Noch offen

Markenrecherche (DPMA, EUIPO), Domain; Gespräch mit der Schulleitung zum Fortbildungsauftrag.
