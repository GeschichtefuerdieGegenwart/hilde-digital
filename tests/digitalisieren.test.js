/* Unit-Tests für den Prompt »Unterricht digitalisieren«.  Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const D = require("../assets/daten/digitalisieren.js");
const Q = require("../assets/daten/qualitaet.js");
const T = require("../assets/daten/taxonomien.js");
const P = require("../assets/digitalisieren-prompt.js");
const baue = (e) => P.baue(e, D, Q, T);

test("jedes Vorhaben verweist nur auf vorhandene Bereiche des Qualitätsmodells", () => {
  const ids = Q.bereiche.map((b) => b.id);
  for (const v of D.vorhaben) for (const b of v.bereiche) assert.ok(ids.includes(b), v.id + " → " + b);
});

test("Prompt enthält Leitfrage, Papiervergleich, passende Bereiche, Ablenkung und Regeln", () => {
  for (const v of D.vorhaben) {
    const t = baue({ vorhaben: v.id, fach: "Gemeinschaftskunde", thema: "Wahlen", gruppe: "BFS 1", materialien: ["arbeitsblatt"], phase: "erarbeitung" });
    assert.match(t, /Was kann das Tablet hier besser als Papier\?/, v.id);
    for (const a of Q.analogvergleich) assert.ok(t.includes(a.satz), v.id + " " + a.id);
    for (const id of v.bereiche) assert.ok(t.includes("## " + Q.bereiche.find((b) => b.id === id).name), v.id + " " + id);
    assert.match(t, /# Aufmerksamkeit und Ablenkung/);
    assert.match(t, /Analog oder hybrid/);
    assert.match(t, /Technik rettet keine schwache Aufgabe/);
    assert.match(t, /Unterrichtsphase: Erarbeitung/);
  }
});

test("Ideen: drei Varianten punktuell, phasenweise, durchgängig", () => {
  const t = baue({ vorhaben: "ideen", materialien: ["verlauf"] });
  assert.match(t, /punktuelle.*phasenweise.*durchgängige/s);
  assert.match(t, /Stundenverlaufsplan/);
});

test("Material und Ausgabe steuern Anhang und Antwortform", () => {
  const t = baue({ vorhaben: "arbeitsblatt", materialien: ["arbeitsblatt", "praesentation"], ausgabe: "plattform" });
  assert.match(t, /ein Arbeitsblatt und eine Präsentation anhängen/);
  assert.match(t, /Bauanleitung für unsere Lernplattform/);
  const ohne = baue({ vorhaben: "arbeitsblatt" });
  assert.match(ohne, /Hier deinen Unterricht kurz beschreiben/);
});

test("fehlende Angaben werden erfragt; unbekanntes Vorhaben ergibt nichts; keine Anbieter, keine Prozente", () => {
  assert.match(baue({ vorhaben: "lernstand", fach: "Psychologie" }), /Frage mich zuerst nach: Thema, Lerngruppe/);
  assert.equal(baue({ vorhaben: "nichts" }), "");
  const t = baue({ vorhaben: "differenzieren", umfang: "phasenweise" });
  assert.match(t, /Umfang: Phasenweise/);
  assert.doesNotMatch(t, /ChatGPT|OpenAI|Claude|Gemini|Copilot|%/);
});
