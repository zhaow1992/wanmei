var api = require("../../utils/api.js");

var wxCharts = require("../../utils/wxcharts-min.js");

var app = getApp();

Page({
    data: {
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
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        if (res.from === "button") {}
        return {
            title: "我在完美志愿模拟的志愿表，你也来试试！",
            imageUrl: "http://bapp.wmei.cn/share/zyb.png",
            path: "/pages/ZYTableCommonDetail/ZYTableCommonDetail?id=" + that.data.tableList.numId + "&share=true"
        };
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
                    showLoad: false
                });
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
        var that = this;
        var collegeindex = e.currentTarget.dataset.collegeindex;
        var tableList = that.data.tableList;
        var college = tableList[0].Colleges[collegeindex];
        tableList[0].Colleges.splice(collegeindex, 1);
        tableList[0].Colleges.splice(collegeindex - 1, 0, college);
        that.setData({
            tableList: tableList,
            baocunFlag: true
        });
    },
    collegeMoveDown: function collegeMoveDown(e) {
        var that = this;
        var collegeindex = e.currentTarget.dataset.collegeindex;
        var tableList = that.data.tableList;
        var college = tableList[0].Colleges[collegeindex];
        tableList[0].Colleges.splice(collegeindex, 1);
        tableList[0].Colleges.splice(collegeindex + 1, 0, college);
        that.setData({
            tableList: tableList,
            baocunFlag: true
        });
    },
    baocun: function baocun() {
        var that = this;
        var tableList = that.data.tableList;
        var ProvinceId = tableList[0].ProvinceId;
        var Name = tableList[0].Name;
        var Batch = tableList[0].Batch;
        var BatchName = tableList[0].BatchName;
        var UserId = tableList[0].UserId;
        var UserScoreId = tableList[0].UserScoreId;
        var ReliableRate = tableList[0].ReliableRate;
        var GeneratedTime = tableList[0].GeneratedTime;
        var CourseType = tableList[0].CourseType;
        var ChooseLevel1 = tableList[0].ChooseLevel1;
        var ChooseLevel2 = tableList[0].ChooseLevel2;
        var Total = tableList[0].Total;
        var Colleges = [];
        for (var i = 0; i < tableList[0].Colleges.length; i++) {
            tableList[0].Colleges[i].Number = i + 1;
            Colleges.push(tableList[0].Colleges[i]);
        }
        var Id = tableList[0].Id;
        api.generatedZyTable("v2/generatedZyTable", "POST", ProvinceId, Name, Batch, BatchName, UserId, UserScoreId, ReliableRate, GeneratedTime, CourseType, ChooseLevel1, ChooseLevel2, Total, Colleges, Id).then(function(res) {
            if (res.Results.length > 0) {
                wx.showToast({
                    title: "保存成功",
                    icon: "none",
                    duration: 2e3
                });
                that.setData({
                    baocunFlag: false
                });
            }
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
                numId: college.collegeId
            };
            for (var i = 0; i < data.length; i++) {
                if (course == data[i].course && that.data.tableList.batch == data[i].batch) {
                    collegeDetail.collegeInfo.push({
                        year: data[i].year,
                        maxScore: data[i].maxScore,
                        minScore: data[i].minScore,
                        avgScore: data[i].avgScore,
                        enterNum: data[i].enterNum,
                        lowSort: data[i].lowSort,
                        chooseLevel: data[i].chooseLevel
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
            RecommendPFModel: extended
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