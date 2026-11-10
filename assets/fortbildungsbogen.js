/* Kidu – »Mein Fortbildungsbogen« (fortbildungsbogen.html), ab Version 4.29.

   Voranalyse vor einer Fortbildung oder Beratungsstunde: zwanzig Fragen, eine je Bild, wie in den geführten Wegen.
   Eine Antwort geht weiter (Einzelwahl nach kurzer Rückmeldung; Mehrfachwahl und Text über »Weiter«), »Zurück« und
   »Überspringen« sind immer da, kein Weg endet in einer Sackgasse. Am Ende steht der Bogen als Karte mit »Als PDF sichern«
   (assets/druck.js, Klasse nur-ergebnis). Die Auswertung kommt aus REGELN.startpunkt (assets/regeln.js, mit Tests).
   Gespeichert werden nur Auswahlwerte und die Position (hilde.fortbildungsbogen); Textfelder bleiben im Speicher der Seite.

   Eröffnung: vier Sätze, einmal je Sitzung (sessionStorage), Takt 4 s, »Überspringen« und Escape; bei »weniger Bewegung«
   stehen alle vier Sätze still. Der Inhalt ist ohne sie vollständig – sie erklärt nur, worum es geht.
   Braucht: REGELN, HILDE. */
(function () {
  "use strict";
  var H = HILDE, esc = H.esc, SPEICHER = "fortbildungsbogen";
  var SCHRITTE = ["Wo du stehst", "Wie du arbeitest", "Was du dir vorstellst", "Was du dir wünschst", "Deine Stunde"];
  var SICHER = [["unsicher", "Noch unsicher"], ["teils", "Teils"], ["sicher", "Sicher"]];

  var FRAGEN = [
    { id: "haeufigkeit", schritt: 1, typ: "einzel", frage: "Wie oft hast du in den letzten vier Wochen ein KI-System benutzt?",
      hilfe: "Beispiel: Du hast einmal einen Elternbrief entwerfen lassen und es seitdem nicht wieder geöffnet – das ist »ein- oder zweimal ausprobiert«.",
      optionen: [["nie", "Noch nie"], ["probiert", "Ein- oder zweimal ausprobiert"], ["woechentlich", "Etwa einmal pro Woche"], ["mehrmals", "Mehrmals pro Woche"], ["taeglich", "Fast täglich"]] },
    { id: "systeme", schritt: 1, typ: "mehrere", aus: "keines", frage: "Welche Art von System hast du schon benutzt?", hilfe: "Mehrere Antworten sind möglich.",
      optionen: [["land", "Das Landesangebot (F13 oder AIS.chat)"], ["plattform", "Eine Plattform für Lehrkräfte mit KI-Werkzeugen"], ["chatbot", "Einen frei zugänglichen Chatbot"], ["medien", "Ein Bild-, Sprach- oder Videowerkzeug"], ["keines", "Keines"]] },
    { id: "wofuer", schritt: 1, typ: "mehrere", aus: "nichts", frage: "Wofür hast du KI schon eingesetzt?",
      hilfe: "Mehrere Antworten sind möglich. Ein Arbeitsblatt in zwei Niveaus umschreiben lassen – das ist »vereinfachen oder in Niveaus anpassen«. Ein Quiz in Moodle für Lernende – das ist »etwas gebaut, das Lernende am Tablet benutzen«.",
      optionen: [["privat", "Privat"], ["texte", "Texte für die Schule (Elternbrief, Protokoll, Formulierungen)"], ["arbeitsblatt", "Arbeitsblatt oder Aufgaben entwerfen"], ["differenzieren", "Material vereinfachen oder in Niveaus anpassen"], ["erwartung", "Erwartungshorizont oder Musterlösung"], ["quiz", "Quiz, Übung oder Selbsttest für Lernende"], ["planen", "Stunde oder Reihe planen"], ["erklaeren", "Mir etwas erklären lassen"], ["gebaut", "Etwas gebaut, das Lernende am Tablet benutzen"], ["lernende", "Lernende haben in meinem Unterricht selbst mit KI gearbeitet"], ["nichts", "Noch für nichts"]] },
    { id: "eingabe", schritt: 1, typ: "einzel", frage: "Wie gibst du eine Anfrage meistens ein?",
      hilfe: "Kurz: »Arbeitsblatt zur Weimarer Republik«. Ausführlich: »Für eine Eingangsklasse am Berufskolleg, 20 Minuten, mit einer Quelle und zwei Aufgaben, die eine Entscheidung verlangen«.",
      optionen: [["kurz", "Ich tippe einen kurzen Satz"], ["ausfuehrlich", "Ich tippe ausführlich, mit Klasse und Vorgaben"], ["sprechen", "Ich spreche sie ein"], ["anhang", "Ich hänge ein Dokument oder Foto an"], ["vorlage", "Ich nutze gespeicherte Vorlagen"], ["weissnicht", "Weiß ich nicht mehr"]] },
    { id: "ergebnis", schritt: 1, typ: "einzel", frage: "Wie war das Ergebnis bisher?",
      optionen: [["brauchbar", "Meist brauchbar, wenig Nacharbeit"], ["nacharbeit", "Brauchbar nach deutlicher Nacharbeit"], ["selten", "Selten brauchbar"], ["offen", "Kann ich noch nicht sagen"]] },
    { id: "hindernis", schritt: 1, typ: "mehrere", aus: "nichts", frage: "Was hat dich bisher gestört oder abgehalten?", hilfe: "Mehrere Antworten sind möglich.",
      optionen: [["allgemein", "Ergebnisse zu allgemein oder zu lang"], ["fehler", "Fachliche Fehler oder erfundene Angaben"], ["datenschutz", "Ich wusste nicht, was ich eingeben darf"], ["system", "Ich weiß nicht, welches System ich nehmen soll"], ["dauer", "Es dauert länger, als es selbst zu machen"], ["zweifel", "Grundsätzliche Zweifel, ob ich das möchte"], ["zeit", "Keine Zeit, mich einzuarbeiten"], ["nichts", "Nichts davon"]] },
    { id: "vorbereitung", schritt: 2, typ: "einzel", frage: "Wie bereitest du eine Stunde meistens vor?",
      hilfe: "Es gibt keine richtige Antwort. Die Fortbildung schlägt nur vor, was zu deiner Art passt.",
      optionen: [["genau", "Genau geplant: Ablauf, Zeiten, Material stehen fest"], ["geruest", "Ein Gerüst, vieles entscheide ich in der Stunde"], ["fundus", "Aus einem großen Fundus, kurzfristig ausgewählt"], ["gespraech", "Wenig Vorbereitung, ich lebe vom Gespräch mit der Klasse"]] },
    { id: "material", schritt: 2, typ: "mehrere", frage: "Woraus besteht dein Material überwiegend?", hilfe: "Mehrere Antworten sind möglich.",
      optionen: [["blaetter", "Eigene Arbeitsblätter"], ["praesentation", "Präsentationen"], ["schulbuch", "Schulbuch und Verlagsmaterial"], ["digital", "Digitale Angebote (Moodle, H5P, Lernseiten, Apps)"], ["tafel", "Vor allem Tafel und Gespräch"]] },
    { id: "tablet", schritt: 2, typ: "mehrere", aus: "kaum", frage: "Wie nutzt deine Klasse das Tablet heute?", hilfe: "Mehrere Antworten sind möglich. Keine Tablet-Klasse? Dann die letzte Antwort.",
      optionen: [["ablage", "Arbeitsblätter empfangen und ablegen"], ["recherche", "Recherchieren"], ["ueben", "Üben mit Rückmeldung"], ["gemeinsam", "Gemeinsam an etwas arbeiten"], ["erstellen", "Etwas erstellen (Video, Präsentation, Text)"], ["kaum", "Kaum"], ["keine", "Keine Tablet-Klasse"]] },
    { id: "s_bedienen", schritt: 2, typ: "einzel", frage: "Wie sicher fühlst du dich, ein KI-System zu bedienen?", hilfe: "»Noch unsicher« ist die häufigste Antwort im Kollegium – und die nützlichste für die Planung.", optionen: SICHER },
    { id: "s_pruefen", schritt: 2, typ: "einzel", frage: "Wie sicher fühlst du dich, ein KI-Ergebnis fachlich zu prüfen?", optionen: SICHER },
    { id: "s_duerfen", schritt: 2, typ: "einzel", frage: "Wie sicher fühlst du dich zu entscheiden, was du eingeben darfst?", optionen: SICHER },
    { id: "s_bauen", schritt: 2, typ: "einzel", frage: "Wie sicher fühlst du dich, Material für Lernende am Tablet zu bauen?", optionen: SICHER },
    { id: "zeit", schritt: 2, typ: "einzel", frage: "Wie viel Zeit kannst du in den nächsten Wochen pro Woche dafür erübrigen?",
      optionen: [["wenig", "Unter 30 Minuten"], ["mittel", "30 bis 60 Minuten"], ["viel", "Mehr als eine Stunde"]] },
    { id: "anlass", schritt: 3, typ: "mehrere", max: 3, frage: "Wobei soll dir KI in den nächsten Wochen helfen?",
      hilfe: "Höchstens drei Antworten. Dein erstes Kreuz wird der erste Vorschlag auf dem Bogen.",
      optionen: [["vereinfachen", "Arbeitsblatt vereinfachen oder in Niveaus anpassen"], ["einstieg", "Einstieg mit Vermutung oder Fall"], ["uebung", "Übung mit Rückmeldung für Lernende"], ["erwartung", "Erwartungshorizont oder Bewertungsraster"], ["praesentation", "Präsentation umbauen"], ["eltern", "Elterninformation, Protokoll, Formulierungen"], ["lernseite", "Eine Lernseite oder ein Quiz fürs Tablet"], ["lernende", "Verstehen, wie Lernende KI nutzen und was ich erlaube"], ["zuschauen", "Erst einmal nur zuschauen"]] },
    { id: "gedanken", schritt: 3, typ: "mehrere", frage: "Woran denkst du, wenn du »KI im Unterricht« hörst?", hilfe: "Mehrere Antworten sind möglich. Skepsis ist hier so willkommen wie Neugier.",
      optionen: [["zeit", "Zeitersparnis bei der Vorbereitung"], ["differenzierung", "Bessere Anpassung an verschiedene Lernende"], ["schummeln", "Lernende schummeln"], ["denken", "Lernende denken weniger selbst"], ["datenschutz", "Datenschutz und Rechte"], ["werkzeug", "Noch ein Werkzeug, das ich lernen muss"], ["fach", "Mein Fach braucht das nicht"], ["neugier", "Neugier"]] },
    { id: "nie", schritt: 3, typ: "text", frage: "Was soll KI in deinem Unterricht auf keinen Fall übernehmen?", hilfe: "Freiwillig. Ein Satz reicht. Wird nicht gespeichert, steht nur auf deinem Bogen." },
    { id: "stelle", schritt: 3, typ: "text", frage: "Welche Stelle in deinem Unterricht ist gerade mühsam – für dich oder für die Lernenden?", hilfe: "Freiwillig. Genau an dieser Stelle fängt die erste Stunde an." },
    { id: "lernen", schritt: 4, typ: "mehrere", max: 2, frage: "So lerne ich Neues am liebsten.",
      hilfe: "Höchstens zwei Antworten. Damit entscheidet die Leitung, wie die erste Stunde anfängt: vormachen, dich probieren lassen, ein Beispiel aus deinem Fach heraussuchen.",
      optionen: [["zeigen", "Jemand zeigt es mir, ich mache es nach"], ["probieren", "Ich probiere selbst und frage, wenn ich hänge"], ["lesen", "Ich lese erst eine Anleitung"], ["tandem", "Zu zweit mit einer Kollegin oder einem Kollegen"], ["beispiel", "Ich brauche ein fertiges Beispiel aus meinem Fach"]] },
    { id: "ziel", schritt: 4, typ: "einzel", frage: "Was wäre für dich nach einigen Wochen ein gutes Ergebnis?",
      optionen: [["routine", "Eine Sache, die ich regelmäßig mit KI mache"], ["material", "Ein Material gebaut und im Unterricht ausprobiert"], ["regeln", "Ich weiß, was ich darf und was nicht"], ["nein", "Ich kann begründet sagen, warum ich es nicht nutze"]] },
    { id: "stunde", schritt: 5, typ: "stunde", frage: "Welche Stunde bringst du mit?",
      hilfe: "Für die erste Fortbildungsstunde brauchst du eine echte Stunde oder ein echtes Material aus den nächsten Wochen – ohne Namen, Noten oder Schülerdaten. Fach, Bildungsgang und Thema reichen. Das Kürzel hilft der Leitung, deinen Bogen zuzuordnen." }
  ];
  var ANZAHL = FRAGEN.length; /* 21 Bilder: zwanzig Fragen und die Stunde */

  var weg = document.getElementById("mfb-weg"), form = document.getElementById("mfb-form"), fortschritt = document.getElementById("mfb-fortschritt"),
      stand = document.getElementById("mfb-stand"), ansage = document.getElementById("mfb-ansage"), ergebnis = document.getElementById("ergebnis"),
      zurueck = document.getElementById("mfb-zurueck"), weiter = document.getElementById("mfb-weiter"), ueberspringen = document.getElementById("mfb-ueberspringen-frage");

  /* Zustand: Antworten (nur Auswahlwerte gespeichert), Position, Textfelder nur im Speicher der Seite. */
  var z = H.lies(SPEICHER) || { pos: 0, a: {} };
  if (!z.a) z.a = {};
  z.pos = Math.max(0, Math.min(z.pos | 0, ANZAHL));
  var texte = { nie: "", stelle: "", fach: "", klasse: "", thema: "", kuerzel: "" };
  function sichern() { if (z.pos === 0 && !Object.keys(z.a).length) return; H.schreib(SPEICHER, { pos: z.pos, a: z.a }); }

  function ruhig() { return document.documentElement.getAttribute("data-bewegung") === "weniger" || matchMedia("(prefers-reduced-motion: reduce)").matches; }

  /* ---------- Fragen ---------- */
  function optionHtml(f, o) {
    var mehrere = f.typ === "mehrere", gew = z.a[f.id];
    var checked = mehrere ? (gew || []).indexOf(o[0]) > -1 : gew === o[0];
    return '<label class="option"><input type="' + (mehrere ? "checkbox" : "radio") + '" name="' + f.id + '" value="' + esc(o[0]) + '"' + (checked ? " checked" : "") + '><span class="option-text"><b>' + esc(o[1]) + "</b></span></label>";
  }
  function frageHtml(f, i) {
    var kopf = '<p class="mfb-nr">' + (i < ANZAHL - 1 ? "Frage " + (i + 1) + " von 20" : "Zum Schluss") + ' · <span>' + esc(SCHRITTE[f.schritt - 1]) + "</span></p>";
    var h = '<fieldset class="frageblock" aria-labelledby="mfb-frage">' + kopf + '<h2 class="frage" id="mfb-frage" tabindex="-1">' + esc(f.frage) + "</h2>" +
      (f.hilfe ? '<p class="hilfe">' + esc(f.hilfe) + "</p>" : "");
    if (f.typ === "text") {
      h += '<div class="bogen-notiz"><label class="sr-only" for="mfb-' + f.id + '">' + esc(f.frage) + '</label><textarea id="mfb-' + f.id + '" name="' + f.id + '" rows="3" maxlength="300">' + esc(texte[f.id]) + "</textarea></div>";
    } else if (f.typ === "stunde") {
      h += '<div class="sp-stunde">' + [["fach", "Fach", 60], ["klasse", "Klasse oder Bildungsgang", 60], ["thema", "Thema", 120], ["kuerzel", "Dein Kürzel (nur für die Leitung)", 12]].map(function (x) {
        return '<div class="bogen-notiz"><label for="mfb-' + x[0] + '">' + esc(x[1]) + '</label><input id="mfb-' + x[0] + '" name="' + x[0] + '" type="text" maxlength="' + x[2] + '" autocomplete="off" value="' + esc(texte[x[0]]) + '"></div>';
      }).join("") + "</div>";
    } else {
      h += '<div class="optionen mfb-optionen">' + f.optionen.map(function (o) { return optionHtml(f, o); }).join("") + "</div>";
    }
    return h + "</fieldset>";
  }

  function zeichneFortschritt() {
    var aktuell = z.pos < ANZAHL ? FRAGEN[z.pos].schritt : 6;
    var erreicht = 1;
    FRAGEN.forEach(function (f, i) { if (i <= z.pos) erreicht = Math.max(erreicht, f.schritt); });
    fortschritt.innerHTML = SCHRITTE.map(function (s, i) {
      var n = i + 1, ist = n === aktuell, war = n < aktuell || (z.pos >= ANZAHL);
      var inhalt = '<span class="nr" aria-hidden="true">' + n + "</span><span>" + esc(s) + "</span>";
      if ((war || n <= erreicht) && !ist) return '<li class="' + (war ? "erledigt" : "") + '"><button type="button" data-schritt="' + n + '">' + inhalt + '<span class="sr-only"> (Schritt ' + n + " von 5, dorthin springen)</span></button></li>";
      return '<li class="' + (ist ? "aktuell" : "") + '"' + (ist ? ' aria-current="step"' : "") + '><span class="ohne">' + inhalt + '<span class="sr-only"> (Schritt ' + n + " von 5)</span></span></li>";
    }).join("");
    stand.textContent = z.pos < ANZAHL ? "Frage " + Math.min(z.pos + 1, 20) + " von 20" : "Fertig";
  }

  var richtung = "vor";
  function zeige(pos, fokus) {
    z.pos = pos; sichern();
    if (pos >= ANZAHL) { fertig(fokus); return; }
    ergebnis.innerHTML = ""; weg.hidden = false;
    var f = FRAGEN[pos];
    form.innerHTML = frageHtml(f, pos);
    if (!ruhig()) { form.classList.remove("mfb-vor", "mfb-rueck"); void form.offsetWidth; form.classList.add(richtung === "vor" ? "mfb-vor" : "mfb-rueck"); }
    zurueck.hidden = pos === 0;
    weiter.textContent = pos === ANZAHL - 1 ? "Bogen fertigstellen →" : "Weiter →";
    ueberspringen.hidden = f.typ === "stunde";
    zeichneFortschritt();
    ansage.textContent = (pos < ANZAHL - 1 ? "Frage " + (pos + 1) + " von 20: " : "Zum Schluss: ") + f.frage;
    if (fokus !== false) document.getElementById("mfb-frage").focus();
  }

  /* Eine Antwort geht weiter: bei Einzelwahl nach kurzer Rückmeldung (der Punkt füllt sich), sonst über »Weiter«. */
  var uhr = null;
  form.addEventListener("change", function (e) {
    var t = e.target, f = FRAGEN[z.pos];
    if (!f || t.name !== f.id) return;
    if (f.typ === "einzel") {
      z.a[f.id] = t.value; sichern();
      if (uhr) clearTimeout(uhr);
      uhr = setTimeout(function () { uhr = null; richtung = "vor"; zeige(z.pos + 1); }, ruhig() ? 0 : H.dauer ? H.dauer("mittel") || 220 : 220);
    } else if (f.typ === "mehrere") {
      if (t.checked && f.aus) form.querySelectorAll('input[name="' + f.id + '"]').forEach(function (x) { if (x !== t && (t.value === f.aus || x.value === f.aus)) x.checked = false; });
      if (t.checked && f.max) { var gew = [].slice.call(form.querySelectorAll('input[name="' + f.id + '"]:checked')); while (gew.length > f.max) { var alt = gew.shift(); if (alt !== t) alt.checked = false; } }
      z.a[f.id] = [].map.call(form.querySelectorAll('input[name="' + f.id + '"]:checked'), function (x) { return x.value; }); sichern();
    }
  });
  form.addEventListener("input", function (e) { var t = e.target; if (t.name in texte) texte[t.name] = t.value; });
  form.addEventListener("submit", function (e) { e.preventDefault(); richtung = "vor"; zeige(z.pos + 1); });
  weiter.addEventListener("click", function () { richtung = "vor"; zeige(z.pos + 1); });
  ueberspringen.addEventListener("click", function () { var f = FRAGEN[z.pos]; if (f.typ === "einzel") delete z.a[f.id]; if (f.typ === "mehrere") z.a[f.id] = []; richtung = "vor"; zeige(z.pos + 1); });
  zurueck.addEventListener("click", function () { richtung = "rueck"; zeige(Math.max(0, z.pos - 1)); });
  fortschritt.addEventListener("click", function (e) {
    var k = e.target.closest("[data-schritt]"); if (!k) return;
    var n = +k.getAttribute("data-schritt"), i = 0;
    FRAGEN.some(function (f, j) { if (f.schritt === n) { i = j; return true; } });
    richtung = i < z.pos ? "rueck" : "vor"; zeige(i);
  });

  /* ---------- Der fertige Bogen ---------- */
  var WORT = { unsicher: "noch unsicher", teils: "teils", sicher: "sicher", offen: "nicht angegeben" };
  var basis = /^https?:/.test(location.href) ? location.href.replace(/[^\/]*$/, "") : "";
  function karte(sicherheit) {
    var w = 560, x0 = 60, abstand = (w - 2 * x0) / 3, y = 44, r = 15;
    var teile = sicherheit.map(function (f, i) {
      var cx = x0 + i * abstand, fuell = f.wert === "sicher" ? "voll" : f.wert === "teils" ? "halb" : "leer";
      return '<g class="sp-feld sp-' + fuell + '"><circle cx="' + cx + '" cy="' + y + '" r="' + r + '"/>' +
        (fuell === "halb" ? '<path d="M' + cx + ' ' + (y - r) + 'A' + r + ' ' + r + ' 0 0 0 ' + cx + ' ' + (y + r) + 'Z"/>' : "") +
        '<text x="' + cx + '" y="' + (y + 40) + '" text-anchor="middle" class="sp-feld-titel">' + esc(f.titel) + "</text>" +
        '<text x="' + cx + '" y="' + (y + 60) + '" text-anchor="middle" class="sp-feld-wort">' + esc(WORT[f.wert] || f.wert) + "</text></g>";
    }).join("");
    return '<svg class="sp-karte" viewBox="0 0 ' + w + ' 120" role="img" aria-label="Vier Felder – ' + esc(sicherheit.map(function (f) { return f.titel + ": " + (WORT[f.wert] || f.wert); }).join(", ")) + '">' +
      '<line x1="' + x0 + '" y1="' + y + '" x2="' + (w - x0) + '" y2="' + y + '" class="sp-linie"/>' + teile + "</svg>";
  }

  function fertig(fokus) {
    weg.hidden = true;
    var r = REGELN.startpunkt(z.a), t = texte;
    var kopf = [t.kuerzel ? "Kürzel: " + t.kuerzel : "", t.fach ? "Fach: " + t.fach : "", t.klasse ? "Klasse: " + t.klasse : "", t.thema ? "Thema: " + t.thema : ""].filter(Boolean);
    ergebnis.innerHTML = '<section class="entscheidung sp-ergebnis" aria-labelledby="sp-titel">' +
      '<p class="karte-marker">Mein Fortbildungsbogen · ' + esc(new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })) + "</p>" +
      '<h2 id="sp-titel" tabindex="-1">' + esc(r.lage.titel) + "</h2>" +
      '<p class="begruendung">' + esc(r.lage.text) + "</p>" +
      (r.lage.skeptisch ? '<p class="begruendung">Du bist skeptisch, ob dein Unterricht das braucht. Diese Frage steht hier ganz oben – »bleibt auf Papier« ist ein vollwertiges Ergebnis.</p>' : "") +
      '<h3 class="minis-titel">Wie sicher du dich fühlst</h3>' + karte(r.sicherheit) +
      '<h3 class="minis-titel">Was du schon mitbringst</h3><ul class="bogen-hinweise">' + r.staerken.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" +
      '<h3 class="minis-titel">Bis zu drei nächste Schritte</h3><ul class="bogen-hinweise">' + r.schritte.map(function (s) {
        return "<li>" + esc(s.text) + ' <a class="textlink" href="' + esc(basis + s.link) + '">' + esc(s.linktext) + ' <span aria-hidden="true">→</span></a></li>';
      }).join("") + "</ul>" +
      '<h3 class="minis-titel">Zwei Kniffe für den Anfang</h3><ul class="bogen-hinweise">' + r.kniffe.map(function (k) { return "<li><b>" + esc(k.titel) + ".</b> " + esc(k.text) + "</li>"; }).join("") + "</ul>" +
      (t.nie || t.stelle ? '<h3 class="minis-titel">In deinen Worten</h3>' +
        (t.nie ? '<p class="begruendung"><b>KI soll nicht übernehmen:</b> ' + esc(t.nie) + "</p>" : "") +
        (t.stelle ? '<p class="begruendung"><b>Mühsame Stelle:</b> ' + esc(t.stelle) + "</p>" : "") : "") +
      '<h3 class="minis-titel">Für die Leitung der Fortbildung</h3>' +
      (kopf.length ? '<p class="begruendung">' + esc(kopf.join(" · ")) + "</p>" : "") +
      '<p class="sp-code">' + esc(r.code) + "</p>" +
      '<p class="schluss">' + esc(r.satz) + "</p>" +
      '<p class="leise klein sp-quelle">Erstellt mit Kidu · Mein Fortbildungsbogen · nur für dich und die Leitung der Fortbildung</p>' +
      '<div class="ergebnis-aktionen"><button type="button" class="knopf" data-drucken="nur-ergebnis">Als PDF sichern</button>' +
      '<button type="button" class="knopf still" id="mfb-aendern">Antworten ändern</button>' +
      '<p class="leise klein sp-pdf-hinweis">Im Druckfenster »Als PDF sichern« wählen (am iPad: Teilen → Drucken, dann das Blatt antippen) und die Datei der Leitung der Fortbildung schicken. Erst damit verlässt etwas dieses Gerät.</p></div>' +
      "</section>";
    document.getElementById("mfb-aendern").addEventListener("click", function () { richtung = "rueck"; zeige(0); });
    if (fokus !== false) document.getElementById("sp-titel").focus();
  }

  document.getElementById("loeschen").addEventListener("click", function () {
    H.loescheAlles(); z = { pos: 0, a: {} }; Object.keys(texte).forEach(function (k) { texte[k] = ""; }); richtung = "rueck"; zeige(0);
  });

  /* ---------- Eröffnung ---------- */
  var er = document.getElementById("mfb-eroeffnung"), satz = document.getElementById("mfb-satz"), takte = [].map.call(document.querySelectorAll("#mfb-takte li"), function (li) { return li.textContent; });
  var takt = 0, erUhr = null, TAKT = 4000;
  function zeigeTakt(n) {
    takt = n; er.setAttribute("data-takt", String(n)); satz.textContent = takte[n - 1];
    if (erUhr) clearTimeout(erUhr);
    if (n < takte.length) erUhr = setTimeout(function () { zeigeTakt(n + 1); }, TAKT);
  }
  function merken() { try { sessionStorage.setItem("kidu.fortbildungsbogen.eroeffnung", "gelaufen"); } catch (e) { /* ohne Speicher läuft sie beim nächsten Aufruf wieder */ } }
  function beenden() { if (erUhr) clearTimeout(erUhr); erUhr = null; er.hidden = true; merken(); zeige(z.pos); }
  var gelaufen = false;
  try { gelaufen = sessionStorage.getItem("kidu.fortbildungsbogen.eroeffnung") === "gelaufen"; } catch (e) { gelaufen = false; }
  if (gelaufen || z.pos > 0 || Object.keys(z.a).length) {
    zeige(z.pos, false);
  } else {
    er.hidden = false;
    if (ruhig()) { er.setAttribute("data-takt", "alle"); satz.hidden = true; }
    else { zeigeTakt(1); }
    satz.focus();
    document.getElementById("mfb-los").addEventListener("click", beenden);
    document.getElementById("mfb-ueberspringen").addEventListener("click", beenden);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !er.hidden) { e.preventDefault(); beenden(); } });
  }
})();
