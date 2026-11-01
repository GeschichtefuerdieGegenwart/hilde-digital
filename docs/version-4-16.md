# Version 4.16 – Film und Galerie auf der Startseite

Stand: 1. November 2026 · Branch `film-und-startseite` (baut auf `papierprobe`, Version 4.15, auf)

Grundlage: Showreel v2 aus Claude Design (Projektarchiv »Galerie Showreel Animation«, Szenen, Zeiten und Texte) und Entwurf A4 »Platte wird Raum«, Variante A, auf der Fläche »Hilde Digital – Startseite und Übergänge«. Entscheidung Mario, 1.11.2026: ganzer Film beim ersten Besuch.

## Geändert

- `assets/film.js` (neu): Film »Papierprobe in 44 Sekunden« in neun Szenen, ohne Bibliothek (das Original nutzt React und JSX). Zeitachse in Sekunden, jedes Bild wird daraus berechnet. Läuft beim ersten Besuch einmal, keine Schleife. Anhalten, Weiter, Überspringen, Esc. Nie von selbst bei »Weniger Bewegung« oder `prefers-reduced-motion`. »Film ansehen« auf der Startseite spielt ihn erneut ab. Gemerkt wird nur `papierprobe.film`.
- Gegenüber dem Original: Farben, Schriften und Platten aus `assets/hilde.css` statt »organic« (keine fremden Schriften, keine weichen Schatten, keine Versalien, keine Farbblasen im Hintergrund); »Papierprobe« als Werkzeugname → »Papierfrage«.
- `assets/film/sitze-on.webp`, `sitze-off.webp`: Halbrund des Sitzrechners aus dem Archiv, verkleinert.
- `src/index.html`: die drei Ansichten stehen als Fächer direkt neben der Galerie-Leiste (ab 720 px), nicht mehr oben rechts; Knopf »Film ansehen · 44 Sekunden«; Filmbereich mit Textfassung der neun Szenen für Hilfstechnik.
- `assets/hilde.css`: Fächer neben der Galerie, Film (Bühne 1920 × 1080, skaliert), im Druck ausgeblendet.
- `src/ueber.html`: »Was ist neu?«, Hinweis unter »Deine Daten«.
- `DESIGN.md`: begründete Ausnahme für das einmalige Abspielen.
- `tests/e2e.py`: Fächer neben der Galerie; Film beim ersten Besuch, Fokus, Anhalten, Esc, zweiter Besuch, »Film ansehen«, »Überspringen«, keine Konsolenfehler, nichts aus dem Netz, weniger Bewegung. In automatischen Tests startet der Film nur mit `?film=1`.

## Noch nicht

Kurzes Vergrößern beim Klick auf die Platten und das neue KI-Training mit drei Einstiegen (Prompt vom 1.11.2026) folgen als eigene Version.

## Nicht gelaufen

Safari/iPadOS auf einem echten Gerät, echter Beamer.
