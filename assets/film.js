/* Kidu – Film auf der Startseite (ab Version 4.34 »Kidu in zwei Minuten«; löst »Kidu in 44 Sekunden« aus 4.16 ab; ab 4.35 knapp drei Minuten).
   Die Bühne (neun Kapitel, Dauer in KIDU_FILM.dauer) steht in assets/film-buehne.js. tools/film.py erzeugt sie aus src/film/ (ab 4.40).
   Jede Bewegung ist eine CSS-Animation mit fester Verzögerung calc(Xs + var(--o)); --o verschiebt die Zeit.
   Dieses Skript baut die Bühne ein, zählt die Zeit und steuert Start, Halt, Sprung und Ende.
   Startet nur auf Knopfdruck (»Film ansehen«) oder über die Adresse mit ?film=1; am Ende »Film nochmal ansehen« oder »Zur Startseite«.
   Bedienung ab 4.40 wie beim Erklärfilm »Was das Gerät kann« (Muster AW in DESIGN.md):
   - »Anhalten« und »Weiter«, auch mit der Leertaste; ein verdeckter Tab hält an.
   - Kapitelleiste: Tippen springt an den Anfang des Kapitels, Ziehen spult. »Du bist hier« steht über der Leiste.
   - Pfeiltasten: voriges oder nächstes Kapitel; im langen Kapitel 8 auch seine Abschnitte (kapitel[n].halte).
   - Hilfstechnik hört bei jedem Wechsel, wo der Film ist (aria-live). Die Bühne selbst ist für Hilfstechnik verborgen.
   - »Als Text« zeigt den ganzen Film zum Lesen (kapitel[n].text); von jedem Kapitel aus geht es zurück in den Film.
   - Esc schließt erst den Text, dann den Film. Solange der Film offen ist, ruht die Seite dahinter (inert).
   Keine Schleife. Gemerkt wird nur für diesen Besuch (sessionStorage).
   Bei »Weniger Bewegung« zeigt der Film Standbilder (kapitel[n].bilder, sonst kapitel[n].bild); »Nächstes Bild« blättert, die Leiste springt. */
