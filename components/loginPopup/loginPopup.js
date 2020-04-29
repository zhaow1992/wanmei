var app = getApp();

Component({
    properties: {},
    data: {
        wrapAnimateMajor: "",
        bgOpacityMajor: 0,
        showPopupFlag: false,
        bargainGetStatus: "",
        popupAnimateMajor: ""
    },
    methods: {
        _showTap: function _showTap() {
            this.setData({
                wrapAnimateMajor: "wrapAnimate",
                bgOpacityMajor: 0,
                showPopupFlag: true,
                popupAnimateMajor: "popupAnimate"
            });
        },
        _hideTap: function _hideTap() {
            var that = this;
            this.setData({
                wrapAnimateMajor: "wrapAnimateOut",
                bgOpacityMajor: 0,
                popupAnimateMajor: "popupAnimateOut"
            });
            setTimeout(function() {
                that.setData({
                    showPopupFlag: false
                });
            }, 200);
        },
        login: function login() {
            app.globalData.initLogin = true;
            wx.reLaunch({
                url: "/pages/index/index"
            });
        }
    }
});