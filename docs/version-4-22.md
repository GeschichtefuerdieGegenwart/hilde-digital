# Version 4.22 – Das Rad blättert, die Bereichsseite ordnet neu

Stand: 10. November 2026 · Branch `hebel-register`

Grundlage: Rückmeldung Mario nach 4.21 (»die sechs Hebel nicht linear untereinander … man scrollt sich immer weiter nach unten, das ist ermüdend«) und sein Diktat zur Bereichsseite. Musterbuch »Hebel-Fächer Z1 bis Z3« (10.11.2026), Wahl Mario: **Z1 Rad als Register**. Entscheidungen: Muster werden zu »Ideen und Kniffe« mit Erklärsatz; fünf Sätze bleiben unter »Austausch im Kollegium«.

## Neu

- **Z1 Rad als Register** (`sechs-hebel.html`, `assets/sechs-hebel-rad.js`): Der Abschnitt »Die sechs Hebel – einer nach dem anderen« rückt direkt unter den Kopf. Mit JavaScript steht nur das Band des im Rad gewählten Hebels mit seiner Probe; »Weiter«/»Zurück« gehen reihum, der Stand wird angesagt; in Ruhe ist kein Hebel gewählt. Sprungmarken (`#sh-messen`) zeigen ihren Hebel gleich. Ohne JavaScript alle sechs Bänder untereinander wie bisher. Bänder nutzen jetzt die volle Breite (`main .sh-hebel{max-width:none}`).
- **Bereichsseite »Digitaler Unterricht«**: »Wann funktioniert digitaler Unterricht?« als Leitkachel neben dem Hauptwerkzeug (statt der schmalen Zeile); Reihenfolge darunter: Unterricht planen · Digital-Check · Mein Ist-Stand · Was passt gerade zu mir · Tablet-Phasen gut führen · Nach der Stunde. Hinweiszeile »Ideen und Kniffe für digitalen Unterricht« mit Erklärsatz (Sammlung, kein Weg); `muster.html` trägt denselben Marker und verweist auf die Hebel-Seite.
- `DESIGN.md` (Z1, Leitkachel, Ausnahmenliste), »Über Papierprobe«, README.

## Nicht geändert

»Für den Austausch im Kollegium« (Fortbildungsbaustein, Beratungsstunde, fünf Sätze, Leitsätze) bleibt, wie es ist – später.

## Regeln, die eingehalten sind

Erst Ruhe, dann Bewegung · ein großer Moment je Seite (R1; das Register ist Übergang zwischen Lernschritten, 320 ms) · keine Reihenfolge der Hebel (leeres Register in Ruhe, Rad ohne Anfang, reihum) · Richtung trägt Bedeutung · Tastatur und »Weniger Bewegung« ohne Bewegung · ohne JavaScript alles lesbar · Beamer 1280 × 720 auf beiden Seiten · nichts gespeichert.

## Geprüft

`python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – Ergebnis im Pull Request. Browser-Tests angepasst (Proben wählen erst den Hebel im Rad; Bereichsseite mit Leitkachel und Reihenfolge) und neu: Register zeigt ein Band, Weiter/Zurück reihum, Tastatur ohne Bewegung, Zurücknehmen leert, ohne JavaScript sechs Bänder, Sprungmarke.

## Offen

- Rückblick nach zwei bis drei Wochen: Finden Kolleg·innen die Proben, wenn in Ruhe kein Band steht?
- Austausch im Kollegium und fünf Sätze neu ordnen (später).
- Danach: KI-Training als zweite Säule.
