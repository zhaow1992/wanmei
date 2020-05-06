var _api = require("../../../utils/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var x, y, x1, y1, x2, y2, index, currindex, n, yy;

var app = getApp();

var timer = void 0;

var sensors = require("../../../utils/sensors.js");

Page({
    data: {
        scrollTop: -100,
        // 设定触发条件的距离
        applyCardFlag: false,
        //是否申请过会员卡判断
        applyCardTime: 180,
        //申请倒计时
        banApplyCard: false,
        //禁用
        applyCardLoading: false,
        //loading
        requestFlag: true,
        ZYnumId: 0,
        letter: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ],
        hotType: [ {
            name: "不限",
            value: "",
            st: true
        }, {
            name: "双一流",
            value: "双一流",
            st: false
        }, {
            name: "985",
            value: "985",
            st: false
        }, {
            name: "211",
            value: "211",
            st: false
        } ],
        bOrZ: [ {
            name: "不限",
            value: "",
            st: true
        }, {
            name: "本科",
            value: "1",
            st: false
        }, {
            name: "专科",
            value: "0",
            st: false
        } ],
        xingzhi: [ {
            name: "不限",
            value: -1,
            st: true
        }, {
            name: "公办",
            value: 1,
            st: false
        }, {
            name: "民办",
            value: 0,
            st: false
        } ],
        foreignType: [ {
            name: "不限",
            value: 0,
            st: true
        }, {
            name: "不看中外合作",
            value: 2,
            st: false
        }, {
            name: "只看中外合作",
            value: 1,
            st: false
        } ],
        navHeight: 0,
        scrollViewHeight: 0,
        color: null,
        payBtnText: app.globalData.payBtnText,
        system: "android",
        flag: false,
        cityId: -1,
        confirmButtonHeight: "",
        transitionUp: "",
        previewlFlag: false,
        serverFail: false,
        serverMajorFail: false,
        serverCollegeFail: false,
        YLZYlist: [],
        //志愿列表
        likeMajorList: [],
        //喜欢的专业列表
        //缓存数据 
        bufferYXYX: [ {}, {}, {}, {} ],
        //院校优先
        bufferZYYX: [ {}, {}, {}, {} ],
        //专业优先
        //缓存数据结束
        CdiProvinceNum: 0,
        CdiClassifyNum: 0,
        hotTypeNum: 0,
        xingzhiNum: 0,
        foreignTypeNum: 0,
        CSBList: [ {
            name: "冲",
            id: 1,
            CSBBgColor: "FF5153",
            st: false
        }, {
            name: "稳",
            id: 2,
            CSBBgColor: "FFCA29",
            st: false
        }, {
            name: "保",
            id: 3,
            CSBBgColor: "8EDD5B",
            st: false
        }, {
            name: "默认",
            id: 0,
            CSBBgColor: "FE7878",
            st: false
        } ],
        collegeShowMore: false,
        majorShowMore: false,
        CSBContent: "选择风险",
        CSBBgColor: "FE7878",
        majorOpen: "",
        RecommendType: 0,
        CSBFlag: "true",
        CSBChong: "",
        CSBShou: "",
        CSBBao: "",
        CSBMoren: "",
        collegeCount: 0,
        shareChong: "",
        shareShou: "",
        shareBao: "",
        share: true,
        chooseFX: true,
        morenCityList: [],
        morenBatchList: [],
        showFlag: true,
        GroupName: "",
        JSTable: [],
        yxyxShow: true,
        batchName: "",
        zxyxShow: true,
        searchCollegeNum: 0,
        zixuanCollegeId: null,
        zixuanYXList: [],
        collegeNum: 0,
        ZyProfessionCount: null,
        tianbaoFlag: true,
        collegeindex: 0,
        zyyxShow: false,
        tianbaoCollegeDetail: [],
        tianbaoList: [],
        tianbaoUp: "",
        majorYXList: [],
        searchCollegeName: "输入院校名称",
        searchMajorName: "输入专业名称",
        searchMajorNum: 0,
        showCollegeMore: false,
        showMajorMore: false,
        collegePn: 1,
        likeMajorPn: 1,
        majorPn: 1,
        CdiProvince: [],
        CdiClassify: [],
        majorDetail: [],
        majorLoad: true,
        collegeDetailBatchName: [],
        collegeDetailBatchIndex: 0,
        collegeDetailBatchId: [],
        collegeDetail: [],
        professionsDetail: [],
        collegeLoad: true,
        down: false,
        cityListDown: "",
        batchListName: [],
        batchId: [],
        batchListIndex: 0,
        batch: null,
        currentTab: 0,
        showLoad: false,
        userInfo: [],
        userScore: [],
        collegeYXList: [],
        collegeYXsuo: null,
        cityList: [ {
            fLetter: "",
            name: "全国",
            numId: -1,
            st: true
        }, {
            fLetter: "A",
            name: "安徽",
            numId: 844,
            st: false
        }, {
            fLetter: "B",
            name: "北京",
            numId: 834,
            st: false
        }, {
            fLetter: "C",
            name: "重庆",
            numId: 854,
            st: false
        }, {
            fLetter: "F",
            name: "福建",
            numId: 845,
            st: false
        }, {
            fLetter: "G",
            name: "广东",
            numId: 851,
            st: false
        }, {
            fLetter: "G",
            name: "广西",
            numId: 852,
            st: false
        }, {
            fLetter: "G",
            name: "贵州",
            numId: 856,
            st: false
        }, {
            fLetter: "G",
            name: "甘肃",
            numId: 860,
            st: false
        }, {
            fLetter: "H",
            name: "海南",
            numId: 853,
            st: false
        }, {
            fLetter: "H",
            name: "河南",
            numId: 848,
            st: false
        }, {
            fLetter: "H",
            name: "黑龙江",
            numId: 841,
            st: false
        }, {
            fLetter: "H",
            name: "湖北",
            numId: 849,
            st: false
        }, {
            fLetter: "H",
            name: "湖南",
            numId: 850,
            st: false
        }, {
            fLetter: "H",
            name: "河北",
            numId: 1128,
            st: false
        }, {
            fLetter: "J",
            name: "江苏",
            numId: 1,
            st: false
        }, {
            fLetter: "J",
            name: "吉林",
            numId: 840,
            st: false
        }, {
            fLetter: "J",
            name: "江西",
            numId: 846,
            st: false
        }, {
            fLetter: "L",
            name: "辽宁",
            numId: 839,
            st: false
        }, {
            fLetter: "N",
            name: "宁夏",
            numId: 862,
            st: false
        }, {
            fLetter: "N",
            name: "内蒙古",
            numId: 838,
            st: false
        }, {
            fLetter: "Q",
            name: "青海",
            numId: 861,
            st: false
        }, {
            fLetter: "S",
            name: "上海",
            numId: 842,
            st: false
        }, {
            fLetter: "S",
            name: "山东",
            numId: 847,
            st: false
        }, {
            fLetter: "S",
            name: "山西",
            numId: 837,
            st: false
        }, {
            fLetter: "S",
            name: "陕西",
            numId: 859,
            st: false
        }, {
            fLetter: "S",
            name: "四川",
            numId: 855,
            st: false
        }, {
            fLetter: "T",
            name: "天津",
            numId: 835,
            st: false
        }, {
            fLetter: "X",
            name: "新疆",
            numId: 1120,
            st: false
        }, {
            fLetter: "X",
            name: "西藏",
            numId: 858,
            st: false
        }, {
            fLetter: "Y",
            name: "云南",
            numId: 857,
            st: false
        }, {
            fLetter: "Z",
            name: "浙江",
            numId: 843,
            st: false
        } ],
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
        start: {
            x: 0,
            y: 0
        },
        alias: ""
    },
    foreignType: 0,
    count: 1,
    prevClickIndex: 0,
    prevMajorCode: [],
    allMajorCodeArr: [],
    allCollegeArr: [],
    ji: "",
    //志愿顺序
    prevName: "",
    replaceCollegeName: "",
    currentCollegeName: "",
    //选中的院校名称
    currentMajorInfo: [],
    //选中的专业
    tempObj: {},
    isMove: false,
    //长按志愿表
    movestart: function movestart(e) {
        this.isMove = true;
        var alias = e.currentTarget.dataset.alias;
        currindex = e.currentTarget.dataset.index;
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
        x1 = e.currentTarget.offsetLeft;
        y1 = e.currentTarget.offsetTop;
        this.setData({
            currindex: currindex
        });
    },
    //拖动志愿表
    move: function move(e) {
        if (!this.isMove) return;
        var YLZYlist = this.data.YLZYlist;
        yy = e.currentTarget.offsetTop;
        x2 = e.touches[0].clientX - x + x1;
        y2 = e.touches[0].clientY - y + y1;
        if (y2 <= 0) {
            y2 = 1;
        }
        if (y2 > (YLZYlist.length - 1) * 37) {
            y2 = (YLZYlist.length - 1) * 37;
        }
        var alias = this.data.YLZYlist[currindex].alias;
        this.setData({
            alias: alias,
            opacityStr: .7,
            start: {
                x: x2,
                y: y2
            }
        });
    },
    //拖动结束
    moveend: function moveend() {
        if (!this.isMove) return;
        this.setData({
            currindex: -1
        });
        if (y2 != 0) {
            var arr = [];
            for (var i = 0; i < this.data.YLZYlist.length; i++) {
                arr.push(this.data.YLZYlist[i]);
            }
            var nx = this.data.YLZYlist.length;
            //8
                        n = 1;
            for (var k = 2; k < nx; k++) {
                if (y2 > 38 * (k - 1) + k * 2 - 26) {
                    n = k;
                }
            }
            if (y2 > 38 * (nx - 1) + nx * 2 - 26) {
                n = nx;
            }
            var tempObj = arr[currindex];
            tempObj.ji = this.data.letter[n - 1];
            arr.splice(currindex, 1);
            arr.splice(n - 1, 0, tempObj);
            this.setData({
                alias: "",
                YLZYlist: arr,
                opacityStr: 1
            });
            this.isMove = false;
            this.changeisTianBao("changeTab");
        }
    },
    resetYLZYlist: function resetYLZYlist() {
        this.setData({
            YLZYlist: [],
            collegeName: ""
        });
    },
    refresh: function refresh() {
        // 函数式触发开始下拉刷新。如可以绑定按钮点击事件来触发下拉刷新
        var that = this;
        this.scrollFlag = true;
        that.refreshInit();
    },
    scrollFn: function scrollFn(e) {
        // 防抖，优化性能
        // 当滚动时，滚动条位置距离页面顶部小于设定值时，触发下拉刷新
        // 通过将设定值尽可能小，并且初始化scroll-view组件竖向滚动条位置为设定值。来实现下拉刷新功能，但没有官方的体验好
        if (this.scrollFlag) return;
        if (e.detail.scrollTop <= this.data.scrollTop) {
            this.scrollFlag = true;
            this.refresh();
        }
    },
    refreshInit: function refreshInit() {
        var that = this;
        if (this.data.previewlFlag) return;
        if (app.globalData.applyCardFlag) {
            // that.setData({ showLoad: true });
            var userInfo = wx.getStorageSync("userInfo");
            _api2.default.GetPermission("Users/GetPermission", "POST", userInfo[0].MobilePhone).then(function(res) {
                if (res.isSuccess) {
                    var _userInfo = wx.getStorageSync("userInfo");
                    _userInfo[0].UserType = res.result.userPermissionId;
                    wx.setStorageSync("userInfo", _userInfo);
                    that.setData({
                        userInfo: _userInfo
                    });
                    if (res.result.userPermissionId > 1) {
                        that.setData({
                            collegeYXList: [],
                            majorYXList: [],
                            zixuanYXList: [],
                            collegePn: 1,
                            majorPn: 1
                        }, function() {
                            app.globalData.applyCardFlag = false;
                            that.onLoad();
                        });
                    }
                }
            });
        } else {
            // that.onLoad();
            that.onShow();
        }
    },
    goBindCard: function goBindCard() {
        wx.navigateTo({
            url: "/pages/card/card"
        });
    },
    applyCard: function applyCard() {
        var that = this;
        that.setData({
            applyCardLoading: true,
            applyCardTime: 180
        });
        var userNumId = that.data.userInfo[0].UserId;
        var domain = app.globalData.domain;
        //记得改  qa-ch5.wmei.cn
                _api2.default.ApplyMWebPay("Users/ApplyMWebPay", "POST", userNumId, domain).then(function(res) {
            if (res.isSuccess) {
                app.globalData.applyCardFlag = true;
                that.setData({
                    applyCardLoading: false,
                    banApplyCard: true
                }, function() {
                    that.applyPopup();
                    timer = setInterval(function() {
                        //倒计时
                        var applyCardTime = that.data.applyCardTime - 1;
                        if (applyCardTime <= 0) {
                            that.setData({
                                banApplyCard: false
                            });
                            clearInterval(timer);
                        } else {
                            that.setData({
                                applyCardTime: applyCardTime
                            });
                        }
                    }, 1e3);
                });
            } else {
                that.setData({
                    applyCardLoading: false
                });
                wx.showToast({
                    title: res.message,
                    icon: "none"
                });
            }
        });
    },
    // 申请会员卡弹框
    applyPopup: function applyPopup() {
        this.selectComponent("#hide")._showTap();
    },
    hideTapIndex: function hideTapIndex() {
        var that = this;
        that.selectComponent("#hide").hidePopupFunc();
    },
    //预览志愿表抽屉
    previewForm: function previewForm(e) {
        var that = this;
        that.setData({
            majorDetailLoad: true
        });
        this.setData({
            previewlFlag: true
        });
    },
    //关闭预览志愿表抽屉
    closePreviewForm: function closePreviewForm() {
        this.setData({
            previewlFlag: false,
            closePreviewAnimation: "visited"
        });
    },
    //点击院校列表中填报
    tianbaoZY: function tianbaoZY(e) {
        var _this = this;
        var that = this;
        var currentMajorInfo = e.currentTarget.dataset.item;
        var code1 = currentMajorInfo.majorCode;
        var code2 = currentMajorInfo.code;
        var collegeName = e.currentTarget.dataset.collegename;
        that.code1 = code1;
        that.code2 = code2;
        that.currentMajorInfo = currentMajorInfo;
        that.currentCollegeName = collegeName;
        var wish = e.currentTarget.dataset.wish;
        var res = void 0;
        var YLZYlist = this.data.YLZYlist;
        //是否存在院校
                var result = YLZYlist.some(function(item) {
            if (item.alias == collegeName) {
                return true;
            }
        });
        if (result) {
            //存在院校  直接添加专业
            YLZYlist.forEach(function(ele, index) {
                if (ele.alias == collegeName) {
                    res = ele.professions.some(function(item) {
                        if (item.majorCode == code1 && item.code == code2) {
                            return true;
                        }
                    });
                    if (res) {
                        ele.professions.forEach(function(el, index) {
                            if (el.majorCode == code1 && el.code == code2) {
                                ele.professions.splice(index, 1);
                            }
                        });
                        _this.changeisTianBao("oneClick");
                    } else {
                        if (ele.professions.length >= that.data.majorCount) {
                            wx.showToast({
                                title: "选择专业已达上限(" + that.data.majorCount + "个)",
                                icon: "none",
                                duration: 2e3
                            });
                            return;
                        } else {
                            ele.professions.push(currentMajorInfo);
                            _this.changeisTianBao("oneClick");
                        }
                    }
                    if (ele.professions.length == 0) {
                        ele.ji = "";
                        that.listArr.forEach(function(el) {
                            if (ele.alias === el.alias) {
                                el.ji = ele.ji;
                            }
                        });
                        YLZYlist.splice(index, 1, {});
                        if (_this.data.currentTab == 0) {
                            _this.setData({
                                collegeYXList: that.listArr
                            });
                        } else if (_this.data.currentTab == 1) {
                            _this.setData({
                                majorYXList: that.listArr
                            });
                        } else {
                            _this.setData({
                                zixuanYXList: that.listArr
                            });
                        }
                    }
                }
            });
            this.setData({
                YLZYlist: YLZYlist,
                wish: wish,
                collegeName: collegeName
            });
            // this.changeisTianBao('oneClick');
                } else {
            //不存在院校 弹出弹窗 先添加院校 再添加专业
            this.previewForm();
        }
        this.setData({
            wish: wish,
            collegeName: collegeName
        });
        var type = "院校优先";
        if (this.data.currentTab == 1) {
            type = "专业优先";
        } else if (this.data.currentTab == 2) {
            type = "自选填报";
        }
        var SA_data_subject = this.data.userInfo[0].courseType == 1 ? "文科" : "理科";
        var data = {
            SA_fillout_type: type,
            SA_line_gap: 0,
            SA_data_subject: SA_data_subject,
            SA_data_batch: this.data.batchName,
            SA_majors_name: currentMajorInfo.alias,
            SA_college_name: collegeName
        };
        app.sensors.track("FilloutEnter", sensors.FilloutEnter(data));
    },
    //点击志愿表中填报
    clickMe: function clickMe(e) {
        if (!this.currentCollegeName) return;
        var that = this;
        var idx = e.currentTarget.dataset.index;
        var ji = e.currentTarget.dataset.ji;
        var YLZYlist = this.data.YLZYlist;
        var len = YLZYlist.length;
        var tempObj = {};
        var tempArr = [];
        var listArr = [];
        var replaceInfo = {};
        that.ji = ji;
        var type = "";
        if (this.data.currentTab == 0) {
            listArr = this.data.collegeYXList;
        } else if (this.data.currentTab == 1) {
            listArr = this.data.majorYXList;
        } else {
            listArr = this.data.zixuanYXList;
        }
        //拿到学校信息
                listArr.forEach(function(ele) {
            if (that.currentCollegeName == ele.alias) {
                tempObj.number = ele.number;
                tempObj.collegeId = ele.collegeId;
                tempObj.codeId = ele.codeId;
                tempObj.code = ele.code;
                tempObj.planNum = ele.planNum;
                tempObj.year = ele.year;
                tempObj.probability = ele.probability;
                tempObj.chooseLevel = ele.chooseLevel;
                tempObj.uCode = ele.uCode;
                tempObj.alias = ele.alias;
                tempObj.tags = ele.tags;
                tempObj.probabilityAlias = ele.probabilityAlias;
                tempObj.collegeArea = ele.collegeArea;
                tempObj.rankOfCn = ele.rankOfCn;
                tempObj.scoreLineYear = ele.scoreLineYear;
                tempObj.minScore = ele.minScore;
                tempObj.enterNum = ele.enterNum;
                tempObj.collegeType = ele.collegeType;
                tempObj.wishSuggest = ele.wishSuggest;
                tempObj.chooseType = ele.chooseType;
                tempObj.firstRecruit = ele.firstRecruit;
                tempObj.extended = ele.extended;
                tempObj.recommendType = ele.recommendType;
                tempObj.majorOpen = ele.majorOpen;
                tempObj.ji = ele.ji;
            }
        });
        var result = YLZYlist.some(function(item) {
            if (item.alias == that.currentCollegeName) {
                return true;
            }
        });
        if (result) {
            //添加专业
            YLZYlist.forEach(function(ele, index) {
                if (ele.alias == that.currentCollegeName) {
                    replaceInfo = ele;
                    YLZYlist.splice(index, 1, {});
                }
            });
            YLZYlist.forEach(function(ele, index) {
                if (idx == index && replaceInfo) {
                    if (!ele.alias) {
                        replaceInfo.ji = ji;
                    } else {
                        replaceInfo.ji = ele.ji;
                    }
                    that.replaceCollegeName = ele.alias;
                    YLZYlist.splice(index, 1, replaceInfo);
                }
            });
            that.setData({
                YLZYlist: YLZYlist
            });
            that.changeisTianBao("replace");
        } else {
            YLZYlist.forEach(function(ele, index) {
                if (idx == index) {
                    if (ele.alias) {
                        that.replaceCollegeName = ele.alias;
                        replaceInfo = ele;
                        YLZYlist.splice(index, 1, {});
                        that.replaceCollegeName = ele.alias;
                        tempObj.ji = that.ji;
                        tempObj.professions = [];
                        tempObj.professions.push(that.currentMajorInfo);
                        YLZYlist.splice(index, 1, tempObj);
                        that.setData({
                            YLZYlist: YLZYlist
                        });
                        that.changeisTianBao("replace");
                    } else {
                        tempObj.ji = that.ji;
                        tempObj.professions = [];
                        tempObj.professions.push(that.currentMajorInfo);
                        ele = Object.assign(ele, tempObj);
                        that.setData({
                            YLZYlist: YLZYlist
                        });
                        that.changeisTianBao("oneClick");
                    }
                }
            });
        }
    },
    //重新遍历 列表中的填报flag
    changeisTianBao: function changeisTianBao(type) {
        var that = this;
        var res = void 0;
        var YLZYlist = this.data.YLZYlist;
        var collegeName = this.prevName;
        var listArr = [];
        var zyCount = 0;
        if (this.data.currentTab == 0) {
            listArr = this.data.collegeYXList;
        } else if (this.data.currentTab == 1) {
            listArr = this.data.majorYXList;
        } else {
            listArr = this.data.zixuanYXList;
        }
        that.listArr = listArr;
        //从修改志愿进来 或者重新获取院校列表之后执行
                if (that.data.disabled && that.count == 1 || type == "addData") {
            if (that.data.disabled && that.count < 3) {
                var changeZyInfo = that.data.changeZyInfo;
                for (var i = 0; i < changeZyInfo.colleges.length; i++) {
                    YLZYlist[i] = changeZyInfo.colleges[i];
                }
                that.setData({
                    YLZYlist: YLZYlist
                });
            }
            that.count++;
            listArr.forEach(function(ele, index) {
                YLZYlist.forEach(function(el, idx) {
                    if (ele.alias == el.alias) {
                        ele.ji = el.ji;
                        ele.professions.forEach(function(majorItem1) {
                            el.professions.forEach(function(majorItem2) {
                                if (majorItem1.majorCode === majorItem2.majorCode && majorItem1.code == majorItem2.code) {
                                    majorItem1.st = true;
                                }
                            });
                        });
                    }
                });
            });
            if (this.data.currentTab == 0) {
                this.setData({
                    collegeYXList: listArr
                });
            } else if (this.data.currentTab == 1) {
                this.setData({
                    majorYXList: listArr
                });
            } else {
                this.setData({
                    zixuanYXList: listArr
                });
            }
            // return;
                }
        if (type == "oneClick") {
            listArr.forEach(function(ele) {
                if (ele.alias === that.currentCollegeName) {
                    ele.professions.forEach(function(el) {
                        if (el.majorCode == that.code1 && el.code == that.code2) {
                            el.st = !el.st;
                        }
                    });
                }
            });
            listArr.forEach(function(ele) {
                YLZYlist.forEach(function(item) {
                    if (ele.alias === item.alias) {
                        ele.ji = item.ji;
                    }
                });
            });
        }
        if (type == "replace") {
            listArr.forEach(function(ele) {
                if (ele.alias == that.replaceCollegeName) {
                    ele.ji = "";
                    ele.professions.forEach(function(el) {
                        el.st = false;
                    });
                }
            });
            listArr.forEach(function(ele) {
                YLZYlist.forEach(function(item) {
                    if (ele.alias === item.alias) {
                        ele.ji = item.ji;
                        ele.professions.forEach(function(el) {
                            if (el.majorCode == that.code1 && el.code == that.code2) {
                                el.st = true;
                            }
                        });
                    }
                });
            });
        }
        if (type == "changeTab") {
            listArr.forEach(function(ele, index) {
                ele.ji = "";
                ele.professions.forEach(function(item) {
                    item.st = false;
                });
                YLZYlist.forEach(function(el, idx) {
                    if (ele.alias === el.alias) {
                        ele.ji = el.ji;
                        ele.professions.forEach(function(majorItem1) {
                            el.professions.forEach(function(majorItem2) {
                                if (majorItem1.majorCode === majorItem2.majorCode && majorItem1.code == majorItem2.code) {
                                    majorItem1.st = true;
                                }
                            });
                        });
                    }
                });
            });
        }
        if (this.data.currentTab == 0) {
            this.setData({
                collegeYXList: listArr
            });
        } else if (this.data.currentTab == 1) {
            this.setData({
                majorYXList: listArr
            });
        } else {
            this.setData({
                zixuanYXList: listArr
            });
        }
        this.setData({
            YLZYlist: YLZYlist
        }, function() {
            that.data.YLZYlist.forEach(function(ele) {
                if (ele.alias) {
                    ++zyCount;
                }
            });
            that.setData({
                zyCount: zyCount
            });
        });
    },
    //生成志愿
    saveVolunteer: function saveVolunteer() {
        var _this2 = this;
        wx.showLoading({
            title: "保存中"
        });
        var that = this;
        var ZYnumId = this.data.ZYnumId;
        var userScore = that.data.userScore;
        var ProvinceId = userScore.provinceNumId;
        var Batch = this.data.batch;
        var collegeYXList = that.data.collegeYXList;
        var YLZYlist = that.data.YLZYlist;
        var collegesList = [];
        var count = 0;
        var flag = false;
        YLZYlist.forEach(function(ele) {
            if (ele.alias) {
                count++;
            }
        });
        if (this.data.YLZYlist.length > 3 && count < 3) {
            wx.showToast({
                title: "至少填报三个院校",
                icon: "none",
                duration: 2e3
            });
            return;
        }
        for (var _i = 0; _i < count; _i++) {
            if (YLZYlist[_i].alias) {
                flag = true;
            } else {
                flag = false;
                break;
            }
        }
        if (!flag) {
            wx.showToast({
                title: "志愿顺序必须是连续的",
                icon: "none",
                duration: 2e3
            });
            return;
        }
        YLZYlist.forEach(function(ele, index) {
            if (ele.alias) {
                ele.number = index + 1;
                collegesList.push(ele);
            }
        });
        try {
            var gaokaoScore = wx.getStorageSync("gaokaoScore");
            switch (userScore.courseType) {
              case 0:
                gaokaoScore = gaokaoScore[0];
                break;

              case 1:
                gaokaoScore = gaokaoScore[1];
                break;
            }
            if (gaokaoScore) {
                for (var i = 0; i < gaokaoScore.length; i++) {
                    if (gaokaoScore[i].batch == batch) {
                        var BatchName = gaokaoScore[i].batchName;
                    }
                }
            }
        } catch (e) {}
        var userInfo = that.data.userInfo;
        var UserId = userInfo[0].UserId;
        var CourseType = userScore.courseType;
        var chooseLevel = "";
        if (userScore.provinceNumId == 1) {
            chooseLevel = userScore.chooseLevelList[0].value + "," + userScore.chooseLevelList[1].value;
        }
        var Total = userScore.total;
        var UserScoreId = userScore.numId;
        var rank = userScore.rank;
        var name = "";
        try {
            var collegeRecommendBatchGroup = wx.getStorageSync("collegeRecommendBatchGroup");
            if (collegeRecommendBatchGroup) {
                name = collegeRecommendBatchGroup;
            }
        } catch (e) {}
        var ReliableRate = "";
        var GeneratedTime = "";
        var Id = "";
        var scoreType = 1;
        if (app.globalData.isGaokaoFlag == true) {
            scoreType = 2;
        }
        var wishs = [];
        var tempArr = [];
        YLZYlist.forEach(function(ele, index) {
            if (ele.alias) {
                wishs.push({
                    number: index + 1,
                    allow: true,
                    prob: ele.probability
                });
            }
        });
        _api2.default.RecommendationGetKPL("TZY/Recommendation/GetKPL", "POST", ProvinceId, Batch, wishs).then(function(result) {
            _api2.default.generatedZyTable("App/ZyTable/Save", "POST", ZYnumId, ProvinceId, name, Batch, BatchName, UserId, UserScoreId, CourseType, chooseLevel, Total, collegesList, scoreType, rank, result.result.prob).then(function(res) {
                if (res.isSuccess) {
                    var curMajorNum = 0;
                    var curCollegeNum = 0;
                    var yxCount = 0;
                    var zyCount = 0;
                    var zxCount = 0;
                    that.data.YLZYlist.forEach(function(ele) {
                        if (ele.alias) {
                            ++curCollegeNum;
                            if (ele.chooseType == 1) {
                                ++yxCount;
                            } else if (ele.chooseType == 2) {
                                ++zyCount;
                            } else if (ele.chooseType == 3) {
                                ++zxCount;
                            }
                            ele.professions.forEach(function(el) {
                                if (el.alias) {
                                    ++curMajorNum;
                                }
                            });
                        }
                    });
                    var sheets_type = "平行志愿表";
                    if (app.globalData.isGaokaoFlag) {
                        sheets_type = "高考志愿表";
                    }
                    var _ZYnumId = _this2.data.ZYnumId;
                    if (!_ZYnumId) {
                        _ZYnumId = "0";
                    }
                    var data = {
                        SA_operation_type: "保存",
                        SA_sheets_num: _ZYnumId,
                        SA_sheets_type: sheets_type,
                        SA_sheets_source: "智能填报",
                        SA_data_province: that.data.userInfo[0].ProvinceName,
                        SA_data_batch: that.data.batchName,
                        SA_score_value: that.data.userScore.total,
                        SA_score_rank: that.data.userScore.rank,
                        SA_data_subject: that.data.userScore.courseType == 1 ? "文科" : "理科",
                        SA_line_gap: 0,
                        SA_reliance_rate: result.result.prob,
                        SA_colg_num: curCollegeNum,
                        SA_colg_maxnum: that.data.collegesCount,
                        SA_major_num: curMajorNum,
                        SA_major_maxnum: that.data.majorCount,
                        SA_vacancy_rate: curCollegeNum / that.data.collegesCount * 100,
                        SA_fearture1_rate: yxCount / curCollegeNum * 100,
                        SA_fearture2_rate: zyCount / curCollegeNum * 100,
                        SA_fearture3_rate: zxCount / curCollegeNum * 100,
                        SAfearture4_rate: 0
                    };
                    app.sensors.track("VoluntSheets", sensors.VoluntSheets(data));
                    var id = res.result.value;
                    wx.hideLoading();
                    wx.showModal({
                        title: "保存成功",
                        content: "是否查看志愿表？",
                        confirmColor: "#e9302d",
                        success: function success(res) {
                            if (res.confirm) {
                                wx.redirectTo({
                                    url: "/pages/ZYTableCommonDetail/ZYTableCommonDetail?id=" + id
                                });
                            }
                        }
                    });
                } else {
                    wx.showToast({
                        title: res.message,
                        icon: "none"
                    });
                }
            });
        });
    },
    //获取当前省份志愿院校个数
    getZyCount: function getZyCount(provinceId, total, course, batch, groupName) {
        var _this3 = this;
        var that = this;
        _api2.default.getZyCount("TZY/Recommendation/GetZyCount", "POST", provinceId, total, course, batch, groupName).then(function(res) {
            if (res.isSuccess) {
                var opacity = [];
                // let list = [];
                                var len = void 0;
                var YLZYlist = _this3.data.YLZYlist;
                var zyCollegeCount = res.result.zyCollegeCount;
                if (YLZYlist.length > 0) {
                    len = zyCollegeCount - YLZYlist.length;
                } else {
                    len = zyCollegeCount;
                }
                for (var i = 0; i < zyCollegeCount; i++) {
                    opacity.push(1 - i * .5 / parseInt(res.result.zyCollegeCount));
                }
                for (var _i2 = 0; _i2 < len; _i2++) {
                    YLZYlist.push({});
                }
                that.setData({
                    YLZYlist: YLZYlist,
                    opacity: opacity,
                    majorCount: res.result.zyProfessionCount,
                    collegesCount: res.result.zyCollegeCount
                }, function() {
                    that.changeisTianBao("addData");
                });
            }
        });
    },
    loadData: function loadData(batch, pros, majors, collegeType, pn, BusinessType, MajorCodeOrName, GroupName, CollegeId, UCode, RecommendType, reqType) {
        var _this4 = this;
        var that = this;
        var userScore = that.data.userScore;
        var pro = userScore.provinceNumId;
        var course = userScore.courseType;
        if (pro == 1) {
            var chooseLevel = userScore.chooseLevelList[0].value + "," + userScore.chooseLevelList[1].value;
        } else {
            var chooseLevel = "";
        }
        var Rank = userScore.rank;
        var YfydRank = 0;
        var total = userScore.total;
        var bufferYXYX = that.data.bufferYXYX;
        if (typeof collegeType != "string") {
            collegeType = collegeType.join("_");
        }
        if (typeof pros != "string") {
            pros = pros.join("_");
        }
        var pageSizeForCSB = 0;
        if (that.data.userInfo[0].UserType > 1) {} else {
            pageSizeForCSB = 1;
        }
        var educationTypeLevels = "";
        //学历层次,多个中间用"_"分隔
                var levels = "";
        //办学层次,多个中间用"_"分隔 985 211 双一流
                var levelsArr = [];
        var cType = -1;
        //院校性质(-1:全部,1:公立,0:私立)
                var hotType = that.data.hotType;
        for (var i = 0; i < hotType.length; i++) {
            if (hotType[i].st == true) {
                levelsArr.push(hotType[i].value);
            }
        }
        levels = levelsArr.join("_");
        for (var _i3 = 0; _i3 < that.data.xingzhi.length; _i3++) {
            if (that.data.xingzhi[_i3].st == true) {
                cType = that.data.xingzhi[_i3].value;
            }
        }
        var foreignType = that.foreignType;
        _api2.default.getRecommendCollegeV2("TZY/Recommendation/DoCollegeFirstForApp", "POST", pro, batch, course, total, pros, collegeType, chooseLevel, pn, GroupName, Rank, RecommendType, pageSizeForCSB, levels, cType, foreignType).then(function(res) {
            if (res.isSuccess) {
                if (reqType == "cwb" && that.data.currentTab == 0) {
                    if (levels !== "") {
                        levels = levels.split("_").join("|");
                    } else {
                        levels = "不限";
                    }
                    if (collegeType !== "") {
                        collegeType = collegeType.split("_").join("|");
                    } else {
                        collegeType = "不限";
                    }
                    var xingzhi = "不限";
                    that.data.xingzhi.forEach(function(ele) {
                        if (ele.value == cType) {
                            xingzhi = ele.name;
                        }
                    });
                    var SA_province_filter = [];
                    for (var _i4 = 0, j = _this4.data.cityList.length; _i4 < j; _i4++) {
                        if (_this4.data.cityList[_i4].st) {
                            SA_province_filter.push(_this4.data.cityList[_i4].name);
                        }
                    }
                    SA_province_filter = SA_province_filter.join("|");
                    if (SA_province_filter == "全国") {
                        SA_province_filter = "不限";
                    }
                    var data = {
                        SA_fillout_type: "院校优先",
                        SA_score_value: that.data.userScore.total,
                        SA_line_gap: 0,
                        SA_data_batch: that.data.batchName,
                        SA_features_value: that.data.CSBContent,
                        SA_results_number: res.result.totalCount,
                        SA_data_province: that.data.userInfo[0].ProvinceName,
                        SA_tag_filter: levels,
                        SA_nature_filter: xingzhi,
                        SA_type_filter: collegeType,
                        SA_province_filter: SA_province_filter
                    };
                }
                if (reqType == "shaixuan" && that.data.currentTab == 0) {
                    if (levels !== "") {
                        levels = levels.split("_").join("|");
                    } else {
                        levels = "不限";
                    }
                    var _xingzhi = "不限";
                    that.data.xingzhi.forEach(function(ele) {
                        if (ele.value == cType) {
                            _xingzhi = ele.name;
                        }
                    });
                    var cityArr = [];
                    that.data.cityList.forEach(function(ele) {
                        if (ele.st == true) {
                            cityArr.push(ele.name);
                        }
                    });
                    if (cityArr.length > 1) {
                        cityArr = cityArr.join("|");
                    } else {
                        cityArr = cityArr[0];
                    }
                    var _collegeType = [];
                    that.data.batchList.forEach(function(ele) {
                        if (ele.st == true) {
                            _collegeType.push(ele.name);
                        }
                    });
                    if (_collegeType.length > 1) {
                        _collegeType = _collegeType.join("|");
                    } else {
                        _collegeType = _collegeType[0];
                    }
                    var foreignType = "";
                    that.data.foreignType.forEach(function(ele) {
                        if (ele.st == true) {
                            foreignType = ele.name;
                        }
                    });
                    var searchMajorName = "";
                    if (searchMajorName == "输入专业名称" && that.data.currentTab == 0) {
                        searchMajorName = that.data.searchMajorName;
                    }
                    var _data = {
                        SA_fillout_type: "院校优先",
                        SA_line_gap: 0,
                        SA_data_batch: that.data.batchName,
                        SA_batch_filter: "",
                        SA_majors_name: searchMajorName,
                        SA_college_name: "",
                        SA_score_rank_area: "",
                        SA_province_filter: cityArr,
                        SA_tag_filter: levels,
                        SA_type_filter: _collegeType,
                        SA_nature_filter: _xingzhi,
                        SA_other_filter: foreignType,
                        SA_results_number: res.result.totalCount
                    };
                }
                if (res.result.items.length > 0) {
                    var collegeYXList = that.data.collegeYXList;
                    for (var i = 0; i < res.result.items.length; i++) {
                        res.result.items[i].majorOpen = false;
                        var tagsArr = res.result.items[i].tags.split(" ");
                        res.result.items[i].chooseLevel = res.result.items[i].chooseLevel.replace(/另一门/, "");
                        var tags = "";
                        for (var _i5 = 0; _i5 < tagsArr.length; _i5++) {
                            if (tagsArr[_i5] == "211" || tagsArr[_i5] == "985" || tagsArr[_i5] == "双一流") {
                                tags += tagsArr[_i5] + " ";
                            }
                        }
                        res.result.items[i].tags = tags;
                        collegeYXList.push(res.result.items[i]);
                    }
                    that.setData({
                        showLoad: false,
                        collegeYXsuo: res.result.totalCount,
                        showCollegeMore: false,
                        yxyxShow: false
                    });
                    // that.changeMain(collegeYXList);
                                        if (pn == 1) {
                        var bufferYXYX = that.data.bufferYXYX;
                        bufferYXYX[RecommendType].collegeYXList = collegeYXList;
                        bufferYXYX[RecommendType].collegeYXsuo = res.TotalCount;
                        that.setData({
                            bufferYXYX: bufferYXYX
                        });
                    }
                    that.setData({
                        collegeYXList: collegeYXList
                    }, function() {
                        // if (that.data.YLZYlist.length > 0){
                        //   that.changeisTianBao('addData');
                        // }else{
                        var collegeRecommendBatchGroup = wx.getStorageSync("collegeRecommendBatchGroup");
                        that.getZyCount(that.data.cityId, that.data.userScore.total, that.data.userScore.courseType, that.data.batch, collegeRecommendBatchGroup);
                        // }
                                        });
                    wx.hideNavigationBarLoading();
                } else {
                    if (pn == 1) {
                        var bufferYXYX = that.data.bufferYXYX;
                        bufferYXYX[RecommendType].collegeYXList = [];
                        bufferYXYX[RecommendType].collegeYXsuo = res.TotalCount;
                        that.setData({
                            bufferYXYX: bufferYXYX
                        });
                    }
                    that.setData({
                        yxyxShow: false,
                        collegeShowMore: false
                    });
                    wx.hideNavigationBarLoading();
                }
                wx.stopPullDownRefresh();
                that.scrollFlag = false;
            } else {
                that.setData({
                    showLoad: false,
                    yxyxShow: false,
                    showCollegeMore: false,
                    serverFail: true
                });
                wx.stopPullDownRefresh();
                that.scrollFlag = false;
            }
        });
    },
    loadMajorData: function loadMajorData(batch, pros, majors, collegeType, pn, BusinessType, MajorCodeOrName, GroupName, CollegeId, UCode, RecommendType, majorCode, reqType) {
        var that = this;
        var userScore = that.data.userScore;
        var pro = userScore.provinceNumId;
        var course = userScore.courseType;
        if (pro == 1) {
            var chooseLevel = userScore.chooseLevelList[0].value + "," + userScore.chooseLevelList[1].value;
        } else {
            var chooseLevel = "";
        }
        var Rank = userScore.rank;
        var YfydRank = 0;
        var total = userScore.total;
        var bufferZYYX = that.data.bufferZYYX;
        if (bufferZYYX[RecommendType].majorYXList && pn == 1) {
            that.setData({
                majorYXList: bufferZYYX[RecommendType].majorYXList,
                searchMajorNum: bufferZYYX[RecommendType].searchMajorNum,
                zyyxShow: false
            });
            // that.changeMain(that.data.majorYXList);
                        that.setData({
                majorYXList: that.data.majorYXList
            });
            wx.hideNavigationBarLoading();
        } else {
            if (typeof collegeType != "string") {
                collegeType = collegeType.join("_");
            }
            if (typeof pros != "string") {
                pros = pros.join("_");
            }
            var levels = "";
            //办学层次,多个中间用"_"分隔 985 211 双一流
                        var levelsArr = [];
            var cType = -1;
            //院校性质(-1:全部,1:公立,0:私立)
                        var hotType = that.data.hotType;
            for (var i = 0; i < hotType.length; i++) {
                if (hotType[i].st == true) {
                    levelsArr.push(hotType[i].value);
                }
            }
            levels = levelsArr.join("_");
            for (var _i6 = 0; _i6 < that.data.xingzhi.length; _i6++) {
                if (that.data.xingzhi[_i6].st == true) {
                    cType = that.data.xingzhi[_i6].value;
                }
            }
            _api2.default.getRecommendMajorV2("TZY/Recommendation/DoProfessionFirstForApp", "POST", pro, batch, course, total, pros, collegeType, chooseLevel, pn, GroupName, Rank, RecommendType, that.majorname, that.majorcode, levels, cType, this.foreignType).then(function(res) {
                if (res.isSuccess) {
                    if (reqType == "cwb" && that.data.currentTab == 1) {
                        if (levels !== "") {
                            levels = levels.split("_").join("|");
                        } else {
                            levels = "不限";
                        }
                        if (collegeType !== "") {
                            collegeType = collegeType.split("_").join("|");
                        } else {
                            collegeType = "不限";
                        }
                        var xingzhi = "不限";
                        that.data.xingzhi.forEach(function(ele) {
                            if (ele.value == cType) {
                                xingzhi = ele.name;
                            }
                        });
                        var data = {
                            SA_fillout_type: "专业优先",
                            SA_score_value: that.data.userScore.total,
                            SA_line_gap: 0,
                            SA_data_batch: that.data.batchName,
                            SA_features_value: that.data.CSBContent,
                            SA_results_number: res.result.totalCount,
                            SA_data_province: that.data.userInfo[0].ProvinceName,
                            SA_tag_filter: levels,
                            SA_nature_filter: xingzhi,
                            SA_type_filter: collegeType
                        };
                    }
                    if (reqType == "shaixuan" && that.data.currentTab == 1) {
                        if (levels !== "") {
                            levels = levels.split("_").join("|");
                        } else {
                            levels = "不限";
                        }
                        var _xingzhi2 = "不限";
                        that.data.xingzhi.forEach(function(ele) {
                            if (ele.value == cType) {
                                _xingzhi2 = ele.name;
                            }
                        });
                        var cityArr = [];
                        that.data.cityList.forEach(function(ele) {
                            if (ele.st == true) {
                                cityArr.push(ele.name);
                            }
                        });
                        if (cityArr.length > 1) {
                            cityArr = cityArr.join("|");
                        } else {
                            cityArr = cityArr[0];
                        }
                        var _collegeType2 = [];
                        that.data.batchList.forEach(function(ele) {
                            if (ele.st == true) {
                                _collegeType2.push(ele.name);
                            }
                        });
                        if (_collegeType2.length > 1) {
                            _collegeType2 = _collegeType2.join("|");
                        } else {
                            _collegeType2 = _collegeType2[0];
                        }
                        var foreignType = "";
                        that.data.foreignType.forEach(function(ele) {
                            if (ele.st == true) {
                                foreignType = ele.name;
                            }
                        });
                        var searchMajorName = "";
                        if (searchMajorName !== "输入专业名称" && that.data.currentTab == 1) {
                            searchMajorName = that.data.searchMajorName;
                        }
                        var _data2 = {
                            SA_fillout_type: "专业优先",
                            SA_line_gap: 0,
                            SA_data_batch: that.data.batchName,
                            SA_batch_filter: "",
                            SA_majors_name: searchMajorName,
                            SA_college_name: "",
                            SA_score_rank_area: "",
                            SA_province_filter: cityArr,
                            SA_tag_filter: levels,
                            SA_type_filter: _collegeType2,
                            SA_nature_filter: _xingzhi2,
                            SA_other_filter: foreignType,
                            SA_results_number: res.result.totalCount
                        };
                    }
                    if (res.result.items.length > 0) {
                        var majorYXList = [];
                        for (var i = 0; i < res.result.items.length; i++) {
                            res.result.items[i].chooseLevel = res.result.items[i].chooseLevel.replace(/另一门/, "");
                            res.result.items[i].collegeArea = res.result.items[i].collegeArea.replace("市", "");
                            var tagsArr = res.result.items[i].tags.split(" ");
                            var tags = "";
                            for (var _i7 = 0; _i7 < tagsArr.length; _i7++) {
                                if (tagsArr[_i7] == "211" || tagsArr[_i7] == "985" || tagsArr[_i7] == "双一流") {
                                    tags += tagsArr[_i7] + " ";
                                }
                            }
                            res.result.items[i].tags = tags;
                            majorYXList.push(res.result.items[i]);
                        }
                        that.setData({
                            chooseFX: true,
                            majorYXList: that.data.majorYXList.concat(majorYXList),
                            searchMajorNum: res.result.totalCount,
                            zyyxShow: false
                        });
                        // that.changeMain(majorYXList);
                                                if (pn == 1) {
                            var bufferZYYX = that.data.bufferZYYX;
                            bufferZYYX[RecommendType].majorYXList = majorYXList;
                            bufferZYYX[RecommendType].searchMajorNum = res.TotalCount;
                            that.setData({
                                bufferZYYX: bufferZYYX
                            });
                        }
                        that.setData({
                            showMajorMore: false
                        }, function() {
                            if (that.data.YLZYlist.length > 0) {
                                that.changeisTianBao("addData");
                            }
                        });
                        wx.hideNavigationBarLoading();
                    } else {
                        if (pn == 1) {
                            var bufferZYYX = that.data.bufferZYYX;
                            bufferZYYX[RecommendType].majorYXList = [];
                            bufferZYYX[RecommendType].searchMajorNum = res.TotalCount;
                            that.setData({
                                bufferZYYX: bufferZYYX
                            });
                        }
                        that.setData({
                            zyyxShow: false,
                            majorShowMore: false
                        });
                        wx.hideNavigationBarLoading();
                    }
                } else {
                    that.setData({
                        showMajorMore: false,
                        zyyxShow: false,
                        serverMajorFail: true
                    });
                }
            });
        }
    },
    //点击喜欢的专业 推荐院校
    tuijianZY: function tuijianZY(e) {
        var clickMajor = e.currentTarget.dataset.item;
        this.setData({
            searchMajorName: clickMajor.name,
            zyyxShow: true
        });
        if (clickMajor.code != "") {
            this.majorname = "";
            this.majorcode = clickMajor.code;
        } else {
            this.majorname = clickMajor.name;
            this.majorcode = "";
        }
        this.loadMajorData(this.data.batch, [], "", [], 1, 2, "", "", "", "", 0, "");
        wx.setStorageSync("zyyx", {
            name: clickMajor.name,
            majorcode: clickMajor.code
        });
    },
    //分页加载 喜欢专业
    queryLikeMajorList: function queryLikeMajorList() {
        if (this.data.requestFlag) {
            this.getLikeMajorList(this.data.userInfo[0].UserId, ++this.data.likeMajorPn);
            this.setData({
                likeMajorPn: ++this.data.likeMajorPn
            });
        }
    },
    //获取专业优先里 的喜欢专业
    getLikeMajorList: function getLikeMajorList(userId, pageIndex) {
        var that = this;
        _api2.default.getLikeMajorList("Users/Collection/Major/Query", "POST", userId, pageIndex).then(function(res) {
            if (res.isSuccess) {
                if (res.result.items.length < 20) {
                    that.setData({
                        requestFlag: false
                    });
                }
                that.setData({
                    likeMajorList: that.data.likeMajorList.concat(res.result.items)
                });
            }
        });
    },
    onLoad: function onLoad(options) {
        var that = this;
        this.scrollFlag = false;
        var changeZyInfo = void 0;
        that.selectComponent("#navigationcustom").setNavigationAll("智能填报", true);
        that.setData({
            scrollViewHeight: app.calculateScrollViewHeight(0),
            navHeight: app.globalData.navigationCustomStatusHeight + app.globalData.navigationCustomCapsuleHeight
        });
        //从修改志愿表进来
                if (options && options.type == "update") {
            changeZyInfo = wx.getStorageSync("changeZyInfo");
            this.prevName = "";
            this.setData({
                disabled: true,
                ZYnumId: options.numId,
                "userScore.total": changeZyInfo.totalScore,
                "userScore.rank": changeZyInfo.ranking,
                batch: changeZyInfo.batch,
                batchName: changeZyInfo.batchName,
                GroupName: changeZyInfo.groupName,
                changeZyInfo: changeZyInfo
            });
        }
        if (app.globalData.tuijianCommon == "2") {
            that.setData({
                showLoad: false,
                currentTab: 1
            });
        }
        that.setData({
            system: app.globalData.system,
            color: app.globalData.color
        });
        var userScore = wx.getStorageSync("userScore");
        var userInfo = wx.getStorageSync("userInfo");
        if (userScore) {
            if (userScore.provinceNumId == 842) {
                wx.redirectTo({
                    url: "../shanghaiRecommend/shanghaiRecommend"
                });
                return;
            } else if (userScore.provinceNumId == 843) {
                wx.redirectTo({
                    url: "../zhejiangRecommend/zhejiangRecommend"
                });
                return;
            } else {}
        }
        if (app.globalData.bufferJsYXYX.length > 0) {
            that.setData({
                bufferYXYX: bufferJsYXYX
            });
        }
        if (app.globalData.bufferJsZYYX.length > 0) {
            that.setData({
                bufferZYYX: bufferJsZYYX
            });
        }
        try {
            var userScore = wx.getStorageSync("userScore");
            var userInfo = wx.getStorageSync("userInfo");
            var scoreLine = wx.getStorageSync("gaokaoScore");
            that.setData({
                userInfo: userInfo
            });
            that.getLikeMajorList(userInfo[0].UserId, 1);
            if (scoreLine && userScore) {
                var gerBatch = function gerBatch() {
                    userScore = wx.getStorageSync("userScore");
                    var batch = userScore.batch;
                    if (batch == undefined) {
                        setTimeout(function() {
                            gerBatch();
                        }, 200);
                    } else {
                        var batchArr = [];
                        var batchArrId = [];
                        var groupName = "";
                        if (userScore.courseType == 0) {
                            scoreLine = scoreLine[0];
                        } else {
                            scoreLine = scoreLine[1];
                        }
                        for (var i = 0; i < scoreLine.length; i++) {
                            batchArr.push(scoreLine[i].batchName);
                            batchArrId.push(scoreLine[i].batch);
                            if (scoreLine[i].batch == userScore.batch) {
                                that.setData({
                                    batchListIndex: i,
                                    batch: scoreLine[i].batch,
                                    batchName: scoreLine[i].batchName
                                });
                                if (scoreLine[i].groups != null) {
                                    groupName = scoreLine[i].groups[0].name;
                                    that.setData({
                                        GroupName: scoreLine[i].groups[0].name
                                    });
                                }
                                break;
                            }
                        }
                        // 加载筛选城市
                                                var _cityId = wx.getStorageSync("cityId").cityId;
                        var _cityList = that.data.cityList;
                        for (var _i8 = 0; _i8 < _cityList.length; _i8++) {
                            if (_cityList[_i8].numId == _cityId) {
                                _cityList.splice(1, 0, _cityList.splice(_i8, 1)[0]);
                                break;
                            }
                        }
                        that.setData({
                            cityList: _cityList,
                            cityId: _cityId
                        }, function() {
                            // that.getZyCount(cityId, that.data.userScore.total, that.data.userScore.courseType, that.data.userScore.batch, '');
                        });
                        if (options && options.type == "update") {
                            that.loadData(changeZyInfo.batch, "", "", "", 1, 1, "", changeZyInfo.groupName, "", "", 0);
                        } else {
                            that.loadData(batch, "", "", "", 1, 1, "", that.data.GroupName, "", "", 0);
                        }
                        that.setData({
                            batchListName: batchArr,
                            batchId: batchArrId
                        });
                    }
                };
                that.setData({
                    userScore: userScore
                });
                gerBatch();
            }
        } catch (e) {}
        // 加载筛选城市
                var cityId = wx.getStorageSync("cityId").cityId;
        var cityList = that.data.cityList;
        for (var i = 0; i < cityList.length; i++) {
            if (cityList[i].numId == cityId) {
                cityList.splice(1, 0, cityList.splice(i, 1)[0]);
                break;
            }
        }
        if (options && options.type == "changebatch") {
            this.setData({
                YLZYlist: []
            });
        }
    },
    onShow: function onShow() {
        var that = this;
        if (app.globalData.applyCardFlag) {
            wx.startPullDownRefresh({
                success: function success(errMsg) {
                    that.refreshInit();
                    return;
                }
            });
        }
        that.setData({
            zxyxShow: true
        });
        var zyyx = wx.getStorageSync("zyyx");
        var JSZixuanList = wx.getStorageSync("JSZixuanList");
        var collegeRecommendBatch = wx.getStorageSync("collegeRecommendBatch");
        var scoreLine = wx.getStorageSync("gaokaoScore");
        var userInfo = wx.getStorageSync("userInfo");
        var userScore = wx.getStorageSync("userScore");
        var collegeRecommendBatchGroup = wx.getStorageSync("collegeRecommendBatchGroup");
        if (JSZixuanList) {
            for (var _i9 = 0; _i9 < JSZixuanList.length; _i9++) {
                JSZixuanList[_i9].chooseLevel = JSZixuanList[_i9].chooseLevel.replace(/另一门/, "");
            }
            if (userInfo[0].UserType <= 1 && JSZixuanList.length > 3) {
                var newZixuanList = [];
                for (var _i10 = 0; _i10 < 3; _i10++) {
                    newZixuanList.push(JSZixuanList.reverse()[_i10]);
                }
                that.setData({
                    zixuanYXList: newZixuanList,
                    zxyxShow: false
                }, function() {
                    that.changeisTianBao("addData");
                });
                // that.changeMain(that.data.zixuanYXList);
                                that.setData({
                    zixuanYXList: that.data.zixuanYXList
                });
            } else {
                that.setData({
                    zixuanYXList: JSZixuanList.reverse(),
                    zxyxShow: false
                });
                // that.changeMain(that.data.zixuanYXList);
                                that.setData({
                    zixuanYXList: that.data.zixuanYXList
                }, function() {
                    that.changeisTianBao("addData");
                });
            }
        } else {
            that.setData({
                zxyxShow: false
            });
        }
        if (zyyx) {
            if (that.data.searchMajorName == zyyx.name) {} else {
                that.setData({
                    searchMajorName: zyyx.name,
                    zyyxShow: true,
                    majorPn: 1,
                    majorYXList: [],
                    bufferZYYX: [ {}, {}, {}, {} ]
                });
                var CdiProvince = that.data.CdiProvince == "-1" ? "" : that.data.CdiProvince;
                var CdiClassify = that.data.CdiClassify == "不限" ? "" : that.data.CdiClassify;
                var RecommendType = that.data.RecommendType;
                that.initMajorInfo(zyyx);
                that.loadMajorData(that.data.batch, CdiProvince, "", CdiClassify, 1, 2, "", collegeRecommendBatchGroup, "", "", RecommendType, "");
            }
        }
        if ((collegeRecommendBatch || collegeRecommendBatchGroup) && collegeRecommendBatch != -1) {
            if (collegeRecommendBatch == that.data.batch && collegeRecommendBatchGroup == that.data.GroupName) {} else {
                that.setData({
                    CSBContent: "选择风险",
                    CSBBgColor: "FDACAA",
                    bufferYXYX: [ {}, {}, {}, {} ],
                    bufferZYYX: [ {}, {}, {}, {} ]
                });
                that.chongzhi();
                if (userScore.courseType == 0) {
                    scoreLine = scoreLine[0];
                } else {
                    scoreLine = scoreLine[1];
                }
                for (var i = 0; i < scoreLine.length; i++) {
                    if (scoreLine[i].batch == collegeRecommendBatch) {
                        var batchName = scoreLine[i].batchName;
                        break;
                    }
                }
                that.setData({
                    majorPn: 1,
                    CdiProvinceNum: 0,
                    CdiClassifyNum: 0,
                    batch: collegeRecommendBatch,
                    GroupName: collegeRecommendBatchGroup,
                    batchName: batchName,
                    collegeYXList: [],
                    majorYXList: [],
                    yxyxShow: true,
                    tianbaoList: that.data.tianbaoList,
                    collegeNum: 0
                });
                var CdiProvince = that.data.CdiProvince == "-1" ? "" : that.data.CdiProvince;
                var CdiClassify = that.data.CdiClassify == "不限" ? "" : that.data.CdiClassify;
                if (that.data.searchMajorName != "输入专业名称") {
                    that.setData({
                        zyyxShow: true
                    });
                    that.initMajorInfo(zyyx);
                    that.loadMajorData(that.data.batch, CdiProvince, "", CdiClassify, 1, 2, "", collegeRecommendBatchGroup, "", "", 0, "");
                }
                that.loadData(that.data.batch, CdiProvince, "", CdiClassify, 1, 1, "", collegeRecommendBatchGroup, "", "", 0, "");
            }
        }
        var oldUserScore = that.data.userScore;
        var newUserScore = wx.getStorageSync("userScore");
        if (newUserScore) {
            if (newUserScore.total != oldUserScore.total || newUserScore.rank != oldUserScore.rank || newUserScore.chooseLevelOrSubjects != oldUserScore.chooseLevelOrSubjects || newUserScore.courseType != oldUserScore.courseType) {
                that.setData({
                    CSBContent: "选择风险",
                    CSBBgColor: "FDACAA",
                    bufferYXYX: [ {}, {}, {}, {} ],
                    bufferZYYX: [ {}, {}, {}, {} ]
                });
                var CdiProvince = that.data.CdiProvince == "-1" ? "" : that.data.CdiProvince;
                var CdiClassify = that.data.CdiClassify == "不限" ? "" : that.data.CdiClassify;
                for (var i = 0; i < that.data.batchId.length; i++) {
                    if (newUserScore.batch == that.data.batchId[i]) {
                        that.setData({
                            batchName: that.data.batchListName[i],
                            batch: newUserScore.batch
                        });
                        wx.setStorage({
                            key: "collegeRecommendBatch",
                            data: newUserScore.batch
                        });
                        break;
                    }
                }
                that.setData({
                    yxyxShow: true,
                    collegeYXList: [],
                    collegePn: 1,
                    userScore: newUserScore,
                    collegeNum: 0
                });
                that.loadData(newUserScore.batch, CdiProvince, "", CdiClassify, 1, 1, "", "", "", "", 0);
                if (that.data.searchMajorName != "输入专业名称") {
                    that.setData({
                        zyyxShow: true,
                        majorYXList: [],
                        majorPn: 1,
                        searchMajorName: zyyx.name
                    });
                    that.initMajorInfo(zyyx);
                    that.loadMajorData(that.data.batch, CdiProvince, "", CdiClassify, 1, 2, "", collegeRecommendBatchGroup, "", "", 0, "");
                }
            }
        }
        wx.stopPullDownRefresh();
        that.scrollFlag = false;
    },
    initMajorInfo: function initMajorInfo(zyyx) {
        var that = this;
        if (zyyx.majorcode != "") {
            that.majorcode = zyyx.majorcode;
            that.majorname = "";
        } else {
            that.majorcode = "";
            that.majorname = zyyx.name;
        }
    },
    onUnload: function onUnload() {
        var that = this;
        clearInterval(timer);
        wx.setStorage({
            key: "collegeRecommendBatchGroup",
            data: ""
        });
        wx.setStorage({
            key: "collegeRecommendBatch",
            data: -1
        });
        wx.setStorageSync("zyyx", {
            name: "输入专业名称",
            majorcode: ""
        });
        if (that.data.userInfo[0].UserType > 1) {
            wx.setStorageSync("JSZixuanList", "");
        }
    },
    swichNav: function swichNav(e) {
        var that = this;
        var chooseFX = void 0;
        var tmpsetdata = {
            currentTab: e.currentTarget.dataset.current
        };
        if (that.data.CSBFlag == "false") {
            that.data.CSBFlag = "true";
            tmpsetdata.CSBChong = "chongHide";
            tmpsetdata.CSBShou = "shouHide";
            tmpsetdata.CSBBao = "baoHide";
            tmpsetdata.CSBMoren = "morenHide";
        }
        this.setData(tmpsetdata);
        if (e.detail.current == 0) {
            chooseFX = true;
        }
        if (e.detail.current == 1) {
            if (that.data.majorYXList.length > 0) {
                chooseFX = true;
            } else {
                chooseFX = false;
            }
        } else if (e.detail.current == 2) {
            chooseFX = false;
        }
        this.setData({
            chooseFX: chooseFX
        });
        this.changeisTianBao("changeTab");
    },
    // changeMain: function(collegeYXList) {
    //   var that = this;
    //   var collegePn = that.data.collegePn;
    //   var tianbaoList = that.data.tianbaoList;
    //   for (var i = 0; i < collegeYXList.length; i++) {
    //     collegeYXList[i].tianbao = false;
    //     for (var x = 0; x < collegeYXList[i].professions.length; x++) {
    //       collegeYXList[i].professions[x].st = false;
    //     }
    //   };
    //   for (var i = 0; i < tianbaoList.length; i++) {
    //     if (tianbaoList[i].colleges.length > 0) {
    //       for (var j = 0; j < collegeYXList.length; j++) {
    //         if (tianbaoList[i].colleges[0].UCode == collegeYXList[j].UCode) {
    //           // collegeYXList[j].tianbao = app.zimu(i);
    //           collegeYXList[j].color = tianbaoList[i].color;
    //           collegeYXList[j].bgColor = tianbaoList[i].color;
    //           for (var m = 0; m < tianbaoList[i].colleges[0].Professions.length; m++) {
    //             for (var n = 0; n < collegeYXList[j].Professions.length; n++) {
    //               if (tianbaoList[i].colleges[0].Professions[m].Code == collegeYXList[j].Professions[n].Code) {
    //                 collegeYXList[j].Professions[n].st = true;
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
    change: function change(e) {
        var that = this;
        var chooseFX = void 0;
        var tmpsetdata = {
            currentTab: e.detail.current
        };
        if (that.data.CSBFlag == "false") {
            that.data.CSBFlag = "true";
            tmpsetdata.CSBChong = "chongHide";
            tmpsetdata.CSBShou = "shouHide";
            tmpsetdata.CSBBao = "baoHide";
            tmpsetdata.CSBMoren = "morenHide";
        }
        this.setData(tmpsetdata);
        if (e.detail.current == 0) {
            chooseFX = true;
        }
        if (e.detail.current == 1) {
            if (that.data.majorYXList.length > 0) {
                chooseFX = true;
            } else {
                chooseFX = false;
            }
        } else if (e.detail.current == 2) {
            chooseFX = false;
        }
        this.setData({
            chooseFX: chooseFX
        });
        // if (e.detail.current == 0) {
        //   that.changeMain(that.data.collegeYXList);
        //   that.setData({
        //     collegeYXList: that.data.collegeYXList
        //   });
        // } else if (e.detail.current == 1) {
        //   that.changeMain(that.data.majorYXList);
        //   that.setData({
        //     majorYXList: that.data.majorYXList
        //   });
        // } else if (e.detail.current == 2) {
        //   that.changeMain(that.data.zixuanYXList);
        //   that.setData({
        //     zixuanYXList: that.data.zixuanYXList
        //   });
        // }
                this.changeisTianBao("changeTab");
    },
    bindpiciChange: function bindpiciChange(e) {
        var that = this;
        var val = e.detail.value;
        if (val == that.data.batchListIndex) {} else {
            that.setData({
                batchListIndex: val,
                batch: that.data.batchId[val],
                collegeYXList: [],
                showLoad: true
            });
            var userScore = that.data.userScore;
            var batch = that.data.batchId[val];
            var pros = that.data.CdiProvince;
            var collegeType = that.data.CdiClassify;
            that.loadData(batch, pros, "", collegeType, 1, 1, "", "", "", "", 0);
        }
    },
    // 院校详情
    collegeUp: function collegeUp(e) {
        var that = this;
        that.setData({
            collegeLoad: true
        });
        var ucode = e.currentTarget.dataset.ucode;
        var index = e.currentTarget.dataset.index;
        var type = e.currentTarget.dataset.type;
        var college = that.data.collegeYXList[index];
        this.setData({
            index: index
        });
        if (type == "1") {
            college = that.data.collegeYXList[index];
        } else if (type == "2") {
            college = that.data.majorYXList[index];
        } else if (type == "3") {
            college = that.data.zixuanYXList[index];
        }
        var provinceNumId = that.data.userInfo[0].Province;
        _api2.default.queryCollegesFractions("ScoreLines/Fractions/Colleges/Query", "POST", provinceNumId, ucode).then(function(res) {
            var data = res.result;
            var course = that.data.userScore.courseType;
            var collegeDetail = {
                pro: college.probability,
                code: college.code,
                num: college.planNum,
                chooseLevel: college.chooseLevel,
                collegeName: college.alias,
                tag: college.tags,
                collegeInfo: [],
                numId: college.collegeId,
                year: college.year
            };
            for (var i = 0; i < data.length; i++) {
                data[i].chooseLevel = data[i].chooseLevel.replace(/另一门/, "");
                if (course == data[i].course && that.data.batch == data[i].batch) {
                    collegeDetail.collegeInfo.push({
                        year: data[i].year,
                        maxScore: data[i].maxScore,
                        minScore: data[i].minScore,
                        avgScore: data[i].avgScore,
                        enterNum: data[i].enterNum,
                        lowSort: data[i].lowSort,
                        chooseLevel: data[i].chooseLevel,
                        batchName: data[i].batchName
                    });
                }
            }
            that.setData({
                collegeDetail: collegeDetail,
                collegeLoad: false
            });
        });
        this.setData({
            collegeUp: "major-animate"
        });
    },
    collegeClose: function collegeClose() {
        this.setData({
            collegeUp: "major-animate-out"
        });
    },
    // 专业详情
    majorUp: function majorUp(e) {
        var that = this;
        that.setData({
            majorLoad: true,
            majorUp: "major-animate"
        });
        var extended = JSON.parse(e.currentTarget.dataset.extended);
        var majorDetail = {
            Code: e.currentTarget.dataset.code,
            CollegeName: e.currentTarget.dataset.collegename,
            Cost: e.currentTarget.dataset.cost,
            LearYear: e.currentTarget.dataset.learyear,
            MajorCode: e.currentTarget.dataset.majorcode,
            PlanNum: e.currentTarget.dataset.plannum,
            PlanYear: e.currentTarget.dataset.planyear,
            Probability: e.currentTarget.dataset.probability,
            ProfessionName: e.currentTarget.dataset.professionname,
            RecommendPFModel: extended,
            year: e.currentTarget.dataset.year
        };
        that.setData({
            majorDetail: majorDetail,
            majorLoad: false
        });
    },
    majorClose: function majorClose() {
        this.setData({
            majorUp: "major-animate-out"
        });
    },
    // 填报详情
    tianbaoUp: function tianbaoUp(wish, collegeindex, item) {
        var that = this;
        var wish = wish;
        var collegeindex = collegeindex;
        var tianbaoList = that.data.tianbaoList;
        var item = item;
        if (item == "0") {
            var collegeDetail = that.data.collegeYXList[collegeindex];
            for (var i = 0; i < tianbaoList.length; i++) {
                if (tianbaoList[i].ji == wish) {
                    tianbaoList[i].wish = true;
                } else {
                    tianbaoList[i].wish = false;
                }
            }
            that.setData({
                tianbaoList: tianbaoList,
                tianbaoUp: "major-animate",
                tianbaoCollegeDetail: collegeDetail,
                collegeindex: collegeindex
            });
        } else if (item == "1") {
            var collegeDetail = that.data.majorYXList[collegeindex];
            for (var i = 0; i < tianbaoList.length; i++) {
                if (tianbaoList[i].ji == wish) {
                    tianbaoList[i].wish = true;
                } else {
                    tianbaoList[i].wish = false;
                }
            }
            that.setData({
                tianbaoList: tianbaoList,
                tianbaoUp: "major-animate",
                tianbaoCollegeDetail: collegeDetail,
                collegeindex: collegeindex
            });
        } else if (item == "2") {
            var collegeDetail = that.data.zixuanYXList[collegeindex];
            for (var i = 0; i < tianbaoList.length; i++) {
                if (tianbaoList[i].ji == wish) {
                    tianbaoList[i].wish = true;
                } else {
                    tianbaoList[i].wish = false;
                }
            }
            that.setData({
                tianbaoList: tianbaoList,
                tianbaoUp: "major-animate",
                tianbaoCollegeDetail: collegeDetail,
                collegeindex: collegeindex
            });
        }
    },
    // tianbaoClose: function() {
    //   var that = this;
    //   if (that.data.currentTab == 0) {
    //     that.changeMain(that.data.collegeYXList);
    //     that.setData({
    //       collegeYXList: that.data.collegeYXList
    //     });
    //   } else if (that.data.currentTab == 1) {
    //     that.changeMain(that.data.majorYXList);
    //     that.setData({
    //       majorYXList: that.data.majorYXList
    //     });
    //   } else if (that.data.currentTab == 2) {
    //     that.changeMain(that.data.zixuanYXList);
    //     that.setData({
    //       zixuanYXList: that.data.zixuanYXList
    //     });
    //   }
    //   this.setData({
    //     tianbaoUp: 'major-animate-out'
    //   });
    // },
    // 筛选
    shaixuan: function shaixuan() {
        var that = this;
        var CSBBgColor = that.data.CSBBgColor;
        for (var i = 0; i < that.data.CSBList.length; i++) {
            if (that.data.CSBList[i].CSBBgColor == CSBBgColor) {
                that.data.CSBList[i].st = true;
            } else {
                that.data.CSBList[i].st = false;
            }
        }
        that.data.morenCityList = JSON.parse(JSON.stringify(that.data.cityList));
        that.data.morenBatchList = JSON.parse(JSON.stringify(that.data.batchList));
        that.data.morenhotType = JSON.parse(JSON.stringify(that.data.hotType));
        that.data.morenbOrZ = JSON.parse(JSON.stringify(that.data.bOrZ));
        that.data.morenxingzhi = JSON.parse(JSON.stringify(that.data.xingzhi));
        that.data.morenforeignType = JSON.parse(JSON.stringify(that.data.foreignType));
        var tmpsetdata = {
            shaixuan: "shaixuan-animate",
            CSBList: that.data.CSBList,
            flag: true
        };
        if (that.data.CSBFlag == "false") {
            that.data.CSBFlag = "true";
            tmpsetdata.CSBChong = "chongHide";
            tmpsetdata.CSBShou = "shouHide";
            tmpsetdata.CSBBao = "baoHide";
            tmpsetdata.CSBMoren = "morenHide";
        }
        that.setData(tmpsetdata);
    },
    shaixuanClose: function shaixuanClose() {
        var _this5 = this;
        this.setData({
            shaixuan: "shaixuan-animate-out",
            cityList: this.data.morenCityList,
            batchList: this.data.morenBatchList,
            hotType: this.data.morenhotType,
            xingzhi: this.data.morenxingzhi,
            foreignType: this.data.morenforeignType,
            bOrZ: this.data.morenbOrZ
        });
        setTimeout(function() {
            _this5.setData({
                flag: false
            });
        }, 200);
    },
    compareArray: function compareArray(arr1, arr2) {
        //比较俩数组是否相同
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i].st != arr2[i].st) {
                return false;
            }
        }
        return true;
    },
    queren: function queren() {
        //确认
        var that = this;
        if (that.data.userInfo[0].UserType > 1) {
            var cityList = that.data.cityList;
            var batchList = that.data.batchList;
            var hotType = that.data.hotType;
            var bOrZ = that.data.bOrZ;
            var xingzhi = that.data.xingzhi;
            var foreignType = that.data.foreignType;
            var morenCityList = that.data.morenCityList;
            var morenBatchList = that.data.morenBatchList;
            var morenhotType = that.data.morenhotType;
            var morenbOrZ = that.data.morenbOrZ;
            var morenxingzhi = that.data.morenxingzhi;
            var morenforeignType = that.data.morenforeignType;
            if (that.compareArray(cityList, morenCityList) && that.compareArray(batchList, morenBatchList) && that.compareArray(hotType, morenhotType) && that.compareArray(bOrZ, morenbOrZ) && that.compareArray(xingzhi, morenxingzhi) && that.compareArray(foreignType, morenforeignType)) {
                var CSBList = that.data.CSBList;
                var RecommendType = that.data.RecommendType;
                for (var i = 0; i < CSBList.length; i++) {
                    if (CSBList[i].id == RecommendType) {
                        if (CSBList[i].st == true) {
                            that.setData({
                                shaixuan: "shaixuan-animate-out"
                            });
                            setTimeout(function() {
                                that.setData({
                                    flag: false
                                });
                            }, 200);
                        } else {
                            var batchListArr;
                            var cityArr;
                            var i;
                            var CdiClassify;
                            var i;
                            var CdiProvince;
                            var batch;
                            var pros;
                            var collegeType;
                            var majors;
                            var RecommendType;
                            var i;
                            var CSBContent;
                            (function() {
                                that.setData({
                                    shaixuan: "shaixuan-animate-out"
                                });
                                setTimeout(function() {
                                    that.setData({
                                        flag: false
                                    });
                                }, 200);
                                batchListArr = [];
                                cityArr = [];
                                for (i = 0; i < that.data.batchList.length; i++) {
                                    if (that.data.batchList[i].st == true) {
                                        batchListArr.push(that.data.batchList[i].name);
                                    }
                                }
                                CdiClassify = batchListArr.join("_");
                                for (i = 0; i < that.data.cityList.length; i++) {
                                    if (that.data.cityList[i].st == true) {
                                        cityArr.push(that.data.cityList[i].numId);
                                    }
                                }
                                CdiProvince = cityArr.join("_");
                                that.setData({
                                    CdiProvince: CdiProvince,
                                    CdiClassify: CdiClassify
                                });
                                var hotTypeNum = 0;
                                if (hotType[0].st == true) {
                                    that.setData({
                                        hotTypeNum: 0
                                    });
                                } else {
                                    hotType.forEach(function(ele) {
                                        if (ele.st) {
                                            ++hotTypeNum;
                                        }
                                    });
                                    that.setData({
                                        hotTypeNum: hotTypeNum
                                    });
                                }
                                var xingzhiNum = 0;
                                if (xingzhi[0].st == true) {
                                    that.setData({
                                        xingzhiNum: 0
                                    });
                                } else {
                                    xingzhi.forEach(function(ele) {
                                        if (ele.st) {
                                            ++xingzhiNum;
                                        }
                                    });
                                    that.setData({
                                        xingzhiNum: xingzhiNum
                                    });
                                }
                                if (CdiProvince == "-1") {
                                    CdiProvince = "", that.setData({
                                        CdiProvinceNum: 0
                                    });
                                } else {
                                    that.setData({
                                        CdiProvinceNum: cityArr.length
                                    });
                                }
                                if (CdiClassify == "不限") {
                                    CdiClassify = "", that.setData({
                                        CdiClassifyNum: 0
                                    });
                                } else {
                                    that.setData({
                                        CdiClassifyNum: batchListArr.length
                                    });
                                }
                                that.setData({
                                    collegePn: 1,
                                    majorPn: 1,
                                    collegeYXList: [],
                                    majorYXList: []
                                });
                                batch = that.data.batch;
                                pros = that.data.CdiProvince == "-1" ? "" : that.data.CdiProvince;
                                collegeType = that.data.CdiClassify == "不限" ? "" : that.data.CdiClassify;
                                majors = "";
                                RecommendType = 0;
                                for (i = 0; i < that.data.CSBList.length; i++) {
                                    if (that.data.CSBList[i].st == true) {
                                        RecommendType = that.data.CSBList[i].id;
                                        CSBContent = that.data.CSBList[i].name == "默认" ? "选择风险" : that.data.CSBList[i].name;
                                        that.setData({
                                            CSBContent: CSBContent,
                                            CSBBgColor: that.data.CSBList[i].CSBBgColor,
                                            RecommendType: RecommendType
                                        });
                                    }
                                }
                                that.data.morenCityList = JSON.parse(JSON.stringify(that.data.cityList));
                                that.data.morenBatchList = JSON.parse(JSON.stringify(that.data.batchList));
                                that.data.morenhotType = JSON.parse(JSON.stringify(that.data.hotType));
                                that.data.morenbOrZ = JSON.parse(JSON.stringify(that.data.bOrZ));
                                that.data.morenxingzhi = JSON.parse(JSON.stringify(that.data.xingzhi));
                                that.setData({
                                    yxyxShow: true
                                });
                                that.loadData(batch, pros, majors, collegeType, 1, 1, "", that.data.GroupName, "", "", RecommendType, "shaixuan");
                                if (that.data.searchMajorName != "输入专业名称") {
                                    that.setData({
                                        zyyxShow: true
                                    });
                                    that.loadMajorData(batch, pros, majors, collegeType, 1, 2, "", that.data.GroupName, "", "", RecommendType, "", "shaixuan");
                                }
                            })();
                        }
                    }
                }
            } else {
                if (foreignType[0].st) {
                    this.foreignType = 0;
                }
                if (foreignType[1].st) {
                    this.foreignType = 2;
                }
                if (foreignType[2].st) {
                    this.foreignType = 1;
                }
                that.setData({
                    shaixuan: "shaixuan-animate-out",
                    bufferYXYX: [ {}, {}, {}, {} ],
                    bufferZYYX: [ {}, {}, {}, {} ]
                });
                setTimeout(function() {
                    that.setData({
                        flag: false
                    });
                }, 200);
                var batchListArr = [];
                var cityArr = [];
                for (var i = 0; i < that.data.batchList.length; i++) {
                    if (that.data.batchList[i].st == true) {
                        batchListArr.push(that.data.batchList[i].name);
                    }
                }
                var CdiClassify = batchListArr.join("_");
                for (var i = 0; i < that.data.cityList.length; i++) {
                    if (that.data.cityList[i].st == true) {
                        cityArr.push(that.data.cityList[i].numId);
                    }
                }
                var CdiProvince = cityArr.join("_");
                that.setData({
                    CdiProvince: CdiProvince,
                    CdiClassify: CdiClassify
                });
                var hotTypeNum = 0;
                if (hotType[0].st == true) {
                    that.setData({
                        hotTypeNum: 0
                    });
                } else {
                    hotType.forEach(function(ele) {
                        if (ele.st) {
                            ++hotTypeNum;
                        }
                    });
                    that.setData({
                        hotTypeNum: hotTypeNum
                    });
                }
                var xingzhiNum = 0;
                if (xingzhi[0].st == true) {
                    that.setData({
                        xingzhiNum: 0
                    });
                } else {
                    xingzhi.forEach(function(ele) {
                        if (ele.st) {
                            ++xingzhiNum;
                        }
                    });
                    that.setData({
                        xingzhiNum: xingzhiNum
                    });
                }
                var foreignTypeNum = 0;
                if (!foreignType[0].st) {
                    foreignTypeNum = 1;
                }
                that.setData({
                    foreignTypeNum: foreignTypeNum
                });
                if (CdiProvince == "-1") {
                    CdiProvince = "", that.setData({
                        CdiProvinceNum: 0
                    });
                } else {
                    that.setData({
                        CdiProvinceNum: cityArr.length
                    });
                }
                if (CdiClassify == "不限") {
                    CdiClassify = "", that.setData({
                        CdiClassifyNum: 0
                    });
                } else {
                    that.setData({
                        CdiClassifyNum: batchListArr.length
                    });
                }
                that.setData({
                    collegePn: 1,
                    majorPn: 1,
                    collegeYXList: [],
                    majorYXList: []
                });
                var batch = that.data.batch;
                var pros = that.data.CdiProvince == "-1" ? "" : that.data.CdiProvince;
                var collegeType = that.data.CdiClassify == "不限" ? "" : that.data.CdiClassify;
                var majors = "";
                var RecommendType = 0;
                for (var i = 0; i < that.data.CSBList.length; i++) {
                    if (that.data.CSBList[i].st == true) {
                        RecommendType = that.data.CSBList[i].id;
                        var CSBContent = that.data.CSBList[i].name == "默认" ? "选择风险" : that.data.CSBList[i].name;
                        that.setData({
                            CSBContent: CSBContent,
                            CSBBgColor: that.data.CSBList[i].CSBBgColor,
                            RecommendType: RecommendType
                        });
                    }
                }
                that.data.morenCityList = JSON.parse(JSON.stringify(that.data.cityList));
                that.data.morenBatchList = JSON.parse(JSON.stringify(that.data.batchList));
                that.setData({
                    yxyxShow: true
                });
                that.loadData(batch, pros, majors, collegeType, 1, 1, "", that.data.GroupName, "", "", RecommendType, "shaixuan");
                if (that.data.searchMajorName != "输入专业名称") {
                    that.setData({
                        zyyxShow: true
                    });
                    that.loadMajorData(batch, pros, majors, collegeType, 1, 2, "", that.data.GroupName, "", "", RecommendType, "", "shaixuan");
                }
            }
        } else {
            that.chongzhi();
            wx.showToast({
                title: "开通VIP即可体验",
                icon: "none",
                duration: 2e3
            });
            that.setData({
                shaixuan: "shaixuan-animate-out"
            });
            setTimeout(function() {
                that.setData({
                    flag: false
                });
            }, 200);
        }
        setTimeout(function() {
            that.setData({
                flag: false
            });
        }, 200);
    },
    chongzhi: function chongzhi() {
        //重置
        var that = this;
        that.data.cityList[0].st = true;
        for (var i = 1; i < that.data.cityList.length; i++) {
            that.data.cityList[i].st = false;
        }
        that.data.batchList[0].st = true;
        for (var i = 1; i < that.data.batchList.length; i++) {
            that.data.batchList[i].st = false;
        }
        that.data.hotType[0].st = true;
        for (var i = 1; i < that.data.hotType.length; i++) {
            that.data.hotType[i].st = false;
        }
        that.data.bOrZ[0].st = true;
        for (var i = 1; i < that.data.bOrZ.length; i++) {
            that.data.bOrZ[i].st = false;
        }
        that.data.xingzhi[0].st = true;
        for (var i = 1; i < that.data.xingzhi.length; i++) {
            that.data.xingzhi[i].st = false;
        }
        that.data.foreignType[0].st = true;
        for (var i = 1; i < that.data.foreignType.length; i++) {
            that.data.foreignType[i].st = false;
        }
        that.setData({
            cityList: that.data.cityList,
            batchList: that.data.batchList,
            hotType: that.data.hotType,
            bOrZ: that.data.bOrZ,
            xingzhi: that.data.xingzhi,
            foreignType: that.data.foreignType,
            CdiProvince: "-1",
            CdiClassify: "不限"
        });
    },
    down: function down() {
        var that = this;
        that.setData({
            down: !that.data.down,
            cityListDown: that.data.down == false ? "cityList-animate" : "cityList-animate-out"
        });
    },
    chooseCityArr: function chooseCityArr(e) {
        var that = this;
        var cityList = that.data.cityList;
        var cityId = e.currentTarget.dataset.id;
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
            var flagCount = 0;
            for (var _i11 = 1; _i11 < cityList.length; _i11++) {
                var flag = !cityList[_i11].st;
                if (cityId == cityList[_i11].numId) {
                    cityList[_i11].st = flag;
                }
                if (cityList[_i11].st == true) {
                    flagCount++;
                }
                if (flagCount == 0 && _i11 == cityList.length - 1) {
                    cityList[0].st = true;
                }
            }
            that.setData({
                showBtn: true
            });
        }
        that.setData({
            cityList: that.data.cityList
        });
    },
    // 层次
    bOrZ: function bOrZ(e) {
        var that = this;
        var bOrZ = that.data.bOrZ;
        var index = e.currentTarget.dataset.index;
        for (var i = 0; i < bOrZ.length; i++) {
            bOrZ[i].st = false;
        }
        bOrZ[index].st = true;
        that.setData({
            showBtn: true
        });
        that.setData({
            bOrZ: that.data.bOrZ
        });
    },
    // 性质
    xingzhi: function xingzhi(e) {
        var that = this;
        var xingzhi = that.data.xingzhi;
        var index = e.currentTarget.dataset.index;
        for (var i = 0; i < xingzhi.length; i++) {
            xingzhi[i].st = false;
        }
        xingzhi[index].st = true;
        that.setData({
            showBtn: true
        });
        that.setData({
            xingzhi: that.data.xingzhi
        });
    },
    // 中外合作
    foreignTypes: function foreignTypes(e) {
        console.log(e);
        var that = this;
        var foreignType = that.data.foreignType;
        var index = e.currentTarget.dataset.index;
        for (var i = 0; i < foreignType.length; i++) {
            foreignType[i].st = false;
        }
        foreignType[index].st = true;
        that.setData({
            showBtn: true
        });
        that.setData({
            foreignType: that.data.foreignType
        });
    },
    // 热门标签
    hotType: function hotType(e) {
        var that = this;
        var hotType = that.data.hotType;
        var value = e.currentTarget.dataset.value;
        if (value == "") {
            hotType[0].st = true;
            for (var i = 1; i < hotType.length; i++) {
                hotType[i].st = false;
            }
            that.setData({
                showBtn: true
            });
        } else {
            hotType[0].st = false;
            var flagCount = 0;
            for (var _i12 = 1; _i12 < hotType.length; _i12++) {
                var flag = !hotType[_i12].st;
                if (value == hotType[_i12].name) {
                    hotType[_i12].st = flag;
                }
                if (hotType[_i12].st == true) {
                    flagCount++;
                }
                if (flagCount == 0 && _i12 == hotType.length - 1) {
                    hotType[0].st = true;
                }
            }
            that.setData({
                showBtn: true
            });
        }
        that.setData({
            hotType: that.data.hotType
        });
    },
    // 类型
    collegeTypeArr: function collegeTypeArr(e) {
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
            batchList[0].st = false;
            var flagCount = 0;
            for (var i = 1; i < batchList.length; i++) {
                var flag = !batchList[i].st;
                if (batchName == batchList[i].name) {
                    batchList[i].st = flag;
                }
                if (batchList[i].st == true) {
                    flagCount++;
                }
                if (flagCount == 0 && i == batchList.length - 1) {
                    batchList[0].st = true;
                }
            }
            that.setData({
                showBtn: true
            });
        }
        that.setData({
            batchList: that.data.batchList
        });
    },
    scrollCollegeToLower: function scrollCollegeToLower() {
        var that = this;
        if (that.data.showCollegeMore == true) return;
        wx.showNavigationBarLoading();
        that.setData({
            showCollegeMore: true,
            collegeShowMore: true
        });
        try {
            var userScore = wx.getStorageSync("userScore");
            if (userScore) {
                that.setData({
                    collegePn: that.data.collegePn + 1
                });
                var CdiProvince = that.data.CdiProvince == "-1" ? "" : that.data.CdiProvince;
                var CdiClassify = that.data.CdiClassify = "不限" ? "" : that.data.CdiClassify;
                that.loadData(that.data.batch, CdiProvince, "", CdiClassify, that.data.collegePn, 1, "", that.data.GroupName, "", "", that.data.RecommendType);
            }
        } catch (e) {}
    },
    scrollMajorToLower: function scrollMajorToLower() {
        var that = this;
        if (that.data.showMajorMore) return;
        wx.showNavigationBarLoading();
        that.setData({
            showMajorMore: true,
            majorShowMore: true
        });
        var userScore = wx.getStorageSync("userScore");
        if (userScore) {
            that.setData({
                majorPn: that.data.majorPn + 1
            });
            var CdiProvince = that.data.CdiProvince == "-1" ? "" : that.data.CdiProvince;
            var CdiClassify = that.data.CdiClassify = "不限" ? "" : that.data.CdiClassify;
            that.loadMajorData(that.data.batch, CdiProvince, "", CdiClassify, that.data.majorPn, 2, "", "", "", "", that.data.RecommendType, "");
        }
    },
    goSearch: function goSearch(e) {
        wx.navigateTo({
            url: "/pages/globalSearch/globalSearch?mode=firstMajor"
        });
    },
    chooseTianbao: function chooseTianbao(e) {
        var that = this;
        var collegeDetail = that.data.tianbaoCollegeDetail;
        var tianbaoList = that.data.tianbaoList;
        var index = e.currentTarget.dataset.index;
        if (that.data.currentTab == 0) {
            var collegeYXList = that.data.collegeYXList;
        } else if (that.data.currentTab == 1) {
            var collegeYXList = that.data.majorYXList;
        } else if (that.data.currentTab == 2) {
            var collegeYXList = that.data.zixuanYXList;
        }
        if (tianbaoList[index].colleges.length > 0) {
            if (tianbaoList[index].colleges[0].UCode == collegeDetail.UCode) {
                that.setData({
                    tianbaoUp: "major-animate-out"
                });
                wx.showToast({
                    title: "已填入志愿表",
                    icon: "none",
                    duration: 2e3
                });
            } else {
                wx.showModal({
                    title: "",
                    content: collegeDetail.Alias + "\n将替换：\n" + tianbaoList[index].colleges[0].Alias,
                    confirmColor: "#e9302d",
                    success: function success(res) {
                        if (res.confirm) {
                            for (var m = 0; m < collegeYXList.length; m++) {
                                if (collegeYXList[m].UCode == collegeDetail.UCode) {
                                    for (var n = 0; n < collegeYXList[m].Professions.length; n++) {
                                        if (that.data.professionsDetail.Code == collegeYXList[m].Professions[n].Code) {
                                            collegeYXList[m].Professions[n].st = true;
                                        } else {
                                            collegeYXList[m].Professions[n].st = "";
                                        }
                                    }
                                    break;
                                }
                            }
                            for (var i = 0; i < collegeYXList.length; i++) {
                                if (collegeYXList[i].UCode == tianbaoList[index].colleges[0].UCode) {
                                    collegeYXList[i].tianbao = false;
                                    for (var n = 0; n < collegeYXList[i].Professions.length; n++) {
                                        if (that.data.professionsDetail.Code == collegeYXList[i].Professions[n].Code) {
                                            collegeYXList[i].Professions[n].st = true;
                                        } else {
                                            collegeYXList[i].Professions[n].st = "";
                                        }
                                    }
                                    break;
                                }
                            }
                            tianbaoList[index].colleges = [];
                            if (that.data.currentTab == 0) {
                                that.setData({
                                    collegeYXList: collegeYXList
                                });
                            } else if (that.data.currentTab == 1) {
                                that.setData({
                                    majorYXList: collegeYXList
                                });
                            } else if (that.data.currentTab == 2) {
                                that.setData({
                                    zixuanYXList: collegeYXList
                                });
                            }
                            that.tianbaoMain(collegeDetail, tianbaoList, index, collegeYXList);
                        } else if (res.cancel) {}
                    }
                });
            }
        } else {
            for (var m = 0; m < collegeYXList.length; m++) {
                if (collegeYXList[m].UCode == collegeDetail.UCode) {
                    for (var n = 0; n < collegeYXList[m].Professions.length; n++) {
                        if (that.data.professionsDetail.Code == collegeYXList[m].Professions[n].Code) {
                            collegeYXList[m].Professions[n].st = true;
                        } else {
                            collegeYXList[m].Professions[n].st = "";
                        }
                    }
                    break;
                }
            }
            if (that.data.currentTab == 0) {
                that.setData({
                    collegeYXList: collegeYXList
                });
            } else if (that.data.currentTab == 1) {
                that.setData({
                    majorYXList: collegeYXList
                });
            } else if (that.data.currentTab == 2) {
                that.setData({
                    zixuanYXList: collegeYXList
                });
            }
            that.tianbaoMain(collegeDetail, tianbaoList, index, collegeYXList);
        }
    },
    tianbaoMain: function tianbaoMain(collegeDetail, tianbaoList, index, collegeYXList) {
        var that = this;
        for (var i = 0; i < tianbaoList.length; i++) {
            if (tianbaoList[i].colleges.length > 0) {
                if (collegeDetail.UCode == tianbaoList[i].colleges[0].UCode) {
                    tianbaoList[i].colleges = [];
                }
            }
        }
        collegeDetail.Professions = [];
        collegeDetail.Professions.push(that.data.professionsDetail);
        tianbaoList[index].colleges.push(collegeDetail);
        that.setData({
            tianbaoList: tianbaoList
        });
        var tianbao = "";
        // tianbao = app.zimu(index);
                collegeYXList[that.data.collegeindex].tianbao = tianbao;
        collegeYXList[that.data.collegeindex].bgColor = tianbaoList[index].color;
        if (that.data.currentTab == 0) {
            that.setData({
                collegeYXList: collegeYXList,
                tianbaoUp: "major-animate-out"
            });
        } else if (that.data.currentTab == 1) {
            that.setData({
                majorYXList: collegeYXList,
                tianbaoUp: "major-animate-out"
            });
        } else if (that.data.currentTab == 2) {
            that.setData({
                zixuanYXList: collegeYXList,
                tianbaoUp: "major-animate-out"
            });
        }
        wx.showToast({
            title: "已填入志愿表",
            icon: "none",
            duration: 2e3
        });
        var collegeNum = 0;
        for (var i = 0; i < tianbaoList.length; i++) {
            if (tianbaoList[i].colleges.length > 0) {
                collegeNum += 1;
            }
        }
        that.setData({
            collegeNum: collegeNum
        });
    },
    checked: function checked(e) {
        var that = this;
        if (that.data.userInfo[0].UserType <= 1) {
            wx.showToast({
                title: "开通VIP即可体验",
                icon: "none",
                duration: 2e3
            });
        } else {
            if (that.data.currentTab == 0) {
                var collegeYXList = that.data.collegeYXList;
            } else if (that.data.currentTab == 1) {
                var collegeYXList = that.data.majorYXList;
            } else if (that.data.currentTab == 2) {
                var collegeYXList = that.data.zixuanYXList;
            }
            var tianbaoList = that.data.tianbaoList;
            var collegeindex = e.currentTarget.dataset.collegeindex;
            var majorindex = e.currentTarget.dataset.majorindex;
            var UCode = e.currentTarget.dataset.collegeucode;
            var wish = e.currentTarget.dataset.wish;
            var item = e.currentTarget.dataset.item;
            for (var i = 0; i < tianbaoList.length; i++) {
                if (tianbaoList[i].colleges.length > 0) {
                    if (UCode == tianbaoList[i].colleges[0].UCode) {
                        if (tianbaoList[i].colleges[0].Professions.length < that.data.ZyProfessionCount) {
                            collegeYXList[collegeindex].Professions[majorindex].st = true;
                            tianbaoList[i].colleges[0].Professions.push(collegeYXList[collegeindex].Professions[majorindex]);
                        } else {
                            wx.showToast({
                                title: "每所院校最多选择" + that.data.ZyProfessionCount + "个专业",
                                icon: "none",
                                duration: 2e3
                            });
                        }
                        break;
                    } else {
                        if (i == tianbaoList.length - 1) {
                            collegeYXList[collegeindex].Professions[majorindex].st = true;
                            that.setData({
                                professionsDetail: collegeYXList[collegeindex].Professions[majorindex]
                            });
                            that.tianbaoUp(wish, collegeindex, item);
                        }
                    }
                } else {
                    if (i == tianbaoList.length - 1) {
                        collegeYXList[collegeindex].Professions[majorindex].st = true;
                        that.setData({
                            professionsDetail: collegeYXList[collegeindex].Professions[majorindex]
                        });
                        that.tianbaoUp(wish, collegeindex, item);
                    }
                }
            }
            that.setData({
                tianbaoList: tianbaoList
            });
            if (that.data.currentTab == 0) {
                that.setData({
                    collegeYXList: collegeYXList
                });
            } else if (that.data.currentTab == 1) {
                that.setData({
                    majorYXList: collegeYXList
                });
            } else if (that.data.currentTab == 2) {
                that.setData({
                    zixuanYXList: collegeYXList
                });
            }
        }
    },
    checkedNo: function checkedNo(e) {
        var that = this;
        if (that.data.currentTab == 0) {
            var collegeYXList = that.data.collegeYXList;
        } else if (that.data.currentTab == 1) {
            var collegeYXList = that.data.majorYXList;
        } else if (that.data.currentTab == 2) {
            var collegeYXList = that.data.zixuanYXList;
        }
        var tianbaoList = that.data.tianbaoList;
        var majorcode = e.currentTarget.dataset.majorcode;
        var collegeindex = e.currentTarget.dataset.collegeindex;
        var majorindex = e.currentTarget.dataset.majorindex;
        var UCode = e.currentTarget.dataset.collegeucode;
        collegeYXList[collegeindex].Professions[majorindex].st = "";
        for (var i = 0; i < tianbaoList.length; i++) {
            if (tianbaoList[i].colleges.length > 0) {
                if (tianbaoList[i].colleges[0].UCode == UCode) {
                    if (tianbaoList[i].colleges[0].Professions.length == 1) {
                        tianbaoList[i].colleges = [];
                        collegeYXList[collegeindex].tianbao = false;
                    } else {
                        for (var j = 0; j < tianbaoList[i].colleges[0].Professions.length; j++) {
                            if (tianbaoList[i].colleges[0].Professions[j].MajorCode == majorcode) {
                                tianbaoList[i].colleges[0].Professions.splice(j, 1);
                            }
                        }
                    }
                }
            }
        }
        that.setData({
            tianbaoList: tianbaoList
        });
        if (that.data.currentTab == 0) {
            that.setData({
                collegeYXList: collegeYXList
            });
        } else if (that.data.currentTab == 1) {
            that.setData({
                majorYXList: collegeYXList
            });
        } else if (that.data.currentTab == 2) {
            that.setData({
                zixuanYXList: collegeYXList
            });
        }
        var collegeNum = 0;
        for (var i = 0; i < tianbaoList.length; i++) {
            if (tianbaoList[i].colleges.length > 0) {
                collegeNum += 1;
            }
        }
        that.setData({
            collegeNum: collegeNum
        });
    },
    transitionUp: function transitionUp() {
        this.setData({
            transitionUp: "major-animate"
        });
    },
    transitionClose: function transitionClose() {
        this.setData({
            transitionUp: "major-animate-out"
        });
    },
    goMajorDetail: function goMajorDetail(e) {
        var mcode = this.data.majorDetail.MajorCode;
        this.setData({
            majorUp: "major-animate-out"
        });
        if (mcode.length == 4) {
            wx.navigateTo({
                url: "/packages/selectMajor/middleMajorDetail/middleMajorDetail?majorcode=" + mcode
            });
        } else {
            wx.navigateTo({
                url: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + mcode + "&cityid=" + this.data.cityId
            });
        }
    },
    goCollegeDetail: function goCollegeDetail() {
        var id = this.data.collegeDetail[0].CollegeId;
        this.setData({
            collegeUp: "major-animate-out"
        });
        wx.navigateTo({
            url: "/packages/findUniversity/collegeDetail/collegeDetail?numId=" + id
        });
    },
    noPay: function noPay() {
        // app.payPrompt();
    },
    commonTuijian: function commonTuijian() {
        wx.navigateTo({
            url: "/packages/paySystem/memberCardDetail/memberCardDetail"
        });
    },
    goChangeBatch: function goChangeBatch() {
        var that = this;
        if (this.data.disabled) {
            wx.showToast({
                title: "修改志愿表不支持更换批次",
                icon: "none",
                duration: 2e3
            });
            return;
        }
        wx.navigateTo({
            url: "/packages/common/batchList/batchList"
        });
        if (that.data.CSBFlag == "false") {
            that.data.CSBFlag = "true";
            that.setData({
                CSBChong: "chongHide",
                CSBShou: "shouHide",
                CSBBao: "baoHide",
                CSBMoren: "morenHide"
            });
        }
    },
    changeScore: function changeScore() {
        if (this.data.disabled) {
            wx.showToast({
                title: "修改志愿表不支持修改分数",
                icon: "none",
                duration: 2e3
            });
            return;
        }
        var that = this;
        var userScore = that.data.userScore;
        var course = userScore.courseType == 0 ? "理科" : "文科";
        if (that.data.userScore.provinceNumId == 1) {
            var content = course + " " + userScore.total + "分 " + userScore.chooseLevelList[0].value + " " + userScore.chooseLevelList[1].value;
        } else {
            var content = course + " " + userScore.total + "分 ";
        }
        wx.showModal({
            title: "正在使用的成绩：",
            content: content,
            confirmText: "我知道了",
            confirmColor: "#E9302D",
            showCancel: false,
            success: function success(res) {}
        });
    },
    goZixuanSearch: function goZixuanSearch() {
        wx.navigateTo({
            url: "/pages/globalSearch/globalSearch?mode=autonomyCollege"
        });
        // wx.navigateTo({
        //   url: '/packages/common/searchZixuan/searchZixuan?type=JS'
        // });
        },
    chooseCSB: function chooseCSB() {
        var that = this;
        if (that.data.CSBFlag == "true") {
            that.data.CSBFlag = "false";
            that.setData({
                CSBChong: "chong",
                CSBShou: "shou",
                CSBBao: "bao",
                CSBMoren: "moren"
            });
        } else {
            that.data.CSBFlag = "true";
            that.setData({
                CSBChong: "chongHide",
                CSBShou: "shouHide",
                CSBBao: "baoHide",
                CSBMoren: "morenHide"
            });
        }
    },
    chooseCSBLoad: function chooseCSBLoad() {
        var that = this;
        var batch = this.data.batch;
        var pros = that.data.CdiProvince == "-1" ? "" : that.data.CdiProvince;
        var collegeType = that.data.CdiClassify == "不限" ? "" : that.data.CdiClassify;
        var majors = "";
        var RecommendType = that.data.RecommendType;
        var GroupName = that.data.GroupName;
        var currentTab = that.data.currentTab;
        this.setData({
            collegeYXList: [],
            yxyxShow: true,
            collegePn: 1,
            majorPn: 1
        });
        this.loadData(batch, pros, majors, collegeType, 1, 1, "", GroupName, "", "", RecommendType, "cwb");
        if (that.data.searchMajorName != "输入专业名称") {
            this.setData({
                majorYXList: [],
                zyyxShow: true
            });
            this.loadMajorData(batch, pros, majors, collegeType, 1, 2, "", GroupName, "", "", RecommendType, "", "cwb");
        }
    },
    chooseCSBBtn: function chooseCSBBtn(e) {
        var that = this;
        var bgcolor = e.currentTarget.dataset.bgcolor;
        var id = parseInt(e.currentTarget.dataset.id);
        that.data.CSBFlag = "true";
        var tmpsetdata = {
            CSBChong: "chongHide",
            CSBShou: "shouHide",
            CSBBao: "baoHide",
            CSBMoren: "morenHide"
        };
        if (id != that.data.RecommendType) {
            if (id == 1) {
                tmpsetdata.CSBContent = "冲";
            } else if (id == 2) {
                tmpsetdata.CSBContent = "稳";
            } else if (id == 3) {
                tmpsetdata.CSBContent = "保";
            } else if (id == 0) {
                tmpsetdata.CSBContent = "选择风险";
            }
            tmpsetdata.RecommendType = id;
            tmpsetdata.CSBBgColor = bgcolor;
            that.setData(tmpsetdata);
            that.chooseCSBLoad();
        } else {
            that.setData(tmpsetdata);
        }
    },
    majorOpen: function majorOpen(e) {
        var that = this;
        var item = e.currentTarget.dataset.item;
        var index = e.currentTarget.dataset.collegeindex;
        if (item == "0") {
            var collegeYXList = that.data.collegeYXList;
            collegeYXList[index].majorOpen = !that.data.collegeYXList[index].majorOpen;
            that.setData({
                collegeYXList: collegeYXList
            });
            if (collegeYXList[index].majorOpen == true) {
                that.setData({
                    majorOpen: "majorOpen"
                });
            } else {
                that.setData({
                    majorOpen: "majorClose"
                });
            }
        } else if (item == "1") {
            var majorYXList = that.data.majorYXList;
            majorYXList[index].majorOpen = !that.data.majorYXList[index].majorOpen;
            that.setData({
                majorYXList: majorYXList
            });
            if (majorYXList[index].majorOpen == true) {
                that.setData({
                    majorOpen: "majorOpen"
                });
            } else {
                that.setData({
                    majorOpen: "majorClose"
                });
            }
        } else if (item == "2") {
            var zixuanYXList = that.data.zixuanYXList;
            zixuanYXList[index].majorOpen = !that.data.zixuanYXList[index].majorOpen;
            that.setData({
                zixuanYXList: zixuanYXList
            });
            if (zixuanYXList[index].majorOpen == true) {
                that.setData({
                    majorOpen: "majorOpen"
                });
            } else {
                that.setData({
                    majorOpen: "majorClose"
                });
            }
        }
    },
    CSBTypeArr: function CSBTypeArr(e) {
        var bgcolor = e.currentTarget.dataset.bgcolor;
        var name = e.currentTarget.dataset.name;
        var index = e.currentTarget.dataset.index;
        var id = e.currentTarget.dataset.id;
        var that = this;
        var CSBList = that.data.CSBList;
        for (var i = 0; i < CSBList.length; i++) {
            CSBList[i].st = false;
        }
        CSBList[index].st = true;
        that.setData({
            CSBList: CSBList
        });
    },
    transitionCheckedNo: function transitionCheckedNo(e) {
        var that = this;
        if (that.data.currentTab == 0) {
            var collegeYXList = that.data.collegeYXList;
        } else if (that.data.currentTab == 1) {
            var collegeYXList = that.data.majorYXList;
        } else if (that.data.currentTab == 2) {
            var collegeYXList = that.data.zixuanYXList;
        }
        var tianbaoList = that.data.tianbaoList;
        var majorcode = e.currentTarget.dataset.majorcode;
        // var collegeindex = e.currentTarget.dataset.collegeindex;
        // var majorindex = e.currentTarget.dataset.majorindex;
                var UCode = e.currentTarget.dataset.collegeucode;
        // collegeYXList[collegeindex].Professions[majorindex].st = '';
                var collegeindex = 0;
        for (var _i13 = 0; _i13 < collegeYXList.length; _i13++) {
            if (collegeYXList[_i13].UCode == UCode) {
                for (var _j = 0; _j < collegeYXList[_i13].Professions.length; _j++) {
                    if (collegeYXList[_i13].Professions[_j].MajorCode == majorcode) {
                        collegeYXList[_i13].Professions[_j].st = "";
                        collegeindex = _i13;
                        break;
                    }
                }
            }
        }
        for (var i = 0; i < tianbaoList.length; i++) {
            if (tianbaoList[i].colleges.length > 0) {
                if (tianbaoList[i].colleges[0].UCode == UCode) {
                    if (tianbaoList[i].colleges[0].Professions.length == 1) {
                        tianbaoList[i].colleges = [];
                        collegeYXList[collegeindex].tianbao = false;
                    } else {
                        for (var j = 0; j < tianbaoList[i].colleges[0].Professions.length; j++) {
                            if (tianbaoList[i].colleges[0].Professions[j].MajorCode == majorcode) {
                                tianbaoList[i].colleges[0].Professions.splice(j, 1);
                            }
                        }
                    }
                }
            }
        }
        that.setData({
            tianbaoList: tianbaoList
        });
        if (that.data.currentTab == 0) {
            that.setData({
                collegeYXList: collegeYXList
            });
        } else if (that.data.currentTab == 1) {
            that.setData({
                majorYXList: collegeYXList
            });
        } else if (that.data.currentTab == 2) {
            that.setData({
                zixuanYXList: collegeYXList
            });
        }
        var collegeNum = 0;
        for (var i = 0; i < tianbaoList.length; i++) {
            if (tianbaoList[i].colleges.length > 0) {
                collegeNum += 1;
            }
        }
        that.setData({
            collegeNum: collegeNum
        });
    }
});

function getArrDifference(arr1, arr2) {
    return arr1.concat(arr2).filter(function(v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
    });
}