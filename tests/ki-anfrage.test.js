/* Unit-Tests für den Anfrage-Baukasten im KI-Weg.  Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const A = require("../assets/ki-anfrage.js");
const K = require("../assets/daten/texte.js");

test("jedes Ziel hat passende Ergebnisformen", () => {
  for (const z of K.ziele) assert.ok(A.formenFuer(z.id).length >= 2, z.id);
});

test("die Anfrage hat alle fünf Bausteine in fester Reihenfolge", () => {
  const t = A.alsText(A.bausteine({ ziel: "erstellen", form: "arbeitsblatt", kontext: { fach: "Kfz-Technik", thema: "Bremsanlage" } }));
  const pos = ["Ziel:", "Kontext:", "Anforderungen:", "Format:", "Prüfkriterien:"].map((x) => t.indexOf(x));
  assert.ok(pos.every((p) => p > -1));
  assert.deepEqual([...pos].sort((a, b) => a - b), pos);
  assert.match(t, /Fach oder Lernbereich: Kfz-Technik/);
  assert.match(t, /ausgedruckt/); // KI kann zu analogem Material führen
});

test("fehlen Fach oder Thema, fragt die KI nach", () => {
  const b = A.bausteine({ ziel: "ideen", form: "ideensammlung", kontext: {} });
  assert.match(b.kontext, /Frage mich zuerst nach Fach und Thema/);
});

test("leere Eingaben stürzen nicht ab", () => {
  for (const a of [undefined, null, {}, { ziel: "gibt-es-nicht" }]) {
    const t = A.alsText(A.bausteine(a));
    assert.ok(t.includes("Ziel:"));
  }
});

test("Leerzeichen werden bereinigt, leere Bausteine weggelassen", () => {
  const b = A.bausteine({ ziel: "planen", form: "stundenstruktur", kontext: { fach: "  Geschichte   ", thema: "Weimar" } });
  assert.match(b.kontext, /Fach oder Lernbereich: Geschichte\n/);
  b.format = "   ";
  assert.ok(!A.alsText(b).includes("Format:"));
});

test("die Anfrage nennt keine KI-Anbieter und erfindet keine Quellen", () => {
  const t = A.alsText(A.bausteine({ ziel: "erstellen", form: "arbeitsblatt", kontext: {} }));
  assert.match(t, /Erfinde keine Quellen/);
  assert.ok(!/chatgpt|openai|gemini|copilot|claude|mistral|fobizz|telli/i.test(JSON.stringify(K)));
});

test("Prüfliste: allgemein plus ein Punkt je Ziel, »Was muss ich anpassen?« am Ende", () => {
  const l = A.pruefliste("rueckmeldung");
  assert.equal(l.length, K.pruefliste.length + 1);
  assert.match(l[l.length - 1], /anpassen/);
  assert.ok(l.some((x) => /fair/.test(x)));
});
