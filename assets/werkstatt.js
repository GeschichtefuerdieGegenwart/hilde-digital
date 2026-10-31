/* Hilde Digital – Werkstatt-Seiten (ab Version 4.9):
   muster.html    Unterrichtsmuster mit drei Wegen (Papier · KI · Tablet) und Filter nach Phase
   auftraege.html kopierbare Aufträge aus den ausführlichen Anleitungen des Projekts
   ki-fach.html   feste Anweisung für das eigene Fach
   Fach, Thema und Lerngruppe gelten für alle Aufträge einer Seite. Freitexte werden nie gespeichert;
   gemerkt wird nur der gewählte Phasen-Filter. Braucht: TAXONOMIEN, BEISPIELE, SCHNELL, WERKSTATT, WERKSTATT_ANFRAGE, HILDE. */
(function () {
  "use strict";
  if (typeof WERKSTATT === "undefined" || typeof HILDE === "undefined") return;
  var H = HILDE, esc = H.esc, W = WERKSTATT, A = WERKSTATT_ANFRAGE;

  var EINSATZ = {
    eingesetzt: "Im eigenen Unterricht eingesetzt",
    geplant: "Ausgearbeitet, noch nicht im Unterricht eingesetzt",
    offen: "Einsatz im Unterricht: noch offen"
  };

  function wert(id) { var f = document.getElementById(id); return f ? f.value : ""; }
  function eingabe() { return { fach: wert("w-fach"), thema: wert("w-thema"), gruppe: wert("w-gruppe") }; }
  function beispiel(id) {
    return (typeof BEISPIELE !== "undefined" ? BEISPIELE : []).filter(function (b) { return b.id === id; })[0];
  }

  /* Ein Auftrag zum Aufklappen: Textfeld (änderbar) und Kopier-Knopf. */
  function auftragsfeld(id, titel) {
    return '<details class="mehr werkstatt-auftrag"><summary>' + esc(titel) + "</summary>" +
      '<label class="sr-only" for="a-' + id + '">Auftrag – du kannst ihn ändern</label>' +
      '<textarea id="a-' + id + '" rows="14" spellcheck="false" data-auftrag="' + id + '"></textarea>' +
      '<div class="kopieren"><button type="button" class="knopf" data-kopieren="a-' + id + '">Auftrag kopieren</button>' +
      '<span class="leise" aria-live="polite"></span></div></details>';
  }

  var alle = W.muster.map(function (m) { return { id: m.id, def: Object.assign({ id: m.id }, m.ki) }; })
    .concat(W.auftraege.map(function (a) { return { id: a.id, def: a }; }));
  function fuelle() {
    var e = eingabe();
    document.querySelectorAll("[data-auftrag]").forEach(function (feld) {
      var x = alle.filter(function (y) { return y.id === feld.getAttribute("data-auftrag"); })[0];
      if (x) feld.value = A.auftrag(x.def, e);
    });
  }

  /* ---------- Unterrichtsmuster ---------- */
  var liste = document.getElementById("muster-liste");
  if (liste) {
    var filterZiel = document.getElementById("muster-filter");
    var phasen = TAXONOMIEN.phasen.filter(function (p) { return W.muster.some(function (m) { return m.phase === p.id; }); });
    var gemerkt = H.lies("muster") || {};
    var phase = phasen.some(function (p) { return p.id === gemerkt.phase; }) ? gemerkt.phase : "";

    liste.innerHTML = W.muster.map(function (m) {
      var bsp = m.tablet.beispiele.map(beispiel).filter(Boolean);
      return '<li class="muster-karte" id="m-' + m.id + '" data-phase="' + m.phase + '">' +
        '<div class="muster-kopf">' +
          '<p class="muster-phase">' + esc(TAXONOMIEN.name("phasen", m.phase)) + "</p>" +
          "<h3>" + esc(m.name) + "</h3>" +
          '<p class="muster-tun">' + esc(m.tun) + "</p>" +
          '<p class="muster-warum"><b>Warum es trägt:</b> ' + esc(m.warum) + "</p>" +
          '<p class="muster-herkunft leise klein">' + esc(EINSATZ[m.einsatz]) + " · " + esc(m.herkunft) + "</p>" +
        "</div>" +
        '<div class="muster-wege">' +
          '<section class="muster-weg weg-papier" aria-label="' + esc(m.name) + ': auf Papier"><h4>Auf Papier</h4><p>' + esc(m.papier) + "</p></section>" +
          '<section class="muster-weg weg-ki" aria-label="' + esc(m.name) + ': mit KI vorbereiten"><h4>Mit KI vorbereiten</h4>' +
            "<p>Ein fertiger Auftrag für ein an deiner Schule freigegebenes KI-System. Das Ergebnis darf auf Papier bleiben.</p>" +
            auftragsfeld(m.id, "Auftrag ansehen und kopieren") + "</section>" +
          '<section class="muster-weg weg-tablet" aria-label="' + esc(m.name) + ': am Tablet"><h4>Am Tablet</h4><p>' + esc(m.tablet.text) + "</p>" +
            (bsp.length ? '<p class="klein"><b>In der Galerie:</b></p><ul class="muster-beispiele klein">' + bsp.map(function (b) {
              return '<li><a class="textlink" href="beispiel.html#' + esc(b.slug) + '">' + esc(b.titel) + "</a></li>";
            }).join("") + "</ul>" : "") +
          "</section>" +
        "</div>" +
        (m.lernende ? '<p class="muster-lernende"><b>Wenn deine Lernenden mit KI arbeiten:</b> ' + esc(m.lernende) +
          ' <a class="textlink" href="lernende-ki.html">Drei Regeln dazu <span aria-hidden="true">→</span></a></p>' : "") +
        "</li>";
    }).join("");

    filterZiel.innerHTML = '<button type="button" class="chip" data-filter="" aria-pressed="' + (phase === "") + '">Alle</button>' +
      phasen.map(function (p) {
        return '<button type="button" class="chip" data-filter="' + p.id + '" aria-pressed="' + (phase === p.id) + '">' + esc(p.name) + "</button>";
      }).join("");
    function zeige() {
      var n = 0;
      liste.querySelectorAll(".muster-karte").forEach(function (k) {
        var an = !phase || k.getAttribute("data-phase") === phase;
        k.hidden = !an; if (an) n++;
      });
      filterZiel.querySelectorAll("[data-filter]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === phase)); });
      document.getElementById("muster-anzahl").textContent = n === 1 ? "1 Muster" : n + " Muster";
    }
    filterZiel.addEventListener("click", function (e) {
      var b = e.target.closest("[data-filter]"); if (!b) return;
      phase = b.getAttribute("data-filter");
      H.schreib("muster", { phase: phase });
      zeige();
    });
    zeige();
  }

  /* ---------- Aufträge zum Kopieren ---------- */
  var aZiel = document.getElementById("auftraege-liste");
  if (aZiel) {
    aZiel.innerHTML = W.auftraege.map(function (a) {
      return '<li class="werkstatt-karte" id="' + a.id + '">' +
        "<h3>" + esc(a.name) + "</h3><p>" + esc(a.kurz) + "</p>" +
        auftragsfeld(a.id, "Auftrag ansehen und kopieren") +
        (a.lizenz ? '<p class="leise klein">Übertragen und verändert nach der »Education Agent Skills Library« von Gareth Manning, Lizenz CC BY-SA 4.0. Diese Fassung steht ebenfalls unter CC BY-SA 4.0.</p>' : "") +
        "</li>";
    }).join("");
  }

  /* ---------- KI für dein Fach ---------- */
  var fachForm = document.getElementById("fach-form");
  if (fachForm) {
    var text = document.getElementById("fach-text");
    var vorlagen = document.getElementById("fach-vorlagen");
    vorlagen.innerHTML = W.faecher.map(function (f) {
      return '<button type="button" class="knopf still" data-vorlage="' + f.id + '">Beispiel: ' + esc(f.name) + "</button>";
    }).join("");
    function neuFach() {
      var anrede = fachForm.querySelector('input[name="anrede"]:checked');
      text.value = A.fach({ fach: wert("f-fach"), gruppe: wert("f-gruppe"), massstaebe: wert("f-massstaebe"), anrede: anrede ? anrede.value : "du" });
    }
    vorlagen.addEventListener("click", function (e) {
      var b = e.target.closest("[data-vorlage]"); if (!b) return;
      var f = W.faecher.filter(function (x) { return x.id === b.getAttribute("data-vorlage"); })[0];
      document.getElementById("f-fach").value = f.name;
      document.getElementById("f-massstaebe").value = f.massstaebe.join("\n");
      neuFach();
      document.getElementById("f-massstaebe").focus();
    });
    fachForm.addEventListener("input", neuFach);
    fachForm.addEventListener("submit", function (e) { e.preventDefault(); });
    neuFach();
  }

  /* ---------- gemeinsame Angaben und Kopieren ---------- */
  var wForm = document.getElementById("werkstatt-form");
  if (wForm) {
    wForm.addEventListener("input", fuelle);
    wForm.addEventListener("submit", function (e) { e.preventDefault(); });
  }
  fuelle();

  document.addEventListener("click", function (e) {
    var k = e.target.closest("[data-kopieren]"); if (!k) return;
    var feld = document.getElementById(k.getAttribute("data-kopieren"));
    var status = k.parentNode.querySelector("[aria-live]");
    function selbst() { feld.focus(); feld.select(); status.textContent = "Der Text ist markiert. Kopiere ihn mit Strg + C (Mac: Cmd + C)."; }
    try {
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(feld.value).then(function () { status.textContent = "Kopiert. Füge ihn in dein KI-System ein."; }, selbst);
      else selbst();
    } catch (err) { selbst(); }
  });
})();
