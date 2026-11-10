#!/usr/bin/env python3
"""Eine Quelle für alles (ab Version 4.25): baut aus den Skills die Aufträge der Website und die Downloads der Werkzeugkiste.

Aufruf:  python3 tools/werkzeugkiste.py          (schreibt alles neu; tools/bauen.py ruft das selbst auf)
         python3 tools/werkzeugkiste.py --pruefen (meldet nur, ob etwas veraltet ist; nutzt tools/pruefen.py)

Quelle (nur hier wird gepflegt):
- werkzeugkiste/kidu/                      das Plugin »kidu« für das Kollegium (Skills mit Abschnitt »Kurzfassung für Kidu«)
- werkzeugkiste/kurzfassungen/*.md         Kurzfassungen aus Skills, die nicht veröffentlicht werden (Bau-Plugin »kidu-bau«)
- DESIGN.md, Abschnitt »Kurzfassung für Kidu«  die Gestaltungsregeln für Lernseiten

Ergebnis:
- assets/daten/kurzfassungen.js            KURZFASSUNGEN – gelesen von Unterricht digitalisieren, Digital-Check und den Aufträgen
- werkzeugkiste/download/kidu.zip          das Plugin zum Hochladen
- werkzeugkiste/download/skills/<name>.zip je Skill ein Ordner mit SKILL.md (und references/)
- werkzeugkiste/download/kidu-gestaltung.zip  DESIGN.md mit Lizenz
- docs/pruef-auftrag.md und werkzeugkiste/kidu/skills/digital-check/references/pruef-auftrag-weg-b.md
                                           der Prüf-Auftrag, wie assets/pruef-prompt.js ihn baut (vorher von Hand, lief auseinander)

Die Zip-Dateien werden mit festem Zeitstempel gebaut: Gleicher Inhalt ergibt dieselben Bytes.
Format einer Kurzfassung im Skill:

    ## Kurzfassung für Kidu
    (ein Absatz Erklärung)
    - **Name:** …   - **Kurz:** …   - **Ziel:** …   - **Format:** …   (alle freiwillig)
    **Anforderungen**
    - …
    **Prüfen**   (freiwillig)
    - …
"""
import io
import json
import re
import sys
import zipfile
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
KISTE = WURZEL / "werkzeugkiste"
PLUGIN = KISTE / "kidu"
DOWNLOAD = KISTE / "download"
DATEN = WURZEL / "assets" / "daten" / "kurzfassungen.js"
ZEIT = (2026, 11, 10, 0, 0, 0)  # fester Zeitstempel in den Zip-Dateien


def abschnitt(text, titel):
    m = re.search(r"^## " + re.escape(titel) + r"[^\n]*\n([\s\S]*?)(?=^## |\Z)", text, re.M)
    return m.group(1) if m else None


def lies_kurzfassung(teil):
    if teil is None:
        return None
    k = {"anforderungen": [], "pruef": []}
    for feld, schluessel in (("Name", "name"), ("Kurz", "kurz"), ("Ziel", "ziel"), ("Format", "format"), ("Stand", "stand")):
        m = re.search(r"^- \*\*" + feld + r":\*\* (.+)$", teil, re.M)
        if m:
            k[schluessel] = m.group(1).strip()
    for marke, schluessel in (("Anforderungen", "anforderungen"), ("Prüfen", "pruef")):
        m = re.search(r"^\*\*" + marke + r"\*\*\n([\s\S]*?)(?=^\*\*|\Z)", teil, re.M)
        if m:
            k[schluessel] = [z[2:].strip() for z in m.group(1).splitlines() if z.startswith("- ")]
    m = re.search(r"\(Werkzeug: ([^)]+)\)", teil)
    if m:
        k["wo"] = m.group(1).strip()
    return k


def fassung(text):
    m = re.search(r"^- \*\*(v[\d.]+), (\d{2}\.\d{2}\.\d{4}):\*\*", text, re.M)
    return (m.group(1), m.group(2)) if m else ("", "")


def sammle():
    plugin = json.loads((PLUGIN / ".claude-plugin" / "plugin.json").read_text(encoding="utf-8"))
    skills = {}
    for datei in sorted((PLUGIN / "skills").glob("*/SKILL.md")):
        text = datei.read_text(encoding="utf-8")
        k = lies_kurzfassung(abschnitt(text, "Kurzfassung für Kidu"))
        name = datei.parent.name
        if not k:
            continue
        k["fassung"], k["datum"] = fassung(text)
        k["lizenz"] = "Education Agent Skills Library" in text
        k["herunterladen"] = True
        skills[name] = k
    for datei in sorted((KISTE / "kurzfassungen").glob("*.md")):
        text = datei.read_text(encoding="utf-8")
        k = lies_kurzfassung(abschnitt(text, "Kurzfassung für Kidu"))
        m = re.search(r"Stand: (v[\d.]+), (\d{2}\.\d{2}\.\d{4})", text)
        k["fassung"], k["datum"] = (m.group(1), m.group(2)) if m else ("", "")
        k["lizenz"] = False
        k["herunterladen"] = False  # Skill bleibt privat, nur die Kurzfassung ist öffentlich
        skills[datei.stem] = k
    design = lies_kurzfassung(abschnitt((WURZEL / "DESIGN.md").read_text(encoding="utf-8"), "Kurzfassung für Kidu"))
    return {"plugin": {"name": plugin["name"], "version": plugin["version"]}, "skills": skills, "gestaltung": design}


