var app = getApp();

Page({
    data: {},
    onLoad: function onLoad() {
        var that = this;
        that.userInfo = wx.getStorageSync("userInfo")[0];
        that.selectComponent("#navigationcustom").setNavigationAll("订购失败", false);
    },
    continuePay: function continuePay() {
        wx.navigateBack({
            delta: 1
        });
    },
    //点击继续支付回到上一页自动展开支付方式浮层
    //点击关闭支付回到上一页自动展开挽留弹窗
    //上述都不要了，直接回去
    goBeforePage: function goBeforePage() {
        wx.navigateBack({
            delta: 2
        });
    }
});