/* Kidu – »Mein Startpunkt« (startpunkt.html, ab Version 4.24).
   Zwanzig Fragen vor einer Fortbildung oder Beratungsstunde. Gespeichert werden nur die Auswahlwerte (hilde.startpunkt);
   Textfelder bleiben im Formular und werden nie gespeichert. Die Auswertung kommt aus REGELN.startpunkt (assets/regeln.js, mit Tests).
   Das Ergebnis ist eine Karte: vier Sicherheitsfelder als Stanzlöcher auf einer Linie, Stärken zuerst, drei Schritte, zwei Kniffe,
   ein Codeblock für die Leitung. »Als PDF sichern« druckt nur die Karte (Klasse nur-ergebnis, assets/druck.js).
   Braucht: REGELN, HILDE. */
(function () {
  "use strict";
  var H = HILDE, esc = H.esc, SPEICHER = "startpunkt";
  var EINZELN = ["haeufigkeit", "eingabe", "ergebnis", "vorbereitung", "zeit", "ziel", "s_bedienen", "s_pruefen", "s_duerfen", "s_bauen"];
  var MEHRERE = ["systeme", "wofuer", "hindernis", "material", "tablet", "anlass", "gedanken", "lernen"];
  var AUSSCHLUSS = { systeme: "keines", wofuer: "nichts", hindernis: "nichts", tablet: "kaum" };
  var TEXTE = ["nie", "stelle", "fach", "klasse", "thema", "kuerzel"];
  var formEl = document.getElementById("sp");
  var ergebnis = document.getElementById("ergebnis");

  var a = H.lies(SPEICHER) || {};
  MEHRERE.forEach(function (f) {
    (a[f] || []).forEach(function (v) {
      var el = formEl.querySelector('input[name="' + f + '"][value="' + v + '"]'); if (el) el.checked = true;
    });
  });
  EINZELN.forEach(function (f) {
    var el = formEl.querySelector('input[name="' + f + '"][value="' + a[f] + '"]'); if (el) el.checked = true;
  });

  formEl.addEventListener("change", function (e) {
    var t = e.target, n = t.name;
    if (t.type === "checkbox" && t.checked) {
      /* »Keines«, »Nichts«, »Kaum« schließen die anderen Antworten aus. */
      var aus = AUSSCHLUSS[n];
      if (aus) formEl.querySelectorAll('input[name="' + n + '"]').forEach(function (x) {
        if (x !== t && (t.value === aus || x.value === aus)) x.checked = false;
      });
      /* Höchstens n Antworten (data-max): die älteste fällt weg. */
      var max = parseInt(t.closest("[data-max]") && t.closest("[data-max]").getAttribute("data-max"), 10);
      if (max) {
        var gew = [].slice.call(formEl.querySelectorAll('input[name="' + n + '"]:checked'));
        while (gew.length > max) { var alt = gew.shift(); if (alt !== t) alt.checked = false; }
      }
    }
    if (t.type !== "textarea" && t.type !== "text") H.schreib(SPEICHER, lese());
  });

  function lese() {
    var d = {};
    MEHRERE.forEach(function (f) { d[f] = [].map.call(formEl.querySelectorAll('input[name="' + f + '"]:checked'), function (x) { return x.value; }); });
    EINZELN.forEach(function (f) { var c = formEl.querySelector('input[name="' + f + '"]:checked'); if (c) d[f] = c.value; });
    return d;
  }
  function texte() {
    var d = {};
    TEXTE.forEach(function (f) { var el = formEl.elements[f]; d[f] = el && el.value ? el.value.trim() : ""; });
    return d;
  }

  /* Die Karte: vier Felder als Stanzlöcher auf einer Linie – leer, halb, voll; immer mit Wort daneben. */
  var WORT = { unsicher: "noch unsicher", teils: "teils", sicher: "sicher", offen: "nicht angegeben" };
  function karte(sicherheit) {
    var w = 560, x0 = 60, abstand = (w - 2 * x0) / 3, y = 44, r = 15;
    var teile = sicherheit.map(function (f, i) {
      var cx = x0 + i * abstand, fuell = f.wert === "sicher" ? "voll" : f.wert === "teils" ? "halb" : "leer";
      return '<g class="sp-feld sp-' + fuell + '">' +
        '<circle cx="' + cx + '" cy="' + y + '" r="' + r + '"/>' +
        (fuell === "halb" ? '<path d="M' + cx + ' ' + (y - r) + 'A' + r + ' ' + r + ' 0 0 0 ' + cx + ' ' + (y + r) + 'Z"/>' : "") +
        '<text x="' + cx + '" y="' + (y + 40) + '" text-anchor="middle" class="sp-feld-titel">' + esc(f.titel) + "</text>" +
        '<text x="' + cx + '" y="' + (y + 60) + '" text-anchor="middle" class="sp-feld-wort">' + esc(WORT[f.wert] || f.wert) + "</text></g>";
    }).join("");
    var beschreibung = sicherheit.map(function (f) { return f.titel + ": " + (WORT[f.wert] || f.wert); }).join(", ");
    return '<svg class="sp-karte" viewBox="0 0 ' + w + ' 120" role="img" aria-label="Vier Felder – ' + esc(beschreibung) + '">' +
      '<line x1="' + x0 + '" y1="' + y + '" x2="' + (w - x0) + '" y2="' + y + '" class="sp-linie"/>' + teile + "</svg>";
  }

  /* Links auf der Karte: online mit voller Adresse, damit sie im PDF noch führen; per file:// bleiben sie relativ. */
  var basis = /^https?:/.test(location.href) ? location.href.replace(/[^\/]*$/, "") : "";

  function zeige(fokus) {
    var r = REGELN.startpunkt(lese()), t = texte();
    var kopf = [t.kuerzel ? "Kürzel: " + t.kuerzel : "", t.fach ? "Fach: " + t.fach : "", t.klasse ? "Klasse: " + t.klasse : "", t.thema ? "Thema: " + t.thema : ""].filter(Boolean);
    ergebnis.innerHTML = '<section class="entscheidung sp-ergebnis" aria-labelledby="sp-titel">' +
      '<p class="karte-marker">Mein Startpunkt · ' + esc(new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })) + "</p>" +
      '<h2 id="sp-titel" tabindex="-1">' + esc(r.lage.titel) + "</h2>" +
      '<p class="begruendung">' + esc(r.lage.text) + "</p>" +
      (r.lage.skeptisch ? '<p class="begruendung">Du bist skeptisch, ob dein Unterricht das braucht. Diese Frage steht hier ganz oben – »bleibt auf Papier« ist ein vollwertiges Ergebnis.</p>' : "") +
      '<h3 class="minis-titel">Wie sicher du dich fühlst</h3>' + karte(r.sicherheit) +
      '<h3 class="minis-titel">Was du schon mitbringst</h3><ul class="bogen-hinweise">' + r.staerken.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" +
      '<h3 class="minis-titel">Bis zu drei nächste Schritte</h3><ul class="bogen-hinweise">' + r.schritte.map(function (s) {
        return "<li>" + esc(s.text) + ' <a class="textlink" href="' + esc(basis + s.link) + '">' + esc(s.linktext) + ' <span aria-hidden="true">→</span></a></li>';
      }).join("") + "</ul>" +
      '<h3 class="minis-titel">Zwei Kniffe für den Anfang</h3><ul class="bogen-hinweise">' + r.kniffe.map(function (k) { return "<li><b>" + esc(k.titel) + ".</b> " + esc(k.text) + "</li>"; }).join("") + "</ul>" +
      (t.nie || t.stelle ? '<h3 class="minis-titel">In deinen Worten</h3>' +
        (t.nie ? '<p class="begruendung"><b>KI soll nicht übernehmen:</b> ' + esc(t.nie) + "</p>" : "") +
        (t.stelle ? '<p class="begruendung"><b>Mühsame Stelle:</b> ' + esc(t.stelle) + "</p>" : "") : "") +
      '<h3 class="minis-titel">Für die Leitung der Fortbildung</h3>' +
      (kopf.length ? '<p class="begruendung">' + esc(kopf.join(" · ")) + "</p>" : "") +
      '<p class="sp-code">' + esc(r.code) + "</p>" +
      '<p class="schluss">' + esc(r.satz) + "</p>" +
      '<p class="leise klein sp-quelle">Erstellt mit Kidu · Mein Startpunkt · nur für dich und die Leitung der Fortbildung</p>' +
      '<div class="ergebnis-aktionen"><button type="button" class="knopf" data-drucken="nur-ergebnis">Als PDF sichern</button>' +
      '<p class="leise klein sp-pdf-hinweis">Im Druckfenster »Als PDF sichern« wählen (am iPad: Teilen → Drucken, dann das Blatt antippen) und die Datei der Leitung der Fortbildung schicken. Erst damit verlässt etwas dieses Gerät.</p></div>' +
      "</section>";
    if (fokus) document.getElementById("sp-titel").focus();
  }

  formEl.addEventListener("submit", function (e) { e.preventDefault(); H.schreib(SPEICHER, lese()); zeige(true); });
  document.getElementById("loeschen").addEventListener("click", function () {
    H.loescheAlles(); formEl.reset(); ergebnis.innerHTML = "";
  });
  if (a.haeufigkeit || (a.anlass && a.anlass.length)) zeige(false);
})();
