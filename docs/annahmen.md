# Annahmen und Entscheidungen

Knappe Annahmen, wo eine Angabe fehlte. Jede lässt sich später ändern.

## Version 1, Schritt 2 (Tablet-Weg)

1. **Rahmen-Schritt:** Gefragt werden nur vier Bedingungen, die die Empfehlung tatsächlich ändern: Netz, Geräte, Tablet-Erfahrung der Klasse, Vorbereitungszeit. Alle sind freiwillig. Sozialform, Barrierearmut und Datenschutz verändern die Regeln derzeit nicht und werden deshalb nicht abgefragt.
2. **»Noch unklar« beim Mehrwert** führt zu »Analog oder hybrid vermutlich passender«. Begründung: Wer keinen Beitrag des Tablets benennen kann, ist mit Papier meist gut beraten (Prüfstein).
3. **Mehrwert-Arten der Beispiele** (`mehrwerte`) sind ein zusätzliches Feld im Datenmodell. Es verbindet den Tablet-Weg mit dem Showroom. Alle Werte sind Vorschläge.
4. **Anliegen** der Beispiele sind aus den bisherigen Kategorien übernommen (Tabelle in `datenluecken.md`) und gelten deshalb nicht als Vorschlag.
5. **KI-Einsatz** ist nur bei den Beispielen eingetragen, für die er belegt ist. Bei allen anderen bleibt er offen – nicht »ohne KI«.
6. **»In Überarbeitung«** zählt in der Beispielsuche 3 weniger. So stehen diese Beispiele hinter gleich passenden fertigen Beispielen, bleiben aber auffindbar.
7. **Persönliche Beobachtungen** stehen nur bei Beispielen, zu denen die Lehrkraft eine Rückmeldung gegeben hat (NS-Ideologie, Gruppenpädagogik-Quest). Sie tragen den Hinweis »kein Wirksamkeitsnachweis«.
8. **Detailseite:** Die Adresse lautet `beispiel.html#slug`. Eine Seite für alle Beispiele hält das Bauskript einfach und funktioniert auch per `file://`.
9. **Tests:** `npx playwright test` ist hier nicht verfügbar. Die Browser-Tests laufen mit Python Playwright (`python3 tests/e2e.py`). axe-core wird als lokale Datei unter `tests/vendor/` eingebunden und nicht ins Repository übernommen. Im Moment steht nur eine ältere axe-Fassung (3.5) zur Verfügung; eine aktuelle Fassung folgt in Schritt 5.
10. **Alte Seitennamen** `lernen.html` und `beispiele.html` entfallen. Der Hauptzweig ist davon erst nach Freigabe betroffen.

## Version 1, Schritte 3 und 4

11. **KI-Weg:** Die Anfrage wird aus festen Textbausteinen gebaut (`assets/daten/texte.js`, `assets/ki-anfrage.js`). Fehlen Fach oder Thema, bittet die Anfrage die KI, zuerst nachzufragen. Freitexte bleiben nur im Arbeitsspeicher der Seite.
12. **Ergebnisformen »Sitzungsablauf« und »Übersicht«** ergänzen die Liste aus dem Auftrag, damit jedes Ziel mindestens zwei passende Formen hat.
13. **Showroom-Filter** werden im Browser gemerkt, Suchwörter nicht. Das Tablet-Ergebnis übergibt Phase und Anliegen an den Showroom.
14. **Konzeptbeispiele:** drei Ideen für Lücken (Kfz-Technik, KI-Antwort prüfen, Lernstand am Stundenende). Sie stehen in der Suche hinter gleich passenden echten Beispielen. Alle Zuordnungen sind Vorschläge.
15. **Selbsteinschätzung** liegt auf einer eigenen Seite (`passt.html`), verlinkt aus dem Tablet-Weg. So bleibt die Startseite ruhig. Offene Fragen zählen als Mitte der Skala.
16. **Entdeckungsbühne** ist in Version 1 bewusst nicht enthalten. Das ruhige Raster erfüllt die Anforderungen; eine Bühne wäre zusätzlicher Pflegeaufwand ohne klaren Gewinn.
17. **Schmale Bildschirme:** Der Navigationspunkt »Start« wird ausgeblendet; die Marke »Hilde Digital« führt zur Startseite.

## Bestätigung

18. Alle vorgeschlagenen Zuordnungen (Phase, Umfang, Rolle, Mehrwert-Art) und die drei Konzeptbeispiele sind von der Lehrkraft bestätigt. Die Markierung `vorschlag` ist deshalb entfernt.
