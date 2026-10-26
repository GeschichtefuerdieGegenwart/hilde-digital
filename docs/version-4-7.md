# Version 4.7 – Zum Anfangen und Stundenlinie in der Galerie

Stand: 26. Oktober 2026 · Grundlage: Entscheidung der Lehrkraft im Chat vom 26.10.2026 (Auswahl von sechs Beispielen, zwei je Umfang, ausdrücklich ohne Rangfolge) und der Auftrag, die Stundenlinie (Muster I) in die Galerie zu übertragen.

## Was neu ist

| Bereich | Änderung |
| --- | --- |
| Daten | Neues Feld `auswahl: { grund: "…" }` an sechs Einträgen in `assets/daten/beispiele.js`: `one-step`, `fachbegriffe` (punktuell), `m19-appeasement`, `psycho-ds2` (phasenweise), `m22-wie-war-das-moeglich`, `politik-werkstatt` (durchgängig). Sonst nichts an den Einträgen geändert. `tools/pruefen.py` prüft: genau sechs, zwei je Umfang, alle »im Unterricht erprobt«, jeder mit Grund-Satz, kein Feld für eine Reihenfolge. |
| Galerie: »Zum Anfangen« | Neuer Abschnitt direkt unter der Titelzeile (die Suche bleibt oben rechts wie seit Version 4.2). Drei Gruppen in der Reihenfolge aus `taxonomien.js` (Punktuell · Phasenweise · Durchgängig), nebeneinander ab 900 px, untereinander auf dem Telefon. Je Gruppe eine Stundenlinie als Kopf und zwei große Karten: Bild oder der ehrliche Platzhalter (Rasterpunkte, »noch kein Bild«), Fach, Titel, Grund-Satz, Status, »Mehr dazu« und »Ausprobieren ↗«. Die Auswahlkriterien stehen auf der Seite, dazu der Satz: »Punktuell ist nicht weniger als durchgängig. Die sechs sind ein Anfang, keine Bestenliste.« Der Abschnitt gehört zum Stöbern: Sobald gesucht oder gefiltert wird, tritt er zurück und die Treffer stehen direkt unter der Suche. `assets/anfangen.js`. |
| Startseite | Im Galerie-Abschnitt nur ein Link: »Zum Anfangen: sechs Beispiele, zwei je Umfang«. |
| Stundenlinie auf Karten (I2) | Jede Galerie-Karte (Raster und Bühne) zeigt den Umfang als kleinste Stundenlinie (`zeile`) mit dem Wort daneben – nie nur die Grafik. Ohne Umfang keine Linie, nur »noch offen« (betrifft `bef1`). KI-Training hat keinen Umfang und keine Zeile. Der Umfang ist aus der Merkmalzeile (Phase · Rolle · Anliegen) herausgenommen, damit er nicht doppelt steht. `HILDE.umfangZeile()`. |
| Detailseite | Unter »Wie umfangreich ist der digitale Einsatz?« steht die Stundenlinie mit den Phasennamen. Sie zeichnet sich einmal beim Erscheinen: Der Balken wächst von 0 auf seinen Umfang (260 ms wie im Planungsweg). `HILDE.stundenlinieZeichnen()` – keine zweite Implementierung, dieselbe Funktion wie im Planungsweg. |
| Filter »Umfang« | Aus dem Auswahlfeld unter »Mehr Filter« sind drei Chips in der Suche geworden (alle · Punktuell · Phasenweise · Durchgängig, Namen aus `taxonomien.js`). Daneben eine kleine Stundenlinie: Beim Überfahren oder Fokussieren eines Chips gleitet der Balken in diesen Umfang (200 ms), beim Wählen bleibt er so. Tastatur und Berührung gleichwertig. Der gespeicherte Filter `umfang` bleibt gültig. |
| Technik | `HILDE.stundenlinie()` gibt jetzt ein `<span>` aus (statt `<div>`), damit die Linie in einem Absatz neben dem Wort stehen kann; die Darstellung bleibt gleich. Dritte Variante `zeile` neben `klein`. |
| Gestaltung | DESIGN.md: I2 als Erweiterung von Muster I mit Begründung der Ausnahme (der Balken bewegt `left` und `width`, weil ein per `scaleX` gestreckter Balken seine runden Enden verlöre); Abschnitt »Bewusst nicht übernommen« ergänzt; Do: »Zum Anfangen« nie als Bestenliste. `gestaltung.html` zeigt die Stundenlinie in der kleinsten Form. |

## Motion-Techniken: übernommen und weggelassen

Durchgesehen wurden die Musterbücher der Politik-Werkstatt und des GGK-Labors – nur Technik, keine Farben oder Metaphern.

- **Übernommen:** »Balken wachsen vom Nullpunkt« (Politik-Werkstatt E; Zweibild-Start wie `mv-von` im GGK-Labor) für die Stundenlinie auf der Detailseite und die drei Köpfe von »Zum Anfangen«. Die Bewegung zeigt, dass der Balken ein Stück der Stunde ist. Die drei Köpfe zeichnen sich gleichzeitig – keine Staffelung, weil eine Reihenfolge wie Stufen wirken würde.
- **Bewusst nicht übernommen:** Schwärzung aufdecken für den Grund-Satz (die Schwärzung bedeutet im GGK-Labor »damals nicht zu wissen«; ein Grund-Satz ist kein Geheimnis, und in den ersten Bildern wäre der Text verdeckt – das verstößt gegen »Text immer sofort lesbar«). Gestaffeltes Erscheinen der sechs Karten (der Abschnitt steht beim Laden im Bild; was zu sehen ist, wird nicht versteckt, und eine Folge von punktuell nach durchgängig läse sich wie Stufen). Stimmkarte und Codewort als Mini-Vorschau (Simulation der Lernanwendung). Stempel, Urne, Halbrund (gehören zum Stimmzettel, nicht zur Galerie).

## Prüfungen

- `tools/pruefen.py`: keine Verstöße; neue Regel für die Auswahl.
- `node --test`: 102 von 102 bestanden (keine Regeländerung).
- `tests/e2e.py`: alle Browser-Tests bestanden, mit neuen Prüfungen: sechs Karten in drei Gruppen, Reihenfolge, Grund-Sätze, Links, Stundenlinie auf Karten und Detailseite (Balken gewachsen, höchstens 300 ms), Umfang-Chips mit Vorschau per Maus und Tastatur, »weniger Bewegung« (Endzustand sofort, nichts gleitet), keine Konsolenfehler, kein waagerechtes Scrollen bei 390 / 768 / 1280 px. axe-core lief nicht (`tests/vendor/axe.min.js` fehlt).
- Bildschirmfotos von `galerie.html` und `beispiel.html#m19-appeasement` bei 1280 und 390 px angesehen: Köpfe der drei Gruppen auf einer Höhe, Platzhalter lesbar, Knöpfe nebeneinander.

## Offen

- Drei der sechs Beispiele (`m19-appeasement`, `m22-wie-war-das-moeglich`, `politik-werkstatt`) haben noch kein Bild; sie zeigen den Platzhalter. Bildschirmfotos aus den Anwendungen wären der nächste Schritt (`assets/daten/galerie.js`).
- Ob »Zum Anfangen« auch auf »Digitaler Unterricht« verlinkt werden soll: noch offen.
