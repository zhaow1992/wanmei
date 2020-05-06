var _api = require("../../../utils/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var app = getApp();

var api = require("../api.js");

var sensors = require("../../../utils/sensors.js");

var listData = [];

Page({
    data: {
        share: false,
        collegePlan: true,
        showLoad: true,
        score: null,
        listData: [],
        size: 4,
        isIphoneX: false,
        // scrollH: 0,
        saveBtnFlag: false,
        smallDetailLoad: true,
        middleDetailLoad: true,
        shaixuan: {
            flag: false,
            num: 0,
            animate: "",
            all: [ {
                st: true,
                name: "全部"
            } ],
            classifyList: [ {
                name: "冲",
                st: false
            }, {
                name: "稳",
                st: false
            }, {
                name: "保",
                st: false
            }, {
                name: "自选",
                st: false
            } ]
        },
        HInfo: {
            swiperH: 0,
            scrollH: 0,
            shaixuanH: 0,
            navH: 0
        },
        navigationText: "预览志愿表",
        tableId: ""
    },
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        if (that.options && that.options.numId) {
            return {
                title: "我在完美志愿模拟的志愿表，你也来试试！",
                imageUrl: "http://bapp.wmei.cn/share/zyb.png",
                path: "/packages/recommend/zhejiangVolunteer/zhejiangVolunteer?numId=" + that.options.numId + "&share=true"
            };
        } else {}
    },
    // 计算swiper and scroll高度
    getSwiperH: function getSwiperH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.selectAll("#head").boundingClientRect();
        item.exec(function(res) {
            var header = res[0].height;
            var advice = res[0].height;
            var footer = res[0].height;
            var pageH = app.globalData.systemInfo.screenHeight - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight;
            that.setData({
                "HInfo.swiperH": pageH - header,
                "HInfo.scrollH": pageH - header - advice - footer,
                "HInfo.shaixuanH": pageH,
                "HInfo.navH": app.globalData.navigationCustomCapsuleHeight + app.globalData.navigationCustomStatusHeight
            });
        });
    },
    change: function change(e) {
        this.setData({
            listData: e.detail.listData,
            saveBtnFlag: true
        });
    },
    sizeChange: function sizeChange(e) {
        this.setData({
            size: e.detail.value
        });
    },
    itemClick: function itemClick(e) {
        var majorCode = e.detail.code;
        this.setData({
            itemData: e.detail.data,
            majorCode: majorCode
        });
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
    goMajorDetail: function goMajorDetail(e) {
        this.selectComponent("#majorToast").hideFrame();
        var code = e.currentTarget.dataset.majorcode;
        this.setData({
            majorCode: code
        });
        this.getDetail(code);
    },
    //小类详情
    getDetail: function getDetail(code) {
        var _this = this;
        this.setData({
            smallDetailLoad: true
        });
        this.selectComponent("#majorDetail").showFrame();
        api.getMajorDetail("Majors/GetByCode", "POST", code).then(function(res) {
            _this.setData({
                majorDetail: res.result,
                smallDetailLoad: false
            });
        });
    },
    //大类详情
    getMajorDetail: function getMajorDetail(code) {
        var _this2 = this;
        this.setData({
            middleDetailLoad: true
        });
        this.selectComponent("#middleDetail").showFrame();
        api.GetMiddleMajors("Majors/GetMiddleDetail", "POST", 843, code).then(function(res) {
            var middleMajor = res.result.middleMajor;
            var smallMajorList = {
                middleMajor: {
                    name: middleMajor.name,
                    code: middleMajor.code
                },
                smallMajorList: res.result.smallMajors
            };
            _this2.setData({
                smallMajorList: smallMajorList,
                middleDetailLoad: false
            });
        });
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
    // 专业详情
    majorDetail: function majorDetail(e) {
        var majorcode = this.data.majorDetail.code;
        wx.navigateTo({
            url: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + majorcode + "&cityid=843"
        });
    },
    toggleFixed: function toggleFixed(e) {
        var key = e.currentTarget.dataset.key;
        var listData = this.data.listData;
        listData[key].fixed = !listData[key].fixed;
        this.setData({
            listData: listData
        });
        // this.drag.dataChange();
        },
    onLoad: function onLoad(options) {
        this.options = options;
        this.drag = this.selectComponent("#drag");
        this.setData({
            navigationText: "志愿表" + (options.title ? options.title : "")
        });
        this.getSwiperH();
        //各种高度
        // listData.map(item=>{
        //   item.college = item.college.length>5?item.college.substring(0,5)+"...":item.college
        //   return item;
        // })
                if (options && options.numId) {
            if (options.share) {
                this.setData({
                    share: true
                });
            }
            this.getZyTable();
            this.setData({
                collegePlan: false,
                tableId: options.numId
            });
        } else {
            wx.hideShareMenu();
            this.init();
            this.setData({
                showLoad: false
            });
        }
    },
    getRank: function getRank(totalScore) {
        var _this3 = this;
        var data = {
            cityId: 843,
            score: totalScore
        };
        _api2.default.getRank("ScoreLines/YFYD/GetByScore", "POST", data).then(function(res) {
            _this3.setData({
                rank: res.result.lowestRank
            });
        });
    },
    getZyTable: function getZyTable() {
        var _this4 = this;
        var that = this;
        api.getZJZyTable("Users/ZyTable/ZheJiang/Get?zyTableNumId=" + this.options.numId, "POST", this.options.numId).then(function(res) {
            var score = {
                totalScore: res.result.zyTable.totalScore,
                rank: res.result.zyTable.ranking,
                chooseLevel: res.result.zyTable.chooseLevel.split(",").join("/").replace("物理", "物").replace("化学", "化").replace("生物", "生").replace("技术", "技").replace("历史", "史").replace("地理", "地").replace("政治", "政")
            };
            _this4.getRank(res.result.zyTable.totalScore);
            that.zyTableNumId = res.result.zyTable.id;
            res.result.colleges.map(function(i) {
                i.st = false;
                i.chooseCns = that.changeSub(i.chooseLevel);
                i.chooseLevelNum = i.chooseLevel;
                i.chooseLevel = i.chooseLevel.includes("span") ? i.chooseLevel : that.changeSub(i.chooseLevel);
                if (i.learnYear.indexOf("年") == -1) {
                    i.learnYear = i.learnYear + "年";
                }
                if (i.cost.indexOf("￥") == -1) {
                    i.cost = "￥" + i.cost;
                }
            });
            var list = res.result.zyTable.chooseLevel.split(",");
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
            res.result.colleges.map(function(j) {
                if (j && j.chooseSubjects == "且") {
                    if (j.chooseLevel.length > 1) {
                        newArr = j.chooseLevel.split("+");
                        chooseSubjects.map(function(c) {
                            newArr.map(function(n) {
                                if (n == c) {
                                    j.chooseLevel = j.chooseLevel.replace(c, '<span style="color:black">' + c + "</span>");
                                }
                            });
                        });
                    } else if (j.chooseLevel.length == 1) {
                        newArr = [ j.chooseLevel ];
                        chooseSubjects.map(function(c) {
                            newArr.map(function(n) {
                                if (n == c) {
                                    j.chooseLevel = j.chooseLevel.replace(c, '<span style="color:black">' + c + "</span>");
                                }
                            });
                        });
                    }
                } else {
                    if (j.chooseLevel.length > 1) {
                        newArr = j.chooseLevel.split("/");
                        chooseSubjects.map(function(c) {
                            newArr.map(function(n) {
                                if (n == c) {
                                    j.chooseLevel = j.chooseLevel.replace(c, '<span style="color:black">' + c + "</span>");
                                }
                            });
                        });
                    } else if (j.chooseLevel.length == 1) {
                        newArr = [ j.chooseCns ];
                        chooseSubjects.map(function(c) {
                            newArr.map(function(n) {
                                if (n == c) {
                                    j.chooseLevel = j.chooseLevel.replace(c, '<span style="color:black">' + c + "</span>");
                                }
                            });
                        });
                    }
                }
            });
            if (res.isSuccess) {
                that.setData({
                    listData: res.result.colleges,
                    score: score
                });
                that.drag.dataChange();
            }
            that.setData({
                showLoad: false
            });
            var zyTable = res.result.zyTable;
            var major_num = res.result.colleges.length;
            var data = {
                sheets_num: zyTable.num,
                //志愿表编号
                sheets_type: zyTable.scoreType == 1 ? "平时志愿表" : "高考志愿表",
                //志愿表类型
                sheets_source: "模拟填报",
                //志愿表来源
                data_province: zyTable.provinceName,
                //所属省份
                data_batch: "",
                //所属批次
                score_value: zyTable.totalScore,
                //分数
                score_rank: zyTable.ranking,
                //位次
                data_subject: "不限",
                //所属科类
                reliance_rate: "",
                //志愿靠谱率
                colg_num: res.result.colleges.length,
                //院校填报个数
                major_num: major_num
            };
            app.sensors.track("SheetsView", sensors.SheetsView(data));
        });
    },
    changeSub: function changeSub(chooseLevel) {
        chooseLevel = chooseLevel.split(",");
        var chooseCns = [];
        if (chooseLevel[0] == 1) {
            chooseCns.push("不限");
        }
        if (chooseLevel[1] == 1) {
            chooseCns.push("物");
        }
        if (chooseLevel[2] == 1) {
            chooseCns.push("化");
        }
        if (chooseLevel[3] == 1) {
            chooseCns.push("生");
        }
        if (chooseLevel[4] == 1) {
            chooseCns.push("政");
        }
        if (chooseLevel[5] == 1) {
            chooseCns.push("史");
        }
        if (chooseLevel[6] == 1) {
            chooseCns.push("地");
        }
        if (chooseLevel[7] == 1) {
            chooseCns.push("技");
        }
        return chooseCns.join("/");
    },
    // 初始化
    init: function init() {
        var pages = getCurrentPages();
        this.prevPage = pages[pages.length - parseInt(this.options.prevPage)];
        //上一个页面
                var data = this.prevPage.data;
        //取上页data里的数据也可以修改
                var rank = data.rank;
        data.zyTableList.map(function(i) {
            i.st = false;
        });
        this.setData({
            listData: data.zyTableList,
            score: data.score,
            rank: rank
        });
        this.drag.dataChange();
    },
    // 计算dom高度
    // getScrollH() {
    //   const that = this;
    //   let item = wx.createSelectorQuery();
    //   item.select('#head').boundingClientRect();
    //   item.exec(res => {
    //     that.setData({ scrollH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight - 8 })
    //   })
    // },
    // 保存志愿表
    saveZyTable: function saveZyTable() {
        var that = this;
        wx.showLoading({
            title: "保存志愿表",
            mask: true
        });
        var listData = this.data.listData;
        var score = this.data.score;
        for (var i = 0, j = listData.length; i < j; i++) {
            listData[i].number = i + 1;
        }
        var userId = wx.getStorageSync("userInfo")[0].UserId;
        var numId = 0;
        if (that.options && that.options.numId) {
            numId = that.options.numId;
        }
        // else{
        //   numId = this.prevPage.data.zyTableId;
        // }
                listData.map(function(i) {
            i.planYear = i.year;
            i.collegeType = i.collegeType == 0 ? "私立" : "公立";
            i.chooseLevel = i.chooseLevelNum;
            i.provinceName = i.dataJson.provinceName;
            i.learnYear = i.learnYear.replace("年", "");
            i.cost = i.cost.replace("￥", "");
            i.firstRecruit = 0;
        });
        var data = {
            userNumId: userId,
            provinceNumId: 843,
            provinceName: "浙江",
            isBen: true,
            totalScore: score.totalScore,
            scoreType: 1,
            ranking: this.data.rank,
            chooseLevel: wx.getStorageSync("userScore").chooseSubjects.join(","),
            colleges: listData
        };
        if (numId != 0) {
            data["numId"] = numId;
        }
        api.SaveZyTable("App/ZyTable/ZheJiang/Save", "POST", data).then(function(res) {
            // that.prevPage.update = true;
            wx.setStorageSync("clearZyTable", true);
            // that.prevPage.setData({ zyTableId: res.result.value});
                        wx.showToast({
                title: "保存成功",
                icon: "none"
            });
            that.setData({
                saveBtnFlag: false
            });
            wx.hideLoading();
        });
    },
    onUnload: function onUnload() {
        if (this.options && this.options.numId) {} else {
            this.prevPage.setData({
                zyTableList: this.data.listData
            });
        }
    },
    // 筛选
    shaixuan: function shaixuan() {
        this.setData({
            "shaixuan.flag": true,
            "shaixuan.animate": "shaixuan-animate"
        });
    },
    shaixuanClose: function shaixuanClose() {
        var _this5 = this;
        this.setData({
            "shaixuan.animate": "shaixuan-animate-out"
        });
        setTimeout(function() {
            _this5.setData({
                "shaixuan.flag": false
            });
        }, 200);
    },
    all: function all() {
        this.setData({
            shaixuan: {
                flag: true,
                animate: "shaixuan-animate",
                all: [ {
                    st: true,
                    name: "全部"
                } ],
                classifyList: [ {
                    name: "冲",
                    st: false
                }, {
                    name: "稳",
                    st: false
                }, {
                    name: "保",
                    st: false
                }, {
                    name: "自选",
                    st: false
                } ]
            }
        });
    },
    classifyArr: function classifyArr(e) {
        var index = e.currentTarget.dataset.index;
        var arr = this.data.shaixuan.classifyList;
        arr[index].st = !arr[index].st;
        var count = 0;
        arr.map(function(i) {
            if (i.st) count++;
        });
        if (count > 0) {
            this.setData({
                "shaixuan.all": [ {
                    st: false,
                    name: "全部"
                } ]
            });
        } else {
            this.setData({
                "shaixuan.all": [ {
                    st: true,
                    name: "全部"
                } ]
            });
        }
        this.setData({
            "shaixuan.classifyList": arr
        });
    },
    queren: function queren() {
        if (this.data.shaixuan.all[0].st) {
            // this.selectComponent("#drag").screen(this.data.listData,true);
            this.shaixuanClose();
        } else {
            var classList = [];
            this.data.shaixuan.classifyList.map(function(ele, i) {
                if (ele.st) {
                    classList.push(i + 1);
                }
            });
            var arr = this.data.listData;
            var newList = [];
            arr.map(function(i) {
                classList.map(function(j) {
                    if (parseInt(i.dataType) == j) {
                        newList.push(i);
                    }
                });
            });
            this.selectComponent("#drag").screen(newList, false);
            this.shaixuanClose();
        }
    },
    chongzhi: function chongzhi() {
        this.setData({
            shaixuan: {
                flag: true,
                animate: "shaixuan-animate",
                all: [ {
                    st: true,
                    name: "全部"
                } ],
                classifyList: [ {
                    name: "冲",
                    st: false
                }, {
                    name: "稳",
                    st: false
                }, {
                    name: "保",
                    st: false
                }, {
                    name: "自选",
                    st: false
                } ]
            }
        });
    },
    showCollegeDetail: function showCollegeDetail(e) {
        this.selectComponent("#framedirect").showFrame();
        var _e$detail = e.detail, collegeid = _e$detail.collegeid, collegecode = _e$detail.collegecode, isben = _e$detail.isben, index = _e$detail.index;
        this.getCollegeDetail(collegeid, collegecode, isben, index);
    },
    // 单个院校详情弹框
    getCollegeDetail: function getCollegeDetail(collegeId, collegeCode, isBen, index) {
        var that = this;
        that.setData({
            "collegeDetail.showLoad": true
        });
        var data = {
            chooseLevel: wx.getStorageSync("userScore").chooseSubjects,
            provinceId: 843,
            collegeId: collegeId,
            collegeCode: collegeCode,
            isBen: isBen
        };
        var collegeList = this.data.listData[index];
        api.QueryNewGaoKaoCollegeProfessionPlans("ScoreLines/NewGaoKao/V2/QueryNewGaoKaoCollegeProfessionPlans", "POST", data).then(function(res) {
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
                provinceName: res.result.provinceName,
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
    dataInfoPopup: function dataInfoPopup() {
        var that = this;
        api.getConfiguration("Configuration/ScoreLines/GetDescByProvince?provinceId=843", "POST").then(function(res) {
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
    goCollegeDetail: function goCollegeDetail() {
        wx.navigateTo({
            url: "/packages/findUniversity/collegeDetail/collegeDetail?numId=" + this.data.collegeDetail.detail.collegeId
        });
    },
    showScorePlan: function showScorePlan(e) {
        this.selectComponent("#showScorePlan").showFrame();
        var index = e.detail.index;
        var item = this.data.listData[index];
        if (typeof item.enterHis == "string") {
            item.enterHis = JSON.parse(item.enterHis);
        }
        this.setData({
            item: item
        });
    },
    toMajorDetail: function toMajorDetail(e) {
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
    }
});