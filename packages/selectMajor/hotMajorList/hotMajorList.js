var app = getApp();

var api = require("./../api.js");

Page({
    data: {
        isBOrZ: 0,
        showLoad: true,
        scrollH: 0,
        hotList: [],
        popup: {
            popupFlag: false,
            wrapAnimate: "",
            popupAnimate: "",
            bgOpacity: ""
        },
        pn: 1,
        showMore: true
    },
    goMajorDetail: function goMajorDetail(e) {
        var majorCode = e.currentTarget.dataset.majorcode;
        if (majorCode.length == 4) {
            wx.navigateTo({
                url: "/packages/selectMajor/middleMajorDetail/middleMajorDetail?majorcode=" + majorCode
            });
        } else {
            wx.navigateTo({
                url: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + majorCode + "&cityid=" + this.cityId
            });
        }
    },
    onLoad: function onLoad(options) {
        this.isborz = options.isborz;
        this.setData({
            isBOrZ: options.isborz
        });
        this.cityId = wx.getStorageSync("cityId").cityId;
        this.queryMajorsHotRanking();
    },
    getNextPage: function getNextPage() {
        var that = this;
        that.setData({
            pn: that.data.pn + 1
        }, function() {
            that.queryMajorsHotRanking();
        });
    },
    // 计算scroll高度
    getSwiperH: function getSwiperH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.select("#nav").boundingClientRect();
        item.exec(function(res) {
            that.setData({
                scrollH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
            });
        });
    },
    // 报考热度/就业前景-分页
    queryMajorsHotRanking: function queryMajorsHotRanking() {
        var that = this;
        if (!that.data.showMore) return;
        api.QueryMajorsHotRankingByPaging("Majors/QueryMajorsHotRankingByPaging", "POST", that.cityId, that.isborz, 1, that.data.pn).then(function(res) {
            that.setData({
                hotList: that.data.hotList.concat(res.result),
                showLoad: false
            }, function() {
                that.getSwiperH();
            });
            if (res.result.length < 10) {
                that.setData({
                    showMore: false
                });
            }
        });
    },
    // 使用说明
    showPopup: function showPopup() {
        this.setData({
            "popup.wrapAnimate": "wrapAnimate",
            "popup.bgOpacity": 0,
            "popup.popupFlag": true,
            "popup.popupAnimate": "popupAnimate"
        });
    },
    hidePopup: function hidePopup() {
        var _this = this;
        this.setData({
            "popup.wrapAnimate": "wrapAnimateOut",
            "popup.bgOpacity": .7,
            "popup.popupAnimate": "popupAnimateOut"
        });
        setTimeout(function() {
            _this.setData({
                "popup.popupFlag": false
            });
        }, 200);
    }
});