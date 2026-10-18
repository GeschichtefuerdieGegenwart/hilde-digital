# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Statisches HTML, CSS und schlankes JavaScript ohne Framework und ohne Laufzeitabhängigkeiten. Quellen in `src/`, Bau mit `tools/bauen.py`, Prüfung mit `tools/pruefen.py`, Unit-Tests mit `node --test`, Browser-Tests mit `tests/e2e.py` (Python Playwright). Keine fremden Schriften, CDNs, Tracker oder Analysedienste; Schriften lokal als woff2. Die Seiten müssen per `file://` und ohne Internet funktionieren. Veröffentlichung später über GitHub Pages, aus Moodle verlinkt (nicht eingebettet). Entwicklungswerkzeuge wie Playwright, axe-core und der Taste-Prüfer sind als Entwicklungsabhängigkeit erlaubt.

## Users

Lehrkräfte einer beruflichen Schule in Baden-Württemberg, aus allen Fächern und Bildungsgängen, z. B. Sozialpädagogik, Pflege, Geschichte/Gemeinschaftskunde, Psychologie, Kraftfahrzeugtechnik. Viele unterrichten Tablet-Klassen (iPad mit MDM und Apple Classroom). Unterschiedliche Technikerfahrung; viele haben wenig Zeit und Berührungsängste gegenüber KI. Genutzt wird die Seite am Laptop, auf dem iPad (hoch und quer) und über den Beamer in Konferenzen und Fortbildungen.

Ihre Aufgabe: mit wenig Aufwand zu einer didaktisch begründeten, umsetzbaren Entscheidung kommen, ob und wie KI oder ein Tablet im eigenen Unterricht sinnvoll ist, und dafür ein passendes Beispiel finden.

## Product Purpose

Hilde Digital ist ein Orientierungs- und Werkzeugmodul zum Projekt »Vom digitalen Schnellhefter zum lernwirksamen Tablet-Unterricht«. Es trennt zwei gleichwertige Perspektiven:

- **KI-Training:** Lehrkräfte nutzen KI als professionelle Anwender*innen, um analogen oder digitalen Unterricht vorzubereiten (geführter Weg, höchstens 5 Schritte).
- **Digitaler Unterricht:** Digitalität aus Sicht der Lernenden; beginnt beim Lernzweck, nicht beim Werkzeug (geführter Weg, höchstens 6 Schritte).

Die Schnittmenge sind Lernangebote, die mit KI entwickelt wurden; sie erscheinen in beiden Bereichen. Dazu kommt eine Galerie mit echten Beispielen aus dem Kollegium.

Erfolg heißt: Eine Lehrkraft findet nach kurzer Einführung sofort den passenden Einstieg, versteht den Unterschied zwischen KI-Unterstützung und digitalem Lernen, erhält mit wenigen Entscheidungen eine nachvollziehbare Empfehlung, kann den Mehrwert eines Tableteinsatzes kritisch einschätzen, findet ein passendes Beispiel und fühlt sich unterstützt, aber weder geprüft noch bewertet.

## Positioning

Erst das Anliegen, dann das Werkzeug. Hilde Digital empfiehlt digitalen Einsatz nie um seiner selbst willen: Zulässige Ergebnisse sind ausdrücklich auch »analog wahrscheinlich sinnvoller«, »punktueller Einsatz reicht« oder »vor allem organisatorischer Nutzen«. Der Prüfstein lautet: »Geht es auf Papier genauso gut? Dann bleib beim Papier.« Alle Beispiele stammen aus dem eigenen Kollegium; nichts ist erfunden.

## Operating Context

Konferenzen und Fortbildungen mit Beamer (1280 × 720, alles Wesentliche ohne Scrollen), Unterrichtsvorbereitung am Laptop oder iPad, Lernumgebungen als einzelne HTML-Dateien auf GitHub Pages (`geschichtefuerdiegegenwart.github.io`) oder als Moodle-Datei-Ressource. Unterrichtsphasen als gemeinsame Sprache: Einstieg, Erarbeitung, Sicherung, Abschluss & Transfer, Phasenübergreifend, Noch offen.

