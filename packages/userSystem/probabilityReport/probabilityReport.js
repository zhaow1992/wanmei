var api = require("./../api.js");

var app = getApp();

Page({
    data: {
        showLoad: true,
        probabilityList: [],
        pn: 1
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.loadQueryRecord();
        that.selectComponent("#navigationcustom").setNavigationAll("我的报告", true);
    },
    goDetail: function goDetail(e) {
        app.globalData.probabilityInfo.collegeUcode = e.currentTarget.dataset.ucode;
        app.globalData.probabilityInfo.collegeId = e.currentTarget.dataset.collegeid;
        app.globalData.probabilityInfo.codeId = e.currentTarget.dataset.ucode;
        var course = e.currentTarget.dataset.course;
        var score = e.currentTarget.dataset.score;
        var batch = e.currentTarget.dataset.batch;
        var cityid = e.currentTarget.dataset.cityid;
        var rank = e.currentTarget.dataset.rank;
        wx.navigateTo({
            url: "/packages/testEnterPercent/testResult/testResult?rank=" + rank + "&course=" + course + "&score=" + score + "&batch=" + batch + "&cityid=" + cityid + "&insert=false&ucode=" + e.currentTarget.dataset.ucode + "&collegeid=" + e.currentTarget.dataset.collegeid
        });
    },
    // 加载测评报告
    loadQueryRecord: function loadQueryRecord() {
        var that = this;
        var numId = wx.getStorageSync("userInfo")[0].UserId;
        var cityId = wx.getStorageSync("cityId").cityId;
        var pn = that.data.pn;
        api.CollegeAPReportQuery("App/Users/CollegeAPReport/Query", "POST", numId, cityId, pn).then(function(res) {
            if (res.result.items.length > 0) {
                if (res.result.items.length < 10 && that.data.pn == 1) {
                    that.setData({
                        showMore: false
                    });
                }
                that.setData({
                    probabilityList: that.data.probabilityList.concat(res.result.items)
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
    },
    goProbability: function goProbability() {
        wx.navigateTo({
            url: "/packages/testEnterPercent/index/index"
        });
    },
    scrolltolower: function scrolltolower() {
        var that = this;
        if (that.data.showMore == false) {} else {
            that.setData({
                pn: that.data.pn + 1
            }, function() {
                that.loadQueryRecord();
            });
        }
    }
});