Page({
    data: {},
    onLoad: function onLoad(options) {
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll("测评结果", true);
        that.type = "";
        if (options && options.type == "choosesubject") {
            that.type = "choosesubject";
        }
    },
    complete: function complete() {
        if (this.type == "choosesubject") {
            wx.redirectTo({
                url: "/packages/chooseSubjects/evaluation/evaluation"
            });
        } else {
            wx.navigateBack({
                delta: 1
            });
        }
    }
});