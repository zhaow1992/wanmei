var api = require("../../utils/api.js");

var app = getApp();

Page({
    data: {
        color: null,
        searchScoreLoad: false,
        value: "",
        hotSearchList: [],
        cunzaiTishi: false,
        tishiFlag: false,
        cepingTishi: false,
        userInfo: [],
        majorsearch: "false",
        newClassList: [],
        //video--list
        scoreLineArr: [],
        placeholder: "输入大学名称",
        collegeList: [],
        majorList: [],
        searchSuccess: false,
        cls: "",
        flag: null,
        collegeScoreLineList: [],
        cityId: null,
        course: null,
        indexSearch: false
    },
    searchResults: function searchResults(e) {
        var _this = this;
        wx.showNavigationBarLoading();
        var that = this;
        that.setData({
            searchScoreLoad: true
        });
        if (e.type == "tap") {
            var value = e.currentTarget.dataset.value;
            that.setData({
                value: value
            });
        } else {
            var value = e.detail.value;
        }
        var flag = this.data.flag;
        var course = this.data.course;
        if (value.length > 0) {
            if (that.cityId != 843 && that.cityId != 842 && that.data.cls == "fenshuxian") {
                api.CommonSearch("App/Search", "POST", value, 1, 10, that.cityId, 0, 0, 0).then(function(res) {
                    if (res.result.collegeEnrollSuggests.length > 0) {
                        for (var i = 0; i < res.result.collegeEnrollSuggests.length; i++) {
                            res.result.collegeEnrollSuggests[i].CollegeId = res.result.collegeEnrollSuggests[i].numId;
                            res.result.collegeEnrollSuggests[i].newCnName = res.result.collegeEnrollSuggests[i].cnName.replace(value, "<span style='color:#" + that.data.color + ";'>" + value + "</span>");
                        }
                        that.setData({
                            collegeList: res.result.collegeEnrollSuggests,
                            searchSuccess: true
                        });
                    } else {
                        that.setData({
                            searchSuccess: false
                        });
                    }
                    wx.hideNavigationBarLoading();
                    that.setData({
                        searchScoreLoad: false
                    });
                });
                try {
                    var searchCollegeHistory = wx.getStorageSync("searchCollegeHistory");
                    if (searchCollegeHistory) {
                        for (var i = 0; i < searchCollegeHistory.length; i++) {
                            if (searchCollegeHistory[i] == value) {
                                break;
                            } else {
                                if (i == searchCollegeHistory.length - 1) {
                                    searchCollegeHistory.push(value);
                                    wx.setStorage({
                                        key: "searchCollegeHistory",
                                        data: searchCollegeHistory
                                    });
                                }
                            }
                        }
                    } else {
                        var searchCollegeHistory = [];
                        searchCollegeHistory.push(value);
                        wx.setStorage({
                            key: "searchCollegeHistory",
                            data: searchCollegeHistory
                        });
                    }
                } catch (e) {}
            } else {
                api.CommonSearch("App/Search", "POST", value, flag, 10, that.cityId, 0, 0, 0).then(function(res) {
                    if (flag == 1) {
                        if (res.result.colleges.length > 0) {
                            for (var i = 0; i < res.result.colleges.length; i++) {
                                res.result.colleges[i].newCnName = res.result.colleges[i].cnName.replace(value, "<span style='color:#" + that.data.color + ";'>" + value + "</span>");
                            }
                            _this.setData({
                                collegeList: res.result.colleges,
                                searchSuccess: true
                            });
                        } else {
                            _this.setData({
                                searchSuccess: false
                            });
                        }
                    } else if (flag == 2) {
                        if (res.result.majors.length > 0) {
                            for (var i = 0; i < res.result.majors.length; i++) {
                                res.result.majors[i].newName = res.result.majors[i].name.replace(value, "<span style='color:#" + that.data.color + ";'>" + value + "</span>");
                            }
                            _this.setData({
                                majorList: res.result.majors,
                                searchSuccess: true
                            });
                        } else {
                            _this.setData({
                                searchSuccess: false
                            });
                        }
                    } else if (flag == 0) {
                        for (var i = 0; i < res.Results[0].Colleges.length; i++) {
                            res.Results[0].Colleges[i].newCnName = res.Results[0].Colleges[i].CnName.replace(value, "<span style='color:#" + that.data.color + ";'>" + value + "</span>");
                        }
                        for (var i = 0; i < res.Results[0].Majors.length; i++) {
                            res.Results[0].Majors[i].newName = res.Results[0].Majors[i].Name.replace(value, "<span style='color:#" + that.data.color + ";'>" + value + "</span>");
                        }
                        for (var i = 0; i < res.Results[0].Packs.length; i++) {
                            res.Results[0].Packs[i].newTitle = res.Results[0].Packs[i].Title.replace(value, "<span style='color:#" + that.data.color + ";'>" + value + "</span>");
                            res.Results[0].Packs[i].newIntro = res.Results[0].Packs[i].Intro.replace(value, "<span style='color:#" + that.data.color + ";'>" + value + "</span>");
                        }
                        _this.setData({
                            collegeList: res.Results[0].Colleges,
                            majorList: res.Results[0].Majors,
                            newClassList: res.Results[0].Packs
                        });
                    } else if (flag == 3) {
                        for (var i = 0; i < res.Results[0].Packs.length; i++) {
                            res.Results[0].Packs[i].newTitle = res.Results[0].Packs[i].Title.replace(value, "<span style='color:#" + that.data.color + ";'>" + value + "</span>");
                            res.Results[0].Packs[i].newIntro = res.Results[0].Packs[i].Intro.replace(value, "<span style='color:#" + that.data.color + ";'>" + value + "</span>");
                        }
                        _this.setData({
                            newClassList: res.Results[0].Packs,
                            searchSuccess: true
                        });
                    }
                    wx.hideNavigationBarLoading();
                    that.setData({
                        searchScoreLoad: false
                    });
                });
            }
        } else {
            this.setData({
                collegeList: [],
                newClassList: [],
                majorList: [],
                searchSuccess: false,
                searchScoreLoad: false
            });
            wx.hideNavigationBarLoading();
        }
    },
    redirect: function redirect(e) {
        //点击跳转到详情
        var that = this;
        var id = e.currentTarget.dataset.id;
        var name = e.currentTarget.dataset.name;
        var indexCls = e.currentTarget.dataset.cls;
        var ucode = e.currentTarget.dataset.ucode;
        var cls = this.data.cls;
        var flag = this.data.flag;
        if (flag == 1) {
            if (cls == "zhaodaxue") {
                wx.navigateTo({
                    url: "../collegeDetail/collegeDetail?id=" + id
                });
            } else if (cls == "fenshuxian") {
                var scoreLineArr = that.data.scoreLineArr;
                var flag1 = false;
                var flag2 = false;
                if (scoreLineArr.length > 0) {
                    if (scoreLineArr.length < 5) {
                        for (var i = 0; i < that.data.collegeList.length; i++) {
                            if (that.data.collegeList[i].CollegeId == id) {
                                for (var j = 0; j < scoreLineArr.length; j++) {
                                    if (scoreLineArr[j].CollegeId == that.data.collegeList[i].CollegeId) {
                                        scoreLineArr.splice(j, 1);
                                        scoreLineArr.unshift(that.data.collegeList[i]);
                                        flag1 = true;
                                        break;
                                    }
                                }
                                if (flag1 == false) {
                                    scoreLineArr.unshift(that.data.collegeList[i]);
                                }
                                break;
                            }
                        }
                    } else {
                        for (var i = 0; i < that.data.collegeList.length; i++) {
                            if (that.data.collegeList[i].CollegeId == id) {
                                for (var j = 0; j < scoreLineArr.length; j++) {
                                    if (scoreLineArr[j].CollegeId == that.data.collegeList[i].CollegeId) {
                                        scoreLineArr.splice(j, 1);
                                        scoreLineArr.unshift(that.data.collegeList[i]);
                                        flag2 = true;
                                        break;
                                    }
                                }
                                if (flag2 == false) {
                                    scoreLineArr.splice(4, 1);
                                    scoreLineArr.unshift(that.data.collegeList[i]);
                                }
                                break;
                            }
                        }
                    }
                    that.setData({
                        scoreLineArr: scoreLineArr
                    });
                    wx.setStorage({
                        key: "collegeScoreLineList",
                        data: scoreLineArr
                    });
                } else {
                    for (var i = 0; i < that.data.collegeList.length; i++) {
                        if (that.data.collegeList[i].CollegeId == id) {
                            scoreLineArr.unshift(that.data.collegeList[i]);
                            break;
                        }
                    }
                    that.setData({
                        scoreLineArr: scoreLineArr
                    });
                    wx.setStorage({
                        key: "collegeScoreLineList",
                        data: scoreLineArr
                    });
                }
                if (that.cityId) {
                    if (that.cityId == 843) {
                        if (ucode == null) {
                            wx.navigateTo({
                                url: "../scoreDetailV2/scoreDetailV2?noplan=true&name=" + name
                            });
                        } else {
                            wx.navigateTo({
                                url: "../scoreDetailV2/scoreDetailV2?ucode=" + ucode + "&collegeid=" + id + "&name=" + name
                            });
                        }
                    } else if (that.cityId == 842) {
                        wx.navigateTo({
                            url: "../scoreDetail/scoreDetail?id=" + id + "&name=" + name
                        });
                    } else {
                        wx.navigateTo({
                            url: "../scoreDetailV2Common/scoreDetailV2Common?collegeid=" + id + "&name=" + name
                        });
                    }
                }
            }
        } else if (flag == 2) {
            var code = e.currentTarget.dataset.majorcode;
            if (code.length == 4) {
                wx.navigateTo({
                    url: "/packages/selectMajor/middleMajorDetail/middleMajorDetail?majorcode=" + code
                });
            } else {
                wx.navigateTo({
                    url: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + code + "&cityid=" + this.cityId
                });
            }
        } else if (flag == 0) {
            if (indexCls == 1) {
                wx.navigateTo({
                    url: "../collegeDetail/collegeDetail?id=" + id
                });
            } else if (indexCls == 2) {
                var code = e.currentTarget.dataset.majorcode;
                if (code.length == 4) {
                    wx.navigateTo({
                        url: "/packages/selectMajor/middleMajorDetail/middleMajorDetail?majorcode=" + code
                    });
                } else {
                    wx.navigateTo({
                        url: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + code + "&cityid=" + this.cityId
                    });
                }
            }
        }
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll("搜索", true);
        var cls = options.cls;
        var flag = options.flag;
        if (options.majorsearch) {
            that.setData({
                majorsearch: options.majorsearch
            });
        }
        that.setData({
            color: app.globalData.color
        });
        // var cityId = wx.getStorageSync('cityId');
                that.cityId = wx.getStorageSync("cityId").cityId;
        var course = wx.getStorageSync("course");
        var userInfo = wx.getStorageSync("userInfo");
        var collegeScoreLineList = wx.getStorageSync("collegeScoreLineList");
        if (collegeScoreLineList) {
            that.setData({
                scoreLineArr: collegeScoreLineList
            });
        }
        if (that.cityId) {
            var course = course;
            that.setData({
                cityId: that.cityId,
                course: course
            });
        }
        if (userInfo) {
            that.setData({
                userInfo: userInfo
            });
        }
        this.setData({
            cls: cls,
            flag: flag
        });
        if (flag == 2) {
            this.setData({
                placeholder: "输入专业名称"
            });
            // that.getHotSearch(2);
                } else if (flag == 0) {
            this.setData({
                placeholder: "综合搜索",
                indexSearch: true
            });
            // that.getHotSearch(0);
                } else if (flag == 3) {
            this.setData({
                placeholder: "输入课程名称"
            });
            // that.getHotSearch(3);
                } else if (flag == 1) {
            if (that.data.cls == "fenshuxian") {
                // that.getHotSearch(10);
            } else {
                // that.getHotSearch(1);
            }
        }
        wx.getStorage({
            key: "collegeScoreLineList",
            success: function success(res) {
                that.setData({
                    collegeScoreLineList: res.data
                });
            }
        });
    },
    addMajor: function addMajor(e) {
        //添加我的专业
        var that = this;
        if (that.data.tishiFlag) return;
        var codeArr = [];
        var code = e.currentTarget.dataset.code;
        var userid = that.data.userInfo[0].UserId;
        codeArr[0] = code;
        api.setUserMajor("setUserMajor", "POST", userid, codeArr, true).then(function(res) {
            wx.showToast({
                title: "添加成功！",
                icon: "none",
                duration: 2e3
            });
        });
    },
    addCollege: function addCollege(e) {
        var that = this;
        var flag = true;
        var collegeListArr = [];
        var id = e.currentTarget.dataset.id;
        var collegeList = that.data.collegeList;
        var index = e.currentTarget.dataset.index;
        try {
            var collegeCompareList = wx.getStorageSync("collegeCompareList");
            if (collegeCompareList) {
                collegeListArr = collegeCompareList;
            }
        } catch (e) {}
        for (var i = 0; i < collegeListArr.length; i++) {
            if (collegeListArr[i].numId == id) {
                flag = false;
                break;
            }
        }
        if (flag == true) {
            collegeList[index].st = false, collegeListArr.push(collegeList[index]);
            try {
                wx.setStorageSync("collegeCompareList", collegeListArr);
            } catch (e) {}
            wx.showToast({
                title: "添加成功！",
                icon: "none",
                duration: 2e3
            });
            wx.navigateBack({
                delta: 1
            });
        } else {
            wx.showToast({
                title: "已添加！",
                icon: "none",
                duration: 2e3
            });
        }
    }
    // getHotSearch: function(Type) { //获取热门专业
    //   var that = this;
    //   api.getHotSearch('search/v2/getHotSearch?type=' + Type, 'POST').then(res => {
    //     that.setData({
    //       hotSearchList: res.Results
    //     })
    //   })
    // }
});