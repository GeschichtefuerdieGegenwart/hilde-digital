/* Unit-Tests für »Eine Quelle für alles« (ab Version 4.25): Kurzfassungen aus den Skills.  Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const K = require("../assets/daten/kurzfassungen.js");
const W = require("../assets/daten/werkstatt.js");
const D = require("../assets/daten/digitalisieren.js");
const Q = require("../assets/daten/qualitaet.js");
const T = require("../assets/daten/taxonomien.js");
const DP = require("../assets/digitalisieren-prompt.js");
const PP = require("../assets/pruef-prompt.js");

const ANBIETER = /ChatGPT|OpenAI|Claude|Anthropic|Gemini|Copilot|Mistral/i;

test("Plugin heißt kidu; jede Kurzfassung hat Fassung, Datum, Ort und Anforderungen", () => {
  assert.equal(K.plugin.name, "kidu");
  for (const [id, k] of Object.entries(K.skills)) {
    assert.match(k.fassung, /^v\d/, id);
    assert.match(k.datum, /^\d{2}\.\d{2}\.\d{4}$/, id);
    assert.ok(k.wo && k.anforderungen.length >= 5, id);
    assert.doesNotMatch(JSON.stringify(k), ANBIETER, id);
    assert.doesNotMatch(JSON.stringify(k), /%/, id);
  }
  assert.ok(K.gestaltung.anforderungen.length >= 5);
});

test("Bau-Skill: nur die Kurzfassung ist öffentlich, kein Download", () => {
  assert.equal(K.skills["lernseite-bauen"].herunterladen, false);
  assert.equal(K.skills["unterricht-digitalisieren"].herunterladen, true);
});

test("Aufträge zum Kopieren kommen aus den Skills, mit Fassung und Lizenz", () => {
  assert.equal(W.auftraege.length, 5);
  for (const a of W.auftraege) {
    const k = K.skills[a.quelle];
    assert.ok(k, a.id + ": Quelle fehlt");
    assert.equal(a.ziel, k.ziel); assert.deepEqual(a.anforderungen, k.anforderungen);
    assert.ok(a.name && a.kurz && a.format, a.id);
    assert.equal(a.stand.fassung, k.fassung);
  }
  const lizenz = W.auftraege.filter((a) => a.lizenz).map((a) => a.id).sort();
  assert.deepEqual(lizenz, ["erkunden", "faktencheck", "ki-grenzen"]);
});

test("Unterricht digitalisieren: Vorgehen aus dem Skill; bei »Lernseite« Bauregeln und Gestaltung", () => {
  const ohne = DP.baue({ vorhaben: "arbeitsblatt" }, D, Q, T);
  assert.match(ohne, /# Vorgehen\n- Fasse zuerst/);
  assert.doesNotMatch(ohne, /# Lernseite bauen/);
  const mit = DP.baue({ vorhaben: "arbeitsblatt", ausgabe: "lernseite" }, D, Q, T);
  assert.match(mit, /# Lernseite bauen/);
  assert.match(mit, /# So soll die Lernseite aussehen/);
  assert.ok(mit.includes(K.skills["lernseite-bauen"].format));
  assert.doesNotMatch(mit, ANBIETER);
  assert.doesNotMatch(mit, /%/);
});

test("Ohne Kurzfassungen bleiben die Prompts vollständig (nur ohne die neuen Teile)", () => {
  const leer = { plugin: {}, skills: {}, gestaltung: null };
  const t = DP.baue({ vorhaben: "arbeitsblatt", ausgabe: "lernseite" }, D, Q, T, leer);
  assert.doesNotMatch(t, /# Vorgehen|# Lernseite bauen/);
  assert.match(t, /eine einzige HTML-Datei/);
  assert.doesNotMatch(PP.baue({}, Q, leer), /# Typische Schwächen/);
});

test("Digital-Check: typische Schwächen aus dem Skill stehen vor der Form der Antwort", () => {
  const t = PP.baue({}, Q);
  const i = t.indexOf("# Typische Schwächen"), j = t.indexOf("# Form deiner Antwort");
  assert.ok(i > 0 && i < j);
  for (const w of K.skills["digital-check"].anforderungen) assert.ok(t.includes(w));
});
