/* Hilde-Digital – gemeinsame Sprache für alle Seiten.
   Phasen, Anliegen, Umfang, Rollen und Mehrwert-Arten werden überall gleich verwendet:
   im Tablet-Weg, im Showroom, auf den Detailseiten und in den Regeln (assets/regeln.js).
   Ein Eintrag hier ändert die Auswahl überall. Schlüssel (id) nie umbenennen, nur Texte. */

var TAXONOMIEN = {

  /* Unterrichtsphasen – eine Orientierung, kein starres Modell. */
  phasen: [
    { id: "einstieg", name: "Einstieg" },
    { id: "erarbeitung", name: "Erarbeitung" },
    { id: "sicherung", name: "Sicherung", hilfe: "Ergebnisse ordnen, festhalten und festigen" },
    { id: "abschluss", name: "Abschluss & Transfer" },
    { id: "uebergreifend", name: "Phasenübergreifend" },
    { id: "offen", name: "Noch offen" }
  ],

  /* Didaktische Anliegen. haeufig = steht im Tablet-Weg zuerst. bereich "ki" = nur KI für meine Arbeit. */
  anliegen: [
    { id: "interesse", name: "Interesse & Motivation", haeufig: true },
    { id: "vorwissen", name: "Vorwissen aktivieren" },
    { id: "erkunden", name: "Erkunden & entdecken", haeufig: true },
    { id: "verstehen", name: "Verstehen & vertiefen", haeufig: true },
    { id: "ueben", name: "Üben & anwenden", haeufig: true },
    { id: "zusammen", name: "Zusammenarbeiten", haeufig: true },
    { id: "recherche", name: "Recherchieren & prüfen" },
    { id: "rueckmeldung", name: "Rückmeldung geben" },
    { id: "lernstand", name: "Lernstand erkennen", haeufig: true },
    { id: "differenzieren", name: "Differenzieren & unterstützen" },
    { id: "sichern", name: "Ergebnisse sichern" },
    { id: "reflektieren", name: "Reflektieren & übertragen" },
    { id: "leistung", name: "Leistung erfassen" },
    { id: "material", name: "Material verbessern", bereich: "ki" },
    { id: "ablaeufe", name: "Konferenzen und Abläufe strukturieren", bereich: "ki" }
  ],

  /* Umfang der Digitalität – ohne Rangfolge. Durchgängig ist keine höhere Stufe. */
  umfang: [
    { id: "punktuell", name: "Punktuell", hilfe: "eine einzelne Aktivität oder ein kurzer Impuls" },
    { id: "phasenweise", name: "Phasenweise", hilfe: "eine oder mehrere Unterrichtsphasen" },
    { id: "durchgaengig", name: "Durchgängig", hilfe: "ein zusammenhängendes digitales Lernsetting, z. B. eine HTML-Lernumgebung für eine Stunde" }
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
     netz: true = braucht in der Regel ein verlässliches Netz. */
  mehrwerte: [
    { id: "rueckmeldung", name: "schneller Rückmeldung erhalten", art: "lernen" },
    { id: "sichtbar", name: "Ergebnisse sichtbar machen und vergleichen", art: "lernen" },
    { id: "experimentieren", name: "mit Medien untersuchen oder experimentieren", art: "lernen" },
    { id: "gemeinsam", name: "gemeinsam an einem Ergebnis arbeiten", art: "lernen" },
    { id: "individuell", name: "individuell üben oder Unterstützung erhalten", art: "lernen" },
    { id: "zugaenge", name: "unterschiedliche Zugänge und Niveaus anbieten", art: "lernen" },
    { id: "dokumentieren", name: "Lernwege dokumentieren und reflektieren", art: "lernen" },
    { id: "authentisch", name: "authentische Informationen, Daten oder Werkzeuge nutzen", art: "lernen", netz: true },
    { id: "zeitort", name: "zeit- oder ortsunabhängig weiterarbeiten", art: "lernen", netz: true },
    { id: "organisation", name: "hauptsächlich Material verteilen oder einsammeln", art: "organisation" },
    { id: "unklar", name: "noch unklar", art: "offen" }
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
  status: ["Idee", "in Entwicklung", "Prototyp", "im Unterricht erprobt", "In Überarbeitung",
           "für die Präsentation vorbereitet", "noch offen"],

  bereiche: [
    { id: "ki", name: "KI für meine Arbeit" },
    { id: "lernen", name: "Unterricht mit Tablets" },
    { id: "beide", name: "mit KI entwickelt" }
  ],

  kiEinsatz: [
    { id: "keiner", name: "ohne KI" },
    { id: "vorbereitung-lehrkraft", name: "KI hat bei der Vorbereitung geholfen" },
    { id: "entwicklung-anwendung", name: "mit KI entwickelt" },
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
