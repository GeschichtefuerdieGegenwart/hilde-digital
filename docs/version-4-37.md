# Version 4.37 – Ganze Einheit, neue Phasennamen, Schaubild »Wo in der Stunde«

Stand: 13. November 2026 · Branch `einheit-4-37` · Pull Request 2 von 2 zum Auftrag »Digitaler Unterricht in Kidu – Sichtung, Didaktikanalyse, neue Grundlogik, Skills«

Grundlage: Entscheidungen Mario am Haltepunkt 1 (Fassung B für die ganze Einheit, neue Phasennamen) und am Haltepunkt 2 (Freigabe aller Empfehlungen), dazu am 13.11.2026: Name »Mein Rückmeldebogen« bestätigt; neuer Status »in der Praxis erprobt« für die App zum Praxisbesuch.

## Neu

- **Ganze Einheit (Fassung B).** Eine eigene Ebene über mehreren Stunden, keine vierte Stufe des Umfangs. Fünf Merkmale in `taxonomien.js` (Landkarte, Leitfrage, wiederkehrende Bausteine, Sicherung über die Einheit, Stundenfolge) und der Wortlaut von Schritt E »Landkarte der Einheit«.
  - Regel `REGELN.einheit`: Was es schon gibt, fällt aus den nächsten Schritten; die Papierprobe je Stunde steht immer da. Drei Tests. `umfang()` bleibt bei drei Werten.
  - »Unterricht neu planen« fragt zuerst: eine Stunde oder mehrere Stunden als ganze Einheit? Bei einer Einheit kommt Schritt E, danach je Stunde der Weg wie bisher (`assets/einheit.js`).
  - »Bisherigen Unterricht digitalisieren«: unter »Mehr einstellen« die Wahl »Mehrere Stunden als ganze Einheit«. Der Prompt beginnt dann mit Schritt E; der Umfang gilt je Stunde. Ein Test.
  - Unterrichtsbeispiele: drei ganze Einheiten (GGK-Labor: Einheit Nationalsozialismus · Wahlfach Demokratiebildung: Einheit Nationalismus · Psycho-Labor: Reihe im Wahlfach Psychologie). Jede Karte zeigt ihre Teile als Reihe kleiner Stundenlinien; jede Stunde behält ihren Umfang und trägt »Teil einer Einheit«. Neuer Filter »Einheit«. »Zum Anfangen« bleibt bei sechs Beispielen, zwei je Umfang; die Einheiten stehen als eigene Gruppe darunter.
  - Zuordnung der Teile und Rahmen der Einheiten sind **Vorschläge** aus der Sichtung (Feld `vorschlag`, `docs/datenluecken.md`). Status der Einheiten: noch offen.
  - `tools/pruefen.py` prüft: keine Einheit mit eigenem Umfang, mindestens zwei Teile, jede Stunde höchstens in einer Einheit, alle fünf Merkmale im Rahmen.
- **Neue Phasennamen** (Schlüssel bleiben): Sichern und üben · Übertragen und Ausblick · In jeder Phase, jede Phase mit einem Satz zu ihrer Aufgabe. Die Wörter unter der Stundenlinie kommen jetzt aus `taxonomien.js` (bisher fest im Code von `beispiel-seite.js` und `tablets-weg.js`).
- **Regel »kurzer Impuls«** nur noch für Einstieg und Ausblick: Wer am Ende auf einen neuen Fall überträgt (Anliegen »Reflektieren & übertragen«), bekommt eine ganze Phase vorgeschlagen. Ein Test.
- **Schaubild »Wo in der Stunde das Gerät hilft«** auf `sechs-hebel.html`: vier Phasen mit ihrer Aufgabe, den Prinzipien, die in den Beispielen von Kidu dort am Gerät helfen, und dem, was auf Papier und im Raum genauso gut geht. Für »Übertragen und Ausblick« steht ehrlich: noch kein Beispiel in Kidu. Die Modelle (Gagné, Merrill, Rosenshine, Roth, Klauer und Leutner, Meyer) stehen in einer Vertiefung, mit Angabe, was im Volltext gelesen wurde.
- **Fachbegriffe:** »Lehrfunktion« und »Konsolidierung« nur in Vertiefungen (`tools/pruefen.py`).
- **Praxisbesuch 1BKSP · Begleiter:** Status »in der Praxis erprobt« (neuer fester Status, Entscheidung Mario 13.11.2026) und die Rückmeldung als persönliche Beobachtung.
- Bereichsseite: Phase 2 nennt die ganze Einheit; »Was passt gerade zu mir?« weist im Ergebnis darauf hin.
- `CLAUDE.md`: Status-Liste ergänzt, »Mein Rückmeldebogen« in der Liste der festen Namen.

## Noch offen

- Aufgabenkoffer: je Aufgabenform »So sieht sie gut aus« und »Passende Kniffe« (Vorschlag aus Teil 4). Die Zeilen müssen erst geschrieben und geprüft werden; die Kniffe tragen noch keine Zuordnung zu Aufgabenformen.
- Die Einheit »Spiel« (BEF I) und die Politik-Werkstatt sind noch keine Einheiten in Kidu: Ihre Stunden stehen nicht einzeln in den Daten.
- Bestätigung der Vorschläge zu Teilen und Rahmen der drei Einheiten.
- Skills, `DESIGN.md` und die benannten Gestaltungsregeln: Teil 6, nach Haltepunkt 3.

## Geprüft

Siehe Pull Request.
