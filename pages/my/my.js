var _api = require("../../utils/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var app = getApp();

Page({
    data: {
        loginFlag: false,
        isIOS: false,
        reportCount: 0,
        cepingCount: 0,
        studyCount: 0,
        nickName: "",
        isGaoKao: true,
        city: "",
        cityId: null,
        scoreInfo: "632分 15782位",
        examYear: "2019",
        course: " 理科",
        showLoad: false,
        avatarUrl: "",
        sexIcon: "",
        lookUrl: "/packages/paySystem/memberCardDetail/memberCardDetail",
        lockScore: false,
        userScore: false,
        permission: "可使用 3 项功能服务",
        vipIcon: "./../../image/usertype1.png",
        naviText: "开通VIP"
    },
    // 各功能跳转详情
    goDetail: function goDetail(e) {
        if (!this.data.loginFlag) {
            this.loginPopup();
            return;
        }
        var type = e.currentTarget.dataset.type;
        switch (type) {
          case "card":
            wx.navigateTo({
                url: "/pages/card/card"
            });
            break;

            //会员卡绑定
                      case "myVish":
            wx.navigateTo({
                url: "/packages/userSystem/ZYTableReport/ZYTableReport"
            });
            break;

            //我的志愿
                      case "myChooseSub":
            wx.navigateTo({
                url: "/pages/myChooseSubject/myChooseSubject"
            });
            break;

            //会员卡绑定
                      case "myPro":
            wx.navigateTo({
                url: "/packages/userSystem/questionFeedBack/questionFeedBack"
            });
            break;

            //问题反馈
                      case "vip":
            wx.navigateTo({
                url: this.data.lookUrl
            });
            break;
            //问题反馈
                }
    },
    loginPopup: function loginPopup() {
        this.selectComponent("#loginPopup")._showTap();
    },
    goNavi: function goNavi(e) {
        var id = e;
        if (e.currentTarget.id == "0") {
            wx.navigateTo({
                url: "/packages/userSystem/evaluationReport/evaluationReport?type=0&typesOf=0"
            });
        } else if (e.currentTarget.id == "1") {
            wx.navigateTo({
                url: "/packages/userSystem/probabilityReport/probabilityReport"
            });
        } else if (e.currentTarget.id == "2") {
            wx.navigateTo({
                url: "/packages/userSystem/learnHistory/learnHistory"
            });
        }
    },
    onLoad: function onLoad() {
        var that = this;
        if (app.globalData.system == "ios") {
            that.setData({
                isIOS: true
            });
        }
        var userInfo = wx.getStorageSync("userInfo");
        if (userInfo) {
            that.setData({
                loginFlag: true
            });
            that.userInfo = userInfo[0];
            that.cityId = userInfo[0].Province;
            that.initUserInfo(that.userInfo);
        }
    },
    getUserScoreByNumId: function getUserScoreByNumId(userNumId, provinceNumId, isGaoKao, isFillProvinceName) {
        var that = this;
        _api2.default.getUserScoreByNumId("Users/Scores/GetByUserNumId", "POST", userNumId, provinceNumId, isGaoKao, isFillProvinceName).then(function(res) {
            var tmpData = {
                lockScore: false
            };
            if (res.result && res.result.scoreType == "2") {
                tmpData.lockScore = true;
                var GKScore = {
                    total: res.result.total,
                    rank: res.result.rank,
                    provinceNumId: res.result.provinceNumId,
                    chooseSubjects: [],
                    chooseLevelList: [],
                    scoreType: 2,
                    courseType: res.result.courseTypeId
                };
                tmpData.score = res.result.total + "分";
                tmpData.rank = res.result.rank + "位 ";
                if (app.checkNewGaoKao(res.result.provinceNumId)) {
                    var chooseSubjects = "";
                    for (var i in res.result.chooseSubjectsFormat) {
                        if (i == 0) {
                            chooseSubjects = res.result.chooseSubjectsFormat[i] + " ";
                        } else {
                            chooseSubjects += res.result.chooseSubjectsFormat[i] + " ";
                        }
                    }
                    GKScore.chooseSubjects = res.result.chooseSubjectsFormat;
                    tmpData.courseInfo = chooseSubjects;
                } else if (GKScore.provinceNumId == "1") {
                    var courseInfo = "";
                    GKScore.chooseLevelList = res.result.chooseLevelFormat;
                    for (var _i in res.result.chooseLevelFormat) {
                        var level = GKScore.chooseLevelList[_i];
                        courseInfo += level.name + " " + level.value + " ";
                    }
                    tmpData.courseInfo = courseInfo;
                } else {
                    var courseInfo = "";
                    if (res.result.courseTypeId == 1) {
                        courseInfo = "文科";
                    } else if (res.result.courseTypeId == 0) {
                        courseInfo = "理科";
                    }
                    tmpData.courseInfo = courseInfo;
                }
                wx.setStorageSync("GKScore", GKScore);
            } else {}
            that.setData(tmpData);
        });
    },
    //getUser
    //点击创建高考成绩
    createScoreTap: function createScoreTap() {
        var that = this;
        if (that.data.lockScore) {
            return;
        }
        wx.navigateTo({
            url: "/packages/ImproveGKScore/index/index"
        });
    },
    //用户首页获取关注、测评、报告、学习、问答总数
    getUserStatisticsCount: function getUserStatisticsCount(numId) {
        var that = this;
        _api2.default.getUserStatisticsCount("App/Users/Statistics/Count", "POST", numId).then(function(res) {
            if (res.result) {
                that.setData({
                    reportCount: res.result.reportCount,
                    // cepingCount: res.result.evaluationCount,
                    studyCount: res.result.studyCount
                });
            } else {}
        });
    },
    getCepingCount: function getCepingCount(numId) {
        var that = this;
        _api2.default.queryRecord("Evaluation/QueryRecord", "POST", numId).then(function(res) {
            if (res.isSuccess) {
                that.setData({
                    cepingCount: res.result.totalCount
                });
            }
        });
    },
    initUserInfo: function initUserInfo(userInfo) {
        var that = this;
        var tmpData = {
            examYear: "",
            course: "",
            avatarUrl: ""
        };
        if (that.userInfo.secretName) {
            tmpData.nickName = that.userInfo.secretName;
        }
        //性别 1=男 0=女
                if (userInfo.avatarUrl) {
            //gender
            tmpData.avatarUrl = userInfo.avatarUrl;
        }
        if (userInfo.gender == 0) {
            //gender
            tmpData.sexIcon = "/image/woman.png";
        } else if (userInfo.gender == 1) {
            //gender
            tmpData.sexIcon = "/image/man.png";
        }
        if (userInfo.courseType == 0) {
            tmpData.course = "理科";
        } else if (userInfo.courseType == 1) {
            tmpData.course = "文科";
        }
        if (userInfo.GKYear > 1970) {
            tmpData.examYear = userInfo.GKYear;
        }
        that.setData(tmpData);
    },
    //获取用户权限-vip否
    getUserPermission: function getUserPermission(mobile) {
        var that = this;
        var lookUrl = "/packages/paySystem/memberCardDetail/memberCardDetail";
        var vipType = wx.getStorageSync("vipType") || null;
        var tmpData = {
            permission: "可使用 3 项特权功能",
            vipIcon: "./../../image/usertype1.png",
            lookUrl: lookUrl,
            naviText: "开通VIP",
            overTime: ""
        };
        try {
            var userInfo = wx.getStorageSync("userInfo");
            if (userInfo) {
                var _vipType = userInfo[0].UserType;
                if (_vipType == "1") {
                    //普通用户处理
                    //可使用 3 项功能服务
                    tmpData.naviText = "开通VIP";
                    tmpData.vipIcon = "./../../image/usertype1.png";
                    tmpData.permission = "可使用 3 项特权功能";
                    tmpData.overTime = "";
                } else if (_vipType == "2") {
                    //体验用户
                    tmpData.naviText = "开通VIP";
                    tmpData.vipIcon = "./../../image/usertype4.png";
                    tmpData.permission = "体验到期日 " + userInfo[0].identityExpirationTime.substr(0, 10);
                    tmpData.overTime = "你将会失去6项VIP特权哦";
                    //还要区分是否高考版
                                } else if (_vipType == "3") {
                    tmpData.naviText = "查看";
                    tmpData.vipIcon = "./../../image/usertype2.png";
                    tmpData.permission = "可使用 6 项特权功能";
                    tmpData.lookUrl = lookUrl + "?vipType=3";
                    tmpData.overTime = userInfo[0].userPermissionExpiryTime == null ? "" : "会员到期日 " + userInfo[0].userPermissionExpiryTime.substr(0, 10);
                } else if (_vipType == "14") {
                    tmpData.naviText = "查看";
                    tmpData.vipIcon = "./../../image/usertype3.png";
                    tmpData.permission = "可使用 7 项特权功能";
                    tmpData.lookUrl = lookUrl + "?vipType=14";
                    tmpData.overTime = userInfo[0].userPermissionExpiryTime == null ? "" : "会员到期日 " + userInfo[0].userPermissionExpiryTime.substr(0, 10);
                }
                that.setData(tmpData);
            }
        } catch (e) {}
    },
    onShow: function onShow() {
        var that = this;
        var userInfo = wx.getStorageSync("userInfo");
        if (userInfo) {
            that.getUserStatisticsCount(userInfo[0].UserId);
            that.getCepingCount(userInfo[0].UserId);
            that.getUserPermission(userInfo[0].MobilePhone);
            var cityId = wx.getStorageSync("cityId");
            that.setData({
                city: cityId.provinceName,
                cityId: cityId.cityId
            });
            if (!app.globalData.isGaokaoFlag) {
                that.setData({
                    isGaoKao: false
                });
            } else {
                var userScore = wx.getStorageSync("userScore") || null;
                if (userScore) {
                    var tmpData = {
                        isGaoKao: true,
                        lockScore: false
                    };
                    tmpData.lockScore = true;
                    tmpData.score = userScore.total + "分";
                    tmpData.rank = userScore.rank + "位";
                    if (app.checkNewGaoKao(userScore.provinceNumId)) {
                        var chooseSubjects = "";
                        for (var i in userScore.chooseSubjects) {
                            if (i == 0) {
                                chooseSubjects = userScore.chooseSubjects[i] + " ";
                            } else {
                                chooseSubjects += userScore.chooseSubjects[i] + " ";
                            }
                        }
                        tmpData.courseInfo = chooseSubjects;
                    } else if (userScore.provinceNumId == "1") {
                        var courseInfo = "";
                        for (var _i2 in userScore.chooseLevelList) {
                            var level = userScore.chooseLevelList[_i2];
                            courseInfo += level.name + " " + level.value + " ";
                        }
                        tmpData.courseInfo = courseInfo;
                    } else {
                        var courseInfo = "";
                        if (userScore.courseType == 1) {
                            courseInfo = "文科";
                        } else if (userScore.courseType == 0) {
                            courseInfo = "理科";
                        }
                        tmpData.courseInfo = courseInfo;
                        tmpData.course = courseInfo;
                    }
                    that.setData(tmpData);
                } else {
                    that.getUserScoreByNumId(userInfo[0].UserId, cityId.cityId, true, true);
                }
            }
        } else {
            that.loginPopup();
        }
    },
    // 打电话给客服
    callMobile: function callMobile() {
        app.callMobile();
    }
});