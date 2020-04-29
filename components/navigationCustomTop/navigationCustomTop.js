// components/navigationCustomTop/navigationCustomTop.js
var app = getApp();

Component({
    /**
   * 组件的属性列表
   */
    properties: {
        share: {
            type: Boolean,
            value: false
        },
        navigationText: {
            type: String,
            value: "完美志愿填报"
        },
        sharePageBack: {
            type: Boolean,
            value: ""
        },
        navigationHome: {
            type: Boolean,
            value: true
        }
    },
    /**
   * 组件的初始数据
   */
    data: {
        navStatusHeight: app.globalData.navigationCustomStatusHeight,
        navCapsuleHeight: app.globalData.navigationCustomCapsuleHeight
    },
    /**
   * 组件的方法列表
   */
    methods: {
        setNavigationAll: function setNavigationAll(navigationText, navigationHome, sharePageBack) {
            var that = this;
            that.setData({
                navigationText: navigationText,
                sharePageBack: sharePageBack,
                navigationHome: navigationHome
            });
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
        homeIconButtonTap: function homeIconButtonTap() {
            wx.switchTab({
                url: "/pages/index/index"
            });
        }
    }
});