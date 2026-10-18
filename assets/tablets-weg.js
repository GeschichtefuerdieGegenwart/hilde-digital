/* Hilde Digital – Digitaler Unterricht: Planungsweg »Unterricht planen«: vier kurze Fragen bis zur Entscheidungskarte.
   Eine Entscheidung pro Schritt. Zuerst stehen nur die wichtigsten Antworten da, der Rest unter »Weitere anzeigen«.
   Die Angaben zur Klasse (Rahmen) sind freiwillig und stehen aufklappbar unter der Frage nach dem Umfang.
   »Noch nicht sicher« ist überall erlaubt, wo es fachlich sinnvoll ist.
   Braucht: TAXONOMIEN, BEISPIELE, REGELN, HILDE. */
(function () {
  "use strict";
  var T = TAXONOMIEN, H = HILDE, esc = H.esc;
  var SPEICHER = "tabletweg";

  var NICHT_SICHER = { id: "offen", name: "Ich bin noch nicht sicher" };

  var SCHRITTE = [
    { id: "phase", titel: "Phase", frage: "Für welche Phase suchst du etwas?",
      hilfe: "Die Phase ist eine Orientierung, kein starres Modell.",
      optionen: function () {
        return T.phasen.filter(function (p) { return p.id !== "offen"; }).concat([NICHT_SICHER]);
      } },
    { id: "anliegen", titel: "Ziel", frage: "Was soll dein digitaler Abschnitt vor allem bewirken?",
      hilfe: "Wähle das Wichtigste.",
      optionen: function () {
        return T.anliegen.filter(function (x) { return x.bereich !== "ki"; })
          .map(function (x) { return { id: x.id, name: x.ziel || x.name, haeufig: x.haeufig }; }).concat([NICHT_SICHER]);
      },
      haeufig: function (o) { return o.haeufig || o.id === "offen"; } },
    { id: "mehrwert", titel: "Mehrwert", frage: "Was soll durch das Tablet besser möglich werden?",
      hilfe: "Geht es auf Papier genauso gut? Dann bleib beim Papier.",
      optionen: function () { return T.mehrwerte; },
      haeufig: function (o) { return o.haeufig; } },
    { id: "umfang", titel: "Umfang", frage: "Wie viel Digitalität passt zu deinem Vorhaben?",
      hilfe: "Durchgängig ist eine Möglichkeit, kein Standard und keine höhere Stufe.",
      optionen: function () {
        return T.umfang.concat([{ id: "offen", name: "Noch offen", hilfe: "Hilde schlägt dir einen Umfang vor" }]);
      } },
    { id: "ergebnis", titel: "Entscheidungskarte" }
  ];

  var form = document.getElementById("weg");
  var fortschritt = document.getElementById("fortschritt");
  var ansage = document.getElementById("ansage");
  var hinweis = document.getElementById("hinweis");
  var zurueck = document.getElementById("zurueck");
  var weiter = document.getElementById("weiter");

  function leer() { return { schritt: 0, erreicht: 0, phase: null, anliegen: null, mehrwert: null, umfang: null, rahmen: {}, weitere: {} }; }
  var z = H.lies(SPEICHER) || leer();
  if (!z.rahmen) z.rahmen = {};
  // Früher galt »Weitere anzeigen« nur für eine Frage (true/false). Jetzt je Frage.
  if (!z.weitere || typeof z.weitere !== "object") z.weitere = z.weitere === true ? { anliegen: true } : {};
  z.schritt = Math.max(0, Math.min(z.schritt | 0, SCHRITTE.length - 1));
  z.erreicht = Math.max(z.schritt, z.erreicht | 0);

  function sichern() {
    // Nur Auswahlwerte, keine Freitexte.
    H.schreib(SPEICHER, { schritt: z.schritt, erreicht: z.erreicht, phase: z.phase, anliegen: z.anliegen,
      mehrwert: z.mehrwert, umfang: z.umfang, rahmen: z.rahmen, weitere: z.weitere });
  }

  function option(name, o, gewaehlt) {
    return '<label class="option"><input type="radio" name="' + name + '" value="' + esc(o.id) + '"' + (gewaehlt === o.id ? " checked" : "") + ">" +
      '<span class="option-text"><b>' + esc(o.name) + "</b>" + (o.hilfe ? "<span>" + esc(o.hilfe) + "</span>" : "") + "</span></label>";
  }

  function zeichneFortschritt() {
    fortschritt.innerHTML = SCHRITTE.map(function (s, i) {
      var aktuell = i === z.schritt;
      var erreichbar = i <= z.erreicht;
      var inhalt = '<span class="nr" aria-hidden="true">' + (i + 1) + "</span><span>" + esc(s.titel) + "</span>";
      var zustand = aktuell ? "aktuell" : erreichbar ? "erledigt" : "";
      if (erreichbar && !aktuell) {
        return '<li class="' + zustand + '"><button type="button" data-gehe="' + i + '">' + inhalt +
          '<span class="sr-only"> (Schritt ' + (i + 1) + " von " + SCHRITTE.length + ", ändern)</span></button></li>";
      }
      return '<li class="' + zustand + '"' + (aktuell ? ' aria-current="step"' : "") + '><span class="ohne">' + inhalt +
        '<span class="sr-only"> (Schritt ' + (i + 1) + " von " + SCHRITTE.length + ")</span></span></li>";
    }).join("");
  }

  /* Angaben zur Klasse: freiwillig, aufklappbar unter der Umfang-Frage. Offen, sobald etwas gewählt ist. */
  function rahmenHtml() {
    var gewaehlt = Object.keys(z.rahmen).length;
    var html = '<details class="mehr rahmen-mehr" id="rahmen-mehr"' + (gewaehlt ? " open" : "") + ">" +
      "<summary>Mehr zu deiner Klasse angeben <span class=\"leise\">(freiwillig" + (gewaehlt ? ", " + gewaehlt + " angegeben" : "") + ")</span></summary>" +
      '<p class="hilfe">Netz, Geräte, Zeit oder Datenschutz verändern die Empfehlung. Du kannst das auch überspringen.</p><div class="rahmen">';
    T.rahmen.forEach(function (r) {
      html += '<fieldset class="rahmenfrage"><legend>' + esc(r.frage) + '</legend><div class="optionen klein-optionen">' +
        r.optionen.map(function (o) { return option("rahmen-" + r.id, o, z.rahmen[r.id]); }).join("") +
        option("rahmen-" + r.id, { id: "", name: "weiß nicht" }, z.rahmen[r.id] ? "x" : "") + "</div></fieldset>";
    });
    return html + "</div></details>";
  }

  function zeichneSchritt() {
    var s = SCHRITTE[z.schritt];
    var html = "";
    if (s.id === "ergebnis") {
      html = ergebnisHtml();
    } else {
      var alle = s.optionen();
      var gewaehlt = z[s.id];
      var sichtbar = alle;
      var mehr = 0;
      if (s.haeufig && !z.weitere[s.id]) {
        sichtbar = alle.filter(function (o) { return s.haeufig(o) || o.id === gewaehlt; });
        mehr = alle.length - sichtbar.length;
      }
      html = '<fieldset class="frageblock" aria-labelledby="frage"><h2 class="frage" id="frage" tabindex="-1">' + esc(s.frage) + "</h2>" +
        '<p class="hilfe">' + esc(s.hilfe) + '</p><div class="optionen">' +
        sichtbar.map(function (o) { return option(s.id, o, gewaehlt); }).join("") + "</div>" +
        (mehr > 0 ? '<button type="button" class="knopf still weitere" id="weitere">Weitere anzeigen (' + mehr + ")</button>" : "") +
        "</fieldset>";
      if (s.id === "umfang") html += rahmenHtml();
    }
    form.innerHTML = html;
    zurueck.hidden = z.schritt === 0 || s.id === "ergebnis";
    weiter.hidden = s.id === "ergebnis";
    weiter.textContent = SCHRITTE[z.schritt + 1] && SCHRITTE[z.schritt + 1].id === "ergebnis" ? "Entscheidungskarte zeigen →" : "Weiter →";
    hinweis.hidden = true;
    zeichneFortschritt();
  }

  function zeigeSchritt(i, fokus) {
    z.schritt = i;
    z.erreicht = Math.max(z.erreicht, i);
    sichern();
    zeichneSchritt();
    ansage.textContent = "Schritt " + (i + 1) + " von " + SCHRITTE.length + ": " + SCHRITTE[i].titel;
    if (fokus !== false) {
      var ziel = document.getElementById(SCHRITTE[i].id === "ergebnis" ? "ergebnis-titel" : "frage");
      if (ziel) ziel.focus();
    }
  }

  /* ---------- Entscheidungskarte ---------- */
  function antworten() {
    return { phase: z.phase, anliegen: z.anliegen, mehrwert: z.mehrwert, umfang: z.umfang, rahmen: z.rahmen };
  }

  function ergebnisHtml() {
    var k = REGELN.entscheidungskarte(antworten(), BEISPIELE);
    var stufeName = T.name("einstufungen", k.einstufung);
    var offen = '<span class="offen">noch offen</span>';
    var mehrwertArt = { lernen: "möglicher Lernmehrwert", organisation: "organisatorischer Nutzen", offen: "noch unklar" }[k.mehrwertArt];
    var rollen = k.rollen.map(function (r) {
      var x = T.rollen.filter(function (y) { return y.id === r; })[0];
      return "<b>" + esc(x.name) + "</b> – " + esc(x.hilfe);
    }).join("<br>");

    var bsp;
    if (k.beispiele.length) {
      bsp = (k.gelockert ? '<p class="lockerung">Für alle gewählten Merkmale gibt es noch kein exaktes Beispiel. Deshalb zeigen wir dir die nächstpassenden Ideen.</p>' : "") +
        (k.ohneNetz ? '<p class="leise klein">Ohne Netz zeigen wir nur Beispiele, die nicht online geöffnet werden müssen.</p>' : "") +
        '<ul class="minis">' + k.beispiele.map(H.miniKarte).join("") + "</ul>";
    } else {
      bsp = '<p class="box">Für diese Angaben gibt es noch kein Beispiel. In der <a href="galerie.html">Galerie</a> findest du alle Ideen.</p>';
    }

    return '<section class="entscheidung stufe-' + k.einstufung + '" aria-labelledby="ergebnis-titel">' +
      '<p class="karte-marker">Deine Entscheidungskarte</p>' +
      '<h2 id="ergebnis-titel" tabindex="-1">' + esc(stufeName) + "</h2>" +
      '<p class="begruendung">' + esc(k.begruendung) + "</p>" +
      '<dl class="felder">' +
        "<div><dt>Lernzweck</dt><dd>" + (k.lernzweck && k.lernzweck !== "offen" ? esc(T.name("anliegen", k.lernzweck)) : offen) +
          (z.phase && z.phase !== "offen" ? ' <span class="leise">in der Phase ' + esc(T.name("phasen", z.phase)) + "</span>" : "") + "</dd></div>" +
        "<div><dt>Art des Mehrwerts</dt><dd>" + (k.mehrwert && k.mehrwert !== "unklar" ? esc(T.name("mehrwerte", k.mehrwert)) + ' <span class="leise">(' + mehrwertArt + ")</span>" : offen) + "</dd></div>" +
        "<div><dt>Empfohlener Umfang</dt><dd><b>" + esc(T.name("umfang", k.umfang)) + "</b> – " + esc(k.umfangGrund) + "</dd></div>" +
        "<div><dt>Rolle der Lehrkraft</dt><dd>" + rollen + "</dd></div>" +
        "<div><dt>Nötige Anpassung</dt><dd>" + esc(k.anpassung) + "</dd></div>" +
        "<div><dt>Wichtigster Stolperstein</dt><dd>" + esc(k.stolperstein) + "</dd></div>" +
      "</dl>" +
      '<div class="naechster"><h3>Dein nächster Schritt</h3><p>' + esc(k.naechsterSchritt) + "</p></div>" +
      '<h3 class="minis-titel">Passende Beispiele</h3>' + bsp +
      '<p class="schluss">' + esc(k.schluss) + "</p>" +
      '<div class="ergebnis-aktionen">' +
        '<button type="button" class="knopf still" data-gehe="0">Antworten ändern</button>' +
        '<button type="button" class="knopf still" id="neu">Neu starten</button>' +
        '<a class="knopf" href="galerie.html" id="zum-showroom">In der Galerie weitersuchen</a>' +
      "</div></section>";
  }

  /* ---------- Bedienung ---------- */
  form.addEventListener("change", function (e) {
    var t = e.target;
    if (t.type !== "radio") return;
    if (t.name.indexOf("rahmen-") === 0) {
      var id = t.name.slice(7);
      if (t.value) z.rahmen[id] = t.value; else delete z.rahmen[id];
    } else {
      z[t.name] = t.value;
    }
    hinweis.hidden = true;
    sichern();
  });

  form.addEventListener("submit", function (e) { e.preventDefault(); vor(); });

  document.addEventListener("click", function (e) {
    var g = e.target.closest("[data-gehe]");
    if (g) { zeigeSchritt(parseInt(g.getAttribute("data-gehe"), 10)); return; }
    if (e.target.closest("#weitere")) {
      z.weitere[SCHRITTE[z.schritt].id] = true; sichern(); zeichneSchritt();
      var ziel = form.querySelector(".option input:checked") || form.querySelector(".option input");
      if (ziel) ziel.focus();
      return;
    }
    if (e.target.closest("#neu")) { neuStart(); return; }
    if (e.target.closest("#zum-showroom")) {
      // Galerie mit Phase und Anliegen aus dem Weg öffnen
      H.schreib("showroom", { bereich: "lernen", phase: z.phase && z.phase !== "offen" ? z.phase : "",
        anliegen: z.anliegen && z.anliegen !== "offen" ? z.anliegen : "" });
    }
  });

  function vor() {
    var s = SCHRITTE[z.schritt];
    if (s.optionen && !z[s.id]) {
      hinweis.textContent = "Wähle eine Antwort. Auch »noch nicht sicher« ist möglich.";
      hinweis.hidden = false;
      return;
    }
    if (z.schritt < SCHRITTE.length - 1) zeigeSchritt(z.schritt + 1);
  }
  weiter.addEventListener("click", vor);
  zurueck.addEventListener("click", function () { if (z.schritt > 0) zeigeSchritt(z.schritt - 1); });

  function neuStart() {
    z = leer();
    H.schreib(SPEICHER, null);
    zeigeSchritt(0);
  }
  document.getElementById("loeschen").addEventListener("click", function () {
    H.loescheAlles();
    z = leer();
    zeigeSchritt(0);
    ansage.textContent = "Alle Eingaben wurden gelöscht.";
  });

  zeigeSchritt(z.schritt, false);
})();
