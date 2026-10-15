# Hilde Digital – Regeln für die Arbeit an diesem Projekt

Diese Datei liest Claude Code zu Beginn jeder Sitzung. Sie gilt auch für jede andere Bearbeitung.

## Leitsätze
- Erst das Anliegen, dann das Werkzeug.
- KI kann Unterricht vorbereiten. Digitalität kann Lernen gestalten. Beides kann zusammenkommen – muss es aber nicht.
- Nicht zeigen, was technisch möglich ist, sondern was Unterricht und schulische Arbeit konkret verbessert.

## Inhalt
- Einfache Sprache: kurze Sätze, eine Aussage pro Satz, Anrede »du«.
- Keine Fachbegriffe auf Start- und Bereichsseiten (Liste in tools/pruefen.py). Fachbegriffe nur in aufklappbaren Vertiefungen.
- Nichts erfinden: keine Links, Erfahrungen, Wirkungen oder Funktionen, die nicht belegt sind. Unbekanntes heißt »noch offen«.
- Unterrichtserfahrungen sind persönliche Beobachtungen, kein Wirksamkeitsnachweis.
- Keine Entwicklungsstufen: Eine umfassende Lernumgebung ist nicht besser als ein punktueller Einsatz.

## Kennzeichnung
- Jede Seite trägt in der Fußzeile: »Hilde Digital (Arbeitstitel) · Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.«
- Kein Schullogo, keine Nachahmung des schulischen Erscheinungsbilds, keine Kontaktadresse, keine Platzhalter im Quelltext.
- Interne Notizen gehören nicht in dieses Repository (es ist öffentlich).

## Technik
- Statisches HTML, CSS und wenig JavaScript. Kein Framework, keine fremden Schriften, Skripte oder Tracking.
- Seiteninhalt steht in src/*.html; Kopf- und Fußzeile nur in tools/bauen.py.
- Alle Beispiele stehen in assets/beispiele.js. Neues Beispiel = neuer Eintrag dort.
- Gestaltung nur über die Variablen in assets/hilde.css (siehe gestaltung.html).
- Vor jedem Commit: `python3 tools/bauen.py && python3 tools/pruefen.py`.

## Arbeitsweise
- Jede Änderung auf einem eigenen Branch, als Pull Request zur Freigabe.
- Nie direkt in den Hauptzweig: Er wird über GitHub Pages veröffentlicht.
