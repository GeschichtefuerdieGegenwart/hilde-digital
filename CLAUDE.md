# Kidu – Regeln für die Arbeit an diesem Projekt

Name seit 10.11.2026 (Entscheidung Mario): »Kidu · Künstliche Intelligenz und digitaler Unterricht«. Unter der Wortmarke steht immer die ausgeschriebene Zeile. Kidu ist nicht an eine Schule gebunden. Frühere Namen: »Hilde Digital« (bis 01.11.2026), »Papierprobe · Kompass für KI und digitalen Unterricht« (01.–10.11.2026). Das Werkzeug »Geht es auf Papier genauso gut?« heißt »Papierfrage«. Seit 11.11.2026 (Entscheidung Mario): Die »sechs Hebel« heißen »sechs Prinzipien«, die »Werkzeugkiste« heißt »Methodenkoffer«; Adressen und Ordner (`sechs-hebel.html`, `werkzeugkiste.html`, `werkzeugkiste/`) bleiben. **Namen sind bis 11.05.2027 eingefroren (Entscheidung Mario, 11.11.2026):** Kidu, KI-Training, Digitaler Unterricht, Unterrichtsbeispiele, Schnell-Anfrage, Prompten lernen, Papierfrage, sechs Prinzipien, Aufgabenkoffer, Methodenkoffer, Ideen und Kniffe, Digital-Check, Digitalen Unterricht erstellen, Unterricht neu planen, Bisherigen Unterricht digitalisieren, Tablet-Phasen gut führen, Nach der Stunde, Mein Fortbildungsbogen, Mein Rückmeldebogen (bestätigt 13.11.2026). Keine Umbenennung ohne ausdrückliche Anweisung; neue Werkzeuge bekommen ihren Namen einmal. **Ausnahme von der Namenssperre (Entscheidung Mario, 13.11.2026):** Aus »Galerie« wird »Unterrichtsbeispiele« (Überschrift der Seite »Unterrichtsbeispiele: analog und digital«, darunter »beides mit KI erstellt«). Aus »Unterricht digitalisieren« und »Unterricht planen« wird der Einstieg »Digitalen Unterricht erstellen« mit »Unterricht neu planen« und »Bisherigen Unterricht digitalisieren«. Die Adressen bleiben (`galerie.html`, `tablets.html`, `digitalisieren.html`); was umzieht, bekommt eine Weiterleitung. Der Bereich »Digitaler Unterricht« hat seit 13.11.2026 vier Phasen: Grundlagen · Digitalen Unterricht erstellen · Unterrichten · Nach der Stunde. Neues Werkzeug: »Mein Rückmeldebogen« (`rueckmeldebogen.html`). Repository und GitHub-Pages-Adresse heißen seit 10.11.2026 `kidu` (Entscheidung Mario; vorher `hilde-digital`, die alte Seiten-Adresse wird nicht weitergeleitet).

Diese Datei liest Claude Code zu Beginn jeder Sitzung. Sie gilt auch für jede andere Bearbeitung.

## Leitsätze
- Erst das Anliegen, dann das Werkzeug.
- KI kann Unterricht vorbereiten. Digitalität kann Lernen gestalten. Beides kann zusammenkommen – muss es aber nicht.
- Nicht zeigen, was technisch möglich ist, sondern was Unterricht und schulische Arbeit konkret verbessert.

## Feste Rahmenbedingungen
- Arbeite nur auf einem eigenen Branch. Zusammenführen in den Hauptzweig nur auf ausdrückliche Anweisung oder Freigabe zum Umsetzen im Chat (z. B. »führe PR 5 zusammen«). GitHub Pages nicht aktivieren oder ändern (Ausnahme: Umbenennung in `kidu` am 10.11.2026 auf Anweisung).
- Keine KI-Anbindung, keine simulierten KI-Antworten, keine Namen von KI-Anbietern. Sprich von einem »an deiner Schule freigegebenen KI-System«.
  Ausnahme (Entscheidung Mario, 31.10.2026): Die landeseigenen Angebote in Baden-Württemberg, **F13** und **AIS.chat**, dürfen auf Erklärseiten ausdrücklich genannt werden – immer mit Stand und dem Hinweis, dass die Schulleitung freischaltet. Prompts und kopierbare Aufträge bleiben anbieterneutral.
