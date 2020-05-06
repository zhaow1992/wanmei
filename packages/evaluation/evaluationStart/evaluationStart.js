var app = getApp();

var api = require("./api.js");

var sensors = require("../../../utils/sensors.js");

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
        index: 0,
        firstList: 0,
        lastList: 100,
        opacityOut: "",
        // currentIndex:1,
        title: "专业定位测评",
        isClickShareFlag: false,
        isShare: false,
        test: true,
        showLoad: true,
        statusBarHeight: app.globalData.navigationCustomStatusHeight,
        barHeight: app.globalData.navigationCustomCapsuleHeight,
        answersList: [],
        currentAnswer: [],
        questionId: 1,
        checkedId: 0,
        checkedStyle: false,
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
    count: 0,
    onShareAppMessage: function onShareAppMessage(e) {
        var that = this;
        if (that.data.questionId >= that.data.answersList.length) {
            that.setData({
                isClickShareFlag: true
            });
        }
        var data = {
            SA_share_type: "专业定位测评答题",
            SA_share_content: "我正在测[" + that.data.title + "]推荐你也来测一测吧！"
        };
        app.sensors.track("ShareClick", sensors.ShareClick(data));
        return {
            title: "我正在测[" + that.data.title + "]推荐你也来测一测吧！",
            imageUrl: "http://wmei-appfile.cn-bj.ufileos.com/share_cp.png",
            path: "/pages/cepingIndex/cepingIndex"
        };
    },
    onShow: function onShow() {
        disabledFlagS = false;
        disabledFlagE = false;
        var isClickShareFlag = this.data.isClickShareFlag;
        if (isClickShareFlag) {
            wx.showToast({
                title: "分享成功",
                icon: "none",
                duration: 2e3
            });
            this.proOrientationInsert();
        }
    },
    onLoad: function onLoad(options) {
        this.options = options;
        if (options.subject) {
            this.setData({
                chooseSub: true
            });
        }
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
        var data = {
            SA_eval_name: isPatriarch ? "专业定位测评（家长）" : "专业定位测评（学生）",
            SA_is_finished: false
        };
        app.sensors.track("EvalStart", sensors.EvalStart(data));
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
        api.getMerged("Evaluation/Merged/Get", "POST", this.options.ispatriarch).then(function(res) {
            var currentAnswer = [];
            currentAnswer.push(res.result[0]);
            currentAnswer.push(res.result[1]);
            that.setData({
                answersList: res.result,
                currentAnswer: currentAnswer,
                progressCheckedWidth: that.data.progressWidth / res.result.length * that.data.questionId,
                showLoad: false
            }, function() {
                // that.getSwiperH(0);
            });
        });
    },
    // 自定义导航返回上一页
    navigateBack: function navigateBack() {
        this.showPopup("quit");
    },
    //鼠标按下
    animationstart: function animationstart(e) {
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
    //鼠标抬起
    animationend: function animationend(e) {
        var that = this;
        if (disabledFlagE) return;
        disabledFlagE = true;
        var id = e.currentTarget.dataset.id;
        var idx = e.currentTarget.dataset.idx;
        var answerid = e.currentTarget.dataset.answerid;
        var touchEndTime = e.timeStamp;
        if (touchEndTime - touchStartTime < 300) {
            setTimeout(function() {
                that.next(answerid, id, idx);
            }, 300);
        } else {
            that.next(answerid, id, idx);
        }
    },
    //抬起之后的操作
    next: function next(answerid, id, idx) {
        this.count++;
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
            // that.nextQuestion();
            var _time = new Date().getTime();
            var _chooseTime = _time - upperTime;
            upperTime = _time;
            answerArr.push({
                id: answerid,
                score: parseInt(id),
                chooseTime: _chooseTime
            });
            var index = this.data.index;
            index++;
            if (index == 3) {
                index = 1;
            }
            that.setData({
                index: index,
                opacityOut: "opacityOut",
                checkedStyle: false,
                questionId: this.data.questionId + 1,
                progressCheckedWidth: progressWidth / that.data.answersList.length * (that.data.questionId + 1)
            }, function() {
                if (index == 1) {
                    that.setData({
                        firstList: -100,
                        lastList: 0
                    }, function() {
                        setTimeout(function() {
                            that.setData({
                                firstList: 100,
                                "currentAnswer[0]": that.data.answersList[that.data.questionId],
                                "currentAnswer[1]": that.data.answersList[that.data.questionId - 1]
                            }, function() {
                                setTimeout(function() {
                                    that.setData({
                                        wrap: false
                                    }, function() {
                                        disabledFlagS = false;
                                        disabledFlagE = false;
                                    });
                                }, 500);
                            });
                        }, 300);
                    });
                } else if (index == 2) {
                    that.setData({
                        firstList: 0,
                        lastList: -100
                    }, function() {
                        setTimeout(function() {
                            that.setData({
                                lastList: 100,
                                "currentAnswer[1]": that.data.answersList[that.data.questionId],
                                "currentAnswer[0]": that.data.answersList[that.data.questionId - 1]
                            }, function() {
                                setTimeout(function() {
                                    that.setData({
                                        wrap: false
                                    }, function() {
                                        disabledFlagS = false;
                                        disabledFlagE = false;
                                    });
                                }, 500);
                            });
                        }, 300);
                    });
                }
            });
            // setTimeout(()=>{
            //   let currentAnswer = this.data.currentAnswer;
            //   if (that.count == 2) {
            //     currentAnswer[0] = this.data.answersList[this.data.questionId-1];
            //     currentAnswer[1] = this.data.answersList[this.data.questionId];
            //     that.setData({
            //       currentAnswer
            //     })
            //     that.count = 0;
            //   }
            // },200)
            // this.setData({
            //   opacityOut: 'opacityOut',
            //   checkedStyle: false,
            //   questionId: this.data.questionId + 1,
            //   progressCheckedWidth: progressWidth / that.data.answersList.length * (that.data.questionId + 1)
            // }, () => {
            //   setTimeout(() => {
            //     that.setData({
            //       checkedStyle: false,
            //       wrap: false,
            //     }, () => {
            //       disabledFlagS = false;
            //       disabledFlagE = false;
            //     })
            //   }, 600)
            // });
                }
    },
    //切换下一题动画
    nextQuestion: function nextQuestion() {
        var that = this;
        var index = this.data.index;
        index++;
        if (index == 3) {
            index = 1;
        }
        that.setData({
            index: index
        }, function() {
            if (index == 1) {
                that.setData({
                    firstList: -100,
                    lastList: 0
                }, function() {
                    setTimeout(function() {
                        that.setData({
                            firstList: 100
                        });
                    }, 400);
                });
            } else if (index == 2) {
                that.setData({
                    firstList: 0,
                    lastList: -100
                }, function() {
                    setTimeout(function() {
                        that.setData({
                            lastList: 100
                        });
                    }, 400);
                });
            }
        });
    },
    // 定位测评存储+结果
    proOrientationInsert: function proOrientationInsert() {
        var _this = this;
        var that = this;
        var numId = wx.getStorageSync("userInfo")[0].UserId;
        api.proOrientationInsert("Evaluation/Result/ProfessionOrientation/Insert", "POST", numId, parseInt(sex), parseInt(currentTime), answerArr, isPatriarch).then(function(res) {
            wx.hideLoading();
            var id = res.result;
            var testName = "专业定位测评(学生)";
            if (isPatriarch == true) {
                testName = "专业定位测评(家长)";
            }
            var data = {
                SA_eval_name: testName,
                SA_num_finished: _this.data.questionId,
                SA_sheets_code: id
            };
            app.sensors.track("EvalFinish", sensors.EvalFinish(data));
            if (that.data.chooseSub) {
                if (isPatriarch == true) {
                    wx.redirectTo({
                        url: "../parentComplete/parentComplete?type=choosesubject"
                    });
                } else {
                    wx.redirectTo({
                        url: "/packages/chooseSubjects/loading/loading?type=1&id=" + id
                    });
                }
            } else {
                if (isPatriarch == true) {
                    wx.redirectTo({
                        url: "../parentComplete/parentComplete"
                    });
                } else {
                    wx.redirectTo({
                        url: "/pages/evaluationResult/evaluationResult?id=" + id
                    });
                }
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
            wx.navigateBack({
                delta: 1
            });
            var time = new Date().getTime();
            var chooseTime = time - currentTime;
            var data = {
                SA_eval_name: isPatriarch ? "专业定位测评（家长）" : "专业定位测评（学生）",
                SA_num_finished: this.data.questionId - 1,
                SA_quit_name: this.data.answersList[this.data.questionId - 1].question,
                chooseTime: chooseTime
            };
            app.sensors.track("EvalQuit", sensors.EvalQuit(data));
        }
    },
    // 上一题
    // upperProblem() {
    //   const that = this;
    //   if (upperBtnFlag == true) return;
    //   upperBtnFlag = true;
    //   that.setData({
    //     upperBtnFlag: true
    //   });
    //   if (that.data.questionId <= 1) {
    //     that.showPopup('upper');
    //     upperBtnFlag = false;
    //     that.setData({
    //       upperBtnFlag: false
    //     })
    //   } else {
    //     answerArr.pop();
    //     that.setData({
    //       disabledFlag: true,
    //       progressCheckedWidth: progressWidth / that.data.answersList.length * (that.data.questionId - 1)
    //     });
    //     that.setData({
    //       changeAnimate: 'changeAnimateHide'
    //     }, () => {
    //       setTimeout(() => {
    //         that.setData({
    //           changeAnimate: 'changeAnimateShow',
    //           questionId: that.data.questionId - 1
    //         }, () => {
    //           setTimeout(() => {
    //             that.setData({
    //               disabledFlag: false,
    //               upperBtnFlag: false
    //             });
    //             upperBtnFlag = false;
    //           }, 100)
    //         })
    //       }, 500)
    //     })
    //   }
    // },
    // 上一题隐藏弹框
    hideUpperProblem: function hideUpperProblem() {
        this.hidePopup("upper");
    }
});