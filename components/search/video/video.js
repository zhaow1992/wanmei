// components/search/video/video.js
Component({
    /**
   * 组件的属性列表
   */
    properties: {
        video: {
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
        videoDetail: function videoDetail(e) {
            var _e$currentTarget$data = e.currentTarget.dataset, type = _e$currentTarget$data.type, id = _e$currentTarget$data.id;
            wx.navigateTo({
                url: "/pages/classRoomDetail/classRoomDetail?type=" + type + "&id=" + id
            });
        }
    }
});