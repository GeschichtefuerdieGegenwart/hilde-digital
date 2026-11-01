# Version 4.11 – Leitsätze als Thesenbogen

Stand: 1. November 2026 · Branch `leitsaetze-thesenbogen`

Grundlage: Entwurf A »Thesenbogen mit Stationen« aus der Design-Fläche »Zehn Leitsätze – Entwürfe« (Designsystem Gegenwart), Auswahl und Freigabe Mario, 1.11.2026. Umgesetzt mit den Variablen aus `assets/hilde.css`, ohne Gegenwart-Bundle (Entscheidung 27.10.2026).

## Geändert

- `src/leitsaetze.html`: Leitsatz 1 groß als Kopf; Farblegende; Fahrplan mit fünf Stationen (Vor der Planung · Beim Gestalten · In der Stunde · Immer · Danach); Leitsätze 2–10 als Thesenbogen mit großen Nummern; fünf Bildzeichen (Papier = Tablet · drei Umfänge gleich stark · Tablet-Phase zwischen Auftrag und Plenum · Überlagerung Tablet × KI · drei gleichwertige Ausgänge); offene Fragen. Wortlaut der zehn Sätze und der offenen Fragen unverändert.
- `assets/hilde.css`: neue Variablen `--leitakzent` (Oxid #9b402d, Beamer #7a2e1f) und `--leitakzent-zart`; Bausteine `.ls-*`; Druckfassung weiter auf einer Seite A4 (Stationen als Randspalte, Bilder ausgeblendet).
- `src/gestaltung.html`: Farbgruppe »Leitakzent«.
- `src/ueber.html`: »Was ist neu?«.
- `tests/e2e.py`: zehn Sätze über `[data-leitsatz]`, fünf Stationen, Leitakzent nur bei Leitsatz 1.

## Bewusst anders als im Entwurf

- Keine Fraunces (Entscheidung E4): Die Leitfrage steht in Bricolage.
- Überdruck nur im Bild, in dem sich Tablet und KI wirklich überlagern, nicht als Farbe der Nummer 8 (Regel in `gestaltung.html`: »nie als Kategorie«).
- Kein Dunkel-Theme (Hilde hat Hell und Beamer).

## Nicht gelaufen

Safari/iPadOS, echter Beamer, Druck auf einem echten Drucker.
