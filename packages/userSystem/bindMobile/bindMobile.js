var api = require("./../api.js");

var app = getApp();

Page({
    data: {
        sendCodeText: "发送验证码",
        showyanzheng: true,
        time: 60,
        mobile: "",
        code: ""
    },
    // 输入手机号
    getMobile: function getMobile(e) {
        this.setData({
            mobile: e.detail.value
        });
    },
    // 发送验证码
    SendSMS: function SendSMS(mobile) {
        api.SendSMS("Users/SMS/Send", "POST", mobile).then(function(res) {
            if (res.isSuccess == true) {
                wx.showToast({
                    title: "发送成功",
                    image: "none",
                    duration: 2e3
                });
            } else {
                wx.showToast({
                    title: res.message,
                    image: "none",
                    duration: 2e3
                });
            }
        });
    },
    // 点击验证码
    sendCode: function sendCode(e) {
        var that = this;
        var mobile = that.data.mobile;
        if (mobile.length == 0) {
            wx.showToast({
                title: "请输入手机号",
                image: "none",
                duration: 2e3
            });
        } else {
            if (/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(mobile)) {
                that.SendSMS(mobile);
                that.setData({
                    showyanzheng: !that.data.showyanzheng
                });
                var times = setInterval(function() {
                    that.setData({
                        time: that.data.time - 1
                    });
                    if (that.data.time == 0) {
                        that.setData({
                            sendCodeText: "重新发送验证码",
                            showyanzheng: !that.data.showyanzheng,
                            time: 60
                        });
                        clearInterval(times);
                    }
                }, 1e3);
            } else {
                wx.showToast({
                    title: "请输入正确手机号",
                    image: "none",
                    duration: 2e3
                });
            }
        }
    },
    // 输入验证码
    getCode: function getCode(e) {
        this.setData({
            code: e.detail.value
        });
    },
    // 绑定手机
    bindMobileBtn: function bindMobileBtn() {
        var that = this;
        var mobile = that.data.mobile;
        var code = that.data.code;
        var openId = app.globalData.userInfo.openid;
        var nickName = app.globalData.userInfo.nickName;
        var avatarUrl = app.globalData.userInfo.avatarUrl;
        var device = app.globalData.device.system;
        if (mobile.length != 11) {
            wx.showToast({
                title: "请填写完整手机号",
                icon: "none",
                duration: 2e3
            });
        } else if (code.length != 4) {
            wx.showToast({
                title: "请填写完整验证码",
                icon: "none",
                duration: 2e3
            });
        } else {
            wx.showLoading({
                title: "信息同步中",
                mask: true
            });
            api.BindMobile("Users/Socials/BindMobile", "POST", openId, mobile, code, nickName, avatarUrl, device).then(function(res) {
                if (res.isSuccess == true) {} else {
                    wx.hideLoading();
                    wx.showToast({
                        title: res.message,
                        icon: "none",
                        duration: 2e3
                    });
                }
            });
        }
    }
});