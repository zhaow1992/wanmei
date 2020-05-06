var app = getApp();

var api = require("../api.js");

var sensors = require("./../../../utils/sensors.js");

Page({
    scrollTop: 0,
    canvasData: [],
    canvasInfo: {
        space: 4,
        lineWeight: 2,
        scoreColor: "#ffffff",
        topSpace: 15
    },
    data: {
        focus: false,
        canvasLineImg: "",
        currectYear: 0,
        openNewVersionYear: 0,
        allLoading: true,
        showLoad: true,
        currentTab: 0,
        opacity: 0,
        config: null,
        canvas: {
            w: 350,
            h: 120
        },
        rankDescription: null,
        share: false,
        navigationText: "位次查询",
        navigationHome: true,
        sharePageBack: true,
        navStatusHeight: app.globalData.navigationCustomStatusHeight,
        navCapsuleHeight: app.globalData.navigationCustomCapsuleHeight,
        years: [],
        subset: [ "文科", "理科" ],
        subIndex: 0,
        jsSub: [],
        jsSubIndex: 0,
        index: 0,
        score: 0,
        scrollH: 0,
        userInfo: "",
        rankData: [],
        intoView: "",
        showLoading: false,
        showToast: false,
        scoreToast: false
    },
    onLoad: function onLoad(options) {
        var userInfo = wx.getStorageSync("userInfo");
        this.province = userInfo[0].Province;
        this.setData({
            userInfo: userInfo,
            score: wx.getStorageSync("userScore").total,
            rankDescription: app.globalData.infoConfig.rankDescription
        });
        switch (userInfo[0].courseType) {
          case 0:
            this.setData({
                subIndex: 1
            });
            break;

          default:
            this.setData({
                subIndex: 0
            });
            break;
        }
        this.QueryConfigs(userInfo[0].courseType);
        this.getScrollH();
    },
    //弹窗
    toast: function toast() {
        this.setData({
            showToast: !this.data.showToast
        });
    },
    scoreToast: function scoreToast() {
        this.setData({
            scoreToast: !this.data.scoreToast
        });
    },
    // 计算dom高度
    getScrollH: function getScrollH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.select("#head").boundingClientRect();
        item.exec(function(res) {
            that.setData({
                scrollH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
            });
        });
    },
    backIconButtonTap: function backIconButtonTap() {
        // if (this.properties.sharePageBack) {
        //   wx.switchTab({
        //     url: '/pages/index/index'
        //   })
        // } else {
        wx.navigateBack({
            delta: 1
        });
        // }
        },
    //切换年份
    bindPickerChange: function bindPickerChange(e) {
        var _this = this;
        this.setData({
            index: e.detail.value
        }, function() {
            if (_this.year != _this.data.years[e.detail.value]) {
                _this.year = _this.data.years[e.detail.value];
                _this.getCourseType();
                _this.JSBatch();
                _this.QueryEquivalents();
            }
        });
    },
    JSBatch: function JSBatch() {
        var that = this;
        var jsSub = [];
        var jsBzType = [];
        var courseIndex = 0;
        var configData = this.data.config[this.data.index];
        for (var m = 0, n = configData.courses.length; m < n; m++) {
            if (configData.courses[m].course == that.course) {
                that.bzType = configData.courses[m].bzTypes[0].bzType;
                for (var i = 0, j = configData.courses[m].bzTypes.length; i < j; i++) {
                    jsSub.push(configData.courses[m].bzTypes[i].bzTypeName);
                    jsBzType.push(configData.courses[m].bzTypes[i].bzType);
                }
                break;
            }
        }
        this.setData({
            jsSubIndex: 0,
            jsSub: jsSub,
            jsBzType: jsBzType
        });
    },
    getCourseType: function getCourseType() {
        if (this.data.config[this.data.index].courses.length > 1) {
            this.setData({
                subset: [ "文科", "理科" ]
            });
            this.course = this.data.subIndex == 0 ? 1 : 0;
            for (var i = 0, j = this.data.config[this.data.index].courses.length; i < j; i++) {
                if (this.course == this.data.config[this.data.index].courses[i].course) {
                    this.bzType = this.data.config[this.data.index].courses[i].bzTypes[0].bzType;
                    break;
                }
            }
        } else {
            this.setData({
                subset: []
            });
            this.course = -1;
            this.bzType = this.data.config[this.data.index].courses[0].bzTypes[0].bzType;
        }
        // let courseType = this.data.subset[this.data.subIndex];
        // if(courseType == "文科"){
        //   this.course = 1;
        // }else if(courseType == '理科'){
        //   this.course = 0;
        // }else{
        //   this.course = -1;
        // }
        },
    //切换文理科
    pickerSub: function pickerSub(e) {
        var _this2 = this;
        this.setData({
            subIndex: e.detail.value
        }, function() {
            var dataCourse = _this2.data.subIndex == 1 ? 0 : 1;
            if (_this2.course != dataCourse) {
                _this2.getCourseType();
                _this2.JSBatch();
                _this2.QueryEquivalents();
            }
        });
    },
    pickerJsSub: function pickerJsSub(e) {
        var _this3 = this;
        this.setData({
            jsSubIndex: e.detail.value
        }, function() {
            if (_this3.bzType != _this3.data.jsBzType[_this3.data.jsSubIndex]) {
                _this3.bzType = _this3.data.jsBzType[_this3.data.jsSubIndex];
                _this3.QueryEquivalents();
            }
        });
    },
    input: function input(e) {
        if (e.detail.value == "") {
            this.setData({
                score: 0
            });
        } else {
            this.setData({
                score: parseFloat(e.detail.value)
            });
        }
    },
    focusInput: function focusInput() {
        this.setData({
            focus: true
        });
    },
    bindblur: function bindblur() {
        this.setData({
            focus: false
        });
    },
    search: function search() {
        var _this4 = this;
        var that = this;
        var yfydsArr = that.data.rankData.yfyds;
        //  || that.data.score < yfydsArr[yfydsArr.length - 1].minScore
                if (that.data.score > yfydsArr[0].maxScore || that.data.score < yfydsArr[yfydsArr.length - 1].minScore) {
            wx.showToast({
                title: "分数范围" + yfydsArr[yfydsArr.length - 1].minScore + "-" + yfydsArr[0].maxScore,
                icon: "none"
            });
            return;
        }
        that.QueryEquivalents();
        var scoreInto = this.data.score;
        var list = [];
        that.data.rankData.yfyds.map(function(item) {
            list.push(item.score);
        });
        list.map(function(i) {
            if (list.indexOf(_this4.data.score) == -1) {
                if (typeof i == "string") {
                    var arr = i.split("~");
                    if (parseFloat(arr[0]) < parseFloat(that.data.score) && parseFloat(that.data.score) < parseFloat(arr[1])) {
                        scoreInto = arr[0];
                    }
                }
            }
        });
        if (typeof list[0] == "string") {
            var ar = list[0].split("~");
            if (that.data.score > ar[1]) {
                scoreInto = ar[0];
            }
        } else if (typeof list[0] == "number") {
            if (that.data.score > list[0]) {
                scoreInto = list[0];
            }
        }
        if (that.data.score < that.data.rankData.yfyds[that.data.rankData.yfyds.length - 1].score) {
            scoreInto = that.data.rankData.yfyds[that.data.rankData.yfyds.length - 1].score;
        }
        this.setData({
            intoView: scoreInto
        });
        var SA_years = that.data.years[that.data.index] + "";
        var SA_score_value = that.data.score;
        var SA_subject = that.data.subset.length > 0 ? that.data.subset[that.data.subIndex] : "不限";
        var SA_rank_value = "";
        var SA_persons = 0;
        var SA_province = that.data.userInfo[0].ProvinceName;
        var yfyds = that.data.rankData.yfyds;
        for (var i = 0; i < yfyds.length; i++) {
            if (scoreInto == yfyds[i].minScore) {
                SA_rank_value = yfyds[i].lowestRank;
                SA_persons = yfyds[i].sameNumber;
                break;
            }
        }
        var data = {
            SA_years: SA_years,
            SA_score_value: SA_score_value,
            SA_subject: SA_subject,
            SA_rank_value: SA_rank_value,
            SA_persons: SA_persons,
            SA_province: SA_province
        };
        app.sensors.track("RankInquire", sensors.RankInquire(data));
    },
    // 图表初始化数据
    canvasInit: function canvasInit() {
        var that = this;
        var w = that.data.canvas.w;
        var h = that.data.canvas.h;
        var space = that.canvasInfo.space;
        //空隙
                var bgW = w / 25 - space;
        var bgH = h - 30;
        //高
                var ctx = wx.createCanvasContext("line");
        // ctx.clearRect(0, 0, w, h);
                drawBg();
        drawLine();
        ctx.draw(false, function() {
            that.canvasBatch(ctx);
            //绘制批次
                });
        // 绘制背景
                function drawBg() {
            var grd = ctx.createLinearGradient(0, 15, 0, bgH + 15);
            grd.addColorStop(0, "rgba(255,255,255,0.02)");
            grd.addColorStop(1, "rgba(255,255,255,0.3)");
            ctx.setFillStyle(grd);
            for (var i = 0, j = 25; i < j; i++) {
                // ctx.setFillStyle(grd);
                ctx.fillRect(i * (bgW + space), 15, bgW, bgH);
            }
        }
        // 绘制曲线
                function drawLine() {
            var data = that.canvasData;
            var MaxY = Math.max.apply(Math, data.map(function(item) {
                return item.num;
            }));
            //取数据中num最大的，为Y轴最大值
                        var mData = [];
            for (var _i = 0, j = data.length; _i < j; _i++) {
                mData.push(data[_i].num);
            }
            var points = [];
            for (var _i2 = 0; _i2 < 25; _i2++) {
                points.push({
                    x: _i2 * bgW + _i2 * space + bgW / 2,
                    y: h - 15 - (bgH - that.canvasInfo.topSpace) / MaxY * mData[_i2]
                });
            }
            that.points = points;
            // 绘制线
                        ctx.setStrokeStyle("#FFD580");
            ctx.setLineWidth(that.canvasInfo.lineWeight);
            ctx.setLineCap("round");
            var int = 0;
            var point = getControlPoint(points);
            ctx.moveTo(points[0].x, points[0].y);
            for (var i = 0; i < points.length; i++) {
                if (i == 0) {
                    ctx.quadraticCurveTo(point[0].x, point[0].y, points[1].x, points[1].y);
                    int = int + 1;
                } else if (i < points.length - 2) {
                    ctx.bezierCurveTo(point[int].x, point[int].y, point[int + 1].x, point[int + 1].y, points[i + 1].x, points[i + 1].y);
                    int += 2;
                } else if (i == points.length - 2) {
                    ctx.quadraticCurveTo(point[point.length - 1].x, point[point.length - 1].y, points[points.length - 1].x, points[points.length - 1].y);
                }
            }
            ctx.stroke();
        }
    },
    // 绘制当前文理批次背景，单拿出来方便操作
    canvasBatch: function canvasBatch(ctx) {
        var that = this;
        var score = that.data.score;
        var data = that.canvasData;
        var points = that.points;
        var w = that.data.canvas.w;
        var h = that.data.canvas.h;
        var subIndex = that.data.subIndex;
        var batch = that.batch;
        var space = that.canvasInfo.space;
        //空隙
                var bgW = w / 25 - space;
        var bgH = h - 30;
        //高
                ctx.setTextAlign("center");
        ctx.setLineWidth(1);
        // ctx.setStrokeStyle(that.canvasInfo.scoreColor);
                ctx.setFontSize(8);
        // *******绘制批次********
                for (var m = 0, n = batch.length; m < n; m++) {
            for (var i = 0, j = data.length; i < j; i++) {
                if (batch[m].score >= data[i].minS && batch[m].score <= data[i].maxS) {
                    ctx.setTextBaseline("top");
                    ctx.setFillStyle("rgba(255,255,255,0.3)");
                    ctx.fillRect(i * (bgW + space), 15 + bgH / 2, bgW, bgH / 2);
                    if (points[i].x < 10) {
                        ctx.setTextAlign("left");
                        ctx.setFillStyle("rgba(255,255,255,1)");
                        ctx.fillText(batch[m].batchName, 0, 10);
                    } else {
                        ctx.setFillStyle("rgba(255,255,255,1)");
                        ctx.fillText(batch[m].batchName, points[i].x, 10);
                    }
                    break;
                }
            }
        }
        ctx.draw(true, function() {
            that.canvasScore(ctx);
            //绘制分数的圆点
                });
        // ********绘制批次结束********
        },
    // 绘制当前分数点，单拿出来方便操作
    canvasScore: function canvasScore(ctx) {
        var that = this;
        var score = that.data.score;
        var data = that.canvasData;
        var points = that.points;
        var w = that.data.canvas.w;
        var h = that.data.canvas.h;
        var space = that.canvasInfo.space;
        //空隙
                var bgW = w / 25 - space;
        var bgH = h - 30;
        //高
        // ********绘制分数的圆点********
                ctx.setLineWidth(1);
        ctx.setTextBaseline("bottom");
        ctx.setFontSize(8);
        // ctx.setStrokeStyle(that.canvasInfo.scoreColor);
                var leftX = 0;
        if (score < that.data.rankData.yfyds[that.data.rankData.yfyds.length - 1].minScore) {
            ctx.setTextAlign("left");
            ctx.fillText(that.canvasData[0].maxS, 0, h - 3);
        } else {
            for (var i = 0, j = data.length; i < j; i++) {
                // if (score < data[0].minS) {
                //   leftX = points[0].x;
                //   ctx.setFillStyle('#FFD580');
                //   ctx.fillRect(i * (bgW + space), points[0].y, bgW, bgH - points[0].y + 15);
                //   ctx.setFillStyle('#ffffff');
                //   ctx.setShadow(0, 0, 5, 'rgba(255,213,128,0.4)');
                //   if (points[0].y < 10) {
                //     ctx.setTextAlign('left');
                //   }
                //   ctx.arc(points[0].x, points[0].y, 5, 0, 2 * Math.PI);
                //   ctx.fill();
                //   ctx.fillText(score, 0, h - 3);
                //   break;
                // } else 
                if (score >= data[i].minS && score <= data[i].maxS) {
                    leftX = points[i].x;
                    ctx.setFillStyle("#FFD580");
                    ctx.fillRect(i * (bgW + space), points[i].y, bgW, bgH - points[i].y + 15);
                    ctx.setFillStyle("#ffffff");
                    ctx.setShadow(0, 0, 5, "rgba(255,213,128,0.4)");
                    ctx.arc(points[i].x, points[i].y, 5, 0, 2 * Math.PI);
                    ctx.setTextAlign("center");
                    if (score >= 0 && score <= 750) {
                        if (points[i].x < 10) {
                            ctx.setTextAlign("left");
                            ctx.fillText(score, 0, h - 3);
                        } else {
                            ctx.fillText(score, points[i].x, h - 3);
                        }
                    }
                    ctx.fill();
                    break;
                }
            }
        }
        if (leftX > 20) {
            ctx.setTextAlign("left");
            ctx.fillText(that.canvasData[0].maxS, 0, h - 3);
        }
        if (w - leftX > 30) {
            ctx.setTextAlign("right");
            ctx.fillText(that.canvasData[24].minS, w, h - 3);
        }
        ctx.stroke();
        ctx.draw(true, function() {
            setTimeout(function() {
                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: that.data.canvas.w,
                    height: that.data.canvas.h,
                    destWidth: that.data.canvas.w * 2,
                    destHeight: that.data.canvas.h * 2,
                    canvasId: "line",
                    success: function success(res) {
                        that.setData({
                            canvasLineImg: res.tempFilePath
                        });
                    }
                });
            }, 200);
        });
        // ********绘制分数的圆点结束********
        },
    QueryEquivalents: function QueryEquivalents() {
        var _this5 = this;
        var that = this;
        that.setData({
            showLoad: true
        });
        var data = {
            provinceId: that.province,
            year: that.year,
            bzType: that.bzType,
            course: that.course,
            score: that.data.score,
            isFillPcl: true,
            isFillYFYD: true
        };
        api.QueryEquivalents("ScoreLines/YFYD/QueryEquivalents", "POST", data).then(function(res) {
            if (res.isSuccess) {
                that.batch = res.result.plcs;
                if (res.result.yfyds) {
                    that.canvasData = [];
                    res.result.yfyds.sort(function(a, b) {
                        return b.maxScore - a.maxScore;
                    });
                    res.result.yfyds.map(function(item) {
                        item.score = item.minScore == item.maxScore ? item.maxScore : item.minScore + "~" + item.maxScore;
                    });
                    var yfydsArr = res.result.yfyds;
                    var num = parseInt((yfydsArr[0].maxScore - yfydsArr[yfydsArr.length - 1].minScore) / 25);
                    /* 等分成25份 */                    var currentIndex = yfydsArr.length - 1;
                    var minS = 0;
                    var maxS = 0;
                    for (var i = 0, j = 25; i < j; i++) {
                        var sameNumber = 0;
                        var m = 0;
                        if (i == 24) {
                            while (1) {
                                if (currentIndex < 0) {
                                    break;
                                }
                                if (m == 0) {
                                    maxS = yfydsArr[currentIndex].maxScore;
                                }
                                sameNumber += yfydsArr[currentIndex].sameNumber;
                                var yfydScore = yfydsArr[currentIndex].maxScore - yfydsArr[currentIndex].minScore + 1;
                                m += yfydScore;
                                minS = yfydsArr[currentIndex].minScore;
                                --currentIndex;
                            }
                        } else {
                            while (m < num) {
                                if (currentIndex < 0) {
                                    break;
                                }
                                if (m == 0) {
                                    minS = yfydsArr[currentIndex].minScore;
                                }
                                sameNumber += yfydsArr[currentIndex].sameNumber;
                                var _yfydScore = yfydsArr[currentIndex].maxScore - yfydsArr[currentIndex].minScore + 1;
                                m += _yfydScore;
                                maxS = yfydsArr[currentIndex].maxScore;
                                --currentIndex;
                            }
                        }
                        that.canvasData.push({
                            maxS: maxS,
                            minS: minS,
                            num: sameNumber
                        });
                    }
                    that.canvasData.reverse();
                }
                res.result.equivalents.sort(function(a, b) {
                    return b.year - a.year;
                });
                var equivalents = [ [], [] ];
                for (var _i3 = 0, _j = res.result.equivalents.length; _i3 < _j; _i3++) {
                    if (res.result.equivalents[_i3].course == 0) {
                        equivalents[0].push(res.result.equivalents[_i3]);
                    } else {
                        equivalents[1].push(res.result.equivalents[_i3]);
                    }
                }
                _this5.setData({
                    equivalents: equivalents,
                    rankData: res.result,
                    showLoading: false
                }, function() {
                    if (res.result.yfyds) {
                        that.canvasInit();
                    }
                });
                that.setData({
                    showLoad: false
                });
            } else {
                wx.showToast({
                    title: res.message,
                    icon: "none"
                });
                that.setData({
                    showLoad: false
                });
            }
        });
    },
    // 查询一分一段年份及分类配置
    QueryConfigs: function QueryConfigs(course) {
        var that = this;
        api.QueryConfigs("ScoreLines/YFYD/QueryConfigs", "POST", that.province).then(function(res) {
            var currectDate = new Date();
            var currectYear = currectDate.getFullYear();
            that.setData({
                config: res.result.years.reverse(),
                openNewVersionYear: res.result.openNewVersionYear,
                currectYear: currectYear
            });
            var data = res.result.years;
            var year = [];
            var courseIndex = 0;
            for (var i = 0, j = data[0].courses.length; i < j; i++) {
                if (data[0].courses[i].course == course) {
                    courseIndex = i;
                    break;
                }
            }
            for (var _i4 = 0, _j2 = data.length; _i4 < _j2; _i4++) {
                year.push(data[_i4].year);
            }
            that.year = data[0].year;
            that.course = data[0].courses.length > 1 ? data[0].courses[courseIndex].course : -1;
            that.bzType = data[0].courses[courseIndex].bzTypes[0].bzType;
            if (that.course == -1) {
                that.setData({
                    subset: []
                });
            }
            if (data[0].courses.length <= 1) {
                that.setData({
                    subset: []
                });
            }
            var jsSub = [];
            var jsBzType = [];
            for (var _i5 = 0, _j3 = data[0].courses[courseIndex].bzTypes.length; _i5 < _j3; _i5++) {
                jsSub.push(data[0].courses[courseIndex].bzTypes[_i5].bzTypeName);
                jsBzType.push(data[0].courses[courseIndex].bzTypes[_i5].bzType);
            }
            that.setData({
                years: year,
                jsSub: jsSub,
                jsBzType: jsBzType,
                allLoading: false
            });
            that.QueryEquivalents();
        });
    },
    onPageScroll: function onPageScroll(e) {
        this.setData({
            opacity: e.scrollTop
        });
    },
    swiperNav: function swiperNav(e) {
        this.setData({
            currentTab: e.currentTarget.dataset.current
        });
    },
    // 切换选项卡
    changeSwiper: function changeSwiper(e) {
        this.setData({
            currentTab: e.detail.current
        });
    }
});

