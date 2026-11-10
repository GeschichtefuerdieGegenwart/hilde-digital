---
name: "ki-grenzen-einer-aufgabe"
description: "Nutze diesen Skill, wenn eine Lehrkraft für eine Aufgabe begründet festlegen will, welche Teile Lernende mit KI bearbeiten dürfen und welche sie selbst tun müssen – statt pauschal »KI erlaubt« oder »KI verboten«."
---

# KI-Grenzen einer Aufgabe festlegen

Viele Schulen haben nur zwei Regeln: »KI erlaubt« oder »KI verboten«. Beides passt selten. Eine Aufgabe besteht aus mehreren Teilen. Bei manchen hilft KI, bei manchen ist sie egal, bei manchen nimmt sie den Lernenden genau das ab, was sie lernen sollen. Dieser Skill zerlegt eine Aufgabe in ihre Teile und legt für jeden Teil eine begründete Regel fest. Am Ende steht ein Regeltext für die Lernenden in einfacher Sprache.

## Regeln für diesen Skill

1. **Erst das Lernziel, dann die Regel.** Die Grenze ergibt sich aus dem, was gelernt werden soll – nicht aus der Technik.
2. **Nichts erfinden.** Keine Studien, Zahlen oder Funktionen von KI-Systemen ohne Beleg. Unbekanntes heißt »noch offen«.
3. **Nur das an der Schule freigegebene KI-System.** Keine Anbieternamen. Keine Daten von Lernenden in die KI.
4. **Papier ist vollwertig.** Ein handschriftlicher Entwurf im Unterricht oder eine mündliche Erklärung sind oft die beste Lösung.
5. **Die Lehrkraft entscheidet.** Der Skill macht einen Vorschlag. Die Bewertung von Leistungen bleibt bei der Lehrkraft.
6. **Keine Regel, die von KI-Erkennung abhängt.** Werkzeuge zur Erkennung von KI-Texten sind unzuverlässig. Regeln müssen so gebaut sein, dass KI-Nutzung harmlos oder im Unterricht sichtbar ist.
7. **Einfache Sprache, Anrede »du«** im Regeltext für Lernende.
8. **Leistung mit KI ist kein Lernnachweis.** Mit KI wird das Ergebnis oft besser, das Können danach nicht. Wer ungeführt mit KI übt, kann ohne KI sogar schlechter abschneiden. Plane deshalb immer mit, wann die Lernenden zeigen, was sie **ohne** KI können.

## Ablauf

1. **Aufgabe und Lernziele klären.** Was tun die Lernenden? Was sollen sie dabei lernen? Ist die Aufgabe eine Übung, eine Vorbereitung oder eine bewertete Leistung? Welcher Bildungsgang? Fehlt etwas, frag nach – höchstens drei Fragen.
2. **Lernziele einzeln prüfen.** Für jedes Lernziel: Unterstützt KI-Hilfe das Lernen, ist sie egal, oder übernimmt sie das eigentliche Denken?
   Faustregel: Ist der **Weg** das Lernziel (argumentieren, analysieren, einen Fall deuten, einen Plan entwickeln), schadet KI-Hilfe am meisten. Ist nur das **Ergebnis** wichtig (Rechtschreibung, Formatierung, Literaturangaben ordnen), ist sie meist harmlos.
3. **Aufgabe in 4 bis 8 Teile zerlegen.** Für jeden Teil:
   - Was tun die Lernenden?
   - Zu welchem Lernziel gehört der Teil?
   - Einstufung: **KI hilft** · **KI ist egal** · **KI ersetzt das Lernen**
   - Begründung: Welche Denkarbeit würde die KI abnehmen oder erleichtern?
   - Regel: Was ist bei diesem Teil erlaubt, was nicht?
4. **Werkzeug für die Informationssuche festlegen.** Ein KI-System fasst zusammen, nennt aber oft keine prüfbare Herkunft und kann Quellen erfinden. Schulbuch, Bibliothek, Archive und Suchmaschinen führen zu Quellen, die man prüfen kann. Lege je Rechercheschritt fest, welches Werkzeug passt, und warum. Bei Quellenarbeit in Geschichte gilt: Quellen nur aus dem Material oder aus seriösen Archiven, nie aus einer KI-Antwort.
5. **Regeltext für die Lernenden schreiben.** Kurz, in »du«, je Teil ein Satz mit Begründung. Beispielform: »Bei der Gliederung darfst du die KI um Rückfragen bitten. Dein Urteil schreibst du selbst, denn genau das übst du hier.«
6. **Aufgabe nachschärfen** (3 bis 5 Vorschläge, kleine Änderungen statt Neubau), zum Beispiel:
   - den Kern der Denkarbeit in den Unterricht holen: Entwurf von Hand in der Stunde, Gliederung mündlich vorstellen;
   - einen Arbeitsprozess sichtbar machen: Notizen, Zwischenstand, kurze Begründung je Schritt;
   - Bezug zu Material, das nur in der Klasse vorliegt: eigene Beobachtung, Fall aus der Praxisstelle (ohne echte Personen), Quellen aus dem Unterricht;
   - KI dort ausdrücklich erlauben, wo sie Lernen unterstützt: Rückfragen stellen, Verständnisfragen, Rückmeldung zum ersten Fehler.
   - **Reihenfolge festlegen: erst selbst, dann KI.** Eigener Versuch zuerst (auf Papier oder im Kopf), danach Vergleich oder Rückmeldung durch die KI.
   - **Lern-Auftrag statt Lösungs-Auftrag:** Wo KI hilft, einen Auftrag vorgeben, der keine Lösung ausgibt (»Stell mir Fragen, gib mir Hinweise, aber nicht die Lösung«). Ein so geführter Tutor hat in einer großen Studie nicht geschadet – einen Lerngewinn zeigte er dort aber auch nicht.
   - **Abruf ohne KI einbauen:** kurze Abfrage, mündliche Erklärung oder Teil der Klassenarbeit ohne Gerät.
