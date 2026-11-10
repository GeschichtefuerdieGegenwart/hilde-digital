<<<<<<< HEAD
# Version 4.23 – Neuer Name: Kidu

Stand: 10. November 2026 · Branch `kidu`

Entscheidung Mario (10.11.2026): Das Projekt heißt **Kidu – Künstliche Intelligenz und digitaler Unterricht**. Unter der Wortmarke steht immer die ausgeschriebene Zeile. Kidu ist nicht an eine Schule gebunden. Das Werkzeug »Geht es auf Papier genauso gut?« heißt weiter **Papierfrage**. Repository und Adresse werden in `kidu` umbenannt.

## Neu

- **Name überall:** Kopf, Fuß, Kennzeichnung, Titel aller Seiten, Texte, Daten-Kommentare, Skripte (`window.KiduFilm`, `window.KiduHebelFilm`), lebende Dokumente (CLAUDE.md, README, PRODUCT, DESIGN, LICENSE-TEXTE, CITATION, ENTSTEHUNG, Datenschutz, Annahmen). 167 Stellen in 64 Dateien.
- **Logo:** Zeichen aus zwei versetzten Platten (Ocker = KI, Moos = digitaler Unterricht, Überdruck in der Schnittmenge), Wortmarke »Kidu«, ausgeschriebene Zeile mit K · I · d · U in Plattenfarbe unterstrichen; `assets/kidu.svg` als Symbol im Browser-Reiter. Auch im Startseiten-Film.
- **Über Kidu:** Entstehung nennt beide früheren Namen; Neues: »Neuer Name: Kidu«.
- `tools/pruefen.py`: »Papierprobe« gilt als alter Name (wie »Hilde Digital«), erlaubt nur auf der Über-Seite.

## Bewusst nicht geändert

- **Alte Versionsberichte** (`docs/version-1.md` bis `version-4-22.md`): Sie halten fest, wie es damals hieß.
- **Interne Namen**, die niemand sieht: Dateien `assets/hilde.css`, `assets/hilde.js`, der Namensraum `HILDE` und die Speicher-Schlüssel `hilde.*`/`papierprobe.film` im Browser. Ein neuer Schlüssel würde gemerkte Schnellhefter, Bewegungs- und Beamer-Wahl löschen.
- Die Kennzeichnung »noch kein beschlossenes Schulkonzept« bleibt – sie beschreibt den Stand, nicht den Ort.

## Adresse

Nach dem Zusammenführen: Repository `GeschichtefuerdieGegenwart/hilde-digital` → `kidu`. Die Seite liegt dann unter `…github.io/kidu/`. GitHub leitet die alte Seiten-Adresse nicht weiter (Entscheidung Mario: trotzdem heute).

## Geprüft

`python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – Ergebnis im Pull Request; neu: Test »Logo«.
=======
# Version 4.23 – Mein Startpunkt: Voranalyse vor der Fortbildung

Stand: 10. November 2026 · Branch `startpunkt`

Grundlage: Auftrag Mario (10.11.2026) – ein Voranalysebogen vor Fortbildungs- und Beratungsstunden, digital, mit sofortiger Visualisierung, als PDF zum Weitergeben per Mail; die Seite hostet nichts und verarbeitet nichts. Vorarbeit: Claude-Dokument »Voranalysebogen Fortbildung KI und Tablet« (Bogen zum Austeilen und Auswertungsleitfaden, 10.11.2026).

## Neu

- **`startpunkt.html` »Mein Startpunkt: KI und Tablet in meinem Unterricht«** (`assets/startpunkt.js`): zwanzig Fragen in fünf Schritten (Wo du stehst · Wie du arbeitest · Was du dir vorstellst · Was du dir wünschst · Deine Stunde). Auswahlfelder wie im Ist-Stand; »Keines/Nichts/Kaum« schließen andere Antworten aus; Höchstzahl je Frage (`data-max`): die älteste Wahl fällt weg. Textfelder (Frage 17, 18, Stunde, Kürzel) werden nie gespeichert; gespeichert werden nur Auswahlwerte (`hilde.startpunkt`).
- **Auswertung `REGELN.startpunkt`** (`assets/regeln.js`, sechs Tests): vier Ausgangslagen ohne Rangfolge (anfangen · probiert und noch nicht überzeugt · für sich · weit) plus »offen«; Skepsis als Stärke, nicht als Hindernis; Stärken zuerst; höchstens drei Schritte (erster gewählter Anlass zuerst, Links in die Werkzeuge); genau zwei Kniffe passend zu Lage und Arbeitsweise (Einsprechen, Foto statt Abtippen, Vorlage, Rückfragen, Kürzen, Prüfliste, Papierfrage, zwei Fassungen); Codeblock für die Leitung nur aus Auswahlwerten.
- **Startpunkt-Karte**: vier Sicherheitsfelder (Bedienen · Prüfen · Dürfen · Bauen) als Stanzlöcher auf einer Linie – leer, halb, voll – immer mit Wort darunter; keine Bewegung; `role="img"` mit Beschreibung. Zwei Druckfarben, Druckschwarz.
- **Als PDF sichern**: Knopf `data-drucken="nur-ergebnis"` druckt nur die Karte (eine A4-Seite); Hinweis zum Druckfenster und iPad; online tragen Links die volle Adresse, damit sie im PDF führen. Nichts verlässt das Gerät, bis die Person die Datei selbst weitergibt.
- Verlinkt aus der Beratungsstunde (Woche 1: vorab Startpunkt, in der Stunde Ist-Stand) und der Vorbereitung des Fortbildungsbausteins. Nicht als neuntes Werkzeug auf der Bereichsseite – es gehört zum Austausch im Kollegium.

## Regeln, die eingehalten sind

Keine Bewertung, keine Rangfolge, keine Noten oder Punkte (Tests) · anbieterneutral (Frage 2 fragt Arten von Systemen; Landesangebot genannt) · kein Name, keine Kontaktadresse auf der Seite (»Leitung der Fortbildung«) · Textfelder nie gespeichert, Auswahl löschbar · Erst Ruhe, dann Bewegung (Karte steht) · ohne JavaScript druckbar · Druck auf einer Seite.

## Offen

- Erprobung: Ist der Bogen in zehn Minuten machbar? Welche Fragen bringen nichts? Empfindet jemand ihn als Prüfung?
- Safari/iPadOS: »Teilen → Drucken → Blatt antippen« für die PDF-Sicherung am Gerät prüfen.
- Auswertung auf Seiten der Leitung: fester Prüfauftrag, der aus Codeblöcken das Notizblatt je Person und eine Gruppenübersicht macht (Claude-Dokument, Reiter »Auswertung für mich«).
>>>>>>> 03baa4d (Version 4.23 – Mein Startpunkt: Voranalyse vor der Fortbildung)
