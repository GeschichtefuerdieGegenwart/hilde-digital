# Hilde Digital – Version 1

Stand des Branches `v1-module`. Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.

## Prüfbefehl

```
python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py
```

## Wichtigste Produktentscheidungen

1. **Zwei getrennte Wege, ein gemeinsamer Showroom.** »KI für meine Arbeit« (Honig) und »Unterricht mit Tablets« (Petrol) sind gleichwertig. Bereich steht immer als Text und Farbe.
2. **Eine Entscheidung pro Schritt.** Tablet-Weg sechs Schritte, KI-Weg fünf. »Noch nicht sicher« ist zulässig.
3. **»Analog oder hybrid« ist ein vollwertiges Ergebnis.** Wer keinen Beitrag des Tablets benennen kann, bekommt den Prüfstein, keinen Tadel.
4. **Keine KI-Anbindung.** Der KI-Weg baut eine sichtbare, änderbare Anfrage. Kopieren, prüfen, anpassen – die Lehrkraft bleibt verantwortlich.
5. **Wahrheit der Daten vor Vollständigkeit.** Unbelegtes bleibt »noch offen«. Neue, noch nicht bestätigte Zuordnungen tragen das Kennzeichen »Vorschlag«.
6. **Keine Rangfolge des Umfangs.** Punktuell ist keine Vorstufe. Durchgängig wird nur empfohlen, wenn die Bedingungen es tragen.
7. **Ruhiges Raster statt Bewegung.** Die optionale Entdeckungsbühne ist bewusst nicht enthalten.

## Übernommen, überarbeitet, neu

| | Teile |
| --- | --- |
| übernommen | Gestaltungssystem (Farben, Schrift, Abstände), Venn-Grafik, Prüfstein, 17 Beispiele mit Titel, Kurztext, Fach, Status, Link, Bildschirmfotos, Bau- und Prüfskript als Grundlage |
| überarbeitet | Startseite (Orientierungssatz, zwei Wege), Navigation (fünf Punkte), Showroom (Suche, Filter, Lockerung), Prüfskript (Daten, Links, Schriftgrößen, Skripttexte), Bereichsseiten zu geführten Wegen |
| neu | Tablet-Weg mit Entscheidungskarte, KI-Weg mit Anfrage-Baukasten, Detailseite je Beispiel, Selbsteinschätzung, Über das Modul, Taxonomien, Regeln, drei Konzeptbeispiele, Tests, Dokumentation |

## Informationsarchitektur

- **Start** (`index.html`) – zwei Wege, Zugang zum Showroom, »Wie hängt beides zusammen?«
- **KI für meine Arbeit** (`ki.html`) – Ziel · Ergebnis · Kontext · Anfrage · Prüfen
- **Unterricht mit Tablets** (`tablets.html`) – Phase · Lernabsicht · Mehrwert · Umfang · Rahmen · Entscheidungskarte
  - **Was passt gerade zu mir?** (`passt.html`) – freiwillige Selbsteinschätzung
- **Showroom** (`showroom.html`) – Suche, Filter, Karten
  - **Beispiel** (`beispiel.html#slug`) – Detailansicht
- **Über das Modul** (`ueber.html`) – Arbeitsstand, Leitsätze, Daten, KI-Hinweise, Fachbegriffe, Beratungsangebot
- Gestaltungssystem (`gestaltung.html`) – nur über die Fußzeile

## Die Empfehlungslogik in einfachen Worten

Die Regeln stehen kommentiert in `assets/regeln.js`.

- **Einstufung:** Nur Verteilen und Einsammeln → organisatorischer Nutzen. Kein benennbarer Beitrag oder fehlendes Netz für ein Netz-Vorhaben → analog oder hybrid. Passen Lernabsicht und erhoffter Beitrag zusammen (Tabelle `PASST`) → klarer Lernmehrwert, außer ein durchgängiges Setting trifft auf wenig Zeit oder wenig Erfahrung. Sonst → Mehrwert möglich, Anpassung nötig.
- **Umfang:** Die Wahl der Lehrkraft gilt. Nur bei Überforderung (durchgängig mit wenig Zeit, Erfahrung oder geteilten Geräten) wird phasenweise vorgeschlagen – mit Begründung.
- **Rolle:** ergibt sich aus der Art des Beitrags, dem Anliegen und der Phase – nie aus dem Redeanteil.
- **Beispiele:** Harte Ausschlüsse (reine KI-Beispiele, ohne Netz keine Online-Anwendung). Dann zählen Anliegen und Mehrwert-Art am meisten, danach Phase, Umfang, Rolle. »In Überarbeitung« und Konzeptbeispiele stehen hinter gleich passenden. Passt nichts genau, wird gelockert und das gesagt.
- **Selbsteinschätzung:** Wenig Technik oder Zeit → punktuell. Gespräch wichtig → Moderieren und Formate, die ins Gespräch zurückführen. Nie Verzicht auf digitale Bildung.

