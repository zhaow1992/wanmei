// components/search/college/college.js
Component({
    /**
   * 组件的属性列表
   */
    properties: {
        colleges: {
            type: Array,
            value: []
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
        }
    }
});