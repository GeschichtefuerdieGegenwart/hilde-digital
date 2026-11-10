/* Papierprobe – Hebelrad im Kopf von »Wann funktioniert digitaler Unterricht?« (sechs-hebel.html), ab Version 4.21.

   Muster Y · Hebelrad (DESIGN.md, Abschnitt Bewegung). Die Überblicksgrafik der sechs Hebel: in der Mitte das Gerät,
   rundherum die sechs Hebel ohne Reihenfolge, der Ring ist die Plenumsstelle, außen der Raum (deuten · streiten · urteilen).
   Tippt man einen Hebel an, hebt er sich auf seine Platte (Rückmeldung, --dauer-schnell) und die Karte daneben wechselt
   ihren Text (Zustandswechsel, --dauer-aufdecken). Der Text kommt aus den sechs Bändern weiter unten – nichts steht doppelt.
   Kein großer Moment: Der eine große Moment der Seite bleibt R1 (One Moment Rule).
   Ohne JavaScript sind die Kacheln Sprungmarken zu den Bändern, die Karte zeigt alle sechs Sätze (Visible-at-Rest Rule).
   Bei »Weniger Bewegung« oder Tastatur (event.detail === 0) wechselt die Karte ohne Übergang. Nichts wird gespeichert.
   Braucht: HILDE (ruhig) aus hilde.js – fällt ohne HILDE auf die Systemeinstellung zurück. */
(function () {
  "use strict";
  var rad = document.getElementById("sh-rad");
  var karte = document.getElementById("sh-rad-karte");
  if (!rad || !karte) return;
  var kacheln = [].slice.call(rad.querySelectorAll(".sh-rad-kachel"));
  if (kacheln.length !== 6) return;
  rad.classList.add("sh-rad-js");
  var ruhe = karte.innerHTML; /* die Karte in Ruhe: alle sechs Sätze */
  var gewaehlt = null;

  function ruhig() {
    if (window.HILDE && HILDE.ruhig) return HILDE.ruhig();
    return !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  /* Text eines Hebels aus seinem Band lesen: Überschrift, Satz, Wofür, Beispiel, Ohne Gerät */
  function bandVon(k) {
    var ziel = k.getAttribute("href");
    return ziel && ziel.charAt(0) === "#" ? document.getElementById(ziel.slice(1)) : null;
  }
  function fuelle(k) {
    var band = bandVon(k), text = band && band.querySelector(".sh-hebel-text");
    if (!text) return false;
    var h3 = text.querySelector("h3"), abs = [].slice.call(text.querySelectorAll("p"));
    karte.innerHTML = "";
    var kopf = document.createElement("p"); kopf.className = "sh-rad-karte-kopf";
    kopf.textContent = "Dein Hebel · " + (h3 ? h3.textContent : "");
    karte.appendChild(kopf);
    abs.forEach(function (p, i) {
      var q = p.cloneNode(true);
      q.className = i === 0 ? "sh-rad-karte-titel" : p.className;
      karte.appendChild(q);
    });
    var weiter = document.createElement("a"); weiter.className = "textlink"; weiter.href = k.getAttribute("href");
    weiter.innerHTML = "Zum Hebel mit seiner Probe <span aria-hidden=\"true\">↓</span>";
    karte.appendChild(weiter);
    return true;
  }
  function zeige(k, sofort) {
    kacheln.forEach(function (x) { x.removeAttribute("aria-current"); x.classList.remove("sh-rad-an"); });
    if (gewaehlt === k) { gewaehlt = null; karte.innerHTML = ruhe; wechsel(sofort); return; }
    gewaehlt = k;
    k.setAttribute("aria-current", "true"); k.classList.add("sh-rad-an");
    if (!fuelle(k)) { gewaehlt = null; location.hash = k.getAttribute("href"); return; }
    wechsel(sofort);
  }
  function wechsel(sofort) {
    karte.classList.remove("sh-rad-neu");
    if (sofort || ruhig()) return;
    void karte.offsetWidth;
    karte.classList.add("sh-rad-neu");
  }

  kacheln.forEach(function (k) {
    k.addEventListener("click", function (e) {
      e.preventDefault();
      zeige(k, e.detail === 0);
    });
  });
  karte.setAttribute("aria-live", "polite");
})();
