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
        showLoad: true,
        introone: "",
        introtwo: "",
        introthree: "",
        IntroPicUrl: "",
        cepingType: "",
        name: "",
        cepingList: [],
        screenWidth: 360
    },
    login: function login() {
        app.globalData.initLogin = true;
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    // 各功能跳转详情
    goDetail: function goDetail(e) {
        var that = this;
        if (!this.data.loginFlag) {
            this.loginPopup();
            return;
        }
        var type = e.currentTarget.dataset.type;
        switch (type) {
          case "student":
            var sex = wx.getStorageSync("sex");
            if (sex != 6) {
                wx.navigateTo({
                    url: "/packages/evaluation/evaluationStart/evaluationStart?sex=" + sex + "&ispatriarch=false"
                });
            } else {
                this.showSexPopup();
            }
            break;

            //学生测评
                      case "parent":
            that.showPopup();
            ;
            break;
            //我的志愿
                }
    },
    loginPopup: function loginPopup() {
        this.selectComponent("#loginPopup")._showTap();
    },
    chooseParent: function chooseParent(e) {
        var sex = parseInt(e.currentTarget.dataset.sex);
        this.hidePopup();
        wx.navigateTo({
            url: "/packages/evaluation/evaluationStart/evaluationStart?sex=" + sex + "&ispatriarch=true"
        });
    },
    // 选择性别
    chooseSex: function chooseSex(e) {
        var sex = parseInt(e.currentTarget.dataset.sex);
        wx.setStorageSync("sex", sex);
        this.hideSexPopup();
        wx.navigateTo({
            url: "/packages/evaluation/evaluationStart/evaluationStart?sex=" + sex + "&ispatriarch=false"
        });
    },
    onLoad: function onLoad() {
        this.selectComponent("#navigationcustom").setNavigationAll("选科/测评", false);
    },
    onShow: function onShow() {
        var that = this;
        var cpList = wx.getStorageSync("cpList");
        var userInfo = wx.getStorageSync("userInfo");
        if (userInfo) {
            that.setData({
                userInfo: userInfo,
                loginFlag: true
            });
            if (cpList) {
                that.setData({
                    cepingList: cpList,
                    showLoad: false
                });
            } else {
                that.loadCepingList();
            }
        } else {
            that.setData({
                showLoad: false,
                loginFlag: false
            });
        }
    },
    // onPullDownRefresh: function () {
    //   var that = this;    
    //   that.loadCepingList();
    // },
    onShareAppMessage: function onShareAppMessage(res) {
        //转发
        if (res.from === "button") {}
        return {
            title: "完美志愿填报助手",
            path: "/pages/index/index?ceping=true",
            success: function success(res) {
                console.log("成功");
            },
            fail: function fail(res) {
                console.log("失败");
            }
        };
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
    loadCepingList: function loadCepingList() {
        var that = this;
        var userInfo = wx.getStorageSync("userInfo");
        _api2.default.getReportNum("Evaluation/QueryE360Infos?userNumId=" + userInfo[0].UserId, "POST").then(function(res) {
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
        this.loadCepingList();
    }
});