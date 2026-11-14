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

Kidu ist eine Fortbildungsplattform für Lehrkräfte – zum Selbermachen und für Fortbildungen im Kollegium (seit 13.11.2026 so benannt). Sie gehört zum Projekt »Vom digitalen Schnellhefter zum lernwirksamen Tablet-Unterricht«, ist ohne Auftrag einer Schule entstanden und ist kein Schulkonzept.

### Zwei Grobziele (Entscheidung vom 26.10.2026)

Kidu verfolgt zwei gleichwertige Grobziele. Beide gehören zum Kern; keines ist dem anderen vorgeordnet.

- **Grobziel A – KI-Kompetenz im Kollegium.** Lehrkräfte bauen KI-Kompetenzen auf, die im Schulalltag wirklich nützen – ausdrücklich auch für analog unterrichtete Klassen: Aufgaben für unterschiedliche Lernstände anpassen, Präsentationen umgestalten, neue Aufgabenformate entwickeln, Elternbriefe und Sitzungen vorbereiten. Das Prinzip ist Hilfe zur Selbsthilfe: niederschwellig, für Einsteiger*innen mit Scheu ebenso wie für Fortgeschrittene.
- **Grobziel B – Kompetenz, digitalen Unterricht zu gestalten.** Lehrkräfte gestalten digitalen Unterricht begründet – neu geplant oder aus vorhandenem Unterricht, punktuell, phasenweise oder durchgängig, ohne Rangfolge. Der Weg hat seit 13.11.2026 vier Phasen: Grundlagen · Digitalen Unterricht erstellen · Unterrichten · Nach der Stunde. Er endet im Kollegium: Auswerten, mit anderen weiterarbeiten, die eigene Erfahrung mit »Mein Rückmeldebogen« weitergeben.

Die Unterrichtsbeispiele (»analog und digital«, beides mit KI erstellt; bis 13.11.2026 »Galerie«) sind der gemeinsame Beispielvorrat beider Grobziele.

### Zwei Bereiche

Die Oberfläche trennt die zwei Perspektiven, die den Grobzielen entsprechen:

- **KI-Training (Grobziel A):** Lehrkräfte nutzen KI als professionelle Anwender*innen, um analogen oder digitalen Unterricht vorzubereiten (geführter Weg, höchstens 5 Schritte).
- **Digitaler Unterricht (Grobziel B):** Digitalität aus Sicht der Lernenden; beginnt beim Lernzweck, nicht beim Werkzeug (geführter Weg, höchstens 6 Schritte).

Es gibt genau zwei Bereiche. Ein Lernangebot, das mit KI gebaut wurde, gehört zum Digitalen Unterricht, sobald Lernende damit arbeiten; eine eigene Kategorie »mit KI entwickelt« gibt es nicht. Dazu kommen die Unterrichtsbeispiele mit echten Beispielen. Ihre Maske unterscheidet »Unterricht« und »Außerhalb des Unterrichts« (Schlüssel `lernen` und `ki`, Farben Petrol und Ocker). Bisher stammen alle Beispiele aus dem Unterricht des Urhebers und aus seiner Arbeit außerhalb des Unterrichts.

Erfolg heißt: Eine Lehrkraft findet nach kurzer Einführung sofort den passenden Einstieg, versteht den Unterschied zwischen KI-Unterstützung und digitalem Lernen, erhält mit wenigen Entscheidungen eine nachvollziehbare Empfehlung, kann den Mehrwert eines Tableteinsatzes kritisch einschätzen, findet ein passendes Beispiel und fühlt sich unterstützt, aber weder geprüft noch bewertet.

## Positioning

Erst das Anliegen, dann das Werkzeug. Kidu empfiehlt digitalen Einsatz nie um seiner selbst willen: Zulässige Ergebnisse sind ausdrücklich auch »analog wahrscheinlich sinnvoller«, »punktueller Einsatz reicht« oder »vor allem organisatorischer Nutzen«. Der Prüfstein lautet: »Geht es auf Papier genauso gut? Dann bleib beim Papier.« Alle Beispiele stammen bisher aus dem Unterricht und der Arbeit des Urhebers; nichts ist erfunden. Analoge Beispiele: noch offen.

## Operating Context

Konferenzen und Fortbildungen mit Beamer (1280 × 720, alles Wesentliche ohne Scrollen), Unterrichtsvorbereitung am Laptop oder iPad, Lernumgebungen als einzelne HTML-Dateien auf GitHub Pages (`geschichtefuerdiegegenwart.github.io`) oder als Moodle-Datei-Ressource. Unterrichtsphasen als gemeinsame Sprache (seit 13.11.2026): Einstieg, Erarbeitung, Sichern und üben, Übertragen und Ausblick, In jeder Phase, Noch offen. Mehrere Stunden lassen sich als ganze Einheit planen: eine eigene Ebene mit Landkarte, Leitfrage und Sicherung, keine vierte Stufe des Umfangs.

## Capabilities and Constraints

