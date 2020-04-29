var api = require("../api.js");

var app = getApp();

var collegeId = void 0;

Page({
    data: {
        toastShow: false,
        animationData: {},
        isLike: false,
        majorInfo: "",
        chkItem: "",
        showLoad: false,
        scrollH: 0,
        chooseSubjectType: app.globalData.chooseSubject.provinceType
    },
    onLoad: function onLoad(options) {
        this.setData({
            chooseSubjectType: app.globalData.chooseSubject.provinceType
        });
        var code = options.code;
        this.getScrollH();
        this.setData({
            showLoad: !this.data.showLoad
        });
        this.getMajorResult(code);
    },
    // 计算dom高度
    getScrollH: function getScrollH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.select("#head").boundingClientRect();
        item.exec(function(res) {
            that.setData({
                scrollH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
            });
        });
    },
    //获取专业选考科目查询结果
    getMajorResult: function getMajorResult(code) {
        var _this = this;
        api.getMajorResult("ChooseSubject/Majors/Get", "POST", {
            majorCode: code,
            provinceId: app.globalData.chooseSubject.provinceId,
            year: app.globalData.chooseSubject.year
        }).then(function(res) {
            // res.result.chooseSubjects.items.map(item => {
            //   item.collegeName = item.collegeName.length > 10 ? item.collegeName.substring(0, 10) + '...' : item.collegeName;
            // })
            _this.setData({
                majorInfo: res.result,
                showLoad: !_this.data.showLoad
            });
        });
    },
    //喜欢
    like: function like() {
        this.setData({
            isLike: !this.data.isLike
        });
    },
    //弹出抽屉
    showToast: function showToast(e) {
        var _this2 = this;
        collegeId = this.data.majorInfo.chooseSubjects.items[e.currentTarget.dataset.index].collegeId;
        var uCode = this.data.majorInfo.chooseSubjects.items[e.currentTarget.dataset.index].uCode;
        api.getCollegeResult("ChooseSubject/Colleges/Get", "POST", {
            uCode: uCode,
            collegeId: collegeId,
            provinceId: app.globalData.chooseSubject.provinceId,
            year: app.globalData.chooseSubject.year
        }).then(function(res) {
            res.result.collegeName = res.result.collegeName.length > 8 ? res.result.collegeName.substring(0, 8) + "..." : res.result.collegeName;
            _this2.setData({
                chkItem: res.result
            });
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
    },
    //查看院校详情
    collegeDetail: function collegeDetail() {
        wx.navigateTo({
            url: "/packages/findUniversity/collegeDetail/collegeDetail?numId=" + collegeId
        });
    }
});