/* Kidu – Werkstatt-Wissen für das Kollegium (ab Version 4.9).
   Drei Teile, alle aus dem Arbeitsgedächtnis des Projekts übertragen:
   - muster:    Unterrichtsmuster aus der Praxis, je mit drei Wegen: auf Papier · mit KI vorbereiten · am Tablet.
                einsatz: "eingesetzt" (im eigenen Unterricht eingesetzt) · "geplant" (ausgearbeitet, noch nicht eingesetzt) · "offen".
                lernende (freiwillig, ab 4.10): ein Satz, wie Lernende selbst mit KI an dem Muster arbeiten können –
                immer »erst selbst, dann KI«. Bis zur Erprobung endet der Satz mit »Noch nicht erprobt.«
                Das ist eine persönliche Angabe, kein Wirkungsnachweis.
                tablet.beispiele nennt nur Galerie-Einträge, die dasselbe Muster wirklich zeigen. Gibt es keines, steht das ehrlich da.
   - auftraege: kopierbare Aufträge, Kurzfassungen der ausführlichen Anleitungen (Skills) des Projekts.
                Ab Version 4.25 kommen die Texte aus dem Abschnitt »Kurzfassung für Kidu« der Skills (siehe unten).
   - faecher:   Beispiele für Maßstäbe eines Fachs für die Vorlage »KI für dein Fach einrichten«. Nur Fächer, für die es
                im Projekt erarbeitete Maßstäbe gibt. Andere Fächer bleiben ein leeres Feld – nichts erfinden.
   Jeder Auftrag hat dieselbe Form wie die Schnell-Anfrage (ziel · anforderungen · format · pruef · material)
   und wird mit SCHNELL_ANFRAGE.baue gebaut (siehe assets/werkstatt.js). Keine Namen von KI-Anbietern. */

