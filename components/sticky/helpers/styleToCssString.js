Object.defineProperty(exports, "__esModule", {
    value: !0
});

var isUnitlessNumber = {
    boxFlex: !(exports.default = void 0),
    boxFlexGroup: !0,
    columnCount: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    strokeDashoffset: !0,
    strokeOpacity: !0,
    strokeWidth: !0
};

function prefixKey(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
}

var prefixes = [ "Webkit", "ms", "Moz", "O" ];

Object.keys(isUnitlessNumber).forEach(function(t) {
    prefixes.forEach(function(e) {
        isUnitlessNumber[prefixKey(e, t)] = isUnitlessNumber[t];
    });
});

var msPattern = /^ms-/, _uppercasePattern = /([A-Z])/g;

function hyphenate(e) {
    return e.replace(_uppercasePattern, "-$1").toLowerCase();
}

function hyphenateStyleName(e) {
    return hyphenate(e).replace(msPattern, "-ms-");
}

var isArray = Array.isArray, keys = Object.keys, counter = 1, unquotedContentValueRegex = /^(normal|none|(\b(url\([^)]*\)|chapter_counter|attr\([^)]*\)|(no-)?(open|close)-quote|inherit)((\b\s*)|$|\s+))+)$/;

function buildRule(e, t) {
    return isUnitlessNumber[e] || "number" != typeof t ? "content" !== e || unquotedContentValueRegex.test(t) || (t = "'" + t.replace(/'/g, "\\'") + "'") : t += "px", 
    hyphenateStyleName(e) + ": " + t + ";  ";
}

function styleToCssString(e) {
    var t = "";
    if ("string" == typeof e) return e;
    if (!e || 0 === keys(e).length) return t;
    for (var r = keys(e), n = 0, s = r.length; n < s; n++) {
        var o = r[n], i = e[o];
        if (isArray(i)) for (var a = 0, u = i.length; a < u; a++) {
            t += buildRule(o, i[a]);
        } else t += buildRule(o, i);
    }
    return t;
}

var _default = styleToCssString;

exports.default = _default;