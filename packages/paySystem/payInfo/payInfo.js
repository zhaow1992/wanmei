var app = getApp();

Page({
    data: {
        agree: true,
        payFail: false,
        //支付失败
        statusBarHeight: app.globalData.statusBarHeight,
        barHeight: app.globalData.barHeight,
        sendCodeText: "发送验证码",
        showyanzheng: true,
        time: 60,
        mobile: "",
        popup: {
            bgOpacity: 0,
            wrapAnimate: "",
            popupAnimate: "",
            flag: ""
        }
    },
    onLoad: function onLoad() {},
    // 发送验证码
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
    // 输入手机号
    getMobile: function getMobile(e) {
        this.setData({
            mobile: e.detail.value
        });
    },
    showPopup: function showPopup() {
        var that = this;
        that.setData({
            "popup.bgOpacity": 0,
            "popup.wrapAnimate": "wrapAnimate",
            "popup.popupAnimate": "popupAnimate",
            "popup.flag": true
        });
    },
    hidePopup: function hidePopup() {
        var that = this;
        that.setData({
            "popup.bgOpacity": .4,
            "popup.wrapAnimate": "wrapAnimateOut",
            "popup.popupAnimate": "popupAnimateOut"
        });
        setTimeout(function() {
            that.setData({
                "popup.flag": false
            });
        }, 200);
    },
    // 退出
    goBack: function goBack() {
        this.showPopup();
    },
    // 退出选择
    goBackChoose: function goBackChoose(e) {
        var that = this;
        var choosetype = e.currentTarget.dataset.choosetype;
        switch (parseInt(choosetype)) {
          //1 要意见反馈
            case 1:
            that.hidePopup();
            wx.navigateBack({
                delta: 1
            });
            break;

          case 2:
            that.hidePopup();
            wx.navigateBack({
                delta: 1
            });
            break;

          case 3:
            that.hidePopup();
            break;
        }
    },
    goPayDetail: function goPayDetail() {
        this.setData({
            payFail: true
        });
    },
    // 继续支付
    continuePay: function continuePay() {
        this.setData({
            payFail: false
        });
    },
    // 关闭支付
    closePay: function closePay() {
        this.showPopup();
    },
    chooseAgree: function chooseAgree() {
        this.setData({
            agree: !this.data.agree
        });
    }
});