/* Hilde Digital – Regeln des Selbstchecks »Eigenes Material prüfen« (Qualitätsmodell, Fassung 2).

   Grundsätze (Abschnitte 4, 8 und 9 des Modells):
   - Zwei Fragen je Bereich: pädagogische Qualität a (0–4) und digitaler Beitrag b (0–3).
     null heißt »kann ich nicht beurteilen« (N/B), "nr" heißt »für dieses Material nicht relevant« (N/R).
   - Technik rettet keine schwache Aufgabe: Ist a 0 oder 1, zählt b höchstens als 1.
   - Keine Gesamtnote, kein Durchschnitt. Die einzige Zahl über alle Bereiche ist eine Zählung.
   - Stärke-Hinweise nur, wenn der Inhalt fachlich geprüft ist (Mindestbedingung), höchstens drei.
   - Entwicklungsschritte: höchstens drei, in dieser Reihenfolge: fachliche Korrektur,
     Entwicklungsfeld in einem Kernbereich des Materialtyps, Stelle ohne KI (nur Lernangebot mit KI),
     längerer Text auf Papier, ungenutztes digitales Potenzial (ab 4.10).
   - Rahmenfragen mit nurTyp erscheinen nur für diese Materialtypen, mit nurDigital nicht für analoge Typen (rahmenFragen).
   - Ein Selbstcheck einer Person erreicht höchstens »mittlere Sicherheit«.
   Jede Regeländerung braucht einen Test in tests/check-regeln.test.js. */
