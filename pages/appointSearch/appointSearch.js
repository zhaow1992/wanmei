function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}

var api = require("../../utils/api.js");

var app = getApp();

Page({
    data: {
        showLoad: false,
        windowHeight: 0,
        keyword: "",
        searchList: [],
        type: ""
    },
    onLoad: function onLoad(options) {
        this.setData({
            type: options.type
        });
        var icon = "/image/search_icon.png";
        switch (this.data.type) {
          case "1":
            icon = "/image/icon_yuanxiao.png";
            break;

          case "2":
            icon = "/image/zhuanye.png";
            break;

          case "4":
            icon = "/image/zhiye.png";
            break;
        }
        this.setData({
            windowHeight: app.globalData.screenHeight - 136,
            icon: icon
        });
        if (options && options.keyword) {
            this.setData({
                keyword: options.keyword
            });
            this.search();
        }
    },
    //input输入
    input: function input(e) {
        this.setData({
            keyword: e.detail.value
        });
    },
    //搜索
    search: function search() {
        var _this = this;
        var value = this.data.keyword;
        var type = this.data.type;
        if (value.trim() == "" && !value) return;
        this.addHistory();
        var cityId = wx.getStorageSync("cityId").cityId;
        this.setData({
            showLoad: true
        });
        api.CommonSearch("App/Search", "POST", value, type, 20, cityId, 0, 0, 0).then(function(res) {
            _this.formatData(value, res.result);
        });
    },
    //处理数据
    formatData: function formatData(value, data) {
        var arr = [];
        var type = this.data.type;
        switch (type) {
          case "1":
            data.colleges.map(function(item) {
                item.cnName = item.cnName.replace(value, '<span style="color:red">' + value + "</span>");
            });
            arr = data.colleges;
            break;

          case "2":
            data.majors.map(function(item) {
                item.name = item.name.replace(value, '<span style="color:red">' + value + "</span>");
            });
            arr = data.majors;
            break;

          case "4":
            data.majors.map(function(item) {
                item.name = item.name.replace(value, '<span style="color:red">' + value + "</span>");
            });
            arr = data.majors;
            break;
        }
        this.setData({
            showLoad: false,
            searchList: arr
        });
    },
    //添加最近搜索
    addHistory: function addHistory() {
        var keywordStr = this.data.keyword.trim();
        var arr = wx.getStorageSync("globalHistory");
        if (!keywordStr || keywordStr == " ") return;
        arr.unshift(keywordStr);
        arr = new Set(Array.from(arr));
        if (arr.length > 20) arr.slice(0, 20);
        wx.setStorageSync("globalHistory", [].concat(_toConsumableArray(arr)));
        this.setData({
            globalHistory: [].concat(_toConsumableArray(arr))
        });
    },
    //清除input
    clearInput: function clearInput() {
        this.setData({
            keyword: "",
            searchList: []
        });
    },
    //取消
    cancel: function cancel() {
        this.setData({
            keyword: ""
        });
        wx.navigateBack();
    }
});