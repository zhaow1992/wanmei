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

var app = getApp();

var api = require("../api.js");

Page({
    data: {
        navigationText: "2019提前批",
        keyword: "",
        current: 0,
        firstCurrent: 0,
        secondCurrent: 0,
        page: 1,
        typeId: "",
        advanceData: [],
        scrollH: 0,
        noData: false,
        showLoading: false,
        allLoading: false,
        showMore: false,
        isVIP: true,
        isSearch: false
    },
    onLoad: function onLoad(options) {
        this.pn = 1;
        //顶部搜索分页
                this.setData({
            userInfo: wx.getStorageSync("userInfo")
        });
        if (this.data.userInfo[0].UserType > 1) {
            this.setData({
                isVIP: true
            });
        }
        this.getScrollH();
        //获取提前批顶部筛选条件
                this.setData({
            allLoading: true
        });
        this.getQueryFilter();
    },
    // 搜索
    queryByCollegeOrKeyWord: function queryByCollegeOrKeyWord() {
        var _this = this;
        if (this.pn == 1) {
            this.setData({
                showLoading: true
            });
        }
        this.setData({
            isSearch: true
        });
        this.getScrollH();
        if (this.pn > 1 && this.data.noData) {
            return;
        }
        api.queryByCollegeOrKeyWord(this.data.keyword, this.pn, this.data.userInfo[0].Province, 2019, -1).then(function(res) {
            var arr = [];
            if (_this.pn == 1) {
                arr = res.result.items;
            } else {
                if (res.result.items.length > 0 && res.result.items[0].colleges.length > 0) {
                    arr = [].concat(_toConsumableArray(_this.data.advanceData), _toConsumableArray(res.result.items));
                    _this.setData({
                        noData: false
                    });
                } else {
                    arr = _this.data.advanceData;
                    _this.setData({
                        noData: true
                    });
                }
            }
            _this.setData({
                showLoading: false,
                allLoading: false,
                advanceData: arr
            });
        });
    },
    goMajorDetail: function goMajorDetail(e) {
        // let majorcode = e.currentTarget.dataset.majorcode;
        // if (majorcode && majorcode.length == 6) {
        //   wx.navigateTo({
        //     url: '/packages/selectMajor/majorDetail/majorDetail?majorcode=' + majorcode + '&cityid=' + this.data.userInfo[0].Province,
        //   })
        // } else if (majorcode && majorcode.length == 4) {
        //   wx.navigateTo({
        //     url: '/packages/selectMajor/middleMajorDetail/middleMajorDetail?majorcode=' + majorcode + '&cityid=' + this.data.userInfo[0].Province,
        //   })
        // }
    },
    // 计算dom高度
    getScrollH: function getScrollH() {
        var that = this;
        if (this.data.isVIP) {
            var item = wx.createSelectorQuery();
            item.select("#head").boundingClientRect();
            item.exec(function(res) {
                that.setData({
                    scrollH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight
                });
            });
        }
    },
    //获取提前批顶部筛选条件
    getQueryFilter: function getQueryFilter() {
        // let data = {
        //   provinceId:this.data.userInfo[0].Province,
        //   year:2019,
        //   course:-1,//wx.getStorageSync('userInfo')[0].courseType
        // }
        var data = wx.getStorageSync("advanceData");
        this.setData({
            queryFilterData: data
        });
        if (data.length == 0) {
            this.setData({
                allLoading: false
            });
        }
        if (this.data.queryFilterData.length > 0) {
            this.setData({
                typeId: data[0].subset[0].subset.length > 0 ? data[0].subset[0].subset[0].numId : data[0].subset[0].numId
            });
            this.getAdvanceData();
        }
        // api.getQueryFilter('TZY/PreFraction/QueryFilter',"POST",data).then(res=>{
        //     this.setData({
        //       queryFilterData:res.result,
        //     })
        //     if(res.result.length==0){
        //       this.setData({
        //         allLoading:false
        //       })
        //     }
        //     if(this.data.queryFilterData.length > 0){
        //       this.setData({
        //         typeId:res.result[0].subset[0].subset.length > 0 ? res.result[0].subset[0].subset[0].numId : res.result[0].subset[0].numId
        //       })
        //       this.getAdvanceData();
        //     }
        // })
        },
    //查询提前批数据
    getAdvanceData: function getAdvanceData() {
        var _this2 = this;
        var data = {
            provinceId: this.data.userInfo[0].Province,
            year: 2019,
            course: -1,
            //wx.getStorageSync('userInfo')[0].courseType,
            typeId: this.data.typeId,
            pageIndex: this.data.page,
            pageSize: 10
        };
        var arr = [];
        if (this.data.page > 1 && this.data.noData) {
            return;
        }
        api.getAdvanceData("TZY/PreFraction/QueryWithApp", "POST", data).then(function(res) {
            if (_this2.data.page == 1) {
                arr = res.result.items;
            } else {
                var count = 0;
                for (var j = 0; j < res.result.items.length; j++) {
                    if (res.result.items[j].colleges.length == 0) {
                        count++;
                    }
                }
                if (count < res.result.items.length) {
                    arr = [].concat(_toConsumableArray(_this2.data.advanceData), _toConsumableArray(res.result.items));
                    _this2.setData({
                        noData: false
                    });
                } else {
                    arr = _this2.data.advanceData;
                    _this2.setData({
                        noData: true
                    });
                }
            }
            _this2.setData({
                showLoading: false,
                allLoading: false,
                advanceData: arr
            });
        });
    },
    //监听input
    input: function input(e) {
        this.setData({
            keyword: e.detail.value
        });
        if (!e.detail.value) {
            this.setData({
                isSearch: false,
                showLoading: true
            });
            this.getQueryFilter();
        }
    },
    //清除inpout
    clearInput: function clearInput() {
        this.setData({
            keyword: "",
            isSearch: false,
            showLoading: true
        });
        this.getQueryFilter();
    },
    //切换tab
    chkTab: function chkTab(e) {
        var _e$currentTarget$data = e.currentTarget.dataset, index = _e$currentTarget$data.index, type = _e$currentTarget$data.type;
        this.setData({
            intoView: "view" + 0,
            showLoading: true,
            page: 1,
            showMore: false,
            noData: false
        });
        switch (type) {
          case "0":
            this.setData({
                current: index,
                firstCurrent: 0,
                secondCurrent: 0,
                typeId: this.data.queryFilterData[index].subset[0].numId
            });
            this.getAdvanceData();
            break;

          case "1":
            var typeid = this.data.queryFilterData[this.data.current].subset[index].subset.length > 0 ? this.data.queryFilterData[this.data.current].subset[index].subset[this.data.secondCurrent].numId : this.data.queryFilterData[this.data.current].subset[index].numId;
            console.log(typeid);
            this.setData({
                firstCurrent: index,
                typeId: typeid
            });
            this.getAdvanceData();
            break;

          case "2":
            this.setData({
                secondCurrent: index,
                typeId: this.data.queryFilterData[this.data.current].subset[this.data.firstCurrent].subset[index].numId
            });
            this.getAdvanceData();
            break;
        }
        this.getScrollH();
    },
    //加载更多
    getMore: function getMore() {
        this.getScrollH();
        this.setData({
            showMore: true
        });
        if (this.data.isSearch) {
            this.pn = this.pn + 1;
            this.queryByCollegeOrKeyWord();
        } else {
            this.setData({
                page: this.data.page + 1
            });
            this.getAdvanceData();
        }
    },
    //院校详情
    toCollegeDetail: function toCollegeDetail(e) {
        var collegeId = e.currentTarget.dataset.id;
        if (collegeId) {
            wx.navigateTo({
                url: "/packages/findUniversity/collegeDetail/collegeDetail?numId=" + collegeId
            });
        }
    }
});