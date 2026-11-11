/* Kidu – »Beispiele dazu« unter jedem der sechs Prinzipien (ab Version 4.33).
   Liest das Feld »prinzipien« der Galerie-Beispiele und hängt je Band höchstens vier Verweise an.
   Braucht: BEISPIELE, HILDE. */
(function () {
  "use strict";
  if (typeof BEISPIELE === "undefined" || typeof HILDE === "undefined") return;
  var esc = HILDE.esc;
  document.querySelectorAll(".sh-hebel[id^='sh-']").forEach(function (band) {
    var id = band.id.replace(/^sh-/, "");
    var xs = BEISPIELE.filter(function (b) { return b.prinzipien && b.prinzipien.indexOf(id) >= 0; }).slice(0, 4);
    var text = band.querySelector(".sh-hebel-text");
    if (!xs.length || !text) return;
    var p = document.createElement("p");
    p.className = "sh-beispiele";
    p.innerHTML = "<b>In der Galerie:</b> " + xs.map(function (b) {
      return '<a class="textlink" href="' + HILDE.detailLink(b) + '">' + esc(b.titel) + "</a>";
    }).join(" · ");
    text.appendChild(p);
  });
})();
