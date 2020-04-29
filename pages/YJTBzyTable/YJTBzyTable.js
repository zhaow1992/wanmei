var api = require("../../utils/api.js");

var app = getApp();

Page({
    data: {
        baocunFlag: true,
        majorDetail: [],
        majorLoad: true,
        collegeDetail: [],
        collegeLoad: true,
        userScore: [],
        tableList: [],
        showLoad: true,
        pro: null,
        total: null,
        batch: null,
        course: null,
        creatTable: false,
        GroupName: "",
        batchName: ""
    },
    catchWrapperTouchmove: function catchWrapperTouchmove() {},
    onLoad: function onLoad(options) {
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll("推荐志愿表", true);
        if (options.pro) that.setData({
            pro: options.pro,
            batch: options.batch,
            total: options.TotalScore,
            course: options.CourseType,
            GroupName: options.GroupName,
            batchName: options.batchName
        });
        try {
            var YJTBList = wx.getStorageSync("YJTBList");
            var userScore = wx.getStorageSync("userScore");
            if (YJTBList) {
                for (var i = 0; i < YJTBList.length; i++) {
                    YJTBList[i].ji = app.zimu(i);
                }
                that.setData({
                    tableList: YJTBList,
                    showLoad: false,
                    userScore: userScore
                });
            }
        } catch (e) {}
    },
    // 院校详情
    collegeUp: function collegeUp(e) {
        var that = this;
        that.setData({
            collegeLoad: true
        });
        var ucode = e.currentTarget.dataset.ucode;
        var index = e.currentTarget.dataset.index;
        var college = that.data.tableList[index];
        var provinceNumId = that.data.userScore.provinceNumId;
        api.queryCollegesFractions("ScoreLines/Fractions/Colleges/Query", "POST", provinceNumId, ucode).then(function(res) {
            var data = res.result;
            var course = that.data.userScore.courseType;
            var collegeDetail = {
                collegeName: college.alias,
                tag: college.tags,
                collegeInfo: [],
                numId: college.collegeId
            };
            for (var i = 0; i < data.length; i++) {
                if (course == data[i].course && that.data.batch == data[i].batch) {
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
            wx.navigateTo({
                url: "/packages/selectMajor/middleMajorDetail/middleMajorDetail?majorcode=" + mcode
            });
        } else {
            wx.navigateTo({
                url: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + mcode + "&cityid=" + this.data.pro
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
    },
    baocun: function baocun() {
        wx.showLoading({
            title: "保存中"
        });
        var that = this;
        if (that.data.creatTable == true) return;
        that.setData({
            creatTable: true
        });
        var userScore = that.data.userScore;
        var ProvinceId = userScore.provinceNumId;
        var Batch = userScore.batch;
        try {
            var gaokaoScore = wx.getStorageSync("gaokaoScore");
            switch (userScore.courseType) {
              case 0:
                gaokaoScore = gaokaoScore[0];
                break;

              case 1:
                gaokaoScore = gaokaoScore[1];
                break;
            }
            if (gaokaoScore) {
                for (var i = 0; i < gaokaoScore.length; i++) {
                    if (gaokaoScore[i].batch == batch) {
                        var BatchName = gaokaoScore[i].batchName;
                    }
                }
            }
        } catch (e) {}
        var userInfo = wx.getStorageSync("userInfo");
        var UserId = userInfo[0].UserId;
        var CourseType = userScore.courseType;
        var chooseLevel = "";
        if (userScore.provinceNumId == 1) {
            chooseLevel = userScore.chooseLevelList[0].value + "," + userScore.chooseLevelList[1].value;
        }
        var Total = userScore.total;
        var Colleges = that.data.tableList;
        var UserScoreId = userScore.numId;
        var rank = userScore.rank;
        var name = "";
        try {
            var collegeRecommendBatchGroup = wx.getStorageSync("collegeRecommendBatchGroup");
            if (collegeRecommendBatchGroup) {
                name = collegeRecommendBatchGroup;
            }
        } catch (e) {}
        var ReliableRate = "";
        var GeneratedTime = "";
        var Id = "";
        var scoreType = 1;
        if (app.globalData.isGaokaoFlag == true) {
            scoreType = 2;
        }
        var wishs = [];
        for (var _i = 0; _i < Colleges.length; _i++) {
            wishs.push({
                number: Colleges[_i].number,
                allow: true,
                prob: Colleges[_i].probability
            });
        }
        api.RecommendationGetKPL("TZY/Recommendation/GetKPL", "POST", ProvinceId, Batch, wishs).then(function(result) {
            api.generatedZyTable("App/ZyTable/Save", "POST", ProvinceId, name, Batch, BatchName, UserId, UserScoreId, CourseType, chooseLevel, Total, Colleges, scoreType, rank, result.result.prob).then(function(res) {
                if (res.isSuccess) {
                    var id = res.result.value;
                    that.setData({
                        creatTable: false,
                        baocunFlag: false
                    });
                    wx.hideLoading();
                    wx.showModal({
                        title: "保存成功",
                        content: "是否查看志愿表？",
                        confirmColor: "#e9302d",
                        success: function success(res) {
                            if (res.confirm) {
                                wx.redirectTo({
                                    url: "../ZYTableCommonDetail/ZYTableCommonDetail?id=" + id
                                });
                            }
                        }
                    });
                } else {
                    wx.showToast({
                        title: res.message,
                        icon: "none"
                    });
                }
            });
        });
    }
});