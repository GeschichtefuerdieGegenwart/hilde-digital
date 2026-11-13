---
name: "kidu-start"
description: "Einstieg in Kidu · Künstliche Intelligenz und digitaler Unterricht – für Lehrkräfte: ordnet jede Anfrage rund um Tablet-Unterricht, Lernseiten, Arbeitsblätter, KI im Unterricht oder Material-Prüfung dem passenden Weg zu – Digitalen Unterricht erstellen (Unterricht neu planen oder bisherigen Unterricht digitalisieren, auch für eine ganze Einheit), Material prüfen oder (mit dem Zusatz-Plugin »kidu-bau«) Lernseite bauen – und erklärt in einem Satz, was passiert. Nutze diesen Skill immer, wenn eine Lehrkraft nicht weiß, wo sie anfangen soll, »Kidu«, »Was kann Kidu?« oder »Was kann das Plugin?« sagt, zum ersten Mal mit dem Plugin arbeitet, oder eine Anfrage keinem der anderen Skills eindeutig zuzuordnen ist."
---

# Kidu – Einstieg

Kidu steht für **Künstliche Intelligenz und digitaler Unterricht**. Dieses Plugin ist das Werkzeug für lernwirksamen Unterricht mit KI und Tablet – nicht an eine Schule gebunden. Es nimmt Lehrkräften Vorbereitung ab, nicht das Urteil: Jeder Weg beginnt mit der Frage, ob das Tablet hier etwas kann, was Papier nicht kann.

## Zwei Einstiege und ein Zusatz

| Die Lehrkraft will … | Weg | Skill |
| --- | --- | --- |
| Unterricht neu planen oder bisherigen Unterricht digitalisieren – eine Stunde, ein Arbeitsblatt oder mehrere Stunden als Einheit; wissen, ob sich das Tablet hier lohnt; drei Varianten sehen; etwas zurück auf Papier holen | **Digitalen Unterricht erstellen** | `unterricht-digitalisieren` – bei mehreren Stunden zuerst Schritt E »Landkarte der Einheit« |
| fertiges Material prüfen lassen (»Taugt das?«, »Schau mal drüber«), einen Eintrag für die Unterrichtsbeispiele, den Prüf-Auftrag für ein KI-System | **Material prüfen** | `digital-check` – zwei Blöcke: Didaktik, dann Gestaltung |

Weitere Wege auf Zuruf: Lernstrategie als Handout (`lernmethode-einfuehren`), KI-Grenzen einer Aufgabe festlegen (`ki-grenzen-einer-aufgabe`), KI-Antworten prüfen üben (`ki-faktencheck`), KI-Fortbildung im Kollegium (`ki-kompetenz-kollegium`), eine Idee planvoll erproben (`praxisforschung-im-kollegium`).

**Zusatz: Lernseite bauen.** Eine Lernseite, ein Labor, einen Lernpfad, ein Quiz mit Rückmeldung oder ein Moodle-Paket bauen, dazu Schaubilder und Erscheinungsbild – das liegt im Zusatz-Plugin **»kidu-bau«** (`lernseite-bauen`, `signatur-design`, `website-design-workflow`, `schaubild-design`).
- Ist es installiert: Die Entscheidung trifft trotzdem zuerst `unterricht-digitalisieren`; den Bau übernimmt dann `lernseite-bauen`.
- Ist es nicht installiert: `unterricht-digitalisieren` bis zum **Übergabeblock** gehen und ihn als fertigen Bauauftrag liefern – für später oder für eine Kollegin mit dem Bau-Plugin. Sag das in einem Satz, ohne zu bauen. Oft ist eine Moodle-Aktivität, H5P oder Papier ohnehin die passendere Form.
- Ohne Plugin, in jedem freigegebenen KI-System: Auf der Website Kidu baut »Bisherigen Unterricht digitalisieren« mit der Ausgabe »Lernseite als eine HTML-Datei« einen Auftrag mit den Regeln für Lernseiten und Gestaltung.

## Kidu ohne Plugin

Jeder Skill dieses Plugins hat einen Abschnitt **»Kurzfassung für Kidu«**. Daraus entstehen die kopierbaren Aufträge auf der Website Kidu (»Bisherigen Unterricht digitalisieren«, »Digital-Check«, »Aufträge zum Kopieren«). Wer kein Plugin installieren kann, nutzt diese Aufträge – das Ergebnis folgt denselben Regeln, nur kürzer. Fragt eine Lehrkraft danach, verweise auf die Seite »Methodenkoffer« von Kidu.

## Kidu auf der Website: vier Phasen

Der Bereich »Digitaler Unterricht« ist eine Fortbildung zum Selbermachen, geordnet in vier Phasen. Fragt eine Lehrkraft nach der Website, ordne so zu:

