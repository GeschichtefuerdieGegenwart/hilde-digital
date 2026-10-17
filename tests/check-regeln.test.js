/* Unit-Tests für die Regeln des Selbstchecks »Eigenes Material prüfen«.  Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../assets/check-regeln.js");
const Q = require("../assets/daten/qualitaet.js");

const voll = { fachlich: "ja", vollstaendig: "ja", anmeldung: "ja", vorbereitung: "klein", daten: "nein", rechte: "ja" };

test("leere oder fehlende Eingaben führen zu keinem Fehler und ohne Bewertung zu »fehlt«", () => {
  for (const e of [undefined, null, {}, { bereiche: [] }, { bereiche: ["gibt-es-nicht"] }]) {
    const r = C.bericht(e);
    assert.equal(r.profil.length, 0);
    assert.equal(r.sicherheit, "fehlt");
    assert.deepEqual(r.hinweise, []);
  }
});

test("Technik rettet keine schwache Aufgabe: bei a ≤ 1 zählt b höchstens 1", () => {
  assert.equal(C.begrenzeB(0, 3), 1);
  assert.equal(C.begrenzeB(1, 2), 1);
  assert.equal(C.begrenzeB(2, 3), 3);
  assert.equal(C.begrenzeB(3, "nr"), "nr");
  const [x] = C.profil({ bereiche: ["rueckmeldung"], werte: { rueckmeldung: { a: 1, b: 3 } } });
  assert.equal(x.b, 1);
  assert.equal(x.begrenzt, true);
});

test("abgeleitete Begriffe folgen den festen Regeln", () => {
  const p = C.profil({ typ: "quiz", bereiche: ["rueckmeldung", "lernstand", "darstellung"],
    werte: { rueckmeldung: { a: 3, b: 3, analog: "aufwand" }, lernstand: { a: 1, b: 0 }, darstellung: { a: 2, b: 1 } } });
  const [r, l, d] = p;
  assert.ok(r.staerke && r.digitalGetragen && r.besonders);
  assert.ok(l.entwicklungsfeld, "Kernbereich mit a ≤ 1 ist ein Entwicklungsfeld");
  assert.ok(d.ungenutzt, "a ≥ 2 und b ≤ 1 ist ungenutztes Potenzial");
  assert.equal(d.entwicklungsfeld, false);
});

test("ein Entwicklungsfeld gibt es nur in Kernbereichen des Materialtyps", () => {
  const [x] = C.profil({ typ: "quiz", bereiche: ["zusammen"], werte: { zusammen: { a: 0 } } });
  assert.equal(x.entwicklungsfeld, false);
  const [y] = C.profil({ typ: "stunde", bereiche: ["zusammen"], werte: { zusammen: { a: 0 } } });
  assert.equal(y.entwicklungsfeld, true);
});

test("bei einem Arbeitsblatt gilt fehlender digitaler Beitrag nicht als ungenutztes Potenzial", () => {
  const [x] = C.profil({ typ: "arbeitsblatt", bereiche: ["denken"], werte: { denken: { a: 3, b: "nr" } } });
  assert.equal(x.ungenutzt, false);
  assert.match(C.satz(x), /kein Mangel/);
});

test("Stärke-Hinweise nur bei fachlich geprüftem Inhalt und mittlerer Sicherheit, höchstens drei", () => {
  const e = { typ: "html", bereiche: ["rueckmeldung", "denken", "orientierung", "zusammen"],
    werte: { rueckmeldung: { a: 4, b: 3 }, denken: { a: 3, b: 0 }, orientierung: { a: 3, b: 2 }, zusammen: { a: 3, b: 0 } } };
  const r = C.bericht(Object.assign({ rahmen: voll }, e));
  assert.equal(r.hinweise.length, 3);
  assert.equal(r.hinweise[0], "starke Rückmeldung für jede Person");
  assert.ok(r.hinweise.every((h) => !/\d/.test(h)), "Hinweise ohne Zahl");
  assert.deepEqual(C.bericht(Object.assign({ rahmen: Object.assign({}, voll, { fachlich: "teilweise" }) }, e)).hinweise, []);
  assert.deepEqual(C.bericht(Object.assign({ rahmen: Object.assign({}, voll, { vollstaendig: "nein" }) }, e)).hinweise, []);
});

test("schwache fachliche Qualität verhindert alle Stärke-Hinweise", () => {
  const r = C.bericht({ typ: "html", rahmen: voll, bereiche: ["fach", "denken"], werte: { fach: { a: 1 }, denken: { a: 4, b: 2 } } });
  assert.deepEqual(r.hinweise, []);
});

test("»geringer technischer Aufwand« nur ohne Anmeldung und mit wenig Vorbereitung", () => {
  const e = { typ: "quiz", bereiche: ["lernstand"], werte: { lernstand: { a: 2, b: 1 } } };
  assert.ok(C.bericht(Object.assign({ rahmen: voll }, e)).hinweise.includes("geringer technischer Aufwand"));
  assert.ok(!C.bericht(Object.assign({ rahmen: Object.assign({}, voll, { vorbereitung: "mittel" }) }, e)).hinweise.includes("geringer technischer Aufwand"));
});

test("Sicherheit: Selbstcheck höchstens mittel, mit offenen Bereichen oder Teilmaterial vorläufig", () => {
  const p = C.profil({ bereiche: ["denken", "zusammen"], werte: { denken: { a: 3 }, zusammen: { a: null } } });
  assert.equal(C.sicherheit(p, voll), "vorlaeufig");
  const q = C.profil({ bereiche: ["denken"], werte: { denken: { a: 3 } } });
  assert.equal(C.sicherheit(q, voll), "mittel");
  assert.equal(C.sicherheit(q, { vollstaendig: "nein" }), "vorlaeufig");
});

test("Entwicklungsschritte: höchstens drei, fachliche Korrektur zuerst", () => {
  const r = C.bericht({ typ: "html", rahmen: Object.assign({}, voll, { fachlich: "nein" }),
    bereiche: ["orientierung", "handeln", "zugang", "ablauf"],
    werte: { orientierung: { a: 0 }, handeln: { a: 1 }, zugang: { a: 0 }, ablauf: { a: 2, b: 0 } } });
  assert.equal(r.schritte.length, 3);
  assert.equal(r.schritte[0].art, "fachlich");
  assert.equal(r.schritte[1].art, "feld");
});

test("Zählung ist kein Durchschnitt und ein Material ohne digitalen Beitrag gilt nicht als schlecht", () => {
  const g = C.gesamt(C.profil({ bereiche: ["denken", "fach"], werte: { denken: { a: 4, b: 0 }, fach: { a: 4, b: 0 } } }));
  assert.equal(g.zaehlung, "Klarer digitaler Beitrag in 0 von 2 geprüften Bereichen.");
  assert.match(g.text, /kein Mangel/);
});

test("Mehrwertsatz nennt die Funktion und den Analogvergleich", () => {
  const [x] = C.profil({ bereiche: ["rueckmeldung"], werte: { rueckmeldung: { a: 3, b: 2, analog: "aufwand" } } });
  const s = C.satz(x);
  assert.match(s, /klarer digitaler Mehrwert/);
  assert.match(s, /erklärende Rückmeldung/);
  assert.match(s, /nur mit mehr Aufwand/);
});

test("Daten: jeder Bereich hat fünf Qualitäts- und drei Beitragsanker, jeder Kernbereich existiert", () => {
  const ids = new Set(Q.bereiche.map((b) => b.id));
  assert.equal(ids.size, 14);
  Q.bereiche.forEach((b) => { assert.equal(b.a.length, 5, b.id); assert.equal(b.b.length, 3, b.id); });
  Q.materialtypen.forEach((t) => t.kern.forEach((k) => assert.ok(ids.has(k), t.id + ":" + k)));
  Q.hinweise.forEach((h) => assert.ok(ids.has(h.bereich)));
});

test("Fachbegriffe stehen nur im Feld »fachname« (für die Vertiefung)", () => {
  const begriffe = ["Adaptivität", "kognitive Aktivierung", "formative Diagnostik", "Multimodalität", "Gamification", "selbstreguliert"];
  Q.bereiche.forEach((b) => {
    const sichtbar = [b.name, b.frage, b.analog, b.risiko].concat(b.a, b.b).join(" ").toLowerCase();
    begriffe.forEach((w) => assert.ok(!sichtbar.includes(w.toLowerCase()), b.id + ": " + w));
  });
});

test("Grenzen: offene Rechte und Daten stehen vor den Risiken, höchstens vier", () => {
  const p = C.profil({ bereiche: ["denken", "rueckmeldung", "orientierung", "handeln"],
    werte: { denken: { a: 3, b: 2 }, rueckmeldung: { a: 3, b: 3 }, orientierung: { a: 3, b: 1 }, handeln: { a: 3, b: 2 } } });
  const g = C.grenzen(p, { rechte: "teilweise", daten: "unklar" });
  assert.equal(g.length, 4);
  assert.match(g[0], /personenbezogene/);
  assert.match(g[1], /Rechte/);
  assert.match(g[2], /^Rückmeldung/);
});
