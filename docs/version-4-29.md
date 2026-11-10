# Version 4.29 – Mein Fortbildungsbogen: eine Frage je Bild, Eröffnung, PDF

Stand: 10. November 2026 · Branch `fortbildungsbogen`

Grundlage: Rückmeldung Mario zu 4.27 (»Das hat mir nicht so gut gefallen … eine kurze Eröffnungsanimation, die den Sinn erklärt … sich einfach kurz durchklicken, die Bilder sollen wechseln, damit sie nicht nach unten scrollen müssen … ganz am Ende die PDF … so nennen, dass ich ihn teilen kann«). Der Kern: Die Person macht eine Voranalyse über sich, damit die Leitung sie in der Sitzung gezielt unterstützen kann.

## Neu

- **Name und Adresse:** `fortbildungsbogen.html` »Mein Fortbildungsbogen« (Voranalyse vor einer Fortbildung oder Beratungsstunde). `startpunkt.html` leitet weiter (`WEITERLEITUNGEN` in `tools/bauen.py`); Bühne, Vorführung und Leiste »So geht es« aus 4.27 sind entfernt.
- **Eröffnung** (einmal je Sitzung, `sessionStorage`): vier Sätze mit einem Bild aus Figur, Sprechblase »Hey.«, Stanzloch und Blatt – »Hey. Bald sitzt du in einer Fortbildung zu KI und Tablet.« · »Sie soll bei dir anfangen …« · »Dafür zwanzig kurze Fragen. Kein Richtig, kein Falsch, keine Bewertung.« · »Am Ende eine Seite als PDF …«; Takt 4 s, »Los geht’s«, »Eröffnung überspringen«, Escape; bei »weniger Bewegung« stehen alle vier Sätze. Der Inhalt ist ohne sie vollständig.
- **Klickweg** (`assets/fortbildungsbogen.js`): zwanzig Fragen und die Stunde als 21 Bilder wie in den geführten Wegen – Schrittleiste mit fünf Stanzloch-Schritten, »Frage n von 20 · Schritt«, Frage, Hilfe mit Beispiel, Optionen. Einzelwahl geht nach kurzer Rückmeldung von selbst weiter; Mehrfachwahl und Text über »Weiter«; »Zurück« und »Überspringen« immer da; Schritte in der Leiste springen. Übergang 200 ms (weiter von rechts, zurück von links; bei weniger Bewegung keiner). Position und Auswahlwerte bleiben im Browser (`hilde.fortbildungsbogen`), Textfelder nie.
- **Der fertige Bogen** am Ende wie in 4.24 (Karte mit vier Feldern, Stärken zuerst, drei Schritte, zwei Kniffe, eigene Worte, Codeblock »fortbildungsbogen v1«), dazu »Antworten ändern« und »Als PDF sichern« (eine A4-Seite).
- Verweise in Beratungsstunde, Fortbildungsbaustein und »Über« umbenannt; README.

## Regeln, die eingehalten sind

Eine Entscheidung je Bild, »Noch nicht sicher« als Überspringen, keine Sackgasse, Neu starten · Eröffnung einmal je Sitzung, überspringbar, Inhalt ohne sie vollständig (signatur-design, Wiedererkennung) · Übergang zwischen Lernschritten 200 ms, nur transform/opacity · keine Bewertung, keine Rangfolge · nichts gespeichert außer Auswahlwerten · ohne JavaScript Hinweis.

## Offen

- Erprobung: zehn Minuten? Stören die Beispiele im Hilfetext oder helfen sie?
- iPad: Übergang und »Als PDF sichern« im Druckfenster prüfen.
- Namensvorschlag »Voranalyse« steht in der Markerzeile; falls der Bogen so geteilt wird, Titel und Dateiname nochmals prüfen.