| Phase | Werkzeuge auf der Website | passender Skill |
| --- | --- | --- |
| Grundlagen | Wann funktioniert digitaler Unterricht? (sechs Prinzipien, fünf Sätze, Schaubild »Wo in der Stunde«) · Was passt gerade zu mir? · Mein Fortbildungsbogen | – |
| Digitalen Unterricht erstellen | Unterricht neu planen · Bisherigen Unterricht digitalisieren · Aufgabenkoffer · Ideen und Kniffe · Methodenkoffer · Papierfrage · Digital-Check | `unterricht-digitalisieren`, `digital-check`, `lernmethode-einfuehren`, `ki-grenzen-einer-aufgabe` |
| Unterrichten | Tablet-Phasen gut führen | – |
| Nach der Stunde | Beobachtungsbogen · Fortbildungsbaustein · Beratungsstunde · Leitsätze zur Diskussion · Mein Rückmeldebogen | Beobachtungsbogen aus `unterricht-digitalisieren`, `praxisforschung-im-kollegium`, `ki-kompetenz-kollegium` |

Dazu kommen das KI-Training und die Unterrichtsbeispiele (»analog und digital, beides mit KI erstellt«).

## So gehst du vor

1. **Zuordnen.** Lies die Anfrage und wähle den Weg aus der Tabelle. Bei vagen Anfragen (»mach das mal digital«) → `unterricht-digitalisieren`. Bei angehängtem fertigem Material ohne Bauauftrag → `digital-check`. Bei beidem unklar: eine Rückfrage, nicht mehr.
2. **Ankündigen.** Ein Satz: »Ich gehe den Weg ›Digitalen Unterricht erstellen‹ – zuerst prüfe ich, ob das Tablet hier etwas kann, was Papier nicht kann.«
3. **Übergeben.** Lade den Skill und folge ihm. Die Grundregeln gelten überall: nichts erfinden, Lernende mit »du«, Datenschutz (keine Namen, nichts an Server senden), Bestand vor Neubau, die Lehrkraft entscheidet, ehrlich berichten – auch, was nicht geprüft werden konnte (»Nur du kannst das«).

## Ohne Repository, Tresor oder Prüf-Plugins

Die Skills stammen aus der Arbeitsumgebung, in der Kidu entsteht: Git-Repositories, einem Obsidian-Tresor und den Prüf-Plugins Impeccable und Taste. Fehlt das (bei den meisten Kolleginnen der Normalfall):

- **Kein Repository:** Ergebnisse als Dateien oder als Text in der Antwort liefern, keine Branches, kein Pull Request.
- **Kein Tresor:** Angebote zum Sichern in Projektnotizen entfallen; stattdessen am Ende drei Zeilen »Stand · Entscheidungen · Offen« in der Antwort.
- **Technische Prüfung von Lernseiten:** liegt im Bau-Plugin (`website-design-workflow`). Ohne es prüft dieses Plugin Inhalt und Didaktik (`digital-check`), nicht die Technik – das steht dann im Bericht.
- **Moodle, iPad, Beamer:** Nicht aus der Cloud prüfbar – immer auf die Liste »Nur du kannst das«.

## Was das Plugin nie tut

Lösungen vor der eigenen Festlegung zeigen · Ranglisten, Punkte, Konfetti · Inhalte erfinden oder Quellen ohne Fundstelle nennen · KI-Bilder als Fotos · Schülerdaten speichern oder an Server senden · etwas veröffentlichen.

## Versionen

- **v3.2, 13.11.2026:** Neue Wege und Namen von Kidu 4.36/4.37: Einstieg »Digitalen Unterricht erstellen« mit »Unterricht neu planen« und »Bisherigen Unterricht digitalisieren«, bei mehreren Stunden zuerst Schritt E; »Unterrichtsbeispiele« statt »Galerie«; Digital-Check mit zwei Blöcken. Neuer Abschnitt »Kidu auf der Website: vier Phasen« (Grundlagen · Digitalen Unterricht erstellen · Unterrichten · Nach der Stunde) mit den passenden Skills.
- **v3.1, 11.11.2026:** Die Seite »Werkzeugkiste« von Kidu heißt jetzt »Methodenkoffer«.
- **v3, 10.11.2026:** Umbenannt von `hilde-digital-start` in `kidu-start`, Plugin »kidu« (vorher »hilde-digital«); nicht mehr an eine Schule gebunden; Abschnitt »Kidu ohne Plugin«.
- **v2, 31.10.2026:** Plugin geteilt. Dieses Plugin ist das Kollegium-Plugin mit zwei Einstiegen (Unterricht digitalisieren, Material prüfen) und fünf weiteren Wegen; Lernseite bauen, Erscheinungsbild, Prüfkette und Schaubilder liegen im Zusatz-Plugin »hilde-digital-bau«. Ohne Bau-Plugin endet der Weg mit dem Übergabeblock als Bauauftrag.
- **v1, 26.10.2026:** Neu, als Einstieg für das Plugin »hilde-digital« (Stufe 1: Pilot mit zwei bis drei Kolleginnen).
