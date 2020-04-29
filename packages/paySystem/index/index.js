var _config = require("../../../config.js");

var _config2 = _interopRequireDefault(_config);

var _MD = require("../../../utils/MD5.js");

var _MD2 = _interopRequireDefault(_MD);

var _api = require("../api.js");

var _api2 = _interopRequireDefault(_api);

var _api3 = require("../../../utils/api.js");

var _api4 = _interopRequireDefault(_api3);

var _domParser = require("../../../utils/dom-parser.js");

var _domParser2 = _interopRequireDefault(_domParser);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

// packages/paySystem/index/index.js
var app = getApp();

Page({
    navigationCustomStatusHeight: "",
    navigationCustomCapsuleHeight: "",
    body: "志愿卡-360",
    userId: "",
    productId: 0,
    userRemark: "",
    bussType: "4",
    remark: "",
    cityId: {},
    IsTest: false,
    data: {
        //tanceng: false,
        vipPrice: "360",
        phoneNumber: "",
        vipName: "志愿VIP会员",
        isBen: "（本账号）"
    },
    //自定义返回按钮
    backIconButtonTap: function backIconButtonTap() {
        var that = this;
        wx.showModal({
            title: "提示",
            content: "尊敬的用户离购买完成只差一步，怎么能放弃~ \n 您可点击“继续支付”完成订单",
            cancelText: "确定放弃",
            confirmText: "继续支付",
            success: function success(res) {
                if (res.confirm) {
                    that.payments(that.data.phoneNumber);
                } else if (res.cancel) {
                    wx.navigateBack({
                        delta: 1
                    });
                }
            }
        });
    },
    goPayInfo: function goPayInfo() {
        wx.navigateTo({
            url: "/pages/commonWebPage/commonWebPage?typePage=1"
        });
    },
    setNavigationAll: function setNavigationAll(navigationText) {
        var that = this;
        if (!app.globalData.navigationCustomTopShow) return;
        that.setData({
            navigationText: navigationText,
            navigationCustomStatusHeight: app.globalData.navigationCustomStatusHeight,
            navigationCustomCapsuleHeight: app.globalData.navigationCustomCapsuleHeight
        });
    },
    getUnifiedOrder: function getUnifiedOrder(mchId, key, appId, appSecret, body, notifyUrl, openId, outTradeNo, spbillCreateIp, totalFee, tradeType, nonceStr) {
        var _this = this;
        _api2.default.getUnifiedOrder("WeixinPay/GetUnifiedOrder", "POST", mchId, key, appId, appSecret, body, notifyUrl, openId, outTradeNo, spbillCreateIp, totalFee, tradeType, nonceStr).then(function(res) {
            if (res.result && res.result) {
                wx.hideLoading();
                var result = res.result;
                var Package = "prepay_id=" + result.prepayId;
                _this.requestPayment(result.timestamp, result.nonceStr, Package, result.signType, result.sign);
            } else {}
        });
    },
    insertAppOrder: function insertAppOrder(userId, mobilePhone, appPayType, payDeviceType, bussType, provinceId, price, isTest, productId, remark, quantity, provinceName, userRemark) {
        //添加 手机APP环境 支付单
        var that = this;
        _api2.default.insertAppOrder("Payment/Order/InsertAppOrder", "POST", userId, mobilePhone, appPayType, payDeviceType, bussType, provinceId, price, isTest, productId, remark, quantity, provinceName, userRemark).then(function(res) {
            if (res) {
                var total_fee = price * 100;
                var out_trade_no = res.result;
                var nonce_str = app.randomString(30);
                var stringSignTemp = "appid=" + app.globalData.appid + "&body=" + that.body + "&mch_id=" + app.globalData.Mch_id + "&nonce_str=" + nonce_str + "&notify_url=" + app.globalData.notify_url + "&openid=" + app.globalData.openid + "&out_trade_no=" + out_trade_no + "&spbill_create_ip=" + app.globalData.spbill_create_ip + "&total_fee=" + total_fee + "&trade_type=" + app.globalData.trade_type + "&key=" + app.globalData.Mch_key;
                var sign = _MD2.default.hexMD5(stringSignTemp).toUpperCase();
                that.getUnifiedOrder(_config2.default.Mch_id, app.globalData.Mch_key, _config2.default.appid, app.uncompileStr(_config2.default.app + _config2.default.sec + _config2.default.ret), that.body, app.globalData.notify_url, app.globalData.openid, out_trade_no, app.globalData.spbill_create_ip, total_fee, app.globalData.trade_type, nonce_str);
            } else {
                wx.hideLoading();
            }
        });
    },
    initUser: function initUser(userInfo) {
        var that = this;
        that.setPhoneNumber(userInfo.MobilePhone);
        that.userId = userInfo.UserId;
    },
    setPhoneNumber: function setPhoneNumber(MobilePhone) {
        var that = this;
        that.setData({
            phoneNumber: MobilePhone
        });
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.setNavigationAll("确认订单");
        that.cityId = wx.getStorageSync("cityId");
        that.userInfo = wx.getStorageSync("userInfo")[0];
        that.initUser(that.userInfo);
        if (options && options.vipName && options.vipPrice) {
            that.setData({
                vipName: options.vipName,
                vipPrice: options.vipPrice
            });
        }
        var id = options.userType;
        if (id == 1) {
            that.body = "志愿卡-360";
            that.bussType = 4;
        } else if (id == 2) {
            that.body = "升学卡-460";
            that.bussType = 23;
        }
    },
    payments: function payments(mobile) {
        wx.showLoading({
            title: "加载中"
        });
        var that = this;
        var vipPrice = that.data.vipPrice;
        // bussType-业务类型 《4.在线购买VIP卡》、《23.在线购买升学卡》、《24.自主招生一对一申请服务》、《25.自主招生一对一高中阶段全程服务》 、 《26.自主招生宝典》、《27.自主招生宝典加卡》、《14.在线购买首席专家服务》、
        that.insertAppOrder(that.userId, that.data.phoneNumber, 5, 6, that.bussType, that.cityId.cityId, vipPrice, that.IsTest, that.productId, that.remark, 1, that.cityId.provinceName, that.userRemark);
    },
    getUserPermission: function getUserPermission() {
        var that = this;
        wx.showLoading({
            title: "加载中",
            mask: true
        });
        try {
            var userInfo = wx.getStorageSync("userInfo");
            if (userInfo) {
                _api4.default.getUserBrief("Users/GetBrief", "POST", userInfo[0].UserId, true).then(function(res) {
                    if (res.isSuccess) {
                        wx.hideLoading();
                        var UserType = res.result.userPermissionId;
                        userInfo[0].UserType = UserType;
                        wx.setStorage({
                            key: "userInfo",
                            data: userInfo
                        });
                        wx.redirectTo({
                            url: "../paySuccess/paySuccess"
                        });
                    } else {
                        wx.hideLoading();
                        wx.showToast({
                            title: res.message,
                            icon: "none"
                        });
                    }
                });
            }
        } catch (e) {}
    },
    requestPayment: function requestPayment(timeStamp, nonceStr, Package, signType, paySign) {
        var that = this;
        wx.requestPayment({
            timeStamp: String(timeStamp),
            nonceStr: nonceStr,
            package: Package,
            signType: signType,
            paySign: paySign,
            success: function success(res) {
                that.getUserPermission();
            },
            fail: function fail(res) {
                wx.navigateTo({
                    url: "../payFail/payFail"
                });
            },
            complete: function complete(res) {}
        });
    },
    payClick: function payClick(e) {
        var that = this;
        if (app.globalData.system == "ios") {} else {
            that.payments(that.data.phoneNumber);
        }
    }
});