# Hilde Digital – Version 4.1: Mit KI prüfen, kürzerer Planungsweg, Laufband

Stand: 18. Oktober 2026. Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.

## Was neu ist

| Bereich | Änderung |
| --- | --- |
| Digital-Check, Weg B | Die Textsuche nach Signalwörtern entfällt. Neu ist »Mit KI prüfen«: ein fertiger Prüf-Auftrag zum Kopieren. Er enthält alle 14 Bereiche des Qualitätsmodells mit Fragen, Stufen, analoger Alternative und Risiko, den Vergleich mit Papier, die Regel »Technik rettet keine schwache Aufgabe« und eine feste Gliederung der Antwort (Stärke zuerst, keine Noten, keine Prozente). Wahlweise passt er sich an den Materialtyp an. Wortlaut: `docs/pruef-auftrag.md`, Code: `assets/pruef-prompt.js`, 9 Tests in `tests/pruef-prompt.test.js`. |
| Warum kein Upload? | Eine eingebaute KI mit Datei-Upload bräuchte einen Server, einen Vertrag und eine Datenschutzprüfung. Das ist noch offen. Die Seite sagt das offen. |
| Weg A | Unverändert. Bleibt gleichwertig daneben, damit Lehrkräfte selbst ins Nachdenken kommen. |
| Unterricht planen | Vier Fragen statt fünf. Frage 2 lautet: »Was soll dein digitaler Abschnitt vor allem bewirken?« Zuerst stehen sechs klare Ziele (Motivieren, Verständnis, Üben, Zusammenarbeit, Lernstand, Leistung feststellen), alles Weitere unter »Weitere anzeigen«. Auch die Mehrwert-Frage zeigt zuerst nur sechs Antworten. »Was gilt in deiner Klasse?« ist kein eigener Schritt mehr, sondern freiwillig und aufklappbar unter der Umfang-Frage. Die kurzen Ziel-Formulierungen stehen in `assets/daten/taxonomien.js` (Feld `ziel`); die Regeln der Karte sind unverändert. |
| Galerie | Neues Laufband mit allen 37 Ansichten. Es gleitet langsam (etwa 24 px/s, linear, nur `transform`), hält beim Überfahren, beim Fokus, per Knopf und außerhalb des Bildschirms an. Bei »weniger Bewegung« steht es still und lässt sich von Hand verschieben. Jedes Bild öffnet die Bildansicht. Bewusste Ausnahme von der Regel »kein Autoplay«, festgehalten in PRODUCT.md und DESIGN.md. |

## Offen

- Weiterentwicklung von Weg A (Selbst prüfen): für eine spätere Projektphase vorgesehen.
- Eine eingebaute KI-Prüfung mit Upload: braucht Server, Vertrag und Datenschutzprüfung.
