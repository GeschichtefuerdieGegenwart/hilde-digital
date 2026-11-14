#!/usr/bin/env python3
"""Fahrplan »Digitaler Unterricht« aus einer Quelle (ab Version 4.42).

Entscheidung Mario, 14.11.2026: Weg B der Recherche »Werkzeugseiten: Wo bin ich?« – oben eine Zeile, unten der ganze Fahrplan.
Quelle: src/fahrplan.json (vier Phasen, alle Werkzeuge). tools/bauen.py ersetzt damit diese Zeichen im Seiteninhalt:

  <!-- fahrplan:zeile -->         oben auf jeder Werkzeugseite: »Fahrplan Digitaler Unterricht › 2 · Digitalen Unterricht erstellen (vor der Stunde)«
  <!-- fahrplan:fuss -->          unten: »Auch vor der Stunde« (die anderen Werkzeuge der Phase) und »Der Fahrplan« mit »Du bist hier«
  <!-- fahrplan:liste:ID -->      auf der Bereichsseite: die Werkzeuge der Phase ID
  <!-- fahrplan:zahl:ID -->       auf der Bereichsseite: »n Werkzeuge« im Kopf der Phase

»weit« hinter zeile oder fuss (<!-- fahrplan:zeile weit -->) stellt beide in die weite Hülle (Screen-Width Rule).
Alles steht fertig im HTML – ohne Skript im Browser. tools/pruefen.py prüft, dass jede Werkzeugseite beide Zeichen trägt.
"""
import html
import json
import re
from pathlib import Path

WURZEL = Path(__file__).resolve().parent.parent
QUELLE = WURZEL / "src" / "fahrplan.json"
BEREICH = "unterricht.html"


def laden():
    return json.loads(QUELLE.read_text(encoding="utf-8"))


def e(text):
    return html.escape(text, quote=False)


def seite(href):
    """Datei ohne Sprungmarke: »tablet-phasen.html#t-karte« → »tablet-phasen.html«."""
    return href.split("#")[0]


def heimat(daten, datei):
    """Phase und Werkzeug einer Seite – auch für Unterseiten (selbstcheck.html gehört zum Digital-Check)."""
    for w in daten["werkzeuge"]:
        if seite(w["href"]) == datei and "#" not in w["href"]:
            return w, None
        if datei in w.get("unterseiten", []):
            return w, w
    return None, None


def phase(daten, pid):
    return next(p for p in daten["phasen"] if p["id"] == pid)


def anker(p):
    return f"phase-{p['id']}"


def werkzeug_eintrag(w, auf_bereichsseite):
    href = w["href"]
    text = w["text"]
    if auf_bereichsseite and href.startswith(BEREICH + "#"):
        href = href[len(BEREICH):]
    elif not auf_bereichsseite and w.get("text_anderswo"):
        text = w["text_anderswo"]
    fuer = f' <span class="fahrplan-fuer">{e(w["fuer"])}</span>' if w.get("fuer") else ""
    return f'<li><a href="{href}"><b>{e(w["name"])}</b>{fuer}<span class="fahrplan-text">{e(text)}</span></a></li>'


def liste(eintraege, auf_bereichsseite, einzug):
    zeilen = "".join(f"\n{einzug}  {werkzeug_eintrag(w, auf_bereichsseite)}" for w in eintraege)
    return f'<ul class="fahrplan-werkzeuge">{zeilen}\n{einzug}</ul>'


def gruppiert(eintraege, auf_bereichsseite, einzug, ebene):
    """Phase 4: Für dich · Im Kollegium · Zum Weitergeben (leere Gruppen fallen weg)."""
    gruppen = []
    for w in eintraege:
        if not gruppen or gruppen[-1][0] != w["gruppe"]:
            gruppen.append((w["gruppe"], w.get("gruppe_id"), []))
        gruppen[-1][2].append(w)
    teile = []
    for name, gid, ws in gruppen:
        kennung = f' id="{gid}"' if gid and auf_bereichsseite else ""
        teile.append(f'{einzug}<div class="fahrplan-gruppe">\n{einzug}  <{ebene}{kennung}>{e(name)}</{ebene}>\n'
                     f'{einzug}  {liste(ws, auf_bereichsseite, einzug + "  ")}\n{einzug}</div>')
    return "\n".join(teile)


