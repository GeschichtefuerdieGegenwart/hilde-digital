# Version 4.10 – Belege, Lernende und KI, Beratungsstunde

Stand: 31. Oktober 2026 · Branch `belege-und-lernende-mit-ki`

Grundlage: Forschungsbericht »KI und digitale Medien im Unterricht« (31.10.2026), Vorschläge A1–A4, B1–B3, C1–C3 und Entscheidung D1. Auftrag und Freigabe zum Umsetzen: Mario, 31.10.2026.

## Neu und geändert

| Nr. | Was | Wo |
| --- | --- | --- |
| A1 | Papierprobe mit Zusatzfrage zum Lesen: Bei längeren Texten kommt ein Hinweis, den Text auf Papier auszugeben. Die Einstufung ändert sich nicht. | `assets/regeln.js` (mit Tests), `assets/probe.js`, `src/unterricht.html` |
| A2 | Kopierbare Aufträge an Plugin 0.3.0 angeglichen: »erst selbst, dann KI«, Stelle ohne KI, keine Noten durch KI; Faktencheck mit Wiederholung; Erprobung mit Beobachtungsfrage und Beleg ohne KI | `assets/daten/werkstatt.js` (mit Tests) |
| A3 | Ehrliche Zeitformel: »Der Entwurf geht schneller, die Prüfung bleibt bei dir.« | `src/ki.html`, `src/sicher.html`, `src/fortbildung.html` |
| A4 | Vertiefung »Was die Forschung sagt – mit Belegstand« (neun Befunde, je mit »belegt · vorläufig · offen«) | `src/mehrwert.html`, Klasse `.belegstand` in `assets/hilde.css` |
| B1 | Neue Seite »Wenn deine Lernenden mit KI arbeiten«: drei Regeln, kopierbarer Lern-Auftrag ohne Lösungen, Verweis auf den Auftrag KI-Regeln, Landesangebote, Belege in der Vertiefung | `src/lernende-ki.html` |
| B2 | »Vier Arten, KI und Tablet zu nutzen« | `src/ueber.html` |
| B3 | Muster »Antworten vergleichen« mit einem Weg für Lernende mit KI (»Noch nicht erprobt«) | `assets/daten/werkstatt.js` (Feld `lernende`, mit Test), `assets/werkstatt.js` |
| C1 | Neue Seite »Beratungsstunde: acht Wochen«; Fortbildungsbaustein als Einstieg gekennzeichnet | `src/beratung.html`, `src/fortbildung.html`, `src/unterricht.html`, `src/ueber.html` |
| C2 | Selbstcheck: Rahmenfragen »längerer Text am Gerät?« (digitale Typen) und »Stelle ohne KI?« (nur Lernangebot mit KI), je mit Entwicklungsschritt | `assets/daten/qualitaet.js`, `assets/check-regeln.js` (mit Tests), `assets/check-weg.js` |
| C3 | Galerie: neues Feld `beobachtung` (Datum eines Beobachtungsbogens). Detailseite zeigt bei erprobten Beispielen »Beobachtungsbogen: noch offen« oder das Datum. Status unverändert, kein Wert eingetragen. | `assets/daten/beispiele.js`, `assets/beispiel-seite.js`, `tools/pruefen.py` |
| D1 | F13 und AIS.chat werden auf Erklärseiten genannt, mit Stand; Prompts bleiben anbieterneutral | `CLAUDE.md`, `src/ki.html`, `src/sicher.html`, `src/ueber.html`, `src/lernende-ki.html`, `src/beratung.html` |

## Gelaufen

- `python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – keine Verstöße, 117 Unit-Tests, alle Browser-Tests (darunter 18 neue Prüfungen, 390 px ohne waagerechtes Scrollen für beide neuen Seiten).

## Nicht gelaufen

- Safari/iPadOS, echter Beamer, VoiceOver, axe `wcag22aa`.

## Nur du kannst das

- Angaben zu F13 und AIS.chat am Stand der Landesseiten prüfen (Recherche 31.10.2026; Altersgrenze für Lernende nicht gefunden).
- Daten für `beobachtung` eintragen, sobald Beobachtungsbögen vorliegen (nur Datum).
- Den Weg für Lernende bei »Antworten vergleichen« erproben.
- D2 (Vorlagen zur Prüfungskultur) und D3 (»Labor oder Plenum?«) sind nicht Teil dieser Version.
