# Hilde Digital – Version 2

Stand: 17. Oktober 2026. Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.

## Prüfbefehl

```
python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py
```

## Was neu ist

| Bereich | Änderung |
| --- | --- |
| Showroom | Neun neue Beispiele (sieben aus der Durchsicht der HTML-Materialien, dazu »TEACCH – Visualisierte Materialien« und »Widerstandsformen im NS« nach erledigter Korrektur). Didaktische Zuordnungen sind Vorschläge und stehen in `docs/datenluecken.md`. |
| Showroom | Vier Beispiele sind jetzt direkt nutzbar: Übungsplattform Lebenswelten, Fachbegriffe-Trainer, Sexualpädagogische Dialoge, Landkarte der Einheit »Spiel«. Sie liegen in der Sammlung `sozpaed-psychologie`. |
| Startseite | Band »Was bisher entstanden ist«: vier Kennzahlen, gezählt aus `assets/daten/beispiele.js`, und bis zu drei neue Beispiele (Feld `aufgenommen`). Hinweis auf die neue Seite zum Mehrwert. |
| Neue Seite | `mehrwert.html` – »Wie wir den Mehrwert prüfen«: drei Fragen, ein ausgedachtes Beispiel, was bewusst nicht getan wird, geplante Stärke-Hinweise, Sicherheit der Einschätzung, Stand der Entwicklung. Fachbegriffe nur in den Vertiefungen. Erreichbar über Startseite, Fußzeile, Über-Seite und jede Detailseite. |
| Detailseite | Abschnitt »Qualitätscheck«: ohne freigegebenen Check steht »noch offen«. »Passt dazu«: bis zu drei ähnliche Beispiele nach einer offenen Regel (verwandt 6, gleiches Fach 3, gleiches Anliegen 1 Punkt). |
| Über das Modul | »Was ist neu?«, ein weiterer Leitsatz, Hinweis auf den Qualitätscheck. |
| Gestaltungssystem | Bausteine ab Version 2: Prüfkette, Punkte für ein Paar von Einschätzungen, Stärke-Hinweis, Kennzahlen, Zeitstrahl. |
| Prüfungen | `pruefen.py`: neue Seite, Fachbegriffe auf »Mehrwert« und »Über« nur in Vertiefungen, Regeln für das Feld `qualitaetscheck`. `e2e.py`: neue Seite in allen Durchläufen, Qualitätscheck, »Passt dazu«, Kennzahlen; Bildtest wartet auf verzögert geladene Bilder. |

## Qualitätscheck: vorbereitet, nicht befüllt

Das Feld `qualitaetscheck` ist angelegt, aber bei keinem Beispiel gefüllt. Die Prüfungen nach dem Qualitätsmodell (Fassung 2) liegen nur als KI-gestützte Entwürfe vor und sind nicht freigegeben. Ein Eintrag braucht: Datum, Sicherheit mindestens »mittel«, höchstens drei Stärken ohne Zahl. Erst dann zeigen Karte und Detailseite die Stärken.

Die Namen der geplanten Stärke-Hinweise sind auf der Seite in einfacher Sprache formuliert (zum Beispiel »anschauliche Darstellung« statt »anschauliche Visualisierung«).

## Offen

- Status der beiden neu aufgenommenen Beispiele (TEACCH, Widerstandsformen): »noch offen«.
- Gallery Walk und Lerntheorien: ohne Link, bis die Bildrechte geklärt sind.
- Die Sammlung `sozpaed-psychologie` braucht eingeschaltete GitHub Pages, damit die vier neuen Links funktionieren.
