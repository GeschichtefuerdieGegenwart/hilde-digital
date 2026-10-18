/* Hilde Digital – Fächer: echte Ansichten als Kartenfächer mit Tiefe (ab Version 4.3).
   Die Karte in der Mitte steht gerade, nah und in echten Farben. Nach außen drehen sich die Karten weg,
   werden kleiner und verblassen in die Duplex-Vorschau (Druckfarben des Bereichs).
   Bewegung nur über transform und opacity, berechnet aus der Scrollposition (natives Scrollen und Einrasten).

   gleiten: true  → der Fächer läuft langsam von selbst (Galerie, etwa 24 px/s, linear wie ein Laufband).
                    Hält an beim Überfahren, beim Fokus, beim Berühren, außerhalb des Bildschirms und mit dem Knopf.
                    Nach dem Berühren läuft er nach 6 Sekunden Ruhe weiter. »Angehalten« bleibt im Browser.
   gleiten: false → nur Wischen, Blättern und Pfeiltasten (Startseite).
   Weniger Bewegung: kein Gleiten, keine Drehung, nur eine flache Reihe mit Einrasten.

   Unter dem Fächer steht immer die Karte in der Mitte: Titel, Kurzbeschreibung und zwei Wege
   (»Beispiel ansehen«, »Ausprobieren ↗«). Ein Klick auf das mittlere Bild öffnet die Bildansicht,
   ein Klick auf eine andere Karte holt sie in die Mitte.
   Braucht: HILDE, BEISPIELE (mit ansichten aus assets/daten/galerie.js). */
