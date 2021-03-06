Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _isEmpty = _interopRequireDefault(require("./isEmpty")), _shallowEqual = _interopRequireDefault(require("./shallowEqual"));

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _toConsumableArray(e) {
    return _arrayWithoutHoles(e) || _iterableToArray(e) || _nonIterableSpread();
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(e) {
    if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
}

function _arrayWithoutHoles(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = new Array(e.length); t < e.length; t++) {
            r[t] = e[t];
        }
        return r;
    }
}

function _objectSpread(t) {
    for (var e = 1; e < arguments.length; e++) {
        if (e % 2) {
            var r = null != arguments[e] ? arguments[e] : {}, n = Object.keys(r);
            "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(e) {
                return Object.getOwnPropertyDescriptor(r, e).enumerable;
            }))), n.forEach(function(e) {
                _defineProperty(t, e, r[e]);
            });
        } else Object.defineProperties(t, Object.getOwnPropertyDescriptors(arguments[e]));
    }
    return t;
}

function _defineProperty(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

function _slicedToArray(e, t) {
    return _arrayWithHoles(e) || _iterableToArrayLimit(e, t) || _nonIterableRest();
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(e, t) {
    var r = [], n = !0, o = !1, i = void 0;
    try {
        for (var a, u = e[Symbol.iterator](); !(n = (a = u.next()).done) && (r.push(a.value), 
        !t || r.length !== t); n = !0) {}
    } catch (e) {
        o = !0, i = e;
    } finally {
        try {
            n || null == u.return || u.return();
        } finally {
            if (o) throw i;
        }
    }
    return r;
}

function _arrayWithHoles(e) {
    if (Array.isArray(e)) return e;
}

var ALL_DATA_KEY = "**", trim = function trim(e) {
    return (0 < arguments.length && void 0 !== e ? e : "").replace(/\s/g, "");
}, _default = Behavior({
    lifetimes: {
        attached: function attached() {
            this.initComputed();
        }
    },
    definitionFilter: function definitionFilter(e) {
        var t = e.computed, n = void 0 === t ? {} : t, a = Object.keys(n).reduce(function(e, i) {
            var t = _slicedToArray(Array.isArray(n[i]) ? n[i] : [ ALL_DATA_KEY, n[i] ], 2), r = t[0], a = t[1];
            return _objectSpread({}, e, _defineProperty({}, r, function() {
                if ("function" == typeof a) {
                    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) {
                        t[r] = arguments[r];
                    }
                    var n = a.apply(this, t), o = this.data[i];
                    (0, _isEmpty.default)(n) || (0, _shallowEqual.default)(n, o) || this.setData(_defineProperty({}, i, n));
                }
            }));
        }, {});
        Object.assign(e.observers = e.observers || {}, a), Object.assign(e.methods = e.methods || {}, {
            initComputed: function initComputed(e, t) {
                var r = 0 < arguments.length && void 0 !== e ? e : {}, n = 1 < arguments.length && void 0 !== t && t;
                if (!this.runInitComputed || n) {
                    this.runInitComputed = !1;
                    var o = this, i = _objectSpread({}, this.data, {}, r);
                    Object.keys(a).forEach(function(e) {
                        var t = trim(e).split(",").reduce(function(e, t) {
                            return [].concat(_toConsumableArray(e), [ i[t] ]);
                        }, []);
                        a[e].apply(o, t);
                    }), this.runInitComputed = !0;
                }
            }
        });
    }
});

exports.default = _default;