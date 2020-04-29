var app = getApp();

Component({
    properties: {
        collegeList: {
            type: Array,
            value: []
        },
        scoreLineType: {
            type: String,
            value: ""
        },
        collegeListType: {
            type: String,
            value: ""
        }
    },
    data: {
        isNewGK: false
    },
    attached: function attached() {
        var provinceId = wx.getStorageSync("userInfo")[0].Province;
        if (provinceId == "842" || provinceId == "843") {
            this.setData({
                isNewGK: true
            });
        } else {
            this.setData({
                isNewGK: false
            });
        }
    },
    methods: {
        chooseCity: function chooseCity(e) {
            var _e$currentTarget$data = e.currentTarget.dataset, index = _e$currentTarget$data.index, item = _e$currentTarget$data.item;
            switch (this.data.collegeListType) {
              case "score":
                this.searchCollegeByScore(index, item);
                break;

              case "test":
                app.globalData.probabilityInfo.collegeId = item.numId;
                app.globalData.probabilityInfo.collegeUcode = item.uCode;
                app.globalData.probabilityInfo.collegeName = item.cnName;
                app.globalData.probabilityInfo.codeId = item.code;
                wx.navigateBack({
                    detal: 1
                });
                break;

              case "choseSubject":
                wx.navigateTo({
                    url: "/packages/chooseSubjects/collegeResult/collegeResult?code=" + item.collegeId + "&uCode=" + item.uCode
                });
                break;
            }
        },
        searchCollegeByScore: function searchCollegeByScore(index, item) {
            var that = this;
            var collegeList = that.data.collegeList;
            var collegeid = item.numId || item.collegeId;
            var historyList = [];
            try {
                var collegeScoreLineList = wx.getStorageSync("collegeScoreLineList");
                if (collegeScoreLineList) {
                    for (var i = 0; i < collegeScoreLineList.length; i++) {
                        if (collegeid == collegeScoreLineList[i].numId || collegeid == collegeScoreLineList[i].collegeId) {
                            var changeCollege = collegeScoreLineList.splice(i, 1);
                            collegeScoreLineList.push(changeCollege[0]);
                            wx.setStorage({
                                key: "collegeScoreLineList",
                                data: collegeScoreLineList
                            });
                            break;
                        } else {
                            if (i == collegeScoreLineList.length - 1) {
                                collegeScoreLineList.push(collegeList[index]);
                                wx.setStorage({
                                    key: "collegeScoreLineList",
                                    data: collegeScoreLineList
                                });
                            }
                        }
                    }
                } else {
                    historyList.push(collegeList[index]);
                    wx.setStorage({
                        key: "collegeScoreLineList",
                        data: historyList
                    });
                }
                wx.navigateTo({
                    url: "/packages/fractionLine/index/index?current=" + this.data.scoreLineType + "&title=" + (this.data.isNewGK ? item.collegeName : item.cnName) + "&collegeId=" + (this.data.isNewGK ? item.collegeId : item.numId)
                });
            } catch (e) {}
        }
    }
});