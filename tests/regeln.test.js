/* Unit-Tests für die Regeln des Digital-Checks.  Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const R = require("../assets/regeln.js");
const B = require("../assets/daten/beispiele.js");
const T = require("../assets/daten/taxonomien.js");

const karte = (a) => R.entscheidungskarte(a, B);

test("leere Eingabe führt zu »analog oder hybrid«, ohne Fehler", () => {
  for (const a of [undefined, null, {}]) {
    const k = karte(a);
    assert.equal(k.einstufung, "analog");
    assert.ok(k.beispiele.length <= 3);
    assert.equal(k.schluss, "Das ist eine Planungshilfe, keine Bewertung. Du entscheidest.");
  }
});

test("Mehrwert »noch unklar« führt zu »analog oder hybrid«", () => {
  assert.equal(karte({ phase: "einstieg", anliegen: "interesse", mehrwert: "unklar" }).einstufung, "analog");
});

test("Verteilen und Einsammeln ist organisatorischer Nutzen, kein Lernmehrwert", () => {
  const k = karte({ anliegen: "ueben", mehrwert: "organisation", umfang: "durchgaengig" });
  assert.equal(k.einstufung, "organisatorisch");
  assert.equal(k.mehrwertArt, "organisation");
  assert.equal(k.umfang, "punktuell");
});

test("passendes Anliegen und Mehrwert ergeben einen klaren Lernmehrwert", () => {
  assert.equal(karte({ anliegen: "ueben", mehrwert: "rueckmeldung" }).einstufung, "klar");
  assert.equal(karte({ anliegen: "zusammen", mehrwert: "gemeinsam" }).einstufung, "klar");
});

test("unpassendes Paar verlangt eine Anpassung des Unterrichts", () => {
  assert.equal(karte({ anliegen: "leistung", mehrwert: "experimentieren" }).einstufung, "anpassung");
});

test("fehlende Lernabsicht verlangt eine Anpassung", () => {
  assert.equal(karte({ anliegen: "offen", mehrwert: "rueckmeldung" }).einstufung, "anpassung");
});

test("ohne Netz: Mehrwert, der Netz braucht, führt zu »analog oder hybrid«", () => {
  const k = karte({ anliegen: "recherche", mehrwert: "authentisch", rahmen: { netz: "nein" } });
  assert.equal(k.einstufung, "analog");
});

test("ohne Netz werden keine Online-Anwendungen empfohlen (harter Ausschluss)", () => {
  const k = karte({ anliegen: "ueben", mehrwert: "rueckmeldung", rahmen: { netz: "nein" } });
  assert.ok(k.beispiele.every((b) => !b.link));
  assert.equal(k.ohneNetz, true);
});

test("durchgängig ist keine höhere Stufe: mit wenig Erfahrung wird phasenweise empfohlen", () => {
  const k = karte({ anliegen: "ueben", mehrwert: "rueckmeldung", umfang: "durchgaengig", rahmen: { erfahrung: "wenig" } });
  assert.equal(k.einstufung, "anpassung");
  assert.equal(k.umfang, "phasenweise");
});

test("gewählter Umfang bleibt, wenn nichts dagegen spricht", () => {
  assert.equal(karte({ anliegen: "ueben", mehrwert: "rueckmeldung", umfang: "durchgaengig" }).umfang, "durchgaengig");
  assert.equal(karte({ anliegen: "ueben", mehrwert: "rueckmeldung", umfang: "punktuell" }).umfang, "punktuell");
});

test("Umfang »noch offen« bekommt einen Vorschlag", () => {
  assert.equal(karte({ phase: "einstieg", anliegen: "interesse", mehrwert: "experimentieren", umfang: "offen" }).umfang, "punktuell");
  assert.equal(karte({ phase: "erarbeitung", anliegen: "zusammen", mehrwert: "gemeinsam", umfang: "offen" }).umfang, "phasenweise");
});

test("Empfehlungen: höchstens drei, nie reine KI-Beispiele", () => {
  for (const m of T.mehrwerte) for (const a of T.anliegen) {
    const k = karte({ anliegen: a.id, mehrwert: m.id });
    assert.ok(k.beispiele.length <= 3);
    assert.ok(k.beispiele.every((b) => b.bereich !== "ki"));
  }
});

test("Empfehlungen sind deterministisch", () => {
  const a = { phase: "sicherung", anliegen: "ueben", mehrwert: "individuell" };
  assert.deepEqual(karte(a).beispiele.map((b) => b.id), karte(a).beispiele.map((b) => b.id));
});

test("passendes Beispiel steht vorn: Üben mit Rückmeldung findet die Quest", () => {
  const k = karte({ phase: "sicherung", anliegen: "ueben", mehrwert: "rueckmeldung" });
  assert.equal(k.gelockert, false);
  assert.ok(k.beispiele.map((b) => b.id).includes("quest"));
});

test("ohne genaue Übereinstimmung wird gelockert und das gesagt", () => {
  const k = karte({ phase: "abschluss", anliegen: "vorwissen", mehrwert: "zeitort", rahmen: { netz: "nein" } });
  assert.equal(k.gelockert, true);
  assert.ok(k.beispiele.length > 0);
});

test("»In Überarbeitung« steht hinter gleich passenden Beispielen", () => {
  const k = karte({ phase: "erarbeitung", anliegen: "verstehen", mehrwert: "experimentieren" });
  const ids = k.beispiele.map((b) => b.id);
  if (ids.includes("karte-ww2")) assert.notEqual(ids[0], "karte-ww2");
});

test("jede Antwortkombination liefert alle Felder der Entscheidungskarte", () => {
  const phasen = T.phasen.map((p) => p.id), umf = T.umfang.map((u) => u.id).concat(["offen"]);
  for (const phase of phasen) for (const m of T.mehrwerte) for (const umfang of umf) {
    const k = karte({ phase, anliegen: "verstehen", mehrwert: m.id, umfang });
    for (const f of ["einstufung", "begruendung", "umfang", "anpassung", "stolperstein", "naechsterSchritt"]) assert.ok(k[f], f);
    assert.ok(k.rollen.length >= 1 && k.rollen.length <= 2);
    assert.ok(T.einstufungen.some((e) => e.id === k.einstufung));
  }
});

/* ---------- Selbsteinschätzung ---------- */
const selbst = (e) => R.selbsteinschaetzung(e, B);

