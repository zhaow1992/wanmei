Page({
    data: {
        url: ""
    },
    onLoad: function onLoad(options) {
        var that = this;
        switch (options.typePage) {
          case "1":
            that.setData({
                url: "https://m.wmei.cn/copyright"
            });
            break;

            //完美志愿服务条款
                      case "2":
            that.setData({
                url: "https://m.wmei.cn/aboutUs/index"
            });
            break;

            //关于完美志愿
            // case "3": that.setData({ url: "https://form.mikecrm.com/jKHN9J" }); break; //商务合作入口
                      case "4":
            var provinceId = wx.getStorageSync("userInfo")[0].Province;
            that.setData({
                url: "https://m.wmei.cn/scoreLines/pcl?isApp=1&provinceId=" + provinceId
            });
            break;
            //首页批次线
                }
    }
});