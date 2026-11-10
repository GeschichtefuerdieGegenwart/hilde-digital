# Version 4.26 – Das Logo Kidu (5f) und die Farben Ocker und Petrol

Stand: 10. November 2026 · Branch `kidu-logo`

Grundlage: Logo-Export »Kidu – Logo 5f« aus Claude Design (ZIP von Mario, 10.11.2026): Wortmarke in IBM Plex Mono, Platten im i-Punkt, Dateien für hell, negativ, grau, Zeichen und Symbol.

## Neu

- `assets/logo/` mit allen fünf Dateien und einer README. Die Wortmarken (`kidu-logo*.svg`) sind in Umrisse gewandelt, damit sie ohne Schrift überall gleich aussehen; Zeichen und Symbol unverändert aus dem Export.
- Logo im Kopf (40 px, darunter die ausgeschriebene Zeile ab 1180 px), als Titel der Startseite, im Fuß und als Symbol im Browser-Reiter; der Startseiten-Film nutzt das Zeichen in den Logofarben. `assets/kidu.svg` (Version 4.23) entfällt.
- Logofarben als eigene Werte `--logo-*` in `assets/hilde.css`; die Unterstriche der ausgeschriebenen Zeile folgen ihnen.
- `DESIGN.md` (Abschnitt »Logo Kidu« neu), »Über Kidu« (Neues: »Das Logo«), Test »Logo« angepasst.

## Abweichungen vom Export

- **Schriftschnitt:** Der Entwurf ist in Plex Mono 500 gesetzt; beim Bau lagen nur Regular (400) und Bold (700) vor. Die Umrisse stammen aus Regular. Sobald die Datei »IBMPlexMono-Medium.ttf« vorliegt, lassen sich die drei Wortmarken in einem Schritt neu erzeugen.
- **HTML-Baustein** `kidu-marke.html` nicht übernommen: Er setzt eine geladene Plex-Schrift voraus; die Umriss-SVG braucht keine und ist schärfer.
- **Herkunftsangaben:** Die im Export eingebetteten Herkunftsdaten (C2PA) bleiben in Zeichen und Symbol erhalten; die drei Wortmarken sind neu erzeugt und tragen stattdessen einen Kommentar zur Herkunft.

## Farben der Seite (Entscheidung Mario: »Stell die Farben auf Ocker und Petrol um«)

- Die ganze Seite übernimmt die Logofarben: `--ki-platte` Ocker #b68235 (vorher #d9a441), `--lernen` Petrol #2f5d62 (vorher Moos #4a6645), `--lernen-zart` #dbe7e6, `--lernen-tief` #1f4246, `--ueberdruck` Oliv #3f5a44 (vorher #434512), `--text` Tinte #201f1d (vorher #2b2a24). Beamer-Ansicht: Petrol tief #1f4a4f, Oliv #2c4231.
- Kontrast: dunkle Schrift auf Ocker 4,9:1 (mit dem alten Druckschwarz wären es nur 4,3:1 gewesen – darum die Tinte des Logos für alle Schrift); helle Schrift auf Petrol 7,0:1; Petrol als Schrift auf Grund 6,1:1; heller Text auf Oliv 7,2:1.
- Galerie-Vorschauen im Zweifarbdruck (`tools/duplex.py`) neu erzeugt; Texte auf »Über Kidu« und im Gestaltungssystem sprechen von Petrol statt Moos.

## Geprüft

`python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – Ergebnis im Pull Request.