(function () {
  "use strict";
  var wurzel = document.getElementById("film"), D = typeof KIDU_FILM !== "undefined" ? KIDU_FILM : null;
  var start = document.querySelector("[data-film-start]");
  if (!wurzel || !D) return;
  var K = D.kapitel, ENDE = D.dauer;
  var flaeche = wurzel.querySelector(".film-flaeche"), buehne = wurzel.querySelector(".film-buehne");
  var knopfHalt = wurzel.querySelector("[data-film-halt]");
  var steuerung = wurzel.querySelector(".film-steuerung"), ende = wurzel.querySelector(".film-ende");
  var leiste = wurzel.querySelector(".film-kapitel"), ortEl = wurzel.querySelector("[data-film-ort]");
  var zeitEl = wurzel.querySelector("[data-film-zeit]"), ansage = wurzel.querySelector("[data-film-ansage]");
  var knopfText = wurzel.querySelector("[data-film-text]"), textFeld = wurzel.querySelector(".film-text");
  var bedienung = wurzel.querySelector("[data-film-bedienung]");
  var T = 0, laeuft = false, letzte = 0, takt = 0, zuvorFokus = null, bild = 0, offen = false;
  var ortZuletzt = "", vorschau = -1, segmente = [], zug = null, spulZiel = null, textGebaut = false;
  function istWeniger() {
    return document.documentElement.getAttribute("data-bewegung") === "weniger" ||
      !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  var weniger = istWeniger(), bedienSatz = bedienung ? bedienung.innerHTML : "";

  function bis(i) { return K[i + 1] ? K[i + 1].start : ENDE; }
  /* Standbilder: je Kapitel sein Bild, das lange Kapitel 8 mehrere. */
  var BILDER = [];
  K.forEach(function (k, i) {
    var zeiten = k.bilder || [typeof k.bild === "number" ? k.bild : bis(i) - 0.2];
    zeiten.forEach(function (t) { BILDER.push({ t: t, k: i }); });
  });
  /* Sprungmarken für die Pfeiltasten: Kapitelanfänge und die Abschnitte langer Kapitel. */
  var MARKEN = [];
  K.forEach(function (k, i) {
    MARKEN.push({ t: k.start, k: i, name: "" });
    (k.halte || []).forEach(function (h) { MARKEN.push({ t: h.start, k: i, name: h.name }); });
  });
  function kapitelBei(t) { var k = 0; for (var i = 0; i < K.length; i++) if (t >= K[i].start - 0.001) k = i; return k; }
  function markeBei(t) { var m = 0; for (var i = 0; i < MARKEN.length; i++) if (t >= MARKEN[i].t - 0.001) m = i; return m; }
  function ersteBild(k) { for (var i = 0; i < BILDER.length; i++) if (BILDER[i].k === k) return i; return 0; }
  function uhr(s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }

  /* Die Bühne füllt die Fläche über der Steuerung, so groß es geht, ohne zu verzerren. */
  function skalieren() {
    var b = flaeche.clientWidth, h = flaeche.clientHeight;
    if (!b || !h) return;
    buehne.style.transform = "translate(-50%,-50%) scale(" + Math.min(b / 1280, h / 720) + ")";
  }
  /* Bühne neu einbauen: Die Animationen beginnen von vorn, um t Sekunden vorgespult. */
  function aufbauen(t) {
    T = t;
    buehne.style.setProperty("--o", (-t) + "s");
    buehne.innerHTML = D.buehne;
    zeigeStand();
  }

  /* Kapitelleiste: ein Abschnitt je Kapitel, so breit wie das Kapitel lang ist. */
  function baueLeiste() {
    K.forEach(function (k, i) {
      var li = document.createElement("li"); li.style.flexGrow = String(bis(i) - k.start);
      var b = document.createElement("button"); b.type = "button"; b.setAttribute("data-kapitel", String(i));
      b.setAttribute("aria-label", "Kapitel " + (i + 1) + ": " + k.name);
      b.setAttribute("aria-current", "false");
      var fuell = document.createElement("i"); b.appendChild(fuell);
      (k.halte || []).forEach(function (h) {
        var m = document.createElement("span"); m.className = "film-marke";
        m.style.left = (100 * (h.start - k.start) / (bis(i) - k.start)).toFixed(2) + "%"; b.appendChild(m);
      });
      b.addEventListener("click", function () {
        if (zug && zug.gezogen) return;  /* nach dem Ziehen kein Sprung */
        zuKapitel(i);
      });
      b.addEventListener("pointerenter", function () { vorschau = i; zeigeOrt(); });
      b.addEventListener("pointerleave", function () { vorschau = -1; zeigeOrt(); });
      b.addEventListener("focus", function () { vorschau = i; zeigeOrt(); });
      b.addEventListener("blur", function () { vorschau = -1; zeigeOrt(); });
      li.appendChild(b); leiste.appendChild(li); segmente.push({ b: b, i: fuell });
    });
  }
  function zeigeOrt() {
    if (!ortEl) return;
    var k = kapitelBei(T), m = MARKEN[markeBei(T)], ab = m.k === k && m.name ? m.name : "";
    /* Vorschau beim Darüberfahren oder mit dem Fokus auf einem anderen Kapitel: wohin ein Tippen springt */
    if (vorschau >= 0 && vorschau !== k) { ortEl.textContent = "Zu Kapitel " + (vorschau + 1) + ": " + K[vorschau].name + (weniger ? "" : " (ab " + uhr(K[vorschau].start) + ")"); return; }
    var text = (k + 1) + " / " + K.length + " · " + K[k].name + (ab ? " · " + ab : "");
    ortEl.textContent = text;
    if (offen && text !== ortZuletzt && ansage) {
      ansage.textContent = "Kapitel " + (k + 1) + " von " + K.length + (ab ? ", " + K[k].name + ": " + ab : ": " + K[k].name);
    }
    ortZuletzt = text;
  }
  function zeigeStand() {
    var k = kapitelBei(T);
    segmente.forEach(function (s, i) {
      var anteil = Math.max(0, Math.min(1, (T - K[i].start) / (bis(i) - K[i].start)));
      s.i.style.transform = "scaleX(" + anteil + ")";
      s.b.setAttribute("aria-current", i === k ? "true" : "false");
    });
    if (zeitEl) zeitEl.textContent = weniger ? "Bild " + (bild + 1) + " von " + BILDER.length : uhr(Math.min(T, ENDE)) + " / " + uhr(ENDE);
    zeigeOrt();
  }

  function ticken() {
    if (!laeuft) return;
    var jetzt = Date.now();
    T += Math.min(0.5, (jetzt - letzte) / 1000); letzte = jetzt;
    zeigeStand();
    if (T >= ENDE) amEnde();
  }
  function spielen() {
    if (laeuft || weniger) return;
    textZu(false);
    laeuft = true; letzte = Date.now(); buehne.classList.remove("halt");
    takt = setInterval(ticken, 200); setzeHaltKnopf();
  }
  function halten() { laeuft = false; clearInterval(takt); buehne.classList.add("halt"); setzeHaltKnopf(); }
  function setzeHaltKnopf() {
    if (!knopfHalt) return;
    if (weniger) { knopfHalt.textContent = "Nächstes Bild"; knopfHalt.removeAttribute("aria-pressed"); return; }
    knopfHalt.textContent = laeuft ? "Anhalten" : "Weiter"; knopfHalt.setAttribute("aria-pressed", laeuft ? "false" : "true");
  }
  /* Springen: angehalten neu aufbauen, danach weiter, wenn es vorher lief (oder wenn weiter verlangt ist). */
  function springeZu(t, weiter) {
    if (ende && !ende.hidden) { ende.hidden = true; if (steuerung) steuerung.hidden = false; skalieren(); }
    laeuft = false; clearInterval(takt);
    t = Math.max(0, t);
    buehne.classList.add("halt"); aufbauen(t);
    if (weiter) spielen(); else setzeHaltKnopf();
  }
  /* Standbild n: angehalten; die Bühne nennt die Zeit selbst (kapitel[n].bild oder .bilder), weil die Kamera am Kapitelende schon weiterfährt. */
  function standbild(n) {
    bild = Math.max(0, Math.min(n, BILDER.length - 1));
    if (ende && !ende.hidden && bild < BILDER.length - 1) { ende.hidden = true; if (steuerung) steuerung.hidden = false; skalieren(); }
    buehne.classList.add("halt");
    aufbauen(BILDER[bild].t);
    if (bild === BILDER.length - 1) amEnde();
  }
  function zuKapitel(i) {
    textZu(false);
    if (weniger) { standbild(ersteBild(i)); return; }
    springeZu(K[i].start, true);  /* ein Kapitel beginnt mit einem leeren Bild: darum läuft der Film von dort */
  }
  /* Pfeiltasten: zum nächsten oder vorigen Halt; zurück heißt erst an den Anfang des laufenden Abschnitts. */
  function schritt(r) {
    if (weniger) { standbild(bild + r); return; }
    var m = markeBei(T), ziel;
    if (r > 0) { if (m + 1 >= MARKEN.length) { springeZu(ENDE - 0.05, true); return; } ziel = MARKEN[m + 1].t; }
    else ziel = T - MARKEN[m].t > 2 || m === 0 ? MARKEN[m].t : MARKEN[m - 1].t;
    springeZu(ziel, laeuft);
  }

  /* Ziehen in der Leiste spult; ein einfaches Tippen springt an den Kapitelanfang (siehe click oben). */
  function zeitBei(x) {
    for (var i = 0; i < segmente.length; i++) {
      var r = segmente[i].b.getBoundingClientRect();
      if (x < r.left) return K[i].start;
      if (x <= r.right) return K[i].start + (x - r.left) / Math.max(1, r.width) * (bis(i) - K[i].start);
    }
    return ENDE - 0.05;
  }
  function spulen(t) {
    if (spulZiel === null) requestAnimationFrame(function () {
      var z = spulZiel; spulZiel = null;
      if (weniger) standbild(ersteBild(kapitelBei(z))); else { buehne.classList.add("halt"); aufbauen(z); }
    });
    spulZiel = t;
  }
  leiste.addEventListener("pointerdown", function (e) {
    if (e.button !== 0) return;
    zug = { id: e.pointerId, x: e.clientX, lief: laeuft, gezogen: false };
  });
  leiste.addEventListener("pointermove", function (e) {
    if (!zug || e.pointerId !== zug.id) return;
    if (!zug.gezogen) {
      if (Math.abs(e.clientX - zug.x) < 6) return;
      zug.gezogen = true; textZu(false); halten();
      try { leiste.setPointerCapture(e.pointerId); } catch (f) { /* ohne Fangen spult es nur über der Leiste */ }
    }
    spulen(zeitBei(e.clientX));
  });
  function zugEnde(e) {
    if (!zug || e.pointerId !== zug.id) return;
    var z = zug;
    if (z.gezogen) {
      if (!weniger) springeZu(zeitBei(e.clientX), z.lief);
      setTimeout(function () { zug = null; }, 0);  /* den Klick nach dem Ziehen noch abfangen */
    } else zug = null;
  }
  leiste.addEventListener("pointerup", zugEnde);
  leiste.addEventListener("pointercancel", zugEnde);

  /* Der Film als Text: alle Kapitel zum Lesen, je mit Sprung in den Film. */
  function baueText() {
    var liste = textFeld && textFeld.querySelector(".film-text-liste");
    if (!liste || textGebaut) return;
    K.forEach(function (k, i) {
      var li = document.createElement("li");
      var h = document.createElement("h3"); h.textContent = (i + 1) + " · " + k.name + " ";
      var z = document.createElement("span"); z.className = "zeit"; z.textContent = uhr(k.start); h.appendChild(z);
      var p = document.createElement("p"); p.textContent = k.text || "";
      var b = document.createElement("button"); b.type = "button"; b.className = "knopf still";
      b.textContent = weniger ? "Standbild ansehen" : "Ab hier ansehen";
      b.setAttribute("aria-label", (weniger ? "Standbild von Kapitel " : "Film ab Kapitel ") + (i + 1) + " ansehen: " + k.name);
      b.addEventListener("click", function () { zuKapitel(i); if (knopfHalt) knopfHalt.focus(); });
      li.appendChild(h); li.appendChild(p); li.appendChild(b); liste.appendChild(li);
    });
    textGebaut = true;
  }
  function textOffen() { return textFeld && !textFeld.hidden; }
  /* »Weniger Bewegung« kann sich seit dem Laden geändert haben (Schalter im Fuß): beim Öffnen neu fragen. */
  function bewegungFestlegen() {
    var w = istWeniger();
    if (w !== weniger && textGebaut) { var liste = textFeld.querySelector(".film-text-liste"); if (liste) liste.innerHTML = ""; textGebaut = false; }
    weniger = w;
    if (bedienung) { if (weniger) bedienung.textContent = "Standbilder: »Nächstes Bild« blättert weiter. Du kannst zu jedem Kapitel springen."; else bedienung.innerHTML = bedienSatz; }
  }
  function textAuf() {
    if (!textFeld) return;
    if (laeuft) halten();
    baueText();
    textFeld.hidden = false; buehne.style.visibility = "hidden";
    if (knopfText) knopfText.setAttribute("aria-expanded", "true");
    var titel = textFeld.querySelector("h2"); if (titel) titel.focus();
  }
  function textZu(fokus) {
    if (!textOffen()) return;
    textFeld.hidden = true; buehne.style.visibility = "";
    if (knopfText) { knopfText.setAttribute("aria-expanded", "false"); if (fokus) knopfText.focus(); }
  }

  /* Solange der Film offen ist, ruht die Seite dahinter: kein Fokus, kein Vorlesen. */
  function seiteRuht(an) {
    var main = wurzel.parentNode;
    Array.prototype.forEach.call(document.body.children, function (el) { if (!el.contains(wurzel) && el.tagName !== "SCRIPT") el.inert = an; });
    if (main) Array.prototype.forEach.call(main.children, function (el) { if (el !== wurzel) el.inert = an; });
  }
  function merken() { try { sessionStorage.setItem("papierprobe.film", "gelaufen"); } catch (e) { /* ohne Speicher läuft er beim nächsten Aufruf wieder */ } }
  function vonVorn() {
    textZu(false);
    if (ende) ende.hidden = true;
    if (steuerung) steuerung.hidden = false;
    skalieren();
    if (knopfHalt) knopfHalt.focus();
    if (weniger) { standbild(0); setzeHaltKnopf(); return; }
    laeuft = false; clearInterval(takt);
    aufbauen(0); spielen();
  }
  function amEnde() {
    laeuft = false; clearInterval(takt); merken(); setzeHaltKnopf();
    if (steuerung) steuerung.hidden = true;
    if (ende) { ende.hidden = false; var b = ende.querySelector("[data-film-weg]"); if (b) b.focus(); }
    skalieren();
  }
  function oeffnen() {
    /* Nur mit dem passenden Stilblatt: Ohne Filmstile (alte Datei im Zwischenspeicher) bliebe nur Durcheinander. */
    if (getComputedStyle(wurzel).position !== "fixed" || offen) return;
    zuvorFokus = document.activeElement;
    bewegungFestlegen();
    wurzel.hidden = false; document.documentElement.classList.add("film-offen"); offen = true;
    seiteRuht(true);
    requestAnimationFrame(function () { wurzel.classList.add("da"); });
    vonVorn();
  }
  function beenden() {
    laeuft = false; clearInterval(takt); merken(); offen = false;
    wurzel.classList.remove("da");
    setTimeout(function () {
      textZu(false);
      wurzel.hidden = true; document.documentElement.classList.remove("film-offen");
      buehne.innerHTML = "";
      if (ende) ende.hidden = true; if (steuerung) steuerung.hidden = false;
      seiteRuht(false);
      var ziel = zuvorFokus && zuvorFokus !== document.body ? zuvorFokus : document.getElementById("t-start");
      if (ziel) { if (!ziel.hasAttribute("tabindex") && ziel.id === "t-start") ziel.setAttribute("tabindex", "-1"); ziel.focus({ preventScroll: true }); }
    }, 220);
  }

  baueLeiste();
  if (knopfHalt) knopfHalt.addEventListener("click", function () {
    if (weniger) { standbild(bild + 1); return; }
    if (laeuft) halten(); else spielen();
  });
  if (knopfText) knopfText.addEventListener("click", function () { if (textOffen()) textZu(true); else textAuf(); });
  var textZuKnopf = wurzel.querySelector("[data-film-text-zu]");
  if (textZuKnopf) textZuKnopf.addEventListener("click", function () { textZu(true); });
  Array.prototype.forEach.call(wurzel.querySelectorAll("[data-film-weg]"), function (b) { b.addEventListener("click", beenden); });
  var nochmal = wurzel.querySelector("[data-film-nochmal]");
  if (nochmal) nochmal.addEventListener("click", vonVorn);
  document.addEventListener("keydown", function (e) {
    if (!offen) return;
    if (e.key === "Escape") { e.preventDefault(); if (textOffen()) textZu(true); else beenden(); return; }
    if (textOffen() || e.altKey || e.ctrlKey || e.metaKey) return;
    var ort = e.target && e.target.tagName, aufBedienelement = /^(BUTTON|A|INPUT|SELECT|TEXTAREA|SUMMARY)$/.test(ort || "");
    if (e.key === " " && !aufBedienelement) { e.preventDefault(); if (weniger) standbild(bild + 1); else if (laeuft) halten(); else spielen(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); schritt(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); schritt(-1); }
  });
  window.addEventListener("resize", function () { if (offen) skalieren(); });
  if (window.ResizeObserver) new ResizeObserver(function () { if (offen) skalieren(); }).observe(flaeche);
  document.addEventListener("visibilitychange", function () { if (document.hidden && laeuft) halten(); });
  if (start) {
    start.addEventListener("click", oeffnen);
    /* Den Knopf gibt es nur, wenn der Film auch laufen kann (Skript und Filmstile da). */
    if (getComputedStyle(wurzel).position === "fixed") start.hidden = false;
  }

  /* Nur auf Knopfdruck (Entscheidung Mario, 11.11.2026: zwei Minuten sind zu lang für einen Start von selbst).
     Ausnahme: die Adresse mit ?film=1 öffnet ihn gleich – einmal je Besuch, nie bei weniger Bewegung. So lässt sich der Film verlinken. */
  var gelaufen = false;
  try { gelaufen = sessionStorage.getItem("papierprobe.film") === "gelaufen"; } catch (e) { gelaufen = false; }
  if (/[?&]film=1\b/.test(location.search) && !gelaufen && !weniger) oeffnen();

  window.KiduFilm = { oeffnen: oeffnen, beenden: beenden, ENDE: ENDE, kapitel: K, bilder: BILDER, marken: MARKEN,
    springe: function (t) { springeZu(t, laeuft); },
    zeit: function () { return T; } };
})();
