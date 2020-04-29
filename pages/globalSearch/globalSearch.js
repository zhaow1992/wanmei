function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}

var app = getApp();

var api = require("../../utils/api.js");

var page = 1;

var course = void 0;

var batch = void 0;

var cityId = void 0;

Page({
    data: {
        placeholder: "请输入关键字",
        serchAppoint: [ {
            name: "综合",
            type: 0
        }, {
            name: "院校",
            type: 1
        }, {
            name: "专业",
            type: 2
        }, {
            name: "职业",
            type: 13
        }, {
            name: "课程",
            type: 3
        } ],
        tabList: [],
        isSearch: false,
        isPointSearch: false,
        searchType: 0,
        keyword: "",
        showLoad: false,
        showLocalLoad: false,
        globalHistory: [],
        hitSearch: [],
        current: 0,
        windowHeight: 0,
        collegeList: [],
        college: [],
        collegePoint: [],
        majors: [],
        majorsPoint: [],
        searchResult: false,
        openStyle: "height:80rpx;overflow:hidden",
        isMore: true,
        showMore: false,
        scoreLineType: "score"
    },
    onLoad: function onLoad(options) {
        var searchType = 0;
        var scoreLineType = this.data.scoreLineType;
        var placeholder = "请输入关键字";
        if (options && options.mode) {
            var mode = options.mode;
            switch (mode) {
              case "all":
                searchType = 0;
                placeholder = "请输入关键字";
                break;

              case "college":
                searchType = 1;
                placeholder = "请输入院校关键字";
                break;

              case "major":
                searchType = 2;
                placeholder = "请输入专业关键字";
                break;

              case "test":
                searchType = 6;
                placeholder = "请输入院校关键字";
                course = parseInt(options.course);
                batch = parseInt(options.batch);
                cityId = parseInt(options.cityid);
                break;

              case "firstMajor":
                searchType = 8;
                placeholder = "请输入专业关键字";
                break;

              case "score":
                searchType = 10;
                placeholder = "请输入院校关键字";
                scoreLineType = options.type;
                this.setData({
                    scoreLineType: scoreLineType
                });
                break;

              case "job":
                searchType = 13;
                placeholder = "请输入职业关键字";
                break;

              case "choseSubjectForCollege":
                searchType = 14;
                placeholder = "请输入院校关键字";
                break;

              case "choseSubjectForMajor":
                searchType = 15;
                placeholder = "请输入专业关键字";
                break;

              case "autonomyCollege":
                searchType = 100;
                placeholder = "请输入院校关键字";
                break;
            }
        }
        var globalHistory = wx.getStorageSync("searchHistory" + searchType) || [];
        this.setData({
            isPointSearch: true,
            searchType: searchType,
            placeholder: placeholder,
            globalHistory: globalHistory,
            tabList: []
        });
        this.getSearchKeyword(searchType);
    },
    //获取热门搜索
    getSearchKeyword: function getSearchKeyword(type) {
        var _this = this;
        this.setData({
            showLoad: true
        });
        api.getSearchKeyword("App/Logs/QueryHotList?type=" + type + "&Count=10", "POST").then(function(res) {
            _this.setData({
                hitSearch: res.result,
                showLoad: false
            });
            if (type == 0) {
                wx.setStorageSync("hits", res.result);
            }
        });
    },
    onUnload: function onUnload() {
        wx.removeStorageSync("hits");
        this.removeStroage();
    },
    //计算高度
    scrollHeight: function scrollHeight() {
        var _this2 = this;
        var that = this;
        if (this.data.searchResult) {
            var input = wx.createSelectorQuery();
            input.select("#searchInput").boundingClientRect();
            input.exec(function(res) {
                if (_this2.data.tabList.length == 0) {
                    that.setData({
                        windowHeight: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
                    });
                } else {
                    var tab = wx.createSelectorQuery();
                    tab.select("#tab").boundingClientRect();
                    tab.exec(function(res1) {
                        that.setData({
                            windowHeight: app.globalData.systemInfo.screenHeight - res[0].height - res1[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
                        });
                    });
                }
            });
        }
    },
    //input输入
    input: function input(e) {
        var keyword = e.detail.value;
        if (!keyword) {
            this.setData({
                searchResult: false
            });
            this.removeStroage();
        }
        this.setData({
            keyword: keyword
        });
    },
    //清空input
    clearInput: function clearInput() {
        this.setData({
            keyword: "",
            searchResult: false
        });
        this.removeStroage();
    },
    //取消
    cancel: function cancel() {
        this.setData({
            searchResult: false,
            searchType: 0,
            placeholder: "请输入关键字",
            globalHistory: wx.getStorageSync("searchHistory0") || [],
            hitSearch: wx.getStorageSync("hits") || []
        });
        this.removeStroage();
        wx.navigateBack();
    },
    removeStroage: function removeStroage() {
        wx.removeStorageSync("collegePoint");
        wx.removeStorageSync("majorsPoint");
        wx.removeStorageSync("jobsPoint");
        wx.removeStorageSync("videoPoint");
    },
    //搜索
    search: function search() {
        this.removeStroage();
        var searchType = this.data.isPointSearch ? this.data.searchType : 0;
        this.setData({
            current: 0,
            isSearch: true,
            searchType: searchType
        });
        this.addHistory();
        this.request();
    },
    //添加最近搜索
    addHistory: function addHistory() {
        var keywordStr = this.data.keyword.trim();
        var arr = this.data.globalHistory;
        if (!keywordStr || keywordStr == " ") return;
        arr.unshift(keywordStr);
        arr = new Set(Array.from(arr));
        if (arr.length > 10) arr.slice(0, 10);
        wx.setStorageSync("searchHistory" + this.data.searchType, [].concat(_toConsumableArray(arr)));
        this.setData({
            globalHistory: [].concat(_toConsumableArray(arr))
        });
    },
    //清除最近搜索
    clearHistory: function clearHistory() {
        var _this3 = this;
        wx.showModal({
            content: "是否清除搜索历史?",
            showCancel: true,
            cancelText: "取消",
            cancelColor: "#000000",
            confirmText: "确定",
            confirmColor: "#3CC51F",
            success: function success(result) {
                if (result.confirm) {
                    _this3.setData({
                        globalHistory: []
                    });
                    wx.removeStorageSync("searchHistory" + _this3.data.searchType);
                }
            }
        });
    },
    //制定搜索
    toSerchAppoint: function toSerchAppoint(e) {
        var value = this.data.serchAppoint[e.currentTarget.dataset.index].name;
        var searchType = e.currentTarget.dataset.type;
        this.getSearchKeyword(searchType);
        this.setData({
            isPointSearch: true,
            placeholder: "请输入" + value + "关键字",
            searchType: searchType,
            globalHistory: wx.getStorageSync("searchHistory" + searchType) || [],
            tabList: []
        });
    },
    //根据历史搜索
    historySearch: function historySearch(e) {
        var item = e.currentTarget.dataset.item;
        if (this.data.searchType != 0) {
            this.setData({
                tabList: []
            });
        }
        this.setData({
            keyword: item
        });
        this.search();
    },
    choseTab: function choseTab(e) {
        page = 1;
        var _e$currentTarget$data = e.currentTarget.dataset, index = _e$currentTarget$data.index, type = _e$currentTarget$data.type;
        this.setData({
            current: index,
            searchType: type,
            isMore: true
        });
        if (type == 0) return;
        this.request();
    },
    request: function request() {
        var _this4 = this;
        var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        this.setData({
            showLocalLoad: true
        });
        var value = this.data.keyword;
        switch (this.data.searchType) {
          case 0:
            this.comprehensiveSearch();
            break;

          case 1:
            var collegePoint = wx.getStorageSync("collegePoint");
            if (collegePoint && collegePoint.length > 0 && !this.data.isSearch) {
                this.setData({
                    searchResult: true,
                    showLocalLoad: false,
                    collegePoint: collegePoint
                });
            } else {
                this.pointSearch(1, function(res) {
                    var college = _this4.collegeData(res.result.items, value);
                    wx.setStorageSync("collegePoint", college);
                    _this4.setData({
                        collegePoint: college,
                        showLocalLoad: false
                    });
                    _this4.scrollHeight();
                }, page);
            }
            break;

          case 2:
            var majorsPoint = wx.getStorageSync("majorsPoint");
            if (majorsPoint && majorsPoint.length > 0 && !this.data.isSearch) {
                this.setData({
                    searchResult: true,
                    showLocalLoad: false,
                    majorsPoint: majorsPoint
                });
            } else {
                this.pointSearch(2, function(res) {
                    var majors = _this4.majorData(res.result, value);
                    wx.setStorageSync("majorsPoint", majors);
                    _this4.setData({
                        majorsPoint: majors,
                        showLocalLoad: false
                    });
                    _this4.scrollHeight();
                });
            }
            break;

          case 3:
            var videoPoint = wx.getStorageSync("videoPoint");
            if (videoPoint && videoPoint.length > 0 && !this.data.isSearch) {
                this.setData({
                    searchResult: true,
                    showLocalLoad: false,
                    videoPoint: videoPoint
                });
            } else {
                this.pointSearch(3, function(res) {
                    var video = _this4.vidoeData(res.result, value);
                    wx.setStorageSync("videoPoint", video);
                    _this4.setData({
                        videoPoint: video,
                        showLocalLoad: false
                    });
                    _this4.scrollHeight();
                });
            }
            break;

          case 6:
            this.searchCollegeByTest(value);
            break;

          case 8:
            this.firstMajor(value);
            break;

          case 10:
            this.searchCollegeByScroe(value);
            break;

          case 13:
            var jobsPoint = wx.getStorageSync("jobsPoint");
            if (jobsPoint && jobsPoint.length > 0 && !this.data.isSearch) {
                this.setData({
                    searchResult: true,
                    showLocalLoad: false,
                    jobsPoint: jobsPoint
                });
            } else {
                this.pointSearch(13, function(res) {
                    var jobs = _this4.jobData(res.result.items, value);
                    wx.setStorageSync("jobsPoint", jobs);
                    _this4.setData({
                        jobsPoint: jobs,
                        showLocalLoad: false
                    });
                    _this4.scrollHeight();
                });
            }
            break;

          case 14:
            this.choseSubject(value);
            break;

          case 15:
            this.choseSubject(value);
            break;

          case 100:
            this.autonomyCollege(value);
            break;
        }
        this.setData({
            isSearch: false
        });
    },
    //自主院校查询
    autonomyCollege: function autonomyCollege(value) {
        var _this5 = this;
        var userScore = wx.getStorageSync("userScore");
        if (userScore) {
            api.QueryCollegesByManualFillout("TZY/Recommendation/QueryCollegesByManualFillout", "POST", userScore.provinceNumId, userScore.batch, userScore.courseType, value).then(function(res) {
                app.insertSearchKeyword(value, 100);
                _this5.setData({
                    searchResult: true,
                    showLocalLoad: false,
                    intelligenceCollege: res.result
                });
                _this5.scrollHeight();
            });
        }
    },
    //专业优先搜索专业
    firstMajor: function firstMajor(value) {
        var _this6 = this;
        api.QueryMajorsByProfessionFirst("TZY/Recommendation/QueryMajorsByProfessionFirst", "POST", value).then(function(res) {
            app.insertSearchKeyword(value, 8);
            _this6.setData({
                searchResult: true,
                showLocalLoad: false,
                intelligenceMajor: res.result
            });
            _this6.scrollHeight();
        });
    },
    //选科搜索专业/大学
    choseSubject: function choseSubject(value) {
        var _this7 = this;
        var keywordStr = value.trim();
        if (!keywordStr || keywordStr == " ") return;
        var json = {
            count: 20,
            provinceId: app.globalData.chooseSubject.provinceId,
            year: app.globalData.chooseSubject.year,
            keywords: keywordStr
        };
        if (this.data.searchType == 14) {
            api.queryCollege("ChooseSubject/Colleges/Query", "POST", json).then(function(res) {
                app.insertSearchKeyword(keywordStr, 14);
                _this7.setData({
                    searchResult: true,
                    showLocalLoad: false,
                    collegeList: res.result,
                    collegeListType: "choseSubject"
                });
                _this7.scrollHeight();
            });
        } else if (this.data.searchType == 15) {
            api.queryCollege("ChooseSubject/Majors/Query", "POST", json).then(function(res) {
                app.insertSearchKeyword(value, 15);
                _this7.setData({
                    searchResult: true,
                    showLocalLoad: false,
                    majorList: res.result,
                    collegeListType: "choseSubject"
                });
                _this7.scrollHeight();
            });
        }
    },
    //测录取率搜索大学
    searchCollegeByTest: function searchCollegeByTest(value) {
        var _this8 = this;
        var keywords = value;
        keywords = keywords.replace(/\s+/g, "");
        api.CollegeEnrollQuery("TZY/CollegeEnroll/Query", "POST", cityId, course == -1 ? 0 : course, batch, keywords).then(function(res) {
            app.insertSearchKeyword(keywords, 6);
            _this8.setData({
                searchResult: true,
                showLocalLoad: false,
                collegeList: res.result,
                collegeListType: "test"
            });
            _this8.scrollHeight();
        });
    },
    //分数线搜索大学
    searchCollegeByScroe: function searchCollegeByScroe(value) {
        var _this9 = this;
        var that = this;
        var isNewGK = false;
        var provinceId = wx.getStorageSync("userInfo")[0].Province;
        if (provinceId == "842" || provinceId == "843") isNewGK = true;
        var url = void 0;
        value = value.replace(/\s+/g, "");
        if (isNewGK) {
            url = "TZY/CollegeEnroll/QueryCollegesWithNewGaoKao";
        } else {
            url = "TZY/CollegeEnroll/QueryColleges";
        }
        api.scoreSearchByKeyword(url, "POST", value, provinceId).then(function(res) {
            if (res.isSuccess) {
                app.insertSearchKeyword(value, 10);
                _this9.setData({
                    searchResult: true,
                    showLocalLoad: false,
                    collegeList: res.result,
                    collegeListType: "score"
                });
                _this9.scrollHeight();
            } else {}
        });
    },
    //指定搜索
    pointSearch: function pointSearch(type, fn, page) {
        var _this10 = this;
        var value = this.data.keyword;
        switch (type) {
          case 1:
            api.getCollegeByKeyword("Colleges/QueryByKeywords", "POST", value, page, 20).then(function(res) {
                _this10.setData({
                    showLocalLoad: false,
                    searchResult: true
                });
                if (page == 1) _this10.insertSearchKeyword(value, 1);
                return fn(res);
            });
            break;

          case 2:
            api.getMajorByKeyword("Majors/QueryByKeywords?keywords=" + encodeURI(value) + "&majorType=-1&returnCount=20", "POST").then(function(res) {
                _this10.setData({
                    showLocalLoad: false,
                    searchResult: true
                });
                if (page == 1) _this10.insertSearchKeyword(value, 2);
                return fn(res);
            });
            break;

          case 13:
            api.getCareersByKeyword("Careers/QueryJobs", "POST", value, page, 20).then(function(res) {
                _this10.setData({
                    showLocalLoad: false,
                    searchResult: true
                });
                if (page == 1) _this10.insertSearchKeyword(value, 13);
                return fn(res);
            });
            break;

          case 3:
            api.getVideoByKeyword("App/Videos/QueryByKeyword", "POST", value, 20).then(function(res) {
                _this10.setData({
                    showLocalLoad: false,
                    searchResult: true
                });
                if (page == 1) _this10.insertSearchKeyword(value, 3);
                return fn(res);
            });
            break;
            // case 5:
            //     api.getNewsByKeyword('News/Query',"POST",value,1,20).then(res=>{
            //       this.setData({
            //         showLocalLoad:false,
            //         searchResult:true,
            //       })
            //       return fn(res);
            //     })
            // break;
                }
    },
    //插入搜索关键字
    insertSearchKeyword: function insertSearchKeyword(value, type) {
        api.insertSearchKeyword("App/Logs/Insert", "POST", value, type);
    },
    //综合搜索
    comprehensiveSearch: function comprehensiveSearch() {
        var _this11 = this;
        this.setData({
            showLoad: true
        });
        var value = this.data.keyword;
        console.log(value);
        var promiseList = [ api.getCollegeByKeyword("Colleges/QueryByKeywords", "POST", value, 1, 2), api.getMajorByKeyword("Majors/QueryByKeywords?keywords=" + encodeURI(value) + "&majorType=1&returnCount=2", "POST"), api.getCareersByKeyword("Careers/QueryJobs", "POST", value, 1, 2), api.getVideoByKeyword("App/Videos/QueryByKeyword", "POST", value, 2), api.insertSearchKeyword("App/Logs/Insert", "POST", value, 0) ];
        Promise.all(promiseList).then(function(res) {
            var college = _this11.collegeData(res[0].result.items, value);
            var majors = _this11.majorData(res[1].result, value);
            var jobs = _this11.majorData(res[2].result.items, value);
            var video = _this11.vidoeData(res[3].result, value);
            // let news = this.newsData(res[4].result.items,value);
                        var tabList = [];
            if (res[0].result.items.length > 0 || res[1].result.length > 0 || res[2].result.items.length > 0 || res[3].result.length > 0) tabList.push({
                tab: "综合",
                type: 0
            });
            if (res[0].result.items.length > 0) tabList.push({
                tab: "院校",
                type: 1
            });
            if (res[1].result.length > 0) tabList.push({
                tab: "专业",
                type: 2
            });
            if (res[2].result.items.length > 0) tabList.push({
                tab: "职业",
                type: 13
            });
            if (res[3].result.length > 0) tabList.push({
                tab: "课程",
                type: 3
            });
            // if(res[4].result.items.length > 0)
            //   tabList.push({tab:'文章',type:5});
                        _this11.setData({
                showLoad: false,
                showLocalLoad: false,
                searchResult: true,
                tabList: tabList,
                college: college,
                majors: majors,
                jobs: jobs,
                video: video
            });
            _this11.scrollHeight();
        });
    },
    //处理院校数据
    collegeData: function collegeData(list, value) {
        list.map(function(item) {
            item.cnName = item.cnName.length > 8 ? item.cnName.substring(0, 8) + "..." : item.cnName;
            item.cnName = item.cnName.replace(value, '<span style="color:red">' + value + "</span>");
            return item;
        });
        return list;
    },
    //处理专业数据
    majorData: function majorData(list, value) {
        list.map(function(item) {
            item.name = item.name.length > 15 ? item.name.substring(0, 15) + "..." : item.name;
            item.name = item.name.replace(value, '<span style="color:red">' + value + "</span>");
            return item;
        });
        return list;
    },
    //职业数据处理
    jobData: function jobData(list, value) {
        list.map(function(item) {
            item.name = item.name.replace(value, '<span style="color:red">' + value + "</span>");
            return item;
        });
        return list;
    },
    //课程数据处理
    vidoeData: function vidoeData(list, value) {
        list.map(function(item) {
            item.title = item.title.replace(value, '<span style="color:red">' + value + "</span>");
            return item;
        });
        return list;
    },
    //查看更多
    more: function more(e) {
        var type = e.currentTarget.dataset.type;
        var index = void 0;
        this.data.tabList.map(function(item, i) {
            if (item.type == type) {
                index = i;
            }
        });
        this.setData({
            current: index,
            searchType: type
        });
        if (type == 0) return;
        this.request();
    },
    //加载更多数据
    getMore: function getMore() {
        var _this12 = this;
        var type = this.data.searchType;
        var value = this.data.keyword;
        this.setData({
            showMore: true
        });
        page++;
        switch (type) {
          case 1:
            if (!this.data.isMore) return;
            var collegePoint = this.data.collegePoint;
            this.pointSearch(type, function(res) {
                if (res.result.items.length == 0) {
                    _this12.setData({
                        isMore: false
                    });
                } else {
                    var college = _this12.collegeData(res.result.items, value);
                    _this12.setData({
                        collegePoint: [].concat(_toConsumableArray(collegePoint), _toConsumableArray(college)),
                        showLocalLoad: false,
                        isMore: true
                    });
                }
            }, page);
            break;

          case 13:
            if (!this.data.isMore) return;
            var jobsPoint = this.data.jobsPoint;
            this.pointSearch(13, function(res) {
                if (res.result.items.length == 0) {
                    _this12.setData({
                        isMore: false
                    });
                } else {
                    var jobs = _this12.jobData(res.result.items, value);
                    _this12.setData({
                        jobsPoint: [].concat(_toConsumableArray(jobsPoint), _toConsumableArray(jobs)),
                        showLocalLoad: false,
                        isMore: true
                    });
                }
            }, page);
            break;
        }
    }
});