var _api = require("../../../utils/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

Component({
    properties: {
        zjCollege: {
            type: Array,
            value: []
        }
    },
    data: {},
    methods: {
        add: function add(e) {
            var index = e.currentTarget.dataset.index;
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];
            //上一个页面
                        this.prevPage = prevPage;
            this.prevPage.setData({
                isShowViewCount: true
            });
            var college = this.data.zjCollege[index];
            var levels = "";
            if (college.levels) {
                levels += college.levels.indexOf("985") != -1 ? "985 " : "";
                levels += college.levels.indexOf("211") != -1 ? "211 " : "";
                levels += college.levels.indexOf("双一流") != -1 ? "双一流 " : "";
            }
            college.levels = levels;
            for (var m = 0, n = college.professions.length; m < n; m++) {
                college.professions[m].chooseCns = college.professions[m].chooseCns.replace(/\s+/g, "");
            }
            this.college = college;
            this.UseFunctionLogsInsert(college.collegeId);
            wx.navigateBack({
                detail: 1
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