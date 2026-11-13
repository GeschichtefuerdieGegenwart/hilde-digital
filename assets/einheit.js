/* Kidu – Ganze Einheit im Planungsweg »Unterricht neu planen« (tablets.html, ab Version 4.37, Fassung B).
   Eine Frage vor dem Weg: eine Stunde oder mehrere Stunden als Einheit? Bei einer Einheit kommt zuerst
   Schritt E »Landkarte der Einheit«: Was gibt es schon? Was kommt als Nächstes? Danach je Stunde der Weg wie bisher.
   Die Einheit ist keine vierte Stufe des Umfangs. Gespeichert werden nur die Kreuze (hilde.einheit).
   Texte aus TAXONOMIEN.einheit, Regel aus REGELN.einheit (assets/regeln.js, mit Tests). Braucht: TAXONOMIEN, REGELN, HILDE. */
(function () {
  "use strict";
  var H = HILDE, esc = H.esc, E = TAXONOMIEN.einheit, SPEICHER = "einheit";
  var wahl = document.getElementById("einheit-wahl"), karte = document.getElementById("einheit-karte");
  if (!wahl || !karte) return;
  var z = H.lies(SPEICHER) || {};
  var ebene = z.ebene === "einheit" ? "einheit" : "stunde", da = Array.isArray(z.da) ? z.da : [];

  function zeichne() {
    karte.hidden = ebene !== "einheit";
    if (karte.hidden) { karte.innerHTML = ""; return; }
    var r = REGELN.einheit({ da: da });
    karte.innerHTML = '<p class="karte-marker">Schritt E · Landkarte der Einheit</p>' +
      '<h2 id="einheit-titel" tabindex="-1">' + esc(E.name) + "</h2>" +
      "<p>" + esc(E.satz) + "</p>" +
      '<p class="leise klein">' + esc(E.abgrenzung) + "</p>" +
      '<fieldset class="einheit-merkmale"><legend>Was gibt es für deine Einheit schon?</legend><div class="probe-wahl">' +
      E.merkmale.map(function (m) {
        return '<label><input type="checkbox" name="einheit-da" value="' + m.id + '"' + (da.indexOf(m.id) > -1 ? " checked" : "") + "><span><b>" + esc(m.name) + '</b><span class="einheit-hilfe">\u00a0– ' + esc(m.hilfe) + "</span></span></label>";
      }).join("") + "</div></fieldset>" +
      (r.naechstes.length ? '<h3 class="minis-titel">Als Nächstes für den Rahmen</h3><ol class="bogen-hinweise">' + r.naechstes.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>" : "") +
      '<p class="begruendung"><b>Je Stunde:</b> ' + esc(r.papierprobe) + "</p>" +
      '<p class="begruendung">' + esc(r.weiter) + ' <a class="textlink" href="#weg" id="einheit-weiter">Zur ersten Stunde <span aria-hidden="true">↓</span></a></p>' +
      '<p class="schluss">' + esc(r.satzEnde) + "</p>";
  }
  function merke() { H.schreib(SPEICHER, { ebene: ebene, da: da }); }

  var radio = wahl.querySelector('input[name="ebene"][value="' + ebene + '"]');
  if (radio) radio.checked = true;
  zeichne();
  wahl.addEventListener("change", function (e) {
    if (e.target.name !== "ebene") return;
    ebene = e.target.value; merke(); zeichne();
    if (ebene === "einheit") document.getElementById("einheit-titel").focus();
  });
  karte.addEventListener("change", function (e) {
    if (e.target.name !== "einheit-da") return;
    da = [].map.call(karte.querySelectorAll('input[name="einheit-da"]:checked'), function (x) { return x.value; });
    merke();
    var fokus = e.target.value; zeichne();
    var neu = karte.querySelector('input[name="einheit-da"][value="' + fokus + '"]'); if (neu) neu.focus();
  });
  karte.addEventListener("click", function (e) {
    if (!e.target.closest("#einheit-weiter")) return;
    e.preventDefault();
    var f = document.getElementById("frage") || document.getElementById("weg");
    if (f) { f.scrollIntoView({ block: "start" }); if (f.focus) f.focus(); }
  });
})();
