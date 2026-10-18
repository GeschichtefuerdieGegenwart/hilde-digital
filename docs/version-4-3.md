# Hilde Digital – Version 4.3: Prompt-Labor, Unterricht digitalisieren, Fächer

Stand: 18. Oktober 2026. Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.

Grundlage: Analyse nach Version 4.2 (Taste-Skill, Impeccable-Kritik, Emil Kowalskis Regeln) und Marios Auswahl: I1, I2, I6, Bewegungsmuster A und B (in der Galerie als langsam gleitender Fächer).

## Was neu ist

| Bereich | Änderung |
| --- | --- |
| Unterricht digitalisieren (neu) | Eigene Seite. Fach, Thema, Lerngruppe, Phase; Material (Arbeitsblatt, Präsentation, Stundenverlaufsplan, Text oder Quelle); Vorhaben (Ideen in drei Varianten, Arbeitsblatt digitalisieren, Präsentation interaktiv machen, Differenzieren, Lernstand sichtbar machen, Zusammenarbeit stärken, Prüfen: lieber analog?). Der Prompt enthält die passenden Bereiche des Qualitätsmodells, die Frage »Was kann das Tablet besser als Papier?«, Regeln gegen Ablenkung und die Regeln des Projekts. Erklär-Bewegung »Vom Blatt zum Tablet« einmal im Kopf. 5 Tests. |
| KI-Training | Zwei Eingänge im ersten Bildschirm: »Schnell-Anfrage« (8 Anlässe, drei Angaben, sofortiger Prompt mit den fünf Teilen) und »Prompten lernen« (Generator, Aufbau und Vorher-nachher als Vertiefung). 5 Tests. |
| Schnelle Verbesserungen | KI-Weg Schritt 1 zeigt zuerst vier Ziele, »KI erst einmal ausprobieren« als guter Anfang vorn. Planungsweg Schritt 2 zeigt fünf Ziele. »Digitalität«, »Lernsetting«, »HTML-Lernumgebung« ersetzt und in `pruefen.py` aufgenommen. Werkzeuge ohne Nummern, »Unterricht digitalisieren« zuerst. Einflug beim Scrollen nur noch als Verschiebung – nichts ist unsichtbar. |
| Fächer | `assets/faecher.js`: Mitte gerade und farbig, Ränder gedreht und in Duplex verblassend. Galerie: gleitet langsam (24 px/s), hält an bei Überfahren, Fokus, Berührung, außer Sicht und per Knopf. Startseite: nur von Hand. Darunter Titel, Kurzbeschreibung, »Beispiel ansehen« und »Ausprobieren ↗«. |

## Messwerte

- `pruefen.py`: keine Verstöße. `node --test`: 92 bestanden. `e2e.py`: 211 bestanden (axe-core auf 18 Seiten).
- Taste `lint`: 0 FAIL, 0 WARN. Impeccable `detect`: Die Warnung »marquee« ist weg (der Fächer scrollt statt einer Endlos-Animation).
- Taste `inspect` meldet weiter versetzte Platten an Collage und Fächer-Mitte (bewusst, Druckplatte als Signatur) und auf KI- und Werkzeugseiten wenige Bilder (bewusst: nur echte Ansichten und eigene Motive).

## Offen

- Weg A des Digital-Checks weiterentwickeln (spätere Phase).
- Galerie »Für meine Klasse« braucht Angaben zu Bildungsgang und Ausbildungsjahr je Beispiel.
