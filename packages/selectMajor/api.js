var request = require("../../utils/request.js");

module.exports = {
    // 查询专业子类数据及开设院校数量
    majorSubOpenCollegeCount: function majorSubOpenCollegeCount(url, type, provinceId, majorCodes) {
        return request.fetchApi(url, type, "CPD", {
            provinceId: provinceId,
            majorCodes: majorCodes
        }).then(function(res) {
            return res;
        });
    },
    // 中类视频-通过关键字查询相关视频
    queryVideos: function queryVideos(url, type, keywords, pageIndex) {
        return request.fetchApi(url, type, "CPD", {
            keywords: keywords,
            pageIndex: pageIndex,
            count: 10
        }).then(function(res) {
            var result = [];
            if (res.result.length > 0) {
                var item = {};
                for (var i = 0; i < res.result.length; i++) {
                    item = {};
                    item.title = res.result[i].title;
                    item.pictureUrl = res.result[i].pictureUrl;
                    item.videoItemCount = res.result[i].videoItemCount;
                    item.hit = res.result[i].hit;
                    item.numId = res.result[i].numId;
                    result.push(item);
                }
            }
            res.result = result;
            return {
                isSuccess: res.isSuccess,
                message: res.message,
                result: res.result
            };
        });
    },
    // 获取专业-就业前景
    getMajorCareerProspects: function getMajorCareerProspects(url, type, majorCode) {
        url += "?majorCode=" + majorCode;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    // 获取专业-就业方向及相关职业
    getEmployment: function getEmployment(url, type, majorCode) {
        url += "?majorCode=" + majorCode;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    // 获取专业-就业方向及相关职业
    getCareer: function getCareer(url, type, majorCode) {
        url += "?majorCode=" + majorCode;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    // 中类专业列表
    GetMiddleMajors: function GetMiddleMajors(url, type, provinceId, majorCode) {
        url += "?provinceId=" + provinceId + "&majorCode=" + majorCode;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            if (res.isSuccess) {
                var result = {};
                result.middleName = res.result.middleMajor.name;
                result.typeId = res.result.middleMajor.typeId;
                result.smallMajors = [];
                for (var i = 0; i < res.result.smallMajors.length; i++) {
                    result.smallMajors.push({
                        name: res.result.smallMajors[i].name,
                        code: res.result.smallMajors[i].code,
                        learnYear: res.result.smallMajors[i].learnYear,
                        openCollegeCount: res.result.smallMajors[i].openCollegeCount
                    });
                }
                res.result = result;
                return {
                    isSuccess: res.isSuccess,
                    message: res.message,
                    result: res.result
                };
            } else {
                // 错误处理
                wx.navigateTo({
                    url: "/pages/error/error"
                });
            }
        });
    },
    // 全部专业列表
    getAllMajors: function getAllMajors(url, type) {
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    // 小类专业详情
    getMajorDetail: function getMajorDetail(url, type, code) {
        url += "?code=" + code;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            var result = {};
            result.name = res.result.name;
            result.largeClassName = res.result.largeClassName;
            result.middleClassName = res.result.middleClassName;
            result.learnYear = res.result.year;
            result.degree = res.result.degree;
            result.male = res.result.male;
            result.female = res.result.female;
            result.wkRatio = res.result.wkRatio;
            result.lkRatio = res.result.lkRatio;
            result.introduction = res.result.introduction;
            //专业介绍
                        result.progressions = res.result.progressions;
            //考研方向
                        result.majorCourse = res.result.majorCourse;
            //主要课程
                        result.typeId = res.result.typeId;
            //专业类型0 = 本科1 = 专科
                        result.objective = res.result.objective;
            //培养目标
                        result.requirement = res.result.requirement;
            //培养要求
                        result.subjectRequirement = res.result.subjectRequirement;
            //学科要求
                        result.loreAndAbility = res.result.loreAndAbility;
            //知识与能力
                        result.internship = res.result.internship;
            //实习实训
                        result.careerCredentials = res.result.careerCredentials;
            //职业资格证书举例
                        result.zsbDirection = res.result.zsbDirection;
            //专升本方向
                        result.famousScholar = res.result.famousScholar;
            //社会学者
                        res.result = result;
            return {
                isSuccess: res.isSuccess,
                message: res.message,
                result: res.result
            };
        });
    },
    // 小类本科开设院校
    getMajorCollege: function getMajorCollege(url, type, majorCode, provinceId, pn) {
        url += "?majorCode=" + majorCode + "&provinceId=" + provinceId + "&pageIndex=" + pn + "&pageSize=10";
        return request.fetchApi(url, type, "CPD").then(function(res) {
            var result = [];
            var items = res.result.items;
            for (var i = 0; i < items.length; i++) {
                var tags = [];
                var tagsArr = items[i].level.split(" ");
                for (var j = 0; j < tagsArr.length; j++) {
                    if (tagsArr[j] == "985" || tagsArr[j] == "211" || tagsArr[j] == "双一流") {
                        tags.push(tagsArr[j]);
                    }
                }
                result.push({
                    logoUrl: items[i].logoUrl,
                    collegeName: items[i].collegeName,
                    provinceName: items[i].provinceName,
                    classify: items[i].classify,
                    belong: items[i].belong,
                    collegeType: items[i].collegeType == 1 ? "公立" : "私立",
                    tags: tags,
                    collegeId: items[i].collegeId
                });
            }
            res.result.items = result;
            return {
                isSuccess: res.isSuccess,
                message: res.message,
                result: res.result
            };
        });
    },
    // 报考热度/就业前景-分页接口
    QueryMajorsHotRankingByPaging: function QueryMajorsHotRankingByPaging(url, type, provinceId, majorType, rankType, pn) {
        return request.fetchApi(url, type, "CPD", {
            provinceId: provinceId,
            majorType: majorType,
            rankType: rankType,
            pageIndex: pn,
            pageSize: 20
        }).then(function(res) {
            return res;
        });
    },
    // 报考热度/就业前景
    QueryMajorsHotRanking: function QueryMajorsHotRanking(url, type, provinceId, majorType, count, rankType) {
        return request.fetchApi(url, type, "CPD", {
            provinceId: provinceId,
            majorType: majorType,
            count: count,
            rankType: rankType
        }).then(function(res) {
            return res;
        });
    },
    //请求一级二级职业
    getProfessionAll: function getProfessionAll(url, type, pageIndex, pageSize) {
        url += "?pageIndex=" + pageIndex + "&pageSize=20";
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    //请求三级职业
    getProfession: function getProfession(url, type, code) {
        url += "?code=" + code;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    //职业库   请求详细职业信息
    getProfessionDesc: function getProfessionDesc(url, type, code) {
        url += "?code=" + code;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    //职业库   岗位详情
    getWorkSituation: function getWorkSituation(url, type, name) {
        url += "?name=" + name;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    //职业库   对口专业
    getrelationSub: function getrelationSub(url, type, code, pageIndex) {
        var parameter = {
            code: code,
            pageIndex: pageIndex,
            pageSize: 20
        };
        return request.fetchApi(url, type, "CPD", parameter).then(function(res) {
            return res;
        });
    },
    //职业库   获取岗位
    getpostInfo: function getpostInfo(url, type, code) {
        url += "?code=" + code;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    }
};