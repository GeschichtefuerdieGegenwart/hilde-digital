/* Kidu – Galerie nach Prinzip (ab Version 4.33).
   Oben in der Galerie: sechs Prinzipien zum Wählen. In Ruhe steht je Prinzip ein Beispiel da,
   nach der Wahl alle Beispiele dieses Prinzips. Jede Karte sagt in einem Satz, was das Gerät hier kann.
   Nur Beispiele mit den Feldern »prinzipien« und »geraet«. Gemerkt wird nichts. Braucht: TAXONOMIEN, BEISPIELE, HILDE. */
(function () {
  "use strict";
  var ziel = document.getElementById("prinzip-karten"), filter = document.getElementById("prinzip-filter"), stand = document.getElementById("prinzip-stand");
  if (!ziel || typeof BEISPIELE === "undefined" || typeof HILDE === "undefined") return;
  var H = HILDE, esc = H.esc, P = TAXONOMIEN.prinzipien;
  var mit = BEISPIELE.filter(function (b) { return b.geraet && b.prinzipien && b.prinzipien.length; });
  function von(id) { return mit.filter(function (b) { return b.prinzipien.indexOf(id) >= 0; }); }

  function karte(b, p) {
    var bild = b.bild ? '<a class="pk-bild" href="' + H.detailLink(b) + '" tabindex="-1" aria-hidden="true"><img src="' + esc(b.bild) + '" alt="" width="1040" height="650" loading="lazy"></a>' : "";
    return '<article class="prinzip-karte' + (b.bild ? "" : " ohne-bild") + '">' + bild +
      '<div class="pk-text">' +
        '<p class="pk-prinzip"><a href="sechs-hebel.html#sh-' + esc(p.id) + '">' + esc(p.name) + '</a> <span class="leise">– ' + esc(p.hilfe) + "</span></p>" +
        "<h3>" + esc(b.titel) + "</h3>" +
        '<p class="fach">' + esc(b.fach) + "</p>" +
        '<p class="geraet-satz">' + esc(b.geraet) + "</p>" +
        (b.stimme ? '<p class="stimme klein"><b>Lernende, zusammengefasst:</b> ' + esc(b.stimme) + "</p>" : "") +
        '<p class="pk-wege"><a class="knopf" href="' + H.detailLink(b) + '">Beispiel ansehen<span class="sr-only">: ' + esc(b.titel) + "</span></a>" +
          (b.link ? ' <a class="textlink" href="' + esc(b.link) + '" target="_blank" rel="noopener">Ausprobieren <span aria-hidden="true">↗</span><span class="sr-only"> (neuer Tab, braucht Internet)</span></a>' : "") + "</p>" +
      "</div></article>";
  }

  function zeige(id) {
    var html = "", n = 0;
    if (!id) {
      // Je Prinzip ein anderes Beispiel: zuerst eines, das dieses Prinzip an erster Stelle nennt und ein Bild hat.
      var benutzt = {};
      P.forEach(function (p) {
        var xs = von(p.id).filter(function (b) { return !benutzt[b.id]; });
        xs.sort(function (a, b) {
          return ((b.prinzipien[0] === p.id ? 2 : 0) + (b.bild ? 1 : 0)) - ((a.prinzipien[0] === p.id ? 2 : 0) + (a.bild ? 1 : 0));
        });
        if (xs[0]) { benutzt[xs[0].id] = true; html += karte(xs[0], p); n++; }
      });
      stand.textContent = "Je Prinzip ein Beispiel. Es gibt keine Reihenfolge.";
    } else {
      var p = P.filter(function (x) { return x.id === id; })[0];
      von(id).forEach(function (b) { html += karte(b, p); n++; });
      stand.textContent = p.name + ": " + n + (n === 1 ? " Beispiel" : " Beispiele") + ".";
    }
    ziel.innerHTML = html;
    filter.querySelectorAll("button").forEach(function (k) {
      k.setAttribute("aria-pressed", String((k.getAttribute("data-prinzip") || "") === (id || "")));
    });
  }
  filter.innerHTML = '<button type="button" class="chip" data-prinzip="">Alle sechs</button>' + P.map(function (p) {
    return '<button type="button" class="chip" data-prinzip="' + esc(p.id) + '">' + esc(p.name) + "</button>";
  }).join("");
  filter.addEventListener("click", function (e) { var k = e.target.closest("button"); if (k) zeige(k.getAttribute("data-prinzip")); });
  zeige("");
})();
