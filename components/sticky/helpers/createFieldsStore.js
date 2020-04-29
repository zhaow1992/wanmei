function _objectSpread(t) {
    for (var e = 1; e < arguments.length; e++) {
        if (e % 2) {
            var r = null != arguments[e] ? arguments[e] : {}, i = Object.keys(r);
            "function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(r).filter(function(e) {
                return Object.getOwnPropertyDescriptor(r, e).enumerable;
            }))), i.forEach(function(e) {
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

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(e, t) {
    for (var r = 0; r < t.length; r++) {
        var i = t[r];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
        Object.defineProperty(e, i.key, i);
    }
}

function _createClass(e, t, r) {
    return t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = createFieldsStore;

var FieldsStore = function() {
    function t() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        _classCallCheck(this, t), this.fields = e;
    }
    return _createClass(t, [ {
        key: "setFields",
        value: function value(e) {
            Object.assign(this.fields, e);
        }
    }, {
        key: "updateFields",
        value: function value(e) {
            this.fields = e;
        }
    }, {
        key: "clearField",
        value: function value(e) {
            delete this.fields[e];
        }
    }, {
        key: "getValueFromFields",
        value: function value(e, t) {
            var r = t[e];
            return r && "value" in r ? r.value : r.initialValue;
        }
    }, {
        key: "getAllFieldsName",
        value: function value() {
            var e = this.fields;
            return e ? Object.keys(e) : [];
        }
    }, {
        key: "getField",
        value: function value(e) {
            return _objectSpread({}, this.fields[e], {
                name: e
            });
        }
    }, {
        key: "getFieldValuePropValue",
        value: function value(e) {
            var t = e.name, r = e.valuePropName, i = this.getField(t);
            return _defineProperty({}, r, "value" in i ? i.value : i.initialValue);
        }
    }, {
        key: "getFieldValue",
        value: function value(e) {
            return this.getValueFromFields(e, this.fields);
        }
    }, {
        key: "getFieldsValue",
        value: function value(e) {
            var r = this;
            return (e || this.getAllFieldsName()).reduce(function(e, t) {
                return e[t] = r.getFieldValue(t), e;
            }, {});
        }
    }, {
        key: "resetFields",
        value: function value(e) {
            var i = this.fields;
            return (e || this.getAllFieldsName()).reduce(function(e, t) {
                var r = i[t];
                return r && (e[t] = r.initialValue), e;
            }, {});
        }
    } ]), t;
}();

function createFieldsStore(e) {
    return new FieldsStore(e);
}