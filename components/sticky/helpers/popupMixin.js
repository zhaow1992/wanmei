Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = popupMixin;

var _classNames3 = _interopRequireDefault(require("./classNames")), _eventsMixin = _interopRequireDefault(require("./eventsMixin"));

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _objectSpread(t) {
    for (var e = 1; e < arguments.length; e++) {
        if (e % 2) {
            var i = null != arguments[e] ? arguments[e] : {}, n = Object.keys(i);
            "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter(function(e) {
                return Object.getOwnPropertyDescriptor(i, e).enumerable;
            }))), n.forEach(function(e) {
                _defineProperty(t, e, i[e]);
            });
        } else Object.defineProperties(t, Object.getOwnPropertyDescriptors(arguments[e]));
    }
    return t;
}

function _defineProperty(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

var DEFAULT_TRIGGER = "onClick", CELL_NAME = "../cell/index", FIELD_NAME = "../field/index", defaultToolbar = {
    title: "请选择",
    cancelText: "取消",
    confirmText: "确定"
}, defaultEvents = {
    onChange: function onChange() {},
    onConfirm: function onConfirm() {},
    onCancel: function onCancel() {},
    onVisibleChange: function onVisibleChange() {},
    onValueChange: function onValueChange() {}
}, defaultPlatformProps = {
    labelPropName: "label",
    format: function format(e, t) {
        return Array.isArray(e.displayValue) ? e.displayValue.join(",") : e.displayValue;
    }
};

function popupMixin() {
    var i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#wux-picker", t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : defaultPlatformProps;
    return Behavior({
        behaviors: [ (0, _eventsMixin.default)({
            defaultEvents: defaultEvents
        }) ],
        properties: {
            toolbar: {
                type: Object,
                value: defaultToolbar
            },
            trigger: {
                type: String,
                value: DEFAULT_TRIGGER
            },
            defaultVisible: {
                type: Boolean,
                value: !1
            },
            visible: {
                type: Boolean,
                value: !1
            },
            controlled: {
                type: Boolean,
                value: !1
            },
            disabled: {
                type: Boolean,
                value: !1
            }
        },
        data: {
            mounted: !1,
            popupVisible: !1,
            inputValue: []
        },
        methods: {
            setVisibleState: function setVisibleState(t, e) {
                var i = this, n = 1 < arguments.length && void 0 !== e ? e : function() {};
                if (this.data.popupVisible !== t) {
                    var a = {
                        mounted: !0,
                        inputValue: this.data.value,
                        popupVisible: t
                    };
                    this.setData(t ? a : {
                        popupVisible: t
                    }, function() {
                        if (t && i.hasFieldDecorator) {
                            var e = i.getFieldElem();
                            e && e.changeValue(e.data.value);
                        }
                        n();
                    });
                }
            },
            fireVisibleChange: function fireVisibleChange(e) {
                this.data.popupVisible !== e && (this.data.controlled || this.setVisibleState(e), 
                this.setScrollValue(void 0), this.triggerEvent("visibleChange", {
                    visible: e
                }));
            },
            open: function open() {
                this.fireVisibleChange(!0);
            },
            close: function close(e) {
                if ("function" == typeof e) {
                    var t = this.getPickerValue(this.scrollValue || this.data.inputValue);
                    e.call(this, this.formatPickerValue(t));
                }
                this.fireVisibleChange(!1);
            },
            onClosed: function onClosed() {
                this.picker = null, this.setData({
                    mounted: !1,
                    inputValue: null
                });
            },
            onConfirm: function onConfirm() {
                var t = this;
                this.close(function(e) {
                    t.triggerEvent("change", e), t.triggerEvent("confirm", e);
                });
            },
            onCancel: function onCancel() {
                var t = this;
                this.close(function(e) {
                    return t.triggerEvent("cancel", e);
                });
            },
            onValueChange: function onValueChange(e) {
                if (this.data.mounted) {
                    var t = e.detail.value;
                    this.data.cascade ? this.setCasecadeScrollValue(t) : this.setScrollValue(t), this.updated(t, !0), 
                    this.triggerEvent("valueChange", this.formatPickerValue(e.detail));
                }
            },
            getPickerValue: function getPickerValue(e) {
                var t = 0 < arguments.length && void 0 !== e ? e : this.data.inputValue;
                return this.picker = this.picker || this.selectComponent(i), this.picker && this.picker.getValue(t);
            },
            formatPickerValue: function formatPickerValue(e) {
                return _objectSpread({}, e, _defineProperty({}, t.labelPropName, t.format(e, this.data)));
            },
            getFieldElem: function getFieldElem() {
                return this.field = this.field || this.getRelationNodes(FIELD_NAME)[0];
            },
            setChildProps: function setChildProps() {
                var n = this;
                if (!this.data.disabled) {
                    var e = this.getRelationNodes(CELL_NAME), t = this.data.trigger, a = void 0 === t ? DEFAULT_TRIGGER : t;
                    0 < e.length && e.forEach(function(e) {
                        var t = e.data.inputEvents, i = e.data.oriInputEvents || _objectSpread({}, t);
                        t[a] = function() {
                            i && i[a] && i[a].apply(i, arguments), n.onTriggerClick();
                        }, e.setData({
                            oriInputEvents: i,
                            inputEvents: t
                        });
                    });
                }
            },
            onTriggerClick: function onTriggerClick() {
                this.fireVisibleChange(!this.data.popupVisible);
            },
            noop: function noop() {},
            updated: function updated(e, t) {
                this.hasFieldDecorator && !t || this.data.inputValue !== e && this.setData({
                    inputValue: e
                });
            },
            setScrollValue: function setScrollValue(e) {
                this.scrollValue = e;
            },
            setCasecadeScrollValue: function setCasecadeScrollValue(e) {
                if (e && this.scrollValue) {
                    var t = this.scrollValue.length;
                    if (t === e.length && this.scrollValue[t - 1] === e[t - 1]) return;
                }
                this.setScrollValue(e);
            }
        },
        lifetimes: {
            ready: function ready() {
                var e = this.data, t = e.defaultVisible, i = e.visible, n = e.controlled, a = (e.value, 
                n ? i : t);
                this.mounted = !0, this.scrollValue = void 0, this.setVisibleState(a), this.setChildProps();
            },
            detached: function detached() {
                this.mounted = !1;
            }
        },
        definitionFilter: function definitionFilter(e) {
            var t;
            Object.assign(e.relations = e.relations || {}, (_defineProperty(t = {}, CELL_NAME, {
                type: "child",
                observer: function observer() {
                    this.setChildProps();
                }
            }), _defineProperty(t, FIELD_NAME, {
                type: "ancestor"
            }), t)), Object.assign(e.computed = e.computed || {}, {
                classes: [ "prefixCls", function(e) {
                    return {
                        wrap: (0, _classNames3.default)(e),
                        toolbar: "".concat(e, "__toolbar"),
                        inner: "".concat(e, "__inner"),
                        cancel: (0, _classNames3.default)("".concat(e, "__button"), _defineProperty({}, "".concat(e, "__button--cancel"), !0)),
                        confirm: (0, _classNames3.default)("".concat(e, "__button"), _defineProperty({}, "".concat(e, "__button--confirm"), !0)),
                        hover: "".concat(e, "__button--hover"),
                        title: "".concat(e, "__title")
                    };
                } ]
            }), Object.assign(e.observers = e.observers || {}, {
                visible: function visible(e) {
                    this.data.controlled && this.setVisibleState(e);
                },
                value: function value(e) {
                    this.updated(e);
                }
            });
        }
    });
}