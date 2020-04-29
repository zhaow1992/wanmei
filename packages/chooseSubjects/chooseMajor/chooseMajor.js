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

var app = getApp();

var api = require("../api.js");

Page({
    data: {
        color: null,
        showLoad: true,
        majorDetailLoad: true,
        isCeping: false,
        evaluationId: "",
        majorDetailHeight: 70,
        scrolHeight: 45,
        majorDetailFlag: false,
        selectNumber: 5,
        majorList: [],
        //种类列表
        codeArr: [],
        majors: [],
        noDataFlag: false
    },
    move: function move() {},
    //弹出专业详情抽屉
    showMajorDetail: function showMajorDetail(e) {
        var _this = this;
        var that = this;
        that.setData({
            majorDetailLoad: true
        });
        var type = 1;
        var provinceType = app.globalData.chooseSubject.provinceType;
        var provinceId = app.globalData.chooseSubject.provinceId;
        that.setData({
            provinceType: provinceType,
            provinceId: provinceId
        });
        var majorCode = e.currentTarget.dataset.code;
        api.getMajorDetail("ChooseSubject/Majors/QuerySubjectMatch", "POST", [ majorCode ], this.data.province, this.data.year).then(function(res) {
            if (res.isSuccess && res.result.length > 0) {
                that.setData({
                    noDataFlag: false
                });
                if (provinceType == 1) {
                    if (provinceId == 842) {
                        //上海
                        _this.setData({
                            subjectItem: [ {
                                name: "政治",
                                scale: res.result[0].politicsRate
                            }, {
                                name: "历史",
                                scale: res.result[0].historyRate
                            }, {
                                name: "地理",
                                scale: res.result[0].geographyRate
                            }, {
                                name: "生命科学",
                                scale: res.result[0].biologyRate
                            }, {
                                name: "物理",
                                scale: res.result[0].physicalRate
                            }, {
                                name: "化学",
                                scale: res.result[0].chemistryRate
                            } ]
                        });
                    } else {
                        _this.setData({
                            subjectItem: [ {
                                name: "物理",
                                scale: res.result[0].physicalRate
                            }, {
                                name: "化学",
                                scale: res.result[0].chemistryRate
                            }, {
                                name: "生物",
                                scale: res.result[0].biologyRate
                            }, {
                                name: "历史",
                                scale: res.result[0].historyRate
                            }, {
                                name: "地理",
                                scale: res.result[0].geographyRate
                            }, {
                                name: "政治",
                                scale: res.result[0].politicsRate
                            } ]
                        });
                    }
                } else if (provinceType == 2) {
                    _this.setData({
                        subjectItem: [ {
                            name: "物理",
                            scale: res.result[0].physicalRate
                        }, {
                            name: "化学",
                            scale: res.result[0].chemistryRate
                        }, {
                            name: "生物",
                            scale: res.result[0].biologyRate
                        }, {
                            name: "历史",
                            scale: res.result[0].historyRate
                        }, {
                            name: "地理",
                            scale: res.result[0].geographyRate
                        }, {
                            name: "政治",
                            scale: res.result[0].politicsRate
                        }, {
                            name: "技术",
                            scale: res.result[0].technologyRate
                        } ]
                    });
                } else if (provinceType == 3) {
                    _this.setData({
                        majorList1: [ //中小类列表（抽屉）
                        {
                            name: "物理",
                            scale: res.result[0].physicalRate
                        }, {
                            name: "历史",
                            scale: res.result[0].historyRate
                        }, {
                            name: "不限",
                            scale: res.result[0].noLimitRate
                        } ],
                        majorList2: [ //中小类列表（抽屉）
                        {
                            name: "化学",
                            scale: res.result[0].chemistryRate
                        }, {
                            name: "生物",
                            scale: res.result[0].biologyRate
                        }, {
                            name: "地理",
                            scale: res.result[0].geographyRate
                        }, {
                            name: "政治",
                            scale: res.result[0].politicsRate
                        }, {
                            name: "不限",
                            scale: res.result[0].noLimitRate
                        } ]
                    });
                }
                that.setData({
                    majorDetail: res.result[0]
                }, function() {
                    that.setData({
                        majorDetailLoad: false
                    });
                });
            } else {
                that.setData({
                    majorDetailLoad: false,
                    noDataFlag: true
                });
            }
        });
        this.setData({
            majorDetailFlag: true
        });
    },
    closeMajorDetail: function closeMajorDetail() {
        this.setData({
            majorDetailFlag: false,
            closeMajorAnimation: "visited"
        });
    },
    //加入选科
    addSubject: function addSubject(e) {
        var index = e.currentTarget.dataset.index;
        var code = e.currentTarget.dataset.code;
        var rate = e.currentTarget.dataset.rate;
        var majorList = this.data.majorList;
        var temp = "majorList[" + index + "].isSelect";
        var codeArr = this.data.codeArr;
        var majors = this.data.majors;
        if (codeArr.includes(code)) {
            codeArr.forEach(function(ele, index) {
                if (ele == code) {
                    codeArr.splice(index, 1);
                    majors.splice(index, 1);
                }
            });
        } else {
            codeArr.push(code);
            majors.push({
                recommendRate: rate,
                majorCode: code
            });
        }
        this.setData({
            codeArr: codeArr,
            majors: majors
        });
        app.globalData.chooseSubject.majorCodes = codeArr;
        app.globalData.chooseSubject.majors = majors;
        if (majorList[index].isSelect) {
            this.setData(_defineProperty({}, temp, false));
        } else {
            this.setData(_defineProperty({}, temp, true));
        }
        this.getSelectNumber();
    },
    //计算选中的专业个数
    getSelectNumber: function getSelectNumber() {
        var majorList = this.data.majorList;
        var selectNumber = 0;
        majorList.forEach(function(ele) {
            if (ele.isSelect) {
                selectNumber++;
            }
        });
        this.setData({
            selectNumber: selectNumber
        });
    },
    confirme: function confirme() {
        var userType = wx.getStorageSync("userInfo")[0].UserType;
        if (userType >= 1 && userType != 4) {
            wx.redirectTo({
                url: "../chooseSubPlan/chooseSubPlan"
            });
        } else {
            wx.navigateTo({
                url: "../chooseSubPlan/chooseSubPlan"
            });
        }
    },
    goMajorDetail: function goMajorDetail() {
        wx.navigateTo({
            url: "/pages/majorList/majorList?code=" + this.data.majorDetail.majorCode
        });
    },
    getScreenHeight: function getScreenHeight() {
        var height = wx.getSystemInfoSync().screenHeight;
        if (height > 800) {
            this.setData({
                majorDetailHeight: 58,
                scrolHeight: 38
            });
        }
    },
    //可能测评过也可能没测评过，根据用户id获取专业列表
    getNewestEvaluation: function getNewestEvaluation() {
        var that = this;
        var UserId = wx.getStorageSync("userInfo")[0].UserId;
        api.getNewestEvaluation("Evaluation/Result/ProfessionOrientation/QueryMajors", "POST", UserId).then(function(res) {
            wx.setStorage({
                key: "majorList",
                data: res.result
            });
            that.setData({
                majorList: res.result
            }, function() {
                that.initChooseMajor();
            });
        });
    },
    // 判断是否测评过
    getProfessionOrientation: function getProfessionOrientation() {
        var that = this;
        var userId = wx.getStorageSync("userInfo")[0].UserId;
        api.getProfessionOrientation("Evaluation/Result/ProfessionOrientation/GetByUserId", "POST", userId).then(function(res) {
            if (res.isSuccess) {
                if (res.result && res.result.id && res.result.id != null) {
                    that.setData({
                        evaluationId: res.result.id,
                        isCeping: false
                    });
                } else {
                    that.setData({
                        isCeping: true
                    });
                }
                that.setData({
                    showLoad: false
                });
            }
        });
    },
    // 初始化专业选中状态
    initChooseMajor: function initChooseMajor() {
        var majorCodes = app.globalData.chooseSubject.majorCodes;
        var majorList = this.data.majorList;
        var codeArr = [];
        var majors = [];
        for (var i = 0; i < majorCodes.length; i++) {
            for (var j = 0; j < majorList.length; j++) {
                if (majorCodes[i] == majorList[j].majorCode) {
                    var _setData3;
                    codeArr.push(majorList[j].majorCode);
                    majors.push({
                        recommendRate: majorList[j].degree,
                        majorCode: majorList[j].majorCode
                    });
                    this.setData((_setData3 = {}, _defineProperty(_setData3, "majorList[" + j + "].isSelect", true), 
                    _defineProperty(_setData3, "selectNumber", this.data.selectNumber + 1), _defineProperty(_setData3, "codeArr", codeArr), 
                    _defineProperty(_setData3, "majors", majors), _setData3));
                    break;
                }
            }
        }
        app.globalData.chooseSubject.majorCodes = codeArr;
        app.globalData.chooseSubject.majors = majors;
    },
    onLoad: function onLoad(options) {
        var _this2 = this;
        this.setData({
            color: app.globalData.color
        });
        if (options && options.id && options.id !== "null") {
            this.setData({
                evaluationId: options.id,
                isCeping: false,
                showLoad: false
            });
        } else {
            this.getProfessionOrientation();
            //判断是否测评过
                        this.setData({
                isCeping: true
            });
        }
        var majorList = wx.getStorageSync("majorList");
        if (majorList) {
            this.setData({
                majorList: majorList
            }, function() {
                _this2.initChooseMajor();
            });
        } else {
            this.getNewestEvaluation();
            //获取用户最新一条专业列表
                }
        var majorCodes = wx.getStorageSync("majorCodes");
        var chooseSubProvinceList = wx.getStorageSync("chooseSubProvinceList");
        var year = app.globalData.chooseSubject.year;
        var province = app.globalData.chooseSubject.provinceId;
        this.getSelectNumber();
        this.getScreenHeight();
        this.setData({
            majorCodes: majorCodes,
            year: year,
            province: province,
            chooseSubProvinceList: chooseSubProvinceList,
            selectNumber: 0
        });
    }
});