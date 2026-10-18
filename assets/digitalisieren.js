/* Hilde Digital – Werkzeug »Unterricht digitalisieren«: Auswahl → Prompt zum Kopieren.
   Der Prompt entsteht bei jeder Änderung neu (assets/digitalisieren-prompt.js).
   Gespeichert werden nur Auswahlwerte (Phase, Material, Vorhaben, Umfang, Ausgabe), nie Freitexte.
   Erklär-Bewegung im Kopf: Das Blatt wird einmal zum Tablet (nicht bei »weniger Bewegung«).
   Braucht: TAXONOMIEN, QUALITAET, DIGITALISIEREN, DIGITALISIEREN_PROMPT, HILDE. */
(function () {
  "use strict";
  var D = DIGITALISIEREN, T = TAXONOMIEN, H = HILDE, esc = H.esc;
  var form = document.getElementById("dig-form");
  if (!form) return;
  var SPEICHER = "digitalisieren";
  var g = H.lies(SPEICHER) || {};
  var wahl = {
    phase: typeof g.phase === "string" ? g.phase : "",
    materialien: Array.isArray(g.materialien) ? g.materialien : ["arbeitsblatt"],
    vorhaben: D.vorhaben.some(function (v) { return v.id === g.vorhaben; }) ? g.vorhaben : "ideen",
    umfang: typeof g.umfang === "string" ? g.umfang : "",
    ausgabe: typeof g.ausgabe === "string" ? g.ausgabe : "ideen"
  };
  var feld = document.getElementById("d-prompt"), status = document.getElementById("d-status");

  document.getElementById("d-phasen").innerHTML = T.phasen.filter(function (p) { return p.id !== "offen"; }).map(function (p) {
    return '<button type="button" class="chip" data-phase="' + p.id + '" aria-pressed="' + (wahl.phase === p.id) + '">' + esc(p.name) + "</button>";
  }).join("");
  document.getElementById("d-materialien").innerHTML = D.materialien.map(function (m) {
    return '<label class="bk-haken"><input type="checkbox" name="material" value="' + m.id + '"' + (wahl.materialien.indexOf(m.id) > -1 ? " checked" : "") + "><span>" + esc(m.name) + "</span></label>";
  }).join("");
  document.getElementById("d-vorhaben").innerHTML = D.vorhaben.map(function (v) {
    return '<label class="bk-karte"><input type="radio" name="vorhaben" value="' + v.id + '"' + (wahl.vorhaben === v.id ? " checked" : "") + ">" +
      '<span class="bk-karte-text"><b>' + esc(v.name) + "</b><span>" + esc(v.kurz) + "</span></span></label>";
  }).join("");
  document.getElementById("d-umfang").innerHTML = D.umfang.map(function (u) {
    return '<option value="' + u.id + '"' + (wahl.umfang === u.id ? " selected" : "") + ">" + esc(u.name) + (u.hilfe ? " – " + esc(u.hilfe) : "") + "</option>";
  }).join("");
  document.getElementById("d-ausgabe").innerHTML = D.ausgaben.map(function (a) {
    return '<option value="' + a.id + '"' + (wahl.ausgabe === a.id ? " selected" : "") + ">" + esc(a.name) + "</option>";
  }).join("");

  function wert(id) { return document.getElementById(id).value; }
  function neu() {
    feld.value = DIGITALISIEREN_PROMPT.baue({ fach: wert("d-fach"), thema: wert("d-thema"), gruppe: wert("d-gruppe"),
      phase: wahl.phase, materialien: wahl.materialien, vorhaben: wahl.vorhaben, umfang: wahl.umfang, ausgabe: wahl.ausgabe });
    var v = D.vorhaben.filter(function (x) { return x.id === wahl.vorhaben; })[0];
    document.getElementById("d-zusammenfassung").textContent = v.name + (wahl.materialien.length ? " · " + wahl.materialien.length + (wahl.materialien.length === 1 ? " Material" : " Materialien") : "");
    H.schreib(SPEICHER, wahl);
  }
  form.addEventListener("input", function (e) {
    var t = e.target;
    if (t.name === "material") wahl.materialien = [].slice.call(form.querySelectorAll('input[name="material"]:checked')).map(function (x) { return x.value; });
    if (t.name === "vorhaben") wahl.vorhaben = t.value;
    if (t.id === "d-umfang") wahl.umfang = t.value;
    if (t.id === "d-ausgabe") wahl.ausgabe = t.value;
    neu(); status.textContent = "";
  });
  form.addEventListener("click", function (e) {
    var c = e.target.closest("[data-phase]"); if (!c) return;
    wahl.phase = wahl.phase === c.getAttribute("data-phase") ? "" : c.getAttribute("data-phase");
    form.querySelectorAll("[data-phase]").forEach(function (x) { x.setAttribute("aria-pressed", String(x.getAttribute("data-phase") === wahl.phase)); });
    neu();
  });
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  function selbst() { feld.focus(); feld.select(); status.textContent = "Der Prompt ist markiert. Kopiere ihn mit Strg + C (Mac: Cmd + C)."; }
  document.getElementById("d-kopieren").addEventListener("click", function () {
    try {
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(feld.value).then(function () { status.textContent = "Kopiert. Füge ihn in dein KI-System ein und hänge dein Material an."; }, selbst);
      else selbst();
    } catch (err) { selbst(); }
  });
  neu();

  // Erklär-Bewegung: Das Blatt wird einmal zum Tablet – kurz nach dem Laden, nur ohne »weniger Bewegung«.
  var geraet = document.getElementById("geraet");
  var ruhig = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (geraet) {
    if (ruhig) { geraet.classList.add("sofort", "digital"); document.getElementById("geraet-titel").textContent = "Am Tablet"; }
    else setTimeout(function () { geraet.classList.add("digital"); document.getElementById("geraet-titel").textContent = "Am Tablet"; }, 900);
  }
})();
