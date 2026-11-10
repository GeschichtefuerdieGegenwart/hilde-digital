# Version 4.23 – Neuer Name: Kidu

Stand: 10. November 2026 · Branch `kidu`

Entscheidung Mario (10.11.2026): Das Projekt heißt **Kidu – Künstliche Intelligenz und digitaler Unterricht**. Unter der Wortmarke steht immer die ausgeschriebene Zeile. Kidu ist nicht an eine Schule gebunden. Das Werkzeug »Geht es auf Papier genauso gut?« heißt weiter **Papierfrage**. Repository und Adresse werden in `kidu` umbenannt.

## Neu

- **Name überall:** Kopf, Fuß, Kennzeichnung, Titel aller Seiten, Texte, Daten-Kommentare, Skripte (`window.KiduFilm`, `window.KiduHebelFilm`), lebende Dokumente (CLAUDE.md, README, PRODUCT, DESIGN, LICENSE-TEXTE, CITATION, ENTSTEHUNG, Datenschutz, Annahmen). 167 Stellen in 64 Dateien.
- **Logo:** Zeichen aus zwei versetzten Platten (Ocker = KI, Moos = digitaler Unterricht, Überdruck in der Schnittmenge), Wortmarke »Kidu«, ausgeschriebene Zeile mit K · I · d · U in Plattenfarbe unterstrichen; `assets/kidu.svg` als Symbol im Browser-Reiter. Auch im Startseiten-Film.
- **Über Kidu:** Entstehung nennt beide früheren Namen; Neues: »Neuer Name: Kidu«.
- `tools/pruefen.py`: »Papierprobe« gilt als alter Name (wie »Hilde Digital«), erlaubt nur auf der Über-Seite.

## Bewusst nicht geändert

- **Alte Versionsberichte** (`docs/version-1.md` bis `version-4-22.md`): Sie halten fest, wie es damals hieß.
- **Interne Namen**, die niemand sieht: Dateien `assets/hilde.css`, `assets/hilde.js`, der Namensraum `HILDE` und die Speicher-Schlüssel `hilde.*`/`papierprobe.film` im Browser. Ein neuer Schlüssel würde gemerkte Schnellhefter, Bewegungs- und Beamer-Wahl löschen.
- Die Kennzeichnung »noch kein beschlossenes Schulkonzept« bleibt – sie beschreibt den Stand, nicht den Ort.

## Adresse

Nach dem Zusammenführen: Repository `GeschichtefuerdieGegenwart/hilde-digital` → `kidu`. Die Seite liegt dann unter `…github.io/kidu/`. GitHub leitet die alte Seiten-Adresse nicht weiter (Entscheidung Mario: trotzdem heute).

## Geprüft

`python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – Ergebnis im Pull Request; neu: Test »Logo«.
