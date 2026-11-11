/* Kidu – Film »Kidu in zwei Minuten« auf der Startseite (ab Version 4.34; löst »Kidu in 44 Sekunden« aus 4.16 ab).
   Die Bühne (neun Kapitel, 120 Sekunden) steht in assets/film-buehne.js und stammt aus dem Drehbuch des Pitch-Films.
   Jede Bewegung ist eine CSS-Animation mit fester Verzögerung calc(Xs + var(--o)); --o verschiebt die Zeit.
   Dieses Skript baut die Bühne ein, zählt die Zeit und steuert Start, Halt und Ende.
   Startet nur auf Knopfdruck (»Film ansehen«) oder über die Adresse mit ?film=1; am Ende »Film nochmal ansehen« oder »Zur Startseite«.
   Anhalten, Weiter, Überspringen (auch mit Esc). Keine Schleife. Gemerkt wird nur für diesen Besuch (sessionStorage).
   Bei »Weniger Bewegung« zeigt der Film neun Standbilder; »Nächstes Bild« blättert weiter. */
(function () {
  "use strict";
  var wurzel = document.getElementById("film"), D = typeof KIDU_FILM !== "undefined" ? KIDU_FILM : null;
  if (!wurzel || !D) return;
  var buehne = wurzel.querySelector(".film-buehne");
  var knopfHalt = wurzel.querySelector("[data-film-halt]");
  var steuerung = wurzel.querySelector(".film-steuerung"), ende = wurzel.querySelector(".film-ende");
  var fortschritt = wurzel.querySelector(".film-fortschritt i");
  var ENDE = D.dauer, T = 0, laeuft = false, letzte = 0, takt = 0, zuvorFokus = null, bild = 0;
  var weniger = document.documentElement.getAttribute("data-bewegung") === "weniger" ||
    (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  function skalieren() {
    var s = Math.min(window.innerWidth / 1280, (window.innerHeight - 96) / 720);
    buehne.style.transform = "translate(-50%,-50%) scale(" + s + ")";
  }
  /* Bühne neu einbauen: Die Animationen beginnen von vorn, um t Sekunden vorgespult. */
  function aufbauen(t) {
    T = t;
    buehne.style.setProperty("--o", (-t) + "s");
    buehne.innerHTML = D.buehne;
    zeigeFortschritt();
  }
  function zeigeFortschritt() { if (fortschritt) fortschritt.style.transform = "scaleX(" + Math.min(1, T / ENDE) + ")"; }
  function ticken() {
    if (!laeuft) return;
    var jetzt = Date.now();
    T += Math.min(0.5, (jetzt - letzte) / 1000); letzte = jetzt;
    zeigeFortschritt();
    if (T >= ENDE) amEnde();
  }
  function spielen() {
    if (laeuft || weniger) return;
    laeuft = true; letzte = Date.now(); buehne.classList.remove("halt");
    takt = setInterval(ticken, 200); setzeHaltKnopf();
  }
  function halten() { laeuft = false; clearInterval(takt); buehne.classList.add("halt"); setzeHaltKnopf(); }
  function setzeHaltKnopf() {
    if (!knopfHalt) return;
    if (weniger) { knopfHalt.textContent = "Nächstes Bild"; knopfHalt.removeAttribute("aria-pressed"); return; }
    knopfHalt.textContent = laeuft ? "Anhalten" : "Weiter"; knopfHalt.setAttribute("aria-pressed", laeuft ? "false" : "true");
  }
  /* Standbild: das Ende eines Kapitels, angehalten */
  function standbild(n) {
    bild = n;
    var k = D.kapitel[n], naechstes = D.kapitel[n + 1];
    buehne.classList.add("halt");
    aufbauen((naechstes ? naechstes.start : ENDE + 4) - 0.2);
    if (!naechstes) amEnde();
    void k;
  }
  function merken() { try { sessionStorage.setItem("papierprobe.film", "gelaufen"); } catch (e) { /* ohne Speicher läuft er beim nächsten Aufruf wieder */ } }
  function vonVorn() {
    if (ende) ende.hidden = true;
    if (steuerung) steuerung.hidden = false;
    var weg = steuerung && steuerung.querySelector("[data-film-weg]"); if (weg) weg.focus();
    if (weniger) { standbild(0); setzeHaltKnopf(); return; }
    laeuft = false; clearInterval(takt);
    aufbauen(0); spielen();
  }
  function amEnde() {
    laeuft = false; clearInterval(takt); merken(); setzeHaltKnopf();
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
    laeuft = false; clearInterval(takt); merken();
    wurzel.classList.remove("da");
    setTimeout(function () {
      wurzel.hidden = true; document.documentElement.classList.remove("film-offen");
      buehne.innerHTML = "";
      if (ende) ende.hidden = true; if (steuerung) steuerung.hidden = false;
      var ziel = zuvorFokus && zuvorFokus !== document.body ? zuvorFokus : document.getElementById("t-start");
      if (ziel) { if (!ziel.hasAttribute("tabindex") && ziel.id === "t-start") ziel.setAttribute("tabindex", "-1"); ziel.focus({ preventScroll: true }); }
    }, 220);
  }

  if (knopfHalt) knopfHalt.addEventListener("click", function () {
    if (weniger) { standbild(Math.min(bild + 1, D.kapitel.length - 1)); return; }
    if (laeuft) halten(); else spielen();
  });
  Array.prototype.forEach.call(wurzel.querySelectorAll("[data-film-weg]"), function (b) { b.addEventListener("click", beenden); });
  var nochmal = wurzel.querySelector("[data-film-nochmal]");
  if (nochmal) nochmal.addEventListener("click", vonVorn);
  wurzel.addEventListener("keydown", function (e) { if (e.key === "Escape") { e.preventDefault(); beenden(); } });
  window.addEventListener("resize", function () { if (!wurzel.hidden) skalieren(); });
  document.addEventListener("visibilitychange", function () { if (document.hidden && laeuft) halten(); });
  var start = document.querySelector("[data-film-start]");
  if (start) start.addEventListener("click", oeffnen);

  /* Nur auf Knopfdruck (Entscheidung Mario, 11.11.2026: zwei Minuten sind zu lang für einen Start von selbst).
     Ausnahme: die Adresse mit ?film=1 öffnet ihn gleich – einmal je Besuch, nie bei weniger Bewegung. So lässt sich der Film verlinken. */
  var gelaufen = false;
  try { gelaufen = sessionStorage.getItem("papierprobe.film") === "gelaufen"; } catch (e) { gelaufen = false; }
  if (/[?&]film=1\b/.test(location.search) && !gelaufen && !weniger) oeffnen();

  window.KiduFilm = { oeffnen: oeffnen, beenden: beenden, ENDE: ENDE, kapitel: D.kapitel,
    springe: function (t) { var lief = laeuft; laeuft = false; clearInterval(takt); aufbauen(t); if (lief) spielen(); },
    zeit: function () { return T; } };
})();
