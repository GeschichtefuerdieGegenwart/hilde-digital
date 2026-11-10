/* Kidu – Hebelrad und Register auf »Wann funktioniert digitaler Unterricht?« (sechs-hebel.html).

   Muster Y · Hebelrad (ab Version 4.21) und Z1 · Rad als Register (ab Version 4.22; Musterbuch Z, Wahl Mario 10.11.2026).
   Das Rad im Kopf ist die Überblicksgrafik der sechs Hebel: Mitte Gerät, rundherum die Hebel ohne Reihenfolge, der Ring
   ist die Plenumsstelle, außen der Raum. Tippt man einen Hebel an, hebt er sich auf seine Platte (Rückmeldung,
   --dauer-schnell), die Karte daneben wechselt ihren Text (Zustandswechsel, --dauer-aufdecken) – und seit 4.22 steht
   darunter nur noch das Band dieses Hebels mit seiner Probe (Register): Die sechs Bänder stehen nicht mehr untereinander,
   »Weiter« und »Zurück« gehen reihum, der Stand steht als Satz (aria-live). Das Band wechselt in --dauer-uebergang;
   die Richtung trägt Bedeutung (weiter kommt von rechts, zurück von links). Das Rad hat keinen Anfang – darum ist in Ruhe
   kein Hebel gewählt. Der Text der Karte kommt aus dem Band, nichts steht doppelt im Quelltext.
   Kein großer Moment: Der eine große Moment der Seite bleibt R1 (One Moment Rule).
   Ohne JavaScript: Kacheln sind Sprungmarken, die Karte zeigt alle sechs Sätze, alle Bänder stehen untereinander
   (Visible-at-Rest Rule). Bei »Weniger Bewegung« oder Tastatur (event.detail === 0) wechseln Karte und Band ohne Übergang.
   Nichts wird gespeichert. Braucht: HILDE (ruhig) aus hilde.js – fällt ohne HILDE auf die Systemeinstellung zurück. */
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

  /* Register (Z1) */
  var abschnitt = document.getElementById("sh-hebel");
  var nav = document.getElementById("sh-register-nav");
  var weiter = document.getElementById("sh-register-weiter"), zurueck = document.getElementById("sh-register-zurueck");
  var stand = document.getElementById("sh-register-stand");
  var register = !!(abschnitt && nav && weiter && zurueck && stand);
  if (register) { abschnitt.classList.add("sh-register"); nav.hidden = false; }

  function ruhig() {
    if (window.HILDE && HILDE.ruhig) return HILDE.ruhig();
    return !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  /* Band eines Hebels: das <li> mit der ID aus der Sprungmarke */
  function bandVon(k) {
    var ziel = k.getAttribute("href");
    return ziel && ziel.charAt(0) === "#" ? document.getElementById(ziel.slice(1)) : null;
  }
  function nameVon(k) { var v = k.querySelector(".sh-rad-verb"); return v ? v.textContent : ""; }

  /* Karte im Kopf: Überschrift, Satz, Wofür, Beispiel, Ohne Gerät aus dem Band */
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
    var hin = document.createElement("a"); hin.className = "textlink"; hin.href = k.getAttribute("href");
    hin.innerHTML = (register ? "Zur Probe dieses Hebels" : "Zum Hebel mit seiner Probe") + " <span aria-hidden=\"true\">↓</span>";
    karte.appendChild(hin);
    return true;
  }
  function wechsel(sofort) {
    karte.classList.remove("sh-rad-neu");
    if (sofort || ruhig()) return;
    void karte.offsetWidth;
    karte.classList.add("sh-rad-neu");
  }

  /* Register: nur das Band des gewählten Hebels steht da */
  function zeigeBand(k, richtung, sofort) {
    if (!register) return;
    var baender = [].slice.call(abschnitt.querySelectorAll(".sh-hebel"));
    var ziel = k ? bandVon(k) : null;
    baender.forEach(function (b) {
      b.classList.remove("sh-aktiv", "sh-band-vor", "sh-band-rueck");
      if (b === ziel) {
        b.classList.add("sh-aktiv");
        if (!sofort && !ruhig()) { void b.offsetWidth; b.classList.add(richtung < 0 ? "sh-band-rueck" : "sh-band-vor"); }
      }
    });
    var i = k ? kacheln.indexOf(k) : -1;
    stand.textContent = k ? "Hebel " + (i + 1) + " von 6: " + nameVon(k) + ". Keine Reihenfolge – das Rad hat keinen Anfang."
      : "Noch kein Hebel gewählt – oben im Rad antippen oder »Weiter«.";
  }

  function waehle(k, richtung, sofort) {
    kacheln.forEach(function (x) { x.removeAttribute("aria-current"); x.classList.remove("sh-rad-an"); });
    gewaehlt = k;
    if (!k) { karte.innerHTML = ruhe; wechsel(sofort); zeigeBand(null, 0, true); return; }
    k.setAttribute("aria-current", "true"); k.classList.add("sh-rad-an");
    if (!fuelle(k)) { gewaehlt = null; location.hash = k.getAttribute("href"); return; }
    wechsel(sofort);
    zeigeBand(k, richtung, sofort);
  }
  function zeige(k, sofort) {
    if (gewaehlt === k) { waehle(null, 0, sofort); return; }
    var alt = gewaehlt ? kacheln.indexOf(gewaehlt) : -1;
    waehle(k, kacheln.indexOf(k) >= alt ? 1 : -1, sofort);
  }
  function blaettere(schritt, sofort) {
    var i = gewaehlt ? kacheln.indexOf(gewaehlt) : (schritt > 0 ? -1 : 0);
    waehle(kacheln[(i + schritt + 6) % 6], schritt, sofort);
  }

  kacheln.forEach(function (k) {
    k.addEventListener("click", function (e) {
      e.preventDefault();
      zeige(k, e.detail === 0);
    });
  });
  if (register) {
    weiter.addEventListener("click", function (e) { blaettere(1, e.detail === 0); });
    zurueck.addEventListener("click", function (e) { blaettere(-1, e.detail === 0); });
    /* Sprungmarke in der Adresse (#sh-messen): den Hebel gleich zeigen, sonst wäre das Ziel leer */
    var treffer = kacheln.filter(function (k) { return k.getAttribute("href") === location.hash; });
    if (treffer.length) waehle(treffer[0], 1, true);
    else zeigeBand(null, 0, true);
  }
  karte.setAttribute("aria-live", "polite");

  window.SechsHebelRad = { waehle: function (name) { var k = kacheln.filter(function (x) { return x.getAttribute("data-rad") === name; })[0]; if (k) waehle(k, 1, true); } };
})();
