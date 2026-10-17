/* Hilde Digital – Startseite: der Showroom in Zahlen und die neuesten Beispiele.
   Alle Zahlen werden aus assets/daten/beispiele.js gezählt. Nichts wird von Hand eingetragen.
   Konzeptbeispiele (Status »Idee«) zählen nicht als Material.
   Braucht: TAXONOMIEN, BEISPIELE, HILDE. */
(function () {
  "use strict";
  var H = HILDE, esc = H.esc;
  var materialien = BEISPIELE.filter(function (b) { return b.vorschauArt !== "konzept"; });
  var faecher = [];
  materialien.forEach(function (b) { b.faecher.forEach(function (f) { if (faecher.indexOf(f) < 0) faecher.push(f); }); });

  var zahlen = [
    [materialien.length, "Materialien im Showroom"],
    [materialien.filter(function (b) { return b.status === "im Unterricht erprobt"; }).length, "davon im Unterricht erprobt"],
    [materialien.filter(function (b) { return !!b.link; }).length, "direkt im Browser nutzbar"],
    [faecher.length, "Fächer und Arbeitsbereiche"]
  ];
  var liste = document.getElementById("kennzahlen");
  if (liste) liste.innerHTML = zahlen.map(function (z) {
    return "<li><b>" + z[0] + "</b><span>" + esc(z[1]) + "</span></li>";
  }).join("");

  /* Neueste Beispiele: zuletzt aufgenommen, mit Bild und Link zuerst. Höchstens drei. */
  var neu = materialien.filter(function (b) { return b.aufgenommen; });
  if (!neu.length) return;
  var letzter = neu.map(function (b) { return b.aufgenommen; }).sort().pop();
  neu = neu.filter(function (b) { return b.aufgenommen === letzter && b.bild; })
    .sort(function (a, b) { return (b.link ? 1 : 0) - (a.link ? 1 : 0); })
    .slice(0, 3);
  var block = document.getElementById("neu");
  if (block && neu.length) {
    document.getElementById("neu-liste").innerHTML = neu.map(H.miniKarte).join("");
    block.hidden = false;
  }
})();
