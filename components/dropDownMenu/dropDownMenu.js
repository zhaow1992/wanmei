Component({
    properties: {
        flag: {
            type: Boolean,
            value: false
        },
        top: {
            type: String,
            value: "10px"
        },
        left: {
            type: String,
            value: "0px"
        },
        items: {
            type: Array,
            value: []
        },
        value: {
            type: Number,
            value: null
        },
        type: {
            type: String,
            value: ""
        }
    },
    data: {
        dropDownAnimate: ""
    },
    attached: function attached() {
        if (this.data.type == "year") {
            this.setData({
                items: this.data.items.reverse()
            });
        }
    },
    methods: {
        toggerDropDown: function toggerDropDown() {
            var that = this;
            if (that.data.flag == false) {
                that.setData({
                    flag: true,
                    dropDownAnimate: "dropDownAnimate"
                });
            } else {
                that.setData({
                    dropDownAnimate: "dropDownAnimateOut"
                });
                setTimeout(function() {
                    that.setData({
                        flag: false
                    });
                }, 500);
            }
        },
        closeDropDown: function closeDropDown() {
            var that = this;
            that.setData({
                dropDownAnimate: "dropDownAnimateOut"
            });
            setTimeout(function() {
                that.setData({
                    flag: false
                });
            }, 500);
        },
        _chooseEvent: function _chooseEvent(e) {
            this.setData({
                value: e.currentTarget.dataset.value
            });
            this.triggerEvent("chooseEvent", e.currentTarget.dataset.value);
            this.toggerDropDown();
        }
    }
});