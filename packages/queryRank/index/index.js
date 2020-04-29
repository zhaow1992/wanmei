var app = getApp();

var api = require("../api.js");

Page({
    data: {
        share: false,
        navigationText: "位次查询",
        navigationHome: true,
        sharePageBack: true,
        navStatusHeight: app.globalData.navigationCustomStatusHeight,
        navCapsuleHeight: app.globalData.navigationCustomCapsuleHeight,
        years: [],
        subset: [],
        subIndex: 0,
        index: 0,
        score: 0,
        scrollH: 0,
        userInfo: "",
        rankData: [],
        intoView: "",
        showLoading: false,
        showToast: false
    },
    onLoad: function onLoad(options) {
        this.setData({
            userInfo: wx.getStorageSync("userInfo"),
            score: wx.getStorageSync("userScore").total
        });
        if (this.data.userInfo[0].Province != 842 && this.data.userInfo[0].Province != 843) {
            this.setData({
                subset: [ "文科", "理科" ]
            });
            var type = this.data.userInfo[0].courseType;
            if (type == 0) {
                this.setData({
                    subIndex: 1
                });
            } else if (type == 1) {
                this.setData({
                    subIndex: 0
                });
            }
            this.getRankData(0);
        } else {
            this.getRankData(0, -1);
        }
        this.getScrollH();
    },
    //弹窗
    toast: function toast() {
        this.setData({
            showToast: !this.data.showToast
        });
    },
    // 计算dom高度
    getScrollH: function getScrollH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.select("#head").boundingClientRect();
        item.exec(function(res) {
            that.setData({
                scrollH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
            });
        });
    },
    //获取位次数据
    getRankData: function getRankData(year, type) {
        var _this = this;
        this.setData({
            showLoading: true
        });
        var courseType = this.data.userInfo[0].courseType;
        if (type) {
            courseType = type;
        } else {
            if (type == 0) {
                courseType = 0;
            }
        }
        var data = {
            provinceId: this.data.userInfo[0].Province,
            courseType: courseType,
            year: year
        };
        api.getRankData("ScoreLines/YFYD/Querys", "POST", data).then(function(res) {
            if (data.year == 0) {
                var _year = res.result.yfydYear;
                var years = [];
                if (data.provinceId == 842) {
                    for (var i = 0; i < 3; i++) {
                        if (_year - i > 2017) {
                            years.push(_year - i);
                        }
                    }
                } else if (data.provinceId == 843) {
                    for (var _i = 0; _i < 3; _i++) {
                        if (_year - _i > 2016) {
                            years.push(_year - _i);
                        }
                    }
                } else {
                    for (var _i2 = 0; _i2 < 3; _i2++) {
                        years.push(_year - _i2);
                    }
                }
                _this.setData({
                    years: years
                });
            }
            res.result.yfyds.sort(function(a, b) {
                return b.maxScore - a.maxScore;
            });
            res.result.yfyds.map(function(item) {
                item.score = item.minScore == item.maxScore ? item.maxScore : item.minScore + "~" + item.maxScore;
            });
            _this.setData({
                rankData: res.result,
                showLoading: false
            });
        });
    },
    backIconButtonTap: function backIconButtonTap() {
        if (this.properties.sharePageBack) {
            wx.switchTab({
                url: "/pages/index/index"
            });
        } else {
            wx.navigateBack({
                delta: 1
            });
        }
    },
    //切换年份
    bindPickerChange: function bindPickerChange(e) {
        this.setData({
            index: e.detail.value
        });
        var type = this.getCourseType();
        this.getRankData(this.data.years[this.data.index], type);
    },
    getCourseType: function getCourseType() {
        var courseType = this.data.subset[this.data.subIndex];
        var type = void 0;
        if (courseType == "文科") {
            type = 1;
        } else if (courseType == "理科") {
            type = 0;
        } else {
            type = -1;
        }
        return type;
    },
    //切换文理科
    pickerSub: function pickerSub(e) {
        this.setData({
            subIndex: e.detail.value
        });
        var type = this.getCourseType();
        this.setData({
            type: type
        });
        this.getRankData(this.data.years[this.data.index], type);
    },
    input: function input(e) {
        this.setData({
            score: parseFloat(e.detail.value)
        });
    },
    search: function search() {
        var _this2 = this;
        var that = this;
        var scoreInto = this.data.score;
        var list = [];
        that.data.rankData.yfyds.map(function(item) {
            list.push(item.score);
        });
        list.map(function(i) {
            if (list.indexOf(_this2.data.score) == -1) {
                if (typeof i == "string") {
                    var arr = i.split("~");
                    if (parseFloat(arr[0]) < parseFloat(that.data.score) && parseFloat(that.data.score) < parseFloat(arr[1])) {
                        scoreInto = arr[0];
                    }
                }
            }
        });
        if (typeof list[0] == "string") {
            var ar = list[0].split("~");
            if (that.data.score > ar[1]) {
                scoreInto = ar[0];
            }
        } else if (typeof list[0] == "number") {
            if (that.data.score > list[0]) {
                scoreInto = list[0];
            }
        }
        if (that.data.score < that.data.rankData.yfyds[that.data.rankData.yfyds.length - 1].score) {
            scoreInto = that.data.rankData.yfyds[that.data.rankData.yfyds.length - 1].score;
        }
        this.setData({
            intoView: scoreInto
        });
    }
});