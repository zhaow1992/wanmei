Page({
    data: {
        marjorHistoryList: []
    },
    onLoad: function onLoad(options) {},
    onShow: function onShow() {
        var majorHistoryList = wx.getStorageSync("searchHistory15") || [];
        this.setData({
            majorHistoryList: majorHistoryList
        });
    },
    //返回
    returnTap: function returnTap() {
        wx.navigateBack({
            delta: 1
        });
    },
    //清除历史记录
    clearHistory: function clearHistory() {
        var _this = this;
        wx.showModal({
            content: "是否清除搜索历史?",
            showCancel: true,
            cancelText: "取消",
            cancelColor: "#000000",
            confirmText: "确定",
            confirmColor: "#3CC51F",
            success: function success(result) {
                if (result.confirm) {
                    wx.removeStorageSync("searchHistory15");
                    _this.setData({
                        majorHistoryList: []
                    });
                }
            }
        });
    },
    toSearch: function toSearch(e) {
        var url = "/pages/globalSearch/globalSearch?mode=choseSubjectForMajor";
        wx.navigateTo({
            url: url
        });
    }
});