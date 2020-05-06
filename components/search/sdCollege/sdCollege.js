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
        sdCollege: {
            type: Array,
            value: []
        },
        showCode: {
            type: Boolean,
            value: false
        }
    },
    data: {
        cityId: wx.getStorageSync("cityId").cityId
    },
    /**
   * 组件的方法列表
   */
    methods: {
        add: function add(e) {
            var _this = this;
            var index = e.currentTarget.dataset.index;
            if (this.data.showCode) {
                var list = wx.getStorageSync("addCollegeList") || [];
                if (list.length == 0) {
                    list.unshift({
                        collegeName: this.data.sdCollege[index].collegeName,
                        collegeCode: this.data.sdCollege[index].collegeCode,
                        uCode: this.data.sdCollege[index].uCode
                    });
                } else {
                    list.map(function(i) {
                        if (i.collegeName != _this.data.sdCollege[index].collegeName) {
                            list.unshift({
                                collegeName: _this.data.sdCollege[index].collegeName,
                                collegeCode: _this.data.sdCollege[index].collegeCode,
                                uCode: _this.data.sdCollege[index].uCode
                            });
                        }
                    });
                }
                wx.setStorageSync("addCollegeList", list);
                wx.navigateBack({
                    detail: 1
                });
            } else {
                var pages = getCurrentPages();
                var prevPage = pages[pages.length - 2];
                //上一个页面
                                this.prevPage = prevPage;
                this.prevPage.setData({
                    isShowViewCount: true
                });
                var college = this.data.sdCollege[index];
                var cityId = wx.getStorageSync("cityId").cityId;
                var json = {
                    provinceId: cityId,
                    uCode: college.uCode,
                    isBen: college.isBen,
                    collegeCode: college.collegeCode,
                    totalScore: prevPage.data.score.totalScore,
                    rank: prevPage.data.score.rank,
                    chooseLevel: wx.getStorageSync("userScore").chooseSubjects || []
                };
                if (cityId == 847) {
                    json.section = prevPage.data.batch || 1;
                } else if (cityId == 843) {
                    json.section = 0;
                }
                _api2.default.DoNewGaoKaoCustomV4("TZY/Recommendation/DoNewGaoKaoCustomV4", "POST", json).then(function(res) {
                    var newArr = [];
                    var list = wx.getStorageSync("userScore").chooseSubjects;
                    var chooseSubjects = [];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;
                    try {
                        for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var l = _step.value;
                            chooseSubjects.push(l.substring(0, 1));
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    res.result[0].professions.map(function(j) {
                        // j.learnYear = j.learnYear+'年'
                        // j.cost = "￥"+j.cost;
                        if (j && j.chooseSubjects == "且") {
                            if (j.chooseCns.length > 1) {
                                newArr = j.chooseCns.split("+");
                                chooseSubjects.map(function(c) {
                                    newArr.map(function(n) {
                                        if (n == c) {
                                            j.chooseCns = j.chooseCns.replace(c, '<span style="color:black">' + c + "</span>");
                                        }
                                    });
                                });
                            } else if (j.chooseCns.length == 1) {
                                newArr = [ j.chooseCns ];
                                chooseSubjects.map(function(c) {
                                    newArr.map(function(n) {
                                        if (n == c) {
                                            j.chooseCns = j.chooseCns.replace(c, '<span style="color:black">' + c + "</span>");
                                        }
                                    });
                                });
                            }
                        } else {
                            if (j.chooseCns.length > 1) {
                                newArr = j.chooseCns.split("/");
                                chooseSubjects.map(function(c) {
                                    newArr.map(function(n) {
                                        if (n == c) {
                                            j.chooseCns = j.chooseCns.replace(c, '<span style="color:black">' + c + "</span>");
                                        }
                                    });
                                });
                            } else if (j.chooseCns.length == 1) {
                                newArr = [ j.chooseCns ];
                                chooseSubjects.map(function(c) {
                                    newArr.map(function(n) {
                                        if (n == c) {
                                            j.chooseCns = j.chooseCns.replace(c, '<span style="color:black">' + c + "</span>");
                                        }
                                    });
                                });
                            }
                        }
                    });
                    _this.college = res.result[0];
                    _this.UseFunctionLogsInsert(college.collegeId);
                    wx.navigateBack({
                        detail: 1
                    });
                });
            }
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