/* Hilde Digital – alle Beispiele an einem Ort.

   Regeln (siehe CLAUDE.md, »Wahrheit der Daten«):
   - Titel, Kurzbeschreibung, Fach, Status und Links stammen aus dem abgestimmten Prototyp. Nicht verändern.
   - Unbekanntes bleibt leer (null oder []). Die Oberfläche zeigt dann »noch offen«. Nichts erfinden.
   - Didaktische Zuordnungen, die noch nicht bestätigt sind, stehen in »vorschlag«.
     Bestätigen: den Feldnamen aus »vorschlag« entfernen (und docs/datenluecken.md anpassen).
   - Links nur auf https://geschichtefuerdiegegenwart.github.io/ . Konzeptbeispiele haben keinen Link.
   - Erlaubte Werte stehen in assets/daten/taxonomien.js.

   Neues Beispiel: einen Eintrag kopieren, id und slug neu vergeben, nur Belegtes eintragen. */

var GH = "https://geschichtefuerdiegegenwart.github.io/";

var BEISPIELE = [
  { id: "psycho-ds2", titel: "Siehst du, was sich verändert?", fach: "Psychologie · Psycho-Labor",
    faecher: ["Psychologie"], bereich: "beide", kiEinsatz: "entwicklung-anwendung",
    kurz: "Die Klasse testet ihre eigene Wahrnehmung und vergleicht die Ergebnisse mit einer echten Studie.",
    status: "im Unterricht erprobt", bild: "assets/bilder/psycho-ds2.jpg",
    link: GH + "psycho-labor/ds02-veraenderungsblindheit.html", zuerst: true,
    anliegen: ["erkunden", "rueckmeldung"],
    phasen: ["einstieg", "erarbeitung"], umfang: "phasenweise", rollen: ["anleiten", "moderieren"],
    mehrwerte: ["experimentieren", "sichtbar"],
    vorschlag: { phasen: true, umfang: true, rollen: true, mehrwerte: true } },

  { id: "ns-ideologie", titel: "Die fünf Säulen der NS-Ideologie", fach: "Geschichte · GGK-Labor",
    faecher: ["Geschichte"], bereich: "beide", kiEinsatz: "entwicklung-anwendung",
    kurz: "Die Klasse ordnet Zeugnisse der Täter Denkmustern zu und entdeckt so die Ideen hinter der Ausgrenzung.",
    status: "im Unterricht erprobt", bild: "assets/bilder/ns-ideologie.jpg",
    link: GH + "GGK-Einheit-Nationalsozialismus/ns-ideologie.html", zuerst: true,
    erfahrung: "Im Unterricht eingesetzt. Persönlicher Eindruck: Es lief gut.",
    anliegen: ["verstehen", "zusammen", "rueckmeldung"],
    phasen: ["erarbeitung"], umfang: "phasenweise", rollen: ["begleiten", "moderieren"],
    mehrwerte: ["authentisch", "rueckmeldung", "gemeinsam"],
    vorschlag: { phasen: true, umfang: true, rollen: true, mehrwerte: true } },

  { id: "quest", titel: "Gruppenpädagogik-Quest", fach: "Sozialpädagogik",
    faecher: ["Sozialpädagogik"], bereich: "lernen",
    kurz: "Angehende Erzieher*innen lösen Fälle aus einem Kindergarten und sehen, wie ihre Maßnahmen wirken.",
    status: "im Unterricht erprobt", bild: "assets/bilder/quest.jpg", link: null, zuerst: true,
    erfahrung: "Im Unterricht durchgeführt. Persönlicher Eindruck: Es lief sehr gut.",
    anliegen: ["ueben", "rueckmeldung"],
    phasen: ["sicherung"], umfang: "durchgaengig", rollen: ["begleiten"],
    mehrwerte: ["rueckmeldung", "individuell"],
    vorschlag: { phasen: true, umfang: true, rollen: true, mehrwerte: true } },

  { id: "dialoge", titel: "Sexualpädagogische Dialoge", fach: "Sozialpädagogik",
    faecher: ["Sozialpädagogik"], bereich: "lernen",
    kurz: "Zu dritt üben die Lernenden Gespräche über Kinderfragen: Kind, Fachkraft und Beobachtung.",
    status: "noch offen", bild: "assets/bilder/dialoge.jpg", link: null, zuerst: true,
    anliegen: ["zusammen", "ueben"],
    phasen: ["erarbeitung"], umfang: "phasenweise", rollen: ["begleiten", "rueckmelden"],
    mehrwerte: ["gemeinsam"],
    vorschlag: { phasen: true, umfang: true, rollen: true, mehrwerte: true } },

  { id: "beschlussapp", titel: "Beschlussapp für Sitzungen", fach: "Schulentwicklung",
    faecher: ["Schulentwicklung"], bereich: "ki", kiEinsatz: "entwicklung-anwendung",
    kurz: "Eine Projektgruppe entscheidet 18 offene Punkte und hat am Ende sofort ein Protokoll.",
    status: "noch offen", bild: "assets/bilder/beschlussapp.jpg",
    link: GH + "anlaufstelle-entscheidungen-neu/", zuerst: true,
    anliegen: ["ablaeufe"], rollen: ["moderieren"],
    vorschlag: { rollen: true } },

  { id: "anleitertreffen", titel: "Präsentation für das Anleiter*innentreffen", fach: "Praxisanleitung · 1BKSP",
    faecher: ["Praxisanleitung"], bereich: "ki", kiEinsatz: "vorbereitung-lehrkraft",
    kurz: "Aus der Vorjahresfassung wurde eine klar gegliederte Präsentation mit Zeitstrahl und Quellen.",
    status: "noch offen", bild: "assets/bilder/anleiter-2026.jpg", link: null, zuerst: true,
    anliegen: ["material"],
    vergleich: {
      text: "Links die Fassung von 2025, rechts die Fassung von 2026, überarbeitet mit Unterstützung von KI.",
      vorher: { bild: "assets/bilder/anleiter-2025.jpg", alt: "Folie 2025: drei Kästen zu den Praxisphasen mit Pfeilen", text: "drei Kästen, Termine im Text" },
      nachher: { bild: "assets/bilder/anleiter-2026.jpg", alt: "Folie 2026: Zeitstrahl des Praxisjahres mit Blöcken, Praxisbesuchen und Fristen", text: "das ganze Jahr auf einem Zeitstrahl" }
    } },

  { id: "bef1", titel: "Landkarte der Einheit »Spiel«", fach: "Sozialpädagogik · BEF I",
    faecher: ["Sozialpädagogik"], bereich: "beide", kiEinsatz: "vorbereitung-lehrkraft",
    kurz: "Eine Übersicht zeigt den roten Faden der Einheit; die Lernenden schätzen sich zu drei Zeitpunkten selbst ein.",
    status: "noch offen", bild: "assets/bilder/bef1.jpg", link: null,
    anliegen: ["material", "rueckmeldung"],
    phasen: ["uebergreifend"], rollen: ["rueckmelden"],
    mehrwerte: ["dokumentieren"],
    vorschlag: { phasen: true, rollen: true, mehrwerte: true } },

  { id: "lf3", titel: "Übungsplattform Lebenswelten", fach: "Sozialpädagogik · LF 3",
    faecher: ["Sozialpädagogik"], bereich: "lernen",
    kurz: "Wiederholen mit sofortiger Rückmeldung und eine Übungsklausur mit Musterlösung.",
    status: "noch offen", link: null,
    anliegen: ["ueben", "leistung"],
    phasen: ["sicherung"], umfang: "phasenweise", rollen: ["begleiten"],
    mehrwerte: ["rueckmeldung", "individuell"],
    vorschlag: { phasen: true, umfang: true, rollen: true, mehrwerte: true } },

  { id: "fachbegriffe", titel: "Fachbegriffe-Trainer", fach: "Sozialpädagogik · EBG",
    faecher: ["Sozialpädagogik"], bereich: "lernen",
    kurz: "74 Fachbegriffe aus sechs Lernfeldern: selbst erklären, vergleichen, mit Karteikarten üben.",
    status: "noch offen", link: null,
    anliegen: ["ueben"],
    phasen: ["sicherung"], umfang: "punktuell", rollen: ["begleiten"],
    mehrwerte: ["individuell"],
    vorschlag: { phasen: true, umfang: true, rollen: true, mehrwerte: true } },

  { id: "nation", titel: "Nation im Kopf", fach: "Geschichte · Gemeinschaftskunde",
    faecher: ["Geschichte", "Gemeinschaftskunde"], bereich: "lernen",
    kurz: "Die Lernenden wählen einen Länderfall und begründen ein Urteil mit Kriterien.",
    status: "noch offen", link: GH + "nation-im-kopf-gene/",
    anliegen: ["verstehen"],
    phasen: ["erarbeitung"], umfang: "phasenweise", rollen: ["begleiten", "moderieren"],
    mehrwerte: ["zugaenge"],
    vorschlag: { phasen: true, umfang: true, rollen: true, mehrwerte: true } },

  { id: "gene", titel: "Gene ohne Reisepass", fach: "Demokratiebildung",
    faecher: ["Demokratiebildung"], bereich: "lernen",
    kurz: "Mit Reglern prüfen die Lernenden, ob Nationalität in den Genen steht.",
    status: "noch offen", link: GH + "nation-im-kopf-gene/gene-ohne-reisepass.html",
    anliegen: ["erkunden", "verstehen"],
    phasen: ["einstieg", "erarbeitung"], umfang: "punktuell", rollen: ["anleiten"],
    mehrwerte: ["experimentieren"],
    vorschlag: { phasen: true, umfang: true, rollen: true, mehrwerte: true } },

  { id: "landkarte", titel: "Kognitive Landkarte", fach: "Geschichte",
    faecher: ["Geschichte"], bereich: "lernen",
    kurz: "Begriffe des Geschichtsunterrichts zum Nachschlagen, mit Übungen und erklärender Rückmeldung.",
    status: "noch offen", link: GH + "kognitive-Landkarte-des-Geschichtsunterrichts/",
    anliegen: ["ueben", "rueckmeldung"],
    phasen: ["uebergreifend"], umfang: "punktuell", rollen: ["begleiten"],
    mehrwerte: ["individuell", "rueckmeldung"],
    vorschlag: { phasen: true, umfang: true, rollen: true, mehrwerte: true } },

  { id: "inhaltsverzeichnis", titel: "Inhaltsverzeichnis GGK", fach: "Geschichte · Gemeinschaftskunde",
    faecher: ["Geschichte", "Gemeinschaftskunde"], bereich: "lernen",
    kurz: "Eine Kurslandkarte zeigt, wie die Themen zusammenhängen.",
    status: "noch offen", link: GH + "Inhaltsverzeichnis-GGK/",
    anliegen: ["verstehen"],
    phasen: ["uebergreifend"], umfang: "punktuell", rollen: ["erklaeren"],
    mehrwerte: ["zeitort"],
    vorschlag: { phasen: true, umfang: true, rollen: true, mehrwerte: true } },

  { id: "planspiel", titel: "Planspiel Umverteilung", fach: "Gemeinschaftskunde",
    faecher: ["Gemeinschaftskunde"], bereich: "lernen",
    kurz: "Die Lernenden verändern Stellschrauben der Umverteilung und sehen die Folgen.",
    status: "noch offen", link: GH + "soziale-Gerechtigkeit/",
    anliegen: ["erkunden"],
    phasen: ["erarbeitung"], umfang: "phasenweise", rollen: ["moderieren"],
    mehrwerte: ["experimentieren"],
    vorschlag: { phasen: true, umfang: true, rollen: true, mehrwerte: true } },

  { id: "one-step", titel: "One Step Forward", fach: "Gemeinschaftskunde",
    faecher: ["Gemeinschaftskunde"], bereich: "lernen",
    kurz: "Jede Person zieht zufällig ein Leben. Danach zeigt eine Übung im Raum, wie ungleich die Startbedingungen sind.",
    status: "noch offen", link: GH + "One-Step-forward/",
    anliegen: ["interesse"],
    phasen: ["einstieg"], umfang: "punktuell", rollen: ["moderieren"],
    mehrwerte: ["experimentieren"],
    vorschlag: { phasen: true, umfang: true, rollen: true, mehrwerte: true } },

  { id: "karte-ww2", titel: "Karte zum Zweiten Weltkrieg", fach: "Geschichte",
    faecher: ["Geschichte"], bereich: "lernen",
    kurz: "Der Krieg von 1937 bis 1945 auf einer Karte mit Zeitleiste und Zeitzeugenstimmen.",
    status: "In Überarbeitung", link: GH + "Karte-Zweiter-Weltkrieg/",
    anliegen: ["verstehen"],
    phasen: ["erarbeitung"], umfang: "phasenweise", rollen: ["erklaeren", "begleiten"],
    mehrwerte: ["experimentieren"],
    vorschlag: { phasen: true, umfang: true, rollen: true, mehrwerte: true } },

  { id: "politik-check", titel: "Politik-Check 1919", fach: "Geschichte · Gemeinschaftskunde",
    faecher: ["Geschichte", "Gemeinschaftskunde"], bereich: "lernen",
    kurz: "Zehn Fragen aus der Sicht von 1919: Welche Partei hättest du gewählt? Selbst entwickelt, kein Angebot der bpb.",
    status: "In Überarbeitung", link: GH + "Wahl-o-Mat-1919/",
    anliegen: ["interesse", "rueckmeldung"],
    phasen: ["einstieg"], umfang: "punktuell", rollen: ["moderieren"],
    mehrwerte: ["rueckmeldung"],
    vorschlag: { phasen: true, umfang: true, rollen: true, mehrwerte: true } }
];

