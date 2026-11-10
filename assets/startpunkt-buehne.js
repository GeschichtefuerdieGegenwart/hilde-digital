/* Kidu – Bühne zu »Mein Startpunkt« (startpunkt.html), ab Version 4.27.

   Die Bühne links ist die Karte, die am Ende als PDF gesichert wird – sie füllt sich beim Antworten:
   · Marke auf der Linie: folgt nur dem Scrollen über die fünf Schritte (Reader-Paced Rule), Mitte des Bildschirms entscheidet.
   · Vier Stanzlöcher (Bedienen · Prüfen · Dürfen · Bauen): füllen sich mit den Antworten 10 bis 13 – Rückmeldung auf eine Handlung.
   · Fortschritt »n von 20 beantwortet« und ab vier Antworten der Satz zur Ausgangslage aus REGELN.startpunkt.
   Nichts läuft von selbst. Ohne JavaScript steht die Bühne leer, das Formular ist vollständig.

   Vorführung (Knopf »Vorführung ansehen«): vier Takte, die zeigen, was man antippt und was dann passiert – Finger tippt eine
   Antwort, Stanzloch füllt sich, Marke wandert, PDF-Knopf. Start nur auf Knopfdruck, »Weiter« und »Beenden«; bei »weniger
   Bewegung« vier Standbilder ohne Uhr. Es wird nichts gespeichert.
   Braucht: REGELN, HILDE. */
