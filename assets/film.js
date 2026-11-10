/* Kidu – Film »Kidu in 44 Sekunden« auf der Startseite (ab Version 4.16).
   Nachbau des Showreels v2 aus Claude Design (Szenen, Zeiten, Texte) ohne Bibliothek:
   eine Zeitachse T in Sekunden, jedes Bild wird aus T berechnet (nur transform, opacity, clip-path).
   Läuft bei jedem neuen Besuch einmal ab (nicht bei »Weniger Bewegung«); am Ende wählst du »Film nochmal ansehen« oder
   »Zur Startseite«. Anhalten, Weiter, Überspringen (auch mit Esc). Keine Schleife. Gemerkt wird nur für diesen Besuch
   (sessionStorage), dass der Film schon lief – beim Zurückkehren zur Startseite startet er nicht erneut (ab Version 4.17). */
(function () {
  "use strict";
  var wurzel = document.getElementById("film");
  if (!wurzel) return;

  var SZENEN = [
    ["Auftakt", 4.5, "Drei Wege: Galerie, KI-Training, Digitaler Unterricht"],
    ["Psycho", 3.8, "Galerie: Psycho-Labor, Tipp auf »Gefunden!«"],
    ["Politik", 5.5, "Politik-Werkstatt: 5-%-Hürde aus, die Sitze verteilen sich neu"],
    ["Marktplatz", 3.8, "Wie war das möglich: Streitpaar mit Rückmeldung"],
    ["Nationalismus", 3.8, "Nationalismus und Demokratie: Kipp-Punkte"],
    ["Faecher", 3.8, "Zwölf weitere Ansichten fächern auf"],
    ["KI", 7, "KI-Training: aus einem schwachen Prompt wird ein Prompt in fünf Teilen"],
    ["Unterricht", 7, "Digitaler Unterricht: Papierfrage und drei Werkzeuge"],
    ["Schluss", 5, "Sieh hin. Probier aus. Bau selbst."]
  ];
  var CUE = {}, summe = 0;
  SZENEN.forEach(function (s) { CUE[s[0]] = summe; summe += s[1]; });
  var ENDE = CUE.Schluss + 5;

  /* Bewegungskurven wie im Original */
  var E = {
    aus: function (t) { t -= 1; return t * t * t + 1; },
    beide: function (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
    feder: function (t) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
  };
  function an(kurve, start, dauer) {
    return function (T) { if (T <= start) return 0; if (T >= start + dauer) return 1; return kurve((T - start) / dauer); };
  }
  var rein = function (s, d) { return an(E.aus, s, d || 0.7); };
  var gleiten = function (s, d) { return an(E.beide, s, d || 0.8); };
  var hupf = function (s, d) { return an(E.feder, s, d || 0.5); };
  var lerp = function (a, b, p) { return a + (b - a) * p; };
  var getippt = function (str, p) { return str.slice(0, Math.round(str.length * Math.max(0, Math.min(1, p)))); };

  /* Bausteine */
  function el(tag, klasse, eltern, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text) e.textContent = text;
    if (eltern) eltern.appendChild(e);
    return e;
  }
  function stil(e, o) { for (var k in o) e.style[k] = o[k]; }
  function zeigen(e, sichtbar) { e.style.display = sichtbar ? "" : "none"; }
  var BILD = function (n) { return "assets/galerie/" + n + ".webp"; };

  var buehne = wurzel.querySelector(".film-buehne");
  var bild = el("div", "fb-bild", buehne);
  bild.setAttribute("aria-hidden", "true");

  /* Titelblock für Auftakt und Schluss */
  function titelblock(von, bis, titel, unter, groesse) {
    var b = el("div", "fb-hero", bild);
    var k = el("div", "fb-kicker", b);
    el("span", "fb-marke kidu-zeichen", k).innerHTML = "<i></i><i></i><i></i>";
    el("span", "", k, "Kidu · Künstliche Intelligenz und digitaler Unterricht");
    var t = el("div", "fb-hero-titel", b, titel); t.style.fontSize = groesse + "px";
    var u = el("div", "fb-hero-unter", b, unter);
    return function (T) {
      var sicht = T >= von - 0.1 && T <= bis + 0.1; zeigen(b, sicht); if (!sicht) return;
      var a = rein(von + 0.3)(T), bb = rein(von + 0.6)(T), c = rein(von + 1.0)(T), aus = gleiten(bis - 0.7, 0.6)(T);
      stil(b, { opacity: 1 - aus, transform: "translateY(" + (-50 * aus) + "px)" });
      stil(k, { opacity: a, transform: "translateY(" + (1 - a) * 24 + "px)" });
      stil(t, { opacity: bb, transform: "translateY(" + (1 - bb) * 40 + "px)" });
      stil(u, { opacity: c, transform: "translateY(" + (1 - c) * 30 + "px)" });
    };
  }

  /* Text links zu jeder Szene */
  function szenentext(it, start, ende) {
    var b = el("div", "fb-text", bild);
    var k = el("div", "fb-meta", b, it.fach);
    var t = el("div", "fb-titel", b, it.titel); if (it.titel.length > 40) t.classList.add("lang");
    var x = el("div", "fb-satz", b, it.text);
    return function (T) {
      var sicht = T >= start - 0.2 && T <= ende + 0.2; zeigen(b, sicht); if (!sicht) return;
      var aus = gleiten(ende - 0.4, 0.35)(T);
      [[k, rein(start + 0.05)(T), 20], [t, rein(start + 0.2)(T), 34], [x, rein(start + 0.4)(T), 26]].forEach(function (r) {
        stil(r[0], { opacity: r[1] * (1 - aus), transform: "translateY(" + ((1 - r[1]) * r[2] - aus * 24) + "px)" });
      });
    };
  }

  /* Fingertipp an einer Stelle */
  function tipp(eltern, x, y, t0) {
    var b = el("div", "fb-tipp", eltern); stil(b, { left: x + "px", top: y + "px" });
    var ring = el("div", "fb-tipp-ring", b), punkt = el("div", "fb-tipp-punkt", b);
    return function (T) {
      var i = rein(t0, 0.55)(T), d = hupf(t0 + 0.6, 0.35)(T), r = rein(t0 + 0.6, 0.7)(T), o = gleiten(t0 + 1.4, 0.4)(T);
      var sicht = i > 0 && o < 1; zeigen(b, sicht); if (!sicht) return;
      b.style.opacity = i * (1 - o);
      stil(ring, { transform: "scale(" + (0.3 + r * 1.2) + ")", opacity: r > 0 ? 1 - r : 0 });
      punkt.style.transform = "translate(" + (1 - i) * 80 + "px," + (1 - i) * 90 + "px) scale(" + (1 - 0.2 * d + 0.2 * gleiten(t0 + 0.9, 0.3)(T)) + ")";
    };
  }

  var BEISPIELE = [
    { cue: "Psycho", img: "psycho-ds2-1", fx: 0.5, fy: 0.9, fach: "Psychologie · Psycho-Labor", titel: "Siehst du, was sich verändert?",
      text: "Zwei Bilder wechseln sich ab. Entdeckst du die Änderung, tippst du auf »Gefunden!«." },
    { cue: "Politik", sitze: true, fach: "Gemeinschaftskunde · Politik-Werkstatt", titel: "Politik-Werkstatt – Parteien und Wahlen",
      text: "Du schaltest die 5-%-Hürde ab – und siehst sofort, wie sich die Sitze im Bundestag neu verteilen." },
    { cue: "Marktplatz", img: "wie-war-das-moeglich-1", fx: 0.3, fy: 0.53, fach: "Geschichte · GGK-Labor", titel: "„Große Verbrechen brauchen keine Monster!“ – Wie war das möglich?",
      text: "Auf dem Marktplatz prüfst du drei Streitpaare am Fall Józefów und bekommst sofort eine Rückmeldung." },
    { cue: "Nationalismus", img: "nationalismus-demokratie-1", fx: 0.37, fy: 0.53, fach: "Gemeinschaftskunde · Demokratiebildung", titel: "Nationalismus und Demokratie",
      text: "Mit fünf Reglern stellst du Kipp-Punkte ein. Ein Zeiger zeigt, wann das Wir zur Gefahr wird." }
  ];
  var BEREICHE = BEISPIELE.map(function (it, i) { return [CUE[it.cue], i < BEISPIELE.length - 1 ? CUE[BEISPIELE[i + 1].cue] : CUE.Faecher]; });
  var FAECHER = ["gene-1", "teacch-1", "ns-ideologie-1", "planspiel-1", "milieus-1919-1", "dilemmata-1", "politik-werkstatt-2",
    "erfundene-traditionen-1", "appeasement-1", "wie-war-das-moeglich-2", "psycho-ds3-6-1", "shoa-vergleich-1", "fachbegriffe-1"];

  var teile = [];
  teile.push(titelblock(0, CUE.Psycho, "Drei Wege zu deinem digitalen Unterricht.", "Lass dich inspirieren, arbeite sicher mit KI und gestalte Unterricht selbst.", 104));
  BEISPIELE.forEach(function (it, i) { teile.push(szenentext(it, BEREICHE[i][0], BEREICHE[i][1])); });

  /* Punkte: welche Szene der Galerie gerade läuft */
  (function () {
    var reihe = el("div", "fb-punkte", bild);
    var punkte = BEREICHE.map(function () { var p = el("span", "fb-punkt", reihe); el("i", "", p); return p; });
    teile.push(function (T) {
      reihe.style.opacity = rein(CUE.Psycho + 0.2)(T) * (1 - gleiten(CUE.Faecher - 0.4, 0.5)(T));
      BEREICHE.forEach(function (r, i) {
        var on = hupf(r[0] + 0.1, 0.4)(T) * (1 - gleiten(r[1] - 0.2, 0.3)(T));
        punkte[i].classList.toggle("fertig", T > r[1] - 0.1);
        punkte[i].firstChild.style.transform = "scale(" + Math.max(0, on) + ")";
      });
    });
  })();

  /* Tablet mit vier Ansichten */
  var TAB = { x: 900, y: 205, w: 900, pad: 26 };
  TAB.sw = TAB.w - TAB.pad * 2; TAB.sh = TAB.sw * 650 / 1040; TAB.h = TAB.sh + TAB.pad * 2;
  (function () {
    var tab = el("div", "fb-tablet", bild);
    stil(tab, { left: TAB.x + "px", width: TAB.w + "px", height: TAB.h + "px" });
    var schirm = el("div", "fb-schirm", tab);
    stil(schirm, { left: TAB.pad + "px", top: TAB.pad + "px", width: TAB.sw + "px", height: TAB.sh + "px" });
    var ansichten = BEISPIELE.map(function (it, i) {
      var s = BEREICHE[i][0], e = BEREICHE[i][1], erst = i === 0, letzt = i === BEISPIELE.length - 1;
      var hülle = el("div", "fb-ansicht", schirm), innen, tippen = null, sitze = null;
      if (it.sitze) { sitze = sitzrechner(hülle, s); }
      else {
        innen = el("div", "fb-zoom", hülle);
        var fx = it.fx * TAB.sw, fy = it.fy * TAB.sh;
        innen.style.transformOrigin = fx + "px " + fy + "px";
        var b = el("img", "", innen); b.src = BILD(it.img); b.alt = ""; stil(b, { width: TAB.sw + "px", height: TAB.sh + "px" });
        tippen = tipp(innen, fx, fy, s + 1.1);
      }
      return function (T) {
        var sicht = T >= s - 0.6 && T <= e + 0.6; zeigen(hülle, sicht); if (!sicht) return;
        var ip = erst ? 1 : gleiten(s - 0.35, 0.7)(T), op = letzt ? 0 : gleiten(e - 0.35, 0.7)(T);
        stil(hülle, { transform: "translateX(" + ((1 - ip) * TAB.sw - op * TAB.sw * 0.35) + "px)", opacity: 1 - op * 0.25 });
        if (sitze) { sitze(T); return; }
        var zoom = 1 + 0.42 * gleiten(s + 0.5, 1.3)(T) - 0.42 * gleiten(e - 0.85, 0.65)(T);
        innen.style.transform = "scale(" + zoom + ")";
        tippen(T);
      };
    });
    teile.push(function (T) {
      var sicht = T >= CUE.Psycho - 0.8 && T <= CUE.Faecher + 0.8; zeigen(tab, sicht); if (!sicht) return;
      var i = rein(CUE.Psycho - 0.7, 1.0)(T), o = gleiten(CUE.Faecher - 0.2, 0.8)(T);
      var y = lerp(1100, TAB.y, i) + Math.sin(T * 0.6) * 6, sc = lerp(1, 0.46, o), dreh = lerp(4, -1.5, i) + o * 1.5;
      stil(tab, { top: y + "px", opacity: 1 - gleiten(CUE.Faecher + 0.3, 0.4)(T),
        transform: "translate(" + o * -90 + "px," + o * 40 + "px) rotate(" + dreh + "deg) scale(" + sc + ")" });
      ansichten.forEach(function (a) { a(T); });
    });
  })();

  /* Sitzrechner aus der Politik-Werkstatt: Bundesergebnis 2025 mit Hürde, ohne Hürde nach Sainte-Laguë (Werte wie dort) */
  function sitzrechner(eltern, s) {
    var P = [
      ["Die Linke", "#b4166d", 64, 8.77], ["BSW", "#7a2a8c", 0, 4.98], ["SPD", "#d0102b", 119, 16.41], ["SSW", "#2a6a9a", 1, 0, 1],
      ["GRÜNE", "#2f7d32", 85, 11.61], ["FDP", "#e8b800", 0, 4.33], ["CDU", "#1d1d1d", 165, 22.55], ["CSU", "#0a6fb5", 44, 5.97], ["AfD", "#1ea0e0", 152, 20.80]
    ].map(function (p) { return { name: p[0], farbe: p[1], mit: p[2], pct: p[3], fest: p[4] }; });
    var n = P.map(function () { return 0; });
    for (var k = 0; k < 629; k++) {
      var best = -1, bv = -1;
      P.forEach(function (p, i) { if (!p.pct) return; var v = p.pct / (n[i] + 0.5); if (v > bv) { bv = v; best = i; } });
      n[best]++;
    }
    P.forEach(function (p, i) { p.ohne = p.fest || n[i]; });

    var r = el("div", "fb-sitze", eltern);
    var kopf = el("div", "fb-sitze-kopf", r);
    var t = el("div", "", kopf); t.innerHTML = "<b>Der Sitzrechner</b> · Bundesergebnis 2025";
    var schalt = el("div", "fb-schalter", kopf); el("span", "", schalt, "5-%-Hürde");
    var bahn = el("span", "fb-bahn", schalt), knopf = el("i", "", bahn), wort = el("span", "fb-wort", schalt, "an");
    var tippen = tipp(schalt, 130, 15, s + 0.9);
    var halb = el("div", "fb-halbrund", r);
    var mit = el("img", "", halb); mit.src = "assets/film/sitze-on.webp"; mit.alt = "";
    var ohne = el("img", "", halb); ohne.src = "assets/film/sitze-off.webp"; ohne.alt = "";
    el("div", "fb-mehrheit", r, "Mehrheit ab 316 Sitzen");
    var liste = el("div", "fb-parteien", r);
    var zeilen = P.map(function (p) {
      var z = el("div", "fb-partei", liste); var f = el("span", "fb-farbe", z); f.style.background = p.farbe;
      el("span", "", z, p.name); return { z: z, zahl: el("b", "", z, String(p.mit)), p: p };
    });
    var hinweis = el("div", "fb-hinweis", r);
    function keil(phi) {
      if (phi <= 0) return "polygon(0 0,0 0,0 0)";
      var R = 300, pts = ["236px 240px", (236 - R) + "px 240px"];
      for (var k = 0; k <= 24; k++) { var a = Math.PI - (phi * k) / 24; pts.push((236 + R * Math.cos(a)).toFixed(1) + "px " + (236 - R * Math.sin(a)).toFixed(1) + "px"); }
      return "polygon(" + pts.join(",") + ")";
    }
    var umschalt = s + 1.55;
    return function (T) {
      var sw = gleiten(umschalt, 0.25)(T), welle = (T - umschalt - 0.1) / 1.3, cnt = gleiten(umschalt + 0.1, 1.3)(T);
      bahn.classList.toggle("aus", sw >= 0.5); wort.textContent = sw < 0.5 ? "an" : "aus";
      knopf.style.transform = "translateX(" + (1 - sw) * 26 + "px)";
      tippen(T);
      ohne.style.clipPath = keil(Math.max(0, Math.min(1, welle)) * Math.PI);
      zeilen.forEach(function (z) {
        var v = Math.round(lerp(z.p.mit, z.p.ohne, cnt));
        z.zahl.textContent = v; z.z.style.opacity = v === 0 ? 0.4 : 1;
        z.z.style.background = z.p.mit === 0 ? "rgba(232,184,0," + 0.18 * (z.p.mit !== z.p.ohne ? rein(umschalt + 0.2, 0.4)(T) : 0) + ")" : "transparent";
      });
      hinweis.textContent = sw < 0.5 ? "Ohne Sitz: FDP (4,3 %), BSW (4,98 %)." : "Ohne Hürde ziehen FDP und BSW in den Bundestag ein.";
    };
  }

  /* Fächer: dreizehn weitere Ansichten */
  (function () {
    var s = CUE.Faecher, e = CUE.KI;
    var b = el("div", "fb-faecher", bild);
    var txt = el("div", "fb-faecher-text", b);
    var h = el("div", "fb-hero-titel", txt, "Und viele mehr."); h.style.fontSize = "84px";
    var u = el("div", "fb-hero-unter", txt, "Echte Lernanwendungen aus dem Kollegium – zum Ansehen, Ausprobieren und Nachbauen.");
    var w = 380, hh = 238, nn = FAECHER.length;
    var karten = FAECHER.map(function (f) {
      var k = el("div", "fb-karte", b); stil(k, { left: (960 - w / 2) + "px", width: w + "px", height: hh + "px", transformOrigin: (w / 2) + "px " + (hh + 900) + "px" });
      var i = el("img", "", k); i.src = BILD(f); i.alt = ""; return k;
    });
    teile.push(function (T) {
      var sicht = T >= s - 0.2 && T <= e + 1.2; zeigen(b, sicht); if (!sicht) return;
      var a = rein(s + 0.3)(T), c = rein(s + 0.6)(T), aus = gleiten(e - 0.9, 0.5)(T);
      txt.style.opacity = 1 - aus;
      stil(h, { opacity: a, transform: "translateY(" + (1 - a) * 30 + "px)" });
      stil(u, { opacity: c, transform: "translateY(" + (1 - c) * 24 + "px)" });
      karten.forEach(function (k, i) {
        var p = rein(s + 0.15 + i * 0.06, 0.9)(T);
        var ang = lerp(0, (i - (nn - 1) / 2) * 7.2, p) + ((T - s) * 1.2 - 2.4) * p;
        var zu = gleiten(e - 1.0 + (nn - i) * 0.03, 0.6)(T);
        stil(k, { transform: "translateY(" + ((1 - p) * 500 + zu * 900) + "px) rotate(" + ang + "deg)", opacity: Math.min(1, p * 2) });
      });
    });
  })();

  /* Rechte Tafel für KI-Training und Digitalen Unterricht */
  function tafel(s, e, klasse) {
    var b = el("div", "fb-tafel " + (klasse || ""), bild);
    return { b: b, f: function (T) {
      var sicht = T >= s - 0.1 && T <= e + 0.1; zeigen(b, sicht); if (!sicht) return false;
      var i = rein(s + 0.15, 0.8)(T), o = gleiten(e - 0.5, 0.5)(T);
      stil(b, { opacity: i * (1 - o), transform: "translate(" + ((1 - i) * 160 - o * 120) + "px," + Math.sin(T * 0.6) * 5 + "px) rotate(" + ((1 - i) * 3 - 0.8) + "deg)" });
      return true;
    } };
  }

  teile.push(szenentext({ fach: "KI-Training", titel: "Du lernst, gute Prompts zu bauen.",
    text: "Fünf Teile nehmen der KI das Raten ab. Hol dir schnell einen fertigen Prompt – oder bau ihn Schritt für Schritt selbst." }, CUE.KI, CUE.Unterricht));
  (function () {
    var s = CUE.KI, tf = tafel(s, CUE.Unterricht, "ki"), b = tf.b;
    var schwach = el("div", "fb-schwach", b); el("span", "fb-etikett", schwach, "Schwach");
    var satz = el("span", "fb-durch", schwach, "»Mach mir ein Arbeitsblatt über die Bremsanlage.«"), strich = el("i", "", satz);
    var dein = el("div", "fb-tafel-titel", b, "Dein Prompt");
    var PROMPT = [["Ziel", "Erstelle ein Arbeitsblatt zur Scheibenbremse."], ["Kontext", "Kfz-Technik, 1. Ausbildungsjahr, viele mit Deutsch als Zweitsprache."],
      ["Anforderungen", "Kurze Sätze, drei Aufgaben vom Benennen bis zum Begründen."], ["Format", "Eine Seite, Tabelle für die Bauteile."],
      ["Prüfkriterien", "Prüfe die Fachbegriffe und markiere, was ich nachsehen sollte."]];
    var liste = el("div", "fb-prompt", b);
    var zeilen = PROMPT.map(function (z) { var r = el("div", "fb-prompt-zeile", liste); el("span", "fb-teil", r, z[0]); return { r: r, t: el("span", "", r), v: z[1] }; });
    var unten = el("div", "fb-unten", b);
    var knopf = el("span", "fb-knopf", unten, "Prompt kopieren"); el("span", "fb-leise", unten, "Die Prüfung bleibt bei dir.");
    var tippen = tipp(unten, 150, 34, s + 4.65);
    teile.push(function (T) {
      if (!tf.f(T)) return;
      var w = rein(s + 0.5)(T), st = gleiten(s + 1.5, 0.5)(T);
      schwach.style.opacity = w * (1 - 0.55 * st); strich.style.transform = "scaleX(" + st + ")";
      dein.style.opacity = rein(s + 1.8)(T);
      zeilen.forEach(function (z, i) {
        var t0 = s + 2.0 + i * 0.5, p = rein(t0, 0.5)(T);
        stil(z.r, { opacity: p, transform: "translateX(" + (1 - p) * 30 + "px)" }); z.t.textContent = getippt(z.v, (T - t0) / 0.6);
      });
      unten.style.opacity = rein(s + 4.3)(T);
      var kopiert = T > s + 5.25; knopf.textContent = kopiert ? "Kopiert ✓" : "Prompt kopieren"; knopf.classList.toggle("kopiert", kopiert);
      tippen(T);
    });
  })();

  teile.push(szenentext({ fach: "Digitaler Unterricht", titel: "Du prüfst kritisch – und gestaltest selbst.",
    text: "Erst das Anliegen, dann das Werkzeug. Geht es auf Papier genauso gut? Dann bleib beim Papier." }, CUE.Unterricht, CUE.Schluss));
  (function () {
    var s = CUE.Unterricht, tf = tafel(s, CUE.Schluss, "lernen"), b = tf.b;
    var meta = el("div", "fb-meta", b, "Papierfrage");
    var frage = el("div", "fb-tafel-titel gross", b, "Geht es auf Papier genauso gut?");
    var chips = el("div", "fb-chips", b);
    var nein = null;
    ["Ja", "Nein", "Noch nicht sicher"].forEach(function (c) { var x = el("span", "fb-chip", chips, c); if (c === "Nein") nein = x; });
    var tippen = tipp(chips, 196, 34, s + 1.65);
    var W = [["Digital-Check", "Prüfe ein fertiges Material – selbst oder mit einem Prüf-Auftrag."], ["Unterricht digitalisieren", "Hol dir Ideen, die mehr können als Papier."],
      ["Nach der Stunde", "So lassen, nachschärfen oder zurück zu Papier."]];
    var werk = el("div", "fb-werkzeuge", b);
    var karten = W.map(function (w) { var k = el("div", "fb-werkzeug", werk); var t = el("div", "", k); el("b", "", t, w[0]); el("span", "", t, w[1]); el("span", "fb-pfeil", k, "→"); return k; });
    teile.push(function (T) {
      if (!tf.f(T)) return;
      var q = rein(s + 0.4)(T);
      meta.style.opacity = q; stil(frage, { opacity: q, transform: "translateY(" + (1 - q) * 20 + "px)" });
      chips.style.opacity = rein(s + 0.8)(T); nein.classList.toggle("an", T > s + 2.25); tippen(T);
      karten.forEach(function (k, i) { var p = rein(s + 2.7 + i * 0.4, 0.6)(T); stil(k, { opacity: p, transform: "translateY(" + (1 - p) * 30 + "px)" }); });
    });
  })();

  teile.push(titelblock(CUE.Schluss, ENDE, "Sieh hin. Probier aus. Bau selbst.", "Fang mit einem Beispiel an – oder gleich hier im KI-Training.", 96));

  /* Die drei Wege als Leiste: groß im Auftakt und am Schluss, klein oben als Kapitelanzeige */
  (function () {
    var WEGE = [["Galerie", "galerie"], ["KI-Training", "ki"], ["Digitaler Unterricht", "lernen"]];
    var reihe = el("div", "fb-wege", bild);
    var pillen = WEGE.map(function (w, i) { var p = el("div", "fb-weg " + w[1], reihe); el("span", "fb-nr", p, String(i + 1)); el("span", "", p, w[0]); return p; });
    teile.push(function (T) {
      var hoch = gleiten(CUE.Psycho - 0.6, 1.0)(T) - gleiten(CUE.Schluss + 0.2, 1.0)(T);
      var aktiv = T < CUE.Psycho || T >= CUE.Schluss + 0.6 ? -1 : T < CUE.KI ? 0 : T < CUE.Unterricht ? 1 : 2;
      stil(reihe, { opacity: 1 - gleiten(ENDE - 0.7, 0.6)(T), transform: "translateY(" + (-700 * hoch) + "px) scale(" + (1 - 0.42 * hoch) + ")" });
      pillen.forEach(function (p, i) {
        var h = hupf(1.4 + i * 0.25, 0.6)(T);
        stil(p, { opacity: Math.min(1, h * 1.4), transform: "scale(" + (0.6 + 0.4 * h) + ")" });
        p.classList.toggle("an", aktiv === i); p.classList.toggle("ruhe", aktiv !== -1 && aktiv !== i);
      });
    });
  })();

  function zeichnen(T) { for (var i = 0; i < teile.length; i++) teile[i](T); }

  /* Abspielen */
  var T = 0, laeuft = false, letzte = 0, frame = 0, zuvorFokus = null;
  var knopfHalt = wurzel.querySelector("[data-film-halt]");
  var steuerung = wurzel.querySelector(".film-steuerung"), ende = wurzel.querySelector(".film-ende");
  var fortschritt = wurzel.querySelector(".film-fortschritt i");

  function skalieren() {
    var s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    buehne.style.transform = "translate(-50%,-50%) scale(" + s + ")";
  }
  function schritt(jetzt) {
    if (!laeuft) return;
    if (letzte) T += Math.min(0.1, (jetzt - letzte) / 1000);
    letzte = jetzt;
    if (fortschritt) fortschritt.style.transform = "scaleX(" + Math.min(1, T / ENDE) + ")";
    if (T >= ENDE - 0.75) { T = ENDE - 0.75; zeichnen(T); amEnde(); return; }
    zeichnen(T);
    frame = requestAnimationFrame(schritt);
  }
  function spielen() { if (laeuft) return; laeuft = true; letzte = 0; frame = requestAnimationFrame(schritt); setzeHaltKnopf(); }
  function halten() { laeuft = false; cancelAnimationFrame(frame); setzeHaltKnopf(); }
  function setzeHaltKnopf() { if (knopfHalt) { knopfHalt.textContent = laeuft ? "Anhalten" : "Weiter"; knopfHalt.setAttribute("aria-pressed", laeuft ? "false" : "true"); } }
  function merken() { try { sessionStorage.setItem("papierprobe.film", "gelaufen"); } catch (e) { /* ohne Speicher läuft er beim nächsten Aufruf wieder */ } }
  function vonVorn() {
    T = 0; zeichnen(0);
    if (ende) ende.hidden = true;
    if (steuerung) steuerung.hidden = false;
    var weg = steuerung && steuerung.querySelector("[data-film-weg]"); if (weg) weg.focus();
    spielen();
  }
  function amEnde() {
    halten(); merken();
    if (steuerung) steuerung.hidden = true;
    if (ende) { ende.hidden = false; var b = ende.querySelector("[data-film-weg]"); if (b) b.focus(); }
  }
  function oeffnen() {
    /* Nur mit dem passenden Stilblatt: Ohne Filmstile (alte Datei im Zwischenspeicher) bliebe nur Durcheinander. */
    if (getComputedStyle(wurzel).position !== "fixed") return;
    zuvorFokus = document.activeElement;
    skalieren();
    wurzel.hidden = false; document.documentElement.classList.add("film-offen");
    requestAnimationFrame(function () { wurzel.classList.add("da"); });
    vonVorn();
  }
  function beenden() {
    halten(); merken();
    wurzel.classList.remove("da");
    setTimeout(function () {
      wurzel.hidden = true; document.documentElement.classList.remove("film-offen");
      if (ende) ende.hidden = true; if (steuerung) steuerung.hidden = false;
      var ziel = zuvorFokus && zuvorFokus !== document.body ? zuvorFokus : document.getElementById("t-start");
      if (ziel) { if (!ziel.hasAttribute("tabindex") && ziel.id === "t-start") ziel.setAttribute("tabindex", "-1"); ziel.focus({ preventScroll: true }); }
    }, 220);
  }

  if (knopfHalt) knopfHalt.addEventListener("click", function () { if (laeuft) halten(); else spielen(); });
  Array.prototype.forEach.call(wurzel.querySelectorAll("[data-film-weg]"), function (b) { b.addEventListener("click", beenden); });
  var nochmal = wurzel.querySelector("[data-film-nochmal]");
  if (nochmal) nochmal.addEventListener("click", vonVorn);
  wurzel.addEventListener("keydown", function (e) { if (e.key === "Escape") { e.preventDefault(); beenden(); } });
  window.addEventListener("resize", function () { if (!wurzel.hidden) skalieren(); });
  document.addEventListener("visibilitychange", function () { if (document.hidden && laeuft) halten(); });
  var start = document.querySelector("[data-film-start]");
  if (start) start.addEventListener("click", oeffnen);

  /* Bei jedem neuen Besuch einmal von selbst, nie bei weniger Bewegung */
  var weniger = document.documentElement.getAttribute("data-bewegung") === "weniger" ||
    (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var gelaufen = false;
  try { gelaufen = sessionStorage.getItem("papierprobe.film") === "gelaufen"; } catch (e) { gelaufen = false; }
  /* Automatische Browser-Tests (navigator.webdriver) sehen den Film nur mit ?film=1, damit er andere Prüfungen nicht verdeckt. */
  var test = !!navigator.webdriver && !/[?&]film=1\b/.test(location.search);
  if (!gelaufen && !weniger && !test) oeffnen();

  window.KiduFilm = { oeffnen: oeffnen, beenden: beenden, zeichnen: zeichnen, springe: function (t) { T = t; }, ENDE: ENDE, CUE: CUE };
})();
