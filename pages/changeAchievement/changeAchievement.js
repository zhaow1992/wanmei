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

var api = require("../../utils/api.js");

var app = getApp();

Page({
    data: {
        showLoad: true,
        finishFlag: false,
        popup: {
            popupFlag: false,
            wrapAnimate: "",
            popupAnimate: "",
            bgOpacity: ""
        },
        changeNumber: 0,
        traditionSubject: [ //传统省份文理
        {
            name: "文科",
            flag: false
        }, {
            name: "理科",
            flag: false
        } ],
        traditionSelected: "",
        //传统省份已选择
        SHtestSubject: [ //上海选测科目
        {
            name: "历史",
            flag: false
        }, {
            name: "地理",
            flag: false
        }, {
            name: "政治",
            flag: false
        }, {
            name: "物理",
            flag: false
        }, {
            name: "化学",
            flag: false
        }, {
            name: "生物",
            flag: false
        } ],
        SHselectedSubjectArr: [],
        //上海 浙江已选择的科目
        JStestSubject1: [ //江苏选测科目1
        {
            name: "历史",
            flag: true
        }, {
            name: "物理",
            flag: false
        } ],
        JStestSubject2: [ //江苏选测科目2
        {
            name: "政治",
            flag: true
        }, {
            name: "地理",
            flag: false
        }, {
            name: "化学",
            flag: false
        }, {
            name: "生物",
            flag: false
        } ],
        JStestLevel1: [ //江苏选测等级1
        {
            name: "A+",
            flag: true
        }, {
            name: "A",
            flag: false
        }, {
            name: "B+",
            flag: false
        }, {
            name: "B",
            flag: false
        }, {
            name: "C",
            flag: false
        }, {
            name: "D",
            flag: false
        } ],
        JStestLevel2: [ //江苏选测等级2
        {
            name: "A+",
            flag: true
        }, {
            name: "A",
            flag: false
        }, {
            name: "B+",
            flag: false
        }, {
            name: "B",
            flag: false
        }, {
            name: "C",
            flag: false
        }, {
            name: "D",
            flag: false
        } ],
        JSselectedSubject1: "",
        //江苏已选择科目1
        JSselectedLevel1: "",
        //江苏已选择等级1
        JSselectedSubject2: "",
        //江苏已选择科目2
        JSselectedLevel3: "",
        //江苏已选择等级2
        ZJtestSubject: [ //浙江选测科目
        {
            name: "历史",
            flag: false
        }, {
            name: "地理",
            flag: false
        }, {
            name: "政治",
            flag: false
        }, {
            name: "物理",
            flag: false
        }, {
            name: "化学",
            flag: false
        }, {
            name: "生物",
            flag: false
        }, {
            name: "技术",
            flag: false
        } ]
    },
    //上海  选择选测科目
    SHselectTestSubject: function SHselectTestSubject(e) {
        var name = e.currentTarget.dataset.name;
        var SHtestSubject = this.data.SHtestSubject;
        var SHselectedSubjectArr = this.data.SHselectedSubjectArr;
        var finishFlag = void 0;
        SHtestSubject.forEach(function(ele) {
            if (ele.name == name) {
                if (SHselectedSubjectArr.indexOf(ele.name) == -1) {
                    if (SHselectedSubjectArr.length === 3) {
                        wx.showToast({
                            title: "最多选择3个科目",
                            icon: "none",
                            duration: 2e3
                        });
                        return;
                    }
                    SHselectedSubjectArr.push(ele.name);
                } else {
                    SHselectedSubjectArr.forEach(function(el, index) {
                        if (el == ele.name) {
                            SHselectedSubjectArr.splice(index, 1);
                        }
                    });
                }
                ele.flag = !ele.flag;
            }
        });
        if (this.data.SHscore && SHselectedSubjectArr.length === 3) {
            finishFlag = true;
        } else {
            finishFlag = false;
        }
        this.setData({
            SHtestSubject: SHtestSubject,
            finishFlag: finishFlag
        });
    },
    //上海  输入成绩
    SHinputScore: function SHinputScore(e) {
        var value = e.detail.value;
        var finishFlag = void 0;
        if (value && this.data.SHselectedSubjectArr.length === 3) {
            finishFlag = true;
        } else {
            finishFlag = false;
        }
        this.setData({
            SHscore: value,
            finishFlag: finishFlag
        });
    },
    //获取用户剩余更改成绩次数
    getNumber: function getNumber(userNumId) {
        var that = this;
        api.getNumber("Users/Scores/GetNumber", "POST", userNumId, app.globalData.isGaokaoFlag).then(function(res) {
            if (res.isSuccess) {
                that.setData({
                    changeNumber: res.result.value
                });
            }
            that.setData({
                showLoad: false
            });
        });
    },
    //创建之前对比数据是否相等
    dataEqual: function dataEqual() {
        var cityId = this.data.cityId;
        var userScore = wx.getStorageSync("userScore");
        var inputScore = this.data.SHscore;
        var flag = void 0;
        if (userScore.total) {
            //有初始化选择数据
            if (cityId === 1) {
                var tmpArr = userScore.chooseLevelOrSubjects.split(",");
                var JSsub1 = tmpArr[0].split("=")[0];
                var JSlevel1 = tmpArr[0].split("=")[1];
                var JSsub2 = tmpArr[1].split("=")[0];
                var JSlevel2 = tmpArr[1].split("=")[1];
                flag = userScore.total == inputScore && JSsub1 == this.data.JSselectedSubject1 && JSsub2 == this.data.JSselectedSubject2 && JSlevel1 == this.data.JSselectedLevel1 && JSlevel2 == this.data.JSselectedLevel2 ? true : false;
            } else if (cityId === 842 || cityId === 843) {
                var tempArr = this.data.SHselectedSubjectArr;
                flag = userScore.total == inputScore && JSON.stringify(userScore.chooseSubjects.sort()) === JSON.stringify(tempArr.sort()) ? true : false;
            } else {
                flag = userScore.total == inputScore && userScore.courseType == this.data.traditionSelected ? true : false;
            }
            return flag;
        } else {
            //没有初始化选择数据
            return false;
        }
    },
    //最后点击创建成绩
    setScore: function setScore() {
        var that = this;
        var userInfo = that.data.userInfo;
        var userScore = that.data.userScore;
        var provinceId = userInfo.Province;
        var totalScore = parseInt(that.data.SHscore);
        var course = userInfo.courseType;
        var userNumId = userInfo.UserId;
        var provinceNumId = userInfo.Province;
        var rank = userScore.rank;
        var scoreType = userScore.scoreType;
        var courseType = userInfo.courseType;
        var total = parseInt(this.data.SHscore);
        var chooseSubjects = this.data.SHselectedSubjectArr;
        var chooseLevelList = [];
        //江苏选测等级  其他省为空
                var JSselectedLevel = void 0;
        var provinceTotalScore = 750;
        //总分数
                if (this.data.cityId === 1) {
            //江苏
            provinceTotalScore = 480;
            chooseSubjects = [];
            chooseLevelList = [ {
                name: this.data.JSselectedSubject1,
                value: this.data.JSselectedLevel1
            }, {
                name: this.data.JSselectedSubject2,
                value: this.data.JSselectedLevel2
            } ];
        }
        if (this.data.cityId === 853) {
            provinceTotalScore = 950;
        }
        if (this.data.cityId === 842) {
            provinceTotalScore = 660;
        }
        if (totalScore < 100) {
            wx.showToast({
                title: "总分不能小于100分",
                icon: "none",
                duration: 2e3
            });
            return;
        }
        if (totalScore > provinceTotalScore) {
            wx.showToast({
                title: "总分不能大于" + provinceTotalScore + "分",
                icon: "none",
                duration: 2e3
            });
            return;
        }
        //对比所选数据是否发生变化
                if (this.dataEqual()) {
            // wx.showToast({
            //   title: '与之前选择项相同，无需更改',
            //   icon: 'none',
            //   duration: 2000
            // })
            wx.navigateBack({
                detal: 1
            });
            return;
        }
        wx.showLoading({
            title: "创建成绩中"
        });
        //先查批次  上海浙江除外
                if (this.data.cityId === 842 || this.data.cityId === 843) {
            courseType = -1;
            that.insertUserScore(userNumId, provinceNumId, total, rank, 0, scoreType, courseType, chooseSubjects, chooseLevelList);
        } else {
            courseType = that.data.traditionSelected;
            api.getRightBatch("TZY/Func/GetRightBatch", "POST", provinceId, totalScore, course).then(function(res) {
                that.insertUserScore(userNumId, provinceNumId, total, rank, res.result.batch, scoreType, courseType, chooseSubjects, chooseLevelList);
            });
        }
    },
    //公共的插入成绩方法
    insertUserScore: function insertUserScore(userNumId, provinceNumId, total, rank, batch, scoreType, courseType, chooseSubjects, chooseLevelList) {
        var that = this;
        api.insertUserScore("Users/Scores/Insert", "POST", userNumId, provinceNumId, total, rank, batch, scoreType, courseType, chooseSubjects, chooseLevelList).then(function(res) {
            wx.hideLoading();
            if (res.isSuccess) {
                that.getUserScore(res.result.numId, batch);
            } else {
                wx.showToast({
                    title: res.message,
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    //根据插入成绩的id查找最新的成绩信息
    getUserScore: function getUserScore(numId, batch) {
        api.GetScore("Users/Scores/Get?numId=" + numId, "POST").then(function(res) {
            if (res.isSuccess) {
                var userScore = {
                    total: res.result.total,
                    rank: res.result.rank,
                    provinceNumId: res.result.provinceNumId,
                    chooseLevelOrSubjects: res.result.chooseLevelOrSubjects,
                    chooseSubjects: res.result.chooseSubjectsFormat,
                    chooseLevelList: res.result.chooseLevelFormat,
                    scoreType: res.result.scoreType,
                    courseType: res.result.courseTypeId,
                    batch: batch
                };
                wx.setStorage({
                    key: "userScore",
                    data: userScore
                });
                wx.navigateBack({
                    delta: 1
                });
            } else {
                wx.showToast({
                    title: res.message,
                    icon: "none"
                });
            }
        });
    },
    //传统省份 江苏省  输入成绩
    traditionInputScore: function traditionInputScore(e) {
        var value = e.detail.value;
        var finishFlag = void 0;
        if (this.data.cityId === 1) {
            if (value) {
                finishFlag = true;
            } else {
                finishFlag = false;
            }
        } else {
            if (value && this.data.traditionSelected !== "") {
                finishFlag = true;
            } else {
                finishFlag = false;
            }
        }
        this.setData({
            SHscore: value,
            finishFlag: finishFlag
        });
    },
    //传统省份选择文理
    traditionSubject: function traditionSubject(e) {
        var name = e.currentTarget.dataset.name;
        var traditionSubject = this.data.traditionSubject;
        var traditionSelected = this.data.traditionSelected;
        var finishFlag = void 0;
        traditionSubject.forEach(function(ele) {
            if (ele.name === name) {
                ele.flag = true;
            } else {
                ele.flag = false;
            }
        });
        if (name && this.data.SHscore) {
            finishFlag = true;
        } else {
            finishFlag = false;
        }
        this.setData({
            traditionSubject: traditionSubject,
            finishFlag: finishFlag,
            traditionSelected: name == "文科" ? 1 : 0
        });
    },
    //浙江 选择选测科目
    ZJtestSubject: function ZJtestSubject(e) {
        var name = e.currentTarget.dataset.name;
        var ZJtestSubject = this.data.ZJtestSubject;
        var SHselectedSubjectArr = this.data.SHselectedSubjectArr;
        var finishFlag = void 0;
        ZJtestSubject.forEach(function(ele) {
            if (ele.name == name) {
                if (SHselectedSubjectArr.indexOf(ele.name) == -1) {
                    if (SHselectedSubjectArr.length === 3) return;
                    SHselectedSubjectArr.push(ele.name);
                } else {
                    SHselectedSubjectArr.forEach(function(el, index) {
                        if (el == ele.name) {
                            SHselectedSubjectArr.splice(index, 1);
                        }
                    });
                }
                ele.flag = !ele.flag;
            }
        });
        if (this.data.SHscore && SHselectedSubjectArr.length === 3) {
            finishFlag = true;
        } else {
            finishFlag = false;
        }
        this.setData({
            ZJtestSubject: ZJtestSubject,
            finishFlag: finishFlag
        });
    },
    //江苏选测科目
    JSselectTestSubject: function JSselectTestSubject(e) {
        var name = e.currentTarget.dataset.name;
        var type = e.currentTarget.dataset.type;
        var JStestSubject1 = this.data.JStestSubject1;
        var JSselectedSubject1 = this.data.JSselectedSubject1;
        var JStestSubject2 = this.data.JStestSubject2;
        var JSselectedSubject2 = this.data.JSselectedSubject2;
        if (type === "one") {
            JStestSubject1.forEach(function(ele) {
                if (ele.name === name) {
                    ele.flag = true;
                } else {
                    ele.flag = false;
                }
            });
            this.setData({
                JStestSubject1: JStestSubject1,
                tempSubject: name
            });
        } else {
            JStestSubject2.forEach(function(ele) {
                if (ele.name === name) {
                    ele.flag = true;
                } else {
                    ele.flag = false;
                }
            });
            this.setData({
                JStestSubject2: JStestSubject2,
                tempSubject2: name
            });
        }
    },
    //江苏选测等级
    JSselectTestLevel: function JSselectTestLevel(e) {
        var name = e.currentTarget.dataset.name;
        var type = e.currentTarget.dataset.type;
        var JStestLevel1 = this.data.JStestLevel1;
        var JSselectedLevel1 = this.data.JSselectedLevel1;
        var JStestLevel2 = this.data.JStestLevel2;
        var JSselectedLevel2 = this.data.JSselectedLevel2;
        if (type == "one") {
            JStestLevel1.forEach(function(ele) {
                if (ele.name === name) {
                    ele.flag = true;
                } else {
                    ele.flag = false;
                }
            });
            this.setData({
                JStestLevel1: JStestLevel1,
                tempLevel: name
            });
        } else {
            JStestLevel2.forEach(function(ele) {
                if (ele.name === name) {
                    ele.flag = true;
                } else {
                    ele.flag = false;
                }
            });
            this.setData({
                JStestLevel2: JStestLevel2,
                tempLevel2: name
            });
        }
    },
    //江苏  确认选择科目成绩
    finishSelect: function finishSelect(e) {
        var type = e.currentTarget.dataset.type;
        this.closeTsBox("finish", type);
    },
    //确认高考成绩
    finishScore: function finishScore() {
        this.setData({
            finishBox: true
        });
    },
    closeFinishBox: function closeFinishBox() {
        this.setData({
            finishBox: false
        });
    },
    //点击科目列表唤起具体科目信息
    jsChangeScore: function jsChangeScore(e) {
        var type = e.currentTarget.dataset.type;
        var JStestSubject1 = this.data.JStestSubject1;
        var JStestLevel1 = this.data.JStestLevel1;
        var JSselectedSubject1 = this.data.JSselectedSubject1;
        var JSselectedLevel1 = this.data.JSselectedLevel1;
        var JStestSubject2 = this.data.JStestSubject2;
        var JStestLevel2 = this.data.JStestLevel2;
        var JSselectedSubject2 = this.data.JSselectedSubject2;
        var JSselectedLevel2 = this.data.JSselectedLevel2;
        if (type === "one") {
            JStestSubject1.forEach(function(ele) {
                if (ele.name === JSselectedSubject1) {
                    ele.flag = true;
                } else {
                    ele.flag = false;
                }
            });
            JStestLevel1.forEach(function(ele) {
                if (ele.name === JSselectedLevel1) {
                    ele.flag = true;
                } else {
                    ele.flag = false;
                }
            });
            this.setData({
                tsBox1: true,
                JStestSubject1: JStestSubject1,
                JStestLevel1: JStestLevel1,
                tempSubject: JSselectedSubject1,
                tempLevel: JSselectedLevel1
            });
        } else {
            JStestSubject2.forEach(function(ele) {
                if (ele.name === JSselectedSubject2) {
                    ele.flag = true;
                } else {
                    ele.flag = false;
                }
            });
            JStestLevel2.forEach(function(ele) {
                if (ele.name === JSselectedLevel2) {
                    ele.flag = true;
                } else {
                    ele.flag = false;
                }
            });
            this.setData({
                tsBox2: true,
                JStestSubject2: JStestSubject2,
                JStestLevel2: JStestLevel2,
                tempSubject2: JSselectedSubject2,
                tempLevel2: JSselectedLevel2
            });
        }
    },
    goPay: function goPay() {
        wx.navigateTo({
            url: "/packages/paySystem/memberCardDetail/memberCardDetail"
        });
    },
    closeTsBox: function closeTsBox(type, type1) {
        if (type == "finish") {
            if (type1 == "one") {
                this.setData({
                    JSselectedSubject1: this.data.tempSubject,
                    JSselectedLevel1: this.data.tempLevel
                });
            } else {
                this.setData({
                    JSselectedSubject2: this.data.tempSubject2,
                    JSselectedLevel2: this.data.tempLevel2
                });
            }
        }
        this.setData({
            tsBox1: false,
            tsBox2: false
        });
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
    //获取缓存信息进行判断
    getStorage: function getStorage() {
        var that = this;
        var userScore = wx.getStorageSync("userScore");
        var province = wx.getStorageSync("cityId");
        var userInfo = wx.getStorageSync("userInfo");
        var cityId = province.cityId;
        var tempProvince = void 0;
        var date = new Date();
        var year = date.getFullYear() + 1;
        var CTsubjectFlag = void 0;
        var CTdisabled = void 0;
        var JSselectedSubject1 = void 0;
        switch (cityId) {
          case 842:
            tempProvince = "SHisShow";
            break;

          case 843:
            tempProvince = "ZJisShow";
            break;

          case 1:
            tempProvince = "JSisShow";
            break;

          default:
            tempProvince = "CTisShow";
        }
        if (userScore.total) {
            if (cityId === 842) {
                this.data.SHtestSubject.forEach(function(ele) {
                    userScore.chooseSubjects.forEach(function(el) {
                        if (ele.name === el) {
                            ele.flag = true;
                        }
                    });
                });
                this.setData({
                    finishFlag: true,
                    SHscore: userScore.total,
                    SHtestSubject: this.data.SHtestSubject,
                    SHselectedSubjectArr: userScore.chooseSubjects
                });
            } else if (cityId === 843) {
                this.data.ZJtestSubject.forEach(function(ele) {
                    userScore.chooseSubjects.forEach(function(el) {
                        if (ele.name === el) {
                            ele.flag = true;
                        }
                    });
                });
                this.setData({
                    finishFlag: true,
                    SHscore: userScore.total,
                    ZJtestSubject: this.data.ZJtestSubject,
                    SHselectedSubjectArr: userScore.chooseSubjects
                });
            } else if (cityId === 1) {
                var tmpArr = userScore.chooseLevelOrSubjects.split(",");
                var JSsub1 = tmpArr[0].split("=")[0];
                var JSlevel1 = tmpArr[0].split("=")[1];
                var JSsub2 = tmpArr[1].split("=")[0];
                var JSlevel2 = tmpArr[1].split("=")[1];
                this.setData({
                    finishFlag: true,
                    SHscore: userScore.total,
                    JSselectedSubject1: JSsub1,
                    JSselectedLevel1: JSlevel1,
                    JSselectedSubject2: JSsub2,
                    JSselectedLevel2: JSlevel2
                });
            } else {
                var _setData;
                var _CTsubjectFlag = void 0;
                if (userScore.courseType === 1) {
                    _CTsubjectFlag = "traditionSubject[" + 0 + "].flag";
                } else if (userScore.courseType === 0) {
                    _CTsubjectFlag = "traditionSubject[" + 1 + "].flag";
                }
                this.setData((_setData = {
                    finishFlag: true
                }, _defineProperty(_setData, _CTsubjectFlag, true), _defineProperty(_setData, "SHscore", userScore.total), 
                _defineProperty(_setData, "traditionSelected", userScore.courseType), _setData));
            }
        } else {
            if (cityId === 1) {
                this.setData({
                    JSselectedSubject1: this.data.JStestSubject1[0].name,
                    JSselectedLevel1: this.data.JStestLevel1[0].name,
                    JSselectedSubject2: this.data.JStestSubject2[0].name,
                    JSselectedLevel2: this.data.JStestLevel2[0].name
                });
            }
        }
        if (userInfo[0].GKYear === year) {
            var _that$setData;
            if (cityId == 1) {
                if (userInfo[0].courseType == 1) {
                    //文科
                    JSselectedSubject1 = "历史";
                } else {
                    //理科
                    JSselectedSubject1 = "物理";
                }
                that.setData({
                    JSdisabled: true,
                    JSselectedSubject1: JSselectedSubject1
                });
            }
            if (userInfo[0].courseType === 1) {
                CTsubjectFlag = "traditionSubject[" + 0 + "].flag";
            } else if (userInfo[0].courseType === 0) {
                CTsubjectFlag = "traditionSubject[" + 1 + "].flag";
            }
            that.setData((_that$setData = {
                traditionSelected: userInfo[0].courseType
            }, _defineProperty(_that$setData, CTsubjectFlag, true), _defineProperty(_that$setData, "CTdisabled", true), 
            _that$setData));
        } else {
            that.setData({
                CTdisabled: false
            });
        }
        //获取用户可更换成绩次数
                that.getNumber(userInfo[0].UserId);
        that.setData({
            userInfo: userInfo[0]
        });
        that.setData(_defineProperty({
            cityId: cityId,
            userScore: userScore
        }, tempProvince, true));
    },
    onShow: function onShow() {},
    onLoad: function onLoad(options) {
        this.getStorage();
    },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function onReady() {},
    /**
   * 用户点击右上角分享
   */
    onShareAppMessage: function onShareAppMessage() {}
});