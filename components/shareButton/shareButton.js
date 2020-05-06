Component({
    properties: {
        buttonText: {
            type: String,
            value: ""
        },
        loadingBtn: {
            type: Boolean,
            value: ""
        }
    },
    data: {},
    methods: {
        _addFormid: function _addFormid(e) {
            this.triggerEvent("addFormid", e);
        }
    }
});