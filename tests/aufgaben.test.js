// Aufgabenkoffer (ab 4.32): Die Daten sind vollständig und erfinden nichts.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const A = require("../assets/daten/aufgaben.js");
const beispiele = fs.readFileSync(__dirname + "/../assets/daten/beispiele.js", "utf8");

test("jede Aufgabe hat alle Felder, gültigen Zweck, Ort und Prinzip", () => {
  const zwecke = A.zwecke.map((z) => z.id);
  const ids = new Set();
  for (const a of A.aufgaben) {
    assert.ok(!ids.has(a.id), "doppelte id " + a.id); ids.add(a.id);
    for (const f of ["name", "auch", "tun", "foerdert", "papier", "geraet", "regel", "erfahrung", "beleg", "stand"]) assert.ok(a[f] && a[f].length > 8 || f === "stand" && a[f], a.id + ": " + f);
    assert.ok(zwecke.includes(a.zweck), a.id + ": Zweck");
    assert.ok(A.orte[a.ort], a.id + ": Ort");
    assert.ok(a.sinn.length === 3 && a.wenig.length === 3, a.id + ": je drei Punkte");
    for (const h of a.hebel) assert.ok(A.hebel[h], a.id + ": Prinzip " + h);
    assert.ok(["belegt", "teilweise belegt", "wenig erforscht", "noch offen"].includes(a.stand), a.id + ": Belegstand");
    assert.ok(["eingesetzt", "geplant", "offen"].includes(a.einsatz), a.id + ": Einsatz");
  }
  assert.strictEqual(A.aufgaben.length, 18);
});

test("jeder Zweck hat mindestens zwei Aufgaben", () => {
  for (const z of A.zwecke) assert.ok(A.aufgaben.filter((a) => a.zweck === z.id).length >= 2, z.id);
});

test("Beispiele gibt es in der Galerie; ohne Erprobung kein Beispiel und »noch nicht erprobt«", () => {
  for (const a of A.aufgaben) {
    if (a.beispiel) assert.ok(beispiele.includes('id: "' + a.beispiel + '"'), a.id + ": Beispiel " + a.beispiel);
    if (a.einsatz === "offen") { assert.strictEqual(a.beispiel, null, a.id); assert.ok(/Noch nicht erprobt/.test(a.erfahrung), a.id); }
  }
});

test("wer einen Beleg »belegt« nennt, nennt eine Quelle aus der Liste", () => {
  const kurz = A.quellen.map((q) => q.kurz);
  for (const a of A.aufgaben) if (a.stand !== "noch offen") assert.ok(kurz.some((k) => a.beleg.includes(k)), a.id + ": Quelle fehlt");
});

test("keine Punkte, Ranglisten oder Belohnungen als Empfehlung", () => {
  for (const a of A.aufgaben) for (const s of a.sinn) assert.ok(!/Punkte|Rangliste|Belohnung/.test(s), a.id);
});
