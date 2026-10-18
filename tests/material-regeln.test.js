/* Unit-Tests für die Textsuche im Digital-Check (Weg B).  Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const M = require("../assets/material-regeln.js");
const Q = require("../assets/daten/qualitaet.js");

const BLATT = `Arbeitsauftrag: Lies den Text M1 (Quelle: Peukert 1980).
1. Nenne drei Formen des Widerstands.
2. Vergleiche die Weiße Rose mit der Swing-Jugend.
3. Begründe, welche Form du für wirksamer hältst.
Arbeitet zu zweit und tauscht eure Ergebnisse aus. Zeit: 15 Minuten.
Hilfe: Satzanfänge findest du auf der Tippkarte.`;

test("leerer Text ergibt »leer«, ohne Fehler", () => {
  for (const e of [undefined, null, {}, { text: "" }, { text: "   " }]) assert.equal(M.pruefe(e).status, "leer");
});

test("zu kurzer Text wird nicht ausgewertet", () => {
  assert.equal(M.pruefe({ text: "Begründe deine Meinung." }).status, "zu-kurz");
});

test("Text ohne Signalwörter ergibt »ohne-treffer« mit Weiterentwicklung", () => {
  const r = M.pruefe({ text: "Das ist ein langer Text über das Wetter. ".repeat(6) });
  assert.equal(r.status, "ohne-treffer");
  assert.equal(r.staerke, null);
  assert.ok(r.weiter.length > 0 && r.weiter.length <= 3);
});

test("Merkmale werden mit Fundstelle erkannt", () => {
  const r = M.pruefe({ text: BLATT, typ: "arbeitsblatt" });
  assert.equal(r.status, "ok");
  const ids = r.abgedeckt.map((x) => x.id);
  for (const id of ["denken", "zusammen", "hilfen", "fach", "orientierung", "ablauf"]) assert.ok(ids.includes(id), id);
  const b = r.beobachtungen.find((x) => /Begründung/.test(x.was));
  assert.match(b.fundstellen[0], /Begründe/);
});

test("besondere Stärke nur bei mindestens zwei verschiedenen Merkmalen eines Bereichs", () => {
  const r = M.pruefe({ text: BLATT });
  assert.equal(r.staerke.id, "denken");
  assert.ok(r.staerke.merkmale.length >= 2);
  const s = M.pruefe({ text: "Arbeitet zu zweit an diesem Text. ".repeat(5) });
  assert.equal(s.staerke, null);
});

test("nur Wiedergabe führt zu einem Hinweis bei »Denken anregen«", () => {
  const r = M.pruefe({ text: "Nenne die drei Phasen. Beschreibe die erste Phase genau. Fasse den Text zusammen. Notiere die wichtigsten Begriffe aus dem Abschnitt in deinem Heft." });
  assert.equal(r.weiter[0].bereich.id, "denken");
  assert.match(r.weiter[0].text, /Wiedergabe/);
});

test("höchstens drei Entwicklungsschritte, Kernbereiche ohne Treffer", () => {
  const r = M.pruefe({ text: "Das ist ein Text ohne Aufgaben und ohne Hinweise für den Unterricht. ".repeat(4), typ: "html" });
  assert.ok(r.weiter.length <= 3);
  const kern = Q.materialtypen.find((t) => t.id === "html").kern;
  r.weiter.forEach((w) => assert.ok(kern.includes(w.bereich.id)));
});

test("Grenzen werden immer genannt; keine Zahl als Bewertung", () => {
  const r = M.pruefe({ text: BLATT });
  assert.ok(r.grenzen.some((g) => /keine KI/.test(g)));
  assert.ok(!JSON.stringify(r).includes("%"));
});

test("digitale Elemente werden erwähnt, nicht bewertet", () => {
  const r = M.pruefe({ text: BLATT + " Scanne den QR-Code und öffne das Video auf dem Tablet." });
  assert.ok(r.digital.length >= 1);
});

test("Daten: jeder Merkmalsbereich existiert im Qualitätsmodell und jedes Muster ist gültig", () => {
  const ids = new Set(Q.bereiche.map((b) => b.id));
  Object.entries(M.MERKMALE).forEach(([b, l]) => {
    assert.ok(ids.has(b), b);
    l.forEach((m) => assert.doesNotThrow(() => new RegExp(m.muster, "i")));
  });
});
