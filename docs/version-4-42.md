# Version 4.42 – Werkzeugseiten: Wo bin ich? Und die ganze Breite

Stand: 14. November 2026 · Branch `werkzeugseiten-fahrplan`

Grundlage: Entscheidung Mario (14.11.2026) für Weg B aus der Recherche »Werkzeugseiten: Wo bin ich?« (Canvas »Kidu – Digitaler Unterricht: fünf Entwürfe«, Seite »Werkzeugseiten: Wo bin ich?«). Dazu sein Auftrag: »Achte darauf, dass die Bildschirmbreite bei jedem Modul genutzt wird und dass auch in den jeweiligen Werkzeugen eine übersichtliche Visualisierung vorzufinden ist.«

Zur Freigabe: Am 14.11.2026 gingen drei Musterseiten an Mario (Aufgabenkoffer, Fortbildungsbaustein, Beobachtungsbogen). Seine Antwort steht noch aus. Die übrigen Seiten sind in derselben Richtung umgestellt.

## Neu

- **Eine Zeile oben (Weg B).** Über der Überschrift jeder Werkzeugseite steht »Fahrplan Digitaler Unterricht › 2 · Digitalen Unterricht erstellen (vor der Stunde)«. Auf den Unterseiten des Digital-Checks steht zusätzlich »› Digital-Check«. Am Telefon steht nur der Weg zurück: »‹ 2 · Digitalen Unterricht erstellen«. Der Link zur Phase öffnet sie auf der Bereichsseite. »Bereich: Digitaler Unterricht« über den Werkzeugen ist gestrichen. Zusätze wie »Für zwei bis drei Lehrkräfte« bleiben.
- **Unten der ganze Fahrplan (Weg B).** »Auch vor der Stunde« zeigt die anderen Werkzeuge der Phase, aussehend wie in der Bereichsseite. In Phase 4 stehen sie in ihren Gruppen. Daneben steht »Der Fahrplan« im Kleinen: vier Platten, Petrol von Phase zu Phase, Druckschwarz von 4 zurück zu 2, »Du bist hier« bei der eigenen Phase. Darunter stehen »Nach der Stunde geht es mit der nächsten Stunde wieder bei 2 weiter.« und »Alle Werkzeuge im Fahrplan«.
- **Eine Quelle.** `src/fahrplan.json` nennt die vier Phasen und alle 18 Werkzeuge. `tools/fahrplan.py` baut daraus die Werkzeuglisten der Bereichsseite und Zeile und Fahrplan auf 18 Seiten (16 Werkzeuge, `selbstcheck.html`, `mehrwert.html`). Die gebaute Bereichsseite ist Zeichen für Zeichen dieselbe wie in 4.41 (verglichen ohne Leerraum und Prüfwerte). `tools/pruefen.py` prüft, dass genau diese Seiten beide Zeichen tragen.
- **Die ganze Breite.** Alle 18 Seiten stehen in der weiten Hülle (112 rem), der Kopf der Seite folgt. Gleichrangiges steht nebeneinander, zum Beispiel »Vorbereitung« und »Für die Moderation«, die sechs Regeln und die Stolpersteine sowie »Rahmen« und »Grenzen«. Abläufe stehen als Karten nebeneinander, Fragen eines Bogens zu zweit oder zu dritt. Fließtext bleibt höchstens 68ch breit.
- **»Auf einen Blick« in jedem Werkzeug**, aus den Inhalten der Seite:

