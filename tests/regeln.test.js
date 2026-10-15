/* Unit-Tests für die Regeln des Mehrwert-Checks.  Aufruf: node --test */
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
