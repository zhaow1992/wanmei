Page({
    data: {
        collegeHistoryList: []
    },
    onLoad: function onLoad(options) {},
    onShow: function onShow() {
        var collegeHistoryList = wx.getStorageSync("searchHistory14") || [];
        this.setData({
            collegeHistoryList: collegeHistoryList
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
                    wx.removeStorageSync("searchHistory14");
                    _this.setData({
                        collegeHistoryList: []
                    });
                }
            }
        });
    },
    toSearch: function toSearch() {
        var url = "/pages/globalSearch/globalSearch?mode=choseSubjectForCollege";
        wx.navigateTo({
            url: url
        });
    }
});