## Capabilities and Constraints

- Hauptnavigation mit drei Punkten: KI-Training · Digitaler Unterricht · Galerie. Die Wortmarke führt zum Start. »Über Hilde Digital«, »Inhalte und Funktionen« und »Hinweise« stehen im Fuß.
- Digital-Check mit zwei Wegen: »Selbst prüfen« und »Mit KI prüfen« (ein Prüf-Auftrag aus dem Qualitätsmodell zum Kopieren; die Lehrkraft gibt ihn mit ihrem Material in ein an der Schule freigegebenes KI-System ein; keine Anbindung, kein Upload auf dieser Seite).
- Galerie mit echten Ansichten aus den Anwendungen (1–4 je Projekt) und einer Bildansicht für Maus, Tastatur und Finger.
- Geführte Wege mit einer Entscheidung pro Schritt, Zurück, »Noch nicht sicher«, Ergebnis ohne Sackgasse, »Neu starten« und »Eingaben löschen«.
- Galerie mit Freitextsuche und Filtern (Bereich, Phase, Anliegen, Umfang, Rolle, Fach), entfernbaren Chips, Ergebniszeile und kontrollierter Lockerung bei zu wenigen Treffern.
- Umfang der Digitalität ohne Rangfolge: punktuell, phasenweise, durchgängig. Rollen der Lehrkraft ohne Wertung: Anleiten, Erklären, Moderieren, Begleiten, Rückmelden.
- Digital-Check (Entscheidungskarte), Papierprobe auf der Startseite und Digital-Check, Weg A »Selbst prüfen«: regelbasiert und transparent (`assets/regeln.js`, `assets/check-regeln.js`, jeweils mit Tests), vier qualitative Einstufungen, keine Prozentwerte oder Noten.
- Keine echte KI-Anbindung, keine simulierten KI-Antworten, keine Nennung konkreter KI-Anbieter (»ein an deiner Schule freigegebenes KI-System«).
- Keine Anmeldung, kein Server, keine Tracker; Eingaben nur lokal (localStorage in try/catch), Freitexte werden nicht gespeichert.
- Externe Anwendungen werden verlinkt, nicht eingebettet; das Bildschirmfoto dient als Vorschau und als Ersatz ohne Netz.
- Fachbegriffe (Adaptivität, kognitive Aktivierung, formative Diagnostik u. a.) nur in aufklappbaren Vertiefungen.
- Bewegung: kein Autoplay – mit einer bewusst gewählten Ausnahme (Entscheidung vom 18.10.2026): das Laufband der Galerie. Es läuft sehr langsam (etwa 24 px/s), hält beim Überfahren, beim Fokus, per Knopf »Anhalten« und außerhalb des Bildschirms an und steht bei `prefers-reduced-motion` still. Zweite Ausnahme (Version 4.2): Abschnitte außerhalb des Bildschirms gleiten beim Scrollen einmal kurz herein (höchstens 24 px, 240 ms), und die Collage der Startseite verschiebt sich beim Scrollen leicht (höchstens 16 px, ab 1024 px). Beides entfällt bei `prefers-reduced-motion` und ohne JavaScript; Text ist nie erst nach der Bewegung lesbar. Alle anderen bewegten Bereiche starten nur auf Knopfdruck; eine statische Ansicht ist jederzeit verfügbar.
- Galerie: Die Suche steht oben im Kopf; Treffer erscheinen direkt darunter, die Adresse merkt sich das Suchwort (`#suche=…`). Jede Karte im Laufband führt mit einem Klick zur Beschreibung und mit einem weiteren in die laufende Anwendung.
- Offene Punkte zu den Daten stehen in `docs/datenluecken.md`, offene Punkte der Versionen in `docs/version-*.md`.

## Brand Commitments

