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

var api = require("../api.js");

var app = getApp();

Page({
    data: {
        color: null,
        type: 1,
        //1:大学选科查询  2：专业查询选科
        placeholder: "",
        yourWant: [],
        historyList: [],
        keyword: "",
        searchList: [],
        showLoad: false,
        isSearch: false,
        hitSearch: []
    },
    onLoad: function onLoad(options) {
        var _this = this;
        var type = options.type;
        this.setData({
            type: type,
            color: app.globalData.color
        });
        var placeholder = "";
        var historyList = [];
        if (type == "1") {
            placeholder = "搜索感兴趣的院校";
            historyList = wx.getStorageSync("collegeHistory") || [];
            app.getHits(14, function(res) {
                _this.setData({
                    hitSearch: res.result
                });
            });
            // this.getColleges();
                } else if (type == "2") {
            placeholder = "搜索感兴趣的专业";
            historyList = wx.getStorageSync("majorHistory") || [];
            app.getHits(15, function(res) {
                _this.setData({
                    hitSearch: res.result
                });
            });
            // this.getMajors();\
                }
        if (options && options.keyword) {
            this.setData({
                keyword: options.keyword
            });
            this.search();
        }
        this.setData({
            placeholder: placeholder,
            historyList: historyList
        });
    },
    //猜你喜欢院校
    // getColleges() {
    //   let json = {
    //     "userNumId": wx.getStorageSync('userInfo')[0].UserId,
    //     "provinceNumId": wx.getStorageSync('cityId').cityId
    //   }
    //   api.getYourWantColleges('Users/ChooseSubjects/QueryDefaultRecommendationColleges', "POST", json).then(res => {
    //     this.setData({
    //       yourWant: res.result
    //     })
    //   })
    // },
    //猜你喜欢专业
    getMajors: function getMajors() {
        var json = {
            userNumId: wx.getStorageSync("userInfo")[0].UserId,
            provinceNumId: wx.getStorageSync("cityId").cityId,
            year: wx.getStorageSync("userInfo")[0].GKYear
        };
        var url = "Users/ChooseSubjects/QueryDefaultRecommendationMajors?userNumId=" + json.userNumId + "&provinceNumId=" + json.provinceNumId + "&year=" + json.year;
        // api.getYourWantMajors("Users/ChooseSubjects/QueryDefaultRecommendationMajors","POST",json).then(res=>{
        //   this.setData({
        //     yourWant:res.result
        //   })
        // })
        },
    input: function input(e) {
        if (!e.detail.value) {
            this.setData({
                searchList: [],
                isSearch: false
            });
        }
        this.setData({
            keyword: e.detail.value
        });
    },
    clearInput: function clearInput() {
        this.setData({
            keyword: "",
            searchList: [],
            isSearch: false
        });
    },
    search: function search() {
        var type = this.data.type;
        var keywordStr = this.data.keyword.trim();
        if (!keywordStr || keywordStr == " ") return;
        var json = {
            count: 20,
            provinceId: app.globalData.chooseSubject.provinceId,
            year: app.globalData.chooseSubject.year,
            keywords: keywordStr
        };
        this.setData({
            isSearch: true,
            showLoad: true
        });
        if (type == "1") {
            this.setStorage(keywordStr, "collegeHistory");
            this.queryCollege(json);
        } else if (type == "2") {
            this.setStorage(keywordStr, "majorHistory");
            json.isBen = true;
            this.queryMajor(json);
        }
    },
    //加入搜索历史
    setStorage: function setStorage(keywordStr, type) {
        var arr = wx.getStorageSync(type) || [];
        arr.unshift(keywordStr);
        arr = new Set(Array.from(arr));
        if (arr.length > 20) arr.slice(0, 20);
        wx.setStorageSync(type, [].concat(_toConsumableArray(arr)));
        this.setData({
            historyList: [].concat(_toConsumableArray(arr))
        });
    },
    //模糊搜索院校
    queryCollege: function queryCollege(json) {
        var value = this.data.keyword;
        var that = this;
        var color = that.data.color;
        api.queryCollege("ChooseSubject/Colleges/Query", "POST", json).then(function(res) {
            res.result.map(function(item) {
                item.collegeName = item.collegeName.replace(value, '<span style="color:#' + color + '">' + value + "</span>");
            });
            app.insertSearchKeyword(value, 14);
            that.setData({
                searchList: res.result,
                showLoad: false
            });
        });
    },
    //模糊搜索专业
    queryMajor: function queryMajor(json) {
        var value = this.data.keyword;
        var that = this;
        var color = that.data.color;
        api.queryCollege("ChooseSubject/Majors/Query", "POST", json).then(function(res) {
            res.result.map(function(item) {
                item.majorName = item.majorName.length > 20 ? item.majorName.substring(0, 20) + "..." : item.majorName;
                item.majorName = item.majorName.replace(value, '<span style="color:#' + color + '">' + value + "</span>");
            });
            app.insertSearchKeyword(value, 15);
            that.setData({
                searchList: res.result,
                showLoad: false
            });
        });
    },
    //历史记录搜索
    historySearch: function historySearch(e) {
        var value = e.currentTarget.dataset.value;
        this.setData({
            keyword: value
        });
        this.search();
    },
    //取消
    cancel: function cancel() {
        this.setData({
            searchList: []
        });
        wx.navigateBack();
    },
    //清除历史记录
    clearCollegeHistory: function clearCollegeHistory() {
        var _this2 = this;
        var type = this.data.type;
        wx.showModal({
            content: "是否清除搜索历史?",
            showCancel: true,
            cancelText: "取消",
            cancelColor: "#000000",
            confirmText: "确定",
            confirmColor: "#3CC51F",
            success: function success(result) {
                if (result.confirm) {
                    if (type == "1") {
                        wx.removeStorageSync("collegeHistory");
                    } else {
                        wx.removeStorageSync("majorHistory");
                    }
                    _this2.setData({
                        historyList: []
                    });
                }
            }
        });
    },
    //每条记录详情
    clickItem: function clickItem(e) {
        var _data = this.data, type = _data.type, keyword = _data.keyword;
        var index = e.currentTarget.dataset.index;
        var code = void 0;
        var url = void 0;
        var uCode = void 0;
        if (type == "1") {
            code = this.data.searchList[index].collegeId;
            uCode = this.data.searchList[index].uCode;
            url = "/packages/chooseSubjects/collegeResult/collegeResult?code=" + code + "&uCode=" + uCode;
        } else if (type == "2") {
            code = this.data.searchList[index].majorCode;
            url = "/packages/chooseSubjects/majorResult/majorResult?code=" + code + "&keyword=" + keyword;
        }
        wx.navigateTo({
            url: url
        });
    }
});