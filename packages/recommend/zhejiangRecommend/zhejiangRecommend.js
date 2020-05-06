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

var timer = void 0;

var cityNum = 0, typeNum = 0, hotTypeNum = 0, collegeTypeNum = 0, foreignTypeNum = 0, morenCityNum = 0, morenTypeNum = 0, morenHotTypeNum = 0, morenCollegeTypeNum = 0, morenForeignTypeNum = 0, rankChangingNum = 0, rankFrom = 0, rankTo = 0, rankNum = 0;

Page((_Page = {
    provinceIds: [],
    classify: [],
    hotTypes: [],
    collegeTypes: [],
    foreignTypes: 0,
    update: false,
    updateAddMajor: false,
    zPn: 1,
    data: {
        currentTab: 0,
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
        change: false,
        // 当两个slider重合时，将change设置为true，从而隐藏slider2，才能继续操作slider1
        scale: 1,
        batch: 1,
        keywords: [],
        uCodes: [],
        firstCollegeList: {
            showLoad: true,
            loadMore: true,
            num: 0,
            collegeList: []
        },
        smallDetailLoad: true,
        middleDetailLoad: true,
        collegeNum: 0
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
        rankChangingNum = 1;
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
        this.setData({
            system: app.globalData.system,
            color: app.globalData.color
        });
        var isVIP = this.userInfo[0].UserType > 1 ? true : false;
        var top = app.globalData.navigationCustomCapsuleHeight + app.globalData.navigationCustomStatusHeight;
        this.setData({
            top: top,
            system: app.globalData.system,
            isVIP: isVIP
        });
        if (!isVIP) {
            this.loadUseFunctionLogsCount();
        }
        var batch = wx.getStorageSync("sdBatch");
        if (batch) {
            this.setData({
                batch: batch
            });
        } else {
            var score = wx.getStorageSync("userScore");
            this.setData({
                batch: score.total >= 435 ? 1 : 2,
                rank: score.rank
            });
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
                this.morenHotType = JSON.parse(JSON.stringify(this.data.shaixuan.hotType));
        this.morenCollegeType = JSON.parse(JSON.stringify(this.data.shaixuan.collegeType));
        this.morenForeignType = JSON.parse(JSON.stringify(this.data.shaixuan.foreignType));
    },
    onShow: function onShow() {
        if (this.update) {
            wx.removeStorageSync("keywords");
            wx.removeStorageSync("searchMajorList");
            this.update = false;
            this.chongzhi();
            this.queren(false);
            if (wx.getStorageSync("clearZyTable")) {
                this.setData({
                    zyTableList: [],
                    zyTableNum: 0
                });
                wx.removeStorageSync("clearZyTable");
                wx.removeStorageSync("sdAddMajorSearch");
                wx.removeStorageSync("addCollegeList");
            }
            this.maxRanking = false;
            var collegeList = wx.getStorageSync("addCollegeList") || [];
            var uCodes = [];
            collegeList.map(function(i) {
                uCodes.push(i.uCode);
            });
            uCodes = Array.from(new Set(uCodes));
            var keywords = [];
            var arr = wx.getStorageSync("sdAddMajorSearch") || [];
            arr.map(function(i) {
                keywords.push(i.name);
            });
            var score = wx.getStorageSync("userScore");
            this.setData({
                rank: score.rank,
                keywords: keywords,
                uCodes: uCodes
            });
            this.setData(_defineProperty({}, "firstCollegeList.showLoad", true));
            if (this.data.currentTab == 1) {
                this.zPn = 1;
                this.getFirstCollege();
            }
            this.initData();
            //默认初始化
                        this.initCity();
            //筛选-省份
                        this.initClassify();
            //筛选-类型
                        this.initScore();
            //成绩
                        this.loadRank();
            //获取位次区间
                } else {
            // this.getRank(); //根据成绩获取位次
            var batch = wx.getStorageSync("sdBatch");
            if (batch) {
                this.setData({
                    batch: batch
                });
            }
        }
        // this.setData({
        //   rank:this.rank
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
        rankChangingNum = 0;
        clearInterval(timer);
        wx.removeStorageSync("sdAddMajorSearch");
        wx.removeStorageSync("addCollegeList");
    },
    // getRank(){
    //   let data = {
    //     "cityId":843,
    //     "score":this.totalScore
    //   }
    //   apiCommon.getRank('ScoreLines/YFYD/GetByScore','POST',data).then(res=>{
    //     this.setData({
    //       rankDetail:res.result,
    //       rank:res.result.lowestRank 
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
        }
        if (collegeList.loadMore == false) {
            return;
        }
        var collegeType = -1;
        this.data.shaixuan.collegeType.map(function(i, idx) {
            if (i.st) {
                if (idx == 0) {
                    collegeType = -1;
                } else if (idx == 1) {
                    collegeType = 1;
                } else if (idx == 2) {
                    collegeType = 0;
                }
            }
        });
        var data = {
            isGetAllCSBCount: false,
            provinceId: 843,
            totalScore: this.totalScore,
            rank: this.rank,
            getDataType: getDataType,
            provinceIds: this.provinceIds,
            classify: this.classify,
            chooseLevel: this.chooseLevel,
            keywords: this.data.keywords,
            levels: this.hotTypes,
            collegeType: collegeType,
            oriBacthNames: [],
            rankFrom: this.rankFrom,
            rankTo: this.rankTo,
            pageIndex: pn,
            foreignType: this.foreignTypes,
            section: 0,
            isFillNumber: false,
            uCodes: this.data.uCodes
        };
        _api2.default.DoNewGaoKaoProfessionFirst("TZY/Recommendation/DoNewGaoKaoProfessionFirst", "POST", data).then(function(res) {
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
                        name = data.chongNumber == 0 && data.chongProfessionNumber == 0 ? "冲 暂无数据" : "冲 " + (data.chongProfessionNumber == 0 ? "-" : data.chongProfessionNumber) + "组";
                        that.CName = name;
                        break;

                      case 1:
                        name = data.shouNumber == 0 && data.shouProfessionNumber == 0 ? "稳 暂无数据" : "稳 " + (data.shouProfessionNumber == 0 ? "-" : data.shouProfessionNumber) + "组";
                        that.WName = name;
                        break;

                      case 2:
                        name = data.baoNumber == 0 && data.baoProfessionNumber == 0 ? "保 暂无数据" : "保 " + (data.baoProfessionNumber == 0 ? "-" : data.baoProfessionNumber) + "组";
                        that.BName = name;
                        break;
                    }
                    if (getDataType == that.data.CWBIndex) {
                        that.setData(_defineProperty({}, "CWBList[" + getDataType + "].name", name));
                    }
                }
                data.professions.map(function(i) {
                    i.st = false;
                    i.levels = "";
                    i.levels += i.is985 == 1 ? " 985" : "";
                    i.levels += i.is211 == 1 ? " 211" : "";
                    i.levels += i.isKey == 1 ? " 双一流" : "";
                    i.chooseCns = i.chooseCns.replace(/\s+/g, "");
                    if (i.learnYear.indexOf("年") == -1) {
                        i.learnYear = i.learnYear + "年";
                    }
                    if (i.cost.indexOf("￥") == -1) {
                        i.cost = "￥" + i.cost;
                    }
                    if (i.collegeType.indexOf("立") == -1) {
                        i.collegeType = i.collegeType == 0 ? "私立" : "公立";
                    }
                    zyTableList.map(function(j) {
                        if (j.majorCode == i.majorCode && j.collegeId == i.collegeId) {
                            i.st = true;
                        }
                    });
                });
                var list = wx.getStorageSync("userScore").chooseSubjects;
                var chooseSubjects = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;
                try {
                    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var l = _step.value;
                        chooseSubjects.push(l.substring(0, 1));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                var newArr = [];
                data.professions.map(function(j) {
                    if (j && j.chooseSubjects == "且") {
                        if (j.chooseCns.length > 1) {
                            newArr = j.chooseCns.split("+");
                            chooseSubjects.map(function(c) {
                                newArr.map(function(n) {
                                    if (n == c) {
                                        j.chooseCns = j.chooseCns.replace(c, '<span style="color:black">' + c + "</span>");
                                    }
                                });
                            });
                        } else if (j.chooseCns.length == 1) {
                            newArr = [ j.chooseCns ];
                            chooseSubjects.map(function(c) {
                                newArr.map(function(n) {
                                    if (n == c) {
                                        j.chooseCns = j.chooseCns.replace(c, '<span style="color:black">' + c + "</span>");
                                    }
                                });
                            });
                        }
                    } else {
                        if (j.chooseCns.length > 1) {
                            newArr = j.chooseCns.split("/");
                            chooseSubjects.map(function(c) {
                                newArr.map(function(n) {
                                    if (n == c) {
                                        j.chooseCns = j.chooseCns.replace(c, '<span style="color:black">' + c + "</span>");
                                    }
                                });
                            });
                        } else if (j.chooseCns.length == 1) {
                            newArr = [ j.chooseCns ];
                            chooseSubjects.map(function(c) {
                                newArr.map(function(n) {
                                    if (n == c) {
                                        j.chooseCns = j.chooseCns.replace(c, '<span style="color:black">' + c + "</span>");
                                    }
                                });
                            });
                        }
                    }
                });
                that.setData((_that$setData2 = {}, _defineProperty(_that$setData2, dataType + ".collegeList", collegeList.collegeList.concat(data.professions)), 
                _defineProperty(_that$setData2, dataType + ".showLoad", false), _that$setData2), function() {
                    that.changeisTianBao("changeTab");
                });
                if (data.professions.length < 10) {
                    that.setData(_defineProperty({}, dataType + ".loadMore", false));
                }
            }
        });
    },
    scrollCollegeToLower: function scrollCollegeToLower() {
        if (!this.data.isVIP) {
            return;
        }
        switch (this.data.currentTab) {
          case 0:
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
            break;

          case 1:
            ++this.zPn;
            if (this.data.firstCollegeList.loadMore) {
                this.getFirstCollege();
            }
            break;
        }
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
        } ];
        var arr = [];
        for (var i = 0; i < cityList.length; i++) {
            arr.push({
                fLetter: cityList[i].fLetter,
                name: cityList[i].name,
                numId: cityList[i].numId,
                st: false
            });
        }
        arr.map(function(i, idx) {
            if (i.numId == cityId) {
                arr = [].concat(_toConsumableArray(arr.splice(idx, 1)), _toConsumableArray(arr));
            }
        });
        newCityList = [].concat(_toConsumableArray(newCityList), _toConsumableArray(arr));
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
        this.setData({
            score: score
        });
    },
    // 计算swiper and scroll高度
    getSwiperH: function getSwiperH() {
        var _this2 = this;
        var that = this;
        var item = wx.createSelectorQuery();
        item.selectAll(".filter").boundingClientRect();
        item.exec(function(res) {
            var header = res[0][0].height;
            var advice = res[0][0].height;
            var footer = res[0][0].height;
            var pageH = app.globalData.systemInfo.screenHeight - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight;
            if (that.data.currentTab == 0) {
                var cwb = wx.createSelectorQuery();
                cwb.selectAll("#cwb").boundingClientRect();
                cwb.exec(function(r) {
                    that.setData({
                        "HInfo.swiperH": pageH - header,
                        "HInfo.scrollH": pageH - header - r[0][0].height,
                        "HInfo.shaixuanH": pageH,
                        "HInfo.navH": app.globalData.navigationCustomCapsuleHeight + app.globalData.navigationCustomStatusHeight
                    });
                });
            } else if (_this2.data.currentTab == 1 || _this2.data.currentTab == 2) {
                that.setData({
                    "HInfo.swiperH": pageH - header,
                    "HInfo.scrollH": pageH - header,
                    "HInfo.shaixuanH": pageH,
                    "HInfo.navH": app.globalData.navigationCustomCapsuleHeight + app.globalData.navigationCustomStatusHeight
                });
            } else {
                that.setData({
                    "HInfo.swiperH": pageH - header,
                    "HInfo.scrollH": pageH - header - advice - footer,
                    "HInfo.shaixuanH": pageH,
                    "HInfo.navH": app.globalData.navigationCustomCapsuleHeight + app.globalData.navigationCustomStatusHeight
                });
            }
        });
    },
    // 切换冲稳保
    chooseCWB: function chooseCWB(e) {
        var _setData2;
        var that = this;
        var index = e.currentTarget.dataset.index;
        var CWBIndex = this.data.CWBIndex;
        if (index == CWBIndex) {
            return;
        }
        this.setData((_setData2 = {
            CWBIndex: index
        }, _defineProperty(_setData2, "CWBList[" + CWBIndex + "].animate", "CWB-close"), 
        _defineProperty(_setData2, "CWBList[" + index + "].animate", "CWB-open"), _setData2), function() {
            that.CWBNameAnimate(index, CWBIndex);
            that.CWBloadCollege(index);
            that.changeisTianBao("changeTab");
        });
    },
    changeCWB: function changeCWB(e) {
        var that = this;
        if (e.detail.source == "touch") {
            var _setData3;
            var index = e.detail.current;
            var CWBIndex = this.data.CWBIndex;
            this.setData((_setData3 = {
                CWBIndex: index
            }, _defineProperty(_setData3, "CWBList[" + CWBIndex + "].animate", "CWB-close"), 
            _defineProperty(_setData3, "CWBList[" + index + "].animate", "CWB-open"), _setData3));
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
        }
        setTimeout(function() {
            var _that$setData4;
            that.setData((_that$setData4 = {}, _defineProperty(_that$setData4, "CWBList[" + CWBIndex + "].name", oldName), 
            _defineProperty(_that$setData4, "CWBList[" + index + "].name", currentName), _that$setData4));
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
        }
        if (this.data.currentTab == 2) {
            showLoad = this.data.ZCollegeList.showLoad;
        }
        if (showLoad) {
            this.loadCollegeList();
        }
    },
    showCollegeDetail: function showCollegeDetail(e) {
        this.selectComponent("#framedirect").showFrame();
        var collegeId = e.currentTarget.dataset.collegeid;
        var collegeCode = e.currentTarget.dataset.collegecode;
        var isBen = e.currentTarget.dataset.isben;
        var index = e.currentTarget.dataset.index;
        if (this.data.collegeDetail.detail == null || collegeId != this.data.collegeDetail.detail.collegeId) {
            this.getCollegeDetail(collegeId, collegeCode, isBen, index);
        }
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
            provinceId: 843,
            collegeId: collegeId,
            collegeCode: collegeCode,
            isBen: isBen
        };
        var collegeList = void 0;
        var CWBIndex = that.data.CWBIndex;
        if (this.data.currentTab == 0) {
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
            }
        } else if (this.data.currentTab == 1) {
            collegeList = this.data.firstCollegeList.collegeList[index];
        } else {
            collegeList = that.data.ZCollegeList.collegeList[index];
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
                collegeType: res.result.collegeType,
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
        if (!this.data.isVIP) {
            wx.showToast({
                title: "开通VIP即可体验",
                icon: "none"
            });
            return;
        }
        if (this.data.CWBIndex == 3) {
            return;
        }
        this.setData({
            "shaixuan.flag": true,
            "shaixuan.animate": "shaixuan-animate"
        });
    },
    shaixuanClose: function shaixuanClose() {
        var _this3 = this;
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
            _this3.setData({
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
            for (var _i = 0, _j = collegeType.length; _i < _j; _i++) {
                collegeType[_i].st = false;
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
            for (var _i2 = 0, _j2 = foreignType.length; _i2 < _j2; _i2++) {
                foreignType[_i2].st = false;
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
        for (var _i3 = 1, _j3 = classifyList.length; _i3 < _j3; _i3++) {
            classifyList[_i3].st = false;
        }
        hotType[0].st = true;
        for (var _i4 = 1, _j4 = hotType.length; _i4 < _j4; _i4++) {
            hotType[_i4].st = false;
        }
        collegeType[0].st = true;
        for (var _i5 = 1, _j5 = collegeType.length; _i5 < _j5; _i5++) {
            collegeType[_i5].st = false;
        }
        foreignType[0].st = true;
        for (var _i6 = 1, _j6 = foreignType.length; _i6 < _j6; _i6++) {
            foreignType[_i6].st = false;
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
        // if(!this.data.isVIP){
        //   wx.showToast({
        //     title: '开通VIP即可体验',
        //     icon:'none'
        //   })
        //   this.shaixuanClose();
        //   return;
        // }
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
        for (var _i7 = 1, _j7 = classifyList.length; _i7 < _j7; _i7++) {
            if (classifyList[_i7].st) {
                this.classify.push(classifyList[_i7].name);
            }
        }
        for (var _i8 = 1, _j8 = hotType.length; _i8 < _j8; _i8++) {
            if (hotType[_i8].st) {
                this.hotTypes.push(hotType[_i8].name);
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
                this.setData(_defineProperty({}, "firstCollegeList.showLoad", true));
                this.zPn = 1;
                this.getFirstCollege();
            }
        }
        this.oldsliderV1 = this.data.slider1Value;
        this.oldsliderV2 = this.data.slider2Value;
        this.shaixuanClose();
    },
    goZyTable: function goZyTable() {
        wx.navigateTo({
            url: "../zjPreview/zjPreview?prevPage=2"
        });
    },
    changeScore: function changeScore() {
        wx.navigateTo({
            url: "/pages/changeAchievement/changeAchievement?update=true&prevPage=2"
        });
    },
    goSearch: function goSearch() {
        console.log(this.data.batch);
        wx.navigateTo({
            url: "/pages/globalSearch/globalSearch?mode=sdReport&section=" + this.data.batch
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
                url: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + majorcode + "&cityid=843"
            });
        }
    },
    // 保存志愿表
    saveZyTable: function saveZyTable() {
        var listData = this.data.zyTableList;
        if (listData.length == 0) {
            wx.showToast({
                title: "请选择专业",
                icon: "none"
            });
            return;
        }
        wx.showLoading({
            title: "保存志愿表",
            mask: true
        });
        var score = this.data.score;
        for (var i = 0, j = listData.length; i < j; i++) {
            listData[i].number = i + 1;
        }
        listData.map(function(i) {
            i.planYear = i.year;
            i.collegeProvinceName = i.provinceName;
            i.chooseLevel = i.chooseCns;
            i.learnYear = i.learnYear.replace("年", "");
            i.cost = i.cost.replace("￥", "");
        });
        console.log(listData);
        var userId = wx.getStorageSync("userInfo")[0].UserId;
        var numId = 0;
        var data = {
            numId: numId,
            userNumId: userId,
            provinceNumId: 847,
            provinceName: "山东",
            isBen: true,
            totalScore: score.totalScore,
            scoreType: 1,
            ranking: score.rank,
            chooseLevel: score.chooseLevel,
            colleges: listData
        };
        _api2.default.SaveSdTable("Users/ZyTable/NewGaoKao/Save", "POST", data).then(function(res) {
            wx.hideLoading();
            wx.showModal({
                title: "保存成功",
                content: "是否查看志愿表",
                success: function success(res) {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: "../shanDongVolunteer/shanDongVolunteer?prevPage=2"
                        });
                    }
                }
            });
        });
    },
    // 数据说明
    // 申请会员卡弹框
    dataInfoPopup: function dataInfoPopup() {
        var that = this;
        _api2.default.getConfiguration("Configuration/ScoreLines/GetDescByProvince?provinceId=843", "POST").then(function(res) {
            that.setData({
                configuration: res.result.collegePlanDescription
            });
            that.selectComponent("#dataInfo")._showTap();
        });
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
        var _this4 = this;
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
            _this4.selectComponent("#topMenu").hideMenu();
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
        var list = [];
        if (this.data.currentTab == 1) {
            list = this.data.firstCollegeList;
            list.collegeList[index].majorOpen = open ? false : true;
            this.setData({
                firstCollegeList: list
            });
        } else if (this.data.currentTab == 2) {
            list = this.data.ZCollegeList;
            list.collegeList[index].majorOpen = open ? false : true;
            this.setData({
                ZCollegeList: list
            });
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
        var type = 0;
        if (this.data.currentTab == 0) {
            type = 1;
        } else if (this.data.currentTab == 1) {
            type = 0;
        }
        wx.navigateTo({
            url: "/packages/recommend/sdAddfilter/sdAddfilter?update=true&prevPage=2&type=" + type + "&section=" + this.data.batch
        });
    },
    // 填报
    tianbaoZY: function tianbaoZY(e) {
        var _this5 = this;
        var _e$currentTarget$data2 = e.currentTarget.dataset, collegeName = _e$currentTarget$data2.collegeName, item = _e$currentTarget$data2.item, colleges = _e$currentTarget$data2.colleges, majorcode = _e$currentTarget$data2.majorcode, collegecode = _e$currentTarget$data2.collegecode, ucode = _e$currentTarget$data2.ucode;
        var zyTableList = this.data.zyTableList;
        var list = void 0;
        var num = void 0;
        this.code1 = item.majorCode;
        this.code2 = item.professionCode;
        this.collegeCode = collegecode;
        this.uCode = ucode;
        if (parseInt(this.data.currentTab) == 0) {
            switch (this.data.CWBIndex) {
              case 0:
                list = this.data.CCollegeList.collegeList;
                num = this.data.CCollegeList.num;
                break;

              case 1:
                list = this.data.WCollegeList.collegeList;
                num = this.data.WCollegeList.num;
                break;

              case 2:
                list = this.data.BCollegeList.collegeList;
                num = this.data.BCollegeList.num;
                break;
            }
        } else if (parseInt(this.data.currentTab) == 1) {
            list = this.data.firstCollegeList.collegeList;
            num = this.data.firstCollegeList.num;
        } else if (parseInt(this.data.currentTab) == 2) {
            list = this.data.ZCollegeList.collegeList;
            num = this.data.ZCollegeList.num;
        }
        var result = zyTableList.some(function(ele) {
            if (ele.majorCode == item.majorCode && ele.professionCode == item.professionCode && ele.uCode == ucode && ele.collegeCode == collegecode) {
                return true;
            }
        });
        if (result) {
            //存在该专业
            zyTableList.map(function(ele, index) {
                if (ele.majorCode == item.majorCode && ele.professionCode == item.professionCode && ele.uCode == ucode && ele.collegeCode == collegecode) {
                    zyTableList.splice(index, 1);
                    num--;
                    _this5.changeisTianBao("oneClick");
                }
            });
        } else {
            if (zyTableList.length >= 200) {
                wx.showToast({
                    title: "选择专业已达上限(200个)",
                    icon: "none"
                });
            }
            if (this.data.currentTab == 0) {
                switch (this.data.CWBIndex) {
                  case 0:
                    item.dataType = "chong";
                    break;

                  case 1:
                    item.dataType = "shou";
                    break;

                  case 2:
                    item.dataType = "bao";
                    break;
                }
            } else if (this.data.currentTab == 1) {
                switch (item.recommendType) {
                  case 1:
                    item.dataType = "chong";
                    break;

                  case 2:
                    item.dataType = "shou";
                    break;

                  case 3:
                    item.dataType = "bao";
                    break;
                }
            } else if (this.data.currentTab == 2) {
                item.dataType = "cha";
            }
            item.belong = colleges.belong;
            item.classify = colleges.classify;
            item.collegeProvinceName = colleges.provinceName;
            item.collegeType = colleges.collegeType;
            item.levels = colleges.levels;
            item.rankOfCn = colleges.rankOfCn;
            zyTableList.push(item);
            num++;
            this.changeisTianBao("oneClick");
        }
        this.setData({
            // zyTableList,
            zyTableNum: zyTableList.length
        });
        if (this.data.currentTab == 1) {
            this.setData({
                "firstCollegeList.collegeList": list,
                "firstCollegeList.num": num
            });
        }
        if (this.data.currentTab == 2) {
            this.setData({
                "ZCollegeList.collegeList": list,
                "ZCollegeList.num": num
            });
        } else if (this.data.currentTab == 0) {
            switch (this.data.CWBIndex) {
              case 0:
                this.setData({
                    "CCollegeList.collegeList": list,
                    "CCollegeList.num": num
                });
                break;

              case 1:
                this.setData({
                    "WCollegeList.collegeList": list,
                    "WCollegeList.num": num
                });
                break;

              case 2:
                this.setData({
                    "BCollegeList.collegeList": list
                });
                break;
            }
        }
    },
    //重新遍历 列表中的填报flag
    changeisTianBao: function changeisTianBao(type) {
        var that = this;
        var res = void 0;
        var zyTableList = this.data.zyTableList;
        var collegeName = this.prevName;
        var listArr = [];
        var num = 0;
        if (this.data.currentTab == 2) {
            listArr = this.data.ZCollegeList;
        } else if (this.data.currentTab == 1) {
            listArr = this.data.firstCollegeList;
        } else {
            if (this.data.CWBIndex == 0) {
                listArr = this.data.CCollegeList;
            } else if (this.data.CWBIndex == 1) {
                listArr = this.data.WCollegeList;
            } else if (this.data.CWBIndex == 2) {
                listArr = this.data.BCollegeList;
            }
        }
        if (type == "oneClick") {
            if (this.data.currentTab == 1 || this.data.currentTab == 2) {
                listArr.collegeList.map(function(i) {
                    i.professions.map(function(j) {
                        if (j.majorCode == that.code1 && j.professionCode == that.code2 && i.uCode == that.uCode && that.collegeCode == i.collegeCode) {
                            j.st = !j.st;
                        }
                    });
                });
            } else {
                listArr.collegeList.map(function(ele) {
                    if (ele.majorCode == that.code1 && ele.professionCode == that.code2) {
                        ele.st = !ele.st;
                    }
                });
            }
        }
        if (type == "changeTab") {
            if (this.data.currentTab == 1 || this.data.currentTab == 2) {
                listArr.collegeList.map(function(i) {
                    i.professions.map(function(j) {
                        j.st = false;
                        zyTableList.map(function(m) {
                            if (j.majorCode === m.majorCode && j.professionCode == m.professionCode) {
                                j.st = true;
                                num++;
                            }
                        });
                    });
                });
            } else {
                listArr.collegeList.map(function(ele, index) {
                    ele.st = false;
                    zyTableList.map(function(el, idx) {
                        if (ele.majorCode === el.majorCode && ele.professionCode == el.professionCode) {
                            ele.st = true;
                            num++;
                        }
                    });
                });
            }
        }
        if (this.data.currentTab == 2) {
            this.setData({
                ZCollegeList: listArr,
                "ZCollegeList.num": num
            });
        } else if (this.data.currentTab == 1) {
            this.setData({
                firstCollegeList: listArr
            });
        } else if (this.data.currentTab == 0) {
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
            }
        }
    },
    swichNav: function swichNav(e) {
        if (e.currentTarget.dataset.current) {
            this.setData({
                currentTab: e.currentTarget.dataset.current
            });
            if (e.currentTarget.dataset.current == "1") {
                if (this.data.firstCollegeList.showLoad) {
                    this.getFirstCollege();
                }
            }
        } else {
            this.setData({
                currentTab: e.detail.current
            });
            if (e.detail.current == "1") {
                if (this.data.firstCollegeList.showLoad) {
                    this.getFirstCollege();
                }
            }
        }
        this.getSwiperH();
        this.changeisTianBao("changeTab");
    },
    //院校优先
    getFirstCollege: function getFirstCollege() {
        var _this6 = this;
        var zyTableList = this.data.zyTableList;
        var collegeType = -1;
        this.data.shaixuan.collegeType.map(function(i, idx) {
            if (i.st) {
                if (idx == 0) {
                    collegeType = -1;
                } else if (idx == 1) {
                    collegeType = 1;
                } else if (idx == 2) {
                    collegeType = 0;
                }
            }
        });
        var data = {
            provinceId: 843,
            totalScore: this.totalScore,
            rank: this.rank,
            chooseLevel: this.chooseLevel,
            provinceIds: this.provinceIds,
            classify: this.classify,
            keywords: this.data.keywords,
            uCodes: this.data.uCodes,
            collegeIds: [],
            levels: this.hotTypes,
            collegeType: collegeType,
            oriBacthNames: [],
            rankFrom: this.rankFrom,
            rankTo: this.rankTo,
            pageIndex: this.zPn,
            foreignType: this.foreignTypes,
            section: 0,
            pageSize: 10
        };
        this.setData(_defineProperty({}, "firstCollegeList.loadMore", true));
        _api2.default.DoNewGaoKaoCollegeFirst("TZY/Recommendation/DoNewGaoKaoCollegeFirst", "POST", data).then(function(res) {
            var _this6$setData2;
            if (res.result.colleges.length < 10) {
                _this6.setData(_defineProperty({}, "firstCollegeList.loadMore", false));
            }
            res.result.colleges.map(function(i) {
                i.majorOpen = false;
                i.professions.map(function(j) {
                    j.st = false;
                    zyTableList.map(function(m) {
                        if (j.majorCode == m.majorCode && j.collegeId == m.collegeId) {
                            i.st = true;
                        }
                    });
                });
            });
            var list = wx.getStorageSync("userScore").chooseSubjects;
            var chooseSubjects = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;
            try {
                for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var l = _step2.value;
                    chooseSubjects.push(l.substring(0, 1));
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
            var newArr = [];
            res.result.colleges.map(function(i) {
                i.professions.map(function(j) {
                    j.learnYear = j.learnYear + "年";
                    j.cost = "￥" + j.cost;
                    if (j && j.chooseSubjects == "且") {
                        if (j.chooseCns.length > 1) {
                            newArr = j.chooseCns.split("+");
                            chooseSubjects.map(function(c) {
                                newArr.map(function(n) {
                                    if (n == c) {
                                        j.chooseCns = j.chooseCns.replace(c, '<span style="color:black">' + c + "</span>");
                                    }
                                });
                            });
                        } else if (j.chooseCns.length == 1) {
                            newArr = [ j.chooseCns ];
                            chooseSubjects.map(function(c) {
                                newArr.map(function(n) {
                                    if (n == c) {
                                        j.chooseCns = j.chooseCns.replace(c, '<span style="color:black">' + c + "</span>");
                                    }
                                });
                            });
                        }
                    } else {
                        if (j.chooseCns.length > 1) {
                            newArr = j.chooseCns.split("/");
                            chooseSubjects.map(function(c) {
                                newArr.map(function(n) {
                                    if (n == c) {
                                        j.chooseCns = j.chooseCns.replace(c, '<span style="color:black">' + c + "</span>");
                                    }
                                });
                            });
                        } else if (j.chooseCns.length == 1) {
                            newArr = [ j.chooseCns ];
                            chooseSubjects.map(function(c) {
                                newArr.map(function(n) {
                                    if (n == c) {
                                        j.chooseCns = j.chooseCns.replace(c, '<span style="color:black">' + c + "</span>");
                                    }
                                });
                            });
                        }
                    }
                });
            });
            _this6.setData((_this6$setData2 = {}, _defineProperty(_this6$setData2, "firstCollegeList.showLoad", false), 
            _defineProperty(_this6$setData2, "collegeNum", res.result.totalOfRecommendedColleges), 
            _defineProperty(_this6$setData2, "firstCollegeList.collegeList", _this6.zPn == 1 ? res.result.colleges : [].concat(_toConsumableArray(_this6.data.firstCollegeList.collegeList), _toConsumableArray(res.result.colleges))), 
            _this6$setData2), function() {
                _this6.changeisTianBao("changeTab");
            });
        });
    },
    // 专业弹框
    showMajorDetail: function showMajorDetail(e) {
        var majorCode = e.currentTarget.dataset.majorcode;
        if (majorCode.length == 4) {
            var smallMajorList = this.data.smallMajorList;
            if (smallMajorList && smallMajorList.middleMajor.code == majorCode) {
                this.selectComponent("#middleDetail").showFrame();
            } else {
                this.getMajorDetail(majorCode);
            }
        } else if (majorCode.length == 6) {
            var majorDetail = this.data.majorDetail;
            if (majorDetail && majorCode == majorDetail.code) {
                this.selectComponent("#majorDetail").showFrame();
            } else {
                this.getDetail(majorCode);
            }
        }
    },
    showSmallDetail: function showSmallDetail(e) {
        this.selectComponent("#middleDetail").hideFrame();
        var majorCode = e.currentTarget.dataset.majorcode;
        var majorDetail = this.data.majorDetail;
        if (majorDetail && majorCode == majorDetail.code) {
            this.selectComponent("#majorDetail").showFrame();
        } else {
            this.getDetail(majorCode);
        }
    },
    //小类详情
    getDetail: function getDetail(code) {
        var _this7 = this;
        this.setData({
            smallDetailLoad: true
        });
        this.selectComponent("#majorDetail").showFrame();
        _api2.default.getMajorDetail("Majors/GetByCode", "POST", code).then(function(res) {
            _this7.setData({
                majorDetail: res.result,
                smallDetailLoad: false
            });
        });
    },
    //大类详情
    getMajorDetail: function getMajorDetail(code) {
        var _this8 = this;
        this.setData({
            middleDetailLoad: true
        });
        this.selectComponent("#middleDetail").showFrame();
        _api2.default.GetMiddleMajors("Majors/GetMiddleDetail", "POST", 843, code).then(function(res) {
            var middleMajor = res.result.middleMajor;
            var smallMajorList = {
                middleMajor: {
                    name: middleMajor.name,
                    code: middleMajor.code
                },
                smallMajorList: res.result.smallMajors
            };
            _this8.setData({
                smallMajorList: smallMajorList,
                middleDetailLoad: false
            });
        });
    },
    // 专业详情
    majorDetail: function majorDetail(e) {
        var majorcode = e.currentTarget.dataset.code;
        wx.navigateTo({
            url: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + majorcode + "&cityid=843"
        });
    }
}, _defineProperty(_Page, "showSmallDetail", function showSmallDetail(e) {
    this.selectComponent("#middleDetail").hideFrame();
    var majorCode = e.currentTarget.dataset.majorcode;
    var majorDetail = this.data.majorDetail;
    if (majorDetail && majorCode == majorDetail.code) {
        this.selectComponent("#majorDetail").showFrame();
    } else {
        this.getDetail(majorCode);
    }
}), _defineProperty(_Page, "showScorePlan", function showScorePlan(e) {
    this.selectComponent("#showScorePlan").showFrame();
    var _e$currentTarget$data3 = e.currentTarget.dataset, index = _e$currentTarget$data3.index, majorindex = _e$currentTarget$data3.majorindex;
    var item = void 0;
    var CWBIndex = this.data.CWBIndex;
    if (this.data.currentTab == 0) {
        switch (CWBIndex) {
          case 0:
            item = this.data.CCollegeList.collegeList[index];
            break;

          case 1:
            item = this.data.WCollegeList.collegeList[index];
            break;

          case 2:
            item = this.data.BCollegeList.collegeList[index];
            break;
        }
    } else if (this.data.currentTab == 1) {
        item = this.data.firstCollegeList.collegeList[index].professions[majorindex];
    } else {
        item = this.data.ZCollegeList.collegeList[index].professions[majorindex];
    }
    if (typeof item.enterHis == "string") {
        item.enterHis = JSON.parse(item.enterHis);
    }
    this.setData({
        item: item
    });
}), _Page));

function scalarArrayEquals(array1, array2) {
    return array1.length == array2.length && array1.every(function(v, i) {
        return v === array2[i];
    });
}