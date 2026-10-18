# Hilde Digital – Version 4.4: Bewegungsmuster und zwei Bereiche

Stand: 18. Oktober 2026. Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.

Grundlage: Motion-Musterbuch 2 und Marios Auswahl: alle Muster außer H (Druckwalze). Dazu: Die Kategorie »mit KI entwickelt« wird gestrichen.

## Was neu ist

| Bereich | Änderung |
| --- | --- |
| Zwei Bereiche | Es gibt nur noch »KI-Training« und »Digitaler Unterricht«. Die 23 Beispiele mit dem Bereich »beide« gehören jetzt zum Digitalen Unterricht (Lernende arbeiten damit). Kennzeichen, Filter-Chip, Hinweis auf der Startseite und Verweise sind entfernt. Der KI-Einsatz als Merkmal bleibt (»KI hat beim Bau der Anwendung geholfen«). Duplex-Vorschauen neu erzeugt. |
| F Passer | Die Überschriften von KI-Training, Digitalem Unterricht und Galerie rasten einmal je Sitzung ein. |
| G Farbauszug | Collage auf dem Start und Detailbilder der Einblicke: in Ruhe zweifarbig, beim Überfahren das echte Bild. |
| I Stundenlinie | Planungsweg (Umfang) und Entscheidungskarte zeigen den Umfang als Balken auf der Linie der Stunde. |
| J Stanzloch | Erledigte Schritte der geführten Wege sind gelocht. |
| K Schnellhefter | »Merken« an Einblicken, Karten und Beispielseiten. Zahl im Kopf, Liste »Mein Schnellhefter« in der Galerie. Nur im Browser. |
| L Durchschlag | Rückmeldung beim Kopieren eines Prompts. |
| M Zählwerk | Kennzahlen der Startseite rollen einmal auf ihren Wert. |
| N Leporello | Schritte der großen Einblicke entfalten sich einmal (ab 700 px). |
| O Plattenwechsel | Band über der Galerie zeigt den gewählten Bereich. |
| Arbeitsweise | CLAUDE.md: Zusammenführen auf ausdrückliche Anweisung oder Freigabe im Chat. |

## Prüfungen

- `pruefen.py`: keine Verstöße; neu: »mit KI entwickelt« gilt als alter Name.
- `node --test`: alle bestanden; Suchtest für zwei Bereiche.
- `e2e.py`: alle bestanden; neu: Schnellhefter, Plattenwechsel, keine Kategorie »mit KI entwickelt«.

## Bewusst nicht übernommen

- H Druckwalze.
