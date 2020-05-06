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

// components/advance.js
var chooseArr = [];

var lastType = void 0;

Component({
    /**
   * 组件的属性列表
   */
    properties: {
        treedata: {
            type: Array,
            value: []
        },
        lastType: {
            type: String,
            value: ""
        }
    },
    /**
   * 组件的初始数据
   */
    data: {
        mid: ""
    },
    /**
   * 组件的方法列表
   */
    methods: {
        myInfo: function myInfo(e) {
            var type = e.currentTarget.dataset.type;
            var level = e.currentTarget.dataset.level;
            var res = chooseArr.some(function(ele) {
                if (ele.level == level) {
                    return true;
                }
            });
            if (res) {
                chooseArr[level - 1].type = type;
            } else {
                chooseArr.push({
                    type: type,
                    level: level
                });
            }
            lastType = type;
            this.triggerEvent("setCurrentType", {
                lastType: lastType,
                chooseArr: chooseArr
            });
            this.toggle(e);
        },
        setCurrentType: function setCurrentType(e) {
            this.triggerEvent("setCurrentType", {
                lastType: lastType,
                chooseArr: chooseArr
            });
        },
        toggle: function toggle(e) {
            console.log(555);
            var type = e.currentTarget.dataset.type;
            var level = e.currentTarget.dataset.level;
            if (level == 1) {
                chooseArr = [];
            }
            chooseArr.forEach(function(ele, index) {
                if (ele.level >= level) {
                    chooseArr.splice(index, 1);
                }
            });
            chooseArr.push({
                type: type,
                level: level
            });
            if (level <= chooseArr.length) {
                chooseArr[level - 1] = {
                    type: type,
                    level: level
                };
                chooseArr.length = level;
            }
            for (var i in this.properties.treedata) {
                if (this.properties.treedata[i].level == level && this.properties.treedata[i].type == type) {
                    var st = true;
                    if (this.properties.treedata[i].st == true) {
                        st = false;
                    }
                    this.data.treedata[i].subset.forEach(function(ele) {
                        ele.st = false;
                    });
                    this.setData(_defineProperty({}, "treedata[" + i + "].st", st));
                } else {
                    this.setData(_defineProperty({}, "treedata[" + i + "].st", false));
                }
            }
            this.setData({
                treedata: this.data.treedata
            });
        }
    }
});