test("Selbsteinschätzung: leere Eingabe liefert eine vollständige, wertschätzende Empfehlung", () => {
  const r = selbst({});
  assert.ok(r.einordnung && r.format && r.alternative && r.umfang);
  assert.equal(r.schluss, "Andere Wege sind ebenso möglich.");
  assert.ok(r.beispiele.length >= 2 && r.beispiele.length <= 3);
});

test("Selbsteinschätzung: Gespräch wichtig führt zu Moderieren, nicht zu weniger", () => {
  const r = selbst({ gespraech: 5, technik: 4, zeit: 4, begleiten: 4 });
  assert.equal(r.rollen[0], "moderieren");
  assert.notEqual(r.umfang, "punktuell");
  assert.match(r.format, /gemeinsam besprecht/);
});

test("Selbsteinschätzung: nie Verzicht auf digitale Bildung, höchstens kleiner Einstieg", () => {
  for (let x = 1; x <= 5; x++) {
    const r = selbst({ steuern: x, begleiten: x, gespraech: x, technik: x, zeit: x });
    assert.ok(["punktuell", "phasenweise", "durchgaengig"].includes(r.umfang));
    assert.ok(!/verzicht|kein digital/i.test(JSON.stringify(r.gruende) + r.format + r.alternative));
  }
});

test("Selbsteinschätzung: wenig Technik oder Zeit ergibt punktuell", () => {
  assert.equal(selbst({ technik: 1, zeit: 5 }).umfang, "punktuell");
  assert.equal(selbst({ technik: 5, zeit: 1 }).umfang, "punktuell");
});

test("Selbsteinschätzung: ungültige Werte zählen als Mitte", () => {
  assert.deepEqual(selbst({ steuern: "x", begleiten: 9 }).umfang, selbst({}).umfang);
});

/* ---------- Konzeptbeispiele ---------- */
test("Kfz-Technik: der Weg findet das Konzeptbeispiel (Szenario 7)", () => {
  const k = karte({ phase: "erarbeitung", anliegen: "erkunden", mehrwert: "experimentieren" });
  assert.ok(k.beispiele.length >= 1);
  const S = require("../assets/suche.js");
  const e = S.finde(B, {}, "Kfz");
  assert.equal(e.treffer[0].id, "kfz-fehlersuche");
});

test("Konzeptbeispiele: Status Idee, kein Link, kein Bild, keine Erfahrung", () => {
  const konzepte = B.filter((b) => b.vorschauArt === "konzept");
  assert.ok(konzepte.length >= 3);
  for (const b of konzepte) {
    assert.equal(b.status, "Idee");
    assert.equal(b.link, null);
    assert.equal(b.bild, null);
    assert.equal(b.erfahrung, null);
  }
});

/* ---------- Szenarien aus dem Auftrag ---------- */
test("Szenario 3: tabletgestützte Erarbeitung mit Zusammenarbeit", () => {
  const k = karte({ phase: "erarbeitung", anliegen: "zusammen", mehrwert: "gemeinsam", umfang: "phasenweise" });
  assert.equal(k.einstufung, "klar");
  assert.equal(k.rollen[0], "moderieren");
  assert.ok(k.beispiele.some((b) => b.mehrwerte.includes("gemeinsam")));
});

test("Szenario 4: Lernstand erkennen findet passende Ideen", () => {
  const k = karte({ phase: "abschluss", anliegen: "lernstand", mehrwert: "rueckmeldung" });
  assert.equal(k.einstufung, "klar");
  assert.ok(k.rollen.includes("rueckmelden"));
  assert.equal(k.gelockert, false);
});

test("Szenario 5: unterschiedliche Lernwege anbieten", () => {
  const k = karte({ phase: "erarbeitung", anliegen: "differenzieren", mehrwert: "zugaenge" });
  assert.equal(k.einstufung, "klar");
  assert.match(k.anpassung, /gemeinsames Ziel/);
  assert.match(k.stolperstein, /Anschluss/);
});

test("Szenario 6: durchgängige HTML-Lernumgebung ist möglich, aber kein Standard", () => {
  const gut = karte({ phase: "erarbeitung", anliegen: "ueben", mehrwert: "individuell", umfang: "durchgaengig", rahmen: { erfahrung: "viel", zeit: "viel", netz: "ja" } });
  assert.equal(gut.umfang, "durchgaengig");
  const knapp = karte({ phase: "erarbeitung", anliegen: "ueben", mehrwert: "individuell", umfang: "durchgaengig", rahmen: { zeit: "wenig" } });
  assert.equal(knapp.umfang, "phasenweise");
});

