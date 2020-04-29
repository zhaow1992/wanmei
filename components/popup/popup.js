var formidArrOld = [];

var formidArr = [];

Component({
    options: {
        multipleSlots: true
    },
    /* 组件的属性列表 */
    properties: {
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
    /**
   * 组件的初始数据
   */
    data: {
        wrapAnimateMajor: "wrapAnimate",
        bgOpacityMajor: 0,
        showPopupFlag: true,
        bargainGetStatus: "",
        popupAnimateMajor: "popupAnimate"
    },
    /*组件的方法列表*/
    methods: {
        addFormid: function addFormid(e) {
            if (e.detail.formId == "the formId is a mock one") {
                formidArrOld.push("");
            } else {
                formidArrOld.push(e.detail.formId);
            }
            while (formidArrOld.length == 5) {
                formidArr = formidArrOld.join(",");
                formidArrOld = [];
            }
        },
        returnFormid: function returnFormid() {
            return formidArr;
        },
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
            //触发取消回调
            this.triggerEvent("cancelEvent");
        },
        _confirmEvent: function _confirmEvent() {
            //触发成功回调
            this.triggerEvent("confirmEvent");
        }
    }
});