/* Hilde Digital – Digital-Check, Weg B »Material prüfen lassen«.
   Die Auswertung steht in assets/material-regeln.js (regelbasiert, mit Tests). Keine KI, keine Übertragung.
   Der Text bleibt nur in diesem Fenster. Gespeichert wird nur, wenn du zu Weg A wechselst:
   dann Materialtyp und gefundene Bereiche als Vorauswahl – nie der Text.
   Braucht: QUALITAET, MATERIAL, HILDE. */
(function () {
  "use strict";
  var Q = QUALITAET, H = HILDE, esc = H.esc;
  var form = document.getElementById("lassen");
  if (!form) return;
  var feld = document.getElementById("material-text"), typ = document.getElementById("material-typ");
  var fehler = document.getElementById("lassen-fehler"), status = document.getElementById("lassen-status");
  var aus = document.getElementById("lassen-ergebnis");
  var letztes = null;

  typ.innerHTML = Q.materialtypen.map(function (t) { return '<option value="' + t.id + '">' + esc(t.name) + "</option>"; }).join("");

  function liste(l) { return "<ul class=\"leitsaetze\">" + l.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>"; }

  function anfrage(r) {
    var t = Q.materialtypen.filter(function (x) { return x.id === r.typ; })[0];
    return [
      "Du unterstützt mich als Lehrkraft an einer beruflichen Schule bei der Prüfung eines eigenen Unterrichtsmaterials.",
      "Material: " + (t ? t.name : "noch offen") + ". Ich füge es unten ein.",
      "",
      "Gehe so vor:",
      "1. Nenne zuerst höchstens drei Stärken. Zitiere zu jeder Stärke die Stelle im Material.",
      "2. Prüfe diese Bereiche: " + Q.bereiche.map(function (b) { return b.name; }).join(", ") + ".",
      "3. Sage zu jedem Bereich mit Treffer, was die digitale Form beiträgt und ob es auf Papier genauso ginge.",
      "4. Schlage höchstens drei Verbesserungen vor, fachliche Korrekturen zuerst.",
      "",
      "Regeln:",
      "- Keine Noten, keine Punkte, keine Prozentwerte.",
      "- Sprich von Potenzial, nicht von Wirkung.",
      "- Prüfe Fachliches nicht selbst. Nenne nur Stellen, die eine Fachperson prüfen sollte.",
      "- Ergänze keine fehlenden Informationen. Frage nach.",
      "",
      "Material:",
      "(hier einfügen, ohne Namen oder andere persönliche Daten)"
    ].join("\n");
  }

  function zeige(r) {
    letztes = r;
    var html = "";
    if (r.status === "ohne-treffer") {
      html = '<div class="ergebnis-block"><h3>Keine Merkmale gefunden</h3><p>Im Text stehen keine der Signalwörter, nach denen Hilde Digital sucht. Das heißt nicht, dass das Material schwach ist.</p>' +
        "<p>Du kannst: Arbeitsaufträge statt einer Beschreibung einfügen · den Materialtyp ändern · dein Material mit <a href=\"selbstcheck.html\">Weg A</a> selbst einschätzen.</p></div>";
    } else {
      var s = r.staerke;
      html += '<div class="ergebnis-block staerke-block"><h3><span class="nr">1</span> Besondere Stärke</h3>' +
        (s ? "<p class=\"staerke-name\">" + esc(s.bereich.name) + "</p><p>" + s.merkmale.length + " verschiedene Merkmale zeigen das: " + s.merkmale.map(function (m) { return esc(m.was.replace(/\.$/, "")); }).join(" · ") + ".</p>"
           : "<p>Kein Bereich zeigt mehr als ein Merkmal. Eine deutliche Stärke lässt sich aus dem Text nicht ablesen.</p>") + "</div>";
      html += '<div class="ergebnis-block"><h3><span class="nr">2</span> Abgedeckte Bereiche</h3><ul class="bereich-chips">' +
        r.abgedeckt.map(function (x) { return "<li>" + esc(x.bereich.name) + ' <span class="leise">· ' + x.merkmale.length + (x.merkmale.length === 1 ? " Merkmal" : " Merkmale") + "</span></li>"; }).join("") + "</ul></div>";
      html += '<div class="ergebnis-block"><h3><span class="nr">3</span> Beobachtungen am Material</h3><ul class="beobachtungen">' +
        r.beobachtungen.map(function (b) {
          return "<li><b>" + esc(b.bereich.name) + ":</b> " + esc(b.was) + b.fundstellen.map(function (f) { return '<q class="fundstelle">' + esc(f) + "</q>"; }).join("") + "</li>";
        }).join("") + "</ul>" +
        (r.digital.length ? '<p class="klein"><b>Digitale Elemente erwähnt:</b> ' + r.digital.map(function (f) { return "»" + esc(f) + "«"; }).join(" ") + " Ob sie etwas beitragen, zeigt eine Textsuche nicht. Dafür ist <a href=\"selbstcheck.html\">Weg A</a> da.</p>" : "") +
        "</div>";
    }
    html += '<div class="ergebnis-block"><h3><span class="nr">4</span> Mögliche Weiterentwicklung</h3>' +
      (r.weiter.length ? liste(r.weiter.map(function (w) { return esc(w.text); })) : "<p>In den wichtigsten Bereichen für diesen Materialtyp gibt es Treffer.</p>") + "</div>";
    html += '<div class="ergebnis-block grenzen-block"><h3><span class="nr">5</span> Grenzen der Einschätzung</h3>' + liste(r.grenzen.map(esc)) + "</div>";
    html += '<div class="ergebnis-aktionen">' +
      '<a class="knopf" href="selbstcheck.html" id="zu-weg-a">Mit Weg A genauer prüfen</a>' +
      '<button type="button" class="knopf still" id="anfrage-zeigen" aria-expanded="false" aria-controls="anfrage-block">Anfrage für ein KI-System</button>' +
      '<button type="button" class="knopf still" id="nochmal">Anderen Text prüfen</button></div>' +
      '<div id="anfrage-block" class="anfrage-block" hidden><p class="datenhinweis">Nutze nur ein an deiner Schule freigegebenes KI-System. Füge Material nur ein, wenn du die Rechte daran hast.</p>' +
      '<label for="anfrage"><b>Anfrage</b> – du kannst sie ändern.</label><textarea id="anfrage" rows="12">' + esc(anfrage(r)) + "</textarea>" +
      '<div class="kopieren"><button type="button" class="knopf" id="kopieren">Anfrage kopieren</button><span id="kopiert" class="leise" aria-live="polite"></span></div></div>';
    aus.innerHTML = html;
    aus.hidden = false;
    aus.classList.remove("erscheint"); void aus.offsetWidth; aus.classList.add("erscheint");
    status.classList.remove("sucht");
    status.textContent = r.status === "ok" ? "Fertig: " + r.abgedeckt.length + (r.abgedeckt.length === 1 ? " Bereich" : " Bereiche") + " mit Treffern." : "Fertig: keine Merkmale gefunden.";
    aus.focus({ preventScroll: true });
    aus.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    fehler.hidden = true;
    var r = MATERIAL.pruefe({ text: feld.value, typ: typ.value });
    if (r.status === "leer") { fehler.textContent = "Füge zuerst einen Text ein, zum Beispiel die Arbeitsaufträge deines Materials."; fehler.hidden = false; feld.focus(); return; }
    if (r.status === "zu-kurz") { fehler.textContent = "Der Text ist zu kurz für eine Auswertung. Füge mindestens zwei, drei Sätze ein – oder prüfe mit Weg A selbst."; fehler.hidden = false; feld.focus(); return; }
    status.textContent = "Text wird nach Merkmalen durchsucht …"; status.classList.add("sucht");
    form.setAttribute("aria-busy", "true");
    // Die Suche läuft sofort. Der Zwischenschritt sorgt nur dafür, dass der Status sichtbar und hörbar wird.
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      try { zeige(r); }
      catch (err) { status.classList.remove("sucht"); status.textContent = ""; fehler.textContent = "Die Auswertung hat nicht geklappt. Lade die Seite neu oder prüfe mit Weg A selbst."; fehler.hidden = false; }
      form.removeAttribute("aria-busy");
    }); });
  });

  form.addEventListener("reset", function () {
    fehler.hidden = true; status.classList.remove("sucht"); status.textContent = ""; aus.hidden = true; aus.innerHTML = ""; letztes = null;
    setTimeout(function () { feld.focus(); }, 0);
  });

  aus.addEventListener("click", function (e) {
    if (e.target.closest("#nochmal")) { form.reset(); return; }
    var z = e.target.closest("#anfrage-zeigen");
    if (z) { var blk = document.getElementById("anfrage-block"); blk.hidden = !blk.hidden; z.setAttribute("aria-expanded", String(!blk.hidden)); return; }
    if (e.target.closest("#zu-weg-a") && letztes) {
      // Vorauswahl für Weg A: nur Materialtyp und gefundene Bereiche, kein Text.
      var t = Q.materialtypen.filter(function (x) { return x.id === letztes.typ; })[0];
      var bereiche = t.kern.slice();
      letztes.abgedeckt.forEach(function (x) { if (bereiche.indexOf(x.id) < 0 && bereiche.length < 6) bereiche.push(x.id); });
      H.schreib("selbstcheck", { schritt: 1, erreicht: 1, typ: letztes.typ, bereiche: bereiche, werte: {}, rahmen: {} });
      return;
    }
    if (e.target.closest("#kopieren")) {
      var f = document.getElementById("anfrage"), k = document.getElementById("kopiert");
      var selbst = function () { f.focus(); f.select(); k.textContent = "Kopieren war nicht möglich. Der Text ist markiert – kopiere ihn selbst."; };
      try {
        if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(f.value).then(function () { k.textContent = "Kopiert."; }, selbst);
        else selbst();
      } catch (err) { selbst(); }
    }
  });
})();
