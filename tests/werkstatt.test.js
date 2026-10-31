/* Unit-Tests für die Werkstatt-Seiten (Unterrichtsmuster, Aufträge, KI für dein Fach).  Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const W = require("../assets/daten/werkstatt.js");
const A = require("../assets/werkstatt-anfrage.js");
const S = require("../assets/daten/schnell.js");
const K = require("../assets/daten/texte.js");
const T = require("../assets/daten/taxonomien.js");
const B = require("../assets/daten/beispiele.js");

const defs = W.muster.map((m) => Object.assign({ id: m.id }, m.ki)).concat(W.auftraege);

test("jeder Auftrag hat die fünf Teile aus »Prompten lernen« in derselben Reihenfolge", () => {
  const namen = K.bausteine.map((b) => "# " + b.name);
  for (const d of defs) {
    const t = A.auftrag(d, { fach: "Pflege", thema: "Sturzprophylaxe", gruppe: "2. Ausbildungsjahr" }, S);
    const orte = namen.map((n) => t.indexOf(n));
    assert.ok(orte.every((o) => o >= 0), d.id);
    assert.deepEqual(orte, [...orte].sort((x, y) => x - y), d.id);
    assert.ok(t.includes("Fach: Pflege"), d.id);
  }
});

test("fehlende Angaben: die KI fragt zuerst danach", () => {
  const t = A.auftrag(defs[0], { fach: "", thema: "", gruppe: "" }, S);
  assert.match(t, /Frage mich zuerst nach: Fach, Thema, Lerngruppe/);
});

test("Muster: erlaubte Phase und Einsatzangabe, drei Wege, IDs eindeutig", () => {
  const phasen = new Set(T.phasen.map((p) => p.id));
  const ids = new Set();
  for (const m of W.muster) {
    assert.ok(!ids.has(m.id), "doppelt: " + m.id); ids.add(m.id);
    assert.ok(phasen.has(m.phase), m.id + ": Phase " + m.phase);
    assert.ok(["eingesetzt", "geplant", "offen"].includes(m.einsatz), m.id + ": Einsatz");
    assert.ok(m.papier && m.tablet && m.tablet.text && m.ki && m.ki.ziel, m.id + ": drei Wege");
  }
});

test("Muster: Tablet-Wege verweisen nur auf vorhandene, erprobte Galerie-Beispiele", () => {
  for (const m of W.muster) {
    for (const id of m.tablet.beispiele) {
      const b = B.find((x) => x.id === id);
      assert.ok(b, m.id + ": Beispiel fehlt " + id);
      assert.equal(b.status, "im Unterricht erprobt", m.id + ": " + id);
    }
    if (!m.tablet.beispiele.length) assert.match(m.tablet.text, /noch offen/, m.id + ": ohne Beispiel ehrlich »noch offen«");
  }
});

test("keine Namen von KI-Anbietern in den Werkstatt-Texten", () => {
  const text = JSON.stringify(W);
  for (const name of ["ChatGPT", "OpenAI", "Claude", "Anthropic", "Gemini", "Copilot", "Mistral", "telli", "fobizz"]) {
    assert.ok(!text.includes(name), name);
  }
});

test("Fach-Anweisung: Fach, Maßstäbe, alle festen Regeln und die Anrede", () => {
  const t = A.fach({ fach: "Pflege", gruppe: "1. Jahr", massstaebe: "- Pflegeprozess als roter Faden\nFachsprache nach Lehrplan", anrede: "Sie" }, W);
  assert.match(t, /Ich unterrichte Pflege – 1\. Jahr\./);
  assert.match(t, /- Pflegeprozess als roter Faden\n- Fachsprache nach Lehrplan/);
  for (const r of W.fachRegeln) assert.ok(t.includes(r), r.slice(0, 30));
  assert.match(t, /Anrede »Sie«/);
});

test("Fach-Anweisung ohne Maßstäbe: die KI fragt zuerst", () => {
  const t = A.fach({ fach: "", massstaebe: "" }, W);
  assert.match(t, /\[Fach\]/);
  assert.match(t, /Frag mich zuerst, was in meinem Fach eine gute Aufgabe ausmacht/);
  assert.match(t, /Anrede »du«/);
});
