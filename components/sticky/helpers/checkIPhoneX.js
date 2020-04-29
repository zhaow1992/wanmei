Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.checkIPhoneX = exports.safeAreaInset = exports.getSystemInfo = void 0;

var systemInfo = null, getSystemInfo = function getSystemInfo(e) {
    if (!systemInfo || e) try {
        systemInfo = wx.getSystemInfoSync();
    } catch (e) {}
    return systemInfo;
};

exports.getSystemInfo = getSystemInfo;

var safeAreaInset = {
    top: 88,
    left: 0,
    right: 0,
    bottom: 34
};

exports.safeAreaInset = safeAreaInset;

var isIPhoneX = function isIPhoneX(e) {
    var t = e.model, s = e.platform;
    e.screenHeight;
    return /iPhone X/.test(t) && "ios" === s;
}, checkIPhoneX = function checkIPhoneX(e) {
    return isIPhoneX(getSystemInfo(e));
};

exports.checkIPhoneX = checkIPhoneX;