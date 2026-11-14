# Version 4.41 – Digitaler Unterricht als Fahrplan

Stand: 14. November 2026 · Branch `fahrplan-4-41`

Grundlage: Entscheidung Mario (14.11.2026): Entwurf B2 aus Claude Design umsetzen (Canvas »Kidu – Digitaler Unterricht: fünf Entwürfe«, zweite Runde »B weiterentwickelt – Fahrplan mit Flächen und Ringlinie«), nachmessen, als Pull Request zusammenführen. Vorher: Recherche zur Neugestaltung der Bereichsseite (bessere Orientierung, Phasen klarer trennen) und fünf Richtungen A–E im Canvas.

## Neu

- **Fahrplan statt vier Spalten und Register.** Die vier Phasen stehen untereinander. Jede Phase ist ein `<details>`: Der Kopf zeigt Wann, Name, den Satz der Phase und »n Werkzeuge«; antippen klappt sie am selben Ort auf. Alle 18 Werkzeuge stehen in ihrer Phase. Das Register »Alle Werkzeuge nach Phasen« ist gestrichen – eine Struktur, keine doppelten Links.
- **Flächen im Wechsel** (Wunsch Mario: »die farbliche Unterscheidung der Bereiche wie bei A«): Phase 1 und 3 auf Fläche, 2 und 4 auf Petrol-zart. Die offene Phase liegt auf einer versetzten Petrol-Platte.
- **Ringlinie.** Petrol führt von Kreis zu Kreis, von den Grundlagen gestrichelt bis »dann rund um jede Stunde«. Eine Linie in Druckschwarz führt von Kreis 4 zurück zu Kreis 2, darunter steht »Nächste Stunde: wieder bei 2«. So zeigt die Seite: Die Grundlagen klärst du einmal, 2 bis 4 laufen jede Stunde.
- **»Alle Werkzeuge zeigen« / »Alle zuklappen«** über der Liste (Muster GOV.UK step by step), mit `aria-expanded`. Der Satz daneben: »Tipp eine Phase an. Du kannst bei jeder Nummer einsteigen.«
- **Inhalt der Phasen:** Phase 2 mit den zwei Türen und »oder« dazwischen, darunter »Dazu, wenn du willst:« mit Aufgabenkoffer, Ideen und Kniffe, Methodenkoffer, Papierfrage, Digital-Check. Phase 3 mit »Karte für die Tafel« als eigenem Eintrag und einer Vorschau der Karte (Text wie auf `tablet-phasen.html`). Phase 4 in drei Gruppen: Für dich · Im Kollegium · Zum Weitergeben.
- **Sprungmarken bleiben:** `#phase-grundlagen`, `#phase-erstellen`, `#phase-unterrichten`, `#phase-nach`, `#t-kollegium` öffnen ihre Phase; `#t-probe` führt weiter zur Papierfrage.
- **Druck:** Beim Drucken stehen alle Phasen offen, der Knopf fehlt; danach ist alles wie vorher. Kopf und kurze Phasen bleiben auf einer Seite.
- **Ohne Skript:** Die Phasen klappen trotzdem auf; nur »Alle Werkzeuge zeigen« fehlt.
- `assets/fahrplan.js` (neu), `assets/hilde.css` (Fahrplan; Regeln der vier Spalten und des Registers gestrichen), `src/unterricht.html`, `tools/pruefen.py` (Zahl im Kopf gegen die Links der Phase, kein Werkzeug doppelt; das Skript steht in der Liste der geführten Wege), `tests/e2e.py` (25 neue Browser-Prüfungen, 7 angepasst), `DESIGN.md` (Fassung 4.41, Abschnitt »Fahrplan der Bereichsseite«, Screen-Width, One-Order, Line-to-Target, Three-Tap), `README.md`, `ueber.html` (Was ist neu).

## Anders als im Entwurf

- Das Zeichen zum Aufklappen ist das Plus-Kästchen der Vertiefungen (wie überall in Kidu) statt »zeigen ▾ / Zuklappen ▴«.
- Phase 4 hat drei Gruppen statt zwei, damit »Mein Rückmeldebogen« der letzte Schritt bleibt (Entscheidung vom 13.11.2026).
- Am Telefon bleibt der Satz der Phase sichtbar; die Zahl der Werkzeuge steht darunter.
- Die Seite nutzt `<details>` (geht ohne Skript), der Entwurf Kästchen. Die Regler des Entwurfs gibt es auf der Seite nicht: Der Rückweg ist immer da, die Grundlagen liegen auf Fläche.

## Gemessen (Chromium, Schriften geladen)

| Ansicht | Ergebnis |
| --- | --- |
| Beamer 1280 × 720 | Leitband bis 267 px, »Alle Werkzeuge zeigen« 279–327 px, die vier Phasen enden bei 681 px, »Nächste Stunde« bei 714 px; im Beamer-Theme gleich |
| iPad quer 1180 × 820 | Phasen enden bei 709 px |
| iPad 1024 × 768 | Phasen enden bei 741 px |
| iPad hoch 820 × 1180 | Phasen enden bei 968 px |
| Telefon 390 × 844 | kein waagerechtes Scrollen, auch mit allen Phasen offen; der Fahrplan beginnt unter dem ersten Bildschirm |
| Spalten aufgeklappt | vier bei 1920 px, drei bei 1440, zwei bei 1024–1280, eine bei 820 und 390 |
| Tipps | jedes der 18 Werkzeuge mit zwei Tipps (Phase, Werkzeug); vorher einer über das Register |
| Bewegung | nach dem Laden und beim Auf- und Zuklappen läuft keine Animation |
| Linien | der Rückweg beginnt am Rand von Kreis 4 und endet mit der Spitze am Rand von Kreis 2, Abweichung 0 px |
| Kontrast | kleinster Wert im Kopf 5,8 : 1 (Petrol auf Petrol-zart) |
| Zielflächen | Kopf jeder Phase 68 px hoch (Telefon 153 px), Knopf 48 px |
| Druck A4 | sechs Seiten, Leitband und Fahrplan auf Seite 1–4, alle Phasen offen |

## Noch offen

- Nicht aus der Cloud prüfbar: echtes iPad (Safari, Tippen), VoiceOver (liest die Überschrift im aufklappbaren Kopf vor?), Beamer im Raum.
- Die Prüfung mit axe-core lief nicht: `tests/vendor/axe.min.js` fehlt. Taste und Impeccable fehlen als Plugins.
- Ob zwei Tipps statt einem stören, zeigt erst der Gebrauch.

## Geprüft

Siehe Pull Request.
