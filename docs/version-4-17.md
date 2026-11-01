# Version 4.17 – Film beim Besuch, Startseite mit den drei Wegen

Stand: 1. November 2026 · Branch `startseite-film-trias`

Grundlage: Rückmeldung Mario, 1.11.2026 (»Man erkennt gar nichts mehr«) mit Freigabe zum Umsetzen und Zusammenführen.

## Geändert

- Film: läuft bei jedem neuen Besuch einmal (gemerkt nur für die Sitzung, `sessionStorage`), nicht mehr nur beim allerersten. Am Ende »Film nochmal ansehen« oder »Zur Startseite«. Während des Films weiter Anhalten, Überspringen, Esc. Nie bei »Weniger Bewegung«.
- Film startet nur, wenn das passende Stilblatt geladen ist. Ohne die Filmstile (alte Datei im Zwischenspeicher des Browsers) bleibt die Startseite stehen, statt ungestaltete Filmteile zu zeigen.
- `tools/bauen.py`: Jede eigene CSS- und JS-Datei bekommt einen Prüfwert ihres Inhalts (`?v=…`). Der Browser lädt nach einer Änderung immer die neue Fassung. `tools/pruefen.py` prüft interne Links ohne diesen Zusatz.
- Startseite: nur noch die drei Wege – KI-Training, Digitaler Unterricht, Galerie (mit den drei Ansichten daneben). Die Bänder »Was in den Projekten passiert«, »Was bisher entstanden ist« und »Wie hängen KI-Training und Digitaler Unterricht zusammen?« entfallen auf der Startseite.
- Unterzeile mit etwas mehr Abstand zur Wortmarke; kein Fokusrahmen auf der Überschrift, wenn der Film schließt.
- `src/ueber.html`, `DESIGN.md`, `tests/e2e.py` angepasst.
