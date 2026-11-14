/* Kidu – Fahrplan der Bereichsseite »Digitaler Unterricht« (ab Version 4.41, Entwurf B2 aus Claude Design,
   Entscheidung Mario 14.11.2026).
   Jede Phase ist ein <details>: Aufklappen und Zuklappen gehen auch ohne Skript. Das Skript ergänzt nur drei Dinge:
   1. »Alle Werkzeuge zeigen« / »Alle zuklappen« (Muster GOV.UK step by step); der Knopf steht nur mit Skript da.
   2. Eine Sprungmarke in den Fahrplan (#phase-erstellen, #t-kollegium …) öffnet ihre Phase.
   3. Drucken zeigt alle Phasen offen; danach ist alles wie vorher.
   Nichts bewegt sich von selbst, nichts wird gespeichert. */
(function () {
  "use strict";
  var liste = document.getElementById("fahrplan");
  if (!liste) return;
  var knopf = document.getElementById("fahrplan-alle");
  var platten = Array.prototype.slice.call(liste.querySelectorAll("details.fahrplan-platte"));

  function alleOffen() {
    return platten.every(function (d) { return d.open; });
  }

  // Der Knopf sagt, was er tut, und meldet den Stand über aria-expanded.
  function stand() {
    if (!knopf) return;
    var offen = alleOffen();
    knopf.setAttribute("aria-expanded", offen ? "true" : "false");
    knopf.textContent = offen ? "Alle zuklappen" : "Alle Werkzeuge zeigen";
  }

  if (knopf) {
    knopf.hidden = false;
    knopf.addEventListener("click", function () {
      var auf = !alleOffen();
      platten.forEach(function (d) { d.open = auf; });
      stand();
    });
  }
  platten.forEach(function (d) { d.addEventListener("toggle", stand); });

  // Sprungmarke: Liegt das Ziel in einer Phase, geht die Phase auf und das Ziel kommt ins Bild.
  function oeffneZiel() {
    var id = "";
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) { id = ""; }
    var ziel = id && document.getElementById(id);
    if (!ziel || !liste.contains(ziel)) return;
    var d = ziel.querySelector("details.fahrplan-platte") || ziel.closest("details.fahrplan-platte");
    if (d && !d.open) {
      d.open = true;
      ziel.scrollIntoView();
    }
  }
  window.addEventListener("hashchange", oeffneZiel);
  oeffneZiel();

  // Druck: alle Phasen offen, danach der Stand von vorher.
  var vorher = null;
  window.addEventListener("beforeprint", function () {
    vorher = platten.map(function (d) { return d.open; });
    platten.forEach(function (d) { d.open = true; });
  });
  window.addEventListener("afterprint", function () {
    if (vorher) platten.forEach(function (d, i) { d.open = vorher[i]; });
    vorher = null;
    stand();
  });

  stand();
})();
