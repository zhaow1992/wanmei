Page({
    data: {},
    onLoad: function onLoad(options) {},
    _confirmEvent: function _confirmEvent(e) {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    }
});