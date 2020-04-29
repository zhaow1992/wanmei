var app = getApp();

var api = require("../api.js");

Page({
    data: {
        isBOrZ: 0,
        tab: [],
        showLoad: true,
        currentTab: 0,
        swiperH: 0,
        smallMajorList: [],
        //小类列表
        careerList: [],
        //职业方向
        radioList: [],
        //视频讲解
        openCollege: {
            openCollegeList: [],
            openCollegeNum: 0,
            pn: 1,
            showMore: true
        },
        pn: 1,
        share: false,
        middleName: ""
    },
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        if (res.from === "button") {}
        return {
            title: "我正在看" + that.data.middleName + "的介绍",
            imageUrl: "http://bapp.wmei.cn/share/major.png",
            path: "/packages/selectMajor/middleMajorDetail/middleMajorDetail?majorcode=" + that.majorcode + "&cityid=" + that.cityId + "&share=true"
        };
    },
    goMajorDetail: function goMajorDetail(e) {
        wx.navigateTo({
            url: "../majorDetail/majorDetail?majorcode=" + e.currentTarget.dataset.majorcode + "&cityid=" + this.cityId
        });
    },
    onLoad: function onLoad(options) {
        this.majorcode = options.majorcode;
        if (options && options.share) {
            this.cityId = options.cityid;
            this.setData({
                share: true
            });
        } else {
            this.cityId = wx.getStorageSync("cityId").cityId;
        }
        this.getMiddleMajors();
        //中类详情
                this.getMajorCollege();
        //开设院校
                this.getCareer();
        //职业方向
        },
    // 中类视频-通过关键字查询相关视频
    queryVideos: function queryVideos(keywords) {
        var that = this;
        api.queryVideos("Classroom/Video/QueryVideos", "POST", keywords, that.data.pn).then(function(res) {
            that.setData({
                radioList: that.data.radioList.concat(res.result)
            });
        });
    },
    // 职业方向
    getCareer: function getCareer() {
        var that = this;
        api.getCareer("Majors/Employment/Career/Get", "POST", that.majorcode).then(function(res) {
            that.setData({
                careerList: res.result
            });
        });
    },
    // 开设院校
    getMajorCollege: function getMajorCollege(majorcode) {
        var that = this;
        if (!that.data.openCollege.showMore) return;
        api.getMajorCollege("Majors/QueryMajorOpenColleges", "POST", that.majorcode, that.cityId, that.data.openCollege.pn).then(function(res) {
            that.setData({
                "openCollege.openCollegeList": that.data.openCollege.openCollegeList.concat(res.result.items),
                "openCollege.openCollegeNum": res.result.totalCount
            });
            if (res.result.items.length < 10) {
                that.setData({
                    "openCollege.showMore": false
                });
            }
        });
    },
    getNextPage: function getNextPage() {
        var that = this;
        that.setData({
            "openCollege.pn": that.data.openCollege.pn + 1
        }, function() {
            that.getMajorCollege();
        });
    },
    // 计算swiper高度
    getSwiperH: function getSwiperH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.select("#nav").boundingClientRect();
        item.exec(function(res) {
            that.setData({
                swiperH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
            });
        });
    },
    changeSwiper: function changeSwiper(e) {
        this.setData({
            currentTab: e.detail.current
        });
    },
    // 切换选项卡
    swiperNav: function swiperNav(e) {
        if (this.data.currentTab === e.currentTarget.dataset.current) {
            return;
        } else {
            this.setData({
                currentTab: e.currentTarget.dataset.current
            });
        }
    },
    // 初始化tab-专科无开设院校
    initTab: function initTab(isBOrZ) {
        var _this = this;
        var tab = this.data.tab;
        switch (parseInt(isBOrZ)) {
          case 0:
            tab.push({
                name: "专业详情",
                value: 0
            }, {
                name: "开设院校",
                value: 1
            }, {
                name: "职业方向",
                value: 2
            });
            break;

          case 1:
            tab.push({
                name: "专业详情",
                value: 0
            }, {
                name: "职业方向",
                value: 1
            });
            break;
        }
        this.setData({
            tab: tab
        }, function() {
            _this.getSwiperH();
        });
    },
    getMiddleMajors: function getMiddleMajors() {
        var that = this;
        api.GetMiddleMajors("Majors/GetMiddleDetail", "POST", that.cityId, that.majorcode).then(function(res) {
            that.initTab(res.result.typeId);
            that.queryVideos(res.result.middleName);
            that.selectComponent("#navigationcustom").setNavigationAll(res.result.middleName, true);
            that.setData({
                isBOrZ: res.result.typeId,
                smallMajorList: res.result.smallMajors,
                middleName: res.result.middleName,
                showLoad: false
            });
        });
    }
});