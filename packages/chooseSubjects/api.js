var _module$exports;

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

var request = require("../../utils/request.js");

module.exports = (_module$exports = {
    /* *****************选科详情************************ */
    // 分页查询院校及匹配列表
    queryCollegeRate: function queryCollegeRate(url, type, subject, collegeCount, rate, pageIndex, provinceId, year, majorCode, isFit) {
        return request.fetchApi(url, type, "CPD", {
            subject: subject,
            collegeCount: parseInt(collegeCount),
            rate: parseInt(rate),
            isFit: isFit,
            pageIndex: pageIndex,
            pageSize: 20,
            provinceId: provinceId,
            year: year,
            majorCode: majorCode,
            keyword: ""
        }).then(function(res) {
            return res;
        });
    },
    // 专业匹配
    queryMatchRate: function queryMatchRate(url, type, provinceId, year, majorCodes, subject, majors) {
        return request.fetchApi(url, type, "CPD", {
            provinceId: provinceId,
            year: year,
            majorCodes: [],
            subject: subject,
            isASC: false,
            majors: majors
        }).then(function(res) {
            return res;
        });
    },
    // 第3步：最优选科方案
    queryRecommendSubject: function queryRecommendSubject(url, type, provinceId, year, majorCodes, subject) {
        return request.fetchApi(url, type, "CPD", {
            provinceId: provinceId,
            year: year,
            majorCodes: majorCodes,
            subject: subject
        }).then(function(res) {
            return res;
        });
    },
    //获取选科意向专业详情
    getMajorDetail: function getMajorDetail(url, type, majorCodes, provinceId, year) {
        return request.fetchApi(url, type, "CPD", {
            majorCodes: majorCodes,
            provinceId: provinceId,
            year: year
        }).then(function(res) {
            return res;
        });
    },
    // 获取选科院校匹配详情
    getColleges: function getColleges(url, type, collegeCount, rate, majorCode, provinceId, year, subject, keyword, pageSize, pageIndex) {
        return request.fetchApi(url, type, "CPD", {
            collegeCount: collegeCount,
            rate: rate,
            majorCode: majorCode,
            provinceId: provinceId,
            year: year,
            subject: subject,
            keyword: keyword,
            pageSize: pageSize,
            pageIndex: pageIndex
        }).then(function(res) {
            return res;
        });
    },
    /* *****************选科详情结束************************ */
    //获取选科省份
    getSubjectsProvince: function getSubjectsProvince(url, type) {
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    //获取选科使用人数
    /*  1=专业选科
      2=智能选科
      3=大学选科
      4=科目推荐选科 */
    getChooseSubjectsNumber: function getChooseSubjectsNumber(url, type) {
        return request.fetchApi(url, type, "CPToC").then(function(res) {
            return res;
        });
    },
    getMerged: function getMerged(url, type) {
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    proOrientationInsert: function proOrientationInsert(url, type, userNumId, sex, testTime, answers, isPatriarch) {
        return request.fetchApi(url, type, "CPToC", {
            userNumId: userNumId,
            sex: sex,
            testTime: testTime,
            answers: answers,
            isPatriarch: isPatriarch
        }).then(function(res) {
            return res;
        });
    },
    // //获取单个专业定位五合一测评详情
    professionOrientationRes: function professionOrientationRes(url, type) {
        return request.fetchApi(url, type, "CPToC").then(function(res) {
            return res;
        });
    },
    //获取猜你喜欢院校
    getYourWantColleges: function getYourWantColleges(url, type, data) {
        var userNumId = data.userNumId, provinceNumId = data.provinceNumId;
        return request.fetchApi(url, type, "CPToC", {
            userNumId: userNumId,
            provinceNumId: provinceNumId
        }).then(function(res) {
            return res;
        });
    },
    //获取猜你喜欢专业
    getYourWantMajors: function getYourWantMajors(url, type, data) {
        var userNumId = data.userNumId, provinceNumId = data.provinceNumId, year = data.year;
        return request.fetchApi(url, type, "CPToC", {
            userNumId: userNumId,
            provinceNumId: provinceNumId,
            year: year
        }).then(function(res) {
            return res;
        });
    },
    //关键字搜索院校
    queryCollege: function queryCollege(url, type, data) {
        var keywords = data.keywords, provinceId = data.provinceId, year = data.year, count = data.count;
        return request.fetchApi(url, type, "CPD", {
            count: count,
            keywords: keywords,
            provinceId: provinceId,
            year: year
        }).then(function(res) {
            return res;
        });
    },
    //关键字搜索专业
    queryMajor: function queryMajor(url, type, data) {
        var keywords = data.keywords, provinceId = data.provinceId, year = data.year, count = data.count, isBen = data.isBen;
        return request.fetchApi(url, type, "CPD", {
            count: count,
            isBen: isBen,
            keywords: keywords,
            provinceId: provinceId,
            year: year
        }).then(function(res) {
            return res;
        });
    },
    //获取大学选考科目查询结果/专业匹配率
    getCollegeResult: function getCollegeResult(url, type, data) {
        var collegeId = data.collegeId, provinceId = data.provinceId, year = data.year, uCode = data.uCode, keyword = data.keyword, subject = data.subject;
        return request.fetchApi(url, type, "CPD", {
            collegeId: collegeId,
            provinceId: provinceId,
            year: year,
            uCode: uCode,
            keyword: keyword,
            subject: subject
        }).then(function(res) {
            return res;
        });
    },
    //获取专业选考科目查询结果
    getMajorResult: function getMajorResult(url, type, data) {
        var majorCode = data.majorCode, provinceId = data.provinceId, year = data.year;
        return request.fetchApi(url, type, "CPD", {
            majorCode: majorCode,
            provinceId: provinceId,
            year: year
        }).then(function(res) {
            return res;
        });
    },
    //选科方案个数
    myChooseSubjects: function myChooseSubjects(url, type, userNumId, pageIndex, pageSize) {
        var parameter = {
            userNumId: userNumId,
            pageIndex: 1,
            pageSize: 1
        };
        return request.fetchApi(url, type, "CPToC", parameter).then(function(res) {
            return res;
        });
    },
    //获取最新五合一测评情况
    getProfessionOrientation: function getProfessionOrientation(url, type, userNumId) {
        return request.fetchApi(url, type, "CPToC", {
            userNumId: userNumId,
            count: 1,
            isRandom: false
        }).then(function(res) {
            return res;
        });
    },
    //根据用户id获取最新五合一专业定位专业列表
    getNewestEvaluation: function getNewestEvaluation(url, type, userNumId) {
        return request.fetchApi(url, type, "CPToC", {
            userNumId: userNumId,
            majorCodes: []
        }).then(function(res) {
            return res;
        });
    },
    //保存选科方案
    saveChooseSubPlan: function saveChooseSubPlan(url, type, userNumId, provinceNumId, provinceName, chooseYear, subject, majorCount, majorMatchCount, majorMatchRate, collegeCount, matchCollegeCount, collegeMatchRate, compositeMatchRate, subjectRelated, type1, majors) {
        return request.fetchApi(url, type, "CPToC", {
            userNumId: userNumId,
            provinceNumId: provinceNumId,
            provinceName: provinceName,
            chooseYear: chooseYear,
            subject: subject,
            majorCount: majorCount,
            majorMatchCount: majorMatchCount,
            majorMatchRate: majorMatchRate,
            collegeCount: collegeCount,
            matchCollegeCount: matchCollegeCount,
            collegeMatchRate: collegeMatchRate,
            compositeMatchRate: compositeMatchRate,
            subjectRelated: subjectRelated,
            type: type1,
            majors: majors
        }).then(function(res) {
            return res;
        });
    },
    //获取单个选科方案详情
    getChooseSubPlan: function getChooseSubPlan(url, type, id) {
        return request.fetchApi(url, type, "CPToC").then(function(res) {
            return res;
        });
    }
}, _defineProperty(_module$exports, "queryCollegeRate", function queryCollegeRate(url, type, subject, collegeCount, rate, pageIndex, provinceId, year, majorCode, isFit) {
    return request.fetchApi(url, type, "CPD", {
        subject: subject,
        collegeCount: parseInt(collegeCount),
        rate: parseInt(rate),
        isFit: isFit,
        pageIndex: pageIndex,
        pageSize: 20,
        provinceId: provinceId,
        year: year,
        majorCode: majorCode,
        keyword: ""
    }).then(function(res) {
        return res;
    });
}), _defineProperty(_module$exports, "getMajorMatchRate", function getMajorMatchRate(url, type, data) {
    var majorCodes = data.majorCodes, pageIndex = data.pageIndex, pageSize = data.pageSize, provinceId = data.provinceId, sortFiledType = data.sortFiledType, sortType = data.sortType, subject = data.subject, year = data.year;
    return request.fetchApi(url, type, "CPD", {
        majorCodes: majorCodes,
        pageIndex: pageIndex,
        pageSize: pageSize,
        provinceId: provinceId,
        sortFiledType: sortFiledType,
        sortType: sortType,
        subject: subject,
        year: year
    }).then(function(res) {
        return res;
    });
}), _defineProperty(_module$exports, "getCollegeResult", function getCollegeResult(url, type, data) {
    var collegeId = data.collegeId, provinceId = data.provinceId, year = data.year, uCode = data.uCode, keyword = data.keyword, subject = data.subject;
    return request.fetchApi(url, type, "CPD", {
        collegeId: collegeId,
        provinceId: provinceId,
        year: year,
        uCode: uCode,
        keyword: keyword,
        subject: subject
    }).then(function(res) {
        return res;
    });
}), _module$exports);