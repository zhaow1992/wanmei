var api = require("../../utils/api.js");

var sensors = require("../../utils/sensors.js");

var app = getApp();

Page({
    data: {
        bindCheckedFlag: false,
        serverfail: false,
        bindCard: false,
        cityList: [],
        showBtn: false,
        test: false,
        cityId: null,
        userid: null,
        showLoad: true,
        id: null,
        shareuserid: null,
        shareActivityFlag: false
    },
    _confirmEvent: function _confirmEvent() {
        this.setData({
            showLoad: true,
            serverfail: false
        });
        this.onLoad();
        this.onShow();
    },
    goInsertInfo: function goInsertInfo() {
        wx.navigateTo({
            url: "/pages/commonWebPage/commonWebPage?typePage=1"
        });
    },
    bindUserMobile: function bindUserMobile(openId, socialLoginType, mobile, password, mobileAuthCode, sourceType, accountType, device) {
        var that = this;
        api.bindUserMobile("Users/Socials/BindMobile", "POST", openId, socialLoginType, mobile, password, mobileAuthCode, sourceType, accountType, device).then(function(res) {
            if (res.isSuccess) {
                var data = {
                    user_id: res.result.numId,
                    //用户ID
                    is_success: res.isSuccess,
                    //是否成功
                    fail_reason: res.message
                };
                app.sensors.track("registerResult", sensors.registerResult(data));
                that.getUserBrief(res.result.numId);
            } else {
                wx.showToast({
                    title: res.message,
                    icon: "none"
                });
                that.setData({
                    showLoad: false,
                    bindCheckedFlag: false
                });
            }
        });
    },
    // 获取用户信息
    getUserBrief: function getUserBrief(UserId) {
        var that = this;
        api.getUserBrief("Users/GetBrief", "POST", UserId, true).then(function(res) {
            if (res.isSuccess) {
                var url = "";
                that.setData({
                    bindCheckedFlag: false
                });
                // if (res.result.gkYear != 0 && res.result.provinceId != 0) {
                                if (that.options && that.options.bargainid) {
                    //砍价活动分享进来跳转
                    url = "/packages/activityBargain/index/index?activitybargain=" + that.options.activitybargain + "&bargainid=" + that.options.bargainid + "&shareuserid=" + that.options.shareuserid;
                    wx.redirectTo({
                        url: url
                    });
                } else {
                    if (res.result.gkYear != 0 && res.result.provinceId != 0) {
                        if (that.options && that.options.source == "activity") {
                            //首页->砍价活动进来跳转
                            url = "/packages/activityBargain/index/index?source=activity";
                            wx.redirectTo({
                                url: url
                            });
                        } else {
                            //正常首页跳转
                            url = "/pages/index/index";
                            wx.reLaunch({
                                url: url
                            });
                        }
                    } else {
                        if (that.options && that.options.source == "activity") {
                            //首页->砍价活动进来跳转完善信息
                            // url = '/pages/ImproveGKInformation/index?source=activity&id=' + res.result.id
                            url = "/packages/activityBargain/index/index?source=activity";
                        } else {
                            //正常跳转完善信息
                            url = "/pages/ImproveGKInformation/index?id=" + res.result.id;
                        }
                        wx.redirectTo({
                            url: url,
                            success: function success(res) {
                                wx.hideLoading();
                            }
                        });
                    }
                }
                // }else{
                //   if (that.options && that.options.bargainid) { //砍价活动进来跳转
                //     url = '/pages/ImproveGKInformation/index?activitybargain=' + that.options.activitybargain + '&bargainid=' + that.options.bargainid + '&shareuserid=' + that.options.shareuserid+'&id='+res.result.id
                //   } else if (that.options && that.options.source =='activity'){ //首页->砍价活动进来跳转完善信息
                //     url = '/pages/ImproveGKInformation/index?source=activity&id=' + res.result.id
                //   } else { //正常跳转完善信息
                //     url = '/pages/ImproveGKInformation/index?id=' + res.result.id
                //   }
                //   wx.redirectTo({
                //     url: url,
                //     success: function (res) {
                //       wx.hideLoading();
                //     }
                //   })
                // }
                        } else {
                wx.showToast({
                    title: res.message,
                    icon: "none"
                });
            }
        });
    },
    getPhoneNumberFromServer: function getPhoneNumberFromServer(iv, sessionKey, encryptedData) {
        var that = this;
        api.getPhoneNumberFromServer("MiniProgram/DecryptMobile", "POST", iv, sessionKey, encryptedData).then(function(res) {
            if (res.result) {
                that.bindUserMobile(app.globalData.openid, 6, res.result, "123456", "", 2, 4, 6);
            } else {
                wx.showToast({
                    title: "手机号获取失败，请重新获取",
                    icon: "none"
                });
                that.setData({
                    showLoad: false,
                    bindCheckedFlag: false
                });
            }
        });
    },
    /**获取手机号 */
    getPhoneNumber: function getPhoneNumber(e) {
        var that = this;
        that.setData({
            bindCheckedFlag: true
        });
        if (e.detail.encryptedData && e.detail.iv) {
            //同意获取
            var encryptedData = e.detail.encryptedData;
            var iv = e.detail.iv;
            wx.login({
                success: function success(res) {
                    if (res.code) {
                        //发起网络请求
                        api.getJsCode2Session("MiniProgram/GetJsCode2Session", "POST", res.code).then(function(res) {
                            if (res.isSuccess) {
                                var sessionKey = res.result.session_key;
                                var openid = res.result.openid;
                                wx.setStorage({
                                    key: "openid",
                                    data: openid
                                });
                                app.globalData.openid = openid;
                                that.getPhoneNumberFromServer(iv, sessionKey, encryptedData);
                            } else {
                                wx.showToast({
                                    title: res.message,
                                    icon: "none"
                                });
                                that.setData({
                                    showLoad: false,
                                    bindCheckedFlag: false
                                });
                            }
                        });
                    } else {}
                }
            });
        } else {
            that.setData({
                bindCheckedFlag: false
            });
            wx.showToast({
                title: "微信授权绑定失败",
                icon: "none"
            });
        }
    },
    onLoad: function onLoad(options) {
        var that = this;
        //  var userid = options.userId;
                that.options = options;
        that.selectComponent("#navigationcustom").setNavigationAll("高考填志愿", false);
        that.setData({
            serverfail: false,
            showLoad: false
        });
        // if (options && options.id && options.shareuserid) {
        //   that.setData({
        //     id: options.id,
        //     shareuserid: options.shareuserid,
        //     shareActivityFlag: true
        //   })
        // };
        // // that.setData({
        // //   userid: userid
        // // });
        // var cityList = [];
        // try {
        //   var chooseCity = wx.getStorageSync('chooseCity');
        //   var chooseCityId = wx.getStorageSync('chooseCityId');
        //   if (chooseCity && chooseCityId) {
        //     for (var i = 0; i < chooseCity.length; i++) {
        //       cityList.push({
        //         "cityName": chooseCity[i],
        //         "cityId": chooseCityId[i],
        //         st: false
        //       })
        //     }
        //     that.setData({
        //       cityList: cityList
        //     })
        //   }
        //} catch (e) { }
        }
});