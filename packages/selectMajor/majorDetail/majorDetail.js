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

Page({
    data: {
        showLoad: true,
        popup: {
            showLoad: true,
            popupFlag: false,
            wrapAnimate: "",
            popupAnimate: "",
            bgOpacity: ""
        },
        currentTab: 0,
        swiperH: 0,
        tab: [],
        majorDetail: {},
        openCollege: {
            openCollegeList: [],
            openCollegeNum: 0,
            pn: 1,
            showMore: true
        },
        careerList: [],
        //就业方向及相关职业
        careerProspects: [],
        //就业前景整个
        moneyTab: [ "应届生", "1-3年", "3-5年", "5-10年", "5-10年" ],
        //换
        moneyCurrentTab: 0,
        share: false
    },
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        if (res.from === "button") {}
        return {
            title: "我正在看" + that.data.majorDetail.name + "的介绍",
            imageUrl: "http://bapp.wmei.cn/share/major.png",
            path: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + that.majorcode + "&cityid=" + that.cityId + "&share=true"
        };
    },
    onLoad: function onLoad(options) {
        this.majorcode = options.majorcode;
        this.cityId = options.cityid;
        if (options && options.share) {
            this.setData({
                share: true
            });
        }
        this.getMajorDetail();
        //小类详情
                this.getEmployment();
        //就业方向
                this.getMajorCollege();
        //开设院校
                this.getMajorCareerProspects();
        //就业前景
        },
    // 就业方向查看更多
    selectMore: function selectMore() {
        this.setData({
            currentTab: 1
        });
    },
    // 就业方向及相关职业
    getEmployment: function getEmployment() {
        var that = this;
        api.getEmployment("Majors/Employment/Get", "POST", that.majorcode).then(function(res) {
            var averageSalary = res.result.employment.averageSalary;
            averageSalary = averageSalary.split("");
            if (averageSalary.length > 3) {
                averageSalary.splice(averageSalary.length - 3, averageSalary.length - 1, "k");
            }
            averageSalary = averageSalary.join("");
            res.result.employment.averageSalary = averageSalary;
            that.setData({
                careerList: res.result
            });
        });
    },
    // 就业前景
    getMajorCareerProspects: function getMajorCareerProspects() {
        var that = this;
        api.getMajorCareerProspects("Majors/GetMajorCareerProspects", "POST", that.majorcode).then(function(res) {
            if (res.result.careerDistribution) {
                that.index = 0;
                res.result.careerDistribution[0].st = true;
                for (var i = 1; i < res.result.careerDistribution.length; i++) {
                    res.result.careerDistribution[i].st = false;
                }
            }
            that.setData({
                careerProspects: res.result
            });
        });
    },
    // 开设院校
    getMajorCollege: function getMajorCollege() {
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
    // 使用说明
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
            "popup.bgOpacity": .7,
            "popup.popupAnimate": "popupAnimateOut"
        });
        setTimeout(function() {
            _this.setData({
                "popup.popupFlag": false
            });
        }, 200);
    },
    // 小类详情
    getMajorDetail: function getMajorDetail() {
        var that = this;
        api.getMajorDetail("Majors/GetByCode", "POST", that.majorcode).then(function(res) {
            that.initTab(res.result.typeId);
            //本专科tab栏切换
                        that.selectComponent("#navigationcustom").setNavigationAll(res.result.name, true);
            that.setData({
                majorDetail: res.result,
                showLoad: false
            });
            that.getSwiperH();
        });
    },
    // 初始化tab-专科无开设院校
    initTab: function initTab(isBOrZ) {
        var tab = this.data.tab;
        switch (isBOrZ) {
          case 0:
            tab.push({
                name: "专业概况",
                value: 0
            }, {
                name: "就业前景",
                value: 1
            }, {
                name: "开设院校",
                value: 2
            });
            break;

          case 1:
            tab.push({
                name: "专业概况",
                value: 0
            }, {
                name: "就业前景",
                value: 1
            });
            break;
        }
        this.setData({
            tab: tab
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
    changeMoneySwiper: function changeMoneySwiper(e) {
        this.setData({
            moneyCurrentTab: e.detail.current
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
    // 岗位薪资切换选项卡
    moneySwiperNav: function moneySwiperNav(e) {
        if (this.data.moneyCurrentTab === e.currentTarget.dataset.current) {
            return;
        } else {
            this.setData({
                moneyCurrentTab: e.currentTarget.dataset.current
            });
        }
    },
    // 职业分布展开职业信息
    openJobInfo: function openJobInfo(e) {
        var jobList = this.data.careerProspects.careerDistribution;
        var index = e.currentTarget.dataset.index;
        if (index != this.index) {
            //不同
            if (this.index != undefined) {
                jobList[this.index].st = false;
                this.setData(_defineProperty({}, "careerProspects.careerDistribution[" + this.index + "].st", false));
            }
        }
        this.setData(_defineProperty({}, "careerProspects.careerDistribution[" + index + "].st", !jobList[index].st));
        this.index = index;
    }
});