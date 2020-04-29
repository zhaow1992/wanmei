var api = require("./../api.js");

Page({
    totalCount: 0,
    pn: 1,
    data: {
        tip: "已显示全部内容",
        learnList: [],
        showLoad: true
    },
    queryWatchLogs: function queryWatchLogs(userNumId, pageIndex) {
        var that = this;
        api.queryWatchLogs("App/Videos/WatchLogs/Query", "POST", userNumId, pageIndex).then(function(res) {
            wx.stopPullDownRefresh();
            if (res.isSuccess) {
                that.setData({
                    learnList: that.data.learnList.concat(res.result.items),
                    showLoad: false
                });
            }
        });
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll("我的学习", true);
        that.userInfo = wx.getStorageSync("userInfo")[0];
        that.cityId = wx.getStorageSync("cityId");
        that.queryWatchLogs(that.userInfo.UserId, that.pn);
    },
    scrollToLower: function scrollToLower(e) {
        //滚到底部触发加载更多
        var that = this;
        if (that.data.showMore) return;
        that.pn = that.pn + 1;
        that.queryWatchLogs(that.userInfo.UserId, that.pn);
    }
});