- Verlinkte Lernanwendungen liegen in anderen Repositories. Nur verlinken, nie ändern.
- Keine Namen von Kolleg*innen, keine Schülerdaten, keine persönlichen Daten.
  Ausnahme (Entscheidung Mario, 01.11.2026): Der Name des Urhebers, Mario Walter, steht im Abschnitt »Wie Kidu entstanden ist« auf ueber.html, in der Urheberzeile der Fußzeile, in README.md, ENTSTEHUNG.md, LICENSE und LICENSE-TEXTE.md. Keine Kontaktadresse, keine E-Mail.
- Lizenz: Texte und Daten CC BY-NC-SA 4.0 (LICENSE-TEXTE.md), Code MIT (LICENSE), Bilder alle Rechte vorbehalten. Lizenzen nur auf ausdrückliche Anweisung ändern.
- Kidu ist ohne Auftrag einer Schule entstanden. Die Seiten stellen sie nicht als Auftragsarbeit oder Schulkonzept dar.

## Inhalt
- Einfache Sprache: kurze Sätze, eine Aussage pro Satz, Anrede »du«.
- Keine Fachbegriffe auf Start- und Bereichsseiten (Liste in tools/pruefen.py). Fachbegriffe nur in aufklappbaren Vertiefungen.
- Nichts erfinden: keine Links, Erfahrungen, Wirkungen oder Funktionen, die nicht belegt sind. Unbekanntes heißt »noch offen«.
- Unterrichtserfahrungen sind persönliche Beobachtungen, kein Wirksamkeitsnachweis.
- Keine Entwicklungsstufen: Eine umfassende Lernumgebung ist nicht besser als ein punktueller Einsatz.
- »Analog oder hybrid« ist ein vollwertiges Ergebnis. Motivation allein ist kein Lernmehrwert.
- Phasen, Anliegen, Umfang und Rollen stehen nur in assets/daten/taxonomien.js und werden überall gleich verwendet.

## Wahrheit der Daten
- Titel, Kurzbeschreibung, Fach, Status und Links der Beispiele nicht verändern.
- Unbelegte Felder bleiben leer; die Oberfläche zeigt »noch offen«. Keine Werte erfinden.
- Didaktische Zuordnungen (Phase, Umfang, Rolle, Mehrwert-Art) dürfen vorgeschlagen werden, stehen dann aber in `vorschlag` und in docs/datenluecken.md (`python3 tools/datenluecken.py`).
- Konzeptbeispiele: Status »Idee«, kein Link, kein echtes Vorschaubild, keine Erfahrung; Kennzeichen »Konzeptbeispiel – noch nicht erprobt«.
- Status nur: Idee · in Entwicklung · Prototyp · im Unterricht erprobt · in der Praxis erprobt · In Überarbeitung · für die Präsentation vorbereitet · noch offen. »In der Praxis erprobt« (seit 13.11.2026, Entscheidung Mario) gilt für Anwendungen außerhalb des Unterrichts, die im Einsatz sind.
- »Karte zum Zweiten Weltkrieg« und »Politik-Check 1919« bleiben »In Überarbeitung«; der Politik-Check trägt »kein Angebot der bpb«.

## Kennzeichnung
- Jede Seite trägt in der Fußzeile: »Kidu · Künstliche Intelligenz und digitaler Unterricht · Persönlicher Entwicklungsstand zur Diskussion – noch kein beschlossenes Schulkonzept.«
- Kein Schullogo, keine Nachahmung des schulischen Erscheinungsbilds, keine Kontaktadresse, keine Platzhalter im Quelltext.
- Interne Notizen gehören nicht in dieses Repository (es ist öffentlich).

