/* Hilde Digital – Papierprobe »Geht es auf Papier genauso gut?« im Bereich Digitaler Unterricht.
   Regeln und Tests in assets/regeln.js (REGELN.papierprobe). Nichts wird gespeichert.
   Braucht: TAXONOMIEN, REGELN, HILDE. */
(function () {
  "use strict";
  var esc = HILDE.esc;
  var form = document.getElementById("probe"), aus = document.getElementById("probe-ergebnis");
  if (form && aus && typeof REGELN !== "undefined") {
    var namen = {};
    TAXONOMIEN.einstufungen.forEach(function (e) { namen[e.id] = e.name; });
    var FOLGE = { ablage: "Beantworte noch die zweite Frage.", ziel: "Beantworte noch die zweite Frage.", neu: "Beantworte die erste Frage." };
    var wert = function (n) { var e = form.querySelector('input[name="' + n + '"]:checked'); return e ? e.value : ""; };
    var zeigen = function () {
      var a = { neu: wert("neu"), ablage: wert("ablage"), ziel: wert("ziel"), lesen: wert("lesen") };
      form.querySelector('[data-frage="ablage"]').hidden = a.neu !== "nein";
      form.querySelector('[data-frage="ziel"]').hidden = a.neu !== "ja";
      if (a.neu !== "nein") a.ablage = "";
      if (a.neu !== "ja") a.ziel = "";
      var e = REGELN.papierprobe(a);
      aus.className = "probe-ergebnis" + (e.id ? " stufe-" + e.id : "");
      aus.innerHTML = e.id
        ? '<p class="probe-name">' + esc(namen[e.id]) + "</p><p>" + esc(e.grund) + "</p>" +
          (e.lesen ? '<p class="probe-lesen"><b>Zum Lesen:</b> ' + esc(e.lesen) + "</p>" : "")
        : '<p class="probe-name">Noch offen</p><p>' + esc(FOLGE[e.frage]) + "</p>";
    };
    form.addEventListener("change", zeigen);
    form.addEventListener("reset", function () { setTimeout(zeigen, 0); });
  }
})();
