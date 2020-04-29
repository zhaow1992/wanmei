var app = getApp();

Component({
    /**
   * 组件的属性列表
   */
    properties: {},
    /**
   * 组件的初始数据
   */
    data: {
        isIOS: false
    },
    attached: function attached() {
        if (app.globalData.system == "ios") {
            this.setData({
                isIOS: true
            });
        }
    },
    /**
   * 组件的方法列表
   */
    methods: {
        toVIP: function toVIP() {
            wx.navigateTo({
                url: "/pages/card/card"
            });
        }
    }
});