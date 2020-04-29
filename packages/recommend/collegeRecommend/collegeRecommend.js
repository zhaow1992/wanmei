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
        color: null,
        payBtnText: app.globalData.payBtnText,
        isIos: false,
        VIP: false,
        collegeCount: 0,
        shareFlag: false,
        shareChong: "",
        shareShou: "",
        shareBao: "",
        share: true,
        bufenLoad: false,
        //浙江省份
        provinceName: "省份",
        //志愿表
        zhiyuanNum: 0,
        //选择志愿表数
        zhiyuanbiao: [],
        updateOrCreate: false,
        //修改或保存
        tableid: null,
        // 位次
        down: false,
        // 滚动
        screenHeight: 0,
        screenWidth: 0,
        ballRightLeft: 0,
        //左位置
        ballRightRight: 0,
        //右位置
        rankLeft: 0,
        //左数值
        rankRight: 0,
        //右数值
        CSB: -1,
        rank: null,
        chooseLevel: "",
        zhejiangList: [],
        chooseLevelArr: [],
        CdiCSB: [ "不限", "冲", "守", "保" ],
        CdiCSBIndex: 0,
        bupipeiOpen: false,
        // 展开不匹配专业
        getCollegeId: null,
        zhejiangRanks: [],
        paixuFlag: true,
        paixu: [ "概率", "分数线", "排名" ],
        paixuIndex: 0,
        gaokaoScore: [],
        noListFlag: false,
        showLoad: true,
        showMore: false,
        loadMore: true,
        cityIdList: [],
        batchNameList: [],
        pn: 1,
        count: 20,
        recommendList: [],
        score: null,
        batch: null,
        batchIndex: null,
        course: null,
        cityId: null,
        downLogo: true,
        sort: 1,
        userScore: [],
        cityName: null,
        groupName: ""
    },
    commonTuijian: function commonTuijian() {
        wx.navigateTo({
            url: "/packages/paySystem/memberCardDetail/memberCardDetail"
        });
    },
    // 排序
    compare: function compare(prop) {
        return function(obj1, obj2) {
            var val1 = obj1[prop];
            var val2 = obj2[prop];
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
            }
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        };
    },
    loadZhejiangRecommend: function loadZhejiangRecommend(pro, rank, chooseLevel, pros, coltype, CSB, pn, rankFrom, rankTo) {
        //浙江智能推荐
        var that = this;
        if (pn == 1) {
            that.setData({});
        }
        that.setData({
            showMore: true,
            loadMore: true
        });
        var newChooseLevel = [];
        chooseLevel = chooseLevel.split(",");
        for (var i = 0; i < chooseLevel.length; i++) {
            newChooseLevel.push(chooseLevel[i]);
        }
        if (pros == "") {
            pros = [];
        } else {
            pros = pros.split(",");
        }
        if (coltype == "") {
            coltype = [];
        } else {
            coltype = coltype.split(",");
        }
        _api2.default.zhejiangRecommend("TZY/Recommendation/DoNewGaoKaoForZJApp", "POST", pro, rank, newChooseLevel, pros, coltype, rankFrom, rankTo, CSB, pn, that.data.userScore.total).then(function(res) {
            if (res.isSuccess) {
                wx.setNavigationBarTitle({
                    title: res.result.totalCount + "组专业"
                });
                if (res.result.items.length > 0) {
                    var zhejiangList = res.result.items;
                    that.setData({
                        noListFlag: false,
                        showLoad: false,
                        showMore: false,
                        pn: pn + 1
                    });
                    for (var i = 0; i < res.result.items.length; i++) {
                        var num = 0;
                        for (var j = 0; j < res.result.items[i].professions.length; j++) {
                            var Professions = zhejiangList[i].professions[j].batchName;
                            // zhejiangList[i].professions[j].batchName = Professions.replace("批", "");
                                                        if (res.result.items[i].professions[j].zyType == 0) {
                                num += 1;
                            }
                        }
                        zhejiangList[i].num = num;
                    }
                    if (that.data.updateOrCreate == true) {
                        var zhiyuanbiao = that.data.zhiyuanbiao;
                        for (var i = 0; i < zhiyuanbiao.length; i++) {
                            for (var j = 0; j < zhejiangList.length; j++) {
                                for (var k = 0; k < zhejiangList[j].professions.length; k++) {
                                    if (zhiyuanbiao[i].professionCode == zhejiangList[j].professions[k].professionCode && zhiyuanbiao[i].UCode == zhejiangList[j].professions[k].uCode) {
                                        zhejiangList[j].professions[k].zhiyuanChecked = true;
                                    }
                                }
                            }
                        }
                    }
                    that.setData({
                        zhejiangList: that.data.zhejiangList.concat(zhejiangList)
                    });
                } else {
                    that.setData({
                        loadMore: false
                    });
                    if (pn <= 1) {
                        that.setData({
                            showMore: true,
                            showLoad: false,
                            noListFlag: true
                        });
                    }
                }
                that.setData({
                    bufenLoad: false
                });
            } else {
                // that.selectComponent("#navigationcustom").setNavigationAll("智能填报", true);
                wx.setNavigationBarTitle({
                    title: "智能填报"
                });
                that.setData({
                    noListFlag: false,
                    showLoad: false,
                    showMore: false,
                    bufenLoad: false
                });
            }
        });
    },
    loadChange: function loadChange(sort, CSB, loadData) {
        var that = this;
        if (loadData == "down") {} else {
            that.setData({
                bufenLoad: true
            });
        }
        try {
            var userScore = wx.getStorageSync("userScore");
            var collegeRecommendBatch = wx.getStorageSync("collegeRecommendBatch");
            var recommendBatchList = wx.getStorageSync("recommendBatchList");
            var recommendCityList = wx.getStorageSync("recommendCityList");
            var collegeRecommendBatchGroup = wx.getStorageSync("collegeRecommendBatchGroup");
            if (userScore && recommendBatchList && recommendCityList) {
                if (collegeRecommendBatch) {
                    batch = collegeRecommendBatch;
                } else {
                    var batch = userScore.batch;
                }
                var pro = userScore.provinceNumId;
                var course = userScore.courseType;
                var score = userScore.total;
                var pros = recommendCityList.join("_");
                var coltype = recommendBatchList.join("_");
                var sort = sort;
                var jsteam = "";
                var pn = that.data.pn;
                var count = that.data.count;
                var chooseLevel = userScore.chooseLevelOrSubjects;
                var rank = userScore.rank;
                var zhejiangPros = recommendCityList.join(",");
                var zhejiangColtype = recommendBatchList.join(",");
                that.setData({
                    cityIdList: recommendCityList,
                    batchNameList: recommendBatchList
                });
                var rankFrom = that.data.rankLeft;
                var rankTo = that.data.rankRight;
                that.loadZhejiangRecommend(pro, rank, chooseLevel, zhejiangPros, zhejiangColtype, CSB, pn, rankFrom, rankTo);
            }
        } catch (e) {}
    },
    scrollToLower: function scrollToLower() {
        //下拉加载
        var that = this;
        if (that.data.showMore == true) return;
        that.loadChange(that.data.sort, that.data.CSB, "down");
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll("智能填报", true);
        that.setData({
            color: app.globalData.color
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
        try {
            var userScore = wx.getStorageSync("userScore");
            var userInfo = wx.getStorageSync("userInfo");
            if (userScore) {
                if (userInfo[0].UserType < 2) {
                    that.setData({
                        VIP: false
                    });
                } else {
                    that.setData({
                        VIP: true
                    });
                }
                if (userScore.provinceNumId == 842) {
                    wx.redirectTo({
                        url: "../shanghaiRecommend/shanghaiRecommend"
                    });
                    return;
                } else if (userScore.provinceNumId == 843) {} else {
                    wx.redirectTo({
                        url: "../jiangsuRecommend/jiangsuRecommend"
                    });
                    return;
                }
            }
        } catch (e) {}
        // 滚动
        // if (options.updateOrCreate == "true") {
        //   that.setData({
        //     updateOrCreate: true,
        //     tableid: options.tableid,
        //     zhiyuanbiao: app.globalData.zhiyuanbiao,
        //     zhiyuanNum: app.globalData.zhiyuanbiao.length
        //   })
        // }
                wx.getSystemInfo({
            success: function success(res) {
                that.setData({
                    screenHeight: res.windowHeight,
                    screenWidth: res.windowWidth
                });
            }
        });
        that.setData({
            pn: 1
        });
        try {
            wx.setStorageSync("collegeRecommendBatchGroup", "");
        } catch (e) {}
        try {
            var userScore = wx.getStorageSync("userScore");
            var recommendCityList = wx.getStorageSync("recommendCityList");
            var recommendBatchList = wx.getStorageSync("recommendBatchList");
            var cityId = wx.getStorageSync("cityId").cityId;
            var Course = wx.getStorageSync("course");
            var gaokaoScore = wx.getStorageSync("gaokaoScore");
            var collegeRecommendBatch = wx.getStorageSync("collegeRecommendBatch");
            if (userScore) {
                that.setData({
                    gaokaoScore: gaokaoScore,
                    cityIdList: recommendCityList,
                    batchNameList: recommendBatchList
                });
                try {
                    var cityList = wx.getStorageSync("cityList");
                    if (cityList) {
                        for (var i = 0; i < cityList.length; i++) {
                            if (userScore.provinceNumId == cityList[i].numId) {
                                that.setData({
                                    cityName: cityList[i].name
                                });
                                break;
                            }
                        }
                    }
                } catch (e) {}
                wx.setStorage({
                    key: "collegeRecommendBatch",
                    data: userScore.batch
                });
                that.setData({
                    userScore: userScore,
                    batchIndex: userScore.batch
                });
                var jsteam = userScore.chooseLevelOrSubjects;
                that.setData({
                    cityId: cityId
                });
                for (var i = 0; i < gaokaoScore.length; i++) {
                    if (gaokaoScore[i].batch == userScore.batch) {
                        that.setData({
                            batch: gaokaoScore[i].batchName
                        });
                        break;
                    }
                }
                try {
                    wx.setStorageSync("recommendBatchList", []);
                    wx.setStorageSync("recommendCityList", []);
                } catch (e) {}
                _api2.default.shangHaiRecommendRanks("ScoreLines/YFYD/QueryRankPosition", "POST", 843, userScore.total).then(function(res) {
                    var screenWidth = that.data.screenWidth;
                    var rankWaiFrom = res.result.maxRanking;
                    var rankWaiTo = res.result.minRanking;
                    var rankFrom = res.result.maxRankingM;
                    var rankTo = res.result.minRankingM;
                    var ballRightLeft = 220 / (rankWaiTo - rankWaiFrom) * (rankFrom - rankWaiFrom) + ((screenWidth - 220) / 2 - 7);
                    //（外右-外左）/220=（内左-外左）/（Left-（屏幕宽-条宽）/2）
                                        var ballRightRight = 220 / (rankWaiTo - rankWaiFrom) * (rankTo - rankWaiFrom) + ((screenWidth - 220) / 2 - 7);
                    //（右-左）/220 = （内左-10718）/（Left-63）
                                        that.setData({
                        zhejiangRanks: res.result,
                        rankLeft: rankFrom,
                        rankRight: rankTo,
                        ballRightLeft: ballRightLeft,
                        ballRightRight: ballRightRight
                    });
                    that.loadChange(that.data.sort, that.data.CSB, "bufen");
                });
                that.setData({
                    score: userScore.total,
                    rank: userScore.rank
                });
                var charsStr = "";
                var chooseLevel = userScore.chooseLevelOrSubjects;
                var chars = chooseLevel.split(",");
                charsStr += chars[0][0] == "历" ? "史/" : chars[0][0] + "/";
                charsStr += chars[1][0] == "历" ? "史/" : chars[1][0] + "/";
                charsStr += chars[2][0] == "历" ? "史" : chars[2][0];
                that.setData({
                    chooseLevel: charsStr,
                    chooseLevelArr: chars
                });
            }
        } catch (e) {}
    },
    paixuChange: function paixuChange(e) {
        var that = this;
        var sort = parseInt(e.detail.value) + parseInt(1);
        that.setData({
            paixuFlag: false,
            paixuIndex: e.detail.value,
            sort: sort,
            recommendList: [],
            pn: 1
        });
        this.loadChange(sort);
    },
    onShow: function onShow() {
        var that = this;
        var batch = that.data.batchIndex;
        var cityIdList = that.data.cityIdList;
        var batchNameList = that.data.batchNameList;
        try {
            var collegeRecommendBatch = wx.getStorageSync("collegeRecommendBatch");
            var collegeRecommendBatchGroup = wx.getStorageSync("collegeRecommendBatchGroup");
            var recommendCityList = wx.getStorageSync("recommendCityList");
            var recommendBatchList = wx.getStorageSync("recommendBatchList");
            var cityList = wx.getStorageSync("cityList");
            if (collegeRecommendBatch != that.data.batchIndex || collegeRecommendBatchGroup != that.data.groupName || String(recommendCityList) != String(cityIdList) || String(recommendBatchList) != String(batchNameList)) {
                that.setData({
                    bufenLoad: true,
                    recommendList: [],
                    zhejiangList: [],
                    pn: 1,
                    batchIndex: collegeRecommendBatch,
                    groupName: collegeRecommendBatchGroup
                });
                for (var i = 0; i < that.data.gaokaoScore.length; i++) {
                    if (that.data.gaokaoScore[i].batch == collegeRecommendBatch) {
                        that.setData({
                            batch: that.data.gaokaoScore[i].batchName
                        });
                    }
                }
                that.loadChange(that.data.sort, that.data.CSB, "bufen");
            }
            if (recommendCityList.length == 0) {
                that.setData({
                    provinceName: "省份"
                });
            } else if (recommendCityList[0] == 853) {
                that.setData({
                    provinceName: "海南"
                });
            } else if (recommendCityList[0] == 858) {
                that.setData({
                    provinceName: "西藏"
                });
            } else if (recommendCityList[0] == 861) {
                that.setData({
                    provinceName: "青海"
                });
            } else {
                for (var i = 0; i < cityList.length; i++) {
                    if (recommendCityList[0] == cityList[i].numId) {
                        that.setData({
                            provinceName: cityList[i].name
                        });
                        break;
                    }
                }
            }
        } catch (e) {}
        that.setData({
            course: that.data.userScore.courseType == 0 ? "理" : "文"
        });
    },
    redirect: function redirect(e) {
        var chiefid = e.currentTarget.dataset.chiefid;
        var collegeid = e.currentTarget.dataset.collegeid;
        var ucode = e.currentTarget.dataset.ucode;
        var name = e.currentTarget.dataset.name;
        var chooseLevel = e.currentTarget.dataset.chooselevel;
        wx.navigateTo({
            url: "../collegeRecommendDetail/collegeRecommendDetail?chiefid=" + chiefid + "&collegeid=" + collegeid + "&ucode=" + ucode + "&name=" + name + "&chooseLevel=" + chooseLevel
        });
    },
    chooseProvince: function chooseProvince() {
        wx.navigateTo({
            url: "../cityList/cityList"
        });
    },
    chooseCls: function chooseCls() {
        wx.navigateTo({
            url: "../collegeType/collegeType"
        });
    },
    choosePici: function choosePici() {
        wx.navigateTo({
            url: "../batchList/batchList"
        });
    },
    noPay: function noPay() {
        app.payPrompt();
    },
    // 浙江版
    CdiCSBChange: function CdiCSBChange(e) {
        var that = this;
        if (that.data.VIP == false) {
            wx.showToast({
                title: "开通VIP即可体验",
                icon: "none",
                duration: 2e3
            });
            return;
        }
        var sort = parseInt(e.detail.value);
        if (sort == 0) {
            sort = -1;
        }
        if (that.data.CSB == sort) {} else {
            that.setData({
                paixuFlag: false,
                CdiCSBIndex: e.detail.value,
                CSB: sort,
                zhejiangList: [],
                pn: 1
            });
            this.loadChange(that.data.sort, sort, "bufen");
        }
    },
    bupipeiOpen: function bupipeiOpen(e) {
        //不匹配专业展开
        var that = this;
        that.setData({
            bupipeiOpen: true,
            getCollegeId: e.currentTarget.dataset.id
        });
    },
    bupipeiClose: function bupipeiClose(e) {
        //不匹配专业收起
        var that = this;
        that.setData({
            bupipeiOpen: false,
            getCollegeId: e.currentTarget.dataset.id
        });
    },
    zhejiangmoren: function zhejiangmoren() {
        var that = this;
        var userScore = that.data.userScore;
        var zhejiangRanks = that.data.zhejiangRanks;
        try {
            wx.setStorageSync("recommendCityList", []);
            wx.setStorageSync("recommendBatchList", []);
        } catch (e) {}
        var screenWidth = that.data.screenWidth;
        var rankWaiTo = that.data.zhejiangRanks.minRanking;
        var rankWaiFrom = that.data.zhejiangRanks.maxRanking;
        var rankTo = that.data.zhejiangRanks.minRankingM;
        var rankFrom = that.data.zhejiangRanks.maxRankingM;
        var ballRightLeft = 220 / (rankWaiTo - rankWaiFrom) * (rankFrom - rankWaiFrom) + ((screenWidth - 220) / 2 - 7);
        var ballRightRight = 220 / (rankWaiTo - rankWaiFrom) * (rankTo - rankWaiFrom) + ((screenWidth - 220) / 2 - 7);
        that.setData({
            ballRightLeft: ballRightLeft,
            ballRightRight: ballRightRight,
            rankLeft: rankFrom,
            rankRight: rankTo,
            cityIdList: [],
            batchNameList: [],
            provinceName: "省份",
            paixuFlag: true
        });
        that.loadZhejiangRecommend(843, userScore.rank, userScore.chooseLevelOrSubjects, "", "", -1, 1, rankFrom, rankTo);
    },
    chooseWeici: function chooseWeici() {
        this.setData({
            down: !this.data.down
        });
    },
    hideKetang: function hideKetang() {
        //点击底部隐藏位次
        this.setData({
            down: !this.data.down
        });
    },
    // 滚动
    ballMoveEventLeft: function ballMoveEventLeft(e) {
        var that = this;
        var touchs = e.touches[0];
        var pageX = touchs.pageX;
        //防止坐标越界,view宽高的一半 
                if (pageX < (that.data.screenWidth - 220) / 2 - 7) return;
        if (pageX > that.data.ballRightRight) return;
        var rankLeft = Math.floor((that.data.zhejiangRanks.minRanking - that.data.zhejiangRanks.maxRanking) / 220 * (pageX - (that.data.screenWidth - 220) / 2 + 7) + that.data.zhejiangRanks.maxRanking);
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
        if (pageX > (that.data.screenWidth - 220) / 2 + 220 - 7) return;
        var rankRight = Math.floor((that.data.zhejiangRanks.minRanking - that.data.zhejiangRanks.maxRanking) / 220 * (pageX - (that.data.screenWidth - 220) / 2 + 7) + that.data.zhejiangRanks.maxRanking);
        this.setData({
            ballRightRight: pageX,
            rankRight: rankRight
        });
    },
    weiciChongzhi: function weiciChongzhi() {
        //位次重置
        var that = this;
        var screenWidth = that.data.screenWidth;
        var rankWaiTo = that.data.zhejiangRanks.minRanking;
        var rankWaiFrom = that.data.zhejiangRanks.maxRanking;
        var rankTo = that.data.zhejiangRanks.minRankingM;
        var rankFrom = that.data.zhejiangRanks.maxRankingM;
        var ballRightLeft = 220 / (rankWaiTo - rankWaiFrom) * (rankFrom - rankWaiFrom) + ((screenWidth - 220) / 2 - 7);
        var ballRightRight = 220 / (rankWaiTo - rankWaiFrom) * (rankTo - rankWaiFrom) + ((screenWidth - 220) / 2 - 7);
        that.setData({
            ballRightLeft: ballRightLeft,
            ballRightRight: ballRightRight,
            rankLeft: rankFrom,
            rankRight: rankTo
        });
    },
    weiciQueren: function weiciQueren() {
        //位次确认
        var that = this;
        if (that.data.VIP == false) {
            wx.showToast({
                title: "开通VIP即可体验",
                icon: "none",
                duration: 2e3
            });
            that.setData({
                down: false
            });
            return;
        }
        var rankLeft = that.data.rankLeft;
        var rankRight = that.data.rankRight;
        var userScore = that.data.userScore;
        var recommendBatchList = that.data.batchNameList;
        var recommendCityList = that.data.cityIdList;
        var zhejiangPros = recommendCityList.join(",");
        var zhejiangColtype = recommendBatchList.join(",");
        that.setData({
            down: false,
            zhejiangList: [],
            pn: 1
        });
        that.loadZhejiangRecommend(843, userScore.rank, userScore.chooseLevelOrSubjects, zhejiangPros, zhejiangColtype, that.data.CSB, that.data.pn, rankLeft, rankRight);
    },
    goPay: function goPay() {
        if (app.globalData.system == "ios") {
            app.payPrompt();
        } else {
            wx.navigateTo({
                url: "../pay/pay"
            });
        }
    }
});