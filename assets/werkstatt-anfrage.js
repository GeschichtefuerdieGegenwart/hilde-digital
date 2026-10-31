/* Hilde Digital – baut die Texte der Werkstatt-Seiten (ab Version 4.9).
   auftrag(def, eingabe, S):  ein kopierbarer Auftrag aus einem Muster oder einem Werkstatt-Auftrag.
                              Gleiche fünf Teile wie die Schnell-Anfrage; gebaut mit SCHNELL_ANFRAGE.baue.
                              Fehlt Fach, Thema oder Lerngruppe, fragt die KI zuerst danach.
   fach(eingabe, W):          die feste Anweisung für ein Fach (Seite »KI für dein Fach einrichten«).
   Keine KI-Anbindung: Es entsteht nur Text zum Kopieren. Tests: tests/werkstatt.test.js */
(function (wurzel) {
  "use strict";
  var SA = typeof module !== "undefined" && typeof require !== "undefined" ? require("./schnell-anfrage.js") : wurzel.SCHNELL_ANFRAGE;

  function sauber(t) { return String(t || "").replace(/\s+/g, " ").trim(); }

  function auftrag(def, eingabe, S) {
    if (!def) return "";
    S = S || wurzel.SCHNELL;
    eingabe = eingabe || {};
    var e = { anlass: def.id, fach: eingabe.fach, thema: eingabe.thema, gruppe: eingabe.gruppe };
    return SA.baue(e, { anlaesse: [def], immer: (S && S.immer) || [] });
  }

  function fach(eingabe, W) {
    W = W || wurzel.WERKSTATT;
    eingabe = eingabe || {};
    var name = sauber(eingabe.fach) || "[Fach]";
    var gruppe = sauber(eingabe.gruppe);
    var anrede = eingabe.anrede === "Sie" ? "Sie" : "du";
    var massstaebe = String(eingabe.massstaebe || "").split(/\n+/).map(sauber).filter(Boolean)
      .map(function (z) { return z.replace(/^[-–•]\s*/, ""); });
    var teile = [];
    teile.push("# Feste Anweisung für mein Fach");
    teile.push("Ich unterrichte " + name + (gruppe ? " – " + gruppe : "") + ".");
    teile.push("## Was in meinem Fach gilt\n" + (massstaebe.length
      ? massstaebe.map(function (m) { return "- " + m; }).join("\n")
      : "- Frag mich zuerst, was in meinem Fach eine gute Aufgabe ausmacht. Beginne erst danach."));
    teile.push("## So arbeitest du mit mir\n" + W.fachRegeln.map(function (r) { return "- " + r; }).join("\n") +
      "\n- Material für Lernende schreibst du in einfacher Sprache mit der Anrede »" + anrede + "«.");
    return teile.join("\n\n");
  }

  var api = { auftrag: auftrag, fach: fach };
  if (typeof module !== "undefined") module.exports = api;
  wurzel.WERKSTATT_ANFRAGE = api;
})(typeof window !== "undefined" ? window : globalThis);