7. **Gerechtigkeit bedenken.** Für manche Lernende ist KI die einzige Hilfe außerhalb der Schule. Prüfe, ob Teile mit »KI ist egal« großzügiger sein können, besonders bei Sprachhilfen.

## Ausgabe

```
KI-Grenzen: [Aufgabe]
Lernziele: …
Art der Aufgabe: Übung / Vorbereitung / bewertete Leistung

| Lernziel | KI-Hilfe … | Begründung |

Teil 1: … – Einstufung … – Regel …
…

Werkzeug je Rechercheschritt: | Schritt | Werkzeug | Warum |

Regeltext für die Lernenden (du):
> …

Vorschläge zum Nachschärfen: 1. … 2. … 3. …
Grenzen dieser Einschätzung: …
```

**Selbstprüfung vor der Ausgabe:** Ist jede Einstufung aus einem Lernziel begründet? Ist die Regel teilbezogen statt pauschal? Ist der Regeltext für Lernende verständlich? Hängt keine Regel von KI-Erkennung ab? Sind die Vorschläge kleine, machbare Änderungen?

## Grenzen

- Eine gute Regel verhindert KI-Nutzung nicht. Sie macht den Grund sichtbar und verändert, was sich lohnt.
- Die Übertragung von Rückwärtsplanung auf KI-Regeln ist gut begründet, aber noch kaum empirisch untersucht. Welche Grenzen das Lernen am besten schützen, ist noch offen.
- Für bewertete Leistungen gelten zusätzlich die Vorgaben der Schule und des Landes. Diese prüft die Lehrkraft. In Baden-Württemberg dürfen KI-Anwendungen keine Noten vergeben; KI-Ergebnisse prüft die Lehrkraft selbst, bevor sie in eine Note eingehen (Hinweise des Kultusministeriums). Landesregeln speziell zu KI bei GFS, Hausarbeit oder Portfolio wurden bis 31.10.2026 nicht gefunden: noch offen, mit der Schulleitung klären.
- Ob ein KI-System für Lernende freigegeben ist und ab welchem Alter, regelt die Schule. Ist es unbekannt: noch offen.

## Grundlagen

- Wiggins & McTighe (2005): *Understanding by Design* – Rückwärtsplanung vom Lernziel her.
- Bjork, Dunlosky & Kornell (2013): Studien zu Lernillusionen – was sich flüssig anfühlt, ist nicht unbedingt gelernt.
- Wineburg & McGrew (2019): Quellenprüfung durch Querlesen.
- Bastani et al. (2025), *PNAS* 122(26), doi:10.1073/pnas.2422633122: Feldexperiment an Schulen (Mathematik). Mit freier KI-Hilfe stiegen die Übungsergebnisse; in der Prüfung ohne KI lagen diese Lernenden 17 % schlechter. Ein Tutor mit Leitplanken schadete nicht, verbesserte die Prüfung aber auch nicht.
- Fan et al. (2025), *BJET*, doi:10.1111/bjet.13544: Mit KI wurden Aufsätze besser, Wissen und Transfer danach nicht.
- Boolzen et al. (2026), *Artificial Intelligence Review*, doi:10.1007/s10462-026-11665-9: Nach Korrektur für Publikationsbias ist ein Durchschnittseffekt generativer KI auf Lernen kaum nachweisbar. Die oft zitierte Metaanalyse von Wang & Fan (2025) ist zurückgezogen und taugt nicht als Beleg.
- Kultusministerkonferenz (10.10.2024): Handlungsempfehlung zum Umgang mit KI in schulischen Bildungsprozessen – die Leistungsbewertung bleibt den Prüfenden vorbehalten; ein generelles KI-Verbot bei häuslichen Arbeiten ist nicht durchzuhalten, Absprachen, Kennzeichnung und Bewertung des Prozesses gewinnen an Gewicht.

