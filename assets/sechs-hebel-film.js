/* Kidu – Erklärfilm »Was das Gerät kann« (sechs-hebel-film.html), ab Version 4.21. Muster AW in DESIGN.md.

   Sieben Kapitel, rund zwei Minuten, ein Satz oben je Takt, keine Stimme. Vorbild: Erklärfilm M22 (Drehbuch-Tabelle,
   Kapitel und »Du bist hier« immer im Bild) und assets/film.js (Zeitachse T in Sekunden, jedes Bild wird aus T berechnet).
   Weil jedes Bild aus T folgt, kann man ziehen (Regler), anhalten, zu Kapiteln springen und mit Pfeiltasten wechseln.
   Start nur auf Knopfdruck (Reader-Paced Rule), davor die Frage »Wann lohnt sich das Tablet?«. Hält an, wenn der Tab
   verdeckt wird. Bewegt werden nur transform und opacity. Der Satz oben baut sich wortweise auf (höchstens 2,4 s;
   bewegung-als-lernmittel: Textaufbau nur, wenn der Satz der Lerngegenstand ist); für Hilfstechnik wird jeder Satz
   vollständig über aria-live angesagt. Kein Jubel, keine Belohnung. Zahlen heißen Beispiel oder Modell.
   »Weniger Bewegung« (Schalter oder Systemeinstellung): sieben Standbilder, »Weiter« blättert; der Regler rastet auf Kapitel.
   Ohne JavaScript: Startkarte mit Hinweis, darunter der ganze Text. Nichts wird gespeichert.
   Braucht: HILDE (ruhig) aus hilde.js – fällt ohne HILDE auf die Systemeinstellung zurück. */