| Seite | Auf einen Blick |
| --- | --- |
| Aufgabenkoffer | Landkarte: alle 18 Aufgaben nach Ziel (Spalten) und Ort (Zeilen). Die Spaltenköpfe filtern wie bisher die Chips. Ein Name öffnet die Aufgabe. Leere Zellen stehen gestrichelt da (6 von 21). Unter 1024 px bleiben die Chips. |
| Ideen und Kniffe | Landkarte: alle 11 Muster nach Phase, Spaltenköpfe filtern. Die »Angaben für alle Aufträge« stehen neben dem Kopf. |
| Fortbildungsbaustein | Zeitleiste der 45 Minuten, die Höhe zeigt die Dauer (8,8 px je Minute). Jeder Schritt führt zu seiner Karte. »Worum es geht« steht im Kopf. |
| Beratungsstunde | Zeitleiste der acht Wochen, jede Woche gleich hoch. »Warum acht Wochen?« steht im Kopf. |
| Beobachtungsbogen, Mein Rückmeldebogen | Der Bogen in Feldern: fünf Fragen und darunter die Entscheidung (bzw. »dein Bogen als PDF«). Jedes Feld führt zu seiner Frage. Am Telefon fällt der Überblick weg, damit das erste Feld oben bleibt. |
| Mein Fortbildungsbogen | Die sechs Schritte so, wie sie im Bogen oben stehen werden, dazu »dein Bogen als PDF, mit bis zu drei nächsten Schritten«. |
| Was passt gerade zu mir? | Neben dem Formular eine Vorschau auf das, was am Ende dasteht (Warum · Passendes Format · Umfang · Deine Rolle · Beispiele · Risikoarme Alternative). |
| Tablet-Phasen gut führen | Vorschau der Karte für die Tafel wie im Fahrplan der Bereichsseite. |
| Wann funktioniert digitaler Unterricht? | Das Prinzipienrad steht jetzt zwischen Text mit Knöpfen und Karte (drei Spalten). |
| Film: Was das Gerät kann | Die Bühne nutzt die ganze Breite, die sieben Kapitel stehen darunter, »Film starten« steht zusätzlich im Kopf. |
| Leitsätze | Die fünf Stationen und »So liest du die Farben« neben dem Kopf. |
| Unterricht neu planen | Die erste Frage (»Eine Stunde – oder mehrere Stunden?«) neben der Überschrift. |
| Bisherigen Unterricht digitalisieren, Digital-Check, Methodenkoffer, Unterseiten des Digital-Checks | hatten schon ein Bild oder Spalten; nur die Breite ist neu. |

- **Prüfungen dazu in `tools/pruefen.py`:** Zeitleisten nennen dieselben Minuten bzw. Wochen und Namen wie der Ablauf. Die Felder der Bögen heißen wie die Überschriften der Fragen. Schritte und Ergebnisfelder stehen auch im Skript (`assets/fortbildungsbogen.js`, `assets/passt.js`).
- **Dateien:** `src/fahrplan.json`, `tools/fahrplan.py` (neu); `tools/bauen.py` (Fahrplan beim Bauen; der Methodenkoffer gehört jetzt zum Bereich »Digitaler Unterricht«); `assets/hilde.css` (Zeile, Fahrplan im Kleinen, Werkzeugkopf, Auf einen Blick, Landkarte, Zeitleiste, Bogen-Felder, Rad in drei Spalten); `assets/aufgabenkoffer.js`, `assets/werkstatt.js` (Landkarten), `assets/sechs-hebel-film.js` (Knopf im Kopf); 18 Seiten in `src/`; `src/unterricht.html` (Werkzeuglisten aus der Quelle); `tests/e2e.py` (Block 5i, angepasste Filtertests); `DESIGN.md`, `README.md`, `CLAUDE.md` (eine Zeile zur Quelle), `src/ueber.html`.

## Anders als im Entwurf B

- »Alle Werkzeuge im Fahrplan« unter dem kleinen Fahrplan führt zur Bereichsseite.
- Phase 3 hat nur eine Seite. Dort steht unten nur der Fahrplan, ohne »Auch in der Stunde«.
- Die Papierfrage heißt in »Auch vor der Stunde« »… auf der Seite »Digitaler Unterricht««, nicht »hier auf der Seite«.
- Die Unterseiten des Digital-Checks tragen Zeile und Fahrplan auch; ihre Zeile nennt zusätzlich den Digital-Check.

## Gemessen (Chromium, Schriften geladen)

