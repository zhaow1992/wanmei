function arrayTreeFilter(e, r, t) {
    (t = t || {}).childrenKeyName = t.childrenKeyName || "children";
    var a = e || [], l = [], i = 0;
    do {
        var d = a.filter(function(e) {
            return r(e, i);
        })[0];
        if (!d) break;
        l.push(d), a = d[t.childrenKeyName] || [], i += 1;
    } while (0 < a.length);
    return l;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _default = arrayTreeFilter;

exports.default = _default;