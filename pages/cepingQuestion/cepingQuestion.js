var api = require("../../utils/api.js");

var app = getApp();

var progressWidth = 0;

var touchStartTime = 0;

var disabledFlagS = false;

var disabledFlagE = false;

Page({
    data: {
        wrap: false,
        opacity: "",
        showLoad: true,
        isShare: false,
        progressWidth: 0,
        QuestionAnswers: [],
        currentTab: 0,
        chooseChecked: false,
        anwersScore: 0,
        nextAnswersFlag: false,
        parents: "父亲方面",
        cepingType: null,
        questionList: [],
        prossWidth: 0,
        num: 1,
        answers: "",
        answers1: "",
        userInfo: [],
        QuestionTestTime: null,
        results: [],
        answerNumber: [ "A", "B", "C", "D", "E", "F", "G", "H" ]
    },
    getSwiperH: function getSwiperH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.select("#swiperHeight").boundingClientRect();
        item.exec(function(res) {
            that.setData({
                swiperH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
            });
        });
    },
    onShareAppMessage: function onShareAppMessage(e) {
        var that = this;
        if (that.data.num == that.data.questionList.questions.length) {
            that.setData({
                isShare: true
            });
        }
        return {
            title: "我正在测[" + that.data.cepingName + "]推荐你也来测一测吧！",
            path: "/pages/cepingIndex/cepingIndex",
            imageUrl: "http://wmei-appfile.cn-bj.ufileos.com/share_cp.png"
        };
    },
    onShow: function onShow() {
        disabledFlagS = false;
        disabledFlagE = false;
        if (this.data.isShare) {
            wx.showToast({
                title: "分享成功",
                icon: "none",
                duration: 2e3
            });
            this.insertReport();
        }
    },
    onLoad: function onLoad(options) {
        var that = this;
        wx.getSystemInfo({
            success: function success(res) {
                progressWidth = res.screenWidth * .9;
                that.setData({
                    progressWidth: progressWidth
                });
            }
        });
        var cepingType = options.type;
        var cepingName = options.name;
        that.setData({
            cepingName: cepingName
        });
        wx.showNavigationBarLoading();
        that.setData({
            cepingType: cepingType,
            QuestionTestTime: new Date().getTime()
        });
        wx.getStorage({
            key: "userInfo",
            success: function success(res) {
                that.setData({
                    userInfo: res.data
                });
            }
        });
        api.getE360Question("Evaluation/Complex/Get?type=" + cepingType, "POST").then(function(res) {
            // wx.setNavigationBarTitle({ title: res.Results[0].Name });
            that.selectComponent("#navigationcustom").setNavigationAll(res.result.name, true);
            that.setData({
                questionList: res.result,
                QuestionAnswers: res.result.questions[0],
                progressCheckedWidth: progressWidth / res.result.questions.length * (that.data.num + 1),
                showLoad: false
            }, function() {
                that.getSwiperH();
            });
            wx.hideNavigationBarLoading();
        });
    },
    nextAnswersMain: function nextAnswersMain(e) {
        if (disabledFlagE) return;
        disabledFlagE = true;
        var that = this;
        var score = e.currentTarget.dataset.score;
        var id = e.currentTarget.dataset.id;
        var touchEndTime = e.timeStamp;
        if (touchEndTime - touchStartTime < 300) {
            setTimeout(function() {
                that.next(id, score);
            }, 300);
        } else {
            that.next(id, score);
        }
    },
    next: function next(id, score) {
        var that = this;
        var num = that.data.num;
        var answers = that.data.answers;
        var QuestionLength = that.data.questionList.questions.length;
        if (num == 1) {
            answers += id + ":" + score;
        } else {
            answers += "," + id + ":" + score;
        }
        var time = new Date().getTime();
        var QuestionTestTime = time - that.data.QuestionTestTime;
        that.setData({
            parents: "父亲方面",
            QuestionTestTime: time,
            results: that.data.results.concat({
                Id: id,
                Score: score,
                QuestionTestTime: QuestionTestTime
            })
        });
        if (num >= QuestionLength) {
            var cepingType = that.data.cepingType;
            var userid = that.data.userInfo[0].UserId;
            that.setData({
                answers: answers
            });
            try {
                var cpList = wx.getStorageSync("cpList");
                if (cpList) {
                    for (var j = 0; j < cpList.length; j++) {
                        if (cpList[j].type == cepingType) {
                            if (cepingType >= 1 && cepingType <= 6) {
                                cpList[j].reportNum += 1;
                            } else {
                                cpList[j].reportNum = 1;
                            }
                            try {
                                wx.setStorageSync("cpList", cpList);
                            } catch (e) {}
                            break;
                        }
                    }
                }
            } catch (e) {}
            that.setData({
                cepingType: cepingType,
                userid: userid,
                isShare: true,
                wrap: false
            });
        } else {
            that.setData({
                chooseChecked: false,
                currentTab: that.data.currentTab + 1,
                num: num + 1,
                answers: answers,
                progressCheckedWidth: progressWidth / that.data.questionList.questions.length * (that.data.num + 1)
            }, function() {
                setTimeout(function() {
                    disabledFlagS = false;
                    disabledFlagE = false;
                    that.setData({
                        wrap: false
                    });
                }, 500);
            });
        }
        this.setData({
            QuestionAnswers: that.data.questionList.questions[that.data.currentTab]
        });
    },
    nextAnswers: function nextAnswers(e) {
        if (disabledFlagS) return;
        disabledFlagS = true;
        var that = this;
        touchStartTime = e.timeStamp;
        var score = e.currentTarget.dataset.score;
        var id = e.currentTarget.dataset.id;
        that.setData({
            wrap: true,
            anwersScore: score,
            chooseChecked: true
        });
    },
    //插入测评记录
    insertReport: function insertReport() {
        var that = this;
        api.saveResults("MiniProgram/Evaluation/Save", "POST", that.data.cepingType, that.data.userid, that.data.answers, that.data.answers1, that.data.results).then(function(res) {
            try {
                wx.setStorageSync("ReportId", res.result.id);
            } catch (e) {}
            wx.redirectTo({
                url: "../webPage/webPage?url=" + res.result.returnUrl + "&id=" + res.result.id
            });
        });
    },
    fathernextAnswers: function fathernextAnswers(e) {
        if (disabledFlagS) return;
        disabledFlagS = true;
        var that = this;
        touchStartTime = e.timeStamp;
        var score = e.currentTarget.dataset.score;
        that.setData({
            wrap: true,
            anwersScore: score,
            chooseChecked: true
        });
    },
    fathernextEnd: function fathernextEnd(e) {
        if (disabledFlagE) return;
        disabledFlagE = true;
        var that = this;
        var score = e.currentTarget.dataset.score;
        var id = e.currentTarget.dataset.id;
        var answers = that.data.answers;
        var QuestionLength = that.data.questionList.questions.length;
        var num = that.data.num;
        if (num == 1) {
            answers += id + ":" + score;
        } else {
            answers += "," + id + ":" + score;
        }
        if (num >= QuestionLength) {
            that.setData({
                answers1: answers
            });
        }
        var touchEndTime = e.timeStamp;
        if (touchEndTime - touchStartTime < 300) {
            setTimeout(function() {
                that.setData({
                    parents: "母亲方面",
                    chooseChecked: false,
                    wrap: false
                }, function() {
                    disabledFlagS = false;
                    disabledFlagE = false;
                });
            }, 300);
        } else {
            that.setData({
                parents: "母亲方面",
                chooseChecked: false,
                wrap: false
            }, function() {
                disabledFlagS = false;
                disabledFlagE = false;
            });
        }
    },
    noTouchMove: function noTouchMove() {},
    noBindTap: function noBindTap() {},
    choose: function choose() {
        var that = this;
        that.setData({});
    }
});