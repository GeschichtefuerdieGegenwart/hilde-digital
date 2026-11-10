/* Kidu – Werkzeugkiste und Fassungsangaben (ab Version 4.25).
   1. Jedes Element mit data-kurzfassung="skill-a skill-b" bekommt einen Satz, aus welcher Fassung der Auftrag stammt.
   2. Auf werkzeugkiste.html: die Liste »Was in den Werkzeugen steckt« und die Downloads.
   Daten: KURZFASSUNGEN (assets/daten/kurzfassungen.js, erzeugt von tools/werkzeugkiste.py), WERKSTATT für die Aufträge.
   Keine KI-Anbindung, nichts wird gespeichert. */
(function () {
  "use strict";
  var K = typeof KURZFASSUNGEN !== "undefined" ? KURZFASSUNGEN : null;
  if (!K) return;
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fassung(id) { var k = K.skills[id]; return k ? "»" + id + "« (Fassung " + k.fassung + ", " + k.datum + ")" : ""; }

  /* 1. Fassungsangaben an den Werkzeugen */
  Array.prototype.forEach.call(document.querySelectorAll("[data-kurzfassung]"), function (el) {
    var teile = el.getAttribute("data-kurzfassung").split(/\s+/).filter(function (id) { return K.skills[id]; }).map(fassung);
    if (!teile.length) return;
    el.innerHTML = "Dieser Auftrag enthält die Kurzfassung der Anleitung " + esc(teile.join(" und ")) +
      '. Mehr dazu in der <a href="werkzeugkiste.html">Werkzeugkiste</a>.';
  });

  /* 2. Werkzeugkiste */
  var liste = document.getElementById("kf-liste");
  if (liste) {
    var W = typeof WERKSTATT !== "undefined" ? WERKSTATT : { auftraege: [] };
    var orte = {
      "unterricht-digitalisieren": { href: "digitalisieren.html", werkzeug: "Unterricht digitalisieren", teil: "der Abschnitt »Vorgehen« im Prompt" },
      "lernseite-bauen": { href: "digitalisieren.html", werkzeug: "Unterricht digitalisieren", teil: "die Ausgabe »Lernseite als eine HTML-Datei«, mit den Gestaltungsregeln" },
      "digital-check": { href: "digital-check.html#mit-ki", werkzeug: "Digital-Check: Mit KI prüfen", teil: "der Abschnitt »Typische Schwächen« im Prüf-Auftrag" }
    };
    W.auftraege.forEach(function (a) {
      orte[a.quelle] = { href: "auftraege.html#" + a.id, werkzeug: "Aufträge zum Kopieren", teil: "der Auftrag »" + a.name + "«" };
    });
    var reihe = ["unterricht-digitalisieren", "lernseite-bauen", "digital-check"];
    var ids = reihe.filter(function (id) { return K.skills[id]; })
      .concat(W.auftraege.map(function (a) { return a.quelle; }).filter(function (id) { return K.skills[id] && reihe.indexOf(id) < 0; }));
    liste.innerHTML = ids.map(function (id) {
      var o = orte[id]; var k = K.skills[id];
      if (!o) return "";
      return '<li class="werkzeug"><a href="' + o.href + '"><span class="werkzeug-text"><b>' + esc(o.werkzeug) + "</b>" +
        esc("Darin steckt " + o.teil + ". Anleitung »" + id + "«, Fassung " + k.fassung + " vom " + k.datum + ".") +
        '</span><span class="werkzeug-los" aria-hidden="true">→</span></a></li>';
    }).join("");
  }

  var laden = document.getElementById("laden-liste");
  if (laden) {
    var einzeln = Object.keys(K.skills).filter(function (id) { return K.skills[id].herunterladen; });
    laden.innerHTML =
      '<li><a class="knopf" href="werkzeugkiste/download/kidu.zip" download>Alle Anleitungen: Plugin »' + esc(K.plugin.name) + "« " + esc(K.plugin.version) + "</a>" +
      '<span class="leise">Eine Zip-Datei mit ' + (einzeln.length + 1) + " Anleitungen, auch dem Einstieg »kidu-start«.</span></li>" +
      '<li><span class="laden-titel">Einzelne Anleitungen</span><ul class="laden-einzeln">' +
      ["kidu-start"].concat(einzeln).map(function (id) {
        var k = K.skills[id];
        return '<li><a class="textlink" href="werkzeugkiste/download/skills/' + id + '.zip" download>' + esc(id) + "</a>" +
          (k ? ' <span class="leise">· Fassung ' + esc(k.fassung) + (k.lizenz ? " · CC BY-SA 4.0" : "") + "</span>" : "") + "</li>";
      }).join("") + "</ul></li>" +
      '<li><a class="textlink" href="werkzeugkiste/download/kidu-gestaltung.zip" download>Gestaltungsregeln von Kidu</a>' +
      '<span class="leise">Farben, Schriften, Bewegung – das Gestaltungssystem dieser Seite als Text für ein KI-System. Ansehen: <a href="gestaltung.html">Gestaltungssystem</a>.</span></li>';
  }
})();