/* Fehlende Felder mit »leer« auffüllen, damit alle Seiten dasselbe Modell sehen.
   Leer heißt: noch offen. Die Oberfläche füllt Lücken nie mit allgemeinen Sätzen. */
(function () {
  var LEER = {
    slug: null, beschreibung: null, vorschauArt: "bild", kiEinsatz: null,
    phasen: [], anliegen: [], lernaktivitaeten: [], umfang: null, rollen: [], mehrwerte: [],
    faecher: [], bildungsgaenge: [], sozialformen: [], dauer: null, vorbereitung: null,
    technik: [], barrierearmut: [], datenschutz: [], lernmehrwert: null, organisatorischerNutzen: null,
    anpassungen: [], stolpersteine: [], schritte: [], erfahrung: null, bild: null,
    link: null, quellcode: null, vergleich: null, verwandt: [], suchbegriffe: [], vorschlag: {}, zuerst: false
  };
  BEISPIELE.forEach(function (b) {
    Object.keys(LEER).forEach(function (k) {
      if (b[k] === undefined) b[k] = Array.isArray(LEER[k]) ? [] : LEER[k];
    });
    if (!b.slug) b.slug = b.id;
    if (!b.bild) b.vorschauArt = b.status === "Idee" ? "konzept" : "bild";
  });
})();

if (typeof module !== "undefined") module.exports = BEISPIELE;
