/* Hilde-Digital – gemeinsame Helfer für alle Seiten:
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

  /* Bereich immer als Text und Farbe, nie nur Farbe. */
  function kennzeichen(b) {
    var k = [];
    if (b.bereich === "ki") k.push('<span class="kz ki">KI für meine Arbeit</span>');
    if (b.bereich === "lernen") k.push('<span class="kz lernen">Unterricht mit Tablets</span>');
    if (b.bereich === "beide" || b.kiEinsatz === "entwicklung-anwendung") k.push('<span class="kz beide">mit KI entwickelt</span>');
    if (b.status === "In Überarbeitung") k.push('<span class="kz ueberarbeitung">In Überarbeitung</span>');
    if (b.vorschauArt === "konzept") k.push('<span class="kz konzept">Konzeptbeispiel – noch nicht erprobt</span>');
    return '<div class="kennzeichen">' + k.join("") + "</div>";
  }

  function bildHtml(b) {
    if (!b.bild) return "";
    return '<div class="bild"><img src="' + esc(b.bild) + '" alt="" loading="lazy"></div>';
  }

  /* Merkmale in einer Zeile: Phase · Umfang · Rolle · Anliegen. Nur Belegtes oder Vorgeschlagenes. */
  function merkmale(b) {
    var m = [];
    if (b.phasen.length) m.push(name("phasen", b.phasen[0]));
    if (b.umfang) m.push(name("umfang", b.umfang));
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

  /* Große Showroom-Karte */
  function karte(b) {
    return '<article class="karte' + (b.bild ? "" : " kompakt") + '">' + bildHtml(b) +
      '<div class="koerper">' + kennzeichen(b) +
      '<p class="fach">' + esc(b.fach) + "</p><h3>" + esc(b.titel) + "</h3><p>" + esc(b.kurz) + "</p>" + merkmale(b) + staerken(b) + "</div>" +
      '<div class="fussleiste"><span class="status">Status: <b>' + esc(b.status) + "</b></span>" +
      '<a class="knopf" href="' + detailLink(b) + '">Beispiel ansehen <span class="sr-only">: ' + esc(b.titel) + "</span></a></div></article>";
  }

  /* Kleine Karte für Empfehlungen */
  function miniKarte(b) {
    return '<li class="mini"><a href="' + detailLink(b) + '">' +
      (b.bild ? '<img src="' + esc(b.bild) + '" alt="" loading="lazy">' : '<span class="ohne-bild" aria-hidden="true"></span>') +
      '<span class="mini-text">' + kennzeichen(b) + "<b>" + esc(b.titel) + "</b>" +
      '<span class="status">Status: ' + esc(b.status) + "</span>" +
      '<span class="mini-weiter">Beispiel ansehen <span aria-hidden="true">→</span></span></span></a></li>';
  }

  return { lies: lies, schreib: schreib, loescheAlles: loescheAlles, esc: esc, name: name,
           kennzeichen: kennzeichen, merkmale: merkmale, karte: karte, miniKarte: miniKarte, detailLink: detailLink };
})();
