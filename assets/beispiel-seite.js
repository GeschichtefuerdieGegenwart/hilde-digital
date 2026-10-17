/* Hilde Digital – Detailansicht eines Beispiels. Adresse: beispiel.html#<slug>
   Zeigt nur, was in den Daten steht. Leere Felder erscheinen gesammelt als »noch offen«,
   nie als allgemeine Sätze. Vorgeschlagene Zuordnungen tragen das Kennzeichen »Vorschlag«.
   Braucht: TAXONOMIEN, BEISPIELE, HILDE. */
(function () {
  "use strict";
  var T = TAXONOMIEN, H = HILDE, esc = H.esc;
  var ziel = document.getElementById("beispiel");

  function finde(slug) {
    for (var i = 0; i < BEISPIELE.length; i++) if (BEISPIELE[i].slug === slug) return BEISPIELE[i];
    return null;
  }

  function vorschlag(b, feld) {
    return b.vorschlag && b.vorschlag[feld] ? ' <span class="vorschlag" title="Diese Zuordnung ist ein Vorschlag und noch nicht bestätigt.">Vorschlag</span>' : "";
  }

  function liste(werte, tax) {
    return werte.map(function (w) { return esc(tax ? T.name(tax, w) : w); }).join(", ");
  }

  function zurueckLeiste() {
    var weg = H.lies("tabletweg");
    var html = '<a class="textlink" href="showroom.html"><span aria-hidden="true">←</span> Zum Showroom</a>';
    if (weg && weg.erreicht >= 5) {
      html += '<a class="textlink" href="tablets.html" id="zur-karte"><span aria-hidden="true">←</span> Zurück zu deiner Entscheidungskarte</a>';
    }
    return '<p class="zurueck-leiste">' + html + "</p>";
  }

  function zeige() {
    var slug = decodeURIComponent((location.hash || "").replace(/^#/, ""));
    var b = finde(slug);
    if (!b) {
      document.title = "Beispiel nicht gefunden – Hilde Digital";
      ziel.innerHTML = '<section class="abschnitt"><div class="huelle stapel">' + zurueckLeiste() +
        '<h1 tabindex="-1" id="detail-titel">Dieses Beispiel gibt es hier nicht.</h1>' +
        '<p>Vielleicht hat sich die Adresse geändert. Im <a href="showroom.html">Showroom</a> findest du alle Beispiele.</p></div></section>';
      return;
    }
    document.title = b.titel + " – Hilde Digital";
    var nurKI = b.bereich === "ki";
    var offen = [];

    // Einordnung
    var einordnung = [];
    function zeile(titel, wert, feld, fehltText) {
      if (wert) einordnung.push("<div><dt>" + titel + "</dt><dd>" + wert + vorschlag(b, feld) + "</dd></div>");
      else if (fehltText) offen.push(fehltText);
    }
    if (!nurKI) {
      zeile("Phase", liste(b.phasen, "phasen"), "phasen", "Phase");
    }
    zeile("Anliegen", liste(b.anliegen, "anliegen"), "anliegen", "Anliegen");
    if (!nurKI) zeile("Umfang", b.umfang ? esc(T.name("umfang", b.umfang)) : "", "umfang", "Umfang");
    zeile("Rolle der Lehrkraft", liste(b.rollen, "rollen"), "rollen", "Rolle der Lehrkraft");
    zeile("KI-Einsatz", b.kiEinsatz ? esc(T.name("kiEinsatz", b.kiEinsatz)) : "", "kiEinsatz", "KI-Einsatz");
    zeile("Fach", esc(b.fach), "faecher");

    // Fragen der Detailansicht
    var abschnitte = [];
    function abschnitt(frage, inhalt, fehltText) {
      if (inhalt) abschnitte.push("<section><h2>" + frage + "</h2>" + inhalt + "</section>");
      else if (fehltText) offen.push(fehltText);
    }
    function punkte(werte) { return werte.length ? "<ul>" + werte.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + "</ul>" : ""; }

    // Die Kurzbeschreibung steht schon oben. Ein eigener Abschnitt nur, wenn es mehr zu sagen gibt.
    if (b.beschreibung) abschnitt("Worum geht es?", "<p>" + esc(b.beschreibung) + "</p>");
    if (!nurKI) abschnitt("Was tun die Lernenden?", punkte(b.lernaktivitaeten) +
      (b.lernaktivitaeten.length && b.vorschlag && b.vorschlag.lernaktivitaeten ? '<p class="leise klein">Aus dem Material abgeleitet.' + vorschlag(b, "lernaktivitaeten") + "</p>" : ""), "was die Lernenden tun");
    var mw = "";
    if (b.lernmehrwert) mw += "<p>" + esc(b.lernmehrwert) + "</p>";
    if (b.mehrwerte.length) mw += "<p>Das Tablet soll helfen: " + liste(b.mehrwerte, "mehrwerte") + vorschlag(b, "mehrwerte") + "</p>";
    if (!nurKI) abschnitt("Worin liegt der Lernmehrwert?", mw, "Lernmehrwert");
    abschnitt("Was wird benötigt?", punkte(b.technik), "was benötigt wird");
    if (!nurKI) abschnitt("Was muss am Unterricht angepasst werden?", punkte(b.anpassungen), "nötige Anpassungen");
    abschnitt("Stolpersteine", punkte(b.stolpersteine), "Stolpersteine");
    if (b.erfahrung) abschnitt("Persönliche Beobachtung", "<p>" + esc(b.erfahrung) + '</p><p class="leise klein">Eine persönliche Beobachtung, kein Wirksamkeitsnachweis.</p>');

    var oeffnen = b.link
      ? '<a class="knopf" href="' + esc(b.link) + '" target="_blank" rel="noopener">Anwendung öffnen <span aria-hidden="true">↗</span><span class="sr-only"> (öffnet in einem neuen Tab, braucht Internet)</span></a>' +
        '<p class="leise klein">Externe Seite. Sie braucht eine Internetverbindung.</p>'
      : b.vorschauArt === "konzept"
        ? '<p class="konzept-hinweis"><b>Konzeptbeispiel – noch nicht erprobt.</b> Eine Idee für eine Lücke im Bestand. Es gibt noch keine Anwendung.</p>'
        : '<span class="knopf" aria-disabled="true">noch nicht online</span>';
    var quellcode = b.quellcode ? ' <a class="textlink klein" href="' + esc(b.quellcode) + '" target="_blank" rel="noopener">Quellcode ansehen <span aria-hidden="true">↗</span></a>' : "";

    var bereichKlasse = nurKI ? "bereich-ki" : "bereich-lernen";
    ziel.innerHTML = '<div class="' + bereichKlasse + '"><section class="bereichskopf kompakt"><div class="huelle">' + zurueckLeiste() +
      H.kennzeichen(b) + '<p class="fach">' + esc(b.fach) + "</p>" +
      '<h1 tabindex="-1" id="detail-titel" class="h1-frage">' + esc(b.titel) + "</h1>" +
      '<p class="detail-kurz">' + esc(b.kurz) + "</p>" +
      '<p class="status">Status: <b>' + esc(b.status) + "</b></p></div></section>" +
      '<section class="abschnitt" style="padding-top:var(--a2)"><div class="huelle detail-raster">' +
        '<div class="detail-haupt">' +
          (b.bild && !b.vergleich ? '<figure class="detail-bild"><img src="' + esc(b.bild) + '" alt="Bildschirmfoto von »' + esc(b.titel) + '«"><figcaption>Bildschirmfoto – auch ohne Internet sichtbar.</figcaption></figure>' : "") +
          (b.vergleich ? '<section><h2>Vorher und nachher</h2><p class="leise">' + esc(b.vergleich.text) + '</p><div class="paar">' +
            '<figure><img src="' + esc(b.vergleich.vorher.bild) + '" alt="' + esc(b.vergleich.vorher.alt) + '"><figcaption><b>Vorher:</b> ' + esc(b.vergleich.vorher.text) + "</figcaption></figure>" +
            '<figure><img src="' + esc(b.vergleich.nachher.bild) + '" alt="' + esc(b.vergleich.nachher.alt) + '"><figcaption><b>Nachher:</b> ' + esc(b.vergleich.nachher.text) + "</figcaption></figure></div></section>" : "") +
          abschnitte.join("") +
        "</div>" +
        '<aside class="detail-seite" aria-label="Auf einen Blick">' +
          '<div class="aktion">' + oeffnen + quellcode + "</div>" +
          '<h2 class="klein-titel">Einordnung</h2><dl class="felder schmal">' + einordnung.join("") + "</dl>" +
          (Object.keys(b.vorschlag || {}).length ? '<p class="leise klein">»Vorschlag« heißt: Diese Zuordnung ist noch nicht bestätigt.</p>' : "") +
          (offen.length ? '<p class="offen-liste"><b>Noch offen:</b> ' + offen.map(esc).join(", ") + "</p>" : "") +
        "</aside>" +
      "</div></section></div>";

    var zk = document.getElementById("zur-karte");
    if (zk) zk.addEventListener("click", function () {
      var weg = H.lies("tabletweg"); if (weg) { weg.schritt = 5; H.schreib("tabletweg", weg); }
    });
  }

  window.addEventListener("hashchange", function () {
    zeige();
    var t = document.getElementById("detail-titel"); if (t) t.focus();
  });
  zeige();
})();
