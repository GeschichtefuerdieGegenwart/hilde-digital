/* Kidu – »Mein Rückmeldebogen« (rueckmeldebogen.html, ab Version 4.36).
   Der letzte Schritt nach der Stunde: Kolleg*innen halten fest, was gelungen ist und wo es hakt,
   und geben den Bogen selbst weiter – als Text zum Kopieren oder als PDF.
   Gespeichert werden nur die Kreuze (hilde.rueckmeldebogen), nie Freitexte. Kidu verschickt nichts.
   Der Bogen kommt aus REGELN.rueckmeldebogen (assets/regeln.js, mit Tests).
   Braucht: REGELN, HILDE, druck.js. */
(function () {
  "use strict";
  var H = HILDE, esc = H.esc, SPEICHER = "rueckmeldebogen";
  var LISTEN = ["art", "womit", "hakt", "brauche"], EINZEL = ["weitergabe"];
  var TEXTE = { kuerzel: "rb-kuerzel", was: "rb-was", gut: "rb-gut", stelle: "rb-stelle", geaendert: "rb-geaendert", frage: "rb-frage" };
  var formEl = document.getElementById("rb-form");
  var ergebnis = document.getElementById("ergebnis");

  var a = H.lies(SPEICHER) || {};
  LISTEN.forEach(function (f) {
    (a[f] || []).forEach(function (w) { var el = formEl.querySelector('input[name="' + f + '"][value="' + w + '"]'); if (el) el.checked = true; });
  });
  EINZEL.forEach(function (f) { var el = formEl.querySelector('input[name="' + f + '"][value="' + a[f] + '"]'); if (el) el.checked = true; });

  function lese() {
    var d = {};
    LISTEN.forEach(function (f) { d[f] = [].map.call(formEl.querySelectorAll('input[name="' + f + '"]:checked'), function (x) { return x.value; }); });
    EINZEL.forEach(function (f) { var c = formEl.querySelector('input[name="' + f + '"]:checked'); if (c) d[f] = c.value; });
    return d;
  }
  function texte() {
    var t = {};
    Object.keys(TEXTE).forEach(function (k) { t[k] = document.getElementById(TEXTE[k]).value; });
    return t;
  }

  /* »Nirgends« und »Nichts – ich möchte nur berichten« schließen die anderen Kreuze aus. */
  formEl.addEventListener("change", function (e) {
    var x = e.target;
    if (x.type === "checkbox" && x.checked) {
      var gruppe = formEl.querySelectorAll('input[name="' + x.name + '"]');
      [].forEach.call(gruppe, function (y) { if (y !== x && (x.value === "nichts" || y.value === "nichts")) y.checked = false; });
    }
    H.schreib(SPEICHER, lese());
  });

  function zeige() {
    var d = lese();
    d.texte = texte();
    d.datum = new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
    var r = REGELN.rueckmeldebogen(d);
    if (r.leer) {
      ergebnis.innerHTML = '<p class="box" id="rb-titel" tabindex="-1">Kreuz oder schreib mindestens eine Antwort an. Dann entsteht dein Bogen.</p>';
      document.getElementById("rb-titel").focus();
      return;
    }
    ergebnis.innerHTML = '<section class="entscheidung sp-ergebnis rb-ergebnis" aria-labelledby="rb-titel">' +
      '<p class="karte-marker">Mein Rückmeldebogen · ' + esc(d.datum) + "</p>" +
      '<h2 id="rb-titel" tabindex="-1">' + esc(r.titel) + "</h2>" +
      '<dl class="rb-zeilen">' + r.zeilen.map(function (z) { return "<div><dt>" + esc(z.titel) + "</dt><dd>" + esc(z.wert) + "</dd></div>"; }).join("") + "</dl>" +
      (r.hilfen.length ? '<h3 class="minis-titel">Was dir bis dahin helfen kann</h3><ul class="bogen-hinweise">' + r.hilfen.map(function (h) {
        return "<li>" + esc(h.text) + ' <a class="textlink" href="' + esc(h.link) + '">' + esc(h.linktext) + ' <span aria-hidden="true">→</span></a></li>';
      }).join("") + "</ul>" : "") +
      '<h3 class="minis-titel">So schickst du den Bogen</h3>' +
      '<p class="begruendung">Kopier den Text in eine E-Mail an die Person, die deine Fortbildung leitet. Oder sichere den Bogen als PDF und häng die Datei an. Kidu verschickt nichts selbst.</p>' +
      '<label class="rb-text-titel" for="rb-text">Der Bogen als Text</label>' +
      '<textarea id="rb-text" class="rb-text" rows="' + Math.min(14, r.zeilen.length + 2) + '" readonly>' + esc(r.text) + "</textarea>" +
      '<p class="schluss">' + esc(r.satz) + "</p>" +
      '<div class="ergebnis-aktionen"><button type="button" class="knopf" id="rb-kopieren">Text kopieren</button>' +
      '<button type="button" class="knopf still" data-drucken="nur-ergebnis">Als PDF sichern</button>' +
      '<button type="button" class="knopf still" id="rb-aendern">Antworten ändern</button>' +
      '<p class="leise klein" id="rb-meldung" aria-live="polite"></p></div>' +
      "</section>";
    document.getElementById("rb-titel").focus();
  }

  formEl.addEventListener("submit", function (e) { e.preventDefault(); H.schreib(SPEICHER, lese()); zeige(); });
  ergebnis.addEventListener("click", function (e) {
    if (e.target.closest("#rb-aendern")) { formEl.querySelector("input").focus(); return; }
    if (!e.target.closest("#rb-kopieren")) return;
    var feld = document.getElementById("rb-text"), meldung = document.getElementById("rb-meldung");
    function geschafft() { meldung.textContent = "Kopiert. Füg den Text in deine E-Mail ein."; }
    function vonHand() { feld.focus(); feld.select(); meldung.textContent = "Der Text ist markiert. Kopier ihn mit Strg+C oder über »Kopieren«."; }
    try {
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(feld.value).then(geschafft, vonHand);
      else vonHand();
    } catch (err) { vonHand(); }
  });
  document.getElementById("loeschen").addEventListener("click", function () {
    H.loescheAlles();
    formEl.reset();
    ergebnis.innerHTML = "";
  });
})();
