var _Page;

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

var sensors = require("./../../../utils/sensors.js");

Page((_Page = {
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
        share: false,
        courseItem: [ {
            name: "文科",
            value: 1
        }, {
            name: "理科",
            value: 0
        } ],
        artsAndSciences: "",
        batchName: "",
        loading: false,
        isNewGK: false,
        filterH: 0,
        isBOrZ: 0
    },
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        var data = {
            SA_share_type: "专业详情",
            SA_share_content: "我正在看" + that.data.majorDetail.name + "的介绍"
        };
        app.sensors.track("ShareClick", sensors.ShareClick(data));
        if (res.from === "button") {}
        return {
            title: "我正在看" + that.data.majorDetail.name + "的介绍",
            imageUrl: "http://bapp.wmei.cn/share/major.png",
            path: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + that.majorcode + "&cityid=" + that.cityId + "&share=true"
        };
    },
    onLoad: function onLoad(options) {
        this.majorcode = options.majorcode;
        this.setData({
            course: wx.getStorageSync("course")
        });
        if (options && options.share) {
            this.cityId = options.cityid;
            this.setData({
                share: true,
                cityId: options.cityid
            });
        } else {
            this.cityId = wx.getStorageSync("cityId").cityId;
            this.setData({
                cityId: wx.getStorageSync("cityId").cityId
            });
        }
        // this.getIsNewGK();
                this.getMajorDetail();
        //小类详情
        //开设院校
                this.getMajorCollege();
        this.getEmployment();
        //就业方向
                this.getMajorCareerProspects();
        //就业前景
        },
    InsertSA: function InsertSA(type, initRes, result) {
        var majorDetail = this.data.majorDetail;
        var SA_code = "";
        var SA_name = "";
        var SA_isBen = "";
        var SA_main = "";
        var SA_minor = "";
        if (initRes) {
            SA_code = this.majorcode;
            SA_name = majorDetail.name;
            SA_isBen = majorDetail.typeId == 0 ? "本科" : "专科";
            SA_main = majorDetail.largeClassName;
            SA_minor = majorDetail.middleClassName;
        }
        var SA_content_type = type;
        var SA_type = "小类专业";
        var SA_result = result;
        var data = {
            SA_content_type: SA_content_type,
            SA_code: SA_code,
            SA_name: SA_name,
            SA_type: SA_type,
            SA_isBen: SA_isBen,
            SA_main: SA_main,
            SA_minor: SA_minor,
            SA_result: SA_result
        };
        app.sensors.track("MajorsView", sensors.MajorsView(data));
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
            if (res.result.careerDistribution && res.result.careerDistribution.length > 0) {
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
    getIsNewGK: function getIsNewGK() {
        var _this = this;
        var obj = {
            provinceId: this.data.cityId,
            majorCode: this.majorcode
        };
        api.getIsNewGK("Majors/V2/OpenCollegesStatistics", "POST", obj).then(function(res) {
            _this.setData({
                filterData: res.result
            });
            if (res.result) {
                if (res.result.isNewGaoKao) {
                    _this.setData({
                        isNewGK: true
                    });
                    _this.getMajorCollege();
                } else {
                    _this.initFilter();
                }
            } else {
                _this.initFilter();
            }
        });
    },
    //初始化筛选条件数据
    initFilter: function initFilter() {
        var _this2 = this;
        var obj = JSON.parse(this.data.filterData.json);
        var array = this.data.course == 0 ? obj["lk"] : obj["wk"];
        var batchItem = [];
        var batchName = "";
        var artsAndSciences = this.data.course == 0 ? "理科" : "文科";
        var batchNum = "";
        if (array.length > 0) {
            batchName = array[0].batchName;
            array.map(function(i) {
                var batchSingle = {};
                batchSingle.name = i.batchName;
                batchSingle.value = i.batch;
                batchItem.push(batchSingle);
            });
            batchNum = batchItem[0].value;
        } else {
            batchNum = 0;
        }
        this.setData({
            batchItem: batchItem,
            artsAndSciences: artsAndSciences,
            batchName: batchName,
            batchNum: batchNum
        }, function() {
            //开设院校
            _this2.getMajorCollege();
        });
    },
    // 开设院校
    getMajorCollege: function getMajorCollege() {
        var that = this;
        if (!that.data.openCollege.showMore) return;
        if (that.data.openCollege.pn == 1) {
            this.setData({
                loading: true
            });
        }
        var json = {
            clientType: 1,
            provinceId: that.cityId,
            majorCode: that.majorcode,
            pageIndex: that.data.openCollege.pn,
            pageSize: 10
        };
        api.getMajorCollege("Majors/V3/OpenColleges", "POST", json).then(function(res) {
            that.setData({
                "openCollege.openCollegeList": that.data.openCollege.pn > 1 ? that.data.openCollege.openCollegeList.concat(res.result.items) : res.result.items,
                "openCollege.openCollegeNum": res.result.totalCount,
                loading: false
            });
            if (res.result.items.length < 10) {
                that.setData({
                    "openCollege.showMore": false,
                    loading: false
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
        var _this3 = this;
        this.setData({
            "popup.wrapAnimate": "wrapAnimateOut",
            "popup.bgOpacity": .7,
            "popup.popupAnimate": "popupAnimateOut"
        });
        setTimeout(function() {
            _this3.setData({
                "popup.popupFlag": false
            });
        }, 200);
    },
    // 小类详情
    getMajorDetail: function getMajorDetail() {
        var that = this;
        api.getMajorDetail("Majors/GetByCode", "POST", that.majorcode).then(function(res) {
            if (res.isSuccess) {
                that.initTab(res.result.typeId);
                //本专科tab栏切换
                                that.selectComponent("#navigationcustom").setNavigationAll(res.result.name, true);
                that.setData({
                    majorDetail: res.result,
                    showLoad: false,
                    isBOrZ: res.result.typeId
                }, function() {
                    that.InsertSA("专业主页", true, true);
                });
                that.getSwiperH();
            } else {
                that.setData({
                    showLoad: false
                });
                that.InsertSA("专业主页", false, false);
            }
        });
    },
    // 专业主页
    goMajorIntro: function goMajorIntro() {
        this.InsertSA("专业主页", true, true);
    },
    // 初始化tab-专科无开设院校
    initTab: function initTab(isBOrZ) {
        var tab = this.data.tab;
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
        // switch (isBOrZ){
        //   case 0: tab.push({ name: '专业概况', value: 0 }, { name: '就业前景', value: 1 }, { name: '开设院校', value: 2 });break;
        //   case 1: tab.push({ name: '专业概况', value: 0 }, { name: '就业前景', value: 1 });break;
        // }
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
        if (this.data.currentTab == 2 && !this.data.isNewGK) {
            var filter = wx.createSelectorQuery();
            item.select("#filter").boundingClientRect();
            item.exec(function(res) {
                that.setData({
                    filterH: res[0].height
                });
            });
        }
    },
    changeSwiper: function changeSwiper(e) {
        if (e.detail.source == "touch") {
            this.setData({
                currentTab: e.detail.current
            });
            switch (parseInt(e.detail.current)) {
              case 0:
                this.InsertSA("专业主页", true, true);
                break;

              case 1:
                this.InsertSA("专业就业前景", true, true);
                break;

              case 2:
                var result = false;
                if (this.data.openCollege.openCollegeList.length > 0) {
                    result: true;
                }
                ;
                this.InsertSA("专业开设院校", true, result);
                break;
            }
        }
        this.getSwiperH();
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
            switch (parseInt(e.currentTarget.dataset.current)) {
              case 0:
                this.InsertSA("专业主页", true);
                break;

              case 1:
                this.InsertSA("专业就业前景", true);
                break;

              case 2:
                var result = false;
                if (this.data.openCollege.openCollegeList.length > 0) {
                    result: true;
                }
                ;
                this.InsertSA("专业开设院校", true);
                break;
            }
            this.setData({
                currentTab: e.currentTarget.dataset.current
            });
        }
        this.getSwiperH();
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
    },
    /**弹出录取批次 */
    chooseBatch: function chooseBatch(e) {
        var that = this;
        var itemtype = e.currentTarget.dataset.itemtype;
        if (that.data.batchItem.length < 2) {
            return;
        }
        if (itemtype == "college") {
            that.selectComponent("#collegeBatchDrop").toggerDropDown();
            // that.toggerDropDown();
                } else if (itemtype == "major") {
            that.selectComponent("#majorBatchDrop").toggerDropDown();
            that.selectComponent("#majorCourseDrop").closeDropDown();
            // that.toggerDropDown();
                } else if (itemtype == "plan") {
            that.selectComponent("#planBatchDrop").toggerDropDown();
            // that.toggerDropDown();
                }
    },
    chooseArtsAndSciences: function chooseArtsAndSciences(e) {
        var that = this;
        // console.log(e)
                var itemtype = e.currentTarget.dataset.itemtype;
        if (itemtype == "college") {
            that.selectComponent("#collegeCourseDrop").toggerDropDown();
        } else if (itemtype == "major") {
            if (that.data.batchItem.length > 0) that.selectComponent("#majorBatchDrop").closeDropDown();
            that.selectComponent("#majorCourseDrop").toggerDropDown();
        } else if (itemtype == "plan") {
            that.selectComponent("#planCourseDrop").toggerDropDown();
        }
    },
    //文理科点击条目切换
    chooseCourseItem: function chooseCourseItem(e) {
        var that = this;
        var courseName = "理科";
        if (e.detail == 1) {
            courseName = "文科";
        }
        that.setData({
            artsAndSciences: courseName,
            course: e.detail,
            "openCollege.pn": 1,
            "openCollege.showMore": true
        }, function() {
            that.initFilter();
        });
    },
    //录取批次点击条目切换
    chooseBatchItem: function chooseBatchItem(e) {
        var that = this;
        //专业分数线的数据
                var batch = e.detail;
        for (var i = 0; i < that.data.batchItem.length; i++) {
            if (that.data.batchItem[i].value == e.detail) {
                that.batchIndex = i;
                that.setData({
                    batchName: that.data.batchItem[i].name,
                    batchNum: that.data.batchItem[i].value
                });
                break;
            }
        }
        that.setData({
            "openCollege.showMore": true,
            "openCollege.pn": 1
        }, function() {
            that.getMajorCollege();
        });
    },
    dataInfo: function dataInfo() {
        this.showPopup();
    }
}, _defineProperty(_Page, "showPopup", function showPopup() {
    this.setData({
        "popup.wrapAnimate": "wrapAnimate",
        "popup.bgOpacity": 0,
        "popup.popupFlag": true,
        "popup.popupAnimate": "popupAnimate"
    });
}), _defineProperty(_Page, "hidePopup", function hidePopup() {
    var _this4 = this;
    this.setData({
        "popup.wrapAnimate": "wrapAnimateOut",
        "popup.bgOpacity": .7,
        "popup.popupAnimate": "popupAnimateOut"
    });
    setTimeout(function() {
        _this4.setData({
            "popup.popupFlag": false
        });
    }, 200);
}), _Page));