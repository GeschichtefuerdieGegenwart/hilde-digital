# Version 4.36 – Digitaler Unterricht in vier Phasen, Unterrichtsbeispiele

Stand: 13. November 2026 · Branch `grundlogik-4-36` · Pull Request 1 von 2 zum Auftrag »Digitaler Unterricht in Kidu – Sichtung, Didaktikanalyse, neue Grundlogik, Skills«

Grundlage: Sichtung und Didaktikanalyse vom 13.11.2026 (Claude-Dokument »Digitaler Unterricht in Kidu – Sichtung und Didaktikanalyse«), Entscheidungen Mario am Haltepunkt 1 und 2 (13.11.2026): Freigabe aller Empfehlungen, vier Phasen statt sieben Schritte, »Mein Rückmeldebogen« als letzter Schritt nach der Stunde, die App für den Praxisbesuch als Bildschirmfotos ohne Link.

## Neu

- **Kidu ist eine Fortbildungsplattform für Lehrkräfte.** So steht es jetzt auf der Startseite, unter »Über Kidu«, in `PRODUCT.md` und `README.md`. Kidu ist ohne Auftrag einer Schule entstanden und kein Schulkonzept.
- **Vier Phasen.** Die Bereichsseite »Digitaler Unterricht« ist ein Weg: Grundlagen · Digitalen Unterricht erstellen · Unterrichten · Nach der Stunde. Oben vier Karten mit den wichtigsten Wegen, darunter alle Werkzeuge nach Phasen. Die Phasen stehen ab 1180 px in einer Zeile, auf dem iPad hoch zwei je Zeile, auf dem Telefon untereinander. Bei 1280 × 720 sind Kopf und alle vier Phasen ohne Scrollen zu sehen.
  - Grundlagen: Wann funktioniert digitaler Unterricht? (mit den fünf Sätzen), Film, Was passt gerade zu mir?, Mein Fortbildungsbogen.
  - Digitalen Unterricht erstellen: die zwei Türen »Unterricht neu planen« und »Bisherigen Unterricht digitalisieren«, dazu Aufgabenkoffer, Ideen und Kniffe, Methodenkoffer, Papierfrage, Digital-Check. Aufgaben- und Methodenkoffer stehen zusammen in dieser Phase; ihre Seiten und Namen bleiben.
  - Unterrichten: Tablet-Phasen gut führen – für jedes Thema und jeden Umfang.
  - Nach der Stunde: Beobachtungsbogen, Fortbildungsbaustein, Beratungsstunde, Leitsätze (jetzt dem Bereich zugeordnet) und zum Schluss »Mein Rückmeldebogen«.