/* Ab Version 2.1: vollständiger Rahmen (Sozialform, Zugänglichkeit, Datenschutz) und motivationale Neuheit. */

test("Interesse: Neugier auf das Gerät allein ist kein Lernmehrwert", () => {
  const k = karte({ anliegen: "interesse", mehrwert: "experimentieren" });
  assert.equal(k.einstufung, "klar");
  assert.match(k.begruendung, /Neugier auf das Gerät allein ist aber noch kein Lernmehrwert/);
});

test("Sozialform »allein« passt nicht zu »gemeinsam an einem Ergebnis arbeiten«", () => {
  const ohne = karte({ anliegen: "zusammen", mehrwert: "gemeinsam" });
  const allein = karte({ anliegen: "zusammen", mehrwert: "gemeinsam", rahmen: { sozialform: "allein" } });
  assert.notEqual(ohne.anpassung, allein.anpassung);
  assert.match(allein.anpassung, /zu zweit oder in Gruppen/);
});

test("Individuelles Üben mit der ganzen Klasse braucht eine eigene Phase", () => {
  const k = karte({ anliegen: "ueben", mehrwert: "individuell", rahmen: { sozialform: "klasse" } });
  assert.match(k.anpassung, /Phase allein oder zu zweit/);
});

test("Ergebnisse vergleichen in Einzelarbeit braucht ein Gegenüber", () => {
  const k = karte({ anliegen: "zusammen", mehrwert: "sichtbar", rahmen: { sozialform: "allein" } });
  assert.match(k.anpassung, /Gegenüber/);
});

test("Daten zu einzelnen Lernenden machen Datenschutz zum wichtigsten Stolperstein", () => {
  const k = karte({ anliegen: "ueben", mehrwert: "rueckmeldung", rahmen: { daten: "ja" } });
  assert.match(k.stolperstein, /^Datenschutz:/);
  assert.match(k.stolperstein, /freigegebenes Werkzeug/);
});

test("Unterstützungsbedarf macht Zugänglichkeit zum wichtigsten Stolperstein", () => {
  const k = karte({ anliegen: "ueben", mehrwert: "rueckmeldung", rahmen: { zugang: "ja" } });
  assert.match(k.stolperstein, /^Zugänglichkeit:/);
});

test("Netz geht vor Datenschutz, Datenschutz vor Zugänglichkeit", () => {
  const alle = { netz: "nein", daten: "ja", zugang: "ja" };
  assert.match(karte({ mehrwert: "authentisch", anliegen: "recherche", rahmen: alle }).stolperstein, /Netz/);
  assert.match(karte({ mehrwert: "rueckmeldung", anliegen: "ueben", rahmen: { daten: "ja", zugang: "ja" } }).stolperstein, /^Datenschutz/);
});

test("»nein« bei Datenschutz und Zugänglichkeit ändert nichts", () => {
  const a = { anliegen: "ueben", mehrwert: "rueckmeldung" };
  const ohne = karte(a);
  const nein = karte({ ...a, rahmen: { daten: "nein", zugang: "nein" } });
  assert.equal(ohne.stolperstein, nein.stolperstein);
  assert.equal(ohne.einstufung, nein.einstufung);
});

test("Jede Rahmenfrage ändert mindestens eine Aussage der Karte", () => {
  const faelle = {
    netz: [{ anliegen: "recherche", mehrwert: "authentisch" }, "nein"],
    geraete: [{ anliegen: "ueben", mehrwert: "individuell", umfang: "durchgaengig" }, "geteilt"],
    erfahrung: [{ anliegen: "ueben", mehrwert: "individuell", umfang: "durchgaengig" }, "wenig"],
    zeit: [{ anliegen: "ueben", mehrwert: "individuell", umfang: "durchgaengig" }, "wenig"],
    sozialform: [{ anliegen: "zusammen", mehrwert: "gemeinsam" }, "allein"],
    zugang: [{ anliegen: "ueben", mehrwert: "rueckmeldung" }, "ja"],
    daten: [{ anliegen: "ueben", mehrwert: "rueckmeldung" }, "ja"]
  };
  for (const r of T.rahmen) {
    assert.ok(faelle[r.id], "Testfall fehlt für Rahmenfrage " + r.id);
    const [a, wert] = faelle[r.id];
    const ohne = JSON.stringify(karte(a));
    const mit = JSON.stringify(karte({ ...a, rahmen: { [r.id]: wert } }));
    assert.notEqual(ohne, mit, "Rahmenfrage ohne Wirkung: " + r.id);
  }
});

test("Papierfrage: ohne erste Antwort bleibt das Ergebnis offen und nennt die nächste Frage", () => {
  for (const a of [undefined, null, {}]) {
    const e = R.papierprobe(a);
    assert.equal(e.id, null);
    assert.equal(e.frage, "neu");
  }
  assert.deepEqual(R.papierprobe({ neu: "nein" }), { id: null, frage: "ablage" });
  assert.deepEqual(R.papierprobe({ neu: "ja" }), { id: null, frage: "ziel" });
});

test("Papierfrage: nichts Neues und nur Ablage ist organisatorischer Nutzen", () => {
  assert.equal(R.papierprobe({ neu: "nein", ablage: "ja" }).id, "organisatorisch");
});

