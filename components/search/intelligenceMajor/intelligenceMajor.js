// components/search/intelligenceMajor/intelligenceMajor.js
Component({
    /**
   * 组件的属性列表
   */
    properties: {
        intelligenceMajor: {
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
        chooseMajor: function chooseMajor(e) {
            wx.setStorageSync("zyyx", e.currentTarget.dataset.name);
            wx.navigateBack({
                delta: 1
            });
        }
    }
});