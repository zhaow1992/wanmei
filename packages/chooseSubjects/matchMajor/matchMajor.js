var app = getApp();

var api = require("../api.js");

Page({
    data: {
        showLoad: true,
        scrollH: 0,
        majorList: [],
        sort: 0
    },
    onLoad: function onLoad(options) {
        this.selectComponent("#navigationcustom").setNavigationAll("专业匹配 " + options.rate + "%", true);
        this.getScrollH();
        this.queryMatchRate();
    },
    queryMatchRate: function queryMatchRate() {
        var that = this;
        that.setData({
            majorList: app.globalData.chooseSubject.mateMajorList,
            showLoad: false
        });
    },
    // 计算dom高度
    getScrollH: function getScrollH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.select("#nav").boundingClientRect();
        item.exec(function(res) {
            that.setData({
                scrollH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.systemInfo.statusBarHeight - 60
            });
        });
    },
    //排序
    sort: function sort() {
        var sort = this.data.sort + 1;
        var majorList = this.data.majorList.sort(app.compare("collegeMatchRate"));
        this.setData({
            sort: sort % 2,
            majorList: sort % 2 == 1 ? majorList : majorList.reverse()
        });
    }
});