# ---------------------------------------------------------------- Bereichsseite

def bereich_liste(daten, pid):
    ws = [w for w in daten["werkzeuge"] if w["phase"] == pid]
    einzug = "          "
    if any(w.get("gruppe") for w in ws):
        return gruppiert(ws, True, einzug, "h4").lstrip()
    tueren = [w for w in ws if w.get("tuer")]
    rest = [w for w in ws if not w.get("tuer")]
    teile = []
    if tueren:
        t = []
        for i, w in enumerate(tueren):
            if i:
                t.append(f'{einzug}  <li class="tueren-oder" aria-hidden="true">oder</li>')
            t.append(f'{einzug}  <li class="werkzeug tuer">\n{einzug}    <a href="{w["href"]}">\n'
                     f'{einzug}      <span class="werkzeug-text"><span class="tuer-ueber">{e(w["tuer"])}</span><b>{e(w["name"])}</b>{e(w["text"])}</span>\n'
                     f'{einzug}      <span class="werkzeug-los" aria-hidden="true">→</span>\n{einzug}    </a>\n{einzug}  </li>')
        teile.append('<ul class="werkzeuge tueren">\n' + "\n".join(t) + f"\n{einzug}</ul>")
        teile.append('<p class="fahrplan-dazu">Dazu, wenn du willst:</p>')
    teile.append(liste(rest, True, einzug))
    return f"\n{einzug}".join(teile)


def bereich_zahl(daten, pid):
    n = sum(1 for w in daten["werkzeuge"] if w["phase"] == pid)
    return f'<span class="fahrplan-zahl">{n} Werkzeug{"" if n == 1 else "e"}</span>'


# ---------------------------------------------------------------- Werkzeugseiten

def zeile(daten, datei, weit=False):
    w, eltern = heimat(daten, datei)
    if not w:
        raise SystemExit(f"fahrplan: {datei} trägt <!-- fahrplan:zeile -->, steht aber nicht in src/fahrplan.json")
    p = phase(daten, w["phase"])
    weg = ' class="ort-weg"' if eltern else ""  # am Telefon steht nur der letzte Schritt, mit »‹« davor
    teile = [f'<li class="ort-weg"><a href="{BEREICH}#fahrplan">Fahrplan Digitaler Unterricht</a></li>',
             f'<li{weg}><a href="{BEREICH}#{anker(p)}">{p["nr"]} · {e(p["name"])}</a> <span class="ort-wann">({e(p["wann"])})</span></li>']
    if eltern:
        teile.append(f'<li><a href="{eltern["href"]}">{e(eltern["name"])}</a></li>')
    huelle = "huelle huelle-weit" if weit else "huelle"
    return (f'<nav class="ort-zeile" aria-label="Wo du bist"><div class="{huelle}">'
            f'<ol>{"".join(teile)}</ol></div></nav>')


