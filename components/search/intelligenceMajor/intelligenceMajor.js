Component({
    properties: {
        intelligenceMajor: {
            type: Array,
            value: []
        }
    },
    methods: {
        chooseMajor: function chooseMajor(e) {
            var cityId = wx.getStorageSync("cityId").cityId;
            if (cityId == 847 || cityId == 843) {
                var _e$currentTarget$data = e.currentTarget.dataset, name = _e$currentTarget$data.name, majorcode = _e$currentTarget$data.majorcode;
                var arr = wx.getStorageSync("sdAddMajorSearch") || [];
                if (arr.length > 0) {
                    arr.map(function(i) {
                        if (i.majorcode == majorcode) {
                            return;
                        } else {
                            arr.push({
                                name: name,
                                majorcode: majorcode
                            });
                        }
                    });
                } else {
                    arr.push({
                        name: name,
                        majorcode: majorcode
                    });
                }
                wx.setStorageSync("sdAddMajorSearch", arr);
            }
            if (cityId == 834) {
                wx.setStorageSync("bjAddMajorSearchKeyword", e.currentTarget.dataset.name);
            } else if (cityId == 835) {
                wx.setStorageSync("tjAddMajorSearchKeyword", e.currentTarget.dataset.name);
            } else if (cityId == 853) {
                wx.setStorageSync("hnAddMajorSearchKeyword", e.currentTarget.dataset.name);
            } else {
                wx.setStorageSync("zyyx", {
                    name: e.currentTarget.dataset.name,
                    majorcode: e.currentTarget.dataset.majorcode
                });
            }
            wx.navigateBack({
                delta: 1
            });
        }
    }
});