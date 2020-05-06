var api = require("../../utils/api.js");

var wxCharts = require("../../utils/wxcharts-min.js");

var sensors = require("../../utils/sensors.js");

var app = getApp();

Page({
    data: {
        cityId: 0,
        share: false,
        majorDetail: [],
        majorLoad: true,
        collegeDetail: [],
        collegeLoad: true,
        userScore: [],
        tableList: [],
        morenTableList: [],
        morenPai: true,
        fenPai: false,
        collegePai: false,
        showLoad: true
    },
    move: function move() {
        return;
    },
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        var data = {
            SA_share_type: "志愿表报告",
            SA_share_content: "我在完美志愿模拟的志愿表，你也来试试！"
        };
        app.sensors.track("ShareClick", sensors.ShareClick(data));
        if (res.from === "button") {}
        return {
            title: "我在完美志愿模拟的志愿表，你也来试试！",
            imageUrl: "http://bapp.wmei.cn/share/zyb.png",
            path: "/pages/ZYTableCommonDetail/ZYTableCommonDetail?id=" + that.data.tableList.numId + "&share=true"
        };
    },
    //去修改志愿表
    update: function update() {
        wx.setStorageSync("changeZyInfo", this.data.tableList);
        wx.redirectTo({
            url: "/packages/recommend/jiangsuRecommend/jiangsuRecommend?type=update&numId=" + this.data.tableList.numId
        });
    },
    onLoad: function onLoad(options) {
        if (options && options.share) {
            this.setData({
                share: true
            });
        }
        var id = options.id;
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll("靠谱率", true);
        api.getZyTable("App/ZyTable/Get?zyTableNumId=" + id, "POST").then(function(res) {
            if (res.isSuccess) {
                that.selectComponent("#navigationcustom").setNavigationAll("靠谱率 " + res.result.reliableRate + "%", true);
                for (var i = 0; i < res.result.colleges.length; i++) {
                    res.result.colleges[i].ji = app.zimu(i);
                }
                that.setData({
                    tableList: res.result,
                    morenTableList: res.result,
                    showLoad: false,
                    cityId: res.result.provinceNumId
                });
                var zyTable = res.result;
                var major_num = 0;
                for (var _i = 0, j = res.result.colleges.length; _i < j; _i++) {
                    for (var m = 0, n = res.result.colleges[_i].professions.length; m < n; m++) {
                        ++major_num;
                    }
                }
                var data = {
                    sheets_num: zyTable.numId,
                    //志愿表编号
                    sheets_type: zyTable.scoreType == 1 ? "平时志愿表" : "高考志愿表",
                    //志愿表类型
                    sheets_source: "模拟填报",
                    //志愿表来源
                    data_province: zyTable.provinceName,
                    //所属省份
                    data_batch: zyTable.batchName,
                    //所属批次
                    score_value: zyTable.totalScore,
                    //分数
                    score_rank: zyTable.ranking,
                    //位次
                    data_subject: parseInt(zyTable.courseType) == 0 ? "理科" : "文科",
                    //所属科类
                    reliance_rate: zyTable.reliableRate,
                    //志愿靠谱率
                    colg_num: res.result.colleges.length,
                    //院校填报个数
                    major_num: major_num
                };
                app.sensors.track("SheetsView", sensors.SheetsView(data));
            } else {
                wx.showToast({
                    title: res.message,
                    icon: "none"
                });
            }
        });
        try {
            var userScore = wx.getStorageSync("userScore");
            if (userScore) {
                that.setData({
                    userScore: userScore
                });
            }
        } catch (e) {}
    },
    moveUp: function moveUp(e) {
        var that = this;
        var collegeindex = e.currentTarget.dataset.collegeindex;
        var majorindex = e.currentTarget.dataset.majorindex;
        var tableList = that.data.tableList;
        var profession = tableList[0].Colleges[collegeindex].Professions[majorindex];
        tableList[0].Colleges[collegeindex].Professions.splice(majorindex, 1);
        tableList[0].Colleges[collegeindex].Professions.splice(majorindex - 1, 0, profession);
        that.setData({
            tableList: tableList,
            baocunFlag: true
        });
    },
    moveDown: function moveDown(e) {
        var that = this;
        var collegeindex = e.currentTarget.dataset.collegeindex;
        var majorindex = e.currentTarget.dataset.majorindex;
        var tableList = that.data.tableList;
        var profession = tableList[0].Colleges[collegeindex].Professions[majorindex];
        tableList[0].Colleges[collegeindex].Professions.splice(majorindex, 1);
        tableList[0].Colleges[collegeindex].Professions.splice(majorindex + 1, 0, profession);
        that.setData({
            tableList: tableList,
            baocunFlag: true
        });
    },
    collegeMoveUp: function collegeMoveUp(e) {
        console.log("上", e);
        var that = this;
        var collegeindex = e.currentTarget.dataset.collegeindex;
        var tableList = that.data.tableList;
        var temp = tableList.colleges[collegeindex].ji;
        console.log(temp);
        var college = tableList.colleges[collegeindex];
        console.log("上一个ji", tableList.colleges[collegeindex - 1].ji);
        college.ji = tableList.colleges[collegeindex - 1].ji;
        tableList.colleges[collegeindex - 1].ji = temp;
        tableList.colleges.splice(collegeindex, 1);
        tableList.colleges.splice(collegeindex - 1, 0, college);
        --tableList.colleges[collegeindex - 1].number;
        ++tableList.colleges[collegeindex].number;
        that.setData({
            tableList: tableList,
            baocunFlag: true
        });
        console.log("上   后", tableList);
    },
    collegeMoveDown: function collegeMoveDown(e) {
        console.log("下", e);
        var that = this;
        var collegeindex = e.currentTarget.dataset.collegeindex;
        var tableList = that.data.tableList;
        var temp = tableList.colleges[collegeindex].ji;
        var college = tableList.colleges[collegeindex];
        college.ji = tableList.colleges[collegeindex + 1].ji;
        console.log("ji", college.ji);
        tableList.colleges[collegeindex + 1].ji = temp;
        tableList.colleges.splice(collegeindex, 1);
        tableList.colleges.splice(collegeindex + 1, 0, college);
        ++tableList.colleges[collegeindex + 1].number;
        --tableList.colleges[collegeindex].number;
        that.setData({
            tableList: tableList,
            baocunFlag: true
        });
        console.log("下   后", tableList);
    },
    baocun: function baocun() {
        var that = this;
        var tableList = that.data.tableList;
        var ProvinceId = tableList.provinceNumId;
        var numId = tableList.numId;
        var Name = tableList.groupName;
        var Batch = tableList.batch;
        var BatchName = tableList.batchName;
        var UserId = tableList.userNumId;
        var UserScoreId = tableList.scoreNumId;
        var ReliableRate = tableList.reliableRate;
        var CourseType = tableList.courseType;
        var chooseLevel = tableList.chooseLevel;
        var Total = tableList.totalScore;
        var Colleges = [];
        var rank = tableList.ranking;
        var scoreType = tableList.scoreType;
        var wishs = [];
        tableList.colleges.forEach(function(ele, index) {
            wishs.push({
                number: ele.number,
                allow: true,
                prob: ele.probability
            });
        });
        api.RecommendationGetKPL("TZY/Recommendation/GetKPL", "POST", ProvinceId, Batch, wishs).then(function(result) {
            api.generatedZyTable("App/ZyTable/Save", "POST", numId, ProvinceId, Name, Batch, BatchName, UserId, UserScoreId, CourseType, chooseLevel, Total, tableList.colleges, scoreType, rank, result.result.prob).then(function(res) {
                if (res.isSuccess) {
                    var sheets_type = "平行志愿表";
                    if (app.globalData.isGaokaoFlag) {
                        sheets_type = "高考志愿表";
                    }
                    var data = {
                        SA_operation_type: "保存",
                        SA_sheets_num: numId,
                        SA_sheets_type: sheets_type,
                        SA_sheets_source: "智能填报",
                        SA_data_province: that.data.tableList.provinceName,
                        SA_data_batch: that.data.batchName,
                        SA_score_value: that.data.userScore.total,
                        SA_score_rank: that.data.userScore.rank,
                        SA_data_subject: that.data.userScore.courseType == 1 ? "文科" : "理科",
                        SA_line_gap: 0,
                        SA_reliance_rate: result.result.prob,
                        SA_colg_num: 0,
                        SA_colg_maxnum: 0,
                        SA_major_num: 0,
                        SA_major_maxnum: 0,
                        SA_vacancy_rate: 0,
                        SA_fearture1_rate: 0,
                        SA_fearture2_rate: 0,
                        SA_fearture3_rate: 0,
                        SAfearture4_rate: 0
                    };
                    app.sensors.track("VoluntSheets", sensors.VoluntSheets(data));
                    var id = res.result.value;
                    wx.hideLoading();
                    that.setData({
                        baocunFlag: false
                    });
                    wx.showToast({
                        title: "保存成功",
                        icon: "none",
                        duration: 2e3
                    });
                } else {
                    wx.showToast({
                        title: res.message,
                        icon: "none"
                    });
                }
            });
        });
    },
    compare: function compare(prop) {
        return function(obj1, obj2) {
            var val1 = obj1[prop];
            var val2 = obj2[prop];
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
            }
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        };
    },
    fenPai: function fenPai() {
        //分数排序  高->低
        var that = this;
        var collegesArray = that.data.tableList[0].Colleges.sort(that.compare("MinScore"));
        collegesArray = collegesArray.reverse();
        that.data.tableList[0].Colleges = collegesArray;
        that.setData({
            tableList: that.data.tableList,
            morenPai: false,
            fenPai: true,
            collegePai: false,
            baocunFlag: true
        });
    },
    collegePai: function collegePai() {
        //院校排序  高->低
        var that = this;
        var collegesArray = that.data.tableList[0].Colleges.sort(that.compare("RankOfCn"));
        that.data.tableList[0].Colleges = collegesArray;
        that.setData({
            tableList: that.data.tableList,
            morenPai: false,
            fenPai: false,
            collegePai: true,
            baocunFlag: true
        });
    },
    morenPai: function morenPai() {
        var that = this;
        that.setData({
            tableList: that.data.morenTableList,
            morenPai: true,
            fenPai: false,
            collegePai: false
        });
    },
    catchWrapperTouchmove: function catchWrapperTouchmove() {},
    // 院校详情
    collegeUp: function collegeUp(e) {
        var that = this;
        that.setData({
            collegeLoad: true
        });
        var ucode = e.currentTarget.dataset.ucode;
        var index = e.currentTarget.dataset.index;
        var college = that.data.tableList.colleges[index];
        var provinceNumId = that.data.tableList.provinceNumId;
        api.queryCollegesFractions("ScoreLines/Fractions/Colleges/Query", "POST", provinceNumId, ucode).then(function(res) {
            var data = res.result;
            var course = that.data.tableList.courseType;
            var collegeDetail = {
                collegeName: college.alias,
                tag: college.tags,
                collegeInfo: [],
                numId: college.collegeId,
                pro: college.probability,
                code: college.code,
                num: college.planNum,
                chooseLevel: college.chooseLevel,
                year: college.year
            };
            for (var i = 0; i < data.length; i++) {
                data[i].chooseLevel = data[i].chooseLevel.replace(/另一门/, "");
                if (course == data[i].course && that.data.tableList.batch == data[i].batch) {
                    collegeDetail.collegeInfo.push({
                        year: data[i].year,
                        maxScore: data[i].maxScore,
                        minScore: data[i].minScore,
                        avgScore: data[i].avgScore,
                        enterNum: data[i].enterNum,
                        lowSort: data[i].lowSort,
                        chooseLevel: data[i].chooseLevel,
                        batchName: data[i].batchName
                    });
                }
            }
            that.setData({
                collegeDetail: collegeDetail,
                collegeLoad: false
            });
        });
        this.setData({
            collegeUp: "major-animate"
        });
    },
    collegeClose: function collegeClose() {
        this.setData({
            collegeUp: "major-animate-out"
        });
    },
    // 专业详情
    majorUp: function majorUp(e) {
        var that = this;
        that.setData({
            majorLoad: true,
            majorUp: "major-animate"
        });
        var extended = JSON.parse(e.currentTarget.dataset.extended);
        var majorDetail = {
            Code: e.currentTarget.dataset.code,
            CollegeName: e.currentTarget.dataset.collegename,
            Cost: e.currentTarget.dataset.cost,
            LearYear: e.currentTarget.dataset.learyear,
            MajorCode: e.currentTarget.dataset.majorcode,
            PlanNum: e.currentTarget.dataset.plannum,
            PlanYear: e.currentTarget.dataset.planyear,
            Probability: e.currentTarget.dataset.probability,
            ProfessionName: e.currentTarget.dataset.professionname,
            RecommendPFModel: extended,
            year: e.currentTarget.dataset.year
        };
        that.setData({
            majorDetail: majorDetail,
            majorLoad: false
        });
    },
    majorClose: function majorClose() {
        this.setData({
            majorUp: "major-animate-out"
        });
    },
    goMajorDetail: function goMajorDetail(e) {
        var mcode = this.data.majorDetail.MajorCode;
        this.setData({
            majorUp: "major-animate-out"
        });
        if (mcode.length == 4) {
            if (this.data.share == false) {
                wx.navigateTo({
                    url: "/packages/selectMajor/middleMajorDetail/middleMajorDetail?majorcode=" + mcode
                });
            } else {
                wx.navigateTo({
                    url: "/packages/selectMajor/middleMajorDetail/middleMajorDetail?majorcode=" + mcode + "&share=true&cityid=" + this.data.tableList.provinceNumId
                });
            }
        } else {
            wx.navigateTo({
                url: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + mcode + "&cityid=" + this.data.tableList.provinceNumId
            });
        }
    },
    goCollegeDetail: function goCollegeDetail() {
        var id = this.data.collegeDetail[0].CollegeId;
        this.setData({
            collegeUp: "major-animate-out"
        });
        wx.navigateTo({
            url: "../collegeDetail/collegeDetail?id=" + id
        });
    }
});