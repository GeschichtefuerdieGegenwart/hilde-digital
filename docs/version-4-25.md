# Version 4.25 – Werkzeugkiste: eine Quelle für alles

Stand: 10. November 2026 · Branch `werkzeugkiste` (auf 4.24 »Mein Startpunkt« aufgesetzt)

Entscheidung Mario (10.11.2026): Die Skills sollen in den Werkzeugen von Kidu wirken, nicht nur als Download. Vorrang haben die kopierbaren Aufträge, weil sie in jedem freigegebenen KI-System laufen. Die Skills selbst gibt es für Fortgeschrittene in einer Werkzeugkiste. Eine Quelle für alles: Gepflegt wird nur im Skill. Das Plugin heißt jetzt »kidu«, das Bau-Plugin »kidu-bau« bleibt privat.

## Neu

- **Plugin »kidu« 0.4.0 im Repository** (`werkzeugkiste/kidu/`, vorher »hilde-digital« 0.3.0 auf dem Rechner des Urhebers): umbenannt, Einstieg `kidu-start` statt `hilde-digital-start`, nicht mehr an eine Schule gebunden. Die Papierprobe in `unterricht-digitalisieren` heißt weiter so.
- **Abschnitt »Kurzfassung für Kidu«** in sieben Skills. `tools/werkzeugkiste.py` überträgt ihn nach `assets/daten/kurzfassungen.js`:
  - *Unterricht digitalisieren:* neuer Abschnitt »Vorgehen« im Prompt (Verlaufsplan Zeile für Zeile, eine Stelle wählen, keine Mischform, ehrliche Zeit, zwei Prüflisten, Beobachtungsfragen).
  - *Unterricht digitalisieren, Ausgabe »Lernseite als eine HTML-Datei«* (neu): die Bauregeln aus dem privaten Skill `lernseite-bauen` und die Gestaltungsregeln aus `DESIGN.md` (neuer Abschnitt »Kurzfassung für Kidu«).
  - *Digital-Check, Mit KI prüfen:* neuer Abschnitt »Typische Schwächen – prüfe gezielt«.
  - *Aufträge zum Kopieren:* die vier Aufträge kommen jetzt aus den Skills; neu der fünfte, »Eine KI-Fortbildung im Kollegium planen« aus `ki-kompetenz-kollegium`.
  - Unter jedem Auftrag steht, aus welcher Fassung der Anleitung er stammt.
- **Werkzeugkiste** (`werkzeugkiste.html`, im Fuß und von KI-Training und Digitaler Unterricht verlinkt): welche Anleitung in welchem Werkzeug steckt; Downloads: das Plugin als Zip, jede Anleitung einzeln, die Gestaltungsregeln; eine kurze, anbieterneutrale Anleitung zum Hochladen; F13 und AIS.chat mit »noch offen«.
- **Prüf-Auftrag ohne Abschrift:** `docs/pruef-auftrag.md` und die Kopie im Skill `digital-check` werden aus `assets/pruef-prompt.js` erzeugt. Beide waren seit Version 4.18 hinter der Seite zurück (vier Regeln, ein Risiko-Satz).
- **Lizenz:** `werkzeugkiste/kidu/LIZENZ.md` nennt die Lizenz je Skill; `LICENSE-TEXTE.md` verweist darauf (keine neue Lizenz – die drei CC-BY-SA-Skills standen schon so auf der Website).
- `tools/pruefen.py` meldet veraltete Kurzfassungen oder Downloads, alte Namen im Plugin außerhalb der Versionsgeschichte und Anbieternamen in Kurzfassungen. Neue Unit-Tests `tests/kurzfassungen.test.js`, neue Browser-Tests für Werkzeugkiste, Prompt und Prüf-Auftrag.

## Bewusst nicht gemacht

- Das Bau-Plugin »kidu-bau« liegt nicht im Repository und wird nicht angeboten.
- Keine Anbieternamen in Texten und Aufträgen. Die Anleitung zum Hochladen spricht von »Skills«, »Plugins« oder »Erweiterungen«.
- Ob F13 oder AIS.chat Skills laden können, ist nicht geprüft und steht als »noch offen« da.

## Offen

- Pilot mit zwei bis drei Kolleg*innen: Kommt der längere Prompt in »Unterricht digitalisieren« mit einem freigegebenen KI-System gut zurecht?
- Ob Kolleg*innen Plugins hochladen dürfen, klärt die Schulleitung.
- Die Website liegt unter GitHub Pages; ob die Zip-Dateien dort wie erwartet heruntergeladen werden, zeigt erst der Aufruf nach dem Zusammenführen.

## Geprüft

`python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – Ergebnis im Pull Request.
