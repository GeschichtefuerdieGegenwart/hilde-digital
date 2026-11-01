# Version 4.14 – Farbwelt Büttenpapier

Stand: 1. November 2026 · Branch `buettenpapier`

Grundlage: Farbwelt 6 »Naturpapier / handgeschöpftes Büttenpapier« von der Fläche »Hilde Digital – Farbwelten«, Auswahl Mario, 1.11.2026. Umgesetzt nur über die Variablen in `assets/hilde.css`. Name bleibt »Hilde Digital« bis zur Markenrecherche.

## Geändert

- `assets/hilde.css`: neue Werte für alle Farbrollen. Grund ungebleichtes Papier #efeadf, Fläche #f8f5ee, Ocker für KI (Platte #d9a441, Kante #7d5a1c), Moos für das Tablet #4a6645, Oliv nur in der Überlagerung #434512, Terrakotta als Leitakzent #9e432a nur auf der Seite Leitsätze. Beamer-Ansicht mit tieferen Tönen derselben Farben.
- `assets/hilde.css`: dezente Körnung und Wolkigkeit im Seitengrund als einmal gerastertes Kachelbild (SVG als data-URL, keine fremde Datei). Aus in der Beamer-Ansicht, bei »Weniger Bewegung« (Schalter oder Systemeinstellung), bei erhöhtem Kontrast und im Druck. Karten, Text und Bedienelemente bleiben glatt.
- `tools/bauen.py`: Schnellhefter-Symbol in Ocker.
- `tools/duplex.py` und `assets/galerie/duplex/`: Vorschauen der Galerie neu in Moos und Ocker.
- `src/gestaltung.html`, `DESIGN.md`, `.impeccable/design.json`: Farbnamen und Werte.
- `tests/e2e.py`: Körnung an und aus (normal, Beamer, Weniger Bewegung, Druck).
- Leitsätze: Aufbau aus Variante A (Thesenbogen mit fünf Stationen) unverändert, nur Farben und Papier.

## Regeln

Kein Widerspruch zu bestehenden Regeln: keine Fraunces (E4), keine weichen Schatten, keine Büttenränder, Two-Inks Rule unverändert (der Leitakzent ist die bestehende Ausnahme aus Version 4.11).

## Gemessen

- Kontraste Normal: Text auf Grund 12,0:1 · auf Fläche 13,2:1 · Leise 7,0:1 · Stahl 4,6:1 · Moos als Text 5,3:1 · heller Text auf Moos 6,1:1 · Text auf Ocker 6,4:1 · Ocker tief als Text 5,2:1 · heller Text auf Oliv 9,5:1 · Terrakotta 5,3:1.
- Kontraste Beamer: alle Textpaare mindestens 8,4:1 (Test in `tests/e2e.py`).
- Ladezeit iPad-Größe, Prozessor vierfach gedrosselt, Median aus 6 Läufen: Startseite erste Anzeige 210 ms mit, 186 ms ohne Körnung; Leitsätze 248 ms mit, 274 ms ohne. Der Unterschied liegt im Messrauschen.
- Druck der Leitsätze: genau eine Seite A4, ohne Körnung.

## Nicht gelaufen

Safari/iPadOS auf einem echten Gerät, echter Beamer, Druck auf einem echten Drucker.
