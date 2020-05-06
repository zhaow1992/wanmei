Component({
    properties: {
        colleges: {
            type: Array,
            value: []
        },
        collegeType: {
            type: String,
            value: ""
        }
    },
    data: {},
    attached: function attached() {},
    methods: {
        collegeDetail: function collegeDetail(e) {
            var collegeId = e.currentTarget.dataset.id;
            wx.navigateTo({
                url: "/packages/findUniversity/collegeDetail/collegeDetail?numId=" + collegeId
            });
        },
        choseCollege: function choseCollege(e) {
            var that = this;
            var flag = true;
            var collegeListArr = [];
            var _e$currentTarget$data = e.currentTarget.dataset, id = _e$currentTarget$data.id, index = _e$currentTarget$data.index;
            var collegeList = that.data.colleges;
            var collegeCompareList = wx.getStorageSync("collegeCompareList");
            if (collegeCompareList) {
                collegeListArr = collegeCompareList;
            }
            for (var i = 0; i < collegeListArr.length; i++) {
                if (collegeListArr[i].numId == id) {
                    flag = false;
                    break;
                }
            }
            if (flag == true) {
                collegeList[index].st = false, collegeListArr.push(collegeList[index]);
                wx.setStorageSync("collegeCompareList", collegeListArr);
                wx.showToast({
                    title: "添加成功！",
                    icon: "none",
                    duration: 2e3
                });
                wx.navigateBack({
                    delta: 1
                });
            } else {
                wx.showToast({
                    title: "已添加！",
                    icon: "none",
                    duration: 2e3
                });
            }
        }
    }
});