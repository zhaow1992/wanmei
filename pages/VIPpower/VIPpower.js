var app = getApp();

Page({
    data: {
        payBtnText: app.globalData.payBtnText,
        isIos: false,
        mobile: true
    },
    payBtn: function payBtn() {
        if (app.globalData.system == "ios") {
            app.payPrompt();
        } else {
            wx.navigateTo({
                url: "/packages/paySystem/memberCardDetail/memberCardDetail"
            });
        }
    },
    mobileBtn: function mobileBtn() {
        wx.navigateTo({
            url: "/packages/userSystem/bindMobile/bindMobile"
        });
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll("开通VIP", true);
        if (app.globalData.system == "ios") {
            that.setData({
                isIos: true
            });
        } else {
            that.setData({
                isIos: false
            });
        }
        try {
            var userInfo = wx.getStorageSync("userInfo");
            if (userInfo) {
                if (userInfo[0].MobilePhone) {
                    that.setData({
                        mobile: false
                    });
                }
            }
        } catch (e) {}
    },
    noPay: function noPay() {
        app.payPrompt();
    }
});