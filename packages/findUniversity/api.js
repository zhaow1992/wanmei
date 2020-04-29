var request = require("../../utils/request.js");

module.exports = {
    GetTypeCount: function GetTypeCount(url, type) {
        //找大学推荐专业列表-随机取10条
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    RecommendationQueryColleges: function RecommendationQueryColleges(url, type, code, pn, provinceId, batch, courseType, totalScore, tags, classify, isBen, collegeType, provinceIds) {
        //找大学推荐专业列表-随机取10条
        return request.fetchApi(url, type, "CPD", {
            lineDiff: 0,
            code: code,
            pageIndex: parseInt(pn),
            pageSize: 20,
            provinceId: parseInt(provinceId),
            batch: parseInt(batch),
            courseType: parseInt(courseType),
            totalScore: parseInt(totalScore),
            rank: 0,
            tags: tags,
            classify: classify,
            isBen: parseInt(isBen),
            type: parseInt(collegeType),
            provinceIds: provinceIds
        }).then(function(res) {
            return res;
        });
    },
    MajorsRecommend: function MajorsRecommend(url, type) {
        //找大学推荐专业列表-随机取10条
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    // GetAllType: function (url, type, newsId) { //大学排名
    //     return request.fetchApi(url, type, "CPD").then(res => res)
    // },
    InstitutesGet: function InstitutesGet(url, type) {
        //根据院校Id获取院系列表和院系对应的专业列表
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    ProfessionsGet: function ProfessionsGet(url, type) {
        //获取院校特色专业
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    QueryBanners: function QueryBanners(url, type) {
        //大学图片
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    RankingsQuery: function RankingsQuery(url, type, rankType, pageIndex) {
        //大学排名
        return request.fetchApi(url, type, "CPD", {
            collegeName: "",
            type: rankType,
            pageIndex: pageIndex,
            pageSize: 20
        }).then(function(res) {
            return res;
        });
    },
    getCollegesNews: function getCollegesNews(url, type, newsId) {
        //通过新闻Id获取院校新闻
        url += "?id=" + newsId + "&isAddHits=false&isLoadCollege=false";
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    queryCollegesNews: function queryCollegesNews(url, type, numId, collegeNewsType, pageIndex, pageSize) {
        //通过院校Id获取院校新闻
        var parameter = {
            collegeId: numId,
            collegeNewsType: collegeNewsType,
            pageIndex: pageIndex,
            pageSize: 20
        };
        return request.fetchApi(url, type, "CPD", parameter).then(function(res) {
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