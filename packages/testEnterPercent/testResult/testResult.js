var _api = require("../api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var app = getApp();

var wxCharts = require("../../../utils/wxcharts-min.js");

var canvasWidth = 360;

var screenWidth = 360;

var scoreLineCanvasH = 250;

var ringW = 300;

var scoreCanvasText = [ "2017年", "院校录取分", "2019年", "我的等效分" ];

var scoreSection = [];

var score = [];

//[最低分,最高分,我的成绩]
var provinceId = 1;

var batch = 1;

var course = 0;

var rank = 0;

var totalScore = 400;

var collegeId = 926;

var uCode = "32_926_0_0";

var codeId = 0;

var scoreLine = [];

var ring = [];

// let scoreLineSetOff = 20;
Page({
    data: {
        isNewly: false,
        scoreLineText: "",
        share: false,
        explain: "",
        userScore: [],
        userInfo: [],
        insert: false,
        showLoad: true,
        data: null,
        resYear: 2018,
        scoreCanvasW: 0,
        //等效分canvas宽度
        scoreCanvasH: 0,
        //等效分canvas高度
        scoreLineCanvasH: 0,
        //历年录取分
        ringCanvasW: 0,
        //热门专业占比canvas宽、高
        topHeight: "4.93vw",
        collegeName: "-",
        course: "-",
        score: "-",
        dengxiaofen: "-",
        batch: "-",
        difference: "-",
        scoreList: [],
        province: "-",
        enterPercent: "-",
        enrolment: "-",
        //招生人数
        volatility: "平稳",
        //波动程度
        enterNum: "-",
        peopleLevel: "较少",
        percent: "-",
        hotMajor: "-",
        collegeLogo: "/image/collegeLogo.png",
        advice: "-",
        majorCurrect: 0,
        fractions: []
    },
    onUnload: function onUnload() {
        scoreLine = [];
        ring = [];
    },
    goCollegeDetail: function goCollegeDetail() {
        wx.navigateTo({
            url: "/packages/findUniversity/collegeDetail/collegeDetail?numId=" + collegeId
        });
    },
    chooseCollege: function chooseCollege() {
        // wx.redirectTo({
        //   url: '../searchCollege/searchCollege'
        // });
        wx.navigateTo({
            url: "/pages/globalSearch/globalSearch?mode=test&course=" + course + "&batch=" + batch + "&&cityid=" + provinceId
        });
    },
    // 选择热门专业占比 
    chooseMajor: function chooseMajor(e) {
        var index = e.currentTarget.dataset.index;
        if (index == this.data.majorCurrect) return;
        this.setData({
            majorCurrect: index
        });
        this.drawCheckedMajor(index);
    },
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        if (res.from === "button") {}
        return {
            title: "[" + that.data.data.probability * 100 + "%] 我的[" + that.data.data.collegeName + "]录取分析报告",
            imageUrl: "http://bapp.wmei.cn/share/test.png",
            path: "/packages/testEnterPercent/testResult/testResult?rank=" + rank + "&course=" + course + "&score=" + totalScore + "&batch=" + batch + "&cityid=" + provinceId + "&ucode=" + uCode + "&collegeid=" + collegeId + "&insert=false&share=true"
        };
    },
    onLoad: function onLoad(options) {
        this.setData({
            insert: options.insert
        });
        if (options && options.share) {
            this.setData({
                share: true
            });
        }
        this.selectComponent("#navigationcustom").setNavigationAll("测评结果", true);
        rank = options.rank;
        course = options.course;
        totalScore = options.score;
        batch = options.batch;
        provinceId = options.cityid;
        uCode = options.ucode;
        collegeId = options.collegeid;
        codeId = app.globalData.probabilityInfo.codeId;
        var cityList = wx.getStorageSync("cityList");
        for (var i = 0; i < cityList.length; i++) {
            if (provinceId == cityList[i].numId) {
                this.setData({
                    province: cityList[i].name
                });
                break;
            }
        }
        canvasWidth = app.globalData.screenWidth * .915;
        screenWidth = app.globalData.screenWidth;
        scoreLineCanvasH = canvasWidth * .5 - screenWidth * .05;
        ringW = app.globalData.screenWidth * .38;
        this.setData({
            scoreCanvasH: canvasWidth * .438,
            scoreCanvasW: canvasWidth,
            scoreLineCanvasH: canvasWidth * .5,
            ringCanvasW: ringW
        });
        var that = this;
        // that.selectComponent("#navigationcustom").setNavigationAll("测评结果", true);
                that.ProbabilityDetail();
        that.GetProbability();
    },
    // 根据院校及招生方向，等信息查询录取概率
    GetProbability: function GetProbability() {
        var that = this;
        _api2.default.GetProbability("TZY/Probability/Get", "POST", provinceId, batch, course, totalScore, collegeId, uCode, rank).then(function(res) {
            var data = res.result;
            that.setData({
                isNewly: data.isNewly,
                advice: data.explain,
                percent: data.probability * 100 + "%",
                collegeName: data.collegeName,
                course: data.course == 0 ? "理科" : "文科",
                score: data.totalScore + "分",
                batch: data.batchName,
                collegeLogo: data.collegeLogoUrl,
                data: data
            });
        });
    },
    // 获取院校录取概率详情
    ProbabilityDetail: function ProbabilityDetail() {
        var that = this;
        course = course == -1 ? 0 : course;
        _api2.default.ProbabilityDetail("ScoreLines/Probability/Detail", "POST", provinceId, batch, course, totalScore, collegeId, uCode, rank).then(function(res) {
            var equivalentScore = res.result.equivalentScore;
            var collegeFractions = res.result.collegeFractions;
            var professionFractions = res.result.professionFractions;
            scoreCanvasText[0] = equivalentScore.pclYear + "年";
            scoreCanvasText[2] = equivalentScore.enterDataYear + "年";
            score = [ equivalentScore.minScore, equivalentScore.maxScore, equivalentScore.equivalentScore ];
            var minScore = [];
            var year = [];
            for (var i = 0; i < collegeFractions.fractions.length; i++) {
                // let details = [];
                minScore = [];
                year = [];
                collegeFractions.fractions[i].details = collegeFractions.fractions[i].details.sort(app.compare("year"));
                for (var k = 2012; k < 2019; k++) {
                    for (var j = 0; j < collegeFractions.fractions[i].details.length; j++) {
                        if (k == collegeFractions.fractions[i].details[j].year) {
                            minScore.push(collegeFractions.fractions[i].details[j].minScore == 0 ? null : collegeFractions.fractions[i].details[j].minScore);
                            break;
                        } else {
                            if (j == collegeFractions.fractions[i].details.length - 1) {
                                minScore.push(null);
                            }
                        }
                        // details.push(collegeFractions.fractions[i].details[j])
                                        }
                    year.push(k);
                }
                scoreLine.push({
                    minScore: minScore,
                    year: year,
                    batchName: collegeFractions.fractions[i].batchName
                });
                // collegeFractions.fractions[i].details = details.reverse();
                        }
            // scoreLine = collegeFractions.fractions;
                        that.setData({
                scoreList: professionFractions,
                difference: equivalentScore.explain,
                resYear: equivalentScore.enterDataYear,
                fractions: collegeFractions.fractions,
                enrolment: collegeFractions.totalEnroll == 0 ? "-" : collegeFractions.totalEnroll,
                enterNum: collegeFractions.courseEnroll == 0 ? "-" : collegeFractions.courseEnroll,
                explain: collegeFractions.explain
            });
            if (collegeFractions.courseEnroll == 0 || collegeFractions.totalEnroll == 0) {
                that.setData({
                    enterPercent: "-"
                });
            } else {
                var enterPercent = collegeFractions.courseEnroll / collegeFractions.totalEnroll * 100;
                enterPercent = enterPercent.toFixed(2);
                that.setData({
                    enterPercent: enterPercent + "%"
                });
            }
            ring = professionFractions;
            that.drawScoreCanvas();
            that.drawScoreLine();
            if (professionFractions.length > 0) {
                that.drawMajorCanvas();
                that.drawRingSplit();
                that.drawCheckedMajor(0);
            }
            setTimeout(function() {
                if (that.data.insert == "true") {
                    that.CollegeAPReportInsert(equivalentScore, collegeFractions, professionFractions);
                }
            }, 2e3);
            that.setData({
                showLoad: false
            });
        });
    },
    CollegeAPReportInsert: function CollegeAPReportInsert(equivalentScoreModel, collegeFractionsModel, professionFractionsModels) {
        var data = this.data.data;
        data.collegeNumId = collegeId;
        data.uCode = uCode;
        data.provinceNumId = provinceId;
        data.userNumId = wx.getStorageSync("userInfo")[0].UserId;
        data.codeId = codeId;
        data.probability = data.probability * 100;
        data.userScoreId = wx.getStorageSync("userScore").numId;
        data.ranking = wx.getStorageSync("userScore").rank;
        _api2.default.CollegeAPReportInsert("App/Users/CollegeAPReport/Insert", "POST", equivalentScoreModel, collegeFractionsModel, professionFractionsModels, data).then(function(res) {});
    },
    // 等效分图
    drawScoreCanvas: function drawScoreCanvas() {
        var ctx = wx.createCanvasContext("scoreCanvas");
        drawRunto();
        drawText();
        drawPosition();
        // 绘制跑到
                function drawRunto() {
            ctx.drawImage("/packages/testEnterPercent/image/runway.png", 0, 0, canvasWidth, canvasWidth * .438);
        }
        // 绘制文字
                function drawText() {
            ctx.setFontSize(screenWidth * .032);
            ctx.setFillStyle("#F8F5F4");
            ctx.setTextAlign("left");
            ctx.fillText(scoreCanvasText[2], screenWidth * .027, screenWidth * .09);
            ctx.fillText(scoreCanvasText[1], screenWidth * .027, screenWidth * .14);
            ctx.fillText(scoreCanvasText[0], screenWidth * .027, screenWidth * .27);
            ctx.fillText(scoreCanvasText[3], screenWidth * .027, screenWidth * .32);
            ctx.stroke();
        }
        // 绘制三个点+位置
                function drawPosition() {
            var minScore = screenWidth * .3;
            var maxScore = screenWidth * .65;
            var myScore = 0;
            if (score[2] > score[1]) {
                myScore = screenWidth * .75;
            } else if (score[2] < score[0]) {
                myScore = screenWidth * .2;
            } else {
                myScore = screenWidth * .3175 + screenWidth * .35 / (score[1] - score[0]) * (score[2] - score[0]);
            }
            ctx.drawImage("/packages/testEnterPercent/image/minSocre.png", minScore, screenWidth * .035, screenWidth * .139, screenWidth * .104);
            ctx.drawImage("/packages/testEnterPercent/image/maxScore.png", maxScore, screenWidth * .035, screenWidth * .139, screenWidth * .104);
            ctx.drawImage("/packages/testEnterPercent/image/myScore.png", myScore, screenWidth * .246, screenWidth * .08, screenWidth * .069);
            ctx.setTextAlign("center");
            ctx.fillText(score[0], minScore + screenWidth * .139 / 2, screenWidth * .17, screenWidth * .139);
            ctx.fillText(score[1], maxScore + screenWidth * .139 / 2, screenWidth * .17, screenWidth * .139);
            ctx.setFillStyle("#F6DC65");
            ctx.fillText(score[2], myScore + screenWidth * .08 / 2, screenWidth * .345, screenWidth * .08);
            ctx.stroke();
        }
        ctx.draw();
    },
    // 热门专业占比
    drawMajorCanvas: function drawMajorCanvas() {
        var ctx = wx.createCanvasContext("ringCanvas");
        // 绘制圆环背景  灰色
                drawRingBg();
        ctx.draw();
        // 绘制圆环背景  灰色
                function drawRingBg() {
            ctx.setLineWidth(screenWidth * .06);
            ctx.setStrokeStyle("#d8d8d8");
            ctx.arc(ringW / 2, ringW / 2, ringW / 2 - screenWidth * .03, 0, 2 * Math.PI);
            ctx.stroke();
        }
    },
    drawCheckedMajor: function drawCheckedMajor(currect) {
        var ctx = wx.createCanvasContext("ringCheckedCanvas");
        // 绘制中间百分比文字
                drawRingText();
        // 绘制亮的
                drawRingChecked();
        ctx.draw();
        // 绘制中间百分比文字
                function drawRingText() {
            ctx.setFillStyle("#757575");
            ctx.setFontSize(screenWidth * .048);
            ctx.setTextAlign("center");
            ctx.setTextBaseline("middle");
            ctx.fillText(parseInt(ring[currect].proportion * 100) + "%", ringW / 2, ringW / 2);
            ctx.stroke();
        }
        // 绘制亮的
                function drawRingChecked() {
            ctx.setLineWidth(screenWidth * .06);
            ctx.setStrokeStyle("#E9302D");
            var proportion = 0;
            for (var i = 0; i < currect; i++) {
                proportion += ring[i].proportion;
                console.log(ring);
            }
            var start = 3 / 2 * Math.PI + 2 * Math.PI * proportion;
            var end = start + 2 * Math.PI * ring[currect].proportion;
            ctx.arc(ringW / 2, ringW / 2, ringW / 2 - screenWidth * .03, start, end);
            ctx.stroke();
        }
    },
    drawRingSplit: function drawRingSplit() {
        var ctx = wx.createCanvasContext("ringSplit");
        ctx.setLineWidth(screenWidth * .07);
        ctx.setStrokeStyle("#fff");
        for (var j = 0; j < ring.length; j++) {
            // let j = 0
            ctx.beginPath();
            var proportion = 0;
            for (var i = 0; i < j; i++) {
                proportion += ring[i].proportion;
            }
            var start = 3 / 2 * Math.PI + 2 * Math.PI * proportion - 2 * Math.PI / 100;
            var end = start + 2 * Math.PI / 100;
            ctx.arc(ringW / 2, ringW / 2, ringW / 2 - screenWidth * .03, start, end);
            ctx.stroke();
        }
        ctx.draw();
    },
    drawScoreLine: function drawScoreLine() {
        var that = this;
        if (scoreLine.length == 2) {
            new wxCharts({
                canvasId: "barCanvas",
                type: "line",
                dataLabel: true,
                legend: false,
                categories: scoreLine[0].year,
                series: [ {
                    data: scoreLine[0].minScore,
                    color: "#BBF08A"
                }, {
                    data: scoreLine[1].minScore,
                    color: "#6CDCDF"
                } ],
                yAxis: {
                    min: 2e3,
                    fontColor: "#7b7b7b"
                },
                xAxis: {
                    disableGrid: false
                },
                width: that.data.scoreCanvasW,
                height: that.data.scoreLineCanvasH
            });
        } else if (scoreLine.length == 3) {
            new wxCharts({
                canvasId: "barCanvas",
                type: "line",
                dataLabel: true,
                legend: false,
                categories: scoreLine[0].year,
                series: [ {
                    data: scoreLine[0].minScore,
                    color: "#BBF08A"
                }, {
                    data: scoreLine[1].minScore,
                    color: "#6CDCDF"
                }, {
                    data: scoreLine[2].minScore,
                    color: "#FFB46E"
                } ],
                yAxis: {
                    min: 2e3,
                    fontColor: "#7b7b7b"
                },
                xAxis: {
                    disableGrid: false
                },
                width: that.data.scoreCanvasW,
                height: that.data.scoreLineCanvasH
            });
        } else if (scoreLine.length == 4) {
            new wxCharts({
                canvasId: "barCanvas",
                type: "line",
                dataLabel: true,
                legend: false,
                categories: scoreLine[0].year,
                series: [ {
                    data: scoreLine[0].minScore,
                    color: "#BBF08A"
                }, {
                    data: scoreLine[1].minScore,
                    color: "#6CDCDF"
                }, {
                    data: scoreLine[2].minScore,
                    color: "#FFB46E"
                }, {
                    data: scoreLine[3].minScore,
                    color: "#50D2A0"
                } ],
                yAxis: {
                    min: 2e3,
                    fontColor: "#7b7b7b"
                },
                xAxis: {
                    disableGrid: false
                },
                width: that.data.scoreCanvasW,
                height: that.data.scoreLineCanvasH
            });
        } else if (scoreLine.length == 5) {
            new wxCharts({
                canvasId: "barCanvas",
                type: "line",
                dataLabel: true,
                legend: false,
                categories: scoreLine[0].year,
                series: [ {
                    data: scoreLine[0].minScore,
                    color: "#BBF08A"
                }, {
                    data: scoreLine[1].minScore,
                    color: "#6CDCDF"
                }, {
                    data: scoreLine[2].minScore,
                    color: "#FFB46E"
                }, {
                    data: scoreLine[3].minScore,
                    color: "#50D2A0"
                }, {
                    data: scoreLine[4].minScore,
                    color: "#4B9BFF"
                } ],
                yAxis: {
                    min: 2e3,
                    fontColor: "#7b7b7b"
                },
                xAxis: {
                    disableGrid: false
                },
                width: that.data.scoreCanvasW,
                height: that.data.scoreLineCanvasH
            });
        } else {
            new wxCharts({
                canvasId: "barCanvas",
                type: "line",
                dataLabel: true,
                legend: false,
                categories: scoreLine[0].year,
                series: [ {
                    data: scoreLine[0].minScore,
                    color: "#BBF08A"
                } ],
                yAxis: {
                    min: 2e3,
                    fontColor: "#7b7b7b"
                },
                xAxis: {
                    disableGrid: false
                },
                width: that.data.scoreCanvasW,
                height: that.data.scoreLineCanvasH
            });
        }
    },
    transformAngle: function transformAngle(data) {
        /*返回的数据内容包含弧度的*/
        var total = 0;
        data.forEach(function(item, i) {
            total += item.num;
        });
        /*计算弧度 并且追加到当前的对象内容*/        data.forEach(function(item, i) {
            var angle = item.num / total * Math.PI * 2;
            item.angle = angle;
        });
        return data;
    }
});