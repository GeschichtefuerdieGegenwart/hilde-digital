/* Hilde Digital – Galerie: redaktionelle Einblicke aus den echten Anwendungen.
   Große Einblicke: Projekte mit drei oder mehr Ansichten. Kleine Einblicke: Projekte mit zwei Ansichten.
   Alle übrigen Beispiele stehen unten in der durchsuchbaren Liste (assets/showroom.js).
   Jedes Bild öffnet die Bildansicht (HILDE.lichtbild) – mit Maus, Finger oder Tastatur.
   Braucht: BEISPIELE, GALERIE, HILDE. */
(function () {
  "use strict";
  var H = HILDE, esc = H.esc;
  var gross = document.getElementById("einblicke"), klein = document.getElementById("einblicke-klein");
  if (!gross || typeof GALERIE === "undefined") return;

  var mitBildern = BEISPIELE.filter(function (b) { return b.ansichten && b.ansichten.length >= 2; });
  // Reihenfolge: zuerst die vom Master-Prompt genannten Labore, dann nach Anzahl der Ansichten.
  var ZUERST = ["psycho-ds2", "ns-ideologie", "gene", "nation"];
  mitBildern.sort(function (a, b) {
    var ia = ZUERST.indexOf(a.id), ib = ZUERST.indexOf(b.id);
    if (ia >= 0 || ib >= 0) return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    return b.ansichten.length - a.ansichten.length;
  });

  /* Kleine Ansichten mit Farbauszug (Muster G): in Ruhe zweifarbig, beim Überfahren das echte Bild. */
  function knopfBild(b, a, i, klasse) {
    var auszug = klasse === "einblick-detail" || klasse === "ek-detail";
    var bild = '<img' + (auszug ? ' class="auszug-original"' : "") + ' src="' + esc(a.bild) + '" alt="' + esc(a.alt) + '" width="1040" height="650" loading="' + (i === 0 ? "eager" : "lazy") + '">';
    if (auszug) {
      var platte = function (k) { return '<span class="platte ' + k + '" aria-hidden="true"><img src="' + esc(a.bild) + '" alt="" width="1040" height="650" loading="lazy"></span>'; };
      bild = '<span class="auszug">' + platte("p-ki") + platte("p-le") + bild + "</span>";
    }
    return '<button type="button" class="' + klasse + '" data-bildrahmen data-projekt="' + esc(b.id) + '" data-ansicht="' + i + '">' + bild +
      '<span class="sr-only">Ansicht ' + (i + 1) + " von " + b.ansichten.length + " groß zeigen</span></button>";
  }

  function oeffnen(b) {
    return b.link
      ? '<a class="textlink" href="' + esc(b.link) + '" target="_blank" rel="noopener">Anwendung öffnen <span aria-hidden="true">↗</span><span class="sr-only"> (neuer Tab, braucht Internet)</span></a>'
      : '<span class="leise klein">Noch nicht online.</span>';
  }

  gross.innerHTML = mitBildern.filter(function (b) { return b.ansichten.length >= 3; }).map(function (b, n) {
    var a = b.ansichten;
    return '<article class="einblick' + (n % 2 ? " gespiegelt" : "") + '" aria-labelledby="eb-' + esc(b.id) + '">' +
      '<div class="einblick-bilder">' + knopfBild(b, a[0], 0, "einblick-haupt") +
        '<div class="einblick-details">' + a.slice(1, 4).map(function (x, i) { return knopfBild(b, x, i + 1, "einblick-detail"); }).join("") + "</div></div>" +
      '<div class="einblick-text">' + H.kennzeichen(b) +
        '<p class="fach">' + esc(b.fach) + "</p>" +
        '<h3 id="eb-' + esc(b.id) + '">' + esc(b.titel) + "</h3>" +
        '<p class="einblick-kurz">' + esc(b.kurz) + "</p>" +
        '<ol class="einblick-schritte">' + a.map(function (x) { return "<li>" + esc(x.text) + "</li>"; }).join("") + "</ol>" +
        '<p class="status">Status: <b>' + esc(b.status) + "</b></p>" +
        '<p class="einblick-aktionen">' + H.merkKnopf(b) + '<a class="knopf" href="' + H.detailLink(b) + '">Beispiel ansehen<span class="sr-only">: ' + esc(b.titel) + "</span></a> " + oeffnen(b) + "</p>" +
      "</div></article>";
  }).join("");

  klein.innerHTML = mitBildern.filter(function (b) { return b.ansichten.length === 2; }).map(function (b) {
    var a = b.ansichten;
    return '<article class="einblick-klein" aria-labelledby="ek-' + esc(b.id) + '">' +
      '<div class="einblick-klein-bilder">' + knopfBild(b, a[0], 0, "ek-haupt") + knopfBild(b, a[1], 1, "ek-detail") + "</div>" +
      '<div class="einblick-klein-text">' + H.kennzeichen(b) + '<h3 id="ek-' + esc(b.id) + '">' + esc(b.titel) + "</h3>" +
        "<p>" + esc(a[0].text) + "</p>" +
        '<p class="einblick-aktionen">' + H.merkKnopf(b) + '<a class="textlink" href="' + H.detailLink(b) + '">Beispiel ansehen<span class="sr-only">: ' + esc(b.titel) + '</span> <span aria-hidden="true">→</span></a> ' + oeffnen(b) + "</p></div></article>";
  }).join("");

  /* ---------- Fächer: alle Ansichten, gleitet langsam von selbst (assets/faecher.js) ---------- */
  if (window.FAECHER) FAECHER.starte({ id: "galerie-faecher", name: "Alle Projekte im Vorbeiziehen", eintraege: FAECHER.ansichten(false), gleiten: true, tempo: 24, start: 3 });

  document.addEventListener("click", function (e) {
    var k = e.target.closest("[data-projekt]");
    if (!k) return;
    var b = BEISPIELE.filter(function (x) { return x.id === k.getAttribute("data-projekt"); })[0];
    if (b) H.lichtbild(b.ansichten, parseInt(k.getAttribute("data-ansicht"), 10), b.titel, k, { detail: H.detailLink(b), app: b.link || "" });
  });

})();
