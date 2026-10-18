/* Hilde Digital – Galerie: redaktionelle Einblicke aus den echten Anwendungen.
   Große Einblicke: Projekte mit drei oder mehr Ansichten. Kleine Einblicke: Projekte mit zwei Ansichten.
   Alle übrigen Beispiele stehen unten in der durchsuchbaren Liste (assets/showroom.js).
   Jedes Bild öffnet die Bildansicht (HILDE.lichtbild) – mit Maus, Finger oder Tastatur.
   Braucht: BEISPIELE, GALERIE, HILDE. */
(function () {
  "use strict";
  var H = HILDE, esc = H.esc;
  var gross = document.getElementById("einblicke"), klein = document.getElementById("einblicke-klein");
  if (!gross || typeof GALERIE === "undefined") return;

  var mitBildern = BEISPIELE.filter(function (b) { return b.ansichten && b.ansichten.length >= 2; });
  // Reihenfolge: zuerst die vom Master-Prompt genannten Labore, dann nach Anzahl der Ansichten.
  var ZUERST = ["psycho-ds2", "ns-ideologie", "gene", "nation"];
  mitBildern.sort(function (a, b) {
    var ia = ZUERST.indexOf(a.id), ib = ZUERST.indexOf(b.id);
    if (ia >= 0 || ib >= 0) return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    return b.ansichten.length - a.ansichten.length;
  });

  function knopfBild(b, a, i, klasse) {
    return '<button type="button" class="' + klasse + '" data-bildrahmen data-projekt="' + esc(b.id) + '" data-ansicht="' + i + '">' +
      '<img src="' + esc(a.bild) + '" alt="' + esc(a.alt) + '" width="1040" height="650" loading="' + (i === 0 ? "eager" : "lazy") + '">' +
      '<span class="sr-only">Ansicht ' + (i + 1) + " von " + b.ansichten.length + " groß zeigen</span></button>";
  }

  function oeffnen(b) {
    return b.link
      ? '<a class="textlink" href="' + esc(b.link) + '" target="_blank" rel="noopener">Anwendung öffnen <span aria-hidden="true">↗</span><span class="sr-only"> (neuer Tab, braucht Internet)</span></a>'
      : '<span class="leise klein">Noch nicht online.</span>';
  }

  gross.innerHTML = mitBildern.filter(function (b) { return b.ansichten.length >= 3; }).map(function (b, n) {
    var a = b.ansichten;
    return '<article class="einblick' + (n % 2 ? " gespiegelt" : "") + '" aria-labelledby="eb-' + esc(b.id) + '">' +
      '<div class="einblick-bilder">' + knopfBild(b, a[0], 0, "einblick-haupt") +
        '<div class="einblick-details">' + a.slice(1, 4).map(function (x, i) { return knopfBild(b, x, i + 1, "einblick-detail"); }).join("") + "</div></div>" +
      '<div class="einblick-text">' + H.kennzeichen(b) +
        '<p class="fach">' + esc(b.fach) + "</p>" +
        '<h3 id="eb-' + esc(b.id) + '">' + esc(b.titel) + "</h3>" +
        '<p class="einblick-kurz">' + esc(b.kurz) + "</p>" +
        '<ol class="einblick-schritte">' + a.map(function (x) { return "<li>" + esc(x.text) + "</li>"; }).join("") + "</ol>" +
        '<p class="status">Status: <b>' + esc(b.status) + "</b></p>" +
        '<p class="einblick-aktionen"><a class="knopf" href="' + H.detailLink(b) + '">Beispiel ansehen<span class="sr-only">: ' + esc(b.titel) + "</span></a> " + oeffnen(b) + "</p>" +
      "</div></article>";
  }).join("");

  klein.innerHTML = mitBildern.filter(function (b) { return b.ansichten.length === 2; }).map(function (b) {
    var a = b.ansichten;
    return '<article class="einblick-klein" aria-labelledby="ek-' + esc(b.id) + '">' +
      '<div class="einblick-klein-bilder">' + knopfBild(b, a[0], 0, "ek-haupt") + knopfBild(b, a[1], 1, "ek-detail") + "</div>" +
      '<div class="einblick-klein-text">' + H.kennzeichen(b) + '<h3 id="ek-' + esc(b.id) + '">' + esc(b.titel) + "</h3>" +
        "<p>" + esc(a[0].text) + "</p>" +
        '<p class="einblick-aktionen"><a class="textlink" href="' + H.detailLink(b) + '">Beispiel ansehen<span class="sr-only">: ' + esc(b.titel) + '</span> <span aria-hidden="true">→</span></a> ' + oeffnen(b) + "</p></div></article>";
  }).join("");

  /* ---------- Laufband: alle Ansichten, langsam und gleichmäßig ----------
     Bewegung nur über transform (CSS-Animation, linear, damit das Band nicht ruckt).
     Hält an beim Überfahren, beim Fokus, mit dem Knopf »Anhalten« und wenn das Band nicht zu sehen ist.
     Bei »weniger Bewegung« steht es still und lässt sich von Hand verschieben.
     Für die nahtlose Schleife steht die Spur zweimal da; die zweite Hälfte ist für Vorleseprogramme
     und die Tastatur unsichtbar. Die Entscheidung »angehalten« bleibt nur in diesem Browser. */
  var band = document.getElementById("laufband"), bereich = document.getElementById("laufband-bereich");
  var pause = document.getElementById("laufband-pause");
  if (band && bereich) {
    var alleAnsichten = [];
    BEISPIELE.forEach(function (b) {
      (b.ansichten || []).forEach(function (a, i) { alleAnsichten.push({ b: b, a: a, i: i }); });
    });
    // Abwechselnd aus verschiedenen Projekten, damit nicht vier Bilder eines Projekts nebeneinanderstehen.
    alleAnsichten.sort(function (x, y) { return x.i - y.i; });
    var eintrag = function (x, kopie) {
      return '<li><button type="button" class="laufband-bild" data-bildrahmen data-projekt="' + esc(x.b.id) + '" data-ansicht="' + x.i + '"' +
        (kopie ? ' tabindex="-1"' : "") + ">" +
        '<img src="' + esc(x.a.bild) + '" alt="' + (kopie ? "" : esc(x.a.alt)) + '" width="1040" height="650" loading="lazy" decoding="async">' +
        '<span class="laufband-name">' + esc(x.b.titel) + "</span></button></li>";
    };
    band.innerHTML = alleAnsichten.map(function (x) { return eintrag(x, false); }).join("") +
      alleAnsichten.map(function (x) { return eintrag(x, true).replace("<li>", '<li aria-hidden="true" class="laufband-kopie">'); }).join("");

    var ruhig = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var gemerkt = H.lies("laufband");
    var setze = function (angehalten, merken) {
      bereich.classList.toggle("angehalten", angehalten);
      pause.setAttribute("aria-pressed", String(angehalten));
      pause.textContent = angehalten ? "Weiterlaufen lassen" : "Anhalten";
      if (merken) H.schreib("laufband", { angehalten: angehalten });
    };
    if (!ruhig) {
      bereich.classList.add("laeuft");
      pause.hidden = false;
      // Tempo: etwa 24 Pixel pro Sekunde, unabhängig von der Zahl der Bilder.
      var tempo = function () { band.style.setProperty("--laufband-dauer", Math.max(60, Math.round(band.scrollWidth / 2 / 24)) + "s"); };
      tempo();
      window.addEventListener("resize", tempo);
      setze(!!(gemerkt && gemerkt.angehalten), false);
      pause.addEventListener("click", function () { setze(!bereich.classList.contains("angehalten"), true); });
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (e) { bereich.classList.toggle("unsichtbar", !e[0].isIntersecting); }).observe(bereich);
      }
    }
  }

  document.addEventListener("click", function (e) {
    var k = e.target.closest("[data-projekt]");
    if (!k) return;
    var b = BEISPIELE.filter(function (x) { return x.id === k.getAttribute("data-projekt"); })[0];
    if (b) H.lichtbild(b.ansichten, parseInt(k.getAttribute("data-ansicht"), 10), b.titel, k);
  });

  // Aus der Startseite: »Mit KI entwickelt« zeigt die Liste gefiltert.
  if (location.hash === "#beide") {
    var chip = document.querySelector('[data-bereich="beide"]');
    if (chip) { chip.click(); var z = document.getElementById("alle"); if (z) z.scrollIntoView(); }
  }
})();
