Component({
    properties: {
        type: {
            type: String,
            value: ""
        },
        // 学校计划
        share: {
            type: Boolean,
            value: false
        },
        // 学校计划
        collegePlan: {
            type: Boolean,
            value: true
        },
        // 数据源
        listData: {
            type: Array,
            value: []
        },
        // 列数
        columns: {
            type: Number,
            value: 1,
            observer: "dataChange"
        },
        // 顶部高度
        topSize: {
            type: Number,
            value: 0,
            observer: "dataChange"
        },
        // 底部高度
        bottomSize: {
            type: Number,
            value: 0,
            observer: "dataChange"
        },
        cityId: {
            type: Number,
            value: 0
        },
        isPreview: {
            type: Boolean,
            value: false
        }
    },
    data: {
        /* 渲染数据 */
        windowHeight: 0,
        // 视窗高度
        platform: "",
        // 平台信息
        realTopSize: 0,
        // 计算后顶部高度实际值
        realBottomSize: 0,
        // 计算后底部高度实际值
        itemDom: {
            // 每一项 item 的 dom 信息, 由于大小一样所以只存储一个
            width: 0,
            height: 0,
            left: 0,
            top: 0
        },
        itemWrapDom: {
            // 整个拖拽区域的 dom 信息
            width: 0,
            height: 0,
            left: 0,
            top: 0
        },
        startTouch: {
            // 初始触摸点信息
            pageX: 0,
            pageY: 0,
            identifier: 0
        },
        startTranX: 0,
        // 当前激活元素的初始 X轴 偏移量
        startTranY: 0,
        // 当前激活元素的初始 Y轴 偏移量
        preOriginKey: -1,
        // 前一次排序时候的起始 key 值
        /* 未渲染数据 */
        list: [],
        cur: -1,
        // 当前激活的元素 
        curZ: -1,
        // 当前激活的元素, 用于控制激活元素z轴显示
        tranX: 0,
        // 当前激活元素的 X轴 偏移量
        tranY: 0,
        // 当前激活元素的 Y轴 偏移量
        itemWrapHeight: 0,
        // 动态计算父级元素高度
        dragging: false,
        // 是否在拖拽中
        overOnePage: false,
        // 整个区域是否超过一个屏幕
        itemTransition: false,
        // item 变换是否需要过渡动画, 首次渲染不需要
        flag: true
    },
    methods: {
        /*点击每一项后触发事件*/
        itemClick: function itemClick(e) {
            var _e$currentTarget$data = e.currentTarget.dataset, index = _e$currentTarget$data.index, code = _e$currentTarget$data.code;
            var item = this.data.list[index];
            this.triggerEvent("click", {
                oldKey: index,
                newKey: item.key,
                data: item.data,
                code: code
            });
        },
        collegedetail: function collegedetail(e) {
            var _e$currentTarget$data2 = e.currentTarget.dataset, collegeid = _e$currentTarget$data2.collegeid, collegecode = _e$currentTarget$data2.collegecode, isben = _e$currentTarget$data2.isben, index = _e$currentTarget$data2.index;
            this.triggerEvent("collegedetail", {
                collegeid: collegeid,
                collegecode: collegecode,
                isben: isben,
                index: index
            });
        },
        showplan: function showplan(e) {
            var index = e.currentTarget.dataset.index;
            this.triggerEvent("showplan", {
                index: index
            });
        },
        showmajor: function showmajor(e) {
            var majorcode = e.currentTarget.dataset.majorcode;
            this.triggerEvent("showmajor", {
                majorcode: majorcode
            });
        },
        /*长按触发移动排序*/
        longPress: function longPress(e) {
            if (this.data.share) {
                return;
            }
            // 获取触摸点信息
                        var startTouch = e.changedTouches[0];
            if (!startTouch) return;
            // 如果是固定项则返回
                        var index = e.currentTarget.dataset.index;
            if (this.isFixed(index)) return;
            // 防止多指触发 drag 动作, 如果已经在 drag 中则返回, touchstart 事件中有效果
                        if (this.data.dragging) return;
            this.setData({
                dragging: true
            });
            var startPageX = startTouch.pageX, startPageY = startTouch.pageY, _data = this.data, itemDom = _data.itemDom, itemWrapDom = _data.itemWrapDom, startTranX = 0, startTranY = 0;
            if (this.data.columns > 1) {
                // 多列的时候计算X轴初始位移, 使 item 水平中心移动到点击处
                startTranX = startPageX - itemDom.width / 2 - itemWrapDom.left;
            }
            // 计算Y轴初始位移, 使 item 垂直中心移动到点击处
                        startTranY = startPageY - itemDom.height / 2 - itemWrapDom.top;
            this.setData({
                startTouch: startTouch,
                startTranX: startTranX,
                startTranY: startTranY,
                cur: index,
                curZ: index,
                tranX: startTranX,
                tranY: startTranY
            });
            wx.vibrateShort();
        },
        touchMove: function touchMove(e) {
            // 获取触摸点信息
            var currentTouch = e.changedTouches[0];
            if (!currentTouch) return;
            if (!this.data.dragging) return;
            var _data2 = this.data, windowHeight = _data2.windowHeight, realTopSize = _data2.realTopSize, realBottomSize = _data2.realBottomSize, itemDom = _data2.itemDom, startTouch = _data2.startTouch, startTranX = _data2.startTranX, startTranY = _data2.startTranY, preOriginKey = _data2.preOriginKey, startPageX = startTouch.pageX, startPageY = startTouch.pageY, startId = startTouch.identifier, currentPageX = currentTouch.pageX, currentPageY = currentTouch.pageY, currentId = currentTouch.identifier, currentClientY = currentTouch.clientY;
            // 如果不是同一个触发点则返回
                        if (startId !== currentId) return;
            // 通过 当前坐标点, 初始坐标点, 初始偏移量 来计算当前偏移量
                        var tranX = currentPageX - startPageX + startTranX, tranY = currentPageY - startPageY + startTranY;
            // 单列时候X轴初始不做位移
                        if (this.data.columns === 1) tranX = 0;
            // 判断是否超过一屏幕, 超过则需要判断当前位置动态滚动page的位置
                        if (this.data.overOnePage && this.data.cityId !== 834) {
                if (currentClientY > windowHeight - itemDom.height - realBottomSize) {
                    // 当前触摸点pageY + item高度 - (屏幕高度 - 底部固定区域高度)
                    wx.pageScrollTo({
                        scrollTop: currentPageY + itemDom.height - (windowHeight - realBottomSize),
                        duration: 300
                    });
                } else if (currentClientY < itemDom.height + realTopSize) {
                    // 当前触摸点pageY - item高度 - 顶部固定区域高度
                    wx.pageScrollTo({
                        scrollTop: currentPageY - itemDom.height - realTopSize,
                        duration: 300
                    });
                }
            }
            // 设置当前激活元素偏移量
                        this.setData({
                tranX: tranX,
                tranY: tranY
            });
            // 获取 originKey 和 endKey
                        var originKey = parseInt(e.currentTarget.dataset.key), endKey = this.calculateMoving(tranX, tranY);
            // 如果是固定 item 则 return
                        if (this.isFixed(endKey)) return;
            // 防止拖拽过程中发生乱序问题
                        if (originKey === endKey || preOriginKey === originKey) return;
            this.setData({
                preOriginKey: originKey
            });
            // 触发排序
                        this.insert(originKey, endKey);
        },
        touchEnd: function touchEnd() {
            if (!this.data.dragging) return;
            this.clearData();
            this.dataChange();
        },
        /**
     * 根据当前的手指偏移量计算目标key
     */
        calculateMoving: function calculateMoving(tranX, tranY) {
            var itemDom = this.data.itemDom;
            var rows = Math.ceil(this.data.list.length / this.data.columns) - 1, i = Math.round(tranX / itemDom.width), j = Math.round(tranY / itemDom.height);
            i = i > this.data.columns - 1 ? this.data.columns - 1 : i;
            i = i < 0 ? 0 : i;
            j = j < 0 ? 0 : j;
            j = j > rows ? rows : j;
            var endKey = i + this.data.columns * j;
            endKey = endKey >= this.data.list.length ? this.data.list.length - 1 : endKey;
            return endKey;
        },
        /**
     * 根据起始key和目标key去重新计算每一项的新的key
     */
        insert: function insert(origin, end) {
            var _this = this;
            this.setData({
                itemTransition: true
            });
            var list = void 0;
            if (origin < end) {
                // 正序拖动
                list = this.data.list.map(function(item) {
                    if (item.fixed) return item;
                    if (item.key > origin && item.key <= end) {
                        item.key = _this.l2r(item.key - 1, origin);
                    } else if (item.key === origin) {
                        item.key = end;
                    }
                    return item;
                });
                this.getPosition(list);
            } else if (origin > end) {
                // 倒序拖动
                list = this.data.list.map(function(item) {
                    if (item.fixed) return item;
                    if (item.key >= end && item.key < origin) {
                        item.key = _this.r2l(item.key + 1, origin);
                    } else if (item.key === origin) {
                        item.key = end;
                    }
                    return item;
                });
                this.getPosition(list);
            }
        },
        /*正序拖动 key 值和固定项判断逻辑*/
        l2r: function l2r(key, origin) {
            if (key === origin) return origin;
            if (this.data.list[key].fixed) {
                return this.l2r(key - 1, origin);
            } else {
                return key;
            }
        },
        /*倒序拖动 key 值和固定项判断逻辑*/
        r2l: function r2l(key, origin) {
            if (key === origin) return origin;
            if (this.data.list[key].fixed) {
                return this.r2l(key + 1, origin);
            } else {
                return key;
            }
        },
        /* 根据排序后 list 数据进行位移计算*/
        getPosition: function getPosition(data) {
            var _this2 = this;
            var vibrate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var platform = this.data.platform;
            var list = data.map(function(item, index) {
                item.x = item.key % _this2.data.columns;
                item.y = Math.floor(item.key / _this2.data.columns);
                return item;
            });
            this.setData({
                list: list
            });
            if (!vibrate) return;
            if (platform !== "devtools") wx.vibrateShort();
            var listData = [];
            list.forEach(function(item) {
                listData[item.key] = item.data;
            });
            this.triggerEvent("change", {
                listData: listData
            });
        },
        /*判断是否是固定的 item*/
        isFixed: function isFixed(key) {
            var list = this.data.list;
            if (list && list[key] && list[key].fixed) return 1;
            return 0;
        },
        /*清除参数*/
        clearData: function clearData() {
            var _this3 = this;
            this.setData({
                preOriginKey: -1,
                dragging: false,
                cur: -1,
                tranX: 0,
                tranY: 0
            });
            // 延迟清空
                        setTimeout(function() {
                _this3.setData({
                    curZ: -1
                });
            }, 300);
        },
        /*监听列数变化, 如果改变重新初始化参数*/
        dataChange: function dataChange(newVal, oldVal) {
            this.init();
        },
        /*初始化获取 dom 信息*/
        initDom: function initDom() {
            var _this4 = this;
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 0
            });
            var _wx$getSystemInfoSync = wx.getSystemInfoSync(), windowWidth = _wx$getSystemInfoSync.windowWidth, windowHeight = _wx$getSystemInfoSync.windowHeight, platform = _wx$getSystemInfoSync.platform;
            var remScale = (windowWidth || 375) / 375, realTopSize = this.data.topSize * remScale / 2, realBottomSize = this.data.bottomSize * remScale / 2;
            this.setData({
                windowHeight: windowHeight,
                platform: platform,
                realTopSize: realTopSize,
                realBottomSize: realBottomSize
            });
            this.createSelectorQuery().select(".item").boundingClientRect(function(res) {
                console.log(res);
                console.log("======================");
                var rows = Math.ceil(_this4.data.list.length / _this4.data.columns);
                _this4.setData({
                    itemDom: res,
                    itemWrapHeight: rows * res.height
                });
                _this4.createSelectorQuery().select(".item-wrap").boundingClientRect(function(res) {
                    // (列表的底部到页面顶部距离 > 屏幕高度 - 底部固定区域高度) 用该公式来计算是否超过一页
                    var overOnePage = res.bottom > windowHeight - realBottomSize;
                    _this4.setData({
                        itemWrapDom: res,
                        overOnePage: overOnePage
                    });
                }).exec();
            }).exec();
        },
        /*初始化*/
        init: function init() {
            var _this5 = this;
            this.clearData();
            this.setData({
                itemTransition: false
            });
            // 避免获取不到节点信息报错问题
                        if (this.data.listData.length === 0) {
                this.setData({
                    list: [],
                    itemWrapHeight: 0
                });
                return;
            }
            // 遍历数据源增加扩展项, 以用作排序使用
                        var list = this.data.listData.map(function(item, index) {
                return {
                    key: index,
                    x: 0,
                    y: 0,
                    data: item
                };
            });
            this.getPosition(list, false);
            // 异步加载数据时候, 延迟执行 initDom 方法, 防止基础库 2.7.1 版本及以下无法正确获取 dom 信息
                        setTimeout(function() {
                return _this5.initDom();
            }, 10);
            console.log("*****************");
            console.log(this.data);
        },
        screen: function screen(e, flag) {
            this.setData({
                listData: e,
                flag: flag
            }), this.init();
        },
        clickPopup: function clickPopup(e) {
            var index = e.currentTarget.dataset.index;
            var arr = this.data.list;
            arr[index].st = !arr[index].st;
            arr.map(function(i, idx) {
                if (idx != index) {
                    i.st = false;
                }
            });
            this.setData({
                list: arr
            });
        },
        moveUp: function moveUp(e) {
            var index = e.currentTarget.dataset.index;
            var list = this.data.listData;
            list[index] = list.splice(index - 1, 1, list[index])[0];
            this.setData({
                listData: list
            });
            this.triggerEvent("change", {
                listData: list
            });
            this.init();
        },
        moveDown: function moveDown(e) {
            var index = e.currentTarget.dataset.index;
            var list = this.data.listData;
            list[index] = list.splice(index + 1, 1, list[index])[0];
            this.setData({
                listData: list
            });
            this.triggerEvent("change", {
                listData: list
            });
            this.init();
        },
        delVolunteer: function delVolunteer(e) {
            var that = this;
            var index = e.currentTarget.dataset.index;
            var list = this.data.listData;
            wx.showModal({
                content: "是否删除该志愿？",
                success: function success(res) {
                    if (res.confirm) {
                        list.splice(index, 1);
                        that.setData({
                            listData: list
                        });
                        that.triggerEvent("change", {
                            listData: list
                        });
                        that.init();
                    } else if (res.cancel) {}
                }
            });
        }
    },
    ready: function ready() {
        console.log(this.data.listData);
        this.init();
    }
});