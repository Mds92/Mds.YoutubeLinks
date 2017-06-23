var l,
    q = "undefined" == typeof browser,
    r = 0 < navigator.userAgent.indexOf("Edge/"),
    v = 0 < navigator.userAgent.indexOf("Firefox/");
r && (browser.app = chrome.app, chrome = browser);
var aa = v ? 69 : r ? 77 : 66,
    ba = v ? 220 : 150,
    w = [atob("MTI3LjAuMC4xOjEwMDE="), atob("MC4xLjAuMToxMDAx")],
    ca = atob("cGx1Z2luLnYzLmludGVybmV0ZG93bmxvYWRtYW5hZ2VyLmNvbQ=="),
    da = atob("djYuMjZiMTQ="),
    ea = atob("djYuMjg="),
    fa = atob("amVhb2hobGFqZWpvZGZqYWRjcG9ucG5qZ2tpaWtvY24="),
    ga = atob("YWZtZHBtZGRpb2twZGtuYWVvZmRubGNsYnBnZWhoY2U="),
    ha = atob("Q2hyb21lX1JlbmRlcldpZGdldEhvc3RIV05E"),
    ia = ["main_frame", "sub_frame"],
    y = "main_frame sub_frame image object xmlhttprequest other".split(" "),
    z = ["object", "xmlhttprequest", "other"],
    ja = [301, 302, 303, 307],
    A = ["http://*/*", "https://*/*"],
    ka = /\.([^.\\/]*?)(?:\.[0-9.]+)?$/,
    la = /(?:chrome|about|chrome-extension|ms-browser-extension|moz-extension):/,
    ma = [atob("KjovLyouaW50ZXJuZXRkb3dubG9hZG1hbmFnZXIuY29tL2F1dG9yZWcuaHRtbD8q"), atob("KjovLyouaW50ZXJuZXRkb3dubG9hZG1hbmFnZXIuY29tL2ZpbGxyZWdmb3JtLmh0bWw/Kg==")],
    na = new RegExp(atob("Xig/Omh0dHB8aHR0cHMpOi8vKD86d3d3XC55b3V0dWJlXC5jb20vKD86d2F0Y2hcP3xlbWJlZC8pfHd3d1wuZmFjZWJvb2tcLmNvbS8uKy8oPzp2aWRlb3N8cG9zdHMpLyg/OnZiXC5cZCsvKT9cZCtcYnxwbGF5ZXJcLnZpbWVvXC5jb20vdmlkZW8vXGQrKQ=="), "i"),
    oa = new RegExp(atob("Xig/Oltcd1wtXStcLikqPyg/OnlvdXR1YmVcLmNvbXxnb29nbGV2aWRlb1wuY29tfHlvdXR1YmVcLmdvb2dsZWFwaXNcLmNvbXxkb2NzXC5nb29nbGVcLmNvbSkk"), "i"),
    pa = atob("L3ZpZGVvcGxheWJhY2s="),
    qa = atob("L2dldF92aWRlb19pbmZv"),
    ra = atob("L2FwaV92aWRlb19pbmZv"),
    ta = atob("L2FwaS90aW1lZHRleHQ="),
    ua = atob("L2FwaS9tYW5pZmVzdC9kYXNo"),
    va = new RegExp(atob("Xig/Oltcd1wtXStcLikqPyg/OnZpbWVvXC5jb218dmltZW9jZG5cLmNvbSkk"), "i"),
    wa = atob("cGxheWVyLnZpbWVvLmNvbQ=="),
    xa = atob("L3ZpZGVvLw=="),
    ya = new RegExp(atob("Xig/Oltcd1wtXStcLikqP2ZiY2RuXC5uZXQk"), "i"),
    za = { 16: 1, 17: 2, 18: 4, 45: 8, 46: 16 },
    Aa = { http: 1, https: 129, ftp: 2, ftps: 130, rtmp: 3, rtmpt: 3, rtmpe: 3, mms: 4, idmreg: 159 },
    Ba = {
        "text/html": "HTML|HTM", "text/css": "CSS", "text/javascript": "JS|JSON", "text/mspg-legacyinfo": "MSI|MSP", "text/plain": "TXT|SRT", "text/srt": "SRT", "text/vtt": "VTT|SRT", "text/xml": "XML|F4M|TTML", "text/x-javascript": "JS|JSON", "text/x-json": "JSON", "application/f4m+xml": "F4M", "application/gzip": "GZ", "application/javascript": "JS", "application/json": "JSON", "application/msword": "DOC|DOCX|DOT|DOTX",
        "application/pdf": "PDF", "application/ttaf+xml": "DFXP", "application/vnd.apple.mpegurl": "M3U8", "application/zip": "ZIP", "application/x-7z-compressed": "7Z", "application/x-aim": "PLJ", "application/x-compress": "Z", "application/x-compress-7z": "7Z", "application/x-compressed": "ARJ", "application/x-gtar": "TAR", "application/x-gzip": "GZ", "application/x-gzip-compressed": "GZ", "application/x-javascript": "JS", "application/x-mpegurl": "M3U8", "application/x-msdos-program": "EXE|DLL", "application/x-msi": "MSI", "application/x-msp": "MSP",
        "application/x-ole-storage": "MSI|MSP", "application/x-rar": "RAR", "application/x-rar-compressed": "RAR", "application/x-sdlc": "EXE|SDLC", "application/x-shockwave-flash": "SWF", "application/x-silverlight-app": "XAP", "application/x-subrip": "SRT", "application/x-tar": "TAR", "application/x-zip": "ZIP", "application/x-zip-compressed": "ZIP", "video/3gpp": "3GP|3GPP", "video/3gpp2": "3GP|3GPP", "video/avi": "AVI", "video/f4f": "F4F", "video/f4m": "F4M", "video/flv": "FLV", "video/mp2t": "TS|M3U8", "video/mp4": "MP4|M4V", "video/mpeg": "MPG|MPEG",
        "video/mpg4": "MP4|M4V", "video/msvideo": "AVI", "video/quicktime": "MOV|QT", "video/webm": "WEBM", "video/x-flash-video": "FLV", "video/x-flv": "FLV", "video/x-mp4": "MP4|M4V", "video/x-mpg4": "MP4|M4V", "video/x-ms-asf": "ASF", "video/x-ms-wmv": "WMV", "video/x-msvideo": "AVI", "audio/3gpp": "3GP|3GPP", "audio/3gpp2": "3GP|3GPP", "audio/mp3": "MP3", "audio/mp4": "M4A|MP4", "audio/mp4a-latm": "M4A|MP4", "audio/mpeg": "MP3", "audio/mpeg4-generic": "M4A|MP4", "audio/mpegurl": "M3U|M3U8", "audio/webm": "WEBM", "audio/wav": "WAV", "audio/x-mpeg": "MP3",
        "audio/x-ms-wma": "WMA", "audio/x-wav": "WAV", "ilm/tm": "MP3", "image/gif": "GIF|GFA", "image/icon": "ICO|CUR", "image/jpg": "JPG|JPEG", "image/jpeg": "JPG|JPEG", "image/png": "PNG|APNG", "image/tiff": "TIF|TIFF", "image/vnd.microsoft.icon": "ICO|CUR", "image/webp": "WEBP", "image/x-icon": "ICO|CUR", "flv-application/octet-stream": "FLV"
    };
