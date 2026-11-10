/* Kidu – Proben zu den sechs Hebeln auf sechs-hebel.html (Muster S bis X), ab Version 4.20.

   Je Hebel eine kleine Probe zum Selbst-Tun. Jede verlangt zuerst eine eigene Festlegung; erst dann ändert sich etwas.
   Das sind Zustandswechsel auf eine eigene Handlung (signatur-design 4a), kein zweiter großer Moment neben R1
   (Entscheidung Mario, 9.11.2026; DESIGN.md, Muster S bis X). Dauern nur aus Tokens (--dauer-reveal, --dauer-flug,
   --dauer-mittel, --dauer-uebergang); bei »Weniger Bewegung« und bei Tastatur-Handlungen steht der Endzustand sofort.
   Ohne JavaScript bleibt alles lesbar: Die Liste bekommt erst hier die Klasse sh-js; vorher stehen die Vertiefungen
   (Auflösung, Fälle, Tabelle, Beispielwerte) offen, und die Bedienteile sind ausgeblendet.
   Nichts wird gespeichert, keine Namen. Farben nur über CSS-Variablen, keine Werte im Skript.
   Braucht: HILDE (ruhig) aus hilde.js – fällt ohne HILDE auf die Systemeinstellung zurück. */
(function () {
  "use strict";
  var liste = document.getElementById("sh-hebel-liste");
  if (!liste) return;
  liste.classList.add("sh-js");
  /* SVG-Namensraum vom vorhandenen <svg> der Seite lesen (keine Adresse im Skript, tools/pruefen.py) */
  var NS = (document.querySelector("#sh-hebel-liste svg") || {}).namespaceURI;
  var wurzel = document.documentElement;

  function ruhig() {
    if (window.HILDE && HILDE.ruhig) return HILDE.ruhig();
    return !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  function farbe(name) { return getComputedStyle(wurzel).getPropertyValue(name).trim(); }
  function komma(x) { return x.toFixed(1).replace(".", ","); }
  function el(id) { return document.getElementById(id); }
  function waehle(gruppe, knopf) {
    [].forEach.call(gruppe.querySelectorAll("button"), function (b) { b.setAttribute("aria-pressed", String(b === knopf)); });
  }
  function frei(schritt) { if (schritt) schritt.setAttribute("aria-disabled", "false"); }
  function gesperrt(knopf) { return knopf.getAttribute("aria-disabled") === "true"; }

  /* S · Verdecken – Entscheidung, Sicherheit, Codewort von der Tafel, dann lösen sich drei Schwärzungen (scaleX). */
  (function () {
    var akte = el("sh-s-akte"), stand = el("sh-s-stand"), tafel = el("sh-s-tafel"), code = el("sh-s-code");
    if (!akte) return;
    var wahl = null, sicher = null, fertig = false;
    akte.open = true;
    akte.classList.add("sh-s-zu");
    [].forEach.call(el("sh-s-wahl").querySelectorAll("button"), function (b) {
      b.addEventListener("click", function () {
        if (fertig) return;
        wahl = b.getAttribute("data-w"); waehle(b.parentNode, b); frei(el("sh-s-2"));
        stand.textContent = "Deine Entscheidung: " + wahl + ". Wie sicher bist du dir?";
      });
    });
    [].forEach.call(el("sh-s-sicher").querySelectorAll("button"), function (b) {
      b.addEventListener("click", function () {
        if (fertig || !wahl) return;
        sicher = b.getAttribute("data-s"); waehle(b.parentNode, b); tafel.hidden = false;
        stand.textContent = "Festgelegt: " + wahl + ", " + sicher + ". Jetzt wartet die Auflösung auf das Codewort an der Tafel.";
        code.focus();
      });
    });
    function aufloesen() {
      if (fertig) return;
      if (!code.value.trim()) { stand.textContent = "Schreib zuerst das Codewort von der Tafel."; return; }
      fertig = true; tafel.hidden = true;
      if (ruhig()) akte.classList.add("sh-sofort");
      akte.classList.remove("sh-s-zu");
      el("sh-s-rueck").hidden = false;
      stand.textContent = "Aufgedeckt: was London tat – nicht, was richtig war. Du hattest gewählt: " + wahl + " (" + sicher + ").";
    }
    el("sh-s-auf").addEventListener("click", aufloesen);
    code.addEventListener("keydown", function (e) { if (e.key === "Enter") aufloesen(); });
  })();

  /* T · Rückmelden – drei Fälle, gestufte Rückmeldung am Ort, Zwischenstand, Zurücklegen bei »Eher nicht«.
     Die Fälle stehen im HTML (Vertiefung ohne JavaScript) und werden hier gelesen – eine Quelle. */
  (function () {
    var daten = el("sh-t-daten"), fall = el("sh-t-fall"), stand = el("sh-t-stand"), zw = el("sh-t-zwischen");
    if (!daten) return;
    var NAME = { passt: "Passt", vertretbar: "Vertretbar", eher: "Eher nicht" };
    var ZEICHEN = { passt: "✓", vertretbar: "~", eher: "–" };
    var F = [].map.call(daten.children, function (li) {
      return {
        text: li.querySelector(".sh-t-text").textContent,
        opt: [].map.call(li.querySelectorAll("li[data-stufe]"), function (o) {
          var name = o.querySelector("b").textContent;
          var rest = o.textContent.slice(name.length).replace(/^\s*–\s*[^:]+:\s*/, "");
          return { name: name, stufe: o.getAttribute("data-stufe"), satz: rest };
        })
      };
    });
    var i = 0, erg = [null, null, null], punkte = el("sh-t-leiste").querySelectorAll(".sh-t-punkt");
    function leiste() {
      [].forEach.call(punkte, function (p, k) {
        if (erg[k]) p.setAttribute("data-s", erg[k]); else p.removeAttribute("data-s");
        p.setAttribute("aria-current", String(k === i));
        p.textContent = erg[k] ? ZEICHEN[erg[k]] : String(k + 1);
      });
      var n = { passt: 0, vertretbar: 0, eher: 0 }, fertig = 0;
      erg.forEach(function (e) { if (e) { n[e]++; fertig++; } });
      zw.textContent = fertig ? fertig + " von 3 · " + n.passt + " passt, " + n.vertretbar + " vertretbar, " + n.eher + " eher nicht" : "";
    }
    function zeige() {
      var f = F[i];
      fall.textContent = "";
      var p = document.createElement("p");
      p.innerHTML = "<b>Fall " + (i + 1) + " von 3:</b> ";
      p.appendChild(document.createTextNode(f.text));
      fall.appendChild(p);
      var opt = document.createElement("div");
      opt.className = "sh-t-optionen";
      fall.appendChild(opt);
      f.opt.forEach(function (o) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "sh-t-opt"; b.textContent = o.name; b.setAttribute("aria-pressed", "false");
        opt.appendChild(b);
        b.addEventListener("click", function (e) {
          if (erg[i]) return;
          erg[i] = o.stufe; b.setAttribute("aria-pressed", "true");
          [].forEach.call(opt.querySelectorAll("button"), function (x) { x.setAttribute("aria-disabled", "true"); });
          var a = document.createElement("div");
          a.className = "sh-t-antwort" + (ruhig() || e.detail === 0 ? " sh-sofort" : "");
          var kopf = document.createElement("b"); kopf.textContent = NAME[o.stufe];
          a.appendChild(kopf); a.appendChild(document.createTextNode(o.satz));
          fall.appendChild(a);
          var w = document.createElement("div"); w.className = "sh-wahl"; fall.appendChild(w);
          if (o.stufe === "eher") {
            var z = document.createElement("button"); z.type = "button"; z.className = "knopf still"; z.textContent = "Zurücklegen und neu versuchen";
            w.appendChild(z);
            z.addEventListener("click", function () { erg[i] = null; leiste(); zeige(); fall.querySelector(".sh-t-opt").focus(); });
          }
          if (i < 2) {
            var n = document.createElement("button"); n.type = "button"; n.className = "knopf"; n.textContent = "Nächster Fall";
            w.appendChild(n);
            n.addEventListener("click", function () { i++; leiste(); zeige(); fall.querySelector(".sh-t-opt").focus(); });
          }
          leiste();
          stand.textContent = NAME[o.stufe] + ": " + o.satz + (i === 2 && erg.every(Boolean) ? " Alle drei Fälle bearbeitet." : "");
        });
      });
    }
    zeige(); leiste();
  })();

  /* U · Messen – Vorhersage, drei Durchgänge mit verdeckter Uhr, Punkte auf der Skala, Band der Streuung. */
  (function () {
    var knopf = el("sh-u-knopf"), neu = el("sh-u-neu"), stand = el("sh-u-stand"), uhr = el("sh-u-uhr"), lauf = el("sh-u-durchgang");
    var skala = el("sh-u-skala"), band = el("sh-u-band"), marke = el("sh-u-tippmarke"), schritt = el("sh-u-2");
    if (!knopf) return;
    var punkte = skala.querySelectorAll(".sh-u-punkt");
    var TIPP = { frueh: "eher zu früh", genau: "ziemlich genau", spaet: "eher zu spät" };
    var LAGE = { frueh: "25%", genau: "50%", spaet: "75%" };
    var tipp = null, mess = [], t0 = 0;
    function lage(s) { return Math.max(0, Math.min(100, (s - 2) / 6 * 100)); }
    [].forEach.call(el("sh-u-tipp").querySelectorAll("button"), function (b) {
      b.addEventListener("click", function () {
        if (mess.length) return;
        tipp = b.getAttribute("data-u"); waehle(b.parentNode, b); frei(schritt); knopf.setAttribute("aria-disabled", "false");
        marke.textContent = "deine Vorhersage: " + TIPP[tipp]; marke.style.left = LAGE[tipp]; marke.hidden = false;
        stand.textContent = "Vorhersage: " + TIPP[tipp] + ". Tippe »Start«.";
        knopf.focus();
      });
    });
    function druck() {
      if (gesperrt(knopf) || mess.length >= 3) return;
      if (!t0) {
        t0 = performance.now(); knopf.textContent = "Stopp"; uhr.textContent = "läuft …";
        stand.textContent = "Läuft. Stopp, wenn du glaubst, fünf Sekunden sind um.";
        return;
      }
      var s = (performance.now() - t0) / 1000; t0 = 0; mess.push(s);
      uhr.textContent = komma(s) + " s";
      var p = punkte[mess.length - 1];
      if (ruhig()) p.classList.add("sh-sofort");
      p.classList.add("sh-an");
      p.style.transform = "translateX(" + (lage(s) / 100 * skala.offsetWidth) + "px)";
      if (mess.length < 3) {
        knopf.textContent = "Start"; lauf.textContent = "Durchgang " + (mess.length + 1) + " von 3";
        stand.textContent = "Durchgang " + mess.length + ": " + komma(s) + " Sekunden. Weiter mit »Start«.";
        return;
      }
      knopf.hidden = true; neu.hidden = false; lauf.textContent = "fertig";
      var min = Math.min.apply(null, mess), max = Math.max.apply(null, mess);
      var m = mess.reduce(function (a, x) { return a + x; }, 0) / 3;
      band.style.left = lage(min) + "%"; band.style.width = Math.max(1, lage(max) - lage(min)) + "%"; band.classList.add("sh-an");
      var ist = m < 4.7 ? "frueh" : (m > 5.3 ? "spaet" : "genau");
      stand.textContent = "Deine Messreihe: " + mess.map(komma).join(" · ") + " s. Mittelwert " + komma(m) + " s, Spanne " + komma(max - min) +
        " s. Du warst im Mittel " + TIPP[ist] + " – vorhergesagt hattest du: " + TIPP[tipp] + (ist === tipp ? ". Stimmt." : ".");
      neu.focus();
    }
    knopf.addEventListener("click", druck);
    knopf.addEventListener("keydown", function (e) { if (e.code === "Space") { e.preventDefault(); if (!e.repeat) druck(); } });
    neu.addEventListener("click", function () {
      mess = []; t0 = 0;
      [].forEach.call(punkte, function (p) { p.classList.remove("sh-an", "sh-sofort"); p.style.transform = ""; });
      band.classList.remove("sh-an"); knopf.hidden = false; knopf.textContent = "Start"; neu.hidden = true;
      uhr.textContent = "· · ·"; lauf.textContent = "Durchgang 1 von 3"; stand.textContent = "Noch einmal: Tippe »Start«.";
      knopf.focus();
    });
  })();

  /* V · Variieren – Vermutung, dann Hürde verschieben; Balken mit Hürdenlinie, zehn Sitze, Stimmen unter der Hürde.
     Beispiel: 20 Stimmen, fünf Listen, Verteilung nach größten Resten (vereinfacht). */
  (function () {
    var balken = el("sh-v-balken"), regler = el("sh-v-regler"), wert = el("sh-v-wert"), stand = el("sh-v-stand"), unter = el("sh-v-unter"), sitze = el("sh-v-sitze");
    if (!balken) return;
    var L = [["Liste A", 8], ["Liste B", 6], ["Liste C", 3], ["Liste D", 2], ["Liste E", 1]], SUMME = 20, SITZE = 10, ACHSE = 40, tipp = null;
    var TON = ["--text", "--lernen", "--lernen-tief", "--stahl", "--leise"];
    L.forEach(function (l) {
      var z = document.createElement("div");
      z.className = "sh-v-zeile";
      z.innerHTML = '<span></span><span class="sh-v-spur"><span class="sh-v-fuell"></span><span class="sh-v-linie"></span></span><span class="sh-v-zahl"></span>';
      z.firstChild.textContent = l[0];
      z.firstChild.className = "sh-v-name";
      z.firstChild.style.setProperty("--ton", "var(" + TON[L.indexOf(l)] + ")");
      balken.appendChild(z); l.z = z;
      z.querySelector(".sh-v-fuell").style.transform = "scaleX(" + (l[1] / SUMME * 100 / ACHSE) + ")";
      z.querySelector(".sh-v-zahl").textContent = (l[1] / SUMME * 100) + " %";
    });
    var plaetze = [];
    for (var k = 0; k < SITZE; k++) {
      var a = Math.PI * (1 - (k + .5) / SITZE), c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", 110 + Math.cos(a) * 85); c.setAttribute("cy", 110 - Math.sin(a) * 85); c.setAttribute("r", 12);
      c.setAttribute("stroke-width", "2"); c.setAttribute("fill", farbe("--karton")); c.setAttribute("stroke", farbe("--stahl"));
      sitze.appendChild(c); plaetze.push(c);
    }
    unter.textContent = "Die Sitze erscheinen nach deiner Vermutung.";
    function rechne(h) {
      var drin = L.filter(function (l) { return l[1] / SUMME * 100 >= h; });
      var s = drin.reduce(function (x, l) { return x + l[1]; }, 0), reste = [], vergeben = 0;
      L.forEach(function (l) { l.sitze = 0; });
      drin.forEach(function (l) { var q = l[1] / s * SITZE; l.sitze = Math.floor(q); vergeben += l.sitze; reste.push([q - l.sitze, l]); });
      reste.sort(function (x, y) { return y[0] - x[0]; });
      for (var j = 0; vergeben < SITZE && j < reste.length; j++, vergeben++) reste[j][1].sitze++;
      var p = 0;
      L.forEach(function (l, li) { for (var n = 0; n < l.sitze; n++) { plaetze[p].setAttribute("fill", farbe(TON[li])); plaetze[p].setAttribute("stroke", farbe("--flaeche")); p++; } });
      L.forEach(function (l) {
        var raus = drin.indexOf(l) < 0, anteil = l[1] / SUMME * 100;
        l.z.classList.toggle("sh-v-raus", raus);
        l.z.querySelector(".sh-v-linie").style.left = (h / ACHSE * 100) + "%";
        l.z.querySelector(".sh-v-zahl").textContent = anteil + " % · " + (raus ? "raus" : l.sitze + " " + (l.sitze === 1 ? "Sitz" : "Sitze"));
      });
      var ohne = SUMME - s;
      unter.textContent = ohne + " von 20 Stimmen für Listen unter der Hürde";
      return drin.length;
    }
    function zeige() {
      var h = +regler.value;
      wert.textContent = h; regler.setAttribute("aria-valuetext", h + " Prozent");
      var n = rechne(h);
      stand.textContent = "Bei " + h + " % kommen " + n + " von 5 Listen ins Parlament." +
        (tipp !== null && h === 5 ? " Deine Vermutung war " + tipp + (tipp === n ? " – stimmt." : " – Liste E hat genau 5 % und ist gerade noch drin.") : "");
    }
    [].forEach.call(el("sh-v-wahl").querySelectorAll("button"), function (b) {
      b.addEventListener("click", function () {
        tipp = +b.getAttribute("data-v"); waehle(b.parentNode, b); frei(el("sh-v-2"));
        regler.disabled = false;
        [].forEach.call(el("sh-v-rast").querySelectorAll("button"), function (x) { x.setAttribute("aria-disabled", "false"); });
        zeige(); regler.focus();
      });
    });
    regler.addEventListener("input", zeige);
    [].forEach.call(el("sh-v-rast").querySelectorAll("button"), function (b) {
      b.addEventListener("click", function () { if (gesperrt(b)) return; regler.value = b.getAttribute("data-h"); zeige(); });
    });
  })();

  /* W · Stufen – drei Lesetiefen am selben Ort, neu Hinzugekommenes unterlegt, je Stufe eine Denkfrage.
     Wachsen am Ort über View Transitions (--dauer-uebergang), sonst sofort. */
  (function () {
    var text = el("sh-w-text"), stand = el("sh-w-stand"), denk = el("sh-w-denk");
    if (!text) return;
    var NAME = { 1: "Einstieg", 2: "Vertiefung", 3: "Kontroverse" };
    var DENK = {
      1: "Denkfrage: Nenne ein Ereignis, das dir heute »klar« vorkommt. War es das damals auch?",
      2: "Denkfrage: Was wusste man im Mai 1940 – und was wissen wir erst heute?",
      3: "Denkfrage: Welcher heutige Maßstab gehört in dein Urteil – und wo wird er unfair?"
    };
    var stufe = 1, saetze = text.querySelectorAll("[data-w-stufe]");
    function setze(n, alt) {
      [].forEach.call(saetze, function (p) {
        var s = +p.getAttribute("data-w-stufe");
        p.hidden = s > n;
        if (s > alt && s <= n) p.setAttribute("data-neu", ""); else p.removeAttribute("data-neu");
      });
      denk.textContent = DENK[n];
    }
    setze(1, 1);
    [].forEach.call(el("sh-w-wahl").querySelectorAll("button"), function (b) {
      b.addEventListener("click", function (e) {
        var n = +b.getAttribute("data-w"), alt = stufe;
        if (n === alt) return;
        function an() {
          setze(n, alt); waehle(b.parentNode, b); stufe = n;
          stand.textContent = "Stufe: " + NAME[n] + (n > alt ? " – neu ist unterlegt." : ".");
        }
        if (document.startViewTransition && !ruhig() && e.detail !== 0) {
          text.style.viewTransitionName = "sh-w-text";
          var t = document.startViewTransition(an);
          t.finished.then(function () { text.style.viewTransitionName = ""; }, function () { text.style.viewTransitionName = ""; });
        } else an();
      });
    });
  })();

  /* X · Bündeln – deine Stimme fliegt ins Halbrund (--dauer-flug), dann die Klasse; »Nach dem Gespräch« färbt um.
     Die anderen 23 Stimmen sind Beispielwerte (vor: 10 · 8 · 5, nach: 6 · 11 · 6). */
  (function () {
    var svg = el("sh-x-halb"), leg = el("sh-x-legende"), stand = el("sh-x-stand"), nachKnopf = el("sh-x-nach");
    if (!svg) return;
    var VOR = [10, 8, 5], NACH = [6, 11, 6], NAMEN = ["sicher", "eher sicher", "unsicher"];
    var FUELL = ["--text", "--lernen", "--flaeche"], RAND = ["--text", "--lernen", "--text"];
    var plaetze = [];
    [[7, 58], [8, 90], [9, 122]].forEach(function (rw) {
      for (var j = 0; j < rw[0]; j++) {
        var a = Math.PI * (1 - (j + .5) / rw[0]);
        plaetze.push({ x: 160 + Math.cos(a) * rw[1] * 1.15, y: 165 - Math.sin(a) * rw[1], a: a });
      }
    });
    plaetze.sort(function (p, q) { return q.a - p.a; });
    var kreise = plaetze.map(function (p) {
      var c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", p.x); c.setAttribute("cy", p.y); c.setAttribute("r", 9);
      c.setAttribute("fill", farbe("--karton")); c.setAttribute("stroke", farbe("--stahl")); c.setAttribute("stroke-width", "1.5");
      svg.appendChild(c); return c;
    });
    var du = document.createElementNS(NS, "circle");
    du.setAttribute("class", "sh-x-du"); du.setAttribute("r", 11); du.setAttribute("cx", 160); du.setAttribute("cy", 172);
    du.setAttribute("fill", farbe("--lernen-zart")); du.setAttribute("stroke", farbe("--text")); du.setAttribute("stroke-width", "4");
    du.style.opacity = "0"; svg.appendChild(du);
    var meine = null, nach = false;
    function male(basis) {
      var z = basis.slice(); z[meine]++;
      var idx = 0, mein = 0;
      z.forEach(function (n, g) {
        for (var j = 0; j < n; j++) {
          kreise[idx].setAttribute("fill", farbe(FUELL[g])); kreise[idx].setAttribute("stroke", farbe(RAND[g]));
          if (g === meine && j === n - 1) mein = idx;
          idx++;
        }
      });
      leg.textContent = "";
      z.forEach(function (n, g) {
        var s = document.createElement("span"); s.style.setProperty("--f", "var(" + FUELL[g] + ")"); s.style.setProperty("--r", "var(" + RAND[g] + ")");
        s.textContent = NAMEN[g] + ": " + n; leg.appendChild(s);
      });
      var d = document.createElement("span"); d.className = "sh-x-du-legende"; d.textContent = "du (dicker Rand)"; leg.appendChild(d);
      return { z: z, platz: mein };
    }
    function setze(platz, fliegen) {
      var p = plaetze[platz];
      du.classList.toggle("sh-sofort", !fliegen);
      du.style.transform = "translate(" + (p.x - 160) + "px," + (p.y - 172) + "px)";
    }
    function satz(z) { return z[0] + " sicher, " + z[1] + " eher sicher, " + z[2] + " unsicher"; }
    [].forEach.call(el("sh-x-wahl").querySelectorAll("button"), function (b) {
      b.addEventListener("click", function (e) {
        if (meine !== null) return;
        meine = +b.getAttribute("data-x"); waehle(b.parentNode, b);
        var r = male(VOR), fliegen = !ruhig() && e.detail !== 0;
        du.style.opacity = "1";
        if (fliegen) requestAnimationFrame(function () { requestAnimationFrame(function () { setze(r.platz, true); }); });
        else setze(r.platz, false);
        nachKnopf.hidden = false;
        stand.textContent = "Deine Stimme: " + NAMEN[meine] + ". Die Klasse vor dem Gespräch (Beispiel): " + satz(r.z) + ".";
      });
    });
    nachKnopf.addEventListener("click", function (e) {
      nach = !nach;
      var r = male(nach ? NACH : VOR);
      setze(r.platz, !ruhig() && e.detail !== 0);
      nachKnopf.textContent = nach ? "Vor dem Gespräch (Beispiel)" : "Nach dem Gespräch (Beispiel)";
      stand.textContent = (nach ? "Nach dem Gespräch (Beispiel): " : "Vor dem Gespräch (Beispiel): ") + satz(r.z) + "." +
        (nach ? " Weniger »sicher«, mehr »eher sicher« – was hat die Diskussion bewirkt?" : "");
    });
  })();
})();