test("Papierfrage: nichts Neues und keine Ablage heißt Papier", () => {
  assert.equal(R.papierprobe({ neu: "nein", ablage: "nein" }).id, "analog");
  assert.equal(R.papierprobe({ neu: "nein", ablage: "offen" }).id, "analog");
});

test("Papierfrage: Unsicherheit heißt Lernziel klären, nicht Papier (ab Version 4.13)", () => {
  assert.deepEqual(R.papierprobe({ neu: "offen" }), { id: null, frage: "klaeren" });
  assert.deepEqual(R.papierprobe({ neu: "offen", lesen: "ja", teilhabe: "ja" }), { id: null, frage: "klaeren" });
});

test("Papierfrage: für alle und für dieses Ziel – Teilhabe oder digitales Lernziel ergänzt einen Hinweis", () => {
  for (const a of [{ neu: "nein", ablage: "nein" }, { neu: "nein", ablage: "ja" }]) {
    const mit = R.papierprobe({ ...a, teilhabe: "ja" });
    const ohne = R.papierprobe({ ...a, teilhabe: "nein" });
    assert.equal(mit.id, ohne.id, "Einstufung bleibt");
    assert.match(mit.teilhabe, /einzelne Lernende/);
    assert.equal(ohne.teilhabe, undefined);
  }
  assert.equal(R.papierprobe({ neu: "ja", ziel: "ja", teilhabe: "ja" }).teilhabe, undefined, "bei Lernmehrwert nicht nötig");
  assert.ok(!/\d+ ?%/.test(R.papierprobe({ neu: "nein", ablage: "nein", teilhabe: "ja" }).teilhabe), "keine Prozentwerte");
});

test("Papierfrage: Neues mit Lernzielbezug ist klarer Mehrwert, ohne Bezug Anpassung", () => {
  assert.equal(R.papierprobe({ neu: "ja", ziel: "ja" }).id, "klar");
  assert.equal(R.papierprobe({ neu: "ja", ziel: "nein" }).id, "anpassung");
  assert.equal(R.papierprobe({ neu: "ja", ziel: "offen" }).id, "anpassung");
});

test("Papierfrage: Lese-Kriterium ergänzt bei längerem Text einen Hinweis, ändert aber die Einstufung nicht", () => {
  const mit = R.papierprobe({ neu: "ja", ziel: "ja", lesen: "ja" });
  const ohne = R.papierprobe({ neu: "ja", ziel: "ja", lesen: "nein" });
  assert.equal(mit.id, "klar");
  assert.equal(ohne.id, "klar");
  assert.match(mit.lesen, /Papier/);
  assert.equal(ohne.lesen, undefined);
  assert.equal(R.papierprobe({ neu: "nein", ablage: "ja", lesen: "ja" }).id, "organisatorisch");
  assert.ok(R.papierprobe({ neu: "nein", ablage: "ja", lesen: "ja" }).lesen);
});

test("Papierfrage: ohne Ergebnis gibt es auch keinen Lesehinweis", () => {
  const e = R.papierprobe({ lesen: "ja" });
  assert.equal(e.id, null);
  assert.equal(e.lesen, undefined);
  assert.ok(!/\d+ ?%/.test(R.papierprobe({ neu: "nein", ablage: "nein", lesen: "ja" }).lesen), "keine Prozentwerte");
});

test("Papierfrage: jedes Ergebnis ist eine der vier Einstufungen und hat eine Begründung", () => {
  const ids = T.einstufungen.map((e) => e.id);
  const faelle = [{ neu: "nein", ablage: "ja" }, { neu: "nein", ablage: "nein" }, { neu: "ja", ziel: "ja" }, { neu: "ja", ziel: "nein" }];
  for (const a of faelle) {
    const e = R.papierprobe(a);
    assert.ok(ids.includes(e.id), e.id);
    assert.ok(e.grund && e.grund.length > 20);
    assert.ok(!/\d+ ?%/.test(e.grund), "keine Prozentwerte");
  }
});

test("Planungsweg: zuerst nur wenige, klare Antworten; jedes Ziel hat eine kurze Formulierung", () => {
  const T = require("../assets/daten/taxonomien.js");
  const ziele = T.anliegen.filter((a) => a.bereich !== "ki");
  assert.ok(ziele.filter((a) => a.haeufig).length <= 6, "höchstens sechs Ziele zuerst");
  assert.ok(ziele.every((a) => a.ziel && a.ziel.length <= 45), "jedes Ziel kurz formuliert");
  for (const id of ["interesse", "lernstand", "leistung"]) assert.ok(ziele.find((a) => a.id === id).haeufig, id + " steht zuerst");
  const mw = T.mehrwerte.filter((m) => m.haeufig).map((m) => m.id);
  assert.ok(mw.length <= 6 && mw.includes("organisation") && mw.includes("unklar"), "ehrliche Antworten bleiben sichtbar");
});

/* ---------- Beobachtungsbogen (ab Version 4.5) ---------- */
test("Beobachtung: ohne Entscheidung noch keine Auswertung, aber immer der Hinweis auf persönliche Beobachtung", () => {
  for (const a of [undefined, {}, { lernhandlung: "nein" }]) {
    const e = R.beobachtung(a);
    assert.equal(e.id, null);
    assert.match(e.satz, /kein Nachweis der Wirkung/);
  }
});

