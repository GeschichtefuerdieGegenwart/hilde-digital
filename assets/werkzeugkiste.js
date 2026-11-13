/* Kidu – Methodenkoffer und Fassungsangaben (ab Version 4.25).
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
      '. Mehr dazu im <a href="werkzeugkiste.html">Methodenkoffer</a>.';
  });

  /* 2. Methodenkoffer */
  var liste = document.getElementById("kf-liste");
  if (liste) {
    var W = typeof WERKSTATT !== "undefined" ? WERKSTATT : { auftraege: [] };
    /* Ein Eintrag je Werkzeug (ab 4.32) – vorher stand jedes Werkzeug so oft da, wie es Anleitungen nutzt. */
    var standVon = function (id) { var k = K.skills[id]; return k ? "Fassung " + k.fassung + " vom " + k.datum : ""; };
    var teil = function (href, name, wozu, id) {
      return K.skills[id] ? '<li><a class="textlink" href="' + href + '">' + esc(name) + "</a>" + (wozu ? " – " + esc(wozu) : "") +
        ' <span class="leise klein">· ' + esc(standVon(id)) + "</span></li>" : "";
    };
    var gruppen = [
      { href: "digitalisieren.html", name: "Bisherigen Unterricht digitalisieren", satz: "Der Prompt folgt zwei Anleitungen.",
        teile: teil("digitalisieren.html", "Unterricht digitalisieren", "so geht das KI-System vor", "unterricht-digitalisieren") +
               teil("digitalisieren.html", "Lernseite bauen", "nur wenn du als Ausgabe eine Lernseite wählst", "lernseite-bauen") },
      { href: "digital-check.html#mit-ki", name: "Digital-Check: Mit KI prüfen", satz: "Der Prüf-Auftrag folgt einer Anleitung.",
        teile: teil("digital-check.html#mit-ki", "Digital-Check", "die typischen Schwächen, nach denen das KI-System sucht", "digital-check") },
      { href: "auftraege.html", name: "Aufträge zum Kopieren", satz: "Jeder Auftrag folgt einer eigenen Anleitung.",
        teile: W.auftraege.map(function (a) { return teil("auftraege.html#" + a.id, a.name, "", a.quelle); }).join("") }
    ];
    liste.innerHTML = gruppen.filter(function (g) { return g.teile; }).map(function (g) {
      return '<li class="kf-werkzeug"><h3><a href="' + g.href + '">' + esc(g.name) + ' <span aria-hidden="true">→</span></a></h3>' +
        "<p>" + esc(g.satz) + '</p><ul class="kf-teile">' + g.teile + "</ul></li>";
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