function B() {
    this.b = this.constructor.prototype.f++
}
B.prototype.f = 1;
function Ca(a, b, c, d) {
    this.id = a;
    this.port = b;
    c && (this.b = c.toLowerCase());
    d && (this.url = d)
}
Ca.prototype.a = 0;
function Da(a, b, c) {
    this.id = [a, b].toString();
    this.b = 0 > c ? null : [a, c].toString()
}
function E(a, b, c, d, e, f) {
    if (a) {
        var h = ["MSG#", a, "#", b, "#", c, "#", d];
        this.g = a;
        this.f = b;
        this.h = c;
        this.i = d;
        this.a = e || [];
        this.j = h;
        if (e) for (a = 0; a < e.length; a++)
            h.push(":", e[a] || 0);
        if (f)
            for (var g in f)
                if (e = f[g], null != e)
                    if (h.push(",", g, "="), "string" == typeof e) {
                        b = a = e.length;
                        for (c = 0; c < b;)
                            d = e.charCodeAt(c++), 128 <= d && (2048 <= d ? (a += 2, d - 55296 & 56320 || c++) : a++); h.push(a, ":", e)
                    } else e instanceof Blob ? h.push(e.size, ":", e) : h.push(e)
    } else this.c = new FileReader
}
function Ea(a) { a.S || (a.j.push(";"), a.S = !0); return new Blob(a.j) } function Fa(a, b, c) { a.S ? a.v(a) : (b.a = c || 0, b.b = 0, a.c.onload = a.Ja.bind(a, b), F(a, b, 0, 50)) } l = E.prototype;
l.Ja = function (a) {
    for (var b = this.c.result; ;)switch (a.b) {
        case 0:
            var c = b.split(",", 2), d = c.shift().split(":", 2), e = d.shift();
            if (!d.length) {
                if (!c.length) return this.v(this); a.b = 1
            } var f = e.length + 1, d = e.split("#", 6); if (5 != d.length || "MSG" != d[0]) return this.v(this); this.g = parseInt(d[1]); this.f = parseInt(d[2]); this.h = parseInt(d[3]); this.i = parseInt(d[4]); b = b.slice(f); a.a += f; a.b++; break; case 1: d = b.split(",", 2); e = d.shift(); if (!d.length) { d = b.split(";", 2); if (2 > d.length) return F(this, a, b.length, 100); a.b = 4 } f = e.length +
                1; this.a = d = e.split(":"); for (e = 0; e < d.length; e++)c = d[e], d[e] = c.includes(".") ? parseFloat(c) : parseInt(c); b = b.slice(f); a.a += f; a.b++; break; case 2: c = b.split(",", 2); 2 > c.length && (c = b.split(";", 2)); var d = c.shift().split(":", 2), h = d.shift(), f = h.length, e = !1; if (d.length) f++; else { if (!c.length) return F(this, a, b.length, 25); e = !0 } d = h.split("=", 3); if (2 != d.length) return this.v(this); c = parseInt(d[0]); d = parseInt(d[1]); a.a += f; a.b++; if (e) { this[c] = d; b = b.slice(f); a.b++; break } a.f = c; a.c = d; b = a.c; f = a.a; a = a.slice(f, f + b); a.size ==
                    b ? this.c.readAsText(a) : this.v(this); return; case 3: return this[a.f] = b, a.a += a.c, a.b++ , F(this, a, 0, 21); case 4: switch (b[0]) { case ",": a.b = 2; b = b.slice(1); break; case ";": a.b++; break; default: return this.v(this) }a.a++; break; case 5: this.S = !0; this.N(this); a.size > a.a && (b = new E, b.N = this.N, b.v = this.v, Fa(b, a, a.a)); return
    }
};
function F(a, b, c, d) { var e = b.a; c = e + c; b.size > c ? a.c.readAsBinaryString(b.slice(e, c + d)) : a.v(a) } l.l = null; l.N = null; l.v = null; l.S = !1;
function G() {
    var a = this.constructor.prototype, b; for (b in a) b.startsWith("_") || "constructor" == b || (this[b] = a[b].bind(this)); b = navigator.userAgent; a = b.match(/\b(?!(?:Safari|Chrome|Gecko)\/)\w+\/(\d+)(?:.(\d+))?(?:.(\d+))?(?:.(\d+))?\b(?!.*[()])/); if (b = v ? a : b.match(/\bChrome\/(\d+)\.(\d+)\.(\d+)\.(\d+)\b/)) {
        this.U = b[1] << 24 | b[2] << 22 | b[3] << 8 | b[4]; this.qa = b[0]; this.la = a ? a[0] : b[0]; this.oa = []; this.J = !1; this.c = {}; this.u = {}; this.a = {}; this.j = {}; this.b = {}; this.i = {}; this.f = {}; this.g = {}; this.w = {}; this.W = ""; this.X =
            !0; this.Ga = this.pa = this.Fa = 1; this.M = {}; this.h = null; this.T = 1; this.m = !1; this.G = this.K = 0; this.na = null; this.V = this.B = !1; chrome.windows.onCreated.addListener(this.ya); chrome.windows.onRemoved.addListener(this.za); chrome.windows.onFocusChanged.addListener(this.Wa); chrome.tabs.onActivated.addListener(this.Qa); chrome.tabs.onUpdated.addListener(this.Sa); chrome.tabs.onAttached && chrome.tabs.onAttached.addListener(this.Ra); a = chrome.runtime.getBrowserInfo; b = chrome.webRequest.ResourceType; a && a(this.Xa); b && b.MEDIA &&
                y.push("media") && z.push("media"); v && y.push("object_subrequest") && z.push("object_subrequest"); try { chrome.windows.getAll({ windowTypes: ["normal", "popup"] }, this.va) } catch (c) { chrome.windows.getAll(this.va) } this.Z(); Ga(this, !0)
    }
} l = G.prototype; l.Xa = function (a) { var b = a.version.split(/\D+/); this.U = b[0] << 24 | b[1] << 22 | b[2] << 8 | b[3]; this.qa = this.la = a.name + "/" + a.version };
function Ga(a, b) { var c = a.c, d = a.M = {}; chrome.contextMenus.removeAll(); for (var e = 0; e < Ha.length; e++) { var f = Ha[e]; if (b || !v || c[f[0]]) d[e] = chrome.contextMenus.create({ title: chrome.i18n.getMessage(f[1]), contexts: f[2].split(","), onclick: f[3].bind(a), enabled: !0 }) } } function Ia(a, b, c, d, e) { a = a.f; return b in a ? a[b] : a[b] = new Ca(b, c, d, e) } function H(a, b) { var c = a.g, d = b.requestId; c[d] = b; var e = b.id; e || (e = b.id = r ? a.Ga++ : d); e != d && (c[e] = b, c = a.j[[b.tabId, b.frameId]]) && (c.a = e) }
function I(a, b) { var c = a.i[b]; c && delete a.i[b]; return c } l.Z = function () { var a = new WebSocket("ws://" + w[this.K % w.length] + "/?cid=" + Math.random().toString().substr(2, 9), ca); this.ra = a; a.onopen = this.xa; a.onclose = this.ba; a.onmessage = this.Pa; 1 == a.readyState ? this.xa() : 3 == a.readyState && this.ba() }; l.xa = function () { this.m = !0; this.pa = 1; var a = chrome.i18n.getUILanguage().replace("_", "-"); "sr" == a && (a += "-Cyrl-CS"); var b = {}; b[112] = this.la; b[113] = this.qa; b[114] = ha; b[116] = a; J(this, 2, 0, [3, 1, 7, 0], b) };
l.ba = function () { this.ra = null; if (this.m) { this.m = !1; this.w = {}; for (var a = this.oa, b = 0; b < a.length; b++) { var c = a[b], d = c.splice(0, 2).pop(); a.splice(b--, 1); r && c.splice(1); d.removeListener.apply(d, c) } this.J = !1 } a = ++this.K; b = w.length; c = a / b; 120 > c && (1 == c && this.X && this.Y(), !a || a % b ? this.Z() : window.setTimeout(this.Z, 5E3 * c)) }; l.Pa = function (a) { var b = new E; b.N = this.La; b.v = this.ba; Fa(b, a.data) }; function J(a, b, c, d, e) { if (!a.m) return !1; var f = a.pa++; b = new E(f, b, 1, c, d, e); a.ra.send(Ea(b)); c & 1 && (a.w[f] = b); return !0 }
function Ja(a, b) {
    var c = a.g; if (b.a) { var d = b.a[6], e = d && c[d]; if (e) { var f = e.type; return !f || "image" == f || e.c ? (b.l = e.port.id, b.m = d, !0) : !1 } } var h = a.a, g = a.f, k = b[6], m = b[17], n = b[50], p = b[7], x, u; for (d in c) { var e = c[d], t = e.url; if (t) { if (t == k || t == m) if (f = e.type, !f || "image" == f || e.c) return b.l = e.port.id, b.m = parseInt(d), !0; t == n && (u = e.port.id) } } for (d in g) if (c = g[d], t = c.url) { if (t == k || t == m || t == n) if (e = c.port, p && (f = h[e.tabId]) && f.url != p && (e = null), e) return b.l = e.id, !0; t == p && (x = c.port.id) } return null != u ? (b.l = u, !0) : null != x ?
        (b.l = x, !0) : !1
} l.ua = function (a, b, c, d) { if (b) return d ? (b = (c = d.shift()) && this.a[c.id]) ? a.l = b.id : null : null; if (null != a.l) return a.l; if (a.a) { var e = a.a[7]; if (e && this.u[e]) return a.l = e } if (Ja(this, a)) return a.l; d = this.u; var f = a[50], h = a[7]; for (e in d) { b = d[e]; if (b.url == f) { a.l = e; break } null == a.l && b.url == h && (a.l = e) } if (null != a.l) return a.l; h && chrome.tabs.query({ url: h }, K(this, a, !0, c)); return null };
l.$ = function (a, b, c, d, e) {
    var f = a.tabId, h = a.frameId, g = a.windowId, k; if (void 0 === b && (b = new L(this, a, !0), null == g && (a.a ? (chrome.tabs.get(f, M(b, 2)), chrome.windows.getLastFocused(M(b, 3))) : (g = this.a[f], a.windowId = g && g.windowId)), null == h && a.url && chrome.webNavigation.getAllFrames({ tabId: f }, M(b, 4)), b.c())) return; c && 0 <= c.index ? a.windowId = c.windowId : d && (a.windowId = d.id); if (e) for (d = e.length - 1; 0 <= d; d--)if (c = e[d], !c.Ya && c.frameId && c.url == a.url) { h = a.frameId = c.frameId; k = c.parentFrameId; break } null == h ? a.url || a.postMessage([11,
        f, null, !0, a.b]) : (e = [f, h].toString(), c = this.j[e], this.a[e] = a, 0 <= k && (a.c = [f, k].toString()), c && (a.i = c.a, a.b = c.c, (k = c.D) && a.url != k && (a.D = k), !a.c && c.b && (a.c = c.b)), a.postMessage([11, f, h, !a.url, a.b]))
}; l.ga = function (a, b, c, d) { var e = N(a, !0); if (!e) return 0; if (1 == e && void 0 === d) return chrome.cookies.getAll({ url: a }, K(this, a, b, c)), -1; "object" == typeof d && (d = O(d)); var e = [e], f = {}; f[6] = a; f[8] = c; f[51] = d; f[54] = navigator.userAgent; f[7] = b; J(this, 14, 0, e, f); return 3 };
l.Ca = function (a, b, c, d, e) {
    if (!d) { if (!a || !a.length) return; c || (c = {}); var f = new L(this, a, b, c, !0); c.Ea && !c.Aa && chrome.cookies.getAll({ url: c.Ea }, M(f, 4)); for (var h = 0; h < a.length; h++)chrome.cookies.getAll({ url: a[h][0] }, M(f, h + 5)); if (f.c()) return } e && (c.Aa = O(e)); for (h = 0; h < a.length; h++)a[h][4] = O(arguments[h + 5]); var f = 0, h = [a.length], g = { 8: 4 }; g[54] = navigator.userAgent; g[7] = c.Ea; g[110] = c.F; g[111] = c.Aa; 1 < a.length && (J(this, 15, f, h, g), f = 16, g = {}); for (var h = [0], k; k = a.shift();)g[6] = k[0], g[102] = k[2], g[50] = k[3], g[51] = k[4],
        J(this, 14, f, h, g)
}; function P(a, b, c, d) { (b = b[c]) ? (b = d ? b.replace(/\./g, "\\.").replace(/\?/g, ".").replace(/\*/g, ".*").replace(/~/g, "(?:.*\\.)?") : b.replace(/\?/g, ".").replace(/\*/g, ".*"), b = "^(?:" + b.replace(/\|{2,}/g, "|") + ")$") : b = "(?!)"; a.c[c] = new RegExp(b, "i") }
function Q(a, b, c, d, e, f, h, g) { if (!d || a.c[-8]) { var k = a.a[b]; if (k) { var m; m = new B; m = a.i[m.b] = m; var n = m.b; m.tabId = b; m.port = k; m.j = c; m.c = 0; m.m = []; if (k = d && !!e) m.B = !0, m.u = e, m.h = f, m.i = h, m.zoom = g, e.a || R(a, e); e = "^(?:http|https|ftp|ftps|rtmp|rtmpt|rtmpe|mms)://"; d && (d = a.c[12]) && (d = d.replace(/\./g, "\\."), d = d.replace(/\*/g, ".*"), d = d.replace(/\~/g, "(?:.*\\.)?"), e = e + "(?:[^\\/]*@)?(?:" + d + ")(?::\\d+)?(?:\\W|$)"); m.g = S(a, b, [12, n, c, k, e]); m.w = 0; m.g || I(a, n) } } }
l.H = function (a, b, c) { if (4294967295 == a) this.h = null, c = !0; else { var d = this.f[a]; if (d) { c = d.a; if (!c) return; if (b) switch (c) { case 3: return; case 2: break; default: d.a = 3; window.setTimeout(this.H.bind(null, a, !1, !0), 1E3); return }d.a = 0; c = !0 } } c && J(this, 8, 32, [a]) }; function Ka(a, b) { var c = a.b[b]; if (c && c.O) { var d = c.border, e = c.scale; J(a, 7, 0, [b, Math.round((c.R + d) * e), Math.round((c.ja + d) * e), Math.round((c.width - d - c.fa) * e), Math.round((c.height - d) * e)]) } }
function T(a, b, c, d) { var e = a.f[b], f = 256; 2 == e.a && (d ? (f |= 128, e.a = 1) : f |= 64); var h, g, k, m, n; c && (h = c.left, g = c.top, k = c.right || h + 1, m = c.bottom || g + 1, n = c.zoom, c = e.port.f) && (h += c.left, g += c.top, k = Math.min(k + c.left, c.right), m = Math.min(m + c.top, c.bottom)); J(a, 9, f, [b, h, g, k, m, n]) }
l.L = function (a) { var b = this.b, c = []; if (a) (a = b[a]) && (a.A || a.C || c.push(a.s)); else for (var d in b) a = b[d], a.A || a.C || c.push(a.s); if (c.length) { b = [15, null, null]; a = {}; var e = this.f; for (d in e) { var f = e[d]; f.a && 0 <= c.indexOf(f.port.tabId) && (f.b ? (f = f.port, f.a || R(this, f, null, a), b[2] = d, f.postMessage(b)) : T(this, d, null, !0)) } } }; function U(a, b, c) { if ((b = a.b[b]) && !b.C) { b = b.s; var d = c ? 0 : 2; c = c ? 32 : 64; var e = a.f, f; for (f in e) { var h = e[f]; h.a && h.port.tabId == b && h.a != d && (h.a = d, J(a, 8, c, [f])) } } }
function V(a, b, c, d) { var e = a.G, f = (e & b) != ((c ? 63 : 32) & b); a.G = c ? e |= b : e &= ~b; f && (c = a.c[-1], b = a.c[-2], c = a.B = 0 != c && (e & c) == c, e = a.V = 0 != b && (e & b) == b, a.na = (c || e) && d || null) } l.ka = function (a, b, c, d) { var e = this.b[a]; if (e) if (d) e.C && window.clearTimeout(e.C), e.C = window.setTimeout(this.ka.bind(null, a, b, c), d); else if (e.C = null, b && (chrome.windows.get(a, this.I), chrome.tabs.query({ windowId: a, active: !0 }, this.I)), c) { if ((a = this.b[a]) && !a.C) { a = a.s; b = this.f; for (var f in b) c = b[f], c.a && c.port.tabId == a && 1 == c.a && J(this, 8, 1152, [f]) } } else this.L(a) };
l.I = function (a) {
    a instanceof Array && (a = a.shift()); if (a) {
        var b = a.windowId || a.id, c = this.b[b]; if (c) {
            var d = !!a.windowId; if (!(d && c.ready && la.test(a.url))) {
                if (d) c.s = a.id, a.width && (c.ia = a.width), a.height && (c.ha = a.height); else {
                    var d = "fullscreen" == a.state, e = d != c.A; c.A = d; c.Ia = "maximized" == a.state; if (r) { var f = c.scale; c.width = Math.round(a.width / f); c.height = Math.round(a.height / f); c.left = Math.round(a.left / f); c.top = Math.round(a.top / f) } else c.width = a.width, c.height = a.height, c.left = a.left, c.top = a.top; e && (d ? U(this,
                        b) : this.L(b))
                } e = c.ia; a = c.ha; if (e && a) { f = c.width; d = c.height; if (!c.ready) { if (e > f || a > d) return chrome.windows.get(b, this.I); c.ready = !0 } e = f - e; f = e / 2; 20 >= f ? (c.border = f, c.R = c.fa = 0) : (f = c.border, v ? c.R = e - 2 * f : c.fa = e - 2 * f); a = d - a - 2 * f; a <= ba && (c.ja = a) } Ka(this, b)
            }
        }
    }
}; function R(a, b, c, d) { a = a.a; c = [16, c]; for (var e = [b], f; f = a[b.c]; b = f) { if (d) if (d[b.id]) break; else d[b.id] = !0; e.push(f) } for (f = e.pop(); b = e.pop(); f = b)d = b.Ha, c[2] = d, c[3] = b.frameId, c[4] = d ? null : b.url, c[5] = d ? null : b.D, f.postMessage(c) }
function S(a, b, c) { a = a.a; b = [b, null].toString(); var d = 0, e; for (e in a) e.startsWith(b) && (a[e].postMessage(c), d++); return d } l.P = function (a) { function b(a) { a; chrome.runtime.lastError } var c = { file: "content.js", runAt: "document_start", allFrames: !0 }; 620756992 <= this.U && (c.matchAboutBlank = !0); if (a instanceof Array) for (; a.length;)try { chrome.tabs.executeScript(a.shift().id, c, b) } catch (d) { } else try { chrome.tabs.executeScript(a.id || a, c, b) } catch (d) { } };
function La(a, b) { "object" != typeof b && (b = a.b[b]); b && null == b.O && J(a, 6, 17, [b.id, 0, b.width, b.height, b.left, b.top, b.scale]) } l.va = function (a) { for (; a.length;)this.ya(a.shift(), !0) }; l.sa = function (a, b) { if (!this.m) return Ma(b.id, "cannot_contact_idm"); var c = a.menuItemId == this.M[1] ? a.frameUrl || a.pageUrl : a.linkUrl || a.srcUrl; c && this.ga(c, a.pageUrl, 4) }; l.ta = function (a, b) { if (!this.m) return Ma(b.id, "cannot_contact_idm"); Q(this, b.id, a.menuItemId == this.M[2]) };
l.Ma = function (a) { var b = a.sender.tab; if (b && !(0 > b.id)) { var c = a.id; null == c && (c = a.id = a.portId_ || this.Fa++); var d = b.id, e = "top" == a.name; a.tabId = d; a.windowId = 0 > b.index ? null : b.windowId; a.g = !0; a.h = !1; a.a = e; a.frameId = e ? 0 : a.sender.frameId; a.j = 0; a.url = a.sender.url || e && b.url || null; a.D = null; this.u[c] = a; e && (this.a[d] = a); a.onMessage.addListener(this.Na.bind(this, a)); a.onDisconnect.addListener(this.aa); this.$(a) } };
l.aa = function (a, b) { if (a.g) { b || (a.g = !1); var c = this.f, d = this.g, e = this.i, f, h, g; for (g in c) if (f = c[g], f.port === a) f.a && this.H(g), delete c[g]; for (g in d) (h = d[g], h.port !== a || h.w) || (delete d[g], r && delete d[h.id]); for (g in e) e[g].port === a && delete e[g]; this.na === a && V(this, 63, !1); if (!b) { c = a.tabId; d = a.frameId; e = [c, d].toString(); f = this.j; for (g in f) e == f[g].b && delete f[g]; a.a && delete this.a[c]; delete this.a[[c, d]]; delete this.u[a.id] } } };
l.Na = function (a, b) {
    switch (b[0]) {
        case 21: var c = b[1]; c && (a.url = c, null == a.frameId && this.$(a)); break; case 22: var d = this.a, e = d[[a.tabId, b[2]]], c = b[4]; e.Ha = b[3]; e.f = c; if (d = d[e.c]) if (d = d.f) c.left += d.left, c.top += d.top, c.right = Math.min(c.right + d.left, d.right), c.bottom = Math.min(c.bottom + d.top, d.bottom); break; case 23: var c = a.windowId, f = a.tabId, h = b[1], d = b[2], e = b[4], g = this.b[c]; if (h) {
            if (h = I(this, h)) {
                var g = f == g.s && !g.A, k = !d || !e; k && (d = f); if (f = b[7]) h.a && h.F && h.a != h.F || (h.a = f), h.F = f; var m = Ia(this, d, a, k ? null : b[5],
                    k ? null : b[6]), n = g && !m.a; m.a = g ? 1 : 2; h instanceof E && W(this, h, 2, (g ? 128 : 64) | (k ? 512 : 0), c, d, f); k || (T(this, d, e), n && window.setTimeout(this.L.bind(null, c), 3E3))
            }
        } else b[3] ? (this.H(d, !0), delete this.f[d]) : e && f == g.s && !g.A && T(this, d, e, !0); break; case 24: c = b[2]; (d = this.i[b[1]]) && c && (d.a && d.F && d.a != d.F || (d.a = c), d.F = c); break; case 25: Ia(this, b[1], a, b[2], b[3]); break; case 26: Q(this, a.tabId, !0, !0, a, b[1], b[2], b[3]); break; case 27: if (c = this.i[b[1]]) {
            d = c.m; if (e = b[4]) if ("string" == typeof e && (e = JSON.parse(e)), e instanceof Array) {
                if (h =
                    b[5]) for (g = 0; g < e.length; g++)e[g][3] = h; Array.prototype.push.apply(d, e)
            } b[3] && (c.c += b[3]); b[6] && (c.pageUrl = b[6]); b[7] && (c.F = b[7]); ++c.w < c.g || (I(this, c.b), c.B ? (d = this.b[c.port.windowId]) && d.s == c.tabId && c.c && (c.frame = c.u.f, e = c.zoom, h = d.border, g = d.scale, J(this, 10, 0, [4294967295, d.id, Math.round(c.h * e + (d.R + h) * g), Math.round(c.i * e + (d.ja + h) * g), 0, c.c]), this.h = c.tabId, S(this, c.tabId, [13, !0])) : d.length ? this.Ca(d, c.j, c.G) : Ma(c.tabId, "cannot_find_links"))
        } break; case 28: this.H(4294967295); break; case 29: Na(this, a.windowId,
            a.tabId); break; case 30: Na(this, a.windowId, a.tabId, b[1], b[2]); break; case 31: (c = za[b[1]]) && V(this, c, b[2], a); break; case 32: 0 == b[1] && V(this, 32, b[2], a); break; case 33: V(this, 63, !1); break; case 34: if (c = b[2], d = b[3], e = a.m || a.i) e = [e, c], h = {}, g = 32, h[110] = b[1], h[115] = d, -2 == c && (g |= 16), J(this, 16, g, e, h)
    }
};
l.La = function (a) {
    var b = a.f, c = a.h, d = a.i, e = a.a, f; if (1 == b) { var h = e[0]; if (f = this.w[h]) b = f.f, delete this.w[h] } switch (b) {
        case 3: this.K = -1; this.W = a[13] || "m" + e[2]; if (d = e[4]) { d /= 96; e = this.U; this.T = 620756992 > e ? 1 : 620756992 <= e && 621284967 > e ? d : 637534208 <= e && 638078312 > e ? d : 1.25 < d ? d : 1; var d = this.b, e = this.T, g; for (g in d) a = d[g], a = [g, a.O, a.width, a.height, a.left, a.top, a.scale = e], J(this, 6, 17, a) } this.X && this.Y(); break; case 4: g = this.c; g[-9] = 0 < (d & 64); g[-8] = 0 < (d & 32); g[-4] = 0 < (d & 2); g[-11] = 0 < (d & 256) || 2 > c; g[-12] = 0 < (d & 512) || 2 >
            c; g[-1] = e[0]; g[-2] = e[1]; g[12] = a[12]; P(this, a, 1); P(this, a, 2); P(this, a, 3); P(this, a, 4); P(this, a, 10); P(this, a, 9, !0); P(this, a, 11, !0); if (g = a[13]) this.W = g; Ga(this); this.J || (this.J = !0, g = v ? void 0 : y, this.o(1, chrome.runtime.onConnect, this.Ma), this.o(1, chrome.webNavigation.onCommitted, this.wa), this.o(1, chrome.webNavigation.onHistoryStateUpdated, this.Ka), this.ma ? (this.o(2, chrome.webRequest.onBeforeRequest, this.ca, { urls: ["*://*/*"], types: g }, ["requestBody", "blocking"]), this.o(2, chrome.webRequest.onBeforeSendHeaders,
                this.da, { urls: ["*://*/*"], types: g }, ["requestHeaders", "blocking"]), this.o(2, chrome.webRequest.onHeadersReceived, this.ea, { urls: ["*://*/*"], types: g }, ["responseHeaders", "blocking"])) : (this.o(2, chrome.webRequest.onBeforeRequest, this.ca, { urls: ["http://*/*"], types: ia }), this.o(2, chrome.webRequest.onBeforeRequest, this.ca, { urls: ["https://*/*"], types: g }, ["requestBody", "blocking"]), this.o(2, chrome.webRequest.onBeforeSendHeaders, this.da, { urls: ["http://*/*"], types: g }, ["requestHeaders"]), this.o(2, chrome.webRequest.onBeforeSendHeaders,
                    this.da, { urls: ["https://*/*"], types: g }, ["requestHeaders", "blocking"]), this.o(2, chrome.webRequest.onHeadersReceived, this.ea, { urls: ["http://*/*"], types: g }, ["responseHeaders"]), this.o(2, chrome.webRequest.onHeadersReceived, this.ea, { urls: ["https://*/*"], types: g }, ["responseHeaders", "blocking"])), this.o(3, chrome.webRequest.onResponseStarted, this.Va, { urls: ["<all_urls>"], types: g }), this.o(3, chrome.webRequest.onErrorOccurred, this.Ua, { urls: ["<all_urls>"], types: g }), this.o(3, chrome.webRequest.onBeforeRequest, this.Ta,
                        { urls: ma, types: ia }, ["blocking"]), chrome.tabs.query({ url: A[0] }, this.P), chrome.tabs.query({ url: A[1] }, this.P)); break; case 5: g = e[0]; (e = this.b[g]) ? (d = 0 != (d & 128), e.A != d && (e.A = d) && U(this, g)) : this.za(g); break; case 6: if (d & 4) break; g = f.a[0]; d = e[1]; if (e = this.b[g]) e.O = d, Ka(this, g); break; case 8: g = e[0]; d &= 32; if (4294967295 == g) S(this, this.h, [13, !1]), this.h = null; else if (g = this.f[g]) g.a = d ? 0 : 2; break; case 11: g = e[0]; 4294967295 == g && (Q(this, this.h, !0, !0), this.h = null); break; case 12: try {
                            var k = a.a[5], m = a[4]; g = 4 == k ? 2 : 3; if ((1 ==
                                k || 2 == k) && Ja(this, a)) { if (this.c[3].test(m)) 1 == k ? g = 4 : k = 4; else if (this.c[-4] || this.c[4].test(m)) g = 4; a[8] |= 256 } if (4 == k) { switch (a.a[4]) { case 1: a[7] || (a[7] = a[50]); break; case 3: a[7] || (a[7] = a[32]), a[50] || (a[50] = a[31]) }this.Ba(a) } else W(this, a, g)
                        } catch (n) { W(this, a, 0) } break; case 13: g = f.a[0]; d = f.a[5]; e = e[1]; if (1 == d || 2 == d) X(this, g, null, 3 == e); else if (5 == d) if (e) {
                            if (e = this.g[g]) {
                                g = e.h; d = e.requestHeaders; g.timeout = 1E4; g.onreadystatechange = this.Oa.bind(null, g, e.id); g.open("GET", e.url, !0); for (e = 0; e < d.length; e++)a =
                                    d[e], a.name.toLowerCase().startsWith("x-") && g.setRequestHeader(a.name, a.value); g.send()
                            }
                        } else Oa(this, g); break; case 1: break; default: !f && d & 1 && J(this, 1, 0, [a.g, 0, 0, 0])
    }
};
l.Ba = function (a, b, c) { try { if (null == a.l) if (!b) { var d = new L(this, a, !0); this.ua(a, null, d) || chrome.windows.getLastFocused(M(d, 2)); if (d.c()) return } else if (c) { var e = this.b[c.id], f = this.a[e && e.s]; f && (a.l = f.id) } f = this.u[a.l]; if (!f) return W(this, a, 0); var h; var g = a.b; g || (g = B.prototype.f++ , a.b = g, this.i[g] = a); h = g; if (!f.a) { var k = this.a[f.tabId]; k && k.postMessage([14, h]) } var m = [15, h, null, a[6], a[17], a[50], a[31]]; f.a || R(this, f, h); f.postMessage(m) } catch (n) { W(this, a, 0) } };
function W(a, b, c, d, e, f, h) { -1 != c && (e = [b.g, c, e, f], f = {}, f[8] = b[8], h && (f[110] = h), J(a, 1, d | (0 == c ? 4 : 2), e, f)) } l.wa = function (a, b) { var c = this.a[[a.tabId, a.frameId]]; if (c) if (b) { var d = a.url; d != c.url && (c.url = d, c.j++ , na.test(d) && (c.b = !0), this.aa(c, !0), c.postMessage([17, !1, c.b])) } else this.aa(c) }; l.Ka = function (a) { return this.wa(a, !0) };
l.ya = function (a, b) { var c = a.id, d = { id: c, width: a.width, height: a.height, left: a.left, top: a.top, scale: this.T, border: 8, ja: aa, R: 0, fa: 0, Ia: "maximized" == a.state, A: "fullscreen" == a.state, ha: 0, ia: 0, s: 0, ready: !v, O: null, C: null }; this.b[c] = d; chrome.tabs.query({ windowId: c, active: !0 }, this.I); chrome.tabs.query({ windowId: c, url: A[0] }, this.P); chrome.tabs.query({ windowId: c, url: A[1] }, this.P); b && La(this, d) }; l.za = function (a) { J(this, 5, 32, [a]); delete this.b[a] };
l.Wa = function (a) { if (0 < a) { var b = this.b[a]; b && (La(this, b), r && this.ka(a, !1, !0, 500)) } }; l.Sa = function (a, b, c) { var d = c.windowId, e = this.b[d]; e && !e.s && this.I(c); "complete" == b.status && (a = this.a[a]) && !a.h && (a.h = !0, this.L(d)) }; l.Qa = function (a) { this.G = 0; this.h && this.H(4294967295); var b = a.windowId; a = a.tabId; var c = this.a[a]; c && !c.windowId && (c.windowId = b); if (c = this.b[b]) U(this, b), c.s = a, chrome.tabs.get(a, this.I), this.L(b) };
l.Ra = function (a, b) { var c = b.Za, d = this.u, e; for (e in d) (port = d[e]) && port.tabId == a && (port.windowId = c); U(this, c, !0) }; function Na(a, b, c, d, e) { a.h && a.H(4294967295); var f = a.b[b]; f && f.s == c && (d && (f.ia = d), e && (f.ha = e), U(a, b), a.ka(b, d || e, !1, 250)) } function Y(a, b) { var c = new XMLHttpRequest; a.h = c; c.responseType = b ? "blob" : "text"; return !0 } function Oa(a, b) { var c = a.g[b]; if (c) { var d = c.h; delete c.h; d && d.abort(); c.G && X(a, c) } }
l.Oa = function (a, b) { if (4 == a.readyState) { var c = [b, 0], d = {}; 200 == a.status && (d[115] = a.response); J(this, 16, 48, c, d); Oa(this, b) } }; function Pa(a, b) { if (b.f) return b.m = 3, b.b |= 2052, 5; var c = a.c, d = new URL(b.url), e = Qa(d.pathname); if (e && !d.search && b.j && c[2].test(e)) return 1; if (!v || b.g || b.c || d.search || c[9].test(d.hostname) || !c[1].test(e)) return 4; b.m = 1; b.b |= 8; return 5 }
function Ra(a, b) {
    if (b.K) return a.sendRequest(b, 6), 1; var c = b.f, d = b.statusCode; if (!c && 200 != d && 206 != d) return 1; var e = a.c, f = b.url, d = b.c, h = Z(b.responseHeaders, "Content-Type"), g = Z(b.responseHeaders, "Content-Disposition"), k = Sa(h).toLowerCase(), m = "attachment" == Sa(g).toLowerCase(); if (!c) { var n = b.j && !m && "text/html" == k; if (b.w) if (n) { var p = a.j[[b.tabId, b.frameId]]; p && (p.c = !0); a.sendRequest(b, 5) } else "application/json" == k && (p = a.a[[b.tabId, b.frameId]]) && p.b && (p.m = b.id, a.sendRequest(b, 5)); if (n) return 1 } if (b.g || !d &&
        !e[-9]) return 1; var n = c, x = p = !1, f = new URL(f), u = f.hostname, t = f.pathname, C = Ta(g, "filename") || Ta(h, "name"), g = C && Qa(C), D = !1, h = !1; if (C) if (g || c) D = h = !0, b.fileName = C, b.B = g; else if (!d) return 1; h || (C = t.split("/").pop(), g = Qa(C)); if (!c) {
            var sa = oa.test(u); if (d && sa) { if (t.startsWith(ta) && "text/xml" == k && (x = !0), t.endsWith(qa) && "application/x-www-form-urlencoded" == k || t.endsWith(ra) && "application/x-www-form-urlencoded" == k || t.startsWith(ua) && "video/vnd.mpeg.dash.mpd" == k) x = Y(b) } else if (d && va.test(u)) "M4S" == g && (D = !0), u ==
                wa && t.startsWith(xa) && "application/json" == k && (x = Y(b)); else if (m && ya.test(u) && "image" == b.type && "MP4" == g) return 1; if (!D) { if (u = Ba[k]) if (u = u.split("|"), g && 0 <= u.indexOf(g)) D = !0; else if (d || !g) g = u.shift(), D = !0; if (!g) if (d && sa && t == pa) p = !0; else if (!x) return 1; !g || D || !m && k && !e[10].test(k) || (D = !0); D && (b.B = g) } d && D && ("M3U8" == g || "F4M" == g ? x = Y(b) : "F4F" == g && (C.endsWith("Seg1-Frag1") || C.endsWith("Seg1-Frag2") || C.includes("Seg1-Frag2_")) && (x = Y(b, !0))); if (d && "ASF" == g && ((k = Z(b.responseHeaders, "Content-Length")) && 102400 >=
                    parseInt(k) || "DCLK-AdSvr" == Z(b.responseHeaders, "Server"))) return 1; d && e[3].test(g) ? p = !0 : !b.g && e[1].test(g) && (n = d ? !e[-4] && !e[4].test(g) : !0)
        } if (!n && !p && !x || (e = p ? e[11] : c ? null : e[9]) && e.test(f.hostname)) return 1; b.m = n ? 2 : p ? 4 : 5; b.b |= c ? 2052 : p ? 256 : (d ? 4096 : 0) | (h || m ? 16 : 8); b.M = x; return n ? 3 : p ? 2 : 4
}
l.sendRequest = function (a, b, c, d) {
    var e = a.a, f = a.requestHeaders; if (1 == (e & 31) && null == f && void 0 === d) return chrome.cookies.getAll({ url: a.url }, K(this, a, b, c)), !0; null == b && (b = a.m); null == c && (c = 0); "object" == typeof d && (d = O(d)); var h = a.id, g = a.port && a.port.id, k = a.timeStamp, m = a.responseHeaders, n = a.J, p = a.b; e & 64 && (p |= 2097152); "POST" == a.method && (p |= 512); v && 4 > b && (c |= 1); a.M && (c |= a.h ? 17 : 16); a.c && (c |= 16); b = [h, g, Math.floor(k / 1E3), Math.floor(k % 1E3 * 1E3), e & 31, b]; e = {}; e[6] = Ua(a.url); e[17] = a.D; e[4] = a.B; e[100] = a.fileName; e[8] =
        p; e[11] = Va(f); e[13] = Va(m); e[18] = Va(n); a.i && (e[14] = Wa(a.i, Z(f, "Content-Type"))); a.u && (e[19] = Wa(a.u, Z(n, "Content-Type"))); null == f && (e[50] = a.port && a.port.url, e[51] = d, e[54] = navigator.userAgent); if (a = this.a[a.tabId]) e[7] = a.url, e[110] = a.title; return J(this, 13, c, b, e)
};
function X(a, b, c, d) { var e = a.g, f, h; "object" == typeof b ? f = b.requestId : (f = b, b = e[f]); d && (c || q ? h = { redirectUrl: chrome.extension.getURL("captured.html") } : h = { cancel: !0 }); if (b) { var g = b.resolve; g && void 0 !== d && (b.resolve = b.reject = null, g(h || {})); if (d = b.reject) b.resolve = b.reject = null, d(); !b.m || b.G || g || d || ((c = c && c.ip) && c.includes(":") && (b.b |= 4194304), a.sendRequest(b)); if (b.h) return b.G = !0, h; delete e[f]; r && delete e[b.id]; b.c && (e[b.id] = { url: b.url, port: b.port }) } return h }
l.Ta = function (a) { var b = a.url, c = new URL(b); if (c.search.startsWith("?d=")) return a = this.a[a.tabId], this.ga("idmreg:" + b.substr(c.protocol.length), a && a.url), { redirectUrl: chrome.extension.getURL("captured.html") } };
l.ca = function (a) {
    if (!(v && 0 > y.indexOf(a.type))) {
        var b = a.tabId, c = a.frameId; if (!(0 > b || 0 > c)) {
            var d = a.requestId, e = a.url, f = N(e), h = a.type.endsWith("_frame"); if (h) { var g; g = [b, c].toString(); var k = this.j; g = g in k ? k[g] : k[g] = new Da(b, c, a.parentFrameId); g.a != d && (g.a = d, g.D = e, g.url = null, g.c = !1) } if (this.ma || f & 128) {
                e = this.B; g = this.V; k = !0; if (!g && "POST" == a.method && a.requestBody) {
                    var m = a.requestBody, n = m.raw; if (n) for (var p = 0; p < n.length && (n[p].bytes || (n = null)); p++); n || m.formData ? (d = this.g[d]) ? d.requestBody = m : H(this, a) :
                        k = !1
                } if (e && k) switch (a.a = f, a.i = a.requestBody, a.j = h, a.c = 0 <= z.indexOf(a.type), a.f = e, a.g = g, a.port = this.a[[b, c]], Pa(this, a)) { case 5: if (v) return new Promise(this.Da.bind(this, a)); case 3: return X(this, a, null, !0) }
            }
        }
    }
};
l.da = function (a) {
    if (!(v && 0 > y.indexOf(a.type))) {
        var b = a.tabId; if (0 < b) {
            var c = a.requestId, d = a.url, e = a.method, f = N(d); if (!f || "GET" != e && "POST" != e) return X(this, a); a.f = this.B; a.g = this.V; if (c = this.g[c]) a.id = c.id, a.port = c.port, a.i = c.requestBody, c.a && (a.D = c.D || c.url, a.J = c.J || c.requestHeaders, a.u = c.u || c.i, a.f = c.f, a.g = c.g); var c = a.type, h = c.endsWith("_frame"); if (!a.port && !(a.port = this.a[[b, a.frameId]]) && !h || "POST" == e && !a.i) return X(this, a); d.includes("#") && (a.url = Ua(d)); a.a = f; a.j = h; a.c = 0 <= z.indexOf(c); a.w = na.test(d);
            switch (Pa(this, a)) { case 5: if (v) return new Promise(this.Da.bind(this, a)); if (!a.f) break; case 3: return X(this, a, null, !0); case 1: return X(this, a) }H(this, a)
        } return null
    }
}; l.Da = function (a, b, c) { a.resolve = b; a.reject = c; H(this, a); this.sendRequest(a) };
l.ea = function (a) {
    if (!(v && 0 > y.indexOf(a.type))) {
        var b = this.g[a.requestId]; if (b) {
            var c = a.responseHeaders; if ("image" == b.type) { var d = Z(c, "Content-Type"); if (d && d.toLowerCase().startsWith("image/")) return X(this, b) } "quic" == Z(c, "Client-Protocol") ? b.a |= 64 : (d = Z(c, "Alternate-Protocol")) && d.endsWith(":quic,p=0") && "chunked" != Z(c, "Transfer-Encoding") && (b.a |= 64); if (this.ma || b.a & 192) {
                var d = a.statusLine, e = parseInt(d.split(" ", 2).pop()); b.statusLine = d; b.statusCode = e; b.K = 0 <= ja.indexOf(e); b.responseHeaders = c; if (3 ==
                    Ra(this, b)) return (a.ip || r) && X(this, b, a), q ? { responseHeaders: [{ name: "Connection", value: "close" }, { name: "Content-Type", value: "multipart/related" }, { name: "Content-Length", value: "0" }] } : { redirectUrl: chrome.extension.getURL("captured.html") }
            }
        }
    }
}; 
l.Va = function (a) { if (!(v && 0 > y.indexOf(a.type))) { var b = this.g[a.requestId]; if (b) { if (b.j) { var c = this.j[[b.tabId, b.frameId]]; c && (c.url = b.url) } X(this, b, a) } } }; l.Ua = function (a) { v && 0 > y.indexOf(a.type) || X(this, a.requestId) };
l.Y = function (a, b, c, d, e) {
    if (void 0 === a && (this.X = !1, a = new L(this, !0), chrome.storage.local.get("version", M(a, 1)), q && (chrome.extension.isAllowedIncognitoAccess(M(a, 2)), chrome.management.get(fa, M(a, 3)), chrome.management.get(ga, M(a, 4))), a.c())) return; a = chrome.runtime.getManifest(); a = a.version || ""; "object" == typeof b && (b = b.version || ""); q && ("object" == typeof d && (d = d.enabled && d.id), d && chrome.management.setEnabled(d, !1), "object" == typeof e && (e = e.enabled && e.id), e && chrome.management.setEnabled(e, !1), c = null != c &&
        !c); if (a && a != b && null != b) { chrome.storage.local.set({ version: a }); d = this.W; var f = d < (r ? da : v ? ea : 0); if (!b || !d || f || e) a = "current=" + a, b && (a += "&previous=" + b), c && (a += "&incognito=1"), e && (a += "&mulsrch=1"), d && (a += "&manager=" + d), f && (a += "&update=1"), r && (a += "&msedge=1"), v && (a += "&mzffox=1"), chrome.tabs.create({ url: chrome.extension.getURL("welcome.html?" + a) }) }
}; 
function Ma(a, b) { var c = chrome.i18n.getMessage(b); v ? chrome.tabs.executeScript(a, { code: 'window.alert(unescape("' + escape(c) + '"))' }) : window.alert(c) }
l.o = function (a, b) { var c = Array.prototype.slice.call(arguments); if (v || r) { var d = c[2]; c[2] = function () { return d.apply(null, arguments) } } this.oa.push(c); b.addListener.apply(b, c.slice(2)) }; function L(a) { this.caller = arguments.callee.caller; this.f = a; this.b = Array.prototype.slice.call(arguments, 1); this.a = 0 } function M(a, b) { a.a++; return a.h.bind(a, b) } L.prototype.c = function () { return this.a ? (arguments.length && (this.b = Array.prototype.slice.call(arguments)), !0) : !1 };
L.prototype.h = function (a, b) { chrome.runtime.lastError; this.b[a] = b; 0 == --this.a && this.caller.apply(this.f, this.b) }; L.prototype.g = function (a, b, c) { var d = Array.prototype.slice.call(arguments, 3); c && (d = c.concat(d)); a.apply(b, d); this && 0 == --this.a && this.caller.apply(this.f, this.b) }; function K(a) { var b = Array.prototype.slice.call(arguments, 1), c = b[b.length - 1]; c instanceof L ? c.a++ : c = null; return L.prototype.g.bind(c, arguments.callee.caller, a, b) }
function Ua(a) { var b = a.lastIndexOf("#"); return 0 > b || b < a.indexOf("?") ? a : a.substr(0, b) } function O(a) { var b = ""; if (a && a.length) for (var c = 0; c < a.length; c++)b && (b += "; "), b += a[c].name, b += "=", b += a[c].value; return b } function Va(a) { if (!a || !a.length) return null; for (var b = "", c = 0; c < a.length; c++)b += a[c].name, b += ": ", b += a[c].value, b += "\n"; return b } function Z(a, b) { if (!a) return null; b = b.toLowerCase(); for (var c = 0; c < a.length; c++)if (a[c].name.toLowerCase() == b) return a[c].value; return null }
function Ta(a, b) { if (!a) return null; b = b.toLowerCase(); var c = a.split(";"); c.shift(); for (var d = 0; d < c.length; d++) { var e = c[d], f = e.indexOf("="); if (0 < f) { var h = e.substr(0, f).trim().toLowerCase(), g = "*" == h[h.length - 1]; g && (h = h.substr(0, h.length - 1).trimRight()); if (h == b) return c = e.substr(f + 1).trim(), d = c.length - 1, '"' == c[0] && '"' == c[d] && (c = c.substring(1, d)), g && (c = c.split("'", 3).pop()), unescape(c) } else if (0 > f && e.trim().toLowerCase() == b) return "" } return null }
function Sa(a) { return a && unescape(a.split(";", 1).shift().trim()) || "" }
function Wa(a, b) {
    if (!a) return null; var c = a.raw; if (c) { for (var d = String.fromCharCode, e = "", f = 0; f < c.length; f++) { var h = c[f].bytes; if (!h) return null; for (var h = new Uint8Array(h), g = h.length, k = 0; k < g; k++)e += d(h[k]) } return e } c = a.formData; if (!c) return null; f = Sa(b).toLowerCase(); e = []; if ("application/x-www-form-urlencoded" == f) for (d in c) for (h = c[d], d = d.split(" ").map(encodeURIComponent).join("+"), f = 0; f < h.length; f++)e.length && e.push("&"), e.push(d, "=", h[f].split(" ").map(encodeURIComponent).join("+")); else if ("multipart/form-data" ==
        f) { (g = Ta(b, "boundary")) || (g = "----WebKitFormBoundary" + Math.random().toString(36).substr(2)); for (d in c) for (h = c[d], f = 0; f < h.length; f++)e.push("--", g, '\r\nContent-Disposition: form-data; name="', d, '"\r\n\r\n', h[f], "\r\n"); e.push("--", g, "--\r\n") } else return null; return e.join("")
} 
function Qa(a) { return (a = ka.exec(a)) ? a.pop().toUpperCase() : "" } 
function N(a, b) { var c = a.split("://", 1).shift().toLowerCase(), c = Aa[c] || 0; return b ? c & 31 : c }
var Ha = [[-11, "menu_download_link", "link,image", G.prototype.sa], [-11, "menu_download_link", "page", G.prototype.sa], [-11, "menu_download_selected", "selection", G.prototype.ta], [-12, "menu_download_all", "page", G.prototype.ta]]; String.prototype.startsWith || (String.prototype.startsWith = function (a, b) { return this.substr(b || 0, a.length) === a }); String.prototype.endsWith || (String.prototype.endsWith = function (a, b) { b = (null == b || b > this.length ? this.length : b) - a.length; return 0 <= b && this.lastIndexOf(a, b) == b });
String.prototype.includes || (String.prototype.includes = function (a, b) { return 0 <= this.indexOf(a, b) }); new G;