- Hauptnavigation mit drei Punkten: KI-Training · Digitaler Unterricht · Unterrichtsbeispiele. Die Wortmarke führt zum Start. »Über Kidu«, »Inhalte und Funktionen« und »Hinweise« stehen im Fuß.
- Digital-Check mit zwei Wegen: »Selbst prüfen« und »Mit KI prüfen« (ein Prüf-Auftrag aus dem Qualitätsmodell zum Kopieren; die Lehrkraft gibt ihn mit ihrem Material in ein an der Schule freigegebenes KI-System ein; keine Anbindung, kein Upload auf dieser Seite).
- Unterrichtsbeispiele mit echten Ansichten aus den Anwendungen (1–4 je Projekt) und einer Bildansicht für Maus, Tastatur und Finger.
- Geführte Wege mit einer Entscheidung pro Schritt, Zurück, »Noch nicht sicher«, Ergebnis ohne Sackgasse, »Neu starten« und »Eingaben löschen«.
- Unterrichtsbeispiele mit Freitextsuche und Filtern (Bereich »Unterricht« oder »Außerhalb des Unterrichts«, Phase, Anliegen, Umfang, Rolle, Fach), entfernbaren Chips, Ergebniszeile und kontrollierter Lockerung bei zu wenigen Treffern.
- Umfang der Digitalität ohne Rangfolge: punktuell, phasenweise, durchgängig – je Stunde. Eine ganze Einheit hat keinen eigenen Umfang; jede ihrer Stunden entscheidet neu, auch »ohne Gerät«. Rollen der Lehrkraft ohne Wertung: Anleiten, Erklären, Moderieren, Begleiten, Rückmelden.
- Entscheidungskarte (»Unterricht neu planen«), Papierfrage und Digital-Check, Weg A »Selbst prüfen«: regelbasiert und transparent (`assets/regeln.js`, `assets/check-regeln.js`, jeweils mit Tests), vier qualitative Einstufungen, keine Prozentwerte oder Noten.
- Keine echte KI-Anbindung, keine simulierten KI-Antworten, keine Nennung konkreter KI-Anbieter (»ein an deiner Schule freigegebenes KI-System«).
- Keine Anmeldung, kein Server, keine Tracker; Eingaben nur lokal (localStorage in try/catch), Freitexte werden nicht gespeichert.
- Externe Anwendungen werden verlinkt, nicht eingebettet; das Bildschirmfoto dient als Vorschau und als Ersatz ohne Netz.
- Fachbegriffe (Adaptivität, kognitive Aktivierung, formative Diagnostik u. a.) nur in aufklappbaren Vertiefungen.
- Bewegung: kein Autoplay. Die frühere Ausnahme, der gleitende Fächer der Galerie (Entscheidung vom 18.10.2026, ab Version 4.3), ist mit Version 4.36 entfallen (Entscheidung vom 13.11.2026): Er zeigte dieselben Karten wie »Alle Beispiele« und bewegte sich ohne Eingabe. Die erlaubten Ausnahmen stehen ab Version 4.38 an einer Stelle: `DESIGN.md`, Input-First Rule (Wiedererkennung einmal je Sitzung: Passer der Überschriften, Registrieren der Platten auf der Startseite). Gestrichen sind der Einflug beim Scrollen (Version 4.2 bis 4.17) und die Parallaxe der Collage (bis 4.8). Seit Version 4.39 bewegt sich auch beim Erscheinen nichts mehr ohne Eingabe (Entscheidung vom 14.11.2026): Das Leporello der Einblicke ist gestrichen, »Vom Blatt zum Tablet« steht gleich am Tablet, die Stundenlinie zeichnet sich nicht mehr. Text ist nie erst nach einer Bewegung lesbar; eine statische Ansicht ist jederzeit verfügbar.
- Unterrichtsbeispiele: Die Suche steht oben im Kopf; Treffer erscheinen direkt darunter, die Adresse merkt sich das Suchwort (`#suche=…`). Jede Karte führt mit einem Klick zur Beschreibung und mit einem weiteren in die laufende Anwendung.
- Offene Punkte zu den Daten stehen in `docs/datenluecken.md`, offene Punkte der Versionen in `docs/version-*.md`.

## Brand Commitments

- Name in der Oberfläche: **Kidu · Künstliche Intelligenz und digitaler Unterricht** (seit 10. November 2026; vorher »Papierprobe · Kompass für KI und digitalen Unterricht«, davor »Hilde Digital«). Unter der Wortmarke steht immer die ausgeschriebene Zeile; die Anfangsbuchstaben K · I · d · U sind darin hervorgehoben. Nicht an eine Schule gebunden. Das Werkzeug »Geht es auf Papier genauso gut?« heißt weiter »Papierfrage«.
- Jede Seite trägt in der Fußzeile: »Kidu · Künstliche Intelligenz und digitaler Unterricht · Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.« Die Startseite zeigt zusätzlich zurückhaltend: »Arbeitsstand – Einladung zur gemeinsamen Weiterentwicklung«.
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
