/* Hilde Digital – Showroom: Beispielkarten mit zwei Filterstufen (Bereich, dann Anliegen).
   Freitextsuche und weitere Filter folgen in Schritt 3.
   Braucht: TAXONOMIEN, BEISPIELE, HILDE. */
(function () {
  "use strict";
  var H = HILDE, esc = H.esc;
  var wahl = { bereich: "alle", anliegen: "alle", alleZeigen: false };
  var ziel = document.getElementById("karten");
  var leer = document.getElementById("leer");
  var mehr = document.getElementById("mehr");
  var zeile = document.getElementById("ergebniszeile");
  var wofuerZeile = document.getElementById("wofuer");

  function passtBereich(b) {
    if (wahl.bereich === "alle") return true;
    if (wahl.bereich === "beide") return b.bereich === "beide" || b.kiEinsatz === "entwicklung-anwendung";
    return b.bereich === wahl.bereich || b.bereich === "beide";
  }

  /* Nur Anliegen anbieten, zu denen es im gewählten Bereich auch Beispiele gibt. */
  function anliegenImBereich() {
    var da = {};
    BEISPIELE.filter(passtBereich).forEach(function (b) { b.anliegen.forEach(function (a) { da[a] = true; }); });
    return TAXONOMIEN.anliegen.filter(function (a) { return da[a.id]; });
  }

  function zeigeWofuer() {
    var liste = wahl.bereich === "alle" ? [] : anliegenImBereich();
    wofuerZeile.hidden = liste.length === 0;
    var html = '<span>Anliegen</span><button type="button" class="chip" data-anliegen="alle" aria-pressed="' + (wahl.anliegen === "alle") + '">alle</button>';
    liste.forEach(function (a) {
      html += '<button type="button" class="chip" data-anliegen="' + esc(a.id) + '" aria-pressed="' + (wahl.anliegen === a.id) + '">' + esc(a.name) + "</button>";
    });
    wofuerZeile.innerHTML = html;
  }

  function zeichne() {
    var gefiltert = wahl.bereich !== "alle" || wahl.anliegen !== "alle";
    var treffer = BEISPIELE.filter(function (b) {
      return passtBereich(b) && (wahl.anliegen === "alle" || b.anliegen.indexOf(wahl.anliegen) > -1);
    });
    var sichtbar = (gefiltert || wahl.alleZeigen) ? treffer : treffer.filter(function (b) { return b.zuerst; });
    ziel.innerHTML = sichtbar.map(H.karte).join("");
    leer.hidden = sichtbar.length > 0;
    var rest = treffer.length - sichtbar.length;
    mehr.hidden = rest <= 0;
    mehr.textContent = "Mehr Beispiele (" + rest + ")";
    var merkmale = [];
    if (wahl.bereich !== "alle") merkmale.push(TAXONOMIEN.name("bereiche", wahl.bereich));
    if (wahl.anliegen !== "alle") merkmale.push(TAXONOMIEN.name("anliegen", wahl.anliegen));
    zeile.textContent = treffer.length + (treffer.length === 1 ? " Beispiel" : " Beispiele") +
      (merkmale.length ? " für: " + merkmale.join(" · ") : "") +
      (sichtbar.length < treffer.length ? " – " + sichtbar.length + " ausgewählte zuerst" : "");
  }

  document.getElementById("bereich").addEventListener("click", function (e) {
    var b = e.target.closest("[data-bereich]"); if (!b) return;
    wahl.bereich = b.getAttribute("data-bereich"); wahl.anliegen = "alle";
    this.querySelectorAll("[data-bereich]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    zeigeWofuer(); zeichne();
  });
  wofuerZeile.addEventListener("click", function (e) {
    var b = e.target.closest("[data-anliegen]"); if (!b) return;
    wahl.anliegen = b.getAttribute("data-anliegen"); zeigeWofuer(); zeichne();
    var f = wofuerZeile.querySelector('[data-anliegen="' + wahl.anliegen + '"]'); if (f) f.focus();
  });
  mehr.addEventListener("click", function () {
    var vorher = ziel.children.length;
    wahl.alleZeigen = true; zeichne();
    var neu = ziel.children[vorher] && ziel.children[vorher].querySelector("a"); if (neu) neu.focus();
  });

  zeigeWofuer(); zeichne();
})();
