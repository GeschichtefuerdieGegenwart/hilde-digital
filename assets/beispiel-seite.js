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

  /* Qualitätscheck: Stärken erscheinen nur aus einem freigegebenen Check (Feld »qualitaetscheck«).
     Ohne Check steht »noch offen« – das ist keine Abwertung. */
  function qualitaetscheck(b) {
    var q = b.qualitaetscheck;
    var mehr = '<a class="textlink klein" href="mehrwert.html">So arbeitet der Digital-Check <span aria-hidden="true">→</span></a>' +
      '<a class="textlink klein" href="digital-check.html">Eigenes Material prüfen <span aria-hidden="true">→</span></a>';
    if (q && q.staerken && q.staerken.length) {
      return '<div class="qualitaet"><h2 class="klein-titel">Qualitätscheck</h2>' +
        '<ul class="label-vorschau">' + q.staerken.slice(0, 3).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" +
        '<p class="leise">Geprüft am ' + esc(q.datum || "") + (q.sicherheit ? " · Sicherheit: " + esc(q.sicherheit) : "") + "</p>" + mehr + "</div>";
    }
    return '<div class="qualitaet"><h2 class="klein-titel">Qualitätscheck</h2>' +
      "<p><b>noch offen</b></p><p class=\"leise\">Das ist keine Abwertung. Stärken erscheinen hier erst nach Prüfung und Freigabe.</p>" + mehr + "</div>";
  }

  /* Passende Beispiele: feste, nachvollziehbare Regel statt Zufall.
     Ausdrücklich verwandt: 6 Punkte · gleiches Fach: 3 Punkte je Fach · gleiches Anliegen: 1 Punkt je Anliegen.
     Konzeptbeispiele nur, wenn das Beispiel selbst eines ist. Mindestens 1 Punkt, höchstens drei.
     Bei Gleichstand stehen Beispiele mit Anwendung im Netz vorn. */
  function passend(b) {
    return BEISPIELE.filter(function (x) {
      return x !== b && (x.vorschauArt !== "konzept" || b.vorschauArt === "konzept");
    }).map(function (x) {
      var fach = x.faecher.filter(function (f) { return b.faecher.indexOf(f) >= 0; });
      var anl = x.anliegen.filter(function (a) { return b.anliegen.indexOf(a) >= 0; });
      var verwandt = b.verwandt.indexOf(x.id) >= 0 || x.verwandt.indexOf(b.id) >= 0;
      var punkte = (verwandt ? 6 : 0) + 3 * fach.length + anl.length;
      var warum = [];
      if (verwandt) warum.push("gehört thematisch dazu");
      if (fach.length) warum.push("gleiches Fach");
      if (anl.length) warum.push("ähnliches Anliegen: " + T.name("anliegen", anl[0]));
      return { b: x, punkte: punkte, rang: punkte + (x.link ? 0.5 : 0), warum: warum.join(" · ") };
    }).filter(function (t) { return t.punkte >= 1; })
      .sort(function (a, c) { return c.rang - a.rang; })
      .slice(0, 3);
  }

  function passtDazu(b) {
    var liste = passend(b);
    if (!liste.length) return "";
    return '<section class="abschnitt" style="padding-top:0" aria-labelledby="t-passt"><div class="huelle passt-dazu">' +
      '<h2 id="t-passt" class="klein-titel">Passt dazu</h2>' +
      '<ul class="minis">' + liste.map(function (t) {
        return H.miniKarte(t.b).replace('<span class="mini-weiter">', '<span class="warum-passend">' + esc(t.warum) + '</span><span class="mini-weiter">');
      }).join("") + "</ul></div></section>";
  }

  /* Ansichten aus der echten Anwendung: ein großes Bild, darunter die weiteren. Jedes öffnet die Bildansicht. */
  function ansichtenHtml(b) {
    var a = b.ansichten;
    return '<section class="detail-ansichten" aria-label="Ansichten aus der Anwendung">' +
      '<button type="button" class="detail-haupt-bild" data-bildrahmen data-ansicht="0"><img src="' + esc(a[0].bild) + '" alt="' + esc(a[0].alt) + '" width="1040" height="650"><span class="sr-only">Groß zeigen</span></button>' +
      '<p class="detail-bild-text">' + esc(a[0].text) + "</p>" +
      (a.length > 1 ? '<ul class="detail-weitere">' + a.slice(1).map(function (x, i) {
        return '<li><button type="button" data-bildrahmen data-ansicht="' + (i + 1) + '"><img src="' + esc(x.bild) + '" alt="' + esc(x.alt) + '" width="1040" height="650" loading="lazy"><span class="sr-only">Ansicht ' + (i + 2) + " groß zeigen</span></button><span>" + esc(x.text) + "</span></li>";
      }).join("") + "</ul>" : "") +
      '<p class="leise klein">Bildschirmfotos aus der Anwendung – auch ohne Internet sichtbar.</p></section>';
  }

  function zurueckLeiste() {
    var weg = H.lies("tabletweg");
    var html = '<a class="textlink" href="galerie.html"><span aria-hidden="true">←</span> Zur Galerie</a>';
    if (weg && weg.erreicht >= 4) {
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
        '<p>Vielleicht hat sich die Adresse geändert. In der <a href="galerie.html">Galerie</a> findest du alle Beispiele.</p></div></section>';
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
    // Was tut die Lehrkraft? Die Rollen mit ihrer Erklärung – keine Rolle ist höherwertig.
    if (b.rollen.length) abschnitt("Was tut die Lehrkraft?", "<ul>" + b.rollen.map(function (r) {
      var x = T.rollen.filter(function (y) { return y.id === r; })[0];
      return x ? "<li><b>" + esc(x.name) + "</b> – " + esc(x.hilfe) + "</li>" : "";
    }).join("") + "</ul>" + (b.vorschlag && b.vorschlag.rollen ? '<p class="leise klein">Zuordnung' + vorschlag(b, "rollen") + "</p>" : ""));
    var mw = "";
    if (b.lernmehrwert) mw += "<p>" + esc(b.lernmehrwert) + "</p>";
    if (b.mehrwerte.length) mw += "<p>Das Tablet soll helfen: " + liste(b.mehrwerte, "mehrwerte") + vorschlag(b, "mehrwerte") + "</p>";
    if (!nurKI) abschnitt("Worin liegt der Lernmehrwert?", mw, "Lernmehrwert");
    // Wie umfangreich ist der digitale Einsatz? Ohne Rangfolge: punktuell ist keine Vorstufe.
    if (!nurKI && b.umfang) {
      var u = T.umfang.filter(function (y) { return y.id === b.umfang; })[0];
      abschnitt("Wie umfangreich ist der digitale Einsatz?", "<p><b>" + esc(u.name) + "</b> – " + esc(u.hilfe) + vorschlag(b, "umfang") + "</p>" +
        '<p class="leise klein">Mehr Digitalität ist nicht besser. Ein punktueller Einsatz ist keine Vorstufe.</p>');
    }
    abschnitt("Was wird benötigt?", punkte(b.technik), "was benötigt wird");
    if (!nurKI) abschnitt("Was muss am Unterricht angepasst werden?", punkte(b.anpassungen), "nötige Anpassungen");
    abschnitt("Stolpersteine", punkte(b.stolpersteine), "Stolpersteine");
    if (b.erfahrung) abschnitt("Persönliche Beobachtung", "<p>" + esc(b.erfahrung) + '</p><p class="leise klein">Eine persönliche Beobachtung, kein Wirksamkeitsnachweis.</p>');

    var oeffnen = b.link
      ? '<a class="knopf" href="' + esc(b.link) + '" target="_blank" rel="noopener">Anwendung öffnen <span aria-hidden="true">↗</span><span class="sr-only"> (öffnet in einem neuen Tab, braucht Internet)</span></a>' +
        '<p class="leise klein">Externe Seite. Sie braucht eine Internetverbindung. Öffnet sie sich nicht, ist sie gerade nicht erreichbar – die Bilder hier zeigen trotzdem, was dort passiert.</p>'
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
          (b.ansichten && b.ansichten.length ? ansichtenHtml(b) :
            b.bild && !b.vergleich ? '<figure class="detail-bild" data-bildrahmen><img src="' + esc(b.bild) + '" alt="Bildschirmfoto von »' + esc(b.titel) + '«" width="1040" height="650"><figcaption>Bildschirmfoto – auch ohne Internet sichtbar.</figcaption></figure>' : "") +
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
          qualitaetscheck(b) +
        "</aside>" +
      "</div></section>" + passtDazu(b) + "</div>";

    var zk = document.getElementById("zur-karte");
    if (zk) zk.addEventListener("click", function () {
      var weg = H.lies("tabletweg"); if (weg) { weg.schritt = 5; H.schreib("tabletweg", weg); }
    });
  }

  ziel.addEventListener("click", function (e) {
    var k = e.target.closest("[data-ansicht]");
    if (!k) return;
    var b = finde(decodeURIComponent((location.hash || "").replace(/^#/, "")));
    if (b && b.ansichten) H.lichtbild(b.ansichten, parseInt(k.getAttribute("data-ansicht"), 10), b.titel, k, { detail: "", app: b.link || "" });
  });

  window.addEventListener("hashchange", function () {
    zeige();
    var t = document.getElementById("detail-titel"); if (t) t.focus();
  });
  zeige();
})();
