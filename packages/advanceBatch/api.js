var request = require("../../utils/request.js");

module.exports = {
    //获取提前批顶部筛选条件
    getQueryFilter: function getQueryFilter(url, type, data) {
        var provinceId = data.provinceId, year = data.year, course = data.course;
        return request.fetchApi(url, type, "CPD", {
            provinceId: provinceId,
            year: year,
            course: course
        }).then(function(res) {
            return res;
        });
    },
    //查询提前批数据
    getAdvanceData: function getAdvanceData(url, type, data) {
        var typeId = data.typeId, provinceId = data.provinceId, year = data.year, course = data.course, pageSize = data.pageSize, pageIndex = data.pageIndex;
        return request.fetchApi(url, type, "CPD", {
            typeId: typeId,
            provinceId: provinceId,
            year: year,
            course: course,
            pageSize: pageSize,
            pageIndex: pageIndex
        }).then(function(res) {
            return res;
        });
    },
    // 根据院校编号或关键词查询提前批数据
    queryByCollegeOrKeyWord: function queryByCollegeOrKeyWord(keyWord, pageIndex, provinceId, year, course) {
        return request.fetchApi("TZY/PreFraction/QueryByCollegeOrKeyWord", "POST", "CPD", {
            keyWord: keyWord,
            collegeId: 0,
            pageIndex: pageIndex,
            pageSize: 10,
            provinceId: provinceId,
            year: year,
            course: course
        }).then(function(res) {
            return res;
        });
    }
};