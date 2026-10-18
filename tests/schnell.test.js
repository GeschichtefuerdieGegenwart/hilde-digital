/* Unit-Tests für die Schnell-Anfrage im KI-Training.  Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const S = require("../assets/daten/schnell.js");
const A = require("../assets/schnell-anfrage.js");
const K = require("../assets/daten/texte.js");

test("jede Schnell-Anfrage hat die fünf Teile aus »Prompten lernen« in derselben Reihenfolge", () => {
  const namen = K.bausteine.map((b) => "# " + b.name);
  for (const a of S.anlaesse) {
    const t = A.baue({ anlass: a.id, fach: "Kfz-Technik", thema: "Bremsanlage", gruppe: "1. Ausbildungsjahr" }, S);
    const orte = namen.map((n) => t.indexOf(n));
    assert.ok(orte.every((o) => o >= 0), a.id);
    assert.deepEqual(orte, [...orte].sort((x, y) => x - y), a.id);
  }
});

test("fehlende Angaben: die KI fragt zuerst danach", () => {
  const t = A.baue({ anlass: "exit", fach: "", thema: "Wahlen", gruppe: "" }, S);
  assert.match(t, /Frage mich zuerst nach: Fach, Lerngruppe/);
  assert.match(t, /Thema: Wahlen/);
});

test("Material nur, wo es gebraucht wird – immer mit Datenschutzhinweis", () => {
  for (const a of S.anlaesse) {
    const t = A.baue({ anlass: a.id }, S);
    assert.equal(t.includes("# Material"), !!a.material, a.id);
    assert.match(t, /personenbezogene/);
  }
});

test("keine erfundenen Quellen; unbekannter Anlass ergibt nichts; keine Anbieter", () => {
  const t = A.baue({ anlass: "quiz", fach: "Psychologie" }, S);
  assert.match(t, /keine erfundenen Quellen/);
  assert.equal(A.baue({ anlass: "gibt-es-nicht" }, S), "");
  assert.doesNotMatch(S.anlaesse.map((a) => JSON.stringify(a)).join(" "), /ChatGPT|OpenAI|Claude|Gemini|Copilot/i);
});

test("Eingaben werden gesäubert (Zeilenumbrüche, Leerzeichen)", () => {
  const t = A.baue({ anlass: "eltern", fach: "  Sozial-\n pädagogik  ", thema: "Ausflug", gruppe: "BFS 1" }, S);
  assert.match(t, /Fach: Sozial- pädagogik/);
});
