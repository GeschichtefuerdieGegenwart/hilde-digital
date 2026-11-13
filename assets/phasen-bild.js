/* Kidu – Schaubild »Wo in der Stunde das Gerät hilft« (sechs-hebel.html, ab Version 4.37).
   Namen und Aufgaben der Phasen kommen aus assets/daten/taxonomien.js – im HTML stehen sie nur als Ersatz ohne JavaScript.
   Braucht: TAXONOMIEN. */
(function () {
  "use strict";
  var P = TAXONOMIEN.phasen;
  function phase(id) { return P.filter(function (x) { return x.id === id; })[0]; }
  [].forEach.call(document.querySelectorAll("[data-phase-name]"), function (el) {
    var p = phase(el.getAttribute("data-phase-name")); if (p) el.textContent = p.name;
  });
  [].forEach.call(document.querySelectorAll("[data-phase-hilfe]"), function (el) {
    var p = phase(el.getAttribute("data-phase-hilfe")); if (p && p.hilfe) el.textContent = p.hilfe;
  });
})();
