/* Kidu – Galerie: »Zum Anfangen« (ab Version 4.7).
   Sechs erprobte Beispiele, zwei je Umfang, aus dem Feld »auswahl« in assets/daten/beispiele.js.
   Drei Gruppen in der Reihenfolge von TAXONOMIEN.umfang, jede mit einer Stundenlinie (Muster I) als Kopf.
   Keine Rangfolge: Die drei Linien stehen gleich fertig da, die Karten ohne Nummer.
   Braucht: TAXONOMIEN, BEISPIELE, HILDE. */
(function () {
  "use strict";
  var T = TAXONOMIEN, H = HILDE, esc = H.esc;
  var ort = document.getElementById("anfangen-gruppen");
  if (!ort) return;

  function bild(b) {
    if (b.bild) return '<div class="bild" data-bildrahmen><img src="' + esc(b.bild) + '" alt="" loading="lazy" width="1040" height="650" data-wechsel-bild></div>';
    return '<div class="bild ohne-bild" aria-hidden="true"><span>noch kein Bild</span></div>';
  }

  function karte(b) {
    // data-wechsel: Bild und Titel wandern beim Öffnen zur Detailseite (HILDE.ansichtswechsel in hilde.js).
    return '<article class="karte anfangen-karte" data-wechsel="' + esc(b.id) + '">' + bild(b) +
      '<div class="koerper">' + H.kennzeichen(b) +
      '<p class="fach">' + esc(b.fach) + "</p><h4 data-wechsel-titel>" + esc(b.titel) + "</h4>" +
      '<p class="grund">' + esc(b.auswahl.grund) + "</p></div>" +
      '<div class="fussleiste"><span class="status">Status: <b>' + esc(b.status) + "</b></span>" +
      '<span class="fuss-knoepfe"><a class="knopf" href="' + H.detailLink(b) + '">Mehr dazu<span class="sr-only">: ' + esc(b.titel) + "</span></a>" +
      (b.link ? '<a class="knopf still" href="' + esc(b.link) + '" target="_blank" rel="noopener">Ausprobieren <span aria-hidden="true">↗</span><span class="sr-only"> (neuer Tab, braucht Internet)</span></a>' : "") +
      "</span></div></article>";
  }

  ort.innerHTML = T.umfang.map(function (u) {
    var liste = BEISPIELE.filter(function (b) { return b.auswahl && b.umfang === u.id; });
    if (!liste.length) return "";
    return '<section class="anfangen-gruppe" aria-labelledby="t-anf-' + esc(u.id) + '">' +
      '<div class="anfangen-gruppe-kopf"><h3 id="t-anf-' + esc(u.id) + '">' + esc(u.name) + "</h3>" +
      H.stundenlinie(u.id) + '<p class="klein leise">' + esc(u.hilfe) + "</p></div>" +
      liste.map(karte).join("") + "</section>";
  }).join("");

  /* Ab 4.37: dazu die ganzen Einheiten – eigene Gruppe, nicht Teil der sechs (die bleiben zwei je Umfang).
     Eine Einheit hat keinen eigenen Umfang; ihre Karte zeigt die Teile als Reihe kleiner Stundenlinien. */
  var einheiten = BEISPIELE.filter(function (b) { return b.art === "einheit"; });
  if (einheiten.length) ort.insertAdjacentHTML("beforeend", '<section class="anfangen-einheiten" aria-labelledby="t-anf-einheit">' +
    '<div class="anfangen-gruppe-kopf"><h3 id="t-anf-einheit">' + esc(T.einheit.name) + '</h3><p class="klein leise">' + esc(T.einheit.abgrenzung) + "</p></div>" +
    einheiten.map(function (e) {
      return '<article class="karte kompakt anfangen-einheit" data-wechsel="' + esc(e.id) + '"><div class="koerper"><p class="fach">' + esc(e.fach) + "</p><h4 data-wechsel-titel>" + esc(e.titel) + "</h4>" +
        "<p>" + esc(e.kurz) + "</p>" + H.umfangZeile(e) + '</div><div class="fussleiste"><span class="status">Status: <b>' + esc(e.status) + '</b></span><span class="fuss-knoepfe"><a class="knopf" href="' + H.detailLink(e) + '">Mehr dazu<span class="sr-only">: ' + esc(e.titel) + "</span></a></span></div></article>";
    }).join("") + "</section>");

})();
