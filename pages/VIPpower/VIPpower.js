var _api = require("../../utils/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var app = getApp();

var timer = void 0;

Page({
    data: {
        payBtnText: app.globalData.payBtnText,
        isIos: false,
        mobile: true,
        //是否绑定手机
        applyCardTime: 180,
        //申请倒计时
        banApplyCard: false,
        //禁用
        applyCardLoading: false
    },
    onUnload: function onUnload() {
        clearInterval(timer);
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
    },
    goBindCard: function goBindCard() {
        wx.navigateTo({
            url: "/pages/card/card"
        });
    },
    applyCard: function applyCard() {
        var that = this;
        that.setData({
            applyCardLoading: true,
            applyCardTime: 180
        });
        var userNumId = wx.getStorageSync("userInfo")[0].UserId;
        var domain = app.globalData.domain;
        //记得改  qa-ch5.wmei.cn
                _api2.default.ApplyMWebPay("Users/ApplyMWebPay", "POST", userNumId, domain).then(function(res) {
            if (res.isSuccess) {
                app.globalData.applyCardFlag = true;
                that.setData({
                    applyCardLoading: false,
                    banApplyCard: true
                }, function() {
                    that.applyPopup();
                    timer = setInterval(function() {
                        //倒计时
                        var applyCardTime = that.data.applyCardTime - 1;
                        if (applyCardTime <= 0) {
                            that.setData({
                                banApplyCard: false
                            });
                            clearInterval(timer);
                        } else {
                            that.setData({
                                applyCardTime: applyCardTime
                            });
                        }
                    }, 1e3);
                });
            } else {
                that.setData({
                    applyCardLoading: false
                });
                wx.showToast({
                    title: res.message,
                    icon: "none"
                });
            }
        });
    },
    // 申请会员卡弹框
    applyPopup: function applyPopup() {
        this.selectComponent("#hide")._showTap();
    },
    hideTapIndex: function hideTapIndex() {
        var that = this;
        that.selectComponent("#hide").hidePopupFunc();
    },
    onPullDownRefresh: function onPullDownRefresh() {
        //下拉加载
        var that = this;
        if (app.globalData.applyCardFlag) {
            var userInfo = wx.getStorageSync("userInfo");
            _api2.default.GetPermission("Users/GetPermission", "POST", userInfo[0].MobilePhone).then(function(res) {
                if (res.isSuccess) {
                    var _userInfo = wx.getStorageSync("userInfo");
                    _userInfo[0].UserType = res.result.userPermissionId;
                    wx.setStorageSync("userInfo", _userInfo);
                    if (res.result.userPermissionId > 1) {
                        app.globalData.applyCardFlag = false;
                        wx.navigateBack({
                            detal: 1
                        });
                    }
                }
                wx.stopPullDownRefresh();
            });
        } else {
            wx.stopPullDownRefresh();
        }
    }
});