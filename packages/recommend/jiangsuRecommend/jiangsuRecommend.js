var _api = require("../../../utils/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var app = getApp();

Page({
    data: {
        hotType: [ {
            name: "不限",
            value: "",
            st: true
        }, {
            name: "双一流",
            value: "双一流",
            st: false
        }, {
            name: "985",
            value: "985",
            st: false
        }, {
            name: "211",
            value: "211",
            st: false
        } ],
        bOrZ: [ {
            name: "不限",
            value: "",
            st: true
        }, {
            name: "本科",
            value: "1",
            st: false
        }, {
            name: "专科",
            value: "0",
            st: false
        } ],
        xingzhi: [ {
            name: "不限",
            value: -1,
            st: true
        }, {
            name: "公办",
            value: 1,
            st: false
        }, {
            name: "民办",
            value: 0,
            st: false
        } ],
        navHeight: 0,
        scrollViewHeight: 0,
        color: null,
        payBtnText: app.globalData.payBtnText,
        system: "android",
        flag: false,
        cityId: -1,
        confirmButtonHeight: "",
        transitionUp: "",
        serverFail: false,
        serverMajorFail: false,
        serverCollegeFail: false,
        //缓存数据 
        bufferYXYX: [ {}, {}, {}, {} ],
        //院校优先
        bufferZYYX: [ {}, {}, {}, {} ],
        //专业优先
        //缓存数据结束
        CdiProvinceNum: 0,
        CdiClassifyNum: 0,
        CSBList: [ {
            name: "冲",
            id: 1,
            CSBBgColor: "FF5153",
            st: false
        }, {
            name: "守",
            id: 2,
            CSBBgColor: "FFCA29",
            st: false
        }, {
            name: "保",
            id: 3,
            CSBBgColor: "8EDD5B",
            st: false
        }, {
            name: "默认",
            id: 0,
            CSBBgColor: "FE7878",
            st: false
        } ],
        collegeShowMore: false,
        majorShowMore: false,
        CSBContent: "选择风险",
        CSBBgColor: "FE7878",
        majorOpen: "",
        RecommendType: 0,
        CSBFlag: "true",
        CSBChong: "",
        CSBShou: "",
        CSBBao: "",
        CSBMoren: "",
        collegeCount: 0,
        shareChong: "",
        shareShou: "",
        shareBao: "",
        share: true,
        morenCityList: [],
        morenBatchList: [],
        showFlag: true,
        GroupName: "",
        JSTable: [],
        yxyxShow: true,
        batchName: "",
        zxyxShow: true,
        searchCollegeNum: 0,
        zixuanCollegeId: null,
        zixuanYXList: [],
        collegeNum: 0,
        ZyProfessionCount: null,
        tianbaoFlag: true,
        collegeindex: 0,
        zyyxShow: false,
        tianbaoCollegeDetail: [],
        tianbaoList: [],
        tianbaoUp: "",
        majorYXList: [],
        searchCollegeName: "输入院校名称",
        searchMajorName: "输入专业名称",
        searchMajorNum: 0,
        showCollegeMore: false,
        showMajorMore: false,
        collegePn: 1,
        majorPn: 1,
        CdiProvince: [],
        CdiClassify: [],
        majorDetail: [],
        majorLoad: true,
        collegeDetailBatchName: [],
        collegeDetailBatchIndex: 0,
        collegeDetailBatchId: [],
        collegeDetail: [],
        professionsDetail: [],
        collegeLoad: true,
        down: false,
        cityListDown: "",
        batchListName: [],
        batchId: [],
        batchListIndex: 0,
        batch: null,
        currentTab: 0,
        showLoad: false,
        userInfo: [],
        userScore: [],
        collegeYXList: [],
        collegeYXsuo: null,
        cityList: [ {
            fLetter: "",
            name: "全国",
            numId: -1,
            st: true
        }, {
            fLetter: "A",
            name: "安徽",
            numId: 844,
            st: false
        }, {
            fLetter: "B",
            name: "北京",
            numId: 834,
            st: false
        }, {
            fLetter: "C",
            name: "重庆",
            numId: 854,
            st: false
        }, {
            fLetter: "F",
            name: "福建",
            numId: 845,
            st: false
        }, {
            fLetter: "G",
            name: "广东",
            numId: 851,
            st: false
        }, {
            fLetter: "G",
            name: "广西",
            numId: 852,
            st: false
        }, {
            fLetter: "G",
            name: "贵州",
            numId: 856,
            st: false
        }, {
            fLetter: "G",
            name: "甘肃",
            numId: 860,
            st: false
        }, {
            fLetter: "H",
            name: "海南",
            numId: 853,
            st: false
        }, {
            fLetter: "H",
            name: "河南",
            numId: 848,
            st: false
        }, {
            fLetter: "H",
            name: "黑龙江",
            numId: 841,
            st: false
        }, {
            fLetter: "H",
            name: "湖北",
            numId: 849,
            st: false
        }, {
            fLetter: "H",
            name: "湖南",
            numId: 850,
            st: false
        }, {
            fLetter: "H",
            name: "河北",
            numId: 1128,
            st: false
        }, {
            fLetter: "J",
            name: "江苏",
            numId: 1,
            st: false
        }, {
            fLetter: "J",
            name: "吉林",
            numId: 840,
            st: false
        }, {
            fLetter: "J",
            name: "江西",
            numId: 846,
            st: false
        }, {
            fLetter: "L",
            name: "辽宁",
            numId: 839,
            st: false
        }, {
            fLetter: "N",
            name: "宁夏",
            numId: 862,
            st: false
        }, {
            fLetter: "N",
            name: "内蒙古",
            numId: 838,
            st: false
        }, {
            fLetter: "Q",
            name: "青海",
            numId: 861,
            st: false
        }, {
            fLetter: "S",
            name: "上海",
            numId: 842,
            st: false
        }, {
            fLetter: "S",
            name: "山东",
            numId: 847,
            st: false
        }, {
            fLetter: "S",
            name: "山西",
            numId: 837,
            st: false
        }, {
            fLetter: "S",
            name: "陕西",
            numId: 859,
            st: false
        }, {
            fLetter: "S",
            name: "四川",
            numId: 855,
            st: false
        }, {
            fLetter: "T",
            name: "天津",
            numId: 835,
            st: false
        }, {
            fLetter: "X",
            name: "新疆",
            numId: 1120,
            st: false
        }, {
            fLetter: "X",
            name: "西藏",
            numId: 858,
            st: false
        }, {
            fLetter: "Y",
            name: "云南",
            numId: 857,
            st: false
        }, {
            fLetter: "Z",
            name: "浙江",
            numId: 843,
            st: false
        } ],
        batchList: [ {
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
        } ]
    },
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        if (res.from === "button") {}
        return {
            title: "看看你的分数能上什么大学",
            path: "/pages/wxToBIndex/wxToBIndex",
            fail: function fail(res) {}
        };
    },
    loadData: function loadData(batch, pros, majors, collegeType, pn, BusinessType, MajorCodeOrName, GroupName, CollegeId, UCode, RecommendType) {
        var that = this;
        var userScore = that.data.userScore;
        var pro = userScore.provinceNumId;
        var course = userScore.courseType;
        if (pro == 1) {
            var chooseLevel = userScore.chooseLevelList[0].value + "," + userScore.chooseLevelList[1].value;
        } else {
            var chooseLevel = "";
        }
        var Rank = userScore.rank;
        var YfydRank = 0;
        var total = userScore.total;
        var bufferYXYX = that.data.bufferYXYX;
        if (typeof collegeType != "string") {
            collegeType = collegeType.join("_");
        }
        if (typeof pros != "string") {
            pros = pros.join("_");
        }
        var pageSizeForCSB = 0;
        if (that.data.userInfo[0].UserType > 1) {} else {
            pageSizeForCSB = 1;
        }
        var educationTypeLevels = "";
        //学历层次,多个中间用"_"分隔
                var levels = "";
        //办学层次,多个中间用"_"分隔 985 211 双一流
                var levelsArr = [];
        var cType = -1;
        //院校性质(-1:全部,1:公立,0:私立)
                var hotType = that.data.hotType;
        for (var i = 0; i < hotType.length; i++) {
            if (hotType[i].st == true) {
                levelsArr.push(hotType[i].value);
            }
        }
        levels = levelsArr.join("_");
        for (var _i = 0; _i < that.data.xingzhi.length; _i++) {
            if (that.data.xingzhi[_i].st == true) {
                cType = that.data.xingzhi[_i].value;
            }
        }
        _api2.default.getRecommendCollegeV2("TZY/Recommendation/DoCollegeFirstForApp", "POST", pro, batch, course, total, pros, collegeType, chooseLevel, pn, GroupName, Rank, RecommendType, pageSizeForCSB, levels, cType).then(function(res) {
            if (res.isSuccess) {
                if (res.result.items.length > 0) {
                    var collegeYXList = that.data.collegeYXList;
                    for (var i = 0; i < res.result.items.length; i++) {
                        res.result.items[i].majorOpen = false;
                        var tagsArr = res.result.items[i].tags.split(" ");
                        var tags = "";
                        for (var _i2 = 0; _i2 < tagsArr.length; _i2++) {
                            if (tagsArr[_i2] == "211" || tagsArr[_i2] == "985" || tagsArr[_i2] == "双一流") {
                                tags += tagsArr[_i2] + " ";
                            }
                        }
                        res.result.items[i].tags = tags;
                        // res.result.items[i].tags.replace('省重','')
                        // res.result.items[i].tags.replace('艺术', '')
                        // res.result.items[i].tags.replace('国重', '')
                                                collegeYXList.push(res.result.items[i]);
                    }
                    that.setData({
                        collegeYXList: collegeYXList,
                        showLoad: false,
                        collegeYXsuo: res.result.totalCount,
                        showCollegeMore: false,
                        yxyxShow: false
                    });
                    that.changeMain(collegeYXList);
                    if (pn == 1) {
                        var bufferYXYX = that.data.bufferYXYX;
                        bufferYXYX[RecommendType].collegeYXList = collegeYXList;
                        bufferYXYX[RecommendType].collegeYXsuo = res.TotalCount;
                        that.setData({
                            bufferYXYX: bufferYXYX
                        });
                    }
                    that.setData({
                        collegeYXList: collegeYXList
                    });
                    wx.hideNavigationBarLoading();
                } else {
                    if (pn == 1) {
                        var bufferYXYX = that.data.bufferYXYX;
                        bufferYXYX[RecommendType].collegeYXList = [];
                        bufferYXYX[RecommendType].collegeYXsuo = res.TotalCount;
                        that.setData({
                            bufferYXYX: bufferYXYX
                        });
                    }
                    that.setData({
                        yxyxShow: false,
                        collegeShowMore: false
                    });
                    wx.hideNavigationBarLoading();
                }
            } else {
                that.setData({
                    showLoad: false,
                    yxyxShow: false,
                    showCollegeMore: false,
                    serverFail: true
                });
            }
        });
    },
    loadMajorData: function loadMajorData(batch, pros, majors, collegeType, pn, BusinessType, MajorCodeOrName, GroupName, CollegeId, UCode, RecommendType) {
        var that = this;
        var userScore = that.data.userScore;
        var pro = userScore.provinceNumId;
        var course = userScore.courseType;
        if (pro == 1) {
            var chooseLevel = userScore.chooseLevelList[0].value + "," + userScore.chooseLevelList[1].value;
        } else {
            var chooseLevel = "";
        }
        var Rank = userScore.rank;
        var YfydRank = 0;
        var total = userScore.total;
        var bufferZYYX = that.data.bufferZYYX;
        if (bufferZYYX[RecommendType].majorYXList && pn == 1) {
            that.setData({
                majorYXList: bufferZYYX[RecommendType].majorYXList,
                searchMajorNum: bufferZYYX[RecommendType].searchMajorNum,
                zyyxShow: false
            });
            that.changeMain(that.data.majorYXList);
            that.setData({
                majorYXList: that.data.majorYXList
            });
            wx.hideNavigationBarLoading();
        } else {
            if (typeof collegeType != "string") {
                collegeType = collegeType.join("_");
            }
            if (typeof pros != "string") {
                pros = pros.join("_");
            }
            var levels = "";
            //办学层次,多个中间用"_"分隔 985 211 双一流
                        var levelsArr = [];
            var cType = -1;
            //院校性质(-1:全部,1:公立,0:私立)
                        var hotType = that.data.hotType;
            for (var i = 0; i < hotType.length; i++) {
                if (hotType[i].st == true) {
                    levelsArr.push(hotType[i].value);
                }
            }
            levels = levelsArr.join("_");
            for (var _i3 = 0; _i3 < that.data.xingzhi.length; _i3++) {
                if (that.data.xingzhi[_i3].st == true) {
                    cType = that.data.xingzhi[_i3].value;
                }
            }
            _api2.default.getRecommendMajorV2("TZY/Recommendation/DoProfessionFirstForApp", "POST", pro, batch, course, total, pros, collegeType, chooseLevel, pn, GroupName, Rank, RecommendType, MajorCodeOrName, "", levels, cType).then(function(res) {
                if (res.isSuccess) {
                    if (res.result.items.length > 0) {
                        var majorYXList = that.data.majorYXList;
                        for (var i = 0; i < res.result.items.length; i++) {
                            res.result.items[i].collegeArea = res.result.items[i].collegeArea.replace("市", "");
                            var tagsArr = res.result.items[i].tags.split(" ");
                            var tags = "";
                            for (var _i4 = 0; _i4 < tagsArr.length; _i4++) {
                                if (tagsArr[_i4] == "211" || tagsArr[_i4] == "985" || tagsArr[_i4] == "双一流") {
                                    tags += tagsArr[_i4] + " ";
                                }
                            }
                            res.result.items[i].tags = tags;
                            majorYXList.push(res.result.items[i]);
                        }
                        that.setData({
                            majorYXList: majorYXList,
                            searchMajorNum: res.result.totalCount,
                            zyyxShow: false
                        });
                        that.changeMain(majorYXList);
                        if (pn == 1) {
                            var bufferZYYX = that.data.bufferZYYX;
                            bufferZYYX[RecommendType].majorYXList = majorYXList;
                            bufferZYYX[RecommendType].searchMajorNum = res.TotalCount;
                            that.setData({
                                bufferZYYX: bufferZYYX
                            });
                        }
                        that.setData({
                            majorYXList: majorYXList,
                            showMajorMore: false
                        });
                        wx.hideNavigationBarLoading();
                    } else {
                        if (pn == 1) {
                            var bufferZYYX = that.data.bufferZYYX;
                            bufferZYYX[RecommendType].majorYXList = [];
                            bufferZYYX[RecommendType].searchMajorNum = res.TotalCount;
                            that.setData({
                                bufferZYYX: bufferZYYX
                            });
                        }
                        that.setData({
                            zyyxShow: false,
                            majorShowMore: false
                        });
                        wx.hideNavigationBarLoading();
                    }
                } else {
                    that.setData({
                        showMajorMore: false,
                        zyyxShow: false,
                        serverMajorFail: true
                    });
                }
            });
        }
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll("智能填报", true);
        that.setData({
            scrollViewHeight: app.calculateScrollViewHeight(0),
            navHeight: app.globalData.navigationCustomStatusHeight + app.globalData.navigationCustomCapsuleHeight
        });
        if (app.globalData.tuijianCommon == "2") {
            that.setData({
                showLoad: false,
                currentTab: 1
            });
        }
        that.setData({
            system: app.globalData.system,
            color: app.globalData.color
        });
        var userScore = wx.getStorageSync("userScore");
        var userInfo = wx.getStorageSync("userInfo");
        if (userScore) {
            if (userScore.provinceNumId == 842) {
                wx.redirectTo({
                    url: "../shanghaiRecommend/shanghaiRecommend"
                });
                return;
            } else if (userScore.provinceNumId == 843) {
                wx.redirectTo({
                    url: "../collegeRecommend/collegeRecommend"
                });
                return;
            } else {}
        }
        if (app.globalData.bufferJsYXYX.length > 0) {
            that.setData({
                bufferYXYX: bufferJsYXYX
            });
        }
        if (app.globalData.bufferJsZYYX.length > 0) {
            that.setData({
                bufferZYYX: bufferJsZYYX
            });
        }
        try {
            var userScore = wx.getStorageSync("userScore");
            var userInfo = wx.getStorageSync("userInfo");
            var scoreLine = wx.getStorageSync("gaokaoScore");
            that.setData({
                userInfo: userInfo
            });
            if (scoreLine && userScore) {
                var gerBatch = function gerBatch() {
                    userScore = wx.getStorageSync("userScore");
                    var batch = userScore.batch;
                    if (batch == undefined) {
                        setTimeout(function() {
                            gerBatch();
                        }, 200);
                    } else {
                        var batchArr = [];
                        var batchArrId = [];
                        var groupName = "";
                        if (userScore.courseType == 0) {
                            scoreLine = scoreLine[0];
                        } else {
                            scoreLine = scoreLine[1];
                        }
                        for (var i = 0; i < scoreLine.length; i++) {
                            batchArr.push(scoreLine[i].batchName);
                            batchArrId.push(scoreLine[i].batch);
                            if (scoreLine[i].batch == userScore.batch) {
                                that.setData({
                                    batchListIndex: i,
                                    batch: scoreLine[i].batch,
                                    batchName: scoreLine[i].batchName
                                });
                                if (scoreLine[i].groups != null) {
                                    groupName = scoreLine[i].groups[0].name;
                                    that.setData({
                                        GroupName: scoreLine[i].groups[0].name
                                    });
                                }
                                break;
                            }
                        }
                        that.loadData(batch, "", "", "", 1, 1, "", groupName, "", "", 0);
                        that.setData({
                            batchListName: batchArr,
                            batchId: batchArrId
                        });
                        // that.loadData(batch, '', '', '', 1, 1, '', '', '', '', 0);
                        // var batchArr = [];
                        // var batchArrId = [];
                        // if (userScore.courseType == 0) {
                        //   scoreLine = scoreLine[0]
                        // } else {
                        //   scoreLine = scoreLine[1]
                        // }
                        // for (var i = 0; i < scoreLine.length; i++) {
                        //   batchArr.push(scoreLine[i].batchName);
                        //   batchArrId.push(scoreLine[i].batch);
                        //   if (scoreLine[i].batch == userScore.batch) {
                        //     that.setData({
                        //       batchListIndex: i,
                        //       batch: scoreLine[i].batch,
                        //       batchName: scoreLine[i].batchName
                        //     });
                        //     break;
                        //   }
                        // }
                        // that.setData({
                        //   batchListName: batchArr,
                        //   batchId: batchArrId
                        // });
                        // ----------------------------------------
                        // ----------------------------
                                        }
                };
                that.setData({
                    userScore: userScore
                });
                gerBatch();
            }
        } catch (e) {}
        // 加载筛选城市
                var cityId = wx.getStorageSync("cityId").cityId;
        var cityList = that.data.cityList;
        for (var i = 0; i < cityList.length; i++) {
            if (cityList[i].numId == cityId) {
                cityList.splice(1, 0, cityList.splice(i, 1)[0]);
                break;
            }
        }
        that.setData({
            cityList: cityList,
            cityId: cityId
        });
    },
    onShow: function onShow() {
        var that = this;
        that.setData({
            zxyxShow: true
        });
        // try {
                var zyyx = wx.getStorageSync("zyyx");
        var JSZixuanList = wx.getStorageSync("JSZixuanList");
        var collegeRecommendBatch = wx.getStorageSync("collegeRecommendBatch");
        var scoreLine = wx.getStorageSync("gaokaoScore");
        var userInfo = wx.getStorageSync("userInfo");
        var userScore = wx.getStorageSync("userScore");
        var collegeRecommendBatchGroup = wx.getStorageSync("collegeRecommendBatchGroup");
        if (JSZixuanList) {
            if (userInfo[0].UserType <= 1 && JSZixuanList.length > 3) {
                var newZixuanList = [];
                for (var _i5 = 0; _i5 < 3; _i5++) {
                    newZixuanList.push(JSZixuanList.reverse()[_i5]);
                }
                that.setData({
                    zixuanYXList: newZixuanList,
                    zxyxShow: false
                });
                that.changeMain(that.data.zixuanYXList);
                that.setData({
                    zixuanYXList: that.data.zixuanYXList
                });
            } else {
                that.setData({
                    zixuanYXList: JSZixuanList.reverse(),
                    zxyxShow: false
                });
                that.changeMain(that.data.zixuanYXList);
                that.setData({
                    zixuanYXList: that.data.zixuanYXList
                });
            }
        } else {
            that.setData({
                zxyxShow: false
            });
        }
        if (zyyx) {
            if (that.data.searchMajorName == zyyx) {} else {
                that.setData({
                    searchMajorName: zyyx,
                    zyyxShow: true,
                    majorPn: 1,
                    majorYXList: [],
                    bufferZYYX: [ {}, {}, {}, {} ]
                });
                var CdiProvince = that.data.CdiProvince == "-1" ? "" : that.data.CdiProvince;
                var CdiClassify = that.data.CdiClassify == "不限" ? "" : that.data.CdiClassify;
                var RecommendType = that.data.RecommendType;
                that.loadMajorData(that.data.batch, CdiProvince, "", CdiClassify, 1, 2, zyyx, collegeRecommendBatchGroup, "", "", RecommendType);
            }
        }
        if ((collegeRecommendBatch || collegeRecommendBatchGroup) && collegeRecommendBatch != -1) {
            if (collegeRecommendBatch == that.data.batch && collegeRecommendBatchGroup == that.data.GroupName) {} else {
                that.setData({
                    CSBContent: "选择风险",
                    CSBBgColor: "FDACAA",
                    bufferYXYX: [ {}, {}, {}, {} ],
                    bufferZYYX: [ {}, {}, {}, {} ]
                });
                that.chongzhi();
                if (userScore.courseType == 0) {
                    scoreLine = scoreLine[0];
                } else {
                    scoreLine = scoreLine[1];
                }
                for (var i = 0; i < scoreLine.length; i++) {
                    if (scoreLine[i].batch == collegeRecommendBatch) {
                        var batchName = scoreLine[i].batchName;
                        break;
                    }
                }
                that.setData({
                    majorPn: 1,
                    CdiProvinceNum: 0,
                    CdiClassifyNum: 0,
                    batch: collegeRecommendBatch,
                    GroupName: collegeRecommendBatchGroup,
                    batchName: batchName,
                    collegeYXList: [],
                    majorYXList: [],
                    yxyxShow: true,
                    tianbaoList: that.data.tianbaoList,
                    collegeNum: 0
                });
                var CdiProvince = that.data.CdiProvince == "-1" ? "" : that.data.CdiProvince;
                var CdiClassify = that.data.CdiClassify == "不限" ? "" : that.data.CdiClassify;
                if (that.data.searchMajorName != "输入专业名称") {
                    that.setData({
                        zyyxShow: true
                    });
                    that.loadMajorData(that.data.batch, CdiProvince, "", CdiClassify, 1, 2, zyyx, collegeRecommendBatchGroup, "", "", 0);
                }
                that.loadData(that.data.batch, CdiProvince, "", CdiClassify, 1, 1, "", collegeRecommendBatchGroup, "", "", 0);
            }
        }
        // } catch (e) { };
                var oldUserScore = that.data.userScore;
        // try {
                var newUserScore = wx.getStorageSync("userScore");
        if (newUserScore) {
            if (newUserScore.total != oldUserScore.total || newUserScore.rank != oldUserScore.rank || newUserScore.chooseLevelOrSubjects != oldUserScore.chooseLevelOrSubjects || newUserScore.courseType != oldUserScore.courseType) {
                that.setData({
                    CSBContent: "选择风险",
                    CSBBgColor: "FDACAA",
                    bufferYXYX: [ {}, {}, {}, {} ],
                    bufferZYYX: [ {}, {}, {}, {} ]
                });
                var CdiProvince = that.data.CdiProvince == "-1" ? "" : that.data.CdiProvince;
                var CdiClassify = that.data.CdiClassify == "不限" ? "" : that.data.CdiClassify;
                for (var i = 0; i < that.data.batchId.length; i++) {
                    if (newUserScore.batch == that.data.batchId[i]) {
                        that.setData({
                            batchName: that.data.batchListName[i],
                            batch: newUserScore.batch
                        });
                        wx.setStorage({
                            key: "collegeRecommendBatch",
                            data: newUserScore.batch
                        });
                        break;
                    }
                }
                that.setData({
                    yxyxShow: true,
                    collegeYXList: [],
                    collegePn: 1,
                    userScore: newUserScore,
                    collegeNum: 0
                });
                that.loadData(newUserScore.batch, CdiProvince, "", CdiClassify, 1, 1, "", "", "", "", 0);
                if (that.data.searchMajorName != "输入专业名称") {
                    that.setData({
                        zyyxShow: true,
                        majorYXList: [],
                        majorPn: 1,
                        searchMajorName: zyyx
                    });
                    that.loadMajorData(that.data.batch, CdiProvince, "", CdiClassify, 1, 2, zyyx, collegeRecommendBatchGroup, "", "", 0);
                }
            }
        }
        // } catch (e) { }
        },
    onUnload: function onUnload() {
        var that = this;
        wx.setStorage({
            key: "collegeRecommendBatchGroup",
            data: ""
        });
        wx.setStorage({
            key: "collegeRecommendBatch",
            data: -1
        });
    },
    swichNav: function swichNav(e) {
        var that = this;
        var tmpsetdata = {
            currentTab: e.currentTarget.dataset.current
        };
        if (that.data.CSBFlag == "false") {
            that.data.CSBFlag = "true";
            tmpsetdata.CSBChong = "chongHide";
            tmpsetdata.CSBShou = "shouHide";
            tmpsetdata.CSBBao = "baoHide";
            tmpsetdata.CSBMoren = "morenHide";
        }
        this.setData(tmpsetdata);
        if (e.detail.current == 0) {
            that.changeMain(that.data.collegeYXList);
            that.setData({
                collegeYXList: that.data.collegeYXList
            });
        } else if (e.detail.current == 1) {
            that.changeMain(that.data.majorYXList);
            that.setData({
                majorYXList: that.data.majorYXList
            });
        } else if (e.detail.current == 2) {
            that.changeMain(that.data.zixuanYXList);
            that.setData({
                zixuanYXList: that.data.zixuanYXList
            });
        }
    },
    changeMain: function changeMain(collegeYXList) {
        var that = this;
        var collegePn = that.data.collegePn;
        var tianbaoList = that.data.tianbaoList;
        for (var i = 0; i < collegeYXList.length; i++) {
            collegeYXList[i].tianbao = false;
            for (var x = 0; x < collegeYXList[i].professions.length; x++) {
                collegeYXList[i].professions[x].st = false;
            }
        }
        for (var i = 0; i < tianbaoList.length; i++) {
            if (tianbaoList[i].colleges.length > 0) {
                for (var j = 0; j < collegeYXList.length; j++) {
                    if (tianbaoList[i].colleges[0].UCode == collegeYXList[j].UCode) {
                        // collegeYXList[j].tianbao = app.zimu(i);
                        collegeYXList[j].color = tianbaoList[i].color;
                        collegeYXList[j].bgColor = tianbaoList[i].color;
                        for (var m = 0; m < tianbaoList[i].colleges[0].Professions.length; m++) {
                            for (var n = 0; n < collegeYXList[j].Professions.length; n++) {
                                if (tianbaoList[i].colleges[0].Professions[m].Code == collegeYXList[j].Professions[n].Code) {
                                    collegeYXList[j].Professions[n].st = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    change: function change(e) {
        var that = this;
        var tmpsetdata = {
            currentTab: e.detail.current
        };
        if (that.data.CSBFlag == "false") {
            that.data.CSBFlag = "true";
            tmpsetdata.CSBChong = "chongHide";
            tmpsetdata.CSBShou = "shouHide";
            tmpsetdata.CSBBao = "baoHide";
            tmpsetdata.CSBMoren = "morenHide";
        }
        this.setData(tmpsetdata);
        if (e.detail.current == 0) {
            that.changeMain(that.data.collegeYXList);
            that.setData({
                collegeYXList: that.data.collegeYXList
            });
        } else if (e.detail.current == 1) {
            that.changeMain(that.data.majorYXList);
            that.setData({
                majorYXList: that.data.majorYXList
            });
        } else if (e.detail.current == 2) {
            that.changeMain(that.data.zixuanYXList);
            that.setData({
                zixuanYXList: that.data.zixuanYXList
            });
        }
    },
    bindpiciChange: function bindpiciChange(e) {
        var that = this;
        var val = e.detail.value;
        if (val == that.data.batchListIndex) {} else {
            that.setData({
                batchListIndex: val,
                batch: that.data.batchId[val],
                collegeYXList: [],
                showLoad: true
            });
            var userScore = that.data.userScore;
            var batch = that.data.batchId[val];
            var pros = that.data.CdiProvince;
            var collegeType = that.data.CdiClassify;
            that.loadData(batch, pros, "", collegeType, 1, 1, "", "", "", "", 0);
        }
    },
    // 院校详情
    collegeUp: function collegeUp(e) {
        var that = this;
        that.setData({
            collegeLoad: true
        });
        var ucode = e.currentTarget.dataset.ucode;
        var index = e.currentTarget.dataset.index;
        var type = e.currentTarget.dataset.type;
        var college = that.data.collegeYXList[index];
        if (type == "1") {
            college = that.data.collegeYXList[index];
        } else if (type == "2") {
            college = that.data.majorYXList[index];
        } else if (type == "3") {
            college = that.data.zixuanYXList[index];
        }
        var provinceNumId = that.data.userInfo[0].Province;
        _api2.default.queryCollegesFractions("ScoreLines/Fractions/Colleges/Query", "POST", provinceNumId, ucode).then(function(res) {
            var data = res.result;
            var course = that.data.userScore.courseType;
            var collegeDetail = {
                collegeName: college.alias,
                tag: college.tags,
                collegeInfo: [],
                numId: college.collegeId
            };
            for (var i = 0; i < data.length; i++) {
                if (course == data[i].course && that.data.batch == data[i].batch) {
                    collegeDetail.collegeInfo.push({
                        year: data[i].year,
                        maxScore: data[i].maxScore,
                        minScore: data[i].minScore,
                        avgScore: data[i].avgScore,
                        enterNum: data[i].enterNum,
                        lowSort: data[i].lowSort,
                        chooseLevel: data[i].chooseLevel
                    });
                }
            }
            that.setData({
                collegeDetail: collegeDetail,
                collegeLoad: false
            });
        });
        this.setData({
            collegeUp: "major-animate"
        });
    },
    collegeClose: function collegeClose() {
        this.setData({
            collegeUp: "major-animate-out"
        });
    },
    // 专业详情
    majorUp: function majorUp(e) {
        var that = this;
        that.setData({
            majorLoad: true,
            majorUp: "major-animate"
        });
        var extended = JSON.parse(e.currentTarget.dataset.extended);
        var majorDetail = {
            Code: e.currentTarget.dataset.code,
            CollegeName: e.currentTarget.dataset.collegename,
            Cost: e.currentTarget.dataset.cost,
            LearYear: e.currentTarget.dataset.learyear,
            MajorCode: e.currentTarget.dataset.majorcode,
            PlanNum: e.currentTarget.dataset.plannum,
            PlanYear: e.currentTarget.dataset.planyear,
            Probability: e.currentTarget.dataset.probability,
            ProfessionName: e.currentTarget.dataset.professionname,
            RecommendPFModel: extended
        };
        that.setData({
            majorDetail: majorDetail,
            majorLoad: false
        });
    },
    majorClose: function majorClose() {
        this.setData({
            majorUp: "major-animate-out"
        });
    },
    // 填报详情
    tianbaoUp: function tianbaoUp(wish, collegeindex, item) {
        var that = this;
        var wish = wish;
        var collegeindex = collegeindex;
        var tianbaoList = that.data.tianbaoList;
        var item = item;
        if (item == "0") {
            var collegeDetail = that.data.collegeYXList[collegeindex];
            for (var i = 0; i < tianbaoList.length; i++) {
                if (tianbaoList[i].ji == wish) {
                    tianbaoList[i].wish = true;
                } else {
                    tianbaoList[i].wish = false;
                }
            }
            that.setData({
                tianbaoList: tianbaoList,
                tianbaoUp: "major-animate",
                tianbaoCollegeDetail: collegeDetail,
                collegeindex: collegeindex
            });
        } else if (item == "1") {
            var collegeDetail = that.data.majorYXList[collegeindex];
            for (var i = 0; i < tianbaoList.length; i++) {
                if (tianbaoList[i].ji == wish) {
                    tianbaoList[i].wish = true;
                } else {
                    tianbaoList[i].wish = false;
                }
            }
            that.setData({
                tianbaoList: tianbaoList,
                tianbaoUp: "major-animate",
                tianbaoCollegeDetail: collegeDetail,
                collegeindex: collegeindex
            });
        } else if (item == "2") {
            var collegeDetail = that.data.zixuanYXList[collegeindex];
            for (var i = 0; i < tianbaoList.length; i++) {
                if (tianbaoList[i].ji == wish) {
                    tianbaoList[i].wish = true;
                } else {
                    tianbaoList[i].wish = false;
                }
            }
            that.setData({
                tianbaoList: tianbaoList,
                tianbaoUp: "major-animate",
                tianbaoCollegeDetail: collegeDetail,
                collegeindex: collegeindex
            });
        }
    },
    tianbaoClose: function tianbaoClose() {
        var that = this;
        if (that.data.currentTab == 0) {
            that.changeMain(that.data.collegeYXList);
            that.setData({
                collegeYXList: that.data.collegeYXList
            });
        } else if (that.data.currentTab == 1) {
            that.changeMain(that.data.majorYXList);
            that.setData({
                majorYXList: that.data.majorYXList
            });
        } else if (that.data.currentTab == 2) {
            that.changeMain(that.data.zixuanYXList);
            that.setData({
                zixuanYXList: that.data.zixuanYXList
            });
        }
        this.setData({
            tianbaoUp: "major-animate-out"
        });
    },
    // 筛选
    shaixuan: function shaixuan() {
        var that = this;
        var CSBBgColor = that.data.CSBBgColor;
        for (var i = 0; i < that.data.CSBList.length; i++) {
            if (that.data.CSBList[i].CSBBgColor == CSBBgColor) {
                that.data.CSBList[i].st = true;
            } else {
                that.data.CSBList[i].st = false;
            }
        }
        that.data.morenCityList = JSON.parse(JSON.stringify(that.data.cityList));
        that.data.morenBatchList = JSON.parse(JSON.stringify(that.data.batchList));
        that.data.morenhotType = JSON.parse(JSON.stringify(that.data.hotType));
        that.data.morenbOrZ = JSON.parse(JSON.stringify(that.data.bOrZ));
        that.data.morenxingzhi = JSON.parse(JSON.stringify(that.data.xingzhi));
        var tmpsetdata = {
            shaixuan: "shaixuan-animate",
            CSBList: that.data.CSBList,
            flag: true
        };
        if (that.data.CSBFlag == "false") {
            that.data.CSBFlag = "true";
            tmpsetdata.CSBChong = "chongHide";
            tmpsetdata.CSBShou = "shouHide";
            tmpsetdata.CSBBao = "baoHide";
            tmpsetdata.CSBMoren = "morenHide";
        }
        that.setData(tmpsetdata);
    },
    shaixuanClose: function shaixuanClose() {
        var _this = this;
        this.setData({
            shaixuan: "shaixuan-animate-out",
            cityList: this.data.morenCityList,
            batchList: this.data.morenBatchList,
            hotType: this.data.morenhotType,
            xingzhi: this.data.morenxingzhi,
            bOrZ: this.data.morenbOrZ
        });
        setTimeout(function() {
            _this.setData({
                flag: false
            });
        }, 200);
    },
    compareArray: function compareArray(arr1, arr2) {
        //比较俩数组是否相同
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i].st != arr2[i].st) {
                return false;
            }
        }
        return true;
    },
    queren: function queren() {
        //确认
        var that = this;
        if (that.data.userInfo[0].UserType > 1) {
            var cityList = that.data.cityList;
            var batchList = that.data.batchList;
            var hotType = that.data.hotType;
            var bOrZ = that.data.bOrZ;
            var xingzhi = that.data.xingzhi;
            var morenCityList = that.data.morenCityList;
            var morenBatchList = that.data.morenBatchList;
            var morenhotType = that.data.morenhotType;
            var morenbOrZ = that.data.morenbOrZ;
            var morenxingzhi = that.data.morenxingzhi;
            if (that.compareArray(cityList, morenCityList) && that.compareArray(batchList, morenBatchList) && that.compareArray(hotType, morenhotType) && that.compareArray(bOrZ, morenbOrZ) && that.compareArray(xingzhi, morenxingzhi)) {
                var CSBList = that.data.CSBList;
                var RecommendType = that.data.RecommendType;
                for (var i = 0; i < CSBList.length; i++) {
                    if (CSBList[i].id == RecommendType) {
                        if (CSBList[i].st == true) {
                            that.setData({
                                shaixuan: "shaixuan-animate-out"
                            });
                            setTimeout(function() {
                                that.setData({
                                    flag: false
                                });
                            }, 200);
                        } else {
                            that.setData({
                                shaixuan: "shaixuan-animate-out"
                            });
                            setTimeout(function() {
                                that.setData({
                                    flag: false
                                });
                            }, 200);
                            var batchListArr = [];
                            var cityArr = [];
                            for (var i = 0; i < that.data.batchList.length; i++) {
                                if (that.data.batchList[i].st == true) {
                                    batchListArr.push(that.data.batchList[i].name);
                                }
                            }
                            var CdiClassify = batchListArr.join("_");
                            for (var i = 0; i < that.data.cityList.length; i++) {
                                if (that.data.cityList[i].st == true) {
                                    cityArr.push(that.data.cityList[i].numId);
                                }
                            }
                            var CdiProvince = cityArr.join("_");
                            that.setData({
                                CdiProvince: CdiProvince,
                                CdiClassify: CdiClassify
                            });
                            if (CdiProvince == "-1") {
                                CdiProvince = "", that.setData({
                                    CdiProvinceNum: 0
                                });
                            } else {
                                that.setData({
                                    CdiProvinceNum: cityArr.length
                                });
                            }
                            if (CdiClassify == "不限") {
                                CdiClassify = "", that.setData({
                                    CdiClassifyNum: 0
                                });
                            } else {
                                that.setData({
                                    CdiClassifyNum: batchListArr.length
                                });
                            }
                            that.setData({
                                collegePn: 1,
                                majorPn: 1,
                                collegeYXList: [],
                                majorYXList: []
                            });
                            var batch = that.data.batch;
                            var pros = that.data.CdiProvince == "-1" ? "" : that.data.CdiProvince;
                            var collegeType = that.data.CdiClassify == "不限" ? "" : that.data.CdiClassify;
                            var majors = "";
                            var RecommendType = 0;
                            for (var i = 0; i < that.data.CSBList.length; i++) {
                                if (that.data.CSBList[i].st == true) {
                                    RecommendType = that.data.CSBList[i].id;
                                    var CSBContent = that.data.CSBList[i].name == "默认" ? "选择风险" : that.data.CSBList[i].name;
                                    that.setData({
                                        CSBContent: CSBContent,
                                        CSBBgColor: that.data.CSBList[i].CSBBgColor,
                                        RecommendType: RecommendType
                                    });
                                }
                            }
                            that.data.morenCityList = JSON.parse(JSON.stringify(that.data.cityList));
                            that.data.morenBatchList = JSON.parse(JSON.stringify(that.data.batchList));
                            that.data.morenhotType = JSON.parse(JSON.stringify(that.data.hotType));
                            that.data.morenbOrZ = JSON.parse(JSON.stringify(that.data.bOrZ));
                            that.data.morenxingzhi = JSON.parse(JSON.stringify(that.data.xingzhi));
                            that.setData({
                                yxyxShow: true
                            });
                            that.loadData(batch, pros, majors, collegeType, 1, 1, "", that.data.GroupName, "", "", RecommendType);
                            if (that.data.searchMajorName != "输入专业名称") {
                                that.setData({
                                    zyyxShow: true
                                });
                                that.loadMajorData(batch, pros, majors, collegeType, 1, 2, that.data.searchMajorName, that.data.GroupName, "", "", RecommendType);
                            }
                        }
                    }
                }
            } else {
                that.setData({
                    shaixuan: "shaixuan-animate-out",
                    bufferYXYX: [ {}, {}, {}, {} ],
                    bufferZYYX: [ {}, {}, {}, {} ]
                });
                setTimeout(function() {
                    that.setData({
                        flag: false
                    });
                }, 200);
                var batchListArr = [];
                var cityArr = [];
                for (var i = 0; i < that.data.batchList.length; i++) {
                    if (that.data.batchList[i].st == true) {
                        batchListArr.push(that.data.batchList[i].name);
                    }
                }
                var CdiClassify = batchListArr.join("_");
                for (var i = 0; i < that.data.cityList.length; i++) {
                    if (that.data.cityList[i].st == true) {
                        cityArr.push(that.data.cityList[i].numId);
                    }
                }
                var CdiProvince = cityArr.join("_");
                that.setData({
                    CdiProvince: CdiProvince,
                    CdiClassify: CdiClassify
                });
                if (CdiProvince == "-1") {
                    CdiProvince = "", that.setData({
                        CdiProvinceNum: 0
                    });
                } else {
                    that.setData({
                        CdiProvinceNum: cityArr.length
                    });
                }
                if (CdiClassify == "不限") {
                    CdiClassify = "", that.setData({
                        CdiClassifyNum: 0
                    });
                } else {
                    that.setData({
                        CdiClassifyNum: batchListArr.length
                    });
                }
                that.setData({
                    collegePn: 1,
                    majorPn: 1,
                    collegeYXList: [],
                    majorYXList: []
                });
                var batch = that.data.batch;
                var pros = that.data.CdiProvince == "-1" ? "" : that.data.CdiProvince;
                var collegeType = that.data.CdiClassify == "不限" ? "" : that.data.CdiClassify;
                var majors = "";
                var RecommendType = 0;
                for (var i = 0; i < that.data.CSBList.length; i++) {
                    if (that.data.CSBList[i].st == true) {
                        RecommendType = that.data.CSBList[i].id;
                        var CSBContent = that.data.CSBList[i].name == "默认" ? "选择风险" : that.data.CSBList[i].name;
                        that.setData({
                            CSBContent: CSBContent,
                            CSBBgColor: that.data.CSBList[i].CSBBgColor,
                            RecommendType: RecommendType
                        });
                    }
                }
                that.data.morenCityList = JSON.parse(JSON.stringify(that.data.cityList));
                that.data.morenBatchList = JSON.parse(JSON.stringify(that.data.batchList));
                that.setData({
                    yxyxShow: true
                });
                that.loadData(batch, pros, majors, collegeType, 1, 1, "", that.data.GroupName, "", "", RecommendType);
                if (that.data.searchMajorName != "输入专业名称") {
                    that.setData({
                        zyyxShow: true
                    });
                    that.loadMajorData(batch, pros, majors, collegeType, 1, 2, that.data.searchMajorName, that.data.GroupName, "", "", RecommendType);
                }
            }
        } else {
            that.chongzhi();
            wx.showToast({
                title: "开通VIP即可体验",
                icon: "none",
                duration: 2e3
            });
            that.setData({
                shaixuan: "shaixuan-animate-out"
            });
            setTimeout(function() {
                that.setData({
                    flag: false
                });
            }, 200);
        }
        setTimeout(function() {
            that.setData({
                flag: false
            });
        }, 200);
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
        that.data.hotType[0].st = true;
        for (var i = 1; i < that.data.hotType.length; i++) {
            that.data.hotType[i].st = false;
        }
        that.data.bOrZ[0].st = true;
        for (var i = 1; i < that.data.bOrZ.length; i++) {
            that.data.bOrZ[i].st = false;
        }
        that.data.xingzhi[0].st = true;
        for (var i = 1; i < that.data.xingzhi.length; i++) {
            that.data.xingzhi[i].st = false;
        }
        that.setData({
            cityList: that.data.cityList,
            batchList: that.data.batchList,
            hotType: that.data.hotType,
            bOrZ: that.data.bOrZ,
            xingzhi: that.data.xingzhi,
            CdiProvince: "-1",
            CdiClassify: "不限"
        });
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
            var flagCount = 0;
            for (var _i6 = 1; _i6 < cityList.length; _i6++) {
                var flag = !cityList[_i6].st;
                if (cityId == cityList[_i6].numId) {
                    cityList[_i6].st = flag;
                }
                if (cityList[_i6].st == true) {
                    flagCount++;
                }
                if (flagCount == 0 && _i6 == cityList.length - 1) {
                    cityList[0].st = true;
                }
            }
            that.setData({
                showBtn: true
            });
        }
        that.setData({
            cityList: that.data.cityList
        });
    },
    // 层次
    bOrZ: function bOrZ(e) {
        var that = this;
        var bOrZ = that.data.bOrZ;
        var index = e.currentTarget.dataset.index;
        for (var i = 0; i < bOrZ.length; i++) {
            bOrZ[i].st = false;
        }
        bOrZ[index].st = true;
        that.setData({
            showBtn: true
        });
        that.setData({
            bOrZ: that.data.bOrZ
        });
    },
    // 性质
    xingzhi: function xingzhi(e) {
        var that = this;
        var xingzhi = that.data.xingzhi;
        var index = e.currentTarget.dataset.index;
        for (var i = 0; i < xingzhi.length; i++) {
            xingzhi[i].st = false;
        }
        xingzhi[index].st = true;
        that.setData({
            showBtn: true
        });
        that.setData({
            xingzhi: that.data.xingzhi
        });
    },
    // 热门标签
    hotType: function hotType(e) {
        var that = this;
        var hotType = that.data.hotType;
        var value = e.currentTarget.dataset.value;
        if (value == "") {
            hotType[0].st = true;
            for (var i = 1; i < hotType.length; i++) {
                hotType[i].st = false;
            }
            that.setData({
                showBtn: true
            });
        } else {
            hotType[0].st = false;
            var flagCount = 0;
            for (var _i7 = 1; _i7 < hotType.length; _i7++) {
                var flag = !hotType[_i7].st;
                if (value == hotType[_i7].name) {
                    hotType[_i7].st = flag;
                }
                if (hotType[_i7].st == true) {
                    flagCount++;
                }
                if (flagCount == 0 && _i7 == hotType.length - 1) {
                    hotType[0].st = true;
                }
            }
            that.setData({
                showBtn: true
            });
        }
        that.setData({
            hotType: that.data.hotType
        });
    },
    // 类型
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
            var flagCount = 0;
            for (var i = 1; i < batchList.length; i++) {
                var flag = !batchList[i].st;
                if (batchName == batchList[i].name) {
                    batchList[i].st = flag;
                }
                if (batchList[i].st == true) {
                    flagCount++;
                }
                if (flagCount == 0 && i == batchList.length - 1) {
                    batchList[0].st = true;
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
    scrollCollegeToLower: function scrollCollegeToLower() {
        var that = this;
        if (that.data.showCollegeMore == true) return;
        wx.showNavigationBarLoading();
        that.setData({
            showCollegeMore: true,
            collegeShowMore: true
        });
        try {
            var userScore = wx.getStorageSync("userScore");
            if (userScore) {
                that.setData({
                    collegePn: that.data.collegePn + 1
                });
                var CdiProvince = that.data.CdiProvince == "-1" ? "" : that.data.CdiProvince;
                var CdiClassify = that.data.CdiClassify = "不限" ? "" : that.data.CdiClassify;
                that.loadData(that.data.batch, CdiProvince, "", CdiClassify, that.data.collegePn, 1, "", that.data.GroupName, "", "", that.data.RecommendType);
            }
        } catch (e) {}
    },
    scrollMajorToLower: function scrollMajorToLower() {
        var that = this;
        if (that.data.showMajorMore == true) return;
        wx.showNavigationBarLoading();
        that.setData({
            showMajorMore: true,
            majorShowMore: true
        });
        try {
            var userScore = wx.getStorageSync("userScore");
            if (userScore) {
                that.setData({
                    majorPn: that.data.majorPn + 1
                });
                var CdiProvince = that.data.CdiProvince == "-1" ? "" : that.data.CdiProvince;
                var CdiClassify = that.data.CdiClassify = "不限" ? "" : that.data.CdiClassify;
                that.loadMajorData(that.data.batch, CdiProvince, "", CdiClassify, that.data.majorPn, 2, that.data.searchMajorName, "", "", "", that.data.RecommendType);
            }
        } catch (e) {}
    },
    goSearch: function goSearch(e) {
        wx.navigateTo({
            url: "/pages/globalSearch/globalSearch?mode=firstMajor"
        });
    },
    chooseTianbao: function chooseTianbao(e) {
        var that = this;
        var collegeDetail = that.data.tianbaoCollegeDetail;
        var tianbaoList = that.data.tianbaoList;
        var index = e.currentTarget.dataset.index;
        if (that.data.currentTab == 0) {
            var collegeYXList = that.data.collegeYXList;
        } else if (that.data.currentTab == 1) {
            var collegeYXList = that.data.majorYXList;
        } else if (that.data.currentTab == 2) {
            var collegeYXList = that.data.zixuanYXList;
        }
        if (tianbaoList[index].colleges.length > 0) {
            if (tianbaoList[index].colleges[0].UCode == collegeDetail.UCode) {
                that.setData({
                    tianbaoUp: "major-animate-out"
                });
                wx.showToast({
                    title: "已填入志愿表",
                    icon: "none",
                    duration: 2e3
                });
            } else {
                wx.showModal({
                    title: "",
                    content: collegeDetail.Alias + "\n将替换：\n" + tianbaoList[index].colleges[0].Alias,
                    confirmColor: "#e9302d",
                    success: function success(res) {
                        if (res.confirm) {
                            for (var m = 0; m < collegeYXList.length; m++) {
                                if (collegeYXList[m].UCode == collegeDetail.UCode) {
                                    for (var n = 0; n < collegeYXList[m].Professions.length; n++) {
                                        if (that.data.professionsDetail.Code == collegeYXList[m].Professions[n].Code) {
                                            collegeYXList[m].Professions[n].st = true;
                                        } else {
                                            collegeYXList[m].Professions[n].st = "";
                                        }
                                    }
                                    break;
                                }
                            }
                            for (var i = 0; i < collegeYXList.length; i++) {
                                if (collegeYXList[i].UCode == tianbaoList[index].colleges[0].UCode) {
                                    collegeYXList[i].tianbao = false;
                                    for (var n = 0; n < collegeYXList[i].Professions.length; n++) {
                                        if (that.data.professionsDetail.Code == collegeYXList[i].Professions[n].Code) {
                                            collegeYXList[i].Professions[n].st = true;
                                        } else {
                                            collegeYXList[i].Professions[n].st = "";
                                        }
                                    }
                                    break;
                                }
                            }
                            tianbaoList[index].colleges = [];
                            if (that.data.currentTab == 0) {
                                that.setData({
                                    collegeYXList: collegeYXList
                                });
                            } else if (that.data.currentTab == 1) {
                                that.setData({
                                    majorYXList: collegeYXList
                                });
                            } else if (that.data.currentTab == 2) {
                                that.setData({
                                    zixuanYXList: collegeYXList
                                });
                            }
                            that.tianbaoMain(collegeDetail, tianbaoList, index, collegeYXList);
                        } else if (res.cancel) {}
                    }
                });
            }
        } else {
            for (var m = 0; m < collegeYXList.length; m++) {
                if (collegeYXList[m].UCode == collegeDetail.UCode) {
                    for (var n = 0; n < collegeYXList[m].Professions.length; n++) {
                        if (that.data.professionsDetail.Code == collegeYXList[m].Professions[n].Code) {
                            collegeYXList[m].Professions[n].st = true;
                        } else {
                            collegeYXList[m].Professions[n].st = "";
                        }
                    }
                    break;
                }
            }
            if (that.data.currentTab == 0) {
                that.setData({
                    collegeYXList: collegeYXList
                });
            } else if (that.data.currentTab == 1) {
                that.setData({
                    majorYXList: collegeYXList
                });
            } else if (that.data.currentTab == 2) {
                that.setData({
                    zixuanYXList: collegeYXList
                });
            }
            that.tianbaoMain(collegeDetail, tianbaoList, index, collegeYXList);
        }
    },
    tianbaoMain: function tianbaoMain(collegeDetail, tianbaoList, index, collegeYXList) {
        var that = this;
        for (var i = 0; i < tianbaoList.length; i++) {
            if (tianbaoList[i].colleges.length > 0) {
                if (collegeDetail.UCode == tianbaoList[i].colleges[0].UCode) {
                    tianbaoList[i].colleges = [];
                }
            }
        }
        collegeDetail.Professions = [];
        collegeDetail.Professions.push(that.data.professionsDetail);
        tianbaoList[index].colleges.push(collegeDetail);
        that.setData({
            tianbaoList: tianbaoList
        });
        var tianbao = "";
        // tianbao = app.zimu(index);
                collegeYXList[that.data.collegeindex].tianbao = tianbao;
        collegeYXList[that.data.collegeindex].bgColor = tianbaoList[index].color;
        if (that.data.currentTab == 0) {
            that.setData({
                collegeYXList: collegeYXList,
                tianbaoUp: "major-animate-out"
            });
        } else if (that.data.currentTab == 1) {
            that.setData({
                majorYXList: collegeYXList,
                tianbaoUp: "major-animate-out"
            });
        } else if (that.data.currentTab == 2) {
            that.setData({
                zixuanYXList: collegeYXList,
                tianbaoUp: "major-animate-out"
            });
        }
        wx.showToast({
            title: "已填入志愿表",
            icon: "none",
            duration: 2e3
        });
        var collegeNum = 0;
        for (var i = 0; i < tianbaoList.length; i++) {
            if (tianbaoList[i].colleges.length > 0) {
                collegeNum += 1;
            }
        }
        that.setData({
            collegeNum: collegeNum
        });
    },
    checked: function checked(e) {
        var that = this;
        if (that.data.userInfo[0].UserType <= 1) {
            wx.showToast({
                title: "开通VIP即可体验",
                icon: "none",
                duration: 2e3
            });
        } else {
            if (that.data.currentTab == 0) {
                var collegeYXList = that.data.collegeYXList;
            } else if (that.data.currentTab == 1) {
                var collegeYXList = that.data.majorYXList;
            } else if (that.data.currentTab == 2) {
                var collegeYXList = that.data.zixuanYXList;
            }
            var tianbaoList = that.data.tianbaoList;
            var collegeindex = e.currentTarget.dataset.collegeindex;
            var majorindex = e.currentTarget.dataset.majorindex;
            var UCode = e.currentTarget.dataset.collegeucode;
            var wish = e.currentTarget.dataset.wish;
            var item = e.currentTarget.dataset.item;
            for (var i = 0; i < tianbaoList.length; i++) {
                if (tianbaoList[i].colleges.length > 0) {
                    if (UCode == tianbaoList[i].colleges[0].UCode) {
                        if (tianbaoList[i].colleges[0].Professions.length < that.data.ZyProfessionCount) {
                            collegeYXList[collegeindex].Professions[majorindex].st = true;
                            tianbaoList[i].colleges[0].Professions.push(collegeYXList[collegeindex].Professions[majorindex]);
                        } else {
                            wx.showToast({
                                title: "每所院校最多选择" + that.data.ZyProfessionCount + "个专业",
                                icon: "none",
                                duration: 2e3
                            });
                        }
                        break;
                    } else {
                        if (i == tianbaoList.length - 1) {
                            collegeYXList[collegeindex].Professions[majorindex].st = true;
                            that.setData({
                                professionsDetail: collegeYXList[collegeindex].Professions[majorindex]
                            });
                            that.tianbaoUp(wish, collegeindex, item);
                        }
                    }
                } else {
                    if (i == tianbaoList.length - 1) {
                        collegeYXList[collegeindex].Professions[majorindex].st = true;
                        that.setData({
                            professionsDetail: collegeYXList[collegeindex].Professions[majorindex]
                        });
                        that.tianbaoUp(wish, collegeindex, item);
                    }
                }
            }
            that.setData({
                tianbaoList: tianbaoList
            });
            if (that.data.currentTab == 0) {
                that.setData({
                    collegeYXList: collegeYXList
                });
            } else if (that.data.currentTab == 1) {
                that.setData({
                    majorYXList: collegeYXList
                });
            } else if (that.data.currentTab == 2) {
                that.setData({
                    zixuanYXList: collegeYXList
                });
            }
        }
    },
    checkedNo: function checkedNo(e) {
        var that = this;
        if (that.data.currentTab == 0) {
            var collegeYXList = that.data.collegeYXList;
        } else if (that.data.currentTab == 1) {
            var collegeYXList = that.data.majorYXList;
        } else if (that.data.currentTab == 2) {
            var collegeYXList = that.data.zixuanYXList;
        }
        var tianbaoList = that.data.tianbaoList;
        var majorcode = e.currentTarget.dataset.majorcode;
        var collegeindex = e.currentTarget.dataset.collegeindex;
        var majorindex = e.currentTarget.dataset.majorindex;
        var UCode = e.currentTarget.dataset.collegeucode;
        collegeYXList[collegeindex].Professions[majorindex].st = "";
        for (var i = 0; i < tianbaoList.length; i++) {
            if (tianbaoList[i].colleges.length > 0) {
                if (tianbaoList[i].colleges[0].UCode == UCode) {
                    if (tianbaoList[i].colleges[0].Professions.length == 1) {
                        tianbaoList[i].colleges = [];
                        collegeYXList[collegeindex].tianbao = false;
                    } else {
                        for (var j = 0; j < tianbaoList[i].colleges[0].Professions.length; j++) {
                            if (tianbaoList[i].colleges[0].Professions[j].MajorCode == majorcode) {
                                tianbaoList[i].colleges[0].Professions.splice(j, 1);
                            }
                        }
                    }
                }
            }
        }
        that.setData({
            tianbaoList: tianbaoList
        });
        if (that.data.currentTab == 0) {
            that.setData({
                collegeYXList: collegeYXList
            });
        } else if (that.data.currentTab == 1) {
            that.setData({
                majorYXList: collegeYXList
            });
        } else if (that.data.currentTab == 2) {
            that.setData({
                zixuanYXList: collegeYXList
            });
        }
        var collegeNum = 0;
        for (var i = 0; i < tianbaoList.length; i++) {
            if (tianbaoList[i].colleges.length > 0) {
                collegeNum += 1;
            }
        }
        that.setData({
            collegeNum: collegeNum
        });
    },
    transitionUp: function transitionUp() {
        this.setData({
            transitionUp: "major-animate"
        });
    },
    transitionClose: function transitionClose() {
        this.setData({
            transitionUp: "major-animate-out"
        });
    },
    goMajorDetail: function goMajorDetail(e) {
        var mcode = this.data.majorDetail.MajorCode;
        this.setData({
            majorUp: "major-animate-out"
        });
        if (mcode.length == 4) {
            wx.navigateTo({
                url: "/packages/selectMajor/middleMajorDetail/middleMajorDetail?majorcode=" + mcode
            });
        } else {
            wx.navigateTo({
                url: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + mcode + "&cityid=" + this.data.cityId
            });
        }
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
    noPay: function noPay() {
        // app.payPrompt();
    },
    commonTuijian: function commonTuijian() {
        wx.navigateTo({
            url: "/packages/paySystem/memberCardDetail/memberCardDetail"
        });
    },
    goChangeBatch: function goChangeBatch() {
        var that = this;
        wx.navigateTo({
            url: "/packages/common/batchList/batchList"
        });
        if (that.data.CSBFlag == "false") {
            that.data.CSBFlag = "true";
            that.setData({
                CSBChong: "chongHide",
                CSBShou: "shouHide",
                CSBBao: "baoHide",
                CSBMoren: "morenHide"
            });
        }
    },
    changeScore: function changeScore() {
        var that = this;
        var userScore = that.data.userScore;
        var course = userScore.courseType == 0 ? "理科" : "文科";
        if (that.data.userScore.provinceNumId == 1) {
            var content = course + " " + userScore.total + "分 " + userScore.chooseLevelList[0].value + " " + userScore.chooseLevelList[1].value;
        } else {
            var content = course + " " + userScore.total + "分 ";
        }
        wx.showModal({
            title: "正在使用的成绩：",
            content: content,
            confirmText: "我知道了",
            confirmColor: "#E9302D",
            showCancel: false,
            success: function success(res) {}
        });
    },
    goZixuanSearch: function goZixuanSearch() {
        wx.navigateTo({
            url: "/pages/globalSearch/globalSearch?mode=autonomyCollege"
        });
        // wx.navigateTo({
        //   url: '/packages/common/searchZixuan/searchZixuan?type=JS'
        // });
        },
    chooseCSB: function chooseCSB() {
        var that = this;
        if (that.data.CSBFlag == "true") {
            that.data.CSBFlag = "false";
            that.setData({
                CSBChong: "chong",
                CSBShou: "shou",
                CSBBao: "bao",
                CSBMoren: "moren"
            });
        } else {
            that.data.CSBFlag = "true";
            that.setData({
                CSBChong: "chongHide",
                CSBShou: "shouHide",
                CSBBao: "baoHide",
                CSBMoren: "morenHide"
            });
        }
    },
    chooseCSBLoad: function chooseCSBLoad() {
        var that = this;
        var batch = this.data.batch;
        var pros = that.data.CdiProvince == "-1" ? "" : that.data.CdiProvince;
        var collegeType = that.data.CdiClassify == "不限" ? "" : that.data.CdiClassify;
        var majors = "";
        var RecommendType = that.data.RecommendType;
        var GroupName = that.data.GroupName;
        var currentTab = that.data.currentTab;
        this.setData({
            collegeYXList: [],
            yxyxShow: true,
            collegePn: 1,
            majorPn: 1
        });
        this.loadData(batch, pros, majors, collegeType, 1, 1, "", GroupName, "", "", RecommendType);
        if (that.data.searchMajorName != "输入专业名称") {
            this.setData({
                majorYXList: [],
                zyyxShow: true
            });
            this.loadMajorData(batch, pros, majors, collegeType, 1, 2, that.data.searchMajorName, GroupName, "", "", RecommendType);
        }
    },
    chooseCSBBtn: function chooseCSBBtn(e) {
        var that = this;
        var bgcolor = e.currentTarget.dataset.bgcolor;
        var id = parseInt(e.currentTarget.dataset.id);
        that.data.CSBFlag = "true";
        var tmpsetdata = {
            CSBChong: "chongHide",
            CSBShou: "shouHide",
            CSBBao: "baoHide",
            CSBMoren: "morenHide"
        };
        if (id != that.data.RecommendType) {
            if (id == 1) {
                tmpsetdata.CSBContent = "冲";
            } else if (id == 2) {
                tmpsetdata.CSBContent = "守";
            } else if (id == 3) {
                tmpsetdata.CSBContent = "保";
            } else if (id == 0) {
                tmpsetdata.CSBContent = "选择风险";
            }
            tmpsetdata.RecommendType = id;
            tmpsetdata.CSBBgColor = bgcolor;
            that.setData(tmpsetdata);
            that.chooseCSBLoad();
        } else {
            that.setData(tmpsetdata);
        }
    },
    majorOpen: function majorOpen(e) {
        var that = this;
        var item = e.currentTarget.dataset.item;
        var index = e.currentTarget.dataset.collegeindex;
        if (item == "0") {
            var collegeYXList = that.data.collegeYXList;
            collegeYXList[index].majorOpen = !that.data.collegeYXList[index].majorOpen;
            that.setData({
                collegeYXList: collegeYXList
            });
            if (collegeYXList[index].majorOpen == true) {
                that.setData({
                    majorOpen: "majorOpen"
                });
            } else {
                that.setData({
                    majorOpen: "majorClose"
                });
            }
        } else if (item == "1") {
            var majorYXList = that.data.majorYXList;
            majorYXList[index].majorOpen = !that.data.majorYXList[index].majorOpen;
            that.setData({
                majorYXList: majorYXList
            });
            if (majorYXList[index].majorOpen == true) {
                that.setData({
                    majorOpen: "majorOpen"
                });
            } else {
                that.setData({
                    majorOpen: "majorClose"
                });
            }
        } else if (item == "2") {
            var zixuanYXList = that.data.zixuanYXList;
            zixuanYXList[index].majorOpen = !that.data.zixuanYXList[index].majorOpen;
            that.setData({
                zixuanYXList: zixuanYXList
            });
            if (zixuanYXList[index].majorOpen == true) {
                that.setData({
                    majorOpen: "majorOpen"
                });
            } else {
                that.setData({
                    majorOpen: "majorClose"
                });
            }
        }
    },
    CSBTypeArr: function CSBTypeArr(e) {
        var bgcolor = e.currentTarget.dataset.bgcolor;
        var name = e.currentTarget.dataset.name;
        var index = e.currentTarget.dataset.index;
        var id = e.currentTarget.dataset.id;
        var that = this;
        var CSBList = that.data.CSBList;
        for (var i = 0; i < CSBList.length; i++) {
            CSBList[i].st = false;
        }
        CSBList[index].st = true;
        that.setData({
            CSBList: CSBList
        });
    },
    transitionCheckedNo: function transitionCheckedNo(e) {
        var that = this;
        if (that.data.currentTab == 0) {
            var collegeYXList = that.data.collegeYXList;
        } else if (that.data.currentTab == 1) {
            var collegeYXList = that.data.majorYXList;
        } else if (that.data.currentTab == 2) {
            var collegeYXList = that.data.zixuanYXList;
        }
        var tianbaoList = that.data.tianbaoList;
        var majorcode = e.currentTarget.dataset.majorcode;
        // var collegeindex = e.currentTarget.dataset.collegeindex;
        // var majorindex = e.currentTarget.dataset.majorindex;
                var UCode = e.currentTarget.dataset.collegeucode;
        // collegeYXList[collegeindex].Professions[majorindex].st = '';
                var collegeindex = 0;
        for (var _i8 = 0; _i8 < collegeYXList.length; _i8++) {
            if (collegeYXList[_i8].UCode == UCode) {
                for (var _j = 0; _j < collegeYXList[_i8].Professions.length; _j++) {
                    if (collegeYXList[_i8].Professions[_j].MajorCode == majorcode) {
                        collegeYXList[_i8].Professions[_j].st = "";
                        collegeindex = _i8;
                        break;
                    }
                }
            }
        }
        for (var i = 0; i < tianbaoList.length; i++) {
            if (tianbaoList[i].colleges.length > 0) {
                if (tianbaoList[i].colleges[0].UCode == UCode) {
                    if (tianbaoList[i].colleges[0].Professions.length == 1) {
                        tianbaoList[i].colleges = [];
                        collegeYXList[collegeindex].tianbao = false;
                    } else {
                        for (var j = 0; j < tianbaoList[i].colleges[0].Professions.length; j++) {
                            if (tianbaoList[i].colleges[0].Professions[j].MajorCode == majorcode) {
                                tianbaoList[i].colleges[0].Professions.splice(j, 1);
                            }
                        }
                    }
                }
            }
        }
        that.setData({
            tianbaoList: tianbaoList
        });
        if (that.data.currentTab == 0) {
            that.setData({
                collegeYXList: collegeYXList
            });
        } else if (that.data.currentTab == 1) {
            that.setData({
                majorYXList: collegeYXList
            });
        } else if (that.data.currentTab == 2) {
            that.setData({
                zixuanYXList: collegeYXList
            });
        }
        var collegeNum = 0;
        for (var i = 0; i < tianbaoList.length; i++) {
            if (tianbaoList[i].colleges.length > 0) {
                collegeNum += 1;
            }
        }
        that.setData({
            collegeNum: collegeNum
        });
    }
});