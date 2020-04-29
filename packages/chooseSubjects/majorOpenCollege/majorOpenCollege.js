var app = getApp();

var api = require("../api.js");

Page({
    data: {
        color: null,
        showLoad: true,
        showMore: true,
        majorCode: "",
        collegeCount: 0,
        majorName: "-",
        rate: 0,
        scrollH: 0,
        collegeList: [],
        matchMajorLoading: true,
        matchMajorFlag: false,
        collegeUp: false,
        majorList: [],
        smallMajorCount: 0,
        shaixuan: null,
        localLoading: false
    },
    shaixuan: function shaixuan() {
        var that = this;
        wx.showActionSheet({
            itemList: [ "全部", "匹配", "不匹配" ],
            success: function success(res) {
                switch (res.tapIndex) {
                  case 0:
                    if (that.data.shaixuan != null) {
                        that.pn = 1;
                        that.setData({
                            shaixuan: null,
                            localLoading: true,
                            collegeList: [],
                            showMore: true
                        }, function() {
                            that.queryMatchRate();
                        });
                    }
                    break;

                  case 1:
                    if (that.data.shaixuan != true) {
                        that.pn = 1;
                        that.setData({
                            shaixuan: true,
                            localLoading: true,
                            collegeList: [],
                            showMore: true
                        }, function() {
                            that.queryMatchRate();
                        });
                    }
                    break;

                  case 2:
                    if (that.data.shaixuan != false) {
                        that.pn = 1;
                        that.setData({
                            shaixuan: false,
                            localLoading: true,
                            collegeList: [],
                            showMore: true
                        }, function() {
                            that.queryMatchRate();
                        });
                    }
                    break;
                }
            }
        });
    },
    onLoad: function onLoad(options) {
        this.setData({
            color: app.globalData.color
        });
        this.subject = app.globalData.chooseSubject.subject;
        this.provinceId = app.globalData.chooseSubject.provinceId;
        this.year = app.globalData.chooseSubject.year;
        this.collegeCount = options.collegecount;
        this.majorCode = options.majorCode;
        this.rate = options.rate;
        this.pn = 1;
        this.setData({
            majorName: options.majorname,
            collegeCount: options.collegecount,
            majorCode: options.majorCode,
            smallMajorCount: options.smallMajorCount
        });
        this.getScrollH();
        this.queryMatchRate();
    },
    getNextPage: function getNextPage() {
        var that = this;
        that.pn = that.pn + 1;
        that.queryMatchRate();
    },
    // 
    queryMatchRate: function queryMatchRate() {
        var that = this;
        if (!that.data.showMore) return;
        api.queryCollegeRate("ChooseSubject/Colleges/QueryMatchRate", "POST", that.subject, that.collegeCount, that.rate, that.pn, that.provinceId, that.year, that.majorCode, that.data.shaixuan).then(function(res) {
            if (res.isSuccess) {
                var items = res.result.colleges.items;
                for (var i = 0; i < items.length; i++) {
                    items[i].level = items[i].level.split(" ");
                }
                that.setData({
                    collegeList: that.data.collegeList.concat(res.result.colleges.items),
                    rate: res.result.rate,
                    collegeCount: res.result.colleges.totalCount
                });
                if (res.result.colleges.items.length < 20) {
                    that.setData({
                        showMore: false
                    });
                }
            }
            that.setData({
                showLoad: false,
                localLoading: false
            });
        });
    },
    // 计算dom高度
    getScrollH: function getScrollH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.select("#nav").boundingClientRect();
        item.exec(function(res) {
            that.setData({
                scrollH: app.globalData.systemInfo.windowHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
            });
        });
    },
    // 匹配专业
    collegeUp: function collegeUp(e) {
        var that = this;
        that.setData({
            matchMajorFlag: true,
            collegeUp: "major-animate",
            matchMajorLoading: false
        });
    },
    collegeClose: function collegeClose() {
        this.setData({
            matchMajorFlag: false,
            collegeUp: "major-animate-out"
        });
    }
});