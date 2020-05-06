var app = getApp();

var api = require("../api.js");

var sensors = require("./../../../utils/sensors.js");

Page({
    data: {
        middleMajor: null,
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
        middleName: "",
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
        filterH: 0
    },
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        var data = {
            SA_share_type: "专业中类",
            SA_share_content: "我正在看" + that.data.middleName + "的介绍"
        };
        app.sensors.track("ShareClick", sensors.ShareClick(data));
        if (res.from === "button") {}
        return {
            title: "我正在看" + that.data.middleName + "的介绍",
            imageUrl: "http://bapp.wmei.cn/share/major.png",
            path: "/packages/selectMajor/middleMajorDetail/middleMajorDetail?majorcode=" + that.majorcode + "&cityid=" + that.cityId + "&share=true"
        };
    },
    InsertSA: function InsertSA(type, initRes, result) {
        var middleMajor = this.data.middleMajor;
        var SA_code = "";
        var SA_name = "";
        var SA_isBen = "";
        var SA_main = "";
        var SA_minor = "";
        if (initRes) {
            SA_code = middleMajor.code;
            SA_name = middleMajor.name;
            SA_isBen = middleMajor.typeId == 0 ? "本科" : "专科";
            SA_main = middleMajor.bigType;
            SA_minor = "";
        }
        var SA_content_type = type;
        var SA_type = "中类专业";
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
    goMajorDetail: function goMajorDetail(e) {
        wx.navigateTo({
            url: "../majorDetail/majorDetail?majorcode=" + e.currentTarget.dataset.majorcode + "&cityid=" + this.cityId
        });
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
                this.getMiddleMajors();
        //中类详情
                this.getCareer();
        //职业方向
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
    getMajorCollege: function getMajorCollege() {
        var that = this;
        if (!that.data.openCollege.showMore) return;
        if (that.data.openCollege.pn == 1) {
            this.setData({
                loading: true
            });
        }
        var json = {
            provinceId: that.cityId,
            course: that.data.isNewGK ? -1 : that.data.course,
            batch: that.data.isNewGK ? 0 : that.data.batchNum,
            majorCode: that.majorcode,
            pageIndex: that.data.openCollege.pn,
            pageSize: 10
        };
        api.getMajorCollege("Majors/V2/OpenColleges", "POST", json).then(function(res) {
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
        // if(that.data.currentTab == 1 && !that.data.isNewGK){
        //   let filter = wx.createSelectorQuery();
        //     filter.select('#filter').boundingClientRect();
        //     filter.exec(r=>{
        //       that.setData({ 
        //         filterH: r[0].height
        //       })
        //     })
        // }
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
                this.InsertSA(this.data.middleMajor.typeId == 1 ? "专业职业方向" : "专业开设院校", true, true);
                break;

              case 2:
                var result = false;
                if (this.data.openCollege.openCollegeList.length > 0) {
                    result: true;
                }
                ;
                this.InsertSA("专业职业方向", true, result);
                break;
            }
        }
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
                this.InsertSA(this.data.middleMajor.typeId == 1 ? "专业职业方向" : "专业开设院校", true);
                break;

              case 2:
                var result = false;
                if (this.data.openCollege.openCollegeList.length > 0) {
                    result: true;
                }
                ;
                this.InsertSA("专业职业方向", true);
                break;
            }
            this.setData({
                currentTab: e.currentTarget.dataset.current
            });
        }
        this.getSwiperH();
    },
    // 初始化tab-专科无开设院校
    initTab: function initTab(isBOrZ) {
        var _this3 = this;
        var tab = this.data.tab;
        tab.push({
            name: "专业详情",
            value: 0
        }, {
            name: "职业方向",
            value: 1
        });
        // switch (parseInt(isBOrZ)) {
        //   case 0: tab.push({ name: '专业详情', value: 0 }, { name: '开设院校', value: 1 }, { name: '职业方向', value: 2 }); break;
        //   case 1: tab.push({ name: '专业详情', value: 0 }, { name: '职业方向', value: 1 }); break;
        // }
                this.setData({
            tab: tab
        }, function() {
            _this3.getSwiperH();
        });
    },
    getMiddleMajors: function getMiddleMajors() {
        var that = this;
        api.GetMiddleMajors("Majors/GetMiddleDetail", "POST", that.cityId, that.majorcode).then(function(res) {
            if (res.isSuccess) {
                that.initTab(res.result.typeId);
                that.queryVideos(res.result.middleName);
                that.selectComponent("#navigationcustom").setNavigationAll(res.result.middleName, true);
                that.setData({
                    isBOrZ: res.result.typeId,
                    smallMajorList: res.result.smallMajors,
                    middleMajor: res.result.middleMajor,
                    middleName: res.result.middleName,
                    showLoad: false
                }, function() {
                    that.InsertSA("专业主页", true, true);
                });
            } else {
                that.InsertSA("专业主页", false, false);
            }
        });
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
    }
});