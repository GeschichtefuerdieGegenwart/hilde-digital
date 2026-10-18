/* Hilde Digital – Digital-Check, Weg B »Mit KI prüfen«: der Prüf-Prompt zum Kopieren.

   Hilde Digital ist mit keiner KI verbunden. Diese Datei baut nur einen Text.
   Lehrkräfte kopieren ihn und geben ihn zusammen mit ihrem Material
   in ein an ihrer Schule freigegebenes KI-System ein.

   Der Prompt überträgt das Qualitätsmodell (assets/daten/qualitaet.js) vollständig:
   - alle Bereiche mit Frage, Stufen der pädagogischen Qualität (0–4) und des digitalen Beitrags (0–3),
     analoger Alternative und Risiko,
   - den Vergleich mit Papier (Analogskala),
   - die Regel »Technik rettet keine schwache Aufgabe« (wie in assets/check-regeln.js, begrenzeB),
   - die Kernbereiche des gewählten Materialtyps,
   - eine feste Gliederung der Antwort: Stärke zuerst, keine Noten, keine Prozente.
   Tests: tests/pruef-prompt.test.js */
(function (wurzel) {
  "use strict";

  function baue(optionen, Q) {
    Q = Q || wurzel.QUALITAET;
    optionen = optionen || {};
    var typ = Q.materialtypen.filter(function (t) { return t.id === optionen.typ; })[0] || null;
    var name = function (id) { return Q.bereiche.filter(function (b) { return b.id === id; })[0].name; };

    var z = [];
    z.push("# Rolle");
    z.push("Du bist eine erfahrene Fachdidaktikerin für digitales Lernen. Du berätst eine Lehrkraft kollegial.");
    z.push("Du gibst eine begründete Rückmeldung zu ihrem Unterrichtsmaterial. Du vergibst keine Note.");
    z.push("");
    z.push("# Auftrag");
    z.push("Prüfe das Material, das ich anhänge oder unten einfüge, mit dem Qualitätsmodell weiter unten.");
    z.push("Die Leitfrage lautet: Was kann das digitale Material hier besser als ein Arbeitsblatt auf Papier – und was nicht?");
    if (typ) {
      z.push("Materialtyp: " + typ.name + " (" + typ.hilfe + ").");
      z.push("Für diesen Typ sind diese Bereiche besonders wichtig: " + typ.kern.map(name).join(", ") + ".");
      if (typ.digital === false) z.push("Das Material kann ganz auf Papier eingesetzt werden. Ein fehlender digitaler Beitrag ist dann kein Mangel.");
    } else {
      z.push("Bestimme zuerst den Materialtyp, zum Beispiel: " + Q.materialtypen.map(function (t) { return t.name; }).join(", ") + ".");
      z.push("Nenne dann die zwei bis vier Bereiche, die für diesen Typ besonders wichtig sind, und begründe die Auswahl in einem Satz.");
    }
    z.push("");
    z.push("# Vorgehen");
    z.push("1. Lies das ganze Material. Wenn etwas fehlt oder nicht lesbar ist (Bilder, Links, Bedienung, Lösungen), sag das zuerst.");
    z.push("2. Prüfe jeden Bereich, zu dem das Material etwas zeigt, auf zwei Achsen:");
    z.push("   a) pädagogische Qualität, Stufe 0 bis 4: " + Q.stufenA.map(function (s, i) { return i + " = " + s; }).join(", ") + ";");
    z.push("   b) digitaler Beitrag, Stufe 0 bis 3: " + Q.stufenB.map(function (s, i) { return i + " = " + s; }).join(", ") + ". Stufe 0 heißt: Papier leistet dasselbe.");
    z.push("3. Vergleiche mit Papier. Wähle je Bereich einen Satz: " + Q.analogvergleich.map(function (a) { return "»" + a.satz + "«"; }).join(" ") );
    z.push("4. Belege jede Aussage mit einer kurzen Fundstelle aus dem Material (wörtliches Zitat oder genaue Stelle). Ohne Fundstelle schreibst du: »im Material nicht erkennbar«.");
    z.push("");
    z.push("# Regeln");
    z.push("- Keine Noten, keine Punktsumme, keine Prozentwerte. Nenne Stufen nur in Worten.");
    z.push("- Technik rettet keine schwache Aufgabe: Ist die pädagogische Qualität höchstens »" + Q.stufenA[1] + "«, ist der digitale Beitrag höchstens »" + Q.stufenB[1] + "«.");
    z.push("- Motivation allein ist kein Lernmehrwert. Spielelemente zählen nur, wenn sie das Lernen stützen.");
    z.push("- »Analog oder hybrid passt besser« ist ein vollwertiges Ergebnis. Mehr Technik ist nicht automatisch besser.");
    z.push("- Ein punktueller digitaler Einsatz ist keine Vorstufe. Bewerte das Material für den Zweck, für den es gemacht ist.");
    z.push("- Sprich von Potenzial, nicht von nachgewiesener Wirkung.");
    z.push("- Prüfe Fachliches vorsichtig: Nenne Stellen, die eine Fachperson prüfen sollte, statt Fehler sicher zu behaupten.");
    z.push("- Erfinde nichts. Ergänze keine fehlenden Informationen. Frage nach, wenn dir etwas fehlt.");
    z.push("- Enthält das Material Namen, Noten oder andere personenbezogene Daten, weise darauf hin und gehe nicht weiter darauf ein.");
    z.push("");
    z.push("# Qualitätsmodell: " + Q.bereiche.length + " Bereiche");
    Q.bereiche.forEach(function (b) {
      var kern = typ && typ.kern.indexOf(b.id) >= 0 ? " [wichtig für diesen Materialtyp]" : "";
      z.push("");
      z.push("## " + b.name + " (" + b.fachname + ")" + kern);
      z.push("Frage: " + b.frage);
      z.push("Qualität: " + b.a.map(function (x, i) { return i + " " + x; }).join(" | "));
      z.push("Digitaler Beitrag: " + b.b.map(function (x, i) { return (i + 1) + " " + x; }).join(" | "));
      if (b.analog) z.push("So geht es auf Papier: " + b.analog);
      if (b.risiko) z.push("Risiko: " + b.risiko);
    });
    z.push("");
    z.push("# Form deiner Antwort");
    z.push("Schreib in einfacher Sprache, in kurzen Sätzen und sprich mich mit »du« an. Halte genau diese Gliederung ein:");
    z.push("1. Besondere Stärke – der stärkste Bereich, mit Fundstellen. Beginne immer damit.");
    z.push("2. Abgedeckte Bereiche – je Zeile: Bereich · Qualität in Worten · digitaler Beitrag in Worten.");
    z.push("3. Beobachtungen am Material – was du gesehen hast, jeweils mit Fundstelle.");
    z.push("4. Tablet oder Papier? – Wo trägt die digitale Form wirklich etwas bei, und wo ginge es auf Papier genauso gut? Nutze die Sätze aus Schritt 3 des Vorgehens.");
    z.push("5. Mögliche Weiterentwicklung – höchstens drei konkrete Schritte" + (typ ? ", zuerst in den wichtigen Bereichen" : "") + ". Fachliche Korrekturen zuerst.");
    z.push("6. Grenzen deiner Einschätzung – was du nicht beurteilen konntest, zum Beispiel Bedienung, Ton, Einsatz im Unterricht.");
    z.push("");
    z.push("# Material");
    z.push("(Datei anhängen oder Text hier einfügen – ohne Namen, Noten oder andere persönliche Daten.)");
    return z.join("\n");
  }

  var api = { baue: baue };
  if (typeof module !== "undefined") module.exports = api;
  wurzel.PRUEFPROMPT = api;
})(typeof window !== "undefined" ? window : globalThis);
