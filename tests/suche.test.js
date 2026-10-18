/* Unit-Tests für Suche und Filter in der Galerie.  Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const S = require("../assets/suche.js");
const B = require("../assets/daten/beispiele.js");
const T = require("../assets/daten/taxonomien.js");

test("ohne Filter und Suche: alle Beispiele", () => {
  const e = S.finde(B, {}, "");
  assert.equal(e.treffer.length, B.length);
  assert.equal(e.gelockert, false);
});

test("»alle« zählt nicht als Filter", () => {
  assert.equal(S.finde(B, { bereich: "alle", phase: "" }, "").felder.length, 0);
});

test("Filter sind kombinierbar", () => {
  const e = S.finde(B, { bereich: "lernen", phase: "einstieg" }, "");
  assert.ok(e.treffer.length > 0);
  assert.ok(e.treffer.every((b) => b.phasen.includes("einstieg") && b.bereich !== "ki"));
  assert.equal(e.gelockert, false);
});

test("Es gibt nur zwei Bereiche; jeder Filter findet genau seinen Bereich", () => {
  assert.deepEqual(T.bereiche.map((x) => x.id), ["ki", "lernen"]);
  assert.ok(B.every((b) => b.bereich === "ki" || b.bereich === "lernen"));
  const ki = S.finde(B, { bereich: "ki" }, "").treffer;
  assert.ok(ki.length > 0 && ki.every((b) => b.bereich === "ki"));
  const lernen = S.finde(B, { bereich: "lernen" }, "").treffer;
  assert.ok(lernen.some((b) => b.id === "psycho-ds2") && lernen.every((b) => b.bereich === "lernen"));
});

test("Freitextsuche findet Titel, Fach und Anliegen, ohne Umlaut-Probleme", () => {
  assert.ok(S.finde(B, {}, "quest").treffer.some((b) => b.id === "quest"));
  assert.ok(S.finde(B, {}, "Sozialpädagogik").treffer.length >= 4);
  assert.ok(S.finde(B, {}, "sozialpadagogik").treffer.length >= 4);
  assert.ok(S.finde(B, {}, "Rückmeldung").treffer.length >= 3);
});

test("keine exakte Übereinstimmung: Lockerung mit höchstens sechs nächstpassenden", () => {
  const e = S.finde(B, { phase: "abschluss", anliegen: "leistung", fach: "Psychologie" }, "");
  assert.equal(e.gelockert, true);
  assert.ok(e.treffer.length > 0 && e.treffer.length <= 6);
  // Anliegen wiegt am meisten: die LF3-Plattform (Leistung erfassen) steht vorn
  assert.equal(e.treffer[0].id, "lf3");
});

test("Suchwort ohne Treffer wird benannt; gelockert wird nur über Filter", () => {
  const ohne = S.finde(B, {}, "Raumfahrt");
  assert.equal(ohne.suchtrefferLeer, true);
  assert.equal(ohne.treffer.length, 0);
  const mit = S.finde(B, { anliegen: "ueben" }, "Raumfahrt");
  assert.equal(mit.suchtrefferLeer, true);
  assert.ok(mit.treffer.length > 0 && mit.treffer.every((b) => b.anliegen.includes("ueben")));
});
