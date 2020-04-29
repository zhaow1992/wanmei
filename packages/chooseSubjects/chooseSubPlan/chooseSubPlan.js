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

var zjSubjectItem = [ "物理", "化学", "生物", "历史", "地理", "政治", "技术" ];

var shSubjectItem = [ "政治", "历史", "地理", "生命科学", "物理", "化学" ];

var subjectItem = [ "物理", "化学", "生物", "历史", "地理", "政治" ];

var newSubjectItem = [ "化学", "生物", "地理", "政治" ];

var zjSubject = [ {
    name: "物理",
    st: false
}, {
    name: "化学",
    st: false
}, {
    name: "生物",
    st: false
}, {
    name: "历史",
    st: false
}, {
    name: "地理",
    st: false
}, {
    name: "政治",
    st: false
}, {
    name: "技术",
    st: false
} ];

var shSubject = [ {
    name: "政治",
    st: false
}, {
    name: "历史",
    st: false
}, {
    name: "地理",
    st: false
}, {
    name: "生命科学",
    st: false
}, {
    name: "物理",
    st: false
}, {
    name: "化学",
    st: false
} ];

var subject = [ {
    name: "物理",
    st: false
}, {
    name: "化学",
    st: false
}, {
    name: "生物",
    st: false
}, {
    name: "历史",
    st: false
}, {
    name: "地理",
    st: false
}, {
    name: "政治",
    st: false
} ];

