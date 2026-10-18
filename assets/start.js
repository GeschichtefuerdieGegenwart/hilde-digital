/* Hilde-Digital – Startseite: Register-Bewegung, Papierprobe, der Showroom in Zahlen und die neuesten Beispiele.
   Alle Zahlen werden aus assets/daten/beispiele.js gezählt. Nichts wird von Hand eingetragen.
   Konzeptbeispiele (Status »Idee«) zählen nicht als Material.
   Braucht: TAXONOMIEN, BEISPIELE, HILDE, REGELN. */
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

  /* Papierprobe: Regeln und Tests in assets/regeln.js (REGELN.papierprobe). Nichts wird gespeichert. */
  var form = document.getElementById("probe"), aus = document.getElementById("probe-ergebnis");
  if (form && aus && typeof REGELN !== "undefined") {
    var namen = {};
    TAXONOMIEN.einstufungen.forEach(function (e) { namen[e.id] = e.name; });
    var FOLGE = { ablage: "Beantworte noch die zweite Frage.", ziel: "Beantworte noch die zweite Frage.", neu: "Beantworte die erste Frage." };
    var wert = function (n) { var e = form.querySelector('input[name="' + n + '"]:checked'); return e ? e.value : ""; };
    var zeigen = function () {
      var a = { neu: wert("neu"), ablage: wert("ablage"), ziel: wert("ziel") };
      form.querySelector('[data-frage="ablage"]').hidden = a.neu !== "nein";
      form.querySelector('[data-frage="ziel"]').hidden = a.neu !== "ja";
      if (a.neu !== "nein") a.ablage = "";
      if (a.neu !== "ja") a.ziel = "";
      var e = REGELN.papierprobe(a);
      aus.className = "probe-ergebnis" + (e.id ? " stufe-" + e.id : "");
      aus.innerHTML = e.id
        ? '<p class="probe-name">' + esc(namen[e.id]) + "</p><p>" + esc(e.grund) + "</p>"
        : '<p class="probe-name">Noch offen</p><p>' + esc(FOLGE[e.frage]) + "</p>";
    };
    form.addEventListener("change", zeigen);
    form.addEventListener("reset", function () { setTimeout(zeigen, 0); });
  }
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
