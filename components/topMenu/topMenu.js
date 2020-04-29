var app = getApp();

Component({
    properties: {
        top: {
            type: String,
            value: app.globalData.navigationCustomStatusHeight + app.globalData.navigationCustomCapsuleHeight + 100
        },
        type: {
            type: String,
            value: ""
        }
    },
    data: {
        flag: true,
        wrapAnimate: "wrapAnimate",
        bgOpacity: 0,
        menuAnimate: "menuAnimate"
    },
    methods: {
        hideMenu: function hideMenu(e) {
            var that = this;
            that.setData({
                wrapAnimate: "wrapAnimateOut",
                menuAnimate: "menuAnimateOut"
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
        _hideEvent: function _hideEvent(e) {
            this.triggerEvent("hideEvent", e.currentTarget.dataset.type);
        }
    }
});