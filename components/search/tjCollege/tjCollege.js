var _api = require("../../../utils/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

Component({
    /**
   * 组件的属性列表
   */
    properties: {
        tjCollege: {
            type: Array,
            value: []
        },
        chooseArr: {
            type: Array,
            value: []
        }
    },
    data: {},
    /**
   * 组件的方法列表
   */
    attached: function attached() {
        console.log(this.data.chooseArr);
    },
    methods: {
        add: function add(e) {
            var _this = this;
            var index = e.currentTarget.dataset.index;
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];
            //上一个页面
                        this.prevPage = prevPage;
            this.prevPage.setData({
                isShowViewCount: true
            });
            var college = this.data.tjCollege[index];
            var json = {
                provinceId: 835,
                uCode: college.uCode,
                collegeCode: college.collegeCode,
                totalScore: wx.getStorageSync("userScore").total,
                rank: wx.getStorageSync("userScore").total.rank,
                isBen: true,
                chooseLevel: wx.getStorageSync("userScore").chooseSubjects || []
            };
            _api2.default.DoNewGaoKaoCustomV2("TZY/Recommendation/DoNewGaoKaoCustomV3", "POST", json).then(function(res) {
                var levels = "";
                levels += res.result[0].levels.indexOf("985") != -1 ? "985 " : "";
                levels += res.result[0].levels.indexOf("211") != -1 ? "211 " : "";
                levels += res.result[0].levels.indexOf("双一流") != -1 ? "双一流 " : "";
                res.result[0].levels = levels;
                if (res.result[0].chooseSubjects.indexOf("/") != -1) {
                    res.result[0].spliceStr = "/";
                    res.result[0].chooseArr = res.result[0].chooseSubjects.replace(/\s*/g, "").split("/");
                } else if (res.result[0].chooseSubjects.indexOf("+") != -1) {
                    res.result[0].spliceStr = "+";
                    res.result[0].chooseArr = res.result[0].chooseSubjects.replace(/\s*/g, "").split("+");
                } else {
                    res.result[0].chooseArr = res.result[0].chooseSubjects.split();
                }
                _this.college = res.result[0];
                _this.UseFunctionLogsInsert(college.collegeId);
                wx.navigateBack({
                    detail: 1
                });
            });
        },
        UseFunctionLogsInsert: function UseFunctionLogsInsert(numId) {
            var that = this;
            var userInfo = wx.getStorageSync("userInfo");
            if (userInfo[0].UserType > 1) {
                that.addCollege();
            } else {
                var data = {
                    userNumId: userInfo[0].UserId,
                    functionNumId: numId,
                    functionType: 1,
                    userPermissionId: userInfo[0].UserType
                };
                _api2.default.UseFunctionLogsInsert("Users/UseFunctionLogs/Insert", "POST", data).then(function(res) {
                    if (res.isSuccess) {
                        that.addCollege();
                        that.prevPage.setData({
                            count: res.result.value
                        });
                    } else {
                        wx.showToast({
                            title: res.message,
                            icon: "none"
                        });
                    }
                });
            }
        },
        addCollege: function addCollege() {
            var that = this;
            that.prevPage.data.ZCollegeList.collegeList.unshift(that.college);
            that.prevPage.setData({
                "ZCollegeList.collegeList": that.prevPage.data.ZCollegeList.collegeList
            });
        }
    }
});