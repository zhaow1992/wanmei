var request = require("../../utils/request.js");

module.exports = {
    UseFunctionLogsInsert: function UseFunctionLogsInsert(url, type, userNumId, functionNumId, userPermissionId) {
        //添加用户找大学/自主填报/测录取概率日志
        return request.fetchApi(url, type, "CPToC", {
            userNumId: userNumId,
            functionNumId: functionNumId,
            functionType: 3,
            userPermissionId: userPermissionId
        }).then(function(res) {
            return res;
        });
    },
    UseFunctionLogsCount: function UseFunctionLogsCount(url, type, userNumId, userPermissionId) {
        //根据类型获取找大学/自主填报/测录取概率可用次数
        return request.fetchApi(url, type, "CPToC", {
            userNumId: userNumId,
            userPermissionId: userPermissionId,
            functionType: 3
        }).then(function(res) {
            return res;
        });
    },
    CollegeAPReportInsert: function CollegeAPReportInsert(url, type, equivalentScoreModel, collegeFractionsModel, professionFractionsModels, data) {
        //根据院校及招生方向，等信息查询录取概率
        return request.fetchApi(url, type, "CPToC", {
            equivalentScoreModel: equivalentScoreModel,
            collegeFractionsModel: collegeFractionsModel,
            professionFractionsModels: professionFractionsModels,
            batch: parseInt(data.batch),
            batchName: data.batchName,
            ranking: data.ranking,
            userNumId: data.userNumId,
            userScoreId: data.userScoreId,
            collegeNumId: parseInt(data.collegeNumId),
            codeId: data.codeId,
            uCode: data.uCode,
            provinceNumId: parseInt(data.provinceNumId),
            testPercent: parseInt(data.probability),
            score: parseInt(data.totalScore),
            courseTypeId: parseInt(data.course),
            collegeName: data.collegeName,
            collegeLogoUrl: data.collegeLogoUrl,
            explain: data.explain
        }).then(function(res) {
            return res;
        });
    },
    GetProbability: function GetProbability(url, type, provinceId, batch, course, totalScore, collegeId, uCode, rank) {
        //根据院校及招生方向，等信息查询录取概率
        return request.fetchApi(url, type, "CPD", {
            provinceId: parseInt(provinceId),
            batch: parseInt(batch),
            course: parseInt(course),
            totalScore: parseInt(totalScore),
            uCode: uCode,
            collegeId: parseInt(collegeId),
            rank: parseInt(rank)
        }).then(function(res) {
            return res;
        });
    },
    ProbabilityDetail: function ProbabilityDetail(url, type, provinceId, batch, course, totalScore, collegeId, uCode, rank) {
        //获取院校录取概率详情
        return request.fetchApi(url, type, "CPD", {
            provinceId: parseInt(provinceId),
            batch: parseInt(batch),
            course: parseInt(course),
            totalScore: parseInt(totalScore),
            collegeId: parseInt(collegeId),
            uCode: uCode,
            rank: parseInt(rank)
        }).then(function(res) {
            return res;
        });
    },
    getColleges: function getColleges(url, type, numId) {
        //通过院校Id获取院校信息
        url += "?collegeId=" + numId + "&isLoadStat=false";
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    queryColleges: function queryColleges(url, type, provinceIds, levels, classify, natures, arts, isArt, isBen, qtype, isSingleRecruit, wordSegment, keywords, pageIndex, pageSize) {
        //通过条件搜索院校信息
        var parameter = {
            provinceIds: provinceIds,
            classify: classify,
            natures: natures,
            arts: arts,
            levels: levels,
            isArt: isArt,
            isBen: isBen,
            type: qtype,
            isSingleRecruit: isSingleRecruit,
            wordSegment: wordSegment,
            keywords: keywords,
            pageIndex: pageIndex,
            pageSize: pageSize
        };
        return request.fetchApi(url, type, "CPD", parameter).then(function(res) {
            return res;
        });
    }
};