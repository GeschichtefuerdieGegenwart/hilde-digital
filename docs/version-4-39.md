# Version 4.39 – Still und breit

Stand: 14. November 2026 · Branch `still-und-breit-4-39` · Abschluss von Haltepunkt 3 des Auftrags »Digitaler Unterricht in Kidu – Sichtung, Didaktikanalyse, neue Grundlogik, Skills«

Grundlage: Entscheidungen Mario am Haltepunkt 3 (14.11.2026): die drei Bewegungen beim Erscheinen still stellen, sodass gleich das Ende zu sehen ist; Startseite, KI-Training und Unterrichtsbeispiele im selben Pull Request auf Bildschirmbreite.

## Neu

- **Input-First Rule erfüllt.** Beim Erscheinen bewegt sich nichts mehr ohne Eingabe:
  - N Leporello gestrichen (`assets/motion.js`, Stile und Token `--dauer-leporello` in `assets/hilde.css`). Die Schritte der großen Einblicke stehen gleich offen da.
  - P »Vom Blatt zum Tablet« spielt nicht mehr ab (`assets/digitalisieren.js`, `src/digitalisieren.html`, Token `--dauer-blatt` gestrichen). Der Regler steht beim Laden am Tablet – so steht es auch im HTML, also auch ohne JavaScript. Wer zurückzieht, sieht das Blatt.
  - I2 Zeichnen der Stundenlinie gestrichen (`HILDE.stundenlinieZeichnen`, `.sl-von`). Auf der Detailseite und in »Zum Anfangen« steht die Linie sofort in ihrem Umfang. Das Gleiten im Filter »Umfang« bleibt, weil es einer Eingabe folgt.
  - Beim Erscheinen läuft nur noch, was die Ausnahmen der Input-First Rule erlauben: Passer der Überschriften und Registrieren der Platten auf der Startseite, je einmal je Sitzung.
- **Screen-Width Rule auf drei weiteren Seiten.** Startseite (Titel, Platten, Weg zu den Unterrichtsbeispielen), KI-Training (Kopf, »Deine ersten zehn Minuten«) und Unterrichtsbeispiele (Kopf mit Suche, Treffer, »Was das Gerät hier kann«) stehen in `.huelle-weit` (112 rem). Der Kopf der Seite folgt der weiten Hülle, jetzt auch auf »Digitaler Unterricht«. Spürbar erst über 1216 px. Treffer: fünf Karten je Zeile bei 1920 px, vier bei 1440 px, drei bei 1280 und 1180 px. Die Collage der Startseite wächst ab 1500 px mit. Fließtext bleibt höchstens 68ch breit.
- `gestaltung.html`: Ausnahmenliste ohne Leporello und Regler, Beschreibung »Vom Blatt zum Tablet« neu, ein veralteter Satz zum Einflug beim Scrollen (gestrichen seit 4.18) berichtigt.
- `DESIGN.md`, `PRODUCT.md`: »Noch offen« bei Input-First und Screen-Width erledigt, Gestrichenes markiert.
- `tests/e2e.py`: neuer Block 5g – laufende Animationen nach dem Laden auf neun Seiten, Einblicke beim Scrollen, Stundenlinie sofort im Umfang, Breite von Seite und Kopf bei 1920 und 1440 px, Fließtext höchstens 68ch, Treffer je Zeile, Beamer 1280 × 720 für Startseite und KI-Training. Die Breitenprüfung läuft jetzt auch bei 1920 px.
- Kurzfassung von `lernseite-bauen`: Der Skill ist auf Stand v2.3 gespeichert; die Kopie in `werkzeugkiste/kurzfassungen/lernseite-bauen.md` stimmt mit ihm überein.

## Noch offen

- »Zum Anfangen« und die Einblicke bleiben in der normalen Breite.
- Der Film auf der Startseite nennt noch die »Galerie« (`assets/film-buehne.js`, erzeugt).
- `.impeccable/design.json` trägt noch die Farben vor 4.26.
- Der Selbstcheck der Website fragt weiter mit vier Fragen; die Gestaltungsfragen stehen im Skill `digital-check` und im Prüf-Auftrag.
- Nicht aus der Cloud prüfbar: echtes iPad, Beamer im Raum.

## Geprüft

Siehe Pull Request.