- Name in der Oberfläche: **Hilde Digital** (mit Bindestrich, entschieden am 18.10.2026).
- Jede Seite trägt in der Fußzeile: »Hilde Digital (Arbeitstitel) · Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.« Die Startseite zeigt zusätzlich zurückhaltend: »Arbeitsstand – Einladung zur gemeinsamen Weiterentwicklung«.
- Kein Schullogo, keine Nachahmung des schulischen Erscheinungsbilds, keine Formulierung wie »offizielles Digitalkonzept«, keine Kontaktadresse, kein Kontaktformular.
- Sprache: »du«, kurze Sätze, eine Aussage pro Satz, Verben statt Substantive; keine Defizitsprache, keine Technikbegeisterung als Selbstzweck, keine Gleichsetzung von Digitalisierung mit Innovation.
- Leitsätze: »Erst das Anliegen, dann das Werkzeug.« · »KI kann Unterricht vorbereiten. Digitalität kann Lernen gestalten. Beides kann zusammenkommen – muss es aber nicht.« · »Mehr Digitalität bedeutet nicht automatisch besseren Unterricht.«

## Evidence on Hand

- `assets/daten/beispiele.js`: alle Beispiele an einem Ort (Stand 17.10.2026: 29 Einträge, davon 26 Materialien und Konzeptbeispiele). Titel, Kurzbeschreibung, Fach, Status und Links werden unverändert übernommen. Alle Zahlen in der Oberfläche werden daraus gezählt.
- `assets/daten/taxonomien.js`: Phasen, Anliegen, Umfang, Rollen, Mehrwert-Arten, Einstufungen, Status.
- `assets/bilder/`: Bildschirmfotos der eigenen Materialien, auch für den Betrieb ohne Netz.
- Status-Werte ausschließlich: Idee · in Entwicklung · Prototyp · im Unterricht erprobt · In Überarbeitung · für die Präsentation vorbereitet · noch offen. »Karte zum Zweiten Weltkrieg« und »Politik-Check 1919« bleiben »In Überarbeitung«; »Politik-Check 1919« trägt »kein Angebot der bpb«.
- Nicht vorhanden und nicht zu erfinden: Erfahrungsberichte, Zitate, Studien, Wirkungsbehauptungen, Nutzungszahlen, Dauer- oder Aufwandsangaben. Unbekanntes bleibt leer bzw. »noch offen«. Didaktische Zuordnungen (Phase, Anliegen, Umfang, Rolle) sind Vorschläge und werden als `vorschlag: true` markiert. Konzeptbeispiele tragen »Konzeptbeispiel – noch nicht erprobt«, haben keinen Link und kein echt wirkendes Vorschaubild.
- Externe Links zeigen nur auf `https://geschichtefuerdiegegenwart.github.io/`.

## Product Principles

1. Fachlich differenziert im Hintergrund – radikal einfach in der Nutzung.
2. Jede Seite, Frage und Funktion muss einer Lehrkraft helfen, mit wenig Aufwand zu einer didaktisch sinnvollen und umsetzbaren Entscheidung zu kommen; sonst vereinfachen oder weglassen.
3. Orientierung geben, ohne zu bewerten oder festzulegen; direkte Wissensvermittlung und fachlicher Dialog sind gleichwertig.
4. Nichts erfinden: Wahrheit der Daten geht vor Vollständigkeit.
5. Die zwei Perspektiven bleiben überall erkennbar getrennt – mit Farbe und Text, nie nur mit Farbe.

## Accessibility & Inclusion

Mindestens WCAG 2.2 AA: semantisches HTML, vollständige Tastaturbedienung mit sichtbarem Fokus, Bedienflächen mindestens 44 × 44 px, Kontrast mindestens 4,5:1, Statusmeldungen über `aria-live`, programmatisch zugeordnete Labels, Farbe nie als einziger Informationsträger, Zoom bis 200 % ohne Verlust, Schrift mindestens 16 px und Fließtext 18–20 px. Schrift für Sehschwäche: Atkinson Hyperlegible Next. Bewegung abschaltbar (globaler Schalter und Systemeinstellung).
