var sensors = require("../../utils/sensors.js");

var app = getApp();

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
                      case "5":
            if (options && options.numId) {
                that.setData({
                    url: "https://m.wmei.cn/news/detail?numId=" + options.numId,
                    title: options.title,
                    img: options.img,
                    numId: options.numId,
                    fromSource: options.fromSource,
                    time: options.time
                });
            }
            var province = "全国";
            if (options.provinceId != 0) {
                var city = wx.getStorageSync("cityList");
                city.forEach(function(ele) {
                    if (ele.numId == options.provinceId) {
                        province = ele.name;
                    }
                });
            }
            var data = {
                article_name: options.title,
                //用户ID
                fromSource: options.fromSource == "网络" ? "网络" : "完美志愿",
                //是否成功
                release_date: options.time,
                //失败原因
                province: province
            };
            app.sensors.track("ArticleView", sensors.ArticleView(data));
            break;
        }
    },
    onShareAppMessage: function onShareAppMessage() {
        return {
            title: this.data.title,
            path: "/pages/commonWebPage/commonWebPage?numId=" + this.data.numId + "&typePage=5&img=" + this.data.img + "&title=" + this.data.title,
            imageUrl: this.data.img
        };
    }
});