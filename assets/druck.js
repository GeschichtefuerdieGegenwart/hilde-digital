/* Hilde Digital – Drucken-Knöpfe (ab Version 4.5).
   <button data-drucken>            druckt die ganze Seite
   <button data-drucken="nur-karte"> setzt vorher eine Klasse an <html>, damit die Druckfassung nur einen Teil zeigt.
   Nach dem Drucken wird die Klasse wieder entfernt. Es wird nichts gespeichert. */
(function () {
  "use strict";
  var r = document.documentElement, aktiv = "";
  document.addEventListener("click", function (e) {
    var k = e.target.closest("[data-drucken]");
    if (!k) return;
    aktiv = k.getAttribute("data-drucken");
    if (aktiv) r.classList.add(aktiv);
    window.print();
    if (aktiv && !("onafterprint" in window)) { r.classList.remove(aktiv); aktiv = ""; }
  });
  window.addEventListener("afterprint", function () { if (aktiv) r.classList.remove(aktiv); aktiv = ""; });
})();
