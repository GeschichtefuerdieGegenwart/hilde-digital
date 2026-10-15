/* Hilde Digital – Weg A »KI für meine Arbeit«: fünf Schritte bis zu einer guten Anfrage und ihrer Prüfung.
   Keine KI-Anbindung, keine simulierte Antwort. Die Anfrage wird nur gebaut, angezeigt und kopiert.
   Gespeichert werden nur Auswahlwerte (Ziel, Ergebnisform, Niveau, Prüfliste), nie Freitexte.
   Braucht: KI_TEXTE, KI_ANFRAGE, BEISPIELE, HILDE. */
(function () {
  "use strict";
  var K = KI_TEXTE, A = KI_ANFRAGE, H = HILDE, esc = H.esc;
  var SPEICHER = "kiweg";

  var SCHRITTE = [
    { id: "ziel", titel: "Ziel", frage: "Wobei soll KI dich unterstützen?", hilfe: "Wähle eine Aufgabe. Klein anfangen ist ausdrücklich gut." },
    { id: "form", titel: "Ergebnis", frage: "Was möchtest du am Ende erhalten?", hilfe: "Hier stehen nur Formen, die zu deinem Ziel passen." },
    { id: "kontext", titel: "Kontext", frage: "Worum geht es genau?", hilfe: "Wenige Angaben reichen. Alle Felder sind freiwillig." },
    { id: "anfrage", titel: "Anfrage", frage: "Deine Anfrage", hilfe: "Du kannst jeden Baustein direkt ändern." },
    { id: "pruefen", titel: "Prüfen", frage: "Prüfe das Ergebnis der KI", hilfe: "KI kann sich irren. Du entscheidest, was du übernimmst." }
  ];

  var form = document.getElementById("weg");
  var fortschritt = document.getElementById("fortschritt");
  var ansage = document.getElementById("ansage");
  var hinweis = document.getElementById("hinweis");
  var zurueck = document.getElementById("zurueck");
  var weiter = document.getElementById("weiter");

  function leer() { return { schritt: 0, erreicht: 0, ziel: null, form: null, niveau: "", geprueft: [] }; }
  var z = H.lies(SPEICHER) || leer();
  if (!Array.isArray(z.geprueft)) z.geprueft = [];
  z.schritt = Math.max(0, Math.min(z.schritt | 0, SCHRITTE.length - 1));
  z.erreicht = Math.max(z.schritt, z.erreicht | 0);
  // Freitexte nur im Arbeitsspeicher dieser Seite
  var text = { fach: "", thema: "", gruppe: "", besonderes: "" };
  var bearbeitet = null, signatur = "";

  function sichern() {
    H.schreib(SPEICHER, { schritt: z.schritt, erreicht: z.erreicht, ziel: z.ziel, form: z.form, niveau: z.niveau, geprueft: z.geprueft });
  }
  function finde(liste, id) { for (var i = 0; i < liste.length; i++) if (liste[i].id === id) return liste[i]; return null; }

  function option(name, o, gewaehlt) {
    return '<label class="option"><input type="radio" name="' + name + '" value="' + esc(o.id) + '"' + (gewaehlt === o.id ? " checked" : "") + ">" +
      '<span class="option-text"><b>' + esc(o.name) + "</b>" + (o.hilfe ? "<span>" + esc(o.hilfe) + "</span>" : "") + "</span></label>";
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
  }

  function kopf(s) {
    return '<h2 class="frage" id="frage" tabindex="-1">' + esc(s.frage) + '</h2><p class="hilfe">' + esc(s.hilfe) + "</p>";
  }

  function antworten() {
    return { ziel: z.ziel, form: z.form, kontext: { fach: text.fach, thema: text.thema, gruppe: text.gruppe, niveau: z.niveau, besonderes: text.besonderes } };
  }

  /* Bausteine neu bauen, wenn sich die Angaben geändert haben. Eigene Änderungen bleiben sonst erhalten. */
  function aktuelleBausteine() {
    var sig = JSON.stringify(antworten());
    if (!bearbeitet || sig !== signatur) { bearbeitet = A.bausteine(antworten()); signatur = sig; }
    return bearbeitet;
  }

  function zeichneSchritt() {
    var s = SCHRITTE[z.schritt], html = "";
    if (s.id === "ziel" || s.id === "form") {
      var liste = s.id === "ziel" ? K.ziele : A.formenFuer(z.ziel);
      html = '<fieldset class="frageblock" aria-labelledby="frage">' + kopf(s) + '<div class="optionen">' +
        liste.map(function (o) { return option(s.id, o, z[s.id]); }).join("") + "</div></fieldset>";
    } else if (s.id === "kontext") {
      html = '<div class="frageblock">' + kopf(s) +
        '<p class="datenhinweis" id="datenhinweis"><b>Wichtig:</b> ' + esc(K.datenhinweis) + "</p>" +
        '<div class="felder-eingabe">' +
        K.kontext.map(function (f) {
          var id = "k-" + f.id;
          var feld = f.lang
            ? '<textarea id="' + id + '" name="' + f.id + '" rows="3" aria-describedby="' + id + '-b datenhinweis">' + esc(text[f.id]) + "</textarea>"
            : '<input type="text" id="' + id + '" name="' + f.id + '" value="' + esc(text[f.id]) + '" autocomplete="off" aria-describedby="' + id + '-b datenhinweis">';
          return '<div class="eingabe"><label for="' + id + '">' + esc(f.name) + (f.optional ? ' <span class="leise">(optional)</span>' : "") + "</label>" +
            feld + '<span class="leise klein" id="' + id + '-b">' + esc(f.beispiel) + "</span></div>";
        }).join("") +
        '<div class="eingabe"><label for="k-niveau">Niveau <span class="leise">(optional)</span></label><select id="k-niveau" name="niveau">' +
        K.niveaus.map(function (n) { return '<option value="' + n.id + '"' + (z.niveau === n.id ? " selected" : "") + ">" + esc(n.name) + "</option>"; }).join("") +
        "</select></div></div></div>";
    } else if (s.id === "anfrage") {
      var b = aktuelleBausteine();
      html = '<div class="frageblock">' + kopf(s) + '<div class="bausteine">' +
        K.bausteine.map(function (x) {
          return '<div class="baustein"><label for="b-' + x.id + '"><b>' + esc(x.name) + '</b></label><p class="leise klein" id="b-' + x.id + '-w">' + esc(x.warum) + "</p>" +
            '<textarea id="b-' + x.id + '" data-baustein="' + x.id + '" rows="' + Math.max(2, String(b[x.id]).split("\n").length + 1) + '" aria-describedby="b-' + x.id + '-w">' + esc(b[x.id]) + "</textarea></div>";
        }).join("") + "</div>" +
        '<div class="kopieren"><button type="button" class="knopf" id="kopieren">Prompt kopieren</button><span id="kopiert" class="leise" aria-live="polite"></span></div>' +
        '<div id="rueckfall" hidden><label for="gesamt"><b>Die ganze Anfrage</b> – markiere den Text und kopiere ihn (Strg + C oder Cmd + C).</label><textarea id="gesamt" rows="12" readonly></textarea></div>' +
        '<p class="bereit">Dieser Prompt ist bereit. Kopiere ihn in ein an deiner Schule freigegebenes KI-System.</p></div>';
    } else {
      var punkte = A.pruefliste(z.ziel);
      var bsp = finde(BEISPIELE, K.beispielZuZiel[z.ziel] || "anleitertreffen");
      var digital = ["erstellen", "vereinfachen", "planen", "ideen", "ausprobieren"].indexOf(z.ziel) > -1;
      html = '<fieldset class="frageblock" aria-labelledby="frage">' + kopf(s) +
        '<div class="pruefliste">' + punkte.map(function (p, i) {
          return '<label class="haken"><input type="checkbox" data-pruef="' + i + '"' + (z.geprueft.indexOf(i) > -1 ? " checked" : "") + "><span>" + esc(p) + "</span></label>";
        }).join("") + "</div></fieldset>" +
        '<section class="naechste" aria-labelledby="naechste-titel"><h3 id="naechste-titel">Nächste Schritte</h3><ol class="naechste-liste">' +
        "<li><b>Anpassen:</b> Übernimm nur, was zu deiner Klasse passt. Das Ergebnis darf ganz auf Papier bleiben.</li>" +
        (digital
          ? '<li><b>Digital einsetzen?</b> Prüfe im <a href="tablets.html">Weg »Unterricht mit Tablets«</a>, ob das Tablet beim Lernen wirklich hilft.</li>'
          : '<li><b>Noch eine Aufgabe?</b> <button type="button" class="linkknopf" id="neu2">Starte den Weg neu</button> mit einer anderen Aufgabe.</li>') +
        (bsp ? "<li><b>Beispiel ansehen:</b> So kann ein mit KI überarbeitetes Ergebnis aussehen.<ul class=\"minis\">" + H.miniKarte(bsp) + "</ul></li>" : "") +
        "</ol></section>" +
        '<div class="ergebnis-aktionen"><button type="button" class="knopf still" data-gehe="0">Antworten ändern</button>' +
        '<button type="button" class="knopf still" id="neu">Neu starten</button><a class="knopf" href="showroom.html">Zum Showroom</a></div>';
    }
    form.innerHTML = html;
    zurueck.hidden = z.schritt === 0 || s.id === "pruefen";
    weiter.hidden = s.id === "pruefen";
    weiter.textContent = s.id === "kontext" ? "Anfrage bauen →" : s.id === "anfrage" ? "Ergebnis prüfen →" : "Weiter →";
    hinweis.hidden = true;
    zeichneFortschritt();
  }

  function zeigeSchritt(i, fokus) {
    // Ergebnisform muss zum Ziel passen
    if (z.form && !A.formenFuer(z.ziel).some(function (f) { return f.id === z.form; })) z.form = null;
    if (i > 1 && !z.form) i = 1;
    if (i > 0 && !z.ziel) i = 0;
    z.schritt = i;
    z.erreicht = Math.max(z.erreicht, i);
    sichern();
    zeichneSchritt();
    ansage.textContent = "Schritt " + (i + 1) + " von " + SCHRITTE.length + ": " + SCHRITTE[i].titel;
    if (fokus !== false) { var f = document.getElementById("frage"); if (f) f.focus(); }
  }

  form.addEventListener("change", function (e) {
    var t = e.target;
    if (t.type === "radio") {
      z[t.name] = t.value;
      if (t.name === "ziel") z.geprueft = [];
    } else if (t.name === "niveau") {
      z.niveau = t.value;
    } else if (t.type === "checkbox") {
      var i = parseInt(t.getAttribute("data-pruef"), 10);
      z.geprueft = z.geprueft.filter(function (x) { return x !== i; });
      if (t.checked) z.geprueft.push(i);
    }
    hinweis.hidden = true;
    sichern();
  });
  form.addEventListener("input", function (e) {
    var t = e.target;
    if (t.hasAttribute("data-baustein")) { aktuelleBausteine()[t.getAttribute("data-baustein")] = t.value; return; }
    if (Object.prototype.hasOwnProperty.call(text, t.name)) text[t.name] = t.value;
  });
  form.addEventListener("submit", function (e) { e.preventDefault(); vor(); });

  function kopieren() {
    var gesamt = A.alsText(aktuelleBausteine());
    var status = document.getElementById("kopiert");
    var rueckfall = document.getElementById("rueckfall");
    var feld = document.getElementById("gesamt");
    feld.value = gesamt;
    function zeigeRueckfall() {
      rueckfall.hidden = false;
      feld.focus(); feld.select();
      status.textContent = "Kopieren war nicht möglich. Der Text ist markiert – kopiere ihn selbst.";
    }
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(gesamt).then(function () {
          status.textContent = "Kopiert. Füge die Anfrage jetzt in dein KI-System ein.";
        }, zeigeRueckfall);
      } else { zeigeRueckfall(); }
    } catch (e) { zeigeRueckfall(); }
  }

  document.addEventListener("click", function (e) {
    var g = e.target.closest("[data-gehe]");
    if (g) { zeigeSchritt(parseInt(g.getAttribute("data-gehe"), 10)); return; }
    if (e.target.closest("#kopieren")) { kopieren(); return; }
    if (e.target.closest("#neu") || e.target.closest("#neu2")) { neuStart(); }
  });

  function vor() {
    var s = SCHRITTE[z.schritt];
    if ((s.id === "ziel" || s.id === "form") && !z[s.id]) {
      hinweis.textContent = s.id === "ziel" ? "Wähle ein Ziel. »KI erst einmal ausprobieren« ist ein guter Anfang." : "Wähle eine Ergebnisform.";
      hinweis.hidden = false;
      return;
    }
    if (z.schritt < SCHRITTE.length - 1) zeigeSchritt(z.schritt + 1);
  }
  weiter.addEventListener("click", vor);
  zurueck.addEventListener("click", function () { if (z.schritt > 0) zeigeSchritt(z.schritt - 1); });

  function neuStart() {
    z = leer();
    text = { fach: "", thema: "", gruppe: "", besonderes: "" };
    bearbeitet = null;
    H.schreib(SPEICHER, null);
    zeigeSchritt(0);
  }
  document.getElementById("loeschen").addEventListener("click", function () {
    H.loescheAlles();
    neuStart();
    ansage.textContent = "Alle Eingaben wurden gelöscht.";
  });

  zeigeSchritt(z.schritt, false);
})();
