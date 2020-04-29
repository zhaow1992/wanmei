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

var api = require("../api.js");

var collegeId = void 0;

Page({
    data: {
        scrollH: 0,
        collegeList: [],
        matchMajorList: [],
        matchMajorLoading: true,
        matchMajorFlag: false,
        collegeUp: false,
        colleges: "",
        pn: 1,
        sort: true,
        //true从大到小fasle从小到大       
        chooseSubjectType: app.globalData.chooseSubject.provinceType
    },
    onLoad: function onLoad(options) {
        this.setData({
            chooseSubjectType: app.globalData.chooseSubject.provinceType
        });
        this.selectComponent("#navigationcustom").setNavigationAll("院校匹配 " + options.rate + "%", true);
        this.getScrollH();
        this.rateColleges();
    },
    // 计算dom高度
    getScrollH: function getScrollH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.select("#nav").boundingClientRect();
        item.exec(function(res) {
            that.setData({
                scrollH: app.globalData.systemInfo.windowHeight - res[0].height
            });
        });
    },
    //获取匹配院校
    rateColleges: function rateColleges() {
        var _this = this;
        api.getMajorMatchRate("ChooseSubject/Colleges/QueryMajorMatchRate", "POST", {
            majorCodes: app.globalData.chooseSubject.majorCodes,
            pageIndex: this.data.pn,
            pageSize: 20,
            provinceId: app.globalData.chooseSubject.provinceId,
            sortFiledType: 2,
            sortType: this.data.sort ? 2 : 1,
            subject: app.globalData.chooseSubject.subject,
            year: app.globalData.chooseSubject.year
        }).then(function(res) {
            var data = void 0;
            if (_this.data.pn > 1) {
                data = _this.data.colleges;
                data.colleges = [].concat(_toConsumableArray(_this.data.colleges.colleges), _toConsumableArray(res.result.colleges));
            } else {
                data = res.result;
            }
            _this.setData({
                colleges: data
            });
        });
    },
    sort: function sort() {
        this.setData({
            pn: 1,
            sort: !this.data.sort,
            intoView: 0
        });
        this.rateColleges();
    },
    // 匹配专业
    collegeUp: function collegeUp(e) {
        var _this2 = this;
        var that = this;
        var _e$currentTarget$data = e.currentTarget.dataset, ucode = _e$currentTarget$data.ucode, collegeid = _e$currentTarget$data.collegeid;
        collegeId = collegeid;
        api.getCollegeResult("ChooseSubject/Colleges/Get", "POST", {
            uCode: ucode,
            collegeId: collegeid,
            subject: app.globalData.chooseSubject.subject,
            provinceId: app.globalData.chooseSubject.provinceId,
            year: app.globalData.chooseSubject.year
        }).then(function(res) {
            _this2.setData({
                collegeInfo: res.result
            });
        });
        that.setData({
            matchMajorFlag: true,
            collegeUp: "major-animate",
            matchMajorLoading: false
        });
    },
    collegeClose: function collegeClose() {
        this.setData({
            matchMajorFlag: false,
            collegeUp: "major-animate-out"
        });
    },
    //查看院校详情
    collegeDetail: function collegeDetail() {
        wx.navigateTo({
            url: "/packages/findUniversity/collegeDetail/collegeDetail?numId=" + collegeId
        });
    },
    //加载更多
    getMore: function getMore() {
        this.setData({
            pn: this.data.pn + 1
        });
        this.rateColleges();
    }
});