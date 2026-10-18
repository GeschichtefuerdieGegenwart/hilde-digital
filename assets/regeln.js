/* Hilde Digital – Regeln der Entscheidungskarte (Unterricht planen), der Papierprobe und der Beispielsuche.

   Grundsätze
   - Regelbasiert und deterministisch: gleiche Antworten ergeben immer dieselbe Karte.
   - Keine Punkte oder Noten in der Oberfläche. Die Passung der Beispiele wird intern gezählt,
     angezeigt wird nur die Begründung.
   - Unterschieden werden Lernmehrwert, organisatorische Erleichterung, motivationale Neuheit
     und technische Machbarkeit. Motivation allein ist kein Lernmehrwert.
   - »Analog oder hybrid« ist ein vollwertiges Ergebnis.
   - Mehr Digitalität ist nicht besser. Durchgängig ist keine höhere Stufe als punktuell.

   Eingabe (alle Felder dürfen fehlen):
     { phase, anliegen, mehrwert, umfang, rahmen: { netz, geraete, erfahrung, zeit, sozialform, zugang, daten } }
   Jede Rahmenfrage ändert mindestens eine Aussage der Karte. Fragen ohne Wirkung werden nicht gestellt.
   Werte stammen aus assets/daten/taxonomien.js; »offen« heißt »noch nicht sicher«. */

