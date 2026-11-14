---
name: Kidu
description: Orientierungsmodul für Lehrkräfte – zwei Druckfarben, Überdruck nur wo Platten sich überlagern, Werkstattbogen statt Hochglanz.
colors:
  grund: "#EFEADF"
  flaeche: "#F8F5EE"
  karton: "#E2DCCD"
  text: "#201F1D"
  leise: "#524E3D"
  linie: "#DDD6C6"
  stahl: "#6F6853"
  honig: "#7D5A1C"
  honigplatte: "#B68235"
  honig-zart: "#F1E3C4"
  honig-tief: "#5C4212"
  petrol: "#2F5D62"
  petrol-zart: "#DBE7E6"
  petrol-tief: "#1F4246"
  ueberdruck: "#3F5A44"
  aktion: "#2B2A24"
  erfolg: "#2E6B34"
  erfolg-zart: "#E3EEE2"
  warnung: "#8A5300"
  warnung-zart: "#F5E6C6"
  fehler: "#B0281C"
  fehler-zart: "#F8E9E2"
  fehler-tief: "#5E2410"
  ueberarbeitung: "#7A3324"
  ueberarbeitung-zart: "#F3E3DF"
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
> **Fahrplan der Bereichsseite, Fassung 4.41 (14.11.2026, Entscheidung Mario: Entwurf B2 aus Claude Design umsetzen).** Die Bereichsseite »Digitaler Unterricht« zeigt die vier Phasen als Fahrplan untereinander statt nebeneinander, mit dem Register darunter. Jede Phase ist ein `<details>`; Flächen im Wechsel (1 und 3 Fläche, 2 und 4 Petrol-zart); Petrol führt von Phase zu Phase, von den Grundlagen gestrichelt; Druckschwarz führt von 4 zurück zu 2 (»Nächste Stunde: wieder bei 2«). Alle 18 Werkzeuge stehen in ihrer Phase, das Register »Alle Werkzeuge nach Phasen« ist gestrichen (eine Struktur). Muster unten unter »Fahrplan der Bereichsseite«. Angepasst: Screen-Width, One-Order, Line-to-Target, Three-Tap (jetzt zwei Tipps statt einem).

> **Still und breit, Fassung 4.39 (14.11.2026, Entscheidung Mario am Haltepunkt 3).** Die drei Bewegungen, die beim Erscheinen ohne Eingabe liefen, sind still gestellt, sodass gleich das Ende zu sehen ist: Leporello der Einblicke gestrichen, »Vom Blatt zum Tablet« spielt nicht mehr ab (der Regler steht gleich am Tablet), die Stundenlinie zeichnet sich nicht mehr. Die Screen-Width Rule gilt jetzt auch für Startseite, KI-Training und Unterrichtsbeispiele; der Kopf der Seite folgt der weiten Hülle.

