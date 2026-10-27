/* Hilde Digital – gemeinsame Helfer für alle Seiten:
   sicheres Speichern im Browser, Darstellung von Kennzeichen und Beispielkarten.
   Braucht: assets/daten/taxonomien.js (TAXONOMIEN). */
var HILDE = (function () {
  "use strict";

  /* Speichern nur in diesem Browser. Jeder Zugriff in try/catch: In privaten Fenstern
     oder bei gesperrtem Speicher läuft alles weiter, nur ohne Erinnerung. Freitexte werden nie gespeichert. */
  var PRAEFIX = "hilde.";
  function lies(schluessel) {
    try { var t = window.localStorage.getItem(PRAEFIX + schluessel); return t ? JSON.parse(t) : null; }
    catch (e) { return null; }
  }
  function schreib(schluessel, wert) {
    try { window.localStorage.setItem(PRAEFIX + schluessel, JSON.stringify(wert)); } catch (e) { /* ohne Speicher weiter */ }
  }
  function loescheAlles() {
    try {
      var weg = [];
      for (var i = 0; i < window.localStorage.length; i++) {
        var k = window.localStorage.key(i);
        if (k && k.indexOf(PRAEFIX) === 0) weg.push(k);
      }
      weg.forEach(function (k) { window.localStorage.removeItem(k); });
    } catch (e) { /* nichts gespeichert */ }
  }

  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function name(liste, id) { return TAXONOMIEN.name(liste, id); }

  /* Dauer-Tokens aus hilde.css (ab Version 4.8 Teil 2): HILDE.dauer("flug") liest --dauer-flug und gibt Millisekunden zurück.
     Alle Tokens stehen in Millisekunden. So steht jede Zahl nur einmal, im Gestaltungssystem. */
  function dauer(name) {
    var v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--dauer-" + name));
    return isNaN(v) ? 0 : v;
  }

  /* Bereich immer als Text und Farbe, nie nur Farbe. */
  function kennzeichen(b) {
    var k = [];
    if (b.bereich === "ki") k.push('<span class="kz ki">KI-Training</span>');
    if (b.bereich === "lernen") k.push('<span class="kz lernen">Digitaler Unterricht</span>');
    if (b.status === "In Überarbeitung") k.push('<span class="kz ueberarbeitung">In Überarbeitung</span>');
    if (b.vorschauArt === "konzept") k.push('<span class="kz konzept">Konzeptbeispiel – noch nicht erprobt</span>');
    return '<div class="kennzeichen">' + k.join("") + "</div>";
  }

  function bildHtml(b) {
    if (!b.bild) return "";
    return '<div class="bild" data-bildrahmen><img src="' + esc(b.bild) + '" alt="" loading="lazy" width="1040" height="650" data-wechsel-bild></div>';
  }

  /* Merkmale in einer Zeile: Phase · Rolle · Anliegen. Nur Belegtes oder Vorgeschlagenes.
     Der Umfang steht seit Version 4.7 in einer eigenen Zeile mit der Stundenlinie (umfangZeile). */
  function merkmale(b) {
    var m = [];
    if (b.phasen.length) m.push(name("phasen", b.phasen[0]));
    if (b.rollen.length) m.push(name("rollen", b.rollen[0]));
    if (b.anliegen.length) m.push(name("anliegen", b.anliegen[0]));
    return m.length ? '<p class="merkmale">' + m.map(esc).join(" · ") + "</p>" : "";
  }

  /* Stärken aus einem freigegebenen Qualitätscheck: höchstens drei, ohne Zahl. */
  function staerken(b) {
    var q = b.qualitaetscheck;
    if (!q || !q.staerken || !q.staerken.length) return "";
    return '<ul class="label-vorschau" aria-label="Geprüfte Stärken">' + q.staerken.slice(0, 3).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>";
  }

  function detailLink(b) { return "beispiel.html#" + encodeURIComponent(b.slug); }

  /* Merken für den Schnellhefter (assets/motion.js). Gespeichert wird nur die ID, nur in diesem Browser. */
  function merkKnopf(b) {
    return '<button type="button" class="knopf still merken" data-merken="' + esc(b.id) + '" aria-pressed="false"><span class="merken-text">Merken</span><span class="sr-only">: ' + esc(b.titel) + "</span></button>";
  }

  /* Stundenlinie (Muster I): Der Umfang als Form – Punkt, Abschnitt, ganze Stunde. Ohne Wertung.
     Die Linie ist für Vorleseprogramme verborgen; das Wort steht immer daneben (umfangZeile) oder darüber. */
  function stundenlinie(umfang, klein) {
    // klein: true = »klein« (Entscheidungskarte), "zeile" = kleinste Form neben einem Wort (Galerie).
    var variante = klein === true ? " klein" : klein ? " " + esc(klein) : "";
    // Ein <span>, damit die Linie auch in einem <p> neben dem Wort stehen kann (CSS: display block bzw. inline-block).
    return '<span class="stundenlinie' + variante + '" data-umfang="' + esc(umfang || "") + '" aria-hidden="true">' +
      '<span class="sl-spur"><i></i><i></i><i></i><i></i><i></i></span><span class="sl-balken"></span></span>';
  }

  /* I2 · Umfang auf Galerie-Karten (ab Version 4.7): kleine Stundenlinie und das Wort daneben – nie nur die Grafik.
     Ohne Umfang keine Linie, nur »noch offen«. Für KI-Training gibt es keinen Umfang; dann bleibt die Zeile weg. */
  function umfangZeile(b) {
    if (b.bereich === "ki") return "";
    if (!b.umfang) return '<p class="umfang-zeile"><span>Umfang: <b class="offen">noch offen</b></span></p>';
    return '<p class="umfang-zeile">' + stundenlinie(b.umfang, "zeile") + "<span>Umfang: <b>" + esc(name("umfang", b.umfang)) + "</b></span></p>";
  }

  /* I2 · Die Stundenlinie zeichnet sich einmal beim Erscheinen: Der Balken wächst von 0 auf seinen Umfang (260 ms).
     Bei »weniger Bewegung« steht sofort der Endzustand. Zwei Bildwechsel, damit der Browser den Start sieht. */
  function stundenlinieZeichnen(elemente) {
    var liste = elemente && elemente.length !== undefined ? [].slice.call(elemente) : (elemente ? [elemente] : []);
    if (!liste.length || ruhig()) return;
    liste.forEach(function (el) { el.classList.add("sl-von"); });
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      liste.forEach(function (el) { el.classList.remove("sl-von"); });
    }); });
  }

  /* Große Galerie-Karte */
  function karte(b) {
    return '<article class="karte' + (b.bild ? "" : " kompakt") + '" data-wechsel="' + esc(b.id) + '">' + bildHtml(b) +
      '<div class="koerper">' + kennzeichen(b) +
      '<p class="fach">' + esc(b.fach) + "</p><h3 data-wechsel-titel>" + esc(b.titel) + "</h3><p>" + esc(b.kurz) + "</p>" + merkmale(b) + umfangZeile(b) + staerken(b) + "</div>" +
      '<div class="fussleiste"><span class="status">Status: <b>' + esc(b.status) + "</b></span>" +
      '<span class="fuss-knoepfe">' + merkKnopf(b) + '<a class="knopf" href="' + detailLink(b) + '">Beispiel ansehen <span class="sr-only">: ' + esc(b.titel) + "</span></a></span></div></article>";
  }

  /* Kleine Karte für Empfehlungen */
  function miniKarte(b) {
    return '<li class="mini" data-wechsel="' + esc(b.id) + '"><a href="' + detailLink(b) + '">' +
      (b.bild ? '<img src="' + esc(b.bild) + '" alt="" loading="lazy" data-wechsel-bild>' : '<span class="ohne-bild" aria-hidden="true"></span>') +
      '<span class="mini-text">' + kennzeichen(b) + "<b data-wechsel-titel>" + esc(b.titel) + "</b>" +
      '<span class="status">Status: ' + esc(b.status) + "</span>" +
      '<span class="mini-weiter">Beispiel ansehen <span aria-hidden="true">→</span></span></span></a></li>';
  }

  /* ---------- Bildansicht (Lichtbild) ----------
     Ein <dialog> für die Ansichten eines Projekts. Öffnet sich aus dem angeklickten Bild heraus
     (transform-origin), schließt mit Escape, »Schließen« oder Klick daneben. Pfeiltasten blättern.
     Der Fokus kehrt zum auslösenden Element zurück. Bewegung nur über transform und opacity. */
  var dlg = null, liste = [], pos = 0, titel = "", ausloeser = null, wege = null;
  /* »Weniger Bewegung«: Systemeinstellung oder Schalter im Fuß (html[data-bewegung="weniger"], assets/motion.js). */
  function ruhig() {
    return document.documentElement.getAttribute("data-bewegung") === "weniger" ||
      !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  function baue() {
    dlg = document.createElement("dialog");
    dlg.className = "lichtbild";
    dlg.setAttribute("aria-labelledby", "lb-titel");
    dlg.innerHTML = '<div class="lb-kopf"><p id="lb-titel" class="lb-titel"></p>' +
      '<p class="lb-wege" hidden></p>' +
      '<button type="button" class="lb-zu knopf still" data-lb="zu">Schließen <span aria-hidden="true">×</span></button></div>' +
      '<figure class="lb-bild"><img alt="" width="1040" height="650"><figcaption></figcaption></figure>' +
      '<div class="lb-steuerung"><button type="button" class="knopf still" data-lb="zurueck"><span aria-hidden="true">←</span> Vorherige</button>' +
      '<p class="lb-stand" aria-live="polite"></p>' +
      '<button type="button" class="knopf still" data-lb="vor">Nächste <span aria-hidden="true">→</span></button></div>';
    document.body.appendChild(dlg);
    dlg.addEventListener("click", function (e) {
      var k = e.target.closest("[data-lb]");
      if (k) { var a = k.getAttribute("data-lb"); if (a === "zu") schliesse(); else blaettere(a === "vor" ? 1 : -1); return; }
      if (e.target === dlg) schliesse(); // Klick auf den Schleier
    });
    dlg.addEventListener("cancel", function (e) { e.preventDefault(); schliesse(); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); blaettere(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); blaettere(-1); }
    });
    var img = dlg.querySelector("img");
    img.addEventListener("error", function () { dlg.querySelector(".lb-bild").classList.add("bild-fehlt"); });
    img.addEventListener("load", function () { dlg.querySelector(".lb-bild").classList.remove("bild-fehlt"); });
  }
  function zeigeBild() {
    var a = liste[pos], img = dlg.querySelector("img");
    var fig = dlg.querySelector(".lb-bild");
    fig.classList.add("wechselt");
    img.src = a.bild; img.alt = a.alt;
    dlg.querySelector("figcaption").textContent = a.text;
    dlg.querySelector(".lb-titel").textContent = titel;
    // Zwei direkte Wege: zur Beschreibung und in die laufende Anwendung (neuer Tab).
    var w = dlg.querySelector(".lb-wege");
    w.hidden = !wege;
    w.innerHTML = wege ? (wege.detail ? '<a class="knopf hell" href="' + esc(wege.detail) + '">Beispiel ansehen</a>' : "") +
      (wege.app ? '<a class="knopf still" href="' + esc(wege.app) + '" target="_blank" rel="noopener">Ausprobieren <span aria-hidden="true">↗</span><span class="sr-only"> (neuer Tab, braucht Internet)</span></a>'
                : '<span class="lb-offen">noch nicht online</span>') : "";
    dlg.querySelector(".lb-stand").textContent = "Ansicht " + (pos + 1) + " von " + liste.length;
    dlg.querySelector('[data-lb="zurueck"]').disabled = pos === 0;
    dlg.querySelector('[data-lb="vor"]').disabled = pos === liste.length - 1;
    requestAnimationFrame(function () { fig.classList.remove("wechselt"); });
  }
  function blaettere(r) { var n = pos + r; if (n < 0 || n >= liste.length) return; pos = n; zeigeBild(); }
  function oeffne(ansichten, start, name, element, links) {
    if (!ansichten || !ansichten.length) return;
    if (!dlg) baue();
    liste = ansichten; pos = Math.max(0, Math.min(start || 0, ansichten.length - 1)); titel = name || ""; ausloeser = element || document.activeElement; wege = links || null;
    // Räumlich: Das Bild wächst aus dem angeklickten Element heraus.
    if (element && element.getBoundingClientRect) {
      var r = element.getBoundingClientRect();
      dlg.style.transformOrigin = Math.round(r.left + r.width / 2) + "px " + Math.round(r.top + r.height / 2) + "px";
    }
    zeigeBild();
    dlg.classList.remove("zu");
    dlg.showModal();
    dlg.querySelector('[data-lb="zu"]').focus();
  }
  function schliesse() {
    if (!dlg || !dlg.open) return;
    var fertig = function () { dlg.close(); dlg.classList.remove("zu"); if (ausloeser && ausloeser.focus) ausloeser.focus(); };
    if (ruhig()) { fertig(); return; }
    dlg.classList.add("zu");
    setTimeout(fertig, dauer("aus")); // Ausblenden ist kürzer als Einblenden (--dauer-aus)
  }

  /* ---------- Ansichtswechsel Karte ↔ Detail (ab Version 4.8 Teil 2) ----------
     Mit View Transitions (Regel view-transition in hilde.css) wandern Bild und Titel eines Beispiels von der Karte zur
     Detailseite und zurück. Dafür brauchen beide Seiten dieselben Namen: bild-<id> und titel-<id>. Ein Name darf
     auf einer Seite nur einmal vorkommen – in der Galerie steht ein Beispiel aber oft mehrfach (»Zum Anfangen«,
     Einblicke, Treffer). Darum werden die Namen nicht beim Zeichnen vergeben, sondern erst beim Klick auf die eine
     Karte, die geöffnet wird. Karten tragen data-wechsel="<id>", ihr Bild data-wechsel-bild, ihr Titel data-wechsel-titel.
     Zurück zur Galerie: Kommt die Seite aus dem Browser-Speicher, trägt die angeklickte Karte ihre Namen noch.
     Wird sie neu geladen, bekommt die erste gezeichnete Karte dieses Beispiels die Namen (Regel: Seitenfolge,
     also »Zum Anfangen« vor Einblicken vor Treffern), und ihr Link erhält den Fokus. Die Beispiel-ID steht so lange
     in sessionStorage unter hilde.wechsel. Browser ohne View Transitions wechseln sofort; bei weniger Bewegung
     entfällt die Bewegung (CSS) und es wird nichts benannt. */
  var WECHSEL = "hilde.wechsel", benannt = [];
  function wechselMerken(id) { try { if (id) sessionStorage.setItem(WECHSEL, id); else sessionStorage.removeItem(WECHSEL); } catch (e) { /* ohne Speicher weiter */ } }
  function wechselId() { try { return sessionStorage.getItem(WECHSEL) || ""; } catch (e) { return ""; } }
  function benenne(karte, id, bild, titel) {
    benannt.forEach(function (el) { el.style.viewTransitionName = ""; el.style.viewTransitionClass = ""; });
    benannt = [];
    if (!id) return;
    if (karte) { bild = bild || karte.querySelector("[data-wechsel-bild]"); titel = titel || karte.querySelector("[data-wechsel-titel]"); }
    if (bild) { bild.style.viewTransitionName = "bild-" + id; bild.style.viewTransitionClass = "bild"; benannt.push(bild); }
    if (titel) { titel.style.viewTransitionName = "titel-" + id; benannt.push(titel); }
  }
  function wechselMoeglich() { return !!document.startViewTransition && !ruhig(); }
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href*="beispiel.html#"]');
    if (!a || /beispiel\.html$/.test(location.pathname)) return;
    var karte = a.closest("[data-wechsel]");
    if (!karte || !wechselMoeglich()) return;
    benenne(karte, karte.getAttribute("data-wechsel"));
    wechselMerken(karte.getAttribute("data-wechsel"));
  });
  /* Beim Laden (nicht auf der Detailseite): die erste gezeichnete Karte des zuletzt geöffneten Beispiels benennen. */
  function wechselZurueck() {
    if (/beispiel\.html$/.test(location.pathname)) return;
    var id = wechselId();
    wechselMerken("");
    if (!id || !wechselMoeglich()) return;
    var karten = [].slice.call(document.querySelectorAll('[data-wechsel="' + id.replace(/"/g, "") + '"]'));
    var karte = karten.filter(function (k) { return k.offsetParent !== null; })[0];
    if (!karte) return;
    benenne(karte, id);
    var link = karte.querySelector('a[href*="beispiel.html#"]');
    if (link) link.focus({ preventScroll: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wechselZurueck); else setTimeout(wechselZurueck, 0);

  /* Einflug beim Scrollen (ab Version 4.2): Abschnitte außerhalb des Bildschirms gleiten einmal kurz herein.
     Höchstens 6 px (seit 4.8 Teil 2), --dauer-einflug, gestaffelt zu je --dauer-staffel, höchstens 8 auf einmal. Nicht bei »weniger Bewegung«,
     nicht ohne IntersectionObserver. Was beim Laden schon zu sehen ist, wird nie versteckt. */
  var EINFLUG = ".einblick, .einblick-klein, .werkzeug, .check-wege, .kennzahlen > li, " +
    ".zusammen-liste > li, .bausteine-liste > li, .alle-band-raster, .detail-ansichten, .inhalte-liste > div";
  function einflug() {
    if (ruhig() || !("IntersectionObserver" in window)) return;
    var hoehe = window.innerHeight || 800;
    var ziele = [].slice.call(document.querySelectorAll(EINFLUG)).filter(function (e) {
      return e.getBoundingClientRect().top > hoehe; // nur, was noch nicht zu sehen ist
    });
    if (!ziele.length) return;
    ziele.forEach(function (e) { e.classList.add("einflug"); });
    document.documentElement.classList.add("einflug-an");
    var io = new IntersectionObserver(function (eintraege) {
      var n = 0;
      eintraege.forEach(function (x) {
        if (!x.isIntersecting) return;
        x.target.style.setProperty("--einflug-verzug", Math.min(n++, 7) * dauer("staffel") + "ms");
        x.target.classList.add("da");
        io.unobserve(x.target);
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    ziele.forEach(function (e) { io.observe(e); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", einflug); else setTimeout(einflug, 0);

  /* Fehlt ein Galeriebild, zeigt der Rahmen Rasterpunkte und »Bild nicht verfügbar« statt eines kaputten Bildes. */
  document.addEventListener("error", function (e) {
    var t = e.target;
    if (t && t.tagName === "IMG" && t.closest && t.closest("[data-bildrahmen]")) t.closest("[data-bildrahmen]").classList.add("bild-fehlt");
  }, true);

  return { lies: lies, schreib: schreib, loescheAlles: loescheAlles, esc: esc, name: name, ruhig: ruhig, dauer: dauer,
           wechselId: wechselId, wechselMerken: wechselMerken, wechselBenennen: benenne, wechselMoeglich: wechselMoeglich,
           kennzeichen: kennzeichen, merkmale: merkmale, karte: karte, miniKarte: miniKarte, detailLink: detailLink, merkKnopf: merkKnopf,
           stundenlinie: stundenlinie, umfangZeile: umfangZeile, stundenlinieZeichnen: stundenlinieZeichnen,
           lichtbild: oeffne };
})();
