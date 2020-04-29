var api = require("./../api.js");

var app = getApp();

Page({
    totalCount: 0,
    pn: 1,
    data: {
        showLoad: true,
        evaluationList: []
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.setData({
            type: options.type,
            typesOf: options.typesOf,
            isHide: options.isHide
        });
        that.selectComponent("#navigationcustom").setNavigationAll("我的测评", true);
        that.userInfo = wx.getStorageSync("userInfo")[0];
        that.loadQueryRecord(that.userInfo.UserId, options.type, options.typesOf, that.pn);
    },
    // 加载测评报告
    loadQueryRecord: function loadQueryRecord(numId, type1, typesOf, pn) {
        var that = this;
        api.queryRecord("Evaluation/QueryRecord", "POST", numId, type1, typesOf, pn).then(function(res) {
            wx.stopPullDownRefresh();
            if (res.isSuccess) {
                for (var i = 0; i < res.result.items.length; i++) {
                    res.result.items[i].creationTime = app.transDateTime(res.result.items[i].creationTime);
                }
                that.setData({
                    evaluationList: that.data.evaluationList.concat(res.result.items),
                    showLoad: false
                });
            }
        });
    },
    onReachBottom: function onReachBottom() {
        console.log(this.totalCount);
        var that = this;
        if (that.data.evaluationList.length > 0) {
            // if (that.totalCount <= that.data.evaluationList.length) {
            //   return;
            // }
            console.log(22);
            that.pn++;
            that.loadQueryRecord(that.userInfo.UserId, that.data.type, that.data.typesOf, that.pn);
        }
    },
    onPullDownRefresh: function onPullDownRefresh() {
        var that = this;
        that.data.evaluationList.length = 0;
        that.pn = 0;
        that.totalCount = 0;
        that.loadQueryRecord(that.userInfo.UserId, that.data.type, that.data.typesOf, that.pn);
    },
    evaluationDetail: function evaluationDetail(e) {
        var _e$currentTarget$data = e.currentTarget.dataset, id = _e$currentTarget$data.id, type = _e$currentTarget$data.type, url = _e$currentTarget$data.url;
        if (type > 6) {
            wx.navigateTo({
                url: "/pages/evaluationResult/evaluationResult?id=" + id + "&isShare=true"
            });
        } else {
            wx.navigateTo({
                url: "/pages/webPage/webPage?url=" + url + "&id=" + id
            });
        }
    }
});