test("Beobachtung: der nächste Schritt folgt allein der Entscheidung der Lehrkraft", () => {
  assert.equal(R.beobachtung({ entscheidung: "lassen", lernhandlung: "nein" }).id, "lassen");
  assert.equal(R.beobachtung({ entscheidung: "nachschaerfen" }).link, "digital-check.html");
  const p = R.beobachtung({ entscheidung: "papier", lernhandlung: "ja", mehrwert: "ja" });
  assert.equal(p.id, "papier");
  assert.match(p.text, /Fortschritt/, "zurück zu Papier ist kein Scheitern");
});

test("Beobachtung: Hinweise nur aus Antworten, die auf ein Problem zeigen, höchstens drei", () => {
  assert.equal(R.beobachtung({ lernhandlung: "ja", mehrwert: "ja", technik: "kaum", aufmerksamkeit: "ja", entscheidung: "lassen" }).hinweise.length, 0);
  const alle = R.beobachtung({ lernhandlung: "nein", mehrwert: "nein", technik: "zuviel", aufmerksamkeit: "nein", entscheidung: "papier" });
  assert.equal(alle.hinweise.length, 3);
  assert.match(alle.hinweise[0], /selbst antworten/, "Lernhandlung zuerst");
});

test("Beobachtung: »so lassen« trotz fehlender Lernhandlung wird freundlich benannt, nicht verboten", () => {
  assert.ok(R.beobachtung({ entscheidung: "lassen", lernhandlung: "nein" }).spannung.length > 20);
  assert.equal(R.beobachtung({ entscheidung: "lassen", lernhandlung: "ja", mehrwert: "ja" }).spannung, "");
  assert.equal(R.beobachtung({ entscheidung: "nachschaerfen", lernhandlung: "nein" }).spannung, "");
});

test("Beobachtung: Lernnachweis ohne Gerät und Hilfe kommt direkt nach der Lernhandlung (ab Version 4.13)", () => {
  const e = R.beobachtung({ lernhandlung: "ja", nachweis: "nein", mehrwert: "ja", entscheidung: "nachschaerfen" });
  assert.equal(e.hinweise.length, 1);
  assert.match(e.hinweise[0], /ohne Gerät und ohne Hilfe/);
  const zwei = R.beobachtung({ lernhandlung: "nein", nachweis: "teils", mehrwert: "nein", technik: "zuviel", entscheidung: "papier" });
  assert.match(zwei.hinweise[1], /noch nicht gelernt/, "Lernnachweis an zweiter Stelle");
  assert.equal(zwei.hinweise.length, 3);
  assert.match(R.beobachtung({ nachweis: "offen", entscheidung: "lassen" }).hinweise[0], /weißt du noch nicht/);
  assert.equal(R.beobachtung({ nachweis: "ja", entscheidung: "lassen" }).hinweise.length, 0);
  assert.ok(R.beobachtung({ entscheidung: "lassen", lernhandlung: "ja", mehrwert: "ja", nachweis: "nein" }).spannung.length > 20);
});

test("Beobachtung: keine Noten, Punkte oder Prozentwerte in den Texten", () => {
  const e = R.beobachtung({ lernhandlung: "teilweise", mehrwert: "nein", technik: "spuerbar", aufmerksamkeit: "teils", entscheidung: "nachschaerfen" });
  for (const t of [e.text, e.satz, ...e.hinweise]) assert.ok(!/\d+ ?(%|Punkte)|Note/.test(t), t);
});

/* ---------- »Mein Ist-Stand« geht im Fortbildungsbogen auf (ab Version 4.36) ---------- */
test("Ist-Stand im Bogen: die eigene Regel entfällt, ihre Fragen beantwortet der Fortbildungsbogen", () => {
  assert.equal(R.istStand, undefined);
  assert.equal(typeof R.startpunkt, "function");
});

test("Ist-Stand im Bogen: »vor allem Ablage« heißt organisatorischer Nutzen – ausdrücklich legitim, keine Vorstufe", () => {
  const e = R.startpunkt({ d_klassen: "alle", tablet: ["ablage"], d_mehrwert: "selten" });
  assert.equal(e.tablet.id, "ablage");
  assert.match(e.tablet.text, /organisatorischer Nutzen – legitim und keine Vorstufe/);
  assert.ok(e.schritte.some((s) => s.link === "unterricht.html#t-probe"), "die Papierfrage als Schritt");
});

test("Ist-Stand im Bogen: der Wunsch »Schnellere Rückmeldung« wird ein Schritt – direkt nach dem ersten Anlass, vor den Tablet-Phasen", () => {
  const e = R.startpunkt({ haeufigkeit: "woechentlich", anlass: ["eltern"], d_klassen: "alle", tablet: ["ablage"], d_schwer: ["ablenkung"], d_wunsch: "feedback" });
  assert.equal(e.schritte.length, 3);
  assert.equal(e.schritte[0].link, "ki.html#t-schnell");
  assert.equal(e.schritte[1].link, "digitalisieren.html");
  assert.match(e.schritte[1].text, /Rückmeldung/);
  assert.equal(e.schritte[1].linktext, "Bisherigen Unterricht digitalisieren");
  assert.equal(e.schritte[2].link, "tablet-phasen.html#t-regeln", "Ablenkung führt weiter zu den Regeln für Tablet-Phasen");
  const doppelt = R.startpunkt({ anlass: ["uebung"], d_klassen: "alle", d_wunsch: "feedback" }).schritte.filter((s) => s.link === "digitalisieren.html");
  assert.equal(doppelt.length, 1, "derselbe Schritt nur einmal");
  assert.ok(!R.startpunkt({ d_klassen: "keine", d_wunsch: "feedback" }).schritte.some((s) => s.link === "digitalisieren.html"), "ohne Tablet-Klasse kein Tablet-Schritt");
});

