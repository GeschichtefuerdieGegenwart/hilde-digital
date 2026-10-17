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
    mehrwerte: ["experimentieren", "sichtbar"] },

  { id: "ns-ideologie", titel: "Die fünf Säulen der NS-Ideologie", fach: "Geschichte · GGK-Labor",
    faecher: ["Geschichte"], bereich: "beide", kiEinsatz: "entwicklung-anwendung",
    kurz: "Die Klasse ordnet Zeugnisse der Täter Denkmustern zu und entdeckt so die Ideen hinter der Ausgrenzung.",
    status: "im Unterricht erprobt", bild: "assets/bilder/ns-ideologie.jpg",
    link: GH + "GGK-Einheit-Nationalsozialismus/ns-ideologie.html", zuerst: true,
    erfahrung: "Im Unterricht eingesetzt. Persönlicher Eindruck: Es lief gut.",
    anliegen: ["verstehen", "zusammen", "rueckmeldung"],
    phasen: ["erarbeitung"], umfang: "phasenweise", rollen: ["begleiten", "moderieren"],
    mehrwerte: ["authentisch", "rueckmeldung", "gemeinsam"] },

  { id: "quest", titel: "Gruppenpädagogik-Quest", fach: "Sozialpädagogik",
    faecher: ["Sozialpädagogik"], bereich: "lernen",
    kurz: "Angehende Erzieher*innen lösen Fälle aus einem Kindergarten und sehen, wie ihre Maßnahmen wirken.",
    status: "im Unterricht erprobt", bild: "assets/bilder/quest.jpg", link: null, zuerst: true,
    erfahrung: "Im Unterricht durchgeführt. Persönlicher Eindruck: Es lief sehr gut.",
    anliegen: ["ueben", "rueckmeldung"],
    phasen: ["sicherung"], umfang: "durchgaengig", rollen: ["begleiten"],
    mehrwerte: ["rueckmeldung", "individuell"] },

  { id: "dialoge", titel: "Sexualpädagogische Dialoge", fach: "Sozialpädagogik",
    faecher: ["Sozialpädagogik"], bereich: "lernen",
    kurz: "Zu dritt üben die Lernenden Gespräche über Kinderfragen: Kind, Fachkraft und Beobachtung.",
    status: "noch offen", bild: "assets/bilder/dialoge.jpg", link: null, zuerst: true,
    anliegen: ["zusammen", "ueben"],
    phasen: ["erarbeitung"], umfang: "phasenweise", rollen: ["begleiten", "rueckmelden"],
    mehrwerte: ["gemeinsam"] },

  { id: "beschlussapp", titel: "Beschlussapp für Sitzungen", fach: "Schulentwicklung",
    faecher: ["Schulentwicklung"], bereich: "ki", kiEinsatz: "entwicklung-anwendung",
    kurz: "Eine Projektgruppe entscheidet 18 offene Punkte und hat am Ende sofort ein Protokoll.",
    status: "noch offen", bild: "assets/bilder/beschlussapp.jpg",
    link: GH + "anlaufstelle-entscheidungen-neu/", zuerst: true,
    anliegen: ["ablaeufe"], rollen: ["moderieren"] },

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
    mehrwerte: ["dokumentieren"] },

  { id: "lf3", titel: "Übungsplattform Lebenswelten", fach: "Sozialpädagogik · LF 3",
    faecher: ["Sozialpädagogik"], bereich: "lernen",
    kurz: "Wiederholen mit sofortiger Rückmeldung und eine Übungsklausur mit Musterlösung.",
    status: "noch offen", bild: "assets/bilder/lf3.jpg", link: null,
    anliegen: ["ueben", "leistung"],
    phasen: ["sicherung"], umfang: "phasenweise", rollen: ["begleiten"],
    mehrwerte: ["rueckmeldung", "individuell"] },

  { id: "fachbegriffe", titel: "Fachbegriffe-Trainer", fach: "Sozialpädagogik · EBG",
    faecher: ["Sozialpädagogik"], bereich: "lernen",
    kurz: "74 Fachbegriffe aus sechs Lernfeldern: selbst erklären, vergleichen, mit Karteikarten üben.",
    status: "noch offen", bild: "assets/bilder/fachbegriffe.jpg", link: null,
    anliegen: ["ueben"],
    phasen: ["sicherung"], umfang: "punktuell", rollen: ["begleiten"],
    mehrwerte: ["individuell"] },

  { id: "nation", titel: "Nation im Kopf", fach: "Geschichte · Gemeinschaftskunde",
    faecher: ["Geschichte", "Gemeinschaftskunde"], bereich: "lernen",
    kurz: "Die Lernenden wählen einen Länderfall und begründen ein Urteil mit Kriterien.",
    status: "noch offen", link: GH + "nation-im-kopf-gene/",
    erfahrung: "Eingesetzt in der PIA3 in einem Wahlfach zur Demokratiebildung in der frühen Kindheit. Persönlicher Eindruck: Es lief bisher sehr gut. Was die Lernenden gelernt haben, wurde noch nicht abgefragt.",
    anliegen: ["verstehen"],
    phasen: ["erarbeitung"], umfang: "phasenweise", rollen: ["begleiten", "moderieren"],
    mehrwerte: ["zugaenge"] },

  { id: "gene", titel: "Gene ohne Reisepass", fach: "Demokratiebildung",
    faecher: ["Demokratiebildung"], bereich: "lernen",
    kurz: "Mit Reglern prüfen die Lernenden, ob Nationalität in den Genen steht.",
    status: "noch offen", link: GH + "nation-im-kopf-gene/gene-ohne-reisepass.html",
    anliegen: ["erkunden", "verstehen"],
    phasen: ["einstieg", "erarbeitung"], umfang: "punktuell", rollen: ["anleiten"],
    mehrwerte: ["experimentieren"] },

  { id: "landkarte", titel: "Kognitive Landkarte", fach: "Geschichte",
    faecher: ["Geschichte"], bereich: "lernen",
    kurz: "Begriffe des Geschichtsunterrichts zum Nachschlagen, mit Übungen und erklärender Rückmeldung.",
    status: "noch offen", link: GH + "kognitive-Landkarte-des-Geschichtsunterrichts/",
    anliegen: ["ueben", "rueckmeldung"],
    phasen: ["uebergreifend"], umfang: "punktuell", rollen: ["begleiten"],
    mehrwerte: ["individuell", "rueckmeldung"] },

  { id: "inhaltsverzeichnis", titel: "Inhaltsverzeichnis GGK", fach: "Geschichte · Gemeinschaftskunde",
    faecher: ["Geschichte", "Gemeinschaftskunde"], bereich: "lernen",
    kurz: "Eine Kurslandkarte zeigt, wie die Themen zusammenhängen.",
    status: "noch offen", link: GH + "Inhaltsverzeichnis-GGK/",
    anliegen: ["verstehen"],
    phasen: ["uebergreifend"], umfang: "punktuell", rollen: ["erklaeren"],
    mehrwerte: ["zeitort"] },

  { id: "planspiel", titel: "Planspiel Umverteilung", fach: "Gemeinschaftskunde",
    faecher: ["Gemeinschaftskunde"], bereich: "lernen",
    kurz: "Die Lernenden verändern Stellschrauben der Umverteilung und sehen die Folgen.",
    status: "noch offen", link: GH + "soziale-Gerechtigkeit/",
    anliegen: ["erkunden"],
    phasen: ["erarbeitung"], umfang: "phasenweise", rollen: ["moderieren"],
    mehrwerte: ["experimentieren"] },

  { id: "one-step", titel: "One Step Forward", fach: "Gemeinschaftskunde",
    faecher: ["Gemeinschaftskunde"], bereich: "lernen",
    kurz: "Jede Person zieht zufällig ein Leben. Danach zeigt eine Übung im Raum, wie ungleich die Startbedingungen sind.",
    status: "noch offen", link: GH + "One-Step-forward/",
    anliegen: ["interesse"],
    phasen: ["einstieg"], umfang: "punktuell", rollen: ["moderieren"],
    mehrwerte: ["experimentieren"] },

  { id: "karte-ww2", titel: "Karte zum Zweiten Weltkrieg", fach: "Geschichte",
    faecher: ["Geschichte"], bereich: "lernen",
    kurz: "Der Krieg von 1937 bis 1945 auf einer Karte mit Zeitleiste und Zeitzeugenstimmen.",
    status: "In Überarbeitung", link: GH + "Karte-Zweiter-Weltkrieg/",
    anliegen: ["verstehen"],
    phasen: ["erarbeitung"], umfang: "phasenweise", rollen: ["erklaeren", "begleiten"],
    mehrwerte: ["experimentieren"] },

  { id: "politik-check", titel: "Politik-Check 1919", fach: "Geschichte · Gemeinschaftskunde",
    faecher: ["Geschichte", "Gemeinschaftskunde"], bereich: "lernen",
    kurz: "Zehn Fragen aus der Sicht von 1919: Welche Partei hättest du gewählt? Selbst entwickelt, kein Angebot der bpb.",
    status: "In Überarbeitung", link: GH + "Wahl-o-Mat-1919/",
    anliegen: ["interesse", "rueckmeldung"],
    phasen: ["einstieg"], umfang: "punktuell", rollen: ["moderieren"],
    mehrwerte: ["rueckmeldung"] },

  /* ---------- Neu aus der Sichtung der HTML-Materialien (Oktober 2026).
     Titel und Kurzbeschreibung folgen dem Material selbst. Alle didaktischen Zuordnungen
     und die Lernaktivitäten sind Vorschläge und stehen deshalb in »vorschlag«. ---------- */
  { id: "gallery-walk", titel: "Gallery Walk – Raumwirkung erleben", fach: "Sozialpädagogik · EBG LF 4",
    faecher: ["Sozialpädagogik"], bereich: "lernen",
    kurz: "Die Lernenden betrachten Kita-Raumfotos, formulieren eigene Kriterien und vergleichen sie danach mit der Fachtheorie.",
    status: "noch offen", bild: "assets/bilder/gallery-walk.jpg", link: null,
    lernaktivitaeten: ["Raumfotos still betrachten und grüne oder rote Punkte vergeben",
      "eigene Kriterien formulieren und mit einer Partnerin abgleichen",
      "die eigenen Kriterien mit sechs Kriterien aus der Fachliteratur vergleichen",
      "acht Räume nach den sechs Kriterien einschätzen",
      "Fragen im Lerntagebuch beantworten"],
    technik: ["Raumfotos, im Material auch als A3-Ausdruck vorgesehen", "grüne und rote Post-its", "Tablet oder Notiz-App"],
    anliegen: ["erkunden", "verstehen", "reflektieren"],
    phasen: ["einstieg", "erarbeitung"], umfang: "phasenweise", rollen: ["anleiten", "moderieren"],
    mehrwerte: ["sichtbar", "dokumentieren"],
    suchbegriffe: ["Raumgestaltung", "Kita", "induktiv", "Erzieher", "Lerntagebuch"],
    vorschlag: { anliegen: true, phasen: true, umfang: true, rollen: true, mehrwerte: true, lernaktivitaeten: true } },

  { id: "hilberg", titel: "Historische Kategorisierung im Nationalsozialismus", fach: "Geschichte",
    faecher: ["Geschichte"], bereich: "lernen",
    kurz: "Die Lernenden ordnen historische Akteur*innen nach dem Modell von Raul Hilberg fünf Kategorien zu – auch mehreren zugleich.",
    status: "noch offen", bild: "assets/bilder/hilberg.jpg", link: GH + "T-ter-innen-Opfer-Zuschauer-innen.../",
    lernaktivitaeten: ["Karten zu Personen und Gruppen lesen",
      "jede Karte einer oder mehreren Kategorien zuordnen",
      "die eigene Zuordnung mit Mitschüler*innen begründen"],
    anliegen: ["verstehen", "reflektieren"],
    phasen: ["erarbeitung"], umfang: "punktuell", rollen: ["moderieren"],
    mehrwerte: ["sichtbar"],
    suchbegriffe: ["Täter", "Opfer", "Zuschauer", "Hilberg", "Holocaust"],
    vorschlag: { anliegen: true, phasen: true, umfang: true, rollen: true, mehrwerte: true, lernaktivitaeten: true } },

  { id: "widerstandsmodelle", titel: "Widerstandsmodelle im NS", fach: "Geschichte",
    faecher: ["Geschichte"], bereich: "lernen",
    kurz: "Die Lernenden lernen das Peukert-Modell und ein Agency-Modell kennen und leiten Kriterien ab, um Widerstand zu analysieren.",
    status: "noch offen", bild: "assets/bilder/widerstandsmodelle.jpg", link: GH + "Widerstandsmodelle-im-Vergleich/",
    lernaktivitaeten: ["zwei Modelle lesen und vergleichen",
      "Kritik an beiden Modellen nachvollziehen",
      "mit einer Kriterienliste Formen von Widerstand einordnen"],
    anliegen: ["verstehen", "reflektieren"],
    phasen: ["erarbeitung"], umfang: "phasenweise", rollen: ["erklaeren", "moderieren"],
    mehrwerte: ["zugaenge"],
    suchbegriffe: ["Widerstand", "Peukert", "Handlungsspielraum", "Nationalsozialismus"],
    vorschlag: { anliegen: true, phasen: true, umfang: true, rollen: true, mehrwerte: true, lernaktivitaeten: true } },

  { id: "lerntheorien", titel: "Lerntheorien für angehende Erzieher*innen", fach: "Sozialpädagogik",
    faecher: ["Sozialpädagogik"], bereich: "lernen",
    kurz: "Ein Lernkurs zu Behaviorismus und Lernen am Modell mit Zuordnungsübungen und Fallaufgaben auf Prüfungsniveau.",
    status: "noch offen", bild: "assets/bilder/lerntheorien.jpg", link: null,
    lernaktivitaeten: ["Begriffe den richtigen Definitionen zuordnen und Rückmeldung erhalten",
      "Fallbeispiele mit Lerntheorien erklären",
      "pädagogische Ziele und Maßnahmen für einen Fall entwickeln"],
    anliegen: ["ueben", "verstehen"],
    phasen: ["erarbeitung", "sicherung"], umfang: "durchgaengig", rollen: ["begleiten"],
    mehrwerte: ["individuell", "rueckmeldung"],
    suchbegriffe: ["Konditionieren", "Skinner", "Pawlow", "Bandura", "Modelllernen", "Prüfung"],
    vorschlag: { anliegen: true, phasen: true, umfang: true, rollen: true, mehrwerte: true, lernaktivitaeten: true } },

  { id: "milieus-1919", titel: "Soziale Milieus und ihre Wahlentscheidung", fach: "Geschichte · Gemeinschaftskunde",
    faecher: ["Geschichte", "Gemeinschaftskunde"], bereich: "lernen",
    kurz: "Über eine Milieu-Pyramide erkunden die Lernenden die Gesellschaft von 1919: wer wie lebte, was forderte und wen wählte.",
    status: "noch offen", bild: "assets/bilder/milieus.jpg", link: GH + "Die-Gesellschaft-der-Weimarer-Republik-1919/",
    lernaktivitaeten: ["Milieus in der Pyramide anklicken und vergleichen",
      "Aufgaben zu sozialer Lage und Wahlentscheidung bearbeiten"],
    anliegen: ["erkunden", "verstehen"],
    phasen: ["erarbeitung"], umfang: "phasenweise", rollen: ["begleiten"],
    mehrwerte: ["zugaenge"],
    suchbegriffe: ["Weimarer Republik", "Milieu", "Wahl", "1919"],
    vorschlag: { anliegen: true, phasen: true, umfang: true, rollen: true, mehrwerte: true, lernaktivitaeten: true } },

  { id: "ns-kontinuitaeten", titel: "NS-Kontinuitäten in der BRD", fach: "Geschichte",
    faecher: ["Geschichte"], bereich: "lernen",
    kurz: "Die Lernenden untersuchen, in welchen Bereichen der Bundesrepublik frühere NS-Täter weiterarbeiteten, warum das möglich war und was es für die junge Demokratie bedeutete.",
    status: "noch offen", bild: "assets/bilder/ns-kontinuitaeten.jpg", link: GH + "NS-Kontinuit-ten/",
    lernaktivitaeten: ["einen von neun Bereichen auswählen und untersuchen",
      "Ursachen und Folgen der Kontinuitäten herausarbeiten"],
    anliegen: ["recherche", "verstehen"],
    phasen: ["erarbeitung"], umfang: "phasenweise", rollen: ["begleiten", "moderieren"],
    mehrwerte: ["zugaenge"],
    suchbegriffe: ["Entnazifizierung", "Bundesrepublik", "Nachkriegszeit", "Kontinuität"],
    vorschlag: { anliegen: true, phasen: true, umfang: true, rollen: true, mehrwerte: true, lernaktivitaeten: true } },

  { id: "shoa-vergleich", titel: "Der Holocaust in Europa – Ländervergleich", fach: "Geschichte",
    faecher: ["Geschichte"], bereich: "lernen",
    kurz: "Die Lernenden vergleichen Dänemark mit einem anderen Land und formulieren eine zentrale historische Erkenntnis.",
    status: "noch offen", bild: "assets/bilder/shoa-vergleich.jpg", link: GH + "Shoa-im-Vergleich/",
    lernaktivitaeten: ["die Situation in Dänemark untersuchen",
      "ein zweites Land auswählen und vergleichen",
      "Opferrate und Hauptfaktoren notieren und eine Erkenntnis formulieren"],
    anliegen: ["verstehen", "recherche"],
    phasen: ["erarbeitung"], umfang: "phasenweise", rollen: ["begleiten"],
    mehrwerte: ["zugaenge"],
    suchbegriffe: ["Shoa", "Holocaust", "Dänemark", "Vergleich", "Rettung"],
    vorschlag: { anliegen: true, phasen: true, umfang: true, rollen: true, mehrwerte: true, lernaktivitaeten: true } },

  /* ---------- Konzeptbeispiele: Ideen für Lücken im Bestand. Nicht erprobt, kein Link, kein Vorschaubild. ---------- */
  { id: "kfz-fehlersuche", titel: "Fehlersuche an der Bremsanlage", fach: "Kfz-Technik",
    faecher: ["Kfz-Technik"], bereich: "lernen", vorschauArt: "konzept",
    kurz: "Konzeptidee: Die Lernenden untersuchen Fotos und Messwerte einer Bremsanlage und begründen, wo der Fehler liegt.",
    status: "Idee", link: null, suchbegriffe: ["Kfz", "Kraftfahrzeugtechnik", "Diagnose", "Werkstatt"],
    anliegen: ["erkunden", "verstehen"],
    phasen: ["erarbeitung"], umfang: "phasenweise", rollen: ["begleiten", "moderieren"],
    mehrwerte: ["experimentieren", "sichtbar"] },

  { id: "ki-antwort-pruefen", titel: "KI-Antwort auf dem Prüfstand", fach: "fachübergreifend",
    faecher: ["fachübergreifend"], bereich: "lernen", kiEinsatz: "vorbereitung-lehrkraft", vorschauArt: "konzept",
    kurz: "Konzeptidee: Die Lernenden prüfen eine vorbereitete KI-Antwort mit zwei verlässlichen Quellen und markieren, was stimmt, was fehlt und was erfunden ist.",
    status: "Idee", link: null, suchbegriffe: ["Recherche", "Quellen", "Medienbildung", "Faktencheck"],
    anliegen: ["recherche", "reflektieren"],
    phasen: ["erarbeitung"], umfang: "phasenweise", rollen: ["begleiten", "moderieren"],
    mehrwerte: ["authentisch", "dokumentieren"] },

  { id: "drei-fragen-check", titel: "Drei-Fragen-Check am Stundenende", fach: "fachübergreifend",
    faecher: ["fachübergreifend"], bereich: "lernen", vorschauArt: "konzept",
    kurz: "Konzeptidee: Drei kurze Fragen am Ende der Stunde. Die Klasse sieht, was sitzt – du siehst, womit die nächste Stunde beginnt.",
    status: "Idee", link: null, suchbegriffe: ["Abfrage", "Exit-Ticket", "Lernstand", "Diagnose"],
    anliegen: ["lernstand", "rueckmeldung"],
    phasen: ["abschluss"], umfang: "punktuell", rollen: ["rueckmelden"],
    mehrwerte: ["rueckmeldung", "sichtbar"] }
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
    if (b.status === "Idee") b.vorschauArt = "konzept";
  });
})();

if (typeof module !== "undefined") module.exports = BEISPIELE;
