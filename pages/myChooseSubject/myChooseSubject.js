var api = require("../../utils/api.js");

var app = getApp();

Page({
    data: {
        showLoad: true,
        showMore: true,
        oneClick: false,
        requestFlag: true,
        //能否请求
        pageIndex: 1,
        pageSize: 10,
        chooseSubjectList: [],
        type: ""
    },
    // 跳转新高考选科
    goChooseSubjects: function goChooseSubjects() {
        var chooseSubjectInfo = wx.getStorageSync("chooseSubjectInfo");
        var chooseSubProvinceList = wx.getStorageSync("chooseSubProvinceList");
        if (chooseSubjectInfo && chooseSubjectInfo.provinceId && chooseSubjectInfo.year != 0 && chooseSubProvinceList && this.data.type !== "index") {
            wx.navigateTo({
                url: "/packages/chooseSubjects/index/index"
            });
        } else if (chooseSubjectInfo && chooseSubjectInfo.provinceId && chooseSubjectInfo.year != 0 && chooseSubProvinceList && this.data.type == "index") {
            wx.navigateBack({
                delta: 1
            });
        } else {
            wx.navigateTo({
                url: "/packages/chooseSubjects/electiveProvince/electiveProvince"
            });
        }
    },
    goChooseSubjectDetail: function goChooseSubjectDetail(e) {
        if (!app.checkOnce(this, "oneClick")) return;
        var year = e.currentTarget.dataset.year;
        var provinceId = e.currentTarget.dataset.provinceid;
        app.globalData.chooseSubject.year = year;
        app.globalData.chooseSubject.provinceId = provinceId;
        var chooseSubjectInfo = wx.getStorageSync("chooseSubjectInfo");
        if (chooseSubjectInfo) {
            chooseSubjectInfo.provinceId = provinceId;
            chooseSubjectInfo.year = year;
            wx.setStorageSync("chooseSubjectInfo", chooseSubjectInfo);
        } else {
            wx.setStorageSync("chooseSubjectInfo", {
                provinceId: provinceId,
                year: year,
                provinceType: 1
            });
        }
        wx.navigateTo({
            url: "/packages/chooseSubjects/chooseSubPlan/chooseSubPlan?id=" + e.currentTarget.dataset.id + "&choosesubtype=" + e.currentTarget.dataset.type
        });
    },
    getMyChooseSubjects: function getMyChooseSubjects(userId, pageIndex, pageSize) {
        var that = this;
        api.myChooseSubjects("Users/ChooseSubjectsSolution/Query", "POST", userId, pageIndex, pageSize).then(function(res) {
            that.setData({
                showLoad: false
            });
            if (res.result.items.length < 10) {
                that.setData({
                    requestFlag: false,
                    showMore: false
                });
            }
            var result = res.result;
            result.items.forEach(function(ele) {
                ele.time = app.transDateTime(ele.creationTime);
            });
            that.setData({
                chooseSubjectList: that.data.chooseSubjectList.concat(result.items),
                showLoad: false
            });
        });
    },
    onShow: function onShow() {
        app.resetOnce(this, "oneClick");
    },
    onLoad: function onLoad(options) {
        var pageIndex = this.data.pageIndex;
        var pageSize = this.data.pageSize;
        var userInfo = wx.getStorageSync("userInfo")[0];
        this.getMyChooseSubjects(userInfo.UserId, pageIndex, pageSize);
        this.setData({
            userInfo: userInfo
        });
        if (options && options.type) {
            this.setData({
                type: options.type
            });
        }
    },
    onReachBottom: function onReachBottom() {
        var pageIndex = this.data.pageIndex;
        var pageSize = this.data.pageSize;
        var userInfo = this.data.userInfo;
        var requestFlag = this.data.requestFlag;
        if (requestFlag) {
            pageIndex++;
            this.getMyChooseSubjects(userInfo.UserId, pageIndex, pageSize);
            this.setData({
                pageIndex: pageIndex
            });
        }
    }
});