var _api = require("../api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

Page({
    data: {
        singhtList: []
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.QueryBanners(options.collegeid);
        that.selectComponent("#navigationcustom").setNavigationAll(options.collegename, true);
    },
    QueryBanners: function QueryBanners(numId) {
        var that = this;
        _api2.default.QueryBanners("Colleges/Banners/Query?collegeId=" + numId, "POST").then(function(res) {
            that.setData({
                singhtList: res.result
            });
        });
    }
});