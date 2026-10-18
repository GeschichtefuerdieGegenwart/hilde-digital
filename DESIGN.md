---
name: Hilde Digital
description: Orientierungsmodul für Lehrkräfte – zwei Druckfarben, Überdruck als Schnittmenge, Werkstattbogen statt Hochglanz.
colors:
  grund: "#F0EEEB"
  flaeche: "#FFFFFD"
  karton: "#E8E5E0"
  text: "#2A2622"
  leise: "#4F4842"
  linie: "#E4DCCF"
  stahl: "#7D7364"
  honig: "#A26A1C"
  honigplatte: "#F2B233"
  honig-zart: "#F5E8CF"
  honig-tief: "#6F4710"
  petrol: "#1E6B67"
  petrol-zart: "#DBEAE6"
  petrol-tief: "#134A47"
  ueberdruck: "#1C4B15"
  aktion: "#2A2622"
  erfolg: "#2E6B34"
  warnung: "#8A5300"
  fehler: "#B0281C"
  ueberarbeitung: "#7A3324"
  ueberarbeitung-zart: "#F3E3DF"
  nacht: "#17140F"
  nacht-text: "#F3EADB"
  petrol-hell: "#5CC3C0"
  ueberdruck-dunkel: "#2F6B3A"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.55rem + 4.9vw, 5.75rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  h1:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.5rem + 3vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  h2:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.3rem + 1.6vw, 2.625rem)"
    fontWeight: 650
    lineHeight: 1.15
  h3:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)"
    fontWeight: 650
    lineHeight: 1.2
  intro:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.08rem + 0.2vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.3
  meta:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: "0"
  sm: "4px"
  pill: "999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "24px"
  "6": "32px"
  "7": "48px"
  "8": "64px"
  "9": "96px"
components:
  button-primary:
    backgroundColor: "{colors.aktion}"
    textColor: "{colors.flaeche}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.flaeche}"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
    height: "48px"
  chip:
    backgroundColor: "{colors.flaeche}"
    textColor: "{colors.text}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
    height: "44px"
  chip-active:
    backgroundColor: "{colors.text}"
    textColor: "{colors.flaeche}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
    height: "44px"
  card:
    backgroundColor: "{colors.flaeche}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "24px"
  area-tag-ki:
    backgroundColor: "{colors.honigplatte}"
    textColor: "{colors.text}"
    typography: "{typography.meta}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  area-tag-lernen:
    backgroundColor: "{colors.petrol}"
    textColor: "{colors.flaeche}"
    typography: "{typography.meta}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  area-tag-beide:
    backgroundColor: "{colors.ueberdruck}"
    textColor: "{colors.flaeche}"
    typography: "{typography.meta}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  input:
    backgroundColor: "{colors.flaeche}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
    height: "48px"
  nav:
    backgroundColor: "{colors.grund}"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    height: "64px"
---

# Design System: Hilde Digital

## 1. Overview

**Creative North Star: »Der Werkstattbogen im Überdruck«**

