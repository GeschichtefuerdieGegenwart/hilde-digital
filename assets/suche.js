/* Hilde-Digital – Suche und Filter im Showroom.
   Filter sind kombinierbar. Gibt es keinen exakten Treffer, werden die Filter kontrolliert gelockert:
   Jedes Beispiel bekommt intern Punkte für jeden erfüllten Filter (Anliegen 3, Phase 2, Bereich 2,
   Umfang 1, Rolle 1, Fach 1, KI-Einsatz 1). Gezeigt werden die nächstpassenden, höchstens sechs,
   mit dem Hinweis, dass es kein exaktes Beispiel gibt. Eine Freitextsuche ohne Treffer wird benannt;
   dann wird nur über die Filter gelockert.
   Filter: { bereich, phase, anliegen, umfang, rolle, fach, ki }  – leer oder "alle" = nicht gesetzt. */
(function (wurzel) {
  "use strict";
  var T = typeof module !== "undefined" ? require("./daten/taxonomien.js") : wurzel.TAXONOMIEN;

  var GEWICHT = { anliegen: 3, phase: 2, bereich: 2, umfang: 1, rolle: 1, fach: 1, ki: 1 };
  var REIHENFOLGE = ["bereich", "phase", "anliegen", "umfang", "rolle", "fach", "ki"];

  function gesetzt(w) { return w !== undefined && w !== null && w !== "" && w !== "alle"; }

  function passt(b, feld, wert) {
    switch (feld) {
      case "bereich":
        if (wert === "beide") return b.bereich === "beide" || b.kiEinsatz === "entwicklung-anwendung";
        return b.bereich === wert || b.bereich === "beide";
      case "phase": return b.phasen.indexOf(wert) > -1;
      case "anliegen": return b.anliegen.indexOf(wert) > -1;
      case "umfang": return b.umfang === wert;
      case "rolle": return b.rollen.indexOf(wert) > -1;
      case "fach": return b.faecher.indexOf(wert) > -1;
      case "ki": return b.kiEinsatz === wert;
    }
    return true;
  }

  function normal(t) {
    return String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss");
  }

  function heuhaufen(b) {
    var n = function (liste, ids) { return ids.map(function (i) { return T.name(liste, i); }); };
    return normal([b.titel, b.kurz, b.fach, b.status, b.beschreibung || ""]
      .concat(b.suchbegriffe, b.faecher, n("anliegen", b.anliegen), n("phasen", b.phasen), n("rollen", b.rollen), n("mehrwerte", b.mehrwerte))
      .join(" "));
  }

  function suchePasst(b, suche) {
    var woerter = normal(suche).split(/\s+/).filter(Boolean);
    if (!woerter.length) return true;
    var h = heuhaufen(b);
    return woerter.every(function (w) { return h.indexOf(w) > -1; });
  }

  function aktive(filter) {
    return REIHENFOLGE.filter(function (f) { return filter && gesetzt(filter[f]); });
  }

  function finde(beispiele, filter, suche) {
    filter = filter || {};
    var felder = aktive(filter);
    var mitSuche = String(suche || "").trim() !== "";
    var nachSuche = beispiele.filter(function (b) { return suchePasst(b, suche); });
    var suchtrefferLeer = mitSuche && nachSuche.length === 0;
    var basis = suchtrefferLeer ? beispiele : nachSuche;

    var genau = basis.filter(function (b) {
      return felder.every(function (f) { return passt(b, f, filter[f]); });
    });
    if (genau.length && !suchtrefferLeer) return { treffer: genau, gelockert: false, suchtrefferLeer: false, felder: felder };
    if (!felder.length) return { treffer: suchtrefferLeer ? [] : genau, gelockert: false, suchtrefferLeer: suchtrefferLeer, felder: felder };

    var gewertet = basis.map(function (b, i) {
      var p = 0;
      felder.forEach(function (f) { if (passt(b, f, filter[f])) p += GEWICHT[f]; });
      return { b: b, p: p, i: i };
    }).filter(function (g) { return g.p > 0; });
    gewertet.sort(function (x, y) { return y.p - x.p || x.i - y.i; });
    return { treffer: gewertet.slice(0, 6).map(function (g) { return g.b; }), gelockert: true, suchtrefferLeer: suchtrefferLeer, felder: felder };
  }

  var SUCHE = { finde: finde, passt: passt, suchePasst: suchePasst, aktive: aktive, REIHENFOLGE: REIHENFOLGE };
  if (typeof module !== "undefined") module.exports = SUCHE;
  else wurzel.SUCHE = SUCHE;
})(this);