(function () {
  "use strict";
  var hf = document.getElementById("hf");
  if (!hf) return;
  hf.classList.add("hf-js");
  var rahmen = document.getElementById("hf-rahmen"), buehne = document.getElementById("hf-buehne");
  var bild = document.getElementById("hf-bild"), satzEl = document.getElementById("hf-satz"), metaEl = document.getElementById("hf-meta");
  var ansage = document.getElementById("hf-ansage"), start = document.getElementById("hf-start"), los = document.getElementById("hf-los");
  var ende = document.getElementById("hf-ende"), nochmal = document.getElementById("hf-nochmal");
  var halt = document.getElementById("hf-halt"), regler = document.getElementById("hf-regler"), zeitEl = document.getElementById("hf-zeit");
  var kapKnoepfe = [].slice.call(hf.querySelectorAll("#hf-kapitel button"));

  var KAPITEL = ["Der Schnellhefter", "Sechs Hebel", "Drei Beispiele", "Die anderen drei", "Zurück in den Raum", "Keiner? Dann Papier.", "Jetzt du"];
  var CUE = [0, 15, 30, 58, 78, 98, 110], ENDE = 120;
  var SAETZE = [
    [0, "Ein Arbeitsblatt auf dem Tablet ist immer noch ein Arbeitsblatt."], [7.5, "Wann lohnt sich das Gerät wirklich?"],
    [15, "Das Gerät kann sechs Dinge, die Papier nicht kann."],
    [30, "Verdecken: Erst entscheiden, dann sehen, was geschah."], [39.6, "Rückmelden: Die Antwort kommt sofort – und sagt, warum."], [48.9, "Bündeln: Die Klasse sieht sich als Ganzes – ohne Namen."],
    [58, "Messen: Die Zeit geht ins Deuten, nicht ins Auszählen."], [65, "Variieren: Eine Grenze verschieben – und sehen, was folgt."], [71.7, "Stufen: Ein Inhalt, drei Zugänge – ohne dass es jemand sieht."],
    [78, "Was am Gerät entsteht, gehört zurück in den Raum."], [86.5, "Dort wird gedeutet, gestritten, geurteilt – ohne Gerät."],
    [98, "Greift kein Hebel, bleibt es Papier. Das ist ein gutes Ergebnis."],
    [110, "Probier es an deiner Stunde. Erst festlegen, dann bewegt sich etwas."]
  ];

  function ruhig() {
    if (window.HILDE && HILDE.ruhig) return HILDE.ruhig();
    return !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  /* Kurven wie in assets/film.js */
  var E = {
    aus: function (t) { t -= 1; return t * t * t + 1; },
    beide: function (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
    feder: function (t) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
  };
  function an(kurve, s, d) { return function (T) { if (T <= s) return 0; if (T >= s + d) return 1; return kurve((T - s) / d); }; }
  var rein = function (s, d) { return an(E.aus, s, d || 0.6); };
  var gleiten = function (s, d) { return an(E.beide, s, d || 0.8); };
  var hupf = function (s, d) { return an(E.feder, s, d || 0.45); };
  var lerp = function (a, b, p) { return a + (b - a) * p; };
  var klemm = function (x) { return Math.max(0, Math.min(1, x)); };

  function el(tag, klasse, eltern, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text) e.textContent = text;
    if (eltern) eltern.appendChild(e);
    return e;
  }
  function stil(e, o) { for (var k in o) e.style[k] = o[k]; }
  function zeigen(e, s) { e.style.display = s ? "" : "none"; }
  function erscheint(e, p, dy) { stil(e, { opacity: p, transform: "translateY(" + ((1 - p) * (dy || 8)) + "px)" }); }
  /* Zeichen als SVG über den HTML-Parser (kein Namensraum im Skript nötig) */
  function svg(inhalt, groesse, farbe) {
    var h = document.createElement("span"); h.className = "hf-zeichen";
    h.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="' + groesse + '" height="' + groesse + '">' + inhalt + "</svg>";
    h.style.color = farbe || "var(--lernen)"; return h;
  }

  var HEBEL = [
    ["Verdecken", '<rect x="3" y="9" width="18" height="6" fill="currentColor"/>', "hält die Auflösung zurück."],
    ["Rückmelden", '<path d="M4 5h16v10H9l-5 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8 10l2.5 2.5L16 7.5" fill="none" stroke="currentColor" stroke-width="2"/>', "antwortet sofort, mit Grund."],
    ["Messen", '<circle cx="12" cy="13" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 13V8M10 2h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>', "misst, teilt zu, rechnet aus."],
    ["Variieren", '<path d="M3 12h18" fill="none" stroke="currentColor" stroke-width="2"/><rect x="13" y="7" width="4" height="10" fill="currentColor"/>', "verschiebt einen Wert, zeigt die Folge."],
    ["Stufen", '<path d="M3 20h6v-5h6v-5h6" fill="none" stroke="currentColor" stroke-width="2"/>', "ein Inhalt, mehrere Zugänge."],
    ["Bündeln", '<path d="M3 19a9 9 0 0 1 18 0z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="15.5" r="1.5" fill="currentColor"/><circle cx="12" cy="13.5" r="1.5" fill="currentColor"/><circle cx="16" cy="15.5" r="1.5" fill="currentColor"/>', "sammelt die Klasse ohne Namen."]
  ];
  /* Plätze der sechs Kacheln auf einem Rad der Größe 1 (Mitte 0,5): oben, dann im Uhrzeigersinn */
  var PLAETZE = [[0.5, 0.095], [0.853, 0.298], [0.853, 0.702], [0.5, 0.905], [0.147, 0.702], [0.147, 0.298]];

  var teile = [];

  /* Ein Kapitelrahmen: nur sichtbar in seinem Zeitfenster */
  function kapitel(k) {
    var b = el("div", "hf-kap", bild);
    var von = CUE[k], bis = k + 1 < CUE.length ? CUE[k + 1] : ENDE;
    teile.push(function (T) { zeigen(b, T >= von && T < bis); });
    return b;
  }

  /* Bausteine */
  function blatt(eltern, x, y, breite, hoehe) {
    var b = el("div", "hf-blatt", eltern);
    stil(b, { left: x + "px", top: y + "px", width: breite + "px", height: hoehe + "px" });
    [["70%", 18, "var(--text)"], ["100%", 10], ["92%", 10], ["96%", 10], ["60%", 10], ["40%", 10, "var(--text)", 10], ["100%", 10], ["88%", 10]].forEach(function (z) {
      var l = el("div", "hf-zeile", b); stil(l, { width: z[0], height: z[1] + "px", background: z[2] || "var(--karton)", marginTop: (z[3] || 0) + "px" });
    });
    el("div", "hf-feld", b); el("div", "hf-feld", b);
    return b;
  }
  function kachel(eltern, i, groesse) {
    var k = el("div", "hf-kachel", eltern);
    k.appendChild(svg(HEBEL[i][1], Math.round(groesse * 0.29)));
    var v = el("span", "hf-verb", k, HEBEL[i][0]); v.style.fontSize = Math.round(groesse * 0.235) + "px";
    stil(k, { width: Math.round(groesse * 1.75) + "px", height: groesse + "px" });
    return k;
  }
  /* Das Hebelrad in Filmgröße */
  function rad(eltern, x, y, groesse) {
    var r = el("div", "hf-rad", eltern); stil(r, { left: x + "px", top: y + "px", width: groesse + "px", height: groesse + "px" });
    var ring = el("div", "hf-ring", r);
    var mitte = el("div", "hf-mitte", r); stil(mitte, { left: "30.4%", top: "30.4%", width: "39.3%", height: "39.3%" });
    el("span", "hf-mitte-leise", mitte, "Im Gerät"); el("span", "hf-mitte-titel", mitte, "Sechs Hebel");
    var kh = groesse * 0.172;
    var kacheln = HEBEL.map(function (h, i) {
      var k = kachel(r, i, kh);
      stil(k, { position: "absolute", left: (PLAETZE[i][0] * groesse - kh * 1.75 / 2) + "px", top: (PLAETZE[i][1] * groesse - kh / 2) + "px" });
      return k;
    });
    return { r: r, ring: ring, mitte: mitte, kacheln: kacheln };
  }
  function tipp(eltern, x, y, t0) {
    var b = el("div", "hf-tipp", eltern); stil(b, { left: x + "px", top: y + "px" });
    var ring = el("i", "hf-tipp-ring", b), punkt = el("i", "hf-tipp-punkt", b);
    return function (T) {
      var i = rein(t0, 0.5)(T), r = rein(t0 + 0.5, 0.6)(T), o = gleiten(t0 + 1.2, 0.4)(T);
      var sicht = i > 0 && o < 1; zeigen(b, sicht); if (!sicht) return;
      b.style.opacity = i * (1 - o);
      stil(ring, { transform: "scale(" + (0.3 + r * 1.2) + ")", opacity: r > 0 ? 1 - r : 0 });
      punkt.style.transform = "translate(" + (1 - i) * 60 + "px," + (1 - i) * 70 + "px)";
    };
  }
  function spalte(eltern, x, titelIndex) {
    var s = el("div", "hf-spalte", eltern); stil(s, { left: x + "px", top: "150px", width: "368px", height: "500px" });
    var kopf = el("p", "hf-spalte-kopf", s); kopf.appendChild(svg(HEBEL[titelIndex][1], 26)); el("span", "", kopf, HEBEL[titelIndex][0]);
    var jetzt = el("span", "hf-jetzt", kopf, "● jetzt");
    var innen = el("div", "hf-spalte-innen", s);
    var fuss = el("p", "hf-spalte-fuss", s);
    return { s: s, innen: innen, fuss: fuss, jetzt: jetzt };
  }
  function aktiv(sp, an) { sp.s.classList.toggle("hf-aktiv", an); sp.jetzt.style.opacity = an ? 1 : 0; }
  function chip(eltern, text, voll) { var c = el("span", "hf-chip" + (voll ? " voll" : ""), eltern, text); return c; }

  /* Kapitel 1 · Der Schnellhefter */
  (function () {
    var b = kapitel(0);
    var papier = blatt(b, 180, 190, 300, 380);
    var tab = el("div", "hf-tablet", b); stil(tab, { left: "760px", top: "170px", width: "360px", height: "420px" });
    var kopie = blatt(b, 180, 190, 300, 380);
    var pfeil = el("div", "hf-pfeil", b); stil(pfeil, { left: "560px", top: "340px" });
    pfeil.innerHTML = '<svg width="120" height="40" viewBox="0 0 96 40" aria-hidden="true"><path d="M4 20h80M66 6l18 14-18 14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>AirDrop, Cloud</span>';
    var l1 = el("p", "hf-label", b, "Auf Papier"); stil(l1, { left: "180px", top: "590px", width: "300px" });
    var l2 = el("p", "hf-label", b, "Auf dem Tablet – gleich"); stil(l2, { left: "760px", top: "610px", width: "360px" });
    teile.push(function (T) {
      if (T >= CUE[1]) return;
      erscheint(papier, rein(0.5, 0.8)(T), 20);
      erscheint(tab, rein(2.2, 0.8)(T), 20);
      var w = gleiten(3.2, 1.3)(T);
      stil(kopie, { opacity: rein(3.0, 0.3)(T), transform: "translate(" + lerp(0, 610, w) + "px," + lerp(0, 0, w) + "px)" });
      erscheint(pfeil, rein(2.6)(T) * (1 - 0.4 * w), 0);
      erscheint(l1, rein(5.0)(T)); erscheint(l2, rein(5.6)(T));
    });
  })();

  /* Kapitel 2 · Sechs Hebel: das Rad baut sich auf */
  (function () {
    var b = kapitel(1);
    var R = rad(b, 120, 150, 440);
    var liste = el("div", "hf-liste", b); stil(liste, { left: "640px", top: "190px", width: "560px" });
    var zeilen = HEBEL.map(function (h) { var p = el("p", "", liste); el("b", "", p, h[0]); p.appendChild(document.createTextNode(" – " + h[2])); return p; });
    var hinweis = el("p", "hf-leise", liste, "Keine Reihenfolge: Jeder Hebel ist gleich wichtig. Eine Stunde braucht meist einen.");
    teile.push(function (T) {
      if (T < CUE[1] || T >= CUE[2]) return;
      var s = CUE[1];
      erscheint(R.mitte, rein(s + 0.5, 0.7)(T), 0); R.ring.style.opacity = rein(s + 1.0, 0.8)(T);
      R.kacheln.forEach(function (k, i) { var p = rein(s + 2 + i * 1.5, 0.6)(T); erscheint(k, p, 10); });
      zeilen.forEach(function (z, i) { erscheint(z, rein(s + 2.2 + i * 1.5, 0.6)(T), 10); });
      erscheint(hinweis, rein(s + 11.5)(T));
    });
  })();

  /* Kapitel 3 · Drei Beispiele: Verdecken, Rückmelden, Bündeln */
  (function () {
    var b = kapitel(2), s0 = CUE[2], L = (CUE[3] - CUE[2]) / 3;
    var zeiten = [s0, s0 + L, s0 + 2 * L];

    /* Verdecken · Drei Dilemmata (M20) */
    var A = spalte(b, 56, 0); A.fuss.textContent = "Drei Dilemmata (M20) · Geschichte · im Unterricht erprobt";
    var at = el("p", "hf-leise", A.innen, "Was man damals nicht wissen konnte:");
    [["100%"], ["94%"]].forEach(function (z) { var l = el("div", "hf-zeile", A.innen); stil(l, { width: z[0], height: "12px", background: "var(--karton)" }); });
    /* geschwärzte Stellen: unter dem Balken liegt die Textzeile, die beim Aufdecken sichtbar wird */
    function geschwaerzt(reihe, breite) { var d = el("div", "hf-deck", reihe); d.style.width = breite; var z = el("div", "hf-zeile", d); stil(z, { width: "100%", height: "12px", background: "var(--leise)" }); return el("div", "hf-balken", d); }
    var r1 = el("div", "hf-reihe", A.innen); var bal1 = geschwaerzt(r1, "48%"); var z1 = el("div", "hf-zeile", r1); stil(z1, { width: "44%", height: "12px", background: "var(--karton)" });
    var l3 = el("div", "hf-zeile", A.innen); stil(l3, { width: "90%", height: "12px", background: "var(--karton)" });
    var r2 = el("div", "hf-reihe", A.innen); var z2 = el("div", "hf-zeile", r2); stil(z2, { width: "30%", height: "12px", background: "var(--karton)" }); var bal2 = geschwaerzt(r2, "28%");
    var chips1 = el("div", "hf-chips", A.innen); chips1.style.marginTop = "auto";
    var c11 = chip(chips1, "Die Klasse hat abgestimmt"), c12 = chip(chips1, "Aufdecken", true);

    /* Rückmelden · Politik-Werkstatt */
    var B = spalte(b, 456, 1); B.fuss.textContent = "Politik-Werkstatt · Gemeinschaftskunde · im Unterricht erprobt";
    el("p", "hf-leise", B.innen, "Beispiel 7 von 12 · Welche Aufgabe einer Partei ist das?");
    el("p", "hf-fett", B.innen, "»Ein Verband sammelt Unterschriften gegen eine Umgehungsstraße.«");
    var chips2 = el("div", "hf-chips", B.innen);
    var cp = chip(chips2, "Passt"), cv = chip(chips2, "Vertretbar"), ce = chip(chips2, "Eher nicht");
    var grund = el("p", "hf-grund", B.innen); grund.innerHTML = "Vertretbar – <b>weil</b> Interessen bündeln auch Verbände tun; Parteien wollen aber Mandate.";
    var tippB = tipp(B.innen, 150, 118, zeiten[1] + 2.4);

    /* Bündeln · Halbrund */
    var C = spalte(b, 856, 5); C.fuss.textContent = "Drei Dilemmata (M20) · Abstimmung am Beamer · Beispiel";
    el("p", "hf-leise", C.innen, "Dilemma 2 · 24 Stimmen · Beispiel");
    var halb = el("div", "hf-halbrund", C.innen);
    var punkte = [];
    [[300, 3], [240, 5], [180, 7], [120, 9]].forEach(function (reihe) {
      var R = reihe[0] / 2, n = reihe[1];
      for (var k = 0; k < n; k++) { var a = Math.PI - Math.PI * (k + 0.5) / n; var p = el("i", "hf-punkt", halb); stil(p, { left: (160 + R * Math.cos(a) - 7) + "px", top: (150 - R * Math.sin(a) - 7) + "px" }); punkte.push({ e: p, a: a }); }
    });
    punkte.sort(function (p, q) { return q.a - p.a; }); /* von links nach rechts füllen */
    var zahl = el("p", "hf-zahl", C.innen); zahl.innerHTML = "<b>15</b> Ja · <b>9</b> Nein – ohne Namen";

    teile.push(function (T) {
      if (T < CUE[2] || T >= CUE[3]) return;
      var i = T < zeiten[1] ? 0 : T < zeiten[2] ? 1 : 2;
      aktiv(A, i === 0); aktiv(B, i === 1); aktiv(C, i === 2);
      var sA = zeiten[0];
      erscheint(c11, rein(sA + 3.2)(T), 6); c12.style.opacity = rein(sA + 4.2)(T);
      [bal1, bal2].forEach(function (bl, k) { var p = gleiten(sA + 5.2 + k * 0.35, 0.45)(T); bl.style.transform = "scaleX(" + (1 - p) + ")"; });
      var sB = zeiten[1];
      chips2.style.opacity = T >= sB ? 1 : 0.35; tippB(T);
      cv.classList.toggle("voll", T >= sB + 3.1); grund.style.opacity = rein(sB + 3.6)(T);
      var sC = zeiten[2];
      punkte.forEach(function (p, k) { var q = T >= sC ? rein(sC + 0.8 + k * 0.17, 0.3)(T) : 0; p.e.style.transform = "scale(" + q + ")"; p.e.classList.toggle("ja", k < 15); });
      zahl.style.opacity = rein(sC + 5.6)(T);
    });
  })();

  /* Kapitel 4 · Messen, Variieren, Stufen */
  (function () {
    var b = kapitel(3), s0 = CUE[3], L = (CUE[4] - CUE[3]) / 3;
    var zeiten = [s0, s0 + L, s0 + 2 * L];

    var A = spalte(b, 56, 2); A.fuss.textContent = "Psycho-Labor · Psychologie · im Unterricht erprobt";
    el("p", "hf-leise", A.innen, "Selbstversuch · drei Durchgänge · Beispiel");
    var uhr = el("p", "hf-gross", A.innen, "0,0 s");
    var band = el("div", "hf-band", A.innen);
    var dots = [0.22, 0.41, 0.47].map(function (x) { var d = el("i", "hf-messpunkt", band); d.style.left = (x * 100) + "%"; return d; });
    el("span", "hf-band-l", band, "2 s"); el("span", "hf-band-r", band, "8 s");
    var mA = el("p", "", A.innen, "Dein Ergebnis steht neben der Originalstudie – die Zeit bleibt fürs Deuten."); mA.style.marginTop = "auto";

    var B = spalte(b, 456, 3); B.fuss.textContent = "Modell, keine echten Zahlen · wie in Gene ohne Reisepass";
    el("p", "hf-leise", B.innen, "Hürde · Modell");
    var regl = el("div", "hf-huerde", B.innen);
    var spur = el("div", "hf-huerde-spur", regl), fuell = el("div", "hf-huerde-fuell", regl), griff = el("div", "hf-huerde-griff", regl), wert = el("span", "hf-huerde-wert", regl, "5 %");
    el("span", "hf-band-l", regl, "0 %"); el("span", "hf-band-r", regl, "10 %");
    var balken = el("div", "hf-balkenliste", B.innen);
    var DATEN = [["A", 0.48, 0.42, "5 Sitze", "4 Sitze"], ["B", 0.36, 0.36, "3 Sitze", "3 Sitze"], ["C", 0.2, 0.2, "2 Sitze", "2 Sitze"], ["D", 0.08, 0.08, "0 – unter der Hürde", "1 Sitz"]];
    var zeilen = DATEN.map(function (d) {
      var z = el("div", "hf-balkenzeile", balken); el("span", "hf-balkenname", z, d[0]);
      var bl = el("div", "hf-balkenbalken", z); bl.style.width = (d[1] * 100) + "%"; var t = el("span", "hf-balkentext", z, d[3]);
      return { z: z, bl: bl, t: t, d: d };
    });
    var mB = el("p", "", B.innen, "Schieb die Hürde auf 3 % – D bekommt einen Sitz, A verliert einen."); mB.style.marginTop = "auto";

    var C = spalte(b, 856, 4); C.fuss.textContent = "Wie war das möglich? (M22) · Geschichte · im Unterricht erprobt";
    el("p", "hf-leise", C.innen, "Akte 3 · dieselbe Quelle, drei Lesestufen");
    var stufen = el("div", "hf-chips", C.innen);
    var st = ["Einstieg", "Vertiefung", "Kontroverse"].map(function (n, i) { return chip(stufen, n, i === 0); });
    var textz = el("div", "hf-textzeilen", C.innen);
    var tz = [1, 0.84, 0.92, 0.5, 0.88, 0.7].map(function (w) { var l = el("div", "hf-zeile", textz); stil(l, { width: (w * 100) + "%", height: "12px", background: "var(--karton)" }); return l; });
    var mC = el("p", "", C.innen, "Jede und jeder wählt still. Niemand sieht, wer welche Stufe liest."); mC.style.marginTop = "auto";

    teile.push(function (T) {
      if (T < CUE[3] || T >= CUE[4]) return;
      var i = T < zeiten[1] ? 0 : T < zeiten[2] ? 1 : 2;
      aktiv(A, i === 0); aktiv(B, i === 1); aktiv(C, i === 2);
      var sA = zeiten[0], lauf = klemm((T - (sA + 0.8)) / 2.4);
      uhr.textContent = (Math.round(lauf * 48) / 10).toFixed(1).replace(".", ",") + " s";
      dots.forEach(function (d, k) { d.style.transform = "scale(" + hupf(sA + 3.4 + k * 0.5, 0.4)(T) + ")"; });
      var sB = zeiten[1], p = gleiten(sB + 2.4, 0.9)(T), pos = lerp(0.38, 0.24, p);
      fuell.style.transform = "scaleX(" + pos + ")"; griff.style.left = (pos * 100) + "%"; wert.style.left = (pos * 100) + "%";
      wert.textContent = p < 0.5 ? "5 %" : "3 %";
      zeilen.forEach(function (z) { var w = lerp(z.d[1], z.d[2], p); z.bl.style.transform = "scaleX(" + (w / z.d[1]) + ")"; z.t.textContent = p < 0.5 ? z.d[3] : z.d[4]; z.z.classList.toggle("hf-unter", z.d[0] === "D" && p < 0.5); });
      var sC = zeiten[2], stufe = T < sC + 2 ? 0 : T < sC + 4 ? 1 : 2;
      st.forEach(function (c, k) { c.classList.toggle("voll", k === stufe); });
      tz.forEach(function (l, k) { l.style.opacity = k < 3 + stufe * 1.5 ? 1 : 0.25; });
    });
  })();

  /* Kapitel 5 · Zurück in den Raum */
  (function () {
    var b = kapitel(4), s = CUE[4];
    var geraet = el("div", "hf-geraet", b); stil(geraet, { left: "56px", top: "160px", width: "440px", height: "430px" });
    el("p", "hf-feldtitel", geraet, "Im Gerät");
    var gk = HEBEL.map(function (h, i) { var k = el("div", "hf-gkachel", geraet); k.appendChild(svg(h[1], 22)); el("span", "", k, h[0]); return k; });
    var bruecke = el("div", "hf-bruecke", b); stil(bruecke, { left: "500px", top: "160px", width: "280px", height: "430px" });
    el("i", "hf-bruecke-linie", bruecke); el("p", "hf-bruecke-wort", bruecke, "Plenumsstelle");
    var raum = el("div", "hf-raum", b); stil(raum, { left: "784px", top: "160px", width: "440px", height: "430px" });
    el("p", "hf-feldtitel", raum, "Im Raum · an der Tafel");
    var tafel = el("div", "hf-tafel", raum); el("span", "hf-tafel-leise", tafel, "Tafel"); var tz = el("span", "hf-tafel-titel", tafel, "Dilemma 2: 15 Ja · 9 Nein"); var tf = el("span", "hf-tafel-leise", tafel, "Warum habt ihr so entschieden?");
    var woerter = ["Deuten", "Streiten", "Urteilen"].map(function (w) { return el("p", "hf-raumwort", raum, w); });
    var schweigt = el("p", "hf-leise", raum, "Beim Urteilen schweigt das Gerät.");
    /* der fliegende Hebel: von der Kachel »Bündeln« im Gerät zur Tafel */
    var flieger = el("div", "hf-flieger", b); flieger.appendChild(svg(HEBEL[5][1], 26)); el("span", "", flieger, "15 Ja · 9 Nein");
    teile.push(function (T) {
      if (T < CUE[4] || T >= CUE[5]) return;
      var f = gleiten(s + 2.2, 1.3)(T), zu = gleiten(s + 5.5, 1.2)(T);
      geraet.style.opacity = 1 - 0.6 * zu; gk[5].style.opacity = T > s + 2.2 ? 0.3 : 1;
      var sicht = T > s + 1.8 && T < s + 5.0; zeigen(flieger, sicht);
      if (sicht) stil(flieger, { left: lerp(300, 820, f) + "px", top: lerp(470, 240, f) + "px", opacity: 1 - gleiten(s + 4.4, 0.5)(T) });
      tafel.style.opacity = T > s + 3.4 ? 1 : 0.3; tz.style.opacity = rein(s + 3.5)(T); tf.style.opacity = rein(s + 4.2)(T);
      woerter.forEach(function (w, k) { w.style.opacity = lerp(0.35, 1, rein(s + 9 + k * 0.9)(T)); });
      schweigt.style.opacity = rein(s + 13)(T);
    });
  })();

  /* Kapitel 6 · Keiner? Dann Papier. */
  (function () {
    var b = kapitel(5), s = CUE[5];
    var gitter = el("div", "hf-gitter", b); stil(gitter, { left: "56px", top: "180px", width: "700px" });
    var kacheln = HEBEL.map(function (h, i) { var k = el("div", "hf-gkachel hf-gkachel-gross", gitter); k.appendChild(svg(h[1], 30, "var(--stahl)")); el("span", "", k, h[0]); return k; });
    var satz = el("p", "", gitter, "Keiner greift in dieser Stunde. Das Gerät bleibt in der Tasche."); satz.style.gridColumn = "1 / -1";
    var papier = blatt(b, 860, 170, 300, 380); papier.classList.add("hf-blatt-stark");
    var gut = el("p", "hf-gut", b, "Papier. Gut so."); stil(gut, { left: "860px", top: "575px", width: "300px" });
    teile.push(function (T) {
      if (T < CUE[5] || T >= CUE[6]) return;
      kacheln.forEach(function (k, i) { k.style.opacity = lerp(1, 0.4, rein(s + 1 + i * 0.4, 0.6)(T)); });
      erscheint(satz, rein(s + 4)(T));
      erscheint(papier, rein(s + 5, 0.9)(T), 40); erscheint(gut, rein(s + 7)(T));
    });
  })();

  /* Kapitel 7 · Jetzt du: die Probe R1 im Standbild */
  (function () {
    var b = kapitel(6), s = CUE[6];
    var probe = el("div", "hf-probe", b); stil(probe, { left: "56px", top: "160px", width: "720px" });
    el("p", "hf-leise", probe, "Probe · Über die Brücke tippen");
    el("p", "hf-spalte-titel", probe, "Denk an deine nächste Stunde. Welche Hebel greifen?");
    var gitter = el("div", "hf-probegitter", probe);
    var kacheln = HEBEL.map(function (h) { return el("span", "hf-probekachel", gitter, h[0]); });
    var reihe = el("div", "hf-chips", probe); var los7 = chip(reihe, "Ins Plenum", true); chip(reihe, "Keiner davon"); var stand = el("span", "hf-leise", reihe, "1 Hebel gewählt");
    var tippen = tipp(probe, 330, 158, s + 2.6);
    var rechts = el("div", "hf-liste", b); stil(rechts, { left: "830px", top: "200px", width: "394px" });
    var r1 = el("p", "", rechts, "Unter dem Film wartet die Seite: jeder Hebel zum Ausprobieren, die drei Regeln und der Umfang deiner Stunde.");
    var r2 = el("p", "hf-leise", rechts, "Kidu · Künstliche Intelligenz und digitaler Unterricht · Entwurf · kein Beschluss");
    teile.push(function (T) {
      if (T < CUE[6]) return;
      erscheint(probe, rein(s + 0.4, 0.8)(T), 12);
      tippen(T);
      kacheln[1].classList.toggle("an", T > s + 3.3); stand.style.opacity = T > s + 3.3 ? 1 : 0; los7.style.opacity = T > s + 3.3 ? 1 : 0.4;
      erscheint(r1, rein(s + 5)(T)); erscheint(r2, rein(s + 6)(T));
    });
  })();

  /* Satz oben: wortweise aufbauen, höchstens 2,4 s; für Hilfstechnik vollständig */
  var letzterSatz = -1;
  function satzBei(T) { var i = -1; for (var k = 0; k < SAETZE.length; k++) if (T >= SAETZE[k][0]) i = k; return i; }
  function zeichneSatz(T) {
    var i = satzBei(T);
    if (i < 0) { satzEl.textContent = ""; return; }
    var s = SAETZE[i], w = s[1].split(" "), d = Math.min(2.4, 0.11 * w.length);
    var p = ruhig() ? 1 : klemm((T - s[0]) / d);
    satzEl.textContent = w.slice(0, Math.max(1, Math.round(p * w.length))).join(" ");
    if (i !== letzterSatz) { letzterSatz = i; ansage.textContent = "Kapitel " + (kapitelBei(T) + 1) + ", " + KAPITEL[kapitelBei(T)] + ": " + s[1]; }
  }
  function kapitelBei(T) { var k = 0; for (var i = 0; i < CUE.length; i++) if (T >= CUE[i]) k = i; return k; }
  function uhrzeit(t) { t = Math.max(0, Math.round(t)); return Math.floor(t / 60) + ":" + ("0" + (t % 60)).slice(-2); }

  function zeichnen(T) {
    for (var i = 0; i < teile.length; i++) teile[i](T);
    zeichneSatz(T);
    var k = kapitelBei(T);
    metaEl.textContent = "Kapitel " + (k + 1) + " · " + KAPITEL[k] + " · " + uhrzeit(CUE[k]);
    kapKnoepfe.forEach(function (b, i) { b.setAttribute("aria-current", i === k ? "true" : "false"); });
    regler.value = T; zeitEl.textContent = uhrzeit(T) + " / " + uhrzeit(ENDE);
  }

  /* Abspielen */
  var T = 0, laeuft = false, letzte = 0, frame = 0, gestartet = false;
  function skalieren() {
    var breite = rahmen.clientWidth, s = breite / 1280;
    buehne.style.transform = "scale(" + s + ")"; rahmen.style.height = Math.round(720 * s) + "px";
  }
  function schritt(jetzt) {
    if (!laeuft) return;
    if (letzte) T += Math.min(0.1, (jetzt - letzte) / 1000);
    letzte = jetzt;
    if (T >= ENDE) { T = ENDE; zeichnen(T); amEnde(); return; }
    zeichnen(T);
    frame = requestAnimationFrame(schritt);
  }
  function setzeHalt() {
    halt.textContent = laeuft ? "Anhalten" : (ruhig() ? "Weiter" : "Weiter");
    halt.setAttribute("aria-pressed", laeuft ? "false" : "true");
  }
  function spielen() {
    if (ruhig()) { /* Standbilder: »Weiter« blättert ein Kapitel vor */
      var k = kapitelBei(T); if (T >= standbildZeit(k) - 0.01) k += 1;
      if (k >= CUE.length) { amEnde(); return; }
      springe(standbildZeit(k)); return;
    }
    if (laeuft) return; laeuft = true; letzte = 0; frame = requestAnimationFrame(schritt); setzeHalt();
  }
  function halten() { laeuft = false; cancelAnimationFrame(frame); letzte = 0; setzeHalt(); }
  function standbildZeit(k) { return (k + 1 < CUE.length ? CUE[k + 1] : ENDE) - 0.3; }
  function springe(t) { T = klemm(t / ENDE) * ENDE; ende.hidden = true; zeichnen(T); }
  function zuKapitel(k) {
    k = Math.max(0, Math.min(CUE.length - 1, k));
    if (!gestartet) oeffnen(false);
    springe(ruhig() ? standbildZeit(k) : CUE[k]);
    if (!ruhig() && !laeuft) spielen();
  }
  function oeffnen(spiel) {
    gestartet = true; start.hidden = true; hf.classList.add("hf-laeuft");
    halt.disabled = false; regler.disabled = false;
    if (spiel !== false) { springe(ruhig() ? standbildZeit(0) : 0); if (!ruhig()) spielen(); }
    setzeHalt(); buehne.focus({ preventScroll: true });
  }
  function amEnde() { halten(); ende.hidden = false; var b = ende.querySelector("button"); if (b) b.focus({ preventScroll: true }); }

  los.addEventListener("click", function () { oeffnen(true); });
  nochmal.addEventListener("click", function () { springe(ruhig() ? standbildZeit(0) : 0); if (!ruhig()) spielen(); buehne.focus({ preventScroll: true }); });
  halt.addEventListener("click", function () { if (laeuft) halten(); else spielen(); });
  regler.addEventListener("input", function () {
    if (!gestartet) oeffnen(false);
    var t = parseFloat(regler.value);
    if (ruhig()) t = standbildZeit(kapitelBei(t));
    halten(); springe(t);
  });
  kapKnoepfe.forEach(function (b) { b.addEventListener("click", function () { zuKapitel(parseInt(b.getAttribute("data-kapitel"), 10)); }); });
  buehne.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); zuKapitel(kapitelBei(T) + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); zuKapitel(kapitelBei(T) - (T - CUE[kapitelBei(T)] > 2 ? 0 : 1)); }
    else if (e.key === " " && gestartet) { e.preventDefault(); if (laeuft) halten(); else spielen(); }
  });
  document.addEventListener("visibilitychange", function () { if (document.hidden && laeuft) halten(); });
  window.addEventListener("resize", skalieren);
  skalieren();
  zeichnen(0);

  window.KiduHebelFilm = { zeichnen: zeichnen, springe: springe, zuKapitel: zuKapitel, CUE: CUE, ENDE: ENDE, laeuft: function () { return laeuft; } };
})();
