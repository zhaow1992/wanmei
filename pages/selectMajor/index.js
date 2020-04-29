var app = getApp();

var api = require("../../utils/api.js");

Page({
    data: {
        recommendMajorLoading: false,
        //测评推荐loading
        hotList: [],
        jobList: [],
        changeTab: "",
        //换一批标志
        showLoad: true,
        allMajorLoading: true,
        currentTab: 0,
        isBOrZ: 0,
        swiperH: 0,
        menuTop: 0,
        majorsList: [],
        //全部专业
        recommendMajor: [],
        //测评推荐
        isBOrZItem: [ {
            name: "本科",
            value: 0
        }, {
            name: "专科",
            value: 1
        } ]
    },
    goMajorDetail: function goMajorDetail(e) {
        var majorCode = e.currentTarget.dataset.majorcode;
        if (majorCode.length == 4) {
            wx.navigateTo({
                url: "/packages/selectMajor/middleMajorDetail/middleMajorDetail?majorcode=" + majorCode
            });
        } else {
            wx.navigateTo({
                url: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + majorCode + "&cityid=" + this.cityId
            });
        }
    },
    chooseItem: function chooseItem(e) {
        var _this = this;
        this.setData({
            isBOrZ: e.detail
        }, function() {
            _this.queryMajorsHotRanking(1);
            _this.queryMajorsHotRanking(2);
        });
    },
    goSearch: function goSearch() {
        wx.navigateTo({
            //url: '/pages/search/search?cls=chazhuanye&flag=2',
            url: "/pages/globalSearch/globalSearch?mode=major"
        });
    },
    onLoad: function onLoad(options) {
        var that = this;
        this.onceInit = true;
        this.cityId = wx.getStorageSync("cityId").cityId;
        this.UserId = wx.getStorageSync("userInfo")[0].UserId;
        var majorsList = wx.getStorageSync("majorsList");
        if (majorsList) {
            this.setData({
                allMajorLoading: false,
                majorsList: majorsList
            });
        }
        //报考热度本科前三
        //就业前景本科前三
                this.queryMajorsHotRanking(1);
        this.queryMajorsHotRanking(2);
        this.professionOrientation();
    },
    // 获取用户最新一次专业定位五合一测评详情
    professionOrientation: function professionOrientation() {
        var that = this;
        api.professionOrientation("Evaluation/Result/ProfessionOrientation/GetByUserId", "POST", that.UserId).then(function(res) {
            that.setData({
                changeTab: that.onceInit ? "" : "changeAnimate",
                recommendMajorLoading: false
            }, function() {
                var majorCodes = [];
                if (res.result.majors != null && res.result.majors.length > 0) {
                    for (var i = 0; i < res.result.majors.length; i++) {
                        majorCodes.push(res.result.majors[i].majorCode);
                    }
                    that.majorSubOpenCollegeCount(res.result.majors, majorCodes);
                }
                if (that.onceInit) {
                    that.setData({
                        recommendMajor: res.result,
                        showLoad: false
                    }, function() {
                        that.getSwiperH();
                    });
                } else {
                    setTimeout(function() {
                        that.setData({
                            recommendMajor: res.result,
                            showLoad: false
                        }, function() {
                            that.getSwiperH();
                        });
                    }, 400);
                }
            });
            setTimeout(function() {
                that.setData({
                    changeTab: ""
                });
                app.resetOnce(that, "oneClick");
            }, 800);
        });
    },
    goCeping: function goCeping() {
        wx.switchTab({
            url: "/pages/ceping/ceping"
        });
    },
    majorSubOpenCollegeCount: function majorSubOpenCollegeCount(majors, majorCodes) {
        var that = this;
        api.majorSubOpenCollegeCount("Majors/QueryMajorSubOpenCollegeCount", "POST", that.cityId, majorCodes).then(function(res) {
            for (var i = 0; i < majors.length; i++) {
                majors[i].subMajorCount = res.result[i].subMajorCount;
            }
            that.setData({
                "recommendMajor.majors": majors
            });
        });
    },
    loadMajor: function loadMajor() {
        var that = this;
        if (that.data.majorsList.length > 0) {
            that.setData({
                allMajorLoading: false
            });
            return;
        }
        that.setData({
            allMajorLoading: true
        });
        api.getAllMajors("Majors/QueryAllMajors", "POST").then(function(res) {
            that.setData({
                allMajorLoading: false,
                majorsList: res.result
            });
            wx.setStorage({
                key: "majorsList",
                data: res.result
            });
        });
    },
    // 换一批
    changeTab: function changeTab() {
        this.onceInit = false;
        if (!app.checkOnce(this, "oneClick")) {
            return;
        }
        var that = this;
        that.setData({
            recommendMajorLoading: true
        });
        that.professionOrientation();
    },
    // 报考热度/就业前景
    queryMajorsHotRanking: function queryMajorsHotRanking(rankType) {
        var that = this;
        api.QueryMajorsHotRanking("Majors/QueryMajorsHotRanking", "POST", that.cityId, that.data.isBOrZ, 3, rankType).then(function(res) {
            if (rankType == 1) {
                that.setData({
                    hotList: res.result
                });
            } else {
                that.setData({
                    jobList: res.result
                });
            }
        });
    },
    // 计算swiper高度
    getSwiperH: function getSwiperH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.select("#nav").boundingClientRect();
        item.exec(function(res) {
            that.setData({
                swiperH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight,
                menuTop: res[0].height + app.globalData.navigationCustomCapsuleHeight + app.globalData.navigationCustomStatusHeight
            });
        });
    },
    // 切换选项卡
    changeSwiper: function changeSwiper(e) {
        this.closeDropDown();
        this.setData({
            currentTab: e.detail.current
        });
        if (e.detail.current == 1 && this.data.majorsList.length == 0) {
            this.loadMajor();
        }
    },
    swiperNav: function swiperNav(e) {
        this.closeDropDown();
        if (this.data.currentTab === e.currentTarget.dataset.current) {
            return;
        } else {
            this.setData({
                currentTab: e.currentTarget.dataset.current
            });
            if (e.currentTarget.dataset.current == 1 && this.data.majorsList.length == 0) {
                this.loadMajor();
            }
        }
    },
    // 选文理
    chooseDropDown: function chooseDropDown() {
        this.selectComponent("#collegeCourseDrop").toggerDropDown();
    },
    closeDropDown: function closeDropDown() {
        this.selectComponent("#collegeCourseDrop").closeDropDown();
    },
    onHide: function onHide() {
        this.closeDropDown();
    }
});