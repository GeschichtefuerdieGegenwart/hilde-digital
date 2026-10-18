/* Hilde Digital – KI-Training, Eingang »Schnell-Anfrage«: fertige Anfragen für häufige Anlässe.
   Jede Anfrage folgt denselben fünf Teilen wie der Weg »Prompten lernen«:
   Ziel · Kontext · Anforderungen · Format · Prüfkriterien (Namen aus KI_TEXTE.bausteine).
   material: true = die Lehrkraft fügt eigenes Material an (ohne personenbezogene Daten).
   Keine Namen von KI-Anbietern. Die Anfrage baut assets/schnell-anfrage.js. */

var SCHNELL = {
  anlaesse: [
    { id: "vereinfachen", name: "Arbeitsblatt vereinfachen", kurz: "Kürzere Sätze, klare Aufträge, gleicher Inhalt.", material: true,
      ziel: "Überarbeite das Arbeitsblatt unten so, dass es leichter zu lesen ist. Der fachliche Inhalt bleibt gleich.",
      anforderungen: ["Kurze Sätze, eine Aussage pro Satz.", "Fachbegriffe bleiben, werden aber beim ersten Auftreten kurz erklärt.", "Arbeitsaufträge mit einem klaren Verb (nenne, ordne zu, begründe).", "Nichts weglassen, was für das Lernziel nötig ist."],
      format: "Gib das überarbeitete Arbeitsblatt vollständig aus. Liste danach in höchstens fünf Punkten, was du geändert hast.",
      pruef: ["Ist der Inhalt fachlich unverändert richtig?", "Ist jeder Auftrag ohne Rückfrage verständlich?"] },
    { id: "niveaus", name: "In drei Niveaus differenzieren", kurz: "Dieselbe Aufgabe mit Hilfen und mit Herausforderung.", material: true,
      ziel: "Mach aus der Aufgabe unten drei Fassungen für unterschiedliche Lernstände – am selben Inhalt.",
      anforderungen: ["Fassung A: mit Hilfen (Satzanfänge, Beispiel, Wortliste).", "Fassung B: wie das Original, mit klarem Auftrag.", "Fassung C: mit einer zusätzlichen Denkaufgabe (begründen, übertragen, beurteilen).", "Alle drei Fassungen führen zum selben Lernziel."],
      format: "Drei klar getrennte Abschnitte A, B, C. Danach zwei gestufte Hilfekarten für Fassung A.",
      pruef: ["Ist das Lernziel in allen drei Fassungen gleich?", "Wirkt keine Fassung abwertend?"] },
    { id: "erwartung", name: "Erwartungshorizont erstellen", kurz: "Was eine gute Antwort enthält – zum Korrigieren und Besprechen.", material: true,
      ziel: "Erstelle einen Erwartungshorizont für die Aufgabe unten.",
      anforderungen: ["Nenne die erwarteten Inhalte je Teilaufgabe.", "Unterscheide: grundlegend erfüllt – gut erfüllt – besonders gut erfüllt.", "Nenne typische Fehler oder Missverständnisse."],
      format: "Eine Tabelle je Teilaufgabe. Darunter drei typische Fehler mit kurzer Rückmeldung an Lernende.",
      pruef: ["Passt der Erwartungshorizont zur Aufgabe, nicht zu einer anderen?", "Stimmen die Fachinhalte?"] },
    { id: "exit", name: "Exit-Ticket am Stundenende", kurz: "Drei kurze Fragen: Wo steht die Klasse?", material: false,
      ziel: "Erstelle ein Exit-Ticket, mit dem ich am Ende der Stunde sehe, wo meine Klasse steht.",
      anforderungen: ["Genau drei Fragen: eine zum Wiedergeben, eine zum Anwenden, eine zur Selbsteinschätzung.", "In zwei bis drei Minuten zu beantworten.", "Die Antworten sollen typische Fehlvorstellungen sichtbar machen.", "Funktioniert auf Papier und als kurzer Test am Tablet."],
      format: "Die drei Fragen. Darunter für mich: welche Antwort auf welches Missverständnis hinweist.",
      pruef: ["Zeigt jede Frage etwas, das ich in der nächsten Stunde nutzen kann?", "Ist das Exit-Ticket wirklich in drei Minuten machbar?"] },
    { id: "einstieg", name: "Einstieg mit Vermutung", kurz: "Erst vermuten, dann auflösen – weckt echtes Interesse.", material: false,
      ziel: "Entwickle einen Stundeneinstieg, bei dem die Lernenden zuerst eine Vermutung äußern und sie später überprüfen.",
      anforderungen: ["Ein überraschendes Bild, eine Zahl, ein Fall oder eine Frage.", "Die Vermutung wird festgehalten (Handzeichen, Abfrage am Tablet oder Zettel).", "Am Ende der Stunde wird die Vermutung aufgelöst.", "Höchstens zehn Minuten."],
      format: "Ablauf in drei Schritten mit Zeitangaben und dem genauen Wortlaut der Einstiegsfrage. Zwei Alternativen.",
      pruef: ["Führt der Einstieg wirklich zum Thema der Stunde?", "Sind Zahlen und Fakten belegt? Wenn nicht: kennzeichnen."] },
    { id: "quiz", name: "Übungsquiz mit Rückmeldung", kurz: "Fragen mit Erklärung zu jeder falschen Antwort.", material: false,
      ziel: "Erstelle ein Übungsquiz mit Rückmeldung, das ich auf Papier oder als Test in unserer Lernplattform nutzen kann.",
      anforderungen: ["Acht Fragen, gemischt: Auswahl, Zuordnung, eine offene Frage.", "Zu jeder falschen Antwortmöglichkeit eine kurze Erklärung, warum sie falsch ist.", "Mindestens zwei Fragen verlangen Anwenden statt Auswendiglernen."],
      format: "Nummerierte Fragen mit Antwortmöglichkeiten. Richtige Antwort markiert. Rückmeldetexte direkt unter jeder Frage.",
      pruef: ["Ist jede richtige Antwort eindeutig richtig?", "Erklären die Rückmeldungen, statt nur »falsch« zu sagen?"] },
    { id: "eltern", name: "Elterninformation schreiben", kurz: "Klar, freundlich, in einfacher Sprache.", material: false,
      ziel: "Schreibe eine kurze Information an Eltern oder Erziehungsberechtigte.",
      anforderungen: ["Einfache Sprache, kurze Sätze, freundlicher Ton.", "Das Wichtigste zuerst: was, wann, was ist zu tun.", "Keine Namen von Schülerinnen und Schülern."],
      format: "Höchstens eine halbe Seite. Betreffzeile, Anrede, drei kurze Absätze, Gruß.",
      pruef: ["Stimmen Datum, Ort und Ablauf?", "Ist der Text ohne Vorwissen verständlich?"] },
    { id: "sitzung", name: "Sitzung oder Konferenz vorbereiten", kurz: "Tagesordnung mit Zeiten und Zielen.", material: false,
      ziel: "Bereite eine Sitzung oder Konferenz vor.",
      anforderungen: ["Tagesordnung mit Zeitangabe je Punkt.", "Zu jedem Punkt: Ziel (informieren, besprechen, entscheiden).", "Am Ende: wer macht was bis wann."],
      format: "Tagesordnung als Liste, darunter eine Vorlage für das Ergebnisprotokoll.",
      pruef: ["Ist die Zeit realistisch?", "Ist bei jedem Punkt klar, ob entschieden wird?"] }
  ],

  /* Gilt für jede Schnell-Anfrage. */
  immer: ["Gib keine erfundenen Quellen, Zahlen oder Zitate an. Wenn du etwas nicht sicher weißt, kennzeichne es.", "Verwende keine personenbezogenen Daten."],
  datenhinweis: "Keine Namen, Noten oder anderen personenbezogenen Daten eingeben."
};

if (typeof module !== "undefined") module.exports = SCHNELL;
