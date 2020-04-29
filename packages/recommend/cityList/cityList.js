Page({
    data: {
        //海南 青海 西藏
        usertype: 0,
        cityList: [],
        showBtn: false,
        cityId: null,
        hiddenFlag: true
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll("选择省份", true);
        var cityListArr = [ {
            cityName: "全国",
            cityId: -1,
            st: false
        } ];
        try {
            var cityList = wx.getStorageSync("cityList");
            var cityId = 843;
            var userInfo = wx.getStorageSync("userInfo");
            if (userInfo) {
                that.setData({
                    usertype: userInfo[0].UserType
                });
            }
            if (cityList) {
                that.setData({
                    cityId: cityId
                });
                if (cityId == 843) {
                    that.setData({
                        hiddenFlag: false
                    });
                }
                for (var i = 0; i < cityList.length; i++) {
                    cityListArr.push({
                        cityName: cityList[i].name,
                        cityId: cityList[i].numId,
                        st: false
                    });
                }
                that.setData({
                    cityList: cityListArr
                });
            }
        } catch (e) {}
        wx.getStorage({
            key: "recommendCityList",
            success: function success(res) {
                for (var _i = 0; _i < res.data.length; _i++) {
                    for (var j = 0; j < that.data.cityList.length; j++) {
                        if (res.data[_i] == that.data.cityList[j].cityId) {
                            that.data.cityList[j].st = true;
                            continue;
                        }
                    }
                }
                that.setData({
                    cityList: that.data.cityList
                });
            }
        });
    },
    chooseCityArr: function chooseCityArr(e) {
        var that = this;
        var cityList = that.data.cityList;
        var cityId = e.currentTarget.dataset.id;
        if (that.data.cityId == 843) {
            if (cityId == -1) {
                cityList[0].st = true;
                for (var i = 1; i < cityList.length; i++) {
                    cityList[i].st = false;
                }
                that.setData({
                    showBtn: true
                });
            } else {
                cityList[0].st = false;
                for (var i = 0; i < cityList.length; i++) {
                    var flag = !cityList[i].st;
                    if (cityId == cityList[i].cityId) {
                        cityList[i].st = flag;
                    }
                }
                that.setData({
                    showBtn: true
                });
            }
        } else {
            if (cityId == -1) {
                cityList[0].st = true;
                for (var i = 1; i < cityList.length; i++) {
                    cityList[i].st = false;
                }
                that.setData({
                    showBtn: true
                });
            } else {
                cityList[0].st = false;
                for (var i = 1; i < cityList.length; i++) {
                    var flag = !cityList[i].st;
                    if (cityId == cityList[i].cityId) {
                        cityList[i].st = flag;
                    }
                }
                that.setData({
                    showBtn: true
                });
            }
        }
        that.setData({
            cityList: that.data.cityList
        });
    },
    quedingChoose: function quedingChoose() {
        var that = this;
        if (that.data.usertype < 3) {
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
        var cityArr = [];
        for (var i = 1; i < that.data.cityList.length; i++) {
            if (that.data.cityList[i].st == true) {
                cityArr.push(that.data.cityList[i].cityId);
            }
        }
        wx.setStorage({
            key: "recommendCityList",
            data: cityArr
        });
        wx.navigateBack({
            delta: 1
        });
    }
});