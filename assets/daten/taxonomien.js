/* Kidu – gemeinsame Sprache für alle Seiten.
   Phasen, Anliegen, Umfang, Rollen und Mehrwert-Arten werden überall gleich verwendet:
   im Planungsweg, in der Galerie, auf den Detailseiten und in den Regeln (assets/regeln.js).
   Ein Eintrag hier ändert die Auswahl überall. Schlüssel (id) nie umbenennen, nur Texte. */

var TAXONOMIEN = {

  /* Unterrichtsphasen – eine Orientierung, kein starres Modell. */
  /* Phasen (ab 4.37 neue Namen und Hilfetexte, Entscheidung Mario 13.11.2026; die Schlüssel bleiben).
     kurz = Wort unter der Stundenlinie. Bis 4.36: Sicherung · Abschluss & Transfer · Phasenübergreifend. */
  phasen: [
    { id: "einstieg", name: "Einstieg", kurz: "Einstieg", hilfe: "Eine Frage öffnen, Vorwissen holen, das Ziel nennen." },
    { id: "erarbeitung", name: "Erarbeitung", kurz: "Erarbeitung", hilfe: "Neues verstehen: zeigen, erklären, selbst denken." },
    { id: "sicherung", name: "Sichern und üben", kurz: "Sichern", hilfe: "Festhalten, was gilt. Üben. Später wiederholen." },
    { id: "abschluss", name: "Übertragen und Ausblick", kurz: "Übertragen", hilfe: "Auf einen neuen Fall übertragen. Sagen, was als Nächstes kommt." },
    { id: "uebergreifend", name: "In jeder Phase", hilfe: "Führen, prüfen, zurückmelden – die ganze Stunde." },
    { id: "offen", name: "Noch offen" }
  ],

  /* Didaktische Anliegen. haeufig = steht im Planungsweg zuerst. bereich "ki" = nur KI-Training.
     ziel = kurze Antwort auf die Frage des Planungswegs »Was soll dein digitaler Abschnitt vor allem bewirken?«.
     Überall sonst (Galerie, Detailseite, Karte) steht name. */
  anliegen: [
    { id: "interesse", name: "Interesse & Motivation", ziel: "Motivieren und Interesse wecken", haeufig: true },
    { id: "vorwissen", name: "Vorwissen aktivieren", ziel: "Vorwissen aktivieren" },
    { id: "erkunden", name: "Erkunden & entdecken", ziel: "Etwas erkunden und entdecken lassen" },
    { id: "verstehen", name: "Verstehen & vertiefen", ziel: "Verständnis aufbauen und vertiefen", haeufig: true },
    { id: "ueben", name: "Üben & anwenden", ziel: "Üben und festigen", haeufig: true },
    { id: "zusammen", name: "Zusammenarbeiten", ziel: "Zusammenarbeit fördern" },
    { id: "recherche", name: "Recherchieren & prüfen", ziel: "Recherchieren und Quellen prüfen" },
    { id: "rueckmeldung", name: "Rückmeldung geben", ziel: "Rückmeldung geben" },
    { id: "lernstand", name: "Lernstand erkennen", ziel: "Sehen, wo die Klasse steht", haeufig: true },
    { id: "differenzieren", name: "Differenzieren & unterstützen", ziel: "Unterschiedlich fördern und unterstützen" },
    { id: "sichern", name: "Ergebnisse sichern", ziel: "Ergebnisse sichern" },
    { id: "reflektieren", name: "Reflektieren & übertragen", ziel: "Nachdenken und übertragen lassen" },
    { id: "leistung", name: "Leistung erfassen", ziel: "Leistung feststellen", haeufig: true },
    { id: "material", name: "Material verbessern", bereich: "ki" },
    { id: "ablaeufe", name: "Konferenzen und Abläufe strukturieren", bereich: "ki" }
  ],

  /* Umfang des Tablet-Einsatzes – ohne Rangfolge. Durchgängig ist keine höhere Stufe.
     Durchgängig heißt nicht »alles am Gerät« (Entscheidung 1.11.2026, »Labor oder Plenum?«): Das Gerät trägt die Stunde,
     Deutung und Urteil entstehen im Plenum, lange Texte liegen auf Papier. */
  /* Die sechs Prinzipien (bis 11.11.2026 »Hebel«): was das Gerät kann. Keine Reihenfolge, kein Rang.
     Schlüssel wie die Sprungmarken auf sechs-hebel.html (#sh-<id>). */
  prinzipien: [
    { id: "verdecken", name: "Verdecken", hilfe: "hält die Auflösung zurück" },
    { id: "rueckmelden", name: "Rückmelden", hilfe: "antwortet sofort, mit Grund" },
    { id: "messen", name: "Messen", hilfe: "misst, teilt zu, rechnet aus" },
    { id: "variieren", name: "Variieren", hilfe: "verschiebt einen Wert, zeigt die Folge" },
    { id: "stufen", name: "Stufen", hilfe: "ein Inhalt, mehrere Zugänge" },
    { id: "buendeln", name: "Bündeln", hilfe: "sammelt die Klasse ohne Namen" }
  ],

  umfang: [
    { id: "punktuell", name: "Punktuell", hilfe: "eine einzelne Aktivität oder ein kurzer Impuls" },
    { id: "phasenweise", name: "Phasenweise", hilfe: "eine oder mehrere Unterrichtsphasen" },
    { id: "durchgaengig", name: "Durchgängig", hilfe: "das Tablet begleitet die ganze Stunde, z. B. mit einer Lernanwendung im Browser – mit festen Stellen im Plenum" }
  ],

  /* Rollen der Lehrkraft – Kombinationen möglich, keine Rolle ist höherwertig. */
  rollen: [
    { id: "anleiten", name: "Anleiten", hilfe: "Ziele, Ablauf und Arbeitsschritte vorgeben" },
    { id: "erklaeren", name: "Erklären", hilfe: "Zusammenhänge darstellen und Verständnis aufbauen" },
    { id: "moderieren", name: "Moderieren", hilfe: "Austausch strukturieren und Ergebnisse bündeln" },
    { id: "begleiten", name: "Begleiten", hilfe: "beobachten, beraten, gezielt unterstützen" },
    { id: "rueckmelden", name: "Rückmelden", hilfe: "Lernstände sichtbar machen und nächste Schritte anregen" }
  ],

  /* Was soll durch das Tablet besser möglich werden?
     art: "lernen" = möglicher Lernmehrwert, "organisation" = organisatorischer Nutzen, "offen" = noch unklar.
     netz: true = braucht in der Regel ein verlässliches Netz.
     haeufig = steht im Planungsweg zuerst, der Rest unter »Weitere anzeigen«. */
  mehrwerte: [
    { id: "rueckmeldung", name: "schneller Rückmeldung erhalten", art: "lernen", haeufig: true },
    { id: "sichtbar", name: "Ergebnisse sichtbar machen und vergleichen", art: "lernen" },
    { id: "experimentieren", name: "mit Medien untersuchen oder experimentieren", art: "lernen", haeufig: true },
    { id: "gemeinsam", name: "gemeinsam an einem Ergebnis arbeiten", art: "lernen", haeufig: true },
    { id: "individuell", name: "individuell üben oder Unterstützung erhalten", art: "lernen", haeufig: true },
    { id: "zugaenge", name: "unterschiedliche Zugänge und Niveaus anbieten", art: "lernen" },
    { id: "dokumentieren", name: "Lernwege dokumentieren und reflektieren", art: "lernen" },
    { id: "authentisch", name: "authentische Informationen, Daten oder Werkzeuge nutzen", art: "lernen", netz: true },
    { id: "zeitort", name: "zeit- oder ortsunabhängig weiterarbeiten", art: "lernen", netz: true },
    { id: "organisation", name: "hauptsächlich Material verteilen oder einsammeln", art: "organisation", haeufig: true },
    { id: "unklar", name: "noch unklar", art: "offen", haeufig: true }
  ],

  /* Rahmen: nur Bedingungen, die die Empfehlung tatsächlich ändern. Alle Angaben sind freiwillig.
     Ein Test (tests/regeln.test.js) prüft, dass jede Frage mindestens eine Aussage der Karte ändert. */
  rahmen: [
    { id: "netz", frage: "Ist das Netz im Raum verlässlich?",
      optionen: [{ id: "ja", name: "ja" }, { id: "wackelig", name: "manchmal" }, { id: "nein", name: "nein" }] },
    { id: "geraete", frage: "Welche Geräte nutzen die Lernenden?",
      optionen: [{ id: "eigene", name: "eigene Tablets" }, { id: "geteilt", name: "geteilte Geräte" }] },
    { id: "erfahrung", frage: "Wie vertraut ist die Klasse mit Tablets im Unterricht?",
      optionen: [{ id: "wenig", name: "wenig" }, { id: "etwas", name: "etwas" }, { id: "viel", name: "sehr" }] },
    { id: "zeit", frage: "Wie viel Vorbereitungszeit hast du?",
      optionen: [{ id: "wenig", name: "unter 30 Minuten" }, { id: "mittel", name: "etwa eine Stunde" }, { id: "viel", name: "mehr" }] },
    { id: "sozialform", frage: "Wie arbeiten die Lernenden vor allem?",
      optionen: [{ id: "allein", name: "allein" }, { id: "paar", name: "zu zweit" }, { id: "gruppe", name: "in Gruppen" }, { id: "klasse", name: "mit der ganzen Klasse" }] },
    { id: "zugang", frage: "Brauchen Einzelne Hilfe beim Lesen, Sehen, Hören oder Bedienen?",
      optionen: [{ id: "ja", name: "ja" }, { id: "nein", name: "nein" }] },
    { id: "daten", frage: "Entstehen Daten zu einzelnen Lernenden (Namen, Fotos, Ergebnisse)?",
      optionen: [{ id: "ja", name: "ja" }, { id: "nein", name: "nein" }] }
  ],

  /* Die vier Einstufungen der Entscheidungskarte – qualitativ, ohne Punkte oder Noten. */
  einstufungen: [
    { id: "klar", name: "Klarer Lernmehrwert erkennbar" },
    { id: "anpassung", name: "Mehrwert möglich, Unterrichtsanpassung nötig" },
    { id: "organisatorisch", name: "Vor allem organisatorischer Nutzen" },
    { id: "analog", name: "Analog oder hybrid vermutlich passender" }
  ],

  /* Erlaubte Status. Technischer Reifegrad ist nicht gleich didaktischer Qualität. */
  status: ["Idee", "in Entwicklung", "Prototyp", "im Unterricht erprobt", "in der Praxis erprobt", "In Überarbeitung",
           "für die Präsentation vorbereitet", "noch offen"],  /* »in der Praxis erprobt« ab 4.37: außerhalb des Unterrichts im Einsatz */

  /* Ganze Einheit (ab 4.37, Fassung B, Entscheidung Mario 13.11.2026): eine eigene Ebene über mehreren Stunden,
     keine vierte Stufe des Umfangs. Der Umfang bleibt eine Entscheidung je Stunde – auch »ohne Gerät«.
     merkmale: die fünf Merkmale einer Einheit. schritte: Schritt E »Landkarte der Einheit« (Wortlaut wie im Skill
     unterricht-digitalisieren). Regel dazu: REGELN.einheit (assets/regeln.js). */
  einheit: {
    name: "Ganze Einheit",
    satz: "Plane mehrere Stunden als Ganzes: eine Landkarte, eine Leitfrage, eine Sicherung. In jeder Stunde entscheidest du neu, wie viel Gerät sie braucht – auch keins.",
    abgrenzung: "»Durchgängig« beschreibt eine Stunde. »Ganze Einheit« beschreibt den Rahmen über mehrere Stunden. Eine Einheit kann Papierstunden enthalten.",
    merkmale: [
      { id: "landkarte", name: "Landkarte", hilfe: "Eine Landkarte, die in jeder Stunde wiederkommt." },
      { id: "leitfrage", name: "Leitfrage", hilfe: "Eine Leitfrage über die Stunden." },
      { id: "bausteine", name: "Wiederkehrende Bausteine", hilfe: "Am Anfang und am Ende jeder Stunde dasselbe." },
      { id: "sicherung", name: "Sicherung über die Einheit", hilfe: "Sie richtet sich an der Klassenarbeit oder Prüfung aus." },
      { id: "stundenfolge", name: "Stundenfolge", hilfe: "Jede Stunde hat ihren eigenen Umfang – auch Papier." }
    ],
    schritte: [
      "Schreib die Leitfrage der Einheit in einem Satz.",
      "Leg die Stundenfolge an: je Stunde ein Satz und die Frage der Stunde.",
      "Lege fest, was jede Stunde wiederkehrt: am Anfang die Landkarte mit dem heutigen Standort, am Ende ein Satz in die Lernspur.",
      "Plane die Sicherung über die Einheit. Richte sie an der Klassenarbeit oder Prüfung aus.",
      "Mach je Stunde eine vorläufige Papierprobe: Welche Stunde braucht ein Gerät, welche nicht? Keine Stunde bekommt ein Gerät, nur weil die Nachbarstunde eins hat."
    ]
  },

  /* Bereiche der Unterrichtsbeispiele (seit 4.36, Entscheidung Mario 13.11.2026): »Unterricht« und »Außerhalb des Unterrichts«.
     Die Schlüssel bleiben (lernen, ki); die Farben auch: Petrol für Unterricht, Ocker für außerhalb – keine dritte Farbe. */
  bereiche: [
    { id: "ki", name: "Außerhalb des Unterrichts" },
    { id: "lernen", name: "Unterricht" }
  ],

  kiEinsatz: [
    { id: "keiner", name: "ohne KI" },
    { id: "vorbereitung-lehrkraft", name: "KI hat bei der Vorbereitung geholfen" },
    { id: "entwicklung-anwendung", name: "KI hat beim Bau der Anwendung geholfen" },
    { id: "nutzung-lernende", name: "Lernende nutzen KI" }
  ]
};

/* Kurzer Zugriff: Name zu einer id. */
TAXONOMIEN.name = function (liste, id) {
  var l = TAXONOMIEN[liste] || [];
  for (var i = 0; i < l.length; i++) if (l[i].id === id) return l[i].name;
  return id;
};

if (typeof module !== "undefined") module.exports = TAXONOMIEN;
