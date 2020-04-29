var _Page;

var _api = require("../../../utils/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

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

Page((_Page = {
    data: {
        historyList: [],
        focus: true,
        value: "",
        placeholder: "输入大学名称",
        collegeList: [],
        searchFalg: false,
        course: 0,
        batch: 1,
        provinceId: 1,
        hitSearch: []
    },
    //关键字查询院校名称
    deleteHistoryStorageTap: function deleteHistoryStorageTap() {
        var that = this;
        wx.showModal({
            content: "是否删除历史记录",
            cancelText: "否",
            confirmText: "是",
            success: function success(res) {
                if (res.confirm) {
                    wx.showNavigationBarLoading();
                    wx.removeStorage({
                        key: "historyList",
                        success: function success(res) {
                            wx.hideNavigationBarLoading();
                        }
                    });
                    that.setData({
                        historyList: []
                    });
                } else if (res.cancel) {}
            }
        });
    },
    goSearch: function goSearch(e) {
        var that = this;
        that.setData({
            value: e.currentTarget.dataset.name
        }, function() {
            that.searchResults();
        });
    },
    chooseCollege: function chooseCollege(e) {
        var collegeid = e.currentTarget.dataset.collegeid;
        var collegename = e.currentTarget.dataset.collegename;
        var ucode = e.currentTarget.dataset.ucode;
        var codeid = e.currentTarget.dataset.codeid;
        app.globalData.probabilityInfo.collegeId = collegeid;
        app.globalData.probabilityInfo.collegeUcode = ucode;
        app.globalData.probabilityInfo.collegeName = collegename;
        app.globalData.probabilityInfo.codeId = codeid;
        wx.navigateBack({
            detal: 1
        });
    },
    focus: function focus() {
        this.setData({
            focus: true
        });
    },
    blur: function blur() {
        this.setData({
            focus: false
        });
    },
    searchValue: function searchValue(e) {
        this.setData({
            value: e.detail.value
        });
    },
    detailValue: function detailValue() {
        this.setData({
            value: "",
            focus: true
        });
    },
    searchResults: function searchResults() {
        var that = this;
        var keywords = that.data.value;
        keywords = keywords.replace(/\s+/g, "");
        var historyList = [];
        try {
            var searchHistory = wx.getStorageSync("searchHistory");
            if (searchHistory) {
                historyList = searchHistory;
                for (var i = 0; i < searchHistory.length; i++) {
                    if (searchHistory[i] == keywords) {
                        break;
                    } else {
                        if (i == searchHistory.length - 1) {
                            historyList.push(keywords);
                        }
                    }
                }
            } else {
                historyList.push(keywords);
            }
        } catch (e) {}
        that.setData({
            historyList: historyList
        }, wx.setStorageSync("searchHistory", historyList));
        var provinceId = parseInt(that.data.provinceId);
        var course = parseInt(that.data.course) == -1 ? 0 : parseInt(that.data.course);
        var batch = parseInt(that.data.batch);
        _api2.default.CollegeEnrollQuery("TZY/CollegeEnroll/Query", "POST", provinceId, course, batch, keywords).then(function(res) {
            app.insertSearchKeyword(keywords, 6);
            that.setData({
                searchFalg: true,
                collegeList: res.result
            });
        });
    },
    cancelTap: function cancelTap() {
        wx.navigateBack({
            delta: 1
        });
    },
    checkEntrance: function checkEntrance(mode) {
        if (mode == "college") {
            this.setData({
                placeholder: "大学任你挑"
            });
        }
    },
    onLoad: function onLoad(options) {
        var _this = this;
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll("搜索", true);
        if (options && options.course) {
            that.setData({
                course: options.course,
                batch: options.batch,
                provinceId: options.cityid
            });
        }
        that.checkEntrance(options.mode);
        var historyList = wx.getStorageSync("searchHistory");
        if (historyList.length < 1) {
            that.setData({
                historyList: [],
                deleteIcon: false
            });
        } else {
            that.setData({
                historyList: historyList,
                deleteIcon: true
            });
        }
        app.getHits(6, function(res) {
            _this.setData({
                hitSearch: res.result
            });
        });
    }
}, _defineProperty(_Page, "focus", function focus() {
    this.setData({
        focus: true
    });
}), _defineProperty(_Page, "blur", function blur() {
    this.setData({
        focus: false
    });
}), _Page));