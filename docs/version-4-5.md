# Version 4.5 – Beobachtungsbogen nach der Stunde

Stand: 23. Oktober 2026 · Grundlage: Freigabe im Chat (Punkt 3 der Vorschläge vom 23.10.2026) und Abgleich mit den Projektzielen (Ziel »Unterrichtsmodelle erproben und auswerten«).

## Was neu ist

| Bereich | Änderung |
| --- | --- |
| Neue Seite `beobachtung.html` | Fünf Fragen nach der Stunde: Lernhandlung, Tablet oder Papier, Zeit für Technik, Aufmerksamkeit, Entscheidung (so lassen · nachschärfen · zurück zu Papier). Drei freiwillige Notizfelder. Auswertung mit höchstens drei Hinweisen und einem nächsten Schritt. Zwei Fragen an die Lernenden zum Abschreiben. |
| Regeln | `REGELN.beobachtung` in `assets/regeln.js`, kommentiert. Der nächste Schritt folgt allein der Entscheidung der Lehrkraft. »Zurück zu Papier« ist ein Fortschritt. Immer der Satz: persönliche Beobachtung, kein Nachweis der Wirkung. |
| Druck | »Bogen drucken« – leer zum Ausfüllen von Hand oder mit Auswertung. Ohne Navigation, Fragen werden nicht über Seiten getrennt. |
| Verknüpfung | Neues Werkzeug »Nach der Stunde« auf »Digitaler Unterricht«; Knopf auf der Entscheidungskarte; Eintrag unter »Über Hilde Digital«. |
| Datenschutz | Gespeichert werden nur die fünf Auswahlwerte (`hilde.beobachtung`), keine Freitexte. Hinweis: keine Namen von Lernenden. |

## Prüfungen

- `tools/pruefen.py`: keine Verstöße (Seite als Einstiegsseite geprüft, Fachbegriffe-Liste gilt).
- `node --test`: 97 von 97 bestanden, davon 5 neue Tests zum Beobachtungsbogen.
- `tests/e2e.py`: alle Browser-Tests bestanden, davon 12 neue Prüfungen (Auswertung, Fokus, Speichern ohne Freitext, Löschen, Druckfassung, Zoom 200 %). axe-core lief nicht (`tests/vendor/axe.min.js` fehlt).
- Taste lint: 0 FAIL.
- Bildschirmfotos bei 1440 und 390 px angesehen; Druck-PDF: zwei Seiten A4.

## Offen

- Ob Lehrkräfte den Bogen wirklich nach der Stunde nutzen: noch offen.
- Safari/iPadOS nicht geprüft.
