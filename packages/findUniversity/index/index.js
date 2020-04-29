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

//var tmpdata = require("../../../tmpdata");
var that;

Page((_Page = {
    cityId: "",
    pageIndex: 1,
    levels: {},
    typeCount: 0,
    totalCount: 0,
    locateCount: 0,
    data: {
        share: false,
        loginFlag: false,
        shaixuan: "",
        collegeData: false,
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
        tabList: [],
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
        } ],
        collegeTag: "综合  /  教育部  /  公办",
        down: false,
        tab: [ {
            name: "院校标签",
            checked: false
        }, {
            name: "院校类型",
            checked: false
        }, {
            name: "本/专科",
            checked: false
        }, {
            name: "公/民办",
            checked: false
        } ],
        collegeTerrace: [ "985", "211" ],
        collegeShowList: [],
        province: "黑龙江",
        focus: true,
        cardNameFlag: true,
        showChange: false,
        searchCollegeHistory: [],
        searchScoreLoad: false,
        value: "",
        hotSearchList: [],
        cunzaiTishi: false,
        tishiFlag: false,
        cepingTishi: false,
        userInfo: [],
        majorsearch: "false",
        newClassList: [],
        //video--list
        scoreLineArr: [],
        placeholder: "输入大学名称",
        majorList: [],
        searchSuccess: false,
        cls: "",
        flag: null,
        collegeScoreLineList: [],
        cityId: null,
        course: null,
        indexSearch: false,
        // 主页搜索标志 
        shaixuanCollege: {
            pn: 1,
            provinceId: 1,
            batch: 0,
            courseType: 0,
            totalScore: 0
        },
        scrolltolower: true
    },
    loginPopup: function loginPopup() {
        this.selectComponent("#loginPopup")._showTap();
    },
    goDetail: function goDetail(e) {
        var that = this;
        if (!this.data.loginFlag) {
            this.loginPopup();
            return;
        }
        var type = e.currentTarget.dataset.type;
        switch (type) {
          case "myCollege":
            that.goMyCollege();
            break;

            //我的院校
                      case "allCollege":
            that.goAllCollege();
            break;

            //全部院校
                      case "collegeCompare":
            that.goCollegeCompare();
            break;

            //院校对比
                      case "collegeRank":
            that.goCollegeRank();
            break;
            //大学排名
                }
    },
    changeNav: function changeNav(e) {
        var that = this;
        var current = e.detail.current;
        if (that.data.currentId == current) {} else {
            this.setData({
                currentId: current,
                collegeList: [],
                "shaixuanCollege.pn": 1,
                scrolltolower: true
            });
            var value = that.data.tabList[current].value;
            that.code = value;
            that.RecommendationQueryColleges(value);
        }
    },
    // 点击热门院校等等
    collegeTabTap: function collegeTabTap(e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        if (that.data.currentId == index) {} else {
            var value = e.currentTarget.dataset.value;
            that.code = value;
            that.setData({
                currentId: index,
                collegeList: [],
                "shaixuanCollege.pn": 1,
                scrolltolower: true
            });
            that.RecommendationQueryColleges(value);
        }
    },
    // 找大学-查询推荐院校列表
    RecommendationQueryColleges: function RecommendationQueryColleges(code) {
        var that = this;
        if (that.data.scrolltolower) {
            var pn = that.data.shaixuanCollege.pn;
            var provinceId = that.data.shaixuanCollege.provinceId;
            var batch = that.data.shaixuanCollege.batch;
            var courseType = that.data.shaixuanCollege.courseType;
            var totalScore = that.data.shaixuanCollege.totalScore;
            var isBen = that.data.degreeChecked;
            var collegeType = that.data.createChecked;
            var tags = {
                is985: that.data.selectTerrace[1].checked,
                is211: that.data.selectTerrace[2].checked,
                firstClass: that.data.selectTerrace[0].checked,
                isKey: false,
                isProvincial: false
            };
            var classify = [];
            for (var i = 0; i < that.data.universityType.length; i++) {
                if (that.data.universityType[i].checked == true) {
                    classify.push(that.data.universityType[i].name);
                }
            }
            classify.join("、");
            var provinceIds = [];
            for (var _i = 0; _i < that.data.cityList.length; _i++) {
                if (that.data.cityList[_i].checked == true) {
                    provinceIds.push(that.data.cityList[_i].id);
                }
            }
            _api2.default.RecommendationQueryColleges("TZY/Recommendation/QueryColleges", "POST", code, pn, provinceId, batch, courseType, totalScore, tags, classify, isBen, collegeType, provinceIds).then(function(res) {
                if (res.result.items.length > 0) {
                    if (pn == 1 && res.result.items.length < 10) {
                        that.setData({
                            scrolltolower: false,
                            noCollege: false
                        });
                    }
                    for (var _i2 = 0; _i2 < res.result.items.length; _i2++) {
                        var _tags = [];
                        for (var j = 0; j < res.result.items[_i2].tags.length; j++) {
                            if (res.result.items[_i2].tags[j] == "211" || res.result.items[_i2].tags[j] == "985" || res.result.items[_i2].tags[j] == "双一流") {
                                _tags.push(res.result.items[_i2].tags[j]);
                            }
                        }
                        res.result.items[_i2].tags = _tags;
                    }
                    that.setData({
                        collegeList: that.data.collegeList.concat(res.result.items),
                        collegeData: true
                    });
                } else {
                    if (pn == 1) {
                        that.setData({
                            noCollege: true,
                            scrolltolower: false
                        });
                    } else {
                        that.setData({
                            collegeData: true,
                            scrolltolower: false
                        });
                    }
                }
            });
        } else {
            that.setData({
                collegeData: true
            });
        }
    },
    // 找大学推荐专业列表-随机取10条
    MajorsRecommend: function MajorsRecommend(gender) {
        var that = this;
        _api2.default.MajorsRecommend("Majors/Recommend?gender=" + gender, "POST").then(function(res) {
            that.setData({
                tabList: res.result
            });
        });
    },
    selectHotTap: function selectHotTap(e) {
        var that = this;
        var id = e.currentTarget.id;
        var selectTerrace = that.data.selectTerrace;
        if (selectTerrace[id].checked) selectTerrace[id].checked = false; else selectTerrace[id].checked = true;
        that.setData({
            selectTerrace: selectTerrace
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
    queryCollegeList: function queryCollegeList(provinceIds, levels, classify, natures, arts, isArt, isBen, type, isSingleRecruit, wordSegment, keywords, pageIndex, pageSize) {
        var that = this;
        levels = levels || {};
        classify = classify || [];
        natures = natures || [];
        arts = arts || [];
        pageSize = pageSize || 10;
        //provinceIds.push(that.cityId.cityId);
                isBen = parseInt(that.data.degreeChecked);
        _api2.default.queryColleges("Colleges/Query", "POST", provinceIds, levels, classify, natures, arts, isArt, isBen, type, isSingleRecruit, wordSegment, keywords, pageIndex, pageSize).then(function(res) {
            var collegeList = that.data.collegeList;
            var collegeData = false;
            var showLoad = true;
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
                        college.collegeTerrace = collegeTerrace;
                    }
                    college.collegeIcon = serverCollege[i].logoUrl || "/image/collegeLogo.png";
                    college.city = serverCollege[i].cityName;
                    collegeList.push(college);
                }
                collegeData = true;
                showLoad = false;
            }
            that.setData({
                collegeList: collegeList,
                showLoad: showLoad,
                collegeData: collegeData
            });
        });
    },
    goCollegeCompare: function goCollegeCompare() {
        // wx.showToast({
        //   title: '院校对比暂未开放',
        //   icon:'none'
        // })
        if (!app.checkOnce(this, "oneClick")) return;
        wx.navigateTo({
            url: "../collegeCompare/collegeCompare"
        });
    },
    goCollegeRank: function goCollegeRank() {
        if (!app.checkOnce(this, "oneClick")) return;
        wx.navigateTo({
            url: "/packages/findUniversity/collegeRank/collegeRank"
        });
    },
    goMyCollege: function goMyCollege() {
        if (!app.checkOnce(this, "oneClick")) return;
        wx.navigateTo({
            url: "/packages/findUniversity/myCollege/myCollege"
        });
    },
    goAllCollege: function goAllCollege() {
        if (!app.checkOnce(this, "oneClick")) return;
        wx.navigateTo({
            url: "/packages/findUniversity/allCollege/allCollege"
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
    },
    /**显示右侧筛选菜单 */
    showRightMeun: function showRightMeun() {
        this.shaixuanTap();
    },
    /*选择院校标签 */
    selectTerraceTap: function selectTerraceTap(e) {
        var that = this;
        var id = e.currentTarget.id;
        var selectTerrace = that.data.selectTerrace;
        if (selectTerrace[id].checked) selectTerrace[id].checked = false; else selectTerrace[id].checked = true;
        that.setData({
            selectTerrace: selectTerrace
        });
    },
    onShow: function onShow() {
        var that = this;
        app.resetOnce(that, "oneClick");
        if (app.globalData.provinceList.length > 0) {
            if (app.globalData.provinceList.length == 25) {
                that.setData({
                    province: "全部"
                });
            } else if (app.globalData.provinceList.length > 1) {
                that.setData({
                    province: "多省"
                });
            } else {
                that.setData({
                    province: app.globalData.provinceList[0]
                });
            }
        }
    },
    chooseTabOne: function chooseTabOne() {
        this.setData({
            down: !this.data.down
        });
    }
}, _defineProperty(_Page, "chooseTabOne", function chooseTabOne() {
    this.setData({
        down: !this.data.down
    });
}), _defineProperty(_Page, "chooseTabOne", function chooseTabOne() {
    this.setData({
        down: !this.data.down
    });
}), _defineProperty(_Page, "chooseTabOne", function chooseTabOne() {
    this.setData({
        down: !this.data.down
    });
}), _defineProperty(_Page, "goSearch", function goSearch() {
    if (!app.checkOnce(this, "oneClick")) return;
    wx.navigateTo({
        url: "/pages/globalSearch/globalSearch?mode=college"
    });
}), _defineProperty(_Page, "redirect", function redirect(e) {
    //点击跳转到详情
    var that = this;
    var id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    var indexCls = e.currentTarget.dataset.cls;
    var ucode = e.currentTarget.dataset.ucode;
    var cls = this.data.cls;
    var flag = this.data.flag;
    if (flag == 1) {
        if (cls == "zhaodaxue") {
            wx.navigateTo({
                url: "../collegeDetail/collegeDetail?id=" + id
            });
        } else if (cls == "fenshuxian") {
            var scoreLineArr = that.data.scoreLineArr;
            var flag1 = false;
            var flag2 = false;
            if (scoreLineArr.length > 0) {
                if (scoreLineArr.length < 5) {
                    for (var i = 0; i < that.data.collegeList.length; i++) {
                        if (that.data.collegeList[i].CollegeId == id) {
                            for (var j = 0; j < scoreLineArr.length; j++) {
                                if (scoreLineArr[j].CollegeId == that.data.collegeList[i].CollegeId) {
                                    scoreLineArr.splice(j, 1);
                                    scoreLineArr.unshift(that.data.collegeList[i]);
                                    flag1 = true;
                                    break;
                                }
                            }
                            if (flag1 == false) {
                                scoreLineArr.unshift(that.data.collegeList[i]);
                            }
                            break;
                        }
                    }
                } else {
                    for (var _i3 = 0; _i3 < that.data.collegeList.length; _i3++) {
                        if (that.data.collegeList[_i3].CollegeId == id) {
                            for (var _j = 0; _j < scoreLineArr.length; _j++) {
                                if (scoreLineArr[_j].CollegeId == that.data.collegeList[_i3].CollegeId) {
                                    scoreLineArr.splice(_j, 1);
                                    scoreLineArr.unshift(that.data.collegeList[_i3]);
                                    flag2 = true;
                                    break;
                                }
                            }
                            if (flag2 == false) {
                                scoreLineArr.splice(4, 1);
                                scoreLineArr.unshift(that.data.collegeList[_i3]);
                            }
                            break;
                        }
                    }
                }
                that.setData({
                    scoreLineArr: scoreLineArr
                });
                wx.setStorage({
                    key: "collegeScoreLineList",
                    data: scoreLineArr
                });
            } else {
                for (var _i4 = 0; _i4 < that.data.collegeList.length; _i4++) {
                    if (that.data.collegeList[_i4].CollegeId == id) {
                        scoreLineArr.unshift(that.data.collegeList[_i4]);
                        break;
                    }
                }
                that.setData({
                    scoreLineArr: scoreLineArr
                });
                wx.setStorage({
                    key: "collegeScoreLineList",
                    data: scoreLineArr
                });
            }
            try {
                var cityId = wx.getStorageSync("cityId");
                if (cityId) {
                    if (cityId.cityId == 843) {
                        if (ucode == null) {
                            wx.navigateTo({
                                url: "../scoreDetailV2/scoreDetailV2?noplan=true&name=" + name
                            });
                        } else {
                            wx.navigateTo({
                                url: "../scoreDetailV2/scoreDetailV2?ucode=" + ucode + "&collegeid=" + id + "&name=" + name
                            });
                        }
                    } else if (cityId.cityId == 842) {
                        wx.navigateTo({
                            url: "../scoreDetail/scoreDetail?id=" + id + "&name=" + name
                        });
                    } else {
                        wx.navigateTo({
                            url: "../scoreDetailV2Common/scoreDetailV2Common?collegeid=" + id + "&name=" + name
                        });
                    }
                }
            } catch (e) {}
        }
    } else if (flag == 2) {
        var code = e.currentTarget.dataset.majorcode;
        if (code.length == 4) {
            wx.navigateTo({
                url: "../majorList/majorList?code=" + code
            });
        } else {
            wx.navigateTo({
                url: "../majorDetail/majorDetail?majorId=" + id + "&majorName=" + name
            });
        }
    } else if (flag == 0) {
        if (indexCls == 1) {
            wx.navigateTo({
                url: "../collegeDetail/collegeDetail?id=" + id
            });
        } else if (indexCls == 2) {
            var _code = e.currentTarget.dataset.majorcode;
            if (_code.length == 4) {
                wx.navigateTo({
                    url: "../majorList/majorList?code=" + _code
                });
            } else {
                wx.navigateTo({
                    url: "../majorDetail/majorDetail?majorId=" + id + "&majorName=" + name
                });
            }
        }
    }
}), _defineProperty(_Page, "resetSelectTap", function resetSelectTap() {
    var that = this;
    var universityType = that.data.universityType;
    var otherCityList = that.data.otherCityList;
    var cityList = that.data.cityList;
    var selectTerrace = that.data.selectTerrace;
    for (var i in universityType) {
        universityType[i].checked = false;
    }
    for (var _i5 in cityList) {
        cityList[_i5].checked = false;
    }
    for (var _i6 in selectTerrace) {
        selectTerrace[_i6].checked = false;
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
}), _defineProperty(_Page, "checkClassify", function checkClassify() {
    var that = this;
    var classify = [];
    var universityType = that.data.universityType;
    for (var i in universityType) {
        if (universityType[i].checked) {
            classify.push(universityType[i].name);
        }
    }
    return classify;
}), _defineProperty(_Page, "checkLevels", function checkLevels() {
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
}), _defineProperty(_Page, "selectCreateTap", function selectCreateTap(e) {
    var that = this;
    var id = e.currentTarget.id;
    var createChecked = that.data.createChecked;
    that.setData({
        createChecked: id
    });
}), _defineProperty(_Page, "selectDegreeTap", function selectDegreeTap(e) {
    var that = this;
    var id = e.currentTarget.id;
    var degreeChecked = that.data.degreeChecked;
    that.setData({
        degreeChecked: id
    });
}), _defineProperty(_Page, "goCollegeDetail", function goCollegeDetail(e) {
    var that = this;
    if (!app.checkOnce(that, "oneClick")) return;
    var index = e.currentTarget.dataset.id;
    var numId = that.data.collegeList[index].collegeId;
    wx.navigateTo({
        url: "/packages/findUniversity/collegeDetail/collegeDetail?numId=" + numId
    });
}), _defineProperty(_Page, "confirmSelectTap", function confirmSelectTap() {
    var that = this;
    // that.data.collegeList = [];
    // that.pageIndex = 1;
    // that.setData({
    //     collegeData: false
    // })
        that.setData({
        collegeList: [],
        "shaixuanCollege.pn": 1,
        scrolltolower: true
    }, function() {
        that.RecommendationQueryColleges(that.code);
    });
    // that.queryCollegeList(that.checkProvinceIds(), that.checkLevels(), that.checkClassify(), [], [], false, that.data.createChecked, that.data.degreeChecked, false, false, "", that.pageIndex);
        that.maskClose();
}), _defineProperty(_Page, "getNextPage", function getNextPage() {
    var that = this;
    that.setData({
        "shaixuanCollege.pn": that.data.shaixuanCollege.pn + 1
    }, function() {
        that.RecommendationQueryColleges(that.code);
    });
}), _defineProperty(_Page, "maskClose", function maskClose() {
    this.setData({
        shaixuan: "shaixuan-animate-out"
    });
}), _defineProperty(_Page, "shaixuanTap", function shaixuanTap() {
    var that = this;
    var tmpsetdata = {
        shaixuan: "shaixuan-animate",
        flag: true
    };
    that.setData(tmpsetdata);
}), _defineProperty(_Page, "onLoad", function onLoad(options) {
    var that = this;
    var cityId = wx.getStorageSync("cityId");
    if (cityId) {
        that.cityId = cityId.cityId;
    } else {
        that.cityId = 1;
    }
    if (options && options.share) {
        that.setData({
            share: true
        });
    }
    that.selectComponent("#navigationcustom").setNavigationAll("找大学", true);
    // that.cityId = app.globalData.userInfo.cityId;
        var cls = options.cls;
    var flag = options.flag;
    var userScore = wx.getStorageSync("userScore");
    var course = wx.getStorageSync("course");
    var userInfo = wx.getStorageSync("userInfo");
    var gender = -1;
    if (userInfo) {
        gender = userInfo[0].gender;
        that.setData({
            loginFlag: true,
            userInfo: userInfo[0]
        });
    }
    if (userScore) {
        that.setData({
            "shaixuanCollege.provinceId": that.cityId,
            "shaixuanCollege.batch": userScore.batch,
            "shaixuanCollege.totalScore": userScore.total,
            menuTop: app.globalData.navigationCustomStatusHeight + app.globalData.navigationCustomCapsuleHeight
        });
    } else {
        that.setData({
            "shaixuanCollege.provinceId": that.cityId,
            "shaixuanCollege.batch": 0,
            "shaixuanCollege.totalScore": 0,
            menuTop: app.globalData.navigationCustomStatusHeight + app.globalData.navigationCustomCapsuleHeight
        });
    }
    if (course) {
        that.setData({
            "shaixuanCollege.courseType": course
        });
    } else {
        that.setData({
            "shaixuanCollege.courseType": 0
        });
    }
    that.MajorsRecommend(gender);
    that.RecommendationQueryColleges("");
    // const that = this;
    // const cls = options.cls;
    // const flag = options.flag;
    // that.queryCollegeList([], {}, [], [], [], false, -1, -1, false, false, "", 1);
    // that.setData({
    // });
    // that.getMenuHeight();
}), _Page));