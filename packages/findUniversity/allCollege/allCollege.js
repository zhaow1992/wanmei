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

var app = getApp();

var sensors = require("./../../../utils/sensors.js");

Page((_Page = {
    cityId: "",
    pageIndex: 1,
    levels: {},
    typeCount: 0,
    totalCount: 0,
    locateCount: 0,
    data: {
        chooseNumber: {
            level: 0,
            classify: 0,
            isBen: 0,
            type: 0,
            province: 0
        },
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
            url: "/pages/globalSearch/globalSearch?mode=college"
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
            console.log("到底");
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
        var collegeList = that.data.collegeList[index];
        var arr = [];
        if (collegeList.is985 == 1) {
            arr.push("985");
        }
        if (collegeList.is211 == 1) {
            arr.push("211");
        }
        if (collegeList.firstClass) {
            arr.push("双一流");
        }
        var numId = collegeList.numId;
        var SA_code = numId;
        var SA_name = collegeList.name;
        var SA_province = collegeList.city;
        var SA_isBen = collegeList.isBen;
        var SA_level = arr.join("|");
        var SA_classify = collegeList.classify;
        var SA_type = collegeList.type;
        var SA_num = index;
        var data = {
            SA_code: SA_code,
            SA_name: SA_name,
            SA_province: SA_province,
            SA_isBen: SA_isBen,
            SA_level: SA_level,
            SA_classify: SA_classify,
            SA_type: SA_type,
            SA_num: SA_num
        };
        wx.navigateTo({
            url: "/packages/findUniversity/collegeDetail/collegeDetail?numId=" + numId
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
        var chooseNumber = that.data.chooseNumber;
        var levelArr = [];
        if (levels.is985 == true) levelArr.push("985");
        if (levels.is211 == true) levelArr.push("211");
        if (levels.firstClass == true) levelArr.push("双一流");
        var SA_province = that.provinceArr.join("|");
        var SA_level = levelArr.join("|");
        var SA_classify = classify.join("|");
        var SA_isBen = parseInt(type) == 1 ? "本科" : parseInt(isBen) == 0 ? "专科" : "";
        var SA_type = parseInt(isBen) == 1 ? "公立" : parseInt(type) == 0 ? "私立" : "";
        var parameter = {
            keyword: "",
            provinceIds: provinceIds,
            classify: classify,
            type: type,
            isBen: isBen,
            is985: levels.is985 == true ? true : false,
            is211: levels.is211 == true ? true : false,
            isFirstClass: levels.firstClass == true ? true : false,
            index: pageIndex,
            count: pageSize
        };
        _api2.default.queryColleges("api/search/find-colleges", "POST", parameter).then(function(res) {
            that.setData({
                collegeList: that.data.collegeList.concat(res.result.items)
            });
            that.totalCount = res.result.totalCount;
            var SA_number = res.result.totalCount;
            var data = {
                SA_province: SA_province,
                SA_level: SA_level,
                SA_classify: SA_classify,
                SA_isBen: SA_isBen,
                SA_type: SA_type,
                SA_number: SA_number
            };
            if (SA_province != "" || SA_level != "" || SA_classify != "" || SA_isBen != "" || SA_type != "") {
                // app.sensors.track('ColgFilter', sensors.ColgFilter(data));
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
        if (selectTerrace[id].checked) {
            that.setData({
                "chooseNumber.level": that.data.chooseNumber.level - 1
            });
            selectTerrace[id].checked = false;
        } else {
            that.setData({
                "chooseNumber.level": that.data.chooseNumber.level + 1
            });
            selectTerrace[id].checked = true;
        }
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
        switch (parseInt(id)) {
          case 0:
            that.setData({
                "chooseNumber.type": 1
            });
            break;

          case 1:
            that.setData({
                "chooseNumber.type": 1
            });
            break;

          default:
            that.setData({
                "chooseNumber.type": 0
            });
            break;
        }
        that.setData({
            createChecked: id
        });
    },
    selectDegreeTap: function selectDegreeTap(e) {
        var that = this;
        var id = e.currentTarget.id;
        var degreeChecked = that.data.degreeChecked;
        switch (parseInt(id)) {
          case 0:
            that.setData({
                "chooseNumber.isBen": 1
            });
            break;

          case 1:
            that.setData({
                "chooseNumber.isBen": 1
            });
            break;

          default:
            that.setData({
                "chooseNumber.isBen": 0
            });
            break;
        }
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
            "chooseNumber.classify": that.typeCount,
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
            that.provinceArr = [];
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
                that.provinceArr.splice(that.provinceArr.findIndex(function(item) {
                    return item === cityList[id].name;
                }), 1);
                that.locateCount--;
            } else {
                that.locateCount++;
                national = false;
                that.provinceArr.push(cityList[id].name);
                cityList[id].checked = true;
            }
        }
        if (that.locateCount == 0) {
            national = true;
        }
        that.setData({
            "chooseNumber.province": that.locateCount,
            cityList: cityList,
            national: national
        });
    }
}, _defineProperty(_Page, "showRightMeun", function showRightMeun() {
    var that = this;
    that.selectComponent("#rightdrawermenu").shaixuanTap();
}), _defineProperty(_Page, "onLoad", function onLoad(options) {
    var that = this;
    that.provinceArr = [];
    that.cityId = wx.getStorageSync("cityId");
    that.selectComponent("#navigationcustom").setNavigationAll("全部院校", true);
    that.queryCollegeList([], {}, [], [], [], false, -1, -1, false, false, "", 1);
    that.setData({
        menuTop: app.globalData.navigationCustomStatusHeight + app.globalData.navigationCustomCapsuleHeight
    });
    that.getMenuHeight();
}), _defineProperty(_Page, "onShow", function onShow() {
    app.resetOnce(this, "oneClick");
}), _Page));