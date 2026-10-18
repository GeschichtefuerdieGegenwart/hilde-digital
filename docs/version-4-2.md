# Hilde Digital – Version 4.2: Galerie zum Ausprobieren

Stand: 18. Oktober 2026. Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.

Grundlage: der Prompt »Version 4.2« und das Design-Paket im Ordner »hilde-digital-design« (DESIGN.md, PRODUCT.md, TASTE-BERICHT.md, Referenz-Startseite). Übernommen daraus: Two-Line Rule, Full-Ink Rule, First-Action Rule, Overprint Rule (Überdruck-Grün nur für »mit KI entwickelt«), Duplex-Vorschau (E6), Rasterpunkte als ehrlicher Platzhalter, keine Haarlinien und weichen Schatten. Aus der Taste-Kritik umgesetzt: »Rechts neben der Überschrift liegt eine leere Fläche« → Collage aus echten Ansichten.

## Was neu ist

| Bereich | Änderung |
| --- | --- |
| Suche | Kompakte Suche im Galerie-Kopf rechts neben der Überschrift (Telefon: darunter), mit Bereichs-Chips und »Mehr Filter«. Treffer erscheinen beim Tippen direkt darunter; Laufband und Einblicke treten zurück. Leeres Feld und keine Filter: zurück zum Stöbern. Die Adresse merkt sich das Suchwort (`galerie.html#suche=…`). |
| Laufband | Karten statt nackter Bilder: Duplex-Vorschau, Kennzeichen, Titel, eine Zeile Kurzbeschreibung. Labore mit drei oder mehr Ansichten bekommen größere Karten. Beim Überfahren, beim Fokus oder beim ersten Antippen hält das Band an, das Original blendet ein, und zwei Wege erscheinen: »Beispiel ansehen« und »Ausprobieren ↗« (neuer Tab; sonst »noch nicht online«). Mit der Tastatur wird das Band zur stillen Reihe, die fokussierte Karte rückt ins Bild. |
| Bildansicht | Zeigt dieselben zwei Wege im Kopf. Auf der Detailseite nur »Ausprobieren«. |
| Bildwelt | Startseite: Collage aus drei echten Ansichten (zwei Duplex, ein Original), versetzt wie Druckbogen, rastet beim ersten Aufruf ein und verschiebt sich beim Scrollen leicht. Bereichsseiten: selbst gezeichnete SVG-Motive – KI-Training: fünf Honigplatten (fünf Teile einer Anfrage), Digitaler Unterricht: Stundenlinie (punktuell, phasenweise, durchgängig), Digital-Check: Arbeitsblatt und Tablet. |
| Bewegung | Einflug beim Scrollen (einmal, 240 ms, höchstens 24 px, gestaffelt) für Abschnitte unterhalb des ersten Bildschirms. Parallaxe nur bei der Collage (höchstens 16 px). Bei weniger Bewegung und ohne JavaScript entfällt beides. |
| Werkzeuge | `tools/duplex.py` erzeugt die Duplex-Vorschauen; `tools/pruefen.py` prüft, dass zu jedem Bild eine Vorschau existiert. |

## Bewusste Ausnahmen

- Einflug beim Scrollen und Parallaxe widersprechen der früheren Regel »keine Einblendungen beim Scrollen«. Sie sind auf Wunsch eingeführt, eng begrenzt und in PRODUCT.md und DESIGN.md dokumentiert.
- Eine zweite, gegenläufige Reihe im Laufband wurde nicht gebaut: Sie hätte die Seite unruhig gemacht.

## Offen

- Taste-Prüfer (`lint.mjs`, `inspect.mjs`) lief in dieser Umgebung nicht; geprüft wurde mit Bildschirmfotos in 375, 768, 1280 × 720 und 1440 px und den projekteigenen Tests.
- Rechte an Illustrationen innerhalb der Anwendungen: noch offen.
