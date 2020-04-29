var app = getApp();

var api = require("./../api.js");

var curve = {
    points: []
};

var screenWidth = app.globalData.systemInfo.screenWidth;

var pieInitData = {
    //环形饼图默认初始数据
    mW: .9 * screenWidth / 2,
    mH: .6 * screenWidth / 2,
    r: .15 * screenWidth,
    lineW: .07 * screenWidth,
    chink: 2 * Math.PI / 180,
    /* 环形间距 */
    outSpot: .067 * screenWidth,
    //伸出去点的长度
    outLine: .1 * screenWidth,
    //伸出去线的长度
    signR: .008 * screenWidth,
    //点半径
    fontSize: .03 * screenWidth,
    //字体大小
    textSpace: .025 * screenWidth,
    //文字上下与线的间距
    speed: 2 * Math.PI / 30,
    /* 速度 */
    moneyColorArr: [ "#FF7573", "#7a95ff", "#0F8EE9", "#44d7b6", "#62D174", "#f2d510", "#FEBE3D", "#FFBE9B" ],
    colorArr: [ "#FF7573", "#F2D510", "#FEBE3D", "#FFBE9B" ]
};

var eduData = [];

var seniorityData = [];

var salaryScaleData = [];

var lineInitData = {
    //折线图默认初始数据
    W: .9 * screenWidth,
    H: .5 * screenWidth,
    offSetY: .1 * screenWidth,
    lineCoverH: .2 * screenWidth,
    signR: .008 * screenWidth
};

