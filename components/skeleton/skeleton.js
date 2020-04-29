var app = getApp();

Component({
    properties: {
        bgcolor: {
            type: String,
            value: "#FFF"
        },
        selector: {
            type: String,
            value: "skeleton"
        }
    },
    data: {
        systemInfo: {},
        skeletonRectLists: [],
        skeletonCircleLists: []
    },
    attached: function attached() {
        //默认的首屏宽高，防止内容闪现
        var systemInfo = app.globalData.systemInfo;
        this.setData({
            systemInfo: {
                width: systemInfo.windowWidth,
                height: systemInfo.windowHeight
            }
        });
    },
    ready: function ready() {
        var that = this;
        //绘制背景
                wx.createSelectorQuery().selectAll("." + this.data.selector).boundingClientRect().exec(function(res) {
            that.setData({
                "systemInfo.height": res[0][0].height + res[0][0].top
            });
        });
        //绘制矩形
                this.rectHandle();
        //绘制圆形
                this.radiusHandle();
    },
    methods: {
        rectHandle: function rectHandle() {
            var that = this;
            //绘制不带样式的节点
                        wx.createSelectorQuery().selectAll("." + this.data.selector + " >>> ." + this.data.selector + "-rect").boundingClientRect().exec(function(res) {
                that.setData({
                    skeletonRectLists: res[0]
                });
            });
        },
        radiusHandle: function radiusHandle() {
            var that = this;
            wx.createSelectorQuery().selectAll("." + this.data.selector + " >>> ." + this.data.selector + "-radius").boundingClientRect().exec(function(res) {
                that.setData({
                    skeletonCircleLists: res[0]
                });
            });
        }
    }
});