/* ---------- Mein Rückmeldebogen (ab Version 4.36) ---------- */
test("Rückmeldebogen: leere Eingabe ohne Fehler – nur die Weitergabe »noch offen«, immer »keine Bewertung«", () => {
  for (const a of [undefined, {}, { texte: { gut: "   " } }]) {
    const e = R.rueckmeldebogen(a);
    assert.equal(e.leer, true);
    assert.deepEqual(e.zeilen, [{ titel: "Weitergabe ohne Namen", wert: "noch offen" }]);
    assert.match(e.satz, /keine Bewertung/);
    assert.equal(e.hilfen.length, 0);
  }
});

test("Rückmeldebogen: der Text für die Leitung nennt nur, was ausgefüllt ist – Freitexte ohne Zeilenumbrüche", () => {
  const e = R.rueckmeldebogen({ art: ["erfahrung"], womit: ["planen", "beispiel"], hakt: ["ablenkung"], weitergabe: "ja", datum: "13. November 2026",
    texte: { kuerzel: "AB", gut: "Alle haben\nabgestimmt.", stelle: "", frage: "Wie lang soll die Phase sein?" } });
  assert.equal(e.text.split("\n")[0], "Rückmeldung aus Kidu · Mein Rückmeldebogen · 13. November 2026");
  assert.match(e.text, /^Kürzel: AB$/m);
  assert.match(e.text, /^Womit: Unterricht neu planen · Eines der Unterrichtsbeispiele$/m);
  assert.match(e.text, /^Was gut geklappt hat: Alle haben abgestimmt\.$/m);
  assert.match(e.text, /^Weitergabe ohne Namen: Ja, ohne meinen Namen$/m);
  assert.ok(!/Die Stelle|Was genau|Was helfen würde/.test(e.text), "leere Felder fehlen");
  assert.equal(e.leer, false);
});

test("Rückmeldebogen: höchstens zwei Hilfen in der Reihenfolge der Kreuze – zur Technik keine", () => {
  const e = R.rueckmeldebogen({ hakt: ["technik", "plenum", "ablenkung", "auftrag"] });
  assert.deepEqual(e.hilfen.map((h) => h.link), ["sechs-hebel.html#fuenf-saetze", "tablet-phasen.html#t-regeln"]);
  assert.equal(R.rueckmeldebogen({ hakt: ["technik", "nichts", "anderes"] }).hilfen.length, 0);
  assert.equal(R.rueckmeldebogen({ hakt: ["zeit"] }).hilfen[0].link, "unterricht.html#t-probe");
  assert.match(R.rueckmeldebogen({ hakt: ["zeit"] }).hilfen[0].text, /vollwertiges Ergebnis/);
});

test("Rückmeldebogen: unbekannte Werte fallen weg, keine Noten, Punkte oder Prozentwerte", () => {
  const e = R.rueckmeldebogen({ art: ["gibt-es-nicht", "wunsch"], weitergabe: "vielleicht", hakt: ["niveau"], brauche: ["gespraech"] });
  assert.match(e.text, /^Worum es geht: Ein Wunsch für die nächste Fortbildung$/m);
  assert.match(e.text, /^Weitergabe ohne Namen: noch offen$/m);
  for (const s of [e.text, e.satz, ...e.hilfen.map((h) => h.text)]) assert.ok(!/\d+ ?(%|Punkte)|Note/.test(s), s);
});

test("Umfang (4.37): kurzer Impuls nur für Einstieg und Ausblick – wer am Ende überträgt, bekommt eine ganze Phase", () => {
  const u = R.umfang({ phase: "abschluss", anliegen: "reflektieren" }, "klar");
  assert.equal(u.id, "phasenweise");
  assert.match(u.grund, /Übertragen/);
  for (const a of [{ phase: "abschluss", anliegen: "interesse" }, { phase: "einstieg", anliegen: "reflektieren" }, { phase: "einstieg" }]) {
    const v = R.umfang(a, "klar");
    assert.equal(v.id, "punktuell", JSON.stringify(a));
    assert.match(v.grund, /kurzer Impuls/);
  }
  assert.equal(R.umfang({ phase: "abschluss", anliegen: "reflektieren", umfang: "punktuell" }, "klar").id, "punktuell", "die eigene Wahl bleibt");
});

/* ---------- Ganze Einheit (ab Version 4.37, Fassung B) ---------- */
test("Einheit: ohne Angaben kommen die vier Schritte des Rahmens in fester Reihenfolge, die Papierprobe steht immer da", () => {
  for (const a of [undefined, {}, { da: ["gibt-es-nicht"] }]) {
    const e = R.einheit(a, T);
    assert.deepEqual(e.naechstes, T.einheit.schritte.slice(0, 4));
    assert.match(e.papierprobe, /nur weil die Nachbarstunde eins hat/);
    assert.match(e.satzEnde, /keine Bewertung/);
    assert.deepEqual(e.da, []);
  }
});

