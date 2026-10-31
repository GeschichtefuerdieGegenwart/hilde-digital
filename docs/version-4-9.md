# Version 4.9 – Wissen fürs Kollegium

Stand: 31. Oktober 2026 · Branch `wissen-fuers-kollegium`

## Worum es geht

Das Wissen hinter Hilde Digital lag bisher vor allem in den Arbeitsnotizen des Projekts: Unterrichtsmuster, Maßstäbe der Fächer, Schutzregeln, ausführliche Anleitungen für KI-Aufträge. Version 4.9 macht vier Teile davon für das Kollegium nutzbar – ohne neue Technik und ohne KI-Anbindung.

## Neu

| Seite | Bereich | Was sie bietet | Grobziel |
| --- | --- | --- | --- |
| `muster.html` Unterrichtsmuster aus der Praxis | Digitaler Unterricht, verlinkt aus dem KI-Training | Neun Muster, je mit drei gleichwertigen Wegen: auf Papier · mit KI vorbereiten (kopierbarer Auftrag) · am Tablet (mit Galerie-Beispielen, wo es sie gibt). Filter nach Phase. | A und B |
| `ki-fach.html` KI für dein Fach einrichten | KI-Training | Was gehört wohin (vier Fragen), Vorlage für eine feste Anweisung je Fach mit drei Beispielen (Geschichte, Gemeinschaftskunde, Erzieher*innenausbildung) und festen Regeln: zuerst zusammenfassen, höchstens drei Rückfragen, [ungeprüft], »Vor dem Kopieren prüfen«, Papier ist vollwertig, keine personenbezogenen Daten. | A |
| `auftraege.html` Aufträge zum Kopieren | KI-Training | Vier Aufträge: Lernmethode einführen · KI-Regeln für eine Aufgabe · Übung »KI-Antworten prüfen« · eine Idee im Unterricht erproben. Dazu Verweise auf »Unterricht digitalisieren« und den Prüf-Auftrag des Digital-Checks. | A |
| `sicher.html` Sicher arbeiten in fünf Regeln | KI-Training | Daten, Prüfen, Bild- und Textrechte, Lernseiten, Persönliches. Zum Ausdrucken. | A und B |

Verlinkt aus `ki.html` (neuer Abschnitt »Weiter im KI-Training«, Link unter »Bevor du loslegst«), `unterricht.html` (eine Zeile unter dem Galerie-Hinweis – bewusst keine neunte Werkzeugkarte, weil Version 5 die Einstiege bündeln soll) und `ueber.html` (Inhalte, »Was ist neu?«).

## Herkunft der Inhalte

- Muster: Bausteine `Unterrichtsmuster/*` und »Fehlvorstellungen nutzen« aus dem Arbeitsgedächtnis (Reihe »Spiel« und Lernfeld »Rechtliche Bedingungen«, Erzieher*innenausbildung). Die Angabe »eingesetzt / ausgearbeitet / noch offen« folgt dem dokumentierten Stand der Reihe (Unterricht bis Doppelstunde 4 am 20.10.2026). Tablet-Wege verlinken nur Galerie-Beispiele mit Status »im Unterricht erprobt«, die dasselbe Muster zeigen; sonst steht »noch offen« oder »auf Papier gleich gut«.
- Fach-Vorlage: Bausteine »Wissen in drei Ebenen«, »Diktat zuerst ordnen«, »Nichts erfinden«, »KI in der Vorbereitung«. Maßstäbe nur für Fächer, für die es im Projekt erarbeitete Maßstäbe gibt.
- Aufträge: Kurzfassungen der Skills `lernmethode-einfuehren`, `ki-grenzen-einer-aufgabe`, `ki-faktencheck`, `praxisforschung-im-kollegium`. Drei davon sind übertragen nach Gareth Manning, *Education Agent Skills Library*, CC BY-SA 4.0; der Hinweis steht auf der Seite.
- Schutzregeln: Bausteine »KI in der Vorbereitung«, »Datenschutz in Lernseiten«, »Bildrechte und Veröffentlichung«, »Schutzregeln für biografische Arbeit und Praxisfälle«, »Beobachten ohne Namen«.

## Technik

- Daten: `assets/daten/werkstatt.js`; Texte bauen: `assets/werkstatt-anfrage.js` (nutzt `SCHNELL_ANFRAGE.baue`, gleiche fünf Teile wie die Schnell-Anfrage); Seiten: `assets/werkstatt.js`.
- Gespeichert wird nur der Phasen-Filter der Muster (`hilde.muster`). Freitexte nie.
- Markierungszeichen im Faktencheck ohne »@« (in `tools/pruefen.py` verboten).
- Tests: `tests/werkstatt.test.js` (7 Unit-Tests), `tests/e2e.py` Abschnitt 2g (17 Prüfungen, darunter 390 px ohne waagerechtes Scrollen).

## Nicht gelaufen

- Safari/iPadOS, echter Beamer, VoiceOver.
- axe mit `wcag22aa` (keine `tests/vendor/axe.min.js` im Branch).

## Nur du kannst das

- Stimmen die Einsatzangaben der Muster (vor allem »Antworten vergleichen« aus der Wiederholungsstunde: eingesetzt oder nicht)?
- Passen die Maßstäbe für Gemeinschaftskunde in einfacher Sprache (Kontroversität, Überwältigungsverbot) so?
- Soll `muster.html` später in Version 5 einer der fünf Einstiege werden oder in die Galerie wandern?
