var _data;

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

var app = getApp();

Page({
    //300-360
    vipPriceList: [ 0, "360", "460" ],
    //
    vipNameList: [ 0, "志愿VIP", "升学VIP" ],
    data: (_data = {
        payBtnText: app.globalData.payBtnText,
        vipName: "志愿VIP",
        scrollHeight: app.globalData.screenHeight - .168 * app.globalData.screenWidth,
        statusBarHeight: app.globalData.statusBarHeight,
        barHeight: app.globalData.barHeight,
        margindata: "86rpx"
    }, _defineProperty(_data, "statusBarHeight", ""), _defineProperty(_data, "barHeight", ""), 
    _defineProperty(_data, "vipPrice", "360"), _defineProperty(_data, "isIOS", false), 
    _defineProperty(_data, "vipType", false), _defineProperty(_data, "swiperIndex", 1), 
    _defineProperty(_data, "memberText", [ "普通会员权限", "志愿VIP特权", "升学VIP特权" ]), _defineProperty(_data, "vipBgImageUrl", [ "./../image/vip1_bg.png", "./../image/vip2_bg.png", "./../image/vip3_bg.png" ]), 
    _defineProperty(_data, "commentImgUrls", [ "./../image/comment.png", "./../image/comment.png", "./../image/comment.png" ]), 
    _defineProperty(_data, "commentSwiperIndex", 0), _data),
    selectCompareDetail: function selectCompareDetail() {
        wx.navigateTo({
            url: "/pages/webPage/webPage?url=https://www.wmei.cn/news/article-68185.html"
        });
    },
    selectDetail: function selectDetail() {
        wx.navigateTo({
            url: "/pages/webPage/webPage?url=https://m.wmei.cn/aboutUs/vipList&isApp=0"
        });
    },
    navigateBack: function navigateBack() {
        wx.navigateBack({
            delta: 1
        });
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.setData({
            /**that.globalData.navigationCustomStatusHeight = navigationCustomStatusHeight
      that.globalData.navigationCustomCapsuleHeight */
            statusBarHeight: app.globalData.navigationCustomStatusHeight,
            barHeight: app.globalData.navigationCustomCapsuleHeight
        });
        //vipType
                that.options = options;
        if (options && options.vipType) {
            if (options.vipType == 14) {
                that.setData({
                    swiperIndex: 2
                });
            }
            that.setData({
                vipType: true
            });
        }
        if (app.globalData.system == "ios") {
            that.setData({
                isIOS: true
            });
        }
    },
    bindchange: function bindchange(e) {
        var that = this;
        //options.vipType
                var tmpData = {
            swiperIndex: e.detail.current,
            vipName: that.vipNameList[e.detail.current],
            vipPrice: that.vipPriceList[e.detail.current],
            vipType: that.data.vipType
        };
        if (e.detail.current == 2) {
            if (that.options.vipType == 14) {
                tmpData.vipType = true;
            } else {
                tmpData.vipType = false;
            }
        } else if (e.detail.current == 1) {
            if (that.options.vipType == 3 || that.options.vipType == 14) {
                tmpData.vipType = true;
            } else {
                tmpData.vipType = false;
            }
        }
        that.setData(tmpData);
        // that.setData({
        //   swiperIndex: e.detail.current,
        //   vipName: that.vipNameList[e.detail.current],
        //   vipPrice: that.vipPriceList[e.detail.current]
        // })
        },
    bindChangeComment: function bindChangeComment(e) {
        this.setData({
            commentSwiperIndex: e.detail.current
        });
    },
    goPayDetail: function goPayDetail(e) {
        var that = this;
        wx.navigateTo({
            url: "/packages/paySystem/index/index?vipName=" + that.data.vipName + "&vipPrice=" + that.data.vipPrice + "&userType=" + that.data.swiperIndex
        });
    }
});