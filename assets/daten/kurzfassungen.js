/* Kidu – Kurzfassungen der Skills (ab Version 4.25). NICHT VON HAND ÄNDERN.
   Erzeugt von tools/werkzeugkiste.py aus den SKILL.md in werkzeugkiste/kidu/skills, den Dateien in werkzeugkiste/kurzfassungen
   und DESIGN.md (je Abschnitt »Kurzfassung für Kidu«). Gepflegt wird nur dort.
   Genutzt von: assets/digitalisieren-prompt.js, assets/pruef-prompt.js, assets/daten/werkstatt.js, assets/werkzeugkiste.js. */
var KURZFASSUNGEN = {
  "plugin": {
    "name": "kidu",
    "version": "0.6.0"
  },
  "skills": {
    "digital-check": {
      "anforderungen": [
        "Erfundenes: Zitate ohne Nachweis, Wirkungszahlen ohne Herkunft, KI-Bilder ohne Kennzeichnung, Reste aus KI-Antworten im Text.",
        "Rechen- und Sachfehler: Angaben nachrechnen, Begriffe auf ihre Zeit prüfen.",
        "Verratene Lösungen: ein Hinweis in Klammern, die richtige Antwort immer an derselben Stelle, die Lösung sichtbar im Text, die Rückmeldung zu einer Antwort schon vor der eigenen Wahl lesbar, oder eine Übersicht zeigt vorab, was die Aufgabe danach abfragt.",
        "Zu viel auf einmal: mehr als fünf bis sechs neue Begriffe, kaum unterscheidbare Antworten, mehrere Auflösungen direkt hintereinander.",
        "Lesen ohne Tun: Texte ohne Eingabe und Rückmeldung, ein Quiz nur mit richtig oder falsch, Notizen gehen beim Weiterklicken verloren.",
        "Ohne Plenum: Die Tablet-Phase endet ohne ein Ergebnis, das im Gespräch aufgegriffen wird.",
        "Sichern ohne Üben: Wird nur festgehalten, oder rufen die Lernenden ohne Vorlage ab – auch Tage später?",
        "Kein Übertragen: Gibt es einen neuen Fall, an dem das Gelernte gilt oder nicht gilt?",
        "Mehrere Stunden: Hat jede Stunde ihren eigenen, begründeten Umfang? Gibt es eine Leitfrage und eine Landkarte über alle Stunden?",
        "Ohne Weg und Ende: Ist klar, wohin es geht und wann eine Station fertig ist? Zählt der Fortschritt Können statt Klicks?",
        "Lange Sachtexte am Gerät, besonders unter Zeitdruck: eine Papierfassung vorschlagen.",
        "Leseaufgabe ohne Weg: Fehlt eine Frage, mit der man liest, eine Regel fürs Markieren oder ein Schritt danach?",
        "Legeaufgabe ohne Beziehungen: Werden Karten nur sortiert, ohne benannte Beziehung und Begründung? Ist die fertige Lösung vorher zu sehen? Gibt es bei vielen Karten einen Zwischenstand?",
        "Mit KI erstelltes Material bleibt oft beim Wiedergeben: Wo müssen die Lernenden selbst deuten, urteilen und Gegenpositionen prüfen?",
        "Arbeiten Lernende mit KI: Gibt es eine Stelle, an der sie zeigen, was sie ohne KI können? Stellt die KI Rückfragen, oder gibt sie Lösungen aus?",
        "Abhängig vom Netz: Schriften, Skripte, Videos oder Dienste von fremden Seiten; die Seite läuft nicht ohne Internet."
      ],
      "pruef": [],
      "gestaltung": [
        "Erst Ruhe, dann Bewegung: Bewegt sich etwas, ohne dass die Lernenden etwas getan haben? Bewegung zählt nur, wenn sie eine Veränderung, einen Ablauf oder einen Zusammenhang zeigt und die Lernenden sie selbst auslösen oder steuern. Bewegung beim bloßen Lesen oder als Belohnung ist ein Mangel.",
        "Ruhe in der Arbeitsphase: Bewegt sich dort etwas anderes als die Antwort auf eine eigene Handlung? Gibt es ein Arbeitsfenster je Phase?",
        "Zähle den Weg: Wie viele Tipps oder Klicks brauchen die Lernenden bis zur ersten eigenen Antwort, und wie oft wechselt die Seite innerhalb einer Arbeitsphase? Mehr als drei Tipps oder ein Seitenwechsel mitten in der Phase sind ein Hinweis auf Unruhe. Öffnet sich die Hilfe am selben Ort?",
        "Zwischenstand und Ergebnis: Gibt es bei Sortier- und Legeaufgaben einen Zwischenstand, kann man Fehler einzeln zurücknehmen, bleibt der Stand gespeichert? Überleben die Ergebnisse die Stunde außerhalb des Browsers, etwa als Datei?",
        "Bildschirmbreite: Nutzt eine Übersicht die Breite des Tablets quer und hoch, ohne dass eine Textzeile zu lang wird?",
        "Linien: Trägt jede Linie und jeder Rahmen eine Beziehung? Endet jede Verbindungslinie an ihrem Ziel, ohne fremde Felder zu kreuzen?",
        "Eine Ordnung je Bild: Zeigt ein Bild zwei Reihenfolgen zugleich, etwa eine Zeitachse und eine zweite Zählung?",
        "Filme: Steht vor einem interaktiven Film ein Satz, was man tun kann? Zeigt ein Erklärfilm die echte Oberfläche der Seite, die er erklärt?",
        "Kontrast über Bildern: Ist Text über einem Bild auch an der ungünstigsten Stelle gut lesbar, mindestens 4,5 zu 1?",
        "Lehrkraftbereich: Wenn es einen gibt – ist er von Anfang an verschlüsselt und in die Seite eingebettet, nicht nur hinter einem Codewort?"
      ],
      "wo": "Digital-Check · Weg »Mit KI prüfen«, Abschnitte »Typische Schwächen« und »Gestaltung«",
      "fassung": "v1.4",
      "datum": "13.11.2026",
      "lizenz": false,
      "herunterladen": true
    },
    "ki-faktencheck": {
      "anforderungen": [
        "Ich füge unten eine echte KI-Antwort zu meinem Unterrichtsthema ein, die ich selbst erzeugt habe – oder einen eigenen Übungstext mit eingebauten Fehlern, als solchen gekennzeichnet. Erfinde keine Beispielbefunde.",
        "Nenne die zwei bis drei Fehlerarten, die in meinem Fach am wichtigsten sind: erfundene Quelle, falsch zugeordnete Quelle, Quelle sagt das nicht, Zahl ohne Herkunft, falsches Zitat, scheinbare Einigkeit.",
        "Markiere in der Antwort, was geprüft werden muss. Sag nicht, ob es stimmt – das prüfe ich selbst am Original.",
        "Prüfschritte für die Lernenden: Stopp · Art der Aussage bestimmen · Original finden · Unbelegtes zurückverfolgen.",
        "Die Übung hat drei Runden: allein markieren, zu zweit zwei bis drei Aussagen prüfen, in der Klasse vergleichen.",
        "Plane zwei kurze Wiederholungen in späteren Stunden ein, je fünf Minuten mit einer Behauptung. Einmal üben reicht nicht.",
        "Schreib mir ein kurzes Skript, mit dem ich vor der Klasse laut eine Quelle prüfe: einmal mit Treffer, einmal ohne. Ich setze nur Ergebnisse ein, die ich selbst geprüft habe.",
        "Achte auf mein Fach: Zitate am Original oder in einer Quellenedition prüfen; bei Studien fragen, wer, wie viele und wann untersucht wurde; Paragrafen im aktuellen Gesetzestext nachsehen."
      ],
      "pruef": [
        "Behauptet das Material irgendwo, eine Quelle sei echt oder erfunden? Dann streich das – ich prüfe es selbst.",
        "Passt die Übung in 30 bis 45 Minuten?"
      ],
      "name": "Eine Übung: KI-Antworten prüfen",
      "kurz": "Deine Lernenden lernen, eine KI-Antwort zu prüfen, statt ihr zu glauben: erfundene Quellen, Zahlen ohne Herkunft, falsche Zitate.",
      "ziel": "Bereite eine Übung vor, in der meine Lernenden eine KI-Antwort prüfen, statt ihr zu glauben.",
      "format": "Ein Arbeitsblatt für die Lernenden mit Anrede »du« und diesen Zeichen zum Markieren: ★ Zahl ohne Beleg · ! falsche Sicherheit · ≡ Aufzählung ohne Begründung · ? fehlende Gegenposition · ~ vage Wörter · »« Zitat oder Zuschreibung, die geprüft werden muss. Dazu der Ablauf mit Minuten.",
      "wo": "Aufträge zum Kopieren · »Eine Übung: KI-Antworten prüfen«",
      "fassung": "v2",
      "datum": "10.11.2026",
      "lizenz": true,
      "herunterladen": true
    },
    "ki-grenzen-einer-aufgabe": {
      "anforderungen": [
        "Kläre zuerst die Lernziele und ob die Aufgabe eine Übung, eine Vorbereitung oder eine bewertete Leistung ist. Höchstens drei Fragen.",
        "Zerlege die Aufgabe in 4 bis 8 Teile. Stufe jeden Teil ein: KI hilft · KI ist egal · KI ersetzt das Lernen. Begründe mit dem Lernziel.",
        "Faustregel: Ist der Weg das Lernziel (argumentieren, einen Fall deuten, einen Plan entwickeln), schadet KI-Hilfe am meisten. Ist nur das Ergebnis wichtig, ist sie meist harmlos.",
        "Keine Regel darf davon abhängen, KI-Texte zu erkennen. Solche Werkzeuge sind unzuverlässig.",
        "Leg für jeden Rechercheschritt fest, welches Werkzeug passt: KI-System, Schulbuch, Bibliothek oder Suchmaschine. Ein KI-System nennt oft keine prüfbare Herkunft. Quellen für Geschichte kommen nur aus dem Material oder aus seriösen Archiven, nie aus einer KI-Antwort.",
        "Denk an Gerechtigkeit: Für manche Lernende ist KI die einzige Hilfe außerhalb der Schule. Prüfe, wo du großzügiger sein kannst, besonders bei Sprachhilfen.",
        "Wo KI helfen darf: Leg die Reihenfolge fest – erst selbst, dann KI. Schlag einen Auftrag an die KI vor, der Hinweise gibt statt Lösungen.",
        "Plane eine Stelle, an der die Lernenden zeigen, was sie ohne KI können – zum Beispiel eine kurze Abfrage oder eine mündliche Erklärung. Mit KI wird das Ergebnis oft besser, das Können danach nicht."
      ],
      "pruef": [
        "Ist jede Einstufung aus einem Lernziel begründet?",
        "Versteht eine Schülerin den Regeltext ohne Rückfrage?",
        "Gibt es eine Stelle ohne KI?",
        "Für bewertete Leistungen gelten zusätzlich die Vorgaben von Schule und Land; eine KI vergibt keine Noten. Erinnere mich daran."
      ],
      "name": "KI-Regeln für eine Aufgabe festlegen",
      "kurz": "Statt »KI erlaubt« oder »KI verboten«: Für jeden Teil einer Aufgabe steht, ob KI hilft, egal ist oder das Lernen ersetzt – mit einem Regeltext für die Lernenden.",
      "ziel": "Leg für die Aufgabe unten fest, welche Teile die Lernenden mit KI bearbeiten dürfen und welche sie selbst tun – statt pauschal »KI erlaubt« oder »KI verboten«.",
      "format": "Eine Tabelle der Teile mit Einstufung, Begründung und Regel. Dann ein Regeltext für die Lernenden mit Anrede »du«, je Teil ein Satz mit Grund. Dann drei bis fünf kleine Vorschläge, die Aufgabe nachzuschärfen. Zum Schluss die Grenzen deiner Einschätzung.",
      "wo": "Aufträge zum Kopieren · »KI-Regeln für eine Aufgabe festlegen«",
      "fassung": "v2",
      "datum": "10.11.2026",
      "lizenz": true,
      "herunterladen": true
    },
    "ki-kompetenz-kollegium": {
      "anforderungen": [
        "Kläre zuerst höchstens drei Dinge: Welches KI-System ist an der Schule freigegeben, und welche Regeln gelten? Wer nimmt teil? Wie viel Zeit gibt es?",
        "Geh von echten Anlässen aus: ein Arbeitsblatt vereinfachen, in drei Niveaus differenzieren, einen Erwartungshorizont schreiben, ein Exit-Ticket, ein Übungsquiz mit Rückmeldung, eine Elterninformation, eine Sitzung vorbereiten.",
        "Wähl für den Anfang höchstens zwei Bausteine: Aufgaben abgeben und behalten · gut beschreiben · kritisch prüfen · verantwortlich handeln (Was darf in die KI? Wie wird KI-Hilfe sichtbar?).",
        "Jeder Baustein hat vier Teile: Einsicht · Vormachen · Üben am eigenen Material · Verankern im Alltag mit festem Termin und Rückmeldung.",
        "Klein und über Wochen hilft mehr als ein großer Einzeltermin. Schlag als Vorzug eine Beratungsstunde über acht Wochen vor: zwei bis drei Lehrkräfte, eine feste Stunde pro Woche, jede bringt eine echte Stunde oder ein echtes Material mit.",
        "Bewerte keine Lehrkräfte und erfasse keine Namen. Eine Umfrage nur anonym, Ergebnisse nur gesammelt.",
        "Versprich keine Zeitersparnis. Sag stattdessen: Der Entwurf geht schneller, die Prüfung bleibt bei dir.",
        "Zufriedenheit ist kein Maß für Wirkung. Plane, dass jede Person einen Anlass im Unterricht erprobt und mit einem kurzen Beobachtungsbogen auswertet.",
        "Halte am Ende gemeinsame Regeln auf höchstens einer Seite fest. Was noch nicht geklärt ist, bleibt als »noch offen« stehen.",
        "Plane einen kurzen Bogen vor der Fortbildung (Ausgangslage, nur für die Person selbst und freiwillig für die Leitung) und einen Rückmeldebogen danach: Was ist gelungen? Wo hakt es? Was würde jetzt helfen? Ohne Namen, und jede Person entscheidet, ob ihre Rückmeldung weitergegeben werden darf."
      ],
      "pruef": [
        "Geht jeder Baustein von einem echten Anlass aus?",
        "Bleibt genug Zeit zum Üben am eigenen Material?",
        "Wird irgendwo eine Lehrkraft bewertet oder mit Namen genannt? Dann streich das."
      ],
      "name": "Eine KI-Fortbildung im Kollegium planen",
      "kurz": "Eine Fortbildung, die von echten Aufgaben im Schulalltag ausgeht – klein, über mehrere Wochen und ohne jemanden zu bewerten.",
      "ziel": "Plane mit mir eine KI-Fortbildung für mein Kollegium. Sie geht von echten Aufgaben im Schulalltag aus, nicht von einzelnen Werkzeugen.",
      "format": "Ein Ablaufplan mit Minuten je Baustein, die Übung am eigenen Material, eine Materialliste und ein Entwurf für die Regel-Seite. Dann: was nach der Fortbildung passiert – Erprobung und ein Termin für die Auswertung.",
      "wo": "Aufträge zum Kopieren · »Eine KI-Fortbildung im Kollegium planen«",
      "fassung": "v2.2",
      "datum": "13.11.2026",
      "lizenz": false,
      "herunterladen": true
    },
    "lernmethode-einfuehren": {
      "anforderungen": [
        "Frag zuerst nach, was die Stelle bewirken soll, wenn es nicht im Material steht. Höchstens drei Fragen.",
        "Schlag zwei bis drei Methoden vor, je mit einem Satz. Ich wähle.",
        "Die Methode lässt die Lernenden selbst abrufen, erklären, ordnen oder begründen. Hilfe ist noch kein Lernen.",
        "Geht es um Texte: Prüf zuerst, ob die Lernenden den Text flüssig lesen können. Gib der Leseaufgabe ein Vorher, ein Während und ein Nachher und eine Frage, mit der man liest. Markieren nur mit Regel (wenig, Hauptsache von Nebensache trennen), danach ein Stichwort oder eine Frage an den Rand. Längere Sachtexte auf Papier.",
        "Geht es um Strukturen: Die Lernenden legen selbst, mit drei bis fünf Arten von Beziehungen und einem Wort an jedem Pfeil, und begründen jede Lage. Eine Expertenstruktur erst nach der eigenen.",
        "Erst verstehen, dann abrufen. Merkhilfen wie Eselsbrücken nur zusammen mit Abrufen.",
        "Nenne bei jeder Methode, wofür sie weniger geeignet ist. Sinneskanäle sind keine Lerntypen.",
        "Gib nur dann an, wie gut die Methode belegt ist, wenn du eine Quelle nennen kannst: gut belegt · teilweise belegt · wenig erforscht. Sonst schreib »noch offen«.",
        "Plane, wann die Methode zum zweiten und dritten Mal vorkommt. Eine Methode, die nur einmal vorkommt, wird nicht gelernt.",
        "Gehört die Stelle zum Sichern und Üben, plane drei Teile: festhalten, was gilt; üben, erst mit Hilfe, dann allein; nach einigen Tagen ohne Vorlage wieder abrufen. Bei Urteilsaufgaben wird das Begründen geübt."
      ],
      "pruef": [
        "Passt das Handout gedruckt auf eine Seite?",
        "Ist jede Angabe, wie gut die Methode belegt ist, mit Quelle versehen oder als »noch offen« markiert?"
      ],
      "name": "Eine Lernmethode einführen",
      "kurz": "Du bekommst zwei bis drei passende Methoden zur Wahl und ein Handout auf einer Seite – mit ehrlicher Angabe, wie gut die Methode belegt ist.",
      "ziel": "Wähle für die Stelle im Unterricht, die ich unten beschreibe, eine passende Lernmethode und schreib ein Handout für die Lernenden auf einer Seite.",
      "format": "Ein Handout mit diesen Teilen: Kopf (Name, Dauer, Sozialform, wie gut belegt) · Was das ist (drei Sätze) · Gut geeignet / weniger geeignet · So geht's (fünf Schritte) · Beispiel aus meinem Fach mit einem typischen Fehler · Mit Tablet (nur, wenn es etwas kann, was Papier nicht kann; sonst »auf Papier gleich gut«) · KI-Unterstützung (ein Auftrag mit [Platzhaltern] und Grenzen: erst selbst, dann KI; die Lösung erst auf Bitte; Selbsttest ohne KI) · Datenschutz · Quelle mit Datum. Danach ein Minutenplan für die erste Anwendung im Unterricht.",
      "wo": "Aufträge zum Kopieren · »Eine Lernmethode einführen«",
      "fassung": "v1.3",
      "datum": "13.11.2026",
      "lizenz": false,
      "herunterladen": true
    },
    "praxisforschung-im-kollegium": {
      "anforderungen": [
        "Hilf mir, eine Frage zu formulieren, die auf das Lernen zielt und nicht nur auf mein Tun. Die Frage ist echt offen: Wer das Ergebnis schon kennt, erkundet nicht.",
        "Halte eine Ausgangslage fest, bevor sich etwas ändert, ein bis zwei Wochen lang.",
        "Ich ändere nur eine Sache auf einmal.",
        "Belege aus drei Richtungen, so wenige wie möglich: Arbeiten der Lernenden ohne Namen, meine Beobachtung nach der Stunde, Rückmeldung der Lernenden auf Zetteln ohne Namen.",
        "Keine Noten, Punkte oder Prozentwerte als Ergebnis. Muster in Worten beschreiben, einfache Zählungen sind erlaubt.",
        "Frag bei der Auswertung auch: Welche andere Erklärung gibt es für die Veränderung, zum Beispiel Thema, Zeitpunkt oder Klasse?",
        "Zufriedenheit ist kein Maß für Wirkung. Auch Formate ohne Lerngewinn werden oft gut bewertet.",
        "Auch »hat nicht geholfen« oder »zurück zu Papier« ist ein gutes Ergebnis.",
        "Besuche ich eine Kollegin oder einen Kollegen im Unterricht, dann mit einer Beobachtungsfrage und einem kurzen Gespräch danach. Die Beobachtung beschreibt, was die Lernenden tun, nicht die Kollegin oder den Kollegen. Ein Besuch ohne Frage bringt wenig.",
        "Arbeiten die Lernenden mit KI, sammle ich mindestens einen Beleg ohne KI. Ein besseres Ergebnis mit KI zeigt noch nicht, dass gelernt wurde."
      ],
      "pruef": [
        "Ist der Aufwand im Alltag machbar?",
        "Sind die Grenzen benannt: Was kann diese Erkundung zeigen, was nicht?"
      ],
      "name": "Eine Idee im Unterricht erproben",
      "kurz": "Ein kleiner, machbarer Plan: eine Frage, eine Ausgangslage, Belege aus dem Alltag und eine ehrliche Auswertung – auch »zurück zu Papier« ist ein gutes Ergebnis.",
      "ziel": "Plane mit mir eine kleine Erkundung: Ich will eine Unterrichtsidee ausprobieren und ehrlich auswerten, ob sie den Lernenden hilft. Die Idee beschreibe ich bei »Thema«.",
      "format": "Ein Plan mit: Frage · Ausgangslage · Veränderung · Belege (Tabelle mit Aufwand) · Leitfragen für die Auswertung · Entscheidung · wie ich es im Kollegium teile. Dauer sechs bis zehn Wochen, wenn ich nichts anderes sage.",
      "wo": "Aufträge zum Kopieren · »Eine Idee im Unterricht erproben«",
      "fassung": "v2",
      "datum": "10.11.2026",
      "lizenz": true,
      "herunterladen": true
    },
    "unterricht-digitalisieren": {
      "anforderungen": [
        "Fasse zuerst in drei bis fünf Zeilen zusammen, was du verstanden hast: Ziel, Lerngruppe, gewünschtes Ergebnis, Einsatz. Stell höchstens drei Rückfragen, und nur solche, die das Ergebnis verändern.",
        "Geh den Verlaufsplan Zeile für Zeile durch, mit Minuten. Frag je Zeile: Tun die Lernenden am Tablet etwas, das auf Papier nicht oder nur mühsam ginge? Hilft es nur beim Verteilen und Einsammeln? Dient es dem Lernziel? Ergebnis je Zeile in einem Satz.",
        "Wähl eine Stelle, nicht die ganze Stunde: wo Lernende hängen, wo Rückmeldung fehlt, wo geraten statt begründet wird.",
        "Geht es um mehrere Stunden, leg zuerst die Landkarte der Einheit an: eine Leitfrage, je Stunde ein Satz, die Bausteine, die jede Stunde wiederkehren, und die Sicherung bis zur Prüfung. Entscheide dann je Stunde, wie viel Gerät sie braucht. Auch keins ist ein gutes Ergebnis.",
        "Prüf je Phase, ob sie mit Gerät ihre Aufgabe fürs Lernen noch erfüllt: Im Einstieg legt sich jede Person fest, bevor erklärt wird. In der Erarbeitung begründen und ordnen alle, nicht nur wenige. Beim Sichern und Üben rufen die Lernenden ohne Vorlage ab, auch Tage später. Beim Übertragen wenden sie das Gelernte auf einen neuen Fall an.",
        "Trenn Didaktik und Gestaltung: Erst entscheidest du, was die Lernenden tun und wie viel Gerät es braucht. Wie eine Seite aussieht und sich bedient, prüfst du danach für sich.",
        "Was das Tablet wirklich besser kann: messen, zufällig zuteilen, sofort auswerten, Ergebnisse bündeln, simulieren, Rückmeldung geben, verdecken und aufdecken, fotografieren. Alles andere ist meist Verteilen.",
        "Keine Mischform: Das Gerät trägt einen Moment, eine Phase oder die ganze Stunde – nicht dieselbe Aufgabe halb am Gerät und halb auf Papier.",
        "Längere Sachtexte lesen und markieren die Lernenden auf Papier. Am Gerät nur kurze Texte, und dann mit einer Aufgabe beim Lesen: ein Stichwort je Abschnitt oder eine Frage an den Text. Markieren nur mit Regel, danach folgt ein Stichwort, eine Frage oder eine Struktur.",
        "Sollen Lernende Begriffe ordnen, legen sie die Struktur selbst – mit wenigen Arten von Beziehungen, einem Wort an jedem Pfeil und einer Begründung. Die Vorlage der Lehrkraft kommt erst danach.",
        "Bleib bei der Dramaturgie meiner Stunde. Was auf Papier gut funktioniert – Erwartungsstellen, Plenum, Tafel –, bleibt erkennbar.",
        "Rechne die Zeit ehrlich: Lesetext mit etwa 150 Wörtern pro Minute für langsame Lesende, dazu Eingaben und Wechsel zwischen Gerät und Plenum. Kennzeichne Schätzungen als Schätzung.",
        "Behaupte keine Funktionen von Geräten oder Lernplattformen aus dem Gedächtnis. Was du voraussetzt, kommt auf die Liste zum Prüfen.",
        "Schließ mit zwei Listen: »Vor dem Kopieren prüfen« (alles aus dem Gedächtnis: Zitate, Gesetze, Zahlen, Funktionen) und »Nur du kannst das« (echtes Tablet, Lernplattform, Schulregeln, Freigaben).",
        "Gib mir zum Schluss fünf kurze Fragen für die Beobachtung nach der Stunde, ohne Noten: Haben die Lernenden das Entscheidende selbst getan? Was ging besser als auf Papier? Wie viel Zeit ging an die Technik? Waren sie bei der Sache? So lassen, nachschärfen oder zurück zu Papier?"
      ],
      "pruef": [],
      "wo": "Bisherigen Unterricht digitalisieren · Abschnitt »Vorgehen« im Prompt",
      "fassung": "v4.5",
      "datum": "13.11.2026",
      "lizenz": false,
      "herunterladen": true
    },
    "lernseite-bauen": {
      "anforderungen": [
        "Beantworte vor dem Bauen vier Fragen als Vorschlag: Woran scheitern Lernende hier typischerweise? Welche Denkhandlung ist gefragt – erinnern, erklären, zuordnen und begründen, vorhersagen oder beurteilen? Was kann die Seite, was Papier nicht kann, in einem Satz? Welches Ergebnis zeigt am Ende, ob es gelungen ist?",
        "Erst denken, dann klicken: Vor jeder Auflösung legen sich die Lernenden fest und begründen kurz. Nichts, was man durch Raten erledigt.",
        "Rückmeldung, die erklärt: zu jeder Antwort eine eigene Erklärung, warum sie naheliegt und wo der Denkfehler liegt, dazu ein nächster Schritt. Nie nur richtig oder falsch.",
        "Hilfen erst nach dem eigenen Versuch, direkt an der Aufgabe und jederzeit wieder aufrufbar. Eine Aufgabe für Schnelle.",
        "Wenig auf einmal: Abschnitte höchstens eine Bildschirmseite, höchstens fünf bis sechs neue Begriffe. Lange Texte gehören auf Papier.",
        "Die Seite endet mit einem eigenen Ergebnis – Urteil, Einordnung oder Erklärung –, das im Plenum aufgegriffen wird. Am Ende steht sichtbar: »Tablet umdrehen«.",
        "Gehört die Seite zu einer Einheit, steht dieselbe Leitfrage auf jeder Seite. Am Anfang zeigt die Landkarte, wo die Stunde steht. Am Ende hält ein Satz in der Lernspur fest, was heute dazugekommen ist. Nicht jede Stunde braucht eine Seite: Papierstunden stehen auf der Landkarte mit.",
        "Jedes Element trägt seinen Status: belegte Quelle mit Fundstelle · Modell, die Zahlen sind keine Messwerte · ausgedachter Fall · noch offen. Erfinde keine Quellen, Zitate oder Bilder.",
        "Technik: eine einzige HTML-Datei, die ohne Internet läuft. Keine Schriften, Skripte, Bilder oder Videos von fremden Seiten. Gespeichert wird nur im Browser, ohne Namen, mit einem Knopf »Eingaben löschen«. Ergebnisse, die nach der Stunde gebraucht werden, kann man zusätzlich als Datei herunterladen.",
        "Lösungen und Erwartungshorizonte stehen nicht in der Seite für Lernende. Ein Codewort schützt nichts: Die Lösung stünde trotzdem im Quelltext.",
        "Für das Tablet: Zielflächen mindestens 44 Pixel, Schrift ab 16 Pixel, Farbe nie allein, mit Tastatur bedienbar. Die Seite wird per Link oder QR-Code im Browser geöffnet, nicht als Datei aus der Dateien-App."
      ],
      "pruef": [],
      "format": "Gib mir die Lernseite als eine einzige HTML-Datei. Davor: deine Antworten auf die vier Fragen und den Ablauf mit Minuten. Danach: die Listen »Vor dem Kopieren prüfen« und »Nur du kannst das«.",
      "wo": "Bisherigen Unterricht digitalisieren · Ausgabe »Lernseite als eine HTML-Datei«",
      "fassung": "v2.3",
      "datum": "13.11.2026",
      "lizenz": false,
      "herunterladen": false
    }
  },
  "gestaltung": {
    "anforderungen": [
      "Ruhig und flach wie ein gut gedrucktes Arbeitsblatt: heller, warmer Grund (#F8F5EE), Text in fast schwarzem Druckschwarz (#201F1D).",
      "Höchstens zwei Farben für Bereiche oder Kategorien, zum Beispiel Ocker (#B68235 als Fläche, darauf nur dunkle Schrift) und Petrol (#2F5D62). Keine dritte Akzentfarbe, keine Verläufe, kein Glas, kein Neon. Ocker nie für Fließtext.",
      "Hauptknöpfe in Druckschwarz, mindestens 48 Pixel hoch. Ecken 4 Pixel, auch bei Karten und Feldern.",
      "Keine weichen Schatten. Tiefe, wenn nötig, durch eine harte, um 6 Pixel versetzte Farbfläche hinter der Karte.",
      "Systemschrift, keine Schriften aus dem Netz. Überschriften kräftig und höchstens zwei Zeilen lang. Kein Text unter 16 Pixel.",
      "Erst Ruhe, dann Bewegung: Bewegung nur als Antwort auf eine Handlung der Lernenden, höchstens 300 Millisekunden, nur Lage und Deckkraft. Ist im System »Bewegung reduzieren« eingestellt, bewegt sich nichts.",
      "Ruhe in der Arbeitsphase: Dort bewegt sich nur die Antwort auf eine eigene Handlung. Ein Arbeitsfenster je Phase, höchstens drei Tipps bis zur ersten eigenen Antwort, Hilfen öffnen sich am selben Ort.",
      "Linien nur, wo sie eine Beziehung tragen. Eine Verbindungslinie endet an ihrem Ziel und kreuzt keine fremden Felder. Ein Bild hat eine Ordnung: Ordnet es nach der Zeit, zeigt es keine zweite Zählung.",
      "Text über einem Bild ist auch an der ungünstigsten Stelle gut lesbar, mindestens 4,5 zu 1.",
      "Vor einem interaktiven Film steht ein Satz, was man tun kann. Ein Erklärfilm zeigt die echte Oberfläche der Seite.",
      "Übersichten auf einem Startbildschirm nutzen die Breite des Tablets quer: mehrere Karten nebeneinander, Fließtext trotzdem höchstens 68 Zeichen breit.",
      "Status und Rückmeldung immer auch als Wort, nie nur als Farbe. Keine Ampeln, Punkte, Sterne, Abzeichen oder Konfetti.",
      "Fehlende Bilder nicht erfinden: ein ruhiges Punktraster mit »noch kein Bild«. Keine Stockfotos, keine KI-Bilder als Fotos.",
      "Lesbar am Beamer: Das Wichtigste jedes Abschnitts passt in 1280 × 720 Pixel."
    ],
    "pruef": [],
    "stand": "13.11.2026",
    "wo": "Unterricht digitalisieren"
  }
};
if (typeof module !== "undefined") module.exports = KURZFASSUNGEN;
