/* Hilde Digital – baut eine Schnell-Anfrage aus Anlass und drei Angaben (Fach, Thema, Lerngruppe).
   Gleiche fünf Teile wie im Weg »Prompten lernen«. Fehlt eine Angabe, fragt die KI zuerst danach.
   Keine KI-Anbindung: Es entsteht nur Text zum Kopieren. Tests: tests/schnell.test.js */
(function (wurzel) {
  "use strict";
  function sauber(t) { return String(t || "").replace(/\s+/g, " ").trim(); }
  function liste(l) { return l.map(function (x) { return "- " + x; }).join("\n"); }

  function baue(eingabe, S) {
    S = S || wurzel.SCHNELL;
    eingabe = eingabe || {};
    var a = S.anlaesse.filter(function (x) { return x.id === eingabe.anlass; })[0];
    if (!a) return "";
    var fach = sauber(eingabe.fach), thema = sauber(eingabe.thema), gruppe = sauber(eingabe.gruppe);
    var fehlt = [];
    if (!fach) fehlt.push("Fach"); if (!thema) fehlt.push("Thema"); if (!gruppe) fehlt.push("Lerngruppe");
    var kontext = [];
    if (fach) kontext.push("Fach: " + fach);
    if (thema) kontext.push("Thema: " + thema);
    if (gruppe) kontext.push("Lerngruppe: " + gruppe);
    if (fehlt.length) kontext.push("Frage mich zuerst nach: " + fehlt.join(", ") + ". Beginne erst danach.");
    var teile = [
      "# Ziel\n" + a.ziel,
      "# Kontext\n" + kontext.join("\n"),
      "# Anforderungen\n" + liste(a.anforderungen.concat(S.immer)),
      "# Format\n" + a.format,
      "# Prüfkriterien\nPrüfe dein Ergebnis am Ende selbst und sag mir, wo ich nachsehen sollte:\n" + liste(a.pruef)
    ];
    if (a.material) teile.push("# Material\n(Hier dein Material einfügen oder anhängen – ohne Namen, Noten oder andere personenbezogene Daten.)");
    return teile.join("\n\n");
  }

  var api = { baue: baue };
  if (typeof module !== "undefined") module.exports = api;
  wurzel.SCHNELL_ANFRAGE = api;
})(typeof window !== "undefined" ? window : globalThis);
