/* Papierprobe – »Guter digitaler Unterricht in fünf Sätzen« (fuenf-saetze.html), ab Version 4.18.

   Der Weg durch die Stunde folgt nur dem Scrollen (Reader-Paced Rule): Kommt ein Abschnitt in die Mitte des
   Bildschirms, bekommt der Rahmen data-satz="n"; die Bühne (Marke auf der Stundenlinie, Zustand des Geräts)
   wechselt per CSS. Kein Autoplay, keine Uhr. Ohne IntersectionObserver oder ohne JavaScript steht der erste
   Zustand, und alle fünf Abschnitte sind trotzdem vollständig lesbar (Visible-at-Rest Rule).
   Der Stand wird für Hilfstechnik angesagt (aria-live). Die Dauer des Wechsels steht in hilde.css (--dauer-uebergang);
   bei »weniger Bewegung« gibt es keinen Übergang, nur den neuen Zustand.
   Braucht: HILDE (nur für ruhig(), wird aber nicht vorausgesetzt). */
(function () {
  "use strict";
  var rahmen = document.getElementById("fs-scroll");
  if (!rahmen || !("IntersectionObserver" in window)) return;
  var abschnitte = [].slice.call(rahmen.querySelectorAll(".fs-abschnitt[data-satz]"));
  var stand = rahmen.querySelector("[data-fs-stand]");
  var ansage = document.getElementById("fs-ansage");
  var aktuell = rahmen.getAttribute("data-satz") || "1";

  function setze(n, titel) {
    if (n === aktuell) return;
    aktuell = n;
    rahmen.setAttribute("data-satz", n);
    var text = "Satz " + n + " von " + abschnitte.length;
    if (stand) stand.textContent = text;
    if (ansage) ansage.textContent = text + (titel ? ": " + titel : "");
  }

  // Die Mitte des Bildschirms entscheidet: der Abschnitt, der die Mittellinie kreuzt, ist der aktuelle.
  var io = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) {
      if (!e.isIntersecting) return;
      var h = e.target.querySelector("h3");
      setze(e.target.getAttribute("data-satz"), h ? h.textContent.replace(/^Satz \d+: /, "").trim() : "");
    });
  }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
  abschnitte.forEach(function (a) { io.observe(a); });

  // Sprungmarken (Tastatur): Fokus auf einem Abschnitt setzt den Stand ebenfalls.
  abschnitte.forEach(function (a) {
    a.addEventListener("focusin", function () {
      var h = a.querySelector("h3");
      setze(a.getAttribute("data-satz"), h ? h.textContent.replace(/^Satz \d+: /, "").trim() : "");
    });
  });
})();
