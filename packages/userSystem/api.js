var request = require("../../utils/request.js");

module.exports = {
    // 【普通版】根据用户编号查询志愿表列表(该接口使用[ZyTable/QueryByUserNumId]替代，待App更新后此接口弃用)
    ZyTableQuery: function ZyTableQuery(url, type, userNumId, provinceId, isOpened) {
        return request.fetchApi(url, type, "CPToC", {
            userNumId: userNumId,
            provinceId: provinceId,
            isOpened: isOpened
        }).then(function(res) {
            return res;
        });
    },
    // 获取用户测录取概率报告
    CollegeAPReportQuery: function CollegeAPReportQuery(url, type, userNumId, provinceNumId, pageIndex) {
        return request.fetchApi(url, type, "CPToC", {
            userNumId: userNumId,
            provinceNumId: provinceNumId,
            pageIndex: pageIndex,
            pageSize: 10
        }).then(function(res) {
            return res;
        });
    },
    /**
   * /AboutUs/Feedback/Insert
  接收提交的意见反馈 */
    insertFeedback: function insertFeedback(url, type, content, userId, contactTel) {
        var parameter = {
            content: content,
            contactTel: contactTel,
            userId: userId,
            clientTypeId: 6
        };
        return request.fetchApi(url, type, "CPToC", parameter).then(function(res) {
            return res;
        });
    },
    ///App/Videos/WatchLogs/Query
    //查看观看记录
    queryWatchLogs: function queryWatchLogs(url, type, userNumId, pageIndex) {
        var parameter = {
            userNumId: userNumId,
            pageIndex: pageIndex,
            pageSize: 10
        };
        return request.fetchApi(url, type, "CPToC", parameter).then(function(res) {
            return res;
        });
    },
    //查询测录取报告
    //CollegeAPReport/Query
    queryCollegeAPReport: function queryCollegeAPReport(url, type, userNumId, provinceNumId, pageIndex) {
        var parameter = {
            userNumId: userNumId,
            provinceNumId: provinceNumId,
            pageIndex: pageIndex,
            pageSize: 10
        };
        return request.fetchApi(url, type, "CPToC", parameter).then(function(res) {
            return res;
        });
    },
    // 用户测评记录查询
    queryRecord: function queryRecord(url, type, userNumId, type1, typesOf, pageIndex) {
        var parameter = {
            userNumId: userNumId,
            type: type1,
            typesOf: typesOf,
            pageIndex: pageIndex,
            pageSize: 10,
            isQueryPatriarchReport: true
        };
        return request.fetchApi(url, type, "CPToC", parameter).then(function(res) {
            return res;
        });
    }
};