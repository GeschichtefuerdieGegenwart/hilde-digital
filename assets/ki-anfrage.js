/* Hilde-Digital – baut aus den Antworten im KI-Weg eine transparente Anfrage (Prompt).
   Keine KI-Anbindung: Die Anfrage wird nur angezeigt und kann kopiert werden.
   Eingabe: { ziel, form, kontext: { fach, thema, gruppe, niveau, besonderes } }
   Ausgabe: { ziel, kontext, anforderungen, format, pruefkriterien } als Texte, dazu alsText(). */
(function (wurzel) {
  "use strict";
  var K = typeof module !== "undefined" ? require("./daten/texte.js") : wurzel.KI_TEXTE;

  function finde(liste, id) {
    for (var i = 0; i < liste.length; i++) if (liste[i].id === id) return liste[i];
    return null;
  }
  function sauber(t) { return String(t || "").replace(/\s+/g, " ").trim(); }

  /* Welche Ergebnisformen passen zum Ziel? */
  function formenFuer(zielId) {
    var z = finde(K.ziele, zielId);
    var ids = z ? z.formen : K.formen.map(function (f) { return f.id; });
    return ids.map(function (id) { return finde(K.formen, id); }).filter(Boolean);
  }

  function bausteine(a) {
    a = a || {};
    var k = a.kontext || {};
    var z = finde(K.ziele, a.ziel);
    var f = finde(K.formen, a.form);

    var ziel = "Du unterstützt mich als Lehrkraft an einer beruflichen Schule. " +
      (z ? z.auftrag : "Hilf mir bei der Vorbereitung meines Unterrichts.") +
      (f ? " Am Ende brauche ich " + f.akk + "." : "");

    var zeilen = [];
    if (sauber(k.fach)) zeilen.push("Fach oder Lernbereich: " + sauber(k.fach));
    if (sauber(k.thema)) zeilen.push("Thema: " + sauber(k.thema));
    if (sauber(k.gruppe)) zeilen.push("Lerngruppe: " + sauber(k.gruppe));
    var niveau = finde(K.niveaus, k.niveau);
    if (niveau && niveau.id) zeilen.push("Niveau: " + niveau.name);
    if (sauber(k.besonderes)) zeilen.push("Besonderheiten: " + sauber(k.besonderes));
    if (!sauber(k.fach) || !sauber(k.thema)) zeilen.push("Frage mich zuerst nach Fach und Thema, bevor du beginnst.");
    if (z && (z.id === "vereinfachen" || z.id === "strukturieren")) zeilen.push("Ausgangstext: (hier einfügen, ohne Namen oder andere persönliche Daten)");

    var anf = K.anforderungen.slice();
    if (f && f.analog) anf.unshift(f.analog);

    return {
      ziel: ziel,
      kontext: zeilen.join("\n"),
      anforderungen: anf.map(function (x) { return "- " + x; }).join("\n"),
      format: f ? f.format : "Wähle eine übersichtliche Form mit Zwischenüberschriften.",
      pruefkriterien: "Prüfe dein Ergebnis am Ende selbst:\n" + K.pruefkriterien.map(function (x) { return "- " + x; }).join("\n")
    };
  }

  /* Zusammensetzen – mit den (ggf. von der Lehrkraft bearbeiteten) Bausteinen. */
  function alsText(b) {
    return K.bausteine.map(function (x) {
      var t = sauber(b[x.id]) ? String(b[x.id]).trim() : "";
      return t ? x.name + ":\n" + t : "";
    }).filter(Boolean).join("\n\n");
  }

  function pruefliste(zielId) {
    var l = K.pruefliste.slice();
    if (K.prueflisteZiel[zielId]) l.splice(l.length - 1, 0, K.prueflisteZiel[zielId]);
    return l;
  }

  var KI_ANFRAGE = { formenFuer: formenFuer, bausteine: bausteine, alsText: alsText, pruefliste: pruefliste };
  if (typeof module !== "undefined") module.exports = KI_ANFRAGE;
  else wurzel.KI_ANFRAGE = KI_ANFRAGE;
})(this);
