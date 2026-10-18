/* Hilde Digital – Werkzeug »Unterricht digitalisieren«: Auswahl für den Prompt-Baukasten.
   Wer bestehenden Unterricht hat, wählt Material und Vorhaben. Der Prompt (assets/digitalisieren-prompt.js)
   verbindet das mit dem Qualitätsmodell (assets/daten/qualitaet.js) und der Frage »Was kann das Tablet besser als Papier?«.
   bereiche: Ids aus QUALITAET.bereiche, die für dieses Vorhaben zählen. Keine Namen von KI-Anbietern. */

var DIGITALISIEREN = {
  materialien: [
    { id: "arbeitsblatt", name: "Arbeitsblatt", akk: "ein Arbeitsblatt" },
    { id: "praesentation", name: "Präsentation", akk: "eine Präsentation" },
    { id: "verlauf", name: "Stundenverlaufsplan", akk: "einen Stundenverlaufsplan" },
    { id: "text", name: "Text oder Quelle", akk: "einen Text oder eine Quelle" }
  ],

  vorhaben: [
    { id: "ideen", name: "Ideen in drei Varianten", kurz: "Wie könnte das Tablet hier helfen? Drei Wege zur Auswahl.",
      auftrag: "Entwickle drei Varianten, wie das Tablet in diesem Unterricht helfen könnte: eine punktuelle (eine einzelne Aktivität), eine phasenweise (eine Unterrichtsphase) und eine durchgängige (die ganze Stunde). Prüfe bei jeder Variante ehrlich, ob Papier genauso gut wäre.",
      bereiche: ["denken", "rueckmeldung", "zusammen", "darstellung", "lernstand"],
      antwort: ["Je Variante: Was tun die Lernenden? Was kann das Tablet hier besser als Papier? Was brauche ich (App, Vorbereitungszeit)? Was ist das Risiko?", "Danach deine Empfehlung mit Begründung – »bleib beim Papier« ist erlaubt."] },
    { id: "arbeitsblatt", name: "Arbeitsblatt digitalisieren", kurz: "Aus Lesen und Schreiben werden Aufgaben mit Rückmeldung.",
      auftrag: "Mach aus dem Arbeitsblatt eine digitale Fassung, die mehr kann als ein PDF: Die Lernenden bekommen sofort Rückmeldung, begründen ihre Antworten und finden Hilfen, wenn sie hängen.",
      bereiche: ["rueckmeldung", "denken", "hilfen", "lernstand"],
      antwort: ["Die digitale Fassung Aufgabe für Aufgabe: Aufgabentyp (z. B. Auswahl, Zuordnung, Lückentext, offene Antwort), Text der Aufgabe, richtige Lösung, Rückmeldung zu typischen Fehlern, gestufte Hilfe.", "Markiere, welche Aufgaben auf Papier bleiben sollten und warum."] },
    { id: "praesentation", name: "Präsentation interaktiv machen", kurz: "Vermuten, abstimmen, vergleichen statt nur zuhören.",
      auftrag: "Überarbeite die Präsentation so, dass die Lernenden mitdenken: Sie vermuten vor der Auflösung, stimmen ab, vergleichen ihre Antworten oder arbeiten mit einer Darstellung.",
      bereiche: ["denken", "darstellung", "lernstand", "handeln"],
      antwort: ["Folie für Folie: was bleibt, was wird zur Frage, Abstimmung oder Aufgabe, und was tun die Lernenden dabei.", "Höchstens drei interaktive Stellen – lieber wenige gute."] },
    { id: "differenzieren", name: "Differenzieren", kurz: "Hilfen für die einen, Herausforderung für die anderen.",
      auftrag: "Mach das Material für unterschiedliche Lernstände nutzbar – am selben Inhalt. Nutze, was digital leichter geht: Vorlesen, gestufte Hilfen, Wahl des Zugangs.",
      bereiche: ["hilfen", "wahl", "zugang"],
      antwort: ["Drei Wege durch das Material (mit Hilfen, Standard, mit Herausforderung) und je zwei gestufte Hilfen.", "Wie finden die Lernenden ihren Weg, ohne bloßgestellt zu werden?"] },
    { id: "lernstand", name: "Lernstand sichtbar machen", kurz: "Sehen, wo die Klasse steht – noch in der Stunde.",
      auftrag: "Baue in den Unterricht zwei bis drei kurze Stellen ein, an denen ich sehe, wo die Klasse steht, und daraus den nächsten Schritt ableiten kann.",
      bereiche: ["lernstand", "rueckmeldung"],
      antwort: ["Für jede Stelle: Zeitpunkt, Frage oder Aufgabe, welche Antworten auf welches Missverständnis hinweisen, was ich dann tue.", "Datensparsam: möglichst anonym, keine Noten."] },
    { id: "zusammen", name: "Zusammenarbeit stärken", kurz: "Gemeinsam an einem Ergebnis arbeiten.",
      auftrag: "Gestalte eine Phase, in der die Lernenden am Tablet wirklich zusammenarbeiten: an einem gemeinsamen Ergebnis, mit klaren Rollen und einem sichtbaren Stand.",
      bereiche: ["zusammen", "denken", "ablauf"],
      antwort: ["Ablauf mit Rollen, Zeit, Werkzeug und dem gemeinsamen Ergebnis.", "Was tun Gruppen, die fertig sind? Wie wird das Ergebnis gesichert?"] },
    { id: "analog", name: "Prüfen: Lieber analog lassen?", kurz: "Ehrlich abwägen, bevor du etwas umbaust.",
      auftrag: "Prüfe, ob sich eine digitale Umsetzung für diesen Unterricht lohnt. Vergleiche ehrlich mit Papier und Tafel.",
      bereiche: ["fach", "denken", "ablauf"],
      antwort: ["Deine Einschätzung in einem Satz: digital, hybrid oder analog – mit Begründung.", "Wenn digital oder hybrid: die eine Stelle, an der es sich am meisten lohnt."] }
  ],

  umfang: [
    { id: "", name: "Weiß ich noch nicht" },
    { id: "punktuell", name: "Punktuell", hilfe: "eine einzelne Aktivität" },
    { id: "phasenweise", name: "Phasenweise", hilfe: "eine Unterrichtsphase" },
    { id: "durchgaengig", name: "Durchgängig", hilfe: "die ganze Stunde am Tablet" }
  ],

  ausgaben: [
    { id: "ideen", name: "Ideen zum Auswählen", satz: "Gib mir zuerst nur Ideen und Varianten zum Auswählen. Arbeite danach nur die Variante aus, die ich wähle." },
    { id: "fertig", name: "Fertige Fassung", satz: "Gib mir eine fertige, sofort einsetzbare Fassung." },
    { id: "plattform", name: "Bauanleitung für unsere Lernplattform", satz: "Gib mir eine Schritt-für-Schritt-Bauanleitung für unsere Lernplattform (z. B. als Test oder interaktiver Inhalt). Nenne nur Funktionen, die es dort üblicherweise gibt, und kennzeichne, was ich prüfen muss." }
  ],

  /* Gilt für jeden Prompt: Aufmerksamkeit schützen und Ablenkung begrenzen. */
  ablenkung: [
    "Ein klarer Auftrag und ein Zeitrahmen für jede Tablet-Phase.",
    "Möglichst nur eine App oder Seite pro Phase; kein Wechsel ohne Grund.",
    "Geräte nur dann nutzen, wenn sie gebraucht werden – sonst Bildschirm aus oder Hülle zu.",
    "Ohne Anmeldung bei fremden Diensten, wenn es geht. Keine personenbezogenen Daten."
  ]
};

if (typeof module !== "undefined") module.exports = DIGITALISIEREN;