Page({
    data: {
        isshowSave: 1,
        isHide: 0,
        share: false,
        showLoad: true,
        VIPId: null,
        system: "android",
        payBtnText: app.globalData.payBtnText,
        vip: false,
        popup: {
            popupFlag: false,
            wrapAnimate: "",
            popupAnimate: "",
            bgOpacity: ""
        },
        radarPath: "",
        currentTab: 0,
        matchDetail: {
            subject: [],
            majorCount: null,
            majorMatchCount: null,
            majorMatchRate: null,
            collegeCount: null,
            matchCollegeCount: null,
            collegeMatchRate: null,
            compositeMatchRate: null,
            subjectRelated: "-"
        }
    },
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        if (res.from === "button") {}
        return {
            title: "我已生成[新高考选科]的报告",
            imageUrl: "http://wmei-appfile.cn-bj.ufileos.com/share_xk.png",
            path: "/packages/chooseSubjects/chooseSubPlan/chooseSubPlan?majors=" + JSON.stringify(that.majors) + "&subject=" + JSON.stringify(that.subject) + "&provinceId=" + that.provinceId + "&year=" + that.year + "&share=true" + "&type=" + that.type + "&isHide=" + that.data.isHide
        };
    },
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
            "popup.bgOpacity": .4,
            "popup.popupAnimate": "popupAnimateOut"
        });
        setTimeout(function() {
            _this.setData({
                "popup.popupFlag": false
            });
        }, 200);
    },
    goChooseSubIndex: function goChooseSubIndex() {
        wx.navigateTo({
            url: "../index/index"
        });
    },
    //获取单个选科方案详情
    getChooseSubPlan: function getChooseSubPlan(id) {
        var that = this;
        var majorCodes = [];
        var major = [];
        api.getChooseSubPlan("Users/ChooseSubjectsSolution/Get?id=" + id, "POST").then(function(res) {
            that.setData({
                matchDetail: res.result
            });
            for (var i = 0; i < res.result.majors.length; i++) {
                majorCodes.push({
                    recommendRate: res.result.majors[i].recommendRate,
                    majorCode: res.result.majors[i].majorCode
                });
                major.push(res.result.majors[i].majorCode);
            }
            that.subject = res.result.subject;
            that.majors = majorCodes;
            that.majorCodes = major;
            app.globalData.chooseSubject.subject = res.result.subject;
            app.globalData.chooseSubject.majors = majorCodes;
            app.globalData.chooseSubject.majorCodes = major;
            app.globalData.chooseSubject.mateMajorList = res.result.majors;
            that.setData({
                majors: res.result.majors
            });
            if (that.data.isHide == 0) {
                that.queryRecommendSubject();
            }
            switch (parseInt(that.provinceId)) {
              // 浙江
                case 843:
                if (res.isSuccess) {
                    that.resetArr(zjSubject);
                    for (var _i = 0; _i < res.result.subject.length; _i++) {
                        for (var j = 0; j < zjSubject.length; j++) {
                            if (zjSubject[j].name == res.result.subject[_i]) {
                                zjSubject[j].st = true;
                                break;
                            }
                        }
                    }
                }
                that.drawRadar(zjSubject);
                break;

                // 上海
                              case 842:
                if (res.isSuccess) {
                    that.resetArr(shSubject);
                    for (var _i2 = 0; _i2 < res.result.subject.length; _i2++) {
                        for (var _j = 0; _j < shSubject.length; _j++) {
                            if (shSubject[_j].name == res.result.subject[_i2]) {
                                shSubject[_j].st = true;
                                break;
                            }
                        }
                    }
                }
                that.drawRadar(shSubject);
                break;

              default:
                if (res.isSuccess) {
                    that.resetArr(subject);
                    for (var _i3 = 0; _i3 < res.result.subject.length; _i3++) {
                        for (var _j2 = 0; _j2 < subject.length; _j2++) {
                            if (subject[_j2].name == res.result.subject[_i3]) {
                                subject[_j2].st = true;
                                break;
                            }
                        }
                    }
                }
                that.drawRadar(subject);
                break;
            }
        });
    },
    //查询专业匹配
    queryMatchRate: function queryMatchRate() {
        var that = this;
        api.queryMatchRate("ChooseSubject/Majors/QueryMatchRate", "POST", that.provinceId, that.year, [], that.data.matchDetail.subject, that.majors).then(function(res) {
            app.globalData.chooseSubject.mateMajorList = res.result;
            that.setData({
                majors: res.result,
                showLoad: false
            });
        });
    },
    //保存选科方案
    saveChooseSubPlan: function saveChooseSubPlan() {
        var that = this;
        wx.showLoading({
            title: "生成方案中..."
        });
        var temp = this.data;
        var userNumId = temp.userInfo.UserId;
        var province = that.provinceId;
        var provinceName = "";
        var chooseYear = that.year;
        var subject = temp.matchDetail.subject;
        var majorCount = temp.matchDetail.majorCount;
        var majorMatchCount = temp.matchDetail.majorMatchCount;
        var majorMatchRate = temp.matchDetail.majorMatchRate;
        var collegeCount = temp.matchDetail.collegeCount;
        var matchCollegeCount = temp.matchDetail.matchCollegeCount;
        var collegeMatchRate = temp.matchDetail.collegeMatchRate;
        var compositeMatchRate = temp.matchDetail.compositeMatchRate;
        var subjectRelated = temp.matchDetail.subjectRelated;
        var majors = temp.majors;
        var chooseSubType = 1;
        if (that.data.isHide == 1) {
            chooseSubType = 4;
        }
        var cityList = wx.getStorageSync("cityList");
        cityList.forEach(function(ele) {
            if (ele.numId == province) {
                provinceName = ele.name;
            }
        });
        api.saveChooseSubPlan("Users/ChooseSubjectsSolution/Insert", "POST", userNumId, province, provinceName, chooseYear, subject, majorCount, majorMatchCount, majorMatchRate, collegeCount, matchCollegeCount, collegeMatchRate, compositeMatchRate, subjectRelated, chooseSubType, majors).then(function(res) {
            wx.hideLoading();
            if (res.isSuccess) {
                that.showPopup();
            }
        });
    },
    onLoad: function onLoad(options) {
        var that = this;
        if (options && options.choosesubtype) {
            that.setData({
                isshowSave: 0
            });
        }
        if (options && options.share) {
            that.setData({
                isHide: options.isHide,
                share: true,
                vip: true,
                showLoad: false
            }, function() {
                that.provinceId = options.provinceId;
                that.year = options.year;
                that.type = options.type;
                if (options.isAndroid) {
                    that.subject = JSON.parse(JSON.parse(options.subject));
                    that.majors = JSON.parse(JSON.parse(options.majors));
                } else {
                    that.subject = JSON.parse(options.subject);
                    that.majors = JSON.parse(options.majors);
                }
                that.majorCodes = [];
                for (var i = 0; i < that.majors.length; i++) {
                    that.majorCodes.push(that.majors[i].majorCode);
                }
                app.globalData.chooseSubject.provinceType = that.type;
                app.globalData.chooseSubject.provinceId = that.provinceId;
                app.globalData.chooseSubject.year = that.year;
                app.globalData.chooseSubject.subject = that.subject;
                app.globalData.chooseSubject.majorCodes = that.majorCodes;
                app.globalData.chooseSubject.majors = that.majors;
                // app.globalData.chooseSubject.mateMajorList = 
                                wx.setStorageSync("chooseSubjectInfo", {
                    provinceId: that.provinceId,
                    year: that.year,
                    provinceType: that.type
                });
                console.log("codes", that.majorCodes, "所有", options);
                if (that.data.isHide == 0) {
                    that.queryRecommendSubject();
                } else {
                    that.queryMatchRate1();
                }
                console.log("缓存");
                console.log(wx.getStorageSync("chooseSubjectInfo"));
            });
        } else {
            var _init = function _init() {
                that.setData({
                    vip: true,
                    showLoad: false
                }, function() {
                    that.provinceId = app.globalData.chooseSubject.provinceId;
                    that.year = app.globalData.chooseSubject.year;
                    var chooseSubProvinceList = wx.getStorageSync("chooseSubProvinceList");
                    for (var i = 0; i < chooseSubProvinceList.length; i++) {
                        if (that.provinceId == chooseSubProvinceList[i].provinceId) {
                            that.type = chooseSubProvinceList[i].type;
                            app.globalData.chooseSubject.provinceType = chooseSubProvinceList[i].type;
                            var chooseSubjectInfo = wx.getStorageSync("chooseSubjectInfo");
                            chooseSubjectInfo.provinceType = chooseSubProvinceList[i].type;
                            wx.setStorageSync("chooseSubjectInfo", chooseSubjectInfo);
                            console.log(chooseSubjectInfo);
                            break;
                        }
                    }
                    if (options.id) {
                        that.getChooseSubPlan(options.id);
                    } else if (that.data.isHide == 0) {
                        that.subject = [];
                        that.majorCodes = app.globalData.chooseSubject.majorCodes;
                        that.majors = app.globalData.chooseSubject.majors;
                        that.queryRecommendSubject();
                    }
                    var userInfo = wx.getStorageSync("userInfo")[0];
                    that.setData({
                        userInfo: userInfo
                    });
                });
            };
            if (options && options.isHide) {
                that.setData({
                    isHide: 1
                });
                that.queryMatchRate1();
            }
            if (options && options.choosesubtype == 4) {
                that.setData({
                    isHide: 1
                });
            }
            var userType = wx.getStorageSync("userInfo")[0].UserType;
            if (userType > 1) {
                _init();
            } else {
                if (app.globalData.system == "ios") {
                    that.setData({
                        system: "ios"
                    });
                } else {
                    that.setData({
                        system: "android"
                    });
                }
                that.setData({
                    showLoad: false
                });
            }
        }
    },
    payBtn: function payBtn(e) {
        var bigType = e.currentTarget.dataset.bigtype;
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/packages/paySystem/memberCardDetail/memberCardDetail"
        });
    },
    noPay: function noPay() {
        app.payPrompt();
    },
    // 选择三个科目
    chooseSub: function chooseSub(e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        var itemList = [];
        var subject = this.data.matchDetail.subject;
        console.log("选择省份开始");
        console.log(that.provinceId);
        switch (parseInt(that.provinceId)) {
          // 浙江
            case 843:
            console.log("浙江");
            itemList = zjSubjectItem.filter(function(item) {
                return !subject.some(function(newItem) {
                    return newItem === item;
                });
            });
            console.log(itemList);
            break;

            // 上海
                      case 842:
            itemList = shSubjectItem.filter(function(item) {
                return !subject.some(function(newItem) {
                    return newItem === item;
                });
            });
            break;

            // 其他
                      default:
            if (this.type == 1) {
                itemList = subjectItem.filter(function(item) {
                    return !subject.some(function(newItem) {
                        return newItem === item;
                    });
                });
                break;
            } else {
                switch (index) {
                  case 0:
                    console.log("普通");
                    itemList = that.data.matchDetail.subject[0] == "物理" ? [ "历史" ] : [ "物理" ];
                    console.log(itemList);
                    break;

                  default:
                    itemList = newSubjectItem.filter(function(item) {
                        return !subject.some(function(newItem) {
                            return newItem === item;
                        });
                    });
                    break;
                }
            }
        }
        wx.showActionSheet({
            itemList: itemList,
            success: function success(res) {
                that.subject[index] = itemList[res.tapIndex];
                that.setData(_defineProperty({}, "matchDetail.subject[" + index + "]", itemList[res.tapIndex]), function() {
                    wx.showLoading({
                        title: "生成方案中..."
                    });
                    if (!that.data.share) {
                        that.setData({
                            isshowSave: 1
                        });
                    }
                    app.globalData.chooseSubject.subject = that.data.matchDetail.subject;
                    if (that.data.isHide == 1) {
                        that.queryMatchRate1();
                    } else {
                        that.queryRecommendSubject();
                    }
                });
            }
        });
    },
    // 职业匹配跳转-暂未开放
    careerDetail: function careerDetail() {
        wx.showToast({
            title: "暂未开放",
            icon: "none"
        });
    },
    queryRecommendSubject: function queryRecommendSubject() {
        var that = this;
        that.setData({
            "matchDetail.compositeMatchRate": null,
            "matchDetail.majorCount": null,
            "matchDetail.majorMatchCount": null,
            "matchDetail.majorMatchRate": null,
            "matchDetail.collegeCount": null,
            "matchDetail.matchCollegeCount": null,
            "matchDetail.collegeMatchRate": null
        });
        api.queryRecommendSubject("ChooseSubject/QueryRecommendSubject", "POST", that.provinceId, that.year, that.majorCodes, that.subject).then(function(res) {
            if (res.isSuccess) {
                that.setData({
                    matchDetail: res.result
                });
                that.subject = res.result.subject;
                app.globalData.chooseSubject.subject = res.result.subject;
                if (that.data.isHide == 0) {
                    that.queryMatchRate();
                }
            } else {
                wx.showToast({
                    title: res.message,
                    icon: "none"
                });
                that.setData({
                    "matchDetail.compositeMatchRate": 0
                });
            }
            switch (parseInt(that.provinceId)) {
              // 浙江
                case 843:
                if (res.isSuccess) {
                    that.resetArr(zjSubject);
                    for (var i = 0; i < res.result.subject.length; i++) {
                        for (var j = 0; j < zjSubject.length; j++) {
                            if (zjSubject[j].name == res.result.subject[i]) {
                                zjSubject[j].st = true;
                                break;
                            }
                        }
                    }
                }
                that.drawRadar(zjSubject);
                break;

                // 上海
                              case 842:
                if (res.isSuccess) {
                    that.resetArr(shSubject);
                    for (var _i4 = 0; _i4 < res.result.subject.length; _i4++) {
                        for (var _j3 = 0; _j3 < shSubject.length; _j3++) {
                            if (shSubject[_j3].name == res.result.subject[_i4]) {
                                shSubject[_j3].st = true;
                                break;
                            }
                        }
                    }
                }
                that.drawRadar(shSubject);
                break;

              default:
                if (res.isSuccess) {
                    that.resetArr(subject);
                    for (var _i5 = 0; _i5 < res.result.subject.length; _i5++) {
                        for (var _j4 = 0; _j4 < subject.length; _j4++) {
                            if (subject[_j4].name == res.result.subject[_i5]) {
                                subject[_j4].st = true;
                                break;
                            }
                        }
                    }
                }
                that.drawRadar(subject);
                break;
            }
            wx.hideLoading();
        });
    },
    resetArr: function resetArr(subject) {
        for (var i = 0; i < subject.length; i++) {
            subject[i].st = false;
        }
    },
    swiperNav: function swiperNav(e) {
        this.setData({
            currentTab: e.detail.current
        });
    },
    // 返回选择意向专业
    chooseMajor: function chooseMajor() {
        wx.redirectTo({
            url: "../chooseMajor/chooseMajor"
        });
    },
    // 绘制雷达图
    drawRadar: function drawRadar(data) {
        var that = this;
        var num = data.length;
        var ctx = wx.createCanvasContext("radar");
        // 绘制六边形
                function drawBg() {
            ctx.setStrokeStyle("#e7e7e7");
            ctx.setFillStyle("rgba(228,228,228,0.1)");
            //画6条线段
                        for (var j = -2; j < num - 2; j++) {
                //坐标
                var x = 160 + 88 * Math.cos(Math.PI * 2 / num * j);
                var y = 110 + 88 * Math.sin(Math.PI * 2 / num * j);
                ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }
        function drawText() {
            ctx.beginPath();
            ctx.setFontSize(23);
            var OffsetX = 0;
            var OffsetY = 0;
            for (var j = -2; j < num - 2; j++) {
                switch (j) {
                  case -2:
                    OffsetX = -50;
                    break;

                  case -1:
                    OffsetX = 13;
                    break;

                  case 0:
                    OffsetX = 10;
                    OffsetY = 5;
                    break;

                  case 1:
                    OffsetX = 13;
                    OffsetY = 15;
                    break;

                  case 2:
                    OffsetX = -50;
                    OffsetY = 15;
                    break;

                  case 3:
                    OffsetX = -50;
                    OffsetY = 5;
                    break;
                }
                //坐标
                                var x = 160 + 88 * Math.cos(Math.PI * 2 / num * j) + OffsetX;
                var y = 110 + 88 * Math.sin(Math.PI * 2 / num * j) + OffsetY;
                ctx.setLineDash([ 0, 0 ], 0);
                if (data[j + 2].st) {
                    ctx.setStrokeStyle("#212121");
                } else {
                    ctx.setStrokeStyle("#757575");
                }
                ctx.strokeText(data[j + 2].name, x, y);
            }
        }
        function drawRegion() {
            ctx.setLineDash([ 2, 5 ], 1);
            ctx.setStrokeStyle("#E9302D");
            ctx.setFillStyle("rgba(255,190,155,0.3)");
            for (var j = -2; j < num - 2; j++) {
                if (data[j + 2].st) {
                    var x = 160 + 88 * Math.cos(Math.PI * 2 / num * j);
                    var y = 110 + 88 * Math.sin(Math.PI * 2 / num * j);
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }
        drawBg();
        drawText();
        drawRegion();
        ctx.draw(false, function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 320,
                height: 220,
                destWidth: 320,
                destHeight: 220,
                canvasId: "radar",
                success: function success(res) {
                    that.setData({
                        radarPath: res.tempFilePath
                    });
                }
            });
        });
    },
    //查询专业匹配
    queryMatchRate1: function queryMatchRate1() {
        wx.showLoading({
            title: "生成方案中..."
        });
        var that = this;
        var provinceId = app.globalData.chooseSubject.provinceId;
        var subject = app.globalData.chooseSubject.subject;
        var year = app.globalData.chooseSubject.year;
        api.queryMatchRate("ChooseSubject/Majors/QueryMatchRate", "POST", provinceId, year, [], subject, []).then(function(res) {
            var majorCodes = [];
            var mateMajorList = [];
            res.result.forEach(function(ele, index) {
                majorCodes.push(ele.majorCode);
            });
            app.globalData.chooseSubject.mateMajorList = res.result;
            app.globalData.chooseSubject.majorCodes = majorCodes;
            that.majorCodes = majorCodes;
            that.majors = mateMajorList;
            that.subject = app.globalData.chooseSubject.subject;
            that.setData({
                majors: res.result
            }, function() {
                that.queryRecommendSubject();
            });
            // api.queryRecommendSubject('ChooseSubject/QueryRecommendSubject', 'POST', provinceId, year, majorCodes, subject).then(res => {
            //   if (res.isSuccess) {
            //     that.setData({
            //       requestFlag: true,
            //       majorMatch: res.result
            //     })
            //   }
            // })
                });
    }
});