## Pflege

- **Neues Beispiel:** In `assets/daten/beispiele.js` einen Eintrag kopieren, `id` neu vergeben, nur Belegtes eintragen. Bildschirmfoto nach `assets/bilder/`. Dann `python3 tools/datenluecken.py` und den Prüfbefehl ausführen.
- **Vorschlag bestätigen:** Feldnamen aus `vorschlag` entfernen (bei Bedarf den Wert vorher ändern), dann `python3 tools/datenluecken.py`.
- **Begriffe ändern:** nur in `assets/daten/taxonomien.js`. Die `id` bleibt, der Text darf sich ändern.
- **Regel ändern:** in `assets/regeln.js`, mit Test in `tests/regeln.test.js`.

## Tests

| Bereich | Umfang |
| --- | --- |
| Prüfskript | Kennzeichnung, verbotene Inhalte, Fachbegriffe auf Einstiegsseiten und in Wegtexten, keine externen Dateien, interne Links, Schriftgröße ≥ 16 px, Datenvalidierung |
| Unit-Tests (`node --test`) | 42 Tests: Einstufung, Umfang, Rollen, Beispiele, Lockerung, leere und widersprüchliche Eingaben, Selbsteinschätzung, Suche, Anfrage-Baukasten, Konzeptbeispiele |
| Browser-Tests (`tests/e2e.py`) | Kernwege, Zurück und Ändern, Speichern und Löschen, Filter und Chips, Lockerung, nur Tastatur, ohne Internet, reduzierte Bewegung, Konsolenfehler, axe-core, kein waagerechtes Scrollen in drei Breiten und bei 200 % Zoom |

**Szenarien**

| # | Szenario | geprüft in |
| --- | --- | --- |
| 1 | KI-unerfahrene Lehrkraft, analoges Arbeitsblatt | e2e: KI-Weg |
| 2 | kurzer digitaler Einstieg | e2e: Kernweg |
| 3 | tabletgestützte Erarbeitung | Unit: Szenario 3 |
| 4 | Lernstand erkennen | Unit: Szenario 4 |
| 5 | unterschiedliche Lernwege | Unit: Szenario 5 |
| 6 | durchgängige HTML-Lernumgebung | Unit: Szenario 6 |
| 7 | Kfz-Technik, nur Konzeptbeispiele | Unit und e2e: Showroom |
| 8 | Stöbern ohne Angaben | e2e: Showroom |
| 9 | keine exakte Übereinstimmung | Unit und e2e: Lockerung |
| 10 | nur Tastatur | e2e: Tastatur |
| 11 | reduzierte Bewegung | e2e |
| 12 | ohne Internet | e2e |

## Bekannte Grenzen von Version 1

- axe-core lief in einer älteren Fassung (3.5). Eine Prüfung mit der aktuellen Fassung steht aus.
- Die Browser-Tests nutzen Python Playwright statt `npx playwright test`.
- Die didaktischen Zuordnungen (Phase, Umfang, Rolle, Mehrwert-Art) sind von der Lehrkraft bestätigt. Detailfelder (Lernaktivitäten, Bedarf, Anpassungen, Stolpersteine) sind überwiegend offen – siehe `datenluecken.md`.
- Sechs Beispiele sind noch nicht online und deshalb nur als Bild oder Text zu sehen.
- Es gibt nur eine helle Ansicht.
- Die Regeln sind bewusst einfach. Sie ersetzen kein kollegiales Gespräch.

## Nächste Schritte (priorisiert)

1. Detailfelder der erprobten Beispiele ergänzen (Was tun die Lernenden? Stolpersteine?).
2. Mit zwei, drei Kolleg*innen aus verschiedenen Fächern die Wege ausprobieren und Rückmeldungen sammeln.
3. Klären, welche KI-Systeme an der Schule freigegeben sind, und den KI-Weg entsprechend ergänzen.
4. Barrierefreiheit mit aktueller axe-Fassung und einem Screenreader prüfen.
