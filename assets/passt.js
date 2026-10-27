/* Hilde Digital – Selbsteinschätzung »Was passt gerade zu mir?«.
   Freiwillig, situativ, nur lokal. Kein Test, kein Typ, keine Persönlichkeitsaussage.
   Braucht: TAXONOMIEN, BEISPIELE, REGELN, HILDE. */
(function () {
  "use strict";
  var T = TAXONOMIEN, H = HILDE, esc = H.esc;
  var SPEICHER = "selbst";

  var FRAGEN = [
    { id: "steuern", frage: "Wie stark möchtest du den Ablauf selbst steuern?", von: "sehr wenig", bis: "sehr stark" },
    { id: "begleiten", frage: "Wie sicher fühlst du dich beim Begleiten, während Lernende selbstständig arbeiten?", von: "noch unsicher", bis: "sehr sicher" },
    { id: "gespraech", frage: "Wie wichtig sind dir gemeinsame Gesprächs- und Erklärphasen?", von: "wenig wichtig", bis: "sehr wichtig" },
    { id: "technik", frage: "Wie viel Technik möchtest du für dieses Vorhaben bewältigen?", von: "möglichst keine", bis: "bewusst anspruchsvoll" },
    { id: "zeit", frage: "Wie viel Vorbereitungszeit möchtest du investieren?", von: "unter 15 Minuten", bis: "mehrere Stunden" }
  ];

  var a = H.lies(SPEICHER) || {};
  var formEl = document.getElementById("selbst");
  var ergebnis = document.getElementById("ergebnis");

  /* Jede Stufe hat ein Wort: die Enden tragen die Worte der Frage, die Mitte »Stufe 2« bis »Stufe 4«.
     Das Wort steht im Radio-Label (für Vorleseprogramme) und seit Version 4.8 sichtbar unter der Skala. */
  function wort(f, i) { return i === 1 ? f.von : i === 5 ? f.bis : "Stufe " + i; }
  function wortZeile(f, gewaehlt) {
    return gewaehlt ? 'Gewählt: <b>' + esc(wort(f, gewaehlt)) + "</b> (" + gewaehlt + " von 5)" : "Noch nichts gewählt";
  }
  document.getElementById("fragen").innerHTML = FRAGEN.map(function (f, n) {
    var stufen = "";
    for (var i = 1; i <= 5; i++) {
      stufen += '<label class="stufe"><input type="radio" name="' + f.id + '" value="' + i + '"' + (String(a[f.id]) === String(i) ? " checked" : "") + ">" +
        '<span class="stufe-zahl" aria-hidden="true">' + i + '</span><span class="sr-only">' + esc(wort(f, i)) + "</span></label>";
    }
    return '<fieldset class="skala"><legend><span class="leise klein">Frage ' + (n + 1) + " von 5</span><br>" + esc(f.frage) + "</legend>" +
      '<div class="stufen">' + stufen + '</div><div class="skala-enden" aria-hidden="true"><span>' + esc(f.von) + "</span><span>" + esc(f.bis) + "</span></div>" +
      '<p class="stufe-wort" data-wort="' + f.id + '" aria-hidden="true">' + wortZeile(f, parseInt(a[f.id], 10) || 0) + "</p></fieldset>";
  }).join("");
  function zeigeWorte() {
    FRAGEN.forEach(function (f) {
      var c = formEl.querySelector('input[name="' + f.id + '"]:checked');
      formEl.querySelector('[data-wort="' + f.id + '"]').innerHTML = wortZeile(f, c ? parseInt(c.value, 10) : 0);
    });
  }

  function auswahl(id, titel, werte, leer) {
    return '<div class="eingabe"><label for="s-' + id + '">' + titel + '</label><select id="s-' + id + '" name="' + id + '"><option value="">' + leer + "</option>" +
      werte.map(function (w) { return '<option value="' + esc(w.id) + '"' + (a[id] === w.id ? " selected" : "") + ">" + esc(w.name) + "</option>"; }).join("") + "</select></div>";
  }
  document.getElementById("kontextfragen").innerHTML =
    auswahl("phase", "Für welche Phase?", T.phasen.filter(function (p) { return p.id !== "offen"; }), "noch offen") +
    auswahl("wichtig", "Was ist dir besonders wichtig?", T.anliegen.filter(function (x) { return x.bereich !== "ki"; }), "noch offen");

  function lese() {
    var d = {};
    FRAGEN.forEach(function (f) { var c = formEl.querySelector('input[name="' + f.id + '"]:checked'); if (c) d[f.id] = c.value; });
    d.phase = formEl.querySelector("#s-phase").value;
    d.wichtig = formEl.querySelector("#s-wichtig").value;
    return d;
  }

  function zeige(fokus) {
    var d = lese();
    var r = REGELN.selbsteinschaetzung(d, BEISPIELE);
    var rollen = r.rollen.map(function (id) {
      var x = T.rollen.filter(function (y) { return y.id === id; })[0];
      return "<b>" + esc(x.name) + "</b> – " + esc(x.hilfe);
    }).join("<br>");
    var offen = FRAGEN.filter(function (f) { return !d[f.id]; }).length;
    ergebnis.innerHTML = '<section class="entscheidung" aria-labelledby="selbst-titel">' +
      '<p class="karte-marker">Deine situative Empfehlung</p><h2 id="selbst-titel" tabindex="-1">Ein Einstieg, der jetzt zu dir passt</h2>' +
      '<p class="begruendung">' + esc(r.einordnung) + "</p>" +
      (offen ? '<p class="leise klein">' + offen + " Frage" + (offen > 1 ? "n" : "") + " hast du offen gelassen. Wir rechnen dort mit der Mitte.</p>" : "") +
      '<dl class="felder">' +
        "<div><dt>Warum</dt><dd>" + r.gruende.map(esc).join("<br>") + "</dd></div>" +
        "<div><dt>Passendes Format</dt><dd>" + esc(r.format) + "</dd></div>" +
        "<div><dt>Umfang</dt><dd><b>" + esc(T.name("umfang", r.umfang)) + "</b> – " + esc(r.umfangGrund) + "</dd></div>" +
        "<div><dt>Deine Rolle</dt><dd>" + rollen + "</dd></div>" +
      "</dl>" +
      '<h3 class="minis-titel">Beispiele zum Anschauen</h3>' +
      (!d.phase && !d.wichtig ? '<p class="leise klein">Du hast Phase und Anliegen offen gelassen. Deshalb zeigen wir dir Beispiele, die zu Umfang und Rolle passen.</p>'
        : r.gelockert ? '<p class="lockerung">Für alle gewählten Merkmale gibt es noch kein exaktes Beispiel. Deshalb zeigen wir dir die nächstpassenden Ideen.</p>' : "") +
      '<ul class="minis">' + r.beispiele.map(H.miniKarte).join("") + "</ul>" +
      '<div class="naechster"><h3>Risikoarme Alternative</h3><p>' + esc(r.alternative) + "</p></div>" +
      '<p class="schluss">' + esc(r.schluss) + "</p>" +
      '<div class="ergebnis-aktionen"><a class="knopf" href="tablets.html">Zum Planungsweg »Unterricht planen«</a><a class="knopf still" href="galerie.html">Zur Galerie</a></div>' +
      "</section>";
    if (fokus) document.getElementById("selbst-titel").focus();
  }

  formEl.addEventListener("change", function () { H.schreib(SPEICHER, lese()); zeigeWorte(); });
  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    H.schreib(SPEICHER, lese());
    zeige(true);
  });
  document.getElementById("loeschen").addEventListener("click", function () {
    H.loescheAlles();
    formEl.querySelectorAll("input:checked").forEach(function (x) { x.checked = false; });
    formEl.querySelectorAll("select").forEach(function (x) { x.value = ""; });
    zeigeWorte();
    ergebnis.innerHTML = "";
    formEl.querySelector("input").focus();
  });
})();
