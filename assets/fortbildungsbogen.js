/* Kidu – »Mein Fortbildungsbogen« (fortbildungsbogen.html), ab Version 4.29.

   Voranalyse vor einer Fortbildung oder Beratungsstunde: eine Frage je Bild, wie in den geführten Wegen.
   Seit 4.30: sechs Schritte, neun Fragen zur Erfahrung mit digitalem Unterricht (Schritt »Tablet bisher« und eine Frage in
   »Deine Wünsche«); wer in keiner Tablet-Klasse unterrichtet, bekommt die Tablet-Fragen nicht (Feld `wenn`). Die Karte hat
   links Frage, Hilfe und Beispiel, rechts die Antworten; darüber Zähler und Laufleiste.
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
  var SCHRITTE = ["KI bisher", "Tablet bisher", "Deine Arbeitsweise", "Deine Vorstellungen", "Deine Wünsche", "Deine Stunde"];
  var SICHER = [["unsicher", "Noch unsicher"], ["teils", "Teils"], ["sicher", "Sicher"]];
  /* Fragen zum Unterricht mit Tablets entfallen, wenn jemand in keiner Tablet-Klasse unterrichtet. */
  function mitTablet(a) { return a.d_klassen !== "keine"; }

  /* Felder: id · schritt · typ (einzel, mehrere, text, stunde) · frage · hilfe (ein Satz) · beispiel (steht abgesetzt) ·
     optionen · aus (Antwort, die alle anderen ausschließt) · max · wenn (Funktion: Frage nur zeigen, wenn …). */
  var FRAGEN = [
    { id: "haeufigkeit", schritt: 1, typ: "einzel", frage: "Wie oft hast du in den letzten vier Wochen ein KI-System benutzt?",
      beispiel: "Du hast einmal einen Elternbrief entwerfen lassen und es seitdem nicht wieder geöffnet – das ist »ein- oder zweimal ausprobiert«.",
      optionen: [["nie", "Noch nie"], ["probiert", "Ein- oder zweimal ausprobiert"], ["woechentlich", "Etwa einmal pro Woche"], ["mehrmals", "Mehrmals pro Woche"], ["taeglich", "Fast täglich"]] },
    { id: "systeme", schritt: 1, typ: "mehrere", aus: "keines", frage: "Welche Art von System hast du schon benutzt?",
      optionen: [["land", "Das Landesangebot (F13 oder AIS.chat)"], ["plattform", "Eine Plattform für Lehrkräfte mit KI-Werkzeugen"], ["chatbot", "Einen frei zugänglichen Chatbot"], ["medien", "Ein Bild-, Sprach- oder Videowerkzeug"], ["keines", "Keines"]] },
    { id: "wofuer", schritt: 1, typ: "mehrere", aus: "nichts", frage: "Wofür hast du KI schon eingesetzt?",
      beispiel: "Ein Arbeitsblatt in zwei Niveaus umschreiben lassen – das ist »vereinfachen oder in Niveaus anpassen«. Ein Quiz in Moodle für Lernende – das ist »etwas gebaut, das Lernende am Tablet benutzen«.",
      optionen: [["privat", "Privat"], ["texte", "Texte für die Schule (Elternbrief, Protokoll, Formulierungen)"], ["arbeitsblatt", "Arbeitsblatt oder Aufgaben entwerfen"], ["differenzieren", "Material vereinfachen oder in Niveaus anpassen"], ["erwartung", "Erwartungshorizont oder Musterlösung"], ["quiz", "Quiz, Übung oder Selbsttest für Lernende"], ["planen", "Stunde oder Reihe planen"], ["erklaeren", "Mir etwas erklären lassen"], ["gebaut", "Etwas gebaut, das Lernende am Tablet benutzen"], ["lernende", "Lernende haben in meinem Unterricht selbst mit KI gearbeitet"], ["nichts", "Noch für nichts"]] },
    { id: "eingabe", schritt: 1, typ: "einzel", frage: "Wie gibst du eine Anfrage meistens ein?",
      beispiel: "Kurz: »Arbeitsblatt zur Weimarer Republik«. Ausführlich: »Für eine Eingangsklasse am Berufskolleg, 20 Minuten, mit einer Quelle und zwei Aufgaben, die eine Entscheidung verlangen«.",
      optionen: [["kurz", "Ich tippe einen kurzen Satz"], ["ausfuehrlich", "Ich tippe ausführlich, mit Klasse und Vorgaben"], ["sprechen", "Ich spreche sie ein"], ["anhang", "Ich hänge ein Dokument oder Foto an"], ["vorlage", "Ich nutze gespeicherte Vorlagen"], ["weissnicht", "Weiß ich nicht mehr"]] },
    { id: "ergebnis", schritt: 1, typ: "einzel", frage: "Wie war das Ergebnis bisher?",
      optionen: [["brauchbar", "Meist brauchbar, wenig Nacharbeit"], ["nacharbeit", "Brauchbar nach deutlicher Nacharbeit"], ["selten", "Selten brauchbar"], ["offen", "Kann ich noch nicht sagen"]] },
    { id: "hindernis", schritt: 1, typ: "mehrere", aus: "nichts", frage: "Was hat dich bei KI bisher gestört oder abgehalten?",
      optionen: [["allgemein", "Ergebnisse zu allgemein oder zu lang"], ["fehler", "Fachliche Fehler oder erfundene Angaben"], ["datenschutz", "Ich wusste nicht, was ich eingeben darf"], ["system", "Ich weiß nicht, welches System ich nehmen soll"], ["dauer", "Es dauert länger, als es selbst zu machen"], ["zweifel", "Grundsätzliche Zweifel, ob ich das möchte"], ["zeit", "Keine Zeit, mich einzuarbeiten"], ["nichts", "Nichts davon"]] },

    /* Schritt 2 (seit 4.30): Erfahrung mit digitalem Unterricht. */
    { id: "d_klassen", schritt: 2, typ: "einzel", frage: "Unterrichtest du in Tablet-Klassen?",
      hilfe: "Bei »In keiner« überspringt der Bogen die Fragen zum Tablet.",
      optionen: [["alle", "In fast allen meinen Klassen"], ["einige", "In einigen Klassen"], ["einzelne", "Nur einzelne Lernende haben ein Gerät"], ["keine", "In keiner"]] },
    { id: "d_dauer", schritt: 2, typ: "einzel", wenn: mitTablet, frage: "Seit wann unterrichtest du mit Tablets?",
      optionen: [["neu", "Seit diesem Schuljahr"], ["mittel", "Seit ein bis zwei Jahren"], ["lang", "Seit mehr als zwei Jahren"]] },
    { id: "tablet", schritt: 2, typ: "mehrere", aus: "kaum", wenn: mitTablet, frage: "Was tun deine Lernenden heute am Tablet?",
      beispiel: "Du schickst das Arbeitsblatt per AirDrop, die Klasse füllt es im Notizbuch aus – das ist »Arbeitsblätter empfangen und ablegen«.",
      optionen: [["ablage", "Arbeitsblätter empfangen und ablegen"], ["recherche", "Recherchieren"], ["ueben", "Üben mit Rückmeldung"], ["gemeinsam", "Gemeinsam an etwas arbeiten"], ["erstellen", "Etwas erstellen (Video, Präsentation, Text)"], ["kaum", "Kaum etwas"]] },
    { id: "d_mehrwert", schritt: 2, typ: "einzel", wenn: mitTablet, frage: "Wie oft tun deine Lernenden am Tablet etwas, das auf Papier nicht oder nur mühsam ginge?",
      beispiel: "Eine Übung, die sofort erklärt, warum eine Antwort nicht stimmt. Ein Dokument, an dem vier Lernende gleichzeitig schreiben. Ein Modell, an dem man einen Wert verschiebt.",
      optionen: [["oft", "In fast jeder Woche"], ["manchmal", "Ab und zu"], ["selten", "Selten oder nie"], ["offen", "Kann ich nicht sagen"]] },
    { id: "d_formen", schritt: 2, typ: "mehrere", aus: "nichts", frage: "Was davon hast du im Unterricht schon selbst eingesetzt?",
      hilfe: "Auch am Beamer oder im Computerraum.",
      optionen: [["quiz", "Quiz oder Abfrage mit sofortiger Rückmeldung"], ["gemeinsam", "Gemeinsames Dokument oder Pinnwand"], ["kurs", "Kurs oder Lernpfad auf der Lernplattform"], ["video", "Erklärvideo oder Audio – angesehen oder selbst erstellt"], ["modell", "Simulation oder bewegliche Grafik"], ["lernseite", "Eigene Lernseite oder interaktives Arbeitsblatt"], ["abgabe", "Digitale Abgabe mit Rückmeldung von mir"], ["nichts", "Noch nichts davon"]] },
    { id: "d_gut", schritt: 2, typ: "mehrere", aus: "nichts", max: 3, wenn: mitTablet, frage: "Was läuft mit dem Tablet gut?",
      optionen: [["ordnung", "Material ist da und geht nicht verloren"], ["tempo", "Lernende arbeiten im eigenen Tempo"], ["rueckmeldung", "Lernende bekommen schneller Rückmeldung"], ["sichtbar", "Ich sehe schneller, wer wo steht"], ["produkte", "Es entstehen Produkte, die auf Papier nicht gingen"], ["motivation", "Die Klasse ist motivierter"], ["nichts", "Noch nichts davon"]] },
    { id: "d_schwer", schritt: 2, typ: "mehrere", aus: "nichts", max: 3, wenn: mitTablet, frage: "Was macht dir im Unterricht mit Tablets zu schaffen?",
      hilfe: "Nimm, was am meisten drückt. Genau daran arbeitet die Fortbildung.",
      optionen: [["ablenkung", "Ablenkung durch Spiele, Chats oder anderes"], ["ueberblick", "Ich sehe nicht, was auf den Bildschirmen passiert"], ["technik", "Technik: Anmelden, WLAN, Akku, Laden"], ["zeit", "Die Vorbereitung kostet mehr Zeit"], ["oberflaeche", "Lernende tippen und wischen, statt nachzudenken"], ["schreiben", "Handschrift und längeres Schreiben kommen zu kurz"], ["ideen", "Mir fehlen Ideen, die über das Arbeitsblatt hinausgehen"], ["nichts", "Nichts davon"]] },
    { id: "d_regeln", schritt: 2, typ: "mehrere", aus: "keine", wenn: mitTablet, frage: "Wie führst du eine Phase mit Tablets?",
      optionen: [["zu", "Geräte zu oder flach, wenn ich spreche"], ["zeit", "Jede Phase hat eine klare Zeit und ein klares Ergebnis"], ["runde", "Ich gehe herum und sehe auf die Bildschirme"], ["verwaltung", "Ich steuere die Geräte zentral (sperren, freigeben)"], ["papier", "Ich wechsle bewusst zwischen Tablet und Papier"], ["keine", "Noch keine festen Absprachen"]] },
    { id: "s_fuehren", schritt: 2, typ: "einzel", wenn: mitTablet, frage: "Wie sicher fühlst du dich, eine Phase mit Tablets zu führen?", optionen: SICHER },

    { id: "vorbereitung", schritt: 3, typ: "einzel", frage: "Wie bereitest du eine Stunde meistens vor?",
      hilfe: "Es gibt keine richtige Antwort. Die Fortbildung schlägt nur vor, was zu deiner Art passt.",
      optionen: [["genau", "Genau geplant: Ablauf, Zeiten, Material stehen fest"], ["geruest", "Ein Gerüst, vieles entscheide ich in der Stunde"], ["fundus", "Aus einem großen Fundus, kurzfristig ausgewählt"], ["gespraech", "Wenig Vorbereitung, ich lebe vom Gespräch mit der Klasse"]] },
    { id: "material", schritt: 3, typ: "mehrere", frage: "Woraus besteht dein Material überwiegend?",
      optionen: [["blaetter", "Eigene Arbeitsblätter"], ["praesentation", "Präsentationen"], ["schulbuch", "Schulbuch und Verlagsmaterial"], ["digital", "Digitale Angebote (Moodle, H5P, Lernseiten, Apps)"], ["tafel", "Vor allem Tafel und Gespräch"]] },
    { id: "s_bedienen", schritt: 3, typ: "einzel", frage: "Wie sicher fühlst du dich, ein KI-System zu bedienen?", hilfe: "»Noch unsicher« ist für die Planung die nützlichste Antwort.", optionen: SICHER },
    { id: "s_pruefen", schritt: 3, typ: "einzel", frage: "Wie sicher fühlst du dich, ein KI-Ergebnis fachlich zu prüfen?", optionen: SICHER },
    { id: "s_duerfen", schritt: 3, typ: "einzel", frage: "Wie sicher fühlst du dich zu entscheiden, was du eingeben darfst?", optionen: SICHER },
    { id: "s_bauen", schritt: 3, typ: "einzel", frage: "Wie sicher fühlst du dich, Material für Lernende am Tablet zu bauen?", optionen: SICHER },
    { id: "zeit", schritt: 3, typ: "einzel", frage: "Wie viel Zeit kannst du in den nächsten Wochen pro Woche dafür erübrigen?",
      optionen: [["wenig", "Unter 30 Minuten"], ["mittel", "30 bis 60 Minuten"], ["viel", "Mehr als eine Stunde"]] },

    { id: "anlass", schritt: 4, typ: "mehrere", max: 3, frage: "Wobei soll dir KI in den nächsten Wochen helfen?",
      hilfe: "Dein erstes Kreuz wird der erste Vorschlag auf dem Bogen.",
      optionen: [["vereinfachen", "Arbeitsblatt vereinfachen oder in Niveaus anpassen"], ["einstieg", "Einstieg mit Vermutung oder Fall"], ["uebung", "Übung mit Rückmeldung für Lernende"], ["erwartung", "Erwartungshorizont oder Bewertungsraster"], ["praesentation", "Präsentation umbauen"], ["eltern", "Elterninformation, Protokoll, Formulierungen"], ["lernseite", "Eine Lernseite oder ein Quiz fürs Tablet"], ["lernende", "Verstehen, wie Lernende KI nutzen und was ich erlaube"], ["zuschauen", "Erst einmal nur zuschauen"]] },
    { id: "gedanken", schritt: 4, typ: "mehrere", frage: "Woran denkst du, wenn du »KI im Unterricht« hörst?", hilfe: "Skepsis ist hier so willkommen wie Neugier.",
      optionen: [["zeit", "Zeitersparnis bei der Vorbereitung"], ["differenzierung", "Bessere Anpassung an verschiedene Lernende"], ["schummeln", "Lernende schummeln"], ["denken", "Lernende denken weniger selbst"], ["datenschutz", "Datenschutz und Rechte"], ["werkzeug", "Noch ein Werkzeug, das ich lernen muss"], ["fach", "Mein Fach braucht das nicht"], ["neugier", "Neugier"]] },
    { id: "nie", schritt: 4, typ: "text", frage: "Was soll KI in deinem Unterricht auf keinen Fall übernehmen?", hilfe: "Wird nicht gespeichert. Steht nur auf deinem Bogen." },
    { id: "stelle", schritt: 4, typ: "text", frage: "Welche Stelle in deinem Unterricht ist gerade mühsam – für dich oder für die Lernenden?", hilfe: "Genau an dieser Stelle fängt die erste Stunde an." },

    { id: "d_wunsch", schritt: 5, typ: "einzel", wenn: mitTablet, frage: "Was soll sich im Unterricht mit Tablets als Erstes ändern?",
      optionen: [["ruhe", "Weniger Ablenkung, mehr Ruhe in den Phasen"], ["mehrwert", "Eine Phase, in der das Tablet mehr kann als Papier"], ["papier", "Bewusster entscheiden, wann Papier besser ist"], ["feedback", "Schnellere Rückmeldung für die Lernenden"], ["nichts", "So, wie es ist, passt es"]] },
    { id: "lernen", schritt: 5, typ: "mehrere", max: 2, frage: "Wie lernst du Neues am liebsten?",
      hilfe: "Damit entscheidet die Leitung, wie die erste Stunde anfängt: vormachen, dich probieren lassen oder ein Beispiel aus deinem Fach heraussuchen.",
      optionen: [["zeigen", "Jemand zeigt es mir, ich mache es nach"], ["probieren", "Ich probiere selbst und frage, wenn ich hänge"], ["lesen", "Ich lese erst eine Anleitung"], ["tandem", "Zu zweit mit einer Kollegin oder einem Kollegen"], ["beispiel", "Ich brauche ein fertiges Beispiel aus meinem Fach"]] },
    { id: "ziel", schritt: 5, typ: "einzel", frage: "Was wäre für dich nach einigen Wochen ein gutes Ergebnis?",
      optionen: [["routine", "Eine Sache, die ich regelmäßig mit KI mache"], ["material", "Ein Material gebaut und im Unterricht ausprobiert"], ["phase", "Eine Phase mit Tablets, die ruhig läuft und etwas bringt"], ["regeln", "Ich weiß, was ich darf und was nicht"], ["nein", "Ich kann begründet sagen, warum ich es nicht nutze"]] },
    { id: "stunde", schritt: 6, typ: "stunde", frage: "Welche Stunde bringst du mit?",
      hilfe: "Für die erste Fortbildungsstunde brauchst du eine echte Stunde oder ein echtes Material aus den nächsten Wochen – ohne Namen, Noten oder Schülerdaten. Fach, Bildungsgang und Thema reichen. Das Kürzel hilft der Leitung, deinen Bogen zuzuordnen." }
  ];
  var ANZAHL = FRAGEN.length; /* Bilder: alle Fragen und zum Schluss die Stunde */
  var ZAHLWORT = { 1: "eine Antwort", 2: "zwei Antworten", 3: "drei Antworten" };

  var weg = document.getElementById("mfb-weg"), form = document.getElementById("mfb-form"), fortschritt = document.getElementById("mfb-fortschritt"),
      stand = document.getElementById("mfb-stand"), nr = document.getElementById("mfb-nr"), lauf = document.getElementById("mfb-lauf"), ansage = document.getElementById("mfb-ansage"), ergebnis = document.getElementById("ergebnis"),
      karteEl = document.getElementById("mfb-karte"), seite = document.querySelector(".bereich-lernen"), zurueck = document.getElementById("mfb-zurueck"), weiter = document.getElementById("mfb-weiter"), ueberspringen = document.getElementById("mfb-ueberspringen-frage");

  /* Zustand: Antworten (nur Auswahlwerte gespeichert), Position, Textfelder nur im Speicher der Seite. */
  var z = H.lies(SPEICHER) || { pos: 0, a: {} };
  if (!z.a) z.a = {};
  z.pos = Math.max(0, Math.min(z.pos | 0, ANZAHL));
  var texte = { nie: "", stelle: "", fach: "", klasse: "", thema: "", kuerzel: "" };
  function sichern() { if (z.pos === 0 && !Object.keys(z.a).length) return; H.schreib(SPEICHER, { pos: z.pos, a: z.a }); }

  function ruhig() { return document.documentElement.getAttribute("data-bewegung") === "weniger" || matchMedia("(prefers-reduced-motion: reduce)").matches; }

  /* ---------- Fragen ---------- */
  /* Sichtbar ist eine Frage, wenn sie keine Bedingung hat oder die Bedingung zu den Antworten passt. */
  function sichtbar(i) { var f = FRAGEN[i]; return !f.wenn || f.wenn(z.a); }
  function schritt(pos, weite) { var i = pos + weite; while (i >= 0 && i < ANZAHL && !sichtbar(i)) i += weite; return Math.max(0, Math.min(i, ANZAHL)); }
  function nummer(pos) { var n = 0; for (var i = 0; i <= pos && i < ANZAHL - 1; i++) if (sichtbar(i)) n++; return n; }
  function gesamt() { return nummer(ANZAHL - 2); }

  function optionHtml(f, o) {
    var mehrere = f.typ === "mehrere", gew = z.a[f.id];
    var checked = mehrere ? (gew || []).indexOf(o[0]) > -1 : gew === o[0];
    return '<label class="option"><input type="' + (mehrere ? "checkbox" : "radio") + '" name="' + f.id + '" value="' + esc(o[0]) + '"' + (checked ? " checked" : "") + '><span class="option-text"><b>' + esc(o[1]) + "</b></span></label>";
  }
  function artText(f) {
    if (f.typ === "einzel") return "Eine Antwort. Danach geht es von selbst weiter.";
    if (f.typ === "mehrere") return f.max ? "Höchstens " + ZAHLWORT[f.max] + "." : "Mehrere Antworten sind möglich.";
    if (f.typ === "text") return "Freiwillig. Ein Satz reicht.";
    return "Stichworte reichen.";
  }
  function zahlText(f) { var n = (z.a[f.id] || []).length; return n ? n + " gewählt" : ""; }
  function frageHtml(f) {
    var links = '<div class="mfb-fragetext"><h2 class="frage" id="mfb-frage" tabindex="-1">' + esc(f.frage) + "</h2>" +
      (f.hilfe ? '<p class="hilfe">' + esc(f.hilfe) + "</p>" : "") +
      (f.beispiel ? '<p class="mfb-beispiel"><b>Zum Beispiel</b> ' + esc(f.beispiel) + "</p>" : "") + "</div>";
    var rechts = '<p class="mfb-art"><span>' + esc(artText(f)) + "</span>" + (f.typ === "mehrere" ? '<span id="mfb-zahl">' + esc(zahlText(f)) + "</span>" : "") + "</p>";
    if (f.typ === "text") {
      rechts += '<div class="bogen-notiz"><label class="sr-only" for="mfb-' + f.id + '">' + esc(f.frage) + '</label><textarea id="mfb-' + f.id + '" name="' + f.id + '" rows="5" maxlength="300">' + esc(texte[f.id]) + "</textarea></div>";
    } else if (f.typ === "stunde") {
      rechts += '<div class="sp-stunde">' + [["fach", "Fach", 60], ["klasse", "Klasse oder Bildungsgang", 60], ["thema", "Thema", 120], ["kuerzel", "Dein Kürzel (nur für die Leitung)", 12]].map(function (x) {
        return '<div class="bogen-notiz"><label for="mfb-' + x[0] + '">' + esc(x[1]) + '</label><input id="mfb-' + x[0] + '" name="' + x[0] + '" type="text" maxlength="' + x[2] + '" autocomplete="off" value="' + esc(texte[x[0]]) + '"></div>';
      }).join("") + "</div>";
    } else {
      rechts += '<div class="optionen mfb-optionen' + (f.optionen === SICHER ? " mfb-skala" : f.optionen.length > 6 ? " mfb-viele" : "") + '">' + f.optionen.map(function (o) { return optionHtml(f, o); }).join("") + "</div>";
    }
    return '<fieldset class="frageblock mfb-spalten' + (f.optionen && f.optionen.length > 8 ? " mfb-breit" : "") + '" aria-labelledby="mfb-frage">' + links + '<div class="mfb-antwort">' + rechts + "</div></fieldset>";
  }

  function zeichneFortschritt() {
    var aktuell = z.pos < ANZAHL ? FRAGEN[z.pos].schritt : SCHRITTE.length + 1;
    var erreicht = 1;
    FRAGEN.forEach(function (f, i) { if (i <= z.pos) erreicht = Math.max(erreicht, f.schritt); });
    fortschritt.innerHTML = SCHRITTE.map(function (s, i) {
      var n = i + 1, ist = n === aktuell, war = n < aktuell || (z.pos >= ANZAHL);
      var inhalt = '<span class="nr" aria-hidden="true">' + n + "</span><span>" + esc(s) + "</span>";
      if ((war || n <= erreicht) && !ist) return '<li class="' + (war ? "erledigt" : "") + '"><button type="button" data-schritt="' + n + '">' + inhalt + '<span class="sr-only"> (Schritt ' + n + " von " + SCHRITTE.length + ", dorthin springen)</span></button></li>";
      return '<li class="' + (ist ? "aktuell" : "") + '"' + (ist ? ' aria-current="step"' : "") + '><span class="ohne">' + inhalt + '<span class="sr-only"> (Schritt ' + n + " von " + SCHRITTE.length + ")</span></span></li>";
    }).join("");
    stand.textContent = z.pos < ANZAHL ? "" : "Fertig";
  }

  var richtung = "vor";
  function zeige(pos, fokus) {
    if (pos < ANZAHL && !sichtbar(pos)) { pos = schritt(pos, richtung === "vor" ? 1 : -1); if (pos < ANZAHL && !sichtbar(pos)) pos = schritt(pos, 1); }
    z.pos = pos; sichern();
    if (pos >= ANZAHL) { fertig(fokus); return; }
    ergebnis.innerHTML = ""; weg.hidden = false; seite.classList.add("mfb-laeuft");
    var f = FRAGEN[pos], letzte = pos === ANZAHL - 1, n = nummer(pos), alle = gesamt();
    var wo = letzte ? "Zum Schluss" : "Frage " + n + " von " + alle;
    nr.innerHTML = esc(wo) + " · <span>" + esc(SCHRITTE[f.schritt - 1]) + "</span>";
    lauf.style.transform = "scaleX(" + (letzte ? 1 : Math.max(0.02, (n - 1) / alle)).toFixed(3) + ")";
    form.innerHTML = frageHtml(f);
    if (!ruhig()) { form.classList.remove("mfb-vor", "mfb-rueck"); void form.offsetWidth; form.classList.add(richtung === "vor" ? "mfb-vor" : "mfb-rueck"); }
    zurueck.hidden = pos === 0;
    weiter.textContent = pos === ANZAHL - 1 ? "Bogen fertigstellen →" : "Weiter →";
    ueberspringen.hidden = f.typ === "stunde";
    zeichneFortschritt();
    ansage.textContent = wo + ": " + f.frage;
    if (fokus !== false) {
      document.getElementById("mfb-frage").focus({ preventScroll: true });
      /* Die Karte bleibt im Bild: nur nachführen, wenn ihr Kopf aus dem Fenster gerutscht ist. */
      var oben = karteEl.getBoundingClientRect().top;
      if (oben < 0 || oben > innerHeight * 0.4) karteEl.scrollIntoView({ block: "start" });
    }
  }

  /* Eine Antwort geht weiter: bei Einzelwahl nach kurzer Rückmeldung (der Punkt füllt sich), sonst über »Weiter«. */
  var uhr = null;
  form.addEventListener("change", function (e) {
    var t = e.target, f = FRAGEN[z.pos];
    if (!f || t.name !== f.id) return;
    if (f.typ === "einzel") {
      z.a[f.id] = t.value; sichern();
      if (uhr) clearTimeout(uhr);
      uhr = setTimeout(function () { uhr = null; richtung = "vor"; zeige(schritt(z.pos, 1)); }, ruhig() ? 0 : H.dauer ? H.dauer("mittel") || 220 : 220);
    } else if (f.typ === "mehrere") {
      if (t.checked && f.aus) form.querySelectorAll('input[name="' + f.id + '"]').forEach(function (x) { if (x !== t && (t.value === f.aus || x.value === f.aus)) x.checked = false; });
      if (t.checked && f.max) { var gew = [].slice.call(form.querySelectorAll('input[name="' + f.id + '"]:checked')); while (gew.length > f.max) { var alt = gew.shift(); if (alt !== t) alt.checked = false; } }
      z.a[f.id] = [].map.call(form.querySelectorAll('input[name="' + f.id + '"]:checked'), function (x) { return x.value; }); sichern();
      document.getElementById("mfb-zahl").textContent = zahlText(f);
    }
  });
  form.addEventListener("input", function (e) { var t = e.target; if (t.name in texte) texte[t.name] = t.value; });
  form.addEventListener("submit", function (e) { e.preventDefault(); richtung = "vor"; zeige(schritt(z.pos, 1)); });
  weiter.addEventListener("click", function () { richtung = "vor"; zeige(schritt(z.pos, 1)); });
  ueberspringen.addEventListener("click", function () { var f = FRAGEN[z.pos]; if (f.typ === "einzel") delete z.a[f.id]; if (f.typ === "mehrere") z.a[f.id] = []; richtung = "vor"; zeige(schritt(z.pos, 1)); });
  zurueck.addEventListener("click", function () { richtung = "rueck"; zeige(schritt(z.pos, -1)); });
  fortschritt.addEventListener("click", function (e) {
    var k = e.target.closest("[data-schritt]"); if (!k) return;
    var n = +k.getAttribute("data-schritt"), i = 0;
    FRAGEN.some(function (f, j) { if (f.schritt === n && sichtbar(j)) { i = j; return true; } });
    richtung = i < z.pos ? "rueck" : "vor"; zeige(i);
  });

  /* ---------- Der fertige Bogen ---------- */
  var WORT = { unsicher: "noch unsicher", teils: "teils", sicher: "sicher", offen: "nicht angegeben" };
  var basis = /^https?:/.test(location.href) ? location.href.replace(/[^\/]*$/, "") : "";
  function karte(sicherheit) {
    var w = 680, x0 = 70, abstand = (w - 2 * x0) / (sicherheit.length - 1), y = 44, r = 15;
    var teile = sicherheit.map(function (f, i) {
      var cx = x0 + i * abstand, fuell = f.wert === "sicher" ? "voll" : f.wert === "teils" ? "halb" : "leer";
      return '<g class="sp-feld sp-' + fuell + '"><circle cx="' + cx + '" cy="' + y + '" r="' + r + '"/>' +
        (fuell === "halb" ? '<path d="M' + cx + ' ' + (y - r) + 'A' + r + ' ' + r + ' 0 0 0 ' + cx + ' ' + (y + r) + 'Z"/>' : "") +
        '<text x="' + cx + '" y="' + (y + 40) + '" text-anchor="middle" class="sp-feld-titel">' + esc(f.titel) + "</text>" +
        '<text x="' + cx + '" y="' + (y + 60) + '" text-anchor="middle" class="sp-feld-wort">' + esc(WORT[f.wert] || f.wert) + "</text></g>";
    }).join("");
    return '<svg class="sp-karte" viewBox="0 0 ' + w + ' 120" role="img" aria-label="Wie sicher du dich fühlst – ' + esc(sicherheit.map(function (f) { return f.titel + ": " + (WORT[f.wert] || f.wert); }).join(", ")) + '">' +
      '<line x1="' + x0 + '" y1="' + y + '" x2="' + (w - x0) + '" y2="' + y + '" class="sp-linie"/>' + teile + "</svg>";
  }

  function fertig(fokus) {
    weg.hidden = true; seite.classList.remove("mfb-laeuft");
    /* Antworten auf Fragen, die nach der Wahl »keine Tablet-Klasse« nicht mehr gezeigt werden, zählen nicht mit. */
    var a = {};
    FRAGEN.forEach(function (f, i) { if (sichtbar(i) && z.a[f.id] !== undefined) a[f.id] = z.a[f.id]; });
    var r = REGELN.startpunkt(a), t = texte;
    function worte(id) { var f = FRAGEN.filter(function (x) { return x.id === id; })[0]; return (a[id] || []).filter(function (w) { return w !== f.aus; }).map(function (w) { return f.optionen.filter(function (o) { return o[0] === w; })[0][1]; }); }
    var gut = worte("d_gut"), schwer = worte("d_schwer");
    var kopf = [t.kuerzel ? "Kürzel: " + t.kuerzel : "", t.fach ? "Fach: " + t.fach : "", t.klasse ? "Klasse: " + t.klasse : "", t.thema ? "Thema: " + t.thema : ""].filter(Boolean);
    ergebnis.innerHTML = '<section class="entscheidung sp-ergebnis" aria-labelledby="sp-titel">' +
      '<p class="karte-marker">Mein Fortbildungsbogen · ' + esc(new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })) + "</p>" +
      '<h2 id="sp-titel" tabindex="-1">' + esc(r.lage.titel) + "</h2>" +
      '<p class="begruendung">' + esc(r.lage.text) + "</p>" +
      (r.lage.skeptisch ? '<p class="begruendung">Du bist skeptisch, ob dein Unterricht das braucht. Diese Frage steht hier ganz oben – »bleibt auf Papier« ist ein vollwertiges Ergebnis.</p>' : "") +
      '<h3 class="minis-titel">Dein Unterricht mit Tablets</h3><p class="begruendung"><b>' + esc(r.tablet.titel) + ".</b> " + esc(r.tablet.text) + "</p>" +
      (gut.length ? '<p class="begruendung"><b>Läuft gut:</b> ' + esc(gut.join(" · ")) + "</p>" : "") +
      (schwer.length ? '<p class="begruendung"><b>Macht zu schaffen:</b> ' + esc(schwer.join(" · ")) + "</p>" : "") +
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
