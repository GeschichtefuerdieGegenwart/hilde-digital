# Hilde Digital – Version 4: KI-Training, Digitaler Unterricht, Galerie

Stand: 18. Oktober 2026. Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.

## Prüfbefehl

```
python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py
```

## Struktur

```
Start (Wortmarke »Hilde Digital«)
├── KI-Training            ki.html            Aufbau einer guten Anfrage · Prompt-Generator · Prüfliste
├── Digitaler Unterricht   unterricht.html
│   ├── Digital-Check      digital-check.html  Weg A: selbstcheck.html · Weg B: Material prüfen lassen
│   ├── Unterricht planen  tablets.html        Entscheidungskarte
│   ├── Ideen finden       → galerie.html
│   └── Was passt gerade zu mir?  passt.html
├── Galerie                galerie.html       Einblicke · Bildansicht · Suche und Filter · beispiel.html#…
└── Fuß: Über Hilde Digital · Inhalte und Funktionen · Hinweise zu Daten und KI · Gestaltungssystem
    (So arbeitet der Digital-Check: mehrwert.html; alte Adresse showroom.html leitet zur Galerie weiter)
```

## Was neu ist

| Bereich | Änderung |
| --- | --- |
| Name | Überall »Hilde Digital« (ohne Bindestrich). Die Wortmarke führt zum Start. |
| Navigation | Oben nur noch KI-Training · Digitaler Unterricht · Galerie, auch auf dem Telefon sichtbar. »Über Hilde Digital«, »Inhalte und Funktionen« und »Hinweise« stehen im Fuß. |
| Startseite | Wortmarke → ein Satz zur Orientierung → zwei große Einstiege → sichtbarer Zugang zur Galerie, alles im ersten Bildschirm (auch 1280 × 720). Darunter echte Ansichten aus drei Projekten und die Erklärung, wie die Bereiche zusammenhängen. Die Papierprobe ist nach »Digitaler Unterricht« umgezogen. |
| KI-Training | Neuer Kopf: die fünf Teile einer guten Anfrage und die Regeln vor dem Start. Danach der bekannte Prompt-Generator. |
| Digitaler Unterricht | Neue Bereichsseite mit vier Werkzeugen. Der Digital-Check steht zuerst. |
| Digital-Check | Früher »Mehrwert-Check«. Zwei Wege: A »Selbst prüfen« (bisheriger Selbstcheck), B »Material prüfen lassen«. |
| Galerie | Früher »Showroom«. 37 echte Ansichten aus 21 Projekten (je Projekt 1–4). Große, wechselnd gespiegelte Einblicke für Psycho-Labor, NS-Ideologie, Gene ohne Reisepass und Nation im Kopf; kleine Einblicke für Projekte mit zwei Ansichten; darunter die bekannte Suche. Herkunft jedes Bildes: `docs/galerie-quellen.md`. |
| Bildansicht | `<dialog>`: öffnet aus dem angeklickten Bild, blättert mit Pfeiltasten, Knöpfen oder Finger, schließt mit Escape, »Schließen« oder Klick daneben. Der Fokus kehrt zum Bild zurück. |
| Bewegung | Tokens nach Emil Kowalski: 140 ms Mikro, 200 ms Übergang, 150 ms Schließen, nie über 300 ms. Nur `transform` und `opacity` bewegen sich; Schatten springen. Drücken 97 % (große Flächen 99 %), Bildansicht aus 95 %. Bei »weniger Bewegung« nur Überblenden ≤ 150 ms. |
| Fehler- und Leerzustände | Fehlt ein Bild, zeigt der Rahmen Rasterpunkte und »Bild nicht verfügbar«. Weg B meldet leeren und zu kurzen Text, »keine Merkmale gefunden« und Fehler der Auswertung. |

## So arbeitet Weg B

- Die Seite durchsucht den eingefügten Text nach Signalwörtern (`assets/material-regeln.js`, kommentiert, 10 Tests in `tests/material-regeln.test.js`).
- Jedes Signalwort gehört zu einem Bereich des Qualitätsmodells (`assets/daten/qualitaet.js`). Jeder Treffer zeigt seine Fundstelle.
- Ergebnis in fünf Teilen: Besondere Stärke (nur bei mindestens zwei verschiedenen Merkmalen) · Abgedeckte Bereiche · Beobachtungen am Material · Mögliche Weiterentwicklung (höchstens drei) · Grenzen der Einschätzung. Keine Prozente, keine Noten.
- Keine KI, kein Server, kein Hochladen. Der Text wird weder gespeichert noch gesendet. Auf Wunsch entsteht eine Anfrage, die man in ein an der Schule freigegebenes KI-System kopieren kann.
- »Mit Weg A genauer prüfen« übernimmt nur Materialtyp und gefundene Bereiche, nie den Text.

## Prüfungen

- `tools/pruefen.py`: 13 Seiten, Kennzeichnung, Navigation mit genau drei Bereichen, keine alten Namen, Fachbegriffe, Links, Schriftgrößen, 29 Beispiele, 37 Galerieansichten (Datei vorhanden, eigener Alternativtext, Bildtext, kein Bild für Konzeptbeispiele).
- `node --test`: 82 Tests.
- `tests/e2e.py`: Kernwege, Weg B (leer, zu kurz, Ergebnis, Reihenfolge, Fundstellen, Zurücksetzen, kein Netz), Galerie und Bildansicht (Maus, Tastatur, Escape, Fokus, Finger), Weiterleitung, reduzierte Bewegung, axe-core auf 17 Seiten, kein waagerechtes Scrollen bei 375, 640, 768, 1280, 1440 px.

## Offen

- Rechte an Illustrationen innerhalb der Anwendungen: noch offen.
- Karte zum Zweiten Weltkrieg: kein Bildschirmfoto möglich (braucht Kartendaten aus dem Netz).
- Gallery Walk, Lerntheorien, Quest, Anleitertreffen: nicht online, deshalb nur die bisherigen Vorschaubilder.
- Der Taste-Prüfer (`lint.mjs`, `inspect.mjs`) lief für diese Version nicht; geprüft wurde mit den projekteigenen Tests und Bildschirmfotos.
