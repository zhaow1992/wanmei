var _api = require("../api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var app = getApp();

Page({
    data: {
        current: 0,
        swiperH: 0,
        tab: [ "搜索院校", "搜索专业" ],
        keyword: "",
        majorList: [],
        collegeList: [],
        choseNum: 0,
        keywords: []
    },
    onLoad: function onLoad(options) {
        this.options = options;
        if (options && options.type) {
            this.setData({
                current: options.type,
                section: options.section
            });
        }
        this.getswiperH();
        // this.getMajors();
        },
    getswiperH: function getswiperH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.select("#head").boundingClientRect();
        item.exec(function(res) {
            that.setData({
                swiperH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
            });
        });
    },
    getMajors: function getMajors() {
        var _this = this;
        var userNumId = wx.getStorageSync("userInfo")[0].UserId;
        var data = {
            userNumId: userNumId
        };
        _api2.default.getMajors("Evaluation/Result/ProfessionOrientation/QueryMajors", "POST", data).then(function(res) {
            res.result.map(function(i) {
                i.st = false;
            });
            _this.setData({
                majorList: res.result
            });
        });
    },
    checkTab: function checkTab(e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
            current: index
        });
    },
    input: function input(e) {
        this.setData({
            keyword: e.detail.value
        });
    },
    confirm: function confirm() {
        var list = this.data.majorList;
        if (list.indexOf(this.data.keyword) == -1) {
            list.unshift(this.data.keyword);
        }
        var count = 0;
        this.data.majorList.map(function(i) {
            if (i.st) {
                count++;
            }
        });
        if (count + list.length > 30) {
            this.toast();
            return;
        } else {
            this.setData({
                majorList: list
            });
        }
    },
    chose: function chose(e) {
        var num = 0;
        var index = e.currentTarget.dataset.index;
        var arr = this.data.majorList;
        arr[index].st = !arr[index].st;
        arr.map(function(i) {
            if (i.st) {
                num++;
            }
        });
        if (this.data.majorList.length + num > 20) {
            this.toast();
            return;
        } else {
            this.setData({
                majorList: arr,
                choseNum: num
            });
        }
    },
    del: function del(e) {
        var index = e.currentTarget.dataset.index;
        var arr = [];
        switch (parseInt(this.data.current)) {
          case 0:
            arr = this.data.collegeList;
            arr.splice(index, 1);
            this.setData({
                collegeList: arr
            });
            wx.setStorageSync("addCollegeList", arr);
            break;

          case 1:
            arr = this.data.majorList;
            arr.splice(index, 1);
            this.setData({
                majorList: arr
            });
            wx.setStorageSync("sdAddMajorSearch", arr);
            break;
        }
    },
    toast: function toast() {
        wx.showToast({
            title: "添加专业上限30个",
            icon: "none"
        });
    },
    onUnload: function onUnload() {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - this.options.prevPage];
        //上一个页面
                prevPage.update = true;
    },
    onShow: function onShow() {
        var collegeList = wx.getStorageSync("addCollegeList") || [];
        var majorList = wx.getStorageSync("sdAddMajorSearch") || [];
        this.setData({
            collegeList: collegeList,
            majorList: majorList
        });
    },
    goSearch: function goSearch() {
        var url = void 0;
        if (this.data.current == 0) {
            wx.setStorageSync("isSearchCollege", true);
            url = "/pages/globalSearch/globalSearch?mode=sdReport&section=" + this.data.section;
        } else if (this.data.current == 1) {
            url = "/pages/globalSearch/globalSearch?mode=firstMajor";
        }
        wx.navigateTo({
            url: url
        });
    }
});