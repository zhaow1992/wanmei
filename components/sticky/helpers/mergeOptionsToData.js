Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var mergeOptionsToData = function mergeOptionsToData(e) {
    var t = 0 < arguments.length && void 0 !== e ? e : {}, o = Object.assign({}, t);
    for (var r in o) {
        o.hasOwnProperty(r) && "function" == typeof o[r] && delete o[r];
    }
    return o;
}, _default = mergeOptionsToData;

exports.default = _default;