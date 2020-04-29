var request = require("../../utils/request.js");

module.exports = {
    //查询位次数据
    getRankData: function getRankData(url, type, data) {
        var provinceId = data.provinceId, year = data.year, courseType = data.courseType;
        return request.fetchApi(url, type, "CPD", {
            provinceId: provinceId,
            year: year,
            courseType: courseType
        }).then(function(res) {
            return res;
        });
    }
};