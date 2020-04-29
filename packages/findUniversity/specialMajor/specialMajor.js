var _Page;

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

Page((_Page = {
    data: {
        middleFlag: true,
        middleWrapAnimate: "",
        middleBgOpacity: 0,
        middleFrameAnimate: "",
        flag: true,
        wrapAnimate: "",
        bgOpacity: 0,
        frameAnimate: "",
        disciplineList: [],
        womanWidth: "10vw",
        abstract: "",
        direct: "",
        manPercent: "21%",
        womanPercent: "79%",
        privinceDiscipline: [],
        nationalDiscipline: [],
        cultivateDiscipline: []
    },
    // 获取特色专业们
    ProfessionsGet: function ProfessionsGet(collegeId) {
        var that = this;
        _api2.default.ProfessionsGet("Colleges/Professions/Get?collegeId=" + collegeId, "POST").then(function(res) {
            that.setData({
                nationalDiscipline: res.result.nationalSpecialty,
                privinceDiscipline: res.result.provinceSpecialty,
                cultivateDiscipline: res.result.cultivateSpecialty
            });
        });
    },
    hideSmallFrame: function hideSmallFrame() {
        this.setData({
            showMediumFrame: false,
            showSmallFrame: false
        });
        this.hideFrame();
    },
    hideMediumFrame: function hideMediumFrame() {
        this.setData({
            showFrame: false,
            showMediumFrame: false,
            showSmallFrame: false
        });
        this.hideFrame();
    },
    disciplineTap: function disciplineTap(e) {
        var that = this;
        var id = e.currentTarget.id;
        that.setData({
            smallFrameTitle: "小雷",
            disciplineType: "small",
            showSmallFrame: true
        });
        this.showSmallFrame();
    },
    showMediumSubjectTap: function showMediumSubjectTap(e) {
        // let id = e.currentTarget.id;
        // const that = this;
        // const frameTitle = that.data.privinceDiscipline[id].medium;
        // const disciplineList = that.data.privinceDiscipline[id].small;
        // that.setData({
        //     mediumFrameTitle: frameTitle,
        //     disciplineList: disciplineList,
        //     showFrame: true,
        //     showMediumFrame: true
        // })
        // this.showFrame();
    },
    caculateWomanWidth: function caculateWomanWidth(percent) {
        return 30.67 * percent;
    },
    showSmallFrame: function showSmallFrame() {
        this.setData({
            flag: true,
            wrapAnimate: "wrapAnimate",
            frameAnimate: "frameAnimate"
        });
    }
}, _defineProperty(_Page, "hideSmallFrame", function hideSmallFrame() {
    var that = this;
    that.setData({
        wrapAnimate: "wrapAnimateOut",
        frameAnimate: "frameAnimateOut"
    });
    setTimeout(function() {
        that.setData({
            flag: false
        });
    }, 400);
}), _defineProperty(_Page, "showFrame", function showFrame() {
    this.setData({
        middleFlag: true,
        middleWrapAnimate: "wrapAnimate",
        middleFrameAnimate: "frameAnimate"
    });
}), _defineProperty(_Page, "hideFrame", function hideFrame() {
    var that = this;
    that.setData({
        middleWrapAnimate: "wrapAnimateOut",
        middleFrameAnimate: "frameAnimateOut"
    });
    setTimeout(function() {
        that.setData({
            middleFlag: false
        });
    }, 400);
}), _defineProperty(_Page, "onLoad", function onLoad(options) {
    var that = this;
    that.ProfessionsGet(options.collegeid);
    that.setData({
        womanWidth: that.caculateWomanWidth(1) + "vw"
    });
    that.selectComponent("#navigationcustom").setNavigationAll("浙北民族大学", true);
}), _Page));