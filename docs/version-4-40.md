# Version 4.40 – Der Film, neu geschnitten

Stand: 14. November 2026 · Branch `film-4-40`

Grundlage: Auftrag Mario (14.11.2026): den Film auf der Startseite neu erzeugen – er nannte noch die »Galerie« – und ihn verbessern, wo es geht.

## Neu

- **Eine Quelle für den Film.** Die Bühne steht in `src/film/buehne.html`, die Kapitel in `src/film/kapitel.json` (Name, Beginn, Standbilder, Abschnitte, der Film als Text). `tools/film.py` erzeugt daraus `assets/film-buehne.js`; es läuft in `tools/bauen.py` mit. `tools/pruefen.py` meldet eine veraltete Bühne, fehlende Bilder, Kapitel ohne Text, Zeiten außerhalb ihres Kapitels und alte Namen im Film. Es zählt die Zahlen im Film in den Daten nach: 29 erprobte Beispiele, 14 Bereiche des Digital-Checks, 18 Aufgabenformen. Die beiden Filmskripte stehen jetzt in der Liste der geführten Wege (keine Fachbegriffe).
- **Inhalt auf Stand 4.39.**
  - Kapitel 3: Auf beiden Säulen stehen die »Unterrichtsbeispiele – analog und digital«. Auf der Säule »Digitaler Unterricht« steht »Digitalen Unterricht erstellen«.
  - Kapitel 5 heißt »Säule 1 · Digitalen Unterricht erstellen«: »Fang mit dem an, was du schon hast. Oder plane neu. Für eine Stunde oder eine ganze Einheit.« Über dem Regler steht »Umfang« (»Drei Umfänge, keine Rangfolge«). »Deine Stunde« hat die vier Unterrichtsphasen aus `taxonomien.js` (Einstieg · Erarbeitung · Sichern · Übertragen) statt fünf alter Namen. Darunter die vier Phasen des Bereichs, »Digitalen Unterricht erstellen« markiert. Statt »Neu: Aufgabenkoffer« steht »Dazu der Aufgabenkoffer: 18 Aufgabenformen«. Die Zeile mit alten Werkzeugnamen (»Unterricht planen«, »Mein Ist-Stand«) ist gestrichen.
  - Kapitel 8 heißt »Unterrichtsbeispiele«. Startseite und Unterrichtsbeispiele sind neu aufgenommen (`assets/film/k-start.webp` 1280 × 720, `k-galerie.webp` 1280 × 1500, je 1,5-fach). Die Kamera zielt auf den Weg »Unterrichtsbeispiele«, der Tippring sitzt darauf, der Bildlauf hält bei »Was das Gerät hier kann«. Der Satz »Das ist Kidu. Von hier geht es zu den Unterrichtsbeispielen.« steht oben rechts – vorher verdeckte er genau den Weg, auf den er zeigt. Unter dem Titel steht ein Satz statt zwei in 1,9 Sekunden.
  - Kapitel 9: Unter der Wortmarke steht die ausgeschriebene Zeile. Daneben: »Eine Fortbildungsplattform für Lehrkräfte.« (Satz der Startseite).
  - Kapitel 5: Der Schub am Ende setzt höher an; der neue zweite Satz und das Blatt überlappen sich nicht.
- **Bedienung wie beim Erklärfilm »Was das Gerät kann« (Muster AW).** Kapitelleiste unter dem Film: je Kapitel ein Abschnitt, so breit wie das Kapitel lang ist. Tippen springt an den Kapitelanfang, Ziehen spult. Darüber »Du bist hier« (im langen Kapitel 8 mit Politik-Werkstatt, Psycho-Labor, GGK-Labor, Alle Beispiele) und der Satz »Du kannst anhalten, ziehen und zu jedem Kapitel springen« (Operating-Line Rule). Leertaste hält an, Pfeiltasten springen zu Kapiteln und Abschnitten, Esc schließt erst den Text, dann den Film. Zeit »m:ss / 2:50«.
- **Der Film als Text** (Static Grid Rule): »Als Text« zeigt alle neun Kapitel zum Lesen, von jedem Kapitel aus »Ab hier ansehen«. Am Telefon hochkant steht: »Dreh das Gerät quer, dann wird der Film größer. Oder lies ihn als Text.«
- **Weniger Bewegung:** 13 Standbilder statt 9 – Kapitel 8 zeigt jetzt alle drei Beispiele. Die Leiste springt zum ersten Standbild eines Kapitels. Der Schalter im Fuß gilt auch, wenn er erst nach dem Laden umgelegt wurde.
- **Hilfstechnik:** Der Film ist ein Dialog; solange er offen ist, ruht die Seite dahinter (`inert`). Die Bühne ist für Hilfstechnik verborgen, die Ansage (`aria-live`) nennt Kapitel und Abschnitt. Der Fokus startet auf »Anhalten« (vorher »Überspringen« – dort hätte die Leertaste den Film geschlossen). Der Knopf »Film ansehen« erscheint nur, wenn Skript und Filmstile da sind.
- `DESIGN.md` (Fassung 4.40, Operating-Line, Same-Face, Static Grid), `README.md`, `CLAUDE.md` (Regel für `src/film/`), `ueber.html` (Was ist neu).

## Bewusst nicht geändert

- Länge (170 Sekunden), Schnitt und Kamera der übrigen Kapitel, die Bildschirmfotos der drei Beispiele (Politik-Werkstatt, Psycho-Labor, GGK-Labor).
- Einzelne Sätze in Kapitel 8 stehen kurz (1,8 bis 2,4 Sekunden für sechs bis acht Wörter). Sie länger zu zeigen hieße, die ganze Zeitachse zu verschieben. Stattdessen lässt sich jetzt anhalten, abschnittweise zurückspringen und alles als Text lesen.
- Der Pitch-Film in Claude Design.

## Noch offen

- Nicht aus der Cloud prüfbar: echtes iPad (Safari, Ziehen mit dem Finger, flüssiges Abspielen), Beamer im Raum.
- Die Prüfung mit axe-core lief nicht: `tests/vendor/axe.min.js` fehlt.

## Geprüft

Siehe Pull Request.
