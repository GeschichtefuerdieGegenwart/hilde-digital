# Version 4.8 – Bewegungsschalter, Bewegungs-Tokens, Ansichtswechsel, Beamer-Ansicht

## Teil 1 – Bewegungsschalter und Regeln aus Gegenwart

Stand: 27. Oktober 2026 · Grundlage: Analyse vom 27.10.2026 und Freigabe der Lehrkraft im Chat (Paket 1 von Version 4.8, zehn Punkte). Branch `v48-bewegung-und-regeln`.

### Was neu ist

| Nr. | Bereich | Änderung |
| --- | --- | --- |
| 1 | Schalter »Weniger Bewegung« | Im Fuß jeder Seite (`tools/bauen.py`) ein Knopf mit `aria-pressed`. Er setzt `html[data-bewegung="weniger"]`; die Wahl liegt nur im Browser (`hilde.bewegung`, gleiche Benennung wie `hilde.merkliste`). Ein kleines Skript im Kopf der Seite setzt das Attribut vor dem ersten Zeichnen, damit nichts flackert. `hilde.css`: beide `prefers-reduced-motion`-Blöcke gelten jetzt auch unter dem Attribut (die Regeln stehen zweimal, weil sich Medienabfrage und Attribut nicht in einer Selektorliste verbinden lassen – Kommentar im CSS); die `no-preference`-Blöcke (Einflug, Collage-Drift, weiches Blättern der Bühne) sind an `html:not([data-bewegung="weniger"])` gebunden. JavaScript: `ruhig()` in `motion.js`, `hilde.js` (auch als `HILDE.ruhig()`), `faecher.js`, `digitalisieren.js` und `showroom.js` prüft Attribut und Systemeinstellung. Umschalten wirkt sofort (Ereignis `hilde:bewegung`): Der Fächer hält an, wird flach, der Knopf »Anhalten« verschwindet; ein laufendes Abspielen springt in den Endzustand. `anfangen.js` und `beispiel-seite.js` prüfen nichts selbst, sie rufen `HILDE.stundenlinieZeichnen()` – damit ist der Schalter dort abgedeckt. »Eingaben löschen« setzt den Schalter mit zurück (gleicher Speicherpräfix). Dokumentiert in DESIGN.md (Bewegung) und auf `gestaltung.html`. |
| 2 | Tafelkarte | `.tafelkarte-titel` nutzte `var(--titel)`, die es nicht gibt – jetzt `var(--schrift-titel)` (Bricolage Grotesque). `font-weight: 800` in `.tafelkarte-titel`, `.ablauf-zeit` und `.leitsatz-liste li::marker` auf 700 gesetzt (800 ist nicht geladen). Browser-Test prüft die gerechnete Schriftfamilie und das Gewicht. |
| 3 | Fächer | Keine Dauerbewegung mehr: Nach einem vollen Durchlauf springt der Fächer unauffällig an den Anfang und steht (`angehalten = true`, nicht gespeichert). »Weiterlaufen lassen« startet einen weiteren Durchlauf. Nebenbei behoben: Ein Mausklick auf »Anhalten« oder »Weiterlaufen lassen« hielt den Fächer über den Fokus fest; jetzt hält nur sichtbarer Fokus (Tastatur) an. DESIGN.md: Ausnahme »Dauerbewegung« angepasst. |
| 4 | Was passt gerade zu mir? | Unter jeder Skala steht sichtbar »Gewählt: sehr stark (5 von 5)« bzw. »Noch nichts gewählt«; es aktualisiert sich beim Wählen und beim Löschen. Die Ziffern 1–5 bleiben, die Worte stehen weiter im Radio-Label (für Vorleseprogramme), die sichtbare Zeile ist `aria-hidden`. |
| 5 | Schritt n von m | In den drei geführten Wegen (Unterricht planen, Selbst prüfen, Prompt-Generator) steht »Schritt 2 von 5« sichtbar neben den Stanzloch-Punkten (`--gr-klein`, leise). Für Vorleseprogramme bleibt der Text im Schritt und in der Ansage; die sichtbare Zeile ist `aria-hidden`, damit nichts doppelt vorgelesen wird. |
| 6 | Hover nur bei Maus | `.schritte li>button:hover`, `.option:hover`, `input:hover`, `.stufe:hover` stehen jetzt unter `@media (hover:hover) and (pointer:fine)`. |
| 7 | Vom Blatt zum Tablet | Der Zeitgeber (900 ms nach dem Laden) ist weg. Ein beschrifteter Regler (»Vom Blatt zum Tablet«, `<input type="range">`) zieht zwischen »Arbeitsblatt auf Papier« und »Dieselbe Aufgabe am Tablet« – Finger, Maus, Tastatur; beide Zustände stehen als Text unter dem Regler, der aktuelle fett, dazu `aria-valuetext`. Das Bild hängt an `--t` (0–1): nur Deckkraft und Lage; der Tablet-Rahmen ist eine eigene Fläche über dem Blatt (statt Rand und Rundung des Blatts zu ändern). Abspielen von selbst höchstens einmal, wenn das Motiv ins Bild kommt (IntersectionObserver, 380 ms, auslaufend); jede Berührung übernimmt. Bei weniger Bewegung kein Abspielen – der Regler steht gleich am Tablet (Endzustand). **Abweichung:** Die Klassen `.geraet` / `.geraet.digital` tragen keine Gestaltung mehr; `digital` wird nur noch ab der Mitte gesetzt. Grund: Ein Regler braucht Zwischenzustände, die zwei Klassen nicht haben. |
| 8 | Beamer-Test | `tests/e2e.py` prüft bei 1280 × 720 ohne Scrollen jetzt auch `unterricht.html` (Überschrift und Hauptwerkzeug) und `galerie.html` (Überschrift, Suche, »Zum Anfangen«). Beide bestanden ohne Anpassung am Layout. Neue Tests für den Schalter: Klick setzt das Attribut, nach dem Neuladen bleibt es, der Fächer gleitet nicht, der zweite Klick schaltet zurück. Dazu Tests für Punkte 2–7 und 9. |
| 9 | Status-Tokens | `--erfolg` #2E6B34, `--warnung` #8A5300 (aus DESIGN.md) angelegt, dazu `--erfolg-zart` #E3EEE2, `--warnung-zart` #F5E6C6, `--fehler-zart` #F8E9E2 und `--fehler-tief` #5E2410. `.hinweis-fehler` nutzt die Variablen statt harter Hexwerte. Kontrast nachgerechnet: Erfolg auf Erfolg zart 5,4:1, Warnung auf Warnung zart 5,1:1, Fehler auf Fehler zart 5,6:1, Fehler tief auf Fehler zart 10,2:1, Druckschwarz auf allen drei über 12:1 – alle AA. Werte in DESIGN.md. Warnung zart ist bewusst etwas kühler als Honig zart (#F5E8CF), damit Hinweis und Warnung nicht gleich aussehen. |
| 10 | gestaltung.html | Der Satz »Nie über 300 ms« ist jetzt »Regel: höchstens 300 ms« plus die Liste der begründeten Ausnahmen aus DESIGN.md (Plattenwechsel 320, Leporello 380, Vom Blatt zum Tablet 380, Durchschlag 420, Flug 440, Passer 620, Zählwerk 720). Dazu neue Bausteine: Schalter, Vom Blatt zum Tablet, Status-Farben. |

