var request = require("../../utils/request.js");

module.exports = {
    /**http://qa.pay.wmei.cn/WeixinPay/GetUnifiedOrder */
    //支付统一下单
    ///WeixinPay/GetUnifiedOrder
    getUnifiedOrder: function getUnifiedOrder(url, type, mchId, key, appId, appSecret, body, notifyUrl, openId, outTradeNo, spbillCreateIp, totalFee, tradeType, nonceStr) {
        /**{
    
    } */
        var parameter = {
            mchId: mchId,
            key: key,
            appId: appId,
            appSecret: appSecret,
            body: body,
            notifyUrl: notifyUrl,
            openId: openId,
            outTradeNo: outTradeNo,
            spbillCreateIp: spbillCreateIp,
            totalFee: totalFee,
            tradeType: tradeType,
            nonceStr: nonceStr
        };
        return request.fetchApi(url, type, "CPP", parameter).then(function(res) {
            return res;
        });
    },
    ///Payment/Order/NotifyPay
    //PC、H5、微信APP、Android、Ios环境 支付回调处理
    notifyPayOrder: function notifyPayOrder(url, type, orderNo) {
        url += "?orderNo=" + orderNo;
        return request.fetchApi(url, type, "CPToC").then(function(res) {
            return res;
        });
    },
    // 添加 手机APP环境 支付单
    insertAppOrder: function insertAppOrder(url, type, userId, mobilePhone, appPayType, payDeviceType, bussType, provinceId, price, isTest, productId, remark, quantity, provinceName, userRemark) {
        //添加 手机APP环境 支付单
        //productId = 0;
        var parameter = {
            userId: userId,
            mobilePhone: mobilePhone,
            appPayType: appPayType,
            payDeviceType: payDeviceType,
            bussType: bussType,
            provinceId: provinceId,
            price: price,
            isTest: isTest,
            productId: productId,
            remark: remark,
            quantity: quantity,
            provinceName: provinceName,
            userRemark: userRemark
        };
        return request.fetchApi(url, type, "CPToC", parameter).then(function(res) {
            return res;
        });
    }
};