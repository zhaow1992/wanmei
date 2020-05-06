var _MD = require("../../../utils/MD5.js");

var _MD2 = _interopRequireDefault(_MD);

var _domParser = require("../../../utils/dom-parser.js");

var _domParser2 = _interopRequireDefault(_domParser);

var _config = require("../../../config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var app = getApp();

var api = require("./../api.js");

var apiCommon = require("./../../../utils/api.js");

var tmplId = "j-M2CRgovoyFGR8L1wYbO6MzcNgrrDHo9yLL83TYVmY";

//推送模板ID
var controlMoney = [ 200, 100, 50 ];

//3次推送控制金额
Page({
    data: {
        sendPopupText: {
            title: "转好友群志愿卡免费领",
            content: "速转好友群，0元领360元志愿卡，机会难得赶快行动吧！"
        },
        share: false,
        popupTypeTest: null,
        popupClass: {
            shareButtonText: "",
            popupType: "status",
            title: "活动规则",
            bargainPrice: "155",
            content: [ "1、邀请好友帮忙砍价，每次砍价金额随机。", "2、参与好友越多砍价金额越多支付金额越少，最高可砍至0元！", "3、一个账号最多可参与一次砍价活动。", "4、参与砍价优惠购买的志愿卡不支持退款。", "5、ios暂不支持购买，砍至0元可免费激活360元志愿卡。", "6、砍价活动结束后24小时内可享受砍价优惠价格购买会员服务。", "7、本活动最终解释权归完美志愿所有。" ]
        },
        payTime: "",
        bargainGetStatus: true,
        btnAnimate: "",
        formid: "",
        showLoad: false,
        helped: false,
        upperLimit: false,
        loadingBtn: false,
        bargainPrice: 0,
        percent: 0,
        Device: "android",
        isIos: false,
        join: false,
        nickName: "",
        avatarUrl: "",
        friendList: [],
        open: false,
        flag: false,
        overtimeFlag: false,
        joinFlag: false,
        ruleFlag: false,
        bgOpacityMajor: 0,
        wrapAnimateMajor: "",
        popupAnimateMajor: "",
        currentTime: "",
        userInfo: [],
        activityDetail: [],
        shareId: 0,
        OpenId: ""
    },
    addFormidFunc: function addFormidFunc(e) {
        var that = this;
        if (this.data.bargainGetStatus) {
            if (that.data.userInfo[0].Province && that.data.userInfo[0].ProvinceName && that.data.userInfo[0].GKYear) {
                this.shareJoin();
            } else {
                wx.redirectTo({
                    url: "/pages/ImproveGKInformation/index?source=activity" + "&id=" + that.data.userInfo[0].id
                });
            }
        } else {
            wx.showToast({
                title: "活动已结束",
                icon: "none",
                duration: 2e3
            });
        }
    },
    checkPopupType: function checkPopupType(popupType) {
        var that = this;
        if (popupType == "rule") {
            that.data.popupClass.popupType = "rule";
            that.setRuleText();
        } else if (popupType == "mestatus") {
            that.data.popupClass.popupType = "status";
            that.data.popupClass.shareButtonText = "分享给好友(群)，邀请砍价";
            that.data.popupClass.statusText = "快去邀请好友帮忙一起砍价,最高可砍至0元！";
        } else if (popupType == "joinstatus") {
            that.data.popupClass.popupType = "status";
            that.data.popupClass.shareButtonText = "我也要0元购";
            that.data.popupClass.statusText = "邀请你一起砍价，360元志愿卡（VIP）0元购！";
        } else if (popupType == "overtimestatus") {
            that.data.popupClass.popupType = "overtime";
        }
        //overtimestatus
                that.setData({
            popupClass: that.data.popupClass
        }, function() {
            that.selectComponent("#hide")._showTap();
        });
    },
    setRuleText: function setRuleText() {
        var that = this;
        that.data.popupClass.title = "活动规则";
        if (that.data.isIos) {
            that.data.popupClass.content = [ "1、邀请好友帮忙砍价，每次砍价金额随机。", "2、参与好友越多砍价金额越多支付金额越少，最高可砍至0元！", "3、一个账号最多可参与一次砍价活动。", "4、参与砍价优惠购买的志愿卡不支持退款。", "5、ios暂不支持购买，砍至0元可免费激活360元志愿卡。", "6、砍价活动结束后24小时内可享受砍价优惠价格购买会员服务。", "7、本活动最终解释权归完美志愿所有。" ];
        } else {
            that.data.popupClass.content = [ "1、邀请好友帮忙砍价，每次砍价金额随机。", "2、参与好友越多砍价金额越多支付金额越少，最高可砍至0元！", "3、一个账号最多可参与一次砍价活动。", "4、参与砍价优惠购买的志愿卡不支持退款。", "5、砍价活动结束后24小时内可享受砍价优惠价格购买会员服务。", "6、本活动最终解释权归完美志愿所有。" ];
        }
    },
    //
    hideTapIndex: function hideTapIndex() {
        var that = this;
        that.selectComponent("#hide").hidePopupFunc();
    },
    //设置砍价价格
    setbargainPrice: function setbargainPrice(bargainPrice) {
        var that = this;
        that.setData({
            bargainPrice: bargainPrice
        });
    },
    //以前显示弹窗
    beforeshowPopup: function beforeshowPopup() {
        var that = this;
        that.setbargainPrice();
    },
    /*用户点击右上角分享*/
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        if (res.from === "button") {
            return {
                title: "送你一张360元志愿卡，我已0元购买，速度来！",
                path: "/packages/activityBargain/index/index?activitybargain=true&bargainid=" + that.data.activityDetail.numId + "&shareuserid=" + that.data.userInfo[0].UserId,
                imageUrl: "http://wmei-appfile.cn-bj.ufileos.com/0yg/shareActivity.png"
            };
        } else {
            return {
                title: "送你一张360元志愿卡，我已0元购买，速度来！",
                path: "/packages/activityBargain/index/index?activitybargain=true",
                imageUrl: "http://wmei-appfile.cn-bj.ufileos.com/0yg/shareActivity.png"
            };
        }
    },
    // 加两天时间，判断砍价时间
    dateAdd: function dateAdd(startDate) {
        startDate = new Date(startDate);
        startDate = startDate.setDate(startDate.getDate() + 2);
        startDate = new Date(startDate);
        if (this.data.isIos) {
            var nextStartDate = startDate.getFullYear() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getDate();
        } else {
            var nextStartDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
        }
        return nextStartDate;
    },
    // 加三天时间，判断支付时间
    dateAddPayTime: function dateAddPayTime(startDate) {
        startDate = new Date(startDate);
        startDate = startDate.setDate(startDate.getDate() + 3);
        startDate = new Date(startDate);
        if (this.data.isIos) {
            var nextStartDate = startDate.getFullYear() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getDate();
        } else {
            var nextStartDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
        }
        return nextStartDate;
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.bargainGetStatus();
        that.options = options;
        that.setData({
            bargainGetStatus: app.globalData.bargainGetStatus,
            showLoad: true
        });
        if (app.globalData.system == "ios") {
            that.setData({
                isIos: true
            });
        } else {
            that.setData({
                isIos: false
            });
        }
        var userInfo = wx.getStorageSync("userInfo"), openid = wx.getStorageSync("openid");
        if (userInfo && openid) {
            that.initActivity(userInfo, openid);
        } else {
            if (openid) {
                app.globalData.openid = openid;
                that.Validate(openid);
            } else {
                wx.login({
                    success: function success(res) {
                        if (res.code) {
                            //发起网络请求
                            apiCommon.getJsCode2Session("MiniProgram/GetJsCode2Session", "POST", res.code).then(function(res) {
                                if (res.isSuccess) {
                                    var _openid = res.result.openid;
                                    wx.setStorage({
                                        key: "openid",
                                        data: _openid
                                    });
                                    app.globalData.openid = _openid;
                                    that.Validate(_openid);
                                }
                            });
                        } else {}
                    }
                });
            }
        }
    },
    bargainGetStatus: function bargainGetStatus() {
        //活动状态
        var that = this;
        apiCommon.bargainGetStatus("Admin/PanicBuying/Config/Get", "POST").then(function(res) {
            that.setData({
                bargainGetStatus: res.result.panicBuyingStatus == 1 ? true : false
            });
            app.globalData.bargainGetStatus = res.result.panicBuyingStatus == 1 ? true : false;
        });
    },
    // 初始化活动信息
    initActivity: function initActivity(userInfo, openid) {
        var that = this;
        that.sourceSelf = true;
        that.setData({
            userInfo: userInfo,
            OpenId: openid
        }, function() {
            if (that.options && that.options.activitybargain) {
                that.setData({
                    share: true
                });
            }
            if (that.options && that.options.bargainid) {
                that.setData({
                    share: true
                });
                // 通过分享进入
                                if (userInfo[0].UserId == that.options.shareuserid) {
                    that.setData({
                        shareId: parseInt(that.options.bargainid),
                        join: false
                    });
                    that.sourceSelf = true;
                    that.loadBargain(parseInt(that.options.bargainid));
                } else {
                    that.setData({
                        shareId: parseInt(that.options.bargainid),
                        join: true
                    });
                    that.sourceSelf = false;
                    that.loadBargain(parseInt(that.options.bargainid));
                    that.loadIsParticipate(parseInt(that.options.bargainid));
                }
            } else {
                that.sourceSelf = true;
                that.loadBargain(0);
            }
            wx.getUserInfo({
                success: function success(res) {
                    that.setData({
                        nickName: res.userInfo.nickName,
                        avatarUrl: res.userInfo.avatarUrl
                    });
                }
            });
        });
    },
    // 验证是否绑手机
    Validate: function Validate(openid) {
        var that = this;
        var userDto = wx.getStorageSync("userDto");
        if (userDto) {
            that.getBrief(userDto.numId, openid);
            //获取用户基本信息
                } else {
            apiCommon.validateSocialUser("Users/Socials/Validate", "POST", 6, openid).then(function(res) {
                //去绑定手机号
                if (res.result && res.result.status == 600) {
                    // ---------------------------------------------------------------------------------------------
                    var url = "";
                    if (that.options && that.options.bargainid) {
                        url = "/pages/bindMobile/index?activitybargain=" + that.options.activitybargain + "&bargainid=" + that.options.bargainid + "&shareuserid=" + that.options.shareuserid;
                    } else {
                        url = "/pages/bindMobile/index?source=activity";
                    }
                    wx.redirectTo({
                        url: url
                    });
                    return;
                } else if (res.result && res.result.status == 200 && res.result.userIdDto) {
                    wx.setStorage({
                        key: "userDto",
                        data: res.result.userIdDto
                    });
                    that.getBrief(res.result.userIdDto.numId, openid);
                    //获取用户基本信息
                                } else {
                    wx.showToast({
                        title: res.message,
                        icon: "none"
                    });
                }
            });
        }
    },
    // 获取用户信息
    getBrief: function getBrief(numId, openid) {
        var that = this;
        apiCommon.getUserBrief("Users/GetBrief", "POST", numId, true).then(function(res) {
            var userArr = [];
            var result = res.result;
            if (result.mobilePhone) {} else {
                var url = "";
                if (that.options && that.options.bargainid) {
                    url = "/pages/bindMobile/index?activitybargain=" + that.options.activitybargain + "&bargainid=" + that.options.bargainid + "&shareuserid=" + that.options.shareuserid;
                } else {
                    url = "/pages/bindMobile/index?source=activity";
                }
                wx.redirectTo({
                    url: url
                });
                return;
            }
            userArr.push({
                id: result.id,
                userName: result.numId || null,
                UserId: result.numId || null,
                Province: result.provinceId || null,
                ProvinceName: result.provinceName || null,
                GKYear: result.gkYear || null,
                MobilePhone: result.mobilePhone || null
            });
            that.setData({
                userInfo: userArr
            });
            app.globalData.initLogin = true;
            that.initActivity(userArr, openid);
        });
    },
    // 好友砍价
    insertBargainFriend: function insertBargainFriend(Username, AvatarUrl) {
        var that = this;
        that.setData({
            loadingBtn: true
        });
        var BargainId = that.data.shareId;
        var UserId = that.data.userInfo[0].UserId;
        var data = {
            UserId: UserId,
            Username: Username,
            AvatarUrl: AvatarUrl,
            BargainId: BargainId
        };
        api.insertBargainFriend("Marketing/PanicBuying/Friends/Insert", "POST", data, UserId).then(function(res) {
            console.log(res);
            if (res.isSuccess) {
                that.setData({
                    bargainPrice: res.result.price,
                    loadingBtn: false,
                    helped: true
                });
                that.showJoinPopup();
                that.loadBargain(that.data.shareId);
            } else {
                var message = res.message;
                if (message.indexOf("已帮助好友砍价") != -1) {
                    that.setData({
                        loadingBtn: false,
                        helped: true
                    });
                } else if (message.indexOf("您今日已达到砍价次数上限") != -1) {
                    wx.showToast({
                        title: res.message,
                        icon: "none",
                        duration: 2e3
                    });
                    that.setData({
                        loadingBtn: false,
                        upperLimit: true,
                        helped: true
                    });
                } else {
                    that.setData({
                        loadingBtn: false
                    });
                    wx.showToast({
                        title: res.message,
                        icon: "none",
                        duration: 2e3
                    });
                }
            }
        });
    },
    // 判断好友是否参与过当前砍价活动
    loadIsParticipate: function loadIsParticipate(BargainId) {
        var that = this;
        wx.showLoading({
            title: "加载中"
        });
        var UserId = that.data.userInfo[0].UserId;
        var data = {
            UserId: UserId,
            BargainId: BargainId
        };
        api.isParticipate("Marketing/PanicBuying/Friends/Validate", "POST", data, UserId).then(function(res) {
            wx.hideLoading();
            if (res.result.value == false) {} else {
                that.setData({
                    loadingBtn: false,
                    helped: true
                });
            }
        });
    },
    // 获取砍价活动信息(分享砍价获取信息活动ID不允许为空)
    loadBargain: function loadBargain(BargainId) {
        var _this = this;
        app.closeinterval();
        var that = this;
        var UserId = that.data.userInfo[0].UserId;
        var OpenId = that.data.OpenId;
        var data = {
            BargainId: BargainId,
            OpenId: OpenId
        };
        api.getBargain("Marketing/PanicBuying/Activity/Get", "POST", data).then(function(res) {
            if (res.result.numId != 0) {
                that.setData({
                    activityDetail: res.result,
                    percent: res.result.alreadyBargainPrice / 3
                });
                //活动开始时间
                                var start_time = app.transDateTime(res.result.creationTime, "YYYY-mm-dd HH:MM:SS");
                var a = start_time.slice(0, 10);
                var aPay = start_time.slice(0, 10);
                var b = start_time.slice(11, 19);
                a = that.dateAdd(a);
                var aPayTime = that.dateAddPayTime(aPay);
                var payTime = aPayTime + " " + b;
                payTime = new Date(payTime).getTime();
                that.setData({
                    payTime: payTime
                });
                start_time = a + " " + b;
                app.countdown(_this, start_time);
                that.queryBargainFriend(res.result.numId);
                // ******************************订阅授权弹框*******************************
                // that.sourceSelf 来源是自己
                                if (that.sourceSelf) {
                    // const controlMoney = [320,315,150,50];
                    var remainingPrice = res.result.remainingPrice;
                    if (remainingPrice <= controlMoney[0] && remainingPrice > controlMoney[1]) {
                        that.setData({
                            "sendPopupText.title": "转好友群志愿卡免费领",
                            "sendPopupText.content": "速转好友群，0元领360元志愿卡，机会难得赶快行动吧！"
                        }, function() {
                            that.controlSentPushPopuo(1);
                        });
                    } else if (remainingPrice <= controlMoney[1] && remainingPrice > controlMoney[2]) {
                        that.setData({
                            "sendPopupText.title": "升级会员仅付" + res.result.remainingPrice + "元",
                            "sendPopupText.content": "超高性价比，仅需支付" + res.result.remainingPrice + "元，填志愿一键搞定！"
                        }, function() {
                            that.controlSentPushPopuo(2);
                        });
                    } else if (remainingPrice <= controlMoney[2]) {
                        that.setData({
                            "sendPopupText.title": "升级会员仅付" + res.result.remainingPrice + "元",
                            "sendPopupText.content": "限时福利，仅需支付" + res.result.remainingPrice + "元，查大学找专业填志愿超便捷。"
                        }, function() {
                            that.controlSentPushPopuo(4);
                        });
                    }
                }
            } else {
                that.setData({
                    activityDetail: res.result
                });
                that.getUserInfoStart();
            }
        });
    },
    controlSentPushPopuo: function controlSentPushPopuo(index) {
        var controlSentPush = parseInt(wx.getStorageSync("controlSentPush"));
        if (controlSentPush) {
            if (controlSentPush != index) {
                wx.setStorage({
                    key: "controlSentPush",
                    data: index
                });
                this.sendPushPopup();
                //推送弹框
                        }
        } else {
            wx.setStorage({
                key: "controlSentPush",
                data: index
            });
            this.sendPushPopup();
            //推送弹框
                }
    },
    // 获取好友砍价前20条记录
    queryBargainFriend: function queryBargainFriend(bargainId) {
        var that = this;
        var data = {
            BargainId: bargainId
        };
        api.queryBargainFriend("Marketing/PanicBuying/Friends/Query", "POST", data).then(function(res) {
            that.setData({
                friendList: res.result.reverse(),
                showLoad: false
            });
            wx.stopPullDownRefresh();
        });
    },
    // 参加活动
    insertBargain: function insertBargain(Username, AvatarUrl) {
        var that = this;
        app.closeinterval();
        that.setData({
            loadingBtn: true
        });
        var UserId = that.data.userInfo[0].UserId;
        var ProvinceId = that.data.userInfo[0].Province.Id;
        var Device = that.data.isIos == true ? "ios" : "android";
        var OpenId = that.data.OpenId;
        var ProvinceName = that.data.userInfo[0].ProvinceName;
        var data = {
            UserId: UserId,
            OpenId: OpenId,
            Username: Username,
            AvatarUrl: AvatarUrl,
            ProvinceId: ProvinceId,
            ProvinceName: ProvinceName,
            Device: Device
        };
        api.insertBargain("Marketing/PanicBuying/Activity/Insert", "POST", data, UserId).then(function(res) {
            if (!res.isSuccess) {
                that.loadBargain(0);
                that.setData({
                    loadingBtn: false
                });
            } else {
                wx.requestSubscribeMessage({
                    tmplIds: [ tmplId ],
                    success: function success(result) {
                        if (result[tmplId] == "accept") {
                            console.log("首次参加活动---用户同意接受推送");
                        } else {
                            console.log("首次参加活动---用户取消接受推送");
                        }
                    }
                });
                that.loadBargain(res.result.numId);
                that.setData({
                    bargainPrice: res.result.price,
                    loadingBtn: false,
                    showLoad: false
                }, function() {
                    that.showPopup();
                });
            }
        });
    },
    // 自己砍价弹框
    showPopup: function showPopup() {
        var that = this;
        that.data.popupClass.popupType = "status", that.data.popupClass.shareButtonText = "分享给好友(群)，邀请砍价", 
        that.data.popupClass.statusText = "快去邀请好友帮忙一起砍价,最高可砍至0元！";
        that.setData({
            popupClass: that.data.popupClass
        }, function() {
            that.selectComponent("#hide")._showTap();
        });
    },
    // 参与者砍价弹窗
    showJoinPopup: function showJoinPopup() {
        var that = this;
        that.checkPopupType("joinstatus");
    },
    // 砍价超时弹窗
    showOvertimePopup: function showOvertimePopup() {
        var that = this;
        that.checkPopupType("overtimestatus");
        that.setData({
            bgOpacityMajor: 0,
            wrapAnimateMajor: "wrapAnimate",
            popupAnimateMajor: "popupAnimate",
            overtimeFlag: true
        });
    },
    // 收起展开
    openBtn: function openBtn() {
        var that = this;
        this.setData({
            open: !that.data.open
        });
    },
    // button授权
    getUserInfo: function getUserInfo(e) {
        this.getUserInfoCommon();
    },
    getUserInfoStart: function getUserInfoStart(e) {
        var that = this;
        wx.getUserInfo({
            success: function success(res) {
                that.setData({
                    nickName: res.userInfo.nickName,
                    avatarUrl: res.userInfo.avatarUrl
                });
                that.setData({
                    showLoad: false
                });
            },
            fail: function fail() {
                that.setData({
                    showLoad: false
                });
            }
        });
    },
    // 获取用户信息函数
    getUserInfoCommon: function getUserInfoCommon() {
        var that = this;
        wx.getUserInfo({
            success: function success(res) {
                that.setData({
                    nickName: res.userInfo.nickName,
                    avatarUrl: res.userInfo.avatarUrl
                });
                // if (that.data.userInfo[0].Province && that.data.userInfo[0].ProvinceName && that.data.userInfo[0].GKYear){
                                that.insertBargainFriend(res.userInfo.nickName, res.userInfo.avatarUrl);
                // }else{
                // wx.redirectTo({
                //   url: '/pages/ImproveGKInformation/index?source=activity' + '&id=' + that.data.userInfo[0].id,
                // })
                // }
                        },
            fail: function fail() {}
        });
    },
    // 帮好友砍一刀 
    help: function help(e) {
        this.setData({
            loadingBtn: true
        });
        this.insertBargainFriend(this.data.nickName, this.data.avatarUrl);
    },
    // 活动规则
    showRulePopup: function showRulePopup() {
        var that = this;
        that.checkPopupType("rule");
        if (that.data.popupTypeTest) {
            if (that.data.popupTypeTest == 1) that.checkPopupType("rule"); else if (that.data.popupTypeTest == 2) that.checkPopupType("mestatus"); else if (that.data.popupTypeTest == 3) that.checkPopupType("joinstatus"); else if (that.data.popupTypeTest == 4) that.checkPopupType("overtimestatus");
        }
    },
    // 隐藏规则弹框
    hideRulePopup: function hideRulePopup() {
        var that = this;
        this.setData({
            bgOpacityMajor: .7,
            wrapAnimateMajor: "wrapAnimateOut",
            popupAnimateMajor: "popupAnimateOut"
        });
        setTimeout(function() {
            that.setData({
                ruleFlag: false
            });
        }, 200);
    },
    //卸载页面，关闭定时器
    onUnload: function onUnload() {
        app.closeinterval();
    },
    addFormidview: function addFormidview() {
        var that = this;
        if (that.data.bargainGetStatus) {
            that.shareJoin();
        } else {
            wx.showToast({
                title: "活动已结束",
                icon: "none",
                duration: 2e3
            });
        }
    },
    // 参与砍价者参与0元购
    addFormidfun: function addFormidfun(e) {
        if (this.data.bargainGetStatus) {
            this.shareJoin();
        } else {
            wx.showToast({
                title: "活动已结束",
                icon: "none",
                duration: 2e3
            });
        }
    },
    shareJoin: function shareJoin() {
        if (this.data.bargainGetStatus) {
            app.closeinterval();
            this.setData({
                showLoad: true,
                join: false
            });
            this.insertBargain(this.data.nickName, this.data.avatarUrl);
        } else {
            wx.showToast({
                title: "活动已结束",
                icon: "none",
                duration: 2e3
            });
        }
    },
    // 激活会员卡
    activationUserPermission: function activationUserPermission() {
        var that = this;
        that.setData({
            loadingBtn: true
        });
        var OpenId = that.data.OpenId;
        var SourceSign = "2020Y360";
        //UFS（用户来源）标记 如： 2018Y360
                var Device = that.data.isIos == true ? 2 : 1;
        var data = {
            OpenId: OpenId,
            SourceSign: SourceSign,
            Device: Device
        };
        api.activationUserPermission("Marketing/PanicBuying/Activity/UpgradeUserPermission", "POST", data).then(function(result) {
            if (result.isSuccess) {
                apiCommon.GetPermission("Users/GetPermission", "POST", that.data.userInfo[0].MobilePhone).then(function(res) {
                    if (res.isSuccess) {
                        var userInfo = wx.getStorageSync("userInfo");
                        if (userInfo) {
                            userInfo[0].UserType = res.result.userPermissionId;
                            wx.setStorageSync("userInfo", userInfo);
                        }
                        wx.redirectTo({
                            url: "../activationVIP/activationVIP"
                        });
                    } else {
                        wx.showToast({
                            title: res.message,
                            icon: "none"
                        });
                    }
                    that.setData({
                        loadingBtn: false
                    });
                });
            } else {
                that.setData({
                    loadingBtn: false
                });
                wx.showToast({
                    title: result.message,
                    icon: "none"
                });
            }
        });
    },
    // 支付
    payments: function payments() {
        var that = this;
        if (new Date().getTime() > this.data.payTime) {
            // 支付 砍价结束后大于一天不可购买，给弹框提示
            this.showOvertimePopup();
        } else {
            wx.showLoading({
                title: "加载中"
            });
            that.body = "砍价0元购-" + that.data.activityDetail.remainingPrice;
            var total_fee = that.data.activityDetail.remainingPrice;
            var IsTest = false;
            if (that.data.userInfo[0].UserId == 14092188 || that.data.userInfo[0].MobilePhone == "15000596443" || that.data.userInfo[0].MobilePhone == "17530151392" || that.data.userInfo[0].MobilePhone == "18645887808") {
                total_fee = .01;
                IsTest = true;
            }
            var userInfo = that.data.userInfo[0];
            var userId = userInfo.UserId;
            var mobilePhone = userInfo.MobilePhone;
            var appPayType = 5;
            var payDeviceType = 6;
            var bussType = 45;
            var provinceId = userInfo.Province;
            var price = total_fee;
            var provinceName = userInfo.ProvinceName;
            var userRemark = that.data.activityDetail.numId;
            that.insertAppOrder(userId, mobilePhone, appPayType, payDeviceType, bussType, provinceId, price, IsTest, 0, "", 1, provinceName, userRemark);
        }
    },
    insertAppOrder: function insertAppOrder(userId, mobilePhone, appPayType, payDeviceType, bussType, provinceId, price, isTest, productId, remark, quantity, provinceName, userRemark) {
        //添加 手机APP环境 支付单
        var that = this;
        apiCommon.insertAppOrder("Payment/Order/InsertAppOrder", "POST", userId, mobilePhone, appPayType, payDeviceType, bussType, provinceId, price, isTest, productId, remark, quantity, provinceName, userRemark).then(function(res) {
            if (res.isSuccess) {
                var total_fee = price * 100;
                var out_trade_no = res.result;
                var nonce_str = app.randomString(30);
                var stringSignTemp = "appid=" + app.globalData.appid + "&body=" + that.body + "&mch_id=" + app.globalData.Mch_id + "&nonce_str=" + nonce_str + "&notify_url=" + app.globalData.notify_url + "&openid=" + that.data.OpenId + "&out_trade_no=" + out_trade_no + "&spbill_create_ip=" + app.globalData.spbill_create_ip + "&total_fee=" + total_fee + "&trade_type=" + app.globalData.trade_type + "&key=" + app.globalData.Mch_key;
                var sign = _MD2.default.hexMD5(stringSignTemp).toUpperCase();
                that.getUnifiedOrder(_config2.default.Mch_id, app.globalData.Mch_key, _config2.default.appid, app.uncompileStr(_config2.default.app + _config2.default.sec + _config2.default.ret), that.body, app.globalData.notify_url, that.data.OpenId, out_trade_no, app.globalData.spbill_create_ip, total_fee, app.globalData.trade_type, nonce_str);
            } else {
                wx.hideLoading();
                wx.showToast({
                    title: res.message,
                    icon: "none"
                });
            }
        });
    },
    getUnifiedOrder: function getUnifiedOrder(mchId, key, appId, appSecret, body, notifyUrl, openId, outTradeNo, spbillCreateIp, totalFee, tradeType, nonceStr) {
        var _this2 = this;
        apiCommon.getUnifiedOrder("WeixinPay/GetUnifiedOrder", "POST", mchId, key, appId, appSecret, body, notifyUrl, openId, outTradeNo, spbillCreateIp, totalFee, tradeType, nonceStr).then(function(res) {
            if (res.result && res.result) {
                wx.hideLoading();
                var result = res.result;
                var Package = "prepay_id=" + result.prepayId;
                _this2.requestPayment(result.timestamp, result.nonceStr, Package, result.signType, result.sign);
            } else {}
        });
    },
    requestPayment: function requestPayment(timeStamp, nonceStr, Package, signType, paySign) {
        var that = this;
        wx.requestPayment({
            timeStamp: String(timeStamp),
            nonceStr: nonceStr,
            package: Package,
            signType: signType,
            paySign: paySign,
            success: function success() {
                apiCommon.GetPermission("Users/GetPermission", "POST", that.data.userInfo[0].MobilePhone).then(function(res) {
                    if (res.isSuccess) {
                        var userInfo = wx.getStorageSync("userInfo");
                        userInfo[0].UserType = res.result.userPermissionId;
                        wx.setStorageSync("userInfo", userInfo);
                        wx.redirectTo({
                            url: "../paySuccess/paySuccess?price=" + that.data.activityDetail.remainingPrice
                        });
                    } else {
                        wx.showToast({
                            title: res.message,
                            icon: "none"
                        });
                    }
                });
            },
            fail: function fail(res) {
                wx.showModal({
                    title: "提示",
                    content: "尊敬的用户离购买完成只差一步，怎么能放弃~ \n 您可点击“继续支付”完成订单",
                    cancelText: "确定放弃",
                    confirmText: "继续支付",
                    success: function success(res) {
                        if (res.confirm) {
                            that.requestPayment(timeStamp, nonceStr, Package, signType, paySign);
                        } else if (res.cancel) {}
                    }
                });
            },
            complete: function complete(res) {}
        });
    },
    onPullDownRefresh: function onPullDownRefresh() {
        //下拉加载
        var that = this;
        that.loadBargain(that.data.activityDetail.numId);
    },
    // 订阅
    sendPush: function sendPush() {
        var that = this;
        that.hideSendPush();
        wx.requestSubscribeMessage({
            tmplIds: [ tmplId ],
            success: function success(res) {
                if (res[tmplId] == "accept") {
                    console.log("用户同意接受推送");
                } else {
                    console.log("用户取消接受推送");
                }
            }
        });
    },
    sendPushPopup: function sendPushPopup() {
        this.selectComponent("#sendPush")._showTap();
    },
    hideSendPush: function hideSendPush() {
        this.selectComponent("#sendPush").hidePopupFunc();
    }
});