(function (wurzel) {
  "use strict";
  var H = wurzel.HILDE;

  function starte(o) {
    var huelle = document.getElementById(o.id);
    if (!huelle || !H) return;
    var esc = H.esc;
    var eintraege = o.eintraege, n = eintraege.length;
    if (!n) return;
    var ruhigMQ = wurzel.matchMedia ? wurzel.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
    var ruhig = ruhigMQ.matches;
    var gleiten = !!o.gleiten && !ruhig;
    var duplex = function (p) { return p.replace("assets/galerie/", "assets/galerie/duplex/"); };

    var karte = function (x, k, kopie) {
      return '<li class="faecher-karte' + (kopie ? " faecher-kopie" : "") + '"' + (kopie ? ' aria-hidden="true"' : "") + ' data-k="' + k + '">' +
        '<button type="button" class="faecher-bild" tabindex="-1" data-k="' + k + '">' +
          '<img class="faecher-original" src="' + esc(x.a.bild) + '" alt="' + (kopie ? "" : esc(x.a.alt)) + '" width="1040" height="650" loading="lazy" decoding="async">' +
          '<img class="faecher-duplex" src="' + esc(duplex(x.a.bild)) + '" alt="" width="640" height="400" loading="lazy" decoding="async">' +
        "</button>" +
        '<p class="faecher-name">' + esc(x.b.titel) + "</p></li>";
    };
    huelle.innerHTML =
      '<div class="faecher-buehne"><ul class="faecher-spur" tabindex="0" aria-label="' + esc(o.name) + ', mit Pfeiltasten blättern">' +
        eintraege.map(function (x, k) { return karte(x, k, false); }).join("") +
        (gleiten ? eintraege.map(function (x, k) { return karte(x, k, true); }).join("") : "") +
      "</ul></div>" +
      '<div class="faecher-unten">' +
        '<div class="faecher-text" id="' + o.id + '-text"></div>' +
        '<div class="faecher-steuerung">' +
          '<button type="button" class="knopf still" data-f="zurueck" aria-label="Vorherige Ansicht"><span aria-hidden="true">←</span></button>' +
          '<button type="button" class="knopf still" data-f="vor" aria-label="Nächste Ansicht"><span aria-hidden="true">→</span></button>' +
          (gleiten ? '<button type="button" class="knopf still" data-f="pause" aria-pressed="false">Anhalten</button>' : "") +
        "</div></div>";

    var spur = huelle.querySelector(".faecher-spur"), text = document.getElementById(o.id + "-text");
    var karten = [].slice.call(spur.children);
    var pauseKnopf = huelle.querySelector('[data-f="pause"]');
    huelle.classList.toggle("faecher-flach", ruhig);
    huelle.classList.toggle("faecher-gleitet", gleiten);

    var mitte = -1, wartet = false;
    function breite() { return karten[0].offsetWidth; }
    function satzBreite() { return gleiten ? karten[n].offsetLeft - karten[0].offsetLeft : 0; }

    function zeichne() {
      wartet = false;
      var m = spur.scrollLeft + spur.clientWidth / 2, b = breite() || 300, best = 0, bestD = 1e9;
      for (var i = 0; i < karten.length; i++) {
        var k = karten[i], c = k.offsetLeft + k.offsetWidth / 2, d = (c - m) / b, a = Math.abs(d);
        if (a < bestD) { bestD = a; best = i; }
        if (a > 4) { k.style.opacity = "0"; continue; }
        if (ruhig) {
          k.style.transform = "scale(" + (1 - Math.min(1, a) * .08).toFixed(3) + ")";
          k.style.opacity = (1 - Math.min(1, a) * .3).toFixed(3);
        } else {
          var s = d < 0 ? -1 : 1;
          k.style.transform = "translateX(" + (-s * Math.min(a, 2.2) * 40).toFixed(1) + "px) rotateY(" + (-s * Math.min(a, 1) * 38).toFixed(1) + "deg) scale(" + (1 - Math.min(a, 1.6) * .15).toFixed(3) + ")";
          k.style.opacity = (1 - Math.min(1, a / 2.4) * .8).toFixed(3);
          k.style.zIndex = String(100 - Math.round(a * 20));
        }
        k.style.setProperty("--duplex", ruhig ? "0" : Math.max(0, Math.min(1, (a - .35) * 1.6)).toFixed(3));
        k.classList.toggle("ist-mitte", a < .5);
      }
      var neu = best % n;
      if (neu !== mitte) { mitte = neu; zeigeText(); }
    }
    function zeigeText() {
      var x = eintraege[mitte];
      text.innerHTML = H.kennzeichen(x.b) + '<p class="faecher-titel">' + esc(x.b.titel) + '</p><p class="faecher-kurz">' + esc(x.a.text) + "</p>" +
        '<p class="faecher-wege"><a class="knopf" href="' + H.detailLink(x.b) + '">Beispiel ansehen<span class="sr-only">: ' + esc(x.b.titel) + "</span></a>" +
        (x.b.link ? '<a class="knopf still" href="' + esc(x.b.link) + '" target="_blank" rel="noopener">Ausprobieren <span aria-hidden="true">↗</span><span class="sr-only"> (neuer Tab, braucht Internet)</span></a>'
                  : '<span class="faecher-offen">noch nicht online</span>') + "</p>";
    }
    function plane() { if (!wartet) { wartet = true; requestAnimationFrame(zeichne); } }
    spur.addEventListener("scroll", plane, { passive: true });
    wurzel.addEventListener("resize", plane);

    function zuKarte(i, sofort) {
      var k = karten[i];
      spur.scrollTo({ left: k.offsetLeft + k.offsetWidth / 2 - spur.clientWidth / 2, behavior: sofort || ruhig ? "auto" : "smooth" });
    }
    function blaettern(r) { halte(6000); spur.scrollBy({ left: r * breite(), behavior: ruhig ? "auto" : "smooth" }); }

    /* ---------- Gleiten ---------- */
    var pos = 0, letzte = 0, angehalten = false, drueber = false, fokus = false, sichtbar = true, ruheBis = 0;
    function halte(ms) { ruheBis = Math.max(ruheBis, performance.now() + ms); spur.classList.remove("gleitend"); }
    function laeuft() { return gleiten && !angehalten && !drueber && !fokus && sichtbar && performance.now() > ruheBis && document.visibilityState !== "hidden"; }
    function schritt(t) {
      var dt = Math.min(.05, (t - (letzte || t)) / 1000); letzte = t;
      if (laeuft()) {
        if (!spur.classList.contains("gleitend")) { spur.classList.add("gleitend"); pos = spur.scrollLeft; }
        pos += (o.tempo || 24) * dt;
        var sb = satzBreite();
        if (sb > 0 && pos >= karten[0].offsetLeft + sb - spur.clientWidth / 2 + breite() / 2) pos -= sb;
        spur.scrollLeft = pos;
      } else if (spur.classList.contains("gleitend")) spur.classList.remove("gleitend");
      requestAnimationFrame(schritt);
    }
    // Hand am Fächer: beim Scrollen über die Kopien hinaus unauffällig zurückspringen
    function schleife() {
      var sb = satzBreite(); if (!sb || spur.classList.contains("gleitend")) return;
      if (spur.scrollLeft > karten[0].offsetLeft + sb + breite()) spur.scrollLeft -= sb;
    }
    if (gleiten) {
      var g = H.lies("faecher") || {};
      angehalten = !!g.angehalten;
      var setze = function (an, merken) {
        angehalten = an; pauseKnopf.setAttribute("aria-pressed", String(an));
        pauseKnopf.textContent = an ? "Weiterlaufen lassen" : "Anhalten";
        if (merken) H.schreib("faecher", { angehalten: an });
      };
      setze(angehalten, false);
      pauseKnopf.addEventListener("click", function () { setze(!angehalten, true); });
      spur.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") drueber = true; });
      spur.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") drueber = false; });
      spur.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") halte(6000); });
      spur.addEventListener("wheel", function () { halte(4000); }, { passive: true });
      spur.addEventListener("touchmove", function () { halte(6000); }, { passive: true });
      spur.addEventListener("scroll", function () { if (!spur.classList.contains("gleitend")) schleife(); }, { passive: true });
      if ("IntersectionObserver" in wurzel) new IntersectionObserver(function (e) { sichtbar = e[0].isIntersecting; }).observe(spur);
      requestAnimationFrame(schritt);
    }
    huelle.addEventListener("focusin", function () { fokus = true; });
    huelle.addEventListener("focusout", function (e) { if (!huelle.contains(e.relatedTarget)) fokus = false; });

    huelle.addEventListener("click", function (e) {
      var f = e.target.closest("[data-f]");
      if (f) { var a = f.getAttribute("data-f"); if (a === "vor") blaettern(1); if (a === "zurueck") blaettern(-1); return; }
      var bild = e.target.closest(".faecher-bild");
      if (!bild) return;
      var i = karten.indexOf(bild.closest(".faecher-karte"));
      if (!karten[i].classList.contains("ist-mitte")) { halte(6000); zuKarte(i); return; }
      var x = eintraege[i % n];
      halte(8000);
      if (H.lichtbild) H.lichtbild(x.b.ansichten, x.i, x.b.titel, bild, { detail: H.detailLink(x.b), app: x.b.link || "" });
    });
    spur.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); blaettern(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); blaettern(-1); }
    });

    zuKarte(o.start || 0, true);
    zeichne();
    return { zuKarte: zuKarte };
  }

  /* Hilfen: alle Ansichten (erst die ersten jedes Projekts, dann die zweiten …) oder nur die ersten. */
  function ansichten(nurErste) {
    var l = [];
    (wurzel.BEISPIELE || []).forEach(function (b) {
      (b.ansichten || []).forEach(function (a, i) { if (!nurErste || i === 0) l.push({ b: b, a: a, i: i }); });
    });
    return l.sort(function (x, y) { return x.i - y.i; });
  }

  wurzel.FAECHER = { starte: starte, ansichten: ansichten };
})(window);
