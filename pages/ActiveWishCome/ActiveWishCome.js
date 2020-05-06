var api = require("../../utils/api.js");

var app = getApp();

Page({
    data: {
        navStatusHeight: app.globalData.navigationCustomStatusHeight,
        navCapsuleHeight: app.globalData.navigationCustomCapsuleHeight,
        url: "http://wmei-appfile.cn-bj.ufileos.com/mini/拜年.png",
        id: 19,
        share: false,
        showLoad: false,
        scrollFlag: true,
        nameBtnFlag: false,
        name: "",
        wishNum: 0,
        inputName: false,
        wishPicUrlList: [ {
            url: "http://wmei-appfile.cn-bj.ufileos.com/mini/拜年.png",
            info: "拜年",
            st: true,
            id: 19
        }, {
            url: "http://wmei-appfile.cn-bj.ufileos.com/mini/除夕.png",
            info: "除夕迎新春",
            st: false,
            id: 18
        }, {
            url: "http://wmei-appfile.cn-bj.ufileos.com/mini/元宵节.png",
            info: "闹元宵",
            st: false,
            id: 17
        }, {
            url: "http://wmei-appfile.cn-bj.ufileos.com/mini/小年.png",
            info: "过小年",
            st: false,
            id: 16
        }, {
            url: "http://wmei-appfile.cn-bj.ufileos.com/0yg/jin_shu_song_fu.jpg",
            info: "金鼠送福",
            st: false,
            id: 15
        }, {
            url: "http://wmei-appfile.cn-bj.ufileos.com/0yg/shu_nian_da_ji.jpg",
            info: "鼠年大吉",
            st: false,
            id: 14
        }, {
            url: "http://staticv2.wmei.cn/images/xiaochengxu/activeWish/13.jpg",
            info: "辞旧迎新",
            st: false,
            id: 13
        }, {
            url: "http://staticv2.wmei.cn/images/xiaochengxu/activeWish/12.jpg",
            info: "逢考必过",
            st: false,
            id: 12
        }, {
            url: "http://staticv2.wmei.cn/images/xiaochengxu/activeWish/11.jpg",
            info: "诸事顺利",
            st: false,
            id: 11
        }, {
            url: "http://staticv2.wmei.cn/images/xiaochengxu/activeWish/10.jpg",
            info: "对联",
            st: false,
            id: 10
        }, {
            url: "http://staticv2.wmei.cn/images/xiaochengxu/activeWish/9.jpg",
            info: "金榜题名",
            st: false,
            id: 9
        }, {
            url: "http://wmei-appfile.cn-bj.ufileos.com/zf/wei_meng_xiang_er_zhan.png",
            info: "为梦而战",
            st: false,
            id: 8
        }, {
            url: "http://wmei-appfile.cn-bj.ufileos.com/0yg/gao_kao_jia_you.jpg",
            info: "高考加油",
            st: false,
            id: 7
        }, {
            url: "http://staticv2.wmei.cn/images/xiaochengxu/activeWish/1.jpg",
            info: "状元符",
            st: false,
            id: 1
        }, {
            url: "http://staticv2.wmei.cn/images/xiaochengxu/activeWish/2.jpg",
            info: "状元",
            st: false,
            id: 2
        }, {
            url: "http://staticv2.wmei.cn/images/xiaochengxu/activeWish/3.jpg",
            info: "上海外滩",
            st: false,
            id: 3
        }, {
            url: "http://staticv2.wmei.cn/images/xiaochengxu/activeWish/4.jpg",
            info: "旗帜",
            st: false,
            id: 4
        }, {
            url: "http://staticv2.wmei.cn/images/xiaochengxu/activeWish/5.jpg",
            info: "孔明灯",
            st: false,
            id: 5
        }, {
            url: "http://staticv2.wmei.cn/images/xiaochengxu/activeWish/6.jpg",
            info: "儿童版",
            st: false,
            id: 6
        } ],
        wishPicUrlShowList: [ {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        }, {
            url: ""
        } ],
        dangqianPic: ""
    },
    onShareAppMessage: function onShareAppMessage(res) {
        /*转发*/
        var that = this;
        var name = that.data.name;
        // that.setData({ share: true });
        // setTimeout(function(){
        //   that.setData({ share: false });
        // },500)
                var imageUrl = that.data.url;
        if (res.from === "button") {}
        var content = "";
        var id = parseInt(that.data.id);
        switch (id) {
          case 19:
            content = "新年快乐！" + name + "给您拜年啦，祝您吉祥如意！";
            break;

          case 18:
            content = "辞旧岁迎新春，" + name + "祝您阖家欢乐，幸福安康！";
            break;

          case 17:
            content = name + "祝您元宵节快乐，幸福美满！";
            break;

          case 16:
            content = "喜迎小年欢度新春，" + name + "祝您小年快乐！";
            break;

          case 15:
            content = "辞旧岁迎新春，" + name + "祝您心想事成，万事如意！";
            break;

          case 14:
            content = "新年快乐！" + name + "给您拜年啦，祝您鼠年大吉，吉祥如意！";
            break;

          case 13:
            content = "转发春节祝福，祝" + name + "辞旧迎新，成绩步步高！";
            break;

          case 12:
            content = "新春考神送福，逢考必过！祝" + name + "金榜题名！";
            break;

          case 11:
            content = "文昌星君送祝福，祝" + name + "前途平坦上好大学！";
            break;

          case 10:
            content = "转发新春祝福，逢考必过！祝" + name + "鱼跃龙门，一战功成！";
            break;

          case 9:
          case 8:
          case 7:
          case 1:
          case 5:
          case 4:
          case 2:
          case 1:
            content = "转发新春祝福，逢考必过！祝" + name + "金榜题名！";
            break;

          case 3:
            content = "转发新春祝福，逢考必过！祝" + name + "考出新高度，金榜题名！";
            break;
        }
        return {
            title: content,
            imageUrl: imageUrl,
            path: "/pages/ActiveWishCome/ActiveWishCome?showUrl=" + that.data.dangqianPic + "&wishName=" + name + "&id=" + id
        };
    },
    onLoad: function onLoad(options) {
        wx.showNavigationBarLoading();
        var that = this;
        // that.selectComponent("#navigationcustom").setNavigationAll("高考送祝福", true, true);
                if (options.showUrl && options.wishName) {
            that.setData({
                dangqianPic: options.showUrl,
                scrollFlag: false,
                name: options.wishName,
                url: options.showUrl
            });
        } else {
            that.setData({
                dangqianPic: that.data.wishPicUrlList[0].url
            });
        }
        if (options && options.id) {
            var wishPicUrlList = that.data.wishPicUrlList;
            for (var i = 0, j = wishPicUrlList.length; i < j; i++) {
                if (wishPicUrlList[i].id == options.id) {
                    that.setData({
                        id: options.id,
                        url: wishPicUrlList[i].url
                    });
                    break;
                }
            }
        }
        api.blessingCountOfStat("MiniProgram/Blessing/GetTotal", "POST").then(function(res) {
            that.setData({
                wishNum: parseInt(res.result)
            });
            wx.hideNavigationBarLoading();
        });
    },
    goHone: function goHone() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    chooseWishPic: function chooseWishPic(e) {
        wx.showLoading({
            title: "高考祝福生成中..."
        });
        var that = this;
        var id = 0;
        var mobanid = e.currentTarget.dataset.mobanid;
        var wishPicUrlList = that.data.wishPicUrlList;
        var url = e.currentTarget.dataset.url;
        that.setData({
            id: mobanid,
            url: url
        });
        for (var i = 0; i < wishPicUrlList.length; i++) {
            if (wishPicUrlList[i].id == mobanid) {
                wishPicUrlList[i].st = true;
                id = i;
            } else {
                wishPicUrlList[i].st = false;
            }
        }
        that.setData({
            wishPicUrlList: wishPicUrlList
        });
        var wishPicUrlShowList = that.data.wishPicUrlShowList;
        if (wishPicUrlShowList[mobanid - 1].url != "") {
            that.setData({
                dangqianPic: wishPicUrlShowList[mobanid - 1].url,
                wishPicUrlShowList: that.data.wishPicUrlShowList
            });
            wx.hideLoading();
        } else {
            that.loadWishImg(that.data.name, mobanid);
        }
    },
    closeInputName: function closeInputName() {
        this.setData({
            inputName: false
        });
    },
    openInputName: function openInputName() {
        this.setData({
            inputName: true
        });
    },
    getName: function getName(e) {
        if (e.detail.value.length > 0) {
            this.setData({
                nameBtnFlag: true
            });
        } else {
            this.setData({
                nameBtnFlag: false
            });
        }
        this.setData({
            name: e.detail.value
        });
    },
    blessingGenerateNo: function blessingGenerateNo() {},
    loadWishImg: function loadWishImg(name, templatesId) {
        var that = this;
        name = encodeURI(name);
        api.blessingGenerate("MiniProgram/Blessing/Generate?name=" + name + "&templatesId=" + templatesId, "POST").then(function(res) {
            if (res.isSuccess) {
                that.data.wishPicUrlShowList[templatesId - 1].url = res.result[0];
                that.setData({
                    scrollFlag: true,
                    dangqianPic: res.result[0],
                    showLoad: false,
                    wishPicUrlShowList: that.data.wishPicUrlShowList
                });
                wx.hideLoading();
            } else {
                that.setData({
                    showLoad: false
                });
                wx.showToast({
                    title: res.message,
                    icon: "none"
                });
            }
        });
    },
    blessingGenerate: function blessingGenerate() {
        var that = this;
        var name = that.data.name;
        var han = /^[\u4e00-\u9fa5]+$/;
        if (!han.test(name)) {
            wx.showToast({
                title: "请输入中文",
                icon: "none",
                duration: 2e3
            });
        } else {
            that.setData({
                inputName: false,
                showLoad: true
            });
            that.loadWishImg(name, that.data.wishPicUrlList[0].id);
        }
    },
    baocunImage: function baocunImage() {
        //保存相册
        var that = this;
        var url = that.data.dangqianPic;
        url = url.replace("http://", "https://");
        wx.getSetting({
            success: function success(res) {
                if (!res["scope.writePhotosAlbum"]) {
                    wx.authorize({
                        scope: "scope.writePhotosAlbum",
                        success: function success() {
                            wx.showLoading({
                                title: "正在下载图片"
                            });
                            wx.getImageInfo({
                                src: url,
                                success: function success(sres) {
                                    wx.saveImageToPhotosAlbum({
                                        filePath: sres.path,
                                        success: function success(fres) {
                                            wx.showToast({
                                                title: "保存成功",
                                                icon: "success",
                                                duration: 2e3
                                            });
                                        },
                                        fail: function fail() {
                                            wx.showToast({
                                                title: "保存图片失败",
                                                icon: "none",
                                                duration: 2e3
                                            });
                                            wx.hideLoading();
                                        }
                                    });
                                },
                                fail: function fail(res) {
                                    wx.showToast({
                                        title: "下载图片失败",
                                        icon: "none",
                                        duration: 2e3
                                    });
                                    wx.hideLoading();
                                }
                            });
                        }
                    });
                }
            }
        });
    },
    returnTap: function returnTap() {
        wx.navigateBack({
            delta: 1
        });
    }
});