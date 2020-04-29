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
        skip: true,
        popup: {
            popupFlag: false,
            wrapAnimate: "",
            popupAnimate: "",
            bgOpacity: ""
        },
        sexPopup: {
            bgOpacity: 0,
            wrapAnimate: "",
            popupAnimate: "",
            sexFlag: ""
        },
        serverfail: false,
        cepingFlag: false,
        majorZongheList: [],
        currentTab: 0,
        userInfo: [],
        showLoad: false,
        introone: "",
        introtwo: "",
        introthree: "",
        IntroPicUrl: "",
        cepingType: "",
        name: "",
        cepingList: [],
        screenWidth: 360
    },
    chooseParent: function chooseParent(e) {
        var sex = parseInt(e.currentTarget.dataset.sex);
        this.hidePopup();
        wx.redirectTo({
            url: "/packages/chooseSubjects/evaluationDesc/evaluationDesc?sex=" + sex + "&ispatriarch=true"
        });
    },
    // 选择性别
    chooseSex: function chooseSex(e) {
        var sex = parseInt(e.currentTarget.dataset.sex);
        this.updateBasicInfo(sex);
        wx.setStorageSync("sex", sex);
        this.hideSexPopup();
        wx.redirectTo({
            url: "/packages/chooseSubjects/evaluationDesc/evaluationDesc?sex=" + sex + "&ispatriarch=false"
        });
    },
    //完善用户信息 （id 和 性别）
    updateBasicInfo: function updateBasicInfo(sex) {
        var userInfo = wx.getStorageSync("userInfo");
        var parameter = {
            id: userInfo[0].id,
            provinceNumId: 0,
            cityNumId: 0,
            countyNumId: 0,
            schoolNumId: userInfo[0].SchoolId || 0,
            schoolName: userInfo[0].schoolName,
            gkYear: 0,
            realName: "",
            sex: sex,
            courseType: -1,
            class: ""
        };
        _api2.default.updateBasicInfo("Users/updateBasicInfo", "POST", parameter).then(function(res) {
            userInfo[0].gender = res.result.gender;
            wx.setStorage({
                key: "userInfo",
                data: userInfo,
                success: function success(r) {}
            });
        });
    },
    studentEvaluation: function studentEvaluation() {
        var that = this;
        var sex = wx.getStorageSync("sex");
        if (sex != 6) {
            wx.redirectTo({
                url: "/packages/chooseSubjects/evaluationDesc/evaluationDesc?sex=" + sex + "&ispatriarch=false"
            });
        } else {
            this.showSexPopup();
        }
    },
    parentEvaluation: function parentEvaluation() {
        this.showPopup();
    },
    onLoad: function onLoad(options) {
        if (options && options.again == "true") {
            this.setData({
                skip: false
            });
        }
    },
    onShow: function onShow() {
        var that = this;
        try {
            var cpBanners = wx.getStorageSync("cpBanners");
            var cpList = wx.getStorageSync("cpList");
            var userInfo = wx.getStorageSync("userInfo");
            that.setData({
                userInfo: userInfo
            });
        } catch (e) {}
        wx.stopPullDownRefresh();
    },
    onPullDownRefresh: function onPullDownRefresh() {
        var that = this;
        that.loadCepingList(that.data.userInfo[0].UserId);
    },
    showSexPopup: function showSexPopup() {
        var that = this;
        that.setData({
            "sexPopup.bgOpacity": 0,
            "sexPopup.wrapAnimate": "wrapAnimate",
            "sexPopup.popupAnimate": "popupAnimate",
            "sexPopup.sexFlag": true
        });
    },
    hideSexPopup: function hideSexPopup() {
        var that = this;
        that.setData({
            "sexPopup.bgOpacity": .4,
            "sexPopup.wrapAnimate": "wrapAnimateOut",
            "sexPopup.popupAnimate": "popupAnimateOut"
        });
        setTimeout(function() {
            that.setData({
                "sexPopup.sexFlag": false
            });
        }, 200);
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
    zhuanyeScroll: function zhuanyeScroll(e) {
        var screenWidth = this.data.screenWidth;
        wx.getSystemInfo({
            success: function success(res) {
                wx.pageScrollTo({
                    scrollTop: 81.67 / 100 * screenWidth
                });
            }
        });
    },
    xueyeScroll: function xueyeScroll(e) {
        var screenWidth = this.data.screenWidth;
        wx.pageScrollTo({
            scrollTop: 215.56 / 100 * screenWidth
        });
    },
    loadCepingList: function loadCepingList(UserId) {
        var that = this;
        _api2.default.getReportNum("Evaluation/QueryE360Infos?userNumId=" + UserId, "POST").then(function(res) {
            if (res.isSuccess) {
                res.result[0].bgColor = "#eeaae7";
                res.result[1].bgColor = "#ffa18b";
                res.result[2].bgColor = "#5fd0ec";
                res.result[3].bgColor = "#6adde6";
                res.result[4].bgColor = "#87cdf5";
                res.result[5].bgColor = "#fcc379";
                that.setData({
                    cepingList: res.result,
                    showLoad: false
                });
                wx.setStorage({
                    key: "cpList",
                    data: res.result
                });
                wx.stopPullDownRefresh();
            } else {
                that.setData({
                    serverfail: true,
                    showLoad: false
                });
                return;
            }
        });
    },
    goCepingBaoGao: function goCepingBaoGao() {
        wx.navigateTo({
            url: "../cepingBaoGao/cepingBaoGao"
        });
    },
    newGaoKao: function newGaoKao() {
        wx.navigateTo({
            url: "../cepingZAndKBefore/cepingZAndKBefore"
        });
    },
    goCepingTijian: function goCepingTijian(e) {
        var that = this;
        var cepingType = e.currentTarget.dataset.type;
        var introone = e.currentTarget.dataset.introone;
        var introtwo = e.currentTarget.dataset.introtwo;
        var introthree = e.currentTarget.dataset.introthree;
        var name = e.currentTarget.dataset.name;
        var reportnum = e.currentTarget.dataset.reportnum;
        var IntroPicUrl = e.currentTarget.dataset.intropicurl;
        try {
            wx.setStorageSync("cepingImg", {
                cepingUrl: IntroPicUrl,
                cepingName: name
            });
        } catch (e) {}
        wx.navigateTo({
            url: "../cepingReady/cepingReady?intro1=" + introone + "&intro2=" + introtwo + "&intro3=" + introthree + "&intropicurl=" + IntroPicUrl + "&type=" + cepingType + "&name=" + name + "&reportnum=" + reportnum
        });
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
    zongheReport: function zongheReport() {
        var that = this;
        var majorZonghe = that.data.cepingList[0].IntroModel;
        var majorZongheList = [];
        for (var i = 0; i < majorZonghe.length; i++) {
            if (majorZonghe[i].ReportNum == 0) {
                majorZongheList.push(majorZonghe[i]);
            }
        }
        if (majorZongheList.length > 0) {
            that.setData({
                majorZongheList: majorZongheList,
                cepingFlag: true
            });
        } else {
            wx.navigateTo({
                url: "../webPage/webPage?url=https://m.wmei.cn/Evaluations/EvaluationReport.aspx?userId=11464842"
            });
        }
    },
    goCeping: function goCeping(e) {
        wx.navigateTo({
            url: "../cepingQuestion/cepingQuestion?type=" + e.currentTarget.dataset.type
        });
        this.goCepingClose();
    },
    goCepingClose: function goCepingClose() {
        this.setData({
            cepingFlag: false
        });
    },
    _confirmEvent: function _confirmEvent() {
        this.setData({
            showLoad: true,
            serverfail: false
        });
        this.loadCepingList(this.data.userInfo[0].UserId);
    }
});