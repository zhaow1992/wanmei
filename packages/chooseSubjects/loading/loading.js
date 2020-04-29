var app = getApp();

var api = require("../api.js");

Page({
    data: {
        id: null,
        step: 0,
        requestFlag: false
    },
    drawLoading: function drawLoading() {
        var that = this;
        var steps = this.data.step;
        var speed = 100;
        var type = this.data.type;
        if (steps < 100) {
            steps++;
            if (steps == 100) {
                if (this.data.requestFlag == false) {
                    return;
                } else {
                    if (type == 1) {
                        wx.redirectTo({
                            url: "../chooseMajor/chooseMajor?id=" + this.data.id
                        });
                    } else if (type == 2) {
                        wx.redirectTo({
                            url: "../chooseMajor/chooseMajor?id=" + this.data.id
                        });
                    } else if (type == 3) {
                        wx.redirectTo({
                            url: "/packages/chooseSubjects/chooseSubPlan/chooseSubPlan?isHide=1"
                        });
                    }
                }
            }
            that.setData({
                step: steps
            });
        } else {
            clearInterval(this.interval);
        }
    },
    //根据测评id获取专业列表
    getMajorList: function getMajorList(id) {
        var that = this;
        api.professionOrientationRes("Evaluation/Result/ProfessionOrientation/Get?id=" + id, "POST").then(function(res) {
            if (res.isSuccess) {
                var majorCodes = [];
                res.result.recommendMajors.forEach(function(ele) {
                    majorCodes.push(ele.majorCode);
                });
                wx.setStorage({
                    key: "majorList",
                    data: res.result.recommendMajors
                });
                that.setData({
                    requestFlag: true
                });
            }
        });
    },
    //最新测评情况
    getProfessionOrientation: function getProfessionOrientation() {
        var that = this;
        api.getProfessionOrientation("Evaluation/Result/ProfessionOrientation/GetByUserId", "POST", this.data.userInfo.UserId).then(function(res) {
            if (res.isSuccess) {
                if (res.result.id == null) {
                    that.getNewestEvaluation();
                    //根据用户id获取专业列表
                                } else {
                    that.setData({
                        id: res.result.id
                    });
                    that.getMajorList(res.result.id);
                    //根据测评id获取专业列表
                                }
            } else {
                that.getNewestEvaluation();
                //根据用户id获取专业列表
                        }
        });
    },
    //根据用户id获取专业列表
    getNewestEvaluation: function getNewestEvaluation() {
        var that = this;
        var userInfo = this.data.userInfo;
        api.getNewestEvaluation("Evaluation/Result/ProfessionOrientation/QueryMajors", "POST", parseInt(userInfo.UserId)).then(function(res) {
            wx.setStorage({
                key: "majorList",
                data: res.result,
                success: function success() {
                    that.setData({
                        requestFlag: true
                    });
                }
            });
        });
    },
    onLoad: function onLoad(options) {
        var _this = this;
        var that = this;
        var userInfo = wx.getStorageSync("userInfo")[0];
        if (options.type == 1) {
            this.setData({
                tips: "正在推荐专业...",
                type: options.type,
                id: options.id
            });
            this.getMajorList(options.id);
        } else if (options.type == 2) {
            var storesInfo = wx.getStorageSync("storesInfo");
            this.setData({
                tips: "正在推荐专业...",
                type: options.type
            });
            this.setData({
                userInfo: userInfo
            }, function() {
                _this.getProfessionOrientation();
            });
        } else if (options.type == 3) {
            this.setData({
                tips: "正在推荐专业...",
                type: options.type
            });
            setTimeout(function() {
                that.setData({
                    requestFlag: true
                });
            }, 2e3);
            // this.queryMatchRate()
                }
    },
    //查询专业匹配
    queryMatchRate: function queryMatchRate() {
        var that = this;
        var provinceId = app.globalData.chooseSubject.provinceId;
        var subject = app.globalData.chooseSubject.subject;
        var year = app.globalData.chooseSubject.year;
        api.queryMatchRate("ChooseSubject/Majors/QueryMatchRate", "POST", provinceId, year, [], subject, []).then(function(res) {
            var majorCodes = [];
            var mateMajorList = [];
            res.result.forEach(function(ele, index) {
                if (index < 20) {
                    majorCodes.push(ele.majorCode);
                    mateMajorList.push(ele);
                }
            });
            app.globalData.chooseSubject.mateMajorList = mateMajorList;
            app.globalData.chooseSubject.majorCodes = majorCodes;
            api.queryRecommendSubject("ChooseSubject/QueryRecommendSubject", "POST", provinceId, year, majorCodes, subject).then(function(res) {
                if (res.isSuccess) {
                    that.setData({
                        requestFlag: true,
                        majorMatch: res.result
                    });
                }
            });
        });
    },
    onShow: function onShow() {
        this.interval = setInterval(this.drawLoading, 20);
    },
    onHide: function onHide() {
        clearInterval(this.interval);
    }
});