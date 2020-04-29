var _Page;

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

var api = require("../../utils/api.js");

var radar = {
    mW: 360,
    mH: 240,
    mCenter: 180,
    hCenter: 120,
    //中心点
    mAngle: Math.PI * 2 / 6,
    mRadius: 90,
    //半径(减去的值用于给绘制的文本留空间)
    radarData: [],
    radarDataParent: [],
    holland: {},
    imgPath: ""
};

var bar = {
    mW: 360,
    mH: 150,
    mCenter: 180,
    hCenter: 75,
    //中心点
    barW: 120,
    //柱宽
    barH: 15,
    //柱高
    barData: [],
    barBottomData: [ "强", "明显", "中等", "轻微", "中等", "明显", "强" ],
    imgPath: ""
};

var line = {
    mW: 360,
    mH: 280,
    mCenter: 180,
    hCenter: 140,
    //中心点
    lineW: 15,
    //柱宽
    lineH: 15,
    //柱高
    lineText: [ [ "语言", "能力" ], [ "逻辑", "数学" ], [ "空间", "能力" ], [ "身体", "动觉" ], [ "音乐", "能力" ], [ "人际", "能力" ], [ "内省", "能力" ], [ "自然", "观察" ] ],
    lineColText: [ "20", "15", "10", "5", "0" ],
    lineData: [],
    curveData: [],
    points: [],
    imgPath: ""
};

var curve = {
    mW: 360,
    mH: 280,
    mCenter: 180,
    hCenter: 140,
    //中心点
    mAngle: Math.PI * 2 / 8,
    mRadius: 90,
    //半径(减去的值用于给绘制的文本留空间)
    cruveData: [],
    crueDataParent: [],
    careerAnchor: {},
    imgPath: ""
};

var cake = {
    mW: 360,
    mH: 280,
    mCenter: 180,
    hCenter: 140,
    //中心点
    cakeData: [],
    cakeText: [ "英语", "政治", "生物", "语文", "历史", "化学", "数学", "地理", "物理" ],
    course: {},
    imgPath: ""
};

var pn = 1;

var majorListArr = [];

var hollandList = [ {
    R: "现实型"
}, {
    I: "研究型"
}, {
    A: "艺术型"
}, {
    C: "常规型"
}, {
    S: "社会型"
}, {
    E: "企业型"
} ];

