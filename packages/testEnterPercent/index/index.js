var _api = require("../api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var app = getApp();

Page({
    data: {
        system: "android",
        payBtnText: app.globalData.payBtnText,
        xianzhi: false,
        batchFlag: false,
        scoreBatch: 1,
        cityId: 1,
        score: null,
        course: 0,
        batch: 1,
        college: "输入目标大学…",
        scoreLine: [],
        flag: false,
        wrapAnimate: "",
        bgOpacity: 0,
        frameAnimate: "",
        currect: 0,
        CountFlag: true,
        count: 0,
        userInfo: [],
        rank: 0
    },
    returnTap: function returnTap() {
        wx.navigateBack({
            delta: 1
        });
    },
    goCreateScore: function goCreateScore() {
        // wx.switchTab({
        //   url: '/pages/index/index',
        // })
        wx.navigateTo({
            url: "/pages/changeAchievement/changeAchievement"
        });
    },
    testStart: function testStart() {
        var that = this;
        //college
                var scoreTotal = 750;
        var score = that.data.score;
        var cityId = that.data.cityId;
        var course = that.data.course;
        var batch = that.data.batch;
        var rank = that.data.rank;
        switch (cityId) {
          case 1:
            scoreTotal: 480;
            break;

          case 842:
            scoreTotal: 660;
            break;

          case 853:
            scoreTotal: 940;
            break;
        }
        if (score == null) {
            wx.showToast({
                title: "以上均为必填项",
                icon: "none",
                duration: 1500
            });
        } else if (score < 100 || score > scoreTotal) {
            wx.showToast({
                title: "分数应为 100~" + scoreTotal,
                icon: "none",
                duration: 1500
            });
        } else if (that.data.college == "输入目标大学…") {
            wx.showToast({
                title: "以上均为必填项",
                icon: "none",
                duration: 1500
            });
        } else {
            if (that.data.batchFlag) {
                batch = that.data.batch;
            } else {
                batch = that.data.scoreBatch;
            }
            wx.navigateTo({
                url: "../testResult/testResult?rank=" + rank + "&course=" + course + "&score=" + score + "&batch=" + batch + "&cityid=" + cityId + "&insert=true&ucode=" + app.globalData.probabilityInfo.collegeUcode + "&collegeid=" + app.globalData.probabilityInfo.collegeId
            });
            that.UseFunctionLogsInsert(that.data.userInfo.UserId, app.globalData.probabilityInfo.collegeId, that.data.userInfo.UserType);
        }
    },
    // 跳搜索大学      
    goSearchCollege: function goSearchCollege() {
        if (this.data.cityId == 843 || this.data.cityId == 842) {
            wx.showToast({
                title: "政策原因，新高考省份暂不支持此功能",
                icon: "none",
                duration: 1500
            });
        } else {
            wx.navigateTo({
                url: "/pages/globalSearch/globalSearch?mode=test&course=" + this.data.course + "&batch=" + this.data.batch + "&&cityid=" + this.data.cityId
            });
        }
    },
    // 选文理科
    chooseCourse: function chooseCourse(e) {
        this.setData({
            course: e.currentTarget.dataset.course
        });
    },
    // 获取分数
    getScore: function getScore(e) {
        this.setData({
            score: parseInt(e.detail.value),
            scoreBatch: app.ScoreCountBatch(parseInt(e.detail.value)),
            batchFlag: false
        });
    },
    // 选批次
    chooseBatch: function chooseBatch(e) {
        var batch = e.currentTarget.dataset.batch;
        var index = e.currentTarget.dataset.id;
        var name = e.currentTarget.dataset.name;
        this.setData({
            currect: index,
            batch: batch,
            batchFlag: true
        });
        this.hideFrame();
    },
    showFrame: function showFrame() {
        this.setData({
            flag: true,
            wrapAnimate: "wrapAnimate",
            frameAnimate: "frameAnimate"
        });
    },
    hideFrame: function hideFrame() {
        var that = this;
        that.setData({
            wrapAnimate: "wrapAnimateOut",
            frameAnimate: "frameAnimateOut"
        });
        setTimeout(function() {
            that.setData({
                flag: false
            });
        }, 400);
    },
    toast: function toast() {
        wx.showToast({
            title: "政策原因，新高考省份暂不支持此功能",
            icon: "none",
            duration: 1500
        });
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.setData({
            system: app.globalData.system,
            payBtnText: app.globalData.payBtnText
        });
        if (options && options.route == "pay") {
            route = 2;
        }
    },
    onShow: function onShow() {
        var that = this;
        if (app.globalData.probabilityInfo.collegeName == "") {} else {
            this.setData({
                college: app.globalData.probabilityInfo.collegeName
            });
        }
        if (that.data.userInfo != []) {
            var userInfo = that.data.userInfo;
            that.UseFunctionLogsCount(userInfo.UserId, userInfo.UserType);
        }
        var cityId = wx.getStorageSync("cityId").cityId;
        that.setData({
            cityId: cityId
        });
        // 非浙江、上海版
                if (cityId != 842 && cityId != 843) {
            try {
                var scoreLine = wx.getStorageSync("gaokaoScore");
                var userScore = wx.getStorageSync("userScore");
                var _userInfo = wx.getStorageSync("userInfo")[0];
                if (scoreLine) {
                    that.setData({
                        scoreLine: scoreLine
                    });
                }
                if (userScore && userScore.numId != 0) {
                    that.setData({
                        score: userScore.total,
                        scoreBatch: that.ScoreCountBatch(userScore.total),
                        course: userScore.courseType,
                        rank: userScore.rank
                    });
                }
                if (_userInfo) {
                    that.setData({
                        userInfo: _userInfo
                    });
                    that.UseFunctionLogsCount(_userInfo.UserId, _userInfo.UserType);
                }
            } catch (e) {}
        } else {
            that.setData({
                xianzhi: true
            });
        }
    },
    // 传分数算批次
    ScoreCountBatch: function ScoreCountBatch(score) {
        var that = this;
        var batch = 0;
        var scoreLine = {};
        var course = parseInt(that.data.course);
        switch (course) {
          case 0:
            scoreLine = that.data.scoreLine[0];
            break;

          case 1:
            scoreLine = that.data.scoreLine[1];
            break;
        }
        for (var i = 0; i < scoreLine.length; i++) {
            if (score >= scoreLine[i].score) {
                batch = scoreLine[i].batch;
                break;
            } else {
                if (i == scoreLine.length - 1) {
                    batch = scoreLine[scoreLine.length - 1].batch;
                    break;
                }
            }
        }
        return batch;
    },
    UseFunctionLogsCount: function UseFunctionLogsCount(userNumId, userPermissionId) {
        var that = this;
        // wx.showLoading({
        //     title: 'loading',
        //     mask: true
        // });
                _api2.default.UseFunctionLogsCount("Users/UseFunctionLogs/Count", "POST", userNumId, userPermissionId).then(function(res) {
            if (res.isSuccess) {
                if (res.result.value <= 0 && res.result.value != -1) {
                    //没次数了
                    that.setData({
                        CountFlag: false,
                        count: res.result.value
                    });
                } else {
                    that.setData({
                        CountFlag: true,
                        count: res.result.value
                    });
                }
            } else {
                wx.showToast({
                    title: res.message
                });
            }
            wx.hideLoading();
        });
    },
    UseFunctionLogsInsert: function UseFunctionLogsInsert(userNumId, functionNumId, userPermissionId) {
        _api2.default.UseFunctionLogsInsert("Users/UseFunctionLogs/Insert", "POST", userNumId, functionNumId, userPermissionId).then(function(res) {});
    },
    goPay: function goPay() {
        wx.navigateTo({
            url: "/packages/paySystem/memberCardDetail/memberCardDetail"
        });
    },
    showToast: function showToast() {
        wx.showToast({
            title: "以上均为必填项",
            icon: "none",
            duration: 1500
        });
    }
});