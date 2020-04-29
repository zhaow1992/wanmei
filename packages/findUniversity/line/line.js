function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

var app = getApp();

Page({
    data: {
        cityList: [ {
            type: "A",
            cityArr: [ {
                name: "A 安徽",
                id: 844,
                checked: false
            } ]
        }, {
            type: "B",
            cityArr: [ {
                name: "B 北京",
                id: 834,
                checked: false
            } ]
        }, {
            type: "C",
            cityArr: [ {
                name: "C 重庆",
                id: 854,
                checked: false
            } ]
        }, {
            type: "F",
            cityArr: [ {
                name: "F 福建",
                id: 845,
                checked: false
            } ]
        }, {
            type: "G",
            cityArr: [ {
                name: "G 广东",
                id: 851,
                checked: false
            }, {
                name: "G 广西",
                id: 852,
                checked: false
            }, {
                name: "G 贵州",
                id: 856,
                checked: false
            }, {
                name: "G 甘肃",
                id: 860,
                checked: false
            } ]
        }, {
            type: "H",
            cityArr: [ {
                name: "H 海南",
                id: 853,
                checked: false
            }, {
                name: "H 河南",
                id: 848,
                checked: false
            }, {
                name: "H 黑龙江",
                id: 841,
                checked: false
            }, {
                name: "H 湖北",
                id: 849,
                checked: false
            }, {
                name: "H 湖南",
                id: 850,
                checked: false
            }, {
                name: "H 河北",
                id: 1128,
                checked: false
            } ]
        }, {
            type: "J",
            cityArr: [ {
                name: "J 江苏",
                id: 1,
                checked: false
            }, {
                name: "J 吉林",
                id: 840,
                checked: false
            }, {
                name: "J 江西",
                id: 846,
                checked: false
            } ]
        }, {
            type: "L",
            cityArr: [ {
                name: "L 辽宁",
                id: 839,
                checked: false
            } ]
        }, {
            type: "N",
            cityArr: [ {
                name: "N 宁夏",
                id: 862,
                checked: false
            }, {
                name: "N 内蒙古",
                id: 838,
                checked: false
            } ]
        }, {
            type: "Q",
            cityArr: [ {
                name: "Q 青海",
                id: 861,
                checked: false
            } ]
        }, {
            type: "S",
            cityArr: [ {
                name: "S 上海",
                id: 842,
                checked: false
            }, {
                name: "S 山东",
                id: 847,
                checked: false
            }, {
                name: "S 山西",
                id: 837,
                checked: false
            }, {
                name: "S 陕西",
                id: 859,
                checked: false
            }, {
                name: "S 四川",
                id: 855,
                checked: false
            } ]
        }, {
            type: "T",
            cityArr: [ {
                name: "T 天津",
                id: 835,
                checked: false
            } ]
        }, {
            type: "X",
            cityArr: [ {
                name: "X 新疆",
                id: 1120,
                checked: false
            }, {
                name: "X 西藏",
                id: 858,
                checked: false
            } ]
        }, {
            type: "Y",
            cityArr: [ {
                name: "Y 云南",
                id: 857,
                checked: false
            } ]
        }, {
            type: "Z",
            cityArr: [ {
                name: "Z 浙江",
                id: 843,
                checked: false
            } ]
        } ],
        cityType: "",
        cityCheckedNum: 0,
        type: ""
    },
    confirmPrivinceTap: function confirmPrivinceTap() {
        var that = this;
        var provinceList = [];
        for (var i in that.data.cityList) {
            var cityListSingle = that.data.cityList[i];
            for (var ca in cityListSingle.cityArr) {
                var cityArrSingle = cityListSingle.cityArr[ca];
                if (cityArrSingle.checked) {
                    var province = cityArrSingle.name;
                    province = province.substr(2);
                    provinceList.push(province);
                    app.globalData.provinceList = provinceList;
                }
            }
        }
        wx.navigateBack({
            delta: 1
        });
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.setData({
            type: "checkbox"
        });
        that.selectComponent("#navigationcustom").setNavigationAll("院校所在地", true);
    },
    chooseType: function chooseType(e) {
        this.setData({
            cityType: e.currentTarget.dataset.type
        });
    },
    chooseCity: function chooseCity(e) {
        var typeIndex = e.currentTarget.dataset.typeindex;
        var index = e.currentTarget.dataset.index;
        this.setData(_defineProperty({}, "cityList[" + typeIndex + "].cityArr[" + index + "].checked", !this.data.cityList[typeIndex].cityArr[index].checked));
    }
});