var WERKSTATT = {
  muster: [
    {
      id: "erleben", name: "Erst erleben, dann erklären", phase: "einstieg", einsatz: "eingesetzt",
      herkunft: "Reihe »Spiel«, Erzieher*innenausbildung, 1. Jahr",
      tun: "Die Lernenden machen zuerst selbst eine kurze Erfahrung. Den Fachbegriff gibt es erst, wenn es etwas zu ordnen gibt.",
      warum: "Die eigene Erfahrung wird zum Material, an dem der Fachbegriff Sinn ergibt.",
      papier: "Ein kurzes Spiel, ein kleiner Versuch oder eine Regeländerung ohne Vorwarnung. Dann eine Vermutung notieren und am Fachtext prüfen: ✓ bestätigt · + ergänzt · ✗ korrigiert.",
      tablet: { text: "Ein Selbstversuch am Tablet: Alle legen sich vorher fest, machen den Versuch und vergleichen danach mit einer echten Studie.", beispiele: ["psycho-ds2", "psycho-ds3-6"] },
      ki: {
        ziel: "Plane einen Einstieg nach dem Muster »Erst erleben, dann erklären«.",
        anforderungen: [
          "Die Lernenden machen zuerst eine kurze eigene Erfahrung, höchstens 10 Minuten: ein Spiel, ein kleiner Versuch oder eine Regeländerung ohne Vorwarnung.",
          "Danach notieren sie eine Vermutung. Erst dann folgt der Fachtext.",
          "Beim Abgleich markieren sie: ✓ bestätigt · + ergänzt · ✗ korrigiert. Fehler in der Vermutung sind erwünscht.",
          "Zum Schluss eine Frage, die die eigene Erfahrung auf das Fach überträgt.",
          "Persönliche Erfahrungen bleiben freiwillig."
        ],
        format: "Ablauf mit Minuten, die Arbeitsaufträge im Wortlaut und die drei Fachbegriffe, die danach eingeführt werden.",
        pruef: ["Kommt der Fachbegriff wirklich erst nach der Erfahrung?", "Lässt sich die Erfahrung in 10 Minuten machen?"]
      }
    },
    {
      id: "zusatz", name: "Zusatzinformation kippt das Urteil", phase: "erarbeitung", einsatz: "geplant",
      herkunft: "Reihe »Spiel«, Erzieher*innenausbildung, 1. Jahr",
      tun: "Ein Fall wird zweimal beurteilt: erst ohne, dann mit einer Zusatzinformation, die bis dahin verdeckt war.",
      warum: "Vorschnelle Urteile werden sichtbar. Die Frage »Was müsste ich noch wissen?« wird zur Gewohnheit.",
      papier: "Eine Fallkarte, unten ist die Zusatzinformation umgeknickt. Erst urteilen, dann aufklappen, dann begründen, ob das Urteil bleibt.",
      tablet: { text: "Am Tablet bleibt die Zusatzinformation verdeckt, bis die erste Entscheidung festgelegt ist. Niemand kann vorblättern.", beispiele: ["m20-dilemmata", "m22-wie-war-das-moeglich"] },
      ki: {
        ziel: "Erstelle Fallkarten nach dem Muster »Zusatzinformation kippt das Urteil«.",
        anforderungen: [
          "Vier kurze Fälle aus dem Fach oder dem Berufsalltag, ohne echte Namen.",
          "Jeder Fall hat unten eine Zusatzinformation, die das erste Urteil ändern kann. Bei mindestens einem Fall bestätigt sie das Urteil.",
          "Dazu drei Prüffragen für das erste Urteil.",
          "Bewertet wird die Abwägung, nicht eine einzige richtige Lösung."
        ],
        format: "Je Fall: Situation in drei bis vier Sätzen · Zusatzinformation in ein bis zwei Sätzen · ein tragfähiges Urteil vorher und nachher in je einem Satz.",
        pruef: ["Ist jeder Fall ohne die Zusatzinformation wirklich offen?", "Sind die Fälle fachlich stimmig?"]
      }
    },
    {
      id: "stolper", name: "Stolperkarten", phase: "erarbeitung", einsatz: "geplant",
      herkunft: "Reihe »Spiel«, Erzieher*innenausbildung, 1. Jahr",
      tun: "Beim Ordnen von Karten liegen einige dabei, die eine typische Fehlvorstellung enthalten. Sie müssen begründet aussortiert werden.",
      warum: "Die Fehlvorstellung wird nicht nur korrigiert, sondern ausdrücklich bearbeitet.",
      papier: "Ein Legeplan auf A3 mit 15 bis 20 Karten, drei davon Stolperkarten, und ein Feld »Gehört nicht auf den Plan, weil …«. Als Hilfe die Karten in Farben kopieren, als Herausforderung alle weiß.",
      tablet: { text: "Auf Papier gleich gut: Karten in der Hand zu legen und zu verschieben ist hier die Stärke. Ob das Tablet etwas besser kann, ist noch offen.", beispiele: [] },
      ki: {
        ziel: "Erstelle Karten für ein Strukturlegen mit Stolperkarten.",
        anforderungen: [
          "12 bis 16 richtige Karten in drei Kategorien. Schlag die Kategorien vor, wenn ich keine nenne.",
          "Drei Stolperkarten mit typischen Fehlvorstellungen – als Satz, den Lernende wirklich sagen würden.",
          "Eine oder zwei Karten dürfen strittig sein. Sie sind erwünscht, weil sie Gespräch auslösen.",
          "Eine leere Karte für ein eigenes Beispiel."
        ],
        format: "Tabelle mit Nummer, Kartentext und Kategorie. Bei den Stolperkarten in einem Satz, warum sie nicht auf den Plan gehören.",
        pruef: ["Würden Lernende die Stolperkarten wirklich so sagen?", "Ist jede Zuordnung fachlich richtig?"]
      }
    },
    {
      id: "selbstdiagnose", name: "Selbstdiagnose vor dem Üben", phase: "sicherung", einsatz: "eingesetzt",
      herkunft: "Reihe »Spiel«, Erzieher*innenausbildung, 1. Jahr",
      tun: "Erst prüfen die Lernenden, was sie schon können. Dann üben sie gezielt, was noch unsicher ist.",
      warum: "Die Übungszeit geht dorthin, wo sie gebraucht wird. Du siehst, wer Hilfe braucht.",
      papier: "Acht »Ich kann …«-Sätze mit je einer Prüffrage, ohne Unterlagen. Einschätzen: ✓ sicher · ~ teilweise · ? unsicher. Erst dann den Lösungsstreifen umknicken und passende Stationen wählen.",
      tablet: { text: "Eine Übersicht der Einheit, auf der sich die Lernenden zu mehreren Zeitpunkten selbst einschätzen.", beispiele: ["bef1"] },
      ki: {
        ziel: "Erstelle einen »Ich kann«-Schnelltest zur Selbstdiagnose vor einer Übungsphase.",
        anforderungen: [
          "Acht »Ich kann …«-Sätze, die die Lernziele der Einheit abdecken.",
          "Zu jedem Satz eine Prüffrage, die sich in einem Satz ohne Unterlagen beantworten lässt.",
          "Zu jeder Prüffrage eine kurze Lösung für den Lösungsstreifen.",
          "Jede Prüffrage verweist auf eine Übungsstation. Schlag vier bis fünf Stationen vor.",
          "Der Test wird nicht bewertet."
        ],
        format: "Tabelle: Ich kann … · Prüffrage · Lösung · Station. Darunter die Skala ✓ sicher · ~ teilweise · ? unsicher und ein Satz für den Plan bis zur nächsten Stunde.",
        pruef: ["Prüft jede Frage wirklich das Können aus dem »Ich kann«-Satz?", "Sind die Lösungen fachlich richtig?"]
      }
    },
    {
      id: "hilfekarten", name: "Hilfe- und Expertenkarten", phase: "uebergreifend", einsatz: "eingesetzt",
      herkunft: "Reihe »Spiel«, Erzieher*innenausbildung, 1. Jahr",
      tun: "Alle arbeiten an derselben Aufgabe. Grüne Karten erleichtern den Zugang, orange Karten vertiefen.",
      warum: "Hilfen erleichtern den Zugang. Das Denken nehmen sie den Lernenden nicht ab.",
      papier: "Grün: Satzanfänge, Begriffsliste, Leitfragen, ein Wortspeicher mit Artikel. Orange: ein Grenzfall, eine weitere Sicht oder eine Quelle.",
      tablet: { text: "Auf Papier gleich gut. Am Tablet lassen sich Hilfen zum Aufklappen anbieten. Ob das mehr bringt als die Karte auf dem Tisch, ist noch offen.", beispiele: [] },
      ki: {
        ziel: "Erstelle zu der Aufgabe unten grüne Hilfekarten und orange Expertenkarten.",
        anforderungen: [
          "Grüne Karten: Satzanfänge, eine Begriffsliste, zwei bis drei Leitfragen und einen Wortspeicher mit Artikel.",
          "Die Hilfen erleichtern den Zugang, verraten aber nicht die Lösung.",
          "Orange Karten: ein Grenzfall, eine weitere Sicht oder eine Quelle zum Weiterdenken.",
          "Alle Karten passen zur selben Aufgabe."
        ],
        format: "Zwei Listen: grüne Karten und orange Karten, je mit Überschrift und höchstens vier Zeilen Text.",
        pruef: ["Kann jemand mit einer grünen Karte die Aufgabe lösen, ohne dass die Karte die Lösung verrät?", "Ist jede Expertenkarte fachlich richtig?"],
        material: true
      }
    },
    {
      id: "thesen", name: "Thesen, die ein Urteil verlangen", phase: "abschluss", einsatz: "eingesetzt",
      herkunft: "Reihe »Spiel«, Erzieher*innenausbildung, 1. Jahr",
      tun: "Am Ende steht eine These. Wer zustimmt oder widerspricht, begründet mit Fachbegriff, Beleg und Gegenargument.",
      warum: "Aus einer Meinung wird ein Urteil. Ein schnelles Ja oder Nein reicht nicht.",
      papier: "Eine Positionslinie im Raum oder ein Duell zu zweit. Satzgerüst: »Ich stimme … zu / nicht zu, weil … Ein Beispiel ist … Dagegen spricht … Daraus folgt …«",
      tablet: { text: "Am Tablet stimmen alle gleichzeitig ab, bevor sie die Meinung der anderen kennen. Gesichert wird an der Tafel.", beispiele: ["m19-appeasement"] },
      ki: {
        ziel: "Formuliere Thesen für das Ende einer Stunde, die ein begründetes Urteil verlangen.",
        anforderungen: [
          "Vier Thesen. Keine darf sich mit einem einfachen Ja oder Nein beantworten lassen.",
          "Tragfähig ist meist ein Urteil mit Einschränkung. Gib zu jeder These an, welches Urteil tragfähig ist.",
          "Achte auf Signalwörter wie »jedes« oder »immer«, an denen sich das Urteil entscheidet.",
          "Dazu das Satzgerüst: Position · Begründung mit Fachbegriff und Beispiel · Gegenargument · Folgerung."
        ],
        format: "Tabelle: These · tragfähiges Urteil · Beleg aus dem Unterricht, auf den sich das Urteil stützen kann. Darunter ein Musterurteil zu einer These.",
        pruef: ["Lässt sich jede These wirklich nicht mit Ja oder Nein abtun?", "Stimmt das Musterurteil fachlich?"]
      }
    },
    {
      id: "ranking", name: "Antworten vergleichen und verbessern", phase: "sicherung", einsatz: "offen",
      herkunft: "Reihe »Spiel«, Erzieher*innenausbildung, 1. Jahr",
      tun: "Die Lernenden schreiben eine Antwort selbst. Dann bewerten sie drei Beispielantworten mit einem Raster und verbessern die mittlere.",
      warum: "Wer fremde Antworten an Kriterien misst, sieht klarer, was die eigene noch braucht.",
      papier: "Drei Antworten: Meinung statt Urteil · teilweise · alle Kriterien erfüllt. Eine Rangfolge bilden, die mittlere umschreiben, dann die eigene Antwort mit der Partnerin tauschen.",
      tablet: { text: "Auf Papier gleich gut. Ob das Tablet hier etwas besser kann, ist noch offen.", beispiele: [] },
      lernende: "Erst schreiben die Lernenden ihre eigene Antwort – ohne KI. Danach holen sie sich eine Antwort der KI zur selben Aufgabe und bewerten sie mit demselben Raster wie die drei Beispielantworten. Die KI-Antwort ist kein Vorbild, sondern ein weiterer Fall zum Prüfen. Noch nicht erprobt.",
      ki: {
        ziel: "Erstelle zu der Aufgabe unten ein Kriterienraster und drei Beispielantworten in unterschiedlicher Qualität.",
        anforderungen: [
          "Ein Raster mit fünf bis sechs Kriterien, zum Beispiel: klares Urteil, Fachbegriff, Beleg, Erklärung, Gegenargument, Folgerung.",
          "Antwort A: Meinung statt Urteil, ohne Fachbegriff und Beleg.",
          "Antwort B: teilweise gelungen, einige Kriterien fehlen.",
          "Antwort C: erfüllt alle Kriterien.",
          "Die Antworten sind ungefähr gleich lang, damit nicht die Länge entscheidet."
        ],
        format: "Erst das Raster als Tabelle, dann die drei Antworten. Zum Schluss die erwartete Rangfolge mit je einem Satz Begründung.",
        pruef: ["Unterscheiden sich die Antworten wirklich in den Kriterien und nicht nur in der Länge?", "Ist Antwort C fachlich richtig?"],
        material: true
      }
    },
    {
      id: "beleg", name: "Merkmal – Beleg – Erklärung", phase: "erarbeitung", einsatz: "eingesetzt",
      herkunft: "Reihe »Spiel«, Erzieher*innenausbildung, 1. Jahr",
      tun: "Jede Einordnung hat drei Teile: ein Merkmal nennen, einen Beleg aus dem Material angeben, erklären, warum der Beleg das Merkmal zeigt.",
      warum: "Belege machen das Denken sichtbar. Eine andere Zuordnung zählt, wenn sie gut begründet ist.",
      papier: "Eine Tabelle mit drei Spalten: Merkmal · Beleg (Zeile, Szene) · Erklärung. In der Bewertung gibt es für eine Aussage ohne Beleg höchstens die halbe Punktzahl.",
      tablet: { text: "Am Tablet ordnen die Lernenden Zeugnisse zu, begründen mit einem Detail und bekommen eine Rückmeldung zu ihrer Zuordnung.", beispiele: ["ns-ideologie"] },
      ki: {
        ziel: "Erstelle eine Einordnungsaufgabe nach dem Dreischritt Merkmal – Beleg – Erklärung.",
        anforderungen: [
          "Ein kurzer Text oder Fall, in dem sich drei bis vier Merkmale belegen lassen.",
          "Die Aufgabe verlangt je Merkmal: Merkmal nennen · Beleg mit Zeile · Erklärung in einem Satz.",
          "Ein Erwartungshorizont, der auch andere Zuordnungen anerkennt, wenn sie mit Beleg und Fachbegriff begründet sind.",
          "»Macht Spaß« oder ähnliche Alltagswörter zählen nicht als Merkmal."
        ],
        format: "Text mit Zeilennummern, Arbeitsauftrag, Tabelle zum Ausfüllen und Erwartungshorizont mit Punkten.",
        pruef: ["Lässt sich jedes Merkmal wirklich am Text belegen?", "Stimmen die Fachbegriffe?"]
      }
    },
    {
      id: "uebersicht", name: "Übersicht statt Klickstrecke", phase: "erarbeitung", einsatz: "eingesetzt",
      herkunft: "GGK-Labor, Berufliches Gymnasium – Rückmeldung der Lernenden vom 8. November 2026",
      tun: "Eine Arbeitsphase hat eine Seite: Alles, was dazugehört, liegt nebeneinander. Hilfen und Details öffnen am selben Ort, nicht auf einer neuen Seite.",
      warum: "Wer vieles zum ersten Mal sieht, braucht Orientierung. Jeder Seitenwechsel kostet davon etwas. Eine Übersicht lässt in Ruhe umschauen und vergleichen.",
      papier: "Ein Plakat oder ein Doppelblatt je Phase: Material, Auftrag und Hilfekasten auf einer Fläche. Nichts zum Blättern, bis die Phase vorbei ist.",
      tablet: { text: "Eine Übersichtsseite je Phase, Karten nebeneinander, Details klappen an Ort und Stelle auf. Höchstens drei Tipps bis zur ersten eigenen Antwort.", beispiele: ["m22-wie-war-das-moeglich"] },
      ki: {
        ziel: "Baue eine Arbeitsphase nach dem Muster »Übersicht statt Klickstrecke« um.",
        anforderungen: [
          "Die ganze Phase liegt auf einer Fläche: Auftrag, Material, Hilfen, Ergebnisfeld.",
          "Hilfen und Vertiefungen öffnen am selben Ort, nicht auf einer neuen Seite.",
          "Bis zur ersten eigenen Antwort brauchen die Lernenden höchstens drei Schritte.",
          "Wenige Rahmen und Linien: Flächen trennen, Linien nur, wo sie etwas bedeuten.",
          "Zähle am Ende, wie viele Seitenwechsel und Tipps die Phase verlangt, und nenne die Zahl."
        ],
        format: "Eine Skizze der Fläche in Worten (was liegt wo), der Auftrag im Wortlaut, die Hilfen, die Zählung der Schritte.",
        pruef: ["Liegt wirklich alles auf einer Fläche?", "Gibt es eine Stelle, an der man ohne Nachdenken weiterklicken kann?"]
      }
    },
    {
      id: "zwischenstand", name: "Sortieren mit Zwischenstand", phase: "erarbeitung", einsatz: "eingesetzt",
      herkunft: "Politik-Werkstatt, Gemeinschaftskunde J1 – nachgeschärft nach der Erprobung am 8. November 2026",
      tun: "Die Lernenden ordnen viele Karten. Nach etwa fünf Karten prüfen sie den Zwischenstand, legen Falsche zurück und arbeiten weiter – statt am Ende alles neu zu sortieren.",
      warum: "Rückmeldung in kleinen Portionen lässt sich verarbeiten. Wer erst am Ende erfährt, dass die Hälfte falsch liegt, beginnt von vorn und lernt dabei wenig.",
      papier: "Kartensatz mit Kontrollkarte: Nach jeder Fünfergruppe die Kontrollkarte umdrehen, Falsche zurück in den Stapel, weiter.",
      tablet: { text: "Zwischenstand prüfen ab fünf gelegten Karten, Knopf »Falsche zurücklegen«, gespeicherter Stand zum Weitermachen. Gezählt wird nur der erste Versuch.", beispiele: ["politik-werkstatt"] },
      ki: {
        ziel: "Erstelle eine Sortieraufgabe nach dem Muster »Sortieren mit Zwischenstand«.",
        anforderungen: [
          "Zwölf bis zwanzig Karten, die drei bis fünf Gruppen zugeordnet werden; jede Karte hat eine kurze Begründung, warum sie dorthin gehört.",
          "Eine Kontrollkarte je fünf Karten, mit der die Lernenden ihren Zwischenstand prüfen.",
          "Falsch gelegte Karten gehen zurück in den Stapel, nicht alles wird neu sortiert.",
          "Die Rückmeldung erklärt, warum eine Karte woanders hingehört – nicht nur richtig oder falsch.",
          "Keine Punkte oder Ranglisten."
        ],
        format: "Kartentexte mit Zuordnung und Begründung, Kontrollkarten, ein Satz zur Durchführung.",
        pruef: ["Ist jede Zuordnung fachlich eindeutig?", "Trägt die Begründung auf jeder Karte?"]
      }
    },
    {
      id: "fehlvorstellungen", name: "Fehlvorstellungen dreimal nutzen", phase: "uebergreifend", einsatz: "offen",
      herkunft: "Lernfeld »Rechtliche Bedingungen«, Erzieher*innenausbildung, 1. Jahr",
      tun: "Eine typische Fehlvorstellung taucht dreimal auf: als Satz im Fall am Anfang, im Ausgangsticket am Ende und als unterste Stufe im Bewertungsraster.",
      warum: "So zeigt sich, ob sich das Alltagsurteil durch das Fachwissen verändert hat.",
      papier: "Ausgangsticket »Stimmt – oder stimmt nicht?«: fünf Aussagen, ein Kreuz und ein Satz Begründung. Einsammeln und für die nächste Stunde auswerten.",
      tablet: { text: "Auf Papier gleich gut. Ob eine Umfrage am Tablet hier mehr zeigt als die eingesammelten Zettel, ist noch offen.", beispiele: [] },
      ki: {
        ziel: "Sammle typische Fehlvorstellungen zu meinem Thema und mach daraus ein Ausgangsticket.",
        anforderungen: [
          "Fünf bis acht Fehlvorstellungen als Satz, den Lernende wirklich sagen würden. Daneben je eine fachliche Klärung in einem Satz.",
          "Ein Ausgangsticket »Stimmt – oder stimmt nicht?« mit fünf Aussagen, gemischt richtig und falsch, damit Raten nicht hilft.",
          "Jede Aussage verlangt ein Kreuz und einen Satz Begründung.",
          "Ein Vorschlag, wie eine der Fehlvorstellungen als Satz einer Figur in einem Einstiegsfall auftauchen kann."
        ],
        format: "Tabelle der Fehlvorstellungen mit Klärung, dann das Ausgangsticket zum Ausdrucken, dann der Satz für den Einstiegsfall.",
        pruef: ["Sind die Klärungen fachlich richtig?", "Klingen die Aussagen nach Lernenden und nicht nach Lehrbuch?"]
      }
    }
  ],

  /* Ab Version 4.25 stehen Name, Kurzbeschreibung, Ziel, Anforderungen, Format, Prüffragen und Lizenz nicht mehr hier,
     sondern im Abschnitt »Kurzfassung für Kidu« des jeweiligen Skills (werkzeugkiste/kidu/skills/<quelle>/SKILL.md).
     tools/werkzeugkiste.py überträgt sie nach assets/daten/kurzfassungen.js; unten werden sie eingesetzt.
     Hier steht nur, welcher Skill die Quelle ist, zu welcher Gruppe der Auftrag gehört und ob Material angehängt wird. */
  auftraege: [
    { id: "lernmethode", quelle: "lernmethode-einfuehren", gruppe: "ki", material: true },
    { id: "ki-grenzen", quelle: "ki-grenzen-einer-aufgabe", gruppe: "ki", material: true },
    { id: "faktencheck", quelle: "ki-faktencheck", gruppe: "ki", material: true },
    { id: "erkunden", quelle: "praxisforschung-im-kollegium", gruppe: "kollegium" },
    { id: "fortbildung", quelle: "ki-kompetenz-kollegium", gruppe: "kollegium" }
  ],

  faecher: [
    { id: "geschichte", name: "Geschichte", massstaebe: ["Mehrere Perspektiven zeigen.", "Quelle und Darstellung trennen.", "Sachurteil und Werturteil unterscheiden."] },
    { id: "ggk", name: "Gemeinschaftskunde", massstaebe: ["Was in Wissenschaft und Politik umstritten ist, erscheint auch im Unterricht umstritten.", "Lernende nicht mit einer Meinung überwältigen.", "Politische Urteile mit Kriterien begründen lassen."] },
    { id: "erzieher", name: "Erzieher*innenausbildung", massstaebe: ["Jede Aufgabe bezieht sich auf das Lernfeld.", "Handlungssituationen aus der Praxis, ohne echte Namen.", "Fallarbeit: beobachten – fachlich einordnen – pädagogisch folgern."] }
  ],

  /* Feste Regeln für die Vorlage »KI für dein Fach einrichten«. Aus den Bausteinen
     »Diktat zuerst ordnen«, »Nichts erfinden«, »KI in der Vorbereitung« und der Prüfroutine »Vor dem Kopieren prüfen«. */
  fachRegeln: [
    "Bevor du beginnst: Fasse in drei bis fünf Zeilen zusammen, was du verstanden hast – Ziel, Lerngruppe, gewünschtes Ergebnis und Einsatz im Unterricht. Stelle höchstens drei Rückfragen, und nur solche, die das Ergebnis verändern. Ist der Auftrag klar, beginne direkt.",
    "Erfinde keine Quellen, Zitate, Zahlen oder Gesetzesangaben. Kennzeichne jede Angabe, die du nicht an einer Quelle geprüft hast, mit [ungeprüft].",
    "Liefere am Ende jedes Materials eine Liste »Vor dem Kopieren prüfen« mit allem, was ich am Original nachsehen sollte.",
    "Ein Ergebnis darf ganz auf Papier bleiben. Schlag digitale Wege nur vor, wenn sie etwas können, was Papier nicht kann.",
    "Ich gebe keine Namen, Noten oder anderen personenbezogenen Daten ein. Fälle sind ausgedacht oder so verändert, dass niemand erkennbar ist."
  ]
};

/* Kurzfassungen aus den Skills einsetzen (eine Quelle für alles, ab Version 4.25).
   Im Browser muss assets/daten/kurzfassungen.js vor dieser Datei geladen sein. */
(function () {
  var K = typeof module !== "undefined" && typeof require !== "undefined" ? require("./kurzfassungen.js")
    : (typeof KURZFASSUNGEN !== "undefined" ? KURZFASSUNGEN : null);
  WERKSTATT.auftraege.forEach(function (a) {
    var k = K && K.skills[a.quelle];
    if (!k) return;
    a.name = k.name; a.kurz = k.kurz; a.ziel = k.ziel; a.format = k.format;
    a.anforderungen = k.anforderungen; a.pruef = k.pruef; a.lizenz = k.lizenz;
    a.stand = { skill: a.quelle, fassung: k.fassung, datum: k.datum };
  });
})();

if (typeof module !== "undefined") module.exports = WERKSTATT;
