// components/search/major/major.js
Component({
    /**
   * 组件的属性列表
   */
    properties: {
        majors: {
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
        majorDetail: function majorDetail(e) {
            var code = e.currentTarget.dataset.majorcode;
            var cityId = wx.getStorageSync("cityId").cityId;
            if (code.length == 4) {
                wx.navigateTo({
                    url: "/packages/selectMajor/middleMajorDetail/middleMajorDetail?majorcode=" + code
                });
            } else {
                wx.navigateTo({
                    url: "/packages/selectMajor/majorDetail/majorDetail?majorcode=" + code + "&cityid=" + cityId
                });
            }
        }
    }
});