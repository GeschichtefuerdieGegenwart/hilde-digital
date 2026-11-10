# Version 4.28 – Die Bereichsseiten neu geordnet

Stand: 10. November 2026 · Branch `bereiche-aufmachung`

Grundlage: sechs Aufmachungen auf der Claude-Design-Leinwand »Kidu – Logo«. Entscheidung Mario (10.11.2026): **U3** für »Digitaler Unterricht«, dazu die Galerie als Werkzeug; **K1** für »KI-Training«. Alle Inhalte sind die von 4.27, nur neu geordnet.

## Digitaler Unterricht (U3 · Eine Frage, ein Register)

- Oben ein Band in Petrol: der Bereichsname klein, die Frage »Wann funktioniert digitaler Unterricht?« groß. Daneben zwei Wege: »Die sechs Hebel ansehen« und »Film · zwei Minuten«.
- Darunter zwei Türen: »Ich habe schon Material« → Unterricht digitalisieren, »Ich fange neu an« → Unterricht planen.
- Alle übrigen Werkzeuge als ruhige Liste mit der Spalte »wann«: Papierfrage (springt zum Kasten weiter unten), Digital-Check, Tablet-Phasen gut führen, Nach der Stunde, Mein Ist-Stand, Was passt gerade zu mir?, Ideen und Kniffe, **Galerie** (neu in der Liste statt als Hinweistext).
- »Für den Austausch im Kollegium« bleibt als eigener Abschnitt, aber kompakt in drei Spalten. Aufklappen wie im Entwurf ist noch offen (Entscheidung Mario vom 10.11.: Kollegium später).
- Das Motiv »Stundenlinie« im Seitenkopf entfällt hier; die Frage trägt den Kopf.

## KI-Training (K1 · Zwei Türen, drei Fächer)

- Die zwei Türen oben bleiben wie bisher.
- »Weiter im KI-Training« steht jetzt direkt unter den Türen, vor Schnell-Anfrage und Generator, und ordnet die Wege in drei benannte Gruppen: **Einmal einrichten** (KI für dein Fach) · **Fertig zum Kopieren** (Aufträge, Unterrichtsmuster) · **Sicher bleiben** (Sicher arbeiten, Lernende mit KI). Die Werkzeugkiste steht klein darunter.

## Geprüft

`python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – Ergebnis im Pull Request. Tests »Digitaler Unterricht« und »KI-Training« an die neue Ordnung angepasst bzw. ergänzt.