### Prüfungen

- `tools/pruefen.py`: keine Verstöße.
- `node --test`: 102 von 102 bestanden (keine Regeländerung in `regeln.js` oder `check-regeln.js`).
- `tests/e2e.py`: alle Browser-Tests bestanden, mit 38 neuen Prüfungen für Version 4.8 (siehe Punkt 8). axe-core lief nicht (`tests/vendor/axe.min.js` fehlt).
- Bildschirmfotos angesehen: `digitalisieren.html` bei 1280 px mit Regler in der Mitte und am Tablet, `passt.html` mit gewählter Stufe, `tablet-phasen.html` als Druckansicht (Tafelkarte in Bricolage), Fuß mit gedrücktem Schalter.

### Offen

- Der Schalter verstärkt die Systemeinstellung nur; eine Wahl »mehr Bewegung als das System« gibt es bewusst nicht.
- Teil 2 von Version 4.8: siehe unten.

## Teil 2 – Bewegungs-Tokens, Ansichtswechsel, Beamer-Ansicht

Stand: 27. Oktober 2026 · Pakete 2 und 3 der Analyse vom 27.10.2026. Branch `v48-bewegung-vertiefen-beamer`.

### Was neu ist

| Nr. | Bereich | Änderung |
| --- | --- | --- |
| 1 | Dauer- und Kurven-Tokens | Jede feste Bewegungszahl aus `hilde.css` und den Skripten steht jetzt einmal als Variable in `:root` von `hilde.css`: `--dauer-staffel` 30, `--dauer-hefterzahl` 110, `--dauer-stanzloch` 160, `--dauer-andruck` 220, `--dauer-einflug` 240, `--dauer-stundenlinie` 260, `--dauer-langsam` 300 (Obergrenze der Regel), `--verzug-auszug` 100; Ausnahmen `--dauer-plattenwechsel` 320, `--dauer-leporello` 380 (`-staffel` 70), `--dauer-blatt` 380, `--dauer-durchschlag` 420, `--dauer-flug` 440, `--dauer-reihe` 440, `--dauer-passer` 620, `--dauer-zaehlwerk` 720 (`-staffel` 60). Neue Kurve `--ease-beidseits` (cubic-bezier(.77,0,.175,1)) für Flug, Plattenwechsel und Ansichtswechsel. `HILDE.dauer("flug")` (in `hilde.js`; `motion.js` hat eine gleichnamige Funktion, weil es auch ohne `hilde.js` läuft) liest den Wert in Millisekunden; `motion.js`, `hilde.js` und `digitalisieren.js` nutzen ihn statt eigener Zahlen. **Nur benannt, nichts verändert:** alle Werte sind die bisherigen. Die Wartezeiten des Fächers (4–8 s Ruhe nach Berührung) sind keine Bewegungsdauern und bleiben in `faecher.js`. |
| 2 | Ansichtswechsel Karte ↔ Detail | Mit View Transitions wandern Bild und Titel eines Beispiels von der Karte (Galerie-Treffer, »Zum Anfangen«, Einblicke, kleine Empfehlungskarten) zur Detailseite und zurück (`--dauer-reihe` 440 ms, `--ease-beidseits`); die übrige Seite blendet weiter in 200 ms über. Namen `bild-<id>` und `titel-<id>`. **Nur eine Instanz je Beispiel:** Weil ein Beispiel in der Galerie mehrfach steht, vergibt `hilde.js` die Namen erst beim Klick auf die eine geöffnete Karte (`data-wechsel`, `data-wechsel-bild`, `data-wechsel-titel`); die Detailseite benennt Hauptbild und Überschrift beim Zeichnen; auf dem Rückweg benennt die Galerie die erste sichtbare Karte des Beispiels (ID kurz in `sessionStorage` unter `hilde.wechsel`) und setzt den Fokus auf ihren Link. Bilder füllen die Gruppe mit `object-fit: cover` (`view-transition-class: bild`). Bei weniger Bewegung `animation: none` für alle Gruppen, und es wird nichts benannt. Browser ohne View Transitions wechseln wie bisher sofort. |
| 3 | Knopf-Druck | `.knopf:active` und `.wahlflaeche:active` rücken um `--andruck` 2 px nach rechts unten (`translate(2px, 2px)`) statt zu schrumpfen; die versetzte Platte wird beim Drücken entsprechend kürzer (`:hover:active`). Große Flächen (Galerie-Zugang, Werkzeuge, Einblicke, Collage) drücken weiter mit `--druck-gross` 0,99 – sie haben keine Platte, auf die sie rücken könnten. |
| 4 | Collage und Einflug | Die scroll-gesteuerte Parallaxe der Startseiten-Collage (`collage-drift`, `collage-gegen`) ist gestrichen; damit gilt »kein Parallax« in DESIGN.md ohne Ausnahme. Der Einflug beim Scrollen rückt noch 6 px statt 24 px. |
| 5 | Beamer-Ansicht | `html[data-theme="beamer"]` in `hilde.css` setzt nur Variablen: Grund #FFFFFF, Fläche #F6F3EE, Karton #ECE7DE, Text #000000, Leise #3A342E, Stahl #4A433B, Linie #C9C1B4, Honig-Kante #7A4F12, Petrol #0F4F4B, Überdruck #13380E, Aktion #000000 mit weißem Text, Erfolg #1F4F24, Warnung #6B4000, Fehler #8A1E14. Honigplatte, zarte Flächen, Bilder und Duplex-Vorschauen bleiben; `color-scheme` bleibt `light`. Schalter »Beamer-Ansicht« im Fuß neben »Weniger Bewegung« (`tools/bauen.py`, `aria-pressed`), Wahl in `hilde.theme`, Kopfskript setzt das Attribut vor dem ersten Zeichnen, Ereignis `hilde:theme`; »Eingaben löschen« setzt es mit zurück (gleicher Speicherpräfix). **Abweichung:** Fläche ist nicht reines Weiß, sondern eine Tonstufe darunter (#F6F3EE) – Karten haben keine Haarlinie und wären auf weißem Grund unsichtbar gewesen (im ersten Entwurf mit Fläche = Weiß verschwanden »Unterricht planen« und »Digital-Check« gegen den Grund). |
| 6 | Doku | DESIGN.md (Beamer-Ansicht mit Kontrasttabelle, Tokens, Andruck, Ansichtswechsel, Einflug, Parallaxe), `gestaltung.html` (Bausteine »Beamer-Ansicht«, »Von der Karte zum Beispiel«, Tokens, Drücken), »Was ist neu?« in `ueber.html`. |

