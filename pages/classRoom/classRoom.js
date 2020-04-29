var api = require("../../utils/api.js");

Page({
    data: {
        loginFlag: false,
        bannerInfo: [],
        pn: 1,
        newClassList: [],
        //最新课程
        showMore: true,
        loadMore: true,
        videoDeZhiHits: [],
        banner: []
    },
    onShareAppMessage: function onShareAppMessage(res) {
        //转发
        if (res.from === "button") {
            // 来自页面内转发按钮
        }
        return {
            title: "完美志愿填报助手",
            path: "/pages/index/index?classRoom=true",
            success: function success(res) {},
            fail: function fail(res) {}
        };
    },
    // 各功能跳转详情
    goDetail: function goDetail(e) {
        if (!this.data.loginFlag) {
            this.loginPopup();
            return;
        }
        var type = e.currentTarget.dataset.type;
        switch (type) {
          case "zykt":
            wx.navigateTo({
                url: "../classRoomList/classRoomList?SubjectId=0&name=志愿课堂"
            });
            break;

            //志愿课堂
                      case "gktf":
            wx.navigateTo({
                url: "../classRoomList/classRoomList?SubjectId=1&name=高考提分"
            });
            break;

            //高考提分
                      case "zyjd":
            wx.navigateTo({
                url: "../classRoomList/classRoomList?SubjectId=2&name=专业解读"
            });
            break;

            //专业解读
                      case "dxzb":
            wx.navigateTo({
                url: "../classRoomList/classRoomList?SubjectId=3&name=大学展播"
            });
            break;

            //大学展播
                      case "classRoomDetail":
            wx.navigateTo({
                url: "../classRoomDetail/classRoomDetail?type=1&id=" + e.currentTarget.dataset.video
            });
            break;

            //顶部轮播
                      case "sub":
            console.log(e);
            wx.navigateTo({
                url: "../classRoomList/classRoomList?SubjectId=" + e.currentTarget.dataset.subjectid + "&name=" + e.currentTarget.dataset.subjectname
            });
            break;

            //九科
                      case "zxkc":
            wx.navigateTo({
                url: "../classRoomDetail/classRoomDetail?type=1&id=" + e.currentTarget.dataset.numid
            });
            break;
            //最新课程
                }
    },
    loginPopup: function loginPopup() {
        this.selectComponent("#loginPopup")._showTap();
    },
    loadNewClass: function loadNewClass(pn) {
        var that = this;
        api.getNewPacks("Classrooms/Videos/Query", "POST", pn).then(function(res) {
            if (res.result.items.length > 0) {
                that.setData({
                    newClassList: that.data.newClassList.concat(res.result.items)
                });
                wx.setStorage({
                    key: "newClass",
                    data: res.result.items
                });
            } else {
                that.setData({
                    loadMore: false
                });
            }
        });
        wx.stopPullDownRefresh();
    },
    // 根据学科分类获取课程点击数
    loadVideoDeZhiHits: function loadVideoDeZhiHits() {
        var that = this;
        api.VideoDeZhiHits("App/VideoDeZhi/Hits", "POST").then(function(res) {
            that.setData({
                videoDeZhiHits: res.result
            });
        });
    },
    loadingBanner: function loadingBanner(provinceNumId) {
        var that = this;
        api.BannersQuery("Advertisement/Banners/Query", "POST", provinceNumId).then(function(res) {
            that.setData({
                banner: res.result
            });
        });
    },
    onLoad: function onLoad(options) {
        var that = this;
        var userInfo = wx.getStorageSync("userInfo");
        if (userInfo) {
            that.setData({
                loginFlag: true
            });
        }
        var cityId = wx.getStorageSync("cityId").cityId;
        that.loadVideoDeZhiHits();
        that.loadingBanner(cityId);
        that.loadNewClass(that.data.pn);
    },
    onReachBottom: function onReachBottom() {
        this.setData({
            pn: this.data.pn + 1
        });
        this.loadNewClass(this.data.pn);
    },
    goSearch: function goSearch() {
        wx.navigateTo({
            url: "../search/search?cls=videoSearch&flag=3"
        });
    },
    goHistory: function goHistory() {
        wx.navigateTo({
            url: "../videoHistory/videoHistory"
        });
    }
});