def daten_text(d):
    kopf = ("/* Kidu – Kurzfassungen der Skills (ab Version 4.25). NICHT VON HAND ÄNDERN.\n"
            "   Erzeugt von tools/werkzeugkiste.py aus den SKILL.md in werkzeugkiste/kidu/skills, den Dateien in werkzeugkiste/kurzfassungen\n"
            "   und DESIGN.md (je Abschnitt »Kurzfassung für Kidu«). Gepflegt wird nur dort.\n"
            "   Genutzt von: assets/digitalisieren-prompt.js, assets/pruef-prompt.js, assets/daten/werkstatt.js, assets/werkzeugkiste.js. */\n")
    return (kopf + "var KURZFASSUNGEN = " + json.dumps(d, ensure_ascii=False, indent=2) + ";\n"
            "if (typeof module !== \"undefined\") module.exports = KURZFASSUNGEN;\n")


def zip_bytes(dateien):
    """dateien: Liste (Name im Zip, Bytes). Feste Reihenfolge und fester Zeitstempel."""
    puffer = io.BytesIO()
    with zipfile.ZipFile(puffer, "w", zipfile.ZIP_DEFLATED) as z:
        for name, inhalt in sorted(dateien):
            info = zipfile.ZipInfo(name, ZEIT)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            z.writestr(info, inhalt)
    return puffer.getvalue()


def ordner(pfad, praefix=""):
    return [(praefix + p.relative_to(pfad).as_posix(), p.read_bytes()) for p in sorted(pfad.rglob("*")) if p.is_file()]


def lizenzen():
    return [("LICENSE-TEXTE.md", (WURZEL / "LICENSE-TEXTE.md").read_bytes()), ("LIZENZ.md", (PLUGIN / "LIZENZ.md").read_bytes())]


def downloads():
    ziele = {DOWNLOAD / "kidu.zip": zip_bytes(ordner(PLUGIN) + [("LICENSE-TEXTE.md", (WURZEL / "LICENSE-TEXTE.md").read_bytes())])}
    for s in sorted((PLUGIN / "skills").iterdir()):
        if (s / "SKILL.md").exists():
            ziele[DOWNLOAD / "skills" / (s.name + ".zip")] = zip_bytes(ordner(s, s.name + "/") + [(s.name + "/" + n, b) for n, b in lizenzen()])
    ziele[DOWNLOAD / "kidu-gestaltung.zip"] = zip_bytes([("DESIGN.md", (WURZEL / "DESIGN.md").read_bytes()),
                                                         ("LICENSE-TEXTE.md", (WURZEL / "LICENSE-TEXTE.md").read_bytes())])
    return ziele


PRUEF_KOPF = ("# Digital-Check, Weg B: der Prüf-Auftrag\n\n"
              "So steht der Auftrag auf der Seite, wenn kein Materialtyp gewählt ist. Er wird aus `assets/daten/qualitaet.js` "
              "und der Kurzfassung des Skills `digital-check` erzeugt (`assets/pruef-prompt.js`). Diese Datei ist nur zum Lesen; "
              "`tools/werkzeugkiste.py` schreibt sie bei jedem Bauen neu.\n\n```text\n")


def pruef_auftrag(daten):
    import shutil, subprocess, tempfile
    node = shutil.which("node")
    if not node:
        return None
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as t:
        t.write(daten)
    skript = ("const Q=require(process.argv[1]);const K=require(process.argv[2]);const P=require(process.argv[3]);"
              "process.stdout.write(P.baue({},Q,K))")
    aus = subprocess.run([node, "-e", skript, str(WURZEL / "assets/daten/qualitaet.js"), t.name, str(WURZEL / "assets/pruef-prompt.js")],
                         capture_output=True, text=True, check=True)
    Path(t.name).unlink()
    return PRUEF_KOPF + aus.stdout + "\n```\n"


def texte():
    d = daten_text(sammle())
    ziele = {DATEN: d.encode("utf-8")}
    p = pruef_auftrag(d)
    if p is not None:
        ziele[WURZEL / "docs" / "pruef-auftrag.md"] = p.encode("utf-8")
        ziele[PLUGIN / "skills" / "digital-check" / "references" / "pruef-auftrag-weg-b.md"] = p.encode("utf-8")
    return ziele


def alles():
    ziele = texte()
    ziele.update(downloads())
    return ziele


def veraltet():
    """Liste der Dateien, die nicht zur Quelle passen (für tools/pruefen.py)."""
    fehler = []
    ziele = alles()
    for pfad, inhalt in ziele.items():
        if not pfad.exists() or pfad.read_bytes() != inhalt:
            fehler.append(f"{pfad.relative_to(WURZEL).as_posix()}: veraltet – python3 tools/werkzeugkiste.py ausführen")
    for alt in sorted((DOWNLOAD / "skills").glob("*.zip")) if (DOWNLOAD / "skills").exists() else []:
        if alt not in ziele:
            fehler.append(f"{alt.relative_to(WURZEL).as_posix()}: gehört zu keinem Skill mehr")
    return fehler


def main():
    if "--pruefen" in sys.argv:
        f = veraltet()
        print("\n".join(f) or "Werkzeugkiste: alles aktuell")
        sys.exit(1 if f else 0)
    for teil in (texte, downloads):  # erst die Texte, dann die Zip-Dateien, die sie enthalten
        ziele = teil()
        if teil is downloads and (DOWNLOAD / "skills").exists():
            for alt in (DOWNLOAD / "skills").glob("*.zip"):
                if alt not in ziele:
                    alt.unlink()
        for pfad, inhalt in ziele.items():
            pfad.parent.mkdir(parents=True, exist_ok=True)
            if not pfad.exists() or pfad.read_bytes() != inhalt:
                pfad.write_bytes(inhalt)
                print("geschrieben:", pfad.relative_to(WURZEL).as_posix())
    d = sammle()
    print(f"Werkzeugkiste: Plugin {d['plugin']['name']} {d['plugin']['version']}, {len(d['skills'])} Kurzfassungen")


if __name__ == "__main__":
    main()
