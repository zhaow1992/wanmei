// pages/cepingIndex/cepingIndex.js
var api = require("../../utils/api.js");

var app = getApp();

Page({
    /**
   * 页面的初始数据
   */
    data: {
        mindVideoList: [],
        studyVideoList: [],
        majorVideoList: [],
        navigationHome: false,
        cepingCount: 0,
        loginFlag: false,
        studentOrparent: {
            popupFlag: false,
            wrapAnimate: "",
            popupAnimate: "",
            bgOpacity: ""
        },
        popup: {
            popupFlag: false,
            wrapAnimate: "",
            popupAnimate: "",
            bgOpacity: ""
        },
        sexPopup: {
            bgOpacity: 0,
            wrapAnimate: "",
            popupAnimate: "",
            sexFlag: ""
        },
        //学习状态
        xxzt: [ {
            name: "考试心理和行为测试",
            desc: "考试总是发挥失常？",
            multiple: 5,
            base: 45138,
            type: 3,
            imgUrl: "/image/ceping/ksxl.png"
        }, {
            name: "学习拖延测评",
            desc: "提到学习就焦虑害怕？",
            multiple: 5,
            base: 34178,
            type: 5,
            imgUrl: "/image/ceping/xxty.png"
        }, {
            name: "学习倦怠测评",
            desc: "提到学习就乏力？",
            multiple: 5,
            base: 39278,
            type: 2,
            imgUrl: "/image/ceping/xxdj.png"
        }, {
            name: "学习能力测评",
            desc: "成绩提升有方法",
            multiple: 5,
            base: 41278,
            type: 4,
            imgUrl: "/image/ceping/xxnl.png"
        } ],
        //心理健康
        xljk: [ {
            name: "家庭教育方式测评",
            desc: "青春的孩子应如何教育",
            multiple: 4,
            base: 29846,
            type: 6,
            imgUrl: "/image/ceping/jtjy.png"
        }, {
            name: "自我控制能力测评",
            desc: "测量对自己的行为控制能力",
            multiple: 4,
            base: 45689,
            type: 1,
            imgUrl: "/image/ceping/zwkznl.png"
        } ]
    },
    loginPopup: function loginPopup() {
        this.selectComponent("#loginPopup")._showTap();
    },
    showspPopup: function showspPopup() {
        var that = this;
        if (!this.data.loginFlag) {
            this.loginPopup();
            return;
        }
        this.setData({
            "studentOrparent.wrapAnimate": "wrapAnimate",
            "studentOrparent.bgOpacity": 0,
            "studentOrparent.popupFlag": true,
            "studentOrparent.popupAnimate": "popupspAnimate"
        });
    },
    hidespPopup: function hidespPopup() {
        var _this = this;
        this.setData({
            "studentOrparent.wrapAnimate": "wrapAnimateOut",
            "studentOrparent.bgOpacity": .7,
            "studentOrparent.popupAnimate": "popupspAnimateOut"
        });
        setTimeout(function() {
            _this.setData({
                "studentOrparent.popupFlag": false
            });
        }, 200);
    },
    showSexPopup: function showSexPopup() {
        var sex = wx.getStorageSync("sex");
        if (sex != 6) {
            wx.navigateTo({
                url: "/packages/evaluation/evaluationStart/evaluationStart?sex=" + sex + "&ispatriarch=false"
            });
            this.hidespPopup();
        } else {
            var that = this;
            that.setData({
                "sexPopup.bgOpacity": 0,
                "sexPopup.wrapAnimate": "wrapAnimate",
                "sexPopup.popupAnimate": "popupAnimate",
                "sexPopup.sexFlag": true,
                "studentOrparent.popupAnimate": "popupspAnimateOut",
                "studentOrparent.wrapAnimate": "wrapAnimateOut"
            });
        }
    },
    chooseParent: function chooseParent(e) {
        var sex = parseInt(e.currentTarget.dataset.sex);
        this.hidePopup();
        wx.navigateTo({
            url: "/packages/evaluation/evaluationStart/evaluationStart?sex=" + sex + "&ispatriarch=true"
        });
    },
    hideSexPopup: function hideSexPopup() {
        var that = this;
        that.setData({
            "sexPopup.bgOpacity": .4,
            "sexPopup.wrapAnimate": "wrapAnimateOut",
            "sexPopup.popupAnimate": "popupAnimateOut"
        });
        setTimeout(function() {
            that.setData({
                "sexPopup.sexFlag": false,
                "studentOrparent.popupFlag": false
            });
        }, 200);
    },
    showPopup: function showPopup() {
        this.setData({
            "popup.wrapAnimate": "wrapAnimate",
            "popup.bgOpacity": 0,
            "popup.popupFlag": true,
            "popup.popupAnimate": "popupAnimate",
            "studentOrparent.popupAnimate": "popupspAnimateOut",
            "studentOrparent.wrapAnimate": "wrapAnimateOut"
        });
    },
    hidePopup: function hidePopup() {
        var _this2 = this;
        this.setData({
            "popup.wrapAnimate": "wrapAnimateOut",
            "popup.bgOpacity": .4,
            "popup.popupAnimate": "popupAnimateOut"
        });
        setTimeout(function() {
            _this2.setData({
                "popup.popupFlag": false,
                "studentOrparent.popupFlag": false
            });
        }, 200);
    },
    // 选择性别
    chooseSex: function chooseSex(e) {
        var sex = parseInt(e.currentTarget.dataset.sex);
        this.updateBasicInfo(sex);
        wx.setStorageSync("sex", sex);
        this.hideSexPopup();
        wx.navigateTo({
            url: "/packages/evaluation/evaluationStart/evaluationStart?sex=" + sex + "&ispatriarch=false"
        });
    },
    //完善用户信息 （id 和 性别）
    updateBasicInfo: function updateBasicInfo(sex) {
        var userInfo = wx.getStorageSync("userInfo");
        var parameter = {
            id: userInfo[0].id,
            provinceNumId: 0,
            cityNumId: 0,
            countyNumId: 0,
            schoolNumId: userInfo[0].SchoolId || 0,
            schoolName: userInfo[0].schoolName,
            gkYear: 0,
            realName: "",
            sex: sex,
            courseType: -1,
            class: ""
        };
        api.updateBasicInfo("Users/updateBasicInfo", "POST", parameter).then(function(res) {
            userInfo[0].gender = res.result.gender;
            wx.setStorage({
                key: "userInfo",
                data: userInfo,
                success: function success(r) {}
            });
        });
    },
    goMoreVideo: function goMoreVideo(e) {
        var that = this;
        if (!this.data.loginFlag) {
            this.loginPopup();
            return;
        }
        var type = e.currentTarget.dataset.type;
        if (type == 1) {
            wx.navigateTo({
                url: "/pages/classRoomList/classRoomList?SubjectId=2&name=专业解读"
            });
        }
        if (type == 2) {
            wx.navigateTo({
                url: "/pages/classRoomList/classRoomList?SubjectId=0&name=志愿课堂"
            });
        }
        if (type == 3) {
            wx.navigateTo({
                url: "/pages/classRoomList/classRoomList?SubjectId=1&name=高考提分"
            });
        }
    },
    goTestDetail: function goTestDetail(e) {
        var that = this;
        if (!this.data.loginFlag) {
            this.loginPopup();
            return;
        }
        var type = e.currentTarget.dataset.type;
        var name = e.currentTarget.dataset.name;
        wx.navigateTo({
            url: "/pages/cepingReady/cepingReady?type=" + type
        });
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {
        this.transformUserNun();
        this.getVideoList(0);
        this.getVideoList(1);
        this.getVideoList(2);
        var majorRelative = app.getImitateHot(78594, 2);
        this.setData({
            statusH: app.globalData.navigationCustomCapsuleHeight + app.globalData.navigationCustomStatusHeight,
            majorRelative: majorRelative
        });
    },
    //获取视频列表
    getVideoList: function getVideoList(type) {
        var that = this;
        api.getVideoList("App/Videos/Query", "POST", type).then(function(res) {
            if (res.isSuccess && res.result.items.length > 0) {
                // res.result.items.forEach(ele => {
                //   ele.hits = transformCount(ele.hits)
                // })
                if (type == 2) {
                    that.setData({
                        majorVideoList: res.result.items
                    }, function() {
                        console.log(that.data);
                    });
                } else if (type == 0) {
                    that.setData({
                        studyVideoList: res.result.items
                    });
                } else if (type == 1) {
                    that.setData({
                        mindVideoList: res.result.items
                    });
                }
            }
        });
    },
    goMyReport: function goMyReport(e) {
        var that = this;
        if (!this.data.loginFlag) {
            this.loginPopup();
            return;
        }
        wx.navigateTo({
            url: "/packages/userSystem/evaluationReport/evaluationReport?type=0&typesOf=0&isHide=true"
        });
    },
    goPlayVideo: function goPlayVideo(e) {
        var that = this;
        if (!this.data.loginFlag) {
            this.loginPopup();
            return;
        }
        var type = e.currentTarget.dataset.type;
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/classRoomDetail/classRoomDetail?type=" + type + "&id=" + id
        });
    },
    getCepingCount: function getCepingCount(numId) {
        var that = this;
        api.queryRecord("Evaluation/QueryRecord", "POST", numId).then(function(res) {
            if (res.isSuccess) {
                that.setData({
                    cepingCount: res.result.totalCount
                });
            }
        });
    },
    //计算参与人数
    transformUserNun: function transformUserNun() {
        var xxzt = this.data.xxzt;
        var xljk = this.data.xljk;
        xxzt.forEach(function(ele) {
            ele.number = app.getImitateHot(ele.base, ele.multiple);
        });
        xljk.forEach(function(ele) {
            ele.number = app.getImitateHot(ele.base, ele.multiple);
        });
        this.setData({
            xxzt: xxzt,
            xljk: xljk
        });
    },
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function onShow() {
        var userInfo = wx.getStorageSync("userInfo");
        if (userInfo) {
            this.getCepingCount(userInfo[0].UserId);
            this.setData({
                loginFlag: true
            });
        }
    }
});

function transformCount(item) {
    if (item >= 1e4) {
        item = Math.round(item / 1e4 * 10) / 10 + "万";
    }
    return item;
}