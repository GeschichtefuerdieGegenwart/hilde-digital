/* Kidu – Regeln der Entscheidungskarte (Unterricht neu planen), der Papierfrage und der Beispielsuche.

   Grundsätze
   - Regelbasiert und deterministisch: gleiche Antworten ergeben immer dieselbe Karte.
   - Keine Punkte oder Noten in der Oberfläche. Die Passung der Beispiele wird intern gezählt,
     angezeigt wird nur die Begründung.
   - Unterschieden werden Lernmehrwert, organisatorische Erleichterung, motivationale Neuheit
     und technische Machbarkeit. Motivation allein ist kein Lernmehrwert.
   - »Analog oder hybrid« ist ein vollwertiges Ergebnis.
   - Mehr Tablet ist nicht besser. Durchgängig ist keine höhere Stufe als punktuell.

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
    // Durchgängig heißt nicht »alles am Gerät« (Entscheidung 1.11.2026): feste Stellen im Plenum, lange Texte auf Papier.
    if (a.umfang === "durchgaengig") return { id: "durchgaengig", grund:
      "Das hast du gewählt. Plane feste Stellen im Plenum ein: Deutung und Urteil entstehen im Gespräch, lange Texte liegen auf Papier." };
    if (istGesetzt(a.umfang)) return { id: a.umfang, grund: "Das hast du gewählt. Es passt zu deinem Vorhaben." };
    // Noch offen: Vorschlag aus Phase und Mehrwert.
    /* Kurzer Impuls nur für Einstieg und Ausblick (ab 4.37): Wer am Ende auf einen neuen Fall überträgt
       (Anliegen »Reflektieren & übertragen«), braucht Zeit – dann kein kurzer Umfang. */
    if (a.phase === "abschluss" && a.anliegen === "reflektieren") return { id: "phasenweise", grund: "Übertragen auf einen neuen Fall braucht Zeit. Eine ganze Phase passt meist gut." };
    if (a.phase === "einstieg" || a.phase === "abschluss") return { id: "punktuell", grund: "Für einen Einstieg oder einen Ausblick reicht meist ein kurzer Impuls." };
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

  /* 7. Papierfrage (Startseite) – die Kurzform des Prüfsteins »Geht es auf Papier genauso gut?«.
        Drei Ja/Nein-Fragen, jeweils mit »noch nicht sicher«. Ergebnis ist eine der vier Einstufungen
        aus taxonomien.js – dieselben Namen wie auf der Entscheidungskarte. Der Planungsweg prüft genauer.
          neu:    Tun die Lernenden mit dem Tablet etwas, das auf Papier nicht oder nur mühsam ginge?
          ablage: Hilft das Tablet vor allem beim Verteilen, Einsammeln oder Ablegen?   (nur bei neu = nein)
          ziel:   Dient das dem, was die Lernenden lernen sollen?                        (nur bei neu = ja)
        Regeln (in dieser Reihenfolge):
          neu fehlt                        → noch offen (null)
          neu = offen                      → noch offen (null, frage »klaeren«): erst das Lernziel klären.
                                             Ab Version 4.13; vorher »analog«. Grund: Leitsatz 1 »Erst das Anliegen« und
                                             »ein fehlender Nachweis ist kein Verbot« – Unsicherheit heißt klären, nicht Papier.
          neu = nein, ablage = ja          → organisatorisch
          neu = nein, ablage = nein/offen  → analog
          neu = ja,   ziel = ja            → klar
          neu = ja,   ziel = nein/offen    → anpassung
        Fehlt die Folgefrage, ist das Ergebnis noch offen (null).
        Zusatzfrage (ab Version 4.10, Lese-Kriterium):
          lesen:  Lesen die Lernenden dabei einen längeren Text – mehr als eine Bildschirmseite?
          lesen = ja und ein Ergebnis steht fest → zusätzlicher Hinweis »lesen«: den Text auf Papier ausgeben.
          Die Einstufung selbst ändert sich nicht. Grund: Längere Sachtexte verstehen Lernende auf Papier im Mittel
          etwas besser, besonders unter Zeitdruck (Delgado u. a. 2018; Salmerón u. a. 2024 – kleiner Effekt).
          »Mehr als eine Bildschirmseite« ist eine eigene Faustregel, kein Wert aus den Studien.
        Zusatzfrage (ab Version 4.13, »für alle und für dieses Ziel«):
          teilhabe: Brauchen einzelne Lernende das Gerät, um mitzumachen (Vorlesen, Vergrößern, Übersetzen)?
                    Oder ist der Umgang mit dem Digitalen selbst das Lernziel?
          teilhabe = ja und Ergebnis analog oder organisatorisch → zusätzlicher Hinweis »teilhabe«: das Gerät ist für
          diese Lernenden oder dieses Ziel begründet. Die Einstufung beschreibt weiter die Aktivität für die ganze Klasse.
          Grund: »Geht es auf Papier genauso gut?« gilt nur, wenn es für alle und für dieses Ziel genauso gut geht. */
  var TEILHABEHINWEIS = "Für die ganze Klasse geht es auf Papier genauso gut – für einzelne Lernende oder für dieses Ziel aber nicht. " +
    "Dann ist das Gerät dort begründet. Setz es gezielt ein, für die anderen kann es bei Papier bleiben.";
  var LESEHINWEIS = "Längere Sachtexte verstehen viele auf Papier etwas besser, besonders unter Zeitdruck. " +
    "Gib den Text gedruckt aus und nutze das Tablet für den Rest.";
  function papierprobe(a) {
    a = a || {};
    var e = papierprobeKern(a);
    if (e.id && a.lesen === "ja") e.lesen = LESEHINWEIS;
    if ((e.id === "analog" || e.id === "organisatorisch") && a.teilhabe === "ja") e.teilhabe = TEILHABEHINWEIS;
    return e;
  }
  function papierprobeKern(a) {
    var JA = "ja", NEIN = "nein";
    if (!a.neu) return { id: null, frage: "neu" };
    if (a.neu === "offen") return { id: null, frage: "klaeren" };
    if (a.neu === NEIN) {
      if (!a.ablage) return { id: null, frage: "ablage" };
      if (a.ablage === JA) return { id: "organisatorisch", grund:
        "Das Tablet ersetzt hier vor allem den Schnellhefter. Das spart Zeit, verändert aber das Lernen noch nicht." };
      return { id: "analog", grund: "Geht es auf Papier genauso gut – für alle und für dieses Ziel –, bleib beim Papier." };
    }
    if (!a.ziel) return { id: null, frage: "ziel" };
    if (a.ziel === JA) return { id: "klar", grund:
      "Die Lernenden tun etwas, das auf Papier kaum ginge, und es dient dem Lernziel. Entscheidend bleibt, dass die Ergebnisse im Unterricht aufgegriffen werden." };
    return { id: "anpassung", grund:
      "Das Tablet ermöglicht etwas Neues. Damit daraus Lernen wird, muss die Aufgabe zum Lernziel passen." };
  }


  /* 11. Beobachtungsbogen nach der Stunde (beobachtung.html).
        Eingabe (alle Felder dürfen fehlen):
          lernhandlung: ja | teilweise | nein   Haben die Lernenden das Entscheidende selbst getan?
          nachweis:     ja | teils | nein | offen  Konnten sie es danach ohne Gerät und ohne Hilfe? (ab Version 4.13)
                        Grund: Wer mit Hilfe besser übt, kann es nicht automatisch allein (Bastani u. a. 2025).
          mehrwert:     ja | nein               Ging mit dem Tablet etwas besser als auf Papier?
          technik:      kaum | spuerbar | zuviel  Zeit, die für Technik verloren ging
          aufmerksamkeit: ja | teils | nein     Waren die Lernenden bei der Sache?
          entscheidung: lassen | nachschaerfen | papier
        Regeln:
          - Ohne Entscheidung gibt es noch keine Auswertung (id null).
          - Höchstens drei Hinweise, in dieser Reihenfolge: Lernhandlung, Lernnachweis, Mehrwert, Technik, Aufmerksamkeit.
            Ein Hinweis entsteht nur aus einer Antwort, die auf ein Problem zeigt.
          - Der nächste Schritt folgt allein der Entscheidung der Lehrkraft. Sie wird nicht überstimmt.
          - Passt die Entscheidung »so lassen« nicht zu einem Hinweis, wird das freundlich benannt (kein Verbot).
          - »Zurück zu Papier« ist ein Fortschritt, kein Scheitern.
          - Immer der Satz: persönliche Beobachtung, kein Nachweis der Wirkung. */
  function beobachtung(a) {
    a = a || {};
    var hinweise = [];
    if (a.lernhandlung === "nein") hinweise.push("Das Gerät hat den Lernenden den entscheidenden Schritt abgenommen. Lass sie beim nächsten Mal zuerst selbst antworten, ordnen oder begründen. Die Rückmeldung kommt danach.");
    else if (a.lernhandlung === "teilweise") hinweise.push("Die Lernenden haben nur teilweise selbst gedacht. Such eine Stelle, an der sie mehr selbst tun: begründen, ordnen oder erklären.");
    if (a.nachweis === "nein" || a.nachweis === "teils") hinweise.push("Was mit Hilfe gelingt, ist noch nicht gelernt. Lass die Lernenden zum Schluss eine kurze Aufgabe ohne Gerät und ohne Hilfe lösen.");
    else if (a.nachweis === "offen") hinweise.push("Ob die Lernenden es allein können, weißt du noch nicht. Plane beim nächsten Mal eine kurze Aufgabe ohne Gerät und ohne Hilfe am Ende.");
    if (a.mehrwert === "nein") hinweise.push("Das Tablet hat nichts Wesentliches beigetragen. Papier ist hier eine gute Wahl.");
    if (a.technik === "zuviel") hinweise.push("Zu viel Zeit ging für Technik verloren. Teste Anmelden und Laden vorher und nutze möglichst nur eine App.");
    else if (a.technik === "spuerbar") hinweise.push("Die Technik hat Zeit gekostet. Plane beim nächsten Mal ein paar Minuten Puffer ein.");
    if (a.aufmerksamkeit === "nein" || a.aufmerksamkeit === "teils") hinweise.push("Gib jeder Tablet-Phase einen klaren Auftrag und eine Zeit. Lege fest, wann die Geräte zu bleiben.");
    hinweise = hinweise.slice(0, 3);

    var SATZ = "Das sind deine persönlichen Beobachtungen. Sie sind kein Nachweis der Wirkung.";
    if (!a.entscheidung) return { id: null, hinweise: hinweise, satz: SATZ };

    var schritte = {
      lassen: { titel: "So lassen", text: "Notiere dir, was gut lief, damit du es beim nächsten Mal wieder so machst. Passt es, stell es im Kollegium vor.",
                link: "galerie.html", linktext: "Beispiele aus dem Unterricht ansehen" },
      nachschaerfen: { titel: "Nachschärfen", text: "Nimm dir genau die Stelle vor, die gehakt hat. Der Digital-Check hilft dir, sie gezielt zu prüfen.",
                link: "digital-check.html", linktext: "Zum Digital-Check" },
      papier: { titel: "Zurück zu Papier", text: "Das ist ein Fortschritt. Du weißt jetzt, wo das Tablet nichts beiträgt. Plane die nächste Stunde in Ruhe.",
                link: "tablets.html", linktext: "Nächste Stunde planen" }
    };
    var s = schritte[a.entscheidung];
    if (!s) return { id: null, hinweise: hinweise, satz: SATZ };
    var spannung = a.entscheidung === "lassen" && (a.lernhandlung === "nein" || a.mehrwert === "nein" || a.nachweis === "nein")
      ? "Du willst es so lassen. Schau dir trotzdem die Hinweise oben an – vielleicht lohnt sich eine kleine Änderung." : "";
    return { id: a.entscheidung, titel: s.titel, text: s.text, link: s.link, linktext: s.linktext,
             hinweise: hinweise, spannung: spannung, satz: SATZ };
  }


  /* Mein Fortbildungsbogen (fortbildungsbogen.html, ab 4.29; Fragen seit 4.24, Fragen zum Unterricht mit Tablets seit 4.30):
     Fragen vor einer Fortbildung oder Beratungsstunde.
     Vier Ausgangslagen ohne Rangfolge – sie beschreiben, womit die erste Stunde beginnt, nicht wie gut jemand ist.
     Ergebnis: Lage, Stärken zuerst, vier Sicherheitsfelder für die Karte, höchstens drei Schritte, höchstens zwei Kniffe,
     ein Codeblock für die Leitung (nur Auswahlwerte, keine Texte). Keine Noten, Punkte oder Prozentwerte.
     Seit 4.30 dazu `tablet`: eine Beschreibung des Unterrichts mit Tablets (keine · ablage · phasen · offen) – ebenfalls ohne
     Rangfolge: »vor allem Mappe« ist ein Ausgangspunkt, kein Mangel, und »bleibt auf Papier« bleibt ein vollwertiges Ergebnis.
     Seit 4.36 geht »Mein Ist-Stand« im Bogen auf (Entscheidung Mario, 13.11.2026): Seine fünf Fragen stehen fast gleich in Schritt 2
     und 5. Übernommen werden der Satz zum organisatorischen Nutzen (legitim, keine Vorstufe) und der gewählte nächste Schritt
     »Schnellere Rückmeldung« (d_wunsch=feedback → Übung mit Rückmeldung). Ablenkung und Unsicherheit führten schon vorher zu
     »Tablet-Phasen gut führen«, »Papier passt« wird weiter bestärkt, nicht umgestimmt. */
  var SP_LAGEN = {
    anfang: { titel: "Du fängst gerade an",
      text: "Das ist ein häufiger Startpunkt. Für die erste Stunde reicht ein einziger Anlass aus deinem Alltag – und die Sicherheit, dass du nichts falsch machst." },
    enttaeuscht: { titel: "Du hast es probiert – und es hat noch nicht überzeugt",
      text: "Meist liegt das nicht am System, sondern an der Anfrage: Eine Anfrage mit Ziel, Klasse, Vorgaben und Format bringt andere Ergebnisse als ein kurzer Satz. Genau das wird der Anfang." },
    fuersich: { titel: "Du nutzt KI für dich – die Lernenden haben noch nichts davon",
      text: "Du hast die Vorbereitung im Griff. Der nächste Schritt ist der von der Vorbereitung zur Lernhandlung: Was tun die Lernenden mit dem, was du baust? Das ist die Papierfrage." },
    weit: { titel: "Du bist schon weit – und vermutlich allein damit",
      text: "Du brauchst keine Einführung, sondern Rückmeldung: Was haben die Lernenden selbst getan? Was davon kannst du anderen zeigen?" },
    offen: { titel: "Dein Startpunkt ist noch offen",
      text: "Du hast wenig angekreuzt. Das ist in Ordnung – die erste Stunde beginnt dann mit deiner Stunde und der Frage, wo die Lernenden hängen bleiben." }
  };
  var SP_TABLET = {
    keine: { titel: "Du unterrichtest zurzeit nicht in Tablet-Klassen",
      text: "Dann beginnt die Fortbildung bei deiner Vorbereitung – und bei der Frage, was auf Papier bleibt." },
    ablage: { titel: "Das Tablet ist bei dir vor allem Mappe und Nachschlagewerk",
      text: "So wird das Tablet häufig genutzt. Das ist organisatorischer Nutzen – legitim und keine Vorstufe. Die erste Frage ist dann nicht »mehr Tablet«, sondern: An welcher einen Stelle könnte es mehr als Papier?" },
    phasen: { titel: "In einzelnen Phasen kann das Tablet bei dir mehr als Papier",
      text: "Du hast schon Stellen, an denen das Gerät etwas beiträgt. Die Fortbildung fragt: Was tun die Lernenden dort selbst – und woran merkst du, dass es hilft?" },
    offen: { titel: "Dein Unterricht mit Tablets ist noch offen",
      text: "Du hast dazu wenig angekreuzt. Dann reicht für den Anfang die Stunde, die du mitbringst." }
  };
  var SP_SICHER = [["s_bedienen", "Bedienen"], ["s_pruefen", "Prüfen"], ["s_duerfen", "Dürfen"], ["s_bauen", "Bauen"], ["s_fuehren", "Tablet-Phase"]];
  var SP_ANLASS = {
    vereinfachen: { text: "Vereinfach ein eigenes Arbeitsblatt mit der Schnell-Anfrage – das ist der Anlass mit dem sichersten ersten Ergebnis.", link: "ki.html#t-schnell", linktext: "Schnell-Anfrage" },
    einstieg: { text: "Lass dir für deine Stunde einen Einstieg mit Vermutung entwerfen und prüf ihn mit den drei Fragen vor dem Kopieren.", link: "ki.html#t-schnell", linktext: "Schnell-Anfrage" },
    uebung: { text: "Mach aus einem Arbeitsblatt eine Übung, deren Rückmeldung erklärt statt nur richtig oder falsch zu zeigen.", link: "digitalisieren.html", linktext: "Bisherigen Unterricht digitalisieren" },
    erwartung: { text: "Lass dir einen Erwartungshorizont zu einer eigenen Aufgabe entwerfen und streiche, was zu viel ist.", link: "ki.html#t-schnell", linktext: "Schnell-Anfrage" },
    praesentation: { text: "Bau eine Präsentation um: eine Frage je Folie, Vermutung vor der Auflösung.", link: "digitalisieren.html", linktext: "Bisherigen Unterricht digitalisieren" },
    eltern: { text: "Lass dir eine Elterninformation entwerfen – ohne Namen – und formuliere sie in deinen Ton um.", link: "ki.html#t-schnell", linktext: "Schnell-Anfrage" },
    lernseite: { text: "Sieh dir bei den Unterrichtsbeispielen eines aus deinem Fach an, bevor du selbst etwas baust.", link: "galerie.html", linktext: "Zu den Unterrichtsbeispielen" },
    lernende: { text: "Leg für eine eigene Aufgabe fest, was Lernende mit KI dürfen und was sie selbst tun.", link: "lernende-ki.html", linktext: "Wenn deine Lernenden mit KI arbeiten" },
    zuschauen: { text: "Zuschauen ist ein guter Anfang. Sieh dir an, was im Unterricht schon ausprobiert wurde.", link: "galerie.html", linktext: "Zu den Unterrichtsbeispielen" }
  };
  var SP_KNIFFE = {
    sprechen: { titel: "Einsprechen statt eintippen", text: "Sprich die Anfrage ein, als würdest du sie einer Referendarin erklären: Klasse, Ziel, was schon da ist, was fehlt. So wird sie in einer Minute lang genug." },
    foto: { titel: "Foto statt Abtippen", text: "Fotografier das alte Arbeitsblatt oder häng es an und sag nur, was sich ändern soll. Vorhandenes wird zum Ausgangspunkt." },
    vorlage: { titel: "Die eine gute Anfrage speichern", text: "Leg die erste gelungene Anfrage als Textbaustein ab und tausch beim nächsten Mal nur Thema und Klasse aus." },
    rueckfragen: { titel: "Erst fragen lassen", text: "Schreib ans Ende der Anfrage: »Stell mir zuerst drei Rückfragen, bevor du anfängst.« Das System holt sich den Kontext, den du vergessen hast." },
    haelfte: { titel: "Kürzen statt mehr", text: "Sag »mach die Hälfte«, »nur eine Aufgabe«, »für 15 Minuten«. Der häufigste Fehler am Anfang ist zu viel in einer Stunde." },
    pruefliste: { titel: "Drei Fragen vor dem Kopieren", text: "Stimmt es fachlich? Passt das Niveau? Was müssen die Lernenden selbst tun? Der Fehler bleibt beim System, nicht auf dem Arbeitsblatt." },
    papierfrage: { titel: "Die Papierfrage als Stopp", text: "Geht es auf Papier genauso gut? Dann bleibt es Papier. Das erspart den Bau von Dingen, die niemand braucht." },
    zwei: { titel: "Zwei Fassungen bestellen", text: "Lass dir zwei Varianten des Einstiegs geben und nimm die bessere – wählen ist leichter als korrigieren." }
  };

  function startpunkt(a) {
    a = a || {};
    var hat = function (feld, wert) { return (a[feld] || []).indexOf(wert) > -1; };
    var h = a.haeufigkeit, oft = h === "mehrmals" || h === "taeglich", selten = h === "nie" || h === "probiert";
    var schule = ["texte", "arbeitsblatt", "differenzieren", "erwartung", "quiz", "planen"].filter(function (w) { return hat("wofuer", w); }).length;
    var lernende = hat("wofuer", "gebaut") || hat("wofuer", "lernende");
    var skeptisch = hat("gedanken", "fach") || hat("hindernis", "zweifel") || a.ziel === "nein";
    var leer = !h && !(a.wofuer || []).length && !(a.anlass || []).length;

    var id = "offen";
    if (!leer) {
      if (lernende && (oft || a.s_bauen === "sicher")) id = "weit";
      else if (oft || schule >= 2) id = "fuersich";
      else if ((h === "probiert" || h === "woechentlich") && (a.ergebnis === "selten" || a.ergebnis === "nacharbeit" || hat("hindernis", "allgemein") || hat("hindernis", "dauer") || hat("hindernis", "fehler"))) id = "enttaeuscht";
      else if (selten || hat("systeme", "keines") || hat("wofuer", "nichts")) id = "anfang";
      else if (h === "woechentlich") id = "fuersich";
    }
    var lage = { id: id, titel: SP_LAGEN[id].titel, text: SP_LAGEN[id].text, skeptisch: skeptisch };

    /* Unterricht mit Tablets (seit 4.30): beschreibt, was die Lernenden heute am Gerät tun. Reihenfolge der Prüfung:
       keine Tablet-Klasse → mehr als Papier (oft/manchmal oder üben, gemeinsam, erstellen) → vor allem Ablage → offen. */
    var mehr = a.d_mehrwert === "oft" || a.d_mehrwert === "manchmal" || hat("tablet", "ueben") || hat("tablet", "gemeinsam") || hat("tablet", "erstellen");
    var tid = "offen";
    if (a.d_klassen === "keine" || hat("tablet", "keine")) tid = "keine";
    else if (mehr) tid = "phasen";
    else if ((a.tablet || []).length || a.d_mehrwert === "selten") tid = "ablage";
    var tablet = { id: tid, titel: SP_TABLET[tid].titel, text: SP_TABLET[tid].text };
    var unruhe = hat("d_schwer", "ablenkung") || hat("d_schwer", "ueberblick") || hat("d_regeln", "keine") || a.s_fuehren === "unsicher" || a.d_wunsch === "ruhe";

    /* Stärken zuerst – der Bericht beginnt nie mit dem, was fehlt. */
    var staerken = [];
    if (hat("systeme", "land")) staerken.push("Du arbeitest schon mit dem Landesangebot – dem sicheren Ort für Schulisches.");
    if (a.eingabe === "ausfuehrlich" || a.eingabe === "vorlage") staerken.push("Deine Anfragen sind schon ausführlich oder als Vorlage gespeichert. Das ist der halbe Weg.");
    if (a.eingabe === "sprechen") staerken.push("Du sprichst Anfragen ein – der schnellste Weg zu einer guten Anfrage.");
    if (a.s_pruefen === "sicher") staerken.push("Du prüfst KI-Ergebnisse fachlich sicher. Das bleibt die wichtigste Fähigkeit.");
    if (a.s_duerfen === "sicher") staerken.push("Du weißt, was du eingeben darfst.");
    if (tid === "phasen") staerken.push("Deine Klasse tut am Tablet schon Dinge, die auf Papier kaum gingen.");
    if (tid !== "keine" && (a.d_regeln || []).length && !hat("d_regeln", "keine")) staerken.push("Du führst Tablet-Phasen schon mit festen Absprachen.");
    if ((a.d_formen || []).filter(function (w) { return w !== "nichts"; }).length >= 2) staerken.push("Du hast schon mehrere digitale Formen im Unterricht ausprobiert.");
    if (schule >= 1) staerken.push("Du hast KI schon für die Schule genutzt.");
    if (a.ziel === "nein" || hat("gedanken", "fach")) staerken.push("Du fragst, ob dein Unterricht das überhaupt braucht. Diese Frage stellt Kidu auch – »bleibt auf Papier« ist ein vollwertiges Ergebnis.");
    if (!staerken.length) staerken.push("Du nimmst dir Zeit, hinzusehen, bevor du etwas einsetzt. Das ist die Grundhaltung dieser Seite.");

    var sicherheit = SP_SICHER.map(function (f) { return { id: f[0], titel: f[1], wert: a[f[0]] || "offen" }; });

    /* Schritte: der erste gewählte Anlass zuerst, dann nach Lage, höchstens drei. */
    var schritte = [], seen = {};
    function push(s) { if (s && !seen[s.link + s.text]) { seen[s.link + s.text] = 1; schritte.push(s); } }
    if (skeptisch) push({ text: "Prüf deine mitgebrachte Stunde mit der Papierfrage. »Bleibt auf Papier« ist ein gutes Ergebnis.", link: "unterricht.html#t-probe", linktext: "Zur Papierfrage" });
    /* Der erste Anlass, dann der gewählte Wunsch »Schnellere Rückmeldung« (aus dem Ist-Stand, ab 4.36),
       dann höchstens ein weiterer Schritt zum Unterricht mit Tablets, dann die übrigen Anlässe. */
    push(SP_ANLASS[(a.anlass || [])[0]]);
    var papier = skeptisch;
    if (tid !== "keine") {
      if (a.d_wunsch === "feedback") push(SP_ANLASS.uebung);
      if (unruhe) push({ text: "Lies die sechs Regeln für Tablet-Phasen und nimm eine davon in deine nächste Stunde mit.", link: "tablet-phasen.html#t-regeln", linktext: "Tablet-Phasen gut führen" });
      else if (!papier && a.d_wunsch === "papier") { papier = true; push({ text: "Prüf eine Tablet-Phase mit der Papierfrage. »Zurück auf Papier« ist ein vollwertiges Ergebnis.", link: "unterricht.html#t-probe", linktext: "Zur Papierfrage" }); }
      else if (!papier && (tid === "ablage" || hat("d_schwer", "ideen") || a.d_wunsch === "mehrwert")) { papier = true; push({ text: "Such in deiner mitgebrachten Stunde die eine Stelle, an der das Tablet mehr kann als Papier.", link: "unterricht.html#t-probe", linktext: "Zur Papierfrage" }); }
    }
    (a.anlass || []).slice(1).forEach(function (k) { push(SP_ANLASS[k]); });
    if (id === "anfang" || a.s_duerfen === "unsicher" || hat("hindernis", "datenschutz")) push({ text: "Lies die fünf Regeln zum sicheren Arbeiten – dann weißt du, was in die KI darf und was nicht.", link: "sicher.html", linktext: "Sicher arbeiten" });
    if (id === "enttaeuscht") push({ text: "Bau deine alte Anfrage nach den fünf Teilen um: Ziel, Kontext, Vorgaben, Format, Prüfkriterien.", link: "ki.html#t-lernen", linktext: "Prompten lernen" });
    if (id === "fuersich" && !papier) push({ text: "Prüf eine Stelle deiner Stunde mit der Papierfrage: Was kann das Tablet hier besser?", link: "unterricht.html#t-probe", linktext: "Zur Papierfrage" });
    if (id === "weit") push({ text: "Prüf dein bestes Material mit dem Digital-Check. Der Bericht beginnt mit den Stärken.", link: "selbstcheck.html", linktext: "Digital-Check" });
    if (id === "offen") push({ text: "Bring deine Stunde mit und nenn die Stelle, an der die Lernenden hängen bleiben. Mehr braucht die erste Stunde nicht.", link: "beratung.html", linktext: "Beratungsstunde" });
    push({ text: "Sieh dir an, was im Unterricht schon ausprobiert wurde.", link: "galerie.html", linktext: "Zu den Unterrichtsbeispielen" });

    /* Kniffe: zwei, passend zur Lage und zur Arbeitsweise. */
    var kniffe = [];
    function kniff(k) { if (kniffe.length < 2 && kniffe.indexOf(SP_KNIFFE[k]) < 0) kniffe.push(SP_KNIFFE[k]); }
    if (a.eingabe !== "sprechen" && (id === "anfang" || id === "enttaeuscht" || id === "offen")) kniff("sprechen");
    if (hat("material", "schulbuch") || hat("material", "blaetter") || a.vorbereitung === "fundus") kniff("foto");
    if (id === "enttaeuscht") kniff("rueckfragen");
    if (a.vorbereitung === "genau") kniff("haelfte");
    if (a.vorbereitung === "geruest") kniff("zwei");
    if (id === "fuersich" || id === "weit") kniff("papierfrage");
    if (hat("hindernis", "fehler") || a.s_pruefen === "unsicher") kniff("pruefliste");
    kniff("vorlage"); kniff("pruefliste");

    /* Codeblock für die Leitung: nur Auswahlwerte, lesbar und maschinenlesbar. */
    var code = ["fortbildungsbogen v2", "lage=" + id + (skeptisch ? "+skeptisch" : ""), "tablet=" + tid];
    ["haeufigkeit", "eingabe", "ergebnis", "d_klassen", "d_dauer", "d_mehrwert", "d_wunsch", "vorbereitung", "zeit", "ziel", "s_bedienen", "s_pruefen", "s_duerfen", "s_bauen", "s_fuehren"].forEach(function (f) { if (a[f]) code.push(f + "=" + a[f]); });
    ["systeme", "wofuer", "hindernis", "tablet", "d_formen", "d_gut", "d_schwer", "d_regeln", "material", "anlass", "gedanken", "lernen"].forEach(function (f) { if ((a[f] || []).length) code.push(f + "=" + a[f].join(",")); });

    return { lage: lage, tablet: tablet, staerken: staerken.slice(0, 3), sicherheit: sicherheit, schritte: schritte.slice(0, 3), kniffe: kniffe, code: code.join(" · "),
             satz: "Das ist keine Bewertung. Es ist dein Startpunkt – damit die Fortbildung bei dir anfängt und nicht irgendwo." };
  }

  /* 13. »Mein Rückmeldebogen« (rueckmeldebogen.html, ab 4.36; Entscheidung Mario, 13.11.2026) – der letzte Schritt nach der Stunde.
        Kolleg*innen halten fest, was gelungen ist und wo es hakt, und geben den Bogen selbst an die Person weiter,
        die ihre Fortbildung leitet. Die Seite verschickt und speichert nichts außer den Kreuzen im Browser.
        Eingabe (alle Felder dürfen fehlen):
          art:        Liste aus erfahrung | herausforderung | kidu | wunsch
          womit:      Liste aus planen | digitalisieren | koffer | check | phasen | beispiel | ki | anderes
          hakt:       Liste aus technik | zeit | ablenkung | auftrag | niveau | plenum | anderes | nichts
          brauche:    Liste aus beispiel | gespraech | planung | technik | nichts
          weitergabe: ja | fragen | nein
          texte:      { kuerzel, was, gut, stelle, geaendert, frage } – Freitexte, nie gespeichert
          datum:      Text für den Kopf (die Seite setzt das heutige Datum)
        Regeln:
          - Keine Bewertung, keine Punkte, keine Noten. Der Bogen gibt die Antworten in eigenen Worten wieder.
          - Höchstens zwei Hilfen, in der Reihenfolge der Kreuze bei »Wo hat es gehakt?«. Zur Technik gibt es keine
            Hilfe auf Kidu – dafür ist die Leitung da.
          - Ohne Kreuz bei der Weitergabe steht dort »noch offen« – nie stillschweigend »ja«.
          - Leere Felder fehlen im Bogen; die Seite füllt nichts mit allgemeinen Sätzen. */
  var RB = {
    art: { erfahrung: "Eine Erfahrung aus meinem Unterricht", herausforderung: "Eine Herausforderung, bei der ich nicht weiterkomme", kidu: "Eine Rückmeldung zu Kidu", wunsch: "Ein Wunsch für die nächste Fortbildung" },
    womit: { planen: "Unterricht neu planen", digitalisieren: "Bisherigen Unterricht digitalisieren", koffer: "Aufgabenkoffer oder Methodenkoffer", check: "Papierfrage oder Digital-Check", phasen: "Tablet-Phasen gut führen", beispiel: "Eines der Unterrichtsbeispiele", ki: "KI-Training", anderes: "Etwas anderes" },
    hakt: { technik: "Technik: Anmelden, Netz, Akku", zeit: "Die Zeit hat nicht gereicht", ablenkung: "Ablenkung am Gerät", auftrag: "Der Auftrag war nicht klar", niveau: "Für manche zu schwer oder zu leicht", plenum: "Das Ergebnis kam nicht zurück ins Gespräch", anderes: "Woanders", nichts: "Nirgends" },
    brauche: { beispiel: "Ein Beispiel aus meinem Fach", gespraech: "Ein kurzes Gespräch", planung: "Hilfe beim Planen der nächsten Stunde", technik: "Hilfe bei der Technik", nichts: "Nichts – ich möchte nur berichten" },
    weitergabe: { ja: "Ja, ohne meinen Namen", fragen: "Erst mich fragen", nein: "Nein, nur für die Leitung" },
    hilfe: {
      zeit: { text: "Prüf mit der Papierfrage, ob die Phase am Gerät die Zeit wert ist. »Zurück auf Papier« ist ein vollwertiges Ergebnis.", link: "unterricht.html#t-probe", linktext: "Zur Papierfrage" },
      ablenkung: { text: "Lies die sechs Regeln für Tablet-Phasen und nimm eine davon in die nächste Stunde mit.", link: "tablet-phasen.html#t-regeln", linktext: "Tablet-Phasen gut führen" },
      auftrag: { text: "Im Aufgabenkoffer steht zu jeder Aufgabenform, wie du sie stellst.", link: "aufgabenkoffer.html", linktext: "Aufgabenkoffer" },
      niveau: { text: "Ein Inhalt, mehrere Zugänge: das Prinzip »Stufen«.", link: "sechs-hebel.html#sh-stufen", linktext: "Prinzip Stufen" },
      plenum: { text: "Plane eine feste Stelle, an der das Ergebnis vom Gerät zurück ins Gespräch kommt (Satz 5).", link: "sechs-hebel.html#fuenf-saetze", linktext: "Die fünf Sätze" }
    }
  };
  function rueckmeldebogen(a) {
    a = a || {};
    var tx = a.texte || {};
    function liste(feld) { return (a[feld] || []).filter(function (w) { return RB[feld][w]; }).map(function (w) { return RB[feld][w]; }); }
    function sauber(s) { return String(s == null ? "" : s).replace(/\s+/g, " ").trim(); }
    var zeilen = [];
    function zeile(titel, wert) { if (wert) zeilen.push({ titel: titel, wert: wert }); }
    zeile("Kürzel", sauber(tx.kuerzel));
    zeile("Worum es geht", liste("art").join(" · "));
    zeile("Womit", liste("womit").join(" · "));
    zeile("Was genau", sauber(tx.was));
    zeile("Was gut geklappt hat", sauber(tx.gut));
    zeile("Wo es gehakt hat", liste("hakt").join(" · "));
    zeile("Die Stelle", sauber(tx.stelle));
    zeile("Geändert oder zu ändern", sauber(tx.geaendert));
    zeile("Was helfen würde", liste("brauche").join(" · "));
    zeile("Frage an die Leitung", sauber(tx.frage));
    var weitergabe = RB.weitergabe[a.weitergabe] || "noch offen";
    zeilen.push({ titel: "Weitergabe ohne Namen", wert: weitergabe });

    var hilfen = [];
    (a.hakt || []).forEach(function (w) { if (RB.hilfe[w] && hilfen.length < 2) hilfen.push(RB.hilfe[w]); });

    var kopf = "Rückmeldung aus Kidu · Mein Rückmeldebogen" + (a.datum ? " · " + a.datum : "");
    var text = [kopf].concat(zeilen.map(function (z) { return z.titel + ": " + z.wert; })).join("\n");
    return { titel: "Meine Rückmeldung", zeilen: zeilen, hilfen: hilfen, weitergabe: weitergabe, text: text,
             leer: zeilen.length === 1,
             satz: "Das ist keine Bewertung. Es ist deine Erfahrung – sie hilft, die Fortbildung und Kidu besser zu machen." };
  }

  /* 14. Ganze Einheit (ab 4.37, Fassung B) – eine eigene Ebene über mehreren Stunden, keine vierte Stufe.
        Eingabe: da – Liste der Merkmale, die es schon gibt (Ids aus TAXONOMIEN.einheit.merkmale).
        Regeln:
          - Der Rahmen kommt zuerst: Für jedes fehlende Merkmal ein Schritt aus »Landkarte der Einheit«, in der Reihenfolge
            Leitfrage · Stundenfolge · Landkarte und Bausteine · Sicherung.
          - Die Papierprobe je Stunde steht immer da: Keine Stunde bekommt ein Gerät, nur weil die Nachbarstunde eins hat.
          - Danach je Stunde der Weg wie bisher (Phase, Ziel, Mehrwert, Umfang). umfang() bleibt unverändert.
          - Keine Bewertung, keine Punkte: Fehlendes heißt »als Nächstes«, nicht »zu wenig«. */
  function einheit(a, T) {
    a = a || {};
    T = T || (typeof TAXONOMIEN !== "undefined" ? TAXONOMIEN : (typeof require !== "undefined" ? require("./daten/taxonomien.js") : null));
    var E = T.einheit, s = E.schritte, da = (a.da || []).filter(function (id) { return E.merkmale.some(function (m) { return m.id === id; }); });
    var hat = function (id) { return da.indexOf(id) > -1; };
    var naechstes = [];
    if (!hat("leitfrage")) naechstes.push(s[0]);
    if (!hat("stundenfolge")) naechstes.push(s[1]);
    if (!hat("landkarte") || !hat("bausteine")) naechstes.push(s[2]);
    if (!hat("sicherung")) naechstes.push(s[3]);
    return {
      satz: E.satz,
      da: E.merkmale.filter(function (m) { return hat(m.id); }).map(function (m) { return m.name; }),
      naechstes: naechstes,
      papierprobe: s[4],
      weiter: naechstes.length
        ? "Wenn der Rahmen steht: Wähl die Stunde, mit der es weitergeht. Für sie gehst du den Weg wie bisher."
        : "Der Rahmen steht. Wähl die Stunde, mit der es weitergeht. Für sie gehst du den Weg wie bisher.",
      satzEnde: "Das ist keine Bewertung. Eine Einheit ist nicht besser als eine einzelne Stunde – sie ist ein anderer Rahmen."
    };
  }

  var REGELN = {
    PASST: PASST, einstufung: einstufung, umfang: umfang, rollen: rollen, anpassung: anpassung,
    stolperstein: stolperstein, naechsterSchritt: naechsterSchritt, beispiele: beispiele,
    entscheidungskarte: entscheidungskarte, selbsteinschaetzung: selbsteinschaetzung,
    papierprobe: papierprobe, beobachtung: beobachtung, startpunkt: startpunkt, rueckmeldebogen: rueckmeldebogen, einheit: einheit
  };
  if (typeof module !== "undefined") module.exports = REGELN;
  else wurzel.REGELN = REGELN;
})(this);
