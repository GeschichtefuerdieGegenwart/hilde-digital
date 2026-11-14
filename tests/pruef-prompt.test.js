/* Unit-Tests für den Prüf-Prompt im Digital-Check (Weg B »Mit KI prüfen«).  Aufruf: node --test */
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const P = require("../assets/pruef-prompt.js");
const Q = require("../assets/daten/qualitaet.js");

test("enthält alle Bereiche des Qualitätsmodells mit Frage und Stufen", () => {
  const t = P.baue({}, Q);
  for (const b of Q.bereiche) {
    assert.ok(t.includes("## " + b.name + " (" + b.fachname + ")"), b.name);
    assert.ok(t.includes(b.frage), "Frage " + b.id);
    assert.ok(t.includes(b.a[b.a.length - 1]), "höchste Qualitätsstufe " + b.id);
    assert.ok(t.includes(b.b[2]), "höchster digitaler Beitrag " + b.id);
  }
});

test("stellt die Leitfrage Tablet oder Papier und nutzt die Analogskala", () => {
  const t = P.baue({}, Q);
  assert.ok(t.includes("besser als ein Arbeitsblatt auf Papier"));
  for (const a of Q.analogvergleich) assert.ok(t.includes(a.satz), a.id);
});

test("feste Gliederung: Stärke zuerst, Grenzen zuletzt, höchstens drei Weiterentwicklungen", () => {
  const t = P.baue({}, Q);
  const teile = ["1. Besondere Stärke", "2. Abgedeckte Bereiche", "3. Beobachtungen am Material", "4. Tablet oder Papier?", "5. Mögliche Weiterentwicklung", "6. Grenzen deiner Einschätzung"];
  const orte = teile.map((x) => t.indexOf(x));
  assert.ok(orte.every((o) => o > 0), "alle Teile vorhanden");
  assert.deepEqual(orte, [...orte].sort((a, b) => a - b));
  assert.match(t, /höchstens drei konkrete Schritte/);
});

test("Regeln: keine Noten und Prozente, Technik rettet keine schwache Aufgabe, nichts erfinden", () => {
  const t = P.baue({}, Q);
  assert.match(t, /Keine Noten, keine Punktsumme, keine Prozentwerte/);
  assert.ok(t.includes("Technik rettet keine schwache Aufgabe"));
  assert.ok(t.includes("höchstens »" + Q.stufenA[1] + "«") && t.includes("höchstens »" + Q.stufenB[1] + "«"));
  assert.match(t, /Motivation allein ist kein Lernmehrwert/);
  assert.match(t, /Analog oder hybrid passt besser/);
  assert.match(t, /Erfinde nichts/);
  assert.match(t, /personenbezogene Daten/);
  assert.doesNotMatch(t, /%/);
});

test("ohne Materialtyp: die KI bestimmt den Typ selbst, kein Bereich ist markiert", () => {
  const t = P.baue({}, Q);
  assert.match(t, /Bestimme zuerst den Materialtyp/);
  assert.doesNotMatch(t, /wichtig für diesen Materialtyp/);
});

test("mit Materialtyp: genau dessen Kernbereiche sind markiert", () => {
  for (const typ of Q.materialtypen) {
    const t = P.baue({ typ: typ.id }, Q);
    assert.ok(t.includes("Materialtyp: " + typ.name), typ.id);
    const markiert = (t.match(/\[wichtig für diesen Materialtyp\]/g) || []).length;
    assert.equal(markiert, typ.kern.length, typ.id);
  }
});

test("Arbeitsblatt: fehlender digitaler Beitrag ist kein Mangel", () => {
  assert.match(P.baue({ typ: "arbeitsblatt" }, Q), /kein Mangel/);
});

test("unbekannter Typ verhält sich wie ohne Typ", () => {
  assert.equal(P.baue({ typ: "gibt-es-nicht" }, Q), P.baue({}, Q));
});

test("nennt keine Anbieter und keine Verbindung, nur ein Platz für das Material", () => {
  const t = P.baue({}, Q);
  assert.doesNotMatch(t, /ChatGPT|OpenAI|Claude|Gemini|Copilot|Mistral/i);
  assert.ok(t.trim().endsWith("persönliche Daten.)"));
});

/* ab 4.18: Regeln aus den Erprobungen vom 8.11.2026 */
test("Prüf-Auftrag fragt nach Ruhe, Festlegung, Klickweg und Zwischenstand", () => {
  const t = P.baue({ typ: "html" }, Q);
  assert.ok(t.includes("Erst Ruhe, dann Bewegung"));
  assert.ok(t.includes("Erst denken, dann zeigen"));
  assert.ok(/drei Tipps/.test(t) && /Seitenwechsel/.test(t));
  assert.ok(/Zwischenstand/.test(t) && /außerhalb des Browsers/.test(t));
});

/* ab 4.38: Gestaltung ist ein eigener Prüfblock (Skill digital-check v1.4, Liste »Gestaltung« der Kurzfassung).
   Sie steht nach den typischen Schwächen und vor der Form der Antwort; unter »Regeln« steht keine Gestaltung mehr. */
test("Gestaltung ist ein eigener Block aus dem Skill, getrennt von den Regeln der Didaktik", () => {
  const K = require("../assets/daten/kurzfassungen.js");
  const g = K.skills["digital-check"].gestaltung;
  assert.ok(Array.isArray(g) && g.length >= 8, "Liste »Gestaltung« im Skill");
  const t = P.baue({ typ: "html" }, Q);
  const regeln = t.indexOf("# Regeln"), schwaechen = t.indexOf("# Typische Schwächen"),
    block = t.indexOf("# Gestaltung – ein eigener Prüfblock"), form = t.indexOf("# Form deiner Antwort");
  assert.ok(regeln > 0 && schwaechen > regeln && block > schwaechen && form > block, "Reihenfolge der Abschnitte");
  for (const x of g) assert.ok(t.indexOf(x) > block && t.indexOf(x) < form, "im Block: " + x.slice(0, 30));
  const teilRegeln = t.slice(regeln, t.indexOf("# Qualitätsmodell"));
  assert.doesNotMatch(teilRegeln, /Erst Ruhe, dann Bewegung|Zähle den Weg/, "keine Gestaltung unter »Regeln«");
  assert.match(teilRegeln, /Erst denken, dann zeigen/, "die Festlegung bleibt eine Regel der Didaktik");
  assert.match(t, /ändert keine Stufe/);
  assert.match(t, /3\. Beobachtungen am Material[^\n]*eigenen Absatz »Gestaltung«/);
});

test("ohne Liste »Gestaltung« entfällt der Block, die Gliederung bleibt", () => {
  const K = require("../assets/daten/kurzfassungen.js");
  const ohne = JSON.parse(JSON.stringify(K));
  delete ohne.skills["digital-check"].gestaltung;
  const t = P.baue({}, Q, ohne);
  assert.doesNotMatch(t, /# Gestaltung – ein eigener Prüfblock/);
  assert.doesNotMatch(t, /eigenen Absatz »Gestaltung«/);
  assert.match(t, /# Typische Schwächen/);
});

test("Material auf Papier: kein Gestaltungsblock", () => {
  const t = P.baue({ typ: "arbeitsblatt" }, Q);
  assert.doesNotMatch(t, /# Gestaltung – ein eigener Prüfblock/);
  assert.match(t, /kein Mangel/);
});