- **Neue Namen** (Ausnahme von der Namenssperre, Entscheidung Mario 13.11.2026): »Galerie« → »Unterrichtsbeispiele« (Seite »Unterrichtsbeispiele: analog und digital«, darunter »beides mit KI erstellt«), »Unterricht planen« → »Unterricht neu planen«, »Unterricht digitalisieren« → »Bisherigen Unterricht digitalisieren«. Die Adressen bleiben (`galerie.html`, `tablets.html`, `digitalisieren.html`). Der Skill `unterricht-digitalisieren` behält seinen Namen.
- **Mein Rückmeldebogen** (`rueckmeldebogen.html`, neu): fünf Fragen und eine Frage zur Weitergabe. Am Ende ein Bogen als Text zum Kopieren oder als PDF, für die Person, die die Fortbildung leitet. Kidu verschickt und speichert nichts außer den Kreuzen im Browser; keine Adresse auf der Seite. Bis zu zwei Hilfen passend zu »Wo hat es gehakt?«. Regel `REGELN.rueckmeldebogen` in `assets/regeln.js` mit vier Tests.
- **Die fünf Sätze** stehen jetzt als Abschnitt `#fuenf-saetze` auf »Wann funktioniert digitaler Unterricht?«, ohne das Scrollytelling »Der Weg durch die Stunde«. Satz 4 trägt das Etikett »Gestaltung«. Satz 5 nimmt das Festhalten auf (Foto, Ton, Datei, gespeicherter Stand) – kein siebtes Prinzip. `fuenf-saetze.html` leitet dorthin weiter.
- **»Mein Ist-Stand« geht im Fortbildungsbogen auf.** Seine fünf Fragen standen fast gleich schon in Schritt 2 und 5 des Bogens. Übernommen werden der Satz zum organisatorischen Nutzen (»legitim und keine Vorstufe«) und der Wunsch »Schnellere Rückmeldung« als Schritt. `ist-stand.html` leitet zum Bogen weiter. Die Regel `REGELN.istStand` und `assets/ist-stand.js` entfallen; Tests dazu sind ersetzt.
- **Unterrichtsbeispiele.** Die Maske heißt »alle · Unterricht · Außerhalb des Unterrichts« (Schlüssel `lernen` und `ki` bleiben, Farben Petrol und Ocker). Der Knopf »KI-Training« entfällt; seine zwei Einträge stehen jetzt unter »Außerhalb des Unterrichts«. Die Überschrift steht über beiden Spalten. Der Fächer »Alle Projekte im Vorbeiziehen« ist entfernt (`assets/faecher.js` gelöscht); er zeigte dieselben Karten wie »Alle Beispiele« und bewegte sich ohne Eingabe. »Einblicke in die Labore« und »Weitere Einblicke« sind ein Abschnitt »Einblicke«.
- **Praxisbesuch 1BKSP · Begleiter** (neu, »Außerhalb des Unterrichts«): drei Bildschirmfotos der leeren App, kein Link, Status »noch offen«. Gezeigt werden nur Ansichten ohne fremden Wortlaut. Herkunft in `docs/galerie-quellen.md`.
- **Gruppenpädagogik-Quest:** KI-Einsatz »KI hat beim Bau der Anwendung geholfen« (Angabe Mario, 13.11.2026).
- **Weiterleitungen:** `ist-stand.html` → `fortbildungsbogen.html`, `fuenf-saetze.html` → `sechs-hebel.html#fuenf-saetze`. Hängt das Ziel schon an einem Abschnitt, hängt die Weiterleitung keinen zweiten an.
- `assets/hilde.css`: `--breite-weit` (112 rem) und `.huelle-weit` für Übersichten, Stile für die vier Phasen und den Rückmeldebogen; die Stile für Fächer, Laufband und Scrollytelling sind entfernt.

## Was gleich bleibt

- Fußzeile, Kennzeichnung, Lizenzen, GitHub Pages.
- Titel, Kurzbeschreibung, Fach, Status und Links aller bisherigen Beispiele.
- Der Film auf der Startseite (`assets/film-buehne.js`, erzeugt): Er nennt noch »Galerie« und zeigt den Fächer. Er wird nach dem Umbau neu erzeugt (Entscheidung am Haltepunkt 2).
- Die Einträge unter »Was ist neu?« vor 4.36 behalten ihre damaligen Namen.

## Noch offen

- Status der App für den Praxisbesuch (war sie schon bei Besuchen im Einsatz?).
- `DESIGN.md` nennt den Fächer noch als einzige Autoplay-Ausnahme und beschreibt das Scrollytelling der fünf Sätze und die Leitkachel. Das wird mit den benannten Regeln aus Teil 3c bereinigt (Pull Request 2).
- Analoge Unterrichtsbeispiele: noch keine. Die Seite sagt das (»Analoge Beispiele: noch offen«).
- Ganze Einheit als Umfang, neue Phasennamen, Schaubild »Lehrfunktionen je Phase«, »So sieht sie gut aus« im Aufgabenkoffer: Pull Request 2.

## Geprüft

- `python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py`: alles bestanden (149 Unit-Tests, 530 Browser-Prüfungen). Die Prüfung mit axe-core lief nicht (`tests/vendor/axe.min.js` fehlt, kein Netz).
- Bildschirmfotos bei 1280 × 720, 1180 × 820, 820 × 1180 und 390 × 844: Bereichsseite, Unterrichtsbeispiele, Startseite, Rückmeldebogen, fünf Sätze; kein waagerechtes Scrollen.
