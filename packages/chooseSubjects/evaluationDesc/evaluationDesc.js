var app = getApp();

var api = require("../api.js");

var progressWidth = 0;

var upperBtnFlag = false;

var answerArr = [];

var sex = 0;

var isPatriarch = false;

var currentTime = 0;

var upperTime = 0;

var openId = "";

var touchStartTime = 0;

var disabledFlagS = false;

var disabledFlagE = false;

Page({
    data: {
        isClickShareFlag: false,
        isShare: false,
        currentTab: 0,
        color: null,
        test: true,
        showLoad: true,
        statusBarHeight: app.globalData.navigationCustomStatusHeight,
        barHeight: app.globalData.navigationCustomCapsuleHeight,
        answersList: [],
        questionId: 1,
        changeAnimate: "changeAnimateShow",
        checkedId: 0,
        checkedStyle: false,
        disabledFlag: false,
        completePopup: {
            bgOpacity: 0,
            wrapAnimate: "",
            popupAnimate: "",
            completeFlag: ""
        },
        upperProblem: {
            bgOpacity: 0,
            wrapAnimate: "",
            popupAnimate: "",
            upperProblemFlag: ""
        },
        quitPopup: {
            bgOpacity: 0,
            wrapAnimate: "",
            popupAnimate: "",
            quitFlag: ""
        },
        progressWidth: 0,
        progressCheckedWidth: 0,
        upperBtnFlag: false,
        answerNumber: [ "A", "B", "C", "D", "E", "F" ]
    },
    getSwiperH: function getSwiperH(index) {
        console.log("计算", "#answersList" + index);
        var that = this;
        var item = wx.createSelectorQuery();
        item.select("#answersList" + index).boundingClientRect();
        item.exec(function(res) {
            that.setData({
                swiperH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
            });
            console.log(res);
        });
    },
    onShareAppMessage: function onShareAppMessage(e) {
        var that = this;
        this.setData({
            isClickShareFlag: true
        });
        return {
            title: "我正在测[" + that.data.title + "]推荐你也来测一测吧！",
            imageUrl: "",
            path: "/pages/cepingIndex/cepingIndex"
        };
    },
    onShow: function onShow() {
        disabledFlagS = false;
        disabledFlagE = false;
        var isClickShareFlag = this.data.isClickShareFlag;
        if (isClickShareFlag) {
            this.proOrientationInsert();
        }
    },
    onLoad: function onLoad(options) {
        var screenHeight = wx.getSystemInfoSync().windowHeight;
        this.setData({
            screenHeight: screenHeight
        });
        answerArr = [];
        this.setData({
            statusBarHeight: app.globalData.navigationCustomStatusHeight,
            barHeight: app.globalData.navigationCustomCapsuleHeight
        });
        isPatriarch = options.ispatriarch == "false" ? false : true;
        var timestamp = new Date().getTime();
        currentTime = timestamp;
        upperTime = timestamp;
        sex = options.sex;
        var that = this;
        wx.getSystemInfo({
            success: function success(res) {
                progressWidth = res.screenWidth * .9;
                that.setData({
                    progressWidth: progressWidth
                });
            }
        });
        that.loadMergedGet();
    },
    // 获取5合1测评题目内容
    loadMergedGet: function loadMergedGet() {
        var that = this;
        api.getMerged("Evaluation/Merged/Get", "POST").then(function(res) {
            that.setData({
                answersList: res.result,
                progressCheckedWidth: that.data.progressWidth / res.result.length * that.data.questionId,
                showLoad: false
            }, function() {
                that.getSwiperH(0);
            });
        });
    },
    // 自定义导航返回上一页
    navigateBack: function navigateBack() {
        this.showPopup("quit");
    },
    animationstart: function animationstart(e) {
        console.log("按下", disabledFlagS);
        if (disabledFlagS) return;
        disabledFlagS = true;
        touchStartTime = e.timeStamp;
        var id = e.currentTarget.dataset.id;
        this.setData({
            currentId: id,
            checkedStyle: true,
            wrap: true
        });
    },
    animationend: function animationend(e) {
        console.log("抬起", disabledFlagE);
        var that = this;
        if (disabledFlagE) return;
        disabledFlagE = true;
        var id = e.currentTarget.dataset.id;
        var idx = e.currentTarget.dataset.idx;
        var answerid = e.currentTarget.dataset.answerid;
        var touchEndTime = e.timeStamp;
        if (touchEndTime - touchStartTime < 300) {
            console.log(333);
            setTimeout(function() {
                that.next(answerid, id, idx);
            }, 300);
        } else {
            console.log(444);
            that.next(answerid, id, idx);
        }
    },
    next: function next(answerid, id, idx) {
        var that = this;
        if (this.data.questionId >= this.data.answersList.length) {
            var time = new Date().getTime();
            var chooseTime = time - upperTime;
            upperTime = time;
            answerArr.push({
                id: answerid,
                score: parseInt(id),
                chooseTime: chooseTime
            });
            currentTime = time - currentTime;
            this.setData({
                isShare: true,
                wrap: false
            });
        } else {
            var _time = new Date().getTime();
            var _chooseTime = _time - upperTime;
            upperTime = _time;
            answerArr.push({
                id: answerid,
                score: parseInt(id),
                chooseTime: _chooseTime
            });
            this.setData({
                checkedStyle: false,
                currentTab: this.data.currentTab + 1,
                questionId: this.data.questionId + 1,
                progressCheckedWidth: progressWidth / that.data.answersList.length * (that.data.questionId + 1)
            }, function() {
                setTimeout(function() {
                    that.setData({
                        wrap: false
                    });
                    disabledFlagS = false;
                    disabledFlagE = false;
                }, 600);
            });
            that.getSwiperH(idx + 1);
        }
    },
    // // 选择答案
    // chooseAnswer(e) {
    //   if (this.data.disabledFlag) return;
    //   let id = e.currentTarget.dataset.id;
    //   let answerid = e.currentTarget.dataset.answerid;
    //   this.setData({
    //     checkedId: id,
    //     checkedStyle: true,
    //     disabledFlag: true
    //   });
    //   if (this.data.questionId >= this.data.answersList.length) {
    //     const time = (new Date()).getTime();
    //     const chooseTime = time - upperTime;
    //     upperTime = time;
    //     answerArr.push({
    //       id: answerid,
    //       score: parseInt(id),
    //       chooseTime: chooseTime
    //     });
    //     currentTime = time - currentTime;
    //     this.proOrientationInsert();
    //   } else {
    //     const time = (new Date()).getTime();
    //     const chooseTime = time - upperTime;
    //     upperTime = time;
    //     answerArr.push({
    //       id: answerid,
    //       score: parseInt(id),
    //       chooseTime: chooseTime
    //     });
    //     this.changeQueation();
    //   }
    // },
    // 定位测评存储+结果
    proOrientationInsert: function proOrientationInsert() {
        var numId = wx.getStorageSync("userInfo")[0].UserId;
        api.proOrientationInsert("Evaluation/Result/ProfessionOrientation/Insert", "POST", numId, parseInt(sex), parseInt(currentTime), answerArr, isPatriarch).then(function(res) {
            wx.hideLoading();
            var id = res.result;
            if (isPatriarch == true) {
                wx.redirectTo({
                    url: "../../evaluation/parentComplete/parentComplete?type=choosesubject"
                });
            } else {
                // wx.redirectTo({
                //   url: '/pages/webPage/webPage?url=https://m.wmei.cn/evaluations/majorCompleteReport&id=' + id
                // });
                wx.redirectTo({
                    url: "../loading/loading?type=1&id=" + id
                });
            }
        });
    },
    showPopup: function showPopup(type) {
        var that = this;
        if (type == "upper") {
            that.setData({
                "upperProblem.bgOpacity": 0,
                "upperProblem.wrapAnimate": "wrapAnimate",
                "upperProblem.popupAnimate": "popupAnimate",
                "upperProblem.upperProblemFlag": true
            });
        } else if (type == "complete") {
            that.setData({
                "completePopup.bgOpacity": 0,
                "completePopup.wrapAnimate": "wrapAnimate",
                "completePopup.popupAnimate": "popupAnimate",
                "completePopup.completeFlag": true
            });
        } else if (type == "quit") {
            that.setData({
                "quitPopup.bgOpacity": 0,
                "quitPopup.wrapAnimate": "wrapAnimate",
                "quitPopup.popupAnimate": "popupAnimate",
                "quitPopup.quitFlag": true
            });
        }
    },
    hidePopup: function hidePopup(type) {
        var that = this;
        if (type == "upper") {
            that.setData({
                "upperProblem.bgOpacity": .4,
                "upperProblem.wrapAnimate": "wrapAnimateOut",
                "upperProblem.popupAnimate": "popupAnimateOut"
            });
            setTimeout(function() {
                that.setData({
                    "upperProblem.upperProblemFlag": false
                });
            }, 200);
        } else if (type == "complete") {
            that.setData({
                "completePopup.bgOpacity": .4,
                "completePopup.wrapAnimate": "wrapAnimateOut",
                "completePopup.popupAnimate": "popupAnimateOut"
            });
            setTimeout(function() {
                that.setData({
                    "completePopup.completeFlag": false
                });
            }, 200);
        } else if (type == "quit") {
            that.setData({
                "quitPopup.bgOpacity": .4,
                "quitPopup.wrapAnimate": "wrapAnimateOut",
                "quitPopup.popupAnimate": "popupAnimateOut"
            });
            setTimeout(function() {
                that.setData({
                    "quitPopup.quitFlag": false
                });
            }, 200);
        }
    },
    // 退出
    quit: function quit(e) {
        var checked = parseInt(e.currentTarget.dataset.checked);
        // checked==0 再想想
                if (checked == 0) {
            this.setData({
                checkedStyle: false,
                disabledFlag: false
            });
            this.hidePopup("quit");
        } else {
            wx.redirectTo({
                url: "/packages/chooseSubjects/evaluation/evaluation"
            });
        }
    },
    // 上一题
    upperProblem: function upperProblem() {
        var that = this;
        if (upperBtnFlag == true) return;
        upperBtnFlag = true;
        that.setData({
            upperBtnFlag: true
        });
        if (that.data.questionId <= 1) {
            that.showPopup("upper");
            upperBtnFlag = false;
            that.setData({
                upperBtnFlag: false
            });
        } else {
            answerArr.pop();
            that.setData({
                disabledFlag: true,
                progressCheckedWidth: progressWidth / that.data.answersList.length * (that.data.questionId - 1)
            });
            that.setData({
                changeAnimate: "changeAnimateHide"
            }, function() {
                setTimeout(function() {
                    that.setData({
                        changeAnimate: "changeAnimateShow",
                        questionId: that.data.questionId - 1
                    }, function() {
                        setTimeout(function() {
                            that.setData({
                                disabledFlag: false,
                                upperBtnFlag: false
                            });
                            upperBtnFlag = false;
                        }, 100);
                    });
                }, 500);
            });
        }
    },
    // 上一题隐藏弹框
    hideUpperProblem: function hideUpperProblem() {
        this.hidePopup("upper");
    }
});