Page({
    data: {
        share: false,
        pieData: {
            pieW: 0,
            //环形图宽-动态
            pieH: 0
        },
        lineData: {
            W: 0,
            //折线图宽-动态
            H: 0
        },
        showLoad: true,
        requestFlag: true,
        pageIndex: 1,
        topNum: 0,
        salaryInfo: 0,
        salaryRank: 0,
        situation: 0,
        scrollLeft: 0,
        currentTab: 0,
        swiperH: 0,
        canvasWidth: 375,
        canvasHeight: 200,
        salaryRankHeight1: 360,
        salaryRankHeight2: 360,
        demandHeight: 360,
        postName: "",
        postName1: "",
        jobList: [],
        postList: [],
        jobDesc: {},
        //职业简介
        relationSubList: []
    },
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        if (res.from === "button") {}
        return {
            title: "我正在看" + that.data.jobDesc.name + "的介绍",
            imageUrl: "http://wmei-appfile.cn-bj.ufileos.com/share_occupation.png",
            path: "/packages/selectMajor/professionDesc/professionDesc?code=" + that.data.code + "&share=true"
        };
    },
    goSubjectDetail: function goSubjectDetail(e) {
        var code = e.currentTarget.dataset.code;
        var cityid = wx.getStorageSync("cityId").cityId;
        wx.navigateTo({
            url: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + code + "&cityid=" + cityid
        });
    },
    //点击相关职业重新加载职业信息
    getprofessionInfo: function getprofessionInfo(e) {
        var code = e.currentTarget.dataset.code;
        this.setData({
            topNum: 0,
            scrollLeft: 0,
            salaryInfo: 0,
            salaryRank: 0,
            situation: 0,
            code: code
        });
        this.getProfessionDesc(code);
    },
    //点击相关岗位列表
    gorelationPost: function gorelationPost(e) {
        var that = this;
        var name = e.currentTarget.dataset.name;
        that.data.postList.forEach(function(ele) {
            if (ele.name == name) {
                ele.flag = true;
                that.setData({
                    postName: name
                });
            } else {
                ele.flag = false;
            }
        });
        that.setData({
            postList: that.data.postList,
            salaryInfo: 0,
            salaryRank: 0,
            situation: 0,
            currentTab: 1
        });
        var index = void 0;
        that.data.postList.forEach(function(ele, idx) {
            if (name == ele.name) {
                index = idx;
            }
        });
        that.getScrollLeft(index, that);
        //计算偏移位置
        },
    //查看更多排行
    getSalaryRankHeight: function getSalaryRankHeight(e) {
        var type = e.currentTarget.dataset.type;
        if (type == "salaryRank1") {
            if (this.data.salaryRankHeight1 == 360) {
                this.setData({
                    salaryRankHeight1: "auto"
                });
            } else {
                this.setData({
                    salaryRankHeight1: 360
                });
            }
        } else if (type == "salaryRank2") {
            if (this.data.salaryRankHeight2 == 360) {
                this.setData({
                    salaryRankHeight2: "auto"
                });
            } else {
                this.setData({
                    salaryRankHeight2: 360
                });
            }
        } else if (type == "demand") {
            if (this.data.demandHeight == 360) {
                this.setData({
                    demandHeight: "auto"
                });
            } else {
                this.setData({
                    demandHeight: 360
                });
            }
        }
    },
    //点击岗位
    choosePost: function choosePost(e) {
        var that = this;
        var name = e.currentTarget.dataset.name;
        var index = e.currentTarget.dataset.index;
        that.getScrollLeft(index, that);
        that.data.postList.forEach(function(ele) {
            if (ele.name == name) {
                ele.flag = true;
            } else {
                ele.flag = false;
            }
        });
        if (name == this.data.postName) return;
        that.setData({
            postList: that.data.postList,
            postName: name,
            postName1: name
        });
        that.getWorkSituation(name);
    },
    //计算nav滚动距离
    getScrollLeft: function getScrollLeft(index, that) {
        wx.createSelectorQuery().selectAll(".postlist").boundingClientRect(function(rect) {
            var width = 0;
            // 获取计算当前点击的标签距离左侧的距离
                        for (var i = 0; i < index; i++) {
                width += rect[i].width + 15;
            }
            // 当大于屏幕一半的宽度滚动，否则就设置位置为0
                        var clientWidth = wx.getSystemInfoSync().windowWidth / 2;
            if (width > clientWidth) {
                that.setData({
                    scrollLeft: width + rect[index].width / 2 - clientWidth
                });
            } else {
                that.setData({
                    scrollLeft: 0
                });
            }
        }).exec();
    },
    changeTab: function changeTab(e) {
        var type = e.currentTarget.dataset.type;
        var current = e.currentTarget.dataset.current;
        if (type == "salaryinfo") {
            if (current == 0) {
                this.setData({
                    salaryInfo: 0
                });
            } else {
                this.setData({
                    salaryInfo: 1
                });
            }
        } else if (type == "salaryRank") {
            if (current == 0) {
                this.setData({
                    salaryRank: 0
                });
            } else {
                this.setData({
                    salaryRank: 1
                });
            }
        } else if (type == "situation") {
            if (current == 0) {
                this.setData({
                    situation: 0
                });
            } else {
                this.setData({
                    situation: 1
                });
            }
        }
    },
    //查看全部
    showMore: function showMore(e) {
        var index = e.currentTarget.dataset.id;
        this.data.showMoreFlag[index] = !this.data.showMoreFlag[index];
        this.setData({
            showMoreFlag: this.data.showMoreFlag
        });
    },
    onLoad: function onLoad(options) {
        this.setData({
            code: options.code,
            "pieData.pieW": .9 * screenWidth,
            "pieData.pieH": .6 * screenWidth,
            "lineData.W": .9 * screenWidth,
            "lineData.H": .5 * screenWidth
        });
        if (options && options.share) {
            this.setData({
                share: true
            });
        }
        //获取职业信息
                this.getProfessionDesc(options.code);
        // this.getpostInfo(options.code);
        },
    //获取职业介绍
    getProfessionDesc: function getProfessionDesc(code) {
        var that = this;
        api.getProfessionDesc("Careers/GetJobDetail", "POST", code).then(function(res) {
            if (res.isSuccess) {
                if (res.result.relationPost.length !== 0) {
                    res.result.relationPost.forEach(function(ele, index) {
                        if (index == 0) {
                            ele.flag = true;
                        } else {
                            ele.flag = false;
                        }
                        ele.salaryMax = transfformMoney(ele.salaryMax);
                        ele.salaryMin = transfformMoney(ele.salaryMin);
                    });
                    // that.setData({
                    //   postName: res.result.relationPost[0].name
                    // })
                                }
                var value = "";
                value = "从事的工作主要包括：";
                res.result.infoDetail = res.result.infoDetail.replace(new RegExp(value, "g"), '<span style="font-size:28rpx;color:#212121;margin:8px 0;display:inline-block;">从事的工作主要包括：</span>');
                value = "下列工种归入本职业：";
                res.result.infoDetail = res.result.infoDetail.replace(new RegExp(value, "g"), '<span style="font-size:28rpx;color:#212121;margin:8px 0;display:inline-block;">下列工种归入本职业：</span>');
                that.setData({
                    jobDesc: res.result,
                    pageIndex: 1,
                    requestFlag: true,
                    relationSubList: [],
                    showLoad: false
                });
                //获取相关专业
                // that.getrelationSub(res.result.code, 1);
                                that.getSwiperH(0);
                that.getpostInfo(code);
            }
        });
    },
    //获取岗位列表
    getpostInfo: function getpostInfo(code) {
        var that = this;
        api.getpostInfo("Careers/QueryBriefPostSalary", "POST", code).then(function(res) {
            if (res.isSuccess) {
                if (res.result.length !== 0) {
                    res.result.forEach(function(ele, index) {
                        if (index == 0) {
                            ele.flag = true;
                        } else {
                            ele.flag = false;
                        }
                        ele.salaryMax = transfformMoney(ele.salaryMax);
                        ele.salaryMin = transfformMoney(ele.salaryMin);
                    });
                    that.setData({
                        postList: res.result,
                        postName: res.result[0].name
                    });
                }
            }
        });
    },
    //分页加载
    loadMore: function loadMore() {
        var pageIndex = this.data.pageIndex;
        var code = this.data.jobDesc.code;
        if (this.data.requestFlag) {
            pageIndex++;
            // this.getrelationSub(code, pageIndex);
                        this.setData({
                pageIndex: pageIndex
            });
        }
    },
    //获取就业岗位信息
    getWorkSituation: function getWorkSituation(name) {
        var that = this;
        wx.showLoading();
        name = encodeURI(name);
        api.getWorkSituation("Careers/GetPostSalaryDetail", "POST", name).then(function(res) {
            if (res.isSuccess) {
                if (res.result.description !== 0) {
                    that.setData({
                        description: res.result.description
                    });
                }
                if (res.result.detail.salary.salaryScale.length !== 0) {
                    res.result.detail.salary.salaryScale.forEach(function(ele) {
                        ele.max = transfformMoney(ele.max);
                        ele.min = transfformMoney(ele.min);
                    });
                }
                if (res.result.detail.competitionIndustry.length !== 0) {
                    that.setData({
                        salaryRank: 0
                    });
                    res.result.detail.competitionIndustry.forEach(function(ele) {
                        ele.money = transfformMoney(ele.money);
                    });
                } else {
                    that.setData({
                        salaryRank: 1
                    });
                }
                if (res.result.detail.competitionRegion.length !== 0) {
                    res.result.detail.competitionRegion.forEach(function(ele) {
                        ele.money = transfformMoney(ele.money);
                    });
                }
                if (res.result.detail.edu.length !== 0) {
                    that.setData({
                        situation: 0
                    });
                } else {
                    that.setData({
                        situation: 1
                    });
                }
                // res.result.detail.experience = [];
                // res.result.detail.seniority = [];
                                that.setData({
                    workSituation: res.result.detail
                }, function() {
                    that.drawLine(res.result.detail.experience);
                    var edu = that.arrInit(res.result.detail, "edu");
                    var seniority = that.arrInit(res.result.detail, "seniority");
                    var salaryScale = that.arrInit(res.result.detail, "salaryScale");
                    eduData = edu;
                    seniorityData = seniority;
                    salaryScaleData = salaryScale;
                    if (edu.length > 0) {
                        that.drawPie("edu", edu);
                    }
                    if (seniority.length > 0) {
                        that.drawPie("seniority", seniority);
                    }
                    if (salaryScale.length > 0) {
                        that.drawPie("salaryScale", salaryScale);
                    }
                });
            }
            wx.hideLoading();
        });
    },
    //获取相关专业
    // getrelationSub(code, pageIndex) {
    //   let that = this;
    //   api.getrelationSub('Careers/GetCounterpartMajorPaging', 'POST', code, pageIndex).then(res => {
    //     if (res.isSuccess) {
    //       if (res.result.items.length == 0) {
    //         that.setData({
    //           requestFlag: false
    //         })
    //         return;
    //       }
    //       res.result.items.forEach(ele => {
    //         ele.levels = JSON.parse(ele.levels);
    //       })
    //       that.setData({
    //         relationSubList: that.data.relationSubList.concat(res.result.items),
    //         relationCount: res.result.totalCount
    //       })
    //     }
    //   })
    // },
    // 
    arrInit: function arrInit(res, item) {
        var data = [];
        switch (item) {
          case "edu":
            res.edu.forEach(function(item, i) {
                data.push({
                    value: item.edu,
                    ratio: item.ratio
                });
            });
            break;

          case "seniority":
            res.seniority.forEach(function(item, i) {
                data.push({
                    value: item.seniority,
                    ratio: item.ratio
                });
            });
            break;

          case "salaryScale":
            res.salary.salaryScale.forEach(function(item, i) {
                data.push({
                    value: item.min + "-" + item.max + "/月",
                    ratio: item.ratio
                });
            });
            break;
        }
        data = data.sort(app.compare("ratio"));
        return data.reverse();
    },
    // 计算swiper高度
    getSwiperH: function getSwiperH(index) {
        var that = this;
        var item = wx.createSelectorQuery();
        item.select("#nav").boundingClientRect();
        item.exec(function(res) {
            that.setData({
                swiperH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
            });
        });
    },
    changeSwiper: function changeSwiper(e) {
        this.setData({
            currentTab: e.detail.current
        });
        if (e.detail.current == 1) {
            if (this.data.postList.length !== 0) {
                var postName = this.data.postName;
                if (postName == "") {
                    postName = this.data.postList[0].name;
                }
                if (this.data.postName1 !== postName) {
                    this.getWorkSituation(postName);
                }
                this.setData({
                    postName1: postName
                });
            }
        }
    },
    changeMoneySwiper: function changeMoneySwiper(e) {
        this.setData({
            moneyCurrentTab: e.detail.current
        });
        this.getSwiperH(this.data.moneyCurrentTab);
    },
    // 切换选项卡
    swiperNav: function swiperNav(e) {
        if (this.data.currentTab === e.currentTarget.dataset.current) {
            return;
        } else {
            this.setData({
                currentTab: e.currentTarget.dataset.current
            });
        }
    },
    //折线图
    drawLine: function drawLine(salaryInfo) {
        // let ctx = wx.createCanvasContext('salaryAdd');
        // drawX();
        // drawSpotLine();
        // drawSpot();
        // // 绘制坐标
        // function drawX(){
        //   ctx.beginPath();
        //   ctx.setStrokeStyle('#F6F6F6');
        //   ctx.moveTo(0, lineInitData.H - lineInitData.offSetY);
        //   ctx.lineTo(lineInitData.W, lineInitData.H - lineInitData.offSetY);
        //   // ctx.stroke();
        //   let offSetX = lineInitData.W / salaryInfo.length;
        //   ctx.setTextAlign('center');
        //   ctx.setFillStyle('#757575');
        //   let fontSize = 11 / 375 * screenWidth;
        //   let textTopOffset = 20 / 375 * screenWidth;
        //   ctx.setFontSize(fontSize);
        //   for (let i = 0; i < salaryInfo.length;i++){
        //     ctx.fillText(salaryInfo[i].year, i * offSetX + offSetX / 2, lineInitData.H - lineInitData.offSetY + textTopOffset)
        //   }
        //   ctx.stroke();
        // }
        // // 绘制线
        // function drawSpotLine(){
        //   // ctx.beginPath();
        //   // ctx.setStrokeStyle('#F39900');
        //   // let max = Math.max.apply(Math, salaryInfo.map(function (ele) {
        //   //   return ele.salary
        //   // }))
        //   // let min = Math.min.apply(Math, salaryInfo.map(function (ele) {
        //   //   return ele.salary
        //   // }))
        //   // let scaleH = lineInitData.lineCoverH / (max - min);
        //   // let offSetX = lineInitData.W / salaryInfo.length;
        //   // ctx.moveTo(offSetX / 2, lineInitData.lineCoverH - scaleH * (salaryInfo[0].salary - min) + lineInitData.offSetY);
        //   // for (let i = 0; i < salaryInfo.length;i++){
        //   //   // ctx.arc(i * offSetX + offSetX / 2 - lineInitData.signR / 2, lineInitData.lineCoverH - scaleH * (salaryInfo[i].salary - min) - lineInitData.signR / 2, lineInitData.signR, 0, 2 * Math.PI);
        //   //   ctx.lineTo(i * offSetX + offSetX / 2, lineInitData.lineCoverH - scaleH * (salaryInfo[i].salary - min) + lineInitData.offSetY);
        //   // }
        //   // ctx.stroke();
        //   // ctx.beginPath();
        //   // for (let i = 0; i < salaryInfo.length; i++) {
        //   //   ctx.arc(i * offSetX + offSetX / 2 - lineInitData.signR / 2, lineInitData.lineCoverH - scaleH * (salaryInfo[i].salary - min) - lineInitData.signR / 2, lineInitData.signR, 0, 2 * Math.PI);
        //   // }
        //   // // ctx.fill();
        //   // ctx.draw(true);
        // }
        var screenWidth = wx.getSystemInfoSync().windowWidth;
        //最大值
                var max = Math.max.apply(Math, salaryInfo.map(function(ele) {
            return ele.salary;
        }));
        // this.setData({
        //   canvasWidth: screenWidth
        // })
                var xRate = screenWidth / salaryInfo.length;
        var yRate = (this.data.canvasHeight - 100) / max;
        var that = this;
        var context = wx.createContext();
        context.setStrokeStyle("#f4a218");
        context.setLineWidth(3.5);
        curve.points = [];
        salaryInfo.forEach(function(ele, index) {
            curve.points.push({
                x: index * xRate + xRate / 2,
                y: 150 - ele.salary * yRate
            });
        });
        that.drawCurvePath(curve.points, context);
        context.stroke();
        //X坐标
                context.setStrokeStyle("#f6f6f6");
        context.setLineWidth(1);
        context.moveTo(0, 160);
        context.lineTo(screenWidth, 160);
        context.stroke();
        //横坐标文字
                context.setFontSize(11);
        context.setFillStyle("#757575");
        context.setTextAlign("center");
        salaryInfo.forEach(function(ele, index) {
            context.fillText(ele.year, index * xRate + xRate / 2, 180);
        });
        //薪资数
                context.setFillStyle("#f39900");
        context.setFontSize(12);
        salaryInfo.forEach(function(ele, index) {
            context.fillText(ele.salary, index * xRate + xRate / 2, 150 - ele.salary * yRate - 10);
        });
        context.closePath();
        //填充路径
                context.fill();
        context.stroke();
        wx.drawCanvas({
            canvasId: "salaryAdd",
            actions: context.getActions()
        });
        setTimeout(function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 375,
                height: 200,
                destWidth: 750,
                destHeight: 600,
                canvasId: "salaryAdd",
                success: function success(res) {
                    that.setData({
                        salaryAddImg: res.tempFilePath
                    });
                }
            });
        }, 300);
    },
    // 绘制曲线背景
    drawCurvePath: function drawCurvePath(path, ctx) {
        var point = getControlPoint(path);
        ctx.beginPath();
        var gradient = ctx.createLinearGradient(300, 100, 300, 160);
        gradient.addColorStop("0", "rgba(243,153,0,0.22)");
        gradient.addColorStop("1", "rgba(243,153,0,0.022)");
        ctx.setFillStyle(gradient);
        ctx.setGlobalAlpha(.5);
        ctx.beginPath();
        ctx.moveTo(curve.points[0].x, 160);
        ctx.lineTo(curve.points[0].x, curve.points[0].y);
        var int = 0;
        for (var i = 0; i < curve.points.length; i++) {
            if (i == 0) {
                ctx.quadraticCurveTo(point[0].x, point[0].y, curve.points[1].x, curve.points[1].y);
                int = int + 1;
            } else if (i < curve.points.length - 2) {
                ctx.bezierCurveTo(point[int].x, point[int].y, point[int + 1].x, point[int + 1].y, curve.points[i + 1].x, curve.points[i + 1].y);
                int += 2;
            } else if (i == curve.points.length - 2) {
                ctx.quadraticCurveTo(point[point.length - 1].x, point[point.length - 1].y, curve.points[curve.points.length - 1].x, curve.points[curve.points.length - 1].y);
            }
        }
        ctx.lineTo(curve.points[curve.points.length - 1].x, 160);
        ctx.fill();
        ctx.closePath();
        this.drawCurveSign(point, ctx);
    },
    // 绘制点加线
    drawCurveSign: function drawCurveSign(point, ctx) {
        // 绘制线
        ctx.beginPath();
        ctx.setStrokeStyle("#F39900");
        ctx.setLineWidth(1);
        ctx.setGlobalAlpha(1);
        var int = 0;
        ctx.moveTo(curve.points[0].x, curve.points[0].y);
        for (var i = 0; i < curve.points.length; i++) {
            if (i == 0) {
                ctx.quadraticCurveTo(point[0].x, point[0].y, curve.points[1].x, curve.points[1].y);
                int = int + 1;
            } else if (i < curve.points.length - 2) {
                ctx.bezierCurveTo(point[int].x, point[int].y, point[int + 1].x, point[int + 1].y, curve.points[i + 1].x, curve.points[i + 1].y);
                int += 2;
            } else if (i == curve.points.length - 2) {
                ctx.quadraticCurveTo(point[point.length - 1].x, point[point.length - 1].y, curve.points[curve.points.length - 1].x, curve.points[curve.points.length - 1].y);
            }
        }
        ctx.stroke();
        // 绘制点
                ctx.beginPath();
        ctx.setGlobalAlpha(1);
        for (var _i = 0; _i < curve.points.length; _i++) {
            ctx.beginPath();
            ctx.arc(curve.points[_i].x, curve.points[_i].y, 3, 0, 2 * Math.PI);
            ctx.setFillStyle("#f39900");
            ctx.setStrokeStyle("#fff");
            ctx.fill();
            ctx.closePath();
        }
    },
    // 环形饼图
    drawPie: function drawPie(canvasId, data) {
        var ctx = wx.createCanvasContext(canvasId);
        ctx.clearRect(0, 0, pieInitData.mW * 2, pieInitData.mH * 2);
        var oldOutY = 0;
        var oldDir = "right";
        drawRing();
        //绘制圆环
                function drawRing() {
            var all = 0;
            for (var i = 0; i < data.length; i++) {
                all += data[i].ratio;
            }
            var angleList = transformAngle();
            var angleArr = [];
            var pieIndex = 0;
            var startAngle = 3 / 2 * Math.PI;
            loop(pieIndex);
            function loop(index) {
                var endAngle = startAngle + angleList[index].angle;
                ctx.beginPath();
                var proportion = 0;
                for (var j = 0; j < index; j++) {
                    proportion += data[j].ratio;
                }
                var start = 3 / 2 * Math.PI + 2 * Math.PI * proportion / all;
                var end = start;
                pieAnimate(index, end, start);
                angleArr.push({
                    startAngle: startAngle,
                    angle: angleList[index].angle
                });
                startAngle = endAngle;
            }
            function pieAnimate(index, end, start) {
                setTimeout(function() {
                    var endLimit = start + 2 * Math.PI * data[index].ratio / all - pieInitData.chink;
                    if (end < endLimit) {
                        end += pieInitData.speed;
                        if (end > endLimit) {
                            end = endLimit;
                        }
                        pieAnimate(index, end, start);
                    } else {
                        if (pieIndex < data.length - 1) {
                            pieIndex++;
                            loop(pieIndex);
                        } else {
                            angleArr.forEach(function(item, i) {
                                drawArcLine(item.startAngle, item.angle, i);
                                //绘制点线
                                                        });
                        }
                    }
                }, 10);
                ctx.setLineWidth(pieInitData.lineW);
                ctx.setStrokeStyle(pieInitData.colorArr[pieIndex]);
                if (canvasId == "salaryScale") {
                    ctx.setStrokeStyle(pieInitData.moneyColorArr[pieIndex]);
                }
                ctx.arc(pieInitData.mW, pieInitData.mH, pieInitData.r, start, end);
                ctx.stroke();
                ctx.draw(true);
            }
            // 转化弧度
                        function transformAngle() {
                var total = 0;
                data.forEach(function(item, i) {
                    total += item.ratio;
                });
                data.forEach(function(item, i) {
                    var angle = item.ratio / total * Math.PI * 2;
                    item.angle = angle;
                });
                return data;
            }
            function drawArcLine(startAngle, angle, index) {
                /*计算点出去的坐标*/
                var edge = pieInitData.r + pieInitData.outSpot;
                var edgeX = Math.cos(startAngle + angle / 2) * edge;
                var edgeY = Math.sin(startAngle + angle / 2) * edge;
                var outX = pieInitData.mW + edgeX;
                var outY = pieInitData.mH + edgeY;
                /*计算线出去的坐标*/                var edge1 = pieInitData.r + pieInitData.outLine;
                var edgeX1 = Math.cos(startAngle + angle / 2) * edge1;
                var edgeY1 = Math.sin(startAngle + angle / 2) * edge1;
                var outX1 = pieInitData.mW + edgeX1;
                var outY1 = pieInitData.mH + edgeY1;
                ctx.beginPath();
                var dir = "right";
                if (outX1 > pieInitData.mW) {
                    dir = "right";
                } else {
                    dir = "left";
                }
                ctx.setStrokeStyle(pieInitData.colorArr[index]);
                if (canvasId == "salaryScale") {
                    ctx.setStrokeStyle(pieInitData.moneyColorArr[index]);
                }
                ctx.setLineWidth(1);
                ctx.setFontSize(pieInitData.fontSize);
                ctx.setTextBaseline("middle");
                if (Math.abs(outY - oldOutY) > 10 || dir != oldDir) {
                    ctx.arc(outX - pieInitData.signR / 2, outY - pieInitData.signR / 2, pieInitData.signR, 0, 2 * Math.PI);
                }
                ctx.setFillStyle(pieInitData.colorArr[index]);
                if (canvasId == "salaryScale") {
                    ctx.setFillStyle(pieInitData.moneyColorArr[index]);
                }
                ctx.fill();
                ctx.moveTo(outX - pieInitData.signR / 2, outY - pieInitData.signR / 2);
                ctx.lineTo(outX1, outY1);
                if (Math.abs(outY - oldOutY) > 30 || dir != oldDir) {
                    oldOutY = outY;
                    oldDir = dir;
                    if (dir == "right") {
                        /*右*/
                        ctx.lineTo(pieInitData.mW * 2, outY1);
                        ctx.stroke();
                        ctx.setFillStyle("#4a4a4a");
                        ctx.setTextAlign("left");
                        var rightValueW = ctx.measureText(data[index].value).width;
                        var rightRatioW = ctx.measureText(data[index].ratio + "%").width;
                        ctx.fillText(data[index].value, pieInitData.mW * 2 - rightValueW, outY1 + pieInitData.textSpace);
                        ctx.fillText(data[index].ratio + "%", pieInitData.mW * 2 - rightRatioW, outY1 - pieInitData.textSpace);
                    } else {
                        /*左*/
                        ctx.lineTo(0, outY1);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.setFillStyle("#4a4a4a");
                        ctx.setTextAlign("right");
                        var leftValueW = ctx.measureText(data[index].value).width;
                        var leftRatioW = ctx.measureText(data[index].ratio + "%").width;
                        ctx.fillText(data[index].value, 0 + leftValueW, outY1 + pieInitData.textSpace);
                        ctx.fillText(data[index].ratio + "%", 0 + leftRatioW, outY1 - pieInitData.textSpace);
                    }
                } else {
                    if (Math.abs(outY - oldOutY) < 10) {} else {
                        oldOutY = outY;
                        oldDir = dir;
                        if (dir == "right") {
                            /*右*/
                            var lineOffsetR = ctx.measureText("1000%").width;
                            ctx.lineTo(pieInitData.mW * 2 - lineOffsetR, outY1);
                            ctx.stroke();
                            ctx.setFillStyle("#4a4a4a");
                            ctx.setTextAlign("left");
                            var _rightRatioW = ctx.measureText(data[index].ratio + "% " + data[index].value + "1000%").width;
                            ctx.fillText(data[index].ratio + "% " + data[index].value, pieInitData.mW * 2 - _rightRatioW, outY1 + pieInitData.textSpace);
                        } else {
                            /*左*/
                            var lineOffsetL = ctx.measureText("1000%").width;
                            ctx.lineTo(0 + lineOffsetL, outY1);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.setFillStyle("#4a4a4a");
                            ctx.setTextAlign("right");
                            var _leftRatioW = ctx.measureText(data[index].ratio + "% " + data[index].value + "1000%").width;
                            ctx.fillText(data[index].ratio + "% " + data[index].value, 0 + _leftRatioW, outY1 - pieInitData.textSpace);
                        }
                    }
                }
                ctx.draw(true);
            }
        }
    }
});

function transfformMoney(item) {
    if (item >= 1e4) {
        item = Math.floor(item / 1e4 * 10) / 10 + "w";
    }
    return item;
}

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