Page((_Page = {
    data: {
        share: false,
        holland: "",
        mbti: "",
        midas: "",
        radar: {
            result: {
                result: "",
                title: "",
                body: ""
            },
            display: "block",
            imagePath: ""
        },
        bar: {
            result: {
                result: "",
                title: "",
                body: ""
            },
            display: "block",
            imagePath: ""
        },
        line: {
            result: {
                title: "",
                body: ""
            },
            display: "block",
            imagePath: ""
        },
        curve: {
            result: {
                title: "",
                body: ""
            },
            display: "block",
            imagePath: ""
        },
        cake: {
            result: {
                title: "",
                body: ""
            },
            display: "block",
            imagePath: ""
        },
        id: "",
        tab: [ "报告解读", "专业推荐" ],
        current: 0,
        majorList: [],
        loadMore: 0,
        careerAnchorList: [ "技术型（TF）:追求在技术/职能领域的成长和技能的不断提高，以及应用这种技术/职能的机会。希望通过施展自己精湛的技能以获取别人认可，乐于和同行交流切磋。", "管理型（GM）:追求岗位晋升，致力于全面管理，希望能领导别人，独自负责某个部分，可以跨部门整合其他人的努力成果，愿意承担责任。具体的技术/职能工作仅仅是通向更高、更全面管理层级的手段而已。", "自主型（AU）:希望可以按照自己喜欢的方式工作和生活，不愿意忍受公司或者组织条条框框的约束和限制，追求能施展个人能力的工作环境，更容易被自由选择而不是物质报酬所激励。", "安全型（SE）:追求稳定的工作岗位，更为看重财务安全和职业稳定性，关注五险一金、养老金以等保障性收入。对组织忠心耿耿，可以长久稳定的从事某一职业。", "创造型（EC）:有强烈的创造需求和欲望，醉心于建立或创造某种完全属于自己的东西，最强烈的工作动力是可以发明创造，奠基立业，同时意志坚定，敢于冒险", "服务型（SV）:希望可以做一些利于他人的事，为别人提供有价值的服务。例如：帮助他人，改善人们的处境，通过新的产品消除疾病等等。富有爱心和同情心。", "挑战型（CH）:喜欢解决看上去无法解决的问题，战胜厉害的对手，克服无法克服的困难，参加工作的原因是工作过程中可以去战胜各种不可能，新奇、变化和困难是行动的终极目标。", "生活型（LS）:希望职业环境有足够的弹性，能平衡并个人的、家庭的和职业的矛盾，认为家庭和事业是一个整体，希望两者可以兼顾，可以协调发展" ],
        showLoad: true,
        windowHeight: 0
    },
    onShareAppMessage: function onShareAppMessage() {
        var that = this;
        return {
            title: "我正在测[专业定位测评]推荐你也来测一测吧!",
            path: "/pages/cepingIndex/cepingIndex",
            imageUrl: "http://wmei-appfile.cn-bj.ufileos.com/share_cp.png"
        };
    },
    onLoad: function onLoad(options) {
        var that = this;
        if (options && options.isHide) {
            this.setData({
                isHide: true,
                isShare: true
            });
        }
        if (options && options.isShare) {
            this.setData({
                isShare: true
            });
        }
        if (options && options.share) {
            this.setData({
                share: true
            });
        }
        this.selectComponent("#navigationcustom").setNavigationAll("测评报告", true);
        this.userInfo = wx.getStorageSync("userInfo")[0];
        if (options && options.id) this.setData({
            id: options.id
        });
        this.professionOrientation();
        wx.getSystemInfo({
            success: function success(result) {
                that.setData({
                    windowHeight: result.windowHeight - result.statusBarHeight
                });
            }
        });
    },
    /**
   * 获取五合一测评详情
   */
    professionOrientation: function professionOrientation() {
        var _this = this;
        var that = this;
        var id = that.data.id;
        api.professionOrientationRes("Evaluation/Result/ProfessionOrientation/GetByScoreId?id=" + id, "POST").then(function(res) {
            var holland = res.result.holland;
            holland.celebrities.map(function(item) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;
                try {
                    for (var _iterator = hollandList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var a = _step.value;
                        if (item.type == Object.keys(a)[0]) item.allType = item.type + " " + Object.values(a)[0];
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
            });
            // res.result.hollandPatriarch = {
            //   a: 17,
            //   c: 14,
            //   celebrities: null,
            //   comprehensiveResult: { title: "自我表现、感情充沛、完美主义"},
            //   e: 17,
            //   i: 15,
            //   r: 12,
            //   result: "AEI",
            //   s: 15
            // }
                        var hollandPatriarch = res.result.hollandPatriarch || "";
            var careerAnchorPatriarch = res.result.careerAnchorPatriarch || "";
            var mbti = res.result.mbti;
            var midas = res.result.midas;
            var careerAnchor = res.result.careerAnchor;
            var course = res.result.course;
            var explanationsList = [];
            mbti.explanations.map(function(item) {
                item.explanations.map(function(i) {
                    explanationsList.push(i);
                });
            });
            mbti.explanationsList = explanationsList;
            res.result.recommendMajors.map(function(item) {
                item.majorName = item.majorName.length > 6 ? item.majorName.substring(0, 6) + "..." : item.majorName;
            });
            radar.radarData = [ [ "社会型(S)", holland.s ], [ "艺术型(A)", holland.a ], [ "研究型(I)", holland.i ], [ "现实型(R)", holland.r ], [ "常规型(C)", holland.c ], [ "企业型(E)", holland.e ] ];
            bar.barData = [ [ "外向(E)", mbti.e ], [ "内向(I)", mbti.i ], [ "感觉(S)", mbti.s ], [ "直觉(N)", mbti.n ], [ "思考(T)", mbti.t ], [ "情感(F)", mbti.f ], [ "判断(J)", mbti.j ], [ "知觉(P)", mbti.p ] ];
            line.lineData = [ midas.li, midas.lmi, midas.si, midas.bki, midas.mi, midas.ii, midas.iiTwo, midas.ni ];
            line.curveData = [ midas.averagePowerResult[0].avgScore, midas.averagePowerResult[1].avgScore, midas.averagePowerResult[2].avgScore, midas.averagePowerResult[3].avgScore, midas.averagePowerResult[4].avgScore, midas.averagePowerResult[5].avgScore, midas.averagePowerResult[6].avgScore, midas.averagePowerResult[7].avgScore ], 
            curve.curveData = [ [ "自主型", careerAnchor.au ], [ "技术型", careerAnchor.tf ], [ "挑战型", careerAnchor.ch ], [ "管理型", careerAnchor.gm ], [ "服务型", careerAnchor.sv ], [ "创造型", careerAnchor.ec ], [ "安全型", careerAnchor.se ], [ "生活型", careerAnchor.ls ] ];
            cake.cakeData = [ course.english, course.politics, course.biology, course.chinese, course.history, course.chemistry, course.math, course.geography, course.physics ];
            majorListArr = res.result.recommendMajors;
            if (res.result.hollandPatriarch) {
                radar.radarDataParent = [ [ "社会型(S)", hollandPatriarch.s ], [ "艺术型(A)", hollandPatriarch.a ], [ "研究型(I)", hollandPatriarch.i ], [ "现实型(R)", hollandPatriarch.r ], [ "常规型(C)", hollandPatriarch.c ], [ "企业型(E)", hollandPatriarch.e ] ];
            }
            if (res.result.careerAnchorPatriarch) {
                curve.crueDataParent = [ [ "自主型", careerAnchorPatriarch.au ], [ "技术型", careerAnchorPatriarch.tf ], [ "挑战型", careerAnchorPatriarch.ch ], [ "管理型", careerAnchorPatriarch.gm ], [ "服务型", careerAnchorPatriarch.sv ], [ "创造型", careerAnchorPatriarch.ec ], [ "安全型", careerAnchorPatriarch.se ], [ "生活型", careerAnchorPatriarch.ls ] ];
            }
            that.setData({
                reportType: res.result.reportType,
                holland: holland,
                mbti: mbti,
                midas: midas,
                careerAnchor: careerAnchor,
                course: course,
                hollandPatriarch: hollandPatriarch,
                careerAnchorPatriarch: careerAnchorPatriarch,
                majorList: res.result.recommendMajors,
                "radar.result": {
                    result: holland.result,
                    title: holland.comprehensiveResult == null ? "" : holland.comprehensiveResult.title,
                    body: holland.comprehensiveResult == null ? "" : holland.comprehensiveResult.body
                },
                "bar.result": {
                    result: mbti.result,
                    title: mbti.comprehensiveResult.title,
                    body: mbti.comprehensiveResult.body
                },
                "line.result": {
                    title: midas.comprehensiveResult.title,
                    body: midas.comprehensiveResult.body
                },
                "curve.result": {
                    title: careerAnchor.comprehensiveResult.title,
                    body: careerAnchor.comprehensiveResult.body
                },
                "cake.result": {
                    title: course.comprehensiveResult.title,
                    body: course.comprehensiveResult.body
                },
                studentInfo: [ wx.getStorageSync("sex") == 1 ? "男" : "女", wx.getStorageSync("course") == -1 ? "" : wx.getStorageSync("course") == 1 ? "文科" : "理科", _this.parseTime(res.result.testTime) ],
                showLoad: false
            }, function() {
                that.startDraw();
                wx.hideLoading();
            });
        });
    },
    //时间转换
    parseTime: function parseTime(time) {
        var min = parseInt(time / 1e3 / 60);
        var sec = parseInt((time - min * 60 * 1e3) / 1e3);
        return min + "分" + sec + "秒";
    },
    startDraw: function startDraw() {
        var radCtx = wx.createCanvasContext("radarCanvas");
        //雷达图
                var barCtx = wx.createCanvasContext("barCanvas");
        // 横向柱状图
                var lineCtx = wx.createCanvasContext("lineCanvas");
        // 柱+曲
                var curveCtx = wx.createCanvasContext("curveCanvas");
        //八边雷达图
                var cakeCtx = wx.createCanvasContext("cakeCanvas");
        //饼图
                this.drawRadar(radCtx);
        //雷达图
                this.drawBar(barCtx);
        //横向柱状图
                this.drawLine(lineCtx);
        // 柱+曲图
                this.drawCurve(curveCtx);
        //八边雷达图
                this.drawCake(cakeCtx);
        //饼图
        },
    // ***************************雷达图开始-兴趣维度解析***********************
    // 雷达图
    drawRadar: function drawRadar(radCtx) {
        var that = this;
        var radarData = radar.radarData;
        var radarDataParent = radar.radarDataParent;
        //调用
                that.drawEdge(radCtx);
        //画六边形
                that.drawLinePoint(radCtx);
        if (that.data.reportType == 1 || that.data.reportType == 2) {
            that.drawRegion(radarData, "rgba(245,103,103,0.3)", radCtx);
            //设置数据
                        that.drawCircle(radarData, "#F56767", radCtx);
            //设置节点
                }
        if (that.data.reportType == 3 || that.data.reportType == 4) {
            that.drawRegion(radarDataParent, "rgba(255,178,114,0.3)", radCtx);
            //设置数据
                        that.drawCircle(radarDataParent, "#FFB272", radCtx);
            //设置节点
                }
        that.drawTextCans(radarData, radCtx);
        //设置文本数据
                radCtx.draw(false, function(e) {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 360,
                height: 240,
                destWidth: 720,
                destHeight: 480,
                canvasId: "radarCanvas",
                success: function success(res) {
                    radar.imgPath = res.tempFilePath;
                    that.setData({
                        "radar.imagePath": res.tempFilePath,
                        "radar.display": "none"
                    });
                }
            });
        });
    },
    // 绘制6条边
    drawEdge: function drawEdge(radCtx) {
        radCtx.setStrokeStyle("#9b9b9b");
        radCtx.moveTo(radar.mCenter + radar.mRadius / 3 * Math.sin(0), radar.hCenter + radar.mRadius / 3 * Math.cos(0));
        for (var i = 0; i < 3; i++) {
            //计算半径
            var rdius = radar.mRadius / 3 * (i + 1);
            //画6条线段
                        for (var j = 0; j < 7; j++) {
                //坐标
                var x = radar.mCenter + rdius * Math.sin(radar.mAngle * j);
                var y = radar.hCenter + rdius * Math.cos(radar.mAngle * j);
                radCtx.lineTo(x, y);
            }
            radCtx.stroke();
        }
    },
    // 绘制连接点
    drawLinePoint: function drawLinePoint(radCtx) {
        radCtx.beginPath();
        for (var k = 0; k < 6; k++) {
            var x = radar.mCenter + radar.mRadius * Math.sin(radar.mAngle * k);
            var y = radar.hCenter + radar.mRadius * Math.cos(radar.mAngle * k);
            radCtx.moveTo(radar.mCenter, radar.hCenter);
            radCtx.lineTo(x, y);
        }
        radCtx.stroke();
    },
    //绘制数据区域(数据和填充颜色)
    drawRegion: function drawRegion(mData, color, radCtx) {
        radCtx.beginPath();
        radCtx.moveTo(radar.mCenter + radar.mRadius * Math.sin(0) * mData[0][1] / 20, radar.hCenter + radar.mRadius * Math.cos(0) * mData[0][1] / 20);
        for (var m = 0; m < 6; m++) {
            var x = radar.mCenter + radar.mRadius * Math.sin(radar.mAngle * m) * mData[m][1] / 20;
            var y = radar.hCenter + radar.mRadius * Math.cos(radar.mAngle * m) * mData[m][1] / 20;
            radCtx.lineTo(x, y);
        }
        radCtx.closePath();
        radCtx.setFillStyle(color);
        radCtx.fill();
        //if(this.data.hollandPatriarch){
        //   radCtx.beginPath();
        //   radCtx.moveTo(radar.mCenter + radar.mRadius * Math.sin(0) * mData[0][2] / 20, radar.hCenter + radar.mRadius * Math.cos(0) * mData[0][2] / 20);
        //   for (var m = 0; m < 6; m++) {
        //     var x = radar.mCenter + radar.mRadius * Math.sin(radar.mAngle * m) * mData[m][2] / 20;
        //     var y = radar.hCenter + radar.mRadius * Math.cos(radar.mAngle * m) * mData[m][2] / 20;
        //     radCtx.lineTo(x, y);
        //   }
        //   radCtx.closePath();
        //   radCtx.setFillStyle('rgba(255,178,114,0.2)');
        //   radCtx.fill();
        // }
        },
    //绘制文字
    drawTextCans: function drawTextCans(mData, radCtx) {
        radCtx.setFillStyle("#555555");
        radCtx.setFontSize(12);
        //设置字体
                for (var n = 0; n < 6; n++) {
            var x = radar.mCenter + radar.mRadius * Math.sin(radar.mAngle * n);
            var y = radar.hCenter + radar.mRadius * Math.cos(radar.mAngle * n);
            //通过不同的位置，调整文本的显示位置
                        if (n == 0) {
                radCtx.fillText(mData[0][0], x - 23, y + 20);
            } else if (n == 1) {
                radCtx.fillText(mData[1][0], x + 10, y + 5);
            } else if (n == 2) {
                radCtx.fillText(mData[2][0], x + 10, y + 5);
            } else if (n == 3) {
                radCtx.fillText(mData[3][0], x - 23, y - 10);
            } else if (n == 4) {
                radCtx.fillText(mData[4][0], x - 55, y + 5);
            } else if (n == 5) {
                radCtx.fillText(mData[5][0], x - 55, y + 5);
            }
        }
    },
    //画点
    drawCircle: function drawCircle(mData, color, radCtx) {
        var r = 5;
        //设置节点小圆点的半径
                for (var i = 0; i < 6; i++) {
            var x = radar.mCenter + radar.mRadius * Math.sin(radar.mAngle * i) * mData[i][1] / 20;
            var y = radar.hCenter + radar.mRadius * Math.cos(radar.mAngle * i) * mData[i][1] / 20;
            radCtx.beginPath();
            radCtx.arc(x, y, r, 0, Math.PI * 2);
            radCtx.setFillStyle(color);
            radCtx.fill();
        }
    },
    // ****************************雷达图结束*************************************************
    // ****************************横向柱状图开始-性格维度解析**********************************
    drawBar: function drawBar(barCtx) {
        var that = this;
        this.drawBarBg(barCtx);
        // 画背景
                this.drawBarRegion(bar.barData, "rgba(255,102,101,1)", barCtx);
        //设置数据
                this.drawBarText(bar.barData, barCtx);
        //绘制文字
                this.drawBarBottomText(bar.barBottomData, barCtx);
        //绘制底部文字
        //barCtx.draw();
                barCtx.draw(false, function(e) {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 360,
                height: 150,
                destWidth: 720,
                destHeight: 300,
                canvasId: "barCanvas",
                success: function success(res) {
                    bar.imgPath = res.tempFilePath;
                    that.setData({
                        "bar.imagePath": res.tempFilePath,
                        "bar.display": "none"
                    });
                }
            });
        });
    },
    drawBarBg: function drawBarBg(barCtx) {
        barCtx.setFillStyle("rgba(255,224,223,1)");
        barCtx.beginPath();
        barCtx.fillRect(bar.mCenter - 124, bar.hCenter - 65, bar.barW, bar.barH);
        barCtx.fillRect(bar.mCenter - 124, bar.hCenter - 35, bar.barW, bar.barH);
        barCtx.fillRect(bar.mCenter - 124, bar.hCenter - 5, bar.barW, bar.barH);
        barCtx.fillRect(bar.mCenter - 124, bar.hCenter + 25, bar.barW, bar.barH);
        barCtx.fillRect(bar.mCenter + 4, bar.hCenter - 65, bar.barW, bar.barH);
        barCtx.fillRect(bar.mCenter + 4, bar.hCenter - 35, bar.barW, bar.barH);
        barCtx.fillRect(bar.mCenter + 4, bar.hCenter - 5, bar.barW, bar.barH);
        barCtx.fillRect(bar.mCenter + 4, bar.hCenter + 25, bar.barW, bar.barH);
        barCtx.closePath();
    },
    drawBarRegion: function drawBarRegion(mData, color, barCtx) {
        var mbtiPercentage = this.data.mbti.mbtiPercentage;
        barCtx.setFillStyle(color);
        barCtx.beginPath();
        barCtx.setFontSize(10);
        //设置字体
                if (mData[0][1] > mData[1][1]) {
            barCtx.setFillStyle(color);
            barCtx.fillRect(bar.mCenter - 4 - bar.barW * mbtiPercentage.percentageE / 100, bar.hCenter - 65, bar.barW * mbtiPercentage.percentageE / 100, bar.barH);
            barCtx.setFillStyle("rgba(255,255,255,1)");
            barCtx.fillText(mbtiPercentage.percentageE + "%", bar.mCenter - 45, bar.hCenter - 54);
        } else {
            barCtx.setFillStyle(color);
            barCtx.fillRect(bar.mCenter + 4, bar.hCenter - 65, bar.barW * mbtiPercentage.percentageI / 100, bar.barH);
            barCtx.setFillStyle("rgba(255,255,255,1)");
            barCtx.fillText(mbtiPercentage.percentageI + "%", bar.mCenter + 7, bar.hCenter - 54);
        }
        if (mData[2][1] > mData[3][1]) {
            barCtx.setFillStyle(color);
            barCtx.fillRect(bar.mCenter - 4 - bar.barW * mbtiPercentage.percentageS / 100, bar.hCenter - 35, bar.barW * mbtiPercentage.percentageS / 100, bar.barH);
            barCtx.setFillStyle("rgba(255,255,255,1)");
            barCtx.fillText(mbtiPercentage.percentageS + "%", bar.mCenter - 45, bar.hCenter - 24);
        } else {
            barCtx.setFillStyle(color);
            barCtx.fillRect(bar.mCenter + 4, bar.hCenter - 35, bar.barW * mbtiPercentage.percentageN / 100, bar.barH);
            barCtx.setFillStyle("rgba(255,255,255,1)");
            barCtx.fillText(mbtiPercentage.percentageN + "%", bar.mCenter + 7, bar.hCenter - 24);
        }
        if (mData[4][1] > mData[5][1]) {
            barCtx.setFillStyle(color);
            barCtx.fillRect(bar.mCenter - 4 - bar.barW * mbtiPercentage.percentageT / 100, bar.hCenter - 5, bar.barW * mbtiPercentage.percentageT / 100, bar.barH);
            barCtx.setFillStyle("rgba(255,255,255,1)");
            barCtx.fillText(mbtiPercentage.percentageT + "%", bar.mCenter - 45, bar.hCenter + 6);
        } else {
            barCtx.setFillStyle(color);
            barCtx.fillRect(bar.mCenter + 4, bar.hCenter - 5, bar.barW * mbtiPercentage.percentageF / 100, bar.barH);
            barCtx.setFillStyle("rgba(255,255,255,1)");
            barCtx.fillText(mbtiPercentage.percentageF + "%", bar.mCenter + 7, bar.hCenter + 6);
        }
        if (mData[6][1] > mData[7][1]) {
            barCtx.setFillStyle(color);
            barCtx.fillRect(bar.mCenter - 4 - bar.barW * mbtiPercentage.percentageJ / 100, bar.hCenter + 25, bar.barW * mbtiPercentage.percentageJ / 100, bar.barH);
            barCtx.setFillStyle("rgba(255,255,255,1)");
            barCtx.fillText(mbtiPercentage.percentageJ + "%", bar.mCenter - 45, bar.hCenter + 36);
        } else {
            barCtx.setFillStyle(color);
            barCtx.fillRect(bar.mCenter + 4, bar.hCenter + 25, bar.barW * mbtiPercentage.percentageP / 100, bar.barH);
            barCtx.setFillStyle("rgba(255,255,255,1)");
            barCtx.fillText(mbtiPercentage.percentageP + "%", bar.mCenter + 7, bar.hCenter + 36);
        }
        barCtx.closePath();
    },
    // 绘制文字
    drawBarText: function drawBarText(mData, barCtx) {
        barCtx.setFillStyle("rgba(117,117,117,1)");
        barCtx.setFontSize(12);
        //设置字体
                barCtx.fillText(mData[0][0], bar.mCenter - 174, 21);
        barCtx.fillText(mData[1][0], bar.mCenter + 130, 21);
        barCtx.fillText(mData[2][0], bar.mCenter - 174, 51);
        barCtx.fillText(mData[3][0], bar.mCenter + 130, 51);
        barCtx.fillText(mData[4][0], bar.mCenter - 174, 81);
        barCtx.fillText(mData[5][0], bar.mCenter + 130, 81);
        barCtx.fillText(mData[6][0], bar.mCenter - 174, 111);
        barCtx.fillText(mData[7][0], bar.mCenter + 130, 111);
    },
    drawBarBottomText: function drawBarBottomText(mData, barCtx) {
        barCtx.setFillStyle("rgba(155,155,155,1)");
        barCtx.setFontSize(10);
        //设置字体
                for (var i = 0; i < mData.length; i++) {
            barCtx.fillText(mData[i], 248 / 7 * i + bar.mCenter - 118, bar.mH - 5);
        }
        barCtx.setStrokeStyle("rgba(204,204,204,1)");
        barCtx.setLineWidth(1);
        barCtx.moveTo(bar.mCenter - 124, bar.mH - 20);
        barCtx.lineTo(248 / 7 * 7 + bar.mCenter - 124, bar.mH - 20);
        barCtx.stroke();
        for (var _i = 0; _i < mData.length + 1; _i++) {
            barCtx.moveTo(248 / 7 * _i + bar.mCenter - 124, bar.mH - 20);
            barCtx.lineTo(248 / 7 * _i + bar.mCenter - 124, bar.mH - 25);
            barCtx.stroke();
        }
    },
    // ****************************横向柱状图结束**********************************************
    // ****************************柱+曲图-能力维度解析**********************************************
    drawLine: function drawLine(lineCtx) {
        var that = this;
        this.drawLineBg(lineCtx);
        //绘制横纵坐标框架
                this.drawLineRowText(line.lineText, lineCtx, "line");
        //绘制横坐标文字
                this.drawLineColText(line.lineColText, lineCtx);
        //绘制纵坐标文字
                this.drawLineHead(lineCtx);
        //绘制头部信息
                this.drawLineBar(line.lineData, lineCtx);
        //你的能力
                this.drawLineCurve(line.curveData, lineCtx);
        // 绘制柱状图->平均水平
                lineCtx.draw(false, function(e) {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 360,
                height: 280,
                destWidth: 720,
                destHeight: 300,
                canvasId: "lineCanvas",
                success: function success(res) {
                    line.imgPath = res.tempFilePath;
                    that.setData({
                        "line.imagePath": res.tempFilePath,
                        "line.display": "none"
                    });
                }
            });
        });
    },
    //绘制头部信息
    drawLineHead: function drawLineHead(lineCtx) {
        lineCtx.setFillStyle("#4A4A4A");
        lineCtx.setFontSize(14);
        //设置字体
                lineCtx.fillText("测评结果图", line.mCenter - 30, 15);
        lineCtx.beginPath();
        lineCtx.arc(line.mCenter + 80, 20, 6, 0, 360);
        lineCtx.setFillStyle("#FF8D8C");
        lineCtx.fill();
        lineCtx.beginPath();
        lineCtx.setFillStyle("#757575");
        lineCtx.setFontSize(12);
        //设置字体
                lineCtx.fillText("分数", line.mCenter + 90, 25);
        lineCtx.beginPath();
        lineCtx.rect(line.mCenter + 75, 35, 8, 2);
        lineCtx.setFillStyle("#EB533E");
        lineCtx.fill();
        lineCtx.beginPath();
        lineCtx.setFillStyle("#757575");
        lineCtx.setFontSize(12);
        //设置字体
                lineCtx.fillText("平均能力水平", line.mCenter + 90, 40);
    },
    drawLineBg: function drawLineBg(lineCtx) {
        lineCtx.setStrokeStyle("#cccccc");
        for (var i = 0; i < 5; i++) {
            lineCtx.moveTo(line.mCenter - 160, 50 + 45 * i);
            lineCtx.lineTo(line.mCenter + 160, 50 + 45 * i);
            lineCtx.stroke();
        }
        for (var j = 0; j < 9; j++) {
            lineCtx.moveTo(line.mCenter - 160 + line.mW / 9 * j, 230);
            lineCtx.lineTo(line.mCenter - 160 + line.mW / 9 * j, 235);
            lineCtx.stroke();
        }
    },
    // 绘制横坐标文字
    drawLineRowText: function drawLineRowText(mData, lineCtx, type) {
        lineCtx.setFillStyle("#9B9B9B");
        if (type == "line") {
            lineCtx.setFontSize(13);
            //设置字体
                        for (var i = 0; i < 8; i++) {
                lineCtx.fillText(mData[i][0], 25 + i * 40, 260);
                lineCtx.fillText(mData[i][1], 25 + i * 40, 275);
            }
        } else if (type == "curve") {
            lineCtx.setFontSize(12);
            //设置字体
                        for (var _i2 = 0; _i2 < 8; _i2++) {
                lineCtx.fillText(mData[_i2][0], 10 + _i2 * 45, 265);
                lineCtx.fillText(mData[_i2][1], 15 + _i2 * 45, 275);
            }
        }
    },
    //绘制纵坐标文字
    drawLineColText: function drawLineColText(data, lineCtx) {
        lineCtx.setFillStyle("#757575");
        lineCtx.setFontSize(12);
        //设置字体
                for (var i = 0; i < 5; i++) {
            lineCtx.fillText(data[i], line.mCenter - 180, 50 + 45 * i);
        }
    },
    // 绘制柱状图->你的能力
    drawLineBar: function drawLineBar(mData, lineCtx) {
        lineCtx.setFillStyle("#FF8D8C");
        for (var i = 0; i < 8; i++) {
            lineCtx.setGlobalAlpha(1 - (i + 1) / 10);
            lineCtx.fillRect(line.mW / 9 * (i + 1) - line.lineW / 2, 230 - mData[i] * (180 / 20), 15, mData[i] * (180 / 20));
        }
    },
    // 绘制曲线图->平均水平
    drawLineCurve: function drawLineCurve(mData, lineCtx) {
        line.points = [];
        for (var i = 0; i < mData.length; i++) {
            lineCtx.beginPath();
            lineCtx.setFillStyle("#E84B34");
            lineCtx.setGlobalAlpha(1);
            lineCtx.arc(line.mW / 9 * (i + 1) - line.lineW / 2 + 7, 230 - mData[i] * (180 / 20), 3, 0, 360);
            lineCtx.fill();
            line.points.push({
                x: line.mW / 9 * (i + 1) - line.lineW / 2 + 7,
                y: 230 - mData[i] * (180 / 20)
            });
        }
        this.drawPath(line.points, lineCtx);
    },
    drawPath: function drawPath(path, ctx) {
        ctx.setStrokeStyle("#E84B34");
        ctx.setGlobalAlpha(1);
        ctx.lineWidth = 2;
        ctx.moveTo(path[0].x, path[0].y);
        for (var i = 1; i < 8; i++) {
            ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.stroke();
    },
    // ****************************柱+曲图结束**********************************************
    // ****************************八边雷达图开始 职业倾向维度解析**********************************************
    drawCurve: function drawCurve(ctx) {
        var that = this;
        var cruveData = curve.curveData;
        var crueDataParent = curve.crueDataParent;
        this.drawCurveBg(ctx);
        this.drawCurvePoint(ctx);
        this.drawCurveText(cruveData, ctx);
        if (that.data.reportType == 1 || that.data.reportType == 2) {
            this.drawCurveCircle(cruveData, "#EB533E", ctx);
            this.drawCurveRegion(cruveData, "rgba(235,83,62,0.4)", ctx);
            //设置数据
                }
        if (that.data.reportType == 3 || that.data.reportType == 4) {
            this.drawCurveRegion(crueDataParent, "rgba(255,178,114,0.4)", ctx);
            //设置数据
                        this.drawCurveCircle(crueDataParent, "#FFB272", ctx);
        }
        ctx.draw(false, function(e) {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 360,
                height: 280,
                destWidth: 720,
                destHeight: 480,
                canvasId: "curveCanvas",
                success: function success(res) {
                    curve.imgPath = res.tempFilePath;
                    that.setData({
                        "curve.imagePath": res.tempFilePath,
                        "curve.display": "none"
                    });
                }
            });
        });
    },
    //画出八边形
    drawCurveBg: function drawCurveBg(ctx) {
        ctx.setStrokeStyle("#9b9b9b");
        ctx.moveTo(curve.mCenter + curve.mRadius / 3 * Math.sin(0), curve.hCenter + curve.mRadius / 3 * Math.cos(0));
        for (var i = 0; i < 4; i++) {
            //计算半径
            var rdius = curve.mRadius / 3 * (i + 1);
            //画8条线段
                        for (var j = 0; j < 9; j++) {
                //坐标
                var x = curve.mCenter + rdius * Math.sin(curve.mAngle * j);
                var y = curve.hCenter + rdius * Math.cos(curve.mAngle * j);
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
    },
    // 绘制连接点
    drawCurvePoint: function drawCurvePoint(ctx) {
        ctx.beginPath();
        for (var k = 0; k < 8; k++) {
            var x = curve.mCenter + (curve.mRadius + 30) * Math.sin(curve.mAngle * k);
            var y = curve.hCenter + (curve.mRadius + 30) * Math.cos(curve.mAngle * k);
            ctx.moveTo(curve.mCenter, curve.hCenter);
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    },
    //绘制文字
    drawCurveText: function drawCurveText(data, ctx) {
        ctx.setFillStyle("#555555");
        ctx.setFontSize(12);
        //设置字体
                for (var n = 0; n < 8; n++) {
            var x = curve.mCenter + curve.mRadius * Math.sin(curve.mAngle * n);
            var y = curve.hCenter + curve.mRadius * Math.cos(curve.mAngle * n);
            //通过不同的位置，调整文本的显示位置
                        if (n == 0) {
                ctx.fillText(data[0][0], x - 23, y + 45);
            } else if (n == 1) {
                ctx.fillText(data[1][0], x + 25, y + 35);
            } else if (n == 2) {
                ctx.fillText(data[2][0], x + 40, y + 5);
            } else if (n == 3) {
                ctx.fillText(data[3][0], x + 13, y - 30);
            } else if (n == 4) {
                ctx.fillText(data[4][0], x - 23, y - 35);
            } else if (n == 5) {
                ctx.fillText(data[5][0], x - 55, y - 30);
            } else if (n == 6) {
                ctx.fillText(data[6][0], x - 75, y + 5);
            } else if (n == 7) {
                ctx.fillText(data[7][0], x - 55, y + 40);
            }
        }
    },
    //设置数据
    drawCurveRegion: function drawCurveRegion(data, ctx) {
        ctx.beginPath();
        ctx.moveTo(curve.mCenter + curve.mRadius * Math.sin(0) * data[0][1] / 20, curve.hCenter + curve.mRadius * Math.cos(0) * data[0][1] / 20);
        for (var m = 0; m < 8; m++) {
            var x = curve.mCenter + curve.mRadius * Math.sin(curve.mAngle * m) * data[m][1] / 20;
            var y = curve.hCenter + curve.mRadius * Math.cos(curve.mAngle * m) * data[m][1] / 20;
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.setFillStyle(color);
        ctx.fill();
    },
    //画点
    drawCurveCircle: function drawCurveCircle(data, color, ctx) {
        var r = 5;
        //设置节点小圆点的半径
                for (var i = 0; i < 8; i++) {
            var x = curve.mCenter + curve.mRadius * Math.sin(curve.mAngle * i) * data[i][1] / 7.5;
            var y = curve.hCenter + curve.mRadius * Math.cos(curve.mAngle * i) * data[i][1] / 7.5;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.setFillStyle(color);
            ctx.fill();
        }
    }
}, _defineProperty(_Page, "drawCurveRegion", function drawCurveRegion(data, color, ctx) {
    ctx.beginPath();
    ctx.moveTo(curve.mCenter + curve.mRadius * Math.sin(0) * data[0][1] / 7.5, curve.hCenter + curve.mRadius * Math.cos(0) * data[0][1] / 7.5);
    for (var m = 0; m < 8; m++) {
        var x = curve.mCenter + curve.mRadius * Math.sin(curve.mAngle * m) * data[m][1] / 7.5;
        var y = curve.hCenter + curve.mRadius * Math.cos(curve.mAngle * m) * data[m][1] / 7.5;
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.setFillStyle(color);
    ctx.fill();
}), _defineProperty(_Page, "drawCake", function drawCake(ctx) {
    var that = this;
    var data = cake.cakeData;
    this.drawCakeCircle(data, ctx);
    //绘制各个学科扇形图
        this.drawCakeLine(data, ctx);
    ctx.draw(false, function(e) {
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 360,
            height: 290,
            destWidth: 720,
            destHeight: 300,
            canvasId: "cakeCanvas",
            success: function success(res) {
                cake.imgPath = res.tempFilePath;
                that.setData({
                    "cake.imagePath": res.tempFilePath,
                    "cake.display": "none"
                });
            }
        });
    });
}), _defineProperty(_Page, "drawCakeCircle", function drawCakeCircle(data, ctx) {
    var colorArr = [ "#FF8D8C", "#FFCD56", "#48AAEE", "#37A1EB", "#86D5FF", "#C8ECFF", "#FFD9DA", "#FFCACA", "#FFACAB" ];
    for (var i = 0; i < 9; i++) {
        //每一次画一次需要开启一个新的路径,不然颜色会重了;
        ctx.beginPath();
        //设置不同的颜色
                ctx.fillStyle = colorArr[i];
        //  设置起点
                ctx.moveTo(cake.mCenter, cake.hCenter);
        //画出了一个扇形 
                ctx.arc(cake.mCenter, cake.hCenter, data[i] * 13, i * (2 / 9) * Math.PI, (i + 1) * (2 / 9) * Math.PI);
        //ctx.arc(cake.mCenter, cake.hCenter, 90,i*(2/9)*Math.PI, (i+1)*(2/9)* Math.PI);
        //填充
                ctx.fill();
    }
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(cake.mCenter, cake.hCenter, 20, 0, 2 * Math.PI);
    ctx.fill();
}), _defineProperty(_Page, "drawCakeLine", function drawCakeLine(data, ctx) {
    var text = cake.cakeText;
    var colorArr = [ "#FF8D8C", "#FFCD56", "#48AAEE", "#37A1EB", "#86D5FF", "#C8ECFF", "#FFD9DA", "#FFCACA", "#FFACAB" ];
    for (var i = 0; i < 9; i++) {
        ctx.beginPath();
        ctx.rect(15 + i * 40, 250, 10, 5);
        ctx.setFillStyle(colorArr[i]);
        ctx.fill();
        ctx.setFillStyle("#9b9b9b");
        ctx.setFontSize(10);
        //设置字体
                ctx.fillText(text[i], 11 + i * 40, 270);
    }
}), _defineProperty(_Page, "swiperTab", function swiperTab(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
        current: index
    });
}), _defineProperty(_Page, "change", function change(e) {
    var index = e.detail.current;
    this.setData({
        current: index
    });
}), _defineProperty(_Page, "classDetail", function classDetail(e) {
    var code = e.currentTarget.dataset.code;
    var cityid = wx.getStorageSync("cityId").cityId;
    var url = "";
    if (code.length == 4) {
        url = "/packages/selectMajor/middleMajorDetail/middleMajorDetail?majorcode=" + code;
    } else if (code.length == 6) {
        url = "/ packages/selectMajor/majorDetail/majorDetail?majorcode=" + code + "&cityid=" + cityid;
    }
    wx.navigateTo({
        url: url
    });
}), _defineProperty(_Page, "scrollbottom", function scrollbottom() {
    if (!this.data.isHide) {
        this.setData({
            current: 1
        });
    }
}), _Page));