### Kontraste der Beamer-Ansicht (nachgerechnet, WCAG 2)

| Farbe | Auf Grund #FFFFFF | Auf Fläche #F6F3EE | Auf Karton #ECE7DE |
| --- | --- | --- | --- |
| Text #000000 | 21,0:1 | 19,0:1 | 17,1:1 |
| Leise #3A342E | 12,3:1 | 11,1:1 | 10,0:1 |
| Stahl #4A433B | 9,7:1 | 8,8:1 | 7,9:1 |
| Petrol #0F4F4B | 9,4:1 | 8,5:1 | 7,6:1 |
| Honig-Kante #7A4F12 | 7,1:1 | 6,4:1 | 5,8:1 |
| Überdruck #13380E | 13,1:1 | 11,9:1 | 10,7:1 |

Text auf Honigplatte 11,2:1 · Honig-Kante auf Honigplatte 3,8:1 (Nicht-Text) · Weiß auf Petrol 9,4:1, Fläche auf Petrol 8,5:1 · Weiß auf Überdruck 13,1:1 · Weiß auf Aktion 21,0:1 · Erfolg auf Erfolg zart 8,0:1 · Warnung auf Warnung zart 7,2:1 · Fehler auf Fehler zart 7,8:1. Alle Textpaare ≥ 4,5:1; Fließtext auf Grund und Fläche ≥ 7:1.

