var request = require("../../utils/request.js");

module.exports = {
    ///Fractions/Colleges/Query
    ///ScoreLines/Plans/Colleges/Query
    //ScoreLines/Plans/Professions/Query
    ///ScoreLines/NewGaoKao/QueryFractionConfigs
    ///ScoreLines/NewGaoKao/QueryCollegeMajorsLine
    //ScoreLines/NewGaoKao/QueryCollegeYearFractions
    Configuration: function Configuration(url, type, provinceId) {
        //通过省份Id获取分数线配置信息
        url += "?provinceId=" + provinceId;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    queryNewGaoKaoCollegeYearFractions: function queryNewGaoKaoCollegeYearFractions(url, type, provinceId, collegeId, uCode) {
        //查询新高考指定院校分数线（院校主页）
        url += "?provinceId=" + provinceId + "&collegeId=" + collegeId + "&ucode=" + uCode;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    queryNewGaoKaoCollegeMajorsLine: function queryNewGaoKaoCollegeMajorsLine(url, type, provinceId, collegeId, isGroupType, uCode, year) {
        //查询新高考指定院校的专业分数线
        url += "?provinceId=" + provinceId + "&collegeId=" + collegeId + "&isGroupType=" + isGroupType + "&ucode=" + uCode + "&year=" + year;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    ///ScoreLines/NewGaoKao/QueryCollegePlansWithChooseNums
    queryNewGaoKaoCollegePlansWithChooseNums: function queryNewGaoKaoCollegePlansWithChooseNums(url, type, provinceId, collegeId, isGroupType, uCode) {
        //查询新高考指定院校的招生计划
        url += "?provinceId=" + provinceId + "&collegeId=" + collegeId + "&isGroupType=" + isGroupType + "&ucode=" + uCode;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    queryNewGaoKaoFractionConfigs: function queryNewGaoKaoFractionConfigs(url, type, provinceId, collegeId) {
        //根据省份及院校获取新高考招生方向配置
        url += "?provinceId=" + provinceId + "&collegeId=" + collegeId;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    queryProfessionsPlans: function queryProfessionsPlans(url, type, year, uCode) {
        //通过条件查询专业招生计划并按照批次分组
        //?year=111&ucodes=1&ucodes=2&ucodes=3&ucodes=
        url += "?year=" + year + "&ucodes=" + uCode;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    queryCollegePlans: function queryCollegePlans(url, type, year, uCode) {
        //通过条件查询院校招生计划
        //?year=111&ucodes=1&ucodes=2&ucodes=3&ucodes=
        url += "?year=" + year + "&ucodes=" + uCode;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    queryCollegesFractions: function queryCollegesFractions(url, type, provinceNumId, uCode) {
        //通过省份和UCode 以及年份区间查询院校分数线
        //
        url += "?provinceNumId=" + provinceNumId + "&ucode=" + uCode;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    queryConfigFractions: function queryConfigFractions(url, type, collegeId, provinceId) {
        //通过院校及省份获取院校招生方向及文理年份等数据
        url += "?collegeId=" + collegeId + "&provinceId=" + provinceId;
        return request.fetchApi(url, type, "CPD").then(function(res) {
            return res;
        });
    },
    // 通过条件查询专业分数线数据
    queryProfessionsFractions: function queryProfessionsFractions(url, type, uCode, batch, courseType, yearFrom, yearTo) {
        var parameter = {
            uCode: uCode,
            batch: batch,
            courseType: courseType,
            yearFrom: yearFrom,
            yearTo: yearTo
        };
        return request.fetchApi(url, type, "CPD", parameter).then(function(res) {
            return res;
        });
    },
    ///ScoreLines/NewGaoKao/QueryCollegeMajorsLine
    //ScoreLines/UCodes/QueryList
    queryListByUCodes: function queryListByUCodes(url, type, uCode, batch, courseType, yearFrom, yearTo) {
        var parameter = {};
        return request.fetchApi(url, type, "CPD", parameter).then(function(res) {
            return res;
        });
    },
    //////////////////////queryLisScoreLinet
    ///ScoreLines/Fractions/Professions/Query
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
            pageSize: pageSize
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
    //queryCollegesFractionsScoreLines
    /*通过省份和UCode 以及年份区间查询院校分数线
    @POST("ScoreLines/Fractions/Colleges/Query")
    Observable<HttpResultTZY<List<CollegeFractionDto>>> getScoreLinesByCodeAndYearInterval(@Query("provinceNumId") int provinceNumId, @Query("ucode") String ucode);
      //通过条件查询专业分数线数据
    @POST("ScoreLines/Fractions/Professions/Query")
    Observable<HttpResultTZY<List<ProfessionFractionDto>>> getMajorScoreLinesByYearAndBatch(@Body ProfessionFractionInput2 input);
      //获取省份的配置参数年份区间
    @POST("Configuration/ScoreLines/QueryYearsByProvinceId")
    Observable<HttpResultTZY<List<YearConfigDto>>> QueryYearsByProvinceId(@Query("provinceId") int provinceId);
      //通过条件查询专业招生计划并按照批次分组
    @POST("ScoreLines/Plans/Professions/Query")
    Observable<HttpResultTZY<ProfessionPlansWithBatchDto>> getEnterPlanByUcode(@Query("year") int year,@Query("ucodes") String ucodes);
      //获取指定专业就业和简介
    @POST("Majors/GetMajorIntroduction")
    Observable<HttpResultTZY<MajorIntroductionDto>> GetMajorIntroduction(@Query("majorCode") String majorCode);
      //查询新高考指定院校的专业分数线
    @POST("ScoreLines/NewGaoKao/QueryCollegeMajorsLine")
    Observable<HttpResultTZY<QueryNewGaoKaoPlansOutput>> QueryCollegeMajorsLine(@Query("provinceId") int provinceId, @Query("collegeId") int collegeId, @Query("isGroupType") int isGroupType);
  */
    // getColleges: function(url, type) { //完善用户性别
    //   return request.fetchApi(url, type, "CPD", {
    //     "UserId": userid,
    //     "Sex": sex
    //   }).then(res => res)
    // },
    // wanshanUserSex: function (url, type) {  //完善用户性别
    //   return request.fetchApi(url, type, "CPD", {
    //     "UserId": userid,
    //     "Sex": sex
    //   }).then(res => res)
    // }
    // api.wanshanUserSex('v2/setExperienceUser', 'POST', userInfo[0].UserId, sexId).then(res => {\})
};