var api = require("./../api.js");

var app = getApp();

Page({
    data: {
        showLoad: true,
        tableList: []
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.loadQueryRecord();
        that.selectComponent("#navigationcustom").setNavigationAll("我的志愿表", true);
    },
    // 加载测评报告
    loadQueryRecord: function loadQueryRecord() {
        var that = this;
        var numId = wx.getStorageSync("userInfo")[0].UserId;
        var cityId = wx.getStorageSync("cityId").cityId;
        var isGaokaoFlag = app.globalData.isGaokaoFlag;
        api.ZyTableQuery("Users/ZyTable/Query", "POST", numId, cityId, isGaokaoFlag).then(function(res) {
            if (res.result.length > 0) {
                if (res.result.length < 10) {
                    that.setData({
                        showMore: false
                    });
                }
                that.setData({
                    tableList: that.data.tableList.concat(res.result)
                });
            } else {
                that.setData({
                    showMore: false
                });
            }
            that.setData({
                showLoad: false
            });
        });
    }
});