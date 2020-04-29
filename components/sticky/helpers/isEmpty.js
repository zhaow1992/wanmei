var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(t) {
        return typeof t === "undefined" ? "undefined" : _typeof2(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t === "undefined" ? "undefined" : _typeof2(t);
    })(t);
}

function isEmpty(t) {
    if (Array.isArray(t)) return 0 === t.length;
    if ("object" !== _typeof(t)) return !t;
    if (t) for (var e in t) {
        return !1;
    }
    return !0;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var _default = isEmpty;

exports.default = _default;