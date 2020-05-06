Page({
    data: {
        usertype: 0,
        batchList: [ {
            name: "不限",
            st: true
        }, {
            name: "综合",
            st: false
        }, {
            name: "理工",
            st: false
        }, {
            name: "财经",
            st: false
        }, {
            name: "农林",
            st: false
        }, {
            name: "医药",
            st: false
        }, {
            name: "师范",
            st: false
        }, {
            name: "体育",
            st: false
        }, {
            name: "政法",
            st: false
        }, {
            name: "艺术",
            st: false
        }, {
            name: "民族",
            st: false
        }, {
            name: "军事",
            st: false
        }, {
            name: "语言",
            st: false
        }, {
            name: "其他",
            st: false
        } ],
        showBtn: true
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll("选择类型", true);
        wx.getStorage({
            key: "recommendBatchList",
            success: function success(res) {
                for (var i = 0; i < res.data.length; i++) {
                    for (var j = 0; j < that.data.batchList.length; j++) {
                        if (res.data[i] == that.data.batchList[j].name) {
                            that.data.batchList[j].st = true;
                            continue;
                        }
                    }
                }
                that.setData({
                    batchList: that.data.batchList
                });
            }
        });
        try {
            var userInfo = wx.getStorageSync("userInfo");
            if (userInfo) {
                that.setData({
                    usertype: userInfo[0].UserType
                });
            }
        } catch (e) {}
    },
    chooseCityArr: function chooseCityArr(e) {
        var that = this;
        var batchList = that.data.batchList;
        var batchName = e.currentTarget.dataset.name;
        if (batchName == "不限") {
            batchList[0].st = true;
            for (var i = 1; i < batchList.length; i++) {
                batchList[i].st = false;
            }
            that.setData({
                showBtn: true
            });
        } else {
            batchList[0].st = true;
            for (var i = 1; i < batchList.length; i++) {
                var flag = !batchList[i].st;
                if (batchName == batchList[i].name) {
                    batchList[i].st = flag;
                }
            }
            batchList.map(function(i, index) {
                if (i.st && index > 0) {
                    batchList[0].st = false;
                }
            });
            that.setData({
                showBtn: true
            });
        }
        that.setData({
            batchList: batchList
        });
    },
    quedingChoose: function quedingChoose() {
        var that = this;
        if (that.data.usertype < 2) {
            wx.showToast({
                title: "开通VIP即可体验",
                icon: "none",
                duration: 2e3
            });
            setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 1e3);
            return;
        }
        var batchArr = [];
        for (var i = 1; i < that.data.batchList.length; i++) {
            if (that.data.batchList[i].st == true) {
                batchArr.push(that.data.batchList[i].name);
            }
        }
        wx.setStorage({
            key: "recommendBatchList",
            data: batchArr
        });
        wx.navigateBack({
            delta: 1
        });
    }
});