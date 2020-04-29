var app = getApp();

Page({
    data: {
        showLoad: true,
        collegeList: [],
        oneClick: false
    },
    goCollegeDetail: function goCollegeDetail(e) {
        if (!app.checkOnce(this, "oneClick")) return;
        wx.navigateTo({
            url: "../collegeDetail/collegeDetail",
            success: function success(res) {},
            fail: function fail(res) {},
            complete: function complete(res) {}
        });
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll("我的院校", true);
    },
    onShow: function onShow() {
        app.resetOnce(this, "oneClick");
    }
});