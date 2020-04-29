var loading = {
    // 单位rpx
    X: 410,
    //宽
    Y: 410,
    //高
    color: "#E9302D"
};

var app = getApp();

Page({
    data: {},
    onLoad: function onLoad(options) {
        this.init();
    },
    // 初始化
    init: function init() {
        var screenWidth = app.globalData.screenWidth;
        loading.X = loading.X / 750 * wx.getSystemInfoSync().windowWidth;
        loading.Y = loading.Y / 750 * wx.getSystemInfoSync().windowWidth;
        this.drawLoading();
    },
    drawLoading: function drawLoading() {
        var ctx = wx.createCanvasContext("loading");
        ctx.arc(loading.X / 2, loading.Y / 2, loading.X / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.draw();
    }
});