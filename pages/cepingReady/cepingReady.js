var api = require("../../utils/api.js");

Page({
    data: {
        showLoad: true,
        reportnum: 0,
        sexFlag: false,
        intropicurl: "",
        cepingtype: "",
        title: "",
        reporturl: "",
        haveBaoGao: false,
        typeImg: "",
        sexPopup: {
            bgOpacity: 0,
            wrapAnimate: "",
            popupAnimate: "",
            sexFlag: ""
        }
    },
    showSexPopup: function showSexPopup() {
        var sex = wx.getStorageSync("sex");
        if (sex != 6) {
            wx.navigateTo({
                url: "/packages/evaluation/evaluationStart/evaluationStart?sex=" + sex + "&ispatriarch=false"
            });
            this.hidespPopup();
        } else {
            var that = this;
            that.setData({
                "sexPopup.bgOpacity": 0,
                "sexPopup.wrapAnimate": "wrapAnimate",
                "sexPopup.popupAnimate": "popupAnimate",
                "sexPopup.sexFlag": true
            });
        }
    },
    hideSexPopup: function hideSexPopup() {
        var that = this;
        that.setData({
            "sexPopup.bgOpacity": .4,
            "sexPopup.wrapAnimate": "wrapAnimateOut",
            "sexPopup.popupAnimate": "popupAnimateOut"
        });
        setTimeout(function() {
            that.setData({
                "sexPopup.sexFlag": false
            });
        }, 200);
    },
    onLoad: function onLoad(options) {
        var that = this;
        if (options && options.type == 1) {
            this.setData({
                typeImg: "/image/ceping/zwkz.png"
            });
        } else if (options && options.type == 2) {
            this.setData({
                typeImg: "/image/ceping/xxdj.png"
            });
        } else if (options && options.type == 3) {
            this.setData({
                typeImg: "/image/ceping/ksxl.png"
            });
        } else if (options && options.type == 4) {
            this.setData({
                typeImg: "/image/ceping/xxnl.png"
            });
        } else if (options && options.type == 5) {
            this.setData({
                typeImg: "/image/ceping/xyty.png"
            });
        } else if (options && options.type == 6) {
            this.setData({
                typeImg: "/image/ceping/jtjy.png"
            });
        } else if (options && options.type == 7) {
            this.setData({
                typeImg: "/image/ceping/yyzs.png"
            });
        }
        if (options && options.type) {
            var userId = wx.getStorageSync("userInfo")[0].UserId;
            this.setData({
                userId: userId,
                cepingtype: options.type
            });
            this.getTestDetail(userId, options.type);
        }
    },
    getTestDetail: function getTestDetail(userId, type) {
        var that = this;
        api.getTestDetail("Evaluation/GetE360Info", "POST", userId, type).then(function(res) {
            if (res.isSuccess) {
                that.setData({
                    testInfo: res.result,
                    showLoad: false
                });
            }
        });
    },
    onShow: function onShow() {
        this.getTestDetail(this.data.userId, this.data.cepingtype);
    },
    cepingBtn: function cepingBtn() {
        var that = this;
        var cepingtype = this.data.cepingtype;
        var title = this.data.title;
        if (cepingtype < 7) {
            try {
                var sex = wx.getStorageSync("sex");
                if (sex == 6) {
                    that.showSexPopup();
                } else {
                    wx.navigateTo({
                        url: "../cepingQuestion/cepingQuestion?type=" + cepingtype + "&name=" + that.data.testInfo.name
                    });
                }
            } catch (e) {}
        } else {
            wx.navigateTo({
                url: "../cepingQuestion/cepingQuestion?type=" + cepingtype + "&name=" + that.data.testInfo.name
            });
        }
    },
    cepingBaoGao: function cepingBaoGao(e) {
        var that = this;
        var reporturl = that.data.reporturl;
        var cepingtype = that.data.cepingtype;
        if (cepingtype <= 6) {
            wx.navigateTo({
                url: "../cepingReadyList/cepingReadyList?type=" + cepingtype + "&navigationName=" + that.navigationName
            });
        } else {
            wx.navigateTo({
                url: "../majorCeping/majorCeping?type=" + cepingtype
            });
        }
    },
    wrapTap: function wrapTap() {
        this.setData({
            sexFlag: false
        });
    },
    chooseSex: function chooseSex(e) {
        var that = this;
        that.hideSexPopup();
        this.updateBasicInfo(e.currentTarget.dataset.sex);
        wx.setStorageSync("sex", e.currentTarget.dataset.sex);
        wx.navigateTo({
            url: "../cepingQuestion/cepingQuestion?type=" + that.data.cepingtype + "&name=" + that.data.testInfo.name
        });
    },
    //完善用户信息 （id 和 性别）
    updateBasicInfo: function updateBasicInfo(sex) {
        var userInfo = wx.getStorageSync("userInfo");
        var parameter = {
            id: userInfo[0].id,
            provinceNumId: 0,
            cityNumId: 0,
            countyNumId: 0,
            schoolNumId: userInfo[0].SchoolId || 0,
            schoolName: userInfo[0].schoolName,
            gkYear: 0,
            realName: "",
            sex: sex,
            courseType: -1,
            class: ""
        };
        api.updateBasicInfo("Users/updateBasicInfo", "POST", parameter).then(function(res) {
            userInfo[0].gender = res.result.gender;
            wx.setStorage({
                key: "userInfo",
                data: userInfo,
                success: function success(r) {}
            });
        });
    },
    noBaoGaoFlag: function noBaoGaoFlag() {
        wx.showToast({
            title: "您还没有历史报告，请前往测评",
            icon: "none",
            duration: 2e3
        });
    }
});