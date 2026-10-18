/* Hilde Digital – Digital-Check, Weg B »Material prüfen lassen«: regelbasierte Textsuche.

   Was hier passiert – und was nicht:
   - Der eingefügte Text wird nach Signalwörtern durchsucht, die zu den Bereichen des Qualitätsmodells passen
     (assets/daten/qualitaet.js). Jeder Treffer wird mit seiner Fundstelle gezeigt.
   - Das ist keine KI und keine Bewertung. Ob eine Aufgabe gut ist, ob der Inhalt stimmt und was die
     digitale Form beiträgt, kann eine Textsuche nicht erkennen. Das sagt die Oberfläche immer dazu.
   - Es gibt keine Punkte und keine Prozentwerte. Gezählt wird nur, wie viele verschiedene Merkmale
     eines Bereichs vorkommen.
   - Der Text wird nicht gespeichert und nicht gesendet.
   Jede Änderung braucht einen Test in tests/material-regeln.test.js. */
(function (wurzel) {
  "use strict";
  var Q = typeof module !== "undefined" ? require("./daten/qualitaet.js") : wurzel.QUALITAET;

  /* Merkmale je Bereich. muster: regulärer Ausdruck (ohne Groß-/Kleinschreibung). was: Satz für die Beobachtung. */
  var MERKMALE = {
    denken: [
      { id: "begruenden", muster: "begründ", was: "Eine Aufgabe verlangt eine Begründung." },
      { id: "vergleichen", muster: "vergleich", was: "Eine Aufgabe lässt vergleichen." },
      { id: "erklaeren", muster: "erklär|erläuter", was: "Eine Aufgabe verlangt eine Erklärung." },
      { id: "urteilen", muster: "beurteil|bewerte|nimm stellung|nehmt stellung|stellung nehmen|diskutier|erörter|urteil", was: "Eine Aufgabe verlangt ein eigenes Urteil." },
      { id: "vermuten", muster: "vermut|vorhersag|hypothese|was glaubst du|was meinst du", was: "Die Lernenden legen sich erst mit einer Vermutung fest." },
      { id: "uebertragen", muster: "übertrag|wende[^.]{0,40}an\\b|anwenden|transfer", was: "Eine Aufgabe verlangt, Gelerntes zu übertragen." }
    ],
    fach: [
      { id: "ziel", muster: "lernziel|ziel der stunde|ziel der einheit|ich kann|du kannst|am ende kannst|am ende könnt", was: "Ein Ziel ist benannt." },
      { id: "quelle", muster: "quellen?\\s*:|literatur|vgl\\.|zitiert nach|\\(\\d{4}\\)", was: "Quellen oder Belege sind angegeben." },
      { id: "begriffe", muster: "fachbegriff|definition|definiere|begriffe?\\s*:", was: "Fachbegriffe werden geklärt oder angewendet." }
    ],
    rueckmeldung: [
      { id: "loesung", muster: "lösung|erwartungshorizont|selbstkontrolle|kontrolliere", was: "Eine Lösung oder Selbstkontrolle ist vorgesehen." },
      { id: "feedback", muster: "rückmeldung|feedback", was: "Eine Rückmeldung ist vorgesehen." }
    ],
    hilfen: [
      { id: "hilfe", muster: "hilfe|hilfekarte|tippkarte|\\btipps?\\b|satzanfäng|wortspeicher|formulierungshilfe", was: "Es gibt Hilfen für den Einstieg." },
      { id: "niveau", muster: "zusatzaufgabe|für schnelle|für expert|sternchen|wahlaufgabe|niveau|vertiefung", was: "Es gibt Zusatz- oder Niveauaufgaben." }
    ],
    lernstand: [
      { id: "check", muster: "ich-kann|selbsteinschätz|checkliste|exit-ticket|\\bquiz\\b|\\btest\\b|ampel|lernstand", was: "Der Lernstand wird sichtbar gemacht." }
    ],
    zusammen: [
      { id: "partner", muster: "partner|zu zweit|nachbar|tandem|tauscht|tausche", was: "Eine Partnerphase ist angelegt." },
      { id: "gruppe", muster: "gruppe|placemat|think-pair|plenum|präsentier|galeriegang|gallery walk|stellt[^.]{0,30}vor", was: "Eine Gruppenphase oder ein Austausch ist angelegt." }
    ],
    selbststeuern: [
      { id: "reflexion", muster: "reflektier|reflexion|lerntagebuch|logbuch|was hast du gelernt|was nimmst du mit|rückblick", was: "Es gibt einen Anlass, über das eigene Lernen nachzudenken." },
      { id: "planung", muster: "\\bplane\\b|\\bplant\\b|zeitplan|wochenplan|lernplan", was: "Die Lernenden planen ihr Vorgehen selbst." }
    ],
    orientierung: [
      { id: "ablauf", muster: "ablauf|schritt \\d|arbeitsauftrag|auftrag\\s*:|leitfrage|überblick", was: "Ablauf, Auftrag oder Leitfrage sind klar benannt." }
    ],
    handeln: [
      { id: "tun", muster: "ordne[^.]{0,40}zu|ordnet[^.]{0,40}zu|zuordn|sortier|erstell|gestalte|entwickle|zeichne|skizzier|probier|experiment|simulier|verschieb|recherchier", was: "Die Lernenden ordnen zu, stellen etwas her oder probieren aus." }
    ],
    darstellung: [
      { id: "bild", muster: "abbildung|\\babb\\.|grafik|diagramm|schaubild|landkarte|\\bkarte\\b|\\bbild\\b|\\bbilder\\b|\\bfoto|\\bvideo|tabelle|zeitleiste|mindmap", was: "Eine Darstellung ist eingebunden." }
    ],
    wahl: [
      { id: "wahl", muster: "wähle|wählt|nach wahl|wahlweise|entweder|entscheide dich|entscheidet euch|such dir|suche dir", was: "Die Lernenden können wählen." }
    ],
    interesse: [
      { id: "fall", muster: "fallbeispiel|\\bfall\\s*:|situation\\s*:|stell dir vor|stellt euch vor|alltag|kennst du", was: "Ein Fall oder ein Bezug zur Lebenswelt ist angelegt." }
    ],
    ablauf: [
      { id: "zeit", muster: "\\d+\\s*(min\\b|min\\.|minuten)|einzelarbeit|partnerarbeit|gruppenarbeit|sozialform|abgabe", was: "Zeit oder Sozialform sind angegeben." }
    ],
    zugang: [
      { id: "sprache", muster: "einfache sprache|vorlesen|worterklärung|glossar|großdruck|untertitel|transkript", was: "Es gibt Hilfen für den Zugang." }
    ]
  };

  /* Nur Wiedergabe: ein Hinweis, kein Abzug. */
  var WIEDERGABE = "nenne|nennt|zähle[^.]{0,30}auf|zählt[^.]{0,30}auf|gib[^.]{0,30}wieder|gebt[^.]{0,30}wieder|beschreib|fasse[^.]{0,30}zusammen|fasst[^.]{0,30}zusammen|notiere|unterstreich|markier";

  /* Digitale Elemente, die im Text erwähnt werden. Ob sie etwas beitragen, prüft Weg A. */
  var DIGITAL = "tablet|ipad|\\bapp\\b|\\blink\\b|qr-code|\\bqr\\b|\\bvideo|digital|online|moodle|goodnotes|padlet|h5p|website|internet|bildschirm|\\bki\\b|künstliche intelligenz";

  var MIN_ZEICHEN = 120;

  function saetze(text) {
    return String(text || "").replace(/\r/g, "").split(/\n+|(?<=[.!?])\s+/).map(function (s) { return s.trim(); }).filter(Boolean);
  }
  function kurz(s) { s = s.replace(/\s+/g, " "); return s.length > 140 ? s.slice(0, 137) + " …" : s; }
  function finde(liste, muster) {
    var re = new RegExp(muster, "i");
    return liste.filter(function (s) { return re.test(s); });
  }
  function bereich(id) { for (var i = 0; i < Q.bereiche.length; i++) if (Q.bereiche[i].id === id) return Q.bereiche[i]; return null; }
  function typ(id) { for (var i = 0; i < Q.materialtypen.length; i++) if (Q.materialtypen[i].id === id) return Q.materialtypen[i]; return null; }

  var GRENZEN = [
    "Hilde Digital hat den Text nur nach Signalwörtern durchsucht. Das ist keine KI und keine Bewertung.",
    "Ob eine Aufgabe gut gestellt ist und ob der Inhalt stimmt, erkennt eine Textsuche nicht.",
    "Bilder, Gestaltung und Bedienung werden nicht erfasst. Was die digitale Form beiträgt, prüfst du im Weg »Selbst prüfen«.",
    "Ein Treffer ist ein Hinweis. Ein Wort allein macht noch keine Qualität – und ein fehlendes Wort ist noch kein Mangel."
  ];

  /* e: { text, typ } → Ergebnis. status: "leer" | "zu-kurz" | "ohne-treffer" | "ok" */
  function pruefe(e) {
    e = e || {};
    var text = String(e.text || "");
    var roh = text.trim();
    var t = typ(e.typ) || typ("arbeitsblatt");
    var basis = { status: "leer", typ: t.id, staerke: null, abgedeckt: [], beobachtungen: [], wiedergabe: [], digital: [], weiter: [], grenzen: GRENZEN.slice() };
    if (!roh) return basis;
    if (roh.length < MIN_ZEICHEN) { basis.status = "zu-kurz"; return basis; }
    var liste = saetze(roh);

    var abgedeckt = [];
    Object.keys(MERKMALE).forEach(function (bid) {
      var treffer = [];
      MERKMALE[bid].forEach(function (m) {
        var f = finde(liste, m.muster);
        if (f.length) treffer.push({ merkmal: m.id, was: m.was, fundstellen: f.slice(0, 2).map(kurz), anzahl: f.length });
      });
      if (treffer.length) abgedeckt.push({ id: bid, bereich: bereich(bid), merkmale: treffer });
    });

    /* Reihenfolge: mehr verschiedene Merkmale zuerst, bei Gleichstand Kernbereiche des Materialtyps, dann Modellreihenfolge. */
    var ordnung = Q.bereiche.map(function (b) { return b.id; });
    abgedeckt.sort(function (a, b) {
      return (b.merkmale.length - a.merkmale.length) ||
        ((t.kern.indexOf(b.id) >= 0) - (t.kern.indexOf(a.id) >= 0)) ||
        (ordnung.indexOf(a.id) - ordnung.indexOf(b.id));
    });

    var wieder = finde(liste, WIEDERGABE).slice(0, 2).map(kurz);
    var digital = finde(liste, DIGITAL).slice(0, 2).map(kurz);

    /* Besondere Stärke: nur, wenn ein Bereich mindestens zwei verschiedene Merkmale zeigt. */
    var staerke = abgedeckt.length && abgedeckt[0].merkmale.length >= 2 ? abgedeckt[0] : null;

    /* Weiterentwicklung: höchstens drei. Erst Denken, wenn nur Wiedergabe gefunden wurde;
       dann Kernbereiche des Materialtyps ohne Treffer, jeweils mit dem Anker »solide angelegt«. */
    var ids = abgedeckt.map(function (x) { return x.id; });
    var weiter = [];
    if (ids.indexOf("denken") < 0 && wieder.length) {
      weiter.push({ bereich: bereich("denken"), text: "Die Aufgaben verlangen vor allem Wiedergabe. Ein nächster Schritt: " + bereich("denken").a[2] + "." });
    }
    t.kern.forEach(function (k) {
      if (ids.indexOf(k) < 0 && !weiter.some(function (w) { return w.bereich.id === k; })) {
        weiter.push({ bereich: bereich(k), text: bereich(k).name + ": Im Text ist dazu nichts zu finden. Ein erster Schritt wäre – " + bereich(k).a[2] + "." });
      }
    });

    var grenzen = GRENZEN.slice();
    if (liste.length < 4) grenzen.unshift("Der Text ist kurz. Die Einschätzung ist deshalb nur vorläufig.");

    return {
      status: abgedeckt.length ? "ok" : "ohne-treffer",
      typ: t.id,
      staerke: staerke,
      abgedeckt: abgedeckt,
      beobachtungen: abgedeckt.reduce(function (l, x) {
        return l.concat(x.merkmale.map(function (m) { return { bereich: x.bereich, was: m.was, fundstellen: m.fundstellen }; }));
      }, []),
      wiedergabe: wieder,
      digital: digital,
      weiter: weiter.slice(0, 3),
      grenzen: grenzen
    };
  }

  var MATERIAL = { pruefe: pruefe, MERKMALE: MERKMALE, MIN_ZEICHEN: MIN_ZEICHEN, saetze: saetze };
  if (typeof module !== "undefined") module.exports = MATERIAL;
  else wurzel.MATERIAL = MATERIAL;
})(this);
