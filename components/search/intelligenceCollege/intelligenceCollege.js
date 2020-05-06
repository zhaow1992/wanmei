var api = require("../../../utils/api.js");

Component({
    properties: {
        intelligenceCollege: {
            type: Array,
            value: []
        }
    },
    data: {},
    methods: {
        chose: function chose(e) {
            wx.showLoading({
                title: "选择中"
            });
            var that = this;
            var ucode = e.currentTarget.dataset.ucode;
            try {
                var JSZixuanList = wx.getStorageSync("JSZixuanList");
                var userInfo = wx.getStorageSync("userInfo");
                if (JSZixuanList) {
                    for (var i = 0; i < JSZixuanList.length; i++) {
                        if (JSZixuanList[i].uCode == ucode) {
                            wx.hideLoading();
                            wx.showToast({
                                title: "已选择",
                                icon: "none",
                                duration: 2e3
                            });
                            break;
                        } else {
                            if (i == JSZixuanList.length - 1) {
                                if (userInfo[0].UserType > 1 || userInfo[0].UserType <= 1 && JSZixuanList.length < 3) {
                                    try {
                                        var userScore = wx.getStorageSync("userScore");
                                        if (userScore) {
                                            var pro = userScore.provinceNumId;
                                            var batch = userScore.batch;
                                            var course = userScore.courseType;
                                            var total = userScore.total;
                                            var chooseLevel = [];
                                            if (pro == 1) {
                                                chooseLevel = userScore.chooseLevelList[0].value + "," + userScore.chooseLevelList[1].value;
                                            }
                                            var _Rank = userScore.rank;
                                            api.getRecommendZixuanV2("TZY/Recommendation/DoManualFilloutForApp", "POST", pro, batch, course, ucode, total, _Rank).then(function(res) {
                                                var JSZixuanList = wx.getStorageSync("JSZixuanList");
                                                try {
                                                    if (JSZixuanList) {
                                                        var tagsArr = res.result.tags.split(" ");
                                                        var tags = "";
                                                        for (var _i = 0; _i < tagsArr.length; _i++) {
                                                            if (tagsArr[_i] == "211" || tagsArr[_i] == "985" || tagsArr[_i] == "双一流") {
                                                                tags += tagsArr[_i] + " ";
                                                            }
                                                        }
                                                        res.result.tags = tags;
                                                        JSZixuanList.push(res.result);
                                                        wx.setStorage({
                                                            key: "JSZixuanList",
                                                            data: JSZixuanList
                                                        });
                                                    } else {
                                                        if (res.result.uCode != null) {
                                                            var JSZixuanList = [];
                                                            JSZixuanList.push(res.result);
                                                            wx.setStorage({
                                                                key: "JSZixuanList",
                                                                data: JSZixuanList
                                                            });
                                                        }
                                                    }
                                                } catch (e) {}
                                                wx.hideLoading();
                                                wx.showToast({
                                                    title: "选择成功",
                                                    icon: "none",
                                                    duration: 2e3
                                                });
                                                wx.navigateBack({
                                                    delta: 1
                                                });
                                            });
                                        }
                                    } catch (e) {}
                                } else {
                                    wx.hideLoading();
                                    wx.showToast({
                                        title: "选择成功",
                                        icon: "none",
                                        duration: 2e3
                                    });
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                }
                            }
                        }
                    }
                } else {
                    try {
                        var userScore = wx.getStorageSync("userScore");
                        if (userScore) {
                            var pro = userScore.provinceNumId;
                            var batch = userScore.batch;
                            var course = userScore.courseType;
                            var total = userScore.total;
                            var Rank = userScore.rank;
                            api.getRecommendZixuanV2("TZY/Recommendation/DoManualFilloutForApp", "POST", pro, batch, course, ucode, total, Rank).then(function(res) {
                                if (res.result.uCode != null) {
                                    var SHZixuanListArr = [];
                                    var tagsArr = res.result.tags.split(" ");
                                    var tags = "";
                                    for (var _i2 = 0; _i2 < tagsArr.length; _i2++) {
                                        var newTags = tagsArr[_i2].replace(/\s/g, "");
                                        if (newTags == "211" || newTags == "985" || newTags == "双一流") {
                                            tags += newTags + " ";
                                        }
                                    }
                                    res.result.tags = tags;
                                    SHZixuanListArr.push(res.result);
                                    wx.setStorageSync("JSZixuanList", SHZixuanListArr);
                                }
                                wx.hideLoading();
                                wx.showToast({
                                    title: "选择成功",
                                    icon: "none",
                                    duration: 2e3
                                });
                                wx.navigateBack({
                                    delta: 1
                                });
                                that.setData({
                                    xuanze: false
                                });
                            });
                        }
                    } catch (e) {}
                }
            } catch (e) {}
        }
    }
});