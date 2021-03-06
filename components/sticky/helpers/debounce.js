function debounce(t, n, u) {
    function r() {
        var e = +new Date() - i;
        e < n && 0 <= e ? l = setTimeout(r, n - e) : (l = null, u || (s = t.apply(a, o), 
        l || (o = a = null)));
    }
    var l, o, a, i, s;
    return function() {
        a = this, o = arguments, i = +new Date();
        var e = u && !l;
        return l = l || setTimeout(r, n), e && (s = t.apply(a, o), o = a = null), s;
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = debounce;