/* Hilde Digital – Ansichten für die Galerie.

   Jede Ansicht ist ein Bildschirmfoto aus der echten Anwendung, aufgenommen am 18.10.2026 (Ergänzungen am 26.10.2026)
   aus den öffentlichen Repositories (lokal geöffnet, ohne Änderung am Inhalt).
   Herkunft je Bild: docs/galerie-quellen.md. Nichts ist nachgebaut oder nachbearbeitet.

   Felder je Ansicht:
     bild – Datei in assets/galerie/ (1040 × 650 Pixel, WebP)
     alt  – was das Bild zeigt, mit der Funktion (nicht nur der Projektname)
     text – kurze Bildunterschrift: was man an dieser Stelle tun kann
   Die erste Ansicht ist das Hauptbild. Ohne Eintrag zeigt die Galerie das bisherige Vorschaubild. */

var GALERIE = {
  "psycho-ds2": [
    { bild: "assets/galerie/psycho-ds2-1.webp", text: "Der Versuch: Zwei Bilder wechseln sich ab. Wer die Änderung entdeckt, tippt auf »Gefunden!«.",
      alt: "Psycho-Labor im Versuch: ein gezeichnetes Bücherregal mit Uhr, Vase und Pflanze, darüber die laufende Zeit und unten der Knopf »Gefunden!«" },
    { bild: "assets/galerie/psycho-ds2-2.webp", text: "Vorher legen sich die Lernenden fest: Wie lange werden sie brauchen?",
      alt: "Vorhersage im Psycho-Labor: ein Schieberegler für die geschätzten Sekunden und drei Antworten, eine davon ausgewählt" },
    { bild: "assets/galerie/psycho-ds2-3.webp", text: "Danach vergleichen sie ihr Ergebnis mit der Originalstudie.",
      alt: "Abschnitt »Was die Forschung sagt« mit den Ergebnissen des Flacker-Tests von Rensink, O’Regan und Clark und einem Kasten zur Tür-Studie" },
    { bild: "assets/galerie/psycho-ds2-4.webp", text: "Das Psycho-Labor bietet mehrere Selbstversuche zur Wahrnehmung.",
      alt: "Übersicht des Psycho-Labors mit den Versuchen DS 2 bis DS 4 und weiteren angekündigten Versuchen" }
  ],
  "ns-ideologie": [
    { bild: "assets/galerie/ns-ideologie-1.webp", text: "Die Lernenden lesen ein Zeugnis und wählen, welches Denkmuster dahintersteckt.",
      alt: "GGK-Labor, Schritt »Sechs Zeugnisse«: Auftrag und fünf Denkmuster zur Auswahl, eines ist markiert" },
    { bild: "assets/galerie/ns-ideologie-2.webp", text: "Sie ordnen Maßnahmen von 1933 den Ideen zu und begründen mit einem Detail.",
      alt: "Schritt »Von der Idee zur Tat«: ein Beispiel zum Boykott 1933 und darunter das Berufsbeamtengesetz mit fünf Säulen zum Antippen und einem Begründungsfeld" },
    { bild: "assets/galerie/ns-ideologie-3.webp", text: "In der Expertengruppe wählt jede Gruppe eine Quelle und untersucht sie genau.",
      alt: "Schritt »Expertengruppe«: Liste mit fünf Quellen, jeweils mit der zugehörigen Säule der NS-Ideologie" },
    { bild: "assets/galerie/ns-ideologie-4.webp", text: "Die Rückmeldung zeigt, welche Zuordnung den Kern trifft.",
      alt: "Schritt »Deine Zuordnungen – mit Rückmeldung«: Legende »trifft den Kern, auch begründbar, kaum haltbar« und zwei Aufträge mit Schreibfeldern" }
  ],
  "gene": [
    { bild: "assets/galerie/gene-1.webp", text: "Ein Regler verschiebt die Staatsgrenze. Die genetische Vielfalt ändert sich an der Linie kaum.",
      alt: "Farbverlauf von Blau über Gelb nach Orange mit verschiebbarer Staatsgrenze, darunter »Unterschied: kaum sichtbar« und drei Kennzahlen aus einer Studie" },
    { bild: "assets/galerie/gene-2.webp", text: "Zum Einstieg prüfen die Lernenden fünf Aussagen. Jede Karte lässt sich umdrehen.",
      alt: "Fünf Aussagekarten zum Umdrehen; eine Karte ist umgedreht und erklärt, warum die Aussage falsch ist" },
    { bild: "assets/galerie/gene-3.webp", text: "Das Balkan-Beispiel zeigt: Die Linien kommen in allen drei Gruppen vor.",
      alt: "Balkendiagramm zu Haplogruppen bei Kroaten, Bosniaken und Serben, daneben die Erklärung »Was zeigt die Grafik?«" },
    { bild: "assets/galerie/gene-4.webp", text: "Die meisten Unterschiede liegen innerhalb einer Bevölkerung.",
      alt: "Punktgrafik mit 100 Punkten: etwa 85 für Unterschiede innerhalb einer Bevölkerung, etwa 15 für Unterschiede zwischen Bevölkerungen" }
  ],
  "nation": [
    { bild: "assets/galerie/nation-1.webp", text: "Die Lernenden ordnen ihren Länderfall zwischen Willens-, Kultur- und Abstammungsnation ein.",
      alt: "Nation im Kopf, Modul »Fall einordnen«: Lernweg links, rechts die Idealtypen Willensnation und Kulturnation" },
    { bild: "assets/galerie/nation-2.webp", text: "Jede Person wählt einen von fünf Länderfällen und untersucht ihn gründlich.",
      alt: "Modul »Länderfall wählen« mit Hinweis zu den historischen Fällen und dem Arbeitsauftrag" },
    { bild: "assets/galerie/nation-3.webp", text: "Theorien werden mit Fachbegriffen und kurzen Textauszügen erschlossen.",
      alt: "Modul »Anderson: Vorstellung« mit Erklärtext und Begriffskarten »begrenzt«, »souverän«, »Printkapitalismus«" }
  ],
  "beschlussapp": [
    { bild: "assets/galerie/beschlussapp-1.webp", text: "Zu jedem Punkt stehen Entwurf, Klärungsbedarf und Optionen mit Vor- und Nachteilen.",
      alt: "Beschlussapp, Punkt D1 »Name und Kürzel«: Entwurfsfassung, Klärungsbedarf und drei Optionen A, B, C mit Empfehlung" }
  ],
  "politik-check": [
    { bild: "assets/galerie/politik-check-1.webp", text: "Zehn Fragen aus der Sicht von 1919. Hier: Welche Staatsform wünschst du dir?",
      alt: "Politik-Check 1919, Frage 1 von 10 zur Staatsform mit drei Antwortmöglichkeiten" }
  ],
  "landkarte": [
    { bild: "assets/galerie/landkarte-1.webp", text: "Vier Bereiche führen durch die Werkzeuge der Geschichtsanalyse.",
      alt: "Kognitive Landkarte mit vier farbigen Bereichen: Wozu Geschichte, Was ist Geschichte, Auswirkungen der Geschichte, Prüfen wie Profis" }
  ],
  "inhaltsverzeichnis": [
    { bild: "assets/galerie/inhaltsverzeichnis-1.webp", text: "Eine Kurslandkarte mit Zeitleiste, Suche und Filtern nach Kompetenzen.",
      alt: "Inhaltsverzeichnis GGK mit Zeitleiste von 1914 bis heute, Suchfeld, Filtern und den ersten Modulen der Jahrgangsstufe 1" }
  ],
  "planspiel": [
    { bild: "assets/galerie/planspiel-1.webp", text: "Die Gruppe stellt mit Reglern ihre eigenen Steuersätze ein.",
      alt: "Planspiel Umverteilung, Reiter »Stellschrauben«: Regler für den Spitzensteuersatz mit dem heutigen Wert zum Vergleich" },
    { bild: "assets/galerie/planspiel-2.webp", text: "Danach sehen alle, was ihr Konzept bewirken würde.",
      alt: "Reiter »Auswirkungen«: Vermögensverteilung heute als Balken, darunter die Prognose für das eigene Konzept" }
  ],
  "one-step": [
    { bild: "assets/galerie/one-step-1.webp", text: "Jede Person lost eine Lebenslage aus und behält sie bis zur Übung im Raum.",
      alt: "One Step Forward: ausgeloste Rolle »Erzieherin« mit Angaben zu Einkommen, Bildung der Eltern, Herkunft und Wohnsituation" }
  ],
  "hilberg": [
    { bild: "assets/galerie/hilberg-1.webp", text: "Jede Karte lässt sich einer oder mehreren Kategorien zuordnen.",
      alt: "Karten historischer Akteur*innen mit Ankreuzfeldern Täter*in, Opfer, Zuschauer*in, Helfer*in und Nutznießer*in; bei zwei Karten ist Täter*in angekreuzt" }
  ],
  "widerstandsmodelle": [
    { bild: "assets/galerie/widerstandsmodelle-1.webp", text: "Das Peukert-Modell in vier Stufen, jeweils mit Kriterien und Beispielen.",
      alt: "Widerstandsmodelle: die vier Stufen Nonkonformität, Verweigerung, Protest und Widerstand mit Kriterien und Beispielen" },
    { bild: "assets/galerie/widerstandsmodelle-2.webp", text: "Ein zweites Modell setzt beim Handlungsspielraum an.",
      alt: "Reiter »Agency-Modell« mit Hinweis, Leitfrage und zentraler These zum Handlungsspielraum" }
  ],
  "milieus-1919": [
    { bild: "assets/galerie/milieus-1919-1.webp", text: "Ein Klick auf die Pyramide öffnet Lebenslage, Interessen und Ängste des Milieus.",
      alt: "Milieu-Pyramide 1919, die Industriearbeiterklasse ist ausgewählt; rechts ihre Lebenssituation, Interessen und Ängste" },
    { bild: "assets/galerie/milieus-1919-2.webp", text: "Die Pyramide zeigt die Anteile der Milieus an der Gesellschaft von 1919.",
      alt: "Milieu-Pyramide von der Oberschicht bis zur Industriearbeiterklasse, darunter Frauen als erstmals wahlberechtigte Gruppe" }
  ],
  "ns-kontinuitaeten": [
    { bild: "assets/galerie/ns-kontinuitaeten-1.webp", text: "Neun Bereiche der Bundesrepublik stehen zur Auswahl.",
      alt: "NS-Kontinuitäten: Kacheln Bundesnachrichtendienst, Justiz, Medizin, Bundeswehr, Auswärtiges Amt, Polizei und weitere" }
  ],
  "shoa-vergleich": [
    { bild: "assets/galerie/shoa-vergleich-1.webp", text: "Für Dänemark sind Opferrate, Rettung und die Faktoren dahinter aufbereitet.",
      alt: "Ländervergleich: Kennzahlen zu Opferrate und Rettung in Dänemark und aufklappbare strukturelle und politische Faktoren" }
  ],
  "widerstandsformen": [
    { bild: "assets/galerie/widerstandsformen-1.webp", text: "Ein Filter zeigt nur eine Form des Widerstands, hier den Jugendwiderstand.",
      alt: "Widerstandsformen im NS mit aktivem Filter »Jugendwiderstand« und dem Profil der Swing-Jugend" }
  ],
  "teacch": [
    { bild: "assets/galerie/teacch-1.webp", text: "Der Tagesplan ist zum Antippen: Erledigte Schritte werden markiert.",
      alt: "TEACCH-Materialien: interaktiver Tagesplan für die Morgenroutine in der Kita mit Bildsymbolen, ein Schritt ist markiert" },
    { bild: "assets/galerie/teacch-2.webp", text: "Weitere Materialien wie die Gefühlskarte lassen sich direkt ausprobieren.",
      alt: "Abschnitt »Emotionskarte – Wie geht es mir?« mit Erklärung und Beginn der interaktiven Gefühls-Ampel" }
  ],
  "dialoge": [
    { bild: "assets/galerie/dialoge-1.webp", text: "Ein Generator verteilt die drei Rollen für das Rollenspiel.",
      alt: "Sexualpädagogische Dialoge: Rollenzuweisung mit Erklärung und dem Rollen-Generator zum Antippen" }
  ],
  "lf3": [
    { bild: "assets/galerie/lf3-1.webp", text: "Jedes Thema beginnt mit einer Definition. Fortschritt und Punkte stehen oben.",
      alt: "LF3 Übungsplattform, Thema Familie: Zähler für Übungen, Punkte und Erfolgsquote, darunter die Definition Familie" }
  ],
  "fachbegriffe": [
    { bild: "assets/galerie/fachbegriffe-1.webp", text: "Die Lernenden erklären einen Begriff zuerst selbst. Danach vergleichen sie mit der Musterlösung.",
      alt: "Fachbegriffe-Trainer, Modus »Begriff erklären«: der Begriff Bewahrpädagogik mit Eingabefeld und den Knöpfen Auswerten und Musterlösung zeigen" }
  ],
  "bef1": [
    { bild: "assets/galerie/bef1-1.webp", text: "Die Landkarte zeigt alle zwölf Doppelstunden auf einen Blick.",
      alt: "Landkarte der Einheit »Spiel«: Leitfrage, vier Abschnitte A bis D und die ersten Doppelstunden" },
    { bild: "assets/galerie/bef1-2.webp", text: "Zu drei Zeitpunkten schätzen sich die Lernenden selbst ein.",
      alt: "Abschnitt »Das kann ich am Ende der Einheit« mit Ankreuzspalten für drei Zeitpunkte" }
  ],

  /* Aufgenommen am 26.10.2026 (Herkunft: docs/galerie-quellen.md). */
  "m19-appeasement": [
    { bild: "assets/galerie/appeasement-1.webp", text: "Vor der Abstimmung wählt jede Person eine der drei Optionen und schätzt ein, ob Deutschland danach Ruhe gibt.",
      alt: "M19 Appeasement, Baustein 2, Schritt »Ihre Stimme«: drei Optionen A, B, C zur Reaktion auf den Einmarsch ins Rheinland 1936, Option B »Sanktionen durchsetzen« ist gewählt" },
    { bild: "assets/galerie/appeasement-2.webp", text: "Zu jeder Option stehen Hoffnungen und Risiken – immer nur mit dem Wissen von damals.",
      alt: "Schritt »Folgen«: Reiter für die Optionen A bis C, darunter zwei Spalten »Hoffnungen« und »Risiken« mit den Kennzeichen »damals erhofft« und »damals befürchtet«" }
  ],
  "m20-dilemmata": [
    { bild: "assets/galerie/dilemmata-1.webp", text: "Vor der Abstimmung diskutiert die Klasse in zwei Runden mit Uhr. Eine Tafelansicht geht an den Beamer.",
      alt: "M20, Dilemma 1, Schritt »Diskussion«: Runde 1 »Wozu neigst du?« mit Uhr auf 2:00, Auftrag und den Knöpfen »An die Tafel (Beamer)« und »Nächste Runde«" },
    { bild: "assets/galerie/dilemmata-2.webp", text: "Jede Quelle trägt ihre Fundstelle. Hier Churchill im Unterhaus, Mai 1940.",
      alt: "Quellenkarte mit Churchills Rede vom 13. Mai 1940 auf Deutsch und Englisch, darunter die Fundstelle und der Knopf »Herkunft«" }
  ],
  "m22-wie-war-das-moeglich": [
    { bild: "assets/galerie/wie-war-das-moeglich-1.webp", text: "Auf dem Marktplatz prüfen die Lernenden drei Streitpaare am Fall Józefów und bekommen eine Rückmeldung.",
      alt: "M22, Marktplatz: Streitpaar »Browning gegen Goldhagen« mit beiden Thesen, darunter die Frage »Welche Seite stützt der Fall Józefów eher?« und Antworten mit Rückmeldung »Zentral« und »Auch begründbar«" },
    { bild: "assets/galerie/wie-war-das-moeglich-2.webp", text: "Jede Forschungsakte gibt es in drei Lesestufen: Einstieg, Vertiefung, Kontroverse.",
      alt: "Forschungsakte C »Browning: Ganz normale Männer« mit Leitfrage, Ebene »Situation« und den drei Lesestufen Einstieg, Vertiefung und Kontroverse" }
  ],
  "politik-werkstatt": [
    { bild: "assets/galerie/politik-werkstatt-1.webp", text: "Der Sitzrechner zeigt den Bundestag als Halbrund – mit Mehrheitslinie und den Parteien ohne Sitz.",
      alt: "Sitzrechner der Politik-Werkstatt: Halbrund mit 630 Sitzen nach dem Bundesergebnis 2025, Legende mit Sitzzahlen je Partei und Hinweis, welche Parteien keinen Sitz bekommen" },
    { bild: "assets/galerie/politik-werkstatt-2.webp", text: "Zweitstimmen eintragen oder ein echtes Ergebnis laden, dann die 5-%-Hürde an- und ausschalten.",
      alt: "Abschnitt »Der Sitzrechner« mit Knöpfen für Bundesergebnis 2025, Wahlkreis 260 und Klassenergebnis, Prozentfeldern je Partei und zwei Schaltern für 5-%-Hürde und Grundmandatsklausel" }
  ],
  "psycho-ds3-6": [
    { bild: "assets/galerie/psycho-ds3-6-1.webp", text: "Welche Linie ist gleich lang? Ein Teil des Kurses sieht vorher, was fünf andere gewählt haben.",
      alt: "DS 5 im Psycho-Labor: Vergleichslinie und drei Linien A, B, C; darunter der Kasten »So haben fünf andere Personen gewählt« mit fünfmal A und die eigene Antwort" },
    { bild: "assets/galerie/psycho-ds3-6-2.webp", text: "Sieben Entdeckungen zu zweit: Erst beschreiben, dann die Regel finden, dann den Fachbegriff aufdecken.",
      alt: "DS 3 im Psycho-Labor, Entdeckung 1 von 7: eine Figur, die als Vase oder als zwei Gesichter gelesen werden kann, darunter der Knopf »Farben tauschen«" }
  ],
  "erfundene-traditionen": [
    { bild: "assets/galerie/erfundene-traditionen-1.webp", text: "Im Theorie-Duell positionieren die Lernenden jeden Fall zwischen Hobsbawm und Smith und vergleichen mit einem Vorschlag.",
      alt: "Abschnitt »Hobsbawm gegen Smith«: Karten für Sedantag und Hermannsdenkmal mit je einem Regler zwischen »weitgehend erfunden« und »knüpft an Altes an« und dem Knopf »Vergleichen«" },
    { bild: "assets/galerie/erfundene-traditionen-2.webp", text: "Hobsbawms Werkzeugkasten: vier Merkmale und drei Funktionen einer erfundenen Tradition.",
      alt: "Vier Karten Wiederholung, Bezug auf Vergangenheit, Symbole, Feste Form; darunter drei Funktionen: Zusammenhalt stiften, Herrschaft legitimieren, Werte einüben" }
  ],
  "nationalismus-demokratie": [
    { bild: "assets/galerie/nationalismus-demokratie-1.webp", text: "Fünf Regler stellen Kipp-Punkte ein. Ein Zeiger zeigt, wann das Wir zur Gefahr wird.",
      alt: "Abschnitt »Kipp-Punkte«: fünf Schalter zu Zugehörigkeit, Verhältnis zu anderen Nationen, Vielfalt, Kritik und Grundrechten, rechts ein Zeiger im roten Bereich mit der Einordnung »Demokratiegefährdend« und der Voreinstellung Kaiserreich" },
    { bild: "assets/galerie/nationalismus-demokratie-2.webp", text: "Zum Einstieg ordnen die Lernenden Aussagen den Begriffen zu und bekommen eine kurze Erklärung.",
      alt: "Abschnitt »Ordne die Aussagen zu«: Aussage zur Fußball-WM mit den Knöpfen Patriotismus, Verfassungspatriotismus, Nationalismus, Chauvinismus; eine Antwort ist grün, eine rot markiert, darunter die Erklärung" }
  ]
};

/* Die erste Ansicht wird auch zum Vorschaubild der Karte. Titel, Text, Status und Links bleiben unverändert. */
if (typeof BEISPIELE !== "undefined") {
  BEISPIELE.forEach(function (b) {
    var a = GALERIE[b.id];
    if (a && a.length) { b.ansichten = a; b.bild = a[0].bild; } else { b.ansichten = []; }
  });
}

if (typeof module !== "undefined") module.exports = GALERIE;
