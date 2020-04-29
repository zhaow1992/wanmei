var _Page;

var _api = require("../api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
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

// packages/findUniversity/allCollege/allCollege.js
// var tmpdata = require("../../../tmpdata");
var app = getApp();

Page((_Page = {
    cityId: "",
    pageIndex: 1,
    levels: {},
    typeCount: 0,
    totalCount: 0,
    locateCount: 0,
    data: {
        showLoad: false,
        national: true,
        noType: true,
        oneClick: false,
        menuHeight: "",
        areaListDown: "",
        typeListDown: "",
        typeListOpen: false,
        areaListOpen: false,
        createChecked: -1,
        degreeChecked: -1,
        hotTab: true,
        currentId: 0,
        cityList: [ {
            name: "A 安徽",
            id: 844,
            checked: false
        }, {
            name: "B 北京",
            id: 834,
            checked: false
        }, {
            name: "C 重庆",
            id: 854,
            checked: false
        }, {
            name: "F 福建",
            id: 845,
            checked: false
        }, {
            name: "G 广东",
            id: 851,
            checked: false
        }, {
            name: "G 广西",
            id: 852,
            checked: false
        }, {
            name: "G 贵州",
            id: 856,
            checked: false
        }, {
            name: "G 甘肃",
            id: 860,
            checked: false
        }, {
            name: "H 海南",
            id: 853,
            checked: false
        }, {
            name: "H 河南",
            id: 848,
            checked: false
        }, {
            name: "H 黑龙江",
            id: 841,
            checked: false
        }, {
            name: "H 湖北",
            id: 849,
            checked: false
        }, {
            name: "H 湖南",
            id: 850,
            checked: false
        }, {
            name: "H 河北",
            id: 1128,
            checked: false
        }, {
            name: "J 江苏",
            id: 1,
            checked: false
        }, {
            name: "J 吉林",
            id: 840,
            checked: false
        }, {
            name: "J 江西",
            id: 846,
            checked: false
        }, {
            name: "L 辽宁",
            id: 839,
            checked: false
        }, {
            name: "N 宁夏",
            id: 862,
            checked: false
        }, {
            name: "N 内蒙古",
            id: 838,
            checked: false
        }, {
            name: "Q 青海",
            id: 864,
            checked: false
        }, {
            name: "S 上海",
            id: 842,
            checked: false
        }, {
            name: "S 山东",
            id: 847,
            checked: false
        }, {
            name: "S 山西",
            id: 837,
            checked: false
        }, {
            name: "S 陕西",
            id: 859,
            checked: false
        }, {
            name: "S 四川",
            id: 855,
            checked: false
        }, {
            name: "T 天津",
            id: 835,
            checked: false
        }, {
            name: "X 新疆",
            id: 1120,
            checked: false
        }, {
            name: "X 西藏",
            id: 858,
            checked: false
        }, {
            name: "Y 云南",
            id: 857,
            checked: false
        }, {
            name: "Z 浙江",
            id: 843,
            checked: false
        }, {
            name: "",
            checked: false
        } ],
        menuTop: 0,
        name: "888",
        item: "123",
        collegeList: [],
        openFourthTabStatus: false,
        openThirdTabStatus: false,
        openSecondTabStatus: false,
        openFirstTabStatus: false,
        wrapAnimate: "",
        selectTerrace: [ {
            name: "双一流",
            checked: false
        }, {
            name: "985",
            checked: false
        }, {
            name: "211",
            checked: false
        } ],
        /**院校类型 */
        universityType: [ {
            name: "综合",
            checked: false
        }, {
            name: "理工",
            checked: false
        }, {
            name: "财经",
            checked: false
        }, {
            name: "农林",
            checked: false
        }, {
            name: "医药",
            checked: false
        }, {
            name: "师范",
            checked: false
        }, {
            name: "体育",
            checked: false
        }, {
            name: "省属",
            checked: false
        }, {
            name: "政法",
            checked: false
        }, {
            name: "艺术",
            checked: false
        }, {
            name: "民族",
            checked: false
        }, {
            name: "军事",
            checked: false
        }, {
            name: "语言",
            checked: false
        }, {
            name: "其他",
            checked: false
        }, {
            name: "",
            checked: false
        } ],
        collegeDegree: [ {
            name: "本科"
        }, {
            name: "专科"
        } ],
        collegeCreate: [ {
            name: "公办"
        }, {
            name: "民办"
        } ]
    },
    goPublicSearch: function goPublicSearch() {
        var that = this;
        if (!app.checkOnce(that, "oneClick")) return;
        wx.navigateTo({
            url: "/packages/common/publicSearch/publicSearch",
            success: function success(res) {},
            fail: function fail(res) {},
            complete: function complete(res) {}
        });
    },
    checkProvinceIds: function checkProvinceIds() {
        var that = this;
        var provinceIds = [];
        if (that.locateCount > 0) {
            var cityList = that.data.cityList;
            for (var i in cityList) {
                if (cityList[i].checked) {
                    provinceIds.push(cityList[i].id);
                }
            }
        }
        return provinceIds;
    },
    getNextPage: function getNextPage() {
        var that = this;
        var len = that.data.collegeList.length;
        if (len < that.totalCount) {
            that.pageIndex++;
            that.queryCollegeList(that.checkProvinceIds(), that.checkLevels(), that.checkClassify(), [], [], false, that.data.createChecked, that.data.degreeChecked, false, false, "", that.pageIndex);
        } else {}
    },
    confirmSelectTap: function confirmSelectTap() {
        var that = this;
        that.data.collegeList = [];
        that.pageIndex = 1;
        that.queryCollegeList(that.checkProvinceIds(), that.checkLevels(), that.checkClassify(), [], [], false, that.data.createChecked, that.data.degreeChecked, false, false, "", that.pageIndex);
        this.selectComponent("#rightdrawermenu").maskClose();
    },
    /**筛选重置 */
    resetSelectTap: function resetSelectTap() {
        var that = this;
        var universityType = that.data.universityType;
        var otherCityList = that.data.otherCityList;
        var cityList = that.data.cityList;
        var selectTerrace = that.data.selectTerrace;
        for (var i in universityType) {
            universityType[i].checked = false;
        }
        for (var _i in cityList) {
            cityList[_i].checked = false;
        }
        for (var _i2 in selectTerrace) {
            selectTerrace[_i2].checked = false;
        }
        that.typeCount = 0;
        that.locateCount = 0;
        that.setData({
            universityType: universityType,
            cityList: cityList,
            selectTerrace: selectTerrace,
            createChecked: -1,
            national: true,
            noType: true,
            degreeChecked: -1
        });
    },
    goCollegeDetail: function goCollegeDetail(e) {
        var that = this;
        if (!app.checkOnce(that, "oneClick")) return;
        var index = e.currentTarget.dataset.id;
        var numId = that.data.collegeList[index].numId;
        wx.navigateTo({
            url: "/packages/findUniversity/collegeDetail/collegeDetail?numId=" + numId,
            success: function success(res) {},
            fail: function fail(res) {},
            complete: function complete(res) {}
        });
    },
    // 处理学科范围（综合）
    checkClassify: function checkClassify() {
        var that = this;
        var classify = [];
        var universityType = that.data.universityType;
        for (var i in universityType) {
            if (universityType[i].checked) {
                classify.push(universityType[i].name);
            }
        }
        return classify;
    },
    checkLevels: function checkLevels() {
        var that = this;
        var levels = {
            firstClass: false,
            is985: false,
            is211: false
        };
        if (that.data.selectTerrace[0].checked) {
            levels.firstClass = true;
        }
        if (that.data.selectTerrace[1].checked) {
            levels.is985 = true;
        }
        if (that.data.selectTerrace[2].checked) {
            levels.is211 = true;
        }
        return levels;
    },
    queryCollegeList: function queryCollegeList(provinceIds, levels, classify, natures, arts, isArt, isBen, type, isSingleRecruit, wordSegment, keywords, pageIndex, pageSize) {
        var that = this;
        levels = levels || {};
        classify = classify || [];
        natures = natures || [];
        arts = arts || [];
        pageSize = pageSize || 10;
        //provinceIds.push(that.cityId.cityId);
                _api2.default.queryColleges("Colleges/Query", "POST", provinceIds, levels, classify, natures, arts, isArt, isBen, type, isSingleRecruit, wordSegment, keywords, pageIndex, pageSize).then(function(res) {
            var collegeList = that.data.collegeList;
            if (res.result && res.result.items) {
                var serverCollege = res.result.items;
                that.totalCount = res.result.totalCount;
                for (var i in serverCollege) {
                    var college = {};
                    college.numId = serverCollege[i].numId;
                    college.name = serverCollege[i].cnName;
                    var create = "公办";
                    if (serverCollege[i].isCivilianRun > 0) {
                        create = "民办";
                    }
                    college.collegeTag = serverCollege[i].classify + " / " + serverCollege[i].belong + " / " + create;
                    var collegeTerrace = [];
                    if (serverCollege[i].level) {
                        collegeTerrace = serverCollege[i].level.split(" ");
                        collegeTerrace.pop();
                        // college.collegeTerrace = collegeTerrace;
                                        }
                    for (var _i3 = 0; _i3 < res.result.items.length; _i3++) {
                        var tags = [];
                        for (var j = 0; j < collegeTerrace.length; j++) {
                            if (collegeTerrace[j] == "211" || collegeTerrace[j] == "985" || collegeTerrace[j] == "双一流") {
                                tags.push(collegeTerrace[j]);
                            }
                        }
                        college.collegeTerrace = tags;
                    }
                    college.collegeIcon = serverCollege[i].logoUrl || "/image/collegeLogo.png";
                    college.city = serverCollege[i].provinceName;
                    collegeList.push(college);
                }
                that.setData({
                    collegeList: collegeList
                });
            }
        });
    },
    showRightMeun: function showRightMeun() {
        var that = this;
        that.selectComponent("#rightdrawermenu").shaixuanTap();
    },
    hideMaskTap: function hideMaskTap() {
        var that = this;
        that.selectComponent("#menu").hideMenu(that, "openFourthTabStatus");
    },
    /*选择热门标签 */
    selectHotTap: function selectHotTap(e) {
        var that = this;
        var id = e.currentTarget.id;
        var selectTerrace = that.data.selectTerrace;
        if (selectTerrace[id].checked) selectTerrace[id].checked = false; else selectTerrace[id].checked = true;
        that.setData({
            selectTerrace: selectTerrace
        });
    },
    catchMenu: function catchMenu() {},
    getMenuHeight: function getMenuHeight() {
        var that = this;
        that.setData({
            menuHeight: app.globalData.systemInfo.screenHeight - that.data.menuTop - 14.4 * app.globalData.systemInfo.screenWidth / 100
        });
    },
    openArea: function openArea() {
        var that = this;
        var areaListOpen = that.data.areaListOpen;
        that.setData({
            areaListOpen: !that.data.areaListOpen,
            areaListDown: that.data.areaListOpen == false ? "areaList-animate" : "areaList-animate-out"
        });
    },
    openType: function openType() {
        var that = this;
        var typeListOpen = that.data.typeListOpen;
        that.setData({
            typeListOpen: !that.data.typeListOpen,
            typeListDown: that.data.typeListOpen == false ? "typeList-animate" : "typeList-animate-out"
        });
    },
    selectCreateTap: function selectCreateTap(e) {
        var that = this;
        var id = e.currentTarget.id;
        var createChecked = that.data.createChecked;
        that.setData({
            createChecked: id
        });
    },
    selectDegreeTap: function selectDegreeTap(e) {
        var that = this;
        var id = e.currentTarget.id;
        var degreeChecked = that.data.degreeChecked;
        that.setData({
            degreeChecked: id
        });
    },
    catchMove: function catchMove() {},
    selectTypeTap: function selectTypeTap(e) {
        var that = this;
        var id = e.currentTarget.id;
        var universityType = that.data.universityType;
        var noType = false;
        if (id == "noType") {
            noType = true;
            that.typeCount = 0;
            for (var i in universityType) {
                universityType[i].checked = false;
            }
        } else {
            if (universityType[id].checked) {
                universityType[id].checked = false;
                that.typeCount--;
            } else {
                universityType[id].checked = true;
                that.typeCount++;
            }
        }
        if (that.typeCount == 0) {
            noType = true;
        }
        that.setData({
            universityType: universityType,
            noType: noType
        });
    },
    selectAreaTap: function selectAreaTap(e) {
        var that = this;
        var areatype = e.currentTarget.dataset.areatype;
        var id = e.currentTarget.id;
        var national = false;
        var cityList = that.data.cityList;
        if (areatype == "fast") {
            national = true;
            that.locateCount = 0;
            for (var i in cityList) {
                cityList[i].checked = false;
            }
        } else {
            if (id == cityList.length - 1) {
                return;
            }
            if (cityList[id].checked) {
                cityList[id].checked = false;
                that.locateCount--;
            } else {
                that.locateCount++;
                national = false;
                cityList[id].checked = true;
            }
        }
        if (that.locateCount == 0) {
            national = true;
        }
        that.setData({
            cityList: cityList,
            national: national
        });
    }
}, _defineProperty(_Page, "showRightMeun", function showRightMeun() {
    var that = this;
    that.selectComponent("#rightdrawermenu").shaixuanTap();
}), _defineProperty(_Page, "onLoad", function onLoad(options) {
    var that = this;
    that.cityId = wx.getStorageSync("cityId");
    that.selectComponent("#navigationcustom").setNavigationAll("全部院校", true);
    that.queryCollegeList([], {}, [], [], [], false, -1, -1, false, false, "", 1);
    that.setData({
        menuTop: app.globalData.navigationCustomStatusHeight + app.globalData.navigationCustomCapsuleHeight
    });
    that.getMenuHeight();
    // let query = wx.createSelectorQuery();
    //    query.select('#topmenu').boundingClientRect();
    // query.exec(function (res) {
    //  
    // })
}), _defineProperty(_Page, "onReady", function onReady() {}), _defineProperty(_Page, "onShow", function onShow() {
    app.resetOnce(this, "oneClick");
}), _defineProperty(_Page, "onHide", function onHide() {}), _defineProperty(_Page, "onUnload", function onUnload() {}), 
_defineProperty(_Page, "onPullDownRefresh", function onPullDownRefresh() {}), _defineProperty(_Page, "onReachBottom", function onReachBottom() {}), 
_defineProperty(_Page, "onShareAppMessage", function onShareAppMessage() {}), _Page));