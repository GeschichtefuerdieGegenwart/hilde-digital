/* Hilde Digital – Texte für den Weg »KI für meine Arbeit«.
   Hier stehen die Ziele, Ergebnisformen, Bausteine der Anfrage und die Prüflisten.
   Keine Namen von KI-Anbietern: Welche Systeme an der Schule zugelassen sind, ist noch offen.
   Die Anfrage selbst baut assets/ki-anfrage.js aus diesen Texten zusammen. */

var KI_TEXTE = {

  /* Schritt 1: Wobei soll KI dich unterstützen? formen = passende Ergebnisformen (Schritt 2). */
  ziele: [
    { id: "planen", name: "Unterricht planen",
      auftrag: "Hilf mir, Unterricht zu planen.",
      formen: ["stundenstruktur", "aufgabenfolge", "ideensammlung"] },
    { id: "erstellen", name: "Aufgaben oder Materialien erstellen",
      auftrag: "Erstelle Material für meinen Unterricht.",
      formen: ["arbeitsblatt", "aufgabenfolge", "erklaertext", "hilfekarten", "praesentation"] },
    { id: "vereinfachen", name: "Material vereinfachen oder differenzieren",
      auftrag: "Überarbeite vorhandenes Material so, dass es für unterschiedliche Lernende zugänglich ist. Den Ausgangstext füge ich unten ein.",
      formen: ["arbeitsblatt", "erklaertext", "hilfekarten"] },
    { id: "rueckmeldung", name: "Rückmeldungen oder Bewertungsraster vorbereiten",
      auftrag: "Hilf mir, Rückmeldung und Bewertung vorzubereiten.",
      formen: ["erwartungshorizont", "bewertungsraster"] },
    { id: "ideen", name: "Ideen sammeln",
      auftrag: "Sammle Ideen für meinen Unterricht.",
      formen: ["ideensammlung", "stundenstruktur"] },
    { id: "strukturieren", name: "Inhalte zusammenfassen oder strukturieren",
      auftrag: "Fasse Inhalte zusammen und ordne sie übersichtlich. Den Ausgangstext füge ich unten ein.",
      formen: ["uebersicht", "erklaertext", "praesentation"] },
    { id: "kommunikation", name: "Kommunikation und Organisation",
      hilfe: "z. B. Elterninformation, Sitzung vorbereiten",
      auftrag: "Hilf mir bei einer Aufgabe aus Kommunikation und Organisation an meiner Schule.",
      formen: ["elterninformation", "sitzung", "praesentation"] },
    { id: "ausprobieren", name: "KI erst einmal ausprobieren",
      hilfe: "Ein kleiner, risikoarmer Anfang",
      auftrag: "Ich möchte ausprobieren, wie du mich bei der Unterrichtsvorbereitung unterstützen kannst. Beginne mit einem kleinen, überschaubaren Ergebnis.",
      formen: ["ideensammlung", "erklaertext", "arbeitsblatt"] }
  ],

  /* Schritt 2: Ergebnisformen. format = Baustein »Format« der Anfrage. analog = Hinweis, dass das Ergebnis auch auf Papier funktioniert. */
  formen: [
    { id: "arbeitsblatt", name: "Arbeitsblatt", akk: "ein Arbeitsblatt",
      format: "Gliedere so: Überschrift, ein bis zwei Sätze zur Einführung, nummerierte Aufgaben mit klaren Arbeitsaufträgen. Danach getrennt: Lösungshinweise für mich.",
      analog: "Das Arbeitsblatt muss auch ausgedruckt funktionieren." },
    { id: "aufgabenfolge", name: "Aufgabenfolge", akk: "eine Aufgabenfolge",
      format: "Ordne drei bis fünf Aufgaben vom Einfachen zum Anspruchsvollen. Nenne zu jeder Aufgabe, was die Lernenden dabei tun." },
    { id: "stundenstruktur", name: "Stundenstruktur", akk: "eine Stundenstruktur",
      format: "Erstelle eine Tabelle mit den Spalten Phase, Zeit, Was die Lernenden tun, Was ich tue, Material." },
    { id: "erklaertext", name: "Erklärtext", akk: "einen Erklärtext",
      format: "Schreibe kurze Absätze mit Zwischenüberschriften. Erkläre Fachbegriffe beim ersten Vorkommen." },
    { id: "hilfekarten", name: "Hilfekarten", akk: "Hilfekarten",
      format: "Erstelle drei gestufte Hilfekarten: ein Denkanstoß, ein konkreter Hinweis, ein Lösungsbeispiel.",
      analog: "Die Karten müssen sich auch ausdrucken und ausschneiden lassen." },
    { id: "erwartungshorizont", name: "Erwartungshorizont", akk: "einen Erwartungshorizont",
      format: "Liste je Aufgabe die erwarteten Inhalte auf. Trenne zwischen Mindestanforderung und vertiefter Leistung." },
    { id: "bewertungsraster", name: "Bewertungsraster", akk: "ein Bewertungsraster",
      format: "Erstelle eine Tabelle mit drei bis fünf beobachtbaren Kriterien und drei Stufen. Beschreibe jede Stufe in einem Satz." },
    { id: "elterninformation", name: "Elterninformation", akk: "eine Elterninformation",
      format: "Schreibe einen kurzen Brief: Anlass, wichtigste Informationen, was die Eltern tun sollen, bis wann." },
    { id: "sitzung", name: "Sitzungsablauf", akk: "einen Ablauf für eine Sitzung",
      format: "Erstelle eine Tagesordnung mit Zeiten. Nenne zu jedem Punkt das Ziel: informieren, beraten oder entscheiden." },
    { id: "ideensammlung", name: "Ideensammlung", akk: "eine Ideensammlung",
      format: "Nenne fünf unterschiedliche Ideen in je zwei Sätzen. Gib zu jeder Idee an, wie viel Vorbereitung sie braucht." },
    { id: "praesentation", name: "Präsentationsgliederung", akk: "eine Gliederung für eine Präsentation",
      format: "Gliedere in höchstens acht Folien. Nenne je Folie Titel, Kernaussage und einen Vorschlag für eine Darstellung." },
    { id: "uebersicht", name: "Übersicht", akk: "eine Übersicht",
      format: "Erstelle eine Übersicht auf einer Seite: Kernaussagen als Stichpunkte, Zusammenhänge als kurze Sätze." }
  ],

  /* Schritt 3: Kontext. Alles freiwillig außer dem Hinweis. Freitexte werden nie gespeichert. */
  kontext: [
    { id: "fach", name: "Fach oder Lernbereich", beispiel: "z. B. Kfz-Technik, Sozialpädagogik, Gemeinschaftskunde" },
    { id: "thema", name: "Thema", beispiel: "z. B. Bremsanlage, Gruppenphasen, Wahlen" },
    { id: "gruppe", name: "Lerngruppe oder Ausbildungsjahr", beispiel: "z. B. 1. Ausbildungsjahr, Berufskolleg Klasse 1", optional: true },
    { id: "besonderes", name: "Besonderheiten", beispiel: "z. B. viele Lernende mit Deutsch als Zweitsprache", optional: true, lang: true }
  ],
  niveaus: [
    { id: "", name: "nicht angeben" },
    { id: "grundlegend", name: "grundlegend" },
    { id: "mittel", name: "mittel" },
    { id: "erhoeht", name: "erhöht" }
  ],
  datenhinweis: "Keine Namen, Noten oder anderen personenbezogenen Daten eingeben.",

  /* Schritt 4: Warum jeder Baustein wichtig ist. */
  bausteine: [
    { id: "ziel", name: "Ziel", warum: "Ein klares Ziel verhindert allgemeine Antworten." },
    { id: "kontext", name: "Kontext", warum: "Ohne Fach, Thema und Lerngruppe rät die KI – und trifft oft daneben." },
    { id: "anforderungen", name: "Anforderungen", warum: "Hier legst du fest, was für deinen Unterricht gelten muss." },
    { id: "format", name: "Format", warum: "Eine vorgegebene Form spart dir das Umbauen." },
    { id: "pruefkriterien", name: "Prüfkriterien", warum: "So prüft die KI ihr Ergebnis selbst – und zeigt dir, wo du nachsehen solltest." }
  ],

  /* Allgemeine Anforderungen und Prüfkriterien, gelten immer. */
  anforderungen: [
    "Verwende klare, einfache Sprache, die zur Lerngruppe passt.",
    "Erfinde keine Quellen, Zitate oder Zahlen. Wenn du etwas nicht sicher weißt, kennzeichne es.",
    "Frage nach, wenn dir eine wichtige Angabe fehlt."
  ],
  pruefkriterien: [
    "Stimmen Fakten und Fachbegriffe?",
    "Passt der Anspruch zur Lerngruppe?",
    "Nenne am Ende, welche Stellen ich besonders prüfen sollte."
  ],

  /* Schritt 5: Prüfliste. Allgemein plus je Ziel ein Punkt. */
  pruefliste: [
    "Ist alles fachlich korrekt?",
    "Passen Sprache und Anspruch zu meiner Lerngruppe?",
    "Passen Aufgaben und Lösungen zusammen?",
    "Gibt es erfundene Quellen oder unbelegte Behauptungen?",
    "Habe ich personenbezogene Daten vermieden?",
    "Was muss ich für meine Klasse anpassen?"
  ],
  prueflisteZiel: {
    rueckmeldung: "Sind die Kriterien beobachtbar und für alle fair?",
    vereinfachen: "Ist die Kernaussage beim Vereinfachen erhalten geblieben?",
    kommunikation: "Passen Ton und Form zu meiner Schule?",
    strukturieren: "Fehlt beim Zusammenfassen etwas Wichtiges?",
    planen: "Passt der Zeitplan zu meiner Stunde?",
    ideen: "Welche Idee passt wirklich zu meinem Lernziel?",
    erstellen: "Lässt sich das Material ohne Erklärung von mir verstehen?",
    ausprobieren: "Was hat mir geholfen – und was nicht?"
  },

  /* Schritt 5: passendes Beispiel aus dem Showroom je Ziel. */
  beispielZuZiel: {
    planen: "bef1", erstellen: "anleitertreffen", vereinfachen: "bef1", rueckmeldung: "bef1",
    ideen: "anleitertreffen", strukturieren: "anleitertreffen", kommunikation: "beschlussapp", ausprobieren: "anleitertreffen"
  }
};

if (typeof module !== "undefined") module.exports = KI_TEXTE;
