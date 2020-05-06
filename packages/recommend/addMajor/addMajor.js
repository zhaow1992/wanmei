var _api = require("../api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var app = getApp();

Page({
    data: {
        current: 0,
        swiperH: 0,
        tab: [ "专业搜索", "专业推荐" ],
        keyword: "",
        listData: [],
        majorList: [],
        choseNum: 0,
        keywords: []
    },
    changeSwiper: function changeSwiper(e) {
        this.setData({
            current: e.detail.current
        });
    },
    onLoad: function onLoad(options) {
        this.options = options;
        this.getswiperH();
        this.getMajors();
    },
    getswiperH: function getswiperH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.select("#head").boundingClientRect();
        item.exec(function(res) {
            that.setData({
                swiperH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
            });
        });
    },
    getMajors: function getMajors() {
        var _this = this;
        var userNumId = wx.getStorageSync("userInfo")[0].UserId;
        var data = {
            userNumId: userNumId
        };
        _api2.default.getMajors("Evaluation/Result/ProfessionOrientation/QueryMajors", "POST", data).then(function(res) {
            var arr = wx.getStorageSync("keywords") || [];
            var num = 0;
            if (arr) {
                res.result.map(function(i) {
                    arr.map(function(e) {
                        if (i.majorName == e) {
                            ++num;
                            i.st = true;
                        }
                    });
                });
            } else {
                res.result.map(function(i) {
                    i.st = false;
                });
            }
            _this.setData({
                majorList: res.result
            }, function() {
                _this.changeisSt();
            });
        });
    },
    checkTab: function checkTab(e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
            current: index
        });
    },
    input: function input(e) {
        this.setData({
            keyword: e.detail.value
        });
    },
    confirm: function confirm() {
        var list = this.data.listData;
        if (list.indexOf(this.data.keyword) == -1) {
            list.unshift(this.data.keyword);
        }
        var keywords = wx.getStorageSync("keywords") || [];
        keywords.push(this.data.keyword);
        wx.setStorageSync("keywords", keywords);
        this.changeisSt();
        var count = 0;
        this.data.majorList.map(function(i) {
            if (i.st) {
                count++;
            }
        });
        if (count + list.length > 30) {
            this.toast();
            return;
        } else {
            this.setData({
                listData: list
            });
        }
    },
    chose: function chose(e) {
        var num = 0;
        var index = e.currentTarget.dataset.index;
        var arr = this.data.majorList;
        var listData = this.data.listData;
        var flag = listData.includes(arr[index].majorName);
        if (flag) {
            listData.forEach(function(ele, idx) {
                if (ele == arr[index].majorName) {
                    listData.splice(idx, 1);
                }
            });
        }
        arr[index].st = !arr[index].st;
        arr.map(function(i) {
            if (i.st) {
                num++;
            }
        });
        if (this.data.listData.length + num > 30) {
            this.toast();
            return;
        } else {
            this.setData({
                majorList: arr,
                listData: listData,
                choseNum: num
            });
        }
        // let num = 0;
        // let index = e.currentTarget.dataset.index;
        // let arr = this.data.majorList;
        // arr[index].st = !arr[index].st;
        // arr.map(i=>{
        //   if(i.st){
        //     num++
        //   }
        // })
        // if(this.data.listData.length + num > 30){
        //   this.toast();
        //   return;
        // }else{
        //   this.setData({
        //     majorList:arr,
        //     choseNum:num
        //   })
        // }
        },
    del: function del(e) {
        var _this2 = this;
        var index = e.currentTarget.dataset.index;
        var arr = this.data.listData;
        arr.splice(index, 1);
        this.setData({
            listData: arr
        });
        // let index = e.currentTarget.dataset.index;
                var name = e.currentTarget.dataset.name;
        // let arr = this.data.listData;
                var keywords = wx.getStorageSync("keywords") || [];
        var searchMajorList = wx.getStorageSync("searchMajorList") || [];
        keywords.forEach(function(ele, idx) {
            if (name == ele) {
                keywords.splice(idx, 1);
            }
        });
        searchMajorList.forEach(function(ele, idx) {
            if (name == ele) {
                searchMajorList.splice(idx, 1);
            }
        });
        wx.setStorageSync("keywords", keywords);
        wx.setStorageSync("searchMajorList", searchMajorList);
        // arr.splice(index, 1);
        // <<<<<<< HEAD
        //     this.setData({
        //       listData: arr
        //     },()=>{
        //       this.changeisSt()
        //     })
        //   },
        //   changeisSt(){
        //     let listData = wx.getStorageSync('keywords') || [];
        //     let majorList = this.data.majorList;
        //     let count= 0;
        //     majorList.forEach(ele=>{
        //       ele.st = false;
        //       listData.forEach(el=>{
        //         if (ele.majorName == el){
        //           ++count;
        //           ele.st = true;
        //         }
        //       })
        //     })
        //     this.setData({
        // =======
                this.setData({
            listData: arr
        }, function() {
            _this2.changeisSt();
        });
    },
    changeisSt: function changeisSt() {
        var listData = wx.getStorageSync("keywords") || [];
        var majorList = this.data.majorList;
        var count = 0;
        majorList.forEach(function(ele) {
            ele.st = false;
            listData.forEach(function(el) {
                if (ele.majorName == el) {
                    ++count;
                    ele.st = true;
                }
            });
        });
        this.setData({
            majorList: majorList,
            choseNum: count
        });
    },
    toast: function toast() {
        wx.showToast({
            title: "添加专业上限30个",
            icon: "none"
        });
    },
    onUnload: function onUnload() {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - this.options.prevPage];
        //上一个页面
                prevPage.updateAddMajor = true;
        wx.setStorageSync("searchMajorList", this.data.listData);
        var arr = this.data.listData;
        var list = this.data.majorList;
        list.map(function(i) {
            console.log(!arr.includes(i.majorName));
            if (i.st && !arr.includes(i.majorName)) {
                arr.push(i.majorName);
            }
        });
        wx.setStorageSync("keywords", arr);
        // },
        // onShow(){
        //   let keyword;
        //   let cityid = wx.getStorageSync('cityId').cityId;
        //   if(cityid == 834){
        //     keyword = wx.getStorageSync('bjAddMajorSearchKeyword');
        //     wx.removeStorageSync('bjAddMajorSearchKeyword');
        //   }else if(cityid == 835){
        //     keyword = wx.getStorageSync('tjAddMajorSearchKeyword');
        //     wx.removeStorageSync('tjAddMajorSearchKeyword');
        //   }
        //   let listData = wx.getStorageSync('searchMajorList') || [];
        //   if(listData.length > 0){
        //     this.setData({
        //       listData
        //     })
        //   }
        //   if(keyword){
        //     this.setData({
        //       keyword
        //     })
        //     this.confirm();
        //   }
        // prevPage.update = true;
        },
    onShow: function onShow() {
        // let collegeList = wx.getStorageSync('addCollegeList') || [];
        // let majorList = wx.getStorageSync('sdAddMajorSearch') || [];
        // this.setData({
        //   collegeList,
        //   majorList
        // })
        var keyword = void 0;
        var cityid = wx.getStorageSync("cityId").cityId;
        if (cityid == 834) {
            keyword = wx.getStorageSync("bjAddMajorSearchKeyword");
            wx.removeStorageSync("bjAddMajorSearchKeyword");
        } else if (cityid == 835) {
            keyword = wx.getStorageSync("tjAddMajorSearchKeyword");
            wx.removeStorageSync("tjAddMajorSearchKeyword");
        } else if (cityid == 853) {
            keyword = wx.getStorageSync("hnAddMajorSearchKeyword");
            wx.removeStorageSync("hnAddMajorSearchKeyword");
        }
        var listData = wx.getStorageSync("searchMajorList") || [];
        if (listData.length > 0) {
            this.setData({
                listData: listData
            });
        }
        if (keyword) {
            this.setData({
                keyword: keyword
            });
            this.confirm();
        }
    },
    goSearch: function goSearch() {
        wx.navigateTo({
            url: "/pages/globalSearch/globalSearch?mode=firstMajor"
        });
    }
});