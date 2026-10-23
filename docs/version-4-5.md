# Version 4.5 – Werkzeuge für Erprobung und Austausch

Stand: 23. Oktober 2026 · Grundlage: Auftrag im Chat vom 23.10.2026 (fünf Bausteine aus dem Abgleich mit den Projektzielen) und Angaben zum Status der Beispiele.

## Was neu ist

| Bereich | Änderung |
| --- | --- |
| Neue Seite `beobachtung.html` | Fünf Fragen nach der Stunde: Lernhandlung, Tablet oder Papier, Zeit für Technik, Aufmerksamkeit, Entscheidung (so lassen · nachschärfen · zurück zu Papier). Drei freiwillige Notizfelder. Auswertung mit höchstens drei Hinweisen und einem nächsten Schritt. Zwei Fragen an die Lernenden zum Abschreiben. |
| Regeln | `REGELN.beobachtung` in `assets/regeln.js`, kommentiert. Der nächste Schritt folgt allein der Entscheidung der Lehrkraft. »Zurück zu Papier« ist ein Fortschritt. Immer der Satz: persönliche Beobachtung, kein Nachweis der Wirkung. |
| Druck | »Bogen drucken« – leer zum Ausfüllen von Hand oder mit Auswertung. Ohne Navigation, Fragen werden nicht über Seiten getrennt. |
| Verknüpfung | Neues Werkzeug »Nach der Stunde« auf »Digitaler Unterricht«; Knopf auf der Entscheidungskarte; Eintrag unter »Über Hilde Digital«. |
| Datenschutz | Gespeichert werden nur die fünf Auswahlwerte (`hilde.beobachtung`), keine Freitexte. Hinweis: keine Namen von Lernenden. |
| Neue Seite `tablet-phasen.html` | Sechs Regeln für Tablet-Phasen und acht Stolpersteine (aus dem Kompass, Abschnitt 6), Bausteine für Lernende (aus den Methodenkarten), Karte für die Tafel zum Ausfüllen und Drucken (A4 quer, speichert nichts). |
| Neue Seite `ist-stand.html` | »Mein Ist-Stand«: fünf Fragen nur für die Lehrkraft, Spiegel ohne Bewertung und bis zu drei nächste Schritte. Regeln in `REGELN.istStand` mit fünf Tests. Gespeichert: nur Auswahl (`hilde.iststand`). |
| Neue Seite `fortbildung.html` | Fortbildungsbaustein für 45 Minuten mit fünf Schritten, Vorbereitung, Hinweisen zur Moderation und Kurzfassung für 20 Minuten. Gekennzeichnet als »noch nicht erprobt«. |
| Neue Seite `leitsaetze.html` | Zehn Leitsätze und drei offene Fragen, gekennzeichnet als »Entwurf · kein Beschluss«, Druck auf genau eine Seite A4. |
| Navigation | »Digitaler Unterricht« hat acht Werkzeuge und einen Abschnitt »Für den Austausch im Kollegium«. `assets/druck.js` steuert die Drucken-Knöpfe. |
| Daten | Elf Beispiele auf »im Unterricht erprobt« (Angabe der Lehrkraft im Chat). Beschlussapp (kein Unterricht) und Anleiter*innentreffen (ohne Link) bleiben »noch offen«. Bisherige Vorschläge bestätigt. Lernaktivitäten, Technik, Dauer und Sozialform aus den verlinkten Anwendungen abgeleitet und als `vorschlag` markiert (`docs/datenluecken.md`). |

## Prüfungen

- `tools/pruefen.py`: keine Verstöße (Seite als Einstiegsseite geprüft, Fachbegriffe-Liste gilt).
- `node --test`: 102 von 102 bestanden, davon 10 neue Tests (Beobachtungsbogen, Ist-Stand).
- `tests/e2e.py`: alle Browser-Tests bestanden, mit neuen Prüfungen für alle fünf Seiten (Auswertung, Fokus, Speichern ohne Freitext, Löschen, Druckfassungen, Leitsätze auf einer Seite, Zoom 200 %). axe-core lief nicht (`tests/vendor/axe.min.js` fehlt).
- Taste lint: 0 FAIL, 0 WARN.
- Mindestprüfung aus `website-design-workflow` 5a für die neuen Seiten: 0 Probleme bei 375–1440 px. Bildschirmfotos angesehen. Druck: Beobachtungsbogen zwei Seiten, Leitsätze eine Seite, Tafelkarte eine Seite quer.

## Offen

- Ob Lehrkräfte Bogen, Karte und Ist-Stand im Alltag nutzen: noch offen.
- Der Fortbildungsbaustein ist nicht erprobt.
- Abgeleitete Angaben in den Beispieldaten warten auf Bestätigung.
- Safari/iPadOS nicht geprüft.
