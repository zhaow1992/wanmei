function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

var app = getApp();

var api = require("./../api.js");

Page({
    data: {
        showLoad: true,
        requestFlag: true,
        requestKeywordFlag: true,
        loadingFlag: true,
        isShowToast: false,
        oneClick: false,
        lasttwoHeight: 0,
        lastIndex: 0,
        lastIndex1: 0,
        pageIndex: 1,
        pageSize: 20,
        swiperH: 1e3,
        pn: 1,
        popup: {
            popupFlag: false,
            wrapAnimate: "",
            popupAnimate: "",
            bgOpacity: ""
        },
        professionInfo: [],
        keywordSearchList: []
    },
    getSwiperH: function getSwiperH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.select("#nav").boundingClientRect();
        item.exec(function(res) {
            console.log(res);
            that.setData({
                swiperH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
            });
        });
    },
    onShow: function onShow() {
        app.resetOnce(this, "oneClick");
    },
    onLoad: function onLoad(options) {
        var that = this;
        this.setData({
            loadingFlag: true
        });
        this.getprofessionAll(this.data.pageIndex, this.data.pageSize);
    },
    loadMore: function loadMore() {
        var pageIndex = this.data.pageIndex;
        if (this.data.requestFlag) {
            pageIndex++;
            this.getprofessionAll(pageIndex, this.data.pageSize);
            this.setData({
                pageIndex: pageIndex
            });
        }
    },
    //获取一级二级职业
    getprofessionAll: function getprofessionAll(pageIndex, pageSize) {
        var that = this;
        api.getProfessionAll("Careers/QueryCompleteJobs", "POST", pageIndex, pageSize).then(function(res) {
            if (res.result.items.length < 10) {
                that.setData({
                    requestFlag: false
                });
            }
            res.result.items.forEach(function(ele) {
                ele.flag = false;
                ele.children.forEach(function(el) {
                    el.flag = false;
                });
            });
            that.setData({
                loadingFlag: false,
                professionInfo: that.data.professionInfo.concat(res.result.items)
            }, function() {
                that.getSwiperH();
                that.getListHeight();
            });
        });
    },
    getListHeight: function getListHeight() {
        var that = this;
        var query = wx.createSelectorQuery();
        query.selectAll(".oneBoxHeight").boundingClientRect();
        query.exec(function(res) {
            var arr = [];
            console.log(res);
            res[0].forEach(function(ele, index) {
                arr.push({
                    height: ele.height + 50
                });
            });
            that.setData({
                oneBoxHeightArr: arr
            });
            wx.setStorageSync("oneBoxHeightArr", arr);
        });
    },
    //点击展开一级列表
    changejobtype: function changejobtype(e) {
        var _setData2;
        var that = this;
        var professionInfo = this.data.professionInfo;
        var idx = e.currentTarget.dataset.idx;
        var length = e.currentTarget.dataset.length;
        var flag = e.currentTarget.dataset.flag;
        var key1 = "professionInfo[" + idx + "].flag";
        var key2 = "professionInfo[" + this.data.lastIndex + "].flag";
        var key3 = "professionInfo[" + this.data.lastIndex + "].children[" + this.data.lastIndex1 + "].flag";
        if (flag) {
            var oneBoxHeightArr1 = wx.getStorageSync("oneBoxHeightArr");
            console.log(oneBoxHeightArr1[idx].height);
            var key = "oneBoxHeightArr[" + idx + "].height";
            this.setData(_defineProperty({}, key, oneBoxHeightArr1[idx].height));
        }
        this.setData((_setData2 = {
            lastIndex: idx
        }, _defineProperty(_setData2, key2, false), _defineProperty(_setData2, key1, !professionInfo[idx].flag), 
        _defineProperty(_setData2, key3, false), _setData2));
    },
    //点击展开二级列表
    changeProfessionBox: function changeProfessionBox(e) {
        var _setData3;
        var that = this;
        var len = e.currentTarget.dataset.len;
        var flag = e.currentTarget.dataset.flag;
        var professionInfo = this.data.professionInfo;
        var name = e.currentTarget.dataset.name;
        var code = e.currentTarget.dataset.id;
        var idx = e.currentTarget.dataset.idx;
        var idx1 = e.currentTarget.dataset.idx1;
        var lastIndex = this.data.lastIndex;
        //0
                var lastIndex1 = this.data.lastIndex1;
        //0
                var key1 = "professionInfo[" + idx + "].children[" + idx1 + "].flag";
        var key2 = "professionInfo[" + lastIndex + "].children[" + lastIndex1 + "].flag";
        var key3 = "oneBoxHeightArr[" + idx + "]";
        if (professionInfo[idx].children[idx1].jobs.length == 0) return;
        var oneBoxHeightArr1 = wx.getStorageSync("oneBoxHeightArr");
        var query1 = wx.createSelectorQuery();
        query1.selectAll("#th" + idx + "and" + idx1).boundingClientRect();
        query1.exec(function(res) {
            console.log(res[0]);
            that.data.oneBoxHeightArr[idx].height1 = res[0][0].height + 50;
            if (flag) {
                that.data.oneBoxHeightArr[idx].height = oneBoxHeightArr1[idx].height;
            } else {
                that.data.oneBoxHeightArr[idx].height = oneBoxHeightArr1[idx].height + res[0][0].height;
            }
            var key3 = "oneBoxHeightArr[" + idx + "]";
            that.setData(_defineProperty({}, key3, that.data.oneBoxHeightArr[idx]));
        });
        this.setData((_setData3 = {}, _defineProperty(_setData3, key2, false), _defineProperty(_setData3, key1, !professionInfo[idx].children[idx1].flag), 
        _defineProperty(_setData3, "lastIndex", idx), _defineProperty(_setData3, "lastIndex1", idx1), 
        _setData3));
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
    },
    //跳转职业详情
    goProfessionDesc: function goProfessionDesc(e) {
        var that = this;
        var code = e.currentTarget.dataset.id;
        var type = e.currentTarget.dataset.type;
        var type1 = e.currentTarget.dataset.type1;
        if (!app.checkOnce(that, "oneClick")) return;
        wx.navigateTo({
            url: "../professionDesc/professionDesc?code=" + code
        });
    }
});