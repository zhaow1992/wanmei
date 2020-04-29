var _Component;

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

Component((_Component = {
    properties: {},
    data: {
        flag: false,
        wrapAnimate: "",
        bgOpacity: 0,
        frameAnimate: ""
    }
}, _defineProperty(_Component, "properties", {
    frameTitle: {
        type: String,
        value: "标题"
    }
}), _defineProperty(_Component, "methods", {
    catchMove: function catchMove() {},
    showFrame: function showFrame() {
        this.setData({
            flag: true,
            wrapAnimate: "wrapAnimate",
            frameAnimate: "frameAnimate"
        });
    },
    hideFrame: function hideFrame() {
        var that = this;
        that.setData({
            wrapAnimate: "wrapAnimateOut",
            frameAnimate: "frameAnimateOut"
        });
        setTimeout(function() {
            that.setData({
                flag: false
            });
        }, 400);
    },
    catchNone: function catchNone() {
        //阻止冒泡
    },
    _showEvent: function _showEvent() {
        this.triggerEvent("showEvent");
    },
    _hideEvent: function _hideEvent() {
        this.triggerEvent("hideEvent");
    }
}), _Component));