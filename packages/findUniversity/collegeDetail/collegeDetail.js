var _api = require("../api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

var app = getApp();

var sensors = require("../../../utils/sensors.js");

Page({
    detailTextBack: "",
    data: {
        videoPath: "",
        bottomTap: true,
        share: false,
        oneClick: false,
        haveMaster: false,
        haveDoctor: false,
        rankName: [],
        collegeMomentCover: "",
        collegeIcon: "/image/collegeLogo.png",
        showFrame: false,
        showMediumFrame: false,
        showSmallFrame: false,
        womanWidth: "10vw",
        manPercent: "21%",
        womanPercent: "79%",
        disciplineType: "medium",
        collegeStrength: {
            createTime: "-",
            quality: "-",
            locality: "-",
            subordinate: "-",
            diploma: "-",
            style: "-",
            doctor: "-",
            master: "-"
        },
        schoolPicture: [],
        mediumFrameTitle: "种类转特",
        smallFrameTitle: "小篆特",
        famousAlumni: [],
        //famousAlumni: "李克强、朱自清、屠呦呦、李彦宏、李克强、朱自清、屠呦呦、李彦宏",
        univercityCollege: [],
        abstract: "",
        direct: "",
        disciplineList: [],
        privinceDiscipline: [ "" ],
        nationalDiscipline: [ "" ],
        detailText: "",
        //招生简章
        recruitChapter: [],
        collegeName: "-",
        collegeRank: "-",
        collegeTerrace: [ "985", "211" ]
    },
    onShareAppMessage: function onShareAppMessage(res) {
        var that = this;
        if (res.from === "button") {}
        var data = {
            SA_share_type: "院校详情",
            SA_share_content: "我正在看" + that.data.collegeName + "的介绍"
        };
        app.sensors.track("ShareClick", sensors.ShareClick(data));
        return {
            title: "我正在看" + that.data.collegeName + "的介绍",
            imageUrl: "http://bapp.wmei.cn/share/collage.png",
            path: "/packages/findUniversity/collegeDetail/collegeDetail?numId=" + that.numId + "&share=true"
        };
    },
    returnPage: function returnPage() {
        wx.navigateBack({
            delta: 1
        });
    },
    onShow: function onShow() {
        app.resetOnce(this, "oneClick");
    },
    // 大学banners
    QueryBanners: function QueryBanners(numId) {
        var that = this;
        _api2.default.QueryBanners("Colleges/Banners/Query?collegeId=" + numId, "POST").then(function(res) {
            that.setData({
                schoolPicture: res.result
            });
        });
    },
    //获取院校详细信息
    getColleges: function getColleges(numId) {
        var that = this;
        _api2.default.getColleges("Colleges/Get", "POST", numId).then(function(res) {
            if (res.result) {
                that.selectComponent("#navigationcustom").setNavigationAll(res.result.cnName, true);
                var bannerUrl = res.result.bannerUrl;
                if (bannerUrl.indexOf(".mp4") != -1) {
                    that.setData({
                        videoPath: res.result.bannerUrl
                    });
                } else if (bannerUrl.indexOf(".jpg") != -1 || bannerUrl.indexOf(".png") != -1) {
                    that.setData({
                        collegeMomentCover: res.result.bannerUrl
                    });
                }
                if (res.result.code) {
                    _api2.default.GetTypeCount("Colleges/Rankings/GetTypeCount?code=" + res.result.code, "POST").then(function(res) {
                        that.setData({
                            rankName: res.result
                        });
                    });
                }
                var serverDetail = res.result;
                var collegeStrength = {
                    createTime: "-",
                    quality: "-",
                    locality: "-",
                    subordinate: "-",
                    diploma: "-",
                    style: "-",
                    doctor: "",
                    master: ""
                };
                if (serverDetail.creation) {
                    collegeStrength.createTime = serverDetail.creation;
                }
                var quality = "私立";
                if (serverDetail.type == 1) {
                    quality = "公立";
                }
                collegeStrength.quality = quality;
                if (serverDetail.cityName) {
                    collegeStrength.locality = serverDetail.cityName;
                }
                if (serverDetail.belong) {
                    collegeStrength.subordinate = serverDetail.belong;
                }
                var diploma = "本科";
                if (serverDetail.educationId == 1) {
                    diploma = "本科";
                    collegeStrength.diploma = diploma;
                } else {
                    {
                        diploma = "专科";
                        collegeStrength.diploma = diploma;
                    }
                }
                if (serverDetail.classify) {
                    collegeStrength.style = serverDetail.classify;
                }
                if (serverDetail.pointsOfShuo > 0) {
                    collegeStrength.master = serverDetail.pointsOfShuo;
                }
                if (serverDetail.pointsOfBo > 0) {
                    collegeStrength.doctor = serverDetail.pointsOfBo;
                }
                var collegeIcon = serverDetail.logoUrl || "/image/collegeLogo.png";
                that.detailTextBack = serverDetail.introduction;
                var collegeTerrace = [];
                if (serverDetail.level) {
                    collegeTerrace = serverDetail.level.split(" ");
                    collegeTerrace.pop();
                }
                var tags = [];
                for (var j = 0; j < collegeTerrace.length; j++) {
                    if (collegeTerrace[j] == "211" || collegeTerrace[j] == "985" || collegeTerrace[j] == "双一流") {
                        tags.push(collegeTerrace[j]);
                    }
                }
                wx.setNavigationBarTitle({
                    title: serverDetail.cnName
                });
                that.SA_provinceName = res.result.provinceName;
                that.SA_typeId = res.result.typeId == 1 ? "本科" : "专科";
                that.SA_tags = tags.join("|");
                that.SA_classify = res.result.classify;
                that.SA_quality = quality;
                that.setData({
                    collegeName: serverDetail.cnName,
                    collegeIcon: collegeIcon,
                    collegeTerrace: tags,
                    detailText: that.detailTextBack.substring(0, 52) + " ... " + '<span style="color:#f66666;">全部</span>',
                    collegeStrength: collegeStrength
                }, function() {
                    that.InsertSA("院校主页");
                });
            } else {}
        });
    },
    InsertSA: function InsertSA(source) {
        var _data;
        var that = this;
        var SA_content_type = source;
        var SA_code = that.numId;
        var SA_name = that.data.collegeName;
        var SA_province = that.SA_provinceName;
        var SA_isBen = that.SA_typeId;
        var SA_level = that.SA_tags;
        var SA_classify = that.SA_classify;
        var SA_type = that.SA_quality;
        var SA_current = SA_province == wx.getStorageSync("cityId").provinceName ? true : false;
        var data = (_data = {
            SA_type: SA_type,
            SA_code: SA_code,
            SA_name: SA_name,
            SA_province: SA_province,
            SA_isBen: SA_isBen,
            SA_level: SA_level,
            SA_classify: SA_classify
        }, _defineProperty(_data, "SA_type", SA_type), _defineProperty(_data, "SA_current", SA_current), 
        _defineProperty(_data, "SA_content_type", SA_content_type), _data);
        app.sensors.track("ColgView", sensors.ColgView(data));
    },
    //进入院校风光
    goCollegeSight: function goCollegeSight() {
        if (!app.checkOnce(this, "oneClick")) return;
        this.InsertSA("院校照片");
        wx.navigateTo({
            url: "../collegeSight/collegeSight?collegename=" + this.data.collegeName + "&collegeid=" + this.numId
        });
    },
    //招生简章更多
    moreChapterTap: function moreChapterTap() {
        if (!app.checkOnce(this, "oneClick")) return;
        this.InsertSA("院校招生简章");
        wx.navigateTo({
            url: "/packages/findUniversity/collgeAdmissionsGuide/collgeAdmissionsGuide?numId=" + this.numId + "&title=" + this.data.collegeName
        });
    },
    //跳转到分数线-招生计划
    goEnrolPlan: function goEnrolPlan() {
        var that = this;
        if (!app.checkOnce(that, "oneClick")) return;
        var level = that.data.collegeTerrace.join("|");
        wx.navigateTo({
            url: "/packages/fractionLine/index/index?source=院校主页&current=plan" + "&title=" + that.data.collegeName + "&collegeId=" + that.numId + "&level=" + level + "&classify=" + that.data.collegeStrength.style + "&type=" + that.data.collegeStrength.quality
        });
    },
    //跳转到分数线-主页
    goScoreLine: function goScoreLine() {
        var that = this;
        if (!app.checkOnce(that, "oneClick")) return;
        var level = that.data.collegeTerrace.join("|");
        wx.navigateTo({
            url: "/packages/fractionLine/index/index?source=院校主页&current=score" + "&title=" + that.data.collegeName + "&collegeId=" + that.numId + "&level=" + level + "&classify=" + that.data.collegeStrength.style + "&type=" + that.data.collegeStrength.quality
        });
    },
    catchMove: function catchMove() {},
    caculateWomanWidth: function caculateWomanWidth(percent) {
        return 30.67 * percent;
    },
    /**点击中类 */
    showMediumSubjectTap: function showMediumSubjectTap(e) {},
    //FamousAlumni
    goFamousAlumni: function goFamousAlumni() {},
    moreSpecialTap: function moreSpecialTap() {
        this.InsertSA("院校特色专业");
        wx.navigateTo({
            url: "../specialMajor/specialMajor?collegeid=" + this.numId + "&collegename=" + this.data.collegeName
        });
    },
    moreMajorTap: function moreMajorTap() {
        this.InsertSA("院校院系专业");
        wx.navigateTo({
            url: "../collegeMajor/collegeMajor?collegeid=" + this.numId
        });
    },
    hideSmallFrame: function hideSmallFrame() {
        this.setData({
            showMediumFrame: false,
            showSmallFrame: false
        });
        this.selectComponent("#framesmall").hideFrame();
    },
    hideMediumFrame: function hideMediumFrame() {
        this.setData({
            showFrame: false,
            showMediumFrame: false,
            showSmallFrame: false
        });
        this.selectComponent("#framemedium").hideFrame();
    },
    //点击院系/专业
    univercityCollegeTap: function univercityCollegeTap(e) {
        var that = this;
        var id = e.currentTarget.dataset.id;
        var autoOpenId = that.data.univercityCollege[id].id;
        if (!app.checkOnce(that, "oneClick")) return;
        this.InsertSA("院校院系专业");
        wx.navigateTo({
            url: "/packages/findUniversity/collegeMajor/collegeMajor?autoOpenId=" + autoOpenId + "&collegeid=" + this.numId
        });
    },
    //点击招生简章
    recruitChapterTap: function recruitChapterTap(e) {
        var that = this;
        if (!app.checkOnce(that, "oneClick")) return;
        var index = e.currentTarget.id;
        var newsId = that.data.recruitChapter[index].id;
        var name = that.data.recruitChapter[index].name;
        //recruitChapter
                that.InsertSA("院校招生简章");
        var url = "/packages/findUniversity/guideDetail/guideDetail?newsId=" + newsId + "&title=" + name;
        wx.navigateTo({
            url: url
        });
    },
    goCollegeIntroduction: function goCollegeIntroduction() {
        var that = this;
        if (!app.checkOnce(that, "oneClick")) {
            return;
        }
        that.InsertSA("院校明细介绍");
        // var url = '/packages/findUniversity/collegeIntroduction/collegeIntroduction?detailText=' + that.detailTextBack + "&title=" + that.data.collegeName
                wx.navigateTo({
            url: "/packages/findUniversity/collegeIntroduction/collegeIntroduction?detailText=" + that.detailTextBack + "&title=" + that.data.collegeName
        });
    },
    queryCollegesNews: function queryCollegesNews(numId, collegeNewsType, pageIndex, pageSize) {
        var that = this;
        _api2.default.queryCollegesNews("Colleges/News/Query", "POST", numId, collegeNewsType, pageIndex, pageSize).then(function(res) {
            if (res.result) {
                var serverNews = res.result.items;
                var recruitChapter = [];
                for (var i in serverNews) {
                    var temp = {};
                    temp.name = serverNews[i].title;
                    temp.id = serverNews[i].numId;
                    recruitChapter.push(temp);
                }
                that.setData({
                    recruitChapter: recruitChapter
                });
            } else {}
        });
    },
    ProfessionsGet: function ProfessionsGet(collegeId) {
        var that = this;
        _api2.default.ProfessionsGet("Colleges/Professions/Get?collegeId=" + collegeId, "POST").then(function(res) {
            that.setData({
                nationalDiscipline: res.result.nationalSpecialty,
                privinceDiscipline: res.result.provinceSpecialty
            });
        });
    },
    InstitutesGet: function InstitutesGet(collegeId) {
        var that = this;
        _api2.default.InstitutesGet("Colleges/Institutes/Get?collegeId=" + collegeId, "POST").then(function(res) {
            that.setData({
                univercityCollege: res.result
            });
        });
    },
    onLoad: function onLoad(options) {
        var that = this;
        //numId=926
                if (options && options.share) {
            that.setData({
                share: true
            });
        }
        var userInfo = wx.getStorageSync("userInfo");
        if (userInfo) {} else {
            this.setData({
                bottomTap: false
            });
        }
        that.getColleges(options.numId);
        that.QueryBanners(options.numId);
        that.ProfessionsGet(options.numId);
        that.InstitutesGet(options.numId);
        that.numId = options.numId;
        that.queryCollegesNews(parseInt(options.numId), 10, 1, 5);
        that.setData({
            womanWidth: that.caculateWomanWidth(.5) + "vw",
            detailText: that.data.detailText.substring(0, 52) + " ... " + '<span style="color:#f66666;">全部</span>'
        });
    }
});