### Prüfungen

- `tools/pruefen.py`: keine Verstöße.
- `node --test`: 102 von 102 bestanden (keine Regeländerung in `regeln.js` oder `check-regeln.js`).
- `tests/e2e.py`: alle 324 Browser-Prüfungen bestanden, davon 22 neu für Teil 2: Tokens stehen in `hilde.css` und `HILDE.dauer` liest sie; keine Parallaxe-Regel mehr; `.knopf:active` mit `translate(var(--andruck))` statt `scale`; Einflug 6 px; Ansichtswechsel (beim Zeichnen kein Name, beim Klick und auf der Detailseite genau einer, zurück in der Galerie höchstens einer); Beamer-Schalter (Lage im Fuß, Klick, `hilde.theme`, Neuladen, Zurückschalten, »Eingaben löschen«); Kontraste im Beamer-Theme aus den gerechneten Farben (alle Textpaare ≥ 4,5:1, Fließtext und Leise ≥ 7:1, Fläche gegen Grund unterscheidbar, `color-scheme` light); Start, Galerie und Digitaler Unterricht bei 1280 × 720 im Beamer-Theme ohne Scrollen. axe-core lief nicht (`tests/vendor/axe.min.js` fehlt).
- Nebenbei behoben: Die Schalter im Fuß (`.fuss-einstellung`) sind jetzt im Druck ausgeblendet – mit dem zweiten Schalter passten die Leitsätze sonst nicht mehr auf eine Seite A4 (Test bestand wieder).
- Bildschirmfotos angesehen: Start, Galerie und Digitaler Unterricht im Beamer-Theme bei 1280 × 720, Beispielseite in beiden Ansichten, Start normal. Fuß mit gedrücktem Schalter »Beamer-Ansicht«.

### Offen

- Der Ansichtswechsel ist nur in Browsern mit View Transitions zwischen Seiten zu sehen (Chromium, Safari 18.2); Firefox wechselt sofort. Nicht als Mangel gewertet.
- Die Beamer-Ansicht ist eine Browser-Wahl, keine Systemeinstellung; ob sie am Beamer der Schule wirklich besser lesbar ist, ist noch offen – bisher nur gerechnete Kontraste.
