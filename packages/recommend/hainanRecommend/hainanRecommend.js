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

// packages/recommend//hainanRecommend/hainanRecommend.js
var app = getApp();

var sensors = require("../../../utils/sensors.js");

var timer = void 0;

var cityNum = 0, typeNum = 0, hotTypeNum = 0, collegeTypeNum = 0, foreignTypeNum = 0, morenCityNum = 0, morenTypeNum = 0, morenHotTypeNum = 0, morenCollegeTypeNum = 0, morenForeignTypeNum = 0, rankFrom = 0, rankTo = 0, rankNum = 0;

var x, y, x1, y1, x2, y2, index, currindex, n, yy;

Page({
    isMove: false,
    provinceIds: [],
    classify: [],
    hotTypes: [],
    collegeTypes: [],
    foreignTypes: 0,
    update: false,
    updateAddMajor: false,
    data: {
        navigationText: "友情提示",
        isdisabled: true,
        collegeName: "",
        start: {
            x: 0,
            y: 0
        },
        previewlFlag: false,
        showMask: true,
        count: 3,
        //自选院校填报次数
        isVIP: false,
        system: "android",
        applyCardFlag: false,
        //是否申请过会员卡判断
        applyCardTime: 180,
        //申请倒计时
        banApplyCard: false,
        //禁用
        applyCardLoading: false,
        //loading
        score: {
            totalScore: 0,
            rank: 0,
            chooseLevel: ""
        },
        CWBList: [ {
            name: "冲 正在加载中...",
            animate: "CWB-open",
            bgColor: "#FF5053"
        }, {
            name: "稳",
            animate: "",
            bgColor: "#F7BA00"
        }, {
            name: "保",
            animate: "",
            bgColor: "#76CF27"
        }, {
            name: "自",
            animate: "",
            bgColor: "#2792CF"
        } ],
        CWBIndex: 0,
        HInfo: {
            swiperH: 0,
            scrollH: 0,
            shaixuanH: 0,
            navH: 0
        },
        shaixuan: {
            flag: false,
            num: 0,
            animate: "",
            cityList: [],
            classifyList: [],
            hotType: [ {
                name: "不限",
                st: true
            }, {
                name: "985",
                st: false
            }, {
                name: "211",
                st: false
            }, {
                name: "双一流",
                st: false
            } ],
            collegeType: [ {
                name: "不限",
                st: true
            }, {
                name: "公办",
                st: false
            }, {
                name: "民办",
                st: false
            } ],
            foreignType: [ {
                name: "不限",
                st: true
            }, {
                name: "不看中外合作",
                st: false
            }, {
                name: "只看中外合作",
                st: false
            } ]
        },
        CCollegeList: {
            num: 0
        },
        WCollegeList: {
            num: 0
        },
        BCollegeList: {
            num: 0
        },
        ZCollegeList: {
            showLoad: false,
            loadMore: false,
            num: 0,
            collegeList: []
        },
        collegeDetail: {
            showLoad: true,
            detail: null
        },
        zyTableNum: 0,
        zyTableId: 0,
        zyTableList: [],
        //预览志愿列表
        change: false,
        // 当两个slider重合时，将change设置为true，从而隐藏slider2，才能继续操作slider1
        scale: 1,
        batch: 1,
        keywords: [],
        delPop: {
            flag: false,
            animation: ""
        }
    },
    InsertSA: function InsertSA(result) {
        var data = {
            SA_fillout_type: "智能填报",
            SA_data_subject: "不限",
            SA_data_batch: this.data.batch == 1 ? "本科批" : "专科批",
            SA_majors_name: "",
            SA_college_name: "",
            SA_data_province: "北京",
            SA_is_restrict: !this.data.isVIP,
            SA_is_result: result
        };
        app.sensors.track("FilloutEnter", sensors.FilloutEnter(data));
    },
    InsertRisk: function InsertRisk(num) {
        var SA_province_filter = [];
        for (var i = 0, j = this.data.shaixuan.cityList.length; i < j; i++) {
            if (this.data.shaixuan.cityList[i].st) {
                SA_province_filter.push(this.data.shaixuan.cityList[i].name);
            }
        }
        SA_province_filter = SA_province_filter.join("|");
        if (SA_province_filter == "全国") {
            SA_province_filter = "不限";
        }
        var SA_tag_filter = [];
        for (var _i = 0, _j = this.data.shaixuan.hotType.length; _i < _j; _i++) {
            if (this.data.shaixuan.hotType[_i].st) {
                SA_tag_filter.push(this.data.shaixuan.hotType[_i].name);
            }
        }
        SA_tag_filter = SA_tag_filter.join("|");
        var SA_nature_filter = "";
        for (var _i2 = 0, _j2 = this.data.shaixuan.collegeType.length; _i2 < _j2; _i2++) {
            if (this.data.shaixuan.collegeType[_i2].st) {
                SA_nature_filter = this.data.shaixuan.collegeType[_i2].name;
                break;
            }
        }
        var SA_type_filter = [];
        for (var _i3 = 0, _j3 = this.data.shaixuan.classifyList.length; _i3 < _j3; _i3++) {
            if (this.data.shaixuan.classifyList[_i3].st) {
                SA_type_filter.push(this.data.shaixuan.classifyList[_i3].name);
            }
        }
        SA_type_filter = SA_type_filter.join("|");
        var data = {
            SA_fillout_type: "智能填报",
            //填报类型
            SA_score_value: this.data.score.totalScore,
            //分数
            SA_data_batch: this.data.batch == 1 ? "本科批" : "专科批",
            //所属批次
            SA_features_value: this.data.CWBIndex == 0 ? "冲" : this.data.CWBIndex == 1 ? "稳" : this.data.CWBIndex == 2 ? "保" : "自",
            //操作值
            SA_results_number: num,
            //结果数量
            SA_data_province: "北京",
            //所属省份
            SA_province_filter: SA_province_filter,
            SA_tag_filter: SA_tag_filter,
            //标签筛选
            SA_nature_filter: SA_nature_filter,
            //性质筛选
            SA_type_filter: SA_type_filter
        };
    },
    //预览志愿表里点击院校显示删除按钮
    showDel: function showDel(e) {
        var that = this;
        var name = e.currentTarget.dataset.name;
        var choosesub = e.currentTarget.dataset.choosesub;
        this.data.zyTableList.forEach(function(ele) {
            if (ele.collegeName == name && ele.chooseSubjects == choosesub) {
                ele.isShowDel = !ele.isShowDel;
            } else {
                ele.isShowDel = false;
            }
        });
        this.setData({
            zyTableList: that.data.zyTableList
        });
    },
    //点击删除
    clickDel: function clickDel(e) {
        this.delCollegeName = e.currentTarget.dataset.item.collegeName;
        this.delChoosesub = e.currentTarget.dataset.item.chooseSubjects;
        this.setData({
            "delPop.flag": true,
            "delPop.animation": "showDel"
        });
    },
    //确认删除
    confirmDel: function confirmDel() {
        var that = this;
        this.data.zyTableList.forEach(function(ele, index) {
            if (ele.collegeName == that.delCollegeName && ele.chooseSubjects == that.delChoosesub) {
                console.log("that.college", that.delCollegeName);
                that.data.zyTableList.splice(index, 1, {});
            }
        });
        this.changeisTianBao("changeTab");
        this.setData({
            zyTableList: that.data.zyTableList
        }, function() {
            that.cancelDel();
        });
    },
    cancelDel: function cancelDel() {
        var that = this;
        this.setData({
            "delPop.flag": false,
            "delPop.animation": "hideDel"
        });
        this.data.zyTableList.forEach(function(ele) {
            ele.isShowDel = false;
        });
        this.setData({
            zyTableList: that.data.zyTableList
        });
    },
    //长按志愿表
    movestart: function movestart(e) {
        this.isMove = true;
        this.isDown = true;
        currindex = e.currentTarget.dataset.index;
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
        x1 = e.currentTarget.offsetLeft;
        y1 = e.currentTarget.offsetTop;
        this.setData({
            isdisabled: false,
            currindex: currindex
        });
    },
    //拖动志愿表
    move: function move(e) {
        if (!this.isMove) return;
        var zyTableList = this.data.zyTableList;
        yy = e.currentTarget.offsetTop;
        x2 = e.touches[0].clientX - x + x1;
        y2 = e.touches[0].clientY - y + y1;
        if (y2 <= 0) {
            y2 = 1;
        }
        if (y2 > (zyTableList.length - 1) * 45) {
            y2 = (zyTableList.length - 1) * 45;
        }
        var collegeName = this.data.zyTableList[currindex].collegeName;
        var chooseSub = this.data.zyTableList[currindex].chooseSubjects;
        this.setData({
            collegeName: collegeName,
            chooseSub: chooseSub,
            opacityStr: .7,
            start: {
                x: x2,
                y: y2
            }
        });
    },
    //拖动结束
    moveend: function moveend() {
        if (!this.isMove) return;
        console.log(11);
        this.setData({
            currindex: -1,
            isdisabled: true
        });
        if (y2 != 0) {
            var arr = [];
            for (var i = 0; i < this.data.zyTableList.length; i++) {
                arr.push(this.data.zyTableList[i]);
            }
            var nx = this.data.zyTableList.length;
            //8
                        n = 1;
            for (var k = 2; k < nx; k++) {
                if (y2 > 45 * (k - 1) + k * 2 - 26) {
                    n = k;
                }
            }
            if (y2 > 45 * (nx - 1) + nx * 2 - 26) {
                n = nx;
            }
            var tempObj = arr[currindex];
            arr.splice(currindex, 1);
            arr.splice(n - 1, 0, tempObj);
            this.setData({
                collegeName: "",
                chooseSub: "",
                zyTableList: arr,
                opacityStr: 1
            });
            this.isMove = false;
            this.changeisTianBao("changeTab");
        }
    },
    //关闭模拟弹框提示
    closeMask: function closeMask() {
        this.setData({
            showMask: false,
            navigationText: "智能填报"
        });
    },
    //预览志愿表抽屉
    previewForm: function previewForm(e) {
        this.setData({
            previewlFlag: true
        });
    },
    //关闭预览志愿表抽屉
    closePreviewForm: function closePreviewForm() {
        this.setData({
            previewlFlag: false,
            currentCollegeName: "",
            closePreviewAnimation: "visited"
        });
        this.code1 = "";
        this.code2 = "";
        this.currentMajorInfo = "";
        this.chooseSubjects = "";
    },
    //获取当前省份志愿院校个数
    getZyCount: function getZyCount() {
        var that = this;
        var len = 24;
        if (this.data.batch == 2) {
            len = 10;
        }
        var zyTableList = [];
        for (var i = 0; i < len; i++) {
            zyTableList.push({});
        }
        that.morenZyList = zyTableList;
        that.setData({
            zyTableList: zyTableList,
            majorCount: 6
        }, function() {
            that.changeisTianBao("changeTab");
        });
    },
    //点击位次区间 滑块
    changeStart: function changeStart(e) {
        if (this.data.slider1Value == 0 && this.data.slider2Value == 0) return;
        var idx = parseInt(e.currentTarget.dataset.idx);
        if (idx === 1) {
            // dW是当前操作的slider所能占据的最大宽度百分数
            var dW = (this.data.slider2Value - this.data.min) / this.data.rate;
            this.setData({
                slider1W: dW,
                slider2W: 100 - dW,
                slider1Max: this.data.slider2Value,
                slider2Min: this.data.slider2Value,
                change: false
            });
        } else if (idx === 2) {
            var dw = (this.data.max - this.data.slider1Value) / this.data.rate;
            this.setData({
                slider2W: dw,
                slider1W: 100 - dw,
                slider1Max: this.data.slider1Value,
                slider2Min: this.data.slider1Value,
                change: false
            });
        }
    },
    // 滑动位次区间滑块
    changing: function changing(e) {
        if (this.data.slider1Value == 0 && this.data.slider2Value == 0) return;
        var idx = parseInt(e.currentTarget.dataset.idx);
        var value = e.detail.value;
        var leftSliderWidthX = (this.data.slider1Value - this.data.min) / (this.data.max - this.data.min) * 85;
        var rightSliderWidthX = (this.data.slider2Value - this.data.min) / (this.data.max - this.data.min) * 85;
        if (idx === 1) {
            this.setData({
                slider1Value: value,
                leftSliderWidthX: leftSliderWidthX + "%",
                current: 1
            });
        } else if (idx === 2) {
            this.setData({
                slider2Value: value,
                rightSliderWidthX: rightSliderWidthX + "%",
                current: 2
            });
        }
    },
    //滑动结束
    changed: function changed(e) {
        if (this.data.slider1Value == 0 && this.data.slider2Value == 0) return;
        this.setData({
            current: -1
        });
        if (this.data.slider1Value === this.data.slider2Value && this.data.slider2Value === this.data.max) {
            this.setData({
                change: true
            });
        }
    },
    onLoad: function onLoad(options) {
        this.userInfo = wx.getStorageSync("userInfo");
        var isVIP = this.userInfo[0].UserType > 1 ? true : false;
        var top = app.globalData.navigationCustomCapsuleHeight + app.globalData.navigationCustomStatusHeight;
        this.setData({
            top: top,
            system: app.globalData.system,
            isVIP: isVIP,
            chooseBatchDescription: app.globalData.infoConfig.chooseBatchDescription
        });
        if (!isVIP) {
            this.loadUseFunctionLogsCount();
        }
        var batch = wx.getStorageSync("hnBatch");
        if (batch) {
            this.setData({
                batch: batch
            });
        } else {
            if (this.userInfo[0].Province != 834) {
                var score = wx.getStorageSync("userScore").total;
                this.setData({
                    batch: score >= 435 ? 1 : 2
                });
            }
        }
        this.initData();
        //默认初始化
                this.initCity();
        //筛选-省份
                this.initClassify();
        //筛选-类型
                this.initScore();
        //成绩
                this.getSwiperH();
        //各种高度
                this.loadRank();
        //获取位次区间
                this.getZyCount();
        this.morenHotType = JSON.parse(JSON.stringify(this.data.shaixuan.hotType));
        this.morenCollegeType = JSON.parse(JSON.stringify(this.data.shaixuan.collegeType));
        this.morenForeignType = JSON.parse(JSON.stringify(this.data.shaixuan.foreignType));
    },
    onShow: function onShow() {
        if (this.update) {
            this.update = false;
            wx.removeStorageSync("keywords");
            wx.removeStorageSync("searchMajorList");
            this.chongzhi();
            this.queren(false);
            this.setData({
                zyTableList: [],
                zyTableNum: 0,
                "CCollegeList.num": 0,
                "WCollegeList.num": 0,
                "BCollegeList.num": 0,
                "ZCollegeList.num": 0,
                "ZCollegeList.collegeList": []
            });
            this.maxRanking = false;
            this.setData({
                keywords: wx.getStorageSync("keywords") || []
            });
            this.onLoad();
        } else {
            // this.getRank(); //根据成绩获取位次
            var batch = wx.getStorageSync("hnBatch");
            if (batch) {
                this.setData({
                    batch: batch
                });
            }
        }
        if (this.updateAddMajor) {
            this.updateAddMajor = false;
            var chooseMajorArr = wx.getStorageSync("keywords");
            if (scalarArrayEquals(chooseMajorArr, this.data.keywords)) {} else {
                this.setData({
                    keywords: wx.getStorageSync("keywords") || []
                });
                this.setData({
                    "CCollegeList.num": 0,
                    "WCollegeList.num": 0,
                    "BCollegeList.num": 0,
                    "ZCollegeList.num": 0,
                    "ZCollegeList.collegeList": []
                });
                this.maxRanking = false;
                this.chongzhi();
                this.queren(false);
                this.onLoad();
            }
        }
        // this.setData({
        //   rank: this.rank
        // })
                this.changeisTianBao("changeTab");
    },
    onUnload: function onUnload() {
        cityNum = 0;
        typeNum = 0;
        hotTypeNum = 0;
        collegeTypeNum = 0;
        foreignTypeNum = 0;
        morenCityNum = 0;
        morenTypeNum = 0;
        morenHotTypeNum = 0;
        morenCollegeTypeNum = 0;
        morenForeignTypeNum = 0;
        wx.removeStorageSync("keywords");
        wx.removeStorageSync("searchMajorList");
        clearInterval(timer);
    },
    // getRank() {
    //   let data = {
    //     "cityId": 834,
    //     "score": this.totalScore
    //   }
    //   apiCommon.getRank('ScoreLines/YFYD/GetByScore', 'POST', data).then(res => {
    //     let userScore = wx.getStorageSync('userScore');
    //     userScore.rank = res.result.lowestRank;
    //     wx.setStorageSync('userScore', userScore);
    //     this.setData({
    //       rankDetail: res.result,
    //       rank: res.result.lowestRank,
    //       userScore,
    //       'score.rank':res.result.lowestRank
    //     })
    //   })
    // },
    loadRank: function loadRank() {
        this.rankTo = 0;
        this.rankFrom = 0;
        this.loadCollegeList();
        //默认加载-冲 院校
        },
    //初始化位次区间
    initWeici: function initWeici(obj) {
        var rate = (obj.minRanking - obj.maxRanking) / 100;
        var dW = (obj.maxRankingM - obj.maxRanking) / rate;
        var leftSliderWidthX = (obj.minRankingM - obj.maxRanking) / (obj.minRanking - obj.maxRanking) * 85;
        var rightSliderWidthX = (obj.maxRankingM - obj.maxRanking) / (obj.minRanking - obj.maxRanking) * 85;
        if (obj.minRankingM == 0 && obj.maxRankingM == 0) {
            dW = 0;
        }
        this.setData({
            slider1W: dW,
            slider2W: 100 - dW,
            slider1Value: obj.minRankingM,
            slider2Value: obj.maxRankingM,
            slider1Max: obj.maxRankingM,
            slider2Min: obj.maxRankingM,
            rightSliderWidthX: rightSliderWidthX + "%",
            leftSliderWidthX: leftSliderWidthX + "%",
            change: false,
            rate: rate,
            max: obj.minRanking,
            min: obj.maxRanking
        });
        this.rankTo = obj.maxRankingM;
        this.rankFrom = obj.minRankingM;
    },
    loadCollegeList: function loadCollegeList() {
        var _this = this;
        var that = this;
        var pn = 1;
        var collegeList = void 0, dataType = void 0, CWBList = void 0;
        var getDataType = this.data.CWBIndex;
        var zyTableList = this.data.zyTableList;
        switch (getDataType) {
          case 0:
            pn = this.cPn;
            collegeList = this.data.CCollegeList;
            dataType = "CCollegeList";
            break;

          case 1:
            pn = this.wPn;
            collegeList = this.data.WCollegeList;
            dataType = "WCollegeList";
            break;

          case 2:
            pn = this.bPn;
            collegeList = this.data.BCollegeList;
            dataType = "BCollegeList";
            break;

          case 3:
            collegeList = this.data.ZCollegeList;
            dataType = "ZCollegeList";
            break;
        }
        if (collegeList.loadMore == false) {
            return;
        }
        var data = {
            provinceId: 853,
            totalScore: this.totalScore,
            rank: this.rank,
            getDataType: getDataType,
            isGetAllCSBCount: true,
            provinceIds: this.provinceIds,
            classify: this.classify,
            chooseLevel: this.chooseLevel,
            keywords: this.data.keywords,
            levels: this.hotTypes,
            foreignType: this.foreignTypes,
            collegeTypes: this.collegeTypes,
            oriBacthNames: [],
            sort: 0,
            isASC: true,
            rankFrom: this.rankFrom,
            rankTo: this.rankTo,
            pageIndex: pn,
            pageSize: 10
        };
        _api2.default.DoNewGaoKaoV3("TZY/Recommendation/DoNewGaoKaoV3", "POST", data).then(function(res) {
            var data = res.result;
            if (res.isSuccess) {
                var _that$setData2;
                if (!that.maxRanking) {
                    var weici = {
                        maxRanking: res.result.maxRanking,
                        maxRankingM: res.result.minRankingM,
                        minRanking: res.result.minRanking,
                        minRankingM: res.result.maxRankingM
                    };
                    that.maxRanking = res.result.maxRanking;
                    that.maxRankingM = res.result.minRankingM;
                    that.minRanking = res.result.minRanking;
                    that.minRankingM = res.result.maxRankingM;
                    _this.initWeici(weici);
                }
                if (collegeList.showLoad) {
                    var name = void 0;
                    switch (getDataType) {
                      case 0:
                        name = data.chongNumber == 0 && data.chongProfessionNumber == 0 ? "冲 暂无数据" : "冲 " + (data.chongNumber == 0 ? "-" : data.chongNumber) + "所/" + (data.chongProfessionNumber == 0 ? "-" : data.chongProfessionNumber) + "组";
                        that.CName = name;
                        break;

                      case 1:
                        name = data.shouNumber == 0 && data.shouProfessionNumber == 0 ? "稳 暂无数据" : "稳 " + (data.shouNumber == 0 ? "-" : data.shouNumber) + "所/" + (data.shouProfessionNumber == 0 ? "-" : data.shouProfessionNumber) + "组";
                        that.WName = name;
                        break;

                      case 2:
                        name = data.baoNumber == 0 && data.baoProfessionNumber == 0 ? "保 暂无数据" : "保 " + (data.baoNumber == 0 ? "-" : data.baoNumber) + "所/" + (data.baoProfessionNumber == 0 ? "-" : data.baoProfessionNumber) + "组";
                        that.BName = name;
                        break;
                    }
                    if (getDataType == that.data.CWBIndex) {
                        that.setData(_defineProperty({}, "CWBList[" + getDataType + "].name", name));
                    }
                }
                for (var i = 0, j = data.collegeList.length; i < j; i++) {
                    var levels = "";
                    levels += data.collegeList[i].levels.indexOf("985") != -1 ? "985 " : "";
                    levels += data.collegeList[i].levels.indexOf("211") != -1 ? "211 " : "";
                    levels += data.collegeList[i].levels.indexOf("双一流") != -1 ? "双一流 " : "";
                    data.collegeList[i].levels = levels;
                    if (data.collegeList[i].chooseSubjects.indexOf("/") != -1) {
                        data.collegeList[i].chooseArr = data.collegeList[i].chooseSubjects.replace(/\s*/g, "").split("/");
                        data.collegeList[i].spliceStr = "/";
                    } else if (data.collegeList[i].chooseSubjects.indexOf("+") != -1) {
                        data.collegeList[i].spliceStr = "+";
                        data.collegeList[i].chooseArr = data.collegeList[i].chooseSubjects.replace(/\s*/g, "").split("+");
                    } else {
                        data.collegeList[i].chooseArr = data.collegeList[i].chooseSubjects.split();
                    }
                    for (var m = 0, _n = data.collegeList[i].professions.length; m < _n; m++) {
                        data.collegeList[i].professions[m].chooseCns = data.collegeList[i].professions[m].chooseCns.replace(/\s+/g, "");
                        for (var _j4 = 0, k = zyTableList.length; _j4 < k; _j4++) {
                            if (zyTableList[_j4].majorCode == data.collegeList[i].professions[m].majorCode && zyTableList[_j4].collegeId == data.collegeList[i].collegeId) {
                                data.collegeList[i].professions[m].st = true;
                                break;
                            }
                        }
                    }
                }
                data.collegeList.map(function(i) {
                    i.majorOpen = false;
                });
                data.collegeList.map(function(i) {
                    i.professions.map(function(j) {
                        if (j && j.chooseSubjects == "且") {
                            j.chooseCns = j.chooseCns.replace("/", "+");
                        }
                    });
                });
                that.setData((_that$setData2 = {}, _defineProperty(_that$setData2, dataType + ".collegeList", collegeList.collegeList.concat(data.collegeList)), 
                _defineProperty(_that$setData2, dataType + ".showLoad", false), _that$setData2), function() {
                    that.changeisTianBao("changeTab");
                });
                if (data.collegeList.length < 10) {
                    that.setData(_defineProperty({}, dataType + ".loadMore", false));
                }
                that.InsertRisk(res.result.baoNumber);
            } else {
                if (collegeList.showLoad) {
                    var _name = void 0;
                    switch (getDataType) {
                      case 0:
                        _name = "冲 暂无数据";
                        that.CName = _name;
                        break;

                      case 1:
                        _name = "稳 暂无数据";
                        that.WName = _name;
                        break;

                      case 2:
                        _name = "保 暂无数据";
                        that.BName = _name;
                        break;
                    }
                    if (getDataType == that.data.CWBIndex) {
                        var _that$setData4;
                        that.setData((_that$setData4 = {}, _defineProperty(_that$setData4, "CWBList[" + getDataType + "].name", _name), 
                        _defineProperty(_that$setData4, dataType + ".showLoad", false), _that$setData4));
                    }
                }
            }
            that.InsertSA(res.isSuccess && res.result.collegeList.length > 0 ? true : false);
        });
    },
    scrollCollegeToLower: function scrollCollegeToLower() {
        if (!this.data.isVIP) {
            return;
        }
        var CWBIndex = this.data.CWBIndex;
        switch (CWBIndex) {
          case 0:
            ++this.cPn;
            break;

          case 1:
            ++this.wPn;
            break;

          case 2:
            ++this.bPn;
            break;
        }
        this.loadCollegeList();
    },
    // 初始化 
    initData: function initData() {
        this.cPn = 1;
        this.wPn = 1;
        this.bPn = 1;
        this.CName = "";
        this.WName = "";
        this.BName = "";
        var CCollegeList = {
            showLoad: true,
            loadMore: true,
            num: this.data.CCollegeList.num,
            collegeList: []
        };
        var WCollegeList = {
            showLoad: true,
            loadMore: true,
            num: this.data.WCollegeList.num,
            collegeList: []
        };
        var BCollegeList = {
            showLoad: true,
            loadMore: true,
            num: this.data.BCollegeList.num,
            collegeList: []
        };
        this.setData({
            CCollegeList: CCollegeList,
            WCollegeList: WCollegeList,
            BCollegeList: BCollegeList
        });
    },
    // 初始化省份列表
    initCity: function initCity() {
        var cityList = app.globalData.cityList;
        var cityId = wx.getStorageSync("cityId").cityId;
        var newCityList = [ {
            fLetter: "",
            name: "全国",
            numId: -1,
            st: true
        }, {} ];
        for (var i = 0, j = cityList.length; i < j; i++) {
            if (cityList[i].numId == cityId) {
                newCityList[1] = {
                    fLetter: cityList[i].fLetter,
                    name: cityList[i].name,
                    numId: cityList[i].numId,
                    st: false
                };
            } else {
                newCityList.push({
                    fLetter: cityList[i].fLetter,
                    name: cityList[i].name,
                    numId: cityList[i].numId,
                    st: false
                });
            }
        }
        this.setData({
            "shaixuan.cityList": newCityList
        });
        this.morenCityList = JSON.parse(JSON.stringify(newCityList));
    },
    // 初始化类型
    initClassify: function initClassify() {
        var classifyList = app.globalData.classifyList;
        var newClassifyList = [ {
            name: "不限",
            st: true
        } ];
        for (var i = 0, j = classifyList.length; i < j; i++) {
            newClassifyList.push({
                name: classifyList[i].name,
                st: false
            });
        }
        this.setData({
            "shaixuan.classifyList": newClassifyList
        });
        this.morenClassifyList = JSON.parse(JSON.stringify(newClassifyList));
    },
    // 初始化所需成绩信息
    initScore: function initScore() {
        var userScore = wx.getStorageSync("userScore");
        this.totalScore = userScore.total;
        this.rank = userScore.rank;
        this.chooseLevel = userScore.chooseSubjects;
        var score = {};
        score.totalScore = userScore.total;
        score.rank = userScore.rank;
        var chooseLevel = userScore.chooseSubjects;
        chooseLevel = chooseLevel.join("/");
        chooseLevel = chooseLevel.replace("物理", "物").replace("化学", "化").replace("生物", "生").replace("技术", "技").replace("历史", "史").replace("地理", "地").replace("政治", "政");
        score.chooseLevel = chooseLevel;
        score.chooseLevelArr = chooseLevel.split("/");
        this.setData({
            score: score
        });
    },
    // 计算swiper and scroll高度
    getSwiperH: function getSwiperH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.selectAll(".filter").boundingClientRect();
        item.exec(function(res) {
            var header = res[0][0].height;
            var advice = res[0][1].height;
            var footer = res[0][2].height;
            var pageH = app.globalData.systemInfo.screenHeight - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight;
            that.setData({
                "HInfo.swiperH": pageH - header,
                "HInfo.scrollH": pageH - header - advice - footer,
                "HInfo.shaixuanH": pageH,
                "HInfo.navH": app.globalData.navigationCustomCapsuleHeight + app.globalData.navigationCustomStatusHeight
            });
        });
    },
    // 切换冲稳保
    chooseCWB: function chooseCWB(e) {
        var _setData;
        var that = this;
        var index = e.currentTarget.dataset.index;
        var CWBIndex = this.data.CWBIndex;
        if (index == CWBIndex) {
            return;
        }
        this.setData((_setData = {
            CWBIndex: index
        }, _defineProperty(_setData, "CWBList[" + CWBIndex + "].animate", "CWB-close"), 
        _defineProperty(_setData, "CWBList[" + index + "].animate", "CWB-open"), _setData), function() {
            that.CWBNameAnimate(index, CWBIndex);
            that.CWBloadCollege(index);
            that.changeisTianBao("changeTab");
        });
    },
    changeCWB: function changeCWB(e) {
        var that = this;
        if (e.detail.source == "touch") {
            var _setData2;
            var _index = e.detail.current;
            var CWBIndex = this.data.CWBIndex;
            this.setData((_setData2 = {
                CWBIndex: _index
            }, _defineProperty(_setData2, "CWBList[" + CWBIndex + "].animate", "CWB-close"), 
            _defineProperty(_setData2, "CWBList[" + _index + "].animate", "CWB-open"), _setData2), function() {
                that.CWBNameAnimate(_index, CWBIndex);
                that.CWBloadCollege(_index);
                that.changeisTianBao("changeTab");
            });
        }
    },
    // 冲稳保文字动画
    CWBNameAnimate: function CWBNameAnimate(index, CWBIndex) {
        var that = this;
        var oldName = void 0, currentName = void 0;
        switch (index) {
          case 0:
            currentName = that.CName == "" ? "冲 正在加载中..." : that.CName;
            break;

          case 1:
            currentName = that.WName == "" ? "稳 正在加载中..." : that.WName;
            break;

          case 2:
            currentName = that.BName == "" ? "保 正在加载中..." : that.BName;
            break;

          case 3:
            currentName = "自选填报";
        }
        switch (CWBIndex) {
          case 0:
            oldName = "冲";
            break;

          case 1:
            oldName = "稳";
            break;

          case 2:
            oldName = "保";
            break;

          case 3:
            oldName = "自";
            break;
        }
        setTimeout(function() {
            var _that$setData5;
            that.setData((_that$setData5 = {}, _defineProperty(_that$setData5, "CWBList[" + CWBIndex + "].name", oldName), 
            _defineProperty(_that$setData5, "CWBList[" + index + "].name", currentName), _that$setData5));
        }, 10);
    },
    CWBloadCollege: function CWBloadCollege(index) {
        var showLoad = void 0;
        switch (index) {
          case 0:
            showLoad = this.data.CCollegeList.showLoad;
            break;

          case 1:
            showLoad = this.data.WCollegeList.showLoad;
            break;

          case 2:
            showLoad = this.data.BCollegeList.showLoad;
            break;

          case 3:
            showLoad = this.data.ZCollegeList.showLoad;
            break;
        }
        if (showLoad) {
            this.loadCollegeList();
        }
    },
    showCollegeDetail: function showCollegeDetail(e) {
        // this.selectComponent("#framedirect").showFrame();
        // let collegeId = e.currentTarget.dataset.collegeid;
        // let collegeCode = e.currentTarget.dataset.collegecode;
        // let isBen = e.currentTarget.dataset.isben;
        // let index = e.currentTarget.dataset.index;
        // if (this.data.collegeDetail.detail == null || collegeId != this.data.collegeDetail.detail.collegeId) {
        //   this.getCollegeDetail(collegeId, collegeCode, isBen, index);
        // }
    },
    hideCollegeDetail: function hideCollegeDetail() {
        this.selectComponent("#framedirect").hideFrame();
    },
    // 单个院校详情弹框
    getCollegeDetail: function getCollegeDetail(collegeId, collegeCode, isBen, index) {
        var that = this;
        that.setData({
            "collegeDetail.showLoad": true
        });
        var data = {
            chooseLevel: that.chooseLevel,
            provinceId: 834,
            collegeId: collegeId,
            collegeCode: collegeCode,
            isBen: isBen
        };
        var collegeList = void 0;
        var CWBIndex = that.data.CWBIndex;
        switch (CWBIndex) {
          case 0:
            collegeList = that.data.CCollegeList.collegeList[index];
            break;

          case 1:
            collegeList = that.data.WCollegeList.collegeList[index];
            break;

          case 2:
            collegeList = that.data.BCollegeList.collegeList[index];
            break;

          case 3:
            collegeList = that.data.ZCollegeList.collegeList[index];
            break;
        }
        // let professions = collegeList.professions;
        // let majorList = [];
        // for (let i = 0, j = professions.length; i < j; i++) {
        //   majorList.push({
        //     "professionName": professions[i].professionName,
        //     "chooseCns": professions[i].chooseCns.replace(/\s+/g, ""),
        //     "planNum": (professions[i].planNum1 == 0 ? '-' : professions[i].planNum1) + '/' + (professions[i].planNum2 == 0 ? '-' : professions[i].planNum2) + '/' + (professions[i].planNum3 == 0 ? '-' : professions[i].planNum3),
        //     "learnYear": professions[i].learnYear == 0 || professions[i].learnYear == '' ? '-' : professions[i].learnYear,
        //     "cost": professions[i].cost == 0 || professions[i].cost == '' ? '-' : professions[i].cost,
        //     "isFit": professions[i].isFit,
        //     "majorCode": professions[i].majorCode
        //   })
        // }
        // let collegeDetail = {
        //   collegeId: collegeList.collegeId,
        //   collegeName: collegeList.collegeName,
        //   levels: collegeList.levels,
        //   collegeCode: collegeList.collegeCode,
        //   classify: collegeList.classify,
        //   provinceName: collegeList.provinceName,
        //   collegeType: collegeList.collegeType,
        //   planYear: professions[0].year,
        //   professions: majorList
        // };
        // that.setData({
        //   'collegeDetail.detail': collegeDetail,
        //   'collegeDetail.showLoad': false
        // })
                _api2.default.QueryNewGaoKaoCollegeProfessionPlans("ScoreLines/NewGaoKao/V2/QueryNewGaoKaoCollegeProfessionPlans", "POST", data).then(function(res) {
            var professions = res.result.professions;
            var majorList = [];
            for (var i = 0, j = professions.length; i < j; i++) {
                majorList.push({
                    professionName: professions[i].professionName,
                    chooseCns: professions[i].chooseCns.replace(/\s+/g, ""),
                    planNum: (professions[i].planNum1 == 0 ? "-" : professions[i].planNum1) + "/" + (professions[i].planNum2 == 0 ? "-" : professions[i].planNum2) + "/" + (professions[i].planNum3 == 0 ? "-" : professions[i].planNum3),
                    learnYear: professions[i].learnYear == 0 || professions[i].learnYear == "" ? "-" : professions[i].learnYear,
                    cost: professions[i].cost == 0 || professions[i].cost == "" ? "-" : professions[i].cost,
                    isFit: professions[i].isFit,
                    majorCode: professions[i].majorCode
                });
            }
            var collegeDetail = {
                collegeId: collegeList.collegeId,
                collegeName: collegeList.collegeName,
                levels: collegeList.levels,
                collegeCode: collegeList.collegeCode,
                classify: collegeList.classify,
                provinceName: collegeList.provinceName,
                collegeType: collegeList.collegeType,
                planYear: collegeList.planYear,
                professions: majorList
            };
            that.setData({
                "collegeDetail.detail": collegeDetail,
                "collegeDetail.showLoad": false
            });
        });
    },
    goCollegeDetail: function goCollegeDetail() {
        wx.navigateTo({
            url: "/packages/findUniversity/collegeDetail/collegeDetail?numId=" + this.data.collegeDetail.detail.collegeId
        });
        // this.hideCollegeDetail();
        },
    // 跳转匹配专业
    goMatchMajor: function goMatchMajor(e) {
        var index = e.currentTarget.dataset.index;
        wx.navigateTo({
            url: "../sdMatchMajor/sdMatchMajor?index=" + index
        });
    },
    catchTouchMove: function catchTouchMove(res) {
        return false;
    },
    // 清除筛选
    clearShaixuan: function clearShaixuan() {
        this.chongzhi();
        this.queren(true);
    },
    // 筛选
    shaixuan: function shaixuan() {
        if (this.data.CWBIndex == 3) {
            return;
        }
        this.setData({
            "shaixuan.flag": true,
            "shaixuan.animate": "shaixuan-animate"
        });
    },
    shaixuanClose: function shaixuanClose() {
        var _this2 = this;
        cityNum = morenCityNum;
        typeNum = morenTypeNum;
        hotTypeNum = morenHotTypeNum;
        collegeTypeNum = morenCollegeTypeNum;
        foreignTypeNum = morenForeignTypeNum;
        var weiciNum = 0;
        if (this.maxRankingM != this.data.slider2Value || this.minRankingM != this.data.slider1Value) {
            weiciNum = 1;
        }
        this.setData({
            "shaixuan.animate": "shaixuan-animate-out",
            "shaixuan.cityList": JSON.parse(JSON.stringify(this.morenCityList)),
            "shaixuan.classifyList": JSON.parse(JSON.stringify(this.morenClassifyList)),
            "shaixuan.hotType": JSON.parse(JSON.stringify(this.morenHotType)),
            "shaixuan.collegeType": JSON.parse(JSON.stringify(this.morenCollegeType)),
            "shaixuan.foreignType": JSON.parse(JSON.stringify(this.morenForeignType)),
            "shaixuan.num": cityNum + typeNum + hotTypeNum + collegeTypeNum + foreignTypeNum + weiciNum,
            slider1Value: this.rankFrom,
            slider2Value: this.rankTo
        });
        setTimeout(function() {
            _this2.setData({
                "shaixuan.flag": false
            });
        }, 200);
    },
    // 省份选择
    chooseCityArr: function chooseCityArr(e) {
        var that = this;
        var cityList = that.data.shaixuan.cityList;
        var cityId = e.currentTarget.dataset.id;
        var index = e.currentTarget.dataset.index;
        if (index == 0) {
            cityNum = 0;
            cityList[0].st = true;
            for (var i = 1, j = cityList.length; i < j; i++) {
                cityList[i].st = false;
            }
            that.setData({
                "shaixuan.cityList": cityList
            });
        } else {
            var st = !cityList[index].st;
            if (st) {
                ++cityNum;
            } else {
                --cityNum;
            }
            if (cityNum == 0) {
                that.setData(_defineProperty({}, "shaixuan.cityList[0].st", true));
            } else {
                that.setData(_defineProperty({}, "shaixuan.cityList[0].st", false));
            }
            that.setData(_defineProperty({}, "shaixuan.cityList[" + index + "].st", st));
        }
    },
    // 类型
    classifyArr: function classifyArr(e) {
        var that = this;
        var classifyList = that.data.shaixuan.classifyList;
        var index = e.currentTarget.dataset.index;
        if (index == 0) {
            typeNum = 0;
            classifyList[0].st = true;
            for (var i = 1, j = classifyList.length; i < j; i++) {
                classifyList[i].st = false;
            }
            that.setData({
                "shaixuan.classifyList": classifyList
            });
        } else {
            var st = !classifyList[index].st;
            if (st) {
                ++typeNum;
            } else {
                --typeNum;
            }
            if (typeNum == 0) {
                that.setData(_defineProperty({}, "shaixuan.classifyList[0].st", true));
            } else {
                that.setData(_defineProperty({}, "shaixuan.classifyList[0].st", false));
            }
            that.setData(_defineProperty({}, "shaixuan.classifyList[" + index + "].st", st));
        }
    },
    // 热门标签
    hotType: function hotType(e) {
        var that = this;
        var hotType = that.data.shaixuan.hotType;
        var index = e.currentTarget.dataset.index;
        if (index == 0) {
            hotTypeNum = 0;
            hotType[0].st = true;
            for (var i = 1, j = hotType.length; i < j; i++) {
                hotType[i].st = false;
            }
            that.setData({
                "shaixuan.hotType": hotType
            });
        } else {
            var st = !hotType[index].st;
            if (st) {
                ++hotTypeNum;
            } else {
                --hotTypeNum;
            }
            if (hotTypeNum == 0) {
                that.setData(_defineProperty({}, "shaixuan.hotType[0].st", true));
            } else {
                that.setData(_defineProperty({}, "shaixuan.hotType[0].st", false));
            }
            that.setData(_defineProperty({}, "shaixuan.hotType[" + index + "].st", st));
        }
    },
    // 办学性质
    collegeType: function collegeType(e) {
        var that = this;
        var collegeType = that.data.shaixuan.collegeType;
        var index = e.currentTarget.dataset.index;
        if (index == 0) {
            collegeTypeNum = 0;
            collegeType[0].st = true;
            for (var i = 1, j = collegeType.length; i < j; i++) {
                collegeType[i].st = false;
            }
            that.setData({
                "shaixuan.collegeType": collegeType
            });
        } else {
            collegeTypeNum = 1;
            var st = !collegeType[index].st;
            for (var _i4 = 0, _j5 = collegeType.length; _i4 < _j5; _i4++) {
                collegeType[_i4].st = false;
            }
            if (st) {
                collegeTypeNum = 1;
                collegeType[index].st = true;
                that.setData(_defineProperty({}, "shaixuan.collegeType[" + index + "].st", true));
            } else {
                collegeTypeNum = 0;
                collegeType[0].st = true;
            }
            that.setData({
                "shaixuan.collegeType": collegeType
            });
        }
    },
    // 中外合作
    foreignType: function foreignType(e) {
        var that = this;
        var foreignType = that.data.shaixuan.foreignType;
        var index = e.currentTarget.dataset.index;
        if (index == 0) {
            foreignTypeNum = 0;
            foreignType[0].st = true;
            for (var i = 1, j = foreignType.length; i < j; i++) {
                foreignType[i].st = false;
            }
            that.setData({
                "shaixuan.foreignType": foreignType
            });
        } else {
            foreignTypeNum = 1;
            var st = !foreignType[index].st;
            for (var _i5 = 0, _j6 = foreignType.length; _i5 < _j6; _i5++) {
                foreignType[_i5].st = false;
            }
            if (st) {
                foreignTypeNum = 1;
                foreignType[index].st = true;
                that.setData(_defineProperty({}, "shaixuan.foreignType[" + index + "].st", true));
            } else {
                foreignTypeNum = 0;
                foreignType[0].st = true;
            }
            that.setData({
                "shaixuan.foreignType": foreignType
            });
        }
    },
    // 筛选-重置
    chongzhi: function chongzhi() {
        var that = this;
        cityNum = 0;
        typeNum = 0;
        hotTypeNum = 0;
        collegeTypeNum = 0;
        foreignTypeNum = 0;
        var cityList = that.data.shaixuan.cityList;
        var classifyList = that.data.shaixuan.classifyList;
        var hotType = that.data.shaixuan.hotType;
        var collegeType = that.data.shaixuan.collegeType;
        var foreignType = that.data.shaixuan.foreignType;
        cityList[0].st = true;
        for (var i = 1, j = cityList.length; i < j; i++) {
            cityList[i].st = false;
        }
        classifyList[0].st = true;
        for (var _i6 = 1, _j7 = classifyList.length; _i6 < _j7; _i6++) {
            classifyList[_i6].st = false;
        }
        hotType[0].st = true;
        for (var _i7 = 1, _j8 = hotType.length; _i7 < _j8; _i7++) {
            hotType[_i7].st = false;
        }
        collegeType[0].st = true;
        for (var _i8 = 1, _j9 = collegeType.length; _i8 < _j9; _i8++) {
            collegeType[_i8].st = false;
        }
        foreignType[0].st = true;
        for (var _i9 = 1, _j10 = foreignType.length; _i9 < _j10; _i9++) {
            foreignType[_i9].st = false;
        }
        that.setData({
            "shaixuan.cityList": cityList,
            "shaixuan.classifyList": classifyList,
            "shaixuan.hotType": hotType,
            "shaixuan.collegeType": collegeType,
            "shaixuan.foreignType": foreignType
        });
        var obj = {
            minRanking: that.minRanking,
            minRankingM: that.minRankingM,
            maxRanking: that.maxRanking,
            maxRankingM: that.maxRankingM
        };
        that.initWeici(obj);
    },
    // 筛选-确认
    queren: function queren(flag) {
        if (!this.data.isVIP) {
            wx.showToast({
                title: "开通VIP即可体验",
                icon: "none"
            });
            this.shaixuanClose();
            return;
        }
        var oldProvinceIds = JSON.stringify(this.provinceIds);
        var oldClassify = JSON.stringify(this.classify);
        var oldHotType = JSON.stringify(this.hotTypes);
        var oldCollegeType = JSON.stringify(this.collegeTypes);
        var oldForeignType = JSON.stringify(this.foreignTypes);
        var cityList = this.data.shaixuan.cityList;
        var classifyList = this.data.shaixuan.classifyList;
        var hotType = this.data.shaixuan.hotType;
        var collegeType = this.data.shaixuan.collegeType;
        var foreignType = this.data.shaixuan.foreignType;
        this.morenCityList = JSON.parse(JSON.stringify(cityList));
        this.morenClassifyList = JSON.parse(JSON.stringify(classifyList));
        this.morenHotType = JSON.parse(JSON.stringify(hotType));
        this.morenCollegeType = JSON.parse(JSON.stringify(collegeType));
        this.morenForeignType = JSON.parse(JSON.stringify(foreignType));
        morenCityNum = cityNum;
        morenTypeNum = typeNum;
        morenHotTypeNum = hotTypeNum;
        morenCollegeTypeNum = collegeTypeNum;
        morenForeignTypeNum = foreignTypeNum;
        this.provinceIds = [];
        this.classify = [];
        this.hotTypes = [];
        this.collegeTypes = [];
        this.foreignTypes = 0;
        for (var i = 1, j = cityList.length; i < j; i++) {
            if (cityList[i].st) {
                this.provinceIds.push(cityList[i].numId);
            }
        }
        for (var _i10 = 1, _j11 = classifyList.length; _i10 < _j11; _i10++) {
            if (classifyList[_i10].st) {
                this.classify.push(classifyList[_i10].name);
            }
        }
        for (var _i11 = 1, _j12 = hotType.length; _i11 < _j12; _i11++) {
            if (hotType[_i11].st) {
                this.hotTypes.push(hotType[_i11].name);
            }
        }
        if (collegeType[1].st) {
            this.collegeTypes.push(1);
        }
        if (collegeType[2].st) {
            this.collegeTypes.push(0);
        }
        if (foreignType[1].st) {
            this.foreignTypes = 2;
        }
        if (foreignType[2].st) {
            this.foreignTypes = 1;
        }
        if (flag) {
            if (oldProvinceIds == JSON.stringify(this.provinceIds) && oldClassify == JSON.stringify(this.classify) && oldHotType == JSON.stringify(this.hotTypes) && oldCollegeType == JSON.stringify(this.collegeTypes) && oldForeignType == JSON.stringify(this.foreignTypes) && this.oldsliderV1 == this.data.slider1Value && this.oldsliderV2 == this.data.slider2Value) {} else {
                this.initData();
                this.rankFrom = this.data.slider1Value;
                this.rankTo = this.data.slider2Value;
                this.loadCollegeList();
            }
        }
        this.oldsliderV1 = this.data.slider1Value;
        this.oldsliderV2 = this.data.slider2Value;
        this.shaixuanClose();
    },
    // goZyTable() {
    //   wx.navigateTo({
    //     url: '../shanDongVolunteer/shanDongVolunteer?prevPage=2',
    //   })
    // },
    changeScore: function changeScore() {
        wx.navigateTo({
            url: "/pages/changeAchievement/changeAchievement?update=true&prevPage=2"
        });
    },
    goSearch: function goSearch() {
        wx.navigateTo({
            url: "/pages/globalSearch/globalSearch?mode=hnReport"
        });
    },
    commonTuijian: function commonTuijian() {
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
    // 自选填报次数
    loadUseFunctionLogsCount: function loadUseFunctionLogsCount() {
        var that = this;
        var data = {
            userNumId: this.userInfo[0].UserId,
            userPermissionId: this.userInfo[0].UserType,
            functionType: 1
        };
        _api4.default.UseFunctionLogsCount("Users/UseFunctionLogs/Count", "POST", data).then(function(res) {
            that.setData({
                count: res.result.value
            });
        });
    },
    goMajorDetail: function goMajorDetail(e) {
        var majorcode = e.currentTarget.dataset.majorcode;
        if (majorcode.length == 4) {
            wx.navigateTo({
                url: "/packages/selectMajor/middleMajorDetail/middleMajorDetail?majorcode=" + majorcode
            });
        } else if (majorcode.length == 6) {
            wx.navigateTo({
                url: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + majorcode + "&cityid=834"
            });
        }
    },
    // 保存志愿表
    saveZyTable: function saveZyTable() {
        var that = this;
        var listData = this.data.zyTableList;
        var count = 0;
        var flag = false;
        listData.forEach(function(ele) {
            if (ele.collegeName) {
                count++;
            }
        });
        if (listData.length > 3 && count < 3) {
            wx.showToast({
                title: "至少填报三个院校",
                icon: "none",
                duration: 2e3
            });
            return;
        }
        for (var i = 0; i < count; i++) {
            if (listData[i].collegeName) {
                flag = true;
            } else {
                flag = false;
                break;
            }
        }
        if (!flag) {
            wx.showToast({
                title: "志愿顺序必须是连续的",
                icon: "none",
                duration: 2e3
            });
            return;
        }
        wx.showLoading({
            title: "保存志愿表",
            mask: true
        });
        var score = this.data.score;
        var newArrData = [];
        listData.forEach(function(i, index) {
            if (i.collegeName) {
                newArrData.push(i);
                newArrData[index].zyTableId = 0;
                newArrData[index].number = index + 1;
                newArrData[index].professions = i.professions;
                newArrData[index].professions.forEach(function(ele, idx) {
                    ele.planYear = ele.year;
                    ele.provinceName = ele.provinceName;
                    ele.chooseSubjects = ele.chooseCns;
                    ele.zyTableId = 0, ele.number = idx + 1;
                });
            }
        });
        var userId = wx.getStorageSync("userInfo")[0].UserId;
        var data = {
            userNumId: userId,
            provinceNumId: 853,
            provinceName: "海南",
            oriBacthNames: 1,
            totalScore: score.totalScore,
            scoreType: 1,
            ranking: score.rank,
            chooseSubject: wx.getStorageSync("userScore").chooseLevelOrSubjects,
            deviceType: 5,
            isBen: true,
            //本科批true 专科批false
            colleges: newArrData
        };
        _api2.default.SaveHnTable("Users/ZyTable/HaiNan/Save", "POST", data).then(function(re) {
            wx.hideLoading();
            if (re.isSuccess) {
                wx.showModal({
                    title: "保存成功",
                    content: "是否查看志愿表",
                    success: function success(res) {
                        if (res.confirm) {
                            wx.navigateTo({
                                url: "../hainanVolunteer/hainanVolunteer?numId=" + re.result
                            });
                            setTimeout(function() {
                                that.closePreviewForm();
                                that.setData({
                                    zyTableList: []
                                }, function() {
                                    that.getZyCount();
                                });
                            }, 200);
                        }
                    }
                });
            }
        });
    },
    // 数据说明
    // 申请会员卡弹框
    dataInfoPopup: function dataInfoPopup() {
        this.selectComponent("#dataInfo")._showTap();
    },
    hideDataInfo: function hideDataInfo() {
        var that = this;
        that.selectComponent("#dataInfo").hidePopupFunc();
    },
    changeRank: function changeRank() {
        this.selectComponent("#topMenu").showMenu();
    },
    hide: function hide() {
        this.selectComponent("#topMenu").hideMenu();
    },
    rankInput: function rankInput(e) {
        rankNum = e.detail.value;
    },
    confirm: function confirm() {
        var _this3 = this;
        if (rankNum <= 0) {
            wx.showToast({
                title: "请正确输入位次！",
                icon: "none"
            });
            return;
        }
        this.setData({
            rank: rankNum
        }, function() {
            _this3.selectComponent("#topMenu").hideMenu();
        });
        this.rank = parseInt(rankNum);
        this.initData();
        this.loadCollegeList();
    },
    //修改批次
    changeBatch: function changeBatch() {
        wx.navigateTo({
            url: "/packages/common/batchList/batchList?batch=" + this.data.batch + "update=true"
        });
    },
    majorOpen: function majorOpen(e) {
        var _e$currentTarget$data = e.currentTarget.dataset, index = _e$currentTarget$data.index, swiperidx = _e$currentTarget$data.swiperidx, open = _e$currentTarget$data.open;
        var list = void 0;
        switch (swiperidx) {
          case 0:
            list = this.data.CCollegeList;
            list.collegeList[index].majorOpen = open ? false : true;
            this.setData({
                CCollegeList: list
            });
            break;

          case 1:
            list = this.data.WCollegeList;
            list.collegeList[index].majorOpen = open ? false : true;
            this.setData({
                WCollegeList: list
            });
            break;

          case 2:
            list = this.data.BCollegeList;
            list.collegeList[index].majorOpen = open ? false : true;
            this.setData({
                BCollegeList: list
            });
            break;

          case 3:
            list = this.data.ZCollegeList;
            list.collegeList[index].majorOpen = open ? false : true;
            this.setData({
                ZCollegeList: list
            });
            break;
        }
    },
    addMajor: function addMajor() {
        if (!this.data.isVIP) {
            wx.showToast({
                title: "开通VIP即可体验",
                icon: "none"
            });
            return;
        }
        wx.navigateTo({
            url: "/packages/recommend/addMajor/addMajor?update=true&prevPage=2"
        });
    },
    // 填报
    tianbaoZY: function tianbaoZY(e) {
        var _this4 = this;
        var that = this;
        var _e$currentTarget$data2 = e.currentTarget.dataset, collegename = _e$currentTarget$data2.collegename, item = _e$currentTarget$data2.item, colleges = _e$currentTarget$data2.colleges, majorcode = _e$currentTarget$data2.majorcode;
        var zyTableList = this.data.zyTableList;
        var list = void 0;
        var res = void 0;
        this.code1 = item.majorCode;
        this.code2 = item.professionCode;
        this.currentMajorInfo = item;
        this.chooseSubjects = colleges.chooseSubjects;
        this.setData({
            currentCollegeName: collegename
        });
        switch (this.data.CWBIndex) {
          case 0:
            list = this.data.CCollegeList.collegeList;
            break;

          case 1:
            list = this.data.WCollegeList.collegeList;
            break;

          case 2:
            list = this.data.BCollegeList.collegeList;
            break;

          case 3:
            list = this.data.ZCollegeList.collegeList;
            break;
        }
        //是否存在院校
                var result = zyTableList.some(function(ele) {
            if (ele.collegeName == collegename && ele.chooseSubjects == colleges.chooseSubjects) {
                return true;
            }
        });
        if (result) {
            //存在该院校
            zyTableList.forEach(function(ele, index) {
                if (ele.collegeName == collegename && ele.chooseSubjects == that.chooseSubjects) {
                    res = ele.professions.some(function(item) {
                        if (item.majorCode == that.code1 && item.professionCode == that.code2) {
                            return true;
                        }
                    });
                    if (res) {
                        ele.professions.forEach(function(el, index) {
                            if (el.majorCode == that.code1 && el.professionCode == that.code2) {
                                ele.professions.splice(index, 1);
                            }
                        });
                        _this4.changeisTianBao("oneClick");
                    } else {
                        if (ele.professions.length >= that.data.majorCount) {
                            wx.showToast({
                                title: "选择专业已达上限(" + that.data.majorCount + "个)",
                                icon: "none",
                                duration: 2e3
                            });
                            return;
                        } else {
                            //   item.belong = colleges.belong;
                            //   item.classify = colleges.classify;
                            //   item.collegeProvinceName = colleges.provinceName;
                            //   item.collegeType = colleges.collegeType;
                            //   item.levels = colleges.levels;
                            //   item.dataType = this.data.CWBIndex + 1
                            //   zyTableList.push(item);
                            ele.professions.push(_this4.currentMajorInfo);
                            _this4.changeisTianBao("oneClick");
                        }
                    }
                    if (ele.professions.length == 0) {
                        zyTableList.splice(index, 1, {});
                        _this4.setData({
                            currentCollegeName: ""
                        });
                        _this4.code1 = "";
                        _this4.code2 = "";
                        _this4.currentMajorInfo = "";
                        _this4.chooseSubjects = "";
                        _this4.changeisTianBao("changeTab");
                    }
                }
            });
            this.setData({
                zyTableList: zyTableList
            });
        } else {
            var collegeCount = 0;
            zyTableList.forEach(function(ele) {
                if (ele.collegeName) {
                    ++collegeCount;
                }
            });
            //不存在院校 弹出弹窗 先添加院校 再添加专业
                        this.previewForm();
        }
        switch (this.data.CWBIndex) {
          case 0:
            this.setData({
                "CCollegeList.collegeList": list
            });
            break;

          case 1:
            this.setData({
                "WCollegeList.collegeList": list
            });
            break;

          case 2:
            this.setData({
                "BCollegeList.collegeList": list
            });
            break;

          case 3:
            this.setData({
                "ZCollegeList.collegeList": list
            });
            break;
        }
    },
    //重新遍历 列表中的填报flag
    changeisTianBao: function changeisTianBao(type) {
        var _this5 = this;
        var that = this;
        var res = void 0;
        var zyTableList = this.data.zyTableList;
        var collegeName = this.prevName;
        var listArr = [];
        var num = void 0;
        var zyTableNum = 0;
        if (this.data.CWBIndex == 0) {
            listArr = this.data.CCollegeList;
            num = this.data.CCollegeList.num;
        } else if (this.data.CWBIndex == 1) {
            listArr = this.data.WCollegeList;
            num = this.data.WCollegeList.num;
        } else if (this.data.CWBIndex == 2) {
            listArr = this.data.BCollegeList;
            num = this.data.BCollegeList.num;
        } else if (this.data.CWBIndex == 3) {
            listArr = this.data.ZCollegeList;
            num = this.data.ZCollegeList.num;
        }
        if (type == "oneClick") {
            var count = 0;
            listArr.collegeList.forEach(function(ele) {
                if (ele.collegeName == _this5.currentMajorInfo.collegeName) {
                    ele.professions.forEach(function(el) {
                        if (el.majorCode == that.code1 && el.professionCode == that.code2) {
                            el.st = !el.st;
                        }
                        if (el.st) {
                            ++count;
                        }
                    });
                }
            });
            num = count;
        }
        if (type == "changeTab") {
            num = 0;
            listArr.collegeList.forEach(function(ele, index) {
                ele.professions.forEach(function(item) {
                    item.st = false;
                });
                zyTableList.forEach(function(el, idx) {
                    if (el.collegeName == ele.collegeName && el.chooseSubjects == ele.chooseSubjects) {
                        ele.professions.forEach(function(majorItem1) {
                            el.professions.forEach(function(majorItem2) {
                                if (majorItem1.majorCode == majorItem2.majorCode && majorItem1.professionCode == majorItem2.professionCode) {
                                    majorItem1.st = true;
                                    num++;
                                }
                            });
                        });
                    }
                });
            });
        }
        if (type == "replace") {
            console.log(that.replaceChooseSubjects, that.replaceCollegeName);
            var _count = 0;
            listArr.collegeList.forEach(function(ele) {
                if (ele.collegeName == that.replaceCollegeName && ele.chooseSubjects == that.replaceChooseSubjects) {
                    ele.professions.forEach(function(el) {
                        el.st = false;
                    });
                }
            });
            listArr.collegeList.forEach(function(ele) {
                zyTableList.forEach(function(item) {
                    if (ele.collegeName === item.collegeName && ele.chooseSubjects == item.chooseSubjects) {
                        ele.professions.forEach(function(el) {
                            if (el.majorCode == that.code1 && el.professionCode == that.code2) {
                                el.st = true;
                            }
                            if (el.st) {
                                ++_count;
                            }
                        });
                    }
                });
            });
            num = _count;
        }
        if (this.data.CWBIndex == 0) {
            this.setData({
                CCollegeList: listArr,
                "CCollegeList.num": num
            });
        } else if (this.data.CWBIndex == 1) {
            this.setData({
                WCollegeList: listArr,
                "WCollegeList.num": num
            });
        } else if (this.data.CWBIndex == 2) {
            this.setData({
                BCollegeList: listArr,
                "BCollegeList.num": num
            });
        } else if (this.data.CWBIndex == 3) {
            this.setData({
                ZCollegeList: listArr,
                "ZCollegeList.num": num
            });
        }
        zyTableList.forEach(function(ele) {
            if (ele.collegeName) {
                ++zyTableNum;
            }
        });
        this.setData({
            zyTableNum: zyTableNum
        });
    },
    //点击志愿表中填报
    clickMe: function clickMe(e) {
        if (!this.data.currentCollegeName && !this.chooseSubjects) return;
        var that = this;
        var idx = e.currentTarget.dataset.index;
        var zyTableList = this.data.zyTableList;
        var len = zyTableList.length;
        var tempObj = {};
        var tempArr = [];
        var listArr = [];
        var replaceInfo = {};
        var type = "";
        if (this.data.CWBIndex == 0) {
            listArr = this.data.CCollegeList.collegeList;
        } else if (this.data.CWBIndex == 1) {
            listArr = this.data.WCollegeList.collegeList;
        } else if (this.data.CWBIndex == 2) {
            listArr = this.data.BCollegeList.collegeList;
        } else {
            listArr = this.data.ZCollegeList.collegeList;
        }
        //拿到学校信息
                listArr.forEach(function(ele) {
            if (that.data.currentCollegeName == ele.collegeName && that.chooseSubjects == ele.chooseSubjects) {
                tempObj.groupCode = ele.groupCode;
                tempObj.enterHis = ele.enterHis;
                tempObj.planYear = ele.planYear;
                tempObj.isBen = ele.isBen;
                tempObj.fitCount = ele.fitCount;
                tempObj.historyStartYear = ele.historyStartYear;
                tempObj.provinceId = ele.provinceId;
                tempObj.provinceName = ele.provinceName;
                tempObj.area = ele.area;
                tempObj.collegeId = ele.collegeId;
                tempObj.collegeName = ele.collegeName;
                tempObj.logoUrl = ele.logoUrl;
                tempObj.collegeCode = ele.collegeCode;
                tempObj.uCode = ele.uCode;
                tempObj.levels = ele.levels;
                tempObj.collegeType = ele.collegeType;
                tempObj.rankOfCn = ele.rankOfCn;
                tempObj.nature = ele.nature;
                tempObj.classify = ele.classify;
                tempObj.belong = ele.belong;
                tempObj.is985 = ele.is985;
                tempObj.is211 = ele.is211;
                tempObj.isKey = ele.isKey;
                tempObj.isArt = ele.isArt;
                tempObj.firstClass = ele.firstClass;
                tempObj.isProvincial = ele.isProvincial;
                tempObj.isBTProvince = ele.isBTProvince;
                tempObj.isDependent = ele.isDependent;
                tempObj.enterNum = ele.enterNum;
                tempObj.enterNum1 = ele.enterNum1;
                tempObj.enterNum2 = ele.enterNum2;
                tempObj.enterNum3 = ele.enterNum3;
                tempObj.planNum = ele.planNum;
                tempObj.planNum1 = ele.planNum1;
                tempObj.planNum2 = ele.planNum2;
                tempObj.planNum3 = ele.planNum3;
                tempObj.minSort = ele.minSort;
                tempObj.majorOpen = ele.majorOpen;
                tempObj.planNum2 = ele.planNum2;
                tempObj.probability = ele.probability;
                tempObj.chooseSubjects = ele.chooseSubjects;
                tempObj.probability = ele.probability;
                tempObj.estimatedRanking = ele.estimatedRanking;
            }
        });
        var result = zyTableList.some(function(item) {
            if (item.collegeName == that.data.currentCollegeName && item.chooseSubjects == that.chooseSubjects) {
                return true;
            }
        });
        if (result) {
            //添加专业
            zyTableList.forEach(function(ele, index) {
                if (ele.collegeName == that.data.currentCollegeName && ele.chooseSubjects == that.chooseSubjects) {
                    replaceInfo = ele;
                    zyTableList.splice(index, 1, {});
                }
            });
            zyTableList.forEach(function(ele, index) {
                if (idx == index && replaceInfo) {
                    that.replaceCollegeName = ele.collegeName;
                    that.replaceChooseSubjects = ele.chooseSubjects;
                    zyTableList.splice(index, 1, replaceInfo);
                }
            });
            that.setData({
                zyTableList: zyTableList
            });
            that.changeisTianBao("replace");
        } else {
            zyTableList.forEach(function(ele, index) {
                if (idx == index) {
                    if (ele.collegeName) {
                        that.replaceCollegeName = ele.collegeName;
                        that.replaceChooseSubjects = ele.chooseSubjects;
                        replaceInfo = ele;
                        zyTableList.splice(index, 1, {});
                        // that.replaceCollegeName = ele.collegeName;
                                                tempObj.dataType = that.data.CWBIndex + 1;
                        tempObj.professions = [];
                        tempObj.professions.push(that.currentMajorInfo);
                        zyTableList.splice(index, 1, tempObj);
                        that.setData({
                            zyTableList: zyTableList
                        });
                        that.changeisTianBao("replace");
                    } else {
                        tempObj.dataType = that.data.CWBIndex + 1;
                        tempObj.professions = [];
                        tempObj.professions.push(that.currentMajorInfo);
                        ele = Object.assign(ele, tempObj);
                        that.setData({
                            zyTableList: zyTableList
                        });
                        that.changeisTianBao("oneClick");
                    }
                }
            });
        }
    }
});

function scalarArrayEquals(array1, array2) {
    return array1.length == array2.length && array1.every(function(v, i) {
        return v === array2[i];
    });
}