var _api = require("./utils/api.js");

var _api2 = _interopRequireDefault(_api);

var _config = require("./config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var sa = require("./utils/sensorsdata.min.js");

sa.setPara({
    server_url: "https://ia-shence.wmei.cn/sa?project=default",
    autoTrack: {
        appLaunch: true,
        //是否采集 $MPLaunch 事件，true 代表开启。
        appShow: false,
        //是否采集 $MPShow 事件，true 代表开启。
        appHide: false,
        //是否采集 $MPHide 事件，true 代表开启。
        pageShow: true,
        //是否采集 $MPViewScreen 事件，true 代表开启。
        pageShare: true
    }
});

var timer;

// 获取小程序更新机制兼容
if (wx.canIUse("getUpdateManager")) {
    var updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
            updateManager.onUpdateReady(function() {
                wx.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，是否重启应用？",
                    success: function success(res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            wx.clearStorageSync();
                            updateManager.applyUpdate();
                        }
                    }
                });
            });
            updateManager.onUpdateFailed(function() {
                // 新的版本下载失败
                wx.showModal({
                    title: "已经有新版本了哟~",
                    content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
                });
            });
        }
    });
} else {
    // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
    wx.showModal({
        title: "提示",
        content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
    });
}

App({
    globalData: {
        infoConfig: null,
        //数据说明配置
        newGaokaoPro: false,
        //新高考省份开关
        applyCardFlag: false,
        // activityOptions:null, // 砍价活动options,用于跳转
        initLogin: false,
        //初始化登录->重新登陆
        probabilityInfo: {
            collegeId: 0,
            collegeUcode: "",
            collegeName: "",
            codeId: 0
        },
        chooseCityName: [],
        chooseCityId: [],
        color: "e9302d",
        bargainGetStatus: true,
        //砍价活动开关
        provinceList: [],
        chooseSubject: {
            //选科
            provinceId: "",
            year: "",
            majorCodes: [],
            subject: [],
            majors: [],
            provinceType: ""
        },
        systemInfo: {},
        youxuezhiyi: "",
        youxueorderno: "",
        youxueTitle: "",
        youxueprojectid: "",
        youxueCoverImage: "",
        TimeFormat: "",
        // zyTableCommon:[],
        navigationCustomTopShow: true,
        //自定义导航头开关 -> app.json -> "window":{"navigationStyle": "custom"}
        comeLoadPage: false,
        //首屏加载页开关 ->需要 navigationBarShow:true
        payBtnText: "由于相关规范，iOS功能暂不可用",
        payPrompt: "由于相关规范，iOS功能暂不可用",
        //ios支付提示内容  美国苹果公司限制，小程序不再支持微信在线支付，请安装完美志愿APP或电脑登录wmei.cn购买。
        system: "android",
        changeGKScoreGlag: false,
        //高考版禁修改
        isGaokaoFlag: false,
        //高考版开关
        shareFlag: false,
        //智能填报分享开关
        collegeSimpleTable: [],
        //浙江志愿表简表
        bufferJsYXYX: [],
        bufferJsZYYX: [],
        tuijianCommon: "0",
        currentProvinces: null,
        //自动定位当前省份
        appid: "",
        appsecret: "",
        Mch_id: "",
        Mch_key: "",
        openid: "",
        trade_type: "JSAPI",
        //交易类型
        spbill_create_ip: "127.0.0.1",
        //终端IP
        domain: "m.wmei.cn",
        //ios端申请会员卡，发送的H5地址 qa-ch5.wmei.cn
        notify_url: "https://pay.wmei.cn/WeixinPay/App/NotifyUrl.aspx",
        //通知地址
        userHead: "",
        userName: "",
        AK: "",
        //百度地图AK
        latitude: null,
        //纬度
        longitude: null,
        //经度
        zhiyuanbiao: [],
        screenWidth: 0,
        screenHeight: 0,
        cityList: [ {
            fLetter: "A",
            name: "安徽",
            numId: 844
        }, {
            fLetter: "B",
            name: "北京",
            numId: 834
        }, {
            fLetter: "C",
            name: "重庆",
            numId: 854
        }, {
            fLetter: "F",
            name: "福建",
            numId: 845
        }, {
            fLetter: "G",
            name: "广东",
            numId: 851
        }, {
            fLetter: "G",
            name: "广西",
            numId: 852
        }, {
            fLetter: "G",
            name: "贵州",
            numId: 856
        }, {
            fLetter: "G",
            name: "甘肃",
            numId: 860
        }, {
            fLetter: "H",
            name: "海南",
            numId: 853
        }, {
            fLetter: "H",
            name: "河南",
            numId: 848
        }, {
            fLetter: "H",
            name: "黑龙江",
            numId: 841
        }, {
            fLetter: "H",
            name: "湖北",
            numId: 849
        }, {
            fLetter: "H",
            name: "湖南",
            numId: 850
        }, {
            fLetter: "H",
            name: "河北",
            numId: 1128
        }, {
            fLetter: "J",
            name: "江苏",
            numId: 1
        }, {
            fLetter: "J",
            name: "吉林",
            numId: 840
        }, {
            fLetter: "J",
            name: "江西",
            numId: 846
        }, {
            fLetter: "L",
            name: "辽宁",
            numId: 839
        }, {
            fLetter: "N",
            name: "宁夏",
            numId: 862
        }, {
            fLetter: "N",
            name: "内蒙古",
            numId: 838
        }, {
            fLetter: "Q",
            name: "青海",
            numId: 861
        }, {
            fLetter: "S",
            name: "上海",
            numId: 842
        }, {
            fLetter: "S",
            name: "山东",
            numId: 847
        }, {
            fLetter: "S",
            name: "山西",
            numId: 837
        }, {
            fLetter: "S",
            name: "陕西",
            numId: 859
        }, {
            fLetter: "S",
            name: "四川",
            numId: 855
        }, {
            fLetter: "T",
            name: "天津",
            numId: 835
        }, {
            fLetter: "X",
            name: "新疆",
            numId: 1120
        }, {
            fLetter: "X",
            name: "西藏",
            numId: 858
        }, {
            fLetter: "Y",
            name: "云南",
            numId: 857
        }, {
            fLetter: "Z",
            name: "浙江",
            numId: 843
        } ],
        classifyList: [ {
            name: "综合"
        }, {
            name: "理工"
        }, {
            name: "财经"
        }, {
            name: "农林"
        }, {
            name: "医药"
        }, {
            name: "师范"
        }, {
            name: "体育"
        }, {
            name: "政法"
        }, {
            name: "艺术"
        }, {
            name: "民族"
        }, {
            name: "军事"
        }, {
            name: "语言"
        }, {
            name: "其他"
        } ],
        navigationCustomStatusHeight: 0,
        //自定义navigation高度
        navigationCustomCapsuleHeight: 0
    },
    login: function login() {
        var that = this;
        var openid = wx.getStorageSync("openid");
        if (openid) {
            that.globalData.openid = openid;
            sa.setOpenid(openid);
            sa.init();
        } else {
            wx.login({
                success: function success(res) {
                    if (res.code) {
                        //发起网络请求
                        _api2.default.getJsCode2Session("MiniProgram/GetJsCode2Session", "POST", res.code).then(function(res) {
                            if (res.isSuccess) {
                                var _openid = res.result.openid;
                                wx.setStorage({
                                    key: "openid",
                                    data: _openid
                                });
                                that.globalData.openid = _openid;
                                sa.setOpenid(_openid);
                                sa.init();
                            }
                        });
                    } else {}
                }
            });
        }
    },
    // 使用人数增长数
    getImitateHot: function getImitateHot(initial, multiple) {
        var initTime = "2018/01/01 00:00:00";
        var num = new Date(initTime).getTime();
        var time = new Date().getTime();
        var t = time - num;
        var d = Math.floor(t / 1e3 / 60 / 60 / 24);
        var hours = d * 24 + parseInt((time - num) % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
        return parseInt(initial + parseInt(hours / multiple) * 1e3);
    },
    // 服务器时间格式化
    transDateTime: function transDateTime(time, format) {
        var transTime = "";
        transTime = new Date(time);
        transTime = this.dateFormat(format ? format : "YYYY-mm-dd HH:MM", transTime);
        return transTime;
    },
    dateFormat: function dateFormat(fmt, date) {
        var ret = void 0;
        var opt = {
            "Y+": date.getFullYear().toString(),
            // 年
            "m+": (date.getMonth() + 1).toString(),
            // 月
            "d+": date.getDate().toString(),
            // 日
            "H+": date.getHours().toString(),
            // 时
            "M+": date.getMinutes().toString(),
            // 分
            "S+": date.getSeconds().toString()
        };
        for (var k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
            }
        }
        return fmt;
    },
    // 传分数算批次(需要文理之前已经分组)
    ScoreCountBatch: function ScoreCountBatch(score, course) {
        var that = this;
        var batch = 0;
        var scoreLine = {};
        // let course = parseInt(that.globalData.userInfo.course);
                switch (course) {
          case 0:
            scoreLine = that.globalData.baseInfo.scoreLine[0];
            break;

          case 1:
            scoreLine = that.globalData.baseInfo.scoreLine[1];
            break;
        }
        for (var i = 0; i < scoreLine.length; i++) {
            if (score >= scoreLine[i].score) {
                batch = scoreLine[i].batch;
                break;
            } else {
                if (i == scoreLine.length - 1) {
                    batch = scoreLine[scoreLine.length - 1].batch;
                    break;
                }
            }
        }
        return batch;
    },
    //
    checkNewGaoKao: function checkNewGaoKao(cityId) {
        if (cityId != "842" && cityId != "843" && cityId != "847" && cityId != "834" && cityId != "835" && cityId != "853") {
            return false;
        } else {
            return true;
        }
    },
    //
    checkImproveUserInfo: function checkImproveUserInfo(userInfo) {
        //高考省份、年份、所在地、学校
        if (userInfo && userInfo.SchoolId && userInfo.GKYear && userInfo.Province && userInfo.City && userInfo.County) {
            return false;
        } else {
            return true;
        }
    },
    //获取用户信息
    getUserBrief: function getUserBrief(numId, isFillAreaName, id) {
        _api2.default.getUserBrief("Users/GetBrief", "POST", numId, isFillAreaName).then(function(res) {
            //   res.result.gkYear = ""
            if (res.result.gkYear > 0 && res.result.provinceId) {} else {
                //该去完善成绩了
                wx.redirectTo({
                    url: "/pages/ImproveGKInformation/index?id=" + res.result.id
                });
            }
        });
    },
    //分辨文理科
    checkCourse: function checkCourse(course) {
        if (course == 1) {
            return "文科";
        } else if (course == 0) {
            return "理科";
        }
    },
    resetOnce: function resetOnce(page, text) {
        page.data[text] = false;
    },
    checkOnce: function checkOnce(page, text) {
        if (!page.data[text]) {
            page.data[text] = true;
            return true;
        } else {
            return false;
        }
    },
    /**排序方法，和sort组合使用
   *  var collegesArray = that.data.tableList[0].Colleges.sort(that.compare("MinScore"));
   * 若为倒序，使用reverse
   * collegesArray = collegesArray.reverse();
   */
    compare: function compare(prop) {
        return function(obj1, obj2) {
            var val1 = obj1[prop];
            var val2 = obj2[prop];
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
            }
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        };
    },
    /** 计算录取批次
   * score-分数
   * gaokaoTotal-总分对象
   * xianChaIndex-录取批次index
   * checkedValue-文1理0
   */
    getAdmissionBatch: function getAdmissionBatch(score, gaokaoTotal, checkedValue) {
        var admissionBatch = 4;
        if (gaokaoTotal[0].GaoKaoTotal - score >= 0) {
            for (var i in gaokaoTotal[0].PrvModel) {
                //文科
                if (checkedValue == 1) {
                    if (score - gaokaoTotal[0].PrvModel[i].ArtsScore >= 0) {
                        return i;
                    }
                } else {
                    if (score - gaokaoTotal[0].PrvModel[i].SciencesScore >= 0) {
                        return i;
                    }
                }
            }
        }
        return admissionBatch;
    },
    /**
   * 计算线差
   * score-分数
   * gaokaoTotal-总分对象
   * xianChaIndex-录取批次index
   * checkedValue-文1理0
   */
    getLineGap: function getLineGap(score, gaokaoTotal, xianChaIndex, checkedValue) {
        var that = this;
        var lineGap = 0;
        if (!score) {
            return;
        }
        score = parseInt(score);
        if (xianChaIndex == "0") {
            //一本
            if (checkedValue == 1) {
                //文科
                lineGap = score - parseInt(gaokaoTotal[0].PrvModel[xianChaIndex].ArtsScore);
            } else if (checkedValue == 0) {
                //理科
                lineGap = score - parseInt(gaokaoTotal[0].PrvModel[xianChaIndex].SciencesScore);
            }
        } else {
            //除一本外
            if (checkedValue == 1) {
                // 文科
                lineGap = score - parseInt(gaokaoTotal[0].PrvModel[xianChaIndex].ArtsScore);
            } else if (checkedValue == 0) {
                //理科
                lineGap = score - parseInt(gaokaoTotal[0].PrvModel[xianChaIndex].SciencesScore);
            }
        }
        return lineGap;
    },
    /**
   * 计算线差最大值
   * gaokaoTotal-总分对象
   * xianChaIndex-录取批次index
   * checkedValue-文1理0
   */
    getLineGapMax: function getLineGapMax(gaokaoTotal, xianChaIndex, checkedValue) {
        var that = this;
        var lineGapMax = 0;
        if (xianChaIndex == "0") {
            if (checkedValue == 1) {
                //文科
                lineGapMax = parseInt(gaokaoTotal[0].GaoKaoTotal - gaokaoTotal[0].PrvModel[xianChaIndex].ArtsScore);
            } else if (checkedValue == 0) {
                //理科
                lineGapMax = parseInt(gaokaoTotal[0].GaoKaoTotal - gaokaoTotal[0].PrvModel[xianChaIndex].SciencesScore);
            }
        } else {
            if (checkedValue == 1) {
                // 文科
                lineGapMax = parseInt(gaokaoTotal[0].PrvModel[xianChaIndex - 1].ArtsScore - gaokaoTotal[0].PrvModel[xianChaIndex].ArtsScore - 1);
            } else if (checkedValue == 0) {
                //理科
                lineGapMax = parseInt(gaokaoTotal[0].PrvModel[xianChaIndex - 1].SciencesScore - gaokaoTotal[0].PrvModel[xianChaIndex].SciencesScore - 1);
            }
        }
        return lineGapMax;
    },
    /**
   * 计算当前时间所处高考年份
   */
    getGaoKaoYear: function getGaoKaoYear() {
        var nowdate = new Date();
        var gaokaoyear = 0;
        var month = nowdate.getMonth() + 1;
        //  month = 6;
                if (month > 7) {
            gaokaoyear = nowdate.getFullYear() + 1;
        } else {
            gaokaoyear = nowdate.getFullYear();
        }
        return gaokaoyear;
    },
    /**
   * 计算滚动区域高度
   * cutHeight-需要减去的高度
   **/
    calculateScrollViewHeight: function calculateScrollViewHeight(cutHeight) {
        var that = this;
        if (cutHeight == 0) {
            cutHeight = that.globalData.navigationCustomStatusHeight + that.globalData.navigationCustomCapsuleHeight;
        }
        return that.globalData.systemInfo.screenHeight - cutHeight;
    },
    /**
   * 计算导航栏高度和设置导航栏相关配置
   * navigationText-标题文言
   * navigationHome-是否显示back图标
   **/
    calculateNavigationHeight: function calculateNavigationHeight(navigationText, navigationHome) {
        var that = this;
        if (!that.globalData.navigationCustomTopShow) return;
        var navigationCustomCapsuleHeight = 0;
        var navigationCustomStatusHeight = 0;
        navigationCustomStatusHeight = that.globalData.systemInfo.statusBarHeight;
        if (that.globalData.system == "ios") {
            navigationCustomCapsuleHeight = 44;
        } else {
            navigationCustomCapsuleHeight = 48;
        }
        that.globalData.navigationCustomStatusHeight = navigationCustomStatusHeight;
        that.globalData.navigationCustomCapsuleHeight = navigationCustomCapsuleHeight;
    },
    onLaunch: function onLaunch(options) {
        var that = this;
        this.sensors = sa;
        this.login();
        that.globalData.initLogin = false;
        wx.getSystemInfo({
            success: function success(res) {
                var systemInfo = res;
                that.globalData.systemInfo = systemInfo;
                if (systemInfo.system.indexOf("IOS") != -1 || systemInfo.system.indexOf("IOs") != -1 || systemInfo.system.indexOf("IoS") != -1 || systemInfo.system.indexOf("iOS") != -1 || systemInfo.system.indexOf("Ios") != -1 || systemInfo.system.indexOf("iOs") != -1 || systemInfo.system.indexOf("ioS") != -1 || systemInfo.system.indexOf("ios") != -1) {
                    that.globalData.system = "ios";
                } else {
                    that.globalData.system = "android";
                }
                that.globalData.screenWidth = systemInfo.screenWidth;
                that.globalData.screenHeight = systemInfo.screenHeight;
                that.calculateNavigationHeight();
            }
        });
        that.globalData.appid = _config2.default.appid;
        that.globalData.appsecret = _config2.default.appsecret;
        that.globalData.Mch_id = _config2.default.Mch_id;
        that.globalData.Mch_key = _config2.default.Mch_key;
        // wx.getUserInfo({
        //   success: function(res) {
        //     that.globalData.userName = res.userInfo.nickName;
        //     that.globalData.userHead = res.userInfo.avatarUrl;
        //   }
        // });
                var chooseCity = wx.getStorageSync("chooseCity");
        var chooseCityId = wx.getStorageSync("chooseCityId");
        var cityList = wx.getStorageSync("cityList");
        if (chooseCity && chooseCityId && cityList) {} else {
            var _chooseCity = [];
            var _chooseCityId = [];
            var _cityList = that.globalData.cityList;
            for (var i = 0; i < _cityList.length; i++) {
                _chooseCity.push(_cityList[i].name);
                _chooseCityId.push(_cityList[i].numId);
            }
            that.globalData.chooseCityName = _chooseCity;
            that.globalData.chooseCityId = _chooseCityId;
            wx.setStorage({
                key: "chooseCity",
                data: _chooseCity
            }), wx.setStorage({
                key: "chooseCityId",
                data: _chooseCityId
            });
            wx.setStorage({
                key: "cityList",
                data: _cityList
            });
        }
    },
    onError: function onError(msg) {
        wx.reLaunch({
            url: "/pages/error/error"
        });
    },
    randomString: function randomString(len) {
        //32位随机数
        len = len || 32;
        var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/        var maxPos = $chars.length;
        var pwd = "";
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    zimu: function zimu(num) {
        var index = "";
        switch (num) {
          case 0:
            index = "A";
            break;

          case 1:
            index = "B";
            break;

          case 2:
            index = "C";
            break;

          case 3:
            index = "D";
            break;

          case 4:
            index = "E";
            break;

          case 5:
            index = "F";
            break;

          case 6:
            index = "G";
            break;

          case 7:
            index = "H";
            break;

          case 8:
            index = "I";
            break;

          case 9:
            index = "J";
            break;

          case 10:
            index = "K";
            break;

          case 11:
            index = "L";
            break;

          case 12:
            index = "M";
            break;

          case 13:
            index = "N";
            break;

          case 14:
            index = "O";
            break;

          case 15:
            index = "P";
            break;

          case 16:
            index = "Q";
            break;

          case 17:
            index = "R";
            break;

          case 18:
            index = "S";
            break;

          case 19:
            index = "T";
            break;

          case 20:
            index = "U";
            break;

          case 21:
            index = "V";
            break;

          case 22:
            index = "W";
            break;

          case 23:
            index = "X";
            break;

          case 24:
            index = "Y";
            break;

          case 25:
            index = "Z";
            break;

          case 26:
            index = "Z1";
            break;

          case 27:
            index = "Z2";
            break;

          case 28:
            index = "Z3";
            break;

          case 29:
            index = "Z4";
            break;

          case 30:
            index = "Z5";
            break;

          case 31:
            index = "Z6";
            break;

          case 32:
            index = "Z7";
            break;

          case 33:
            index = "Z8";
            break;

          case 34:
            index = "Z9";
            break;

          case 35:
            index = "Z10";
            break;

          case 36:
            index = "Z11";
            break;

          case 37:
            index = "Z12";
            break;

          case 38:
            index = "Z13";
            break;

          case 39:
            index = "Z14";
            break;
        }
        return index;
    },
    // 时间格式化一分钟前、几天前
    // time 2018-05-25 18:14:02
    getDateDiff: function getDateDiff(time) {
        // 当前时间
        var nowTime = new Date();
        var year = nowTime.getFullYear();
        var month = nowTime.getMonth() + 1;
        var day = nowTime.getDate();
        var hours = parseInt(nowTime.getHours());
        var minutes = nowTime.getMinutes();
        // 传来time 2018-05-25 18:14:02 分解
                var timeyear = time.substring(0, 4);
        var timemonth = time.substring(5, 7);
        var timeday = time.substring(8, 10);
        var timehours = parseInt(time.substring(11, 13));
        var timeminutes = time.substring(14, 16);
        var d_year = year - timeyear;
        var d_month = Math.abs(month - timemonth);
        var d_day = Math.abs(day - timeday);
        var d_hours = hours - timehours;
        var d_minutes = Math.abs(minutes - timeminutes);
        if (d_year >= 1 || d_month >= 1) {
            return time;
        } else {
            if (d_day <= 1) {
                switch (d_day) {
                  case 0:
                    if (d_hours == 0 && d_minutes > 0) {
                        return d_minutes + "分钟前";
                    } else if (d_hours == 0 && d_minutes == 0) {
                        return "1分钟前";
                    } else {
                        return d_hours + "小时前";
                    }
                    break;

                  case 1:
                    if (d_hours < 0) {
                        return 24 + d_hours + "小时前";
                    } else {
                        return d_day + "天前";
                    }
                    break;
                }
            } else if (d_day > 1 && d_day < 10) {
                return d_day + "天前";
            } else {
                return time;
            }
        }
    },
    payPrompt: function payPrompt() {
        wx.showModal({
            content: this.globalData.payPrompt,
            showCancel: false,
            success: function success(res) {
                if (res.confirm) {}
            }
        });
    },
    // leftTimer: function (enddate) {
    //   var leftTime = (new Date(enddate)) - new Date(); //计算剩余的毫秒数 
    //   var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
    //   var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
    //   var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
    //   var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
    //   hours = this.checkTime(hours);
    //   minutes = this.checkTime(minutes);
    //   seconds = this.checkTime(seconds);
    //   if (days >= 0 || hours >= 0 || minutes >= 0 || seconds >= 0){
    //     return days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
    //   }else{
    //     return 0;
    //   }
    // },
    // checkTime: function (i) { //将0-9的数字前面加上0，例1变为01 
    //   if (i < 10) {
    //     i = "0" + i;
    //   }
    //   return i;
    // },
    countdown: function countdown(that, end_time) {
        var app = this;
        var EndTime = new Date(end_time);
        EndTime = EndTime.getTime();
        var NowTime = new Date().getTime();
        var total_micro_second = EndTime - NowTime || [];
        // 渲染倒计时时钟
                that.setData({
            currentTime: this.dateformat(total_micro_second)
        });
        if (total_micro_second <= 0) {
            that.setData({
                currentTime: "已经截止"
            });
            clearInterval(timer);
            return;
        }
        timer = setTimeout(function() {
            total_micro_second -= 1e3;
            app.countdown(that, end_time);
        }, 1e3);
    },
    closeinterval: function closeinterval() {
        clearInterval(timer);
    },
    // 时间格式化输出，如11:03 25:19 每1s都会调用一次
    dateformat: function dateformat(micro_second) {
        //总秒数
        var second = Math.floor(micro_second / 1e3);
        // 天数
                var day = Math.floor(second / 3600 / 24);
        // 小时
                var hr = Math.floor(second / 3600 % 24);
        //分钟
                var min = Math.floor(second / 60 % 60);
        // 秒
                var sec = Math.floor(second % 60);
        return day + "天" + hr + "小时" + min + "分钟" + sec + "秒";
    },
    // 判断是否是当天
    isToday: function isToday(end_time) {
        var nowTime = new Date();
        var year = nowTime.getFullYear();
        var month = nowTime.getMonth() + 1;
        var day = nowTime.getDate();
        var hours = parseInt(nowTime.getHours());
        var minutes = nowTime.getMinutes();
        var timestamp = year + "-" + month + "-" + day;
        if (timestamp === end_time) {
            return 1;
        } else {
            return 2;
        }
    },
    //字符串进行解密   
    uncompileStr: function uncompileStr(code) {
        code = unescape(code);
        var c = String.fromCharCode(code.charCodeAt(0) - code.length);
        for (var i = 1; i < code.length; i++) {
            c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
        }
        return c;
    },
    callMobile: function callMobile() {
        wx.makePhoneCall({
            phoneNumber: "800-767-8888"
        });
    },
    //获取热门搜索关键字
    getHits: function getHits(type, fn) {
        _api2.default.getSearchKeyword("App/Logs/QueryHotList?type=" + type + "&Count=10", "POST").then(function(res) {
            return fn(res);
        });
    },
    //插入搜索关键字
    insertSearchKeyword: function insertSearchKeyword(value, type) {
        _api2.default.insertSearchKeyword("App/Logs/Insert", "POST", value, type);
    }
});