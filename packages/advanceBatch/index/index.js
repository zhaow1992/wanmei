function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}

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

var apiCommon = require("../../../utils/api.js");

var advanceArr = [];

// 用于存储递归结果（扁平数据）
var admissionArr = [];

var timer = void 0;

Page({
    data: {
        yearIndex: 0,
        bufenLoad: true,
        // previewlFlag1:true,
        currentChooseType: "全部",
        navigationText: "2019提前批",
        keyword: "",
        current: 0,
        firstCurrent: 0,
        secondCurrent: 0,
        page: 1,
        typeId: "",
        advanceData: [],
        admissionArr: [],
        scrollH: 0,
        noData: false,
        showLoading: false,
        allLoading: false,
        showMore: false,
        isVIP: false,
        year: [],
        currentYear: "",
        system: "ios",
        popup: {
            showLoad: true,
            popupFlag: false,
            wrapAnimate: "",
            popupAnimate: "",
            bgOpacity: ""
        }
    },
    changeYear: function changeYear(e) {
        var _this = this;
        this.setData({
            currentYear1: this.data.historyYear[e.detail.value],
            yearIndex: e.detail.value,
            bufenLoad: true
        }, function() {
            _this.PreEnterFraction();
        });
    },
    showToast: function showToast(e) {
        this.setData({
            previewlFlag1: true,
            bufenLoad: true,
            currentCollegeName: e.currentTarget.dataset.name,
            currentAdmissCode: e.currentTarget.dataset.admisscode,
            currentYear1: this.data.historyYear[0],
            yearIndex: 0
        });
        this.collegeId = e.currentTarget.dataset.id;
        this.PreEnterFraction();
    },
    //获取院校录取信息
    PreEnterFraction: function PreEnterFraction() {
        var _this2 = this;
        var that = this;
        var data = {
            provinceId: this.data.cityId,
            year: this.data.currentYear1,
            collegeId: this.collegeId,
            admissCode: this.data.currentAdmissCode
        };
        api.getPreEnterFraction("ScoreLines/PreEnterFractions/Get", "POST", data).then(function(res) {
            if (res.isSuccess) {
                that.setData({
                    admissionArr: res.result,
                    bufenLoad: false
                });
            } else {
                _this2.setData({
                    bufenLoad: false
                });
            }
            // let data = res.result;
            // admissionArr = [];
            // traverseTree(data,'admission')
            // this.setData({
            //   admissionArr,
            //   bufenLoad:false
            // })
                });
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
    showYear: function showYear() {
        this.setData({
            isShowYear: !this.data.isShowYear
        });
    },
    setCurrentType: function setCurrentType(e) {
        var _this4 = this;
        this.setData({
            currentChoose: e.detail.chooseArr,
            lastType: e.detail.lastType,
            advanceData: [],
            previewlFlag: false,
            keyword: "",
            page: 1
        }, function() {
            _this4.getAdvanceData1();
        });
    },
    chooseYear: function chooseYear(e) {
        var _this5 = this;
        var year = e.currentTarget.dataset.year;
        this.setData({
            showLoading: true,
            currentYear: year,
            advanceData: [],
            isShowYear: false,
            page: 1
        }, function() {
            _this5.getQueryFilter();
        });
    },
    getAllAdvanceData: function getAllAdvanceData() {
        this.setData({
            currentChoose: [],
            advanceData: [],
            lastType: "",
            previewlFlag: false,
            page: 1
        });
        this.getAdvanceData1();
    },
    //查询提前批数据
    getAdvanceData1: function getAdvanceData1() {
        var _this6 = this;
        if (!this.data.isVIP) {
            this.setData({
                allLoading: false
            });
            return;
        }
        var that = this;
        if (this.data.page == 1) {
            that.setData({
                showLoading: true
            });
        }
        var data = {
            keywords: this.data.keyword || "",
            pageIndex: this.data.page,
            pageSize: 10,
            provinceId: this.data.userInfo[0].Province,
            year: this.data.currentYear
        };
        if (this.data.currentChoose) {
            for (var i = 0; i < this.data.currentChoose.length; i++) {
                var obj = _defineProperty({}, "type" + (i + 1), this.data.currentChoose[i].type);
                data = Object.assign(data, obj);
            }
        }
        api.getAdvanceData1("TZY/PreFraction/V3/Query", "post", data).then(function(res) {
            var that = _this6;
            var data = res.result.items;
            if (res.result.items.length > 0) {
                //嵌套格式转扁平化格式
                advanceArr = [];
                traverseTree(data, "list");
                if (_this6.data.page > 1) {
                    var advanceData = that.data.advanceData;
                    advanceData.forEach(function(ele) {
                        advanceArr.forEach(function(el) {
                            if (ele.type == el.type && ele.level == el.level) {
                                ele.colleges = [].concat(_toConsumableArray(ele.colleges), _toConsumableArray(el.colleges));
                            }
                        });
                    });
                    var result = [];
                    for (var i = 0; i < advanceArr.length; i++) {
                        var obj = advanceArr[i];
                        var type = obj.type;
                        var level = obj.level;
                        var isExist = false;
                        for (var j = 0; j < advanceData.length; j++) {
                            var aj = advanceData[j];
                            var n = aj.type;
                            var m = aj.level;
                            if (n == type && m == level) {
                                isExist = true;
                                break;
                            }
                        }
                        if (!isExist) {
                            result.push(obj);
                        }
                    }
                    advanceData = [].concat(_toConsumableArray(advanceData), result);
                    that.setData({
                        advanceData: advanceData,
                        showLoading: false
                    });
                } else {
                    that.setData({
                        advanceData: that.data.advanceData.concat(advanceArr),
                        showLoading: false
                    });
                }
            } else {
                _this6.setData({
                    noData: true
                });
            }
            _this6.setData({
                allLoading: false,
                showLoading: false
            });
        });
    },
    //打开目录抽屉
    openCatalog: function openCatalog(e) {
        this.setData({
            previewlFlag: true
        });
    },
    //关闭目录抽屉
    closeCatalog: function closeCatalog() {
        this.setData({
            previewlFlag: false,
            previewlFlag1: false,
            closePreviewAnimation: "visited"
        });
    },
    noPay: function noPay() {
        app.payPrompt();
    },
    payBtn: function payBtn(e) {
        var bigType = e.currentTarget.dataset.bigtype;
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/packages/paySystem/memberCardDetail/memberCardDetail"
        });
    },
    goBindCard: function goBindCard() {
        wx.navigateTo({
            url: "/pages/card/card"
        });
    },
    applyCard: function applyCard() {
        var that = this;
        that.setData({
            applyCardLoading: true,
            applyCardTime: 180
        });
        var userNumId = wx.getStorageSync("userInfo")[0].UserId;
        var domain = app.globalData.domain;
        //记得改  qa-ch5.wmei.cn
                apiCommon.ApplyMWebPay("Users/ApplyMWebPay", "POST", userNumId, domain).then(function(res) {
            if (res.isSuccess) {
                app.globalData.applyCardFlag = true;
                that.setData({
                    applyCardLoading: false,
                    banApplyCard: true
                }, function() {
                    that.applyPopup();
                    timer = setInterval(function() {
                        //倒计时
                        var applyCardTime = that.data.applyCardTime - 1;
                        if (applyCardTime <= 0) {
                            that.setData({
                                banApplyCard: false
                            });
                            clearInterval(timer);
                        } else {
                            that.setData({
                                applyCardTime: applyCardTime
                            });
                        }
                    }, 1e3);
                });
            } else {
                that.setData({
                    applyCardLoading: false
                });
                wx.showToast({
                    title: res.message,
                    icon: "none"
                });
            }
        });
    },
    // 申请会员卡弹框
    applyPopup: function applyPopup() {
        this.selectComponent("#hide")._showTap();
    },
    hideTapIndex: function hideTapIndex() {
        var that = this;
        that.selectComponent("#hide").hidePopupFunc();
    },
    onLoad: function onLoad(options) {
        var _this7 = this;
        var that = this;
        this.pn = 1;
        //顶部搜索分页
                var cityName = "";
        var cityId = wx.getStorageSync("cityId").cityId;
        var cityList = wx.getStorageSync("cityList");
        cityList.forEach(function(ele) {
            if (ele.numId == cityId) {
                cityName = ele.name;
            }
        });
        this.setData({
            cityId: cityId,
            cityName: cityName,
            userInfo: wx.getStorageSync("userInfo"),
            navigationText: options.year + "提前批",
            year: JSON.parse(options.year)
        }, function() {
            _this7.setData({
                currentYear: _this7.data.year[0]
            });
            that.getQueryFilter();
        });
        if (this.data.userInfo[0].UserType > 1) {
            this.setData({
                isVIP: true
            });
        }
        if (app.globalData.system == "ios") {
            that.setData({
                system: "ios"
            });
        } else {
            that.setData({
                system: "android"
            });
        }
        this.getScrollH();
        //获取提前批顶部筛选条件
                this.setData({
            allLoading: true
        });
        this.getConfigYears(cityId);
    },
    //根据省份获取年份数据
    getConfigYears: function getConfigYears(cityId) {
        var _this8 = this;
        api.getConfigYears("ScoreLines/PreEnterFractions/GetConfigYears?provinceId=" + cityId, "POST").then(function(res) {
            if (res.isSuccess) {
                if (res.result.years.length > 0) {
                    _this8.setData({
                        historyYear: res.result.years,
                        currentYear1: res.result.years[0]
                    });
                }
            }
        });
    },
    // 搜索
    queryByCollegeOrKeyWord: function queryByCollegeOrKeyWord() {
        this.setData({
            showLoading: true,
            advanceData: [],
            lastType: "",
            currentChoose: [],
            page: 1
        });
        this.getScrollH();
        this.getAdvanceData1();
    },
    goMajorDetail: function goMajorDetail(e) {
        // let majorcode = e.currentTarget.dataset.majorcode;
        // if (majorcode && majorcode.length == 6) {
        //   wx.navigateTo({
        //     url: '/packages/selectMajor/majorDetail/majorDetail?majorcode=' + majorcode + '&cityid=' + this.data.userInfo[0].Province,
        //   })
        // } else if (majorcode && majorcode.length == 4) {
        //   wx.navigateTo({
        //     url: '/packages/selectMajor/middleMajorDetail/middleMajorDetail?majorcode=' + majorcode + '&cityid=' + this.data.userInfo[0].Province,
        //   })
        // }
    },
    // 计算dom高度
    getScrollH: function getScrollH() {
        var that = this;
        if (this.data.isVIP) {
            var item = wx.createSelectorQuery();
            item.select("#head").boundingClientRect();
            item.exec(function(res) {
                console.log(res);
                that.setData({
                    scrollH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
                });
            });
            item.select(".headerH").boundingClientRect();
            item.exec(function(res) {
                console.log(res);
                that.setData({
                    headerH: res[1].height
                });
            });
            item.select(".planBox").boundingClientRect();
            item.exec(function(res) {
                console.log(res);
                that.setData({
                    planBoxH: res[2].height - res[1].height
                });
            });
        }
    },
    //获取提前批顶部筛选条件
    getQueryFilter: function getQueryFilter() {
        var _this9 = this;
        var data = {
            provinceId: this.data.userInfo[0].Province,
            // provinceId: 850,
            year: this.data.currentYear
        };
        api.getQueryFilter("TZY/PreFraction/V2/QueryFilter", "POST", data).then(function(res) {
            // let data = wx.getStorageSync('advanceData');
            res.result.forEach(function(ele) {
                ele.id = 1;
                // ele.level=0;
                                ele.type = ele.type;
            });
            _this9.setData({
                queryFilterData: res.result
            });
            if (res.result.length == 0) {
                _this9.setData({
                    allLoading: false,
                    showLoading: false
                });
            }
            if (res.result.length > 0) {
                _this9.getAdvanceData1();
            }
        });
    },
    //监听input
    input: function input(e) {
        this.setData({
            keyword: e.detail.value
        });
        if (!e.detail.value) {
            this.setData({
                showLoading: true,
                advanceData: []
            });
            this.getQueryFilter();
        }
    },
    //清除inpout
    clearInput: function clearInput() {
        this.setData({
            keyword: "",
            showLoading: true,
            advanceData: []
        });
        this.getQueryFilter();
    },
    //切换tab
    chkTab: function chkTab(e) {
        var _e$currentTarget$data = e.currentTarget.dataset, index = _e$currentTarget$data.index, type = _e$currentTarget$data.type;
        this.setData({
            intoView: "view" + 0,
            showLoading: true,
            page: 1,
            showMore: false,
            noData: false
        });
        switch (type) {
          case "0":
            this.setData({
                current: index,
                firstCurrent: 0,
                secondCurrent: 0,
                typeId: this.data.queryFilterData[index].subset[0].numId
            });
            // this.getAdvanceData();
                        break;

          case "1":
            var typeid = this.data.queryFilterData[this.data.current].subset[index].subset.length > 0 ? this.data.queryFilterData[this.data.current].subset[index].subset[this.data.secondCurrent].numId : this.data.queryFilterData[this.data.current].subset[index].numId;
            console.log(typeid);
            this.setData({
                firstCurrent: index,
                typeId: typeid
            });
            // this.getAdvanceData();
                        break;

          case "2":
            this.setData({
                secondCurrent: index,
                typeId: this.data.queryFilterData[this.data.current].subset[this.data.firstCurrent].subset[index].numId
            });
            // this.getAdvanceData();
                        break;
        }
        this.getScrollH();
    },
    //加载更多
    getMore: function getMore() {
        var _this10 = this;
        this.getScrollH();
        this.setData({
            showMore: true
        });
        // this.pn = this.pn + 1;
                this.setData({
            page: ++this.data.page
        }, function() {
            _this10.getAdvanceData1();
        });
    },
    //院校详情
    toCollegeDetail: function toCollegeDetail(e) {
        var collegeId = e.currentTarget.dataset.id;
        if (collegeId) {
            wx.navigateTo({
                url: "/packages/findUniversity/collegeDetail/collegeDetail?numId=" + collegeId
            });
        }
    }
});

// 递归函数
var traverseTree = function traverseTree(ele, type) {
    if (type == "admission") {
        ele.forEach(function(el, index) {
            admissionArr.push({
                type: el.type,
                level: el.level,
                majors: el.majors
            });
            el.subset && el.subset.length > 0 ? traverseTree(el.subset, "admission") : "";
            // 子级递归
                });
    } else {
        ele.forEach(function(el, index) {
            advanceArr.push({
                type: el.type,
                level: el.level,
                colleges: el.colleges,
                remark: el.remark,
                index: index
            });
            el.subset && el.subset.length > 0 ? traverseTree(el.subset, "list") : "";
            // 子级递归
                });
    }
};