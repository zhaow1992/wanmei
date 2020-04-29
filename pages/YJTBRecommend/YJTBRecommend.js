var api = require("../../utils/api.js");

var app = getApp();

Page({
    data: {
        userInfo: [],
        createText: "点击生成志愿表",
        startBtnFlag: false,
        cir: true,
        loadAnimate1: false,
        GroupName: "",
        batchName: "",
        batch: null,
        userScore: null,
        shezhiUp: "",
        cityList: [],
        batchList: [ {
            name: "不限",
            st: true
        }, {
            name: "综合",
            st: false
        }, {
            name: "理工",
            st: false
        }, {
            name: "财经",
            st: false
        }, {
            name: "农林",
            st: false
        }, {
            name: "医药",
            st: false
        }, {
            name: "师范",
            st: false
        }, {
            name: "体育",
            st: false
        }, {
            name: "政法",
            st: false
        }, {
            name: "艺术",
            st: false
        }, {
            name: "民族",
            st: false
        }, {
            name: "军事",
            st: false
        }, {
            name: "语言",
            st: false
        }, {
            name: "其他",
            st: false
        } ],
        morencityList: [],
        morenbatchList: [ {
            name: "不限",
            st: true
        }, {
            name: "综合",
            st: false
        }, {
            name: "理工",
            st: false
        }, {
            name: "财经",
            st: false
        }, {
            name: "农林",
            st: false
        }, {
            name: "医药",
            st: false
        }, {
            name: "师范",
            st: false
        }, {
            name: "体育",
            st: false
        }, {
            name: "政法",
            st: false
        }, {
            name: "艺术",
            st: false
        }, {
            name: "民族",
            st: false
        }, {
            name: "军事",
            st: false
        }, {
            name: "语言",
            st: false
        }, {
            name: "其他",
            st: false
        } ],
        ZWHZ: false
    },
    onLoad: function onLoad(options) {
        var that = this;
        try {
            var userScore = wx.getStorageSync("userScore");
            var userInfo = wx.getStorageSync("userInfo");
            var gaokaoScore = wx.getStorageSync("gaokaoScore");
            that.selectComponent("#navigationcustom").setNavigationAll("一键填报", true);
            if (userInfo) {
                that.setData({
                    userInfo: userInfo
                });
            }
            if (userScore) {
                if (userScore.total == 0) {
                    wx.redirectTo({
                        url: "../createScore/createScore?YJTBflag=YJTB"
                    });
                } else {
                    that.setData({
                        userScore: userScore
                    });
                    var scoreLine = gaokaoScore[0];
                    switch (userScore.courseType) {
                      case 0:
                        scoreLine = gaokaoScore[0];
                        break;

                      case 1:
                        scoreLine = gaokaoScore[1];
                        break;
                    }
                    for (var i = 0; i < scoreLine.length; i++) {
                        if (scoreLine[i].batch == userScore.batch) {
                            that.setData({
                                batchName: scoreLine[i].batchName,
                                batch: userScore.batch
                            });
                            break;
                        }
                    }
                }
            }
        } catch (e) {}
        var cityList = [ {
            cityName: "不限",
            cityId: -1,
            st: true
        } ];
        try {
            var chooseCity = wx.getStorageSync("chooseCity");
            var chooseCityId = wx.getStorageSync("chooseCityId");
            var cityId = wx.getStorageSync("cityId");
            if (chooseCity && chooseCityId) {
                for (var i = 0; i < chooseCity.length; i++) {
                    cityList.push({
                        cityName: chooseCity[i],
                        cityId: chooseCityId[i],
                        st: false
                    });
                }
                cityList.push({
                    cityName: "西藏",
                    cityId: 858,
                    st: false
                });
                that.setData({
                    cityList: cityList,
                    morencityList: cityList
                });
            }
        } catch (e) {}
    },
    onShow: function onShow() {
        var that = this;
        try {
            var gaokaoScore = wx.getStorageSync("gaokaoScore");
            var collegeRecommendBatch = wx.getStorageSync("collegeRecommendBatch");
            var collegeRecommendBatchGroup = wx.getStorageSync("collegeRecommendBatchGroup");
            var userScore = wx.getStorageSync("userScore");
            if (collegeRecommendBatch && collegeRecommendBatch != -1) {
                if (collegeRecommendBatch != that.data.batch) {
                    that.setData({
                        batch: collegeRecommendBatch,
                        createText: "点击生成志愿表",
                        startBtnFlag: false,
                        cir: true,
                        loadAnimate1: false
                    });
                    var scoreLine = gaokaoScore[0];
                    switch (userScore.courseType) {
                      case 0:
                        scoreLine = gaokaoScore[0];
                        break;

                      case 1:
                        scoreLine = gaokaoScore[1];
                        break;
                    }
                    for (var i = 0; i < scoreLine.length; i++) {
                        if (scoreLine[i].batch == collegeRecommendBatch) {
                            that.setData({
                                batchName: scoreLine[i].batchName
                            });
                            break;
                        }
                    }
                }
            }
            if (collegeRecommendBatchGroup) {
                if (collegeRecommendBatchGroup != that.data.GroupName) {
                    that.setData({
                        GroupName: collegeRecommendBatchGroup,
                        createText: "点击生成志愿表",
                        startBtnFlag: false,
                        cir: true,
                        loadAnimate1: false
                    });
                }
            }
            if (userScore) {
                var userScoreOld = that.data.userScore;
                if (userScoreOld.total != userScore.total || userScoreOld.chooseLevelList[0].value != userScore.chooseLevelList[0].value || userScoreOld.chooseLevelList[1].value != userScore.chooseLevelList[1].value || userScoreOld.courseType != userScore.courseType) {
                    that.setData({
                        userScore: userScore,
                        batch: userScore.batch,
                        GroupName: "",
                        createText: "点击生成志愿表",
                        startBtnFlag: false,
                        cir: true,
                        loadAnimate1: false
                    });
                    var _scoreLine = gaokaoScore[0];
                    switch (userScore.courseType) {
                      case 0:
                        _scoreLine = gaokaoScore[0];
                        break;

                      case 1:
                        _scoreLine = gaokaoScore[1];
                        break;
                    }
                    for (var i = 0; i < _scoreLine.length; i++) {
                        if (_scoreLine[i].batch == userScore.batch) {
                            that.setData({
                                batchName: _scoreLine[i].batchName
                            });
                            break;
                        }
                    }
                }
            }
        } catch (e) {}
    },
    onUnload: function onUnload() {
        var that = this;
        wx.setStorage({
            key: "collegeRecommendBatchGroup",
            data: ""
        });
        wx.setStorage({
            key: "collegeRecommendBatch",
            data: -1
        });
    },
    goChangeBatch: function goChangeBatch() {
        wx.navigateTo({
            url: "/packages/common/batchList/batchList"
        });
    },
    changeScore: function changeScore() {
        var that = this;
        var userScore = that.data.userScore;
        var course = userScore.courseType == 0 ? "理科" : "文科";
        if (that.data.userInfo[0].Province == 1) {
            var content = course + " " + userScore.total + "分 " + userScore.chooseLevelList[0].value + " " + userScore.chooseLevelList[1].value;
        } else {
            var content = course + " " + userScore.total + "分 ";
        }
        if (app.globalData.isGaokaoFlag == true) {
            wx.showModal({
                title: "正在使用的成绩：",
                content: content,
                confirmText: "我知道了",
                confirmColor: "#999999",
                showCancel: false,
                success: function success(res) {
                    if (res.confirm) {} else if (res.cancel) {}
                }
            });
        } else {
            wx.showModal({
                title: "正在使用的成绩：",
                content: content,
                showCancel: false,
                // cancelText: '我知道了',
                // cancelColor: '#999999',
                confirmText: "我知道了",
                confirmColor: "#e9302d",
                success: function success(res) {
                    if (res.confirm) {
                        // wx.navigateTo({
                        //   url: '../createScore/createScore',
                        // })
                    } else if (res.cancel) {}
                }
            });
        }
    },
    shezhiUp: function shezhiUp() {
        var that = this;
        that.setData({
            shezhiUp: "major-animate"
        });
        wx.setNavigationBarTitle({
            title: "偏好设置"
        });
    },
    shezhiClose: function shezhiClose() {
        var that = this;
        that.setData({
            shezhiUp: "major-animate-out",
            cityList: that.data.morencityList,
            batchList: that.data.morenbatchList
        });
        wx.setNavigationBarTitle({
            title: "一键填报"
        });
    },
    shezhiSuccess: function shezhiSuccess() {
        var that = this;
        that.setData({
            shezhiUp: "major-animate-out",
            morencityList: that.data.cityList,
            morenbatchList: that.data.batchList,
            createText: "点击生成志愿表",
            startBtnFlag: false,
            cir: true,
            loadAnimate1: false
        });
        wx.setNavigationBarTitle({
            title: "一键填报"
        });
    },
    chooseCityArr: function chooseCityArr(e) {
        var that = this;
        var cityList = that.data.cityList;
        var cityId = e.currentTarget.dataset.id;
        if (cityId == -1) {
            cityList[0].st = true;
            for (var i = 1; i < cityList.length; i++) {
                cityList[i].st = false;
            }
            that.setData({
                showBtn: true
            });
        } else {
            cityList[0].st = false;
            for (var i = 1; i < cityList.length; i++) {
                var flag = !cityList[i].st;
                if (cityId == cityList[i].cityId) {
                    cityList[i].st = flag;
                }
            }
            that.setData({
                showBtn: true
            });
        }
        that.setData({
            cityList: that.data.cityList
        });
    },
    collegeTypeArr: function collegeTypeArr(e) {
        var that = this;
        var batchList = that.data.batchList;
        var batchName = e.currentTarget.dataset.name;
        if (batchName == "不限") {
            batchList[0].st = true;
            for (var i = 1; i < batchList.length; i++) {
                batchList[i].st = false;
            }
            that.setData({
                showBtn: true
            });
        } else {
            batchList[0].st = false;
            for (var i = 1; i < batchList.length; i++) {
                var flag = !batchList[i].st;
                if (batchName == batchList[i].name) {
                    batchList[i].st = flag;
                }
            }
            that.setData({
                showBtn: true
            });
        }
        that.setData({
            batchList: that.data.batchList
        });
    },
    ZWHZChoose: function ZWHZChoose() {
        var that = this;
        that.setData({
            ZWHZ: !that.data.ZWHZ
        });
    },
    YJTBBtnZYTable: function YJTBBtnZYTable() {
        var that = this;
        if (that.data.userInfo[0].UserType > 1) {
            wx.redirectTo({
                url: "../YJTBzyTable/YJTBzyTable?pro=" + that.data.userInfo[0].Province + "&TotalScore=" + that.data.userScore.total + "&batch=" + that.data.batch + "&CourseType=" + that.data.userScore.courseType + "&GroupName=" + that.data.GroupName + "&batchName=" + that.data.batchName
            });
        } else {
            wx.navigateTo({
                url: "../VIPpower/VIPpower"
            });
        }
    },
    YJTBBtn: function YJTBBtn() {
        var that = this;
        if (that.data.userInfo[0].UserType > 1) {
            that.setData({
                loadAnimate1: true,
                createText: "正在从大数据中获取匹配方案"
            });
            var AbType = that.data.GroupName;
            var Batch = that.data.batch;
            if (that.data.userScore.chooseLevelList.length == 0) {
                var ChooseLevel = "";
            } else {
                var ChooseLevel = that.data.userScore.chooseLevelList[0].value + "," + that.data.userScore.chooseLevelList[1].value;
            }
            var cityList = that.data.cityList;
            var batchList = that.data.batchList;
            var cityListArr = [];
            var batchListArr = [];
            for (var i = 0; i < cityList.length; i++) {
                if (cityList[i].st == true) {
                    cityListArr.push(cityList[i].cityId);
                }
            }
            var ProvinceIds = cityListArr.join("_");
            if (ProvinceIds == "-1") {
                ProvinceIds = "";
            }
            for (var i = 0; i < batchList.length; i++) {
                if (batchList[i].st == true) {
                    batchListArr.push(batchList[i].name);
                }
            }
            var CollegeTags = batchListArr.join("_");
            if (CollegeTags == "不限") {
                CollegeTags = "";
            }
            var Course = that.data.userScore.courseType;
            var IsIncludeZWBX = that.data.ZWHZ == true ? 1 : 2;
            var ProvinceId = that.data.userInfo[0].Province;
            var Total = that.data.userScore.total;
            var Rank = that.data.userScore.rank;
            var YiFenYiDuanRank = 0;
            api.queryOneKeyRecommendColleges("TZY/Recommendation/DoOneClickQueryForApp", "POST", AbType, Batch, ChooseLevel, CollegeTags, Course, IsIncludeZWBX, ProvinceId, ProvinceIds, Total, Rank, YiFenYiDuanRank).then(function(res) {
                if (res.isSuccess && res.result.length > 3) {
                    that.setData({
                        createText: "正在整理志愿表"
                    });
                    setTimeout(function() {
                        that.setData({
                            cir: false,
                            startBtnFlag: true,
                            loadAnimate1: false,
                            createText: "点击查看推荐志愿表"
                        });
                    }, 500);
                    // that.animate1();
                                        try {
                        wx.setStorageSync("YJTBList", res.result);
                    } catch (e) {}
                } else {
                    that.setData({
                        shezhiUp: "major-animate",
                        createText: "点击生成志愿表",
                        startBtnFlag: false,
                        cir: true,
                        loadAnimate1: false
                    });
                    wx.showToast({
                        title: "志愿数不足，请重新筛选条件",
                        icon: "none",
                        duration: 2e3
                    });
                }
            });
        } else {
            wx.navigateTo({
                url: "../VIPpower/VIPpower"
            });
        }
    }
    // animate: function () {
    //   var that = this;
    //   var cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。 
    //   cxt_arc.setLineWidth(10);
    //   var i = 0;
    //   var time = setInterval(function () {
    //     if (that.data.startBtnFlag == true) {
    //       clearInterval(time);
    //     } else {
    //       i += 50;
    //       cxt_arc.setStrokeStyle('#e9302d');
    //       cxt_arc.setLineCap('round')
    //       cxt_arc.beginPath();//开始一个新的路径 
    //       cxt_arc.arc(90, 90, 85, -Math.PI / 2 - i, Math.PI / 16 - i, false);
    //       cxt_arc.stroke();//对当前路径进行描边 
    //       cxt_arc.draw();
    //     }
    //   }, 30)
    // },
    // animate1: function () {
    //   var that = this;
    //   // var cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。 
    //   // cxt_arc.setLineWidth(10);
    //   // cxt_arc.setStrokeStyle('#e9302d');
    //   // cxt_arc.setLineCap('round')
    //   // cxt_arc.beginPath();//开始一个新的路径 
    //   // cxt_arc.arc(90, 90, 85, -Math.PI / 2, i * Math.PI / 16, false);
    //   // cxt_arc.stroke();//对当前路径进行描边 
    //   // cxt_arc.draw();
    //   // var i = 0;
    //   // var time = setInterval(function () {
    //   //   if (i > 2) {
    //   //     clearInterval(time)
    //   //   } else {
    //   //     i += 0.1;
    //   //     cxt_arc.setStrokeStyle('#e9302d');
    //   //     cxt_arc.setLineCap('round')
    //   //     cxt_arc.beginPath();//开始一个新的路径 
    //   //     cxt_arc.arc(90, 90, 85, -Math.PI / 2, i * Math.PI, false);
    //   //     cxt_arc.stroke();//对当前路径进行描边 
    //   //     cxt_arc.draw();
    //   //   }
    //   // }, 30)
    //   setTimeout(function () {
    //     that.setData({ startBtnFlag: true })
    //   }, 400)
    // }
});