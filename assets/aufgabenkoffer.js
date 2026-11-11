/* Kidu – Aufgabenkoffer (ab Version 4.32): zeichnet die Liste aus assets/daten/aufgaben.js.
   Filter nach Zweck; gemerkt wird nichts. Braucht: AUFGABEN, HILDE. */
(function () {
  "use strict";
  if (typeof AUFGABEN === "undefined" || typeof HILDE === "undefined") return;
  var A = AUFGABEN, esc = HILDE.esc;
  var liste = document.getElementById("koffer-liste");
  var filter = document.getElementById("koffer-filter");
  var anzahl = document.getElementById("koffer-anzahl");
  if (!liste) return;

  var EINSATZ = {
    eingesetzt: "Im eigenen Unterricht eingesetzt",
    geplant: "Ausgearbeitet, noch nicht ausgewertet",
    offen: "Noch nicht erprobt"
  };
  function zweck(id) { return A.zwecke.filter(function (z) { return z.id === id; })[0]; }
  function punkte(xs) { return "<ul>" + xs.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }

  function karte(a) {
    var hebel = a.hebel.length
      ? a.hebel.map(function (h) { return '<a href="sechs-hebel.html#sh-' + h + '">' + esc(A.hebel[h]) + "</a>"; }).join(" · ")
      : "keiner der sechs";
    var bsp = a.beispiel ? ' <a class="textlink" href="beispiel.html#' + esc(a.beispiel) + '">Beispiel ansehen <span aria-hidden="true">→</span></a>' : "";
    return '<li class="koffer-karte" id="k-' + a.id + '" data-zweck="' + a.zweck + '">' +
      '<details class="koffer-details"><summary>' +
        '<span class="koffer-name"><b>' + esc(a.name) + '</b><span class="leise">' + esc(a.auch) + "</span></span>" +
        '<span class="koffer-foerdert">' + esc(a.foerdert) + "</span>" +
        '<span class="koffer-ort ort-' + a.ort + '">' + esc(A.orte[a.ort]) + "</span>" +
      "</summary>" +
      '<div class="koffer-innen">' +
        '<p class="koffer-tun"><b>Was die Lernenden tun:</b> ' + esc(a.tun) + "</p>" +
        '<div class="koffer-zwei">' +
          '<div class="koffer-sinn"><h4>Sinnvoll</h4>' + punkte(a.sinn) + "</div>" +
          '<div class="koffer-wenig"><h4>Wenig sinnvoll</h4>' + punkte(a.wenig) + "</div>" +
        "</div>" +
        '<div class="koffer-zwei">' +
          "<div><h4>Auf Papier</h4><p>" + esc(a.papier) + "</p></div>" +
          "<div><h4>Am Gerät</h4><p>" + esc(a.geraet) + '</p><p class="leise klein">Hebel: ' + hebel + "</p></div>" +
        "</div>" +
        '<p class="koffer-regel"><b>Faustregel:</b> ' + esc(a.regel) + "</p>" +
        '<p class="koffer-erfahrung"><b>Aus dem Unterricht:</b> ' + esc(a.erfahrung) + bsp +
          ' <span class="leise klein">· ' + esc(EINSATZ[a.einsatz]) + "</span></p>" +
        '<p class="koffer-beleg leise klein"><b>Belegstand: ' + esc(a.stand) + ".</b> " + esc(a.beleg) + "</p>" +
      "</div></details></li>";
  }

  liste.innerHTML = A.zwecke.map(function (z) {
    var xs = A.aufgaben.filter(function (a) { return a.zweck === z.id; });
    return '<li class="koffer-gruppe" data-zweck="' + z.id + '"><h3 id="z-' + z.id + '">' + esc(z.name) + "</h3>" +
      '<p class="leise">' + esc(z.frage) + '</p><ul class="koffer-karten">' + xs.map(karte).join("") + "</ul></li>";
  }).join("");

  var quellen = document.getElementById("koffer-quellen");
  if (quellen) quellen.innerHTML = A.quellen.map(function (q) {
    return "<li>" + esc(q.text) + (q.ort ? ' <span class="leise">' + esc(q.ort) + "</span>" : "") + "</li>";
  }).join("");

  function setze(id) {
    var n = 0;
    liste.querySelectorAll(".koffer-gruppe").forEach(function (g) {
      var zeigen = !id || g.getAttribute("data-zweck") === id;
      g.hidden = !zeigen;
      if (zeigen) n += g.querySelectorAll(".koffer-karte").length;
    });
    if (filter) filter.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-pressed", String((b.getAttribute("data-zweck") || "") === (id || "")));
    });
    if (anzahl) anzahl.textContent = n + (n === 1 ? " Aufgabe" : " Aufgaben");
  }
  if (filter) {
    filter.innerHTML = '<button type="button" class="chip" data-zweck="">Alle</button>' + A.zwecke.map(function (z) {
      return '<button type="button" class="chip" data-zweck="' + z.id + '">' + esc(z.name) + "</button>";
    }).join("");
    filter.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (b) setze(b.getAttribute("data-zweck"));
    });
  }
  setze("");

  /* Sprungmarke auf eine Aufgabe (#k-…): aufklappen. */
  function oeffne() {
    var z = location.hash && document.getElementById(location.hash.slice(1));
    if (z && z.classList.contains("koffer-karte")) { setze(""); z.querySelector("details").open = true; z.scrollIntoView(); }
  }
  window.addEventListener("hashchange", oeffne); oeffne();
})();