(function () {
  "use strict";
  var H = HILDE, esc = H.esc;
  var rahmen = document.getElementById("sp-scroll"), formEl = document.getElementById("sp");
  if (!rahmen || !formEl) return;
  var karte = document.getElementById("sp-buehne-karte"), stand = document.getElementById("sp-buehne-stand"), ansage = document.getElementById("sp-ansage");
  var FELDER = [["s_bedienen", "Bedienen"], ["s_pruefen", "Prüfen"], ["s_duerfen", "Dürfen"], ["s_bauen", "Bauen"]];
  var FRAGEN = ["haeufigkeit", "systeme", "wofuer", "eingabe", "ergebnis", "hindernis", "vorbereitung", "material", "tablet", "s_bedienen", "s_pruefen", "s_duerfen", "s_bauen", "zeit", "anlass", "gedanken", "lernen", "ziel"];
  var WORT = { unsicher: "noch unsicher", teils: "teils", sicher: "sicher", offen: "offen" };
  var schritt = "1", fertig = false;

  function wert(name) { var c = formEl.querySelector('input[name="' + name + '"]:checked'); return c ? c.value : ""; }
  function werte(name) { return [].map.call(formEl.querySelectorAll('input[name="' + name + '"]:checked'), function (x) { return x.value; }); }
  function antworten() {
    var a = {};
    FRAGEN.forEach(function (f) { var el = formEl.querySelector('input[name="' + f + '"]'); if (!el) return; if (el.type === "checkbox") a[f] = werte(f); else { var v = wert(f); if (v) a[f] = v; } });
    return a;
  }
  function beantwortet(a) {
    var n = 0;
    FRAGEN.forEach(function (f) { if (Array.isArray(a[f]) ? a[f].length : a[f]) n++; });
    ["nie", "stelle"].forEach(function (f) { var el = formEl.elements[f]; if (el && el.value.trim()) n++; });
    return n;
  }

  /* Die vier Stanzlöcher: leer · halb · voll, immer mit Wort. */
  function loecher(a) {
    return '<div class="sp-loecher" role="img" aria-label="' + esc(FELDER.map(function (f) { return f[1] + ": " + (WORT[a[f[0]]] || "offen"); }).join(", ")) + '">' +
      FELDER.map(function (f) {
        var v = a[f[0]] || "offen", k = v === "sicher" ? "voll" : v === "teils" ? "halb" : "leer";
        return '<span class="sp-loch sp-' + k + '"><i></i><b>' + esc(f[1]) + "</b><small>" + esc(WORT[v]) + "</small></span>";
      }).join("") + "</div>";
  }

  function zeichne() {
    var a = antworten(), n = beantwortet(a), r = n >= 4 ? REGELN.startpunkt(a) : null;
    karte.innerHTML = loecher(a) +
      (r ? '<p class="sp-buehne-lage"><span class="leise klein">So zeichnet sich dein Startpunkt ab</span><br><b>' + esc(r.lage.titel) + "</b></p>" +
           '<p class="sp-buehne-staerke">' + esc(r.staerken[0]) + "</p>"
         : '<p class="sp-buehne-lage leise">Noch leer. Mit jeder Antwort füllt sich die Karte – ab vier Antworten zeigt sie, wo dein Startpunkt liegt.</p>') +
      (fertig ? '<p class="sp-buehne-fertig"><a class="textlink" href="#sp-titel">Deine Karte ist fertig – ansehen und als PDF sichern <span aria-hidden="true">↓</span></a></p>' : "");
    stand.textContent = "Schritt " + schritt + " von 5 · " + n + " von 20 beantwortet";
  }
  formEl.addEventListener("change", zeichne);
  formEl.addEventListener("input", function (e) { if (e.target.tagName === "TEXTAREA") zeichne(); });
  formEl.addEventListener("submit", function () { fertig = true; zeichne(); });
  document.getElementById("loeschen").addEventListener("click", function () { fertig = false; setTimeout(zeichne, 0); });
  zeichne();

  /* Marke folgt dem Scrollen: der Abschnitt in der Bildschirmmitte ist der aktuelle. */
  var abschnitte = [].slice.call(rahmen.querySelectorAll(".sp-abschnitt[data-schritt]"));
  function setze(n) {
    if (n === schritt) return;
    schritt = n; rahmen.setAttribute("data-schritt", n);
    var h = rahmen.querySelector('.sp-abschnitt[data-schritt="' + n + '"] h3');
    ansage.textContent = "Schritt " + n + " von 5" + (h ? ": " + h.textContent.replace(/Schritt \d von 5/, "").trim() : "");
    zeichne();
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) setze(e.target.getAttribute("data-schritt")); }); }, { rootMargin: "-40% 0px -40% 0px", threshold: 0 });
    abschnitte.forEach(function (x) { io.observe(x); });
  }
  abschnitte.forEach(function (x) { x.addEventListener("focusin", function () { setze(x.getAttribute("data-schritt")); }); });

  /* Vorführung: vier Takte, nur auf Knopfdruck. */
  var demo = document.getElementById("sp-demo"), demoText = document.getElementById("sp-demo-text"), knopf = document.getElementById("sp-vorfuehrung");
  var TAKTE = [
    "Du tippst eine Antwort an. Mehr ist es nicht – kein Richtig, kein Falsch.",
    "Auf der Karte füllt sich ein Stanzloch: leer, halb, voll. So siehst du sofort, wo du stehst.",
    "Beim Scrollen wandert die Marke über die fünf Schritte mit. Du bestimmst das Tempo.",
    "Am Ende: ein Knopf, eine Seite als PDF. Die schickst du der Leitung – vorher verlässt nichts dein Gerät."
  ];
  var takt = 0, uhr = null, DAUER = 4500;
  function ruhig() { return document.documentElement.getAttribute("data-bewegung") === "weniger" || matchMedia("(prefers-reduced-motion: reduce)").matches; }
  function zeigeTakt(n) {
    takt = n; demo.setAttribute("data-takt", String(n)); demoText.textContent = "Takt " + n + " von 4 · " + TAKTE[n - 1];
    if (n === 1) demoText.focus && demoText.setAttribute("tabindex", "-1");
    if (uhr) clearTimeout(uhr);
    if (!ruhig() && n < 4) uhr = setTimeout(function () { zeigeTakt(n + 1); }, DAUER);
  }
  function ende() {
    if (uhr) clearTimeout(uhr); uhr = null;
    demo.hidden = true; demo.setAttribute("data-takt", "0"); karte.hidden = false; stand.hidden = false;
    knopf.setAttribute("aria-expanded", "false"); knopf.focus();
  }
  knopf.setAttribute("aria-expanded", "false");
  knopf.addEventListener("click", function () {
    document.getElementById("sp-buehne").scrollIntoView({ block: "start", behavior: ruhig() ? "auto" : "smooth" });
    demo.hidden = false; karte.hidden = true; stand.hidden = true; knopf.setAttribute("aria-expanded", "true");
    zeigeTakt(1); demoText.setAttribute("tabindex", "-1"); demoText.focus();
  });
  document.getElementById("sp-demo-weiter").addEventListener("click", function () { if (takt < 4) zeigeTakt(takt + 1); else ende(); });
  document.getElementById("sp-demo-ende").addEventListener("click", ende);
})();
