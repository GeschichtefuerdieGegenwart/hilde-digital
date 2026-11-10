/* Kidu – »Wann funktioniert digitaler Unterricht?« (sechs-hebel.html), ab Version 4.19.

   Muster R1 · Über die Brücke tippen (DESIGN.md, Abschnitt Bewegung). Der eine große Moment der Seite (One Moment Rule).
   Erst legen sich die Lesenden fest (Hebel antippen), dann bewegt sich etwas: »Ins Plenum« trägt die gewählten Hebel
   über die Plenumsstelle an die Tafel im Raum. Kein Autoplay, keine Uhr (Reader-Paced Rule). Höchstens sechs Kacheln,
   nur transform, Dauer = Token --dauer-uebergang (320 ms), alle gleichzeitig – eine Staffelung läse sich wie eine Rangfolge.
   Ohne Bewegung (»Weniger Bewegung«, Systemeinstellung oder Tastatur, event.detail === 0) liegen die Hebel sofort an der Tafel.
   Ohne JavaScript steht das ruhige Schaubild oben auf der Seite (Visible-at-Rest Rule). Nichts wird gespeichert.
   Braucht: HILDE (ruhig, dauer) aus hilde.js – fällt ohne HILDE auf die Systemeinstellung und 320 ms zurück. */
(function () {
  "use strict";
  var probe = document.getElementById("sh-r1");
  if (!probe) return;
  var modell = document.getElementById("sh-r1-modell");
  var kacheln = [].slice.call(probe.querySelectorAll(".sh-kachel"));
  var los = document.getElementById("sh-r1-los");
  var keiner = document.getElementById("sh-r1-keiner");
  var neu = document.getElementById("sh-r1-zurueck");
  var tafel = document.getElementById("sh-r1-tafel");
  var raum = document.getElementById("sh-r1-raum");
  var stand = document.getElementById("sh-r1-stand");
  var fertig = false;

  function ruhig() {
    if (window.HILDE && HILDE.ruhig) return HILDE.ruhig();
    return !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  function dauer() {
    var d = window.HILDE && HILDE.dauer ? HILDE.dauer("uebergang") : 0;
    return d || 320;
  }
  function gewaehlt() {
    return kacheln.filter(function (k) { return k.getAttribute("aria-pressed") === "true"; });
  }
  function liste(namen) {
    if (namen.length < 2) return namen.join("");
    return namen.slice(0, -1).join(", ") + " und " + namen[namen.length - 1];
  }
  function zeige() {
    var n = gewaehlt().map(function (k) { return k.getAttribute("data-hebel"); });
    los.setAttribute("aria-disabled", n.length ? "false" : "true");
    stand.textContent = n.length ? "Am Gerät: " + liste(n) + ". Bring es ins Plenum." : "Noch nichts gewählt.";
  }

  kacheln.forEach(function (k) {
    k.addEventListener("click", function () {
      if (fertig) return;
      k.setAttribute("aria-pressed", k.getAttribute("aria-pressed") === "true" ? "false" : "true");
      zeige();
    });
  });

  function ablegen(namen) {
    tafel.textContent = "";
    namen.forEach(function (n) {
      var li = document.createElement("li");
      li.textContent = n;
      tafel.appendChild(li);
    });
    raum.classList.add("sh-an");
    probe.classList.add("sh-fertig");
    stand.textContent = "Im Raum: " + liste(namen) + " " + (namen.length === 1 ? "liegt" : "liegen") +
      " an der Tafel. Jetzt deutet, streitet und urteilt ihr – das Gerät ist zu.";
    abschluss();
  }
  function abschluss() {
    fertig = true;
    los.hidden = true;
    keiner.hidden = true;
    neu.hidden = false;
    neu.focus();
  }

  los.addEventListener("click", function (e) {
    if (fertig) return;
    var sel = gewaehlt();
    if (!sel.length) { stand.textContent = "Tipp zuerst mindestens einen Hebel an – oder »Keiner davon«."; return; }
    var namen = sel.map(function (k) { return k.getAttribute("data-hebel"); });
    if (ruhig() || e.detail === 0 || !modell.getBoundingClientRect) { ablegen(namen); return; }
    var basis = modell.getBoundingClientRect();
    var ziel = tafel.getBoundingClientRect();
    var x = 0, zeile = 0, breite = ziel.width;
    var flieger = sel.map(function (k) {
      var q = k.getBoundingClientRect();
      var f = document.createElement("span");
      f.className = "sh-flieger";
      f.setAttribute("aria-hidden", "true");
      f.textContent = k.getAttribute("data-hebel");
      f.style.left = (q.left - basis.left) + "px";
      f.style.top = (q.top - basis.top) + "px";
      modell.appendChild(f);
      var w = f.offsetWidth;
      if (x && x + w > breite) { x = 0; zeile += f.offsetHeight + 6; }
      f.weg = [(ziel.left - basis.left + x) - (q.left - basis.left), (ziel.top - basis.top + zeile) - (q.top - basis.top)];
      x += w + 6;
      k.classList.add("sh-unterwegs");
      return f;
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        flieger.forEach(function (f) { f.style.transform = "translate(" + f.weg[0] + "px," + f.weg[1] + "px)"; });
      });
    });
    setTimeout(function () {
      flieger.forEach(function (f) { f.remove(); });
      kacheln.forEach(function (k) { k.classList.remove("sh-unterwegs"); });
      ablegen(namen);
    }, dauer() + 30);
  });

  keiner.addEventListener("click", function () {
    if (fertig) return;
    kacheln.forEach(function (k) { k.setAttribute("aria-pressed", "false"); });
    tafel.textContent = "";
    stand.textContent = "Keiner greift? Dann bleibt es Papier – ein vollwertiges Ergebnis.";
    abschluss();
  });

  neu.addEventListener("click", function () {
    fertig = false;
    kacheln.forEach(function (k) { k.setAttribute("aria-pressed", "false"); });
    tafel.textContent = "";
    raum.classList.remove("sh-an");
    probe.classList.remove("sh-fertig");
    neu.hidden = true;
    los.hidden = false;
    keiner.hidden = false;
    zeige();
    kacheln[0].focus();
  });

  zeige();
})();
