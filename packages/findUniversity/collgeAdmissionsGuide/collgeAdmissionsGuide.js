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
        pn: 1,
        oneClick: false,
        recruitChapter: [],
        navigationText: "",
        sharePageBack: "",
        navigationCustomCapsuleHeight: "",
        navigationCustomStatusHeight: "",
        navigationHome: ""
    },
    backIconButtonTap: function backIconButtonTap() {
        if (this.properties.sharePageBack) {
            wx.switchTab({
                url: "/pages/index/index"
            });
        } else {
            wx.navigateBack({
                delta: 1
            });
        }
    },
    recruitChapterTap: function recruitChapterTap(e) {
        var that = this;
        if (!app.checkOnce(that, "oneClick")) return;
        var index = e.currentTarget.id;
        var newsId = that.data.recruitChapter[index].id;
        var name = that.data.recruitChapter[index].name;
        var url = "/packages/findUniversity/guideDetail/guideDetail?newsId=" + newsId + "&title=" + name;
        wx.navigateTo({
            url: url,
            success: function success(res) {},
            fail: function fail(res) {},
            complete: function complete(res) {}
        });
    },
    queryCollegesNews: function queryCollegesNews(numId, collegeNewsType) {
        var that = this;
        var pn = that.data.pn;
        _api2.default.queryCollegesNews("Colleges/News/Query", "POST", numId, collegeNewsType, pn).then(function(res) {
            if (res.result) {
                var serverNews = res.result.items;
                var recruitChapter = [];
                for (var i in serverNews) {
                    var temp = {};
                    temp.name = serverNews[i].title;
                    temp.id = serverNews[i].numId;
                    recruitChapter.push(temp);
                }
                that.setData({
                    recruitChapter: that.data.recruitChapter.concat(recruitChapter)
                });
            } else {}
        });
    },
    onShow: function onShow() {
        app.resetOnce(this, "oneClick");
    },
    scrolltolower: function scrolltolower() {
        this.setData({
            pn: this.data.pn + 1
        });
        this.queryCollegesNews(this.numId, 10);
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.numId = parseInt(options.numId);
        that.selectComponent("#navigationcustom").setNavigationAll(options.title, true);
        that.queryCollegesNews(parseInt(options.numId), 10, 1, 10);
    }
});