var api = require("./../api.js");

var app = getApp();

Page({
    data: {
        share: false,
        showLoad: true,
        oneClick: false
    },
    goSelectGaoKaoYear: function goSelectGaoKaoYear(e) {
        var yearArr = JSON.stringify(e.currentTarget.dataset.year);
        var provinceId = e.currentTarget.dataset.id;
        var type = e.currentTarget.dataset.type;
        app.globalData.chooseSubject.provinceId = provinceId;
        app.globalData.chooseSubject.provinceType = type;
        if (!app.checkOnce(this, "oneClick")) return;
        wx.setStorageSync("chooseSubjectInfo", {
            provinceId: provinceId,
            year: 0,
            provinceType: type
        });
        if (this.share) {
            wx.redirectTo({
                url: "../GaoKaoYear/GaoKaoYear?year=" + yearArr + "&share=true"
            });
        } else {
            wx.redirectTo({
                url: "../GaoKaoYear/GaoKaoYear?year=" + yearArr
            });
        }
    },
    getSubjectsProvince: function getSubjectsProvince() {
        var that = this;
        api.getSubjectsProvince("Admin/TZY/ChooseSubject/GetConfig", "POST").then(function(res) {
            if (res.isSuccess) {
                res.result.forEach(function(ele) {
                    if (ele.provinceName == "河北" || ele.provinceName == "湖南") {
                        ele.isNew = true;
                    }
                });
                that.setData({
                    provinceList: res.result
                });
                wx.setStorageSync("chooseSubProvinceList", res.result);
            }
            that.setData({
                showLoad: false
            });
        });
    },
    onLoad: function onLoad(options) {
        this.share = false;
        if (options && options.share) {
            this.setData({
                share: true
            });
            this.share = true;
        }
        this.getSubjectsProvince();
    },
    onShow: function onShow() {
        app.resetOnce(this, "oneClick");
    }
});