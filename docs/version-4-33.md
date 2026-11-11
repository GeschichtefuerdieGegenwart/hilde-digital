# Version 4.33 – Erste Schritte aus der Analyse: Einstieg, Herkunft, Belege, Verbindungen

Stand: 11. November 2026 · Branch `schritte-analyse`

Grundlage: Analyse »Kidu kritisch geprüft« (Claude-Dokument, 11.11.2026). Auftrag Mario: die ersten vier Schritte umsetzen, danach den Umbau der Galerie und die Verbindung von Galerie, Prinzipien, Aufgabenkoffer und Prompts.

## 1 · KI-Training: Einstieg

- Neuer Abschnitt **»Deine ersten zehn Minuten«** direkt unter den zwei Türen: KI-System öffnen (F13 und AIS.chat mit Stand) · Prompt holen und einfügen · Ergebnis mit drei Fragen prüfen · einmal nachfragen (vier Folgesätze).
- Die **Schnell-Anfrage** steht wieder vor »Weiter im KI-Training« (seit 4.28 lag sie darunter).

## 2 · Herkunft der Galerie

- »aus dem Kollegium« und »was Kolleg*innen schon gebaut haben« heißen jetzt »aus dem Unterricht« (Startseite, Galerie, Bereichsseite, Über Kidu, Empfehlungstexte, Beschreibung der Seite). In der Galerie steht: »Bisher stammen alle Beispiele aus dem Unterricht des Urhebers von Kidu.«
- In den Empfehlungstexten wurde »Das ist der häufigste Startpunkt im Kollegium« zu »Das ist ein häufiger Startpunkt« (nicht belegt).

## 3 · Belege im Aufgabenkoffer

- Auswahlaufgabe mit Rückmeldung: **belegt** (Wisniewski, Zierer & Hattie 2020).
- Regler und Modell: **teilweise belegt** (D'Angelo u. a. 2014; fast nur Naturwissenschaften).
- Stimmen der Klasse sammeln: **teilweise belegt** (Hunsu, Adesope & Bayly 2016; nur die Zusammenfassung gelesen).
- »Noch offen« tragen jetzt acht statt zehn Aufgaben.

## 4 · Namen eingefroren

- Regel in `CLAUDE.md`: Die Namen der Seite und der Werkzeuge bleiben bis 11.05.2027.

## Verbindungen

- **Daten:** 15 Galerie-Beispiele tragen die Felder `prinzipien` und `aufgaben`, zwölf dazu den Satz `geraet` (»Das Gerät …«), zwei eine `stimme` (Rückmeldung der Lernenden, zusammengefasst). Alle Zuordnungen stehen in `vorschlag` mit Begründung und in `docs/datenluecken.md`. Zugeordnet ist nur, was auf der Seite der sechs Prinzipien, in den Beispieldaten oder im Tresor belegt ist; 21 Beispiele bleiben ohne Zuordnung.
- **Taxonomie:** `prinzipien` in `assets/daten/taxonomien.js`.
- **Galerie:** neuer Abschnitt »Was das Gerät hier kann« ganz oben – sechs Prinzipien zur Wahl, in Ruhe je ein Beispiel; jede Karte mit Geräte-Satz. Auch die Karten der Suche zeigen Satz und Prinzip-Marken.
- **Beispielseite:** neuer Abschnitt »Was kann das Gerät hier?« mit Satz, Prinzip, Aufgaben aus dem Aufgabenkoffer, Stimme der Lernenden und »So etwas bauen«.
- **Sechs Prinzipien:** unter jedem Prinzip »In der Galerie« mit bis zu vier Beispielen.
- **Aufgabenkoffer:** jede Aufgabe lässt sich »Als Prompt holen« – fünf Teile, anbieterneutral, aus den Feldern der Aufgabe.

## Nicht umgesetzt – braucht Material oder eine Entscheidung

- **Bewegte Ausschnitte** (Vorschlag 4) und **Vorher – nachher** (Vorschlag 5): brauchen Aufnahmen aus den Anwendungen und die alten Arbeitsblätter.
- **Elf fehlende Bilder:** brauchen Bildschirmfotos aus den Anwendungen.
- **Probe von zehn Sekunden in der Galerie** (Teil von Vorschlag 1): Die Bühne verweist auf die Proben der sechs Prinzipien; eine eigene Probe je Beispiel ist nicht gebaut.
- **Kürzen der Galerie:** Die Seite ist durch den neuen Abschnitt länger geworden. Welche der alten Abschnitte (Zum Anfangen, Vorbeiziehen, Einblicke) weichen, ist eine Entscheidung.
- **Stimmen der Lernenden:** nur für zwei Beispiele vorhanden.

## Geprüft

`python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py` – Ergebnis im Pull Request.