test("Einheit: was es schon gibt, fällt aus den nächsten Schritten – Landkarte und Bausteine teilen sich einen Schritt", () => {
  const e = R.einheit({ da: ["leitfrage", "landkarte"] }, T);
  assert.deepEqual(e.da, ["Landkarte", "Leitfrage"]);
  assert.deepEqual(e.naechstes, [T.einheit.schritte[1], T.einheit.schritte[2], T.einheit.schritte[3]]);
  const voll = R.einheit({ da: ["landkarte", "leitfrage", "bausteine", "sicherung", "stundenfolge"] }, T);
  assert.equal(voll.naechstes.length, 0);
  assert.match(voll.weiter, /Der Rahmen steht/);
});

test("Einheit: keine vierte Stufe – der Umfang bleibt bei drei Werten, die Einheit sagt nichts über die Menge an Gerät", () => {
  assert.deepEqual(T.umfang.map((u) => u.id).filter((id) => id !== "offen"), ["punktuell", "phasenweise", "durchgaengig"]);
  assert.equal(T.einheit.merkmale.length, 5);
  assert.match(T.einheit.satz, /auch keins/);
  for (const s of [...T.einheit.schritte, R.einheit({}, T).weiter]) assert.ok(!/Stufe|besser als|\d+ ?(%|Punkte)|Note/.test(s), s);
});

test("Umfang durchgängig: gewählt bleibt gewählt, aber mit festen Stellen im Plenum und Papier für lange Texte", () => {
  const k = karte({ anliegen: "ueben", mehrwert: "rueckmeldung", umfang: "durchgaengig" });
  assert.equal(k.umfang, "durchgaengig");
  const u = R.umfang({ anliegen: "ueben", mehrwert: "rueckmeldung", umfang: "durchgaengig" }, "klar");
  assert.match(u.grund, /Plenum/);
  assert.match(u.grund, /Papier/);
  assert.match(R.umfang({ umfang: "phasenweise" }, "klar").grund, /Das hast du gewählt/);
});

test("Startpunkt: leere Eingabe ohne Fehler – Lage »offen«, immer der Satz »keine Bewertung«, fünf Felder", () => {
  for (const a of [undefined, {}]) {
    const e = R.startpunkt(a);
    assert.equal(e.lage.id, "offen");
    assert.match(e.satz, /keine Bewertung/);
    assert.equal(e.sicherheit.length, 5);
    assert.equal(e.tablet.id, "offen");
    assert.ok(e.sicherheit.every((f) => f.wert === "offen"));
    assert.ok(e.schritte.length >= 1 && e.schritte.length <= 3 && e.kniffe.length === 2 && e.staerken.length >= 1);
  }
});

test("Startpunkt: vier Lagen aus Häufigkeit, Nutzung und Ergebnis", () => {
  assert.equal(R.startpunkt({ haeufigkeit: "nie", systeme: ["keines"] }).lage.id, "anfang");
  assert.equal(R.startpunkt({ haeufigkeit: "probiert", ergebnis: "selten" }).lage.id, "enttaeuscht");
  assert.equal(R.startpunkt({ haeufigkeit: "mehrmals", wofuer: ["texte", "arbeitsblatt"] }).lage.id, "fuersich");
  assert.equal(R.startpunkt({ haeufigkeit: "taeglich", wofuer: ["gebaut", "lernende"], s_bauen: "sicher" }).lage.id, "weit");
});

test("Startpunkt: keine Rangfolge – Lagen heißen nicht Stufe, Niveau oder Anfänger; keine Noten, Punkte oder Prozentwerte", () => {
  for (const a of [{ haeufigkeit: "nie" }, { haeufigkeit: "probiert", ergebnis: "selten" }, { haeufigkeit: "mehrmals", wofuer: ["texte", "quiz"] }, { haeufigkeit: "taeglich", wofuer: ["gebaut"] }]) {
    const e = R.startpunkt(a);
    for (const t of [e.lage.titel, e.lage.text, e.satz, ...e.staerken, ...e.schritte.map((s) => s.text), ...e.kniffe.map((k) => k.text)])
      assert.ok(!/Stufe|Niveau \d|Anfänger|\d+ ?(%|Punkte)|Note/.test(t), t);
  }
});

test("Startpunkt: der erste gewählte Anlass kommt zuerst, Skepsis führt zur Papierfrage, höchstens drei Schritte", () => {
  const e = R.startpunkt({ haeufigkeit: "nie", anlass: ["eltern", "uebung"], hindernis: ["datenschutz"] });
  assert.equal(e.schritte[0].link, "ki.html#t-schnell");
  assert.ok(e.schritte.some((s) => s.link === "sicher.html"), "Datenschutz-Unsicherheit führt zu »Sicher arbeiten«");
  assert.ok(e.schritte.length <= 3);
  const s = R.startpunkt({ haeufigkeit: "woechentlich", gedanken: ["fach"], anlass: ["uebung"] });
  assert.ok(s.lage.skeptisch && s.schritte[0].link.startsWith("unterricht.html#t-probe"));
  assert.ok(s.staerken.some((t) => /vollwertiges Ergebnis/.test(t)), "Skepsis wird als Stärke genannt, nicht umgestimmt");
});

test("Startpunkt: Kniffe passen zur Lage und Arbeitsweise – Einsprechen nur, wenn noch nicht eingesprochen wird", () => {
  const a = R.startpunkt({ haeufigkeit: "probiert", ergebnis: "selten", vorbereitung: "genau" });
  assert.ok(a.kniffe.some((k) => /Einsprechen/.test(k.titel)) && a.kniffe.length === 2);
  const b = R.startpunkt({ haeufigkeit: "probiert", ergebnis: "selten", eingabe: "sprechen", vorbereitung: "genau" });
  assert.ok(!b.kniffe.some((k) => /Einsprechen/.test(k.titel)));
  assert.ok(b.kniffe.some((k) => /Kürzen/.test(k.titel)), "genau Planende bekommen »Kürzen statt mehr«");
});