(function (wurzel) {
  "use strict";
  var Q = typeof module !== "undefined" ? require("./daten/qualitaet.js") : wurzel.QUALITAET;

  function finde(liste, id) {
    for (var i = 0; i < liste.length; i++) if (liste[i].id === id) return liste[i];
    return null;
  }
  function zahl(x) { return typeof x === "number" && isFinite(x) ? x : null; }

  /* Wert b nach der Regel »Technik rettet keine schwache Aufgabe« begrenzen. */
  function begrenzeB(a, b) {
    if (b === "nr") return "nr";
    b = zahl(b);
    a = zahl(a);
    if (b === null) return null;
    b = Math.max(0, Math.min(3, Math.round(b)));
    if (a !== null && a <= 1 && b > 1) return 1;
    return b;
  }

  /* Profil: ein Eintrag je gewähltem Bereich, mit abgeleiteten Begriffen (Abschnitt 8). */
  function profil(e) {
    e = e || {};
    var typ = finde(Q.materialtypen, e.typ);
    var kern = typ ? typ.kern : [];
    var werte = e.werte || {};
    return (e.bereiche || []).map(function (id) {
      var d = finde(Q.bereiche, id);
      if (!d) return null;
      var w = werte[id] || {};
      var a = zahl(w.a);
      if (a !== null) a = Math.max(0, Math.min(4, Math.round(a)));
      var bRoh = w.b;
      var b = a === null ? null : begrenzeB(a, bRoh);
      var bZahl = typeof b === "number" ? b : null;
      var analog = bZahl !== null && bZahl >= 1 ? (finde(Q.analogvergleich, w.analog) ? w.analog : null) : null;
      return {
        id: id, bereich: d, a: a, b: b, analog: analog,
        begrenzt: typeof bRoh === "number" && bZahl !== null && bRoh > bZahl,
        kern: kern.indexOf(id) >= 0,
        staerke: a !== null && a >= 3,
        digitalGetragen: a !== null && a >= 3 && bZahl !== null && bZahl >= 2,
        besonders: a !== null && a >= 3 && bZahl === 3,
        entwicklungsfeld: a !== null && a <= 1 && kern.indexOf(id) >= 0,
        ungenutzt: a !== null && a >= 2 && (bZahl === null || bZahl <= 1) && b !== "nr" && !(typ && typ.digital === false)
      };
    }).filter(Boolean);
  }

  /* Einschätzungssicherheit (Abschnitt 8). Ein Selbstcheck einer Person: höchstens »mittel«. */
  function sicherheit(p, rahmen) {
    rahmen = rahmen || {};
    var bewertet = p.filter(function (x) { return x.a !== null; });
    if (!bewertet.length) return "fehlt";
    var offen = p.some(function (x) { return x.a === null; });
    if (rahmen.vollstaendig !== "ja" || offen) return "vorlaeufig";
    return "mittel";
  }

  /* Mögliche Stärke-Hinweise: höchstens drei, ohne Zahl. Nur wenn der Inhalt fachlich geprüft ist
     und die Sicherheit mindestens »mittel« ist. Digital getragene Hinweise zuerst. */
  function hinweise(p, rahmen) {
    rahmen = rahmen || {};
    if (rahmen.fachlich !== "ja") return [];
    if (sicherheit(p, rahmen) !== "mittel") return [];
    var fachEintrag = p.filter(function (x) { return x.id === "fach"; })[0];
    if (fachEintrag && fachEintrag.a !== null && fachEintrag.a < 2) return [];
    var liste = [], belegt = {};
    Q.hinweise.forEach(function (h) {
      var x = p.filter(function (y) { return y.id === h.bereich; })[0];
      if (!x || x.a === null || belegt[h.bereich]) return;
      var b = typeof x.b === "number" ? x.b : 0;
      if (x.a >= h.aMin && b >= h.bMin) { liste.push(h.name); belegt[h.bereich] = true; }
    });
    if (rahmen.anmeldung === "ja" && rahmen.vorbereitung === "klein") liste.push("geringer technischer Aufwand");
    return liste.slice(0, 3);
  }

  /* Ein Satz je Bereich: verbindet Qualität und Beitrag. */
  function satz(x) {
    var d = x.bereich;
    if (x.a === null) return "Noch nicht beurteilbar. Halte fest, was dir für eine Einschätzung fehlt – oft zeigt es erst der Unterricht.";
    var b = typeof x.b === "number" ? x.b : null;
    if (b === null || x.b === "nr") {
      return x.a >= 3 ? "Diese Stärke entsteht durch die Aufgabe. Die digitale Form spielt hier keine Rolle – das ist kein Mangel."
        : x.a >= 2 ? "Eine Grundlage ist da. Die digitale Form spielt hier keine Rolle."
        : "Hier gibt es noch Raum für Entwicklung.";
    }
    if (b >= 2) {
      var analog = finde(Q.analogvergleich, x.analog);
      return "Ein " + (b === 3 ? "besonderer" : "klarer") + " digitaler Mehrwert zeigt sich hier: " + d.b[b - 1] + "." +
        (analog ? " " + analog.satz : " Wie gut es auf Papier ginge, ist noch offen.");
    }
    if (b === 1) return "Die digitale Form erleichtert die Nutzung, verändert die Qualität aber kaum." + (x.begrenzt ? " Bei einer schwachen Aufgabe zählt Technik höchstens wenig." : "");
    return x.a >= 3 ? "Diese Stärke entsteht durch die Aufgabe. Die digitale Form trägt hier nichts bei – das ist kein Mangel."
      : "Die digitale Form trägt hier nichts bei.";
  }

  /* Gesamtsatz und Zählung. Die Zählung ist kein Durchschnitt und erscheint nur unter dem Profil. */
  function gesamt(p) {
    var bewertet = p.filter(function (x) { return x.a !== null; });
    var klar = bewertet.filter(function (x) { return typeof x.b === "number" && x.b >= 2; });
    var zaehlung = "Klarer digitaler Beitrag in " + klar.length + " von " + bewertet.length + " geprüften Bereichen.";
    var text;
    if (!bewertet.length) text = "Noch ist kein Bereich eingeschätzt.";
    else if (!klar.length) text = "Die Stärken dieses Materials entstehen vor allem durch Aufgaben und Aufbau. Auf Papier wäre es vermutlich gleich gut. Das ist kein Mangel.";
    else text = "Die digitale Form trägt vor allem bei: " + klar.map(function (x) { return x.bereich.name; }).join(", ") + "." +
      (klar.length < bewertet.length ? " In den übrigen Bereichen trägt die digitale Form wenig oder nichts bei." : "");
    return { text: text, zaehlung: zaehlung, klar: klar.length, bewertet: bewertet.length };
  }

  /* Welche Rahmenfragen gelten für diesen Materialtyp? */
  function rahmenFragen(typId) {
    var typ = finde(Q.materialtypen, typId);
    return Q.rahmen.filter(function (r) {
      if (r.nurTyp) return r.nurTyp.indexOf(typId) >= 0;
      if (r.nurDigital) return !(typ && typ.digital === false);
      return true;
    });
  }

  /* Höchstens drei Entwicklungsschritte, in fester Reihenfolge. */
  function schritte(p, rahmen, typId) {
    rahmen = rahmen || {};
    var gilt = {};
    rahmenFragen(typId).forEach(function (r) { gilt[r.id] = true; });
    var l = [];
    if (rahmen.fachlich && rahmen.fachlich !== "ja") {
      l.push({ art: "fachlich", bereich: "fach", text: "Lass den Inhalt fachlich prüfen: Quellen, Zahlen und Begriffe. Fachliche Korrekturen gehen immer vor.", aufwand: "mittel" });
    }
    p.filter(function (x) { return x.entwicklungsfeld; }).forEach(function (x) {
      var naechste = x.bereich.a[Math.min(4, x.a + 1)];
      l.push({ art: "feld", bereich: x.id, text: x.bereich.name + ": Ein nächster Schritt wäre – " + naechste + ".", aufwand: "mittel" });
    });
    if (gilt.ohneKi && rahmen.ohneKi === "nein") {
      l.push({ art: "ohneki", bereich: "rueckmeldung", text: "Plane eine Stelle ohne KI ein, an der die Lernenden zeigen, was sie können – zum Beispiel eine kurze Abfrage in der nächsten Stunde. Mit KI wird das Ergebnis oft besser, gelernt ist es damit noch nicht.", aufwand: "klein" });
    }
    if (gilt.lesen && rahmen.lesen === "ja") {
      l.push({ art: "lesen", bereich: "zugang", text: "Gib den längeren Text zusätzlich auf Papier aus. Lange Sachtexte verstehen viele auf Papier etwas besser, besonders unter Zeitdruck.", aufwand: "klein" });
    }
    p.filter(function (x) { return x.ungenutzt; }).forEach(function (x) {
      l.push({ art: "potenzial", bereich: x.id, text: x.bereich.name + ": Eine einfache digitale Funktion könnte hier helfen – " + x.bereich.b[1] + ".", aufwand: "klein" });
    });
    return l.slice(0, 3);
  }

  /* Grenzen: sachlich, ohne Abwertung. Zuerst offene Punkte im Rahmen (Daten, Rechte, Anmeldung),
     dann die Risiken der Bereiche mit dem stärksten digitalen Beitrag. Höchstens vier. */
  function grenzen(p, rahmen) {
    rahmen = rahmen || {};
    var l = [];
    if (rahmen.daten === "ja") l.push("Das Material verarbeitet personenbezogene Daten. Kläre den Einsatz mit der Schule, bevor du es nutzt.");
    if (rahmen.daten === "unklar") l.push("Ob personenbezogene Daten verarbeitet werden, ist offen. Kläre das vor dem Einsatz.");
    if (rahmen.rechte && rahmen.rechte !== "ja") l.push("Die Rechte an Bildern, Texten oder Medien sind nicht vollständig geklärt. Lass das prüfen, bevor du das Material weitergibst.");
    if (rahmen.anmeldung === "nein") l.push("Anmeldung oder Installation kosten Zeit in der Stunde. Plane dafür einen Puffer ein.");
    p.filter(function (x) { return typeof x.b === "number" && x.b >= 1; })
      .sort(function (a, b) { return b.b - a.b; })
      .forEach(function (x) { l.push(x.bereich.name + ": " + x.bereich.risiko); });
    return l.slice(0, 4);
  }

  function bericht(e) {
    e = e || {};
    var p = profil(e);
    var r = e.rahmen || {};
    return {
      profil: p,
      staerken: p.filter(function (x) { return x.staerke; }).slice(0, 5),
      hinweise: hinweise(p, r),
      gesamt: gesamt(p),
      schritte: schritte(p, r, e.typ),
      grenzen: grenzen(p, r),
      sicherheit: sicherheit(p, r),
      fachlichOffen: r.fachlich !== "ja",
      saetze: p.map(function (x) { return { id: x.id, text: satz(x) }; })
    };
  }

  var CHECK = { begrenzeB: begrenzeB, profil: profil, sicherheit: sicherheit, hinweise: hinweise, rahmenFragen: rahmenFragen,
    satz: satz, gesamt: gesamt, schritte: schritte, grenzen: grenzen, bericht: bericht };
  if (typeof module !== "undefined") module.exports = CHECK;
  else wurzel.CHECK = CHECK;
})(this);
