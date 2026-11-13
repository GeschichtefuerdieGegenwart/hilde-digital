# Version 4.35 – Der Film bekommt eine Kamera

Stand: 12. November 2026 · Branch `film-kamera`

Grundlage: Auftrag Mario, 12.11.2026 – »Pitch-Film filmischer machen«; Kameraskript (Drehbuch Fassung 4) von Mario freigegeben mit fünf Entscheidungen: Säulen als Stich mit Aderlinien · neue Aufnahmen, mit Blick auf die ganzen Einheiten im GGK-Labor · zwei weitere Beispiele im Vorbeiflug · Werkzeuge in Kapitel 5 als eine Zeile · die Startseite zieht mit.

## Neu

- **Kamera.** Jede Szene hat eine Welt, die eine Kamera verschiebt und vergrößert. Schnell beim Wechsel, langsam, wenn etwas geschieht.
- **Länge.** Der Film dauert jetzt 170 Sekunden (Entscheidung Mario, 12.11.2026: lieber länger als gehetzt). Der Knopf heißt »Film ansehen · knapp 3 Minuten«.
- **Kapitel 1.** Fünf Tablets liegen auf einem Tisch. Die Kamera fährt auf eines zu, ein Arbeitsblatt legt sich auf das Glas, ein Heftstreifen kommt dazu. Dann stellen sich die Tablets auf und werden zu Schnellheftern im Regal.
- **Kapitel 3.** Zwei Säulen mit Sockel, Schaft und Kapitell. Die Kamera steigt am Schaft nach oben und schwenkt zur zweiten Säule. Im Weitwinkel senkt sich die Galerie langsam auf beide Säulen: »Auf beiden Säulen steht die Galerie. Sie zeigt, wie beides im Unterricht aussieht.«
- **Kapitel 5.** Langsamer: 17 statt 12 Sekunden.
- **Kapitel 7.** Neuer Schwerpunkt: »Die Beispiele werden im Unterricht erprobt. Aus der Rückmeldung werden sie weiterentwickelt.« Die Schleife heißt jetzt Erprobt → Rückmeldung → Überarbeitet → Regel für alle, mit dem bisherigen Beispiel aus Geschichte.
- **Kapitel 8.** 68 Sekunden. Erst ein Titel: »Die Galerie. Echte Lernseiten aus dem Unterricht. Zum Ansehen, Ausprobieren und Weiterdenken.« Dann Startseite und Galerie von Kidu. Die Politik-Werkstatt in vier Schritten: wählen (Stimmzettel), auszählen (Hürde ab, Halbrund neu), Rückmeldung (Kontrollfrage mit Begründung), Koalition (Mehrheit suchen, dann verhandeln). Danach Psycho-Labor (Bild »Straße«) und GGK-Labor (ganze Einheit, Abstimmung, Quelle aufgedeckt). Schluss: zwölf Beispiele als Wand, »Ansehen. Ausprobieren. Darüber sprechen.«
- **Kapitel 9.** Der Bau aus Kapitel 3 kommt wieder, mit einer dritten, gestrichelten Säule: »noch frei«.
- `assets/film/`: 22 Aufnahmen (WebP, zusammen rund 1,6 MB). Sie laden erst, wenn der Film geöffnet wird.
- `assets/film.js`: Standbilder für »Weniger Bewegung« nutzen die Zeit, die die Bühne nennt (`kapitel[n].bild`).

## Zeiten

Problem 0–12 · Frage 12–19 · Zwei Säulen 19–36 · Prinzipien 36–52 · Unterricht 52–69 · KI-Training 69–83 · Lernschleife 83–95 · Galerie 95–163 · Einladung 163–170.

## Herkunft der Bilder und Zahlen

- Alle Ansichten in Kapitel 8 sind Bildschirmfotos vom 12.11.2026: Kidu selbst und die verlinkten Lernseiten. An den Lernseiten wurde nichts geändert; sie wurden nur geöffnet und bedient.
- **Stimmzettel:** Im Film wird kein Kreuz gesetzt. Der Film soll keine Stimme für eine Partei oder Person zeigen. Stattdessen wird der leere Zettel abgegeben; die Lernseite antwortet: »Der Zettel ist leer. Ein leerer Zettel zählt als ungültig.«
- **Kontrollfrage:** Die Rückmeldung »Passt. … Union und SPD kämen zusammen auf 297 statt 328 Sitze …« ist der Text der Lernseite.
- **Koalition:** Angekreuzt werden CDU, CSU und SPD – das Bündnis, das laut Lernseite seit Mai 2025 regiert (328 Sitze, Mehrheit ab 316).
- »3,5 s« im Psycho-Labor ist die Zeit des aufgenommenen Durchgangs, kein Messwert aus einer Klasse.
- Der Zustand »aufgedeckt« der Quelle wurde für die Aufnahme freigeschaltet, ohne Codewort der Lehrkraft. Im Bild steht keine Stimme einer Klasse.
- »29 Beispiele, im eigenen Unterricht erprobt«: unverändert, Stand der Galerie am 12.11.2026.

## Was der Film verdichtet

- In der Politik-Werkstatt rechnet die Seite sofort neu. Der Film schwenkt erst zum Halbrund und blendet dann um. Zwischen Tipp und neuem Halbrund liegt deshalb rund eine Sekunde.
- Zwischen Koalitionsrechner und Verhandlung liegt auf der Lernseite noch die Karte »Drei Kriterien prüfen«. Der Film überblendet direkt zur Verhandlung.
- Im Psycho-Labor tippt man nach »Gefunden!« auf die Stelle im Bild. Der Film zeigt gleich das Ergebnis.

## Unterschied zum Pitch-Film

- Die Fassung auf der Seite trägt weiter **keine Kontaktadresse**.

## Offen

- Auf dem iPad und in Safari noch nicht angesehen. Geprüft wurden Standbilder in Chromium, nicht der flüssige Lauf.

## Geprüft

`python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – Ergebnis im Pull Request.
