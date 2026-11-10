# Kidu – Regeln für die Arbeit an diesem Projekt

Name seit 10.11.2026 (Entscheidung Mario): »Kidu · Künstliche Intelligenz und digitaler Unterricht«. Unter der Wortmarke steht immer die ausgeschriebene Zeile. Kidu ist nicht an eine Schule gebunden. Frühere Namen: »Hilde Digital« (bis 01.11.2026), »Papierprobe · Kompass für KI und digitalen Unterricht« (01.–10.11.2026). Das Werkzeug »Geht es auf Papier genauso gut?« heißt »Papierfrage«. Repository und GitHub-Pages-Adresse heißen seit 10.11.2026 `kidu` (Entscheidung Mario; vorher `hilde-digital`, die alte Seiten-Adresse wird nicht weitergeleitet).

Diese Datei liest Claude Code zu Beginn jeder Sitzung. Sie gilt auch für jede andere Bearbeitung.

## Leitsätze
- Erst das Anliegen, dann das Werkzeug.
- KI kann Unterricht vorbereiten. Digitalität kann Lernen gestalten. Beides kann zusammenkommen – muss es aber nicht.
- Nicht zeigen, was technisch möglich ist, sondern was Unterricht und schulische Arbeit konkret verbessert.

## Feste Rahmenbedingungen
- Arbeite nur auf einem eigenen Branch. Zusammenführen in den Hauptzweig nur auf ausdrückliche Anweisung oder Freigabe zum Umsetzen im Chat (z. B. »führe PR 5 zusammen«). GitHub Pages nicht aktivieren oder ändern (Ausnahme: Umbenennung in `kidu` am 10.11.2026 auf Anweisung).
- Keine KI-Anbindung, keine simulierten KI-Antworten, keine Namen von KI-Anbietern. Sprich von einem »an deiner Schule freigegebenen KI-System«.
  Ausnahme (Entscheidung Mario, 31.10.2026): Die landeseigenen Angebote in Baden-Württemberg, **F13** und **AIS.chat**, dürfen auf Erklärseiten ausdrücklich genannt werden – immer mit Stand und dem Hinweis, dass die Schulleitung freischaltet. Prompts und kopierbare Aufträge bleiben anbieterneutral.
- Verlinkte Lernanwendungen liegen in anderen Repositories. Nur verlinken, nie ändern.
- Keine Namen von Kolleg*innen, keine Schülerdaten, keine persönlichen Daten.
  Ausnahme (Entscheidung Mario, 01.11.2026): Der Name des Urhebers, Mario Walter, steht im Abschnitt »Wie Kidu entstanden ist« auf ueber.html, in der Urheberzeile der Fußzeile, in README.md, ENTSTEHUNG.md, LICENSE und LICENSE-TEXTE.md. Keine Kontaktadresse, keine E-Mail.
- Lizenz: Texte und Daten CC BY-NC-SA 4.0 (LICENSE-TEXTE.md), Code MIT (LICENSE), Bilder alle Rechte vorbehalten. Lizenzen nur auf ausdrückliche Anweisung ändern.
- Kidu ist ohne Auftrag einer Schule entstanden. Die Seiten stellen sie nicht als Auftragsarbeit oder Schulkonzept dar.

## Inhalt
- Einfache Sprache: kurze Sätze, eine Aussage pro Satz, Anrede »du«.
- Keine Fachbegriffe auf Start- und Bereichsseiten (Liste in tools/pruefen.py). Fachbegriffe nur in aufklappbaren Vertiefungen.
- Nichts erfinden: keine Links, Erfahrungen, Wirkungen oder Funktionen, die nicht belegt sind. Unbekanntes heißt »noch offen«.
- Unterrichtserfahrungen sind persönliche Beobachtungen, kein Wirksamkeitsnachweis.
- Keine Entwicklungsstufen: Eine umfassende Lernumgebung ist nicht besser als ein punktueller Einsatz.
- »Analog oder hybrid« ist ein vollwertiges Ergebnis. Motivation allein ist kein Lernmehrwert.
- Phasen, Anliegen, Umfang und Rollen stehen nur in assets/daten/taxonomien.js und werden überall gleich verwendet.

## Wahrheit der Daten
- Titel, Kurzbeschreibung, Fach, Status und Links der Beispiele nicht verändern.
- Unbelegte Felder bleiben leer; die Oberfläche zeigt »noch offen«. Keine Werte erfinden.
- Didaktische Zuordnungen (Phase, Umfang, Rolle, Mehrwert-Art) dürfen vorgeschlagen werden, stehen dann aber in `vorschlag` und in docs/datenluecken.md (`python3 tools/datenluecken.py`).
- Konzeptbeispiele: Status »Idee«, kein Link, kein echtes Vorschaubild, keine Erfahrung; Kennzeichen »Konzeptbeispiel – noch nicht erprobt«.
- Status nur: Idee · in Entwicklung · Prototyp · im Unterricht erprobt · In Überarbeitung · für die Präsentation vorbereitet · noch offen.
- »Karte zum Zweiten Weltkrieg« und »Politik-Check 1919« bleiben »In Überarbeitung«; der Politik-Check trägt »kein Angebot der bpb«.

## Kennzeichnung
- Jede Seite trägt in der Fußzeile: »Kidu · Künstliche Intelligenz und digitaler Unterricht · Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.«
- Kein Schullogo, keine Nachahmung des schulischen Erscheinungsbilds, keine Kontaktadresse, keine Platzhalter im Quelltext.
- Interne Notizen gehören nicht in dieses Repository (es ist öffentlich).

## Technik
- Statisches HTML, CSS und wenig JavaScript. Kein Framework, keine fremden Schriften, Skripte oder Tracking.
- Seiteninhalt steht in src/*.html; Kopf- und Fußzeile nur in tools/bauen.py.
- Alle Beispiele stehen in assets/daten/beispiele.js. Neues Beispiel = neuer Eintrag dort.
- Empfehlungsregeln stehen kommentiert in assets/regeln.js; jede Regeländerung braucht einen Test in tests/regeln.test.js.
- Regeln des Selbstchecks stehen kommentiert in assets/check-regeln.js (Daten: assets/daten/qualitaet.js); jede Änderung braucht einen Test in tests/check-regeln.test.js. Stärke-Hinweise in der Galerie nur aus einem freigegebenen Check (Feld `qualitaetscheck`).
- Daten als JS-Dateien, nicht als JSON per fetch, damit die Seiten per file:// laufen.
- Gestaltung nur über die Variablen in assets/hilde.css (siehe gestaltung.html).
- Vor jedem Commit: `python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py`.

## Arbeitsweise
- Jede Änderung auf einem eigenen Branch, als Pull Request zur Freigabe.
- Nie direkt in den Hauptzweig committen: Er wird über GitHub Pages veröffentlicht.
- Vor dem Zusammenführen den Prüfbefehl auf dem Branch ausführen; nur zusammenführen, wenn alles besteht und es keine Konflikte gibt. Danach den Branch löschen und das Ergebnis melden.
