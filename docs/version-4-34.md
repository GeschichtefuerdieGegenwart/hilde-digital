# Version 4.34 – Neuer Film auf der Startseite: Kidu in zwei Minuten

Stand: 11. November 2026 · Branch `pitch-film`

Grundlage: Auftrag Mario, 11.11.2026 – »ersetze den Einstiegstrailer mit dem neu erstellten Video«. Das Video ist der Pitch-Film aus Claude Design (Drehbuch Fassung 3, neun Kapitel).

## Neu

- Der Film »Kidu in zwei Minuten« ersetzt »Kidu in 44 Sekunden«. Neun Kapitel: Problem · Frage und Logo · zwei Säulen · sechs Prinzipien (mit Papierfrage) · Unterricht digitalisieren und Digital-Check · KI-Training in vier Stufen · Lernschleife · drei Ausschnitte aus der Galerie · Einladung.
- `assets/film-buehne.js` (erzeugt, nicht von Hand ändern) trägt die Bühne; die Zeitachse steht als CSS-Animationen in `assets/hilde.css` (Abschnitt »Film«). `assets/film.js` ist neu und klein: Start, Halt, Ende, Springen.
- Bei »Weniger Bewegung« zeigt der Film neun Standbilder; »Nächstes Bild« blättert weiter.
- Knopf auf der Startseite: »Film ansehen · 2 Minuten«. Textfassung für Hilfstechnik neu.

## Unterschied zum Pitch-Film

- Die Fassung auf der Seite trägt **keine Kontaktadresse** (Regel in `CLAUDE.md`). Im Schlussbild steht stattdessen der Arbeitsstand.

## Zahlen und Herkunft

- »29 Beispiele, im eigenen Unterricht erprobt«: Galerie-Einträge mit Status »im Unterricht erprobt«, Stand 11.11.2026. Die Zahl steht fest im Film und muss bei Änderungen der Galerie neu erzeugt werden.
- Die Sätze zu den drei Beispielen stammen aus den Feldern der Galerie und von der Seite der sechs Prinzipien.

## Offen

- Der Film läuft weiter bei jedem neuen Besuch einmal von selbst. Zwei Minuten sind dafür lang; ob er künftig nur noch auf Knopfdruck startet, ist eine Entscheidung.
- Auf dem iPad und in Safari noch nicht angesehen.

## Geprüft

`python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – Ergebnis im Pull Request.
