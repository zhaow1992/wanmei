Page({
    data: {
        price: 0
    },
    /*用户点击右上角分享*/
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        if (res.from === "button") {}
        return {
            title: "送你一张360元志愿卡，我已0元购买，速度来！",
            path: "/packages/activityBargain/index/index?activitybargain=true",
            imageUrl: "http://wmei-appfile.cn-bj.ufileos.com/0yg/shareActivity.png"
        };
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.setData({
            price: options.price
        });
    }
});