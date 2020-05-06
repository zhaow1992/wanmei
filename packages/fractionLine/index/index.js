var _Page;

var _api = require("../api.js");

var _api2 = _interopRequireDefault(_api);

var _api3 = require("../../../utils/api.js");

var _api4 = _interopRequireDefault(_api3);

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

var timer = void 0;

var sensors = require("./../../../utils/sensors.js");

var contentTypeArr = [];

Page((_Page = {
    jiangSuSubject: "",
    flag: false,
    dropDownAnimate: "",
    cityId: "",
    uCode: "",
    configs: "",
    directIndex: 0,
    courseFlag: 0,
    yearFlag: 0,
    majorBackList: [],
    planBackList: [],
    planOrderStatus: false,
    majorOrderStatus: false,
    subjectIndex: false,
    collegeLineAllList: [],
    batchIndex: 0,
    traditionalArtPlans: [],
    traditionalSciencePlans: [],
    traditionalAllPlans: [],
    newGaoKaoAllPlanList: [],
    newGaoKaoAllMajorList: [],
    data: {
        desc: null,
        yearIndex: 0,
        scrollTop: -100,
        // 设定触发条件的距离
        applyCardFlag: false,
        //是否申请过会员卡判断
        applyCardTime: 180,
        //申请倒计时
        banApplyCard: false,
        //禁用
        applyCardLoading: false,
        //loading
        share: false,
        planConfigs: [],
        payBtnText: app.globalData.payBtnText,
        system: "android",
        popup: {
            popupFlag: false,
            wrapAnimate: "",
            popupAnimate: "",
            bgOpacity: ""
        },
        usertype: 0,
        mobile: false,
        batchName: "",
        shanghaiUpIcon: "/image/tabDown.png",
        shanghaiDownIcon: "/image/tabDown.png",
        dataExplainText: [],
        showLoad: "true",
        scorceTabList: [ "院校分数线", "专业分数线", "招生计划" ],
        zheJiangTabList: [ "专业分数线", "招生计划" ],
        scrollViewHeight: "410",
        GKStatus: false,
        //如果是高三学生，则true
        collegeData: false,
        majorData: false,
        planData: false,
        swiperHeight: "553",
        majorListScore: "最低分/最低位次",
        /**36vw-----存在选科时，显示 */
        majorWidth: "",
        Province: "",
        /**1- 江苏 上海-842 843-浙江 */
        cityId: "843",
        showCollegeCourse: false,
        //显示院校的本/专科
        showCollegeSubject: false,
        //显示院校的
        showMajorCourse: false,
        //显示专业的文理科
        showMajorSubject: false,
        //显示专业的选科 
        showPlanCourse: false,
        //显示招生计划的文理科
        showPlanSubject: false,
        //显示招生计划的本科
        majorHighType: false,
        yearList: [],
        subjectName: "科目",
        subjectItem: [ {
            name: "思想政治",
            value: 0
        }, {
            name: "历史",
            value: 1
        }, {
            name: "地理",
            value: 2
        }, {
            name: "生命科学",
            value: 3
        }, {
            name: "物理",
            value: 4
        }, {
            name: "化学",
            value: 5
        } ],
        //上海科目
        batch: "",
        //大专-collegeGraduated
        // planBatchFlag: false,
        provinceName: "黑龙江",
        /*/image/tabDown.png */
        upOrderIcon: "/image/tabDown.png",
        downOrderIcon: "/image/tabDown.png",
        // 院校分数线
        collegeLineList: [],
        majorListGraduated: [],
        //专业分数线-上海专科
        majorListzhejiang: [],
        //专业分数线-浙江
        majorListTraditional: [],
        //专业分数线-传统/江苏
        planListTraditional: [],
        planListjiangsu: [],
        planListshanghai: [],
        planListzhejiang: [],
        batchFlag: false,
        //录取批次
        manyDirect: false,
        showDirect: false,
        importTips: [],
        courseItem: [ {
            name: "文科",
            value: 1
        }, {
            name: "理科",
            value: 0
        } ],
        batchItem: [],
        artsAndSciences: "-",
        /**上海版院校线为最高分，其他为最高分/平均分 */
        listThreeName: "最高分/平均分",
        currentTab: "0",
        majorYear: "",
        frameTitle: "招生方向",
        directList: [],
        direct: "中国人民大学(中外合作)",
        zheJiangVer: false
    },
    onPullDownRefresh: function onPullDownRefresh() {
        //下拉加载
        var that = this;
        if (app.globalData.applyCardFlag) {
            var userInfo = wx.getStorageSync("userInfo");
            _api4.default.GetPermission("Users/GetPermission", "POST", userInfo[0].MobilePhone).then(function(res) {
                if (res.isSuccess) {
                    var _userInfo = wx.getStorageSync("userInfo");
                    _userInfo[0].UserType = res.result.userPermissionId;
                    wx.setStorageSync("userInfo", _userInfo);
                    if (res.result.userPermissionId > 1) {
                        app.globalData.applyCardFlag = false;
                        that.onLoad(that.options);
                    }
                }
                wx.stopPullDownRefresh();
            });
        } else {
            this.onLoad(this.options);
        }
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
                _api4.default.ApplyMWebPay("Users/ApplyMWebPay", "POST", userNumId, domain).then(function(res) {
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
    onUnload: function onUnload() {
        contentTypeArr = [];
    },
    InsertSA: function InsertSA(sourcePage, contentType, year, result, restrict) {
        var isSensors = true;
        for (var i = 0, j = contentTypeArr.length; i < j; i++) {
            if (contentTypeArr[i] == contentType) {
                isSensors = false;
                break;
            }
        }
        if (!isSensors) return;
        contentTypeArr.push(contentType);
        var that = this;
        var SA_source_page = sourcePage;
        var SA_content_type = contentType;
        var SA_years = year;
        var SA_subject = that.data.artsAndSciences;
        var SA_batch = that.data.batchName;
        var SA_province = that.data.provinceName;
        // let SA_province = '';
                var SA_direction = that.data.direct || "";
        var SA_code = that.options.collegeId;
        var SA_name = that.options.title;
        var SA_college_province = "";
        //院校所在地
                var SA_isBen = "";
        //院校层次
                var SA_level = that.level;
        //院校标签
                var SA_classify = that.classify;
        //院校类型
                var SA_type = that.type;
        //院校性质
                var SA_current = null;
        //是否本省
                var SA_attention = null;
        //是否关注
                var SA_result = result;
        var SA_restrict = restrict;
        //是否受限
                var data = {
            SA_source_page: SA_source_page,
            SA_content_type: SA_content_type,
            SA_years: SA_years,
            SA_subject: SA_subject,
            SA_batch: SA_batch,
            SA_province: SA_province,
            SA_direction: SA_direction,
            SA_code: SA_code,
            SA_name: SA_name,
            SA_college_province: SA_college_province,
            SA_isBen: SA_isBen,
            SA_level: SA_level,
            SA_classify: SA_classify,
            SA_type: SA_type,
            SA_current: SA_current,
            SA_attention: SA_attention,
            SA_result: SA_result,
            SA_restrict: SA_restrict
        };
        console.log(contentType);
        app.sensors.track("ScoreLineView", sensors.ScoreLineView(data));
    },
    //招生计划数排序
    orderPlanNum: function orderPlanNum(itemtype, reverse) {
        var that = this;
        if (itemtype == "shanghaiplan") {
            var collegesArray = that.data.planListshanghai.sort(app.compare("planCount"));
            if (reverse) {
                collegesArray = collegesArray.reverse();
            }
            that.setData({
                planListshanghai: collegesArray
            });
        } else if (itemtype == "traditionalplan") {
            var _collegesArray = that.data.planListTraditional.sort(app.compare("planCount"));
            if (reverse) {
                _collegesArray = _collegesArray.reverse();
            }
            that.setData({
                planListTraditional: _collegesArray
            });
        }
    },
    //点击招生计划数排序
    planNumTap: function planNumTap(e) {
        var that = this;
        var itemtype = e.currentTarget.dataset.type;
        if (!that.data.planData) {
            return;
        }
        if (that.planBackList.length == 0) {
            if (itemtype == "shanghaiplan") {
                that.planBackList = JSON.parse(JSON.stringify(that.data.planListshanghai));
            } else if (itemtype == "traditionalplan") {
                that.planBackList = JSON.parse(JSON.stringify(that.data.planListTraditional));
            }
        } else {}
        if (that.planOrderStatus == false) {
            //降序
            that.orderPlanNum(itemtype, true);
            that.planOrderStatus = "down";
            that.setData({
                shanghaiUpIcon: "/image/tabDown.png",
                shanghaiDownIcon: "/image/tabDownRed.png"
            });
        } else if (that.planOrderStatus == "down") {
            //升序
            that.orderPlanNum(itemtype, false);
            that.planOrderStatus = "up";
            that.setData({
                shanghaiUpIcon: "/image/tabDownRed.png",
                shanghaiDownIcon: "/image/tabDown.png"
            });
        } else if (that.planOrderStatus == "up") {
            //默认
            var tmpData = {
                shanghaiUpIcon: "/image/tabDown.png",
                shanghaiDownIcon: "/image/tabDown.png"
            };
            that.planOrderStatus = false;
            if (itemtype == "traditionalplan") {
                tmpData.planListTraditional = that.planBackList;
            }
            if (itemtype == "shanghaiplan") {
                tmpData.planListshanghai = that.planBackList;
            }
            that.setData(tmpData);
            that.planBackList = [];
        }
    },
    //ScoreLines/NewGaoKao/QueryCollegeYearFractions
    //查询新高考指定院校分数线（院校主页）
    queryNewGaoKaoCollegeYearFractions: function queryNewGaoKaoCollegeYearFractions(provinceId, collegeId, uCode) {
        var that = this;
        _api2.default.queryNewGaoKaoCollegeYearFractions("ScoreLines/NewGaoKao/QueryCollegeYearFractions", "POST", provinceId, collegeId, uCode).then(function(res) {
            var collegeLineList = [];
            //batchName
                        if (res.result) {
                var colleges = res.result;
                for (var i in colleges) {
                    var collegeSingle = {};
                    collegeSingle.year = colleges[i].year;
                    var batch = "";
                    // batch += " " + colleges[i].batchName;
                                        batch += " " + colleges[i].chooseCns;
                    collegeSingle.batch = batch;
                    //平均分
                                        if (colleges[i].avgScore && colleges[i].avgScore != 0) {
                        collegeSingle.averageScore = colleges[i].avgScore;
                    } else {
                        collegeSingle.averageScore = "-";
                    }
                    //最低分
                                        if (colleges[i].minScore && colleges[i].minScore != 0) {
                        collegeSingle.lowScore = colleges[i].minScore;
                    } else {
                        collegeSingle.averageScore = "-";
                    }
                    //最低位次
                                        if (colleges[i].minSort && colleges[i].minSort != 0) {
                        collegeSingle.lowOrder = colleges[i].minSort;
                    } else {
                        collegeSingle.lowOrder = "-";
                    }
                    //最高分
                                        if (colleges[i].maxScore && colleges[i].maxScore != 0) {
                        collegeSingle.heighScore = colleges[i].maxScore;
                    } else {
                        collegeSingle.heighScore = "-";
                    }
                    //录取数
                                        if (colleges[i].enterNum && colleges[i].enterNum != 0) {
                        collegeSingle.count = colleges[i].enterNum;
                    } else {
                        collegeSingle.count = "-";
                    }
                    collegeSingle.course = colleges[i].course;
                    collegeLineList.push(collegeSingle);
                }
                that.setData({
                    collegeLineList: collegeLineList,
                    collegeData: "true"
                });
            } else {
                that.setData({
                    collegeData: "no"
                });
            }
        });
    },
    //筛选新高考的专业分数线
    chooseNewGaoKaoMajor: function chooseNewGaoKaoMajor(year, subject, batch, direct) {
        var that = this;
        var tmpData = {};
        var provinceId = that.cityId;
        if (provinceId == "842") {
            tmpData.majorListGraduated = [];
        } else if (provinceId == "843") {
            tmpData.majorListzhejiang = [];
        }
        for (var i in that.newGaoKaoAllMajorList) {
            if (subject == that.newGaoKaoAllMajorList[i].chooseName) {
                var serverPlanStart = that.newGaoKaoAllMajorList[i].collegePlans;
                var majorListNewGaoKao = [];
                for (var p in serverPlanStart) {
                    var collegePlan = serverPlanStart[p];
                    var myear = "-";
                    var money = "-";
                    var lowScore = "-";
                    var lowOrder = "-";
                    var majorListSingle = {};
                    if (collegePlan.year == year && collegePlan.batch == batch) {
                        if (collegePlan.minSort && collegePlan.minSort > 0) {
                            lowOrder = collegePlan.minSort;
                        }
                        if (collegePlan.minScore && collegePlan.minScore > 0) {
                            lowScore = collegePlan.minScore;
                        }
                        majorListSingle.lowScore = lowScore;
                        majorListSingle.year = year;
                        majorListSingle.lowOrder = lowOrder;
                        majorListSingle.major = collegePlan.professionName;
                        majorListSingle.selectSubjects = collegePlan.chooseCns;
                        if (provinceId == "842") {
                            var enterNum = "-";
                            if (collegePlan.enterNum && collegePlan.enterNum > 0) {
                                enterNum = collegePlan.enterNum;
                            }
                            majorListSingle.enterNum = enterNum;
                            majorListSingle.subjects = collegePlan.chooseCns;
                            majorListSingle.subjectCode = collegePlan.chooseNums;
                        } else if (provinceId == "843") {
                            var enterNum1 = "-";
                            var enterNum2 = "-";
                            var enterNum3 = "-";
                            if (collegePlan.enterNum1 && collegePlan.enterNum1 > 0) {
                                enterNum1 = collegePlan.enterNum1;
                            }
                            if (collegePlan.enterNum2 && collegePlan.enterNum2 > 0) {
                                enterNum2 = collegePlan.enterNum2;
                            }
                            if (collegePlan.enterNum3 && collegePlan.enterNum3 > 0) {
                                enterNum3 = collegePlan.enterNum3;
                            }
                            var enterOrder = enterNum1 + "/" + enterNum2 + "/" + enterNum3;
                            majorListSingle.enterOrder = enterOrder;
                        }
                        majorListNewGaoKao.push(majorListSingle);
                    }
                }
                if (provinceId == "842") {
                    tmpData.majorListGraduated = majorListNewGaoKao;
                } else if (provinceId == "843") {
                    tmpData.majorListzhejiang = majorListNewGaoKao;
                }
                tmpData.majorData = true;
                that.setData(tmpData);
            }
        }
    },
    //选择选考科目的菜单
    chooseSubject: function chooseSubject(e) {
        var that = this;
        var id = e.detail;
        if (that.subjectIndex == id) {
            return;
        }
        that.subjectIndex = id;
        var subject = that.data.subjectItem[that.subjectIndex].name;
        var batch = that.data.batchItem[that.batchIndex].value;
        that.setData({
            subjectName: subject
        });
        if (that.data.majorListzhejiang.length > 0 || that.data.majorListGraduated.length > 0) {
            that.chooseNewGaoKaoMajor(that.data.majorYear, subject, batch, that.directIndex);
        }
        if (that.data.planListshanghai.length > 0 || that.data.planListzhejiang.length > 0) {
            that.chooseNewGaoKaoPlan(subject, batch, that.directIndex);
        }
    },
    //选择年份列表中的选项，得到index
    chooseYearItem: function chooseYearItem(e) {
        console.log(e);
        var that = this;
        if (that.configs) {
            var id = e.detail;
            var year = that.data.yearList[id].name;
            that.setData({
                yearIndex: id
            });
            if (year == that.data.majorYear) {
                return;
            }
            that.setData({
                majorYear: year
            });
            //专业分数线的数据
                        var batchItem = [];
            var batchName = "";
            var batch = 0;
            var config = that.configs[that.directIndex];
            if (that.data.cityId != 842 && that.data.cityId != 843) {
                if (config.years[id].batchs.length > 0) {
                    for (var i = 0; i < config.years[id].batchs.length; i++) {
                        var batchSingle = {};
                        batchSingle.name = config.years[id].batchs[i].batchName;
                        batchSingle.value = config.years[id].batchs[i].batch;
                        batchItem.push(batchSingle);
                    }
                    batchName = config.years[id].batchs[that.batchIndex].batchName;
                }
                that.setData({
                    batchName: batchName,
                    batchItem: batchItem
                });
                batch = batchItem[0].value;
            }
            if (that.data.usertype > 1) {
                that.setData({
                    majorData: false
                });
                var newGaokao = false;
                if (that.data.cityId == 842 || that.data.cityId == 843) {
                    newGaokao = true;
                }
                that.getProfessionsFractions(newGaokao, config.uCode, batch, that.courseFlag, year, year);
            }
        } else {
            var _id = e.detail;
            var _year = that.data.yearList[_id].name;
            that.setData({
                majorYear: _year,
                yearIndex: _id
            });
        }
    },
    //显示文理科和批次条件下的传统版招生计划
    showTraditionalPlan: function showTraditionalPlan(course, batch) {
        var that = this;
        var planListTraditional = [];
        //traditionalAllPlans
                if (that.traditionalAllPlans.length == 0) {
            that.setData({
                planData: "no"
            });
            return;
        }
        for (var i in that.traditionalAllPlans) {
            var planSingle = {};
            var plans = that.traditionalAllPlans[i];
            if (plans.batch == batch && course == plans.courseType) {
                planSingle.major = plans.professionName;
                if (plans.planNum && plans.planNum > 0) {
                    planSingle.planCount = plans.planNum;
                }
                planSingle.money = plans.cost;
                //year
                                planSingle.year = plans.learnYear;
                planListTraditional.push(planSingle);
            }
        }
        if (planListTraditional.length > 0) {
            that.setData({
                planData: true,
                planListTraditional: planListTraditional
            });
        } else {
            that.setData({
                planData: "no"
            });
        }
    },
    //显示本科批条件下的传统版招生计划
    //获取全部招生计划
    getProfessionsPlans: function getProfessionsPlans(newGaokao, year, uCode) {
        var that = this;
        var cityId = that.cityId;
        var planYear = that.data.planYear;
        if (!newGaokao) {
            _api2.default.queryCollegePlans("ScoreLines/Plans/Professions/Query", "POST", planYear, uCode).then(function(res) {
                var planListTraditional = [];
                if (res.result && res.result.plans) {
                    that.traditionalAllPlans = res.result.plans;
                }
                if (res.result.plans.length > 0) {
                    var batch = that.data.planConfigs.batchs[0].batch;
                    that.showTraditionalPlan(that.courseFlag, batch);
                }
                that.InsertSA(that.source, "招生计划", planYear, res.result.plans.length > 0 ? true : false, false);
            });
        } else {
            that.queryNewGaoKaoCollegePlansWithChooseNums(cityId, that.options.collegeId, 1, uCode);
        }
    },
    //自己在院校分数线中筛选文理数据
    chooseCollegeLineListByCourse: function chooseCollegeLineListByCourse(course) {
        var that = this;
        var chooseList = [];
        for (var i in that.collegeLineAllList) {
            if (that.collegeLineAllList[i].course == course) {
                chooseList.push(that.collegeLineAllList[i]);
            }
        }
        if (chooseList.length > 0) {
            that.setData({
                collegeData: "true",
                collegeLineList: chooseList
            });
        } else {
            that.setData({
                collegeData: "no"
            });
        }
    },
    //通过省份和UCode 以及年份区间查询{{{{{{{{{{{{{{{{{{{院校分数线}}}}}}}}}}}}}}}}}}}
    getCollegesFractions: function getCollegesFractions(newGaokao, provinceNumId, uCode) {
        var that = this;
        if (!newGaokao) {
            that.setData({
                collegeLineList: []
            });
            _api2.default.queryCollegesFractions("ScoreLines/Fractions/Colleges/Query", "POST", provinceNumId, uCode).then(function(res) {
                var collegeLineList = [];
                if (res.result.length > 0) {
                    var colleges = res.result;
                    for (var i in colleges) {
                        var collegeSingle = {};
                        collegeSingle.year = colleges[i].year;
                        var batch = "-";
                        if (colleges[i].course == "0") {
                            batch = "理科";
                        } else if (colleges[i].course == "1") {
                            batch = "文科";
                        }
                        batch += " " + colleges[i].batchName;
                        batch += " " + colleges[i].chooseLevel;
                        collegeSingle.batch = batch;
                        //平均分
                                                if (colleges[i].avgScore && colleges[i].avgScore != 0) {
                            collegeSingle.averageScore = colleges[i].avgScore;
                        } else {
                            collegeSingle.averageScore = "-";
                        }
                        //最低分
                                                if (colleges[i].minScore && colleges[i].minScore != 0) {
                            collegeSingle.lowScore = colleges[i].minScore;
                        } else {
                            collegeSingle.averageScore = "-";
                        }
                        //最低位次
                                                if (colleges[i].lowSort && colleges[i].lowSort != 0) {
                            collegeSingle.lowOrder = colleges[i].lowSort;
                        } else {
                            collegeSingle.lowOrder = "-";
                        }
                        //最高分
                                                if (colleges[i].maxScore && colleges[i].maxScore != 0) {
                            collegeSingle.heighScore = colleges[i].maxScore;
                        } else {
                            collegeSingle.heighScore = "-";
                        }
                        //录取数
                                                if (colleges[i].enterNum && colleges[i].enterNum != 0) {
                            collegeSingle.count = colleges[i].enterNum;
                        } else {
                            collegeSingle.count = "-";
                        }
                        collegeSingle.course = colleges[i].course;
                        collegeLineList.push(collegeSingle);
                    }
                    that.collegeLineAllList = collegeLineList;
                    that.setData({
                        collegeData: "true"
                    });
                    // 修改
                                        var userCourse = that.data.artsAndSciences == "文科" ? 1 : 0;
                    that.chooseCollegeLineListByCourse(userCourse);
                    // that.chooseCollegeLineListByCourse(0);
                                } else {
                    that.setData({
                        collegeData: "no"
                    });
                }
                that.InsertSA(that.source, "院校分数线", "", res.result.length > 0 ? true : false, false);
            });
        } else {
            //新高考：上海
            that.queryNewGaoKaoCollegeYearFractions(provinceNumId, that.options.collegeId, uCode);
        }
    },
    orderMajorScore: function orderMajorScore(itemtype, reverse) {
        var that = this;
        if (itemtype == "zhejiangmajor") {
            var collegesArray = that.data.majorListzhejiang.sort(app.compare("lowScore"));
            if (reverse) {
                collegesArray = collegesArray.reverse();
            }
            that.setData({
                majorListzhejiang: collegesArray
            });
        }
        if (itemtype == "shanghaimajor") {
            var _collegesArray2 = that.data.majorListGraduated.sort(app.compare("lowScore"));
            if (reverse) {
                _collegesArray2 = _collegesArray2.reverse();
            }
            that.setData({
                majorListGraduated: _collegesArray2
            });
        }
        if (itemtype == "traditionalmajor") {
            var _collegesArray3 = that.data.majorListTraditional.sort(app.compare("lowScore"));
            if (reverse) {
                _collegesArray3 = _collegesArray3.reverse();
            }
            that.setData({
                majorListTraditional: _collegesArray3
            });
        }
    },
    orderScoreTap: function orderScoreTap(e) {
        var that = this;
        var itemtype = e.currentTarget.dataset.type;
        if (!that.data.majorData) {
            return;
        }
        if (that.majorBackList.length == 0) {
            if (itemtype == "traditionalmajor") {
                that.majorBackList = JSON.parse(JSON.stringify(that.data.majorListTraditional));
            }
            if (itemtype == "shanghaimajor") {
                that.majorBackList = JSON.parse(JSON.stringify(that.data.majorListGraduated));
            }
            if (itemtype == "zhejiangmajor") {
                that.majorBackList = JSON.parse(JSON.stringify(that.data.majorListzhejiang));
            }
        } else {}
        if (that.majorOrderStatus == false) {
            //降序
            that.orderMajorScore(itemtype, false);
            that.majorOrderStatus = "down";
            that.setData({
                upOrderIcon: "/image/tabDown.png",
                downOrderIcon: "/image/tabDownRed.png"
            });
        } else if (that.majorOrderStatus == "down") {
            //升序
            that.orderMajorScore(itemtype, true);
            that.majorOrderStatus = "up";
            that.setData({
                upOrderIcon: "/image/tabDownRed.png",
                downOrderIcon: "/image/tabDown.png"
            });
        } else if (that.majorOrderStatus == "up") {
            //默认
            var tmpData = {
                upOrderIcon: "/image/tabDown.png",
                downOrderIcon: "/image/tabDown.png"
            };
            that.majorOrderStatus = false;
            if (itemtype == "traditionalmajor") {
                tmpData.majorListTraditional = that.majorBackList;
            }
            if (itemtype == "shanghaimajor") {
                tmpData.majorListGraduated = that.majorBackList;
            }
            if (itemtype == "zhejiangmajor") {
                tmpData.majorListzhejiang = that.majorBackList;
            }
            that.setData(tmpData);
            that.majorBackList = [];
        }
    },
    //第一次加载数据的方法集
    checkLoadData: function checkLoadData() {
        var that = this;
        var cityId = that.cityId;
        that.newGaoKao = false;
        if (cityId == "843") {
            //浙江版
            if (that.configs.length == 0) {
                that.setData({
                    majorData: "no"
                });
                return;
            }
            that.newGaoKao = true;
            var year = that.data.yearList[that.data.yearList.length - 1].name;
            var config = that.configs[that.directIndex];
            if (that.data.currentTab == 0) {
                //加载专业分数线
                var _config = that.configs[that.directIndex];
                var batch = that.data.batchItem[0].value;
                if (that.newGaoKaoAllMajorList && that.newGaoKaoAllMajorList.length > 0) {} else {
                    if (that.data.usertype > 1) {
                        that.getProfessionsFractions(that.newGaoKao, _config.uCode, batch, -1, year, year);
                    } else {
                        that.InsertSA(that.source, "专业分数线", that.data.majorYear, false, true);
                        that.setData({
                            majorData: true
                        });
                    }
                }
            } else if (that.data.currentTab == 1) {
                //加载浙江招生计划
                if (that.newGaoKaoAllPlanList && that.newGaoKaoAllPlanList.length > 0) {} else {
                    if (that.data.usertype > 1) {
                        that.getProfessionsPlans(that.newGaoKao, year, config.uCode);
                    } else {
                        that.InsertSA(that.source, "招生计划", year, false, true);
                        that.setData({
                            planData: true
                        });
                    }
                }
            }
        } else {
            //非浙江版
            if (that.configs.length == 0) {
                if (that.data.usertype > 1) {
                    that.setData({
                        majorData: "no"
                    });
                } else {
                    that.setData({
                        majorData: true
                    });
                }
                return;
            }
            var _config2 = that.configs[that.directIndex];
            if (cityId == "842") {
                that.newGaoKao = true;
            }
            if (that.data.currentTab == 0) {
                //加载院校分数线
                if (that.data.collegeLineList.length > 0) {
                    return;
                }
                that.getCollegesFractions(that.newGaoKao, cityId, _config2.uCode);
            } else if (that.data.currentTab == 1) {
                //加载专业分数线
                var _batch = that.data.batchItem[that.batchIndex].value;
                if (!that.newGaoKao) {
                    if (that.data.majorListTraditional.length > 0) {
                        return;
                    } else {
                        if (that.data.usertype > 1) {
                            that.getProfessionsFractions(that.newGaoKao, _config2.uCode, _batch, that.courseFlag, that.data.majorYear, that.data.majorYear);
                        } else {
                            that.InsertSA(that.source, "专业分数线", that.data.majorYear, false, true);
                            that.setData({
                                majorData: true
                            });
                        }
                    }
                } else {
                    if (that.newGaoKaoAllMajorList && that.newGaoKaoAllMajorList.length > 0) {} else {
                        if (that.data.usertype > 1) {
                            that.getProfessionsFractions(that.newGaoKao, _config2.uCode, _batch2, that.courseFlag, that.data.majorYear, that.data.majorYear);
                        } else {
                            that.InsertSA(that.source, "专业分数线", that.data.majorYear, false, true);
                            that.setData({
                                majorData: true
                            });
                        }
                        var subject = that.data.subjectItem[that.subjectIndex].name;
                        var _batch2 = that.data.batchItem[that.batchIndex].value;
                        if (that.data.majorListzhejiang.length > 0 || that.data.majorListGraduated.length > 0) {
                            that.chooseNewGaoKaoMajor(that.data.majorYear, subject, _batch2, that.directIndex);
                        }
                    }
                }
            } else if (that.data.currentTab == 2) {
                //加载招生计划
                if (that.newGaoKao) {
                    if (that.newGaoKaoAllPlanList && that.newGaoKaoAllPlanList.length > 0) {} else {
                        if (that.data.usertype > 1) {
                            var _year2 = that.data.planYear;
                            that.getProfessionsPlans(that.newGaoKao, _year2, _config2.uCode);
                        } else {
                            that.InsertSA(that.source, "招生计划", that.data.planYear, false, true);
                            that.setData({
                                planData: true
                            });
                        }
                    }
                } else {
                    if (that.data.planListTraditional.length > 0 || that.data.planListTraditional.length > 0) {} else {
                        if (that.data.usertype > 1) {
                            var _year3 = that.data.planYear;
                            that.getProfessionsPlans(that.newGaoKao, _year3, _config2.uCode);
                        } else {
                            that.InsertSA(that.source, "招生计划", that.data.planYear, false, true);
                            that.setData({
                                planData: true
                            });
                        }
                    }
                }
            }
        }
    },
    getSwiperHeight: function getSwiperHeight() {
        this.setData({
            swiperHeight: app.globalData.screenHeight - 12.8 * app.globalData.screenWidth / 100 - app.globalData.navigationCustomStatusHeight - app.globalData.navigationCustomCapsuleHeight
        });
    },
    // 通过条件查询专业分数线数据
    getProfessionsFractions: function getProfessionsFractions(newGaokao, uCode, batch, courseType, yearFrom, yearTo) {
        var that = this;
        if (!newGaokao) {
            _api2.default.queryProfessionsFractions("ScoreLines/Fractions/Professions/Query", "POST", uCode, batch, courseType, yearFrom, yearTo).then(function(res) {
                var majorData = "no";
                var majorListTraditional = [];
                if (res.result) {
                    var major = res.result;
                    for (var i in major) {
                        var majorSingle = {};
                        var enterNum = "-";
                        var lowScore = "-";
                        var lowOrder = "-";
                        if (major[i].enterNum && major[i].enterNum > 0) {
                            enterNum = major[i].enterNum;
                        }
                        if (major[i].minScore && major[i].minScore > 0) {
                            lowScore = major[i].minScore;
                        }
                        if (major[i].lowSort && major[i].lowSort > 0) {
                            lowOrder = major[i].lowSort;
                        }
                        majorSingle.major = major[i].professionName;
                        majorSingle.enterNum = enterNum;
                        majorSingle.lowScore = lowScore;
                        majorSingle.lowOrder = lowOrder;
                        majorListTraditional.push(majorSingle);
                    }
                    if (majorListTraditional.length > 0) {
                        majorData = true;
                    }
                }
                that.setData({
                    majorListTraditional: majorListTraditional,
                    majorData: majorData
                });
                that.InsertSA(that.source, "专业分数线", that.data.majorYear, majorData != "no" ? true : false, true);
            });
        } else {
            //新高考：上海、浙江
            that.queryNewGaoKaoCollegeMajorsLine(that.cityId, that.options.collegeId, 1, uCode);
        }
    },
    //通过院校及省份获取院校招生方向及文理年份等数据配置
    queryConfigFractions: function queryConfigFractions(collegeId, provinceId, collegeName) {
        var that = this;
        _api2.default.queryConfigFractions("ScoreLines/V2/Fractions/QueryConfig", "POST", collegeId, provinceId).then(function(res) {
            if (res.isSuccess) {
                if (res.result && res.result.configs && res.result.configs.length > 0) {
                    if (res.result.configs[0].years.length == 0) {
                        that.setData({
                            showLoad: "error"
                        });
                        return;
                    }
                    for (var i = 0; i < res.result.configs.length; i++) {
                        var array = [];
                        array = res.result.configs[i].years.sort(app.compare("year"));
                        res.result.configs[i].years = array;
                    }
                    var directList = [];
                    var direct = "";
                    var manyDirect = false;
                    var configs = res.result.configs[0];
                    that.configs = res.result.configs;
                    if (res.result.configs.length > 1) {
                        //多招生方向
                        manyDirect = true;
                        for (var _i = 0; _i < res.result.configs.length; _i++) {
                            if (res.result.configs[_i].collegeName == collegeName) {
                                configs = res.result.configs[_i];
                                that.directIndex = _i;
                                direct = collegeName;
                                break;
                            }
                        }
                        for (var _i2 in res.result.configs) {
                            directList.push(res.result.configs[_i2].collegeName);
                        }
                    }
                    var planConfigs = configs.planConfigs;
                    var serverYear = configs.years;
                    var yearList = [];
                    var yearIndex = serverYear.length - 1;
                    for (var _i3 = 0, j = serverYear.length; _i3 < j; _i3++) {
                        var year = {};
                        year.name = serverYear[_i3].year;
                        year.value = _i3;
                        yearList.push(year);
                        if (serverYear[_i3].default) {
                            yearIndex = _i3;
                        }
                    }
                    that.yearFlag = yearList.length - 1;
                    that.setData({
                        yearList: yearList,
                        majorYear: yearList[yearList.length - 1].name
                    }, function() {
                        that.chooseYearItem({
                            detail: yearIndex
                        });
                    });
                    var batchItem = [];
                    var batchName = "";
                    that.batchIndex = 0;
                    // 修改
                    // let artsAndSciences = '理科';
                                        var artsAndSciences = wx.getStorageSync("course") == 0 ? "理科" : "文科";
                    if (configs.uCode) {
                        that.uCode = configs.uCode;
                    }
                    if (configs.years[yearList.length - 1].batchs.length > 0) {
                        for (var _i4 = 0; _i4 < configs.years[yearList.length - 1].batchs.length; _i4++) {
                            var batchSingle = {};
                            batchSingle.name = configs.years[yearList.length - 1].batchs[_i4].batchName;
                            batchSingle.value = configs.years[yearList.length - 1].batchs[_i4].batch;
                            batchItem.push(batchSingle);
                        }
                        batchName = configs.years[yearList.length - 1].batchs[that.batchIndex].batchName;
                    } else {}
                    that.setData({
                        planConfigs: planConfigs,
                        artsAndSciences: artsAndSciences,
                        direct: direct,
                        batchItem: batchItem,
                        batchName: batchName,
                        manyDirect: manyDirect,
                        directList: directList,
                        planYear: configs.planConfigs.year
                    });
                    that.checkLoadData();
                    if (configs.planConfigs.batchs.length > 0) {} else {
                        that.setData({
                            collegeData: "no"
                        });
                        if (that.data.usertype > 1) {
                            that.setData({
                                majorData: "no",
                                planData: "no"
                            });
                        } else {
                            that.setData({
                                majorData: true,
                                planData: true
                            });
                        }
                    }
                } else {
                    that.setData({
                        collegeData: "no"
                    });
                    if (that.data.usertype > 1) {
                        that.setData({
                            majorData: "no",
                            planData: "no"
                        });
                    } else {
                        that.setData({
                            majorData: true,
                            planData: true
                        });
                    }
                }
                that.setData({
                    showLoad: "false"
                });
            } else {
                that.setData({
                    showLoad: "true"
                });
            }
            wx.stopPullDownRefresh();
        });
    },
    getScrollViewHeight: function getScrollViewHeight() {
        var that = this;
        that.setData({
            scrollViewHeight: that.data.swiperHeight - 12.8 * app.globalData.screenWidth / 100 - 12 * app.globalData.screenWidth / 100 - 18 * app.globalData.screenWidth / 100
        });
    },
    //打开年份菜单
    chooseMajorYear: function chooseMajorYear(e) {
        var that = this;
        if (that.data.yearList.length <= 1) return;
        that.selectComponent("#majorYearDrop").toggerDropDown();
        // that.toggerDropDown();
        },
    showXuanCeTips: function showXuanCeTips() {
        var that = this;
        that.setData({
            importTips: [ "这是选测tips" ]
        });
        that.selectComponent("#hide")._showTap();
    },
    // 点击升序
    upOrderTap: function upOrderTap() {},
    // 点击降序
    downOrderTap: function downOrderTap() {},
    showPlanTips: function showPlanTips() {
        var that = this;
        that.data.importTips = [ "广东省招生计划" ];
        that.setData({
            importTips: that.data.importTips
        });
        that.selectComponent("#hide")._showTap();
    },
    showMajorTips: function showMajorTips() {
        var that = this;
        that.data.importTips = [ "专业计划" ];
        that.setData({
            importTips: that.data.importTips
        });
        that.selectComponent("#hide")._showTap();
    },
    showCollegeTips: function showCollegeTips() {
        var that = this;
        that.data.importTips = [ "1、2017年录取数已根据6月份出版的《广东省招生计划》更新", "2、2017年专业录取相关数据将在考试院公布后即时更新（考试院公布时间2018年5月）", "3、2012-2017各院校录取数据，参考各省市出版的填报指南以及各本专科院校的官网历年录取数据", "4、我们的数据与各省考试院发布的数据一致，由于各省市加分政策，院校官网对征集志愿数据的显示等原因，会与院校官网存在不一致情况，建议以各省考试院发布的数据为准" ];
        that.setData({
            importTips: that.data.importTips
        });
        that.selectComponent("#hide")._showTap();
    }
}, _defineProperty(_Page, "hideTapIndex", function hideTapIndex() {
    var that = this;
    that.selectComponent("#hide").hidePopupFunc();
}), _defineProperty(_Page, "showSubjects", function showSubjects(e) {
    var that = this;
    var itemtype = e.currentTarget.dataset.itemtype;
    if (that.data.subjectItem.length < 2) {
        return;
    }
    if (itemtype == "major") {
        that.selectComponent("#majorSubjectDrop").toggerDropDown();
        // that.toggerDropDown();
        } else if (itemtype == "plan") {
        that.selectComponent("#planSubjectDrop").toggerDropDown();
        // that.toggerDropDown();
        }
}), _defineProperty(_Page, "chooseBatch", function chooseBatch(e) {
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
        // that.toggerDropDown();
        } else if (itemtype == "plan") {
        that.selectComponent("#planBatchDrop").toggerDropDown();
        // that.toggerDropDown();
        }
}), _defineProperty(_Page, "chooseArtsAndSciences", function chooseArtsAndSciences(e) {
    var that = this;
    var itemtype = e.currentTarget.dataset.itemtype;
    if (that.data.GKStatus) return;
    if (itemtype == "college") {
        that.selectComponent("#collegeCourseDrop").toggerDropDown();
    } else if (itemtype == "major") {
        that.selectComponent("#majorCourseDrop").toggerDropDown();
    } else if (itemtype == "plan") {
        that.selectComponent("#planCourseDrop").toggerDropDown();
    }
}), _defineProperty(_Page, "hideDirectFrame", function hideDirectFrame() {
    var that = this;
}), _defineProperty(_Page, "directTap", function directTap(e) {
    var id = e.currentTarget.id;
    var that = this;
    that.selectComponent("#framedirect").hideFrame();
    if (that.directIndex == id) {
        return;
    }
    that.selectComponent("#navigationcustom").setNavigationAll(that.data.directList[id], true);
    var cityId = that.cityId;
    that.directIndex = id;
    var config = that.configs[id];
    that.setData({
        direct: that.data.directList[id]
    });
    //切换专业分数线/院校分数线/招生计划/（）
    //批次/变为初始值
        that.batchIndex = 0;
    var batch = that.data.batchItem[that.batchIndex].value;
    var batchName = that.data.batchItem[that.batchIndex].name;
    // 修改
    // that.courseFlag = 0;
        that.courseFlag = that.data.artsAndSciences == "文科" ? 1 : 0;
    that.setData({
        batchName: batchName,
        planConfigs: config.planConfigs
    });
    var newGaokao = false;
    //非新高考的文理初始化，新高考的选科初始化
        if (that.newGaoKao) {
        newGaokao = true;
        that.subjectIndex = 0;
        var subject = that.data.subjectItem[that.subjectIndex].name;
        var yearList = [];
        for (var y in config.enterDataYears) {
            var year = {};
            year.value = y;
            year.name = config.enterDataYears[y];
            yearList.push(year);
        }
        that.setData({
            yearList: yearList,
            majorYear: config.enterDataYears[0]
        });
        if (that.data.majorListzhejiang.length > 0 || that.data.majorListGraduated.length > 0) {
            that.chooseNewGaoKaoMajor(that.data.majorYear, subject, batch, that.directIndex);
            that.queryNewGaoKaoCollegeMajorsLine(cityId, config.collegeId, 1, config.uCode, config.enterDataYears[0]);
        }
        if (that.data.planListshanghai.length > 0 || that.data.planListzhejiang.length > 0) {
            that.chooseNewGaoKaoPlan(subject, batch, that.directIndex);
            that.queryNewGaoKaoCollegePlansWithChooseNums(cityId, config.collegeId, 1, config.uCode);
        }
        // that.getCollegesFractions(newGaokao, cityId, config.uCode);
        } else {
        that.setData({
            majorData: false,
            planData: false,
            collegeData: false
        });
        that.getProfessionsFractions(newGaokao, config.uCode, batch, that.courseFlag, that.data.majorYear, that.data.majorYear);
        that.getProfessionsPlans(that.newGaoKao, that.data.majorYear, config.uCode);
        that.getCollegesFractions(that.newGaoKao, cityId, config.uCode);
    }
}), _defineProperty(_Page, "chooseBatchItem", function chooseBatchItem(e) {
    var that = this;
    var year = that.data.majorYear;
    //专业分数线的数据
        var batch = e.detail;
    for (var i = 0; i < that.data.batchItem.length; i++) {
        if (that.data.batchItem[i].value == e.detail) {
            that.batchIndex = i;
            that.setData({
                batchName: that.data.batchItem[i].name
            });
            break;
        }
    }
    var config = that.configs[that.directIndex];
    if (that.data.usertype > 1) {
        that.setData({
            majorData: false
        });
        that.showTraditionalPlan(that.courseFlag, batch);
        that.getProfessionsFractions(false, config.uCode, batch, that.courseFlag, year, year);
    }
}), _defineProperty(_Page, "chooseCourseItem", function chooseCourseItem(e) {
    var that = this;
    if (that.configs) {
        //currentTarget
        var itemtype = e.currentTarget.dataset.id;
        var cityId = that.cityId;
        //chooseItem
                if (that.courseFlag == e.detail) {
            return;
        }
        var config = that.configs[that.directIndex];
        that.courseFlag = e.detail;
        var newGaokao = false;
        that.setData({
            collegeData: false
        });
        if (that.data.usertype > 1) {
            that.setData({
                majorData: false,
                planData: false
            });
        }
        var batch = that.data.batchItem[that.batchIndex].value;
        //  如果之前有数据，则不需要重新请求接口
                if (!that.newGaoKao) {
            if (that.data.usertype > 1) {
                if (that.traditionalAllPlans.length > 0) {
                    var planBatch = that.data.planConfigs.batchs[0].batch;
                    that.showTraditionalPlan(that.courseFlag, planBatch);
                } else {
                    that.getProfessionsPlans(that.newGaoKao, that.data.majorYear, config.uCode);
                }
            }
        } else {}
        //batchIndex 
                that.chooseCollegeLineListByCourse(e.detail);
        if (that.data.usertype > 1) {
            that.getProfessionsFractions(that.newGaoKao, config.uCode, batch, e.detail, that.data.majorYear, that.data.majorYear);
        }
        var courseName = "理科";
        if (e.detail == 1) {
            courseName = "文科";
        }
        that.setData({
            artsAndSciences: courseName
        });
    } else {
        var _courseName = "理科";
        if (e.detail == 1) {
            _courseName = "文科";
        }
        that.setData({
            artsAndSciences: _courseName
        });
    }
}), _defineProperty(_Page, "showDirectTap", function showDirectTap() {
    var that = this;
    that.setData({
        showDirect: true
    });
    that.selectComponent("#framedirect").showFrame();
}), _defineProperty(_Page, "catchMove", function catchMove() {}), _defineProperty(_Page, "swiperNav", function swiperNav(e) {
    var that = this;
    if (that.data.currentTab === e.currentTarget.dataset.current) {
        return false;
    } else {
        that.setData({
            currentTab: e.currentTarget.dataset.current
        });
    }
    that.checkLoadData();
}), _defineProperty(_Page, "change", function change(e) {
    if (e.detail.source == "touch") {
        var that = this;
        this.setData({
            currentTab: e.detail.current
        });
        that.checkLoadData();
    }
}), _defineProperty(_Page, "checkVersion", function checkVersion(options, cityId) {
    var that = this;
    var currentTab = 0;
    that.source = options.source;
    if (options.current == "plan") {
        currentTab = 2;
        if (cityId == "843") {
            //浙江-招生计划
            currentTab = 1;
        }
    } else {
        if (cityId == "0") {
            //传统that.data.
            that.data.importTips[0] = "1、2017年录取数已根据6月份出版的《普通省招生计划》更新";
            that.setData({
                listThreeName: "最高分/平均分",
                importTips: that.data.importTips
            });
        } else if (cityId == "1") {
            //江苏
            that.data.importTips[0] = "1、2017年录取数已根据6月份出版的《江苏省招生计划》更新";
            that.setData({
                listThreeName: "最高分/平均分",
                importTips: that.data.importTips
            });
        } else if (cityId == "842") {
            //上海
            that.data.importTips[0] = "1、2017年录取数已根据6月份出版的《上海市招生计划》更新";
            that.setData({
                listThreeName: "最高分",
                importTips: that.data.importTips
            });
        } else if (cityId == "843") {
            //浙江-招生计划
            that.data.importTips[0] = "1、2017年录取数已根据6月份出版的《上海市招生计划》更新";
        }
    }
    that.setData({
        currentTab: currentTab,
        cityId: cityId,
        importTips: that.data.importTips
    });
}), _defineProperty(_Page, "queryNewGaoKaoCollegeMajorsLine", function queryNewGaoKaoCollegeMajorsLine(provinceId, collegeId, isGroupType, uCode) {
    var that = this;
    _api2.default.queryNewGaoKaoCollegeMajorsLine("ScoreLines/NewGaoKao/QueryCollegeMajorsLine", "POST", provinceId, collegeId, isGroupType, uCode, parseInt(that.data.majorYear)).then(function(res) {
        var tmpData = {};
        if (provinceId == "842") {
            tmpData.majorListGraduated = [];
        } else if (provinceId == "843") {
            tmpData.majorListzhejiang = [];
        }
        if (res.result && res.result.plans) {
            that.newGaoKaoAllMajorList = res.result.plans;
            var serverPlanStart = res.result.plans[0];
            var majorListNewGaoKao = [];
            for (var p in serverPlanStart.collegePlans) {
                var collegePlan = serverPlanStart.collegePlans[p];
                var money = "-";
                var lowScore = "-";
                var lowOrder = "-";
                var year = "-";
                //collegePlans
                                var majorListSingle = {};
                if (collegePlan.minSort && collegePlan.minSort > 0) {
                    lowOrder = collegePlan.minSort;
                }
                if (collegePlan.minScore && collegePlan.minScore > 0) {
                    lowScore = collegePlan.minScore;
                }
                if (collegePlan.learnYear && collegePlan.learnYear > 0) {
                    year = collegePlan.learnYear;
                }
                majorListSingle.lowScore = lowScore;
                majorListSingle.lowOrder = lowOrder;
                majorListSingle.year = year;
                majorListSingle.major = collegePlan.professionName;
                if (provinceId == "842") {
                    var enterNum = "-";
                    majorListSingle.subjects = collegePlan.chooseCns || "-";
                    majorListSingle.subjectCode = collegePlan.chooseNums || "-";
                    if (collegePlan.enterNum && collegePlan.enterNum > 0) {
                        enterNum = collegePlan.enterNum;
                    }
                    majorListSingle.enterNum = enterNum;
                } else if (provinceId == "843") {
                    majorListSingle.selectSubjects = collegePlan.chooseCns || "-";
                    var enterNum1 = "-";
                    var enterNum2 = "-";
                    var enterNum3 = "-";
                    if (collegePlan.enterNum1 && collegePlan.enterNum1 > 0) {
                        enterNum1 = collegePlan.enterNum1;
                    }
                    if (collegePlan.enterNum2 && collegePlan.enterNum2 > 0) {
                        enterNum2 = collegePlan.enterNum2;
                    }
                    if (collegePlan.enterNum3 && collegePlan.enterNum3 > 0) {
                        enterNum3 = collegePlan.enterNum3;
                    }
                    var enterOrder = enterNum1 + "/" + enterNum2 + "/" + enterNum3;
                    majorListSingle.enterOrder = enterOrder;
                }
                majorListNewGaoKao.push(majorListSingle);
            }
            if (provinceId == "842") {
                tmpData.majorListGraduated = majorListNewGaoKao;
            } else if (provinceId == "843") {
                tmpData.majorListzhejiang = majorListNewGaoKao;
            }
            tmpData.majorData = true;
            that.setData(tmpData);
        } else {
            that.setData({
                majorData: "no"
            });
        }
    });
}), _defineProperty(_Page, "chooseNewGaoKaoPlan", function chooseNewGaoKaoPlan(subject, batch, direct) {
    var that = this;
    var tmpData = {};
    var provinceId = that.cityId;
    var config = that.configs[direct];
    var planListNewGaoKao = [];
    if (that.newGaoKaoAllPlanList.length > 0) {
        for (var i in that.newGaoKaoAllPlanList) {
            if (subject == that.newGaoKaoAllPlanList[i].chooseName) {
                var serverPlanStart = that.newGaoKaoAllPlanList[i].collegePlans;
                if (provinceId == "842") {
                    tmpData.planListshanghai = [];
                } else if (provinceId == "843") {
                    tmpData.planListzhejiang = [];
                }
                for (var p in serverPlanStart) {
                    var collegePlan = serverPlanStart[p];
                    var year = "-";
                    var money = "-";
                    var planListSingle = {};
                    if (collegePlan.learnYear && collegePlan.learnYear > 0) {
                        year = collegePlan.learnYear;
                    }
                    if (collegePlan.cost && collegePlan.cost > 0) {
                        money = collegePlan.cost;
                    }
                    planListSingle.year = year;
                    planListSingle.money = money;
                    planListSingle.major = collegePlan.professionName;
                    // 上海版
                                        planListSingle.code = collegePlan.professionCode;
                    planListSingle.chooseNums = collegePlan.chooseNums;
                    //planNum
                                        if (provinceId == "842") {
                        var planCount = "-";
                        if (collegePlan.planNum && collegePlan.planNum > 0) {
                            planCount = collegePlan.planNum;
                        }
                        planListSingle.planCount = planCount;
                        planListSingle.subjects = collegePlan.chooseCns;
                    } else if (provinceId == "843") {
                        //chooseNums
                        var planSection1 = "-";
                        var planSection2 = "-";
                        var planSection3 = "-";
                        planListSingle.selectSubjects = collegePlan.chooseCns;
                        if (collegePlan.planNum1 && collegePlan.planNum1 > 0) {
                            planSection1 = collegePlan.planNum1;
                        }
                        if (collegePlan.planNum2 && collegePlan.planNum2 > 0) {
                            planSection2 = collegePlan.planNum2;
                        }
                        if (collegePlan.planNum3 && collegePlan.planNum3 > 0) {
                            planSection3 = collegePlan.planNum3;
                        }
                        var planSection = planSection1 + "/" + planSection2 + "/" + planSection3;
                        planListSingle.planSection = planSection;
                    }
                    planListNewGaoKao.push(planListSingle);
                }
            }
            if (planListNewGaoKao.length == 0) {
                tmpData.planData = "no";
            } else {
                tmpData.planData = true;
                if (provinceId == "842") {
                    tmpData.planListshanghai = planListNewGaoKao;
                } else if (provinceId == "843") {
                    tmpData.planListzhejiang = planListNewGaoKao;
                }
            }
        }
    } else {}
    that.setData(tmpData);
}), _defineProperty(_Page, "queryNewGaoKaoCollegePlansWithChooseNums", function queryNewGaoKaoCollegePlansWithChooseNums(provinceId, collegeId, isGroupType, uCode) {
    var that = this;
    _api2.default.queryNewGaoKaoCollegePlansWithChooseNums("ScoreLines/NewGaoKao/QueryCollegePlansWithChooseNums", "POST", provinceId, collegeId, isGroupType, uCode).then(function(res) {
        var tmpData = {};
        if (provinceId == "842") {
            tmpData.planListshanghai = [];
        } else if (provinceId == "843") {
            tmpData.planListzhejiang = [];
        }
        if (res.result && res.result.plans) {
            var serverPlanStart = res.result.plans[that.subjectIndex];
            var planListNewGaoKao = [];
            that.newGaoKaoAllPlanList = res.result.plans;
            for (var p in serverPlanStart.collegePlans) {
                var collegePlan = serverPlanStart.collegePlans[p];
                var year = "-";
                var money = "-";
                var planListSingle = {};
                if (collegePlan.learnYear && collegePlan.learnYear > 0) {
                    year = collegePlan.learnYear;
                }
                if (collegePlan.cost && collegePlan.cost > 0) {
                    money = collegePlan.cost;
                }
                planListSingle.year = year;
                planListSingle.money = money;
                planListSingle.major = collegePlan.professionName;
                // 上海
                                planListSingle.code = collegePlan.professionCode;
                planListSingle.chooseNums = collegePlan.chooseNums;
                if (provinceId == "842") {
                    var planCount = "-";
                    if (collegePlan.planNum && collegePlan.planNum > 0) {
                        planCount = collegePlan.planNum;
                    }
                    planListSingle.planCount = planCount;
                    planListSingle.subjects = collegePlan.chooseCns;
                } else if (provinceId == "843") {
                    var planSection1 = "-";
                    var planSection2 = "-";
                    var planSection3 = "-";
                    planListSingle.selectSubjects = collegePlan.chooseCns;
                    if (collegePlan.planNum1 && collegePlan.planNum1 > 0) {
                        planSection1 = collegePlan.planNum1;
                    }
                    if (collegePlan.planNum2 && collegePlan.planNum2 > 0) {
                        planSection2 = collegePlan.planNum2;
                    }
                    if (collegePlan.planNum3 && collegePlan.planNum3 > 0) {
                        planSection3 = collegePlan.planNum3;
                    }
                    var planSection = planSection1 + "/" + planSection2 + "/" + planSection3;
                    planListSingle.planSection = planSection;
                }
                planListNewGaoKao.push(planListSingle);
            }
            if (provinceId == "842") {
                tmpData.planListshanghai = planListNewGaoKao;
            } else if (provinceId == "843") {
                tmpData.planListzhejiang = planListNewGaoKao;
            }
            tmpData.planData = true;
            that.setData(tmpData);
        } else {
            that.setData({
                planData: "no"
            });
        }
    });
}), _defineProperty(_Page, "queryNewGaoKaoFractionConfigs", function queryNewGaoKaoFractionConfigs(provinceId, collegeId) {
    var that = this;
    _api2.default.queryNewGaoKaoFractionConfigs("ScoreLines/NewGaoKao/V2/QueryFractionConfigs", "POST", provinceId, collegeId).then(function(res) {
        //configs代表招生方向
        var batchItem = [];
        var batchName = "";
        that.batchIndex = 0;
        var manyDirect = false;
        var directList = [];
        var batch = "true";
        if (res.result && res.result.length > 0) {
            var config = res.result[0];
            that.configs = res.result;
            if (res.result.length > 1) {
                //多招生方向
                manyDirect = true;
                for (var i in res.result) {
                    directList.push(res.result[i].collegeName);
                }
            }
            if (config.uCode) {
                that.uCode = config.uCode;
            }
            var subjectItem = [];
            that.subjectIndex = 0;
            var subjectName = "";
            var yearList = [];
            var majorYear = "";
            if (config.enterDataYears.length > 0) {
                if (that.data.cityId == 843) {
                    majorYear = config.enterDataYears[0];
                } else {
                    majorYear = config.enterDataYears[config.enterDataYears.length - 1];
                }
                for (var y in config.enterDataYears) {
                    var year = {};
                    year.value = y;
                    year.name = config.enterDataYears[y];
                    yearList.push(year);
                }
            }
            if (config.chooseCns.length > 0) {
                subjectName = config.chooseCns[0];
                for (var s in config.chooseCns) {
                    var subjectSingle = {};
                    subjectSingle.value = s;
                    subjectSingle.name = config.chooseCns[s];
                    subjectItem.push(subjectSingle);
                }
            }
            // if (config.batchs.length > 0) {
                        var batchSingle = {};
            // // for (let b in config.batchs) {
                        batchSingle.name = "本科批";
            batchSingle.value = 0;
            batchItem.push(batchSingle);
            // }
                        batchName = "本科批";
            // if (config.batchs[0].batch != 1 && provinceId != '843') {
            //   batch = "collegeGraduated";
            // }
            // } else {
            // }
                        that.setData({
                direct: res.result[0].collegeName,
                planYear: res.result[0].planYear,
                yearList: yearList,
                majorYear: majorYear,
                showLoad: "false",
                batch: batch,
                batchItem: batchItem,
                batchName: batchName,
                subjectItem: subjectItem,
                subjectName: subjectName,
                manyDirect: manyDirect,
                directList: directList
            });
            that.checkLoadData();
        } else {
            that.setData({
                showLoad: "error"
            });
        }
    });
}), _defineProperty(_Page, "toggerDropDown", function toggerDropDown() {
    var that = this;
    if (that.data.flag == false) {
        that.setData({
            flag: true,
            dropDownAnimate: "dropDownAnimate"
        });
    } else {
        that.setData({
            dropDownAnimate: "dropDownAnimateOut"
        });
        setTimeout(function() {
            that.setData({
                flag: false
            });
        }, 500);
    }
}), _defineProperty(_Page, "dataInfo", function dataInfo() {
    this.showPopup();
}), _defineProperty(_Page, "showPopup", function showPopup() {
    this.setData({
        "popup.wrapAnimate": "wrapAnimate",
        "popup.bgOpacity": 0,
        "popup.popupFlag": true,
        "popup.popupAnimate": "popupAnimate"
    });
}), _defineProperty(_Page, "hidePopup", function hidePopup() {
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
}), _defineProperty(_Page, "goPay", function goPay() {
    wx.navigateTo({
        url: "/packages/paySystem/memberCardDetail/memberCardDetail"
    });
}), _defineProperty(_Page, "onLoad", function onLoad(options) {
    var that = this;
    this.level = "";
    this.classify = "";
    this.type = "";
    if (options && options.level) {
        this.level = options.level;
        this.classify = options.classify;
        this.type = options.type;
    }
    that.setData({
        system: app.globalData.system,
        color: app.globalData.color
    });
    if (options && options.share) {
        that.setData({
            share: true
        });
    }
    that.selectComponent("#navigationcustom").setNavigationAll(options.title, true);
    var userInfo = wx.getStorageSync("userInfo")[0];
    var provinceId = wx.getStorageSync("cityId").cityId;
    var cityList = wx.getStorageSync("chooseCityId");
    var cityName = wx.getStorageSync("chooseCity");
    var userScore = wx.getStorageSync("userScore");
    // if (provinceId==1){
    //   // that.setData({ jiangSuSubject: userScore.chooseLevelList[0].value + userScore.chooseLevelList[1].value})
    // }
        for (var i = 0; i < cityList.length; i++) {
        if (cityList[i] == provinceId) {
            that.setData({
                provinceName: cityName[i]
            });
            break;
        }
    }
    that.setData({
        mobile: true
    });
    that.setData({
        usertype: userInfo.UserType
    });
    that.cityId = wx.getStorageSync("cityId").cityId;
    var cityId = that.cityId;
    that.checkVersion(options, that.cityId);
    that.options = options;
    if (cityId == "842" || cityId == "843") {
        //新高
        that.queryNewGaoKaoFractionConfigs(cityId, options.collegeId);
    } else {
        that.courseFlag = wx.getStorageSync("course");
        that.queryConfigFractions(options.collegeId, that.cityId, options.title);
        if (userInfo.GKYear == 2020) {
            if (app.globalData.newGaokaoPro) {
                that.setData({
                    GKStatus: !app.globalData.newGaokaoPro
                });
            } else {
                that.setData({
                    GKStatus: true
                });
            }
        }
    }
    that.getSwiperHeight();
    that.getScrollViewHeight();
    that.setData({
        desc: app.globalData.infoConfig
    });
}), _Page));