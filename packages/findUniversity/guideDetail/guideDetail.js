var _api = require("../api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

// packages/findUniversity/guideDetail/guideDetail.js
/**招生简章详情 */ var app = getApp();

Page({
    /**
   * 页面的初始数据
   */
    data: {
        title: "",
        time: "2019-04-28",
        detailText: ""
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll(options.title, true);
        that.getCollegesNews(options.newsId);
    },
    getCollegesNews: function getCollegesNews(newsId) {
        var that = this;
        _api2.default.getCollegesNews("Colleges/News/Get", "POST", newsId).then(function(res) {
            if (res.result) {
                var serverDetail = res.result;
                var time = serverDetail.lastEditDate.substr(0, 10);
                var detailText = serverDetail.content.replace(/<img/g, '<img style="width:92vw !important;"');
                that.setData({
                    detailText: detailText,
                    time: time,
                    title: serverDetail.title
                });
            }
        });
    },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function onReady() {},
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function onShow() {},
    /**
   * 生命周期函数--监听页面隐藏
   */
    onHide: function onHide() {},
    /**
   * 生命周期函数--监听页面卸载
   */
    onUnload: function onUnload() {},
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh: function onPullDownRefresh() {},
    /**
   * 页面上拉触底事件的处理函数
   */
    onReachBottom: function onReachBottom() {},
    /**
   * 用户点击右上角分享
   */
    onShareAppMessage: function onShareAppMessage() {}
});