var formidArrOld = [];

var formidArr = [];

Component({
    options: {
        multipleSlots: true
    },
    properties: {
        share: {
            type: Boolean,
            value: false
        },
        popupText: {
            type: String,
            value: ""
        },
        shareButtonText: {
            type: String,
            value: ""
        },
        statusText: {
            type: String,
            value: ""
        },
        bargainPrice: {
            type: Number,
            value: ""
        },
        title: {
            type: String,
            value: ""
        },
        popupType: {
            type: String,
            //dialog、
            value: ""
        },
        popupContent: {
            type: Array,
            value: ""
        },
        //    
        showPopupFlag: {
            type: Boolean,
            value: false
        },
        // 弹窗取消按钮文字
        cancelText: {
            type: String,
            value: "取消"
        },
        // 弹窗确认按钮文字
        confirmText: {
            type: String,
            value: "确定"
        }
    },
    data: {
        wrapAnimateMajor: "wrapAnimate",
        bgOpacityMajor: 0,
        showPopupFlag: true,
        bargainGetStatus: "",
        popupAnimateMajor: "popupAnimate"
    },
    methods: {
        _showTap: function _showTap() {
            this.setData({
                wrapAnimateMajor: "wrapAnimate",
                bgOpacityMajor: 0,
                showPopupFlag: true,
                popupAnimateMajor: "popupAnimate"
            });
        },
        _hideTap: function _hideTap() {
            this.triggerEvent("hideTapPage");
        },
        hidePopupFunc: function hidePopupFunc() {
            var _this = this;
            this.setData({
                wrapAnimateMajor: "wrapAnimateOut",
                bgOpacityMajor: .7,
                popupAnimateMajor: "popupAnimateOut"
            });
            setTimeout(function() {
                _this.setData({
                    showPopupFlag: false
                });
            }, 200);
        },
        /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
        _cancelEvent: function _cancelEvent() {
            this.triggerEvent("cancelEvent");
        },
        _confirmEvent: function _confirmEvent() {
            this.triggerEvent("confirmEvent");
        }
    }
});