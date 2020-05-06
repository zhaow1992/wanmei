var app = getApp();

Component({
    properties: {
        top: {
            type: String,
            value: app.globalData.navigationCustomStatusHeight + app.globalData.navigationCustomCapsuleHeight
        },
        type: {
            type: String,
            value: ""
        }
    },
    data: {
        bgOpacity: 0,
        top: app.globalData.navigationCustomStatusHeight + app.globalData.navigationCustomCapsuleHeight + 100
    },
    methods: {
        showMenu: function showMenu() {
            this.setData({
                flag: true,
                wrapAnimate: "wrapAnimate",
                menuAnimate: "menuAnimate"
            });
        },
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