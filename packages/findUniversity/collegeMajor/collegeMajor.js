var _api = require("../api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

Page({
    data: {
        flag: false,
        wrapAnimate: "",
        bgOpacity: 0,
        frameAnimate: "",
        showFrame: true,
        showMediumFrame: false,
        showSmallFrame: false,
        womanWidth: "10vw",
        manPercent: "21%",
        womanPercent: "79%",
        abstract: "",
        direct: "",
        disciplineList: [],
        college: []
    },
    disciplineTap: function disciplineTap(e) {
        // const that = this;
        // let id = e.currentTarget.id;
        // that.setData({
        //     smallFrameTitle: "小雷",
        //     disciplineType: "small",
        //     showSmallFrame: true
        // })
        // this.showFrame();
    },
    caculateWomanWidth: function caculateWomanWidth(percent) {
        return 30.67 * percent;
    },
    catchMove: function catchMove() {},
    collegeTap: function collegeTap(e) {
        var that = this;
        var id = e.currentTarget.id;
        var college = that.data.college;
        if (college[id].show) {
            college[id].show = false;
            college[id].rotates = "none";
        } else {
            college[id].show = true;
            college[id].rotates = "(90deg)";
        }
        that.setData({
            college: college
        });
    },
    showFrame: function showFrame() {
        this.setData({
            flag: true,
            wrapAnimate: "wrapAnimate",
            frameAnimate: "frameAnimate"
        });
    },
    hideFrame: function hideFrame() {
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
    },
    InstitutesGet: function InstitutesGet(collegeId) {
        var that = this;
        _api2.default.InstitutesGet("Colleges/Institutes/Get?collegeId=" + collegeId, "POST").then(function(res) {
            for (var i = 0; i < res.result.length; i++) {
                res.result[i].show = false;
                res.result[i].rotates = "none";
                res.result[i].leftIcon = "/image/right_logo.png";
                res.result[i].id = i + 1;
            }
            that.setData({
                college: res.result
            });
        });
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.InstitutesGet(options.collegeid);
        var college = that.data.college;
        if (options.autoOpenId) {
            for (var i in that.data.college) {
                if (options.autoOpenId == that.data.college[i].id) {
                    college[i].show = true;
                    college[i].rotates = "(90deg)";
                    that.setData({
                        college: college
                    });
                }
            }
        }
        that.selectComponent("#navigationcustom").setNavigationAll("院系/专业", true);
    }
});