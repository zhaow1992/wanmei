var _api = require("../../utils/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var app = getApp();

var sensors = require("./../../utils/sensors.js");

Page({
    options: {},
    cityId: 0,
    courseTapFlag: 0,
    yearIndex: 0,
    cityIndex: -1,
    course: -1,
    disabledBtn: false,
    data: {
        courseFlag: false,
        frameProvinceTitle: "请选择高考省份",
        frameModalTitle: "高考信息",
        yearFrameTitle: "请选择高考年份",
        GKYear: "2019（目前高三）",
        btnBColor: "",
        wrapAnimate: "",
        cityListShow: false,
        GKProvince: "无法定位 请点击选择",
        courseId: -1,
        subject: true,
        comfirmData: {
            province: "",
            year: "",
            course: ""
        },
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
            id: 861,
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
        } ],
        GKYearList: [],
        studentCourseBColor1: "",
        studentCourseBColor2: "",
        studentCourseFColor1: "",
        studentCourseFColor2: "",
        GKYearFColor: "",
        studentCourse: [ "文科", "理科" ],
        userInfo: [],
        serverfail: false,
        GKWanshan: false,
        showLoad: true,
        team1: true,
        team2: false,
        team3: false,
        team4: false,
        team5: false,
        provinceflag: true,
        schoolflag: true,
        yearflag: true,
        sexflag: true,
        province: [],
        value1: [ 0, 0, 0 ],
        school: [ {
            Name: "请选择高中院校"
        } ],
        value2: [ 0 ],
        year: [],
        value3: [ 0 ],
        sex: [ "男", "女" ],
        value4: [ 0 ],
        userid: null,
        provinceName: null,
        provinceId: null,
        //省
        cityId: null,
        //市
        countryId: null,
        //区
        schoolId: null,
        //学校
        isGaoKao: null,
        //高考年份
        usersex: null
    },
    //点击确认修改
    confirmBtnTap: function confirmBtnTap() {
        var that = this;
        var examYear = that.data.GKYearList[that.yearIndex].year;
        that.setData({
            loadingConfirm: true
        });
        setTimeout(function() {
            that.setData({
                loadingConfirm: false
            });
        }, 500);
        that.updateUserGaoKaoInfo(that.options.id, that.cityId.cityId, examYear, that.data.courseId);
    },
    onShow: function onShow() {
        app.resetOnce(this, "oneclick");
    },
    //二次确认弹窗消失
    hideModalFrame: function hideModalFrame() {
        this.selectComponent("#framemodal").hideFrame();
    },
    yearTap: function yearTap(e) {
        var that = this;
        that.yearIndex = e.currentTarget.id;
        that.selectComponent("#frameyear").hideFrame();
        that.setData({
            GKYear: that.data.GKYearList[that.yearIndex].text
        });
    },
    //点击高考年份选择
    showYearTap: function showYearTap(e) {
        var that = this;
        that.selectComponent("#frameyear").showFrame();
    },
    //年份列表弹窗消失
    hideYearFrame: function hideYearFrame() {
        var that = this;
        that.selectComponent("#frameyear").hideFrame();
    },
    ///Users/UpdateGaoKaoInfo
    //修改用户高考信息
    updateUserGaoKaoInfo: function updateUserGaoKaoInfo(id, provinceNumId, examYear, couseType) {
        var that = this;
        _api2.default.updateUserGaoKaoInfo("Users/UpdateGaoKaoInfo", "POST", id, provinceNumId, examYear, couseType).then(function(res) {
            var data = {
                provinceNumId: provinceNumId,
                examYear: examYear,
                couseType: couseType
            };
            app.sensors.track("ExamInfoResult", sensors.ExamInfoResult(data, res.isSuccess, res.message));
            if (res.result == "True") {
                var url = "";
                if (that.options && that.options.bargainid) {
                    //分享->砍价活动->跳转砍价活动
                    url = "/packages/activityBargain/index/index?activitybargain=" + that.options.activitybargain + "&bargainid=" + that.options.bargainid + "&shareuserid=" + that.options.shareuserid;
                    wx.redirectTo({
                        url: url
                    });
                } else if (that.options && that.options.source == "activity") {
                    //首页->砍价活动->跳转砍价活动
                    url = "/packages/activityBargain/index/index?source=activity";
                    wx.redirectTo({
                        url: url
                    });
                } else {
                    //正常跳转
                    url = "/pages/index/index";
                    wx.switchTab({
                        url: url
                    });
                }
                //完善成功
                                wx.setStorageSync("cityId", that.cityId);
                that.selectComponent("#framemodal").hideFrame();
            }
        });
    },
    chooseCourseTap: function chooseCourseTap(e) {
        var that = this;
        that.courseTapFlag = true;
        if (e.currentTarget.id == that.data.courseId) {
            return;
        }
        that.setData({
            courseId: e.currentTarget.id
        });
        that.checkButton();
    },
    //检测按钮可用
    checkButton: function checkButton() {
        var that = this;
        console.log(that.isOpenNewVersion);
        if (that.isOpenNewVersion) {
            //新高考
            that.disabledBtn = false;
            that.setData({
                courseFlag: false
            });
        } else {
            //传统版
            if (that.data.courseId > -1) {
                that.disabledBtn = false;
                that.setData({
                    courseFlag: true
                });
            } else {
                that.disabledBtn = true;
                that.setData({
                    courseFlag: true
                });
            }
        }
    },
    windowCloseTap: function windowCloseTap() {
        this.wrapTap();
    },
    wrapTap: function wrapTap() {
        var that = this;
        that.setData({
            wrapAnimate: "wrapAnimateOut",
            cityListShow: false
        });
    },
    /*
    点击城市
   */
    chooseCityTap: function chooseCityTap(e) {
        var that = this;
        var index = e.currentTarget.id;
        if (that.cityId.cityId != that.data.cityList[index].id) {
            var tmpData = {
                courseId: -1,
                GKProvince: that.data.cityList[index].name.substr(2)
            };
            that.cityIndex = index;
            that.cityId = {
                cityId: that.data.cityList[index].id,
                provinceName: tmpData.GKProvince
            };
            that.Configuration(that.data.cityList[index].id);
            that.selectComponent("#frameprovince").hideFrame();
            that.setData(tmpData);
        }
    },
    //省份选择
    provinceTap: function provinceTap() {
        // const that = this;
        // that.setData({
        //   cityListShow: true,
        //   wrapAnimate: "wrapAnimate"
        // })
        var that = this;
        that.selectComponent("#frameprovince").showFrame();
    },
    completeBtnTap: function completeBtnTap() {
        var that = this;
        //id, examYear, couseType
                var examYear = that.data.GKYearList[that.yearIndex].year;
        //GKProvince
                var comfirmData = {
            year: examYear
        };
        if (that.data.GKProvince == "无法定位 请点击选择") {
            wx.showToast({
                title: "请选择高考省份",
                icon: "none",
                duration: 2e3
            });
            return;
        } else if (that.disabledBtn) {
            if (that.isOpenNewVersion) {} else {
                wx.showToast({
                    title: "请选择考生科类",
                    icon: "none",
                    duration: 2e3
                });
                return;
            }
        }
        if (that.cityId.cityId == 842 || that.cityId.cityId == 834 || that.cityId.cityId == 854 || that.cityId.cityId == 835) {
            //： 北京 上海 天津 重庆
            comfirmData.province = that.data.GKProvince + "市";
        } else {
            comfirmData.province = that.data.GKProvince + "省";
        }
        if (that.cityId.cityId == "842" || that.cityId.cityId == "843") {
            comfirmData.course = "";
        } else {
            if (that.data.courseId == 0) {
                comfirmData.course = "理科";
            } else if (that.data.courseId == 1) {
                comfirmData.course = "文科";
            }
            // comfirmData.province = that.data.GKProvince + "省";
                }
        that.setData({
            comfirmData: comfirmData,
            loadingBtn: true
        });
        that.selectComponent("#framemodal").showFrame();
        setTimeout(function() {
            that.setData({
                loadingBtn: false
            });
        }, 500);
    },
    _confirmEvent: function _confirmEvent() {
        var that = this;
        this.setData({
            showLoad: true,
            serverfail: false
        });
        if (this.data.team1 == true) {
            var provinceId = that.data.userInfo[0].Province.Id;
            _api2.default.getProvinces("common/areas/getProvinces", "GET").then(function(res) {
                if (res.Code && res.Code == 1) {
                    var provinceArr = [];
                    for (var i = 0; i < res.Results.length; i++) {
                        if (res.Results[i].Id == provinceId) {
                            that.setData({
                                province: res.Results[i]
                            });
                            break;
                        }
                    }
                    that.setData({
                        showLoad: false
                    });
                } else {
                    that.setData({
                        serverfail: true,
                        showLoad: false
                    });
                    return;
                }
            });
        } else {
            _api2.default.getSchool("common/areas/getAreas?parentId=" + that.data.province.City[that.data.value1[1]].County[that.data.value1[2]].Id, "GET").then(function(res) {
                if (res.Code && res.Code == 1) {
                    that.setData({
                        school: res.Results,
                        showLoad: false
                    });
                } else {
                    that.setData({
                        serverfail: true,
                        showLoad: false
                    });
                    return;
                }
            });
        }
    },
    ////////////////////////////////////////////
    onLoad: function onLoad(options) {
        var that = this;
        that.options = options;
        var userid = options.userId;
        that.selectComponent("#navigationcustom").setNavigationAll("", false);
        // that.setData({ userid: userid });
                var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var yearArr = [];
        wx.getSetting({
            success: function success(res) {
                //
                if (res.authSetting && !res.authSetting["scope.userLocation"]) {
                    wx.authorize({
                        scope: "scope.userLocation",
                        success: function success(res) {
                            wx.getLocation({
                                type: "wgs84",
                                success: function success(res) {
                                    if (res.latitude > 0 && res.longitude > 0) {
                                        _api2.default.baiduMapGeocoder("Baidu/Map/Geocoder", "POST", res.latitude, res.longitude).then(function(res) {
                                            if (res.result) {
                                                var cityName = res.result.provinceName;
                                                for (var i in that.data.cityList) {
                                                    if (res.result.provinceId == that.data.cityList[i].id) {
                                                        that.cityIndex = i;
                                                    }
                                                }
                                                cityName = cityName.replace("市", "");
                                                cityName = cityName.replace("省", "");
                                                that.cityId = {
                                                    cityId: res.result.provinceId,
                                                    provinceName: cityName
                                                };
                                                var courseFlag = false;
                                                if (app.checkNewGaoKao(that.cityId.cityId)) {} else {
                                                    courseFlag = true;
                                                }
                                                that.setData({
                                                    GKProvince: cityName,
                                                    courseFlag: courseFlag
                                                });
                                            } else {
                                                that.setData({
                                                    GKProvince: "无法定位 请点击选择"
                                                });
                                            }
                                        });
                                    } else {
                                        that.setData({
                                            GKProvince: "无法定位 请点击选择"
                                        });
                                    }
                                },
                                fail: function fail() {
                                    //无法定位 请点击选择
                                    that.setData({
                                        GKProvince: "无法定位 请点击选择"
                                    });
                                }
                            });
                        },
                        fail: function fail() {
                            that.setData({
                                GKProvince: "无法定位 请点击选择"
                            });
                        }
                    });
                } else {
                    that.setData({
                        GKProvince: "无法定位 请点击选择"
                    });
                }
            }
        });
        if (options) that.options = options;
        for (var i = 0; i < 4; i++) {
            var yearArrSingle = {};
            //month = 9
                        if (month > 7) {
                if (year + i == year) {
                    yearArrSingle = {
                        year: year + 1 + i,
                        checked: false,
                        text: year + 1 + i + "（目前高三）"
                    };
                    yearArr.push(yearArrSingle);
                } else if (year + i == year + 1) {
                    yearArrSingle = {
                        year: year + 1 + i,
                        checked: false,
                        text: year + 1 + i + "（目前高二）"
                    };
                    yearArr.push(yearArrSingle);
                } else if (year + i == year + 2) {
                    yearArrSingle = {
                        year: year + 1 + i,
                        checked: false,
                        text: year + 1 + i + "（目前高一）"
                    };
                    yearArr.push(yearArrSingle);
                } else {
                    yearArrSingle = {
                        year: year + 1 + i,
                        checked: false,
                        text: year + 1 + i + "（目前初三）"
                    };
                    yearArr.push(yearArrSingle);
                }
            } else {
                if (year + i == year) {
                    yearArrSingle = {
                        year: year + i,
                        checked: false,
                        text: year + i + "（目前高三）"
                    };
                    yearArr.push(yearArrSingle);
                } else if (year + i == year + 1) {
                    yearArrSingle = {
                        year: year + i,
                        checked: false,
                        text: year + i + "（目前高二）"
                    };
                    yearArr.push(yearArrSingle);
                } else if (year + i == year + 2) {
                    yearArrSingle = {
                        year: year + i,
                        checked: false,
                        text: year + i + "（目前高一）"
                    };
                    yearArr.push(yearArrSingle);
                } else {
                    yearArrSingle = {
                        year: year + i,
                        checked: false,
                        text: year + i + "（目前初三）"
                    };
                    yearArr.push(yearArrSingle);
                }
            }
        }
        that.setData({
            GKYearList: yearArr,
            GKYear: yearArr[0].text
        });
        // that.checkButton();
        },
    Configuration: function Configuration(pro) {
        var that = this;
        _api2.default.Configuration("Configuration/ScoreLines/GetByProvince", "POST", pro).then(function(res) {
            that.isOpenNewVersion = res.result.isOpenNewVersion;
            if (res.result.isOpenNewVersion) {
                that.setData({
                    courseFlag: !res.result.isOpenNewVersion
                });
            } else {
                that.setData({
                    courseFlag: true
                });
            }
            that.checkButton();
        });
    }
});