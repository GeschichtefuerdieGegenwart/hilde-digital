# Version 4.24 – Mein Startpunkt: Voranalyse vor der Fortbildung

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
