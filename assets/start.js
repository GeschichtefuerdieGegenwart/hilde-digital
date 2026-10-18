/* Hilde Digital – Startseite: Register-Bewegung, Galerie-Ausschnitt und Zahlen aus den Daten.
   Alle Zahlen werden aus assets/daten/beispiele.js gezählt. Nichts wird von Hand eingetragen.
   Konzeptbeispiele (Status »Idee«) zählen nicht als Material.
   Braucht: TAXONOMIEN, BEISPIELE, GALERIE, HILDE. */
(function () {
  "use strict";
  var H = HILDE, esc = H.esc;

  /* Register-Bewegung: Die beiden Druckplatten finden nur beim ersten Aufruf je Sitzung zusammen.
     Kein Autoplay darüber hinaus; reduzierte Bewegung blendet nur ein (siehe hilde.css). */
  var erst = true;
  try { erst = !sessionStorage.getItem("hilde.registriert"); sessionStorage.setItem("hilde.registriert", "1"); } catch (e) { erst = false; }
  if (erst) document.documentElement.classList.add("registrieren");

  /* Überdruck: Wie viele Lernangebote liegen in beiden Bereichen? Gezählt aus den Daten. */
  var beide = BEISPIELE.filter(function (b) { return b.bereich === "beide" && b.vorschauArt !== "konzept"; }).length;
  var schnitt = document.getElementById("schnitt-link");
  if (schnitt && beide) schnitt.textContent = beide + (beide === 1 ? " Lernangebot liegt" : " Lernangebote liegen") + " in beiden Bereichen";

  var materialien = BEISPIELE.filter(function (b) { return b.vorschauArt !== "konzept"; });
  var faecher = [];
  materialien.forEach(function (b) { b.faecher.forEach(function (f) { if (faecher.indexOf(f) < 0) faecher.push(f); }); });

  var zahlen = [
    [materialien.length, "Materialien in der Galerie"],
    [materialien.filter(function (b) { return b.status === "im Unterricht erprobt"; }).length, "davon im Unterricht erprobt"],
    [materialien.filter(function (b) { return !!b.link; }).length, "direkt im Browser nutzbar"],
    [faecher.length, "Fächer und Arbeitsbereiche"]
  ];
  var liste = document.getElementById("kennzahlen");
  if (liste) liste.innerHTML = zahlen.map(function (z) {
    return "<li><b>" + z[0] + "</b><span>" + esc(z[1]) + "</span></li>";
  }).join("");

  /* Galerie-Ausschnitt: je ein echtes Bild aus drei Projekten, die viel zeigen. */
  var ziel = document.getElementById("teaser-bilder");
  if (ziel && typeof GALERIE !== "undefined") {
    ziel.innerHTML = ["psycho-ds2", "ns-ideologie", "gene"].map(function (id) {
      var b = BEISPIELE.filter(function (x) { return x.id === id; })[0], a = (GALERIE[id] || [])[0];
      if (!b || !a) return "";
      return '<li><a href="' + H.detailLink(b) + '"><img src="' + esc(a.bild) + '" alt="' + esc(a.alt) + '" width="1040" height="650" loading="lazy">' +
        '<span class="teaser-text"><b>' + esc(b.titel) + "</b>" + esc(a.text) + "</span></a></li>";
    }).join("");
  }
})();
