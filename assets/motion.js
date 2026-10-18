/* Hilde Digital – Bewegungsmuster aus dem Motion-Musterbuch 2 (ab Version 4.4).
   F Passer · G Farbauszug (CSS, hier nur nichts zu tun) · J Stanzloch (CSS) · I Stundenlinie (in tablets-weg.js)
   K Schnellhefter · L Durchschlag · M Zählwerk · N Leporello · O Plattenwechsel.
   Grundsätze (Emil Kowalski): Jede Bewegung hat einen Zweck, ist kurz (unter 500 ms), startet durch die Nutzerin
   oder einmal beim Erscheinen und läuft nie in Schleife. Bei »weniger Bewegung« bleibt der Zustand, die Bewegung entfällt.
   Mit der Tastatur ausgelöste Handlungen werden nicht animiert. Nichts Lesbares wird versteckt, was beim Laden schon zu sehen ist.
   Läuft eigenständig auf jeder Seite; nutzt BEISPIELE und HILDE nur, wenn vorhanden. */
(function () {
  "use strict";
  var doc = document, root = doc.documentElement;
  function ruhig() { return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
  function neuStarten(el, klasse) { el.classList.remove(klasse); void el.offsetWidth; el.classList.add(klasse); }
  function sitzung(schluessel) {
    try { if (sessionStorage.getItem(schluessel)) return false; sessionStorage.setItem(schluessel, "1"); return true; }
    catch (e) { return false; }
  }

  /* ---------- F · Passer: einmal je Sitzung und Seite ---------- */
  function passer() {
    var h = doc.querySelector("[data-passer]");
    if (!h || ruhig()) return;
    if (sitzung("hilde.passer." + location.pathname.split("/").pop())) h.classList.add("passer-lauf");
  }

  /* ---------- K · Schnellhefter: gemerkte Beispiele nur in diesem Browser ---------- */
  var SCHLUESSEL = "hilde.merkliste";
  function merkliste() {
    try { var t = localStorage.getItem(SCHLUESSEL); var l = t ? JSON.parse(t) : []; return Array.isArray(l) ? l : []; }
    catch (e) { return []; }
  }
  function speichere(l) { try { localStorage.setItem(SCHLUESSEL, JSON.stringify(l)); } catch (e) { /* ohne Speicher weiter */ } }

  function zeigeZahl(animiert) {
    var n = merkliste().length;
    doc.querySelectorAll(".hefter-link").forEach(function (a) {
      var z = a.querySelector(".hefter-zahl");
      a.setAttribute("aria-label", "Mein Schnellhefter: " + n + (n === 1 ? " Beispiel" : " Beispiele") + " gemerkt");
      if (!z) return;
      if (!animiert || ruhig()) { z.textContent = n; return; }
      z.classList.add("rollt");
      setTimeout(function () { z.textContent = n; z.classList.remove("rollt"); }, 110);
      neuStarten(a, "andruck");
    });
  }
  function zeigeKnoepfe() {
    var l = merkliste();
    doc.querySelectorAll("[data-merken]").forEach(function (b) {
      var an = l.indexOf(b.getAttribute("data-merken")) > -1;
      b.setAttribute("aria-pressed", String(an));
      var t = b.querySelector(".merken-text"), soll = an ? "Gemerkt" : "Merken";
      if (t && t.textContent !== soll) t.textContent = soll;
    });
  }
  function fliege(knopf, fertig) {
    var ziel = doc.querySelector(".hefter-link svg");
    var karte = knopf.closest("article, .karte, .detail, li, section");
    var bild = karte && karte.querySelector("img");
    if (!ziel || !bild || ruhig()) { fertig(); return; }
    var r = bild.getBoundingClientRect(), z = ziel.getBoundingClientRect();
    if (!r.width || z.bottom < 0) { fertig(); return; }
    var f = bild.cloneNode(false); f.removeAttribute("loading"); f.alt = ""; f.className = "flieger";
    f.style.left = r.left + "px"; f.style.top = r.top + "px"; f.style.width = r.width + "px"; f.style.height = r.height + "px";
    doc.body.appendChild(f);
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      var dx = z.left + z.width / 2 - (r.left + r.width / 2), dy = z.top + z.height / 2 - (r.top + r.height / 2);
      f.style.transform = "translate(" + dx + "px," + dy + "px) scale(" + Math.max(.06, z.width / r.width) + ")";
      f.style.opacity = ".35";
    }); });
    setTimeout(function () { f.remove(); fertig(); }, 440);
  }
  doc.addEventListener("click", function (e) {
    var knopf = e.target.closest("[data-merken]");
    if (!knopf) return;
    var id = knopf.getAttribute("data-merken"), l = merkliste(), i = l.indexOf(id), neu = i < 0;
    if (neu) l.push(id); else l.splice(i, 1);
    speichere(l);
    zeigeKnoepfe();
    var meldung = doc.getElementById("hefter-meldung");
    if (meldung) meldung.textContent = neu ? "In den Schnellhefter gelegt." : "Aus dem Schnellhefter genommen.";
    var danach = function () { zeigeZahl(true); doc.dispatchEvent(new CustomEvent("hilde:merkliste")); };
    // Mit der Tastatur (detail 0) kein Flug: die Handlung soll sofort wirken.
    if (neu && e.detail !== 0) fliege(knopf, danach); else danach();
  });

  /* Galerie: Bereich »Mein Schnellhefter« */
  function zeigeHefter() {
    var ort = doc.getElementById("hefter-liste");
    if (!ort || typeof BEISPIELE === "undefined" || typeof HILDE === "undefined") return;
    var l = merkliste();
    var gemerkt = l.map(function (id) { return BEISPIELE.filter(function (b) { return b.id === id; })[0]; }).filter(Boolean);
    var leer = doc.getElementById("hefter-leer");
    if (leer) leer.hidden = gemerkt.length > 0;
    ort.innerHTML = gemerkt.map(HILDE.miniKarte).join("");
  }
  doc.addEventListener("hilde:merkliste", zeigeHefter);

  /* ---------- L · Durchschlag beim Kopieren ---------- */
  doc.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b || !/kopier/i.test(b.textContent + " " + (b.id || "")) || ruhig() || e.detail === 0) return;
    var feld = null, k = b;
    for (var i = 0; i < 5 && k && !feld; i++) { k = k.parentElement; if (k) feld = k.querySelector("textarea, pre, .prompt-text"); }
    if (!feld) return;
    var r = feld.getBoundingClientRect();
    if (!r.width || r.bottom < 0 || r.top > innerHeight) return;
    var g = doc.createElement("div"); g.className = "durchschlag-geist"; g.setAttribute("aria-hidden", "true");
    g.style.left = r.left + "px"; g.style.top = r.top + "px"; g.style.width = r.width + "px"; g.style.height = r.height + "px";
    doc.body.appendChild(g);
    requestAnimationFrame(function () { requestAnimationFrame(function () { g.style.transform = "translate(14px,14px)"; g.style.opacity = "0"; }); });
    setTimeout(function () { g.remove(); }, 440);
  });

  /* ---------- M · Zählwerk: einmal, wenn die Kennzahlen ins Bild kommen ---------- */
  function zaehlwerk() {
    var liste = doc.getElementById("kennzahlen");
    if (!liste || ruhig() || !("IntersectionObserver" in window)) return;
    if (liste.getBoundingClientRect().top < innerHeight) return; // schon zu sehen: nichts verändern
    var io = new IntersectionObserver(function (es) {
      if (!es.some(function (x) { return x.isIntersecting; })) return;
      io.disconnect();
      liste.querySelectorAll("li > b").forEach(function (b) {
        var wert = b.textContent.trim();
        if (!/^\d+$/.test(wert)) return;
        var baender = wert.split("").map(function (d, i) {
          var s = ""; for (var k = 0; k <= 9; k++) s += "<span>" + k + "</span>";
          return '<span class="ziffer"><span class="band" data-d="' + d + '" style="transition-delay:' + i * 60 + 'ms">' + s + "</span></span>";
        }).join("");
        b.innerHTML = '<span class="sr-only">' + wert + '</span><span class="zaehlwerk" aria-hidden="true">' + baender + "</span>";
        requestAnimationFrame(function () { requestAnimationFrame(function () {
          b.querySelectorAll(".band").forEach(function (x) { x.style.transform = "translateY(-" + x.getAttribute("data-d") + "em)"; });
        }); });
        setTimeout(function () { b.textContent = wert; }, 900); // danach wieder schlichter Text
      });
    }, { threshold: .4 });
    io.observe(liste);
  }

  /* ---------- N · Leporello: Schritte der Labore entfalten sich einmal ---------- */
  function leporello() {
    var listen = [].slice.call(doc.querySelectorAll(".einblick"));
    if (!listen.length || ruhig() || !("IntersectionObserver" in window)) return;
    var spaeter = listen.filter(function (x) { return x.getBoundingClientRect().top > innerHeight; });
    if (!spaeter.length) return;
    root.classList.add("leporello-an");
    spaeter.forEach(function (x) {
      x.querySelectorAll(".einblick-schritte li").forEach(function (li, i) { li.style.setProperty("--i", i); });
      x.classList.add("gefaltet");
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.remove("gefaltet"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -15% 0px" });
    spaeter.forEach(function (x) { io.observe(x); });
  }

  /* ---------- O · Plattenwechsel über der Galerie ---------- */
  function plattenwechsel() {
    var band = doc.getElementById("plattenband"), gruppe = doc.getElementById("bereich");
    if (!band || !gruppe) return;
    var setze = function () {
      var an = gruppe.querySelector('[aria-pressed="true"]');
      band.setAttribute("data-wahl", an ? an.getAttribute("data-bereich") : "alle");
    };
    setze();
    new MutationObserver(setze).observe(gruppe, { subtree: true, attributes: true, attributeFilter: ["aria-pressed"] });
  }

  function start() {
    passer(); zeigeZahl(false); zeigeKnoepfe(); zeigeHefter(); zaehlwerk(); leporello(); plattenwechsel();
    // Später gezeichnete Karten (Galerie-Treffer, Detailseite) bekommen ihren Merk-Zustand nachgereicht.
    new MutationObserver(function (m) {
      if (m.some(function (x) { return x.addedNodes.length; })) zeigeKnoepfe();
    }).observe(doc.getElementById("inhalt") || doc.body, { childList: true, subtree: true });
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", start); else start();
})();
