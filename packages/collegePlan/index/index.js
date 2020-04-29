Page({
    data: {
        collegeList: []
    },
    onLoad: function onLoad() {},
    returnTap: function returnTap() {
        wx.navigateBack({
            delta: 1
        });
    },
    clearjilu: function clearjilu() {
        //清除历史记录
        var that = this;
        wx.showModal({
            title: "提示",
            content: "确定要清空历史记录吗？",
            cancelColor: "#999999",
            confirmColor: "#0099cc",
            success: function success(res) {
                if (res.confirm) {
                    wx.removeStorage({
                        key: "collegeScoreLineList",
                        success: function success(res) {
                            that.setData({
                                collegeList: []
                            });
                        }
                    });
                } else if (res.cancel) {}
            }
        });
    },
    onShow: function onShow() {
        var that = this;
        try {
            var collegeScoreLineList = wx.getStorageSync("collegeScoreLineList");
            if (collegeScoreLineList) {
                that.setData({
                    collegeList: collegeScoreLineList.reverse()
                });
            }
        } catch (e) {}
    },
    goSearch: function goSearch() {
        wx.navigateTo({
            url: "/pages/globalSearch/globalSearch?mode=score&type=plan"
        });
    }
});