> **Abgleich mit dem Code und elf Gestaltungsregeln, Fassung 4.38 (13.11.2026).** Die Gestaltungsregeln aus der Sichtung vom 13.11.2026 (Teil 3c, Entscheidung Mario am Haltepunkt 1: elf Regeln) stehen jetzt als benannte Regeln in den Abschnitten 2, 4 und 7: Brightest-Spot, Screen-Width, One-Order, Line-to-Target, Three-Tap, Device-Switch, Locked-from-Start, Input-First (mit der einzigen Liste erlaubter Ausnahmen von »kein Autoplay«), Quiet Work, Operating-Line, Same-Face. Bei jeder Regel steht, wie Kidu sie heute erfüllt – oder was noch offen ist. Dazu Dokument gegen Code: Werte aus `assets/hilde.css` übernommen (Aktion #2B2A24, Text #201F1D, Breiten 76 und 112 rem, Kontraste neu gerechnet); als gestrichen oder ersetzt markiert, was es nicht mehr gibt (Fächer und Bühne der fünf Sätze seit 4.36, Leitkachel ersetzt durch die vier Phasen, Kennzahlen auf keiner Seite, keine dunkle Ansicht). Nicht abgeglichen: `.impeccable/design.json` trägt noch die Farben vor 4.26 – neu erzeugen mit Impeccable (`/impeccable document`), sobald das Plugin läuft.

> **Film auf der Startseite, Fassung 4.34 (Entscheidung Mario 11.11.2026).** Der Film »Kidu in zwei Minuten« ersetzt »Kidu in 44 Sekunden«: neun Kapitel, 120 Sekunden, Bühne 1280 × 720 aus dem Drehbuch des Pitch-Films (`assets/film-buehne.js`, erzeugt; Zeitachse als CSS-Animationen in `assets/hilde.css`). Er startet nur noch auf Knopfdruck (oder über die Adresse mit `?film=1`), nicht mehr von selbst – damit entfällt die Ausnahme von »Autoplay nur, wenn Bewegung Lerngegenstand ist«. Neu: bei »Weniger Bewegung« neun Standbilder mit »Nächstes Bild«. Die Fassung auf der Seite trägt keine Kontaktadresse.

> **Film mit Kamera, Fassung 4.35 (Auftrag Mario 12.11.2026; 170 Sekunden nach Entscheidung Mario vom selben Tag: lieber länger als gehetzt).** Jede Szene hat eine Welt, die eine Kamera verschiebt und vergrößert (Schlüsselbilder mit eigenem Tempo je Abschnitt). Sätze stehen fest im Bild, auf Platten. Tempo hat einen Grund: schnell beim Wechsel, langsam, wenn etwas geschieht. Die Beispiele in Kapitel 8 sind Bildschirmfotos der Lernseiten im Zustand vorher und nachher (`assets/film/`), keine Nachbauten; Zahlen im Bild stammen aus der Aufnahme. Bei Themen des Nationalsozialismus: ruhiger Schnitt, langsame Fahrt, weiches Überblenden – keine Belohnungsbewegung. Standbilder nennen ihre Zeit selbst (`kapitel[n].bild`).

> **Film auf der Startseite, Fassung 4.40 (Auftrag Mario 14.11.2026: neu erzeugen und verbessern).** Eine Quelle: Bühne in `src/film/buehne.html`, Kapitel mit Namen, Zeiten, Standbildern, Abschnitten und dem Film als Text in `src/film/kapitel.json`; `tools/film.py` erzeugt daraus `assets/film-buehne.js` (läuft in `tools/bauen.py` mit, `tools/pruefen.py` meldet Veraltetes und zählt die Zahlen im Film in den Daten nach: erprobte Beispiele, Bereiche des Digital-Checks, Aufgabenformen). Inhalt auf Stand 4.39: »Unterrichtsbeispiele – analog und digital« auf beiden Säulen, »Digitalen Unterricht erstellen« mit Umfang und den vier Unterrichtsphasen aus `taxonomien.js` (Wort unter der Stundenlinie), die vier Phasen des Bereichs, neue Bildschirmfotos von Startseite (1280 × 720) und Unterrichtsbeispielen; unter der Wortmarke steht in Kapitel 9 die ausgeschriebene Zeile. Bedienung wie Muster AW (Same-Face über beide Filme): Kapitelleiste unter der Bühne – je Kapitel ein Abschnitt, so breit wie das Kapitel lang ist, Umriss in Stahl, gesehen gefüllt in Druckschwarz, das laufende Kapitel dicker; Tippen springt an den Kapitelanfang, Ziehen spult; »Du bist hier« darüber (im langen Kapitel 8 mit seinen Abschnitten), daneben die Bedienzeile; Leertaste hält an, Pfeiltasten springen zu Kapiteln und Abschnitten, Esc schließt erst den Text, dann den Film; Ansage über `aria-live`, die Bühne ist für Hilfstechnik verborgen; der Fokus startet auf »Anhalten«; solange der Film offen ist, ruht die Seite dahinter (`inert`). »Als Text« zeigt den ganzen Film zum Lesen, von jedem Kapitel aus geht es zurück in den Film (Static Grid Rule). Am Telefon hochkant: Hinweis »Dreh das Gerät quer … oder lies ihn als Text«. »Weniger Bewegung«: 13 Standbilder, Kapitel 8 mit allen drei Beispielen. Der Knopf »Film ansehen« erscheint nur, wenn Skript und Filmstile da sind.

> **Film auf der Startseite (ab Version 4.16, Entscheidung Mario 1.11.2026) – Stand bis 4.33.** Ausnahme von »Autoplay nur, wenn Bewegung Lerngegenstand ist«: Der Film »Kidu in 44 Sekunden« (`assets/film.js`, Nachbau des Showreels v2 aus Claude Design) läuft bei jedem neuen Besuch einmal ab (ab Version 4.17; gemerkt nur für die Sitzung, `sessionStorage`) und endet mit »Film nochmal ansehen« oder »Zur Startseite« – keine Schleife, anhaltbar, »Überspringen« und Esc, Fokus auf »Überspringen«, nie bei »Weniger Bewegung« oder `prefers-reduced-motion`, danach über »Film ansehen«. Startet nur, wenn das Stilblatt geladen ist; alle eigenen CSS- und JS-Dateien tragen einen Prüfwert (`?v=…`). Inhalt für Hilfstechnik als Liste der neun Szenen. Farben, Schriften und Platten aus diesem System; keine weichen Schatten, keine fremden Schriften.

> **Farben des Logos (ab Version 4.26, Entscheidung Mario 10.11.2026).** Die Seite übernimmt die Farben des Logos 5f: Ocker #B68235, Petrol #2F5D62, Oliv #3F5A44, Tinte #201F1D als Druckschwarz. Moos (#4A6645) entfällt. Auf Ocker steht nur dunkle Schrift (4,9:1). Die Werte in der Liste oben gelten; der folgende Absatz beschreibt den Stand 4.14–4.24.

> **Farbwelt »Büttenpapier« (ab Version 4.14, Entscheidung Mario 1.11.2026).** Die Werte oben gelten. Die Rollen bleiben gleich, nur ihre Farben ändern sich: Honig heißt jetzt **Ocker** (#D9A441, Kante #7D5A1C), Petrol heißt **Moos** (#4A6645), das Überdruck-Grün heißt **Oliv** (#434512), der Leitakzent ist **Terrakotta** (#9E432A, nur auf der Seite Leitsätze). Grund ist ungebleichtes Papier (#EFEADF) mit dezenter Körnung, aus in Beamer-Ansicht, bei »Weniger Bewegung« und im Druck. Keine Fraunces, keine weichen Schatten, Two-Inks Rule unverändert. Wo unten noch Honig oder Petrol steht, ist die jeweilige Rolle gemeint. Kontrastwerte: siehe Kommentare in `assets/hilde.css`.


# Design System: Kidu

## 1. Overview

**Creative North Star: »Der Werkstattbogen im Überdruck«**

Kidu sieht aus wie ein sauber gedruckter Arbeitsbogen aus einer guten Druckwerkstatt: warmes Naturpapier, zwei Druckfarben, präzise Passermarken. Ocker steht für »KI-Training«, Petrol für »Digitaler Unterricht«; in den Unterrichtsbeispielen tragen dieselben zwei Farben die Bereiche »Außerhalb des Unterrichts« (Ocker) und »Unterricht« (Petrol). Wo beide Platten übereinanderliegen, entsteht ein dunkles Oliv – der Überdruck. Er ist keine Kategorie und keine dritte Farbe, nur die sichtbare Überlagerung (Logo, Platten der Startseite). Die Werte kommen seit 4.26 aus dem Logo: Ocker #B68235, Petrol #2F5D62, Oliv #3F5A44 (bis 4.25 war das Oliv als Multiplikation zweier Platten abgeleitet).

Die Oberfläche ist ruhig, flach und handwerklich. Tiefe entsteht nicht aus weichen Schatten, sondern aus einer versetzten Farbplatte hinter der Karte, wie ein leicht verrutschter Druckgang. Signaturelemente sind die überlappenden Platten selbst, Stanzloch-Fortschrittspunkte, die Stundenlinie für den Umfang und Rasterpunkte als ehrlicher Platzhalter. Werkzeug-Ornamente wie Schnittmarken, Passerkreuze oder Haarlinien werden nicht als Dekoration verwendet (Abgleich mit Taste Skill, 18.10.2026). Bewegung ist knapp und funktional; das einzige größere Motiv ist das »Registrieren« der beiden Platten beim ersten Aufruf; die Unterrichtsbeispiele dürfen mit der Bildansicht etwas inszenierter sein.

Das System lehnt ab: Hochglanz-EdTech mit Verläufen und Glas, verspielte Illustrationen, Gamification, Ampel-Bewertungen, Dashboards mit Prozentwerten, das Erscheinungsbild der Schule, sowie jede Ästhetik, die Digitalität als Fortschritt an sich feiert.

**Key Characteristics:**
- Zwei Bereichsfarben plus Neutraltöne; der Überdruck nur dort, wo sich Platten sichtbar überlagern. Es gibt keine dritte Kategorie.
- Knochenweißer Grund (niedrige Sättigung) statt Creme; Wärme kommt aus der Honigplatte als voller Farbfläche. Text in warmem Druckschwarz.
- Ecken 4 px, keine weichen Schatten, versetzte Platte als Ebene.
- Bricolage Grotesque für Überschriften, Atkinson Hyperlegible Next für alles Lesbare.
- Beamertauglich: Startseite vollständig in 1280 × 720.
- Bereich und Status immer auch als Text, nie nur als Farbe.

## 2. Colors

Zwei Druckfarben auf warmem Papier. Alles andere ist neutral.

### Primary
- **Honigplatte / Ocker** (#B68235, ab 4.26 das Ocker des Logos): Fläche des Bereichs »KI-Training«. Text darauf immer Druckschwarz #201F1D (4,9:1), nie helle Schrift. Gegen den Grund nur 1,6:1 – Platten erhalten deshalb eine 2-px-Kante in Honig oder Text.
- **Honig** (#7D5A1C, `--ki`): Kanten, Symbole, Stundenlinie im KI-Bereich. Als Text 5,2:1 auf Grund – für Auszeichnungen, nie für Fließtext.
- **Honig zart / tief** (#F1E3C4 / #5C4212): Hintergrund von Hinweisen bzw. Text darauf (7,4:1).

### Secondary
- **Petrol** (#2F5D62, ab 4.26 das Petrol des Logos; 4.14–4.24 Moos #4A6645): Bereich »Digitaler Unterricht«. Heller Text darauf 6,7:1 (Fläche #F8F5EE) bis 7,0:1 (#FBF9F4), als Text auf Grund 6,1:1.
- **Petrol zart / tief** (#DBE7E6 / #1F4246): Hinweisflächen und Text darauf (heller Text auf tief 10,4:1).

### Tertiary
- **Überdruck / Oliv** (#3F5A44, ab 4.26 das Oliv des Logos): entsteht nur, wo Honig- und Petrolplatte sich überlagern (Logo-Zeichen, Platten der Startseite, Plattenwechsel, Farbauszug). Keine Kategorie, kein Etikett. Heller Text darauf 7,0 bis 7,2:1.

### Neutral
- **Grund** (#EFEADF): Seitenhintergrund, ungebleichtes Papier mit leichter Körnung (HSL-Sättigung < 16 %). Text 13,7:1.
- **Fläche** (#F8F5EE): Bänder, Karten, Eingabefelder. Text 15,1:1.
- **Karton** (#E2DCCD): zurückgesetzte Bänder, Passepartout. Text 12,0:1.
- **Text** (#201F1D, ab 4.26 die Tinte des Logos): Druckschwarz.
- **Aktion und Fokus** (#2B2A24, `--aktion`, `--fokus`): Hauptknöpfe und äußerer Fokusring, 12,0:1 auf Grund; Text auf Aktion #FBF9F4 (13,7:1).
- **Leise** (#524E3D): nur Sekundärnotizen, nie Fließtext (7,0:1 auf Grund).
- **Linie** (#DDD6C6): nur Dekoration und Trennlinien, nie Bedienelementgrenze.
- **Stahl** (#6F6853): Grenzen von Bedienelementen (4,6:1 auf Grund, erfüllt 3:1 für Nicht-Text).

### Status
Erfolg #2E6B34, Warnung #8A5300, Fehler #B0281C, »In Überarbeitung« #7A3324 auf #F3E3DF. Status steht immer als Wort im Etikett.
Ab Version 4.8 als Variablen in `hilde.css` (`--erfolg`, `--warnung`, `--fehler`) mit je einer zarten Fläche: Erfolg zart #E3EEE2 (Text Erfolg darauf 5,4:1), Warnung zart #F5E6C6 (5,1:1; bewusst etwas kühler als Honig zart, damit Hinweis und Warnung nicht gleich aussehen), Fehler zart #F8E9E2 (Fehler 5,6:1, Fehler tief #5E2410 für den Hinweistext der geführten Wege 10,2:1). Alle erfüllen AA für Fließtext; Druckschwarz auf jeder zarten Fläche über 12:1.

### Dunkelmodus
Im Code nicht umgesetzt: Kidu ist nur hell (`color-scheme: light`), es gibt keine dunkle Ansicht. Die früher hier genannten Werte (Nacht #17140F, Text #F3EADB, Petrol hell #5CC3C0, Überdruck dunkel #2F6B3A) sind gestrichen (4.38). Wird eine dunkle Ansicht entschieden, bekommt jede Farbe ein Token mit dunkler Entsprechung – hell und dunkel, nie halb (`signatur-design`).

### Beamer-Ansicht (ab Version 4.8, Teil 2)
Ein zweites Farbset für den Beamer im Klassenzimmer, wo Licht und Wand den Kontrast fressen: reines Weiß, tiefes Schwarz, tiefere Perspektivfarben. Es gilt unter `html[data-theme="beamer"]` und ändert nur Variablen in `hilde.css`; Honigplatte, zarte Flächen, Bilder und Duplex-Vorschauen bleiben, `color-scheme` bleibt `light`. Der Schalter **»Beamer-Ansicht«** steht im Fuß jeder Seite neben »Weniger Bewegung« (Knopf mit `aria-pressed`, Wahl nur im Browser unter `hilde.theme`, Kopfskript setzt das Attribut vor dem ersten Zeichnen; »Eingaben löschen« setzt es mit zurück).

| Farbe | Wert | Auf Grund #FFFFFF | Auf Fläche #F6F3EE | Auf Karton #ECE7DE |
| --- | --- | --- | --- | --- |
| Text | #000000 | 21,0:1 | 19,0:1 | 17,1:1 |
| Leise | #3A342E | 12,3:1 | 11,1:1 | 10,0:1 |
| Stahl (Kanten) | #4A433B | 9,7:1 | 8,8:1 | 7,9:1 |
| Petrol | #0F4F4B | 9,4:1 | 8,5:1 | 7,6:1 |
| Honig-Kante | #7A4F12 | 7,1:1 | 6,4:1 | 5,8:1 |
| Überdruck | #13380E | 13,1:1 | 11,9:1 | 10,7:1 |

Weitere Paare: Text auf Honigplatte #D9A441 11,2:1 · Honig-Kante auf Honigplatte 3,8:1 (Nicht-Text, Plate Edge Rule) · Weiß auf Petrol 9,4:1 und Fläche auf Petrol 8,5:1 (»auf Petrol«) · Weiß auf Überdruck 13,1:1 · Weiß auf Aktion 21,0:1 · Erfolg #1F4F24 auf Erfolg zart 8,0:1 · Warnung #6B4000 auf Warnung zart 7,2:1 · Fehler #8A1E14 auf Fehler zart 7,8:1. Alle Textpaare erfüllen mindestens 4,5:1, Fließtext auf Grund und Fläche mindestens 7:1 (AAA). Die Fläche liegt bewusst eine Tonstufe unter dem Grund (#F6F3EE statt Weiß): Karten haben keine Haarlinie und wären auf Weiß sonst unsichtbar. Linie #C9C1B4 bleibt Dekoration.

### Named Rules
**The Overprint Rule.** Überdruck-Grün erscheint nur, wo sich zwei Platten physisch überlagern. Nie als Kategorie, nie als Akzent, nie als Erfolgsfarbe. Die Kategorie »mit KI entwickelt« ist seit Version 4.4 gestrichen: Ein mit KI gebautes Lernangebot gehört zum Digitalen Unterricht.

**The Two-Inks Rule.** Es gibt genau zwei Bereichsfarben. Eine dritte Akzentfarbe wird nicht eingeführt; Hervorhebung entsteht über Druckschwarz, Gewicht und Größe.

**The Neutral Action Rule.** Hauptaktionen sind Druckschwarz, nicht Honig oder Petrol, damit keine Perspektive bevorzugt wirkt.

**The Plate Edge Rule.** Honigplatte auf Grund bekommt immer eine sichtbare 2-px-Kante.

**The Brightest-Spot Rule** (ab 4.38). Steht Text über einem Bild, wird der Kontrast an der ungünstigsten Bildstelle gerechnet, nicht am Durchschnitt: bei heller Schrift an der hellsten, bei dunkler an der dunkelsten Stelle; mindestens 4,5:1. Herkunft: Startseite des GGK-Labors (12.11.2026) – bei 72 % Abdunkelung lag der Kopftext an einer hellen Stelle bei 4,47:1, erst 78 % reichten. *In Kidu:* kein Text über Fotos; die Papierkörnung dunkelt den Grund nur leicht ab (Text dort rechnerisch noch etwa 11:1, geschätzt für die dunkelste mögliche Stelle).

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

**The Display-Only-Bricolage Rule.** Bricolage nur für Display und H1–H3 sowie die Wortmarke (und die Tafelkarte, die eine Überschrift für den Raum ist); nie für Fließtext, Labels oder Formulare. Die Variable heißt `--schrift-titel`; geladen sind nur die Gewichte 600 und 700, 800 gibt es nicht.

## 4. Layout

Inhaltsbreite 76 rem (`--breite`), weit 112 rem (`--breite-weit`, ab 4.36 für Übersichten auf Startbildschirmen), Seitenrand clamp(16px, 4vw, 40px). Raster 4 / 8 / 12 Spalten. Abstände in der Skala 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 px. Umbrüche bei 600, 1024 und 1280 px sowie eine Höhenabfrage `max-height: 760px` für Beamer. Karten nutzen Container Queries. Gleichförmige Kartenraster werden vermieden: Die Unterrichtsbeispiele arbeiten mit »Stöbern« (Was das Gerät hier kann, Zum Anfangen, Einblicke) und einer Trefferliste (Suchen).

### Named Rules
**The Two-Line Rule.** Jede Überschrift (h1–h6) hat bei 1440, 1280, 768 und 390 px höchstens zwei Zeilen. Erst Wörter streichen, dann die Zeilenbreite erweitern, zuletzt die Größe senken. Ein großer Satz ist ein `<p>` (≤ 36 px Desktop, ≤ 24 px Telefon).

**The Full-Ink Rule.** Fließtext steht in Druckschwarz; Leise nur für Nebennotizen.

**The First-Action Rule.** Auf dem ersten Bildschirm gibt es einen echten Knopf (≥ 48 px) – auf der Startseite einen pro Bereich.

**The Beamer Rule.** Startseite und jede Hauptübersicht zeigen ihre Kernaussage und beide Einstiege in 1280 × 720 ohne Scrollen.

**The Static Grid Rule.** Jede bewegte oder blätternde Ansicht hat jederzeit eine statische Rasteransicht als Alternative. *In Kidu:* Unterrichtsbeispiele (Raster und Bühne), beide Filme (»Der Film als Text«; auf der Startseite ab 4.40 hinter »Als Text«).

**The Screen-Width Rule** (ab 4.36, Entscheidung Mario 13.11.2026). Übersichten auf Startbildschirmen nutzen die Bildschirmbreite – gedacht vom iPad quer aus, dem häufigsten Gerät. So viele Module nebeneinander, wie die Breite trägt (am iPad quer und am Computer etwa vier bis sieben, am Telefon eines); Fließtext bleibt trotzdem höchstens 68ch breit (die Body-Regel aus Abschnitt 3; in Atkinson Hyperlegible Next fasst 60ch rund 80 Zeichen). Ein Arbeitsfenster einer Lernseite ist für das iPad ausgelegt: quer drei Spalten, hoch zwei. *In Kidu:* `.huelle-weit` mit `--breite-weit` 112 rem für den ersten Bildschirm von vier Seiten – Digitaler Unterricht (Leitband, vier Phasen; ab 4.36), Startseite (Titel, Platten, Weg zu den Unterrichtsbeispielen), KI-Training (Kopf, »Deine ersten zehn Minuten«) und Unterrichtsbeispiele (Kopf mit Suche, Treffer, »Was das Gerät hier kann«; alle ab 4.39). Der Kopf der Seite steht dann in derselben Breite (`body:has(…)` in `hilde.css`). Spürbar erst über 1216 px: Darunter füllt auch die normale Hülle (76 rem) den Bildschirm, am iPad quer also ohnehin. Nebeneinander: die vier Phasen bis 4.40 (zwei bis 860 px, eine bis 480 px) – seit 4.41 stehen sie als Fahrplan untereinander, jede Zeile nutzt die Breite (Wann und Name, Satz, Zahl der Werkzeuge), aufgeklappt stehen die Werkzeuge in so vielen Spalten, wie die Breite trägt (gemessen: vier bei 1920 px, drei bei 1440, zwei bei 1024 bis 1280, eine bei 820 und 390), vier erste Schritte (zwei bis 1023 px, einer bis 560 px), Treffer so viele, wie 20 rem tragen (bei 1920 px fünf, bei 1440 px vier, bei 1280 und 1180 px drei), die sechs Prinzip-Karten drei je Zeile, damit die Bildschirmfotos lesbar bleiben. Ab 1500 px wächst die Collage der Startseite mit. Was danach kommt – Papierfrage, Schnell-Anfrage, Prompten lernen, »Zum Anfangen«, Einblicke –, bleibt in der normalen Breite.

**The One-Order Rule** (ab 4.38). Ein Bild hat eine Ordnung. Ordnet eine Übersicht nach der Zeit, zeigt sie keine zweite Reihenfolge im selben Bild; eine Nummer aus dem Heft gehört in den Titel. Herkunft: Startseite des GGK-Labors (12.11.2026), die Zahl im Kreis zeigte eine 9 zwischen 2 und 3. *In Kidu:* Die vier Phasen sind die einzige Reihenfolge der Bereichsseite. Bis 4.40 folgte ihr das Register »Alle Werkzeuge nach Phasen« ohne eigene Zählung; seit 4.41 stehen alle Werkzeuge in ihrer Phase (Register gestrichen). Die Ringlinie zählt nicht neu, sie zeigt nur, dass 2 bis 4 jede Stunde wiederkehren.

**The Line-to-Target Rule** (ab 4.38). Rahmen und Linien nur, wo sie eine Beziehung tragen. Eine Verbindungslinie endet am Rand ihres Ziels und kreuzt kein fremdes Feld; bei großem Winkel läuft sie außen um die Figur, und sie erscheint nur für die gewählte Karte. Herkunft: Politik-Werkstatt (»Weniger Linien«, erprobt 08.11.2026) und M22 (»Linien enden am Ziel«, aus dem Bauen). *In Kidu:* Linien trennen nur Zeilen echter Tabellen und Register (Ausnahme der Don't-Liste) und tragen im Modell Gerät – Brücke – Raum die Brücke. Im Fahrplan der Bereichsseite (ab 4.41) trägt Petrol die Abfolge der Phasen (von den Grundlagen gestrichelt: einmal), Druckschwarz den Rückweg von 4 zu 2; er beginnt am Rand von Kreis 4 und endet mit der Spitze am Rand von Kreis 2 (nachgemessen: Abweichung 0 px, `tests/e2e.py`).

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
- **Fokus:** außen 3 px #2B2A24, innen 2 px #FFFDF9 – mindestens 6,16:1 auf jeder Fläche, auch auf Petrol und Honigplatte.

### Chips
- Fläche mit 2-px-Kante Stahl, Pill-Form, mindestens 44 px hoch. Aktiv: Druckschwarz mit hellem Text und ✓ als Text. Entfernbar mit sichtbarem ×-Button und zugänglichem Namen.

### Karten
- Fläche, 4 px Ecken, keine Haarlinie (Abgrenzung über Tonstufe), versetzte Platte in Bereichsfarbe nur beim Überfahren oder in der Galerie. Unter dem Titel: Bereichsetikett und Status als Text. Bild im Passepartout (Karton), alle Vorschauen im Format 16:10. Im Stöbern-Modus Duplex-Vorschau (Petrol, Honig oder Überdruck), Original auf Hover/Fokus.
- Ganze Karte klickbar über einen Link im Titel (Pseudo-Element), keine verschachtelten Bedienelemente.

### Eingaben
- Fläche, 2-px-Kante Stahl, 48 px hoch, Label darüber, Hilfetext darunter. Fehler: Kante Fehlerrot plus Text, nie nur Farbe.

### Navigation
- Drei Punkte (KI-Training · Digitaler Unterricht · Unterrichtsbeispiele; seit 4.36), Wortmarke links und als Link zum Start, aktiver Punkt mit 3-px-Unterstrich in Druckschwarz und `aria-current`. Unter 768 px steht die Leiste in einer eigenen Zeile unter der Wortmarke, immer sichtbar. »Über Kidu« und die Hinweise stehen im Fuß.

### Bewegung (ab Version 4)
- Tokens: `--dauer-druck` 100 ms, `--dauer-schnell` 140 ms (Mikro), `--dauer-mittel` 200 ms (Übergang), `--dauer-aus` 150 ms (Schließen), `--dauer-register` 280 ms. Nie über 300 ms, immer `--ease-out`.
- Ab Version 4.8, Teil 2 steht jede Dauer nur einmal, als Token in `hilde.css`: `--dauer-staffel` 30, `--dauer-hefterzahl` 110, `--dauer-stanzloch` 160, `--dauer-andruck` 220, `--dauer-einflug` 240, `--dauer-stundenlinie` 260, `--dauer-langsam` 300 (die Obergrenze der Regel), `--verzug-auszug` 100; die begründeten Ausnahmen `--dauer-plattenwechsel` 320, `--dauer-durchschlag` 420, `--dauer-flug` 440, `--dauer-reihe` 440 (Ansichtswechsel), `--dauer-passer` 620, `--dauer-zaehlwerk` 720 (Staffel 60). Kurven: `--ease-out`, `--ease-register` und `--ease-beidseits` (cubic-bezier(.77,0,.175,1)) für Wege mit Start und Ziel (Flug, Plattenwechsel, Ansichtswechsel). JavaScript liest die Tokens über `HILDE.dauer("flug")` (in `motion.js` gleichnamig), damit keine Zahl doppelt steht. Die Werte selbst sind unverändert. Gestrichen in 4.39: `--dauer-leporello` 380 (Staffel 70) und `--dauer-blatt` 380.
- Nur `transform` und `opacity` werden animiert; die versetzte Platte erscheint ohne Übergang. Kein `transition: all`.
- Drücken: Knöpfe (`.knopf`) und die Platten der Startseite rücken ab Version 4.8, Teil 2 um `--andruck` 2 px nach rechts unten auf ihre Platte (`translate(2px, 2px)`), die Platte wird dabei entsprechend kürzer – keine Größenänderung mehr. Große Flächen (Galerie-Zugang, Werkzeuge, Einblicke) drücken weiter mit `--druck-gross` 0,99; `--druck` 0,97 bleibt als Token für ältere Flächen. Die Bildansicht öffnet aus dem angeklickten Bild heraus von `--auftauchen` 0,95 auf 1.
- Ansichtswechsel Karte ↔ Detail (ab Version 4.8, Teil 2, View Transitions): Bild und Titel eines Beispiels wandern von der Karte zur Detailseite und zurück (`--dauer-reihe` 440 ms, `--ease-beidseits`); die übrige Seite blendet in 200 ms über. Beide Seiten tragen dieselben Namen `bild-<id>` und `titel-<id>`. Weil ein Beispiel in der Galerie mehrfach steht (»Zum Anfangen«, Einblicke, Treffer), werden die Namen nicht beim Zeichnen vergeben, sondern erst beim Klick auf die eine Karte (`HILDE.ansichtswechsel` in `hilde.js`: Karten tragen `data-wechsel`, Bild `data-wechsel-bild`, Titel `data-wechsel-titel`); auf dem Rückweg benennt die Galerie die erste sichtbare Karte dieses Beispiels (ID kurz in `sessionStorage` unter `hilde.wechsel`) und setzt den Fokus auf ihren Link. Bilder füllen ihre Gruppe mit `object-fit: cover`, damit nichts springt, wenn Formate abweichen. Browser ohne View Transitions wechseln sofort; bei weniger Bewegung `animation: none` für alle Gruppen.
- Weniger Bewegung: keine Lage- oder Größenänderung, nur Überblenden bis 150 ms. Gilt bei der Systemeinstellung (`prefers-reduced-motion`) und – ab Version 4.8 – beim Schalter **»Weniger Bewegung«** im Fuß jeder Seite: ein Knopf mit `aria-pressed`, der `html[data-bewegung="weniger"]` setzt. Die Wahl liegt nur im Browser (`hilde.bewegung`, wie die Merkliste) und wird von einem kleinen Skript im Kopf der Seite vor dem ersten Zeichnen gesetzt, damit nichts flackert; »Eingaben löschen« setzt sie mit zurück. Die Regeln in `hilde.css` stehen deshalb zweimal (Medienabfrage und Attribut) und müssen gleich bleiben; in JavaScript prüft `ruhig()` beides. Umschalten wirkt sofort: Laufende Abspielvorgänge springen in den Endzustand. Der Schalter kann die Systemeinstellung nur verstärken, nie aufheben.
- Einflug beim Scrollen (Version 4.2 bis 4.17, **gestrichen in 4.18**): Abschnitte außerhalb des Bildschirms rückten einmal 6 px an ihren Platz (240 ms, gestaffelt). Gestrichen nach der Selbstprobe: Die Seite verlangt von Lernseiten »Erst Ruhe, dann Bewegung« – keine Bewegung beim bloßen Lesen, ohne Handlung und ohne Bedeutung. Dann gilt das auch hier. `hilde.js` setzt `.einflug-an` nicht mehr; die Stile und das Token `--dauer-einflug` bleiben als Dokumentation. Die Parallaxe der Collage ist seit 4.8 gestrichen; damit gilt »kein Parallax« und »keine Bewegung beim Lesen« ohne Ausnahme.
- **Benannte Bewegungsregeln (ab Version 4.18, aus `signatur-design` v7):** *Grow-in-Place Rule* – eine Detailansicht wächst aus ihrer Karte und schrumpft dorthin zurück (so schon der Ansichtswechsel Karte ↔ Detail). *Reader-Paced Rule* – Scrollytelling und Ansichtswechsel folgen dem Scrollen oder Tippen, nie der Uhr. *Visible-at-Rest Rule* – ohne Bewegung ist jeder Inhalt sichtbar, nichts wartet bei `opacity: 0`. *One Moment Rule* – pro Seite höchstens ein großer bewegter Moment. Token `--dauer-uebergang` 320 ms für den Wechsel eines ganzen Ausschnitts.
- **Selbstprobe (ab Version 4.18):** Vor jeder Version vier Fragen an die eigene Seite: Bewegt sich etwas beim bloßen Lesen? Gibt es zwei bewegte Momente auf einer Seite? Steht vor jedem Abspielen eine Frage? Braucht eine Handlung mehr als drei Tipps? Erledigt: Der Film startet seit 4.34 nur auf Knopfdruck, der Fächer ist seit 4.36 gestrichen, und seit 4.39 bewegt sich beim Erscheinen nur noch, was die Input-First Rule erlaubt. Ab 4.38 gehören die Prüffragen der Gestaltungsregeln dazu (Skill `digital-check`, Block »Gestaltung«).
- **Benannte Gestaltungsregeln für Bewegung (ab 4.38):**
  - **The Input-First Rule.** Die Seite ist still, bis eine Handlung sie bewegt; Bewegung zeigt eine Veränderung, sonst gibt es sie nicht. **Erlaubte Ausnahmen von »kein Autoplay« – die einzige Liste**, auf die `signatur-design` und `bewegung-als-lernmittel` verweisen: (1) Bewegung ist selbst Lerngegenstand, unter den fünf Bedingungen aus `bewegung-als-lernmittel` (startet erst bei Sichtkontakt, hält außer Sicht an, steht nach einem Durchlauf, jede Berührung übernimmt sofort, nie bei »weniger Bewegung«) – in Kidu derzeit keine. (2) Wiedererkennung einmal je Sitzung, höchstens 650 ms, nie bei »weniger Bewegung«: Passer der Überschriften (F) und Registrieren der Platten auf der Startseite. (3) Ein langsamer, anhaltbarer Bildwechsel auf einer Startseite, der ruht, solange ein Fenster offen ist (Herkunft: GGK-Labor, 12.11.2026, aus dem Bauen) – in Kidu keiner. *Still gestellt in 4.39* (Entscheidung Mario, 14.11.2026: still stellen, sodass gleich das Ende zu sehen ist): N Leporello der Einblicke (gestrichen), P »Vom Blatt zum Tablet« (spielt nicht mehr ab, der Regler steht gleich am Tablet), I2 die Stundenlinie auf der Detailseite und in »Zum Anfangen« (zeichnet sich nicht mehr). `tests/e2e.py` prüft das: Nach dem Laden läuft auf neun Seiten keine Animation; beim ersten Besuch einer Seite laufen nur Passer und Platten.
  - **The Quiet Work Rule.** In einer Arbeitsphase bewegt sich nur die Antwort auf eine eigene Handlung. Ein Arbeitsfenster je Phase; nichts blinkt; ein Bildwechsel ruht, solange ein Fenster offen ist. Gilt für Lernseiten. Für welche Phasen genau, ist noch offen: M22 setzt die Ruhe bewusst nur in den Erkundungsphasen um (Dashboard, Landkarte), nicht in Einstieg und Marktplatz (offene Frage in »Erfahrungen aus Erprobungen«). Die One Moment Rule zählt Momente je Seite, diese Regel gilt je Phase.
  - **The Operating-Line Rule.** Vor jedem interaktiven Film steht ein Satz, was man tun kann – anhalten, ziehen, springen (Politik-Werkstatt, erprobt 08.11.2026). *In Kidu:* Vor dem Film »Was das Gerät kann« steht: »Der Film startet erst, wenn du es willst. Du kannst anhalten, ziehen und zu jedem Kapitel springen.« Der Film auf der Startseite startet nur auf Knopfdruck; über seiner Kapitelleiste steht derselbe Satz (ab 4.40).
  - **The Same-Face Rule.** Ein Erklärfilm sieht aus wie die Seite, die er erklärt: dieselben Farben, derselbe Aufbau, echte Bildschirmfotos statt eines eigenen Film-Looks; im Film reicht weniger als auf der Seite (M22, aus dem Bauen). *In Kidu:* Der Film auf der Startseite zeigt in Kapitel 8 Bildschirmfotos der Lernseiten (ab 4.35) und der Startseite und Unterrichtsbeispiele im Stand 4.39 (ab 4.40); »Was das Gerät kann« ist in diesem System gezeichnet. Beide Filme haben dieselbe Bedienung (ab 4.40).
- Bildwelt (ab Version 4.2): echte Bildschirmfotos und selbst gezeichnete SVG-Motive aus der Systemsprache (Platten, Stundenlinie, Arbeitsblatt und Tablet). Keine Fotos von Personen, keine Fremdbilder. Duplex-Vorschauen (E6) in der Collage und in den Unterrichtsbeispielen; das Original erscheint beim Überfahren, beim Fokus oder beim Antippen.
- **Gestrichen in 4.36** (Umbau der Unterrichtsbeispiele): Fächer (ab Version 4.3, ersetzt das Laufband): Karten in einer scrollbaren Reihe mit Einrasten; die Mitte steht gerade und farbig, nach außen drehen sich die Karten weg (rotateY bis 38°), werden kleiner und verblassen in die Duplex-Vorschau. In der Galerie gleitet der Fächer langsam (24 px/s), auf der Startseite nur von Hand. Anhalten bei Überfahren, sichtbarem Fokus (Tastatur), Berührung (6 s Ruhe), außer Sicht und per Knopf. Ab Version 4.8 keine Dauerbewegung mehr: Der Fächer gleitet einmal durch alle Karten, dann steht er; »Weiterlaufen lassen« startet einen weiteren Durchlauf. Das Ende eines Durchlaufs wird nicht als Wahl gespeichert, nur das Anhalten per Knopf. Weniger Bewegung: flach, kein Gleiten – auch wenn der Schalter erst später gedrückt wird.
- Laufband der Galerie (bis Version 4.2): einzige Dauerbewegung. Linear (ein Band soll gleichmäßig gleiten), etwa 24 px/s, nur `transform`. Hält an beim Überfahren, beim Fokus, per Knopf und außerhalb des Bildschirms; die Wahl »angehalten« bleibt im Browser. Bei weniger Bewegung steht es still und lässt sich von Hand verschieben.

### Bewegungsmuster aus dem Motion-Musterbuch 2 (ab Version 4.4)
Alle in `assets/motion.js` und `assets/hilde.css`. Jedes Muster startet durch die Nutzerin, nie in Schleife; beim Erscheinen nur die Ausnahmen der Input-First Rule (seit 4.39). Bei »weniger Bewegung« bleibt nur der Endzustand.
- **F Passer:** Die Überschrift von KI-Training und den Unterrichtsbeispielen rastet einmal je Sitzung ein (Wiedererkennung, Ausnahme 2 der Input-First Rule): zwei Farbplatten, dann Druckschwarz (620 ms). `data-passer` an der h1.
- **G Farbauszug:** Kleine Ansichten (Collage auf dem Start, Detailbilder der Einblicke) sind in Ruhe zweifarbig gedruckt. Beim Überfahren rutschen die Platten auseinander, dann erscheint das echte Bild. Reines CSS, Graustufenbild plus zwei Farbflächen mit multiply.
- **I Stundenlinie:** Der Umfang als Balken auf der Linie der Stunde (Punkt, Abschnitt, ganze Stunde). Im Planungsweg bei der Umfang-Frage und auf der Entscheidungskarte. `HILDE.stundenlinie()`.
  - **I2 Stundenlinie in der Galerie (ab Version 4.7):** Dieselbe Linie, dieselbe Funktion, drei weitere Orte. (1) Jede Galerie-Karte (Raster und Bühne) zeigt den Umfang als kleinste Form (`zeile`, 6,5 rem) mit dem Wort daneben – nie nur die Grafik; ohne Umfang keine Linie, nur »noch offen«; KI-Training hat keinen Umfang und keine Zeile. (2) Die Detailseite zeigt die Linie mit dem Balken in seinem Umfang. Bis 4.38 zeichnete sie sich einmal beim Erscheinen (der Balken wuchs von 0, 260 ms, `HILDE.stundenlinieZeichnen()`); gestrichen in 4.39 (Input-First Rule). (3) Im Filter »Umfang« stehen drei Chips; beim Überfahren oder Fokussieren eines Chips gleitet der Balken der Linie daneben in diesen Umfang (200 ms), beim Wählen bleibt er so – Tastatur und Berührung gleichwertig. (4) »Zum Anfangen«: drei Gruppen mit je einer Linie als Kopf; sie stehen gleich fertig da (bis 4.38 zeichneten sie sich gleichzeitig, ohne Staffelung, weil eine Reihenfolge wie Stufen gewirkt hätte). Seit 4.37 folgt eine vierte Gruppe »Ganze Einheit« ohne Kopflinie – eine Einheit hat keinen Umfang; ihre Karten zeigen »Umfang: je Stunde« mit der Zahl der Teile. Begründete Ausnahme von »nur transform und opacity«: Der Balken bewegt `left` und `width`, weil ein mit `scaleX` gestreckter Balken seine runden Enden verlöre (der Punkt würde zum Strich); er liegt absolut auf seiner eigenen Spur und verschiebt nichts um sich herum. Bei »weniger Bewegung« gleitet nichts, der Endzustand steht sofort.
- **J Stanzloch:** Erledigte Schritte der geführten Wege sind gelocht; der zuletzt erledigte gibt kurz nach (160 ms).
- **K Schnellhefter:** »Merken« legt ein Beispiel in den Schnellhefter im Kopf. Die Karte fliegt hinein (440 ms, nicht mit der Tastatur), die Zahl rollt. Die Liste steht in der Galerie unter »Mein Schnellhefter«. Gespeichert werden nur IDs, nur im Browser (`hilde.merkliste`).
- **L Durchschlag:** Beim Kopieren eines Prompts löst sich ein Durchschlag vom Textfeld und gleitet weg (420 ms).
- **M Zählwerk:** Derzeit auf keiner Seite – die Startseite zeigt keine Kennzahlen mehr (`#kennzahlen` fehlt; der Code in `motion.js` und `start.js` bleibt, das Muster steht auf `gestaltung.html`). Bis dahin: Die Kennzahlen rollten einmal auf ihren Wert, wenn sie ins Bild kamen; die Zahl stand immer auch als Text da.
- **N Leporello – gestrichen in 4.39** (Input-First Rule, Entscheidung Mario 14.11.2026): Die Schritte der großen Einblicke stehen gleich offen da. Bis 4.38 entfalteten sie sich einmal, wenn sie ins Bild kamen (ab 700 px Breite, 380 ms, Staffel 70 ms).
- **O Plattenwechsel:** Über den Unterrichtsbeispielen schiebt sich die Platte des gewählten Bereichs ins Bild.
- **P Vom Blatt zum Tablet (ab Version 4.8, Seite »Bisherigen Unterricht digitalisieren«):** Ein beschrifteter Regler (`<input type="range">`, »Vom Blatt zum Tablet«) zieht zwischen »Arbeitsblatt auf Papier« und »Dieselbe Aufgabe am Tablet« – mit Finger, Maus und Tastatur; beide Zustände stehen als Text unter dem Regler, der aktuelle fett, dazu `aria-valuetext`. Das Bild hängt an einer Zahl `--t` von 0 bis 1: Die Papierzeilen verblassen, die Aufgaben erscheinen gestaffelt (Deckkraft und 8 px Lage), der Tablet-Rahmen liegt als eigene Fläche über dem Blatt und blendet ein, die Rückmeldung zuletzt. Keine Übergänge im CSS: Der Regler bewegt direkt. Seit 4.39 spielt nichts von selbst (Input-First Rule): Der Regler steht beim Laden am Tablet – so steht es auch im HTML, also auch ohne JavaScript –, wer zurückzieht, sieht das Blatt. Bis 4.38 spielte es einmal ab, wenn das Motiv ins Bild kam (380 ms, auslaufend); das ersetzte den Zeitgeber von 900 ms aus Version 4.3.
- **Q Der Weg durch die Stunde – gestrichen in 4.36:** Die fünf Sätze stehen seitdem als Karten auf der Seite »Wann funktioniert digitaler Unterricht?« (`sechs-hebel.html#fuenf-saetze`), ohne Bühne; `fuenf-saetze.html` leitet dorthin weiter. Beschreibung bis 4.35 (ab Version 4.18, Seite »Guter digitaler Unterricht in fünf Sätzen«): Scrollytelling nach `bewegung-als-lernmittel`: links eine feste Bühne (`position: sticky`) mit der Stundenlinie, einer Marke und einem Gerät in drei Zuständen (Hülle zu · offen · umgedreht), rechts fünf Abschnitte. Kreuzt ein Abschnitt die Mitte des Bildschirms (IntersectionObserver, `rootMargin: -45 %`), bekommt der Rahmen `data-satz`, und die Bühne wechselt per CSS: Marke in `translateX` (Läufer mit 100 % Breite, darum Prozent ohne `left`), Hülle in `rotateY`/`opacity`, Schirm und Rückseite in `opacity`; `--dauer-uebergang` 320 ms, `--ease-beidseits`. Kein Autoplay, keine Uhr; der Stand wird als Text angesagt (`aria-live`, »Satz 3 von 5: …«) und steht auch sichtbar unter der Bühne. Bei weniger Bewegung wechselt die Bühne ohne Übergang; ohne JavaScript steht Zustand 1 und alle fünf Abschnitte sind lesbar; auf schmalen Bildschirmen wird die Bühne zur Leiste oben. Das statische Schaubild derselben fünf Sätze steht darüber und bewegt sich nicht (Visible-at-Rest). Ein Moment je Seite: Auf dieser Seite gibt es sonst nichts Bewegtes.
- **R Gerät – Brücke – Raum (ab Version 4.19, Seite »Wann funktioniert digitaler Unterricht?«, Musterbuch R, Wahl Mario 9.11.2026: R1):** Das Modell steht zweimal auf der Seite: oben in Ruhe als Schaubild (drei Felder, die Brücke als Linie mit der Marke »Plenumsstelle«; Visible-at-Rest, ohne JavaScript und im Druck vollständig), weiter unten als Probe **R1 · Über die Brücke tippen**. Die Lesenden tippen an, welche der sechs Prinzipien in ihrer Stunde greifen (`aria-pressed`), erst dann ist »Ins Plenum« frei. Der Knopf trägt die gewählten Prinzipien gleichzeitig über die Plenumsstelle an die Tafel im Raum (höchstens sechs Elemente, nur `transform`, `--dauer-uebergang` 320 ms, `--ease-beidseits`; keine Staffelung, weil eine Reihenfolge wie eine Rangfolge der Prinzipien wirken würde); danach werden »deuten · streiten · urteilen« dunkel. »Keines davon« führt ohne Bewegung zum Satz »Dann bleibt es Papier – ein vollwertiges Ergebnis«. Der Stand steht als Satz unter der Probe und wird angesagt (`aria-live`). Mit der Tastatur (`event.detail === 0`) und bei »Weniger Bewegung« liegen die Prinzipien sofort an der Tafel. Nichts wird gespeichert. Erste Festlegung nach 1 Tipp, Bewegung nach 2. Der eine Moment der Seite (One Moment Rule). R2 (Regler Gerät → Brücke → Raum) und R3 (Umfang auf der Stundenlinie ziehen) nicht als Bewegung übernommen; R3 steht als ruhige Grafik bei der Regel »Der Umfang folgt dem Prinzip« (drei Stundenlinien mit Prinzipien- und Plenumsmarken, ausdrücklich »Schema, keine Zeitmessung«).
  - **Für Version 4.20 entschieden (Mario, 9.11.2026):** Die Kniff-Proben je Prinzip sind *keine* weiteren großen Momente, sondern Zustandswechsel auf eine eigene Handlung (signatur-design 4a, `reveal` 360 bis höchstens 440 ms) – die Selbstprobe zählt sie deshalb nicht als zweiten Moment. Die Probe »Verdecken« darf eine Auflösung zurückhalten, bis man sich festgelegt hat: eine **begründete Ausnahme von der Visible-at-Rest Rule**, weil das Zurückhalten selbst die Lernhandlung ist. Verborgen ist die Auflösung durch den Zustand der Probe, nicht durch eine Animation, die bei `opacity: 0` wartet; ohne JavaScript und im Druck steht sie offen in `<details>`. Die Schwärzung erscheint dort nur als gekennzeichnete Vorführung »So in M20«, nie für einen Satz dieser Website.
- **S bis X Proben zu den sechs Prinzipien (ab Version 4.20, Musterbuch »Kniff-Proben«, zweite Runde, Wahl Mario 9.11.2026: alle sechs):** Je Prinzip ein Band auf `sechs-hebel.html` – links das Prinzip, rechts seine Probe (`assets/sechs-hebel-proben.js`). Jede Probe verlangt zuerst eine eigene Festlegung; erst dann ändert sich etwas. Es sind Zustandswechsel auf eine eigene Handlung (Rolle »Zustandswechsel« aus signatur-design 4a), keine weiteren großen Momente neben R1 – die Selbstprobe zählt sie nicht als zweiten Moment. Neues Token `--dauer-aufdecken` 360 ms (»reveal«); Flüge mit `--dauer-flug` 440 ms. Ohne JavaScript bekommt die Liste keine Klasse `.sh-js`: Bedienteile sind aus, die Inhalte stehen in Vertiefungen (`<details class="mehr">`). Mit der Tastatur und bei »Weniger Bewegung« steht jeder Endzustand sofort (`.sh-sofort`). Nichts wird gespeichert.
  - **S · Verdecken:** Entscheidung (Mai 1940) → Sicherheit (sicher · eher sicher · unsicher) → »Die Lehrkraft schreibt ein Codewort an die Tafel« (zum Ausprobieren gilt jedes Wort) → drei datierte Schwärzungen lösen sich (`scaleX`, 360 ms, je 60 ms versetzt – die Zeitfolge ist Inhalt) → Rückblick-Frage zum Rückschaufehler. Begründete Ausnahme von Visible-at-Rest: Die Auflösung wartet durch den Zustand der Probe; ohne JavaScript steht sie in einer Vertiefung. Gekennzeichnet »so in M20, vereinfacht«; die Schwärzung bedeutet nur hier »damals nicht zu wissen«.
  - **T · Rückmelden:** drei Fälle zu Aufgaben von Parteien; gestufte Rückmeldung (Passt · Vertretbar · Eher nicht) öffnet am Ort (360 ms), Zwischenstand-Leiste nach jeder Antwort, »Zurücklegen und neu versuchen« bei »Eher nicht«. Die Fälle stehen einmal im HTML (Vertiefung) und werden vom Skript gelesen. Angelehnt an Station 2 der Politik-Werkstatt, Beispielaufgaben.
  - **U · Messen:** Vorhersage (eher zu früh · ziemlich genau · eher zu spät) → drei Durchgänge »fünf Sekunden schätzen« mit verdeckter Uhr, Start/Stopp auch per Leertaste → je ein Punkt auf der Skala 2–8 s (440 ms), Band der Streuung, Mittelwert und Vergleich mit der Vorhersage. Misst echte Werte des Geräts, keine Beispielwerte. **Bewusst ohne Bündeln der Klasse** (Entscheidung Mario, 9.11.2026: der Kursvergleich per QR hat in der Erprobung nicht gut funktioniert).
  - **V · Variieren:** Vermutung (3 · 4 · 5 Listen bei 5 %) → Regler 0–20 % und Rastknöpfe 0 · 5 · 10 · 15 % → Balken mit der Hürde als Linie, zehn Sitze (größte Reste, vereinfacht) mit Farbmarke je Liste, Zahl der Stimmen für Listen unter der Hürde; »Was lässt dieses Modell weg?«. Beispiel mit 20 Stimmen, keine Parteifarben. Ohne JavaScript: Tabelle mit drei Hürden.
  - **W · Stufen:** drei Lesetiefen zum Rückschaufehler am selben Ort (View Transition, `--dauer-uebergang`), neu Hinzugekommenes unterlegt, je Stufe eine Denkfrage, Stufen lassen sich zurücknehmen; ohne JavaScript alle drei Stufen untereinander.
  - **X · Bündeln:** eigene Sicherheit → die eigene Stimme fliegt ins Halbrund (440 ms, dicker Rand statt einer dritten Farbe – Two-Inks Rule), dann die Klasse; »Nach dem Gespräch (Beispiel)« färbt um, ohne dass sich Plätze bewegen (200 ms). Die 23 anderen Stimmen sind Beispielwerte.
- **Y Prinzipienrad (ab Version 4.21, Kopf der Seite »Wann funktioniert digitaler Unterricht?«; aus Claude Design, Canvas »Sechs Prinzipien – Überblicksgrafik«, Richtung C, Wahl Mario 9.11.2026):** Die Überblicksgrafik ersetzt die drei Felder im Kopf. In der Mitte das Gerät (`--lernen`), rundherum sechs Kacheln ohne Reihenfolge, der weiße Ring ist die Plenumsstelle, außen der Raum auf `--karton` mit »Deuten · Streiten · Urteilen« in den Ecken. Maße in Prozent eines Quadrats; am Beamer schrumpft das Quadrat (`clamp(17rem, 100svh − 21rem, 34rem)`), damit Kopf, Rad und erster Knopf in 720 px passen (Beamer Rule). Antippen hebt die Kachel 2 px auf eine Platte in `--wahl` (= `--lernen-tief`, Two-Inks Rule: keine dritte Farbe für »deine Wahl«; Rückmeldung, `--dauer-schnell`) und die Karte daneben wechselt ihren Text (Zustandswechsel, `--dauer-aufdecken` 360 ms, 6 px von unten); der Text kommt aus den sechs Bändern weiter unten, nichts steht doppelt. Noch einmal tippen nimmt die Wahl zurück. Kein großer Moment: Der eine Moment der Seite bleibt R1. Ohne JavaScript sind die Kacheln Sprungmarken zu den Bändern, die Karte zeigt alle sechs Sätze (Visible-at-Rest); Tastatur (`event.detail === 0`) und »Weniger Bewegung« wechseln ohne Übergang. Drei Richtungen (A Setzkastenbrett, B Gerät · Brücke · Raum als Bühne, C Prinzipienrad) liegen als Artboards im Canvas; B war die Empfehlung, C die Wahl – Grund: das Rad zeigt »keine Rangfolge« am deutlichsten, der Raum kam als Ring und Rahmen hinzu. Datei `assets/sechs-hebel-rad.js`.
- **Z1 Rad als Register (ab Version 4.22, Seite »Wann funktioniert digitaler Unterricht?«; Musterbuch Z, Wahl Mario 10.11.2026):** Die sechs Prinzipien-Bänder mit ihren Proben stehen nicht mehr untereinander – das Scrollen ermüdete (Rückmeldung Mario). Das Prinzipienrad im Kopf ist jetzt zugleich das Register: Das gewählte Prinzip steht als Karte neben dem Rad und direkt darunter als einziges Band mit seiner Probe (Abschnitt »Die sechs Prinzipien – eines nach dem anderen«, vor R1). »Weiter« und »Zurück« gehen reihum (nach dem sechsten kommt der erste), der Stand steht als Satz und wird angesagt (`aria-live`, »Prinzip 4 von 6: Variieren. Keine Reihenfolge – das Rad hat keinen Anfang.«). In Ruhe ist kein Prinzip gewählt; das Register ist leer und sagt, was zu tun ist. Das Band kommt in `--dauer-uebergang` 320 ms von der Seite, aus der geblättert wurde (weiter von rechts, zurück von links; nur `transform`/`opacity`); eine Sprungmarke in der Adresse (`#sh-messen`) zeigt ihr Prinzip gleich. Tastatur (`event.detail === 0`) und »Weniger Bewegung« wechseln ohne Übergang. Ohne JavaScript stehen alle sechs Bänder untereinander wie bis 4.21, die Blätterknöpfe fehlen (Visible-at-Rest). Nicht übernommen: **Z2 Kartenfächer** (eine Reihe liest sich wie eine Rangfolge; die Probe braucht Höhe) und **Z3 Aufklapp-Leiste** (sieht aus wie die Vertiefungen, macht die Prinzipien zu Zubehör). Datei `assets/sechs-hebel-rad.js` (Y und Z1 zusammen).
- **Leitkachel auf der Bereichsseite »Digitaler Unterricht« – ersetzt in 4.36** durch die Bereichsseite in vier Phasen (Leitband mit Leitfrage, vier Phasen nebeneinander, Register »Alle Werkzeuge nach Phasen«; Screen-Width Rule). Beschreibung bis 4.35 (ab Version 4.22): »Wann funktioniert digitaler Unterricht?« steht als Leitkachel (Überzeile »Die Frage dahinter«, Rahmen `--lernen`, Platte `--lernen-tief`, Titel in `--gr-h2`) neben dem Hauptwerkzeug »Unterricht digitalisieren«; beide passen am Beamer in 720 px. Darunter Unterricht planen · Digital-Check, dann Mein Ist-Stand · Was passt gerade zu mir · Tablet-Phasen gut führen · Nach der Stunde (Reihenfolge Mario). Die Hinweiszeile zu den Mustern heißt »Ideen und Kniffe für digitalen Unterricht« und sagt, dass es eine Sammlung ist, kein Weg; die Seite `muster.html` trägt denselben Marker. Die schmale Zeile `.sh-werkzeug` (4.19–4.21) entfällt. *Gestrichen in 4.41:* die vier Phasen nebeneinander und das Register »Alle Werkzeuge nach Phasen« (4.36–4.40) – ersetzt durch den Fahrplan (Abschnitt 7, »Fahrplan der Bereichsseite«).
- **AW Erklärfilm »Was das Gerät kann« (ab Version 4.21, eigene Seite `sechs-hebel-film.html`, Knopf im Kopf der Prinzipien-Seite; Storyboard aus Claude Design, Drehbuch bestätigt 10.11.2026):** Sieben Kapitel, 120 Sekunden, ein Satz oben je Takt, keine Stimme. Vorbild M22-Erklärfilm (Kapitel und »Du bist hier« immer im Bild) und `assets/film.js` (jedes Bild wird aus der Zeit T berechnet, darum lässt sich ziehen, anhalten und springen). Bühne 1280 × 720, per `transform: scale` auf den Rahmen skaliert; Regler, Kapitelknöpfe und Zeit unter der Bühne, »Du bist hier« = gefüllter Kapitelknopf in Druckschwarz. Drehbuch: 1 Der Schnellhefter (0:00, dasselbe Blatt wandert aufs Tablet) · 2 Sechs Prinzipien (0:15, das Rad baut sich auf, Reihenfolge nur Aufbau) · 3 Drei Beispiele (0:30, Verdecken M20 – Schwärzung löst sich nach der Abstimmung, Rückmelden Politik-Werkstatt – »Vertretbar – weil …«, Bündeln – Halbrund 15 Ja · 9 Nein, Beispiel) · 4 Die anderen drei (0:58, Messen Psycho-Labor 4,8 s, Variieren Hürde 5 → 3 % als Modell, Stufen M22 drei Lesestufen) · 5 Zurück in den Raum (1:18, das Prinzip fliegt über die Plenumsstelle an die Tafel, das Gerät geht zu, Deuten · Streiten · Urteilen werden dunkel) · 6 Keiner? Dann Papier. (1:38) · 7 Jetzt du (1:50, Probe R1 im Standbild, Tippring). Regeln: Start nur auf Knopfdruck, davor die Frage »Wann lohnt sich das Tablet?« (Reader-Paced Rule); der Satz oben baut sich wortweise auf, höchstens 2,4 s, und wird für Hilfstechnik vollständig angesagt (`aria-live`, »Kapitel 5, Zurück in den Raum: …«); nur `transform`/`opacity`; kein Jubel; Zahlen heißen Beispiel oder Modell; Pfeiltasten wechseln Kapitel, Leertaste hält an, verdeckter Tab hält an; am Ende »Noch einmal« oder »Zur Seite«, keine Schleife. »Weniger Bewegung«: sieben Standbilder (jeweils der Endzustand des Kapitels mit ganzem Satz), »Weiter« blättert, der Regler rastet auf Kapitel. Ohne JavaScript: Startkarte mit Hinweis, der ganze Text steht darunter (sieben Kapitel mit Links in die Galerie). Nichts wird gespeichert. Abweichung vom Prompt: eigene Seite im normalen Rahmen statt Tafel im iframe – so trägt der Film die Fußzeile mit der Kennzeichnung und braucht keinen zweiten Rahmen. Datei `assets/sechs-hebel-film.js`; Dauern im Film sind Sekundenwerte der Zeitachse, nicht die CSS-Tokens.
- **P Vom Blatt zum Tablet** trägt seit 4.18 eine Frage davor (»Was ändert sich an der Aufgabe …?«), damit die Lesenden wissen, worauf sie achten – Regel »eine Frage vor jeder Bewegung« aus `bewegung-als-lernmittel`.
- Ausnahmen von »nie über 300 ms«: Plattenwechsel 320, Übergang 320 (Q, R, W, Z1), Aufdecken 360 (S–X, Y), Durchschlag 420, Flug in den Schnellhefter 440, Passer 620, Zählwerk 720. Alle sind selten, einmalig oder räumlich und blockieren keine Eingabe. Der Erklärfilm AW läuft auf einer eigenen Zeitachse (Sekunden), die nur auf Knopfdruck startet und jederzeit anhält.
- Bewusst nicht übernommen: **H Druckwalze**.
- Durchgesehen für Version 4.7 (Musterbücher der Politik-Werkstatt und des GGK-Labors, nur Technik, keine Farben oder Metaphern): Übernommen wurde allein die Technik **»Balken wachsen vom Nullpunkt«** (Politik-Werkstatt E, Zweibild-Start wie `mv-von` im GGK-Labor) für I2 – sie zeigt, dass der Balken ein Stück der Stunde ist. Bewusst nicht übernommen: **Schwärzung aufdecken** für den Grund-Satz (die Schwärzung bedeutet dort »damals nicht zu wissen«; ein Grund-Satz ist kein Geheimnis, und in den ersten Bildern wäre der Text verdeckt – gegen »Text immer sofort lesbar«), **gestaffeltes Erscheinen der sechs Auswahl-Karten** (eine Folge von punktuell nach durchgängig läse sich wie Stufen; der Abschnitt steht beim Laden im Bild, und was zu sehen ist, wird nicht versteckt), **Stimmkarte und Codewort als Mini-Vorschau** (das wäre eine Simulation der Lernanwendung), **Stempel**, **Urne** und **Halbrund** (gehören zum Stimmzettel, nicht zur Galerie).

### Bedienung (ab 4.38)
- **The Three-Tap Rule.** Eine Handlung braucht höchstens drei Tipps bis zur ersten eigenen Antwort; Hilfen öffnen sich am selben Ort; eine Übersicht geht vor einer Klickstrecke. Herkunft: Rückmeldung »zu viel Rumgedrücke« zu M18 und M19 (GGK-Labor, 08.11.2026) – für M22 wurde daraus bewusst ein Arbeitsbereich zum Erforschen. *In Kidu:* Auf der Bereichsseite »Digitaler Unterricht« ist seit 4.41 jedes der 18 Werkzeuge mit zwei Tipps erreichbar – Phase antippen, Werkzeug wählen; »Alle Werkzeuge zeigen« öffnet alle vier Phasen mit einem Tipp (gemessen in `tests/e2e.py`). Bis 4.40 war es ein Tipp über das Register; der zweite Tipp ist der Preis für die eine Struktur.
- **The Device-Switch Rule.** Ergebnisse überleben den Gerätewechsel: Zwischenstand prüfen, falsche Karten einzeln zurücklegen, Stand speichern, das Ergebnis der Stunde als Datei (Politik-Werkstatt, erprobt 08.11.2026). *In Kidu:* »Mein Fortbildungsbogen« endet mit einem PDF, »Mein Rückmeldebogen« mit einem Text zum Kopieren und Drucken.
- **The Locked-from-Start Rule.** Ein Lehrkraftbereich wird von Anfang an verschlüsselt angelegt und in die Seite eingebettet, nicht nachgeladen; ein Codewort ist kein Schutz (GGK-Labor, PR 25, 13.11.2026, aus dem Bauen: nachträglich schützen hieß 19 Seiten umbauen, und die alten Texte bleiben im Git-Verlauf lesbar). *In Kidu:* kein Lehrkraftbereich.

### Bildansicht
- `<dialog>` auf Druckschwarz-Schleier, Titel und »Schließen« oben, Bild mit Bildtext, »Vorherige« · »Ansicht n von m« · »Nächste« unten. Escape, Pfeiltasten, Klick daneben. Fokus zurück zum auslösenden Bild.

### Bereichskopf
- Überschrift zuerst, darunter »Bereich: …« mit einem kleinen Plattenstreifen in der Bereichsfarbe. Kein Etikett über der Überschrift.
- Die Bereichsseite »Digitaler Unterricht« hat seit 4.36 statt des Bereichskopfs ein Leitband: Bereich und Untertitel als Überschrift (»Digitaler Unterricht · Fortbildung zum Selbermachen«), darunter die Leitfrage und der Zugang zu den Unterrichtsbeispielen.

### Fahrplan der Bereichsseite (ab 4.41, Entwurf B2 aus Claude Design, Entscheidung Mario 14.11.2026)
- **Aufbau:** Unter dem Leitband die Zeile »Die vier Phasen« mit dem Satz »Tipp eine Phase an. Du kannst bei jeder Nummer einsteigen.« (Operating-Line) und dem Knopf »Alle Werkzeuge zeigen« (`.knopf.still`, 48 px, `aria-expanded`; nur mit Skript da). Darunter eine nummerierte Liste: je Phase ein Kreis (Petrol-Rand, Nummer in Bricolage) und eine Platte. Die Platte ist ein `<details>`: Der Kopf (`summary`) zeigt Wann, Name (h3), den Satz der Phase und »n Werkzeuge« mit dem Plus-Kästchen der Vertiefungen; aufgeklappt stehen die Werkzeuge mit Name und Satz, so viele Spalten, wie die Breite trägt.
- **Flächen:** 1 und 3 auf `--flaeche`, 2 und 4 auf `--lernen-zart`. Zwei Töne trennen Nachbarn; sie nennen keine Phase – das tut die Nummer. Keine Farbe je Phase und keine abgestuften Petrol-Töne (Two-Inks Rule; Stufen sähen nach Rangfolge aus). Die offene Phase liegt auf einer versetzten Petrol-Platte (8 px), ihr Rand wird Druckschwarz.
- **Linien:** Petrol von Kreis zu Kreis, von den Grundlagen gestrichelt bis in die Zeile »dann rund um jede Stunde«; Druckschwarz in der Rinne links von Kreis 4 zurück zu Kreis 2, mit Spitze am Rand des Kreises; darunter »Nächste Stunde: wieder bei 2«. Ohne Bewegung.
- **Inhalt:** Phase 2 mit den zwei Türen und »oder« dazwischen, darunter »Dazu, wenn du willst:«; Phase 3 mit einer Vorschau der Karte für die Tafel (Text wie auf `tablet-phasen.html`); Phase 4 in drei Gruppen: Für dich · Im Kollegium · Zum Weitergeben (der Rückmeldebogen bleibt der letzte Schritt). Die Zahl im Kopf prüft `tools/pruefen.py` gegen die Links der Phase.
- **Verhalten:** Aufklappen geht ohne Skript. `assets/fahrplan.js` ergänzt »Alle Werkzeuge zeigen« / »Alle zuklappen«, öffnet die Phase einer Sprungmarke (`#phase-erstellen`, `#t-kollegium` …) und zeigt beim Drucken alle Phasen offen (danach wie vorher). Nichts wird gespeichert.
- **Maße:** Kopf mindestens 4,25 rem, Kreis 3 rem, Rinne 2,5 rem, Abstand 0,5 rem; bis 860 px stehen Wann und Zahl über dem Namen, bis 520 px stapelt der Kopf (Wann, Name, Satz, Zahl), Kreis 2,5 rem. Ab 1440 px rückt der Satz an den Namen (Namensspalte höchstens 22 rem). Gemessen: am Beamer 1280 × 720 enden die vier Phasen bei 681 px, am iPad quer 1180 × 820 bei 709 px; Druck A4 vier Seiten für Leitband und Fahrplan.

### Fuß
- Wortmarke in voller Breite als gestalteter Abschluss, darunter der Pflichttext. Keine Linkfarm.

### Logo Kidu (ab Version 4.26: Logo 5f aus Claude Design, Entscheidung Mario 10.11.2026)

- **Wortmarke:** »Kidu« in IBM Plex Mono, der i-Punkt sind zwei versetzte Platten – Ocker (KI) oben links, Petrol (digitaler Unterricht) unten rechts, Oliv nur in der Schnittmenge. Raster der Platten 2 : 1 : 2 (Platte 20, Versatz 10, Überlagerung 10); i-Punkt 0,2 em breit, Mitte bei 56 % der i-Breite. Schutzraum ringsum eine Überlagerung. Mindesthöhe 24 px, darunter nur das Zeichen.
- **Dateien** (`assets/logo/`): `kidu-logo.svg` (Standard, heller Grund), `kidu-logo-negativ.svg` (dunkler Grund), `kidu-logo-grau.svg` (einfarbig für Druck und Kopierer), `kidu-zeichen.svg` (nur die Platten, Profilbild), `favicon.svg` (Browser-Reiter). Die drei Wortmarken sind Umrisse – sie brauchen keine Schrift und sehen überall gleich aus. Umrisse aus IBM Plex Mono **Regular**: Der Entwurf ist in Plex Mono 500 gesetzt, diese Datei lag beim Bau nicht vor. IBM Plex steht unter der SIL Open Font License (© IBM Corp., Reserved Font Name »Plex«); ausgeliefert wird keine Schriftdatei.
- **Logofarben** (eigene Werte, nur im Logo und in der Zeile darunter): Tinte #201f1d · Ocker #b68235 · Petrol #2f5d62 · Oliv #3f5a44; negativ Papier #f3f2f2 · Ocker hell #e2b86c · Petrol hell #5fa3aa. In CSS `--logo-tinte`, `--logo-ocker`, `--logo-petrol`, `--logo-oliv`. Seit 4.26 gelten sie für die ganze Seite (Entscheidung Mario: »Farben auf Ocker und Petrol«).
- **Orte:** Kopf (40 px hoch, ab 1180 px mit Zeile darunter; auf der Startseite ohne Zeile, weil sie dort groß steht), Startseite als Titel, Fuß als großer Abschluss, Browser-Reiter. Der Startseiten-Film nutzt das Zeichen (`.kidu-zeichen`) in den Logofarben.
- **Ausgeschriebene Zeile (Pflicht):** »Künstliche Intelligenz und digitaler Unterricht« steht immer unter der Wortmarke. K · I tragen einen Unterstrich in Logo-Ocker, d · U in Logo-Petrol (`.ini.ki`, `.ini.du`); der Text bleibt Druckschwarz bzw. `--leise`.
- **Nicht:** kein Schullogo, keine Nachahmung eines Schul-Erscheinungsbilds; Kidu ist nicht an eine Schule gebunden. Bis 4.24: Zeichen aus zwei Platten neben der Wortmarke in Bricolage (Version 4.23).

### Bereichsetiketten
- KI-Training: Honigplatte mit Text. Digitaler Unterricht: Petrol mit hellem Text. Es gibt nur diese zwei Bereiche. Immer mit Wort, nie nur Farbfläche.
- In den Unterrichtsbeispielen (seit 4.36): »Außerhalb des Unterrichts« auf der Honigplatte (`.kz.ki`), »Unterricht« auf Petrol (`.kz.lernen`) – dieselben zwei Farben, keine dritte; die Schlüssel `ki` und `lernen` bleiben.

### Geführter Weg
- Eine Frage pro Schritt (H3, höchstens zwei Zeilen), Antworten als große Auswahlkarten, Stanzloch-Fortschritt mit Text »Schritt 2 von 5« (funktionale Orientierung, keine dekorative 01/02-Nummerierung), Zurück und »Noch nicht sicher« immer sichtbar.

### Papierfrage (das »live thing«)
- Drei Ja/Nein-Fragen zum Prüfstein »Geht es auf Papier genauso gut?«, Ergebnis sofort in einer von vier qualitativen Einstufungen mit sichtbarer Regel, `aria-live`, »Eingaben löschen«, `<noscript>`-Fassung der Regeln. Als »Entwurf zur Diskussion« gekennzeichnet.

## 8. Do's and Don'ts

### Do:
- **Do** Bereich und Status immer als Wort zeigen.
- **Do** den Überdruck nur dort zeigen, wo sich Platten wirklich überlagern.
- **Do** Hauptaktionen in Druckschwarz halten.
- **Do** versetzte Platte statt Schatten nutzen.
- **Do** Bewegung nur auf Knopfdruck starten und pausierbar machen.
- **Do** Zustände, die für Vorleseprogramme beschrieben sind, auch sichtbar zeigen: »Schritt n von m« neben den Stanzloch-Punkten, das Wort der gewählten Stufe unter einer Skala (ab Version 4.8).
- **Do** Überfahren-Zustände (`:hover`) nur unter `@media (hover:hover) and (pointer:fine)` setzen, damit auf dem Tablet nichts hängen bleibt.
- **Do** fehlende Bilder mit Rasterpunkten und »noch kein Bild« kennzeichnen.
- **Do** die Startseite im Beamerformat 1280 × 720 prüfen.
- **Do** die Auswahl »Zum Anfangen« als Anfang zeigen, nie als Bestenliste: zwei je Umfang, Kriterien sichtbar, keine Nummern.

- **Do** neue Seiten mit `lint.mjs` und `inspect.mjs` aus dem Taste Skill prüfen (Ausnahmen nur `still-page` und `no-footage`, begründet in `.taste-skill/direction.json`).

### Don't:
- **Don't** eine dritte Akzentfarbe, Verläufe, Glas oder Neon einführen.
- **Don't** weiche Schatten, große Rundungen (> 4 px außer Chips) oder Pill-Buttons verwenden.
- **Don't** Ampeln, Prozentwerte, Sterne, Abzeichen oder Ranglisten zeigen.
- **Don't** Schullogo, Schulfarben oder offizielle Wirkung erzeugen.
- **Don't** Autoplay, Endlos-Karussells oder Parallax einsetzen. Ausnahmen nur aus der Liste bei der Input-First Rule (Abschnitt 7, Bewegung). Der Fächer der Galerie, bis 4.35 die einzige Ausnahme, ist seit 4.36 gestrichen.
- **Don't** Text unter 16 px setzen oder Honig (#7D5A1C) als Fließtextfarbe nutzen.
- **Don't** Beispiele, Zitate, Zahlen oder Links erfinden.
- **Don't** `ease-in` für Bewegung verwenden oder Tastaturaktionen animieren.
- **Don't** kleine Etiketten über Überschriften (»Eyebrows«), Pill-Badges, Monospace-Etiketten oder gesperrte Versalien setzen.
- **Don't** Haarlinien, 1-px-Rahmen, Schnittmarken oder Passerkreuze als Schmuck verwenden (Formularfelder und echte Tabellen ausgenommen).
- **Don't** Platzhalterbilder (Stockfotos, picsum o. Ä.) oder »realistisch wirkende« Beispieldaten einsetzen – Rasterpunkte und »noch offen« sind ehrlicher.

## Kurzfassung für Kidu

Aus diesem Abschnitt baut `tools/werkzeugkiste.py` die Gestaltungsregeln, die der Auftrag »Lernseite als eine HTML-Datei« (Werkzeug: Unterricht digitalisieren) an die KI weitergibt. Sie übertragen das Erscheinungsbild von Kidu auf Lernseiten, die Kolleg*innen mit einem freigegebenen KI-System bauen lassen – ohne fremde Schriften, ohne Bauwerkzeuge. Änderst du oben eine Regel, prüf, ob die Kurzfassung noch stimmt.

- **Stand:** 13.11.2026

**Anforderungen**

- Ruhig und flach wie ein gut gedrucktes Arbeitsblatt: heller, warmer Grund (#F8F5EE), Text in fast schwarzem Druckschwarz (#201F1D).
- Höchstens zwei Farben für Bereiche oder Kategorien, zum Beispiel Ocker (#B68235 als Fläche, darauf nur dunkle Schrift) und Petrol (#2F5D62). Keine dritte Akzentfarbe, keine Verläufe, kein Glas, kein Neon. Ocker nie für Fließtext.
- Hauptknöpfe in Druckschwarz, mindestens 48 Pixel hoch. Ecken 4 Pixel, auch bei Karten und Feldern.
- Keine weichen Schatten. Tiefe, wenn nötig, durch eine harte, um 6 Pixel versetzte Farbfläche hinter der Karte.
- Systemschrift, keine Schriften aus dem Netz. Überschriften kräftig und höchstens zwei Zeilen lang. Kein Text unter 16 Pixel.
- Erst Ruhe, dann Bewegung: Bewegung nur als Antwort auf eine Handlung der Lernenden, höchstens 300 Millisekunden, nur Lage und Deckkraft. Ist im System »Bewegung reduzieren« eingestellt, bewegt sich nichts.
- Ruhe in der Arbeitsphase: Dort bewegt sich nur die Antwort auf eine eigene Handlung. Ein Arbeitsfenster je Phase, höchstens drei Tipps bis zur ersten eigenen Antwort, Hilfen öffnen sich am selben Ort.
- Linien nur, wo sie eine Beziehung tragen. Eine Verbindungslinie endet an ihrem Ziel und kreuzt keine fremden Felder. Ein Bild hat eine Ordnung: Ordnet es nach der Zeit, zeigt es keine zweite Zählung.
- Text über einem Bild ist auch an der ungünstigsten Stelle gut lesbar, mindestens 4,5 zu 1.
- Vor einem interaktiven Film steht ein Satz, was man tun kann. Ein Erklärfilm zeigt die echte Oberfläche der Seite.
- Übersichten auf einem Startbildschirm nutzen die Breite des Tablets quer: mehrere Karten nebeneinander, Fließtext trotzdem höchstens 68 Zeichen breit.
- Status und Rückmeldung immer auch als Wort, nie nur als Farbe. Keine Ampeln, Punkte, Sterne, Abzeichen oder Konfetti.
- Fehlende Bilder nicht erfinden: ein ruhiges Punktraster mit »noch kein Bild«. Keine Stockfotos, keine KI-Bilder als Fotos.
- Lesbar am Beamer: Das Wichtigste jedes Abschnitts passt in 1280 × 720 Pixel.
