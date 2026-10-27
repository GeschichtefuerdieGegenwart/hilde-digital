/* Hilde Digital – Galerie: »Zum Anfangen« (ab Version 4.7).
   Sechs erprobte Beispiele, zwei je Umfang, aus dem Feld »auswahl« in assets/daten/beispiele.js.
   Drei Gruppen in der Reihenfolge von TAXONOMIEN.umfang, jede mit einer Stundenlinie (Muster I) als Kopf.
   Keine Rangfolge: Die drei Linien zeichnen sich gleichzeitig, die Karten stehen ohne Nummer.
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

  // Die drei Kopflinien zeichnen sich einmal beim Erscheinen – gleichzeitig, ohne Staffelung (keine Rangfolge).
  H.stundenlinieZeichnen(ort.querySelectorAll(".anfangen-gruppe-kopf .stundenlinie"));
})();
