/* Hilde Digital – Digital-Check, Weg A »Selbst prüfen«: sechs Schritte bis zum Bericht.
   Stufe 2 und 5 des KI-Entwicklungskonzepts, aber ohne KI: ein regelbasierter Fragenablauf,
   der das gekoppelte Profil zeigt und beratende Fragen stellt. Nichts wird übertragen.
   Gespeichert werden nur Auswahlwerte, nie Freitexte. Fachbegriffe stehen nur in Vertiefungen.
   Braucht: TAXONOMIEN, BEISPIELE, QUALITAET, CHECK, HILDE. */
(function () {
  "use strict";
  var Q = QUALITAET, H = HILDE, esc = H.esc;
  var SPEICHER = "selbstcheck";

  var SCHRITTE = [
    { id: "material", titel: "Material", frage: "Was möchtest du prüfen?",
      hilfe: "Der Typ bestimmt, welche Bereiche besonders wichtig sind. Bei fremdem Material ist der Check nur eine Notiz für deine eigene Planung." },
    { id: "bereiche", titel: "Bereiche", frage: "Was soll dein Material vor allem leisten?",
      hilfe: "Die wichtigsten Bereiche für deinen Materialtyp sind schon ausgewählt. Drei bis sechs Bereiche reichen." },
    { id: "qualitaet", titel: "Qualität", frage: "Wie gut ist das im Material angelegt?",
      hilfe: "Schau auf das Lernen, nicht auf die Technik. Liegt dein Material zwischen zwei Stufen, wähle die niedrigere." },
    { id: "beitrag", titel: "Digitaler Beitrag", frage: "Was trägt die digitale Form dazu bei?",
      hilfe: "Vergleiche mit einer echten Alternative auf Papier. Sie muss in derselben Zeit machbar sein." },
    { id: "rahmen", titel: "Rahmen", frage: "Was gilt sonst noch?",
      hilfe: "Diese Angaben zählen nicht mit. Sie entscheiden aber, ob Stärken sichtbar werden dürfen." },
    { id: "bericht", titel: "Bericht" }
  ];

  var form = document.getElementById("weg");
  var fortschritt = document.getElementById("fortschritt");
  var ansage = document.getElementById("ansage");
  var hinweis = document.getElementById("hinweis");
  var zurueck = document.getElementById("zurueck");
  var weiter = document.getElementById("weiter");

  function leer() { return { schritt: 0, erreicht: 0, typ: null, bereiche: [], werte: {}, rahmen: {}, weitere: false }; }
  var z = H.lies(SPEICHER) || leer();
  ["bereiche"].forEach(function (k) { if (!Array.isArray(z[k])) z[k] = []; });
  if (!z.werte || typeof z.werte !== "object") z.werte = {};
  if (!z.rahmen || typeof z.rahmen !== "object") z.rahmen = {};
  z.schritt = Math.max(0, Math.min(z.schritt | 0, SCHRITTE.length - 1));
  z.erreicht = Math.max(z.schritt, z.erreicht | 0);
  var text = { titel: "", ziel: "" }; // Freitexte nur im Speicher dieser Seite

  function sichern() {
    H.schreib(SPEICHER, { schritt: z.schritt, erreicht: z.erreicht, typ: z.typ, bereiche: z.bereiche,
      werte: z.werte, rahmen: z.rahmen, weitere: z.weitere });
  }
  function finde(liste, id) { for (var i = 0; i < liste.length; i++) if (liste[i].id === id) return liste[i]; return null; }
  function typ() { return finde(Q.materialtypen, z.typ); }
  function bereich(id) { return finde(Q.bereiche, id); }
  function wert(id) { if (!z.werte[id]) z.werte[id] = {}; return z.werte[id]; }

  function option(name, wertId, titel, hilfe, gewaehlt, extra) {
    return '<label class="option"><input type="radio" name="' + esc(name) + '" value="' + esc(wertId) + '"' +
      (String(gewaehlt) === String(wertId) ? " checked" : "") + (extra || "") + ">" +
      '<span class="option-text"><b>' + esc(titel) + "</b>" + (hilfe ? "<span>" + esc(hilfe) + "</span>" : "") + "</span></label>";
  }

  function vertiefung(d) {
    return '<details class="mehr bereich-vertiefung"><summary>Mehr zu diesem Bereich</summary>' +
      '<p class="klein"><b>Fachbegriff:</b> ' + esc(d.fachname) + " (Abschnitt " + esc(d.nr) + " im Qualitätsmodell)</p>" +
      '<p class="klein"><b>So ginge es auf Papier:</b> ' + esc(d.analog) + ".</p>" +
      '<p class="klein"><b>Darauf achten:</b> ' + esc(d.risiko) + "</p></details>";
  }

  function zeichneFortschritt() {
    fortschritt.innerHTML = SCHRITTE.map(function (s, i) {
      var aktuell = i === z.schritt, erreichbar = i <= z.erreicht;
      var inhalt = '<span class="nr" aria-hidden="true">' + (i + 1) + "</span><span>" + esc(s.titel) + "</span>";
      var zustand = aktuell ? "aktuell" : erreichbar ? "erledigt" : "";
      if (erreichbar && !aktuell) {
        return '<li class="' + zustand + '"><button type="button" data-gehe="' + i + '">' + inhalt +
          '<span class="sr-only"> (Schritt ' + (i + 1) + " von " + SCHRITTE.length + ", ändern)</span></button></li>";
      }
      return '<li class="' + zustand + '"' + (aktuell ? ' aria-current="step"' : "") + '><span class="ohne">' + inhalt +
        '<span class="sr-only"> (Schritt ' + (i + 1) + " von " + SCHRITTE.length + ")</span></span></li>";
    }).join("");
    // Sichtbar neben den Stanzloch-Punkten (ab Version 4.8); für Vorleseprogramme steht es schon im Schritt und in der Ansage.
    var stand = document.getElementById("schritte-stand");
    if (stand) stand.textContent = "Schritt " + (z.schritt + 1) + " von " + SCHRITTE.length;
  }

  function kopf(s) {
    return '<h2 class="frage" id="frage" tabindex="-1">' + esc(s.frage) + '</h2><p class="hilfe">' + esc(s.hilfe) + "</p>";
  }

  /* ---------- Schritte ---------- */
  function schrittMaterial(s) {
    return '<fieldset class="frageblock" aria-labelledby="frage">' + kopf(s) +
      '<div class="optionen">' + Q.materialtypen.map(function (t) { return option("typ", t.id, t.name, t.hilfe, z.typ); }).join("") + "</div></fieldset>" +
      '<div class="felder-eingabe">' +
        '<div class="eingabe"><label for="titel">Wie heißt dein Material? <span class="leise">(freiwillig)</span></label>' +
        '<input type="text" id="titel" name="titel" autocomplete="off" value="' + esc(text.titel) + '"></div>' +
        '<div class="eingabe"><label for="ziel">Was sollen die Lernenden am Ende können? <span class="leise">(freiwillig, ein Satz)</span></label>' +
        '<input type="text" id="ziel" name="ziel" autocomplete="off" value="' + esc(text.ziel) + '"></div>' +
      '</div><p class="leise klein">Diese beiden Felder werden nicht gespeichert. Keine Namen von Lernenden eintragen.</p>';
  }

  function schrittBereiche(s) {
    var t = typ();
    var kern = t ? t.kern : [];
    var andere = Q.bereiche.filter(function (d) { return kern.indexOf(d.id) < 0; });
    var sichtbarAndere = z.weitere ? andere : andere.filter(function (d) { return z.bereiche.indexOf(d.id) >= 0; });
    function box(d, istKern) {
      var an = z.bereiche.indexOf(d.id) >= 0;
      return '<label class="option"><input type="checkbox" name="bereich" value="' + d.id + '"' + (an ? " checked" : "") + ">" +
        '<span class="option-text"><b>' + esc(d.name) + (istKern ? ' <span class="kern-marke">wichtig für ' + esc(t.name) + "</span>" : "") + "</b>" +
        "<span>" + esc(d.frage) + "</span></span></label>";
    }
    return '<fieldset class="frageblock" aria-labelledby="frage">' + kopf(s) +
      '<div class="optionen">' + kern.map(function (id) { return box(bereich(id), true); }).join("") +
      sichtbarAndere.map(function (d) { return box(d, false); }).join("") + "</div>" +
      (!z.weitere && andere.length > sichtbarAndere.length ? '<button type="button" class="knopf still weitere" id="weitere">Weitere Bereiche anzeigen (' + (andere.length - sichtbarAndere.length) + ")</button>" : "") +
      '<p class="leise klein" id="anzahl" aria-live="polite">' + z.bereiche.length + " ausgewählt</p></fieldset>";
  }

  function schrittQualitaet(s) {
    return '<div class="frageblock">' + kopf(s) + '<div class="stapel-gross bereich-fragen">' + z.bereiche.map(function (id, i) {
      var d = bereich(id), w = wert(id);
      var gewaehlt = w.a === null ? "nb" : w.a;
      return '<fieldset class="bereichsfrage"><legend><span class="leise klein">' + (i + 1) + " von " + z.bereiche.length + " · " + esc(d.name) + "</span><br>" + esc(d.frage) + "</legend>" +
        '<div class="optionen stufen-optionen">' + d.a.map(function (anker, stufe) {
          return option("a-" + id, stufe, stufe + " · " + Q.stufenA[stufe], anker, gewaehlt);
        }).join("") + option("a-" + id, "nb", "kann ich nicht beurteilen", "zum Beispiel, weil es sich erst im Unterricht zeigt", gewaehlt) +
        "</div>" + vertiefung(d) + "</fieldset>";
    }).join("") + "</div></div>";
  }

  function schrittBeitrag(s) {
    var t = typ();
    var bewertet = z.bereiche.filter(function (id) { return typeof wert(id).a === "number"; });
    if (!bewertet.length) {
      return '<div class="frageblock">' + kopf(s) + '<p class="box">Du hast noch keinen Bereich eingeschätzt. Gehe einen Schritt zurück oder lass diesen Schritt aus.</p></div>';
    }
    return '<div class="frageblock">' + kopf(s) +
      (t && t.digital === false ? '<p class="notiz">Bei einem Arbeitsblatt auf Papier ist »nicht relevant« eine gute Antwort. Ein Material ohne digitalen Beitrag kann sehr gut sein.</p>' : "") +
      '<div class="stapel-gross bereich-fragen">' + bewertet.map(function (id, i) {
        var d = bereich(id), w = wert(id);
        var schwach = w.a <= 1;
        var gewaehlt = w.b === undefined ? "" : w.b;
        var opts = option("b-" + id, 0, "0 · " + Q.stufenB[0], "Auf Papier ginge es genauso gut.", gewaehlt) +
          d.b.map(function (anker, k) {
            var stufe = k + 1;
            var gesperrt = schwach && stufe > 1;
            return option("b-" + id, stufe, stufe + " · " + Q.stufenB[stufe], anker + (gesperrt ? " – erst ab solider Qualität möglich" : ""), gewaehlt, gesperrt ? " disabled" : "");
          }).join("") +
          option("b-" + id, "nr", "nicht relevant", "Das Material ist hier analog, oder es gibt keine digitale Funktion.", gewaehlt);
        var analog = typeof w.b === "number" && w.b >= 1;
        return '<fieldset class="bereichsfrage"><legend><span class="leise klein">' + (i + 1) + " von " + bewertet.length + " · " + esc(d.name) +
          " · Qualität " + w.a + " von 4</span><br>Was trägt die digitale Form zu »" + esc(d.name) + "« bei?</legend>" +
          (schwach ? '<p class="leise klein">Die Qualität ist hier noch schwach angelegt. Technik kann das nicht ausgleichen. Deshalb zählt der Beitrag höchstens als gering.</p>' : "") +
          '<div class="optionen stufen-optionen">' + opts + "</div>" +
          '<fieldset class="analogfrage" data-analog="' + id + '"' + (analog ? "" : " hidden") + "><legend>Ginge es auf Papier genauso? <span class=\"leise\">Zum Beispiel: " + esc(d.analog) + "</span></legend>" +
          '<div class="optionen klein-optionen">' + Q.analogvergleich.map(function (v) { return option("v-" + id, v.id, v.name, "", w.analog); }).join("") + "</div></fieldset>" +
          vertiefung(d) + "</fieldset>";
      }).join("") + "</div></div>";
  }

  function schrittRahmen(s) {
    return '<fieldset class="frageblock" aria-labelledby="frage">' + kopf(s) + '<div class="rahmen">' + CHECK.rahmenFragen(z.typ).map(function (r) {
      return '<fieldset class="rahmenfrage"><legend>' + esc(r.frage) + '</legend><div class="optionen klein-optionen">' +
        r.optionen.map(function (o) { return option("r-" + r.id, o.id, o.name, "", z.rahmen[r.id]); }).join("") +
        option("r-" + r.id, "", "weiß nicht", "", z.rahmen[r.id] ? "x" : "") + "</div></fieldset>";
    }).join("") + "</div></fieldset>";
  }

  /* ---------- Bericht ---------- */
  function punkte(n, max, digital) {
    var h = '<span class="punkte' + (digital ? " digital" : "") + '" aria-hidden="true">';
    for (var i = 0; i < max; i++) h += "<i" + (n !== null && i < n ? ' class="voll"' : "") + "></i>";
    return h + "</span>";
  }

  /* Galerie-Beispiele zum Anliegen des ersten Entwicklungsschritts, sonst der ersten Stärke. */
  function beispieleFuer(r) {
    var kandidaten = r.schritte.map(function (s) { return s.bereich; })
      .concat(r.staerken.map(function (x) { return x.id; }), r.profil.map(function (x) { return x.id; }));
    var d = null;
    for (var i = 0; i < kandidaten.length && !d; i++) { var k = bereich(kandidaten[i]); if (k && k.anliegen) d = k; }
    if (!d) return { d: null, liste: [] };
    var liste = BEISPIELE.filter(function (b) { return b.link && b.vorschauArt !== "konzept" && b.anliegen.indexOf(d.anliegen) >= 0; })
      .sort(function (a, b) { return (b.status === "im Unterricht erprobt") - (a.status === "im Unterricht erprobt"); })
      .slice(0, 2);
    return { d: d, liste: liste };
  }

  function anfrage(r) {
    var t = typ();
    var zeilen = [
      "Du begleitest mich als Lehrkraft an einer beruflichen Schule bei der Selbstkontrolle eines eigenen Unterrichtsmaterials.",
      "Bewerte nicht und vergib keine Noten. Stelle mir immer nur eine Frage und warte auf meine Antwort.",
      "",
      "Material: " + (t ? t.name : "noch offen") + (text.titel.trim() ? " – " + text.titel.trim() : ""),
      "Lernziel: " + (text.ziel.trim() || "Frage mich zuerst danach."),
      "",
      "Meine eigene Einschätzung:"
    ];
    r.profil.forEach(function (x) {
      zeilen.push("- " + x.bereich.name + ": " + (x.a === null ? "noch nicht beurteilbar" :
        "Qualität " + x.a + " von 4, digitaler Beitrag " + (typeof x.b === "number" ? x.b + " von 3" : "nicht relevant")));
    });
    zeilen.push("", "Gehe so vor:",
      "1. Frage, was die Lernenden an einer Stelle des Materials denken oder tun sollen.",
      "2. Frage, welche digitale Funktion das unterstützt.",
      "3. Frage, was dadurch besser oder erst möglich wird.",
      "4. Bitte mich um einen Vergleich mit einer Alternative auf Papier.",
      "5. Nenne mögliche Stärken, die ich im Material belegen kann.",
      "6. Weise auf Risiken und fehlende Aspekte hin.",
      "7. Schlage höchstens drei Fragen zur Weiterentwicklung vor.",
      "", "Regeln:",
      "- Sprich von Potenzial, nicht von Wirkung. Was im Unterricht geschieht, weißt du nicht.",
      "- Ergänze keine fehlenden Informationen. Frage nach.",
      "- Prüfe Fachliches nicht selbst. Nenne nur Punkte, die eine Fachperson prüfen sollte.",
      "- Ich entscheide.");
    return zeilen.join("\n");
  }

  function berichtHtml() {
    var r = CHECK.bericht({ typ: z.typ, bereiche: z.bereiche, werte: z.werte, rahmen: z.rahmen });
    var t = typ();
    var titel = text.titel.trim() ? "»" + text.titel.trim() + "«" : (t ? t.name : "Dein Material");
    var sicherText = {
      mittel: ["mittel", "Du hast das ganze Material eingeschätzt. Ein Selbstcheck einer Person erreicht höchstens diese Stufe."],
      vorlaeufig: ["vorläufig", "Ein Teil ist offen oder du hattest nur einen Teil des Materials vor dir."],
      fehlt: ["zu wenig Information", "Es ist noch kein Bereich eingeschätzt."]
    }[r.sicherheit];

    var staerken = r.staerken.length
      ? '<ul class="leitsaetze">' + r.staerken.map(function (x) { return "<li><b>" + esc(x.bereich.name) + ":</b> " + esc(x.bereich.a[x.a]) + "</li>"; }).join("") + "</ul>"
      : "<p>Noch kein Bereich ist deutlich ausgeprägt. Im Profil siehst du, wo schon eine Grundlage liegt.</p>";

    var hinweise = r.hinweise.length
      ? '<ul class="label-vorschau" aria-label="Mögliche Stärke-Hinweise">' + r.hinweise.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul>" +
        '<p class="leise klein">Diese Hinweise sind nicht veröffentlicht. In der Galerie erscheinen sie erst nach Prüfung und Freigabe.</p>'
      : '<p class="leise klein">' + (r.fachlichOffen ? "Stärke-Hinweise erscheinen erst, wenn der Inhalt fachlich geprüft ist." :
          r.sicherheit !== "mittel" ? "Stärke-Hinweise erscheinen erst bei mindestens mittlerer Sicherheit." :
          "Für einen Stärke-Hinweis braucht ein Bereich mindestens Stufe 3.") + "</p>";

    var profil = '<div class="profil-beispiel">' + r.profil.map(function (x, i) {
      var b = typeof x.b === "number" ? x.b : null;
      return '<div class="profil-zeile"><p class="profil-name">' + esc(x.bereich.name) + (x.kern ? ' <span class="kern-marke">Kernbereich</span>' : "") + "</p>" +
        '<div class="profil-werte">' +
          "<p><span class=\"sr-only\">Pädagogische Qualität: " + (x.a === null ? "nicht beurteilbar" : x.a + " von 4") + '</span><span aria-hidden="true">Qualität</span> ' + punkte(x.a, 4, false) + "</p>" +
          "<p><span class=\"sr-only\">Digitaler Beitrag: " + (x.b === "nr" ? "nicht relevant" : b === null ? "offen" : b + " von 3") + '</span><span aria-hidden="true">digitaler Beitrag</span> ' +
            (x.b === "nr" ? '<span aria-hidden="true">nicht relevant</span>' : punkte(b, 3, true)) + "</p>" +
        '</div><p class="profil-satz">' + esc(r.saetze[i].text) + "</p></div>";
    }).join("") + '<p class="leise klein">' + esc(r.gesamt.zaehlung) + " Eine Zählung, kein Durchschnitt.</p></div>";

    var bsp = beispieleFuer(r);
    var schritte = r.schritte.length
      ? '<ol class="leitsaetze">' + r.schritte.map(function (s) { return "<li>" + esc(s.text) + ' <span class="leise">Aufwand: ' + esc(s.aufwand) + "</span></li>"; }).join("") + "</ol>"
      : "<p>Kein Bereich fällt deutlich ab. Du kannst die beratenden Fragen unten nutzen, um weiterzudenken.</p>";
    var beispiele = bsp.liste.length
      ? '<h3 class="minis-titel">In der Galerie zum Weiterdenken</h3><p class="leise klein">Beispiele zum selben Anliegen. Sie sind noch nicht nach diesem Check geprüft.</p><ul class="minis">' + bsp.liste.map(H.miniKarte).join("") + "</ul>"
      : "";

    return '<section class="entscheidung" aria-labelledby="ergebnis-titel">' +
      '<p class="karte-marker">Dein Selbstcheck · privater Entwurf</p>' +
      '<h2 id="ergebnis-titel" tabindex="-1">' + esc(titel) + "</h2>" +
      (text.ziel.trim() ? '<p class="begruendung">Ziel: ' + esc(text.ziel.trim()) + "</p>" : "") +
      '<div class="bericht">' +
        '<section><h3>1 · Besondere Stärken</h3>' + staerken + hinweise + "</section>" +
        '<section><h3>2 · Profil</h3>' + profil + "</section>" +
        '<section><h3>3 · Beitrag der digitalen Gestaltung</h3><p>' + esc(r.gesamt.text) + "</p></section>" +
        (r.grenzen.length ? '<section><h3>4 · Mögliche Grenzen</h3><ul class="leitsaetze">' + r.grenzen.map(function (g) { return "<li>" + esc(g) + "</li>"; }).join("") + "</ul></section>" : "") +
        '<section><h3>' + (r.grenzen.length ? "5" : "4") + " · Nächste Schritte</h3>" + schritte + beispiele + "</section>" +
        '<section><h3>Sicherheit: ' + esc(sicherText[0]) + '</h3><p class="leise">' + esc(sicherText[1]) + "</p></section>" +
        '<section class="naechster"><h3>Beratende Fragen für deine Planung</h3><ul class="leitsaetze">' +
          Q.beratendeFragen.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul></section>" +
        '<details class="mehr"><summary>Mit einem KI-System weiterdenken (freiwillig)</summary>' +
          '<p class="datenhinweis">Nutze nur ein an deiner Schule freigegebenes KI-System. Keine Namen, Noten oder Schülerdaten eingeben. Füge Material nur ein, wenn du die Rechte daran hast.</p>' +
          '<label for="anfrage"><b>Deine Anfrage</b> – du kannst sie ändern.</label>' +
          '<textarea id="anfrage" rows="14">' + esc(anfrage(r)) + "</textarea>" +
          '<div class="kopieren"><button type="button" class="knopf" id="kopieren">Anfrage kopieren</button><span id="kopiert" class="leise" aria-live="polite"></span></div>' +
          '<p class="leise klein">Die KI stellt dir Fragen. Sie entscheidet nichts und veröffentlicht nichts.</p>' +
        "</details>" +
      "</div>" +
      '<p class="schluss">Das ist eine Planungshilfe, keine Bewertung. Du entscheidest.</p>' +
      '<div class="ergebnis-aktionen">' +
        '<button type="button" class="knopf still" data-gehe="2">Antworten ändern</button>' +
        '<button type="button" class="knopf still" id="drucken">Drucken oder als PDF sichern</button>' +
        '<button type="button" class="knopf still" id="neu">Neu starten</button>' +
      "</div></section>";
  }

  /* ---------- Ablauf ---------- */
  function zeichneSchritt() {
    var s = SCHRITTE[z.schritt];
    var html = s.id === "material" ? schrittMaterial(s) : s.id === "bereiche" ? schrittBereiche(s) :
      s.id === "qualitaet" ? schrittQualitaet(s) : s.id === "beitrag" ? schrittBeitrag(s) :
      s.id === "rahmen" ? schrittRahmen(s) : berichtHtml();
    form.innerHTML = html;
    zurueck.hidden = z.schritt === 0 || s.id === "bericht";
    weiter.hidden = s.id === "bericht";
    weiter.textContent = s.id === "rahmen" ? "Bericht zeigen →" : "Weiter →";
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
      var ziel = document.getElementById(SCHRITTE[i].id === "bericht" ? "ergebnis-titel" : "frage");
      if (ziel) ziel.focus();
    }
  }

  function fehlt(textMeldung) { hinweis.textContent = textMeldung; hinweis.hidden = false; hinweis.scrollIntoView({ block: "nearest" }); }

  function vor() {
    var s = SCHRITTE[z.schritt];
    if (s.id === "material" && !z.typ) return fehlt("Wähle aus, was du prüfen möchtest.");
    if (s.id === "bereiche" && !z.bereiche.length) return fehlt("Wähle mindestens einen Bereich.");
    if (s.id === "qualitaet") {
      var offenA = z.bereiche.filter(function (id) { return wert(id).a === undefined; });
      if (offenA.length) return fehlt("Schätze jeden Bereich ein. »Kann ich nicht beurteilen« ist auch möglich. Noch offen: " + offenA.map(function (id) { return bereich(id).name; }).join(", ") + ".");
    }
    if (s.id === "beitrag") {
      var offenB = z.bereiche.filter(function (id) { return typeof wert(id).a === "number" && wert(id).b === undefined; });
      if (offenB.length) return fehlt("Wähle für jeden Bereich einen Beitrag. »Nicht relevant« ist auch möglich. Noch offen: " + offenB.map(function (id) { return bereich(id).name; }).join(", ") + ".");
    }
    if (z.schritt < SCHRITTE.length - 1) zeigeSchritt(z.schritt + 1);
  }

  form.addEventListener("change", function (e) {
    var t = e.target, n = t.name || "";
    if (n === "typ") {
      var neu = t.value;
      if (neu !== z.typ) {
        z.typ = neu;
        var kern = finde(Q.materialtypen, neu).kern;
        // Kernbereiche vorauswählen, bereits bewertete Bereiche behalten
        var behalten = z.bereiche.filter(function (id) { return z.werte[id] && z.werte[id].a !== undefined; });
        z.bereiche = kern.concat(behalten.filter(function (id) { return kern.indexOf(id) < 0; }));
      }
    } else if (n === "bereich") {
      var reihenfolge = Q.bereiche.map(function (d) { return d.id; });
      var an = [].slice.call(form.querySelectorAll('input[name="bereich"]:checked')).map(function (x) { return x.value; });
      var tk = typ() ? typ().kern : [];
      z.bereiche = an.sort(function (a, b) {
        var ka = tk.indexOf(a) >= 0 ? 0 : 1, kb = tk.indexOf(b) >= 0 ? 0 : 1;
        return ka - kb || reihenfolge.indexOf(a) - reihenfolge.indexOf(b);
      });
      var anz = document.getElementById("anzahl");
      if (anz) anz.textContent = z.bereiche.length + " ausgewählt" + (z.bereiche.length > 6 ? " – sechs reichen meist" : "");
    } else if (n.indexOf("a-") === 0) {
      var w = wert(n.slice(2));
      w.a = t.value === "nb" ? null : parseInt(t.value, 10);
      if (typeof w.a === "number" && w.a <= 1 && typeof w.b === "number" && w.b > 1) w.b = 1;
    } else if (n.indexOf("b-") === 0) {
      var id = n.slice(2), wb = wert(id);
      wb.b = t.value === "nr" ? "nr" : parseInt(t.value, 10);
      var feld = form.querySelector('[data-analog="' + id + '"]');
      if (feld) feld.hidden = !(typeof wb.b === "number" && wb.b >= 1);
      if (!(typeof wb.b === "number" && wb.b >= 1)) delete wb.analog;
    } else if (n.indexOf("v-") === 0) {
      wert(n.slice(2)).analog = t.value;
    } else if (n.indexOf("r-") === 0) {
      if (t.value) z.rahmen[n.slice(2)] = t.value; else delete z.rahmen[n.slice(2)];
    }
    hinweis.hidden = true;
    sichern();
  });

  form.addEventListener("input", function (e) {
    var t = e.target;
    if (t.id === "titel" || t.id === "ziel") text[t.id] = t.value;
  });
  form.addEventListener("submit", function (e) { e.preventDefault(); vor(); });

  function kopieren() {
    var feld = document.getElementById("anfrage"), status = document.getElementById("kopiert");
    function selbst() { feld.focus(); feld.select(); status.textContent = "Kopieren war nicht möglich. Der Text ist markiert – kopiere ihn selbst."; }
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(feld.value).then(function () { status.textContent = "Kopiert. Füge die Anfrage jetzt in dein KI-System ein."; }, selbst);
      } else { selbst(); }
    } catch (err) { selbst(); }
  }

  document.addEventListener("click", function (e) {
    var g = e.target.closest("[data-gehe]");
    if (g) { zeigeSchritt(parseInt(g.getAttribute("data-gehe"), 10)); return; }
    if (e.target.closest("#weitere")) {
      z.weitere = true; sichern(); zeichneSchritt();
      var ziel = form.querySelector('input[name="bereich"]'); if (ziel) ziel.focus();
      return;
    }
    if (e.target.closest("#kopieren")) { kopieren(); return; }
    if (e.target.closest("#drucken")) { window.print(); return; }
    if (e.target.closest("#neu")) { z = leer(); text = { titel: "", ziel: "" }; H.schreib(SPEICHER, null); zeigeSchritt(0); }
  });
  weiter.addEventListener("click", vor);
  zurueck.addEventListener("click", function () { if (z.schritt > 0) zeigeSchritt(z.schritt - 1); });
  document.getElementById("loeschen").addEventListener("click", function () {
    H.loescheAlles();
    z = leer(); text = { titel: "", ziel: "" };
    zeigeSchritt(0);
    ansage.textContent = "Alle Eingaben wurden gelöscht.";
  });

  zeigeSchritt(z.schritt, false);
})();