Erste Handlung (erstes Bedienelement im Inhalt), Unterkante in px, Beamer 1280 × 720. Methodenkoffer und Digital-Check beginnen mit Links und stehen nicht in der Liste.

| Seite | 4.41 | 4.42 |
| --- | --- | --- |
| Wann funktioniert digitaler Unterricht? | 686 | 609 |
| Film: Was das Gerät kann | 761 (unter der Kante) | 330 |
| Was passt gerade zu mir? | 395 | 410 |
| Mein Fortbildungsbogen | 626 | 699 |
| Unterricht neu planen | 436 | 270 |
| Bisherigen Unterricht digitalisieren | 607 | 642 |
| Aufgabenkoffer | 487 (letzte Chip-Reihe) | 485 (Spaltenköpfe) |
| Ideen und Kniffe | 592 | 369 |
| Tablet-Phasen gut führen | 353 | 368 |
| Beobachtungsbogen | 391 | 502 |
| Fortbildungsbaustein | 378 | 489 |
| Beratungsstunde | 353 | 409 |
| Leitsätze | 320 | 409 |
| Mein Rückmeldebogen | 427 | 538 |

| Ansicht | Ergebnis |
| --- | --- |
| Beamer 1280 × 720 | auf allen 14 Seiten im ersten Bildschirm, höchstens 699 px (vorher eine Seite darunter: der Film) |
| iPad quer 1180 × 820 | höchstens 744 px (Mein Fortbildungsbogen); kein waagerechtes Scrollen, auch bei 1024 × 768 |
| 1920 px | Inhalt 1712–1720 px statt 1136 px; Zeile, Kopf und erster Abschnitt in derselben Breite |
| Telefon 390 × 844 | Überschrift ab 244 px (vorher 188); Beobachtungsbogen: erstes Feld bis 562 px (vorher 546) |
| Kontrast | kleinster Wert 6,1 : 1 (Nummer im Feld eines Bogens); Zeile 13,7 : 1, »Du bist hier« 15,7 : 1 |
| Zielflächen | Zeile und Fahrplan im Kleinen: jeder Link mindestens 44 px; fünf Minuten der Zeitleiste 44 px |
| Bewegung | nach dem Laden läuft auf keiner der 18 Seiten eine Animation |
| Druck A4 | Seitenzahl unverändert (Fortbildungsbaustein 4, Beratungsstunde 5, Beobachtungsbogen 3, Rückmeldebogen 3, Leitsätze 1, Tablet-Phasen 5, Aufgabenkoffer 7, Sechs Prinzipien 10); Zeile, Fahrplan und »Auf einen Blick« fallen im Druck weg. Fortbildungsbaustein und Beobachtungsbogen als Bild angesehen. |

## Prüfung

Gelaufen: `python3 tools/bauen.py` · `python3 tools/pruefen.py` (keine Verstöße) · `node --test` (158 von 158) · `python3 tests/e2e.py` (alle bestanden, darunter 5i mit den neuen Prüfungen) · Mindestprüfung 5a aus `website-design-workflow` (19 Seiten, fünf Breiten, mit und ohne »weniger Bewegung«: 0 Probleme) · Bildschirmfotos bei 1280, 1920, 1180, 1024, 820 und 390 px angesehen · Druck als PDF.

Nicht gelaufen: axe-core (`tests/vendor/axe.min.js` fehlt, Installationen sind gesperrt) · Taste lint/inspect und Impeccable (Plugins nicht da) · echtes iPad mit Safari · VoiceOver und NVDA (wie »Du bist hier« und `aria-current="location"` angesagt werden, ist nicht belegt) · Beamer im Klassenraum.

## Offen

- Deine Antwort zu den drei Musterseiten.
- Ein kurzer Test mit drei bis fünf Lehrkräften am iPad (Vorschlag aus der Recherche).
- Wie der Fahrplan am Seitenende im Alltag gefunden wird (GOV.UK: viele übersehen die Kopfzeile).

## Nur du kannst das

- Freigabe zum Zusammenführen.
- Am iPad (Safari, quer und hoch) und am Beamer im Raum ansehen.
