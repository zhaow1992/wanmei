var _api = require("../../../utils/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var app = getApp();

Page({
    data: {
        type: "score",
        keywords: "",
        collegeList: [],
        showLoad: false,
        isNewGK: false,
        isSearch: false
    },
    onLoad: function onLoad(options) {
        var _this = this;
        var provinceId = wx.getStorageSync("userInfo")[0].Province;
        if (provinceId == "842" || provinceId == "843") {
            this.setData({
                isNewGK: true
            });
        } else {
            this.setData({
                isNewGK: false
            });
        }
        if (options && options.type) {
            switch (options.type) {
              case "score":
                this.setData({
                    type: "score"
                });
                break;

              case "plan":
                this.setData({
                    type: "plan"
                });
                break;
            }
        }
        this.selectComponent("#navigationcustom").setNavigationAll("搜索", true);
        //获取热门搜索
                app.getHits(10, function(res) {
            _this.setData({
                hitSearch: res.result
            });
        });
    },
    collegeSearch: function collegeSearch(e) {
        this.setData({
            keywords: e.detail.value
        });
    },
    searchHit: function searchHit(e) {
        this.setData({
            keywords: e.currentTarget.dataset.value
        });
        this.search();
    },
    search: function search() {
        var that = this;
        that.setData({
            showLoad: true,
            isSearch: true
        });
        var keywords = that.data.keywords;
        var provinceId = wx.getStorageSync("userInfo")[0].Province;
        var url = void 0;
        keywords = keywords.replace(/\s+/g, "");
        if (this.data.isNewGK) {
            url = "TZY/CollegeEnroll/QueryCollegesWithNewGaoKao";
        } else {
            url = "TZY/CollegeEnroll/QueryColleges";
        }
        _api2.default.scoreSearchByKeyword(url, "POST", keywords, provinceId).then(function(res) {
            if (res.isSuccess) {
                that.setData({
                    collegeList: res.result
                });
                app.insertSearchKeyword(keywords, 10);
            } else {}
            that.setData({
                showLoad: false
            });
        });
    },
    chooseCity: function chooseCity(e) {
        var that = this;
        var collegeList = that.data.collegeList;
        var collegeid = e.currentTarget.dataset.collegeid;
        var index = e.currentTarget.dataset.index;
        var historyList = [];
        try {
            var collegeScoreLineList = wx.getStorageSync("collegeScoreLineList");
            if (collegeScoreLineList) {
                for (var i = 0; i < collegeScoreLineList.length; i++) {
                    if (collegeid == collegeScoreLineList[i].numId) {
                        var changeCollege = collegeScoreLineList.splice(i, 1);
                        collegeScoreLineList.push(changeCollege[0]);
                        wx.setStorage({
                            key: "collegeScoreLineList",
                            data: collegeScoreLineList
                        });
                        break;
                    } else {
                        if (i == collegeScoreLineList.length - 1) {
                            collegeScoreLineList.push(collegeList[index]);
                            wx.setStorage({
                                key: "collegeScoreLineList",
                                data: collegeScoreLineList
                            });
                        }
                    }
                }
            } else {
                historyList.push(collegeList[index]);
                wx.setStorage({
                    key: "collegeScoreLineList",
                    data: historyList
                });
            }
        } catch (e) {}
    }
});