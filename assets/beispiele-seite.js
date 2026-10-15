/* Zeigt die Beispielkarten und die zwei Filterstufen. Daten: assets/beispiele.js */
(function () {
  "use strict";
  var wahl = { bereich: "alle", wofuer: "alle", alleZeigen: false };
  var ziel = document.getElementById("karten");
  var leer = document.getElementById("leer");
  var mehr = document.getElementById("mehr");
  var wofuerZeile = document.getElementById("wofuer");

  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function passtBereich(b) {
    if (wahl.bereich === "alle") return true;
    if (wahl.bereich === "beide") return b.bereich === "beide" || b.mitKI;
    return b.bereich === wahl.bereich || b.bereich === "beide";
  }

  function kennzeichen(b) {
    var k = [];
    if (b.bereich === "ki") k.push('<span class="kz ki">KI für unsere Arbeit</span>');
    if (b.bereich === "lernen") k.push('<span class="kz lernen">Lernen</span>');
    if (b.bereich === "beide" || b.mitKI) k.push('<span class="kz beide">mit KI entwickelt</span>');
    if (b.status === "In Überarbeitung") k.push('<span class="kz ueberarbeitung">In Überarbeitung</span>');
    return k.join("");
  }

  function karte(b) {
    var bild = b.bild ? '<div class="bild"><img src="' + b.bild + '" alt="Ansicht von ' + esc(b.titel) + '" loading="lazy"></div>' : "";
    var knopf = b.link
      ? '<a class="knopf" href="' + b.link + '" target="_blank" rel="noopener">Anwendung öffnen <span aria-hidden="true">↗</span></a>'
      : '<span class="knopf" aria-disabled="true">noch nicht online</span>';
    return '<article class="karte' + (b.bild ? "" : " kompakt") + '" id="' + b.id + '">' + bild +
      '<div class="koerper"><div class="kennzeichen">' + kennzeichen(b) + '</div>' +
      '<p class="fach">' + esc(b.fach) + '</p><h3>' + esc(b.titel) + '</h3><p>' + esc(b.kurz) + '</p></div>' +
      '<div class="fussleiste"><span class="status">Status: <b>' + esc(b.status) + '</b></span>' + knopf + '</div></article>';
  }

  function zeigeWofuer() {
    var liste = wahl.bereich === "ki" ? KATEGORIEN.ki
      : wahl.bereich === "lernen" ? KATEGORIEN.lernen
      : wahl.bereich === "beide" ? KATEGORIEN.ki.concat(KATEGORIEN.lernen) : [];
    wofuerZeile.hidden = liste.length === 0;
    var html = '<span>Wofür?</span><button type="button" class="chip" data-wofuer="alle" aria-pressed="' + (wahl.wofuer === "alle") + '">alle</button>';
    liste.forEach(function (k) {
      html += '<button type="button" class="chip" data-wofuer="' + esc(k) + '" aria-pressed="' + (wahl.wofuer === k) + '">' + esc(k) + '</button>';
    });
    wofuerZeile.innerHTML = html;
  }

  function zeichne() {
    var gefiltert = wahl.bereich !== "alle" || wahl.wofuer !== "alle";
    var treffer = BEISPIELE.filter(function (b) {
      return passtBereich(b) && (wahl.wofuer === "alle" || b.kategorien.indexOf(wahl.wofuer) > -1);
    });
    var sichtbar = (gefiltert || wahl.alleZeigen) ? treffer : treffer.filter(function (b) { return b.zuerst; });
    ziel.innerHTML = sichtbar.map(karte).join("");
    leer.hidden = sichtbar.length > 0;
    var rest = treffer.length - sichtbar.length;
    mehr.hidden = rest <= 0;
    mehr.textContent = "Mehr Beispiele (" + rest + ")";
  }

  document.getElementById("bereich").addEventListener("click", function (e) {
    var b = e.target.closest("[data-bereich]"); if (!b) return;
    wahl.bereich = b.getAttribute("data-bereich"); wahl.wofuer = "alle";
    this.querySelectorAll("[data-bereich]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    zeigeWofuer(); zeichne();
  });
  wofuerZeile.addEventListener("click", function (e) {
    var b = e.target.closest("[data-wofuer]"); if (!b) return;
    wahl.wofuer = b.getAttribute("data-wofuer"); zeigeWofuer(); zeichne();
  });
  mehr.addEventListener("click", function () { wahl.alleZeigen = true; zeichne(); });

  if (location.hash) { wahl.alleZeigen = true; }
  zeigeWofuer(); zeichne();
})();
