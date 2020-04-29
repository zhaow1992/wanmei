var app = getApp();

var api = require("../api.js");

Page({
    data: {
        popup: {
            popupFlag: false,
            wrapAnimate: "",
            popupAnimate: "",
            bgOpacity: ""
        },
        share: false,
        bgColor: app.globalData.color,
        oneClick: false,
        electiveQueryFlag: true,
        chooseSubMenu: [ {
            menuName: "大学选考科目查询",
            peopleUser: 0,
            src: "../image/elective_university.png"
        }, {
            menuName: "专业选考科目查询",
            peopleUser: 0,
            src: "../image/elective_major.png"
        }, {
            menuName: "选考科目专业推荐",
            peopleUser: 0,
            src: "../image/elective_subject.png"
        } ],
        multiArray: [ [], [] ],
        multiIndex: [ 0, 0 ],
        totalCount: 0
    },
    loginPopup: function loginPopup() {
        this.selectComponent("#loginPopup")._showTap();
    },
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        if (res.from === "button") {}
        return {
            title: "我已生成[新高考选科]的报告",
            imageUrl: "http://wmei-appfile.cn-bj.ufileos.com/share_xk.png",
            path: "/packages/chooseSubjects/electiveProvince/electiveProvince?share=true"
        };
    },
    chooseLogin: function chooseLogin(e) {
        if (e.currentTarget.dataset.login == "0") {//再看看
        } else {
            //跳首页登录
            wx.reLaunch({
                url: "/pages/index/index"
            });
        }
        this.hidePopup();
    },
    // 开始测评
    goEvaluation: function goEvaluation() {
        var userInfo = wx.getStorageSync("userInfo");
        if (userInfo) {
            wx.navigateTo({
                url: "../evaluation/evaluation"
            });
        } else {
            this.loginPopup();
        }
    },
    // 分享进入返回首页
    goHome: function goHome() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    //更改picker组件值
    bindMultiPickerChange: function bindMultiPickerChange(e) {
        var multiArray = this.data.multiArray;
        var multiIndex = e.detail.value;
        var cityList = this.data.cityList;
        var type = void 0;
        var chooseSubProvinceList = this.data.chooseSubProvinceList;
        for (var i = 0; i < cityList.length; i++) {
            if (cityList[i].name == multiArray[0][multiIndex[0]]) {
                app.globalData.chooseSubject.provinceId = cityList[i].numId;
                this.chooseSubjectInfo.provinceId = cityList[i].numId;
                break;
            }
        }
        app.globalData.chooseSubject.year = multiArray[1][multiIndex[1]];
        this.chooseSubjectInfo.year = multiArray[1][multiIndex[1]];
        this.setData({
            multiIndex: multiIndex,
            city: multiArray[0][multiIndex[0]],
            year: multiArray[1][multiIndex[1]]
        });
        chooseSubProvinceList.forEach(function(ele) {
            if (multiArray[0][multiIndex[0]] == ele.provinceName) {
                type = ele.type;
            }
        });
        app.globalData.chooseSubject.provinceType = type;
        this.chooseSubjectInfo.provinceType = type;
        wx.setStorageSync("chooseSubjectInfo", this.chooseSubjectInfo);
    },
    // 获取选科方案个数
    getMyChooseSubjects: function getMyChooseSubjects() {
        var that = this;
        var userId = wx.getStorageSync("userInfo")[0].UserId;
        api.myChooseSubjects("Users/ChooseSubjectsSolution/Query", "POST", userId).then(function(res) {
            if (res.isSuccess) {
                that.setData({
                    totalCount: res.result.totalCount
                });
            }
        });
    },
    //每次选择省份后切换改变对应的年份
    bindcolumnchange: function bindcolumnchange(e) {
        var multiArray = this.data.multiArray;
        var column = e.detail.column;
        var index = e.detail.value;
        var provinceName = multiArray[0][index];
        if (column === 0) {
            this.checkedCity(provinceName);
        }
    },
    //改变年份和省份
    checkedCity: function checkedCity(provinceName, oneRender) {
        var chooseSubProvinceList = this.data.chooseSubProvinceList;
        var yearArr = [];
        if (oneRender == "init") {
            var provinceArr = [];
            chooseSubProvinceList.forEach(function(ele) {
                provinceArr.push(ele.provinceName);
            });
            this.setData({
                "multiArray[0]": provinceArr
            });
        }
        chooseSubProvinceList.forEach(function(ele) {
            if (provinceName == ele.provinceName) {
                yearArr = ele.openedYears;
            }
        });
        this.setData({
            "multiArray[1]": yearArr
        });
    },
    goQuerySubjectsDetail: function goQuerySubjectsDetail(e) {
        var type = e.currentTarget.dataset.type;
        if (type == "大学选考科目查询") {
            wx.navigateTo({
                url: "../subjectForCollege/subjectForCollege"
            });
        } else if (type == "专业选考科目查询") {
            wx.navigateTo({
                url: "../subjectForMajor/subjectForMajor"
            });
        } else if (type == "选考科目专业推荐") {
            wx.navigateTo({
                url: "../mySubjects/mySubjects"
            });
        }
    },
    back: function back() {
        wx.navigateBack({
            delta: 1
        });
    },
    open: function open() {
        this.setData({
            electiveQueryFlag: !this.data.electiveQueryFlag
        });
    },
    openChooseQuery: function openChooseQuery() {
        this.setData({
            electiveQueryFlag: true
        });
    },
    customizedSubject: function customizedSubject() {
        var userInfo = wx.getStorageSync("userInfo");
        if (userInfo) {
            wx.navigateTo({
                url: "../evaluation/evaluation"
            });
        } else {
            this.loginPopup();
        }
    },
    goChooseMajor: function goChooseMajor() {
        var userInfo = wx.getStorageSync("userInfo");
        if (userInfo) {
            wx.navigateTo({
                url: "../loading/loading?type=2"
            });
        } else {
            this.loginPopup();
        }
    },
    goChooseSubPlan: function goChooseSubPlan() {
        var userInfo = wx.getStorageSync("userInfo");
        if (userInfo) {
            wx.navigateTo({
                url: "/pages/myChooseSubject/myChooseSubject?type=index"
            });
        } else {
            this.loginPopup();
        }
    },
    goMyLike: function goMyLike() {
        if (!app.checkOnce(this, "oneClick")) return;
        wx.navigateTo({
            url: "../myLike/myLike"
        });
    },
    goMySubject: function goMySubject() {
        if (!app.checkOnce(this, "oneClick")) return;
        wx.navigateTo({
            url: "../mySubjects/mySubjects"
        });
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.share = false;
        if (options && options.share) {
            that.share = true;
            that.setData({
                share: true
            });
        }
        var chooseSubjectInfo = wx.getStorageSync("chooseSubjectInfo");
        that.chooseSubjectInfo = chooseSubjectInfo;
        app.globalData.chooseSubject.provinceId = chooseSubjectInfo.provinceId;
        app.globalData.chooseSubject.year = chooseSubjectInfo.year;
        app.globalData.chooseSubject.provinceType = chooseSubjectInfo.provinceType;
        var height = wx.getSystemInfoSync().windowHeight;
        var chooseSubProvinceList = wx.getStorageSync("chooseSubProvinceList");
        this.setData({
            screenHeight: height,
            chooseSubProvinceList: chooseSubProvinceList
        });
        var cityId = chooseSubjectInfo.provinceId;
        try {
            var cityList = wx.getStorageSync("cityList");
            if (cityList) {
                for (var i = 0; i < cityList.length; i++) {
                    if (cityList[i].numId == cityId) {
                        that.setData({
                            city: cityList[i].name,
                            year: chooseSubjectInfo.year
                        });
                        that.checkedCity("北京", "init");
                        break;
                    }
                }
                that.setData({
                    cityList: cityList
                });
            }
        } catch (e) {}
    },
    onShow: function onShow() {
        app.resetOnce(this, "oneClick");
        app.globalData.chooseSubject.majorCodes = [];
        app.globalData.chooseSubject.majors = [];
        var provinceId = app.globalData.chooseSubject.provinceId;
        var city = void 0;
        var cityList = wx.getStorageSync("cityList");
        for (var i = 0; i < cityList.length; i++) {
            if (cityList[i].numId == provinceId) {
                city = cityList[i].name;
                break;
            }
        }
        this.setData({
            city: city,
            year: app.globalData.chooseSubject.year
        });
        var userInfo = wx.getStorageSync("userInfo");
        if (userInfo) {
            this.getMyChooseSubjects();
        }
    }
});