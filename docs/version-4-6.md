# Version 4.6 – Zwei Grobziele und Korrekturen

Stand: 26. Oktober 2026 · Grundlage: Entscheidung der Lehrkraft im Chat vom 26.10.2026 (zwei Grobziele) und eine Liste kleiner Korrekturen.

## Was neu ist

| Bereich | Änderung |
| --- | --- |
| Zwei Grobziele | Hilde Digital hat zwei gleichwertige Grobziele. A: KI-Kompetenz im Kollegium – auch für analog unterrichtete Klassen, Hilfe zur Selbsthilfe, für Einsteiger*innen und Fortgeschrittene. B: Kompetenz, digitalen Unterricht zu gestalten – vorhandenen Unterricht begründet digitalisieren (punktuell · phasenweise · durchgängig, ohne Rangfolge), Material prüfen, Tablet-Phasen führen, danach hinschauen. Die Galerie ist der gemeinsame Beispielvorrat. Eingetragen in `src/ueber.html` (Abschnitt »Wozu Hilde Digital da ist«, Eintrag unter »Was ist neu?«) und `PRODUCT.md` (Product Purpose). Die Startseite blieb unverändert, weil ihre Beschreibung der zwei Bereiche den Grobzielen nicht widerspricht. |
| Prompt-Generator | Die Schritte heißen Ziel · Ergebnis · Kontext · Anfrage · Prüfen, die fünf Teile einer Anfrage Ziel · Kontext · Anforderungen · Format · Prüfkriterien. Jetzt steht bei jedem Schritt, welcher Teil entsteht (z. B. Schritt »Ergebnis« = Teil 4 »Format«), und in der Liste der fünf Teile, in welchem Schritt sie entstehen. Nur Beschriftung (`teil` in `assets/ki-weg.js`, `schritt` in `assets/daten/texte.js`), keine Änderung der Logik. |
| Digitaler Unterricht | Die Werkzeugkarte »Ideen finden« ist entfernt. Stattdessen steht am Ende der Werkzeugliste der Hinweis »Beispiele findest du in der Galerie« mit Link. Der Bereich hat jetzt sieben Werkzeuge; der Browser-Test zählt entsprechend. |
| Name | `PRODUCT.md` nannte unter »Brand Commitments« fälschlich »mit Bindestrich«. Korrigiert: »Hilde Digital« ohne Bindestrich seit Version 4. Im Quelltext der Seiten und Skripte kam »Hilde-Digital« nicht mehr vor; `docs/version-3.md` bleibt als historischer Stand unverändert, `tools/pruefen.py` prüft weiterhin auf den alten Namen. |

## Geprüft, aber nicht zutreffend

- »Acht Stolpersteine«: Auf `tablet-phasen.html` stehen acht Stolpersteine, die Seite nennt keine Zahl. Nichts zu korrigieren.
- Digitaler Beitrag 0–3: Alle vier Stufen sind in `assets/daten/qualitaet.js` in Worten benannt (kein erkennbarer Beitrag · geringer Beitrag · klarer Beitrag · besonderer digitaler Mehrwert); »gering« ist Stufe 1 der Skala. Der Papiervergleich (gleich gut · mit mehr Aufwand · nur eingeschränkt · kaum) ist die dritte Frage des Digital-Checks und bleibt eine eigene Skala. Keine Regel geändert, keine Tests geändert.
- Literaturhinweis auf `mehrwert.html`, unverändert: »Trautwein, Sliwka & Dehmel (2018): Grundlagen für einen wirksamen Unterricht. Drei Grunddimensionen der Unterrichtsqualität.«

## Prüfungen

- `tools/pruefen.py`: keine Verstöße.
- `node --test`: 102 von 102 bestanden (keine Regeländerung, keine neuen Tests).
- `tests/e2e.py`: 232 Prüfungen, alle bestanden; die Zählung der Werkzeuge auf »Digitaler Unterricht« ist auf sieben angepasst. axe-core lief nicht (`tests/vendor/axe.min.js` fehlt).
- Browser-Tests: Chromium meldet beim schnellen Seitenwechsel unter `file://` eine abgebrochene Seitenüberblendung (`@view-transition` in `hilde.css`) als Fehler – auch auf dem Hauptzweig. `tests/e2e.py` übergeht diese eine Browsermeldung jetzt; echte Fehler der Seiten werden weiter gezählt.

## Offen

- Die Formulierung der zwei Grobziele auf »Über Hilde Digital« ist ein erster Vorschlag und wartet auf Rückmeldung.
- Ob die Startseite die zwei Grobziele ausdrücklich nennen soll: noch offen.