Hilde Digital sieht aus wie ein sauber gedruckter Arbeitsbogen aus einer guten Druckwerkstatt: warmes Naturpapier, zwei Druckfarben, präzise Passermarken. Honig steht für »KI-Training«, Petrol für »Digitaler Unterricht«. Wo beide Platten übereinanderliegen, entsteht von selbst ein dunkles Grün – der Überdruck. Er markiert ausschließlich die Schnittmenge »mit KI entwickelt«. Es gibt keine dritte Farbe, die man sich ausgedacht hat; die Schnittmenge ist physikalisch ableitbar (Multiplikation #F2B233 × #1E6B67 = #1C4B15).

Die Oberfläche ist ruhig, flach und handwerklich. Tiefe entsteht nicht aus weichen Schatten, sondern aus einer versetzten Farbplatte hinter der Karte, wie ein leicht verrutschter Druckgang. Signaturelemente sind die überlappenden Platten selbst, Stanzloch-Fortschrittspunkte, die Stundenlinie für den Umfang und Rasterpunkte als ehrlicher Platzhalter. Werkzeug-Ornamente wie Schnittmarken, Passerkreuze oder Haarlinien werden nicht als Dekoration verwendet (Abgleich mit Taste Skill, 18.10.2026). Bewegung ist knapp und funktional; das einzige größere Motiv ist das »Registrieren« der beiden Platten beim ersten Aufruf; die Galerie darf mit der Bildansicht etwas inszenierter sein.

Das System lehnt ab: Hochglanz-EdTech mit Verläufen und Glas, verspielte Illustrationen, Gamification, Ampel-Bewertungen, Dashboards mit Prozentwerten, das Erscheinungsbild der Schule, sowie jede Ästhetik, die Digitalität als Fortschritt an sich feiert.

**Key Characteristics:**
- Zwei Bereichsfarben plus Neutraltöne; der Überdruck nur dort, wo beide zusammenkommen.
- Knochenweißer Grund (niedrige Sättigung) statt Creme; Wärme kommt aus der Honigplatte als voller Farbfläche. Text in warmem Druckschwarz.
- Ecken 4 px, keine weichen Schatten, versetzte Platte als Ebene.
- Bricolage Grotesque für Überschriften, Atkinson Hyperlegible Next für alles Lesbare.
- Beamertauglich: Startseite vollständig in 1280 × 720.
- Bereich und Status immer auch als Text, nie nur als Farbe.

## 2. Colors

Zwei Druckfarben auf warmem Papier. Alles andere ist neutral.

### Primary
- **Honigplatte** (#F2B233): Fläche des Bereichs »KI-Training«. Text darauf immer #2A2622 (8,00:1). Gegen den Grund nur 1,6:1 – Platten erhalten deshalb eine 2-px-Kante in Honig oder Text.
- **Honig** (#A26A1C): Kanten, Symbole, Stundenlinie im KI-Bereich. Als Text nur ab 24 px (3,9:1).
- **Honig zart / tief** (#F5E8CF / #6F4710): Hintergrund von Hinweisen bzw. Text darauf (6,70:1).

### Secondary
- **Petrol** (#1E6B67): Bereich »Digitaler Unterricht«. Heller Text darauf 6,2:1, als Text auf Grund 5,4:1.
- **Petrol zart / tief** (#DBEAE6 / #134A47): Hinweisflächen und Text darauf (8,07:1).

### Tertiary
- **Überdruck** (#1C4B15): ausschließlich Schnittmenge »mit KI entwickelt«. Heller Text darauf 10,00:1.

### Neutral
- **Grund** (#F0EEEB): Seitenhintergrund, Knochenweiß (HSL-Sättigung < 16 %). Text 12,9:1.
- **Fläche** (#FFFFFD): Bänder, Karten, Eingabefelder. Text 15,0:1.
- **Karton** (#E8E5E0): zurückgesetzte Bänder, Passepartout. Text 11,9:1.
- **Text** (#2A2622): Druckschwarz, auch Hauptaktion.
- **Leise** (#4F4842): nur Sekundärnotizen, nie Fließtext (7,8:1 auf Grund).
- **Linie** (#E4DCCF): nur Dekoration und Trennlinien, nie Bedienelementgrenze.
- **Stahl** (#7D7364): Grenzen von Bedienelementen (4,0:1 auf Grund, erfüllt 3:1 für Nicht-Text).

### Status
Erfolg #2E6B34, Warnung #8A5300, Fehler #B0281C, »In Überarbeitung« #7A3324 auf #F3E3DF. Status steht immer als Wort im Etikett.

### Dunkelmodus
Nacht #17140F, Text #F3EADB, Honig #F2B233 wird Textfarbe, Petrol hell #5CC3C0, Überdruck dunkel #2F6B3A.

### Named Rules
**The Overprint Rule.** Überdruck-Grün erscheint nur, wo beide Bereiche wirklich zusammenkommen. Nie als Akzent, nie als Erfolgsfarbe, nie zur Dekoration.

**The Two-Inks Rule.** Es gibt genau zwei Bereichsfarben. Eine dritte Akzentfarbe wird nicht eingeführt; Hervorhebung entsteht über Druckschwarz, Gewicht und Größe.

**The Neutral Action Rule.** Hauptaktionen sind Druckschwarz, nicht Honig oder Petrol, damit keine Perspektive bevorzugt wirkt.

**The Plate Edge Rule.** Honigplatte auf Grund bekommt immer eine sichtbare 2-px-Kante.

## 3. Typography

**Display Font:** Bricolage Grotesque (variabel: opsz 12–96, wdth 75–100, wght 200–800; OFL), lokal als woff2.
**Body Font:** Atkinson Hyperlegible Next (für Sehschwäche entwickelt), lokal als woff2, Dateien unverändert (reservierte Schriftnamen).
**Metadaten:** ebenfalls Atkinson Hyperlegible Next (Normalschnitt, `font-variant-numeric: tabular-nums` wo Zahlen stehen). Keine Monospace-Etiketten.

**Character:** Bricolage bringt Werkstatt-Charakter und leichte Eigenwilligkeit in große Überschriften; Atkinson trägt jede Zeile, die gelesen werden muss, nüchtern und hochlesbar.

### Hierarchy
- **Display** (700, 44 → 92 px, 1,02): nur Startseiten-Leitsatz.
- **H1** (700, 36 → 60 px, 1,08): Seitentitel.
- **H2** (650, 28 → 42 px, 1,15): Abschnitte.
- **H3** (650, 22 → 28 px, 1,2): Kartentitel in großen Karten, Schrittfragen.
- **Intro** (400, 20 → 24 px, 1,45): Einleitungssatz unter H1.
- **Body** (400, 18 → 20 px, 1,55, max. 68ch): Fließtext.
- **Small** (400, 16 px): Hilfetexte. Nie kleiner als 16 px.
- **Label** (700, 16–18 px): Buttons, Felder.
- **Meta** (16 px, normal): Fach, Status, Phase – in Satzschreibung, nie gesperrte Versalien.

### Named Rules
**The 16-Pixel Floor.** Kein Text unter 16 px, auch nicht in Chips, Fußzeilen oder Bildunterschriften.

**The Display-Only-Bricolage Rule.** Bricolage nur für Display und H1–H3 sowie die Wortmarke; nie für Fließtext, Labels oder Formulare.

## 4. Layout

Inhaltsbreite 72 rem, weit 90 rem, Seitenrand clamp(1rem, 4vw, 3rem). Raster 4 / 8 / 12 Spalten. Abstände in der Skala 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 px. Umbrüche bei 600, 1024 und 1280 px sowie eine Höhenabfrage `max-height: 760px` für Beamer. Karten nutzen Container Queries. Gleichförmige Kartenraster werden vermieden: Die Galerie arbeitet mit Bahnen (Stöbern) und einer Ergebnisliste (Suchen).

### Named Rules
**The Two-Line Rule.** Jede Überschrift (h1–h6) hat bei 1440, 1280, 768 und 390 px höchstens zwei Zeilen. Erst Wörter streichen, dann die Zeilenbreite erweitern, zuletzt die Größe senken. Ein großer Satz ist ein `<p>` (≤ 36 px Desktop, ≤ 24 px Telefon).

**The Full-Ink Rule.** Fließtext steht in Druckschwarz; Leise nur für Nebennotizen.

**The First-Action Rule.** Auf dem ersten Bildschirm gibt es einen echten Knopf (≥ 48 px) – auf der Startseite einen pro Bereich.

**The Beamer Rule.** Startseite und jede Hauptübersicht zeigen ihre Kernaussage und beide Einstiege in 1280 × 720 ohne Scrollen.

**The Static Grid Rule.** Jede bewegte oder blätternde Ansicht hat jederzeit eine statische Rasteransicht als Alternative.

## 5. Elevation & Depth

Keine weichen Schatten. Ebenen entstehen durch die **versetzte Platte**: eine Farbfläche (Bereichsfarbe oder Karton) 6 px nach rechts unten hinter der Karte. Beim Überfahren mit der Maus hebt die Karte 2 px ab (»Abheben«), beim Drücken rückt sie 4 px auf die Platte (»Andruck«). Überlagerungen (Menü-Sheet, Dialog) liegen auf einem Grund-Schleier mit 2-px-Textkante.

### Named Rules
**The No-Blur Rule.** `box-shadow` mit Unschärfe ist verboten. Tiefe ist immer eine harte, versetzte Fläche.

## 6. Shapes

Ecken 4 px für Karten, Buttons, Felder und Etiketten; 999 px nur für Filterchips und Stanzloch-Punkte. Signaturformen: die überlappenden Platten (Startseite, Bereichsetiketten), Stanzloch-Punkte als Fortschritt, die Stundenlinie (Punkt = punktuell, Segment = phasenweise, volle Linie = durchgängig; Druckschwarz, keine Rangfolge), Rasterpunkte als Platzhalter für fehlende Bilder, die Wortmarke mit einem Bindestrich aus zwei überdruckten Balken.

## 7. Components

### Buttons
- **Primär:** Druckschwarz, Text Fläche, 48 px hoch, 4 px Ecken, Label 18 px fett.
- **Sekundär:** Fläche, 2-px-Kante Stahl, Text Druckschwarz.
- **Zustände:** Hover (nur feiner Zeiger) Platte erscheint 4 px versetzt; Druck verschiebt um 2 px; Fokus Doppelring.
- **Fokus:** außen 3 px #2A2622, innen 2 px #FFFDF9 – mindestens 6,16:1 auf jeder Fläche, auch auf Petrol und Honigplatte.

### Chips
- Fläche mit 2-px-Kante Stahl, Pill-Form, mindestens 44 px hoch. Aktiv: Druckschwarz mit hellem Text und ✓ als Text. Entfernbar mit sichtbarem ×-Button und zugänglichem Namen.

### Karten
- Fläche, 4 px Ecken, keine Haarlinie (Abgrenzung über Tonstufe), versetzte Platte in Bereichsfarbe nur beim Überfahren oder in der Galerie. Unter dem Titel: Bereichsetikett und Status als Text. Bild im Passepartout (Karton), alle Vorschauen im Format 16:10. Im Stöbern-Modus Duplex-Vorschau (Petrol, Honig oder Überdruck), Original auf Hover/Fokus.
- Ganze Karte klickbar über einen Link im Titel (Pseudo-Element), keine verschachtelten Bedienelemente.

### Eingaben
- Fläche, 2-px-Kante Stahl, 48 px hoch, Label darüber, Hilfetext darunter. Fehler: Kante Fehlerrot plus Text, nie nur Farbe.

### Navigation
- Drei Punkte (KI-Training · Digitaler Unterricht · Galerie), Wortmarke links und als Link zum Start, aktiver Punkt mit 3-px-Unterstrich in Druckschwarz und `aria-current`. Unter 768 px steht die Leiste in einer eigenen Zeile unter der Wortmarke, immer sichtbar. »Über Hilde Digital« und die Hinweise stehen im Fuß.

### Bewegung (ab Version 4)
- Tokens: `--dauer-druck` 100 ms, `--dauer-schnell` 140 ms (Mikro), `--dauer-mittel` 200 ms (Übergang), `--dauer-aus` 150 ms (Schließen), `--dauer-register` 280 ms. Nie über 300 ms, immer `--ease-out`.
- Nur `transform` und `opacity` werden animiert; die versetzte Platte erscheint ohne Übergang. Kein `transition: all`.
- Drücken: `--druck` 0,97 für Schaltflächen, `--druck-gross` 0,99 für große Flächen. Die Bildansicht öffnet aus dem angeklickten Bild heraus von `--auftauchen` 0,95 auf 1.
- Weniger Bewegung: keine Lage- oder Größenänderung, nur Überblenden bis 150 ms.
- Einflug beim Scrollen (ab Version 4.2): nur Abschnitte, die beim Laden außerhalb des Bildschirms liegen; einmal, 240 ms, höchstens 24 px, gestaffelt höchstens 8 × 30 ms. Parallaxe nur bei der Collage der Startseite (höchstens 16 px, scroll-gesteuerte CSS-Animation, ab 1024 px). Beides entfällt bei weniger Bewegung.
- Bildwelt (ab Version 4.2): echte Bildschirmfotos und selbst gezeichnete SVG-Motive aus der Systemsprache (Platten, Stundenlinie, Arbeitsblatt und Tablet). Keine Fotos von Personen, keine Fremdbilder. Duplex-Vorschauen (E6) im Laufband und in der Collage; das Original erscheint beim Überfahren, beim Fokus oder beim Antippen.
- Laufband der Galerie: einzige Dauerbewegung. Linear (ein Band soll gleichmäßig gleiten), etwa 24 px/s, nur `transform`. Hält an beim Überfahren, beim Fokus, per Knopf und außerhalb des Bildschirms; die Wahl »angehalten« bleibt im Browser. Bei weniger Bewegung steht es still und lässt sich von Hand verschieben.

### Bildansicht
- `<dialog>` auf Druckschwarz-Schleier, Titel und »Schließen« oben, Bild mit Bildtext, »Vorherige« · »Ansicht n von m« · »Nächste« unten. Escape, Pfeiltasten, Klick daneben. Fokus zurück zum auslösenden Bild.

### Bereichskopf
- Überschrift zuerst, darunter »Bereich: …« mit einem kleinen Plattenstreifen in der Bereichsfarbe. Kein Etikett über der Überschrift.

### Fuß
- Wortmarke in voller Breite als gestalteter Abschluss, darunter der Pflichttext. Keine Linkfarm.

### Bereichsetiketten
- KI: Honigplatte mit Text. Tablets: Petrol mit hellem Text. Beide: Überdruck mit hellem Text. Immer mit Wort, nie nur Farbfläche.

### Geführter Weg
- Eine Frage pro Schritt (H3, höchstens zwei Zeilen), Antworten als große Auswahlkarten, Stanzloch-Fortschritt mit Text »Schritt 2 von 5« (funktionale Orientierung, keine dekorative 01/02-Nummerierung), Zurück und »Noch nicht sicher« immer sichtbar.

### Papierprobe (das »live thing«)
- Drei Ja/Nein-Fragen zum Prüfstein »Geht es auf Papier genauso gut?«, Ergebnis sofort in einer von vier qualitativen Einstufungen mit sichtbarer Regel, `aria-live`, »Eingaben löschen«, `<noscript>`-Fassung der Regeln. Als »Entwurf zur Diskussion« gekennzeichnet.

## 8. Do's and Don'ts

### Do:
- **Do** Bereich und Status immer als Wort zeigen.
- **Do** den Überdruck nur für »mit KI entwickelt« verwenden.
- **Do** Hauptaktionen in Druckschwarz halten.
- **Do** versetzte Platte statt Schatten nutzen.
- **Do** Bewegung nur auf Knopfdruck starten und pausierbar machen.
- **Do** fehlende Bilder mit Rasterpunkten und »noch kein Bild« kennzeichnen.
- **Do** die Startseite im Beamerformat 1280 × 720 prüfen.

- **Do** neue Seiten mit `lint.mjs` und `inspect.mjs` aus dem Taste Skill prüfen (Ausnahmen nur `still-page` und `no-footage`, begründet in `.taste-skill/direction.json`).

### Don't:
- **Don't** eine dritte Akzentfarbe, Verläufe, Glas oder Neon einführen.
- **Don't** weiche Schatten, große Rundungen (> 4 px außer Chips) oder Pill-Buttons verwenden.
- **Don't** Ampeln, Prozentwerte, Sterne, Abzeichen oder Ranglisten zeigen.
- **Don't** Schullogo, Schulfarben oder offizielle Wirkung erzeugen.
- **Don't** Autoplay, Endlos-Karussells oder Parallax einsetzen. Einzige Ausnahme: das Laufband der Galerie (langsam, linear, anhaltbar, still bei weniger Bewegung).
- **Don't** Text unter 16 px setzen oder Honig (#A26A1C) als Fließtextfarbe nutzen.
- **Don't** Beispiele, Zitate, Zahlen oder Links erfinden.
- **Don't** `ease-in` für Bewegung verwenden oder Tastaturaktionen animieren.
- **Don't** kleine Etiketten über Überschriften (»Eyebrows«), Pill-Badges, Monospace-Etiketten oder gesperrte Versalien setzen.
- **Don't** Haarlinien, 1-px-Rahmen, Schnittmarken oder Passerkreuze als Schmuck verwenden (Formularfelder und echte Tabellen ausgenommen).
- **Don't** Platzhalterbilder (Stockfotos, picsum o. Ä.) oder »realistisch wirkende« Beispieldaten einsetzen – Rasterpunkte und »noch offen« sind ehrlicher.
