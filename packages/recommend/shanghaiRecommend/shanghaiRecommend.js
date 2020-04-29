var _data;

var _api = require("../../../utils/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

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

// var wxCharts = require('../../utils/wxcharts-min.js');
var app = getApp();

var shanghaiChongScroll = [];

var shanghaiShouScroll = [];

var shanghaiBaoScroll = [];

Page({
    data: (_data = {
        navHeight: 0,
        scrollViewHeight: 0,
        color: null,
        payBtnText: app.globalData.payBtnText,
        flag: false,
        isIos: false,
        collegeCount: 0,
        shareChong: "",
        shareShou: "",
        shareBao: "",
        share: true,
        majorLoad: true,
        collegeLoad: true,
        checked: false,
        userInfo: [],
        creatTable: false,
        SHTable: [],
        zixuanList: [],
        CdiProvince: "",
        CdiClassify: "",
        top: 0,
        shCollegeListArr: [],
        shMajorListArr: [],
        paixu: [ "最低分" ],
        paixuIndex: 0,
        userScore: [],
        zhejiangRanks: 0,
        screenHeight: 0,
        screenWidth: 0,
        ballRightLeft: 0,
        //左位置
        ballRightRight: 0,
        //右位置
        rankLeft: 0,
        //左数值
        rankRight: 0
    }, _defineProperty(_data, "screenHeight", 0), _defineProperty(_data, "screenWidth", 0), 
    _defineProperty(_data, "ballRightLeft", 0), _defineProperty(_data, "ballRightRight", 0), 
    _defineProperty(_data, "rankLeft", 0), _defineProperty(_data, "rankRight", 0), _defineProperty(_data, "chooseLevelArr", []), 
    _defineProperty(_data, "chooseLevel", ""), _defineProperty(_data, "collegeDetail", []), 
    _defineProperty(_data, "shChongListArr", []), _defineProperty(_data, "shanghaiChongScroll", []), 
    _defineProperty(_data, "showChongMore", false), _defineProperty(_data, "showShouMore", false), 
    _defineProperty(_data, "showBaoMore", false), _defineProperty(_data, "pnChong", 1), 
    _defineProperty(_data, "pnShou", 1), _defineProperty(_data, "pnBao", 1), _defineProperty(_data, "remark", ""), 
    _defineProperty(_data, "majorname", ""), _defineProperty(_data, "majorDetail", []), 
    _defineProperty(_data, "showLoad", true), _defineProperty(_data, "beizhuShow", ""), 
    _defineProperty(_data, "collegeUp", ""), _defineProperty(_data, "majorUp", ""), 
    _defineProperty(_data, "chongSuo", null), _defineProperty(_data, "chongZu", null), 
    _defineProperty(_data, "shouSuo", null), _defineProperty(_data, "shouZu", null), 
    _defineProperty(_data, "baoSuo", null), _defineProperty(_data, "baoZu", null), _defineProperty(_data, "collegeChongIndex", 1), 
    _defineProperty(_data, "collegeShouIndex", 1), _defineProperty(_data, "collegeBaoIndex", 1), 
    _defineProperty(_data, "showChongTitle", false), _defineProperty(_data, "showShouTitle", false), 
    _defineProperty(_data, "showBaoTitle", false), _defineProperty(_data, "topScroll", 0), 
    _defineProperty(_data, "topScrollMargin", 0), _defineProperty(_data, "collegeChongName", ""), 
    _defineProperty(_data, "collegeChongCode", null), _defineProperty(_data, "collegeShouName", ""), 
    _defineProperty(_data, "collegeShouCode", null), _defineProperty(_data, "collegeBaoName", ""), 
    _defineProperty(_data, "collegeBaoCode", null), _defineProperty(_data, "scrollTop", 0), 
    _defineProperty(_data, "down", false), _defineProperty(_data, "currentTab", 0), 
    _defineProperty(_data, "cityListDown", ""), _defineProperty(_data, "shaixuan", ""), 
    _defineProperty(_data, "cityList", []), _defineProperty(_data, "cityId", null), 
    _defineProperty(_data, "shanghaiChongList", []), _defineProperty(_data, "shanghaiShouList", []), 
    _defineProperty(_data, "shanghaiBaoList", []), _defineProperty(_data, "batchList", [ {
        name: "不限",
        st: true
    }, {
        name: "综合",
        st: false
    }, {
        name: "理工",
        st: false
    }, {
        name: "财经",
        st: false
    }, {
        name: "农林",
        st: false
    }, {
        name: "医药",
        st: false
    }, {
        name: "师范",
        st: false
    }, {
        name: "体育",
        st: false
    }, {
        name: "政法",
        st: false
    }, {
        name: "艺术",
        st: false
    }, {
        name: "民族",
        st: false
    }, {
        name: "军事",
        st: false
    }, {
        name: "语言",
        st: false
    }, {
        name: "其他",
        st: false
    } ]), _data),
    noPay: function noPay() {
        app.payPrompt();
    },
    scrollChongToLower: function scrollChongToLower() {
        //冲下拉加载
        var that = this;
        if (that.data.showChongMore == true) return;
        that.setData({
            showChongMore: true
        });
        try {
            var cityId = wx.getStorageSync("cityId").cityId;
            var userScore = wx.getStorageSync("userScore");
            if (cityId && userScore) {
                that.setData({
                    pnChong: that.data.pnChong + 1
                });
                that.loadDataChong(cityId, userScore.rank, userScore.chooseLevelOrSubjects, that.data.CdiProvince, that.data.CdiClassify, that.data.rankLeft, that.data.rankRight, 1, that.data.pnChong);
            }
        } catch (e) {}
    },
    scrollShouToLower: function scrollShouToLower() {
        //守下拉加载
        var that = this;
        if (that.data.showShouMore == true) return;
        that.setData({
            showShouMore: true
        });
        try {
            var cityId = wx.getStorageSync("cityId").cityId;
            var userScore = wx.getStorageSync("userScore");
            if (cityId && userScore) {
                that.setData({
                    pnShou: that.data.pnShou + 1
                });
                that.loadDataShou(cityId, userScore.rank, userScore.chooseLevelOrSubjects, that.data.CdiProvince, that.data.CdiClassify, that.data.rankLeft, that.data.rankRight, 2, that.data.pnShou);
            }
        } catch (e) {}
    },
    scrollBaoToLower: function scrollBaoToLower() {
        //保下拉加载
        var that = this;
        if (that.data.showBaoMore == true) return;
        that.setData({
            showBaoMore: true
        });
        try {
            var cityId = wx.getStorageSync("cityId").cityId;
            var userScore = wx.getStorageSync("userScore");
            if (cityId && userScore) {
                that.setData({
                    pnBao: that.data.pnBao + 1
                });
                that.loadDataBao(cityId, userScore.rank, userScore.chooseLevelOrSubjects, that.data.CdiProvince, that.data.CdiClassify, that.data.rankLeft, that.data.rankRight, 3, that.data.pnBao);
            }
        } catch (e) {}
    },
    loadDataChong: function loadDataChong(pro, rank, chooselevel, CdiProvince, CdiClassify, CdiRankFrom, CdiRankTo, CSB, pn) {
        var that = this;
        var chooseLevelArr = that.data.chooseLevelArr;
        var totalScore = that.data.userScore.total;
        var chooseLevelOrSubjects = [];
        var Classify = [];
        if (CdiClassify == "" || CdiClassify == [ "不限" ]) {} else {
            Classify = CdiClassify;
        }
        var Province = [];
        if (CdiProvince == "" || CdiProvince == [ -1 ]) {} else {
            Province = CdiProvince;
        }
        var Subjects = that.data.userScore.chooseLevelOrSubjects.split(",");
        for (var i = 0; i < Subjects.length; i++) {
            chooseLevelOrSubjects.push(Subjects[i]);
        }
        _api2.default.getShangHaiRecommendProfessions("TZY/Recommendation/DoNewGaoKaoForSHApp", "POST", pro, rank, chooseLevelOrSubjects, Province, Classify, CdiRankFrom, CdiRankTo, CSB, pn, totalScore, []).then(function(res) {
            for (var i = 0; i < res.result.items.length; i++) {
                for (var j = 0; j < res.result.items[i].professions.length; j++) {
                    var chooseLevel = [];
                    var newLevelNum = "";
                    if (res.result.items[i].professions[j].politics == 1) {
                        chooseLevel.push("政");
                        newLevelNum += "1";
                    }
                    if (res.result.items[i].professions[j].history == 1) {
                        chooseLevel.push("史");
                        newLevelNum += "2";
                    }
                    if (res.result.items[i].professions[j].geography == 1) {
                        chooseLevel.push("地");
                        newLevelNum += "3";
                    }
                    if (res.result.items[i].professions[j].physics == 1) {
                        chooseLevel.push("物");
                        newLevelNum += "4";
                    }
                    if (res.result.items[i].professions[j].chemistry == 1) {
                        chooseLevel.push("化");
                        newLevelNum += "5";
                    }
                    if (res.result.items[i].professions[j].biology == 1) {
                        chooseLevel.push("生");
                        newLevelNum += "6";
                    }
                    res.result.items[i].professions[j].newChooseLevel = chooseLevel;
                    res.result.items[i].professions[j].newLevelNum = newLevelNum;
                }
            }
            that.setData({
                shanghaiChongList: that.data.shanghaiChongList.concat(res.result.items),
                showLoad: false,
                chongSuo: res.result.totalCount,
                chongZu: res.result.totalCount,
                showChongMore: false
            });
        });
    },
    loadDataShou: function loadDataShou(pro, rank, chooselevel, CdiProvince, CdiClassify, CdiRankFrom, CdiRankTo, CSB, pn) {
        var that = this;
        var chooseLevelArr = that.data.chooseLevelArr;
        var totalScore = that.data.userScore.total;
        var chooseLevelOrSubjects = [];
        var Classify = [];
        if (CdiClassify == "" || CdiClassify == [ "不限" ]) {} else {
            Classify = CdiClassify;
        }
        var Province = [];
        if (CdiProvince == "" || CdiProvince == [ -1 ]) {} else {
            Province = CdiProvince;
        }
        chooseLevelOrSubjects.push(that.data.userScore.chooseLevelOrSubjects);
        _api2.default.getShangHaiRecommendProfessions("TZY/Recommendation/DoNewGaoKaoForSHApp", "POST", pro, rank, chooseLevelOrSubjects, Province, Classify, CdiRankFrom, CdiRankTo, CSB, pn, totalScore, []).then(function(res) {
            for (var i = 0; i < res.result.items.length; i++) {
                for (var j = 0; j < res.result.items[i].professions.length; j++) {
                    var chooseLevel = [];
                    var newLevelNum = "";
                    if (res.result.items[i].professions[j].politics == 1) {
                        chooseLevel.push("政");
                        newLevelNum += "1";
                    }
                    if (res.result.items[i].professions[j].history == 1) {
                        chooseLevel.push("史");
                        newLevelNum += "2";
                    }
                    if (res.result.items[i].professions[j].geography == 1) {
                        chooseLevel.push("地");
                        newLevelNum += "3";
                    }
                    if (res.result.items[i].professions[j].physics == 1) {
                        chooseLevel.push("物");
                        newLevelNum += "4";
                    }
                    if (res.result.items[i].professions[j].chemistry == 1) {
                        chooseLevel.push("化");
                        newLevelNum += "5";
                    }
                    if (res.result.items[i].professions[j].biology == 1) {
                        chooseLevel.push("生");
                        newLevelNum += "6";
                    }
                    res.result.items[i].professions[j].newChooseLevel = chooseLevel;
                    res.result.items[i].professions[j].newLevelNum = newLevelNum;
                }
            }
            that.setData({
                shanghaiShouList: that.data.shanghaiShouList.concat(res.result.items),
                shouSuo: res.result.totalCount,
                shouZu: res.result.totalCount,
                showShouMore: false
            });
        });
    },
    loadDataBao: function loadDataBao(pro, rank, chooselevel, CdiProvince, CdiClassify, CdiRankFrom, CdiRankTo, CSB, pn) {
        var that = this;
        var chooseLevelArr = that.data.chooseLevelArr;
        var totalScore = that.data.userScore.total;
        var chooseLevelOrSubjects = [];
        var Classify = [];
        if (CdiClassify == "" || CdiClassify == [ "不限" ]) {} else {
            Classify = CdiClassify;
        }
        var Province = [];
        if (CdiProvince == "" || CdiProvince == [ -1 ]) {} else {
            Province = CdiProvince;
        }
        chooseLevelOrSubjects.push(that.data.userScore.chooseLevelOrSubjects);
        _api2.default.getShangHaiRecommendProfessions("TZY/Recommendation/DoNewGaoKaoForSHApp", "POST", pro, rank, chooseLevelOrSubjects, Province, Classify, CdiRankFrom, CdiRankTo, CSB, pn, totalScore, []).then(function(res) {
            for (var i = 0; i < res.result.items.length; i++) {
                for (var j = 0; j < res.result.items[i].professions.length; j++) {
                    var chooseLevel = [];
                    var newLevelNum = "";
                    if (res.result.items[i].professions[j].politics == 1) {
                        chooseLevel.push("政");
                        newLevelNum += "1";
                    }
                    if (res.result.items[i].professions[j].history == 1) {
                        chooseLevel.push("史");
                        newLevelNum += "2";
                    }
                    if (res.result.items[i].professions[j].geography == 1) {
                        chooseLevel.push("地");
                        newLevelNum += "3";
                    }
                    if (res.result.items[i].professions[j].physics == 1) {
                        chooseLevel.push("物");
                        newLevelNum += "4";
                    }
                    if (res.result.items[i].professions[j].chemistry == 1) {
                        chooseLevel.push("化");
                        newLevelNum += "5";
                    }
                    if (res.result.items[i].professions[j].biology == 1) {
                        chooseLevel.push("生");
                        newLevelNum += "6";
                    }
                    res.result.items[i].professions[j].newChooseLevel = chooseLevel;
                    res.result.items[i].professions[j].newLevelNum = newLevelNum;
                }
            }
            that.setData({
                shanghaiBaoList: that.data.shanghaiBaoList.concat(res.result.items),
                baoSuo: res.result.totalCount,
                baoZu: res.result.totalCount,
                showBaoMore: false
            });
        });
    },
    onShow: function onShow() {
        var that = this;
        try {
            var SHZixuanList = wx.getStorageSync("SHZixuanList");
            if (SHZixuanList) {
                for (var i = 0; i < SHZixuanList.length; i++) {
                    for (var j = 0; j < SHZixuanList[i].Professions.length; j++) {
                        var chooseLevel = [];
                        var newLevelNum = "";
                        if (SHZixuanList[i].Professions[j].Politics == 1) {
                            chooseLevel.push("政");
                            newLevelNum += "1";
                        }
                        if (SHZixuanList[i].Professions[j].History == 1) {
                            chooseLevel.push("史");
                            newLevelNum += "2";
                        }
                        if (SHZixuanList[i].Professions[j].Geography == 1) {
                            chooseLevel.push("地");
                            newLevelNum += "3";
                        }
                        if (SHZixuanList[i].Professions[j].Physics == 1) {
                            chooseLevel.push("物");
                            newLevelNum += "4";
                        }
                        if (SHZixuanList[i].Professions[j].Chemistry == 1) {
                            chooseLevel.push("化");
                            newLevelNum += "5";
                        }
                        if (SHZixuanList[i].Professions[j].Biology == 1) {
                            chooseLevel.push("生");
                            newLevelNum += "6";
                        }
                        SHZixuanList[i].Professions[j].newChooseLevel = chooseLevel;
                        SHZixuanList[i].Professions[j].newLevelNum = newLevelNum;
                    }
                }
                that.setData({
                    zixuanList: SHZixuanList.reverse()
                });
            }
        } catch (e) {}
        var userScore = that.data.userScore;
        var zhejiangRanks = that.data.zhejiangRanks;
        try {
            var newUserScore = wx.getStorageSync("userScore");
            var cityId = wx.getStorageSync("cityId").cityId;
            if (newUserScore) {
                if (newUserScore.total != userScore.total || newUserScore.rank != userScore.rank || newUserScore.chooseLevelOrSubjects != userScore.chooseLevelOrSubjects) {
                    that.setData({
                        showLoad: true,
                        userScore: newUserScore,
                        shanghaiChongList: [],
                        shanghaiShouList: [],
                        shanghaiBaoList: [],
                        shCollegeListArr: []
                    });
                    _api2.default.shangHaiRecommendRanks("ScoreLines/YFYD/QueryRankPosition", "POST", 842, newUserScore.total).then(function(res) {
                        that.loadDataChong(cityId, newUserScore.rank, newUserScore.chooseLevelOrSubjects, "", "", res.result.maxRankingM, res.result.minRankingM, 1, 1);
                        that.loadDataShou(cityId, newUserScore.rank, newUserScore.chooseLevelOrSubjects, "", "", res.result.maxRankingM, res.result.minRankingM, 2, 1);
                        that.loadDataBao(cityId, newUserScore.rank, newUserScore.chooseLevelOrSubjects, "", "", res.result.maxRankingM, res.result.minRankingM, 3, 1);
                    });
                }
            }
        } catch (e) {}
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll("智能填报", true);
        that.setData({
            color: app.globalData.color,
            scrollViewHeight: app.calculateScrollViewHeight(0),
            navHeight: app.globalData.navigationCustomStatusHeight + app.globalData.navigationCustomCapsuleHeight
        });
        if (app.globalData.system == "ios") {
            that.setData({
                isIos: true
            });
        } else {
            that.setData({
                isIos: false
            });
        }
        // that.setData({ system: app.globalData.system});
                try {
            var userScore = wx.getStorageSync("userScore");
            var userInfo = wx.getStorageSync("userInfo");
            if (userScore) {
                if (userScore.provinceNumId == 842) {} else if (userScore.provinceNumId == 843) {
                    wx.redirectTo({
                        url: "../collegeRecommend/collegeRecommend"
                    });
                    return;
                } else {
                    wx.redirectTo({
                        url: "../jiangsuRecommend/jiangsuRecommend"
                    });
                    return;
                }
            }
        } catch (e) {}
        wx.getSystemInfo({
            success: function success(res) {
                that.setData({
                    screenHeight: res.windowHeight,
                    screenWidth: res.windowWidth
                });
            }
        });
        try {
            var userInfo = wx.getStorageSync("userInfo");
            if (userInfo) {
                that.setData({
                    userInfo: userInfo
                });
            }
        } catch (e) {}
        // 上海推荐   位次区间
                try {
            var cityId = wx.getStorageSync("cityId").cityId;
            var userScore = wx.getStorageSync("userScore");
            var userInfo = wx.getStorageSync("userInfo");
            if (cityId && userScore) {
                that.setData({
                    userScore: userScore,
                    userInfo: userInfo
                });
                _api2.default.shangHaiRecommendRanks("ScoreLines/YFYD/QueryRankPosition", "POST", 842, userScore.total).then(function(res) {
                    var screenWidth = that.data.screenWidth;
                    var rankWaiFrom = res.result.maxRanking;
                    var rankWaiTo = res.result.minRanking;
                    var rankFrom = res.result.maxRankingM;
                    var rankTo = res.result.minRankingM;
                    var ballRightLeft = 160 / (rankWaiTo - rankWaiFrom) * (rankFrom - rankWaiFrom) + ((screenWidth * .75 - 160) / 2 - 7);
                    //（外右-外左）/220=（内左-外左）/（Left-（屏幕宽-条宽）/2）
                                        var ballRightRight = 160 / (rankWaiTo - rankWaiFrom) * (rankTo - rankWaiFrom) + ((screenWidth * .75 - 160) / 2 - 7);
                    //（右-左）/220 = （内左-10718）/（Left-63）
                                        that.setData({
                        zhejiangRanks: res.result,
                        rankLeft: rankFrom,
                        rankRight: rankTo,
                        ballRightLeft: ballRightLeft,
                        ballRightRight: ballRightRight
                    });
                    // that.loadChange(that.data.sort, that.data.CSB);
                                        that.loadDataChong(cityId, userScore.rank, userScore.chooseLevelOrSubjects, "", "", rankFrom, rankTo, 1, that.data.pnChong);
                    that.loadDataShou(cityId, userScore.rank, userScore.chooseLevelOrSubjects, "", "", rankFrom, rankTo, 2, that.data.pnShou);
                    that.loadDataBao(cityId, userScore.rank, userScore.chooseLevelOrSubjects, "", "", rankFrom, rankTo, 3, that.data.pnBao);
                    var charsStr = "";
                    var chooseLevel = userScore.chooseLevelOrSubjects;
                    var chars = chooseLevel.split(",");
                    charsStr += chars[0][0] == "思" ? "政/" : chars[0][0] == "历" ? "史/" : chars[0][0] + "/";
                    charsStr += chars[1][0] == "思" ? "政/" : chars[1][0] == "历" ? "史/" : chars[1][0] + "/";
                    charsStr += chars[2][0] == "思" ? "政" : chars[2][0] == "历" ? "史" : chars[2][0];
                    charsStr = charsStr.split("/");
                    that.setData({
                        chooseLevel: charsStr,
                        chooseLevelArr: chars
                    });
                });
            }
        } catch (e) {}
        // 加载筛选城市
                try {
            var _cityList = wx.getStorageSync("cityList");
            var chooseCity = [];
            var chooseCityId = [];
            if (_cityList) {
                for (var _i = 0; _i < _cityList.length; _i++) {
                    chooseCity.push(_cityList[_i].name);
                    chooseCityId.push(_cityList[_i].numId);
                }
                that.setData({
                    cityList: that.data.cityList.concat(chooseCity),
                    cityListId: that.data.cityListId.concat(chooseCityId)
                });
            }
        } catch (e) {}
        var cityList = [ {
            cityName: "不限",
            cityId: -1,
            st: true
        } ];
        try {
            var cityListStorage = wx.getStorageSync("cityList");
            var cityId = wx.getStorageSync("cityId").cityId;
            if (cityListStorage) {
                that.setData({
                    cityId: cityId
                });
                for (var i = 0; i < cityListStorage.length; i++) {
                    cityList.push({
                        cityName: cityListStorage[i].name,
                        cityId: cityListStorage[i].numId,
                        st: false
                    });
                }
                // cityList.push({ "cityName": '海南', "cityId": 853, st: false });
                // cityList.push({ "cityName": '西藏', "cityId": 858, st: false });
                                that.setData({
                    cityList: cityList
                });
            }
        } catch (e) {}
        // 加载筛选城市结束
        },
    swichNav: function swichNav(e) {
        this.setData({
            currentTab: e.currentTarget.dataset.current
        });
    },
    change: function change(e) {
        this.setData({
            currentTab: e.detail.current
        });
    },
    changeScore: function changeScore() {
        var that = this;
        var userScore = this.data.userScore;
        var chooseLevel = "";
        var chooseLevelArr = userScore.chooseLevelOrSubjects.split(",");
        for (var i = 0; i < chooseLevelArr.length; i++) {
            if (chooseLevelArr[i] == "思想政治") {
                chooseLevel += "政";
            }
            if (chooseLevelArr[i] == "历史") {
                chooseLevel += "史";
            }
            if (chooseLevelArr[i] == "地理") {
                chooseLevel += "地";
            }
            if (chooseLevelArr[i] == "物理") {
                chooseLevel += "物";
            }
            if (chooseLevelArr[i] == "化学") {
                chooseLevel += "化";
            }
            if (chooseLevelArr[i] == "生命科学") {
                chooseLevel += "生";
            }
        }
        chooseLevel.split("");
        wx.showModal({
            content: "正在使用的成绩：\n" + userScore.total + "分 " + userScore.rank + "位 " + chooseLevel[0] + "/" + chooseLevel[1] + "/" + chooseLevel[2],
            showCancel: false,
            confirmText: "我知道了",
            confirmColor: "#E9302D",
            success: function success(res) {
                if (res.confirm) {} else if (res.cancel) {
                    wx.navigateTo({
                        url: "../createScore/createScore"
                    });
                }
            }
        });
    },
    shaixuan: function shaixuan() {
        var that = this;
        that.setData({
            shaixuan: "shaixuan-animate",
            flag: true
        });
    },
    shaixuanClose: function shaixuanClose() {
        this.setData({
            shaixuan: "shaixuan-animate-out",
            flag: false
        });
        this.chongzhi();
    },
    down: function down() {
        var that = this;
        that.setData({
            down: !that.data.down,
            cityListDown: that.data.down == false ? "cityList-animate" : "cityList-animate-out"
        });
    },
    chooseCityArr: function chooseCityArr(e) {
        var that = this;
        var cityList = that.data.cityList;
        var cityId = e.currentTarget.dataset.id;
        // if (that.data.cityId == 843) {
        //   for (var i = 0; i < cityList.length; i++) {
        //     cityList[i].st = false
        //   }
        //   for (var i = 0; i < cityList.length; i++) {
        //     var flag = !cityList[i].st;
        //     if (cityId == cityList[i].cityId) {
        //       cityList[i].st = flag
        //     }
        //   }
        //   that.setData({ showBtn: true })
        // } else {
                if (cityId == -1) {
            cityList[0].st = true;
            for (var i = 1; i < cityList.length; i++) {
                cityList[i].st = false;
            }
            that.setData({
                showBtn: true
            });
        } else {
            cityList[0].st = false;
            for (var i = 1; i < cityList.length; i++) {
                var flag = !cityList[i].st;
                if (cityId == cityList[i].cityId) {
                    cityList[i].st = flag;
                }
            }
            that.setData({
                showBtn: true
            });
        }
        // }
                that.setData({
            cityList: that.data.cityList
        });
    },
    collegeTypeArr: function collegeTypeArr(e) {
        var that = this;
        var batchList = that.data.batchList;
        var batchName = e.currentTarget.dataset.name;
        if (batchName == "不限") {
            batchList[0].st = true;
            for (var i = 1; i < batchList.length; i++) {
                batchList[i].st = false;
            }
            that.setData({
                showBtn: true
            });
        } else {
            batchList[0].st = false;
            for (var i = 1; i < batchList.length; i++) {
                var flag = !batchList[i].st;
                if (batchName == batchList[i].name) {
                    batchList[i].st = flag;
                }
            }
            that.setData({
                showBtn: true
            });
        }
        that.setData({
            batchList: that.data.batchList
        });
    },
    chongzhi: function chongzhi() {
        //重置
        var that = this;
        that.data.cityList[0].st = true;
        for (var i = 1; i < that.data.cityList.length; i++) {
            that.data.cityList[i].st = false;
        }
        that.data.batchList[0].st = true;
        for (var i = 1; i < that.data.batchList.length; i++) {
            that.data.batchList[i].st = false;
        }
        var rankWaiTo = that.data.zhejiangRanks.minRanking;
        var rankWaiFrom = that.data.zhejiangRanks.maxRanking;
        var rankFrom = that.data.zhejiangRanks.maxRankingM;
        var rankTo = that.data.zhejiangRanks.minRankingM;
        var screenWidth = that.data.screenWidth;
        var ballRightLeft = 160 / (rankWaiTo - rankWaiFrom) * (rankFrom - rankWaiFrom) + ((screenWidth * .75 - 160) / 2 - 7);
        //（外右-外左）/220=（内左-外左）/（Left-（屏幕宽-条宽）/2）
                var ballRightRight = 160 / (rankWaiTo - rankWaiFrom) * (rankTo - rankWaiFrom) + ((screenWidth * .75 - 160) / 2 - 7);
        //（右-左）/220 = （内左-10718）/（Left-63）
                that.setData({
            cityList: that.data.cityList,
            batchList: that.data.batchList,
            rankLeft: that.data.zhejiangRanks.maxRankingM,
            rankRight: that.data.zhejiangRanks.minRankingM,
            ballRightLeft: ballRightLeft,
            ballRightRight: ballRightRight
        });
    },
    queren: function queren() {
        //确认
        var that = this;
        if (that.data.userInfo[0].UserType > 1) {
            that.setData({
                shaixuan: "shaixuan-animate-out",
                flag: false
            });
            var batchListArr = [];
            var cityArr = [];
            for (var i = 0; i < that.data.batchList.length; i++) {
                if (that.data.batchList[i].st == true) {
                    batchListArr.push(that.data.batchList[i].name);
                }
            }
            var CdiClassify = batchListArr;
            for (var i = 0; i < that.data.cityList.length; i++) {
                if (that.data.cityList[i].st == true) {
                    cityArr.push(that.data.cityList[i].cityId);
                }
            }
            var CdiProvince = cityArr;
            var CdiRankFrom = that.data.rankLeft;
            var CdiRankTo = that.data.rankRight;
            that.setData({
                CdiProvince: CdiProvince,
                CdiClassify: CdiClassify
            });
            try {
                var userScore = wx.getStorageSync("userScore");
                if (userScore) {
                    if (CdiProvince == "-1") {
                        CdiProvince = "";
                    }
                    if (CdiClassify == "不限") {
                        CdiClassify = "";
                    }
                    that.setData({
                        pnChong: 1,
                        pnShou: 1,
                        pnBao: 1,
                        showLoad: true,
                        shanghaiChongList: [],
                        shanghaiShouList: [],
                        shanghaiBaoList: []
                    });
                    that.loadDataChong(that.data.cityId, userScore.rank, userScore.chooseLevelOrSubjects, CdiProvince, CdiClassify, CdiRankFrom, CdiRankTo, 1, that.data.pnChong);
                    that.loadDataShou(that.data.cityId, userScore.rank, userScore.chooseLevelOrSubjects, CdiProvince, CdiClassify, CdiRankFrom, CdiRankTo, 2, that.data.pnShou);
                    that.loadDataBao(that.data.cityId, userScore.rank, userScore.chooseLevelOrSubjects, CdiProvince, CdiClassify, CdiRankFrom, CdiRankTo, 3, that.data.pnBao);
                }
            } catch (e) {}
        } else {
            that.chongzhi();
            wx.showToast({
                title: "开通VIP即可体验",
                icon: "none",
                duration: 2e3
            });
            that.setData({
                shaixuan: "shaixuan-animate-out",
                flag: false
            });
        }
    },
    beizhu: function beizhu(e) {
        var that = this;
        var majorname = e.currentTarget.dataset.majorname;
        var remark = e.currentTarget.dataset.remark;
        clearTimeout(timeout);
        this.setData({
            beizhuShow: "beizhu-animate",
            majorname: majorname,
            remark: remark
        });
        var timeout = setTimeout(function() {
            that.setData({
                beizhuShow: "beizhu-animate-out"
            });
        }, 4e3);
    },
    majorClose: function majorClose() {
        this.setData({
            majorUp: "major-animate-out"
        });
    },
    majorUp: function majorUp(e) {
        var that = this;
        that.setData({
            majorLoad: true
        });
        var collegecode = e.currentTarget.dataset.collegecode;
        var majorcode = e.currentTarget.dataset.majorcode;
        var ucode = e.currentTarget.dataset.ucode;
        if (that.data.majorDetail.length > 0) {
            if (that.data.majorDetail[0].majorcode != majorcode) {
                var pro = that.data.userScore.provinceNumId;
                var rank = that.data.userScore.rank;
                _api2.default.getShangHaiRecommendProfessionDetail("v2/getShangHaiRecommendProfessionDetail", "POST", pro, ucode, collegecode, rank, 1, majorcode).then(function(res) {
                    that.setData({
                        majorDetail: res.Results,
                        majorLoad: false
                    });
                });
            } else {
                that.setData({
                    majorLoad: false
                });
            }
        } else {
            var pro = that.data.userScore.provinceNumId;
            var rank = that.data.userScore.rank;
            _api2.default.getShangHaiRecommendProfessionDetail("v2/getShangHaiRecommendProfessionDetail", "POST", pro, ucode, collegecode, rank, 1, majorcode).then(function(res) {
                that.setData({
                    majorDetail: res.Results,
                    majorLoad: false
                });
            });
        }
        this.setData({
            majorUp: "major-animate"
        });
    },
    collegeClose: function collegeClose() {
        this.setData({
            collegeUp: "major-animate-out"
        });
    },
    collegeUp: function collegeUp(e) {
        var that = this;
        that.setData({
            collegeLoad: true
        });
        var ucode = e.currentTarget.dataset.ucode;
        var collegecode = e.currentTarget.dataset.collegecode;
        if (that.data.collegeDetail.length > 0) {
            if (collegecode != that.data.collegeDetail[0].CollegCode) {
                var pro = that.data.userScore.provinceNumId;
                var rank = that.data.userScore.rank;
                _api2.default.getShangHaiRecommendCollegeDetail("v2/getShangHaiRecommendCollegeDetail", "POST", pro, ucode, collegecode, rank, 1).then(function(res) {
                    that.setData({
                        collegeDetail: res.Results,
                        collegeLoad: false
                    });
                });
            } else {
                that.setData({
                    collegeLoad: false
                });
            }
        } else {
            var pro = that.data.userScore.provinceNumId;
            var rank = that.data.userScore.rank;
            _api2.default.getShangHaiRecommendCollegeDetail("v2/getShangHaiRecommendCollegeDetail", "POST", pro, ucode, collegecode, rank, 1).then(function(res) {
                that.setData({
                    collegeDetail: res.Results,
                    collegeLoad: false
                });
            });
        }
        this.setData({
            collegeUp: "major-animate"
        });
    },
    goMajorDetail: function goMajorDetail(e) {
        var mcode = this.data.majorDetail[0].MajorCode;
        this.setData({
            majorUp: "major-animate-out"
        });
        wx.navigateTo({
            url: "../mCodeDetail/mCodeDetail?mcode=" + mcode
        });
    },
    goCollegeDetail: function goCollegeDetail() {
        var id = this.data.collegeDetail[0].CollegeId;
        this.setData({
            collegeUp: "major-animate-out"
        });
        wx.navigateTo({
            url: "/packages/findUniversity/collegeDetail/collegeDetail?numId=" + id
        });
    },
    checked: function checked(e) {
        var that = this;
        if (that.data.userInfo[0].UserType > 1) {
            var item = e.currentTarget.dataset.item;
            var collegeIndex = e.currentTarget.dataset.collegeindex;
            var majorIndex = e.currentTarget.dataset.majorindex;
            var shListArr = this.data.shCollegeListArr;
            var collegeCode = e.currentTarget.dataset.collegecode;
            var datatype = e.currentTarget.dataset.datatype;
            if (item == "0") {
                var shanghaiChongList = this.data.shanghaiChongList;
                var Professions = shanghaiChongList[collegeIndex].Professions[majorIndex];
                shanghaiChongList[collegeIndex].Professions[majorIndex].st = true;
                that.setData({
                    shanghaiChongList: that.data.shanghaiChongList
                });
                if (shListArr.length == 0) {
                    shListArr.push(shanghaiChongList[collegeIndex]);
                    shListArr[0].Professions = [];
                    shListArr[0].Professions.push(Professions);
                } else {
                    for (var i = 0; i < shListArr.length; i++) {
                        if (collegeCode == shListArr[i].CollegeCode && datatype == shListArr[i].DataType) {
                            shListArr[i].Professions.push(Professions);
                            if (shListArr[i].Professions.length > 4) {
                                shListArr[i].Professions.splice(shListArr[i].Professions.length - 1, 1);
                                that.data.shanghaiChongList[collegeIndex].Professions[majorIndex].st = false;
                                that.setData({
                                    shanghaiChongList: that.data.shanghaiChongList
                                });
                                wx.showToast({
                                    title: "每所院校最多选择4个专业",
                                    icon: "none",
                                    duration: 2e3
                                });
                            }
                            break;
                        } else {
                            if (i + 1 == shListArr.length) {
                                shListArr.push(shanghaiChongList[collegeIndex]);
                                shListArr[shListArr.length - 1].Professions = [];
                                if (shListArr.length > 50) {
                                    shListArr.splice(shListArr.length - 1, 1);
                                    that.data.shanghaiChongList[collegeIndex].Professions[majorIndex].st = false;
                                    that.setData({
                                        shanghaiChongList: that.data.shanghaiChongList
                                    });
                                    wx.showToast({
                                        title: "最多选择50所院校",
                                        icon: "none",
                                        duration: 2e3
                                    });
                                }
                            }
                        }
                    }
                }
            } else if (item == "1") {
                var shanghaiShouList = this.data.shanghaiShouList;
                var Professions = shanghaiShouList[collegeIndex].Professions[majorIndex];
                shanghaiShouList[collegeIndex].Professions[majorIndex].st = true;
                that.setData({
                    shanghaiShouList: that.data.shanghaiShouList
                });
                if (shListArr.length == 0) {
                    shListArr.push(shanghaiShouList[collegeIndex]);
                    shListArr[0].Professions = [];
                    shListArr[0].Professions.push(Professions);
                } else {
                    for (var i = 0; i < shListArr.length; i++) {
                        if (collegeCode == shListArr[i].CollegeCode && datatype == shListArr[i].DataType) {
                            shListArr[i].Professions.push(Professions);
                            if (shListArr[i].Professions.length > 4) {
                                shListArr[i].Professions.splice(shListArr[i].Professions.length - 1, 1);
                                that.data.shanghaiShouList[collegeIndex].Professions[majorIndex].st = false;
                                that.setData({
                                    shanghaiShouList: that.data.shanghaiShouList
                                });
                                wx.showToast({
                                    title: "每所院校最多选择4个专业",
                                    icon: "none",
                                    duration: 2e3
                                });
                            }
                            break;
                        } else {
                            if (i + 1 == shListArr.length) {
                                shListArr.push(shanghaiShouList[collegeIndex]);
                                shListArr[shListArr.length - 1].Professions = [];
                                if (shListArr.length > 50) {
                                    shListArr.splice(shListArr.length - 1, 1);
                                    that.data.shanghaiShouList[collegeIndex].Professions[majorIndex].st = false;
                                    that.setData({
                                        shanghaiShouList: that.data.shanghaiShouList
                                    });
                                    wx.showToast({
                                        title: "最多选择50所院校",
                                        icon: "none",
                                        duration: 2e3
                                    });
                                }
                            }
                        }
                    }
                }
            } else if (item == "2") {
                var shanghaiBaoList = this.data.shanghaiBaoList;
                var Professions = shanghaiBaoList[collegeIndex].Professions[majorIndex];
                shanghaiBaoList[collegeIndex].Professions[majorIndex].st = true;
                that.setData({
                    shanghaiBaoList: that.data.shanghaiBaoList
                });
                if (shListArr.length == 0) {
                    shListArr.push(shanghaiBaoList[collegeIndex]);
                    shListArr[0].Professions = [];
                    shListArr[0].Professions.push(Professions);
                } else {
                    for (var i = 0; i < shListArr.length; i++) {
                        if (collegeCode == shListArr[i].CollegeCode && datatype == shListArr[i].DataType) {
                            shListArr[i].Professions.push(Professions);
                            if (shListArr[i].Professions.length > 4) {
                                shListArr[i].Professions.splice(shListArr[i].Professions.length - 1, 1);
                                that.data.shanghaiBaoList[collegeIndex].Professions[majorIndex].st = false;
                                that.setData({
                                    shanghaiBaoList: that.data.shanghaiBaoList
                                });
                                wx.showToast({
                                    title: "每所院校最多选择4个专业",
                                    icon: "none",
                                    duration: 2e3
                                });
                            }
                            break;
                        } else {
                            if (i + 1 == shListArr.length) {
                                shListArr.push(shanghaiBaoList[collegeIndex]);
                                shListArr[shListArr.length - 1].Professions = [];
                                if (shListArr.length > 50) {
                                    shListArr.splice(shListArr.length - 1, 1);
                                    that.data.shanghaiBaoList[collegeIndex].Professions[majorIndex].st = false;
                                    that.setData({
                                        shanghaiBaoList: that.data.shanghaiBaoList
                                    });
                                    wx.showToast({
                                        title: "最多选择50所院校",
                                        icon: "none",
                                        duration: 2e3
                                    });
                                }
                            }
                        }
                    }
                }
            } else if (item == "3") {
                var zixuanList = this.data.zixuanList;
                var Professions = zixuanList[collegeIndex].Professions[majorIndex];
                zixuanList[collegeIndex].Professions[majorIndex].st = true;
                that.setData({
                    zixuanList: that.data.zixuanList
                });
                if (shListArr.length == 0) {
                    shListArr.push(zixuanList[collegeIndex]);
                    shListArr[0].Professions = [];
                    shListArr[0].Professions.push(Professions);
                } else {
                    for (var i = 0; i < shListArr.length; i++) {
                        if (collegeCode == shListArr[i].CollegeCode && datatype == shListArr[i].DataType) {
                            shListArr[i].Professions.push(Professions);
                            if (shListArr[i].Professions.length > 4) {
                                shListArr[i].Professions.splice(shListArr[i].Professions.length - 1, 1);
                                that.data.zixuanList[collegeIndex].Professions[majorIndex].st = false;
                                that.setData({
                                    zixuanList: that.data.zixuanList
                                });
                                wx.showToast({
                                    title: "每所院校最多选择4个专业",
                                    icon: "none",
                                    duration: 2e3
                                });
                            }
                            break;
                        } else {
                            if (i + 1 == shListArr.length) {
                                shListArr.push(zixuanList[collegeIndex]);
                                shListArr[shListArr.length - 1].Professions = [];
                                if (shListArr.length > 50) {
                                    shListArr.splice(shListArr.length - 1, 1);
                                    that.data.zixuanList[collegeIndex].Professions[majorIndex].st = false;
                                    that.setData({
                                        zixuanList: that.data.zixuanList
                                    });
                                    wx.showToast({
                                        title: "最多选择50所院校",
                                        icon: "none",
                                        duration: 2e3
                                    });
                                }
                            }
                        }
                    }
                }
            }
            that.setData({
                shCollegeListArr: shListArr
            });
        } else {
            wx.showToast({
                title: "开通VIP即可体验",
                icon: "none",
                duration: 2e3
            });
        }
    },
    checkedNo: function checkedNo(e) {
        var that = this;
        var item = e.currentTarget.dataset.item;
        var shChongListArr = this.data.shChongListArr;
        var collegeIndex = e.currentTarget.dataset.collegeindex;
        var majorIndex = e.currentTarget.dataset.majorindex;
        var ProfessionCode = e.currentTarget.dataset.majorcode;
        var collegeCode = e.currentTarget.dataset.collegecode;
        var shListArr = this.data.shCollegeListArr;
        if (item == "0") {
            this.data.shanghaiChongList[collegeIndex].Professions[majorIndex].st = false;
            this.setData({
                shanghaiChongList: this.data.shanghaiChongList
            });
        } else if (item == "1") {
            this.data.shanghaiShouList[collegeIndex].Professions[majorIndex].st = false;
            this.setData({
                shanghaiShouList: this.data.shanghaiShouList
            });
        } else if (item == "2") {
            this.data.shanghaiBaoList[collegeIndex].Professions[majorIndex].st = false;
            this.setData({
                shanghaiBaoList: this.data.shanghaiBaoList
            });
        } else if (item == "3") {
            this.data.zixuanList[collegeIndex].Professions[majorIndex].st = false;
            this.setData({
                zixuanList: this.data.zixuanList
            });
        }
        for (var i = 0; i < shListArr.length; i++) {
            if (shListArr[i].CollegeCode == collegeCode) {
                for (var j = 0; j < shListArr[i].Professions.length; j++) {
                    if (shListArr[i].Professions[j].ProfessionCode == ProfessionCode) {
                        shListArr[i].Professions.splice(j, 1);
                        if (shListArr[i].Professions.length == 0) {
                            shListArr.splice(i, 1);
                        }
                        break;
                    }
                }
            }
        }
        that.setData({
            shCollegeListArr: shListArr
        });
    },
    ballMoveEventLeft: function ballMoveEventLeft(e) {
        var that = this;
        var touchs = e.touches[0];
        var pageX = touchs.pageX;
        //防止坐标越界,view宽高的一半 
                if (pageX < (that.data.screenWidth * .75 - 160) / 2 - 7) return;
        if (pageX > that.data.ballRightRight) return;
        var rankLeft = Math.floor((that.data.zhejiangRanks.minRanking - that.data.zhejiangRanks.maxRanking) / 160 * (pageX - (that.data.screenWidth * .75 - 160) / 2 + 7) + that.data.zhejiangRanks.maxRanking);
        this.setData({
            ballRightLeft: pageX,
            rankLeft: rankLeft
        });
    },
    ballMoveEventRight: function ballMoveEventRight(e) {
        var that = this;
        var touchs = e.touches[0];
        var pageX = touchs.pageX;
        //防止坐标越界,view宽高的一半
                if (pageX < that.data.ballRightLeft) return;
        if (pageX > (that.data.screenWidth * .75 - 160) / 2 + 160 - 7) return;
        var rankRight = Math.floor((that.data.zhejiangRanks.minRanking - that.data.zhejiangRanks.maxRanking) / 160 * (pageX - (that.data.screenWidth * .75 - 160) / 2 + 7) + that.data.zhejiangRanks.maxRanking);
        this.setData({
            ballRightRight: pageX,
            rankRight: rankRight
        });
    },
    goSearchZixuan: function goSearchZixuan() {
        wx.navigateTo({
            url: "../searchZixuan/searchZixuan"
        });
    },
    commonTuijian: function commonTuijian() {
        wx.navigateTo({
            url: "/packages/paySystem/memberCardDetail/memberCardDetail"
        });
    }
});