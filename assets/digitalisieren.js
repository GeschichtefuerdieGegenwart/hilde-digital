/* Kidu – Werkzeug »Unterricht digitalisieren«: Auswahl → Prompt zum Kopieren.
   Der Prompt entsteht bei jeder Änderung neu (assets/digitalisieren-prompt.js).
   Gespeichert werden nur Auswahlwerte (Phase, Material, Vorhaben, Umfang, Ausgabe), nie Freitexte.
   Erklär-Bild im Kopf: ein Regler zwischen Blatt und Tablet. Es steht gleich am Tablet und bewegt sich nur, wenn du ziehst.
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
    einheit: g.einheit === true,
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
  /* Ab 4.37: eine Stunde oder mehrere Stunden als Einheit (Fassung B). Bei einer Einheit gilt der Umfang je Stunde. */
  document.getElementById("d-ebene").value = wahl.einheit ? "einheit" : "stunde";
  document.getElementById("d-umfang").disabled = wahl.einheit;
  document.getElementById("d-ausgabe").innerHTML = D.ausgaben.map(function (a) {
    return '<option value="' + a.id + '"' + (wahl.ausgabe === a.id ? " selected" : "") + ">" + esc(a.name) + "</option>";
  }).join("");

  function wert(id) { return document.getElementById(id).value; }
  function neu() {
    feld.value = DIGITALISIEREN_PROMPT.baue({ fach: wert("d-fach"), thema: wert("d-thema"), gruppe: wert("d-gruppe"),
      phase: wahl.phase, materialien: wahl.materialien, vorhaben: wahl.vorhaben, umfang: wahl.umfang, ausgabe: wahl.ausgabe, einheit: wahl.einheit });
    var v = D.vorhaben.filter(function (x) { return x.id === wahl.vorhaben; })[0];
    document.getElementById("d-zusammenfassung").textContent = v.name + (wahl.materialien.length ? " · " + wahl.materialien.length + (wahl.materialien.length === 1 ? " Material" : " Materialien") : "");
    H.schreib(SPEICHER, wahl);
  }
  form.addEventListener("input", function (e) {
    var t = e.target;
    if (t.name === "material") wahl.materialien = [].slice.call(form.querySelectorAll('input[name="material"]:checked')).map(function (x) { return x.value; });
    if (t.name === "vorhaben") wahl.vorhaben = t.value;
    if (t.id === "d-umfang") wahl.umfang = t.value;
    if (t.id === "d-ebene") { wahl.einheit = t.value === "einheit"; document.getElementById("d-umfang").disabled = wahl.einheit; }
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

  /* Vom Blatt zum Tablet (ab Version 4.8): ein Regler zieht zwischen »Arbeitsblatt auf Papier« (0) und
     »Dieselbe Aufgabe am Tablet« (100) – mit Finger, Maus oder Tastatur. Das Bild hängt an --t (nur Deckkraft und Lage).
     Seit 4.39 spielt nichts von selbst (Input-First Rule in DESIGN.md): Beim Laden steht der Regler am Tablet,
     dem Ende des Wegs – so steht es auch im HTML. Wer zurückzieht, sieht das Blatt. */
  var geraet = document.getElementById("geraet"), regler = document.getElementById("geraet-stufe");
  if (geraet && regler) {
    var titel = document.getElementById("geraet-titel"), enden = [].slice.call(document.querySelectorAll("[data-geraet-ende]"));
    function setze(v) {
      v = Math.max(0, Math.min(100, v));
      var tablet = v >= 50;
      geraet.style.setProperty("--t", (v / 100).toFixed(3));
      geraet.classList.toggle("digital", tablet);
      titel.textContent = tablet ? "Am Tablet" : "Arbeitsblatt";
      regler.setAttribute("aria-valuetext", tablet ? "Dieselbe Aufgabe am Tablet" : "Arbeitsblatt auf Papier");
      enden.forEach(function (e) { e.classList.toggle("ist", (e.getAttribute("data-geraet-ende") === "tablet") === tablet); });
    }
    regler.addEventListener("input", function () { setze(+regler.value); });
    setze(+regler.value);
  }
})();
