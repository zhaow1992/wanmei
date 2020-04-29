// packages/Elective/myElective/myElective.js
var app = getApp();

Page({
    /**
   * 页面的初始数据
   */
    data: {
        disabled: true,
        selectOneSub: "",
        selectTwoSub: [],
        oneChooseSubject: [],
        chooseSubjectList: []
    },
    // 3+1+2 选择
    chooseOneSubject: function chooseOneSubject(e) {
        var that = this;
        var name = e.currentTarget.dataset.name;
        var oneChooseSubject = this.data.oneChooseSubject;
        var selectOneSub = this.data.selectOneSub;
        oneChooseSubject.forEach(function(ele) {
            if (ele.name == name) {
                ele.isSelect = true;
            } else {
                ele.isSelect = false;
            }
        });
        this.setData({
            oneChooseSubject: oneChooseSubject,
            selectOneSub: name
        }, function() {
            that.checkDisabled();
        });
    },
    //  传统省份选择
    chooseTwoSubject: function chooseTwoSubject(e) {
        var that = this;
        var name = e.currentTarget.dataset.name;
        var chooseSubjectList = this.data.chooseSubjectList;
        var selectTwoSub = this.data.selectTwoSub;
        var provinceId = this.data.provinceId;
        chooseSubjectList.forEach(function(ele) {
            if (ele.name == name) {
                if (ele.isSelect) {
                    ele.isSelect = false;
                    selectTwoSub.forEach(function(el, index) {
                        if (el == ele.name) {
                            selectTwoSub.splice(index, 1);
                        }
                    });
                } else {
                    if (that.data.oneChooseSubject.length == 0) {
                        if (selectTwoSub.length === 3) {
                            return;
                        }
                    } else {
                        if (selectTwoSub.length === 2) {
                            return;
                        }
                    }
                    ele.isSelect = true;
                    selectTwoSub.push(ele.name);
                }
            }
        });
        this.setData({
            chooseSubjectList: chooseSubjectList,
            selectTwoSub: selectTwoSub
        }, function() {
            that.checkDisabled();
        });
    },
    checkDisabled: function checkDisabled() {
        var that = this;
        var selectOneSub = this.data.selectOneSub;
        var selectTwoSub = this.data.selectTwoSub;
        if (selectTwoSub.length == 2 && selectOneSub) {
            that.setData({
                disabled: false
            });
        } else if (selectTwoSub.length == 3) {
            that.setData({
                disabled: false
            });
        } else {
            that.setData({
                disabled: true
            });
        }
    },
    //提交
    confirme: function confirme() {
        var selectTwoSub = this.data.selectTwoSub;
        var selectOneSub = this.data.selectOneSub;
        if (selectOneSub) {
            selectTwoSub.unshift(selectOneSub);
        }
        console.log("最终选择", selectTwoSub);
        app.globalData.chooseSubject.subject = selectTwoSub;
        wx.navigateTo({
            url: "../loading/loading?type=3"
        });
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {
        console.log(app.globalData.chooseSubject);
        var provinceId = app.globalData.chooseSubject.provinceId;
        var year = app.globalData.chooseSubject.year;
        // 3+1+2
                if (provinceId == 1 || provinceId == 849 || provinceId == 839 || provinceId == 854 || provinceId == 845 || provinceId == 851 || provinceId == 850 || provinceId == 1128) {
            this.setData({
                oneChooseSubject: [ {
                    name: "历史",
                    src: "../image/lishi.png",
                    isSelect: false
                }, {
                    name: "物理",
                    src: "../image/wl.png",
                    isSelect: false
                } ],
                chooseSubjectList: [ {
                    name: "政治",
                    src: "../image/sxzz.png",
                    isSelect: false
                }, {
                    name: "地理",
                    src: "../image/dl.png",
                    isSelect: false
                }, {
                    name: "化学",
                    src: "../image/hx.png",
                    isSelect: false
                }, {
                    name: "生物",
                    src: "../image/sw.png",
                    isSelect: false
                } ]
            });
            // 浙江 7选3
                } else if (provinceId == 843) {
            this.setData({
                chooseSubjectList: [ {
                    name: "物理",
                    src: "../image/wl.png",
                    isSelect: false
                }, {
                    name: "生物",
                    src: "../image/sw.png",
                    isSelect: false
                }, {
                    name: "化学",
                    src: "../image/hx.png",
                    isSelect: false
                }, {
                    name: "技术",
                    src: "../image/jishu.png",
                    isSelect: false
                }, {
                    name: "历史",
                    src: "../image/lishi.png",
                    isSelect: false
                }, {
                    name: "地理",
                    src: "../image/dl.png",
                    isSelect: false
                }, {
                    name: "政治",
                    src: "../image/sxzz.png",
                    isSelect: false
                } ]
            });
            // 上海
                } else if (provinceId == 842) {
            this.setData({
                chooseSubjectList: [ {
                    name: "政治",
                    src: "../image/sxzz.png",
                    isSelect: false
                }, {
                    name: "历史",
                    src: "../image/lishi.png",
                    isSelect: false
                }, {
                    name: "地理",
                    src: "../image/dl.png",
                    isSelect: false
                }, {
                    name: "生命科学",
                    src: "../image/smkx.png",
                    isSelect: false
                }, {
                    name: "物理",
                    src: "../image/wl.png",
                    isSelect: false
                }, {
                    name: "化学",
                    src: "../image/hx.png",
                    isSelect: false
                } ]
            });
            //传统省份
                } else {
            this.setData({
                chooseSubjectList: [ {
                    name: "政治",
                    src: "../image/sxzz.png",
                    isSelect: false
                }, {
                    name: "历史",
                    src: "../image/lishi.png",
                    isSelect: false
                }, {
                    name: "地理",
                    src: "../image/dl.png",
                    isSelect: false
                }, {
                    name: "物理",
                    src: "../image/wl.png",
                    isSelect: false
                }, {
                    name: "化学",
                    src: "../image/hx.png",
                    isSelect: false
                }, {
                    name: "生物",
                    src: "../image/sw.png",
                    isSelect: false
                } ]
            });
        }
        this.setData({
            provinceId: provinceId,
            year: year
        });
    },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function onReady() {},
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function onShow() {
        if (!this.data.disabled) {
            var oneChooseSubject = this.data.oneChooseSubject;
            var chooseSubjectList = this.data.chooseSubjectList;
            if (oneChooseSubject.length !== 0) {
                oneChooseSubject.forEach(function(ele) {
                    ele.isSelect = false;
                });
            }
            chooseSubjectList.forEach(function(ele) {
                ele.isSelect = false;
            });
            this.setData({
                disabled: true,
                selectOneSub: "",
                selectTwoSub: [],
                oneChooseSubject: oneChooseSubject,
                chooseSubjectList: chooseSubjectList
            });
        }
    },
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