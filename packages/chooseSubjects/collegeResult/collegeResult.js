var api = require("../api.js");

var app = getApp();

Page({
    data: {
        share: false,
        animation: {},
        toastShow: false,
        type: 1,
        isLike: false,
        collegeInfo: "",
        scrollH: 0,
        chooseSubjectType: 1
    },
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        if (res.from === "button") {}
        return {
            title: "我已生成[新高考选科]的报告",
            imageUrl: "http://wmei-appfile.cn-bj.ufileos.com/share_xk.png",
            path: "/packages/chooseSubjects/collegeResult/collegeResult?code=" + that.code + "&uCode=" + that.uCode + "&provinceId=" + that.provinceId + "&year=" + that.year + "&share=true"
        };
    },
    goCollegeDetail: function goCollegeDetail() {
        wx.navigateTo({
            url: "/packages/findUniversity/collegeDetail/collegeDetail?numId=" + this.code
        });
    },
    onLoad: function onLoad(options) {
        var code = options.code, uCode = options.uCode;
        this.code = options.code;
        this.uCode = options.uCode;
        if (options && options.share) {
            this.provinceId = options.provinceId;
            this.year = options.year;
            this.setData({
                chooseSubjectType: options.type,
                share: true
            });
        } else {
            this.provinceId = app.globalData.chooseSubject.provinceId;
            this.year = app.globalData.chooseSubject.year;
            this.setData({
                chooseSubjectType: app.globalData.chooseSubject.provinceType
            });
        }
        this.getCollegeResult(code, uCode);
        this.getScrollH();
    },
    // 计算dom高度
    getScrollH: function getScrollH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.select("#nav").boundingClientRect();
        item.exec(function(res) {
            that.setData({
                scrollH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
            });
        });
    },
    //获取大学选考科目查询结果/专业匹配率
    getCollegeResult: function getCollegeResult(code, uCode) {
        var that = this;
        api.getCollegeResult("ChooseSubject/Colleges/Get", "POST", {
            uCode: uCode,
            collegeId: code,
            provinceId: that.provinceId,
            year: that.year
        }).then(function(res) {
            that.setData({
                collegeInfo: res.result
            });
        });
    },
    like: function like() {
        this.setData({
            isLike: !this.data.isLike
        });
    },
    //弹出抽屉
    showToast: function showToast(e) {
        var type = e.currentTarget.dataset.type;
        this.setData({
            type: type
        });
        var anim = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        anim.translateY(521).step();
        this.setData({
            animationData: anim.export(),
            toastShow: true
        });
        setTimeout(function() {
            anim.translateY(0).step();
            this.setData({
                animationData: anim.export()
            });
        }.bind(this), 200);
    },
    hideToast: function hideToast() {
        var anim = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        anim.translateY(521).step();
        this.setData({
            animationData: anim.export()
        });
        setTimeout(function() {
            anim.translateY(0).step();
            this.setData({
                animationData: anim.export(),
                toastShow: false
            });
        }.bind(this), 200);
    }
});