## Technik
- Statisches HTML, CSS und wenig JavaScript. Kein Framework, keine fremden Schriften, Skripte oder Tracking.
- Seiteninhalt steht in src/*.html; Kopf- und Fußzeile nur in tools/bauen.py.
- Alle Beispiele stehen in assets/daten/beispiele.js. Neues Beispiel = neuer Eintrag dort.
- Empfehlungsregeln stehen kommentiert in assets/regeln.js; jede Regeländerung braucht einen Test in tests/regeln.test.js.
- Regeln des Selbstchecks stehen kommentiert in assets/check-regeln.js (Daten: assets/daten/qualitaet.js); jede Änderung braucht einen Test in tests/check-regeln.test.js. Stärke-Hinweise bei den Unterrichtsbeispielen nur aus einem freigegebenen Check (Feld `qualitaetscheck`).
- Daten als JS-Dateien, nicht als JSON per fetch, damit die Seiten per file:// laufen.
- Eine Quelle für alles (Entscheidung Mario, 10.11.2026): Die Skills des Plugins »kidu« werden nur in `werkzeugkiste/kidu/` gepflegt. Was davon auf der Website steht, kommt aus dem Abschnitt »Kurzfassung für Kidu« des jeweiligen Skills (bzw. aus `werkzeugkiste/kurzfassungen/` für den privaten Bau-Skill `lernseite-bauen` und aus `DESIGN.md` für die Gestaltungsregeln). `assets/daten/kurzfassungen.js`, `docs/pruef-auftrag.md`, die Kopie des Prüf-Auftrags im Skill und `werkzeugkiste/download/` nie von Hand ändern – `tools/werkzeugkiste.py` erzeugt sie (läuft in `tools/bauen.py` mit; `tools/pruefen.py` meldet Veraltetes). Neue Skill-Fassung = Eintrag unter »Versionen« im Skill; neue Plugin-Fassung = Version in `werkzeugkiste/kidu/.claude-plugin/plugin.json`.
- Der Fahrplan »Digitaler Unterricht« (ab 4.42): Phasen und Werkzeuge nur in `src/fahrplan.json`. Daraus baut `tools/fahrplan.py` die Werkzeuglisten der Bereichsseite und auf jeder Werkzeugseite die Zeile oben und den Fahrplan unten (Zeichen `<!-- fahrplan:zeile -->` und `<!-- fahrplan:fuss -->`; läuft in `tools/bauen.py` mit; `tools/pruefen.py` prüft). Neues Werkzeug = Eintrag dort.
- Der Film auf der Startseite (ab 4.40): Inhalt nur in `src/film/` (`buehne.html`, `kapitel.json`). `assets/film-buehne.js` nie von Hand ändern – `tools/film.py` erzeugt sie (läuft in `tools/bauen.py` mit; `tools/pruefen.py` meldet Veraltetes und zählt die Zahlen im Film in den Daten nach).
- Das Bau-Plugin »kidu-bau« (lernseite-bauen, signatur-design, website-design-workflow, schaubild-design, bewegung-als-lernmittel) bleibt privat und kommt nicht in dieses Repository (Entscheidung Mario, 10.11.2026). Öffentlich ist nur die Kurzfassung von `lernseite-bauen`.
- Gestaltung nur über die Variablen in assets/hilde.css (siehe gestaltung.html).
- Vor jedem Commit: `python3 tools/bauen.py && python3 tools/pruefen.py && node --test && python3 tests/e2e.py`.

## Arbeitsweise
- Jede Änderung auf einem eigenen Branch, als Pull Request zur Freigabe.
- Nie direkt in den Hauptzweig committen: Er wird über GitHub Pages veröffentlicht.
- Vor dem Zusammenführen den Prüfbefehl auf dem Branch ausführen; nur zusammenführen, wenn alles besteht und es keine Konflikte gibt. Danach den Branch löschen und das Ergebnis melden.
