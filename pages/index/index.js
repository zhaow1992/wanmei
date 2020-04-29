var _api = require("../../utils/api.js");

var _api2 = _interopRequireDefault(_api);

var _request = require("../../utils/request.js");

var _request2 = _interopRequireDefault(_request);

var _config = require("../../config.js");

var _config2 = _interopRequireDefault(_config);

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

var formidArrOld = [];

var formidArr = [];

Page({
    xianChaError: false,
    tmpYear: 2020,
    scoreType: 1,
    data: {
        numberNum: {
            pability: 58794,
            chooseSub: 18524,
            ceping: 78594
        },
        loginFlag: false,
        chooseCityIndex: 0,
        isGaokao: {
            bgOpacity: 0,
            wrapAnimate: "",
            popupAnimate: "",
            Flag: ""
        },
        currentFirstLevelId: 0,
        currentSecondLevelId: 0,
        currentSecondKemuId: 0,
        jiangsuLevelList: [ "A+", "A", "B+", "B", "C", "D" ],
        jiangsuKemu: [ "政治", "地理", "化学", "生物" ],
        scoreType: 1,
        // navigationShow: true,
        /////////////////////////////////////////////////////////////上方为重构新增的
        PUSHSTREAM_ICON_PATH: "PUSHSTREAM_ICON_PATH",
        modeImgPathObj: "aaa",
        bargainGetStatus: false,
        shareuserid: null,
        avatarUrl: "",
        lineGapMax: 276,
        activityFlag: false,
        wrapAnimate: "",
        popupAnimate: "",
        bgOpacity: 0,
        payImage: "http://wmei-appfile.cn-bj.ufileos.com/weixinmp_home_banner.jpg",
        comeLoadPage: app.globalData.comeLoadPage,
        serverfail: false,
        bannerImage: [ {
            PictureUrl: "http://staticv2m.wmei.cn/images/ad/miniapp/banner1.jpg",
            PictureLinkAddress: "/pages/pay/pay"
        }, {
            PictureUrl: "http://staticv2m.wmei.cn/images/ad/miniapp/banner2.jpg",
            PictureLinkAddress: "/pages/pay/pay"
        }, {
            PictureUrl: "http://staticv2m.wmei.cn/images/ad/miniapp/banner3.jpg",
            PictureLinkAddress: "/pages/pay/pay"
        }, {
            PictureUrl: "http://staticv2m.wmei.cn/images/ad/miniapp/banner4.jpg",
            PictureLinkAddress: "/pages/pay/pay"
        }, {
            PictureUrl: "http://staticv2m.wmei.cn/images/ad/miniapp/banner5.jpg",
            PictureLinkAddress: "/pages/pay/pay"
        } ],
        changeGKScoreFlag: false,
        //高考版禁修改
        isGaokaoFlag: false,
        //高考开启开关
        quickNewsFlag: [],
        goCeping: false,
        goClassRoom: false,
        goSearchCollege: false,
        goActivitybargain: false,
        activityBargainId: 0,
        activityBargainIdFlag: false,
        goMajor: false,
        ZNTBorYJTB: "0",
        tishiFlag: false,
        tishiContent: "",
        kemubindChangeFlag: false,
        value: [ 0, 0 ],
        bgImage: 0,
        showLoad: true,
        checked: true,
        searchFocus: false,
        showTuijianBtn: true,
        chooseCity: [],
        //城市Name
        chooseCityId: [],
        //城市 {索引:Id}
        cityIndex: 6,
        //城市选项卡索引
        shangHaiShow: false,
        //上海
        zheJiangShow: false,
        //浙江
        jiangSuShow: false,
        //江苏
        fenClass: true,
        cityName: "北京",
        history: [ "A+", "A", "B+", "B", "C", "D" ],
        //历史
        historyIndex: 0,
        politics: [ "A+", "A", "B+", "B", "C", "D" ],
        //政治
        politicsIndex: 0,
        kemu: [ [ "政治", "地理", "化学", "生物" ], [ "A+", "A", "B+", "B", "C", "D" ] ],
        kemuIndex: [ 0, 0 ],
        xianCha: [],
        //线差
        xianChaIndex: 0,
        shangHaiSubject: [ {
            name: "思想政治",
            st: false
        }, {
            name: "历史",
            st: false
        }, {
            name: "地理",
            st: false
        }, {
            name: "生命科学",
            st: false
        }, {
            name: "物理",
            st: false
        }, {
            name: "化学",
            st: false
        } ],
        //上海科目
        zheJiangSubject: [ {
            name: "物理",
            st: false
        }, {
            name: "生物",
            st: false
        }, {
            name: "化学",
            st: false
        }, {
            name: "技术",
            st: false
        }, {
            name: "历史",
            st: false
        }, {
            name: "地理",
            st: false
        }, {
            name: "政治",
            st: false
        } ],
        //浙江科目
        GaoKaoTotal: 0,
        // 高考总分
        cityFlag: false,
        courseFlag: false,
        scoreFlag: false,
        cityId: 1,
        //城市Id（data）
        checkedValue: 1,
        //文科或理科（data）
        getFen: "",
        //预估总分（data）
        xianChaFen: null,
        //线差分（data）
        shangHaiFen: 0,
        //上海分（data）
        shangHaiWei: 0,
        //上海位（data）
        zheJiangFen: 0,
        //浙江分（data）
        zheJiangWei: 0,
        //浙江位（data）
        historyKemu: "历史",
        //历史科目
        historyValue: "A+",
        //历史级别（data）
        kemuValue: "政治",
        //科目（data）
        politicsValue: "A+",
        //政治级别（data）
        xianChaValue: "1",
        //线差（data）
        userInfo: [],
        //缓存取用户信息
        userScore: [],
        //缓存取用户成绩
        searchValue: "",
        //顶部搜索框内容（data）
        shangHaiSubjectArr: [],
        //上海科目选择数组（data）
        zheJiangSubjectArr: [],
        //浙江科目选择数组（data）
        weiFen: 0,
        //上海、浙江位次/排名
        jiangSu: "",
        shangHai: "",
        zheJiang: ""
    },
    // 新推送-------------试
    // click(e){
    //   console.log(e)
    //   wx.requestSubscribeMessage({
    //     tmplIds: ['82BzHB0Fy366PQRJYqH1PzOlJmvMgDxfnp2vZ5PFxrc'],
    //     success(res) { 
    //       console.log(res)
    //     }
    //   })
    // },
    goDetail: function goDetail(e) {
        var that = this;
        if (!this.data.loginFlag) {
            this.loginPopup();
            return;
        }
        var type = e.currentTarget.dataset.type;
        switch (type) {
          case "findUniversity":
            wx.navigateTo({
                url: "/packages/findUniversity/index/index"
            });
            break;

            //找大学
                      case "selectMajor":
            wx.navigateTo({
                url: "/pages/selectMajor/index"
            });
            break;

            //查专业
                      case "career":
            wx.navigateTo({
                url: "/packages/selectMajor/profession/profession"
            });
            break;

            //看职业
                      case "advanceBatch":
            that.goAdvanceBatch();
            break;

            //提前批
                      case "scoreLine":
            wx.navigateTo({
                url: "/packages/fractionLine/scoreLineSearch/scoreLineSearch"
            });
            break;

            //分数线
                      case "plan":
            that.goPlan();
            break;

            //招生计划
                      case "piciPlan":
            wx.navigateTo({
                url: "/pages/commonWebPage/commonWebPage?typePage=4"
            });
            break;

            //批次线
                      case "weici":
            wx.navigateTo({
                url: "/packages/queryRank/index/index"
            });
            break;

            //wx.showToast({ title: '即将开放', icon: 'none' }); break; //看职业/packages/queryRank/index/index
                      case "pability":
            that.goPability();
            break;

            //测录取概率
                      case "chooseSub":
            that.goChooseSub();
            break;

            //新高考选科
                      case "ceping":
            wx.switchTab({
                url: "/pages/cepingIndex/cepingIndex"
            });
            break;

            //专业定位测评
                      case "pay":
            that.goPay();
            break;
            //轮播去支付
                }
    },
    // 去提前批
    goAdvanceBatch: function goAdvanceBatch() {
        var data = {
            provinceId: wx.getStorageSync("userInfo")[0].Province,
            year: 2019,
            course: wx.getStorageSync("userInfo")[0].courseType
        };
        var fillterData = wx.getStorageSync("advanceData");
        if (fillterData) {
            if (fillterData.length == 0) {
                wx.showToast({
                    title: "暂未开放",
                    icon: "none"
                });
            } else {
                wx.navigateTo({
                    url: "/packages/advanceBatch/index/index"
                });
            }
        } else {
            _api2.default.getQueryFilter("TZY/PreFraction/QueryFilter", "POST", data).then(function(res) {
                if (res.result.length == 0) {
                    wx.showToast({
                        title: "暂未开放",
                        icon: "none"
                    });
                } else {
                    wx.setStorageSync("advanceData", res.result);
                    wx.navigateTo({
                        url: "/packages/advanceBatch/index/index"
                    });
                }
            });
        }
    },
    // 去招生计划
    goPlan: function goPlan() {
        wx.navigateTo({
            url: "/packages/collegePlan/index/index"
        });
        // wx.showToast({ title: '即将开放', icon: 'none' }); 
        },
    // 去测录取概率
    goPability: function goPability() {
        if (app.globalData.isGaokaoFlag && this.userInfo.GKYear != 2020) {
            this.showIsGaokaoPopup();
        } else {
            wx.navigateTo({
                url: "/packages/testEnterPercent/index/index"
            });
        }
    },
    // 去新高考选科
    goChooseSub: function goChooseSub() {
        var chooseSubjectInfo = wx.getStorageSync("chooseSubjectInfo");
        var chooseSubProvinceList = wx.getStorageSync("chooseSubProvinceList");
        if (chooseSubjectInfo && chooseSubjectInfo.provinceId && chooseSubjectInfo.year != 0 && chooseSubProvinceList) {
            wx.navigateTo({
                url: "/packages/chooseSubjects/index/index"
            });
        } else {
            wx.navigateTo({
                url: "/packages/chooseSubjects/electiveProvince/electiveProvince"
            });
        }
    },
    // 去支付
    goPay: function goPay() {
        if (app.globalData.system == "ios") {
            app.payPrompt();
        } else {
            wx.navigateTo({
                url: "/packages/paySystem/memberCardDetail/memberCardDetail"
            });
        }
    },
    loginPopup: function loginPopup() {
        this.selectComponent("#loginPopup")._showTap();
    },
    cityPickerChange: function cityPickerChange(e) {
        var provinceId = this.data.chooseCityId[e.detail.value];
        this.setData({
            chooseCityIndex: e.detail.value,
            cityId: provinceId
        });
        this.setIndexFlag(provinceId);
    },
    //未开通
    showToast: function showToast() {
        wx.showToast({
            title: "即将开放",
            icon: "none"
        });
    },
    getRightBatch: function getRightBatch(provinceId, totalScore, course) {
        var that = this;
        _api2.default.getRightBatch("TZY/Func/GetRightBatch", "POST", provinceId, totalScore, course).then(function(res) {
            if (res.result.batch) {
                //完善成功
                var chooseLevelList = [];
                //江苏
                                if (provinceId == 1) {
                    var oneLevel = {
                        name: that.data.historyKemu,
                        value: that.data.historyValue
                    };
                    var twoLevel = {
                        name: that.data.kemuValue,
                        value: that.data.politicsValue
                    };
                    chooseLevelList.push(oneLevel);
                    chooseLevelList.push(twoLevel);
                    that.insertUserScore(totalScore, 0, res.result.batch, that.scoreType, course, [], chooseLevelList);
                } else {
                    that.insertUserScore(totalScore, parseInt(that.data.weiFen), res.result.batch, that.scoreType, course, [], []);
                }
            }
        });
    },
    //插入用户成绩
    insertUserScore: function insertUserScore(total, rank, batch, scoreType, courseType, chooseSubjects, chooseLevelList) {
        var that = this;
        var userNumId = that.userInfo.UserId;
        var provinceNumId = that.userInfo.Province;
        _api2.default.insertUserScore("Users/Scores/Insert", "POST", userNumId, provinceNumId, total, rank, batch, scoreType, courseType, chooseSubjects, chooseLevelList).then(function(res) {
            //isSuccess
            wx.hideLoading();
            if (res.isSuccess) {
                that.GetScore(res.result.numId, batch);
            } else {
                that.goBackScore();
                wx.showToast({
                    title: res.message,
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    // 通过成绩numId获取单个成绩（创建成绩返回成绩numId）
    GetScore: function GetScore(numId, batch) {
        var that = this;
        _api2.default.GetScore("Users/Scores/Get?numId=" + numId, "POST").then(function(res) {
            var data = res.result;
            var scoreData = {
                total: data.total,
                rank: data.rank,
                provinceNumId: data.provinceNumId,
                chooseLevelOrSubjects: data.chooseLevelOrSubjects,
                chooseSubjects: data.chooseSubjectsFormat,
                chooseLevelList: data.chooseLevelFormat,
                scoreType: data.scoreType,
                courseType: data.courseTypeId,
                batch: batch
            };
            wx.setStorageSync("userScore", scoreData);
            wx.hideLoading();
            switch (data.provinceNumId) {
              case 842:
                wx.navigateTo({
                    url: "/packages/recommend/shanghaiRecommend/shanghaiRecommend"
                });
                break;

              case 843:
                wx.navigateTo({
                    url: "/packages/recommend/collegeRecommend/collegeRecommend"
                });
                break;

              case 1:
                if (that.data.ZNTBorYJTB == 1) {
                    // 一键填报
                    wx.navigateTo({
                        url: "/pages/YJTBRecommend/YJTBRecommend"
                    });
                } else {
                    wx.navigateTo({
                        url: "/packages/recommend/jiangsuRecommend/jiangsuRecommend"
                    });
                }
                break;

              default:
                if (that.data.ZNTBorYJTB == 1) {
                    // 一键填报
                    wx.navigateTo({
                        url: "/pages/YJTBRecommend/YJTBRecommend"
                    });
                } else {
                    wx.navigateTo({
                        url: "/packages/recommend/jiangsuRecommend/jiangsuRecommend"
                    });
                }
                break;
            }
        });
    },
    //获取成绩
    getUserScoreByNumId: function getUserScoreByNumId(userNumId, provinceNumId, isGaoKao, isFillProvinceName) {
        var that = this;
        _api2.default.getUserScoreByNumId("Users/Scores/GetByUserNumId", "POST", userNumId, provinceNumId, isGaoKao, isFillProvinceName).then(function(res) {
            if (res.isSuccess) {
                //普通成绩，且每次都会更新缓存
                var userScore = {
                    total: res.result.total,
                    rank: res.result.rank,
                    provinceNumId: res.result.provinceNumId,
                    chooseSubjects: res.result.chooseSubjectsFormat,
                    chooseLevelOrSubjects: res.result.chooseLevelOrSubjects,
                    chooseLevelList: res.result.chooseLevelFormat,
                    scoreType: isGaoKao == true ? 2 : 1,
                    courseType: res.result.courseTypeId,
                    batch: 0,
                    numId: res.result.numId
                };
                console.log("============================");
                console.log(that.userInfo);
                if (res.result.numId > 0) {
                    if (that.userInfo.GKYear > 2020) {
                        that.setData({
                            checked: res.result.courseTypeId == 0 ? false : true,
                            checkedValue: res.result.courseTypeId
                        });
                    } else {
                        that.setData({
                            checked: that.userInfo.courseType == 0 ? false : true,
                            checkedValue: that.userInfo.courseType
                        });
                    }
                    var tmpData = {
                        getFen: ""
                    };
                    tmpData.getFen = res.result.total;
                    tmpData.weiFen = res.result.rank;
                    var courseType = res.result.courseTypeId;
                    if (that.userInfo.GKYear == that.tmpYear) {
                        courseType = that.userInfo.courseType;
                    } else {
                        if (res.result.total > 0) {
                            courseType = res.result.courseTypeId;
                        } else {
                            courseType = that.userInfo.courseType;
                        }
                    }
                    if (app.checkNewGaoKao(provinceNumId)) {
                        var chooseSubjects = "";
                        userScore.chooseSubjects = res.result.chooseSubjectsFormat;
                        if (that.userInfo.Province == 842) {
                            var shangHaiSubject = that.data.shangHaiSubject;
                            for (var i = 0; i < shangHaiSubject.length; i++) {
                                shangHaiSubject[i].st = false;
                            }
                            if (res.result.total > 0) {
                                for (var _i in res.result.chooseSubjectsFormat) {
                                    for (var j in shangHaiSubject) {
                                        if (res.result.chooseSubjectsFormat[_i] == shangHaiSubject[j].name) {
                                            shangHaiSubject[j].st = true;
                                            break;
                                        }
                                    }
                                }
                            }
                            that.setData({
                                shangHaiSubject: shangHaiSubject,
                                shangHai: res.result.chooseLevelOrSubjects
                            });
                        } else if (that.userInfo.Province == 843) {
                            var zheJiangSubject = that.data.zheJiangSubject;
                            if (res.result.total > 0) {
                                for (var _i2 in res.result.chooseSubjectsFormat) {
                                    for (var _j in zheJiangSubject) {
                                        if (res.result.chooseSubjectsFormat[_i2] == zheJiangSubject[_j].name) {
                                            zheJiangSubject[_j].st = true;
                                        }
                                    }
                                }
                            }
                            that.setData({
                                zheJiangSubject: zheJiangSubject,
                                zheJiang: res.result.chooseLevelOrSubjects
                            });
                        }
                        wx.setStorageSync("userScore", userScore);
                        // that.goBackScore();
                                        } else {
                        _api2.default.getRightBatch("TZY/Func/GetRightBatch", "POST", provinceNumId, res.result.total, res.result.courseTypeId).then(function(data) {
                            if (that.cityId.cityId == 1) {
                                //江苏版
                                var courseInfo = "";
                                userScore.chooseLevelList = res.result.chooseLevelFormat;
                                var oneClass = userScore.chooseLevelList[0];
                                var twoClass = userScore.chooseLevelList[1];
                                var kemu = that.data.kemu;
                                var history = that.data.history;
                                var oneValue = "";
                                var kemuIndex = that.data.kemuIndex;
                                //第一科目类别
                                                                if (courseType == 1) {
                                    tmpData.historyKemu = "历史";
                                } else if (courseType == 0) {
                                    tmpData.historyKemu = "物理";
                                }
                                //第一科目的等级
                                                                for (var _i3 in history) {
                                    if (oneClass.value == history[_i3]) {
                                        oneValue = _i3;
                                    }
                                }
                                //第二科目的类别
                                                                for (var _j2 in kemu[0]) {
                                    if (twoClass.value == kemu[0][_j2]) {
                                        kemuIndex[0] = _j2;
                                    }
                                }
                                //第二科目的等级
                                                                for (var k in kemu[1]) {
                                    if (twoClass.value == kemu[1][k]) {
                                        kemuIndex[1] = k;
                                    }
                                }
                                tmpData.zheJiangShow = false;
                                tmpData.shangHaiShow = false;
                                tmpData.jiangSuShow = true;
                                //第一科目index效验
                                                                tmpData.historyIndex = oneValue;
                                //第二科目index效验
                                                                tmpData.kemuIndex = kemuIndex;
                            } else {
                                //其他省份
                                if (courseType == 1) {
                                    tmpData.checked = true;
                                } else if (courseType == 0) {
                                    tmpData.checked = false;
                                }
                            }
                            userScore.batch = data.result.batch;
                            wx.setStorageSync("userScore", userScore);
                            that.goBackScore();
                        });
                    }
                    that.setData(tmpData);
                } else {
                    if (isGaoKao) {
                        if (that.userInfo.GKYear == 2020) {
                            wx.reLaunch({
                                url: "/packages/ImproveGKScore/index/index"
                            });
                            return;
                        } else {}
                    }
                    wx.setStorageSync("userScore", userScore);
                    that.goBackScore();
                }
                // that.goBackScore();
                        } else {
                wx.showToast({
                    title: res.message,
                    icon: "none"
                });
            }
        });
    },
    // 当前省份对应首页开关样式
    setIndexFlag: function setIndexFlag(province) {
        var tmpData = {};
        switch (province) {
          case 1:
            tmpData.zheJiangShow = false;
            tmpData.shangHaiShow = false;
            tmpData.jiangSuShow = true;
            break;

          case 842:
            tmpData.zheJiangShow = false;
            tmpData.shangHaiShow = true;
            tmpData.jiangSuShow = false;
            break;

          case 843:
            tmpData.zheJiangShow = true;
            tmpData.shangHaiShow = false;
            tmpData.jiangSuShow = false;
            break;

          default:
            tmpData.zheJiangShow = false;
            tmpData.shangHaiShow = false;
            tmpData.jiangSuShow = false;
            break;
        }
        this.setData(tmpData);
    },
    //获取用户信息
    getUserBrief: function getUserBrief(UserId, isFillAreaName) {
        var that = this;
        _api2.default.getUserBrief("Users/GetBrief", "POST", UserId, isFillAreaName).then(function(res) {
            if (res.isSuccess) {
                var sex = wx.getStorageSync("sex");
                if (sex) {} else {
                    if (res.result.gender != -1) {
                        wx.setStorage({
                            key: "sex",
                            data: res.result.gender
                        });
                    } else {
                        wx.setStorage({
                            key: "sex",
                            data: 6
                        });
                    }
                }
                that.setIndexFlag(res.result.provinceId);
                if (res.result.mobilePhone == "" || res.result.mobilePhone == null) {
                    wx.redirectTo({
                        url: "/pages/bindMobile/index"
                    });
                    return;
                }
                that.setData({
                    checked: res.result.courseType == 0 ? false : true,
                    checkedValue: res.result.courseType
                });
                var cityId = wx.getStorageSync("cityId");
                var chooseCityId = wx.getStorageSync("chooseCityId");
                var chooseCity = wx.getStorageSync("chooseCity");
                //是否存在成绩
                                var userScore = wx.getStorageSync("userScore");
                // let userCurrectCityName = '';
                                if (res.result.gkYear != 0 && res.result.provinceId != 0) {
                    that.setData({
                        showLoad: false
                    });
                    if (!cityId) {
                        // userCurrectCityName = chooseCity[i];
                        that.cityId = {
                            cityId: res.result.provinceId,
                            provinceName: res.result.provinceName
                        };
                        that.setData({
                            cityName: res.result.provinceName
                        });
                        wx.setStorageSync("cityId", that.cityId);
                    }
                    if (res.result.gkYear == that.tmpYear) {
                        that.setData({
                            courseFlag: true
                        });
                    }
                    that.setData({
                        cityFlag: true
                    });
                    var userArr = [];
                    var result = res.result;
                    userArr.push({
                        secretName: result.secretName || null,
                        MobilePhone: result.mobilePhone || null,
                        id: result.id,
                        //改
                        userName: result.numId || null,
                        UserId: result.numId || null,
                        //改
                        avatarUrl: result.avatarUrl || null,
                        gender: result.gender,
                        Province: result.provinceId || null,
                        ProvinceName: result.provinceName || null,
                        City: result.cityId || null,
                        courseType: result.courseType,
                        County: result.countyName || null,
                        UserType: result.userPermissionId || null,
                        SchoolId: result.schoolId || 0,
                        schoolName: result.schoolName || "",
                        GKYear: result.gkYear || null,
                        identityExpirationTime: result.identityExpirationTime || null,
                        userPermissionExpiryTime: result.userPermissionExpiryTime || null,
                        electiveExpiryTime: result.electiveExpiryTime || null,
                        ziZhuExpiryTime: result.ziZhuExpiryTime || null
                    });
                    that.userInfo = userArr[0];
                    //设定用户信息缓存
                                        wx.setStorageSync("userInfo", userArr);
                    that.setData({
                        cityId: res.result.provinceId,
                        cityName: res.result.provinceName,
                        loginFlag: true
                    });
                    that.loadQuickNew(res.result.provinceId);
                    that.gaoKaoIsOpened(res.result.provinceId, userArr[0]);
                    var gaokaoScore = wx.getStorageSync("gaokaoScore");
                    if (gaokaoScore) {} else {
                        that.loadProLine(userArr[0].Province, userArr[0]);
                    }
                } else {
                    //该去完善高考信息了
                    wx.redirectTo({
                        url: "/pages/ImproveGKInformation/index?id=" + res.result.id
                    });
                    return;
                }
            } else {
                that.setData({
                    showLoad: false,
                    serverfail: true
                });
            }
            wx.showTabBar();
        });
    },
    // 0元购活动弹框
    showPopup: function showPopup() {
        var that = this;
        try {
            var activityFlag = wx.getStorageSync("activityFlag");
            if (activityFlag) {
                var timestamp = activityFlag;
                if (app.isToday(timestamp) == 1) {//今天
                } else {
                    var nowTime = new Date();
                    var year = nowTime.getFullYear();
                    var month = nowTime.getMonth() + 1;
                    var day = nowTime.getDate();
                    var hours = parseInt(nowTime.getHours());
                    var minutes = nowTime.getMinutes();
                    var timestamp = year + "-" + month + "-" + day;
                    wx.setStorage({
                        key: "activityFlag",
                        data: timestamp
                    });
                    that.setData({
                        bgOpacity: 0,
                        activityFlag: true,
                        wrapAnimate: "wrapAnimate",
                        popupAnimate: "popupAnimate"
                    });
                }
            } else {
                var nowTime = new Date();
                var year = nowTime.getFullYear();
                var month = nowTime.getMonth() + 1;
                var day = nowTime.getDate();
                var hours = parseInt(nowTime.getHours());
                var minutes = nowTime.getMinutes();
                var timestamp = year + "-" + month + "-" + day;
                wx.setStorage({
                    key: "activityFlag",
                    data: timestamp
                });
                that.setData({
                    bgOpacity: 0,
                    activityFlag: true,
                    wrapAnimate: "wrapAnimate",
                    popupAnimate: "popupAnimate"
                });
            }
        } catch (e) {}
    },
    // 0元购活动弹框隐藏
    hidePopup: function hidePopup() {
        var that = this;
        this.setData({
            bgOpacity: .7,
            wrapAnimate: "wrapAnimateOut",
            popupAnimate: "popupAnimateOut"
        });
        setTimeout(function() {
            that.setData({
                activityFlag: false
            });
        }, 200);
    },
    _confirmEvent: function _confirmEvent() {
        this.setData({
            showLoad: true,
            serverfail: false
        });
        this.onLoad();
        this.onShow();
    },
    // bargainGetStatus: function() { //活动状态
    //   const that = this;
    //   api.bargainGetStatus('miniApp/bargain/getStatus', 'POST').then(res => {
    //     that.setData({
    //       bargainGetStatus: res.Results[0] == '1' ? true : false
    //     })
    //     app.globalData.bargainGetStatus = res.Results[0] == '1' ? true : false
    //   })
    // },
    initMemberStorage: function initMemberStorage() {
        wx.getStorage({
            key: "memberNum",
            success: function success(res) {},
            fail: function fail() {
                wx.setStorage({
                    key: "memberNum",
                    data: {
                        pability: 58794,
                        chooseSub: 18524,
                        ceping: 78594
                    }
                });
            }
        });
    },
    // 更新当前人数
    updateMember: function updateMember() {
        this.setData({
            "numberNum.pability": app.getImitateHot(58794, 3),
            "numberNum.chooseSub": app.getImitateHot(18524, 3),
            "numberNum.ceping": app.getImitateHot(78594, 2)
        });
    },
    onLoad: function onLoad(options) {
        this.updateMember();
        var accountInfo = wx.getAccountInfoSync();
        wx.hideTabBar();
        this.initMemberStorage();
        var that = this;
        var version = wx.getStorageSync("version");
        if (version) {
            if (version == "3.3") {} else {
                wx.clearStorageSync();
                wx.setStorage({
                    key: "version",
                    data: "3.3"
                });
            }
        } else {
            wx.clearStorageSync();
            wx.setStorage({
                key: "version",
                data: "3.3"
            });
        }
        that.selectComponent("#navigationcustom").setNavigationAll("高考填志愿", false);
        if (app.globalData.system == "ios") {
            that.setData({
                payImage: "http://wmei-appfile.cn-bj.ufileos.com/weixinmp_home_banner1.png"
            });
        } else {
            that.setData({
                payImage: "http://wmei-appfile.cn-bj.ufileos.com/weixinmp_home_banner.jpg"
            });
        }
        this.serverfail = this.selectComponent("#serverfail");
        that.setData({
            isGaokaoFlag: app.globalData.isGaokaoFlag
        });
        if (options && options.searchCollege) {
            if (options.searchCollege == "true") {
                that.setData({
                    goSearchCollege: true
                });
            }
        }
        if (options && options.major) {
            if (options.major == "true") {
                that.setData({
                    goMajor: true
                });
            }
        }
        if (options && options.classRoom) {
            if (options.classRoom == "true") {
                that.setData({
                    goClassRoom: true
                });
            }
        }
        if (options && options.ceping) {
            if (options.ceping == "true") {
                that.setData({
                    goCeping: true
                });
            }
        }
        if (options && options.activitybargain) {
            that.setData({
                goActivitybargain: true
            }, function() {
                if (options && options.bargainid) {
                    that.setData({
                        activityBargainId: options.bargainid,
                        activityBargainIdFlag: true,
                        shareuserid: options.shareuserid
                    }, function() {
                        wx.navigateTo({
                            url: "../../packages/activityBargain/index/index?id=" + that.data.activityBargainId + "&shareuserid=" + that.data.shareuserid
                        });
                    });
                } else {
                    wx.navigateTo({
                        url: "../../packages/activityBargain/index/index"
                    });
                }
            });
        }
        that.setData({
            bgImage: Math.floor(Math.random() * that.data.bannerImage.length)
        });
        try {
            var collegeRecommendBatchGroup = wx.getStorageSync("collegeRecommendBatchGroup");
            if (collegeRecommendBatchGroup) {} else {
                wx.setStorage({
                    key: "collegeRecommendBatchGroup",
                    data: ""
                });
            }
        } catch (e) {}
        that.loadCityInfo();
        wx.getStorage({
            key: "recommendCityList",
            fail: function fail() {
                wx.setStorage({
                    key: "recommendCityList",
                    data: []
                });
            }
        });
        wx.getStorage({
            key: "recommendBatchList",
            fail: function fail() {
                wx.setStorage({
                    key: "recommendBatchList",
                    data: []
                });
            }
        });
        try {
            //加载城市
            var _chooseCity = wx.getStorageSync("chooseCity");
            var _chooseCityId = wx.getStorageSync("chooseCityId");
            if (_chooseCity) {
                that.setData({
                    chooseCity: _chooseCity,
                    chooseCityId: _chooseCityId
                });
            } else {
                // api.getAreas('common/areas/getPovinceList', 'GET').then(res => { //加载城市
                //   if (res.Code && res.Code == 1) {
                var _chooseCity = [];
                var _chooseCityId = [];
                var cityList = app.globalData.cityList;
                for (var i = 0; i < cityList.length; i++) {
                    _chooseCity.push(cityList[i].name);
                    _chooseCityId.push(cityList[i].numId);
                }
                that.setData({
                    chooseCity: _chooseCity,
                    //循环数组将Name存入chooseCity
                    chooseCityId: _chooseCityId
                });
                wx.setStorage({
                    key: "cityList",
                    data: cityList
                });
                wx.setStorage({
                    key: "chooseCity",
                    data: _chooseCity
                });
                wx.setStorage({
                    key: "chooseCityId",
                    data: _chooseCityId
                });
            }
        } catch (e) {}
        var userInfo = wx.getStorageSync("userInfo");
        if (userInfo) {
            that.initLogin();
            //初始化登录
                } else {
            if (app.globalData.initLogin) {
                that.initLogin();
                //初始化登录
                        } else {
                that.setData({
                    showLoad: false
                });
                wx.showTabBar();
            }
        }
        try {
            var shareRecommend = wx.getStorageSync("shareRecommend");
            if (shareRecommend) {} else {
                try {
                    wx.setStorageSync("shareRecommend", false);
                } catch (e) {}
            }
        } catch (e) {}
        wx.hideLoading();
    },
    // 初始化登录
    initLogin: function initLogin() {
        var that = this;
        wx.getStorage({
            key: "openid",
            success: function success(res) {
                app.globalData.openid = res.data;
                that.login(res.data);
            },
            fail: function fail() {
                wx.login({
                    success: function success(res) {
                        if (res.code) {
                            //发起网络请求
                            _api2.default.getJsCode2Session("MiniProgram/GetJsCode2Session", "POST", res.code).then(function(res) {
                                if (res.isSuccess) {
                                    var openid = res.result.openid;
                                    wx.setStorage({
                                        key: "openid",
                                        data: openid
                                    });
                                    app.globalData.openid = openid;
                                    that.login(openid);
                                } else {
                                    that.setData({
                                        serverfail: true,
                                        showLoad: false
                                    });
                                    return;
                                }
                            });
                        } else {}
                    }
                });
            }
        });
    },
    onShow: function onShow() {
        var that = this;
        try {
            var userInfo = wx.getStorageSync("userInfo");
            var userScore = wx.getStorageSync("userScore");
            var chooseCity = wx.getStorageSync("chooseCity");
            var chooseCityId = wx.getStorageSync("chooseCityId");
            var collegeRecommendBatchGroup = wx.getStorageSync("collegeRecommendBatchGroup");
            if (userScore && userInfo) {
                for (var i; i < chooseCityId.length; i++) {
                    if (chooseCityId[i] == userInfo[0].Province) {
                        that.setData({
                            cityName: chooseCity[i]
                        });
                        break;
                    }
                }
                that.setData({
                    userInfo: userInfo,
                    userScore: userScore
                });
                that.loadQuickNew(userInfo[0].Province);
                if (app.globalData.isGaokaoFlag == true) {
                    var _gaoKaoYear = app.getGaoKaoYear();
                    if (userInfo[0].SchoolId > 0) {
                        that.setData({
                            cityFlag: true
                        });
                    }
                    if (userInfo[0].GKYear == _gaoKaoYear && userScore.total != 0) {
                        that.setData({
                            changeGKScoreFlag: true
                        });
                    } else {
                        that.setData({
                            changeGKScoreFlag: false
                        });
                    }
                } else {}
                if (userInfo[0].MobilePhone != null) {
                    that.setData({
                        cityFlag: true
                    });
                }
                if (userScore.total == 0) {} else {
                    wx.setStorage({
                        key: "course",
                        data: userScore.courseType
                    });
                    that.setData({
                        userScore: userScore
                    });
                    if (userInfo[0].GKYear == gaoKaoYear && userInfo[0].MobilePhone != null) {
                        that.setData({
                            courseFlag: true
                        });
                    }
                    if (that.data.isGaokaoFlag == true && that.data.userScore.total != 0) {
                        that.setData({
                            courseFlag: true
                        });
                    }
                }
            }
            if (collegeRecommendBatchGroup) {
                wx.setStorage({
                    key: "collegeRecommendBatchGroup",
                    data: ""
                });
            } else {
                wx.setStorage({
                    key: "collegeRecommendBatchGroup",
                    data: ""
                });
            }
        } catch (e) {}
    },
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        if (res.from === "button") {}
        return {
            title: "看看你的分数能上什么大学",
            path: "/pages/index/index",
            success: function success(res) {
                if (app.globalData.shareFlag == true) {
                    try {
                        wx.setStorageSync("shareRecommend", true);
                    } catch (e) {}
                    that.setData({
                        share: true
                    });
                }
            },
            fail: function fail(res) {}
        };
    },
    goSearch: function goSearch() {
        //搜索
        wx.navigateTo({
            url: "../search/search?cls=indexSearch&flag=0"
        });
    },
    onPullDownRefresh: function onPullDownRefresh() {
        //下拉加载
        var that = this;
        this.onLoad();
        this.onShow();
    },
    enterInput: function enterInput(e) {
        //获取input中值
        var that = this;
        var gaokaoTotal = that.data.GaoKaoTotal;
        var xianChaIndex = that.data.xianChaIndex;
        var fentype = e.currentTarget.dataset.type;
        var checkedValue = that.data.checkedValue;
        var cityid = that.data.cityId;
        var value = e.detail.value;
        if (fentype == "getFen") {
            that.setData({
                getFen: value
            });
        }
        if (fentype == "weiFen") {
            that.setData({
                weiFen: value
            });
        }
    },
    radioChange: function radioChange(e) {
        //选择文/理科
        var checked = e.currentTarget.dataset.value;
        var that = this;
        if (checked == 1) {
            var _that$setData;
            that.setData((_that$setData = {
                checked: true,
                checkedValue: 1
            }, _defineProperty(_that$setData, "checkedValue", checked), _defineProperty(_that$setData, "historyKemu", "历史"), 
            _defineProperty(_that$setData, "xianChaFen", null), _that$setData));
            wx.setStorage({
                key: "course",
                data: 1
            });
        } else {
            var _that$setData2;
            that.setData((_that$setData2 = {
                checked: false,
                checkedValue: 0
            }, _defineProperty(_that$setData2, "checkedValue", checked), _defineProperty(_that$setData2, "historyKemu", "物理"), 
            _defineProperty(_that$setData2, "xianChaFen", null), _that$setData2));
            wx.setStorage({
                key: "course",
                data: 0
            });
        }
    },
    bindRegionHistory: function bindRegionHistory(e) {
        //选历史
        var history = e.detail.value;
        var historyValue = this.data.history[history];
        this.setData({
            historyIndex: history,
            historyValue: historyValue
        });
    },
    bindRegionKemu: function bindRegionKemu(e) {
        //选科目并确定
        var val = e.detail.value;
        var kemuValue = this.data.kemu[0][val[0]];
        var politicsValue = this.data.kemu[1][val[1]];
        this.setData({
            kemuIndex: val,
            kemuValue: kemuValue,
            politicsValue: politicsValue,
            politicsIndex: val[1]
        });
    },
    bindRegionXianCha: function bindRegionXianCha(e) {
        //选线差本一批、本二批、专科批
        var that = this;
        var xianCha = e.detail.value;
        var gaokaoTotal = that.data.GaoKaoTotal;
        var xianChaIndex = that.data.xianChaIndex;
        var checkedValue = that.data.checkedValue;
        var xianChaValue = that.data.xianCha[xianCha];
        var setdata = {
            xianChaIndex: xianCha,
            xianChaValue: xianChaValue,
            xianChaFen: null,
            lineGapMax: app.getLineGapMax(gaokaoTotal, xianCha, checkedValue)
        };
        that.setData(setdata);
    },
    fenChooseClick: function fenChooseClick(e) {
        //选预估总分/线差
        var that = this;
        var fenClass = e.currentTarget.dataset.id;
        if (fenClass == 0) {
            that.setData({
                fenClass: true
            });
        } else {
            that.setData({
                fenClass: false
            });
        }
    },
    chooseShangHaiSubject: function chooseShangHaiSubject(e) {
        //选择上海科目
        var that = this;
        var subjectName = e.currentTarget.dataset.name;
        var shangHaiSubject = that.data.shangHaiSubject;
        var shangHaiSubjectArr = [];
        if (that.data.shangHai != null && that.data.shangHai.length > 0) {
            shangHaiSubjectArr = that.data.shangHai.split(",");
        }
        for (var i in shangHaiSubject) {
            if (subjectName == shangHaiSubject[i].name) {
                var flag = !that.data.shangHaiSubject[i].st;
                if (flag == true && shangHaiSubjectArr.length < 3) {
                    that.data.shangHaiSubject[i].st = flag;
                    that.setData({
                        shangHaiSubjectArr: that.data.shangHaiSubjectArr.concat(subjectName),
                        shangHaiSubject: shangHaiSubject
                    });
                } else if (flag == false && shangHaiSubjectArr.length >= 0) {
                    that.data.shangHaiSubject[i].st = flag;
                    that.setData({
                        shangHaiSubject: shangHaiSubject
                    });
                    for (var j in shangHaiSubjectArr) {
                        if (subjectName == shangHaiSubjectArr[j]) {
                            shangHaiSubjectArr.splice(j, 1);
                            that.setData({
                                shangHaiSubjectArr: shangHaiSubjectArr
                            });
                        }
                    }
                }
            }
        }
        var shangHai = [];
        for (var _i4 = 0; _i4 < shangHaiSubject.length; _i4++) {
            if (shangHaiSubject[_i4].st == true) {
                shangHai.push(shangHaiSubject[_i4].name);
            }
        }
        shangHai = shangHai.join(",");
        that.setData({
            shangHai: shangHai
        });
        wx.setStorage({
            key: "shangHaiSubjectArr",
            data: that.data.shangHaiSubjectArr
        });
    },
    chooseZheJiangSubject: function chooseZheJiangSubject(e) {
        //选择浙江科目
        var that = this;
        var subjectName = e.currentTarget.dataset.name;
        var zheJiangSubject = that.data.zheJiangSubject;
        var zheJiangSubjectArr = [];
        if (that.data.zheJiang != null && that.data.zheJiang.length) {
            zheJiangSubjectArr = that.data.zheJiang.split(",");
        }
        for (var i in zheJiangSubject) {
            if (subjectName == zheJiangSubject[i].name) {
                var flag = !that.data.zheJiangSubject[i].st;
                if (flag == true && zheJiangSubjectArr.length < 3) {
                    that.data.zheJiangSubject[i].st = flag;
                    that.setData({
                        zheJiangSubjectArr: that.data.zheJiangSubjectArr.concat(subjectName),
                        zheJiangSubject: zheJiangSubject
                    });
                } else if (flag == false && zheJiangSubjectArr.length >= 0) {
                    that.data.zheJiangSubject[i].st = flag;
                    that.setData({
                        zheJiangSubject: zheJiangSubject
                    });
                    for (var j in zheJiangSubjectArr) {
                        if (subjectName == zheJiangSubjectArr[j]) {
                            zheJiangSubjectArr.splice(j, 1);
                            that.setData({
                                zheJiangSubjectArr: zheJiangSubjectArr
                            });
                        }
                    }
                }
            }
        }
        var zheJiang = [];
        for (var _i5 = 0; _i5 < zheJiangSubject.length; _i5++) {
            if (zheJiangSubject[_i5].st == true) {
                zheJiang.push(zheJiangSubject[_i5].name);
            }
        }
        zheJiang = zheJiang.join(",");
        that.setData({
            zheJiang: zheJiang
        });
        wx.setStorage({
            key: "zheJiangSubjectArr",
            data: that.data.zheJiangSubjectArr
        });
    },
    commonTuijian: function commonTuijian(e) {
        //院校智能推荐
        var that = this;
        if (!that.data.loginFlag) {
            this.loginPopup();
            return;
        }
        if (app.globalData.isGaokaoFlag && that.userInfo.GKYear != 2020) {
            that.showIsGaokaoPopup();
            return;
        }
        that.setData({
            ZNTBorYJTB: e.currentTarget.dataset.zntboryjtb
        });
        app.globalData.tuijianCommon = e.currentTarget.dataset.zntboryjtb;
        wx.showLoading({
            title: "创建成绩中"
        });
        var userScore = wx.getStorageSync("userScore");
        var cityId = that.data.cityId;
        var getFen = that.data.getFen;
        var checkedValue = that.data.checkedValue;
        var historyValue = that.data.historyValue;
        //B
                var kemuValue = that.data.kemuValue;
        //政治
                var politicsValue = that.data.politicsValue;
        // C
                var historyKemu = that.data.historyKemu;
        //物理
                var scoreArr = 1;
        var course = 0;
        ////////////////////////////////////////////重构部分
                var chooseSubjects = [];
        //上海浙江 6选3
                var chooseLevelList = [];
        //江苏
                var maxTotal = 750;
        if (that.cityId.cityId == 842) {
            maxTotal = 660;
        } else if (that.cityId.cityId == 1) {
            maxTotal = 480;
        } else if (that.cityId.cityId == 853) {
            maxTotal = 940;
        }
        if (!that.data.getFen) {
            wx.showToast({
                title: "请输入高考/模考总分",
                icon: "none",
                duration: 2e3
            });
            return;
        } else if (that.data.getFen < 100) {
            wx.showToast({
                title: "高考总分不得小于100分",
                icon: "none",
                duration: 2e3
            });
            return;
        } else if (that.data.getFen > maxTotal) {
            wx.showToast({
                title: "高考总分不得大于" + maxTotal + "分",
                icon: "none",
                duration: 2e3
            });
            return;
        }
        if (app.checkNewGaoKao(that.cityId.cityId)) {
            //新高考
            if (that.data.weiFen == "") {
                wx.showToast({
                    title: "请输入位次",
                    icon: "none",
                    duration: 2e3
                });
                return;
            } else if (that.data.weiFen < 1) {
                wx.showToast({
                    title: "位次不得小于1",
                    icon: "none",
                    duration: 2e3
                });
                return;
            }
            if (that.cityId.cityId == 842) {
                //上海版
                var shSubjects = [];
                var shangHaiSubject = that.data.shangHaiSubject;
                for (var i = 0; i < shangHaiSubject.length; i++) {
                    if (shangHaiSubject[i].st == true) {
                        shSubjects.push(shangHaiSubject[i].name);
                    }
                }
                if (shSubjects.length == 3) {
                    // 创建成绩
                    if (userScore.total == that.data.getFen && that.data.weiFen == userScore.rank && that.data.shangHai == userScore.chooseLevelOrSubjects) {
                        wx.hideLoading();
                        wx.navigateTo({
                            url: "/packages/recommend/shanghaiRecommend/shanghaiRecommend"
                        });
                    } else {
                        that.insertUserScore(parseInt(that.data.getFen), parseInt(that.data.weiFen), 0, that.scoreType, -1, shSubjects, []);
                    }
                } else {
                    wx.hideLoading();
                    wx.showToast({
                        title: "请选择3个选考",
                        icon: "none",
                        duration: 2e3
                    });
                }
            } else if (that.cityId.cityId == 843) {
                var zjSubjects = [];
                var zheJiangSubject = that.data.zheJiangSubject;
                for (var _i6 = 0; _i6 < zheJiangSubject.length; _i6++) {
                    if (zheJiangSubject[_i6].st == true) {
                        zjSubjects.push(zheJiangSubject[_i6].name);
                    }
                }
                if (zjSubjects.length == 3) {
                    // 创建成绩
                    if (userScore.total == that.data.getFen && that.data.weiFen == userScore.rank && that.data.zheJiang == userScore.chooseLevelOrSubjects) {
                        wx.hideLoading();
                        wx.navigateTo({
                            url: "/packages/recommend/collegeRecommend/collegeRecommend"
                        });
                    } else {
                        that.insertUserScore(parseInt(that.data.getFen), parseInt(that.data.weiFen), 0, that.scoreType, -1, zjSubjects, []);
                    }
                } else {
                    wx.hideLoading();
                    wx.showToast({
                        title: "请选择3个选考",
                        icon: "none",
                        duration: 2e3
                    });
                }
            }
        } else {
            if (userScore && userScore.total > 0) {
                if (that.cityId.cityId == 1) {
                    // 江苏
                    if (that.data.historyValue == userScore.chooseLevelList[0].value && that.data.politicsValue == userScore.chooseLevelList[1].value && that.data.kemuValue == userScore.chooseLevelList[1].name && that.data.checkedValue == userScore.courseType && that.data.getFen == userScore.total) {
                        wx.hideLoading();
                        if (that.data.ZNTBorYJTB == 1) {
                            // 一键填报
                            wx.navigateTo({
                                url: "/pages/YJTBRecommend/YJTBRecommend"
                            });
                        } else {
                            wx.navigateTo({
                                url: "/packages/recommend/jiangsuRecommend/jiangsuRecommend"
                            });
                        }
                    } else {
                        that.getRightBatch(that.cityId.cityId, parseInt(that.data.getFen), that.userInfo.courseType);
                    }
                } else {
                    // 传统
                    if (userScore.total == that.data.getFen && userScore.courseType == that.data.checkedValue) {
                        wx.hideLoading();
                        if (that.data.ZNTBorYJTB == 1) {
                            // 一键填报
                            wx.navigateTo({
                                url: "/pages/YJTBRecommend/YJTBRecommend"
                            });
                        } else {
                            wx.navigateTo({
                                url: "/packages/recommend/jiangsuRecommend/jiangsuRecommend"
                            });
                        }
                    } else {
                        that.getRightBatch(that.cityId.cityId, parseInt(that.data.getFen), that.userInfo.courseType);
                    }
                }
            } else {
                that.getRightBatch(that.cityId.cityId, parseInt(that.data.getFen), that.userInfo.courseType);
            }
        }
    },
    loadProLine: function loadProLine(pro, userInfo) {
        //获取最新年份省控线批次(包括批次和批次名称和分数)
        var that = this;
        _api2.default.getPrvControlLine("ScoreLines/Pcls/QueryAllByLatest?provinceNumId=" + pro, "POST").then(function(res) {
            if (res.isSuccess) {
                var scoreLine = [];
                var LK = [];
                var WK = [];
                for (var i = 0; i < res.result.length; i++) {
                    if (res.result[i].course == 0) {
                        LK.push(res.result[i]);
                    } else {
                        WK.push(res.result[i]);
                    }
                }
                scoreLine.push(LK);
                scoreLine.push(WK);
                wx.setStorage({
                    key: "gaokaoScore",
                    data: scoreLine
                });
            } else {
                that.setData({
                    showLoad: false
                });
            }
        });
    },
    gaoKaoIsOpened: function gaoKaoIsOpened(provinceId) {
        var that = this;
        _api2.default.gaoKaoIsOpened("Configuration/GaoKao/IsOpened", "POST", provinceId).then(function(result) {
            if (result) {
                var res = result;
                // res.result='true' //高考版测试，
                                if (res.result == "False") {
                    that.setData({
                        isGaokaoFlag: false
                    });
                    that.scoreType = 1;
                    var userScore = wx.getStorageSync("userScore");
                    if (userScore && userScore.total > 0) {
                        that.goBackScore();
                    } else {
                        that.getUserScoreByNumId(that.userInfo.UserId, that.userInfo.Province, that.data.isGaokaoFlag, true);
                    }
                } else {
                    that.scoreType = 2;
                    app.globalData.isGaokaoFlag = true;
                    app.globalData.changeGKScoreGlag = true;
                    that.setData({
                        isGaokaoFlag: true,
                        changeGKScoreFlag: true
                    });
                    that.getUserScoreByNumId(that.userInfo.UserId, that.userInfo.Province, true, true);
                }
            } else {}
            wx.stopPullDownRefresh();
        });
    },
    // 还原成绩
    goBackScore: function goBackScore() {
        var that = this;
        var userScore = wx.getStorageSync("userScore");
        if (userScore) {
            var tmpScore = {};
            tmpScore.getFen = userScore.total;
            tmpScore.weiFen = userScore.rank;
            var courseType = userScore.courseType;
            if (that.userInfo.GKYear == that.tmpYear) {
                courseType = that.userInfo.courseType;
            } else {
                if (userScore.total > 0) {
                    courseType = userScore.courseType;
                } else {
                    courseType = that.userInfo.courseType;
                }
            }
            wx.setStorageSync("course", courseType);
            if (app.checkNewGaoKao(that.userInfo.Province)) {
                if (that.userInfo.Province == 842) {
                    var shangHaiSubject = that.data.shangHaiSubject;
                    for (var j in shangHaiSubject) {
                        shangHaiSubject[j].st = false;
                    }
                    if (userScore.total > 0) {
                        for (var i in userScore.chooseSubjects) {
                            for (var _j3 in shangHaiSubject) {
                                if (userScore.chooseSubjects[i] == shangHaiSubject[_j3].name) {
                                    shangHaiSubject[_j3].st = true;
                                }
                            }
                        }
                    }
                    tmpScore.zheJiangShow = false;
                    tmpScore.shangHaiShow = true;
                    tmpScore.jiangSuShow = false;
                    tmpScore.shangHaiSubject = shangHaiSubject;
                    tmpScore.shangHai = userScore.chooseLevelOrSubjects;
                } else if (that.userInfo.Province == 843) {
                    var zheJiangSubject = that.data.zheJiangSubject;
                    for (var _j4 in zheJiangSubject) {
                        zheJiangSubject[_j4].st = false;
                    }
                    if (userScore.total > 0) {
                        for (var _i7 in userScore.chooseSubjects) {
                            for (var _j5 in zheJiangSubject) {
                                if (userScore.chooseSubjects[_i7] == zheJiangSubject[_j5].name) {
                                    zheJiangSubject[_j5].st = true;
                                }
                            }
                        }
                    }
                    tmpScore.zheJiangShow = true;
                    tmpScore.shangHaiShow = false;
                    tmpScore.jiangSuShow = false;
                    tmpScore.zheJiangSubject = zheJiangSubject;
                    tmpScore.zheJiang = userScore.chooseLevelOrSubjects;
                }
            } else if (that.cityId.cityId == 1) {
                //江苏版
                if (userScore.total > 0) {
                    var oneClass = userScore.chooseLevelList[0];
                    var twoClass = userScore.chooseLevelList[1];
                    var kemu = that.data.kemu;
                    var history = that.data.history;
                    var oneValue = "";
                    var kemuIndex = that.data.kemuIndex;
                    tmpScore.historyValue = oneClass.value;
                    tmpScore.kemuValue = twoClass.name;
                    tmpScore.politicsValue = twoClass.value;
                    tmpScore.checkedValue = userScore.courseType;
                    tmpScore.checked = userScore.courseType == 1 ? true : false;
                    //第一科目类别
                                        if (courseType == 1) {
                        tmpScore.historyKemu = "历史";
                    } else if (courseType == 0) {
                        tmpScore.historyKemu = "物理";
                    }
                    //第一科目的等级
                                        for (var _i8 = 0; _i8 < history.length; _i8++) {
                        //let politicsValue = that.data.politicsValue;
                        //var kemuValue = this.data.kemu[0][val[0]];
                        if (oneClass.value == history[_i8]) {
                            oneValue = _i8;
                            break;
                        }
                    }
                    //第二科目的类别
                                        for (var _j6 = 0; _j6 < kemu[0].length; _j6++) {
                        if (twoClass.name == kemu[0][_j6]) {
                            kemuIndex[0] = _j6;
                            break;
                        }
                    }
                    //第二科目的等级
                                        for (var k = 0; k < kemu[1].length; k++) {
                        if (twoClass.value == kemu[1][k]) {
                            kemuIndex[1] = k;
                            break;
                        }
                    }
                    //第一科目index效验
                                        tmpScore.historyIndex = oneValue;
                    //第二科目index效验
                                        tmpScore.kemuIndex = kemuIndex;
                }
                tmpScore.zheJiangShow = false;
                tmpScore.shangHaiShow = false;
                tmpScore.jiangSuShow = true;
                tmpScore.jiangSu = userScore.chooseLevelOrSubjects;
            } else {
                if (courseType == 1) {
                    tmpScore.checked = true;
                    tmpScore.checkedValue = 1;
                } else if (courseType == 0) {
                    tmpScore.checked = false;
                    tmpScore.checkedValue = 0;
                }
            }
            that.setData(tmpScore);
        } else {
            //获取成绩
            // that.getUserScoreByNumId(that.userInfo.UserId, that.userInfo.Province, that.data.isGaokaoFlag, true);
        }
    },
    //登录主入口
    //查成绩、用户省份、
    login: function login(openid) {
        var that = this;
        // try {
                var userDto = wx.getStorageSync("userDto");
        if (userDto) {
            var userInfo = wx.getStorageSync("userInfo")[0];
            that.cityId = wx.getStorageSync("cityId");
            var userScore = wx.getStorageSync("userScore");
            if (typeof userInfo != "undefined") {
                that.setData({
                    loginFlag: true
                });
                var sex = wx.getStorageSync("sex");
                if (sex) {} else {
                    if (userInfo.gender != -1) {
                        wx.setStorage({
                            key: "sex",
                            data: userInfo.gender
                        });
                    } else {
                        wx.setStorage({
                            key: "sex",
                            data: 6
                        });
                    }
                }
                if (userInfo.MobilePhone == "" || userInfo.MobilePhone == null) {
                    wx.redirectTo({
                        url: "/pages/bindMobile/index"
                    });
                    return;
                }
                if (userInfo.GKYear != 0 && userInfo.Province != 0) {
                    that.setIndexFlag(userInfo.Province);
                } else {
                    wx.redirectTo({
                        url: "/pages/ImproveGKInformation/index"
                    });
                }
                that.setData({
                    checked: userInfo.courseType
                });
                that.setData({
                    checked: userInfo.courseType == 0 ? false : true,
                    checkedValue: userInfo.courseType
                });
                that.userInfo = userInfo;
                if (userInfo.userPermissionProvinceId != null) {
                    that.loadQuickNew(userInfo.userPermissionProvinceId);
                }
                that.gaoKaoIsOpened(userInfo.Province, userInfo);
                var gaokaoScore = wx.getStorageSync("gaokaoScore");
                // 加载省控线
                                if (gaokaoScore) {
                    that.setData({
                        showLoad: false
                    });
                } else {
                    that.loadProLine(userInfo.Province, userInfo);
                }
                if (userInfo.GKYear == that.tmpYear) {
                    that.setData({
                        courseFlag: true
                    });
                }
                that.setData({
                    cityFlag: true,
                    cityName: that.cityId.provinceName,
                    cityId: that.cityId.cityId
                });
                //登录后的综合逻辑
                                wx.showTabBar();
            } else {
                that.getUserBrief(userDto.numId, true);
            }
            //判断是否有高考版
            //判断用户信息缓存
                } else {
            _api2.default.validateSocialUser("Users/Socials/Validate", "POST", 6, openid).then(function(res) {
                //登录失败了
                if (!res.isSuccess) {
                    wx.showModal({
                        content: res.message,
                        confirmText: "重新加载",
                        showCancel: false,
                        success: function success(res) {
                            that.setData({
                                showLoad: true
                            });
                            that.login(app.globalData.openid);
                        },
                        fail: function fail(res) {},
                        complete: function complete(res) {}
                    });
                    return;
                }
                //去绑定手机号
                                if (res.result && res.result.status == 600) {
                    // ---------------------------------------------------------------------------------------------
                    wx.redirectTo({
                        url: "/pages/bindMobile/index"
                    });
                } else if (res.result && res.result.status == 200 && res.result.userIdDto) {
                    if (res.result.userIdDto.numId > 0) {
                        wx.setStorage({
                            key: "userDto",
                            data: res.result.userIdDto
                        });
                        //登录成功
                                                var userIdDto = res.result.userIdDto;
                        var _userInfo = wx.getStorageSync("userInfo")[0];
                        that.cityId = wx.getStorageSync("cityId");
                        var userScore = wx.getStorageSync("userScore");
                        if (typeof _userInfo != "undefined") {
                            that.setData({
                                loginFlag: true
                            });
                            var _sex = wx.getStorageSync("sex");
                            if (_sex) {} else {
                                if (res.result.gender != -1) {
                                    wx.setStorage({
                                        key: "sex",
                                        data: res.result.gender
                                    });
                                } else {
                                    wx.setStorage({
                                        key: "sex",
                                        data: 6
                                    });
                                }
                            }
                            if (_userInfo.MobilePhone == "" || _userInfo.MobilePhone == null) {
                                wx.redirectTo({
                                    url: "/pages/bindMobile/index"
                                });
                                return;
                            }
                            that.setData({
                                checked: _userInfo.courseType
                            });
                            that.setData({
                                checked: _userInfo.courseType == 0 ? false : true,
                                checkedValue: _userInfo.courseType
                            });
                            that.userInfo = _userInfo;
                            if (_userInfo.userPermissionProvinceId != null) {
                                that.loadQuickNew(_userInfo.userPermissionProvinceId);
                            }
                            that.gaoKaoIsOpened(_userInfo.Province, _userInfo);
                            var _gaokaoScore = wx.getStorageSync("gaokaoScore");
                            // 加载省控线
                                                        if (_gaokaoScore) {} else {
                                that.loadProLine(_userInfo.Province, _userInfo);
                            }
                            if (_userInfo.GKYear == that.tmpYear) {
                                that.setData({
                                    courseFlag: true
                                });
                            }
                            that.setData({
                                cityFlag: true,
                                cityName: that.cityId.provinceName,
                                cityId: that.cityId.cityId
                            });
                            //登录后的综合逻辑
                                                        wx.showTabBar();
                        } else {
                            that.getUserBrief(res.result.userIdDto.numId, true);
                        }
                        //判断是否有高考版
                        //判断用户信息缓存
                                        } else {
                        that.setData({
                            serverfail: true,
                            showLoad: false
                        });
                        return;
                    }
                } else {
                    that.setData({
                        serverfail: true,
                        showLoad: false
                    });
                }
            }, function(fail) {
                that.login(app.globalData.openid);
            });
        }
    },
    loadCityInfo: function loadCityInfo() {
        var that = this;
        wx.getStorage({
            key: "cityId",
            success: function success(res) {
                var cityId = res.data.cityId;
                if (cityId == 842) {
                    //上海
                    wx.getStorage({
                        key: "shangHaiSubjectArr",
                        success: function success(res) {
                            that.setData({
                                shangHaiSubjectArr: res.data
                            });
                            for (var i = 0; i < res.data.length; i++) {
                                for (var j = 0; j < that.data.shangHaiSubject.length; j++) {
                                    if (res.data[i] == that.data.shangHaiSubject[j].name) {
                                        that.data.shangHaiSubject[j].st = true;
                                        that.setData({
                                            shangHaiSubject: that.data.shangHaiSubject
                                        });
                                    }
                                }
                            }
                        }
                    });
                    that.setData({
                        shangHaiShow: true,
                        zheJiangShow: false,
                        jiangSuShow: false
                    });
                } else if (cityId == 843) {
                    //浙江
                    wx.getStorage({
                        key: "zheJiangSubjectArr",
                        success: function success(res) {
                            that.setData({
                                zheJiangSubjectArr: res.data
                            });
                            for (var i = 0; i < res.data.length; i++) {
                                for (var j = 0; j < that.data.zheJiangSubject.length; j++) {
                                    if (res.data[i] == that.data.zheJiangSubject[j].name) {
                                        that.data.zheJiangSubject[j].st = true;
                                        that.setData({
                                            zheJiangSubject: that.data.zheJiangSubject
                                        });
                                    }
                                }
                            }
                        }
                    });
                    that.setData({
                        zheJiangShow: true,
                        shangHaiShow: false,
                        jiangSuShow: false
                    });
                } else if (cityId == 1) {
                    //江苏
                    that.setData({
                        zheJiangShow: false,
                        shangHaiShow: false,
                        jiangSuShow: true
                    });
                } else {
                    that.setData({
                        shangHaiShow: false,
                        zheJiangShow: false,
                        jiangSuShow: false
                    });
                }
            }
        });
    },
    YJTBBtn: function YJTBBtn() {
        wx.navigateTo({
            url: "../YJTBRecommend/YJTBRecommend"
        });
    },
    // 小美快讯详情
    goQuickNews: function goQuickNews(e) {
        var that = this;
        wx.navigateTo({
            url: "../quickNews/quickNews?source=index"
        });
    },
    //获取小美快讯数据
    loadQuickNew: function loadQuickNew(pro) {
        var that = this;
        _api2.default.getQuickNew("Notification/QuickNotify/Query?provinceId=" + pro + "&count=20", "POST").then(function(res) {
            if (res.result.length > 0) {
                that.setData({
                    quickNewsFlag: res.result
                });
                res.result.forEach(function(ele) {
                    ele.creationTime = app.transDateTime(ele.creationTime);
                });
                app.globalData.quickNewList = res.result;
            }
        });
    },
    enterWeici: function enterWeici(e) {
        this.setData({
            weiFen: e.detail.value
        });
    },
    zytianbao: function zytianbao() {
        if (app.globalData.system == "ios") {
            wx.showModal({
                title: "温馨提示",
                content: app.globalData.payBtnText,
                showCancel: false,
                success: function success(res) {
                    if (res.confirm) {}
                }
            });
        } else {
            wx.navigateTo({
                url: "../zytianbao/zytianbao"
            });
        }
    },
    zzzhaosheng: function zzzhaosheng() {
        if (app.globalData.system == "ios") {
            wx.showModal({
                title: "温馨提示",
                content: app.globalData.payBtnText,
                showCancel: false,
                success: function success(res) {
                    if (res.confirm) {}
                }
            });
        } else {
            wx.navigateTo({
                url: "../zzzhaosheng/zzzhaosheng"
            });
        }
    },
    youxue: function youxue() {
        wx.navigateTo({
            url: "../youxue/youxue"
        });
    },
    addFromid: function addFromid(e) {
        if (e.detail.formId == "the formId is a mock one") {
            formidArrOld.push("");
        } else {
            formidArrOld.push(e.detail.formId);
        }
        while (formidArrOld.length == 5) {
            formidArr = formidArrOld.join(",");
            formidArrOld = [];
            this.goActivityBargain();
            break;
        }
    },
    // 跳转0元购活动
    goActivityBargain: function goActivityBargain() {
        this.hidePopup();
        wx.navigateTo({
            url: "../../packages/activityBargain/index/index?formid=" + formidArr
        });
    },
    // userInfoGoActivityBargain(e) {
    //   const that = this;
    //   wx.getUserInfo({
    //     success: function(res) {
    //       if (e.detail.errMsg != "the formId is a mock one") {
    //         var formId = e.detail.formId;
    //         wx.navigateTo({
    //           url: '../../packages/activityBargain/index/index?formid=' + formId,
    //         })
    //       } else {
    //         wx.navigateTo({
    //           url: '../../packages/activityBargain/index/index',
    //         })
    //       }
    //     },
    //     fail: function() {}
    //   })
    // },
    showIsGaokaoPopup: function showIsGaokaoPopup() {
        var that = this;
        that.setData({
            "isGaokao.bgOpacity": 0,
            "isGaokao.wrapAnimate": "wrapAnimate",
            "isGaokao.popupAnimate": "popupAnimate",
            "isGaokao.Flag": true
        });
    },
    hideIsGaokaoPopup: function hideIsGaokaoPopup() {
        var that = this;
        that.setData({
            "isGaokao.bgOpacity": .4,
            "isGaokao.wrapAnimate": "wrapAnimateOut",
            "isGaokao.popupAnimate": "popupAnimateOut"
        });
        setTimeout(function() {
            that.setData({
                "isGaokao.Flag": false
            });
        }, 200);
    },
    callMobile: function callMobile() {
        app.callMobile();
    }
});