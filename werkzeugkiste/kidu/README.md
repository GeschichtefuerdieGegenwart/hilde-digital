# Kidu – Plugin für das Kollegium

**Kidu · Künstliche Intelligenz und digitaler Unterricht.** Das Plugin für lernwirksamen Unterricht mit und ohne Tablet – nicht an eine Schule gebunden. Das Plugin nimmt Lehrkräften Vorbereitung ab, nicht das Urteil: Jeder Weg beginnt mit der Frage, ob das Tablet hier etwas kann, was Papier nicht kann – und »bleibt Papier« ist ein vollwertiges Ergebnis.

Seit Version 0.2.0 ist das Plugin geteilt: **»kidu«** (dieses Plugin) ist für alle Kolleg*innen. Wer Lernseiten selbst bauen will, installiert zusätzlich **»kidu-bau«**.

## Zwei Einstiege

| Du willst … | Sag einfach … | Skill |
| --- | --- | --- |
| eine Stunde oder ein Arbeitsblatt weiterentwickeln, wissen, ob sich das Tablet lohnt, drei Varianten sehen | »Mach aus dieser Stunde etwas fürs Tablet« · »Lohnt sich hier das Tablet?« | `unterricht-digitalisieren` |
| fertiges Material prüfen lassen | »Schau mal drüber« · »Taugt das?« | `digital-check` |

Wer nicht weiß, wo anfangen: »Kidu, was kannst du?« → `kidu-start`.

## Weitere Wege

| Skill | Wofür |
| --- | --- |
| `lernmethode-einfuehren` | Lernstrategie als einseitiges Handout |
| `ki-grenzen-einer-aufgabe` | festlegen, was Lernende bei einer Aufgabe mit KI dürfen |
| `ki-faktencheck` | üben, KI-Antworten zu prüfen |
| `ki-kompetenz-kollegium` | KI-Fortbildung im Kollegium planen |
| `praxisforschung-im-kollegium` | eine Idee planvoll erproben und auswerten |

## Lernseiten bauen: Zusatz-Plugin »kidu-bau«

Lernseite, Labor, Lernpfad, Quiz mit Rückmeldung, Erscheinungsbild, Prüfkette und Schaubilder liegen im Zusatz-Plugin. Ohne es geht `unterricht-digitalisieren` bis zum **Übergabeblock** und liefert ihn als fertigen Bauauftrag – für später oder für eine Kollegin mit dem Bau-Plugin.

## Ohne Plugin: eine Quelle für alles

Jeder Skill hat einen Abschnitt **»Kurzfassung für Kidu«**. Aus ihm baut `tools/werkzeugkiste.py` im Repository `kidu` die kopierbaren Aufträge der Website – für jedes an der Schule freigegebene KI-System:

| Skill | Werkzeug auf der Website |
| --- | --- |
| `unterricht-digitalisieren` | Unterricht digitalisieren (Abschnitt »Vorgehen«) |
| `digital-check` | Digital-Check, Weg »Mit KI prüfen« (Abschnitt »Typische Schwächen«) |
| `lernmethode-einfuehren` · `ki-grenzen-einer-aufgabe` · `ki-faktencheck` · `praxisforschung-im-kollegium` · `ki-kompetenz-kollegium` | Aufträge zum Kopieren |

Gepflegt wird nur im Skill. Die Website zeigt bei jedem Auftrag, aus welcher Fassung er stammt. Plugin und einzelne Skills liegen zum Herunterladen auf der Seite »Werkzeugkiste«.

## Stufenplan

- **Stufe 1 – Pilot (jetzt):** zwei bis drei Kolleginnen, je eine echte Stunde über einen der zwei Einstiege. Erkundungsfrage nach `praxisforschung-im-kollegium`: »Hilft das Plugin bei der Entscheidung, ohne den Mehrwert-Check zu überspringen?« Belege: die Vorhaben und Materialien, der Beobachtungsbogen nach der Stunde, drei Sätze Rückmeldung je Kollegin.
- **Stufe 2 – Fachschaften:** nach Auswertung des Pilots; Fachbausteine je Fach ergänzen (bisher: GGK); Galerie-Einträge aus den Pilotstunden.
- **Stufe 3 – Schulweit:** als Baustein des Medienbildungskonzepts; Fortbildung über `ki-kompetenz-kollegium`.

