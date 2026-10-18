/* Hilde Digital – Digital-Check, Weg B »Mit KI prüfen«.
   Baut den Prüf-Auftrag (assets/pruef-prompt.js) und kopiert ihn. Keine KI, keine Übertragung, kein Upload.
   Gespeichert wird nur der gewählte Materialtyp (als Bequemlichkeit), nie ein Text.
   Braucht: QUALITAET, PRUEFPROMPT, HILDE. */
(function () {
  "use strict";
  var Q = QUALITAET, H = HILDE, esc = H.esc;
  var typ = document.getElementById("material-typ");
  if (!typ || typeof PRUEFPROMPT === "undefined") return;
  var feld = document.getElementById("pruef-prompt"), knopf = document.getElementById("prompt-kopieren");
  var status = document.getElementById("kopier-status"), ansicht = document.getElementById("prompt-ansicht");
  var SPEICHER = "pruefprompt";

  typ.innerHTML = '<option value="">Weiß ich nicht – die KI soll es bestimmen</option>' +
    Q.materialtypen.map(function (t) { return '<option value="' + t.id + '">' + esc(t.name) + "</option>"; }).join("");
  var alt = H.lies(SPEICHER);
  if (alt && alt.typ && Q.materialtypen.some(function (t) { return t.id === alt.typ; })) typ.value = alt.typ;

  function neu() { feld.value = PRUEFPROMPT.baue({ typ: typ.value }); }
  neu();

  typ.addEventListener("change", function () {
    H.schreib(SPEICHER, { typ: typ.value || null });
    neu();
    status.textContent = "Der Auftrag ist an »" + (typ.value ? typ.options[typ.selectedIndex].text : "noch offen") + "« angepasst.";
  });

  function selbst() {
    ansicht.open = true;
    feld.focus(); feld.select();
    status.textContent = "Automatisches Kopieren war nicht möglich. Der Auftrag ist markiert – kopiere ihn mit Strg + C (Mac: Cmd + C).";
  }
  knopf.addEventListener("click", function () {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(feld.value).then(function () {
          status.textContent = "Kopiert. Füge den Auftrag jetzt in dein KI-System ein und hänge dein Material an.";
        }, selbst);
      } else selbst();
    } catch (err) { selbst(); }
  });
})();
