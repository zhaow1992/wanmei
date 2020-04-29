var api = require("../../../utils/api.js");

var app = getApp();

Page({
    data: {
        cityId: null,
        showLoad: true,
        compareInfo: [],
        course: 0
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll("院校对比", true);
        var userScore = wx.getStorageSync("userScore");
        var collegeCompareList = wx.getStorageSync("collegeCompareList");
        var cityId = wx.getStorageSync("cityId").cityId;
        var course = wx.getStorageSync("course");
        var cityList = wx.getStorageSync("cityList");
        if (userScore.provinceNumId == 0) {
            that.setData({
                cityId: cityId,
                course: course
            });
            var CollegeIds = [];
            for (var i = 0; i < collegeCompareList.length; i++) {
                if (collegeCompareList[i].st == true) {
                    CollegeIds.push(collegeCompareList[i].numId);
                }
            }
            if (cityId == 843 || cityId == 842) {
                course = -1;
            }
            api.getCollegeContrasts("TZY/CollegeEnroll/QueryCollegesWithCompare", "POST", CollegeIds, cityId, course, userScore.total, userScore.batch).then(function(res) {
                that.setData({
                    compareInfo: res.result,
                    showLoad: false
                });
            });
        } else {
            that.setData({
                cityId: userScore.provinceNumId,
                course: course
            });
            var CollegeIds = [];
            for (var i = 0; i < collegeCompareList.length; i++) {
                if (collegeCompareList[i].st == true) {
                    CollegeIds.push(collegeCompareList[i].numId);
                }
            }
            if (userScore.provinceNumId == 843 || userScore.provinceNumId == 842) {
                course = -1;
            }
            api.getCollegeContrasts("TZY/CollegeEnroll/QueryCollegesWithCompare", "POST", CollegeIds, userScore.provinceNumId, course, userScore.total, userScore.batch).then(function(res) {
                that.setData({
                    compareInfo: res.result,
                    showLoad: false
                });
            });
            var cityName = "";
            for (var i = 0; i < cityList.length; i++) {
                if (cityList[i].numId == userScore.provinceNumId) {
                    cityName = cityList[i].name;
                    break;
                }
            }
        }
    },
    compareClose: function compareClose(e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        var compareInfo = that.data.compareInfo;
        compareInfo.splice(index, 1);
        that.setData({
            compareInfo: compareInfo
        });
    },
    addCompare: function addCompare() {
        wx.navigateBack({
            delta: 1
        });
    }
});