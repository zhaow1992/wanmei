var _api = require("../../../utils/api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

var app = getApp();

Page({
    data: {
        showLoad: true,
        collegeId: null,
        scoreLine: [],
        cityId: null
    },
    onLoad: function onLoad(options) {
        var that = this;
        var cityId = wx.getStorageSync("cityId").cityId;
        if (cityId) {
            that.setData({
                cityId: cityId
            });
            if (options.collegeId && options.uCodes) {
                var collegeId = parseInt(options.collegeId);
                var ucodes = options.uCodes;
                var collegeName = options.collegeName;
                var Year = options.year;
            } else {
                var collegeId = null;
                var ucodes = null;
                var collegeName = null;
                var Year = null;
            }
            wx.setNavigationBarTitle({
                title: collegeName
            });
            _api2.default.queryNewFractionProfessions("v2/queryNewFractionProfessions", "POST", collegeId, cityId, ucodes, Year).then(function(res) {
                that.setData({
                    scoreLine: res.Results,
                    showLoad: false
                });
            });
        }
    }
});