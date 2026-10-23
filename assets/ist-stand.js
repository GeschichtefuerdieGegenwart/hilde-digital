/* Hilde Digital – »Mein Ist-Stand« (ist-stand.html).
   Fünf Fragen nur für die Lehrkraft. Gespeichert werden nur die Auswahlwerte (hilde.iststand).
   Die Auswertung kommt aus REGELN.istStand (assets/regeln.js, mit Tests). Keine Bewertung, kein Typ.
   Braucht: REGELN, HILDE. */
(function () {
  "use strict";
  var H = HILDE, esc = H.esc, SPEICHER = "iststand";
  var EINZELN = ["neu", "ablenkung", "sicherheit", "naechstes"];
  var formEl = document.getElementById("ist");
  var ergebnis = document.getElementById("ergebnis");

  var a = H.lies(SPEICHER) || {};
  (a.nutzung || []).forEach(function (v) {
    var el = formEl.querySelector('input[name="nutzung"][value="' + v + '"]'); if (el) el.checked = true;
  });
  EINZELN.forEach(function (f) {
    var el = formEl.querySelector('input[name="' + f + '"][value="' + a[f] + '"]'); if (el) el.checked = true;
  });

  /* »Kaum« schließt die anderen Antworten bei Frage 1 aus. */
  formEl.addEventListener("change", function (e) {
    if (e.target.name === "nutzung" && e.target.checked) {
      formEl.querySelectorAll('input[name="nutzung"]').forEach(function (x) {
        if (x !== e.target && (e.target.value === "kaum" || x.value === "kaum")) x.checked = false;
      });
    }
    H.schreib(SPEICHER, lese());
  });

  function lese() {
    var d = { nutzung: [].map.call(formEl.querySelectorAll('input[name="nutzung"]:checked'), function (x) { return x.value; }) };
    EINZELN.forEach(function (f) { var c = formEl.querySelector('input[name="' + f + '"]:checked'); if (c) d[f] = c.value; });
    return d;
  }

  function zeige(fokus) {
    var r = REGELN.istStand(lese());
    ergebnis.innerHTML = '<section class="entscheidung" aria-labelledby="ist-titel">' +
      '<p class="karte-marker">Nur für dich</p><h2 id="ist-titel" tabindex="-1">Dein Ist-Stand</h2>' +
      (r.spiegel.length ? r.spiegel.map(function (s) { return '<p class="begruendung">' + esc(s) + "</p>"; }).join("")
        : '<p class="begruendung">Du hast noch wenig angegeben. Die nächsten Schritte sind deshalb allgemein.</p>') +
      '<h3 class="minis-titel">Bis zu drei nächste Schritte</h3>' +
      '<ul class="bogen-hinweise">' + r.schritte.map(function (s) {
        return "<li>" + esc(s.text) + ' <a class="textlink" href="' + esc(s.link) + '">' + esc(s.linktext) + ' <span aria-hidden="true">→</span></a></li>';
      }).join("") + "</ul>" +
      '<p class="schluss">' + esc(r.satz) + "</p></section>";
    if (fokus) document.getElementById("ist-titel").focus();
  }

  formEl.addEventListener("submit", function (e) { e.preventDefault(); H.schreib(SPEICHER, lese()); zeige(true); });
  document.getElementById("loeschen").addEventListener("click", function () {
    H.loescheAlles(); formEl.reset(); ergebnis.innerHTML = "";
  });
  if (a.naechstes || (a.nutzung && a.nutzung.length)) zeige(false);
})();
