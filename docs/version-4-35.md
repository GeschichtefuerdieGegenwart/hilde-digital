# Version 4.35 – Der Film bekommt eine Kamera

Stand: 12. November 2026 · Branch `film-kamera`

Grundlage: Auftrag Mario, 12.11.2026 – »Pitch-Film filmischer machen«; Kameraskript (Drehbuch Fassung 4) von Mario freigegeben mit fünf Entscheidungen: Säulen als Stich mit Aderlinien · neue Aufnahmen, mit Blick auf die ganzen Einheiten im GGK-Labor · zwei weitere Beispiele im Vorbeiflug · Werkzeuge in Kapitel 5 als eine Zeile · die Startseite zieht mit.

## Neu

- **Kamera.** Jede Szene hat eine Welt, die eine Kamera verschiebt und vergrößert. Schnell beim Wechsel, langsam, wenn etwas geschieht.
- **Kapitel 1.** Fünf Tablets liegen auf einem Tisch. Die Kamera fährt auf eines zu, ein Arbeitsblatt legt sich auf das Glas, ein Heftstreifen kommt dazu. Dann stellen sich die Tablets auf und werden zu Schnellheftern im Regal.
- **Kapitel 3.** Zwei Säulen mit Sockel, Schaft und Kapitell. Die Kamera steigt am Schaft nach oben, schwenkt zur zweiten Säule und zeigt dann den ganzen Bau im Weitwinkel.
- **Kapitel 8.** Die Kamera landet auf der Startseite von Kidu, fährt über die drei Wege in die Galerie und taucht in drei Lernseiten ein: Politik-Werkstatt (Hürde ab, Halbrund verteilt sich neu), Psycho-Labor (Bild »Straße«, die Uhr läuft, »Gefunden!«), GGK-Labor (ganze Einheit in neun Modulen, Abstimmung, geschwärzte Quelle wird aufgedeckt). Zum Schluss fliegt sie an »Gene ohne Reisepass« und am »Fachbegriffe-Trainer« vorbei und zeigt zwölf Beispiele auf einen Blick.
- **Kapitel 9.** Der Bau aus Kapitel 3 kommt wieder, mit einer dritten, gestrichelten Säule: »noch frei«.
- `assets/film/`: vierzehn Aufnahmen (WebP, zusammen rund 1,2 MB). Sie laden erst, wenn der Film geöffnet wird.
- `assets/film.js`: Standbilder für »Weniger Bewegung« nutzen die Zeit, die die Bühne nennt (`kapitel[n].bild`).

## Neue Zeiten

Problem 0–12 · Frage 12–19 · Zwei Säulen 19–32 · Prinzipien 32–48 · Unterricht 48–60 · KI-Training 60–74 · Lernschleife 74–82 · Galerie 82–113 · Einladung 113–120. Die Galerie hat jetzt 31 Sekunden (Kameraskript: 28), die anderen Kapitel sind dafür etwas kürzer.

## Herkunft der Bilder und Zahlen

- Alle Ansichten in Kapitel 8 sind Bildschirmfotos vom 12.11.2026: Kidu selbst und die verlinkten Lernseiten. An den Lernseiten wurde nichts geändert; sie wurden nur geöffnet und bedient.
- »Union und SPD: mit Hürde 328 Sitze, ohne Hürde 297 – keine Mehrheit.« Die Zahlen stehen in der Aufnahme des Sitzrechners (Bundesergebnis 2025: 165 + 44 + 119 und 149 + 40 + 108; Mehrheit ab 316).
- »3,5 s« im Psycho-Labor ist die Zeit des aufgenommenen Durchgangs, kein Messwert aus einer Klasse.
- Der Zustand »aufgedeckt« der Quelle wurde für die Aufnahme freigeschaltet, ohne Codewort der Lehrkraft. Im Bild steht keine Stimme einer Klasse.
- »29 Beispiele, im eigenen Unterricht erprobt«: unverändert, Stand der Galerie am 12.11.2026.

## Was der Film verdichtet

- In der Politik-Werkstatt rechnet die Seite sofort neu. Der Film schwenkt erst zum Halbrund und blendet dann um. Zwischen Tipp und neuem Halbrund liegt deshalb rund eine Sekunde.
- Im Psycho-Labor tippt man nach »Gefunden!« auf die Stelle im Bild. Der Film zeigt gleich das Ergebnis.

## Unterschied zum Pitch-Film

- Die Fassung auf der Seite trägt weiter **keine Kontaktadresse**.

## Offen

- Auf dem iPad und in Safari noch nicht angesehen. Geprüft wurden Standbilder in Chromium, nicht der flüssige Lauf.

## Geprüft

`python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – Ergebnis im Pull Request.
