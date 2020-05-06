var _api = require("../../../utils/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var app = getApp();

var api = require("../api.js");

var sensors = require("../../../utils/sensors.js");

var listData = [];

Page({
    data: {
        share: false,
        collegePlan: true,
        showLoad: true,
        chooseFX: true,
        delPop: {
            flag: false,
            animation: ""
        },
        CSBContent: "选择风险",
        CSBBgColor: "FE7878",
        CSBFlag: "true",
        CSBChong: "",
        CSBShou: "",
        CSBBao: "",
        CSBMoren: "",
        // score: null,
        score: {
            totalScore: 500,
            rank: 9e3,
            chooseLevel: "物/化/生"
        },
        listData: [],
        size: 4,
        isIphoneX: false,
        // scrollH: 0,
        saveBtnFlag: true,
        smallDetailLoad: true,
        middleDetailLoad: true,
        shaixuan: {
            flag: false,
            num: 0,
            animate: "",
            all: [ {
                st: true,
                name: "全部"
            } ],
            classifyList: [ {
                name: "冲",
                st: false
            }, {
                name: "稳",
                st: false
            }, {
                name: "保",
                st: false
            }, {
                name: "自选",
                st: false
            } ]
        },
        HInfo: {
            swiperH: 0,
            scrollH: 0,
            shaixuanH: 0,
            navH: 0
        }
    },
    aa: function aa() {
        return;
    },
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        if (that.options && that.options.numId) {
            return {
                title: "我在完美志愿模拟的志愿表，你也来试试！",
                imageUrl: "http://bapp.wmei.cn/share/zyb.png",
                path: "/packages/recommend/tianjinVolunteer/tianjinVolunteer?numId=" + that.options.numId + "&share=true"
            };
        } else {}
    },
    //重新筛选院校列表
    changeCollegeList: function changeCollegeList(name, sub) {
        var that = this;
        var collegeList = this.data.collegeList;
        var listData = this.data.listData;
        // that.morenList.forEach((ele,idx)=>{
        //   if(ele.collegeName == name && ele.chooseSubjects == sub){
        //     that.morenList.splice(idx,1)
        //   }
        // })
        // collegeList.forEach((ele, idx) => {
        //   if (ele.collegeName == name && ele.chooseSubjects == sub) {
        //     collegeList.splice(idx, 1)
        //   }
        // })
                this.setData({
            collegeList: collegeList
        });
    },
    //院校 专业 上移
    moveUp: function moveUp(e) {
        var collegeIndex = e.currentTarget.dataset.index;
        var type = e.currentTarget.dataset.type;
        var listData = this.data.listData;
        if (type == "college") {
            var collegeInfo = listData[collegeIndex];
            listData.splice(collegeIndex, 1);
            listData.splice(collegeIndex - 1, 0, collegeInfo);
        } else {
            var majorIndex = e.currentTarget.dataset.majorindex;
            var majorInfo = listData[collegeIndex].professions[majorIndex];
            listData[collegeIndex].professions.splice(majorIndex, 1);
            listData[collegeIndex].professions.splice(majorIndex - 1, 0, majorInfo);
        }
        this.setData({
            listData: listData,
            saveBtnFlag: true
        });
    },
    //院校 专业 下移
    moveDown: function moveDown(e) {
        var collegeIndex = e.currentTarget.dataset.index;
        var type = e.currentTarget.dataset.type;
        var listData = this.data.listData;
        if (type == "college") {
            var collegeInfo = listData[collegeIndex];
            listData.splice(collegeIndex, 1);
            listData.splice(collegeIndex + 1, 0, collegeInfo);
        } else {
            var majorIndex = e.currentTarget.dataset.majorindex;
            var majorInfo = listData[collegeIndex].professions[majorIndex];
            listData[collegeIndex].professions.splice(majorIndex, 1);
            listData[collegeIndex].professions.splice(majorIndex + 1, 0, majorInfo);
        }
        this.setData({
            listData: listData,
            saveBtnFlag: true
        });
    },
    //点击删除院校
    delCollege: function delCollege(e) {
        this.delCollegeName = e.currentTarget.dataset.collegeinfo.collegeName;
        this.delCollegeSub = e.currentTarget.dataset.collegeinfo.chooseSubjects;
        this.setData({
            "delPop.flag": true,
            "delPop.animation": "showDel",
            delType: "院校"
        });
    },
    //点击删除专业
    delMajor: function delMajor(e) {
        this.delCollegeName = e.currentTarget.dataset.collegeinfo.collegeName;
        this.delCollegeSub = e.currentTarget.dataset.collegeinfo.chooseSubjects;
        this.delMajorName = e.currentTarget.dataset.majorname;
        this.setData({
            "delPop.flag": true,
            "delPop.animation": "showDel",
            delType: "专业"
        });
    },
    //确认删除
    confirmDel: function confirmDel() {
        var _this = this;
        var that = this;
        var listData = this.data.listData;
        if (this.data.delType == "院校") {
            if (listData.length == 1) return;
            listData.forEach(function(ele, index) {
                if (ele.collegeName == that.delCollegeName && ele.chooseSubjects == that.delCollegeSub) {
                    listData.splice(index, 1);
                }
            });
            that.changeCollegeList(that.delCollegeName, that.delCollegeSub);
        } else if (this.data.delType == "专业") {
            listData.forEach(function(ele, index) {
                ele.professions.forEach(function(el, idx) {
                    if (ele.collegeName == that.delCollegeName && ele.chooseSubjects == that.delCollegeSub && el.professionName == that.delMajorName) {
                        ele.professions.splice(idx, 1);
                    }
                    if (ele.professions.length == 0) {
                        listData.splice(index, 1);
                    }
                });
            });
        }
        this.setData({
            listData: listData,
            saveBtnFlag: true
        }, function() {
            _this.cancelDel();
        });
    },
    cancelDel: function cancelDel() {
        this.setData({
            "delPop.flag": false,
            "delPop.animation": "hideDel",
            delType: ""
        });
    },
    //点击志愿表 院校操作按钮
    clickMoreCollege: function clickMoreCollege(e) {
        var collegeName = e.currentTarget.dataset.collegename;
        var choosesub = e.currentTarget.dataset.choosesub;
        var listData = this.data.listData;
        listData.forEach(function(ele) {
            // ele.st = false;
            if (ele.collegeName == collegeName && choosesub == ele.chooseSubjects) {
                ele.st = !ele.st;
            } else {
                ele.st = false;
            }
            ele.professions.forEach(function(el) {
                el.st = false;
            });
        });
        this.setData({
            listData: listData
        });
    },
    //点击志愿表 专业操作按钮
    clickMoreMajor: function clickMoreMajor(e) {
        var collegeName = e.currentTarget.dataset.collegename;
        var choosesub = e.currentTarget.dataset.choosesub;
        var majorName = e.currentTarget.dataset.majorname;
        var listData = this.data.listData;
        listData.forEach(function(ele) {
            ele.st = false;
            if (ele.chooseSubjects == choosesub && ele.collegeName == collegeName) {
                ele.professions.forEach(function(el) {
                    if (el.professionName == majorName && ele.collegeName == collegeName) {
                        el.st = !el.st;
                    } else {
                        el.st = false;
                    }
                });
            } else {
                ele.professions.forEach(function(el) {
                    if (el.professionName == majorName && ele.collegeName == collegeName) {
                        el.st = !el.st;
                    } else {
                        el.st = false;
                    }
                });
            }
        });
        this.setData({
            listData: listData
        });
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
        var listData = [];
        if (id != that.data.RecommendType) {
            if (id == 1) {
                tmpsetdata.CSBContent = "冲";
                that.morenList.forEach(function(ele) {
                    if (ele.dataType == 1) {
                        listData.push(ele);
                    }
                });
            } else if (id == 2) {
                tmpsetdata.CSBContent = "稳";
                that.morenList.forEach(function(ele) {
                    if (ele.dataType == 2) {
                        listData.push(ele);
                    }
                });
            } else if (id == 3) {
                tmpsetdata.CSBContent = "保";
                that.morenList.forEach(function(ele) {
                    if (ele.dataType == 3) {
                        listData.push(ele);
                    }
                });
            } else if (id == 0) {
                tmpsetdata.CSBContent = "选择风险";
                that.morenList.forEach(function(ele) {
                    listData.push(ele);
                });
            }
            tmpsetdata.RecommendType = id;
            tmpsetdata.CSBBgColor = bgcolor;
            that.setData(tmpsetdata);
            that.setData({
                listData: listData
            }, function() {
                that.changeCollegeList();
            });
        } else {
            that.setData(tmpsetdata);
        }
    },
    // 计算swiper and scroll高度
    getSwiperH: function getSwiperH() {
        var that = this;
        var item = wx.createSelectorQuery();
        item.selectAll("#head").boundingClientRect();
        item.exec(function(res) {
            var header = res[0].height;
            var advice = res[0].height;
            var footer = res[0].height;
            var pageH = app.globalData.systemInfo.screenHeight - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight;
            that.setData({
                "HInfo.swiperH": pageH - header,
                "HInfo.scrollH": pageH - header - advice - footer,
                "HInfo.shaixuanH": pageH,
                "HInfo.navH": app.globalData.navigationCustomCapsuleHeight + app.globalData.navigationCustomStatusHeight
            });
        });
    },
    change: function change(e) {
        this.setData({
            collegeList: e.detail.listData,
            saveBtnFlag: true
        });
    },
    sizeChange: function sizeChange(e) {
        this.setData({
            size: e.detail.value
        });
    },
    itemClick: function itemClick(e) {
        var majorCode = e.detail.code;
        this.setData({
            itemData: e.detail.data,
            majorCode: majorCode
        });
        if (majorCode.length == 4) {
            var smallMajorList = this.data.smallMajorList;
            if (smallMajorList && smallMajorList.middleMajor.code == majorCode) {
                this.selectComponent("#middleDetail").showFrame();
            } else {
                this.getMajorDetail(majorCode);
            }
        } else if (majorCode.length == 6) {
            var majorDetail = this.data.majorDetail;
            if (majorDetail && majorCode == majorDetail.code) {
                this.selectComponent("#majorDetail").showFrame();
            } else {
                this.getDetail(majorCode);
            }
        }
    },
    goMajorDetail: function goMajorDetail(e) {
        this.selectComponent("#majorToast").hideFrame();
        var code = e.currentTarget.dataset.majorcode;
        this.setData({
            majorCode: code
        });
        this.getDetail(code);
    },
    //小类详情
    getDetail: function getDetail(code) {
        var _this2 = this;
        this.setData({
            smallDetailLoad: true
        });
        this.selectComponent("#majorDetail").showFrame();
        api.getMajorDetail("Majors/GetByCode", "POST", code).then(function(res) {
            _this2.setData({
                majorDetail: res.result,
                smallDetailLoad: false
            });
        });
    },
    //大类详情
    getMajorDetail: function getMajorDetail(code) {
        var _this3 = this;
        this.setData({
            middleDetailLoad: true
        });
        this.selectComponent("#middleDetail").showFrame();
        api.GetMiddleMajors("Majors/GetMiddleDetail", "POST", 843, code).then(function(res) {
            var middleMajor = res.result.middleMajor;
            var smallMajorList = {
                middleMajor: {
                    name: middleMajor.name,
                    code: middleMajor.code
                },
                smallMajorList: res.result.smallMajors
            };
            _this3.setData({
                smallMajorList: smallMajorList,
                middleDetailLoad: false
            });
        });
    },
    showSmallDetail: function showSmallDetail(e) {
        this.selectComponent("#middleDetail").hideFrame();
        var majorCode = e.currentTarget.dataset.majorcode;
        var majorDetail = this.data.majorDetail;
        if (majorDetail && majorCode == majorDetail.code) {
            this.selectComponent("#majorDetail").showFrame();
        } else {
            this.getDetail(majorCode);
        }
    },
    // 专业详情
    majorDetail: function majorDetail(e) {
        var majorcode = this.data.majorDetail.code;
        wx.navigateTo({
            url: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + majorcode + "&cityid=843"
        });
    },
    toggleFixed: function toggleFixed(e) {
        var key = e.currentTarget.dataset.key;
        var listData = this.data.listData;
        listData[key].fixed = !listData[key].fixed;
        this.setData({
            listData: listData
        });
        this.drag.dataChange();
    },
    onLoad: function onLoad(options) {
        this.options = options;
        this.drag = this.selectComponent("#drag");
        this.getSwiperH();
        //各种高度
                var userInfo = wx.getStorageSync("userInfo");
        this.morenList = this.data.listData;
        this.setData({
            userInfo: userInfo,
            saveBtnFlag: false
        });
        // listData.map(item=>{
        //   item.college = item.college.length>5?item.college.substring(0,5)+"...":item.college
        //   return item;
        // })
                if (options && options.numId) {
            if (options.share) {
                this.setData({
                    share: true
                });
            }
            this.getZyTable();
            this.setData({
                collegePlan: false
            });
        } else {
            wx.hideShareMenu();
            this.init();
            this.setData({
                showLoad: false
            });
        }
    },
    getRank: function getRank(totalScore) {
        var _this4 = this;
        var data = {
            cityId: 835,
            score: totalScore
        };
        _api2.default.getRank("ScoreLines/YFYD/GetByScore", "POST", data).then(function(res) {
            _this4.setData({
                rank: res.result.lowestRank
            });
        });
    },
    getZyTable: function getZyTable() {
        var _this5 = this;
        var that = this;
        api.getBJZyTable("Users/ZyTable/TianJin/Get", "POST", this.options.numId).then(function(res) {
            var chooseLevel = res.result.zyTable.chooseSubject;
            chooseLevel = chooseLevel.split(",").join("/");
            chooseLevel = chooseLevel.replace("物理", "物").replace("化学", "化").replace("生物", "生").replace("技术", "技").replace("历史", "史").replace("地理", "地").replace("政治", "政");
            var score = {
                totalScore: res.result.zyTable.totalScore,
                rank: res.result.zyTable.ranking,
                chooseSubject: chooseLevel,
                abType: res.result.zyTable.abType
            };
            _this5.getRank(res.result.zyTable.totalScore);
            that.zyTableNumId = res.result.zyTable.id;
            var collegeList = [];
            res.result.colleges.forEach(function(ele) {
                collegeList.push(ele);
            });
            if (res.isSuccess) {
                that.morenList = res.result.colleges;
                that.morenCollegeList = collegeList;
                that.setData({
                    listData: res.result.colleges,
                    listData1: res.result.colleges,
                    collegeList: collegeList,
                    score: score,
                    zyTable: res.result.zyTable
                });
                // that.drag.dataChange();
                        }
            that.setData({
                showLoad: false
            });
            var zyTable = res.result.zyTable;
            var major_num = 0;
            for (var i = 0, j = res.result.colleges.length; i < j; i++) {
                for (var m = 0, n = res.result.colleges[i].professions.length; m < n; m++) {
                    ++major_num;
                }
            }
            var data = {
                sheets_num: zyTable.num,
                //志愿表编号
                sheets_type: zyTable.scoreType == 1 ? "平时志愿表" : "高考志愿表",
                //志愿表类型
                sheets_source: "模拟填报",
                //志愿表来源
                data_province: zyTable.provinceName,
                //所属省份
                data_batch: zyTable.abType,
                //所属批次
                score_value: zyTable.totalScore,
                //分数
                score_rank: zyTable.ranking,
                //位次
                data_subject: "不限",
                //所属科类
                reliance_rate: "",
                //志愿靠谱率
                colg_num: res.result.colleges.length,
                //院校填报个数
                major_num: major_num
            };
            app.sensors.track("SheetsView", sensors.SheetsView(data));
        });
    },
    // 初始化
    init: function init() {
        // let pages = getCurrentPages();
        // this.prevPage = pages[pages.length - parseInt(this.options.prevPage)];   //上一个页面
        // let data = this.prevPage.data  //取上页data里的数据也可以修改
        // let rank = data.rank
        // this.setData({
        //   listData: data.zyTableList,
        //   score: data.score,
        //   rank
        // });
        // this.drag.dataChange();
    },
    // 计算dom高度
    // getScrollH() {
    //   const that = this;
    //   let item = wx.createSelectorQuery();
    //   item.select('#head').boundingClientRect();
    //   item.exec(res => {
    //     that.setData({ scrollH: app.globalData.systemInfo.screenHeight - res[0].height - app.globalData.navigationCustomCapsuleHeight - app.globalData.navigationCustomStatusHeight - 8 })
    //   })
    // },
    // 保存志愿表
    saveZyTable: function saveZyTable() {
        var that = this;
        wx.showLoading({
            title: "保存志愿表",
            mask: true
        });
        var listData = this.data.listData;
        var score = this.data.score;
        for (var i = 0, j = listData.length; i < j; i++) {
            listData[i].number = i + 1;
        }
        var userId = wx.getStorageSync("userInfo")[0].UserId;
        var numId = 0;
        if (that.options && that.options.numId) {
            numId = that.options.numId;
        }
        // else{
        //   numId = this.prevPage.data.zyTableId;
        // }
        // listData.map(i => {
        //   i.planYear = i.year;
        //   i.chooseLevel = i.chooseCns;
        // })
                var data = {
            id: numId,
            userNumId: userId,
            provinceNumId: 835,
            provinceName: "天津",
            oriBacthNames: 1,
            totalScore: score.totalScore,
            scoreType: 1,
            ranking: score.rank,
            chooseSubject: wx.getStorageSync("userScore").chooseLevelOrSubjects,
            deviceType: 5,
            colleges: that.morenList
        };
        if (numId != 0) {
            data["numId"] = numId;
        }
        api.SaveBjTable("Users/ZyTable/TianJin/Save", "POST", data).then(function(res) {
            // if (that.options && that.options.numId) {
            // } else {
            //   that.prevPage.setData({ zyTableId: res.result.value });
            // }
            that.setData({
                saveBtnFlag: false,
                listData1: that.morenList
            });
            wx.hideLoading();
            wx.showToast({
                title: "保存成功",
                icon: "none"
            });
        });
    },
    onUnload: function onUnload() {
        if (this.options && this.options.numId) {} else {
            // this.prevPage.setData({ zyTableList: this.data.listData })
        }
    },
    // 筛选
    shaixuan: function shaixuan() {
        if (this.data.CSBContent == "选择风险") {
            this.setData({
                collegeList: this.data.listData,
                "shaixuan.flag": true,
                "shaixuan.animate": "shaixuan-animate"
            });
        } else {
            this.setData({
                collegeList: this.morenCollegeList,
                "shaixuan.flag": true,
                "shaixuan.animate": "shaixuan-animate"
            });
        }
    },
    shaixuanClose: function shaixuanClose() {
        var _this6 = this;
        this.setData({
            "shaixuan.animate": "shaixuan-animate-out"
        });
        setTimeout(function() {
            _this6.setData({
                "shaixuan.flag": false
            });
        }, 200);
    },
    all: function all() {
        this.setData({
            shaixuan: {
                flag: true,
                animate: "shaixuan-animate",
                all: [ {
                    st: true,
                    name: "全部"
                } ],
                classifyList: [ {
                    name: "冲",
                    st: false
                }, {
                    name: "稳",
                    st: false
                }, {
                    name: "保",
                    st: false
                }, {
                    name: "自选",
                    st: false
                } ]
            }
        });
    },
    classifyArr: function classifyArr(e) {
        var index = e.currentTarget.dataset.index;
        var arr = this.data.shaixuan.classifyList;
        arr[index].st = !arr[index].st;
        var count = 0;
        arr.map(function(i) {
            if (i.st) count++;
        });
        if (count > 0) {
            this.setData({
                "shaixuan.all": [ {
                    st: false,
                    name: "全部"
                } ]
            });
        } else {
            this.setData({
                "shaixuan.all": [ {
                    st: true,
                    name: "全部"
                } ]
            });
        }
        this.setData({
            "shaixuan.classifyList": arr
        });
    },
    queren: function queren() {
        var collegeList = this.data.collegeList;
        var morenList = this.morenList;
        this.morenList = collegeList;
        this.morenCollegeList = collegeList;
        this.setData({
            listData: collegeList,
            CSBContent: "选择风险",
            CSBBgColor: "FE7878"
        });
        this.shaixuanClose();
    },
    chongzhi: function chongzhi() {
        this.setData({
            shaixuan: {
                flag: false,
                animate: ""
            },
            collegeList: this.data.listData1,
            listData: this.data.listData1,
            CSBContent: "选择风险",
            CSBBgColor: "FE7878"
        });
        this.morenList = this.data.listData1;
    }
});