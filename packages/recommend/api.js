var request = require("../../utils/request.js");

module.exports = {
    getRecommendProfessionFractions: function getRecommendProfessionFractions(url, type, ProfessionName, UCode, ProvinceId, CourseType, Total, Batch, Rank, YfydRank) {
        return request.fetchApi(url, type, "C", {
            ProfessionName: ProfessionName,
            UCode: UCode,
            ProvinceId: ProvinceId,
            CourseType: CourseType,
            Total: Total,
            Batch: Batch,
            Rank: Rank,
            YfydRank: YfydRank
        }).then(function(res) {
            return res;
        });
    },
    getRecommendCollegeFractions: function getRecommendCollegeFractions(url, type, UCode, ProvinceId, CourseType, Batch) {
        return request.fetchApi(url, type, "C", {
            UCode: UCode,
            ProvinceId: ProvinceId,
            CourseType: CourseType,
            Batch: Batch
        }).then(function(res) {
            return res;
        });
    }
};