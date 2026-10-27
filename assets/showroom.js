/* Hilde Digital – Galerie: Freitextsuche, kombinierbare Filter, entfernbare Chips, kontrollierte Lockerung.
   Zwei Zustände: »Stöbern« (Laufband und Einblicke) und »Treffer« (Karten direkt unter der Suche).
   Sobald gesucht oder gefiltert wird – oder »Alle Beispiele zeigen« gewählt ist –, erscheinen die Treffer
   direkt unter dem Suchfeld, und das Stöbern tritt zurück. Leeres Feld und keine Filter: zurück zum Stöbern.
   Gespeichert werden nur die Filter. Das Suchwort steht nur in der Adresse (#suche=…), damit man Treffer teilen kann.
   Braucht: TAXONOMIEN, BEISPIELE, HILDE, SUCHE. */
(function () {
  "use strict";
  var T = TAXONOMIEN, H = HILDE, S = SUCHE, esc = H.esc;
  var SPEICHER = "showroom";

  /* Fächer ergeben sich aus den Daten. */
  var faecher = [];
  BEISPIELE.forEach(function (b) { b.faecher.forEach(function (f) { if (faecher.indexOf(f) < 0) faecher.push(f); }); });
  faecher.sort(function (a, b) { return a.localeCompare(b, "de"); });

  var FILTER = {
    phase: { name: "Phase", werte: T.phasen.filter(function (p) { return p.id !== "offen"; }) },
    anliegen: { name: "Anliegen", werte: T.anliegen },
    umfang: { name: "Umfang", werte: T.umfang, chips: true },
    rolle: { name: "Rolle", werte: T.rollen },
    fach: { name: "Fach", werte: faecher.map(function (f) { return { id: f, name: f }; }), weitere: true },
    ki: { name: "KI-Einsatz", werte: T.kiEinsatz.filter(function (k) { return k.id !== "keiner"; }), weitere: true }
  };

  var gespeichert = H.lies(SPEICHER) || {};
  var wahl = { bereich: "alle", phase: "", anliegen: "", umfang: "", rolle: "", fach: "", ki: "" };
  Object.keys(wahl).forEach(function (k) { if (typeof gespeichert[k] === "string") wahl[k] = gespeichert[k]; });
  var suche = "", alleZeigen = false;
  // Suchwort aus der Adresse übernehmen (#suche=…)
  var ausAdresse = (location.hash || "").match(/^#suche=(.*)$/);
  if (ausAdresse) { try { suche = decodeURIComponent(ausAdresse[1].replace(/\+/g, " ")); } catch (e) { suche = ""; } }

  var el = function (id) { return document.getElementById(id); };

  /* Entdeckungsbühne (optional, nur auf großen Bildschirmen).
     Bedingungen aus dem Auftrag: per Tastatur bedienbar, sichtbare Vor- und Zurück-Steuerung,
     keine Pflicht-Wischgeste, kein Autoplay, reduzierte Bewegung wird respektiert,
     das Raster ist jederzeit verfügbar, keine Information nur während einer Animation. */
  var GROSS = window.matchMedia ? window.matchMedia("(min-width: 1100px)") : { matches: false };
  var RUHIG = { get matches() { return H.ruhig(); } }; // Systemeinstellung oder Schalter im Fuß
  var ansicht = H.lies("showroom-ansicht") === "buehne" ? "buehne" : "raster";
  function buehneAktiv() { return ansicht === "buehne" && GROSS.matches; }
  var ziel = el("karten"), mehr = el("mehr"), zeile = el("ergebniszeile"), aktiveListe = el("aktive"), lockerung = el("lockerung");

  function anzahl(feld, wert) {
    return BEISPIELE.filter(function (b) { return S.passt(b, feld, wert); }).length;
  }

  function auswahl(feld) {
    var f = FILTER[feld];
    return '<div class="eingabe"><label for="f-' + feld + '">' + esc(f.name) + "</label>" +
      '<select id="f-' + feld + '" data-filter="' + feld + '"><option value="">alle</option>' +
      f.werte.map(function (w) {
        var n = anzahl(feld, w.id);
        return '<option value="' + esc(w.id) + '"' + (wahl[feld] === w.id ? " selected" : "") + ">" + esc(w.name) + " (" + n + ")</option>";
      }).join("") + "</select></div>";
  }

  /* I2 · Umfang als Chips mit einer Stundenlinie daneben (ab Version 4.7). Beim Überfahren oder Fokussieren eines Chips
     zeigt die Linie diesen Umfang vor; beim Wählen bleibt sie so. Tastatur und Berührung sind gleichwertig. */
  function zeichneUmfang() {
    var g = el("umfang"); if (!g) return;
    if (!g.children.length) {
      g.innerHTML = '<span id="umfang-wort">Umfang</span>' + [{ id: "", name: "alle" }].concat(T.umfang).map(function (u) {
        return '<button type="button" class="chip" data-umfang="' + esc(u.id) + '" aria-pressed="false">' + esc(u.name) + "</button>";
      }).join("") + H.stundenlinie("", "zeile").replace('class="stundenlinie', 'id="umfang-linie" class="stundenlinie');
    }
    g.querySelectorAll("button[data-umfang]").forEach(function (x) {
      x.setAttribute("aria-pressed", x.getAttribute("data-umfang") === wahl.umfang ? "true" : "false");
    });
    el("umfang-linie").setAttribute("data-umfang", wahl.umfang);
  }

  function zeichneFilter() {
    zeichneUmfang();
    el("auswahlfilter").innerHTML = Object.keys(FILTER).filter(function (k) { return !FILTER[k].weitere && !FILTER[k].chips; }).map(auswahl).join("");
    el("weitere").innerHTML = Object.keys(FILTER).filter(function (k) { return FILTER[k].weitere; }).map(auswahl).join("");
    el("bereich").querySelectorAll("[data-bereich]").forEach(function (x) {
      x.setAttribute("aria-pressed", x.getAttribute("data-bereich") === wahl.bereich ? "true" : "false");
    });
  }

  function wertName(feld, wert) {
    if (feld === "bereich") return T.name("bereiche", wert);
    var w = FILTER[feld].werte.filter(function (x) { return x.id === wert; })[0];
    return w ? w.name : wert;
  }

  function zeichne() {
    var erg = S.finde(BEISPIELE, wahl, suche);
    var gefiltert = erg.felder.length > 0 || suche.trim() !== "";
    var aktiv = gefiltert || alleZeigen;
    el("ergebnisse").hidden = !aktiv;
    el("stoebern").hidden = aktiv;
    el("t-ergebnisse").textContent = gefiltert ? "Treffer" : "Alle Beispiele";
    var sichtbar = aktiv ? erg.treffer : erg.treffer.filter(function (b) { return b.zuerst; });
    ziel.innerHTML = sichtbar.map(H.karte).join("");
    zeigeAnsicht();
    var rest = erg.treffer.length - sichtbar.length;
    mehr.hidden = rest <= 0;
    mehr.textContent = "Mehr Beispiele (" + rest + ")";

    // Ergebniszeile
    var merkmale = erg.felder.map(function (f) { return wertName(f, wahl[f]); });
    if (suche.trim()) merkmale.unshift("»" + suche.trim() + "«");
    if (erg.gelockert || erg.suchtrefferLeer) {
      zeile.textContent = "Kein exakter Treffer für: " + merkmale.join(" · ");
    } else {
      zeile.textContent = erg.treffer.length + (erg.treffer.length === 1 ? " Beispiel" : " Beispiele") +
        (merkmale.length ? " für: " + merkmale.join(" · ") : "") +
        (sichtbar.length < erg.treffer.length ? " – " + sichtbar.length + " ausgewählte zuerst" : "");
    }

    // Hinweis bei Lockerung – nie ein leerer Zustand ohne Hilfe
    var texte = [];
    if (erg.suchtrefferLeer) texte.push("Für »" + suche.trim() + "« gibt es noch kein Beispiel.");
    if (erg.gelockert) texte.push("Für alle gewählten Merkmale gibt es noch kein exaktes Beispiel. Deshalb zeigen wir dir die nächstpassenden Ideen.");
    if (!erg.treffer.length) texte.push("Versuche ein anderes Suchwort oder setze die Filter zurück.");
    lockerung.hidden = texte.length === 0;
    lockerung.innerHTML = esc(texte.join(" ")) + (texte.length ? ' <button type="button" class="linkknopf" data-zuruecksetzen>Alle Filter zurücksetzen</button>' : "");

    // Aktive Filter als entfernbare Chips
    var chips = erg.felder.map(function (f) {
      var n = (f === "bereich" ? "Bereich" : FILTER[f].name) + ": " + wertName(f, wahl[f]);
      return '<li><button type="button" class="chip aktiv" data-entfernen="' + f + '" aria-label="Filter ' + esc(n) + ' entfernen">' + esc(n) + ' <span aria-hidden="true">×</span></button></li>';
    });
    if (chips.length) chips.push('<li><button type="button" class="linkknopf" data-zuruecksetzen>Alle Filter zurücksetzen</button></li>');
    aktiveListe.innerHTML = chips.join("");
    aktiveListe.hidden = chips.length === 0;

    var speichern = {}; Object.keys(wahl).forEach(function (k) { speichern[k] = wahl[k]; });
    H.schreib(SPEICHER, speichern);
    merkeAdresse();
    var alle = el("alle-zeigen"); if (alle) alle.textContent = "Alle " + BEISPIELE.length + " Beispiele zeigen";
  }

  /* Suchwort in der Adresse, ohne neuen Verlaufseintrag pro Tastendruck. */
  function merkeAdresse() {
    if (!window.history || !history.replaceState) return;
    var neu = suche.trim() ? "#suche=" + encodeURIComponent(suche.trim()) : "";
    if (neu === (location.hash.indexOf("#suche=") === 0 ? location.hash : "")) return;
    if (!neu && location.hash && location.hash.indexOf("#suche=") !== 0) return; // andere Anker nicht anfassen
    try { history.replaceState(null, "", location.pathname + location.search + neu); } catch (e) { /* file:// in manchen Browsern */ }
  }

  function zeigeAnsicht() {
    var an = buehneAktiv();
    ziel.classList.toggle("buehne", an);
    if (an) { ziel.setAttribute("role", "region"); ziel.setAttribute("aria-label", "Bühne mit Beispielen"); ziel.tabIndex = 0; }
    else { ziel.removeAttribute("role"); ziel.removeAttribute("aria-label"); ziel.removeAttribute("tabindex"); ziel.scrollLeft = 0; }
    el("buehne-steuerung").hidden = !an;
    el("ansicht").querySelectorAll("[data-ansicht]").forEach(function (x) {
      x.setAttribute("aria-pressed", x.getAttribute("data-ansicht") === ansicht ? "true" : "false");
    });
    standBuehne();
  }

  function kartenBreite() {
    var k = ziel.children[0];
    if (!k) return 1;
    var abstand = parseFloat(getComputedStyle(ziel).columnGap) || 0;
    return k.getBoundingClientRect().width + abstand;
  }

  function standBuehne() {
    if (!buehneAktiv()) return;
    var n = ziel.children.length, b = kartenBreite();
    var erste = Math.round(ziel.scrollLeft / b) + 1;
    var abstand = parseFloat(getComputedStyle(ziel).columnGap) || 0;
    var proAnsicht = Math.max(1, Math.floor((ziel.clientWidth + abstand + 1) / b));
    var letzte = Math.min(n, erste + proAnsicht - 1);
    el("buehne-stand").textContent = n ? "Beispiel " + erste + (letzte > erste ? "–" + letzte : "") + " von " + n : "";
    el("buehne-zurueck").disabled = ziel.scrollLeft <= 2;
    el("buehne-vor").disabled = ziel.scrollLeft + ziel.clientWidth >= ziel.scrollWidth - 2;
  }

  function blaettern(richtung) {
    ziel.scrollBy({ left: richtung * kartenBreite(), behavior: RUHIG.matches ? "auto" : "smooth" });
  }

  function zuruecksetzen() {
    Object.keys(wahl).forEach(function (k) { wahl[k] = k === "bereich" ? "alle" : ""; });
    suche = ""; el("suche").value = ""; alleZeigen = false;
    zeichneFilter(); zeichne();
    el("suche").focus();
  }

  el("bereich").addEventListener("click", function (e) {
    var b = e.target.closest("[data-bereich]"); if (!b) return;
    wahl.bereich = b.getAttribute("data-bereich");
    zeichneFilter(); zeichne();
  });
  (function () {
    var g = el("umfang"); if (!g) return;
    var linie = function () { return el("umfang-linie"); };
    var vorzeigen = function (e) { var c = e.target.closest("button[data-umfang]"); if (c) linie().setAttribute("data-umfang", c.getAttribute("data-umfang")); };
    var zurueck = function () { linie().setAttribute("data-umfang", wahl.umfang); };
    g.addEventListener("click", function (e) {
      var c = e.target.closest("button[data-umfang]"); if (!c) return;
      wahl.umfang = c.getAttribute("data-umfang");
      zeichneFilter(); zeichne();
    });
    g.addEventListener("mouseover", vorzeigen);
    g.addEventListener("mouseout", function (e) { if (!g.contains(e.relatedTarget)) zurueck(); else vorzeigen(e); });
    g.addEventListener("focusin", vorzeigen);
    g.addEventListener("focusout", function (e) { if (!g.contains(e.relatedTarget)) zurueck(); });
  })();
  el("filter").addEventListener("change", function (e) {
    var f = e.target.getAttribute("data-filter"); if (!f) return;
    wahl[f] = e.target.value; zeichne();
  });
  el("filter").addEventListener("submit", function (e) { e.preventDefault(); });
  el("suche").addEventListener("input", function (e) { suche = e.target.value; zeichne(); });
  document.addEventListener("click", function (e) {
    var x = e.target.closest("[data-entfernen]");
    if (x) {
      var f = x.getAttribute("data-entfernen");
      wahl[f] = f === "bereich" ? "alle" : "";
      zeichneFilter(); zeichne();
      var naechster = aktiveListe.querySelector("button") || el("suche"); naechster.focus();
      return;
    }
    if (e.target.closest("[data-zuruecksetzen]")) zuruecksetzen();
  });
  mehr.addEventListener("click", function () {
    var vorher = ziel.children.length;
    alleZeigen = true; zeichne();
    var neu = ziel.children[vorher] && ziel.children[vorher].querySelector("a"); if (neu) neu.focus();
  });

  el("ansicht").addEventListener("click", function (e) {
    var b = e.target.closest("[data-ansicht]"); if (!b) return;
    ansicht = b.getAttribute("data-ansicht");
    H.schreib("showroom-ansicht", ansicht);
    zeigeAnsicht();
  });
  el("buehne-zurueck").addEventListener("click", function () { blaettern(-1); });
  el("buehne-vor").addEventListener("click", function () { blaettern(1); });
  ziel.addEventListener("keydown", function (e) {
    if (!buehneAktiv()) return;
    if (e.key === "ArrowRight") { e.preventDefault(); blaettern(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); blaettern(-1); }
  });
  var warte = null;
  ziel.addEventListener("scroll", function () { clearTimeout(warte); warte = setTimeout(standBuehne, 80); });
  if (GROSS.addEventListener) GROSS.addEventListener("change", zeigeAnsicht);

  el("alle-zeigen").addEventListener("click", function () {
    alleZeigen = true; zeichne();
    var t = el("t-ergebnisse"); t.tabIndex = -1; t.focus();
  });

  el("loeschen").addEventListener("click", function () {
    // Erst zurücksetzen (das zeichnet neu und speichert leere Filter), dann alles löschen.
    zuruecksetzen();
    ansicht = "raster"; zeigeAnsicht();
    H.loescheAlles();
    el("geloescht").textContent = "Alle Eingaben wurden gelöscht.";
  });

  if (wahl.phase || wahl.anliegen || wahl.umfang || wahl.rolle || wahl.fach || wahl.ki) el("mehr-filter").open = true;
  el("suche").value = suche;
  zeichneFilter(); zeichne();
  window.addEventListener("hashchange", function () {
    var m = (location.hash || "").match(/^#suche=(.*)$/);
    if (!m) return;
    try { suche = decodeURIComponent(m[1].replace(/\+/g, " ")); } catch (e) { return; }
    el("suche").value = suche; zeichne();
  });
})();
