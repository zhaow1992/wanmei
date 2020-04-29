var app = getApp();

Page({
    data: {
        ProvinceControLineYear: "-",
        gaokaoScore: [],
        batch: null
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll("修改批次", true);
        wx.getStorage({
            key: "gaokaoScore",
            success: function success(res) {
                that.setData({
                    gaokaoScore: res.data
                });
            }
        });
        wx.getStorage({
            key: "userScore",
            success: function success(res) {
                that.setData({
                    batch: res.data.Batch
                });
            }
        });
        wx.getStorage({
            key: "ProvinceControLineYear",
            success: function success(res) {
                that.setData({
                    ProvinceControLineYear: res.data
                });
            }
        });
    },
    chooseBatch: function chooseBatch(e) {
        var that = this;
        var batchId = e.currentTarget.dataset.batchid;
        try {
            var userInfo = wx.getStorageSync("userInfo");
            if (userInfo) {
                if (userInfo[0].UserType >= 3 || app.globalData.shareFlag == true) {
                    wx.setStorage({
                        key: "collegeRecommendBatch",
                        data: batchId
                    }), wx.navigateBack({
                        delta: 1
                    });
                } else {
                    wx.showToast({
                        title: "开通VIP即可体验",
                        icon: "none",
                        duration: 2e3
                    });
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 1e3);
                }
            }
        } catch (e) {}
    },
    chooseBatchGroup: function chooseBatchGroup(e) {
        var that = this;
        var batchName = e.currentTarget.dataset.batchname;
        var batchId = e.currentTarget.dataset.batchid;
        var groupName = e.currentTarget.dataset.groupname;
        try {
            var userInfo = wx.getStorageSync("userInfo");
            if (userInfo) {
                if (userInfo[0].UserType >= 3 || app.globalData.shareFlag == true) {
                    try {
                        wx.setStorageSync("collegeRecommendBatch", batchId);
                        wx.setStorageSync("collegeRecommendBatchGroup", groupName);
                    } catch (e) {}
                    wx.navigateBack({
                        delta: 1
                    });
                } else {
                    wx.showToast({
                        title: "开通VIP即可体验",
                        icon: "none",
                        duration: 2e3
                    });
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 1e3);
                }
            }
        } catch (e) {}
    }
});