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

Page({
    data: {
        score: null,
        collegeList: null,
        CWBIndex: 0,
        scrollH: 0,
        collegeDetail: {
            showLoad: true,
            detail: null
        },
        zyTableNum: 0,
        currentNum: 0,
        smallDetailLoad: true,
        middleDetailLoad: true
    },
    onLoad: function onLoad(options) {
        this.index = options.index;
        this.init();
        this.getSwiperH();
    },
    init: function init() {
        var index = this.index;
        var pages = getCurrentPages();
        this.prevPage = pages[pages.length - 2];
        //上一个页面
                var data = this.prevPage.data;
        //取上页data里的数据也可以修改
                this.chooseLevel = this.prevPage.chooseLevel;
        var CWBIndex = data.CWBIndex;
        switch (CWBIndex) {
          case 0:
            this.collegeList = data.CCollegeList;
            this.currentNum = data.CCollegeList.num;
            this.CWB = "CCollegeList";
            break;

          case 1:
            this.collegeList = data.WCollegeList;
            this.currentNum = data.WCollegeList.num;
            this.CWB = "WCollegeList";
            break;

          case 2:
            this.collegeList = data.BCollegeList;
            this.currentNum = data.BCollegeList.num;
            this.CWB = "BCollegeList";
            break;

          case 3:
            this.collegeList = data.ZCollegeList;
            this.currentNum = data.ZCollegeList.num;
            this.CWB = "ZCollegeList";
            break;
        }
        var score = data.score;
        var zyTableNum = data.zyTableNum;
        var professions = this.collegeList.collegeList[index].professions;
        for (var i = 0, j = professions.length; i < j; i++) {
            if (typeof professions[i].enterHis == "string") {
                professions[i].enterHis = JSON.parse(professions[i].enterHis);
            }
        }
        this.setData({
            score: score,
            collegeList: this.collegeList.collegeList[index],
            CWBIndex: CWBIndex,
            zyTableNum: zyTableNum,
            currentNum: this.currentNum
        });
    },
    // 计算swiper and scroll高度
    getSwiperH: function getSwiperH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.selectAll(".filter").boundingClientRect();
        item.exec(function(res) {
            var header = res[0][0].height;
            var footer = res[0][1].height;
            var pageH = app.globalData.systemInfo.screenHeight - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight;
            that.setData({
                scrollH: pageH - header - footer
            });
        });
    },
    // showCollegeDetail(e) {
    //   this.selectComponent("#framedirect").showFrame();
    //   let collegeId = e.currentTarget.dataset.collegeid;
    //   let collegeCode = e.currentTarget.dataset.collegecode;
    //   if (this.data.collegeDetail.showLoad) {
    //     this.getCollegeDetail(collegeId, collegeCode);
    //   }
    // },
    // // 单个院校详情弹框
    // getCollegeDetail(collegeId, collegeCode) {
    //   const that = this;
    //   that.setData({
    //     'collegeDetail.showLoad': true
    //   });
    //   let data = {
    //     'chooseLevel': that.chooseLevel,
    //     'provinceId': 843,
    //     'collegeId': collegeId,
    //     'collegeCode': collegeCode,
    //     'isBen': true
    //   };
    //   let collegeList = that.data.collegeList;
    //   api.QueryNewGaoKaoCollegeProfessionPlans('ScoreLines/NewGaoKao/V2/QueryNewGaoKaoCollegeProfessionPlans', 'POST', data).then(res => {
    //     let professions = res.result.professions;
    //     let majorList = [];
    //     for (let i = 0, j = professions.length; i < j; i++) {
    //       majorList.push({
    //         "professionName": professions[i].professionName,
    //         "chooseCns": professions[i].chooseCns.replace(/\s+/g, ""),
    //         "planNum": (professions[i].planNum1 == 0 ? '-' : professions[i].planNum1) + '/' + (professions[i].planNum2 == 0 ? '-' : professions[i].planNum2) + '/' + (professions[i].planNum3 == 0 ? '-' : professions[i].planNum3),
    //         "learnYear": professions[i].learnYear == 0 || professions[i].learnYear == '' ? '-' : professions[i].learnYear,
    //         "cost": professions[i].cost == 0 || professions[i].cost == '' ? '-' : professions[i].cost,
    //         "isFit": professions[i].isFit,
    //         "majorCode": professions[i].majorCode
    //       })
    //     }
    //     let collegeDetail = {
    //       collegeId: collegeList.collegeId,
    //       collegeName: collegeList.collegeName,
    //       levels: collegeList.levels,
    //       collegeCode: collegeList.collegeCode,
    //       classify: collegeList.classify,
    //       provinceName: collegeList.provinceName,
    //       collegeType: collegeList.collegeType,
    //       planYear: collegeList.planYear,
    //       professions: majorList
    //     };
    //     that.setData({
    //       'collegeDetail.detail': collegeDetail,
    //       'collegeDetail.showLoad': false
    //     })
    //   })
    // },
    // 专业详情
    majorDetail: function majorDetail(e) {
        var majorcode = this.data.majorDetail.code;
        wx.navigateTo({
            url: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + majorcode + "&cityid=843"
        });
    },
    goCollegeDetail: function goCollegeDetail() {
        wx.navigateTo({
            url: "/packages/findUniversity/collegeDetail/collegeDetail?numId=" + this.data.collegeDetail.detail.collegeId
        });
        // this.hideCollegeDetail();
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
        var _this = this;
        this.setData({
            smallDetailLoad: true
        });
        this.selectComponent("#majorDetail").showFrame();
        _api2.default.getMajorDetail("Majors/GetByCode", "POST", code).then(function(res) {
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
        _api2.default.GetMiddleMajors("Majors/GetMiddleDetail", "POST", 843, code).then(function(res) {
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
    // 填报
    fillOut: function fillOut(e) {
        var that = this;
        if (this.prevPage.data.zyTableNum >= 120) {
            wx.showToast({
                title: "最多可选120个志愿",
                icon: "none"
            });
            return;
        }
        var CWBindex = this.index;
        var index = e.currentTarget.dataset.index;
        var collegeList = that.data.collegeList;
        var st = collegeList.professions[index].st ? !collegeList.professions[index].st : true;
        if (st) {
            that.addZy(index);
            that.setData({
                zyTableNum: ++that.data.zyTableNum,
                currentNum: ++that.data.currentNum
            }, function() {
                that.prevPage.setData(_defineProperty({
                    zyTableNum: that.data.zyTableNum
                }, that.CWB + ".num", that.data.currentNum));
            });
        } else {
            that.removeZy(index);
            that.setData({
                zyTableNum: --that.data.zyTableNum,
                currentNum: --that.data.currentNum
            }, function() {
                that.prevPage.setData(_defineProperty({
                    zyTableNum: that.data.zyTableNum
                }, that.CWB + ".num", that.data.currentNum));
            });
        }
        that.setData(_defineProperty({}, "collegeList.professions[" + index + "].st", st));
        that.prevPage.setData(_defineProperty({}, that.CWB + ".collegeList[" + CWBindex + "]", that.data.collegeList));
    },
    // 添加专业志愿
    addZy: function addZy(index) {
        var collegeList = this.data.collegeList;
        var professions = this.data.collegeList.professions[index];
        var CWBIndex = this.data.CWBIndex;
        var college = {
            number: 0,
            collegeId: professions.collegeId,
            collegeName: professions.collegeName,
            collegePlanNum: collegeList.planNum,
            collegeCode: professions.collegeCode,
            uCode: professions.uCode,
            professionName: professions.professionName,
            professionCode: professions.professionCode,
            majorCode: professions.majorCode,
            chooseLevel: (professions.noLimit ? professions.noLimit : 0) + "," + professions.physics + "," + professions.chemistry + "," + professions.biology + "," + professions.politics + "," + professions.history + "," + professions.geography + "," + professions.technology,
            estimatedRanking: professions.estimatedRanking,
            batchName: professions.batchName,
            learnYear: professions.learnYear,
            cost: professions.cost,
            rankingLY: "",
            dataType: CWBIndex == 0 ? "chong" : CWBIndex == 1 ? "shou" : CWBIndex == 2 ? "bao" : "cha",
            minSort: professions.minSort,
            planNum: professions.planNum,
            rankOfCn: collegeList.rankOfCn,
            provinceName: collegeList.provinceName,
            year: professions.year,
            minScore: 0,
            collegeType: collegeList.collegeType,
            classify: collegeList.classify,
            belong: collegeList.belong,
            levels: collegeList.levels,
            chooseCns: professions.chooseCns,
            plan: (professions.planNum1 == 0 ? "-" : professions.planNum1) + "/" + (professions.planNum2 == 0 ? "-" : professions.planNum2) + "/" + (professions.planNum3 == 0 ? "-" : professions.planNum3),
            collegePlanYear: collegeList.planYear,
            collegePlan: (collegeList.planNum1 == 0 ? "-" : collegeList.planNum1) + "/" + (collegeList.planNum2 == 0 ? "-" : collegeList.planNum2) + "/" + (collegeList.planNum3 == 0 ? "-" : collegeList.planNum3),
            enterHis: professions.enterHis,
            historyStartYear: professions.historyStartYear
        };
        this.prevPage.setData({
            zyTableList: this.prevPage.data.zyTableList.concat(college)
        });
    },
    // 删除专业
    removeZy: function removeZy(index) {
        var professions = this.data.collegeList.professions[index];
        var majorCode = professions.majorCode;
        var collegeId = professions.collegeId;
        var zyTableList = this.prevPage.data.zyTableList;
        for (var i = 0, j = zyTableList.length; i < j; i++) {
            if (majorCode == zyTableList[i].majorCode && collegeId == zyTableList[i].collegeId) {
                zyTableList.splice(i, 1);
                break;
            }
        }
        this.prevPage.setData({
            zyTableList: zyTableList
        });
    },
    goZyTable: function goZyTable() {
        wx.navigateTo({
            url: "../zhejiangVolunteer/zhejiangVolunteer?prevPage=3"
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
    }
});