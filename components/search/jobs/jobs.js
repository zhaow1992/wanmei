// components/search/jobs/jobs.js
Component({
    /**
   * 组件的属性列表
   */
    properties: {
        jobs: {
            type: Array,
            value: []
        }
    },
    /**
   * 组件的初始数据
   */
    data: {},
    /**
   * 组件的方法列表
   */
    methods: {
        jobDetail: function jobDetail(e) {
            var code = e.currentTarget.dataset.id;
            wx.navigateTo({
                url: "/packages/selectMajor/professionDesc/professionDesc?code=" + code
            });
        }
    }
});