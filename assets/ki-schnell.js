/* Hilde Digital – KI-Training, Eingang »Schnell-Anfrage«.
   Anlass wählen, Fach, Thema und Lerngruppe angeben: Der Prompt entsteht sofort und lässt sich kopieren.
   Gespeichert wird nur der gewählte Anlass, nie ein Freitext. Braucht: SCHNELL, SCHNELL_ANFRAGE, HILDE. */
(function () {
  "use strict";
  var H = HILDE, esc = H.esc;
  var ziel = document.getElementById("anlaesse");
  if (!ziel || typeof SCHNELL === "undefined") return;
  var feld = document.getElementById("schnell-prompt"), status = document.getElementById("schnell-status");
  var gemerkt = H.lies("schnell") || {};
  var anlass = SCHNELL.anlaesse.some(function (a) { return a.id === gemerkt.anlass; }) ? gemerkt.anlass : SCHNELL.anlaesse[0].id;

  ziel.innerHTML = SCHNELL.anlaesse.map(function (a) {
    return '<label class="anlass"><input type="radio" name="anlass" value="' + a.id + '"' + (a.id === anlass ? " checked" : "") + ">" +
      '<span class="anlass-text"><b>' + esc(a.name) + "</b><span>" + esc(a.kurz) + "</span></span></label>";
  }).join("");

  function wert(id) { return document.getElementById(id).value; }
  function neu() {
    feld.value = SCHNELL_ANFRAGE.baue({ anlass: anlass, fach: wert("s-fach"), thema: wert("s-thema"), gruppe: wert("s-gruppe") });
  }
  document.getElementById("schnell-form").addEventListener("input", function (e) {
    if (e.target.name === "anlass") { anlass = e.target.value; H.schreib("schnell", { anlass: anlass }); }
    neu(); status.textContent = "";
  });
  document.getElementById("schnell-form").addEventListener("submit", function (e) { e.preventDefault(); });
  function selbst() { feld.focus(); feld.select(); status.textContent = "Der Prompt ist markiert. Kopiere ihn mit Strg + C (Mac: Cmd + C)."; }
  document.getElementById("schnell-kopieren").addEventListener("click", function () {
    try {
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(feld.value).then(function () { status.textContent = "Kopiert. Füge ihn jetzt in dein KI-System ein."; }, selbst);
      else selbst();
    } catch (err) { selbst(); }
  });
  neu();
})();
