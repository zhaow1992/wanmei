var app = getApp();

Page({
    data: {},
    onLoad: function onLoad() {
        var that = this;
        that.userInfo = wx.getStorageSync("userInfo") || null;
        that.selectComponent("#navigationcustom").setNavigationAll("订购成功", false);
    },
    goMy: function goMy() {
        var that = this;
        wx.switchTab({
            url: "/pages/my/my"
        });
        // const that = this;
        // var userInfo = null;
        // if (that.userInfo)
        //   userInfo = that.userInfo[0];
        // if (app.checkImproveUserInfo(userInfo)) {
        //   wx.redirectTo({
        //     url: '/packages/ImproveStudentInfo/index/index',
        //     success: function (res) { },
        //     fail: function (res) { },
        //     complete: function (res) { },
        //   })
        // } else {
        //   wx.switchTab({
        //     url: '/pages/my/my',
        //   })
        // }
        }
});