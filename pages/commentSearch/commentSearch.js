// pages/commentSearch/commentSearch.js
var app = getApp();

var api = require("../../utils/api.js");

Page({
    /**
   * 页面的初始数据
   */
    data: {
        pn: 1,
        keyword: "",
        oneClick: false,
        searchFalg: false,
        keywordSearchList: []
    },
    goProfessionDetail: function goProfessionDetail(e) {
        var that = this;
        var code = e.currentTarget.dataset.code;
        var name = e.currentTarget.dataset.name;
        var obj = {
            name: name,
            code: code
        };
        if (!app.checkOnce(this, "oneClick")) return;
        var searchHistory = wx.getStorageSync("searchProfessionHistroy");
        if (searchHistory) {
            var result = searchHistory.some(function(item) {
                if (item.name == name) {
                    return true;
                }
            });
            if (!result) {
                searchHistory.push(obj);
            }
        } else {
            searchHistory = [];
            searchHistory.push(obj);
        }
        wx.setStorage({
            key: "searchProfessionHistroy",
            data: searchHistory,
            success: function success() {
                var searchHistoryList = wx.getStorageSync("searchProfessionHistroy");
                that.setData({
                    searchHistoryList: searchHistoryList
                });
            }
        });
        wx.navigateTo({
            url: "/packages/selectMajor/professionDesc/professionDesc?code=" + code
        });
    },
    //通过关键词搜索职业
    keywordSearch: function keywordSearch(e) {
        var that = this;
        var keyword = e.detail.value;
        if (keyword == "") return;
        this.setData({
            showLoad: true,
            keyword: keyword,
            keywordSearchList: []
        });
        var searchHistory = wx.getStorageSync("searchProfessionHistroy");
        console.log(searchHistory);
        if (searchHistory) {
            if (!searchHistory.includes(keyword)) {
                searchHistory.push(keyword);
            }
        } else {
            searchHistory = [];
            searchHistory.push(keyword);
        }
        this.getkeywordSearch(keyword, this.data.pn);
    },
    //点击搜索记录中的关键词进行搜索
    //关键词搜索
    getkeywordSearch: function getkeywordSearch(keyword, pn) {
        var that = this;
        api.keywordSearchProfession("Careers/QueryJobs", "POST", keyword, pn).then(function(res) {
            that.setData({
                showLoad: false
            });
            if (res.isSuccess) {
                if (res.result.items.length == 0) {
                    that.setData({
                        searchFalg: true
                    });
                }
                if (res.result.items.length !== 0) {
                    res.result.items.forEach(function(ele) {
                        ele.name1 = ele.name.split(keyword)[0];
                        ele.name2 = ele.name.split(keyword)[1];
                    });
                    that.setData({
                        keywordSearchList: that.data.keywordSearchList.concat(res.result.items)
                    });
                }
            }
        });
    },
    keywordInput: function keywordInput(e) {
        var keyword = e.detail.value;
        if (keyword == "") {
            this.setData({
                keyword: "",
                searchFalg: false,
                keywordSearchList: [],
                pn: 1
            });
        }
    },
    //删除记录搜索记录
    deleteHistoryStorageTap: function deleteHistoryStorageTap() {
        var that = this;
        wx.showModal({
            content: "是否删除历史记录",
            cancelText: "否",
            confirmText: "是",
            success: function success(res) {
                if (res.confirm) {
                    wx.showNavigationBarLoading();
                    wx.removeStorage({
                        key: "searchProfessionHistroy",
                        success: function success(res) {
                            wx.hideNavigationBarLoading();
                        }
                    });
                    that.setData({
                        searchHistoryList: []
                    });
                } else if (res.cancel) {}
            }
        });
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
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {
        this.getSwiperH();
    },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function onReady() {},
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function onShow() {
        app.resetOnce(this, "oneClick");
        var searchHistoryList = wx.getStorageSync("searchProfessionHistroy");
        this.setData({
            searchHistoryList: searchHistoryList
        });
    },
    /**
   * 生命周期函数--监听页面隐藏
   */
    onHide: function onHide() {},
    /**
   * 生命周期函数--监听页面卸载
   */
    onUnload: function onUnload() {},
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh: function onPullDownRefresh() {},
    /**
   * 页面上拉触底事件的处理函数
   */
    onReachBottom: function onReachBottom() {},
    /**
   * 用户点击右上角分享
   */
    onShareAppMessage: function onShareAppMessage() {}
});