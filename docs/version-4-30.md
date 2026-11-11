# Version 4.30 – Mein Fortbildungsbogen: Fragekarte, Fragen zum Unterricht mit Tablets, Weg in der Fußzeile

Stand: 11. November 2026 · Branch `fortbildungsbogen-digital`

Grundlage: Rückmeldung Mario zu 4.29 (»Grundsätzlich gut. Allerdings … das Layout der Aufgaben weiter verbessern … einen direkten Pfad in Kidu [Linkreihe der Fußzeile] … neue Fragen, welche die Erfahrung abdecken zum Thema digitaler Unterricht«).

## Neu

- **Fragekarte** (`src/fortbildungsbogen.html`, `assets/fortbildungsbogen.js`, `assets/hilde.css`): Jede Frage steht auf einem Blatt mit versetzter Platte. Oben Zähler und Laufleiste, links die Frage mit Hilfe und abgesetztem Beispiel (»Zum Beispiel«), rechts die Antworten, unten die Steuerung. Über den Antworten steht, wie geantwortet wird (»Eine Antwort. Danach geht es von selbst weiter.« · »Mehrere Antworten sind möglich.« · »Höchstens drei Antworten.«) und bei Mehrfachwahl ein Zähler (»2 gewählt«). Fragen mit mehr als acht Antworten stehen breit in drei Spalten, die Sicherheitsfragen als Dreierreihe. Gewähltes trägt die Bereichsfarbe mit stehender Platte.
- **Ohne Scrollen:** Solange der Bogen läuft, tritt der Seitenkopf zurück (Klasse `mfb-laeuft`: kleiner Titel, Marker und Einleitung ausgeblendet). Bei 1280 × 720 beginnt die Karte bei 193 px statt 399 px; rutscht ihr Kopf aus dem Fenster, wird sie nachgeführt.
- **Neun Fragen zur Erfahrung mit digitalem Unterricht:** neuer Schritt »Tablet bisher« (Tablet-Klassen ja/nein · seit wann · was die Lernenden am Tablet tun · wie oft etwas, das auf Papier nicht ginge · schon eingesetzte Formen · was gut läuft · was zu schaffen macht · wie Phasen geführt werden · Sicherheit, eine Phase zu führen) und im Schritt »Deine Wünsche« die Frage, was sich im Unterricht mit Tablets als Erstes ändern soll. Sechs Schritte statt fünf, 29 Fragen und die Stunde.
- **Bedingte Fragen:** Wer »In keiner« Tablet-Klasse antwortet, bekommt die acht Tablet-Fragen nicht (Feld `wenn`); der Zähler rechnet mit (»von 21«). Antworten auf ausgeblendete Fragen zählen in der Auswertung nicht.
- **Auswertung** (`REGELN.startpunkt`, Codeblock jetzt `fortbildungsbogen v2`): neues Ergebnis `tablet` (keine · ablage · phasen · offen) als Beschreibung ohne Rangfolge; auf dem Bogen der Abschnitt »Dein Unterricht mit Tablets« mit »Läuft gut« und »Macht zu schaffen«. Ablenkung, fehlender Überblick, keine Absprachen oder Unsicherheit führen zu den sechs Regeln für Tablet-Phasen; »vor allem Ablage«, fehlende Ideen oder der Wunsch nach Papier zur Papierfrage (höchstens einmal). Der Tablet-Schritt steht direkt nach dem ersten Anlass. Fünftes Sicherheitsfeld »Tablet-Phase«.
- **Fußzeile** (`tools/bauen.py`, Liste `FUSS`): »Mein Fortbildungsbogen« steht auf jeder Seite in der Linkreihe nach »Werkzeugkiste«.

## Geprüft

- `python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py`
- Regeln: vier neue Tests in `tests/regeln.test.js`; Browser: Fragekarte, bedingte Fragen, Höchstzahl, Dreierreihe, Bogen, Fußzeile in `tests/e2e.py`.
- Bildschirmfotos bei 1280 × 720, 820 × 1180 und 390 × 844; kein waagerechtes Scrollen.
- PDF: ein üblicher Bogen passt auf eine Seite (Druck mit `zoom:.8`); mit sehr vielen Kreuzen und langen Texten werden es zwei.

## Offen

- Dauer: »etwa zwölf Minuten« ist geschätzt, nicht gemessen. Bei 1280 × 720 passt die längste Frage (»Wofür hast du KI schon eingesetzt?«, elf Antworten) nicht ganz ins Bild.
- Erprobung mit Kolleg*innen steht aus: Sind die neuen Fragen verständlich, sind 29 Fragen zu viele?
- Die Karten des Bogens in der Fortbildung auszuwerten (Prüfauftrag für den Codeblock v2) ist noch nicht gebaut.