test("Startpunkt: Unterricht mit Tablets – keine Tablet-Klasse, vor allem Ablage, einzelne Phasen; ohne Rangfolge", () => {
  assert.equal(R.startpunkt({ d_klassen: "keine", tablet: ["ueben"] }).tablet.id, "keine");
  assert.equal(R.startpunkt({ d_klassen: "einige", tablet: ["ablage", "recherche"], d_mehrwert: "selten" }).tablet.id, "ablage");
  assert.equal(R.startpunkt({ d_klassen: "alle", tablet: ["ablage"], d_mehrwert: "manchmal" }).tablet.id, "phasen");
  assert.equal(R.startpunkt({ tablet: ["ablage", "gemeinsam"] }).tablet.id, "phasen");
  assert.equal(R.startpunkt({ d_klassen: "alle" }).tablet.id, "offen");
  for (const a of [{ d_klassen: "keine" }, { tablet: ["ablage"] }, { d_mehrwert: "oft" }, {}]) {
    const t = R.startpunkt(a).tablet;
    assert.ok(!/Stufe|Niveau|Anfänger|nur |erst |noch nicht|\d+ ?(%|Punkte)|Note/.test(t.titel + " " + t.text), t.titel);
  }
});

test("Startpunkt: Ablenkung, fehlender Überblick oder Unsicherheit führen zu den Regeln für Tablet-Phasen – direkt nach dem ersten Anlass", () => {
  const e = R.startpunkt({ haeufigkeit: "woechentlich", anlass: ["eltern", "uebung", "einstieg"], d_klassen: "alle", tablet: ["ablage"], d_schwer: ["ablenkung"] });
  assert.equal(e.schritte.length, 3);
  assert.equal(e.schritte[0].link, "ki.html#t-schnell");
  assert.equal(e.schritte[1].link, "tablet-phasen.html#t-regeln");
  for (const a of [{ s_fuehren: "unsicher" }, { d_regeln: ["keine"] }, { d_schwer: ["ueberblick"] }, { d_wunsch: "ruhe" }])
    assert.ok(R.startpunkt(a).schritte.some((s) => s.link === "tablet-phasen.html#t-regeln"), JSON.stringify(a));
  assert.ok(!R.startpunkt({ d_klassen: "keine", d_schwer: ["ablenkung"] }).schritte.some((s) => /tablet-phasen/.test(s.link)), "ohne Tablet-Klasse kein Tablet-Schritt");
});

test("Startpunkt: »vor allem Ablage«, fehlende Ideen oder der Wunsch nach Papier führen zur Papierfrage – höchstens einmal", () => {
  for (const a of [{ tablet: ["ablage"] }, { d_schwer: ["ideen"], d_mehrwert: "oft" }, { d_wunsch: "mehrwert", d_mehrwert: "oft" }, { d_wunsch: "papier", d_mehrwert: "oft" },
                   { haeufigkeit: "mehrmals", wofuer: ["texte", "quiz"], tablet: ["ablage"] }, { gedanken: ["fach"], tablet: ["ablage"], d_wunsch: "papier" }]) {
    const n = R.startpunkt(a).schritte.filter((s) => s.link === "unterricht.html#t-probe").length;
    assert.equal(n, 1, JSON.stringify(a));
  }
  assert.match(R.startpunkt({ d_wunsch: "papier", d_mehrwert: "oft" }).schritte.find((s) => /t-probe/.test(s.link)).text, /vollwertiges Ergebnis/);
});

test("Startpunkt: Stärken aus dem Unterricht mit Tablets – Absprachen und ausprobierte Formen; fünftes Feld »Tablet-Phase«", () => {
  const e = R.startpunkt({ d_klassen: "alle", d_regeln: ["zeit", "runde"], d_formen: ["quiz", "gemeinsam"], d_mehrwert: "oft", s_fuehren: "sicher" });
  assert.ok(e.staerken.some((t) => /Absprachen/.test(t)) && e.staerken.some((t) => /auf Papier kaum/.test(t)) && e.staerken.length <= 3);
  assert.ok(!R.startpunkt({ d_regeln: ["keine"] }).staerken.some((t) => /Absprachen/.test(t)));
  assert.ok(!R.startpunkt({ d_formen: ["nichts"] }).staerken.some((t) => /Formen/.test(t)));
  assert.deepEqual(e.sicherheit[4], { id: "s_fuehren", titel: "Tablet-Phase", wert: "sicher" });
  assert.match(e.code, /tablet=phasen/); assert.match(e.code, /d_regeln=zeit,runde/); assert.match(e.code, /s_fuehren=sicher/);
});

test("Startpunkt: der Codeblock trägt nur Auswahlwerte, nie Texte", () => {
  const e = R.startpunkt({ haeufigkeit: "mehrmals", wofuer: ["texte", "quiz"], s_pruefen: "teils", stelle: "Quellenarbeit", kuerzel: "MW" });
  assert.match(e.code, /^fortbildungsbogen v2 · lage=fuersich · tablet=offen/);
  assert.match(e.code, /s_pruefen=teils/);
  assert.ok(!/Quellenarbeit|MW/.test(e.code));
});
