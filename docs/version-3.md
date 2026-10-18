# Hilde-Digital – Version 3: Gestaltung »Überdruck«

Stand: 18. Oktober 2026. Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.

## Prüfbefehl

```
python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py
```

## Was neu ist

| Bereich | Änderung |
| --- | --- |
| Name | In der Oberfläche heißt das Modul jetzt »Hilde-Digital« (mit Bindestrich). |
| Gestaltungssystem | Neues Erscheinungsbild »Überdruck«: zwei Druckfarben (Honig für »KI für meine Arbeit«, Petrol für »Unterricht mit Tablets«), das Überdruck-Grün nur für »mit KI entwickelt«. Ecken 4 px, keine weichen Schatten, Tiefe nur als versetzte Farbplatte beim Überfahren. Grund Knochenweiß statt Creme. Alle Werte in `assets/hilde.css`, die Regeln in `DESIGN.md`. |
| Schrift | Bricolage Grotesque für Überschriften, Atkinson Hyperlegible Next für Text. Beide lokal, freie Lizenz. Die alte Atkinson Hyperlegible entfällt. |
| Kopf und Fuß | Wortmarke mit Bindestrich aus zwei überdruckten Balken. Auf schmalen Bildschirmen springt »Menü« ohne JavaScript zur Navigation im Fuß. Der Fuß zeigt die Wortmarke in voller Breite und darunter die Kennzeichnung. |
| Startseite | Leitsatz als große Überschrift. Die zwei Einstiege sind überlappende Druckplatten; im Überlapp steht, wie viele Lernangebote in beiden Bereichen liegen (gezählt aus den Daten). Die Platten finden beim ersten Aufruf je Sitzung zusammen (720 ms, abschaltbar über reduzierte Bewegung). |
| Papierprobe | Neu auf der Startseite: »Geht es auf Papier genauso gut?« in höchstens drei Ja/Nein-Fragen. Ergebnis ist eine der vier Einstufungen der Entscheidungskarte. Regeln kommentiert in `assets/regeln.js` (`papierprobe`), sechs Tests in `tests/regeln.test.js`. Nichts wird gespeichert. |
| Bereichsseiten | Die Überschrift steht zuerst, »Bereich: …« darunter. Keine Etiketten über Überschriften. |
| Prüfung | Neben den bisherigen Prüfungen läuft der Taste-Prüfer (`lint.mjs`, `inspect.mjs`). Begründete Ausnahmen in `.taste-skill/direction.json`. |

## Bewusst nicht übernommen

- Keine Videoschleifen und keine Einblendungen beim Scrollen: Aufmerksamkeit ist Thema des Projekts.
- Keine Platzhalter- oder Archivbilder als Schmuck. Werkzeugseiten (Wege, Selbstcheck, Über) bleiben ohne Bilder.

## Offen

- Fragen und Regeln der Papierprobe brauchen eine fachliche Freigabe.
- Prüfung mit axe-core: `axe.min.js` lag bei dieser Version nicht vor.
