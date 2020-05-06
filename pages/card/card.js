var api = require("../../utils/api.js");

var sensors = require("./../../utils/sensors.js");

var app = getApp();

Page({
    data: {
        isIOS: false,
        btnCheckedFlag: false,
        wrapAnimate: false,
        findCard: false,
        focus1: true,
        focus2: false,
        cardNameFlag: false,
        cardPasswordFlag: false,
        color: null,
        Telephone: "",
        cardName: "",
        cardPassword: "",
        mobile: "",
        show1: false,
        show2: false,
        userInfo: []
    },
    windowCloseTap: function windowCloseTap() {
        var that = this;
        that.setData({
            findCard: false,
            wrapAnimate: "wrapAnimateOut"
        });
    },
    findCardTap: function findCardTap() {
        var that = this;
        that.setData({
            findCard: true,
            wrapAnimate: "wrapAnimate"
        });
    },
    buyCardTap: function buyCardTap() {
        var that = this;
        wx.redirectTo({
            url: "/packages/paySystem/memberCardDetail/memberCardDetail"
        });
    },
    onLoad: function onLoad(options) {
        var that = this;
        if (app.globalData.system == "ios") {
            that.setData({
                isIOS: true
            });
        }
        try {
            var userInfo = wx.getStorageSync("userInfo");
            that.selectComponent("#navigationcustom").setNavigationAll("激活会员卡", true);
            if (userInfo) {
                that.setData({
                    userInfo: userInfo
                });
                if (userInfo[0].MobilePhone == "") {} else {
                    var mobile = userInfo[0].MobilePhone;
                    mobile = mobile.replace(mobile.substring(3, 7), "****");
                    that.setData({
                        mobile: mobile
                    });
                }
            }
        } catch (e) {}
    },
    undapeCard: function undapeCard() {
        wx.showNavigationBarLoading();
        var that = this;
        that.setData({
            btnCheckedFlag: true
        });
        var CardNo = that.data.cardName;
        var CardPassword = that.data.cardPassword;
        var UserId = that.data.userInfo[0].id;
        var sourceSign = app.globalData.system;
        api.bindCard("Users/UserBindCard", "POST", CardNo, CardPassword, UserId, sourceSign).then(function(res) {
            wx.hideNavigationBarLoading();
            var data = {
                CardNo: CardNo,
                UserId: UserId
            };
            app.sensors.track("CardActResult", sensors.CardActResult(data, res.isSuccess, res.message));
            if (res.isSuccess) {
                that.getUserBrief(that.data.userInfo[0].UserId, true);
            } else {
                that.setData({
                    btnCheckedFlag: false
                });
                wx.showToast({
                    title: res.message,
                    icon: "none"
                });
            }
        });
    },
    cardhao: function cardhao(e) {
        var that = this;
        that.setData({
            cardName: e.detail.value
        });
        if (e.detail.value.length > 0) {
            that.setData({
                show1: true
            });
        } else {
            that.setData({
                show1: false
            });
        }
    },
    pressword: function pressword(e) {
        var that = this;
        that.setData({
            cardPassword: e.detail.value
        });
        if (e.detail.value.length > 0) {
            that.setData({
                show2: true
            });
        } else {
            that.setData({
                show2: false
            });
        }
    },
    photoCall: function photoCall() {
        wx.makePhoneCall({
            phoneNumber: "800-767-8888"
        });
    },
    focusInput: function focusInput(e) {
        var that = this;
        if (e.target.dataset.id == "1") {
            that.setData({
                cardNameFlag: true
            });
        } else if (e.target.dataset.id == "2") {
            that.setData({
                cardPasswordFlag: true
            });
        }
    },
    blurInput: function blurInput(e) {
        var that = this;
        if (e.target.dataset.id == "1") {
            that.setData({
                cardNameFlag: false
            });
        } else if (e.target.dataset.id == "2") {
            that.setData({
                cardPasswordFlag: false
            });
        }
    },
    detailValue: function detailValue(e) {
        var that = this;
        if (e.currentTarget.dataset.id == "1") {
            that.setData({
                cardName: "",
                focus1: true
            });
        } else if (e.currentTarget.dataset.id == "2") {
            that.setData({
                cardPassword: "",
                focus2: true
            });
        }
    },
    //获取用户信息
    getUserBrief: function getUserBrief(UserId, isFillAreaName) {
        var that = this;
        api.getUserBrief("Users/GetBrief", "POST", UserId, isFillAreaName).then(function(res) {
            if (res.isSuccess) {
                var userArr = [];
                var result = res.result;
                userArr.push({
                    secretName: result.secretName || null,
                    MobilePhone: result.mobilePhone || null,
                    id: result.id,
                    //改
                    userName: result.numId || null,
                    UserId: result.numId || null,
                    //改
                    avatarUrl: result.avatarUrl || null,
                    gender: result.gender,
                    Province: result.provinceId || null,
                    ProvinceName: result.provinceName || null,
                    City: result.cityId || null,
                    courseType: result.courseType,
                    County: result.countyName || null,
                    UserType: result.userPermissionId || null,
                    SchoolId: result.schoolId || 0,
                    schoolName: result.schoolName || "",
                    GKYear: result.gkYear || null,
                    identityExpirationTime: result.identityExpirationTime || null,
                    userPermissionExpiryTime: result.userPermissionExpiryTime || null,
                    electiveExpiryTime: result.electiveExpiryTime || null,
                    ziZhuExpiryTime: result.ziZhuExpiryTime || null,
                    isTiyan: result.isTiyan
                });
                //设定用户信息缓存
                                wx.setStorageSync("userInfo", userArr);
                that.setData({
                    btnCheckedFlag: false
                });
                wx.showToast({
                    title: "会员卡已激活",
                    icon: "none"
                });
                wx.navigateBack({
                    detal: 1
                });
            } else {}
        });
    }
});