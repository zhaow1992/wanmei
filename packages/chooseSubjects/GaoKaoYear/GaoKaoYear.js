var app = getApp();

Page({
    data: {
        yearList: [],
        oneClick: false
    },
    //去选科首页
    goElectiveIndex: function goElectiveIndex(e) {
        var year = e.currentTarget.dataset.year;
        app.globalData.chooseSubject.year = year;
        if (!app.checkOnce(this, "oneClick")) return;
        var chooseSubjectInfo = wx.getStorageSync("chooseSubjectInfo");
        chooseSubjectInfo.year = year;
        wx.setStorageSync("chooseSubjectInfo", chooseSubjectInfo);
        if (this.share) {
            wx.redirectTo({
                url: "../index/index?share=true"
            });
        } else {
            wx.redirectTo({
                url: "../index/index"
            });
        }
    },
    onLoad: function onLoad(options) {
        this.share = false;
        if (options && options.share) {
            this.share = true;
        }
        var yearList = JSON.parse(options.year);
        if (options.year) {
            this.setData({
                yearList: yearList
            });
        }
    },
    onShow: function onShow() {
        app.resetOnce(this, "oneClick");
    }
});