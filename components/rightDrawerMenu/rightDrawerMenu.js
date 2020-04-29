// components/rightDrawerMenu/rightDrawerMenu.js
Component({
    /**
   * 组件的属性列表
   */
    properties: {},
    /**
   * 组件的初始数据
   */
    data: {
        shaixuan: ""
    },
    /**
   * 组件的方法列表
   */
    methods: {
        _innercatchMaskMove: function _innercatchMaskMove() {
            // this.triggerEvent("catchMaskMove");
        },
        catchMaskMove: function catchMaskMove() {},
        maskClose: function maskClose() {
            this.setData({
                shaixuan: "shaixuan-animate-out"
            });
        },
        _showEvent: function _showEvent() {
            this.triggerEvent("shaixuanTap");
        },
        _hideEvent: function _hideEvent() {
            this.triggerEvent("maskClose");
        },
        shaixuanTap: function shaixuanTap() {
            var that = this;
            var tmpsetdata = {
                shaixuan: "shaixuan-animate",
                flag: true
            };
            that.setData(tmpsetdata);
        }
    }
});