/* Hilde Digital – baut den Prompt für »Unterricht digitalisieren«.
   Eingabe: fach, thema, gruppe, phase (Ids aus TAXONOMIEN.phasen), materialien [], vorhaben, umfang, ausgabe.
   Der Prompt enthält: Ausgangslage, Auftrag, die Leitfrage »Was kann das Tablet besser als Papier?«,
   die passenden Bereiche des Qualitätsmodells (Frage, guter digitaler Beitrag, so geht es auf Papier, Risiko),
   Regeln gegen Ablenkung, Regeln des Projekts und die Form der Antwort.
   Keine KI-Anbindung. Tests: tests/digitalisieren.test.js */
(function (wurzel) {
  "use strict";
  function sauber(t) { return String(t || "").replace(/\s+/g, " ").trim(); }
  function finde(liste, id) { return (liste || []).filter(function (x) { return x.id === id; })[0] || null; }
  function liste(l) { return l.map(function (x) { return "- " + x; }).join("\n"); }

  function baue(e, D, Q, T) {
    D = D || wurzel.DIGITALISIEREN; Q = Q || wurzel.QUALITAET; T = T || wurzel.TAXONOMIEN;
    e = e || {};
    var v = finde(D.vorhaben, e.vorhaben);
    if (!v) return "";
    var mats = (e.materialien || []).map(function (id) { return finde(D.materialien, id); }).filter(Boolean);
    var phase = T && e.phase ? finde(T.phasen, e.phase) : null;
    var umfang = finde(D.umfang, e.umfang || "");
    var ausgabe = finde(D.ausgaben, e.ausgabe) || D.ausgaben[0];
    var fach = sauber(e.fach), thema = sauber(e.thema), gruppe = sauber(e.gruppe);

    var lage = [];
    lage.push("Fach: " + (fach || "noch offen"));
    lage.push("Thema: " + (thema || "noch offen"));
    lage.push("Lerngruppe: " + (gruppe || "noch offen"));
    if (phase && phase.id !== "offen") lage.push("Unterrichtsphase: " + phase.name);
    lage.push(mats.length ? "Ich hänge an: " + mats.map(function (m) { return m.name; }).join(", ") + "." : "Ich beschreibe meinen Unterricht unten in eigenen Worten.");
    var fehlt = [fach ? "" : "Fach", thema ? "" : "Thema", gruppe ? "" : "Lerngruppe"].filter(Boolean);
    if (fehlt.length) lage.push("Frage mich zuerst nach: " + fehlt.join(", ") + ".");

    var bereiche = v.bereiche.map(function (id) { return finde(Q.bereiche, id); }).filter(Boolean);
    var z = [];
    z.push("# Rolle\nDu bist eine erfahrene Fachdidaktikerin für digitalen Unterricht und berätst eine Lehrkraft kollegial. Mein Unterricht funktioniert schon. Hilf mir, ihn dort zu verbessern, wo das Tablet wirklich etwas beiträgt.");
    z.push("# Ausgangslage\n" + lage.join("\n"));
    z.push("# Auftrag\n" + v.auftrag + (umfang && umfang.id && v.id !== "ideen" ? "\nUmfang: " + umfang.name + " (" + umfang.hilfe + ")." : ""));
    z.push("# Leitfrage\nWas kann das Tablet hier besser als Papier? Beantworte das für jeden Vorschlag in einem Satz. Wählen kannst du zwischen: " +
      Q.analogvergleich.map(function (a) { return "»" + a.satz + "«"; }).join(" ") + " Wenn Papier gleich gut ist, sag das und empfiehl analog oder hybrid.");
    z.push("# Worauf es ankommt\n" + bereiche.map(function (b) {
      return "## " + b.name + "\nFrage: " + b.frage + "\nEchter digitaler Beitrag: " + b.b.slice(1).join("; ") + "\nSo geht es auf Papier: " + b.analog + "\nRisiko: " + b.risiko;
    }).join("\n\n"));
    z.push("# Aufmerksamkeit und Ablenkung\nPlane so, dass das Tablet nicht ablenkt:\n" + liste(D.ablenkung));
    z.push("# Regeln\n" + liste([
      "Technik rettet keine schwache Aufgabe: Erst muss die Aufgabe gut sein, dann kann das Tablet helfen.",
      "Motivation allein ist kein Lernmehrwert.",
      "»Analog oder hybrid« ist ein vollwertiges Ergebnis.",
      "Erfinde keine Quellen, Zahlen oder App-Funktionen. Kennzeichne, was ich prüfen muss.",
      "Keine Noten, keine Prozentwerte."
    ]));
    z.push("# Form deiner Antwort\n" + liste(v.antwort.concat([ausgabe.satz, "Schreib in einfacher Sprache und sprich mich mit »du« an."])));
    z.push("# Material\n(" + (mats.length ? "Hier " + mats.map(function (m) { return m.akk; }).join(" und ") + " anhängen oder einfügen" : "Hier deinen Unterricht kurz beschreiben") + " – ohne Namen, Noten oder andere personenbezogene Daten.)");
    return z.join("\n\n");
  }

  var api = { baue: baue };
  if (typeof module !== "undefined") module.exports = api;
  wurzel.DIGITALISIEREN_PROMPT = api;
})(typeof window !== "undefined" ? window : globalThis);