def fuss(daten, datei, weit=False):
    w, eltern = heimat(daten, datei)
    if not w:
        raise SystemExit(f"fahrplan: {datei} trägt <!-- fahrplan:fuss -->, steht aber nicht in src/fahrplan.json")
    p = phase(daten, w["phase"])
    eigen = seite(w["href"])
    nachbarn = [x for x in daten["werkzeuge"] if x["phase"] == p["id"] and seite(x["href"]) != eigen]
    if eltern:  # Unterseite: das Werkzeug selbst gehört zu »Auch …«, damit der Weg zurück unten steht
        nachbarn = [x for x in daten["werkzeuge"] if x["phase"] == p["id"] and seite(x["href"]) != datei]
    einzug = "    "
    auch = ""
    if nachbarn:
        if any(x.get("gruppe") for x in nachbarn):
            inhalt = (f'{einzug}<div class="fahrplan-fuss-gruppen">\n{gruppiert(nachbarn, False, einzug + "  ", "h3")}\n{einzug}</div>')
        else:
            inhalt = f"{einzug}{liste(nachbarn, False, einzug)}"
        auch = (f'\n  <div class="fahrplan-fuss-auch">\n    <h2 class="fahrplan-fuss-titel">{e(p["auch"])}</h2>\n'
                f'{inhalt}\n  </div>')
    zeilen = []
    for q in daten["phasen"]:
        klassen = []
        if q["nr"] == 1:
            klassen.append("ist-vorspann")
        if q["nr"] % 2 == 0:
            klassen.append("ist-zart")
        if q["nr"] == 2:
            klassen.append("ist-ring-start")
        elif q["nr"] == 3:
            klassen.append("ist-ring-mitte")
        elif q["nr"] == 4:
            klassen.append("ist-ring-ende")
        hier = q["id"] == p["id"]
        if hier:
            klassen.append("ist-hier")
        zusatz = ('<b class="fahrplan-klein-hier">Du bist hier</b>' if hier
                  else f'<span class="fahrplan-klein-wann">{e(q["wann"])}</span>')
        aktuell = ' aria-current="location"' if hier else ""
        zeilen.append(f'      <li class="{" ".join(klassen)}"><a href="{BEREICH}#{anker(q)}"{aktuell}>'
                      f'<span class="fahrplan-klein-nr" aria-hidden="true">{q["nr"]}</span>'
                      f'<span class="fahrplan-klein-platte"><span class="fahrplan-klein-name"><span class="sr-only">{q["nr"]} · </span>{e(q["name"])}</span>{zusatz}</span></a></li>')
    huelle = "huelle huelle-weit" if weit else "huelle"
    return (f'<nav class="fahrplan-fuss" aria-label="Fahrplan Digitaler Unterricht"><div class="{huelle} fahrplan-fuss-innen">{auch}\n'
            f'  <div class="fahrplan-fuss-plan">\n    <h2 class="fahrplan-fuss-titel">Der Fahrplan</h2>\n'
            f'    <ol class="fahrplan-klein">\n' + "\n".join(zeilen) + '\n    </ol>\n'
            f'    <p class="fahrplan-ring"><span class="fahrplan-ring-pfeil" aria-hidden="true">↑</span> '
            f'Nach der Stunde geht es mit der nächsten Stunde wieder bei 2 weiter.</p>\n'
            f'    <p class="fahrplan-fuss-alle"><a class="textlink" href="{BEREICH}#fahrplan">Alle Werkzeuge im Fahrplan <span aria-hidden="true">→</span></a></p>\n'
            f'  </div>\n</div></nav>')


ZEICHEN = re.compile(r"<!-- fahrplan:(zeile|fuss|liste|zahl)(?::([a-z]+))?( weit)? -->")


def einsetzen(inhalt, datei, daten=None):
    """Ersetzt alle Fahrplan-Zeichen im Seiteninhalt. Seiten ohne Zeichen bleiben, wie sie sind."""
    if "<!-- fahrplan:" not in inhalt:
        return inhalt
    daten = daten or laden()

    def ersetze(m):
        art, pid, weit = m.group(1), m.group(2), bool(m.group(3))
        if art == "zeile":
            return zeile(daten, datei, weit)
        if art == "fuss":
            return fuss(daten, datei, weit)
        if art == "liste":
            return bereich_liste(daten, pid)
        return bereich_zahl(daten, pid)

    neu = ZEICHEN.sub(ersetze, inhalt)
    rest = re.findall(r"<!-- fahrplan:[^>]*-->", neu)
    if rest:
        raise SystemExit(f"fahrplan: unbekanntes Zeichen in {datei}: {rest}")
    return neu


if __name__ == "__main__":
    d = laden()
    for w in d["werkzeuge"]:
        print(w["phase"], w["href"])
