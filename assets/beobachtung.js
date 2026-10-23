/* Hilde Digital – Beobachtungsbogen nach der Stunde (beobachtung.html).
   Gespeichert werden nur die Auswahlwerte (hilde.beobachtung), nie Freitexte.
   Die Auswertung kommt aus REGELN.beobachtung (assets/regeln.js, mit Tests).
   Braucht: REGELN, HILDE. */
(function () {
  "use strict";
  var H = HILDE, esc = H.esc, SPEICHER = "beobachtung";
  var FELDER = ["lernhandlung", "mehrwert", "technik", "aufmerksamkeit", "entscheidung"];
  var formEl = document.getElementById("bogen");
  var ergebnis = document.getElementById("ergebnis");

  var a = H.lies(SPEICHER) || {};
  FELDER.forEach(function (f) {
    var el = formEl.querySelector('input[name="' + f + '"][value="' + a[f] + '"]');
    if (el) el.checked = true;
  });

  function lese() {
    var d = {};
    FELDER.forEach(function (f) { var c = formEl.querySelector('input[name="' + f + '"]:checked'); if (c) d[f] = c.value; });
    return d;
  }

  function zeige(fokus) {
    var r = REGELN.beobachtung(lese());
    var hinweise = r.hinweise.length
      ? '<ul class="bogen-hinweise">' + r.hinweise.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul>"
      : '<p class="begruendung">Aus deinen Antworten ergibt sich kein Hinweis zum Nachschärfen.</p>';
    if (!r.id) {
      ergebnis.innerHTML = '<p class="box" id="bogen-titel" tabindex="-1">Wähle bei Frage 5, wie es weitergeht. Dann siehst du deine Auswertung.</p>';
      if (fokus) document.getElementById("bogen-titel").focus();
      return;
    }
    ergebnis.innerHTML = '<section class="entscheidung" aria-labelledby="bogen-titel">' +
      '<p class="karte-marker">Deine Auswertung</p><h2 id="bogen-titel" tabindex="-1">' + esc(r.titel) + "</h2>" +
      '<h3 class="minis-titel">Was dir auffallen könnte</h3>' + hinweise +
      (r.spannung ? '<p class="begruendung">' + esc(r.spannung) + "</p>" : "") +
      '<div class="naechster"><h3>Nächster Schritt</h3><p>' + esc(r.text) + "</p></div>" +
      '<p class="schluss">' + esc(r.satz) + "</p>" +
      '<div class="ergebnis-aktionen"><a class="knopf" href="' + esc(r.link) + '">' + esc(r.linktext) + '</a><button type="button" class="knopf still" data-drucken>Mit Auswertung drucken</button></div>' +
      "</section>";
    if (fokus) document.getElementById("bogen-titel").focus();
  }

  formEl.addEventListener("change", function () { H.schreib(SPEICHER, lese()); });
  formEl.addEventListener("submit", function (e) { e.preventDefault(); H.schreib(SPEICHER, lese()); zeige(true); });
  document.addEventListener("click", function (e) {
    if (e.target.closest("#drucken, [data-drucken]")) window.print();
  });
  document.getElementById("loeschen").addEventListener("click", function () {
    H.loescheAlles();
    formEl.reset();
    ergebnis.innerHTML = "";
  });
  if (a.entscheidung) zeige(false);
})();