(function (wurzel) {
  "use strict";

  /* 1. Welche Mehrwert-Arten passen besonders gut zu welchem Anliegen?
        Grundlage: die fünf Prüfdimensionen (Lernzielbezug, Lernaktivität, funktionaler Mehrwert,
        Unterrichtsanpassung, Aufwand). Steht ein Paar hier, ist der funktionale Beitrag
        des Tablets für dieses Anliegen gut begründbar. */
  var PASST = {
    interesse: ["experimentieren", "authentisch", "sichtbar"],
    vorwissen: ["sichtbar", "rueckmeldung"],
    erkunden: ["experimentieren", "authentisch"],
    verstehen: ["experimentieren", "zugaenge", "sichtbar"],
    ueben: ["rueckmeldung", "individuell"],
    zusammen: ["gemeinsam", "sichtbar"],
    recherche: ["authentisch", "dokumentieren"],
    rueckmeldung: ["rueckmeldung", "sichtbar"],
    lernstand: ["rueckmeldung", "sichtbar", "dokumentieren"],
    differenzieren: ["individuell", "zugaenge"],
    sichern: ["dokumentieren", "sichtbar", "zeitort"],
    reflektieren: ["dokumentieren", "sichtbar"],
    leistung: ["dokumentieren", "rueckmeldung"]
  };

  /* Mehrwert-Arten, die ohne verlässliches Netz kaum tragen. */
  var BRAUCHT_NETZ = ["authentisch", "zeitort"];

  function istGesetzt(w) { return w !== undefined && w !== null && w !== "" && w !== "offen"; }
  function rahmenVon(a) { return (a && a.rahmen) || {}; }

  /* 2. Einstufung – genau eine von vier, mit Begründung in zwei bis drei Sätzen. */
  function einstufung(a) {
    a = a || {};
    var r = rahmenVon(a);
    var m = a.mehrwert;

    if (m === "organisation") {
      return { id: "organisatorisch", grund:
        "Du hast vor allem Verteilen und Einsammeln genannt. Das spart Zeit und Papier, verändert aber das Lernen noch nicht. " +
        "Ein Lernmehrwert entsteht erst, wenn sich die Aufgabe selbst verändert." };
    }
    if (!istGesetzt(m) || m === "unklar") {
      return { id: "analog", grund:
        "Noch ist nicht klar, was durch das Tablet besser werden soll. Dann ist Papier oft die ruhigere Wahl. " +
        "Geht es auf Papier genauso gut, bleib beim Papier. Du kannst den Weg mit einer Idee für den Mehrwert jederzeit wiederholen." };
    }
    if (r.netz === "nein" && BRAUCHT_NETZ.indexOf(m) > -1) {
      return { id: "analog", grund:
        "Dein Vorhaben braucht ein verlässliches Netz. Das fehlt im Raum. " +
        "Eine Mischung passt hier vermutlich besser: Material vorher laden oder ausdrucken und digital nur dort arbeiten, wo es ohne Netz geht." };
    }

    var passt = istGesetzt(a.anliegen) && (PASST[a.anliegen] || []).indexOf(m) > -1;
    var anspruchsvoll = a.umfang === "durchgaengig" && (r.erfahrung === "wenig" || r.zeit === "wenig");

    if (passt && !anspruchsvoll) {
      // Motivationale Neuheit: Beim Anliegen »Interesse« wird ausdrücklich gesagt, dass das Gerät allein nicht trägt.
      if (a.anliegen === "interesse") {
        return { id: "klar", grund:
          "Dein Anliegen und der erhoffte Beitrag des Tablets passen gut zusammen. " +
          "Neugier auf das Gerät allein ist aber noch kein Lernmehrwert. " +
          "Er entsteht, wenn die Lernenden dabei eine Frage zum Thema entwickeln, mit der der Unterricht weiterarbeitet." };
      }
      return { id: "klar", grund:
        "Dein Anliegen und der erhoffte Beitrag des Tablets passen gut zusammen. " +
        "Die Lernenden tun dabei etwas, das auf Papier so nicht oder nur mühsam ginge. " +
        "Entscheidend bleibt, dass die Ergebnisse im Unterricht aufgegriffen werden." };
    }
    if (passt && anspruchsvoll) {
      return { id: "anpassung", grund:
        "Der Mehrwert ist gut begründbar. Ein durchgängiges Setting ist mit wenig Vorbereitungszeit oder wenig Tablet-Erfahrung der Klasse aber anspruchsvoll. " +
        "Ein kleinerer Umfang macht den Mehrwert wahrscheinlicher." };
    }
    if (!istGesetzt(a.anliegen)) {
      return { id: "anpassung", grund:
        "Ein Mehrwert ist möglich. Noch fehlt die Lernabsicht, an der du ihn prüfen kannst. " +
        "Lege zuerst fest, was die Lernenden am Ende können sollen." };
    }
    return { id: "anpassung", grund:
      "Ein Mehrwert ist möglich, ergibt sich aber nicht von selbst aus deinem Anliegen. " +
      "Damit er entsteht, muss die Aufgabe dazu passen. Die nötige Anpassung steht unten." };
  }

  /* 3. Empfohlener Umfang. Die Wahl der Lehrkraft gilt, außer sie ist unter den genannten
        Bedingungen schwer umsetzbar. Dann wird ein kleinerer Umfang vorgeschlagen – mit Begründung. */
  function umfang(a, stufe) {
    a = a || {};
    var r = rahmenVon(a);
    if (stufe === "analog") return { id: "punktuell", grund: "Höchstens punktuell – oder ganz auf Papier." };
    if (stufe === "organisatorisch") return { id: "punktuell", grund: "Punktuell reicht für Verteilen und Einsammeln." };
    if (a.umfang === "durchgaengig" && (r.erfahrung === "wenig" || r.zeit === "wenig")) {
      return { id: "phasenweise", grund: "Beginne phasenweise. Ein durchgängiges Setting bleibt möglich, wenn Klasse und Material bereit sind." };
    }
    if (a.umfang === "durchgaengig" && r.geraete === "geteilt") {
      return { id: "phasenweise", grund: "Mit geteilten Geräten ist ein phasenweiser Einsatz leichter zu organisieren." };
    }
    if (istGesetzt(a.umfang)) return { id: a.umfang, grund: "Das hast du gewählt. Es passt zu deinem Vorhaben." };
    // Noch offen: Vorschlag aus Phase und Mehrwert.
    if (a.phase === "einstieg" || a.phase === "abschluss") return { id: "punktuell", grund: "Für einen Einstieg oder Abschluss reicht meist ein kurzer Impuls." };
    if (a.mehrwert === "gemeinsam" || a.mehrwert === "experimentieren" || a.phase === "erarbeitung") {
      return { id: "phasenweise", grund: "Untersuchen und gemeinsames Arbeiten brauchen Zeit. Eine ganze Phase passt meist gut." };
    }
    return { id: "punktuell", grund: "Fang klein an. Ein punktueller Einsatz ist keine Vorstufe, sondern oft genau richtig." };
  }

  /* 4. Rolle der Lehrkraft – aus Mehrwert, Anliegen und Phase, nie aus dem Redeanteil. */
  var ROLLE_ZU_MEHRWERT = {
    rueckmeldung: "rueckmelden", sichtbar: "moderieren", gemeinsam: "moderieren",
    experimentieren: "begleiten", individuell: "begleiten", zugaenge: "begleiten",
    dokumentieren: "begleiten", authentisch: "begleiten", zeitort: "begleiten",
    organisation: "anleiten", unklar: "anleiten"
  };
  function rollen(a) {
    a = a || {};
    var haupt = ROLLE_ZU_MEHRWERT[a.mehrwert] || "anleiten";
    var dazu = null;
    if (a.anliegen === "verstehen" && haupt !== "erklaeren") dazu = "erklaeren";
    else if ((a.anliegen === "lernstand" || a.anliegen === "rueckmeldung") && haupt !== "rueckmelden") dazu = "rueckmelden";
    else if (a.phase === "einstieg" && haupt !== "anleiten") dazu = "anleiten";
    else if (haupt === "begleiten") dazu = "moderieren"; // Ergebnisse wieder ins Gespräch holen
    return dazu ? [haupt, dazu] : [haupt];
  }

  /* 5. Nötige Anpassung des Unterrichts – je Mehrwert-Art ein konkreter Satz. */
  var ANPASSUNG = {
    rueckmeldung: "Plane eine kurze Pause ein, in der die Klasse die Rückmeldungen gemeinsam auswertet.",
    sichtbar: "Plane Zeit zum Vergleichen ein. Lege vorher fest, worauf ihr dabei achtet.",
    experimentieren: "Gib eine klare Frage vor. Haltet danach fest, was die Lernenden herausgefunden haben.",
    gemeinsam: "Verteile Rollen in der Gruppe. Kläre vorher, woran man ein gutes gemeinsames Ergebnis erkennt.",
    individuell: "Lege fest, wie die Lernenden Hilfe bekommen. Plane, wie die einzelnen Wege am Ende zusammenkommen.",
    zugaenge: "Lege ein gemeinsames Ziel für alle Niveaus fest. Führe die Ergebnisse im Gespräch zusammen.",
    dokumentieren: "Gib Leitfragen für die Dokumentation vor. Plane Zeit ein, um sie zu besprechen.",
    authentisch: "Gib Prüffragen für Quellen vor. Ordnet die Fundstücke gemeinsam ein.",
    zeitort: "Kläre, wer außerhalb des Unterrichts Gerät und Netz hat. Plane, wie die Arbeit im Unterricht aufgegriffen wird.",
    organisation: "Für einen Lernmehrwert: Verändere die Aufgabe selbst, nicht nur den Weg, auf dem sie verteilt wird.",
    unklar: "Formuliere zuerst, was die Lernenden am Ende können sollen. Prüfe dann, ob das Tablet dabei hilft."
  };
  /* Sozialform: Passt die Arbeitsform nicht zum erhofften Beitrag, wird die Anpassung konkret benannt. */
  function anpassung(a) {
    a = a || {};
    var s = rahmenVon(a).sozialform;
    if (a.mehrwert === "gemeinsam" && s === "allein") {
      return "Gemeinsam an einem Ergebnis arbeiten geht nicht allein. Plane mindestens eine Phase zu zweit oder in Gruppen ein.";
    }
    if ((a.mehrwert === "individuell" || a.mehrwert === "zugaenge") && s === "klasse") {
      return "Individuelles Arbeiten braucht eine Phase allein oder zu zweit. Plane sie ein und führe die Ergebnisse danach in der Klasse zusammen.";
    }
    if (a.mehrwert === "sichtbar" && s === "allein") {
      return "Ergebnisse vergleichen braucht ein Gegenüber. Plane nach der Einzelarbeit einen Vergleich zu zweit oder in der Klasse ein.";
    }
    return ANPASSUNG[a.mehrwert] || ANPASSUNG.unklar;
  }

  /* 6. Wichtigster Stolperstein – genau einer. Reihenfolge: Technik vor Didaktik,
        weil technische Hürden eine Stunde sofort stoppen. Danach Datenschutz und Zugänglichkeit,
        weil sie vor der Stunde geklärt sein müssen. */
  function stolperstein(a) {
    a = a || {};
    var r = rahmenVon(a);
    if ((r.netz === "nein" || r.netz === "wackelig") && (BRAUCHT_NETZ.indexOf(a.mehrwert) > -1 || a.umfang === "durchgaengig")) {
      return "Das Netz ist nicht verlässlich. Halte eine Fassung auf Papier oder offline bereit.";
    }
    if (r.daten === "ja") {
      return "Datenschutz: Nutze nur ein an deiner Schule freigegebenes Werkzeug. Arbeite mit Kürzeln statt Namen und kläre vorher, wo die Daten bleiben.";
    }
    if (r.zugang === "ja") {
      return "Zugänglichkeit: Prüfe vorher, ob sich Schrift vergrößern und Text vorlesen lässt und ob alles ohne Wischgesten bedienbar ist. Halte eine gleichwertige Fassung bereit.";
    }
    if (a.anliegen === "leistung") {
      return "Fairness und Datenschutz: Kläre vorher, was gespeichert wird und wie gleiche Bedingungen für alle gelten.";
    }
    if (r.geraete === "geteilt" && (a.umfang === "durchgaengig" || a.mehrwert === "zeitort" || a.mehrwert === "dokumentieren")) {
      return "Geteilte Geräte: Arbeitsstände können verloren gehen. Lege fest, wo die Ergebnisse gespeichert werden.";
    }
    if (r.erfahrung === "wenig") {
      return "Die Klasse kennt das Arbeiten mit Tablets noch kaum. Plane eine kurze Einführung in die Bedienung ein.";
    }
    var nachMehrwert = {
      experimentieren: "Ausprobieren ohne Auswertung bleibt Spielerei. Plane die Auswertung fest ein.",
      gemeinsam: "In Gruppen arbeiten oft nur einige. Achte darauf, dass alle einen Teil übernehmen.",
      individuell: "Einzelne verlieren den Anschluss an die Klasse. Hole alle am Ende wieder zusammen.",
      zugaenge: "Einzelne verlieren den Anschluss an die Klasse. Hole alle am Ende wieder zusammen.",
      rueckmeldung: "Schnelle Rückmeldung verleitet zum Raten. Bitte um kurze Begründungen.",
      sichtbar: "Ergebnisse werden gezeigt, aber nicht besprochen. Plane dafür Zeit ein.",
      authentisch: "Nicht jede Quelle ist verlässlich. Gib Prüffragen vor."
    };
    return nachMehrwert[a.mehrwert] || "Ablenkung: Lege fest, wann die Geräte zu bleiben, z. B. Hülle zu oder Bildschirm nach unten.";
  }

  /* 7. Ein konkreter nächster Schritt. */
  function naechsterSchritt(a, stufe) {
    if (stufe === "analog") return "Plane die Phase auf Papier. Prüfe beim nächsten Mal, ob ein digitaler Baustein etwas verbessert.";
    if (stufe === "organisatorisch") return "Nimm eine vorhandene Aufgabe und überlege: Was könnten die Lernenden mit dem Tablet tun, das auf Papier nicht geht?";
    if (stufe === "anpassung") return "Sieh dir ein passendes Beispiel an. Übernimm daraus nur einen Baustein und probiere ihn in einer Phase aus.";
    return "Probiere es in einer Stunde aus. Notiere danach in zwei Sätzen, was du beobachtet hast.";
  }

  /* 8. Passende Beispiele.
        Harte Ausschlüsse: reine KI-Beispiele (nicht Lernen), ohne Netz keine Anwendung, die Netz braucht.
        Gewichtete Passung: Anliegen 3, Mehrwert-Art 3, Phase 2 (phasenübergreifend 1), Umfang 1, Rolle 1.
        »In Überarbeitung« zählt 3 weniger, Konzeptbeispiele 1 weniger. So stehen sie hinter gleich passenden Beispielen. Gleichstand: Reihenfolge der Daten.
        Lockerung: Gibt es kein Beispiel mit Anliegen oder Mehrwert, werden die nächstpassenden gezeigt
        und als solche benannt. */
  function beispiele(a, liste, anzahl, rolleIds) {
    a = a || {};
    anzahl = anzahl || 3;
    var r = rahmenVon(a);
    var ohneNetz = r.netz === "nein";
    var kandidaten = (liste || []).filter(function (b) {
      if (b.bereich === "ki") return false;
      if (ohneNetz && b.link) return false;
      return true;
    });
    var gewertet = kandidaten.map(function (b, i) {
      var p = 0, kern = false;
      if (istGesetzt(a.anliegen) && b.anliegen.indexOf(a.anliegen) > -1) { p += 3; kern = true; }
      if (istGesetzt(a.mehrwert) && b.mehrwerte.indexOf(a.mehrwert) > -1) { p += 3; kern = true; }
      if (istGesetzt(a.phase)) {
        if (b.phasen.indexOf(a.phase) > -1) p += 2;
        else if (b.phasen.indexOf("uebergreifend") > -1) p += 1;
      }
      if (b.umfang && rolleIds && rolleIds.umfang && b.umfang === rolleIds.umfang) p += 1;
      if (rolleIds && rolleIds.rollen && b.rollen.some(function (x) { return rolleIds.rollen.indexOf(x) > -1; })) p += 1;
      if (b.status === "In Überarbeitung") p -= 3; // steht hinter gleich passenden fertigen Beispielen
      if (b.vorschauArt === "konzept") p -= 1;    // Konzeptbeispiele hinter gleich passenden echten Beispielen
      return { b: b, p: p, kern: kern, i: i };
    });
    gewertet.sort(function (x, y) { return y.p - x.p || x.i - y.i; });
    var genau = gewertet.filter(function (g) { return g.kern; });
    var gelockert = genau.length === 0;
    var auswahl = (gelockert ? gewertet : genau).slice(0, anzahl).map(function (g) { return g.b; });
    return { beispiele: auswahl, gelockert: gelockert, ohneNetz: ohneNetz };
  }

  /* 9. Die ganze Entscheidungskarte. */
  function entscheidungskarte(a, liste) {
    a = a || {};
    var stufe = einstufung(a);
    var u = umfang(a, stufe.id);
    var ro = rollen(a);
    var bsp = beispiele(a, liste, 3, { umfang: u.id, rollen: ro });
    return {
      einstufung: stufe.id,
      begruendung: stufe.grund,
      lernzweck: a.anliegen || null,
      mehrwert: a.mehrwert || null,
      mehrwertArt: a.mehrwert === "organisation" ? "organisation" : (!istGesetzt(a.mehrwert) || a.mehrwert === "unklar") ? "offen" : "lernen",
      umfang: u.id,
      umfangGrund: u.grund,
      rollen: ro,
      anpassung: anpassung(a),
      stolperstein: stolperstein(a),
      beispiele: bsp.beispiele,
      gelockert: bsp.gelockert,
      ohneNetz: bsp.ohneNetz,
      naechsterSchritt: naechsterSchritt(a, stufe.id),
      schluss: "Das ist eine Planungshilfe, keine Bewertung. Du entscheidest."
    };
  }

  /* 10. Selbsteinschätzung »Was passt gerade zu mir?« – situativ, kein Test, kein Typ.
         Eingabe: { steuern, begleiten, gespraech, technik, zeit } je 1–5, dazu phase und wichtig (Anliegen).
         Grundsätze: Viel Wert auf Gespräch und Erklären führt nicht zu einer schwächeren Empfehlung,
         sondern zu Formaten, die digitale Phasen ins Gespräch zurückführen. Empfohlen wird nie der
         Verzicht auf digitale Bildung – höchstens ein kleinerer, geführter Einstieg. */
  function wert(x) { var n = parseInt(x, 10); return n >= 1 && n <= 5 ? n : 3; }

  function selbsteinschaetzung(e, liste) {
    e = e || {};
    var st = wert(e.steuern), be = wert(e.begleiten), ge = wert(e.gespraech), te = wert(e.technik), ze = wert(e.zeit);

    var umf, umfGrund;
    if (te <= 2 || ze <= 2) { umf = "punktuell"; umfGrund = "Du möchtest wenig Technik oder wenig Vorbereitung. Ein kurzer, gezielter Einsatz passt dazu."; }
    else if (te >= 4 && ze >= 4 && be >= 3) { umf = "durchgaengig"; umfGrund = "Du bringst Zeit mit und traust dir mehr Technik zu. Auch ein durchgängiges Setting ist möglich – ein phasenweiser Einsatz ebenso."; }
    else { umf = "phasenweise"; umfGrund = "Eine digitale Phase mit klarem Anfang und Ende passt zu deinen Angaben."; }

    var haupt, dazu = null;
    if (ge >= 4) { haupt = "moderieren"; dazu = st >= 4 ? "erklaeren" : null; }
    else if (st >= 4) { haupt = "anleiten"; }
    else if (be >= 4) { haupt = "begleiten"; }
    else { haupt = "anleiten"; }
    if (e.wichtig === "lernstand" || e.wichtig === "rueckmeldung") dazu = dazu || (haupt !== "rueckmelden" ? "rueckmelden" : null);
    if (!dazu && haupt === "anleiten" && be >= 3) dazu = "begleiten";
    var rollen = dazu ? [haupt, dazu] : [haupt];

    var format;
    if (ge >= 4) format = "Eine kurze digitale Phase, deren Ergebnisse ihr danach gemeinsam besprecht – zum Beispiel Antworten, die alle sehen und die ihr im Gespräch einordnet.";
    else if (st >= 4 && be <= 2) format = "Ein klar angeleiteter Einsatz mit festem Ablauf und festen Zeiten.";
    else if (be >= 4 && st <= 2) format = "Eine offenere Erarbeitungsphase, in der du beobachtest und gezielt unterstützt.";
    else format = "Ein geplanter digitaler Baustein in einer Phase, mit gemeinsamer Auswertung am Ende.";

    var gruende = [];
    if (ge >= 4) gruende.push("Gemeinsame Gesprächs- und Erklärphasen sind dir wichtig. Digitale Phasen können sie gezielt vorbereiten.");
    if (st >= 4) gruende.push("Du steuerst den Ablauf gern selbst. Ein klarer Rahmen gibt dir und der Klasse Sicherheit.");
    if (be <= 2) gruende.push("Beim Begleiten selbstständiger Arbeit fühlst du dich noch unsicher. Ein kleinerer, geführter Einstieg passt dazu.");
    if (be >= 4 && st <= 3) gruende.push("Du begleitest gern, während Lernende selbstständig arbeiten. Das öffnet offenere Formen.");
    if (te <= 2) gruende.push("Du möchtest wenig Technik. Ein einfaches Werkzeug reicht.");
    if (!gruende.length) gruende.push("Deine Angaben liegen in der Mitte. Ein überschaubarer Einsatz lässt dir viel Spielraum.");

    var alternative = umf === "punktuell"
      ? "Noch kleiner: Ein einziger digitaler Impuls von fünf Minuten, den ihr sofort gemeinsam auswertet."
      : "Risikoarm: Beginne mit einem punktuellen Einsatz und erweitere ihn, wenn er trägt.";

    var bsp = beispiele({ phase: e.phase, anliegen: e.wichtig }, liste, 3, { umfang: umf, rollen: rollen });
    if (bsp.beispiele.length < 2) { // mindestens zwei Beispiele: mit Phase und Umfang auffüllen
      var dazuB = beispiele({ phase: e.phase }, liste, 6, { umfang: umf, rollen: rollen }).beispiele;
      dazuB.forEach(function (b) { if (bsp.beispiele.length < 3 && bsp.beispiele.indexOf(b) < 0) bsp.beispiele.push(b); });
    }

    return {
      einordnung: "Du kennst deine Klasse und deinen Unterricht am besten. Diese Einschätzung gilt für dein aktuelles Vorhaben – nicht für dich als Person.",
      gruende: gruende.slice(0, 3),
      umfang: umf, umfangGrund: umfGrund,
      rollen: rollen,
      format: format,
      beispiele: bsp.beispiele, gelockert: bsp.gelockert,
      alternative: alternative,
      schluss: "Andere Wege sind ebenso möglich."
    };
  }

  /* 7. Papierprobe (Startseite) – die Kurzform des Prüfsteins »Geht es auf Papier genauso gut?«.
        Drei Ja/Nein-Fragen, jeweils mit »noch nicht sicher«. Ergebnis ist eine der vier Einstufungen
        aus taxonomien.js – dieselben Namen wie auf der Entscheidungskarte. Der Planungsweg prüft genauer.
          neu:    Tun die Lernenden mit dem Tablet etwas, das auf Papier nicht oder nur mühsam ginge?
          ablage: Hilft das Tablet vor allem beim Verteilen, Einsammeln oder Ablegen?   (nur bei neu = nein)
          ziel:   Dient das dem, was die Lernenden lernen sollen?                        (nur bei neu = ja)
        Regeln (in dieser Reihenfolge):
          neu fehlt                        → noch offen (null)
          neu = offen                      → analog   (wie »Mehrwert noch unklar« im Planungsweg)
          neu = nein, ablage = ja          → organisatorisch
          neu = nein, ablage = nein/offen  → analog
          neu = ja,   ziel = ja            → klar
          neu = ja,   ziel = nein/offen    → anpassung
        Fehlt die Folgefrage, ist das Ergebnis noch offen (null). */
  function papierprobe(a) {
    a = a || {};
    var JA = "ja", NEIN = "nein";
    if (!a.neu) return { id: null, frage: "neu" };
    if (a.neu === "offen") return { id: "analog", grund:
      "Noch ist nicht klar, was durch das Tablet besser wird. Dann ist Papier oft die ruhigere Wahl." };
    if (a.neu === NEIN) {
      if (!a.ablage) return { id: null, frage: "ablage" };
      if (a.ablage === JA) return { id: "organisatorisch", grund:
        "Das Tablet ersetzt hier vor allem den Schnellhefter. Das spart Zeit, verändert aber das Lernen noch nicht." };
      return { id: "analog", grund: "Geht es auf Papier genauso gut, bleib beim Papier." };
    }
    if (!a.ziel) return { id: null, frage: "ziel" };
    if (a.ziel === JA) return { id: "klar", grund:
      "Die Lernenden tun etwas, das auf Papier kaum ginge, und es dient dem Lernziel. Entscheidend bleibt, dass die Ergebnisse im Unterricht aufgegriffen werden." };
    return { id: "anpassung", grund:
      "Das Tablet ermöglicht etwas Neues. Damit daraus Lernen wird, muss die Aufgabe zum Lernziel passen." };
  }

  var REGELN = {
    PASST: PASST, einstufung: einstufung, umfang: umfang, rollen: rollen, anpassung: anpassung,
    stolperstein: stolperstein, naechsterSchritt: naechsterSchritt, beispiele: beispiele,
    entscheidungskarte: entscheidungskarte, selbsteinschaetzung: selbsteinschaetzung,
    papierprobe: papierprobe
  };
  if (typeof module !== "undefined") module.exports = REGELN;
  else wurzel.REGELN = REGELN;
})(this);