## Voraussetzungen und Grenzen

- Die Skills brauchen kein Repository und keinen Obsidian-Tresor; fehlt das, liefern sie Dateien oder Text (siehe `kidu-start`).
- Nicht aus der Cloud prüfbar: echtes iPad/Safari, VoiceOver, Moodle, Beamer im Raum. Das steht in jedem Bericht unter »Nur du kannst das«.
- Datenschutz: Lernseiten speichern nur lokal auf dem Gerät, ohne Namen; nichts wird an Server gesendet. GitHub Pages oder andere Veröffentlichung nur nach Entscheidung von Schulleitung und Datenschutzbeauftragtem.
- Ob Kolleginnen Plugins installieren können, hängt vom KI-Zugang der Schule ab – vor dem Pilot klären. Sonst: die Aufträge auf der Website.

## Pflege

Eine Quelle: Die Skills werden im Plugin gepflegt und versioniert (Abschnitt »Versionen« je Skill). Änderungen zuerst im Pilot, dann neue Plugin-Version (`plugin.json`, Version hochzählen). Beide Plugins gemeinsam pflegen: Ändert sich ein Skill-Name, die Verweise im anderen Plugin nachziehen.

## Versionen

- **0.4.0, 10.11.2026:** Umbenannt in **»kidu«** (vorher »hilde-digital«), Einstieg `kidu-start` (vorher `hilde-digital-start`), Zusatz-Plugin »kidu-bau«; nicht mehr an eine Schule gebunden. Neu: Abschnitt »Kurzfassung für Kidu« in sieben Skills als einzige Quelle der Website-Aufträge; neuer Auftrag aus `ki-kompetenz-kollegium`. Gepflegt im Repository `kidu` unter `werkzeugkiste/kidu/`. Die Papierprobe in `unterricht-digitalisieren` heißt weiter so.
- **0.3.0, 31.10.2026:** Befunde aus dem Forschungsbericht »KI und digitale Medien im Unterricht« eingearbeitet: `ki-kompetenz-kollegium` v2 (KMK-KI-Kompetenzrahmen 16.10.2026, Art. 4 nach VO (EU) 2026/1744, »Was Fortbildung wirksam macht«, Beratungsstunde über acht Wochen, kein Zeitversprechen); `ki-grenzen-einer-aufgabe` (Regel 8 »Leistung mit KI ist kein Lernnachweis«, erst selbst dann KI, Abruf ohne KI, Rechtslage BW); `unterricht-digitalisieren` v4.2 (Lese-Kriterium, Belege zu KI); `digital-check` v1.1 (vier neue typische Schwächen); `ki-faktencheck` (Wiederholen, Wineburg 2022); `praxisforschung-im-kollegium` (Fokus und Rückmeldung bei Besuchen, Bausteine nach Sims). Die zurückgezogene Metaanalyse Wang & Fan 2025 wird nirgends als Beleg genutzt.
- **0.2.0, 31.10.2026:** Geteilt. Bau-Skills (`lernseite-bauen`, `signatur-design`, `website-design-workflow`, `schaubild-design`) ins Zusatz-Plugin »hilde-digital-bau«; Verweise in `hilde-digital-start`, `unterricht-digitalisieren`, `digital-check`, `lernmethode-einfuehren` angepasst. Fehlende Datei `unterricht-digitalisieren/references/fachbaustein-ggk.md` ergänzt (auf sie verweisen auch Skills im Bau-Plugin).
- **0.1.0, 26.10.2026:** Erste Fassung mit zwölf Skills.