// 折线变曲线
var Vector2 = function Vector2(x, y) {
    this.x = x;
    this.y = y;
};

Vector2.prototype = {
    length: function length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    normalize: function normalize() {
        var inv = 1 / this.length() == Infinity ? 0 : 1 / this.length();
        return new Vector2(this.x * inv, this.y * inv);
    },
    add: function add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    },
    multiply: function multiply(f) {
        return new Vector2(this.x * f, this.y * f);
    },
    dot: function dot(v) {
        return this.x * v.x + this.y * v.y;
    },
    angle: function angle(v) {
        return Math.acos(this.dot(v) / (this.length() * v.length())) * 180 / Math.PI;
    }
};

function getControlPoint(path) {
    var rt = .3;
    var count = path.length - 2;
    var arr = [];
    for (var i = 0; i < count; i++) {
        var a = path[i];
        var b = path[i + 1];
        var c = path[i + 2];
        var v1 = new Vector2(a.x - b.x, a.y - b.y);
        var v2 = new Vector2(c.x - b.x, c.y - b.y);
        var v1Len = v1.length();
        var v2Len = v2.length();
        var centerV = v1.normalize().add(v2.normalize()).normalize();
        var ncp1 = new Vector2(centerV.y, centerV.x * -1);
        var ncp2 = new Vector2(centerV.y * -1, centerV.x);
        if (ncp1.angle(v1) < 90) {
            var p1 = ncp1.multiply(v1Len * rt).add(b);
            var p2 = ncp2.multiply(v2Len * rt).add(b);
            arr.push(p1, p2);
        } else {
            var _p = ncp1.multiply(v2Len * rt).add(b);
            var _p2 = ncp2.multiply(v1Len * rt).add(b);
            arr.push(_p2, _p);
        }
    }
    return arr;
}