## Kurzfassung für Kidu

Aus diesem Abschnitt baut `tools/werkzeugkiste.py` im Repository `kidu` den kopierbaren Auftrag auf der Website (Werkzeug: Aufträge zum Kopieren · »KI-Regeln für eine Aufgabe festlegen«). Er gilt für jedes freigegebene KI-System, auch ohne Plugin. Er ist anbieterneutral, in einfacher Sprache und an die KI gerichtet. Änderst du den Skill, prüf, ob die Kurzfassung noch stimmt – sie ist die einzige Quelle für die Website.

- **Name:** KI-Regeln für eine Aufgabe festlegen
- **Kurz:** Statt »KI erlaubt« oder »KI verboten«: Für jeden Teil einer Aufgabe steht, ob KI hilft, egal ist oder das Lernen ersetzt – mit einem Regeltext für die Lernenden.
- **Ziel:** Leg für die Aufgabe unten fest, welche Teile die Lernenden mit KI bearbeiten dürfen und welche sie selbst tun – statt pauschal »KI erlaubt« oder »KI verboten«.
- **Format:** Eine Tabelle der Teile mit Einstufung, Begründung und Regel. Dann ein Regeltext für die Lernenden mit Anrede »du«, je Teil ein Satz mit Grund. Dann drei bis fünf kleine Vorschläge, die Aufgabe nachzuschärfen. Zum Schluss die Grenzen deiner Einschätzung.

**Anforderungen**

- Kläre zuerst die Lernziele und ob die Aufgabe eine Übung, eine Vorbereitung oder eine bewertete Leistung ist. Höchstens drei Fragen.
- Zerlege die Aufgabe in 4 bis 8 Teile. Stufe jeden Teil ein: KI hilft · KI ist egal · KI ersetzt das Lernen. Begründe mit dem Lernziel.
- Faustregel: Ist der Weg das Lernziel (argumentieren, einen Fall deuten, einen Plan entwickeln), schadet KI-Hilfe am meisten. Ist nur das Ergebnis wichtig, ist sie meist harmlos.
- Keine Regel darf davon abhängen, KI-Texte zu erkennen. Solche Werkzeuge sind unzuverlässig.
- Leg für jeden Rechercheschritt fest, welches Werkzeug passt: KI-System, Schulbuch, Bibliothek oder Suchmaschine. Ein KI-System nennt oft keine prüfbare Herkunft. Quellen für Geschichte kommen nur aus dem Material oder aus seriösen Archiven, nie aus einer KI-Antwort.
- Denk an Gerechtigkeit: Für manche Lernende ist KI die einzige Hilfe außerhalb der Schule. Prüfe, wo du großzügiger sein kannst, besonders bei Sprachhilfen.
- Wo KI helfen darf: Leg die Reihenfolge fest – erst selbst, dann KI. Schlag einen Auftrag an die KI vor, der Hinweise gibt statt Lösungen.
- Plane eine Stelle, an der die Lernenden zeigen, was sie ohne KI können – zum Beispiel eine kurze Abfrage oder eine mündliche Erklärung. Mit KI wird das Ergebnis oft besser, das Können danach nicht.

**Prüfen**

- Ist jede Einstufung aus einem Lernziel begründet?
- Versteht eine Schülerin den Regeltext ohne Rückfrage?
- Gibt es eine Stelle ohne KI?
- Für bewertete Leistungen gelten zusätzlich die Vorgaben von Schule und Land; eine KI vergibt keine Noten. Erinnere mich daran.

## Versionen

- **v2, 10.11.2026:** Name Kidu (vorher »Hilde Digital«); Abschnitt »Kurzfassung für Kidu« als einzige Quelle für den kopierbaren Auftrag auf der Website.
- **v1.1, 31.10.2026:** Überarbeitet mit dem Plugin 0.3.0 (siehe README des Plugins).
- **v1, 25.10.2026:** Erste Fassung (siehe »Herkunft und Lizenz«).

## Herkunft und Lizenz

Übertragen und verändert nach »AI Learning Boundary Mapper« aus der *Education Agent Skills Library* von Gareth Manning (https://github.com/GarethManning/education-agent-skills), Lizenz CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/).
Änderungen (25.10.2026): ins Deutsche übertragen, gekürzt, an berufliche Schulen und die Regeln von Hilde Digital angepasst, Satz zur KI-Erkennung gestrichen, ein falsch wiedergegebener Studienbeleg entfernt, KMK-Bezug ergänzt. Ergänzt (31.10.2026): Regel 8, Reihenfolge »erst selbst, dann KI«, Lern-Auftrag und Abruf ohne KI, Rechtslage Baden-Württemberg, Belege Bastani, Fan, Boolzen. Diese Fassung steht ebenfalls unter CC BY-SA 4.0.