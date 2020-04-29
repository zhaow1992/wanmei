// packages/userSystem/questionFeedBack/questionFeedBack.js
var api = require("./../api.js");

Page({
    /**
   * 页面的初始数据
   */
    chooseCount: "3",
    data: {
        question: "使用疑问",
        addStatus: true,
        description: "",
        questionList: [ "使用疑问", "功能故障", "数据错误", "提建议" ],
        /**["http://sinastorage.com/kaoshi.edu.sina.com.cn/college_photo/10697.jpg", "http://sinastorage.com/kaoshi.edu.sina.com.cn/college_photo/10697.jpg", "http://sinastorage.com/kaoshi.edu.sina.com.cn/college_photo/10697.jpg"] */
        pictureList: []
    },
    deletePicture: function deletePicture(e) {
        var that = this;
        var id = e.currentTarget.id;
        var pictureList = that.data.pictureList;
        pictureList.splice(id, 1);
        var tmpData = {
            pictureList: pictureList,
            addStatus: true
        };
        if (pictureList.legth > 3) {
            tmpData.addStatus = false;
        }
        that.setData(tmpData);
    },
    insertTap: function insertTap() {
        var that = this;
        if (this.data.description != "") {
            wx.showLoading({});
            //content, userId, contactTel
                        var content = "问题类型：" + this.data.question + "---问题描述：" + this.data.description + "---反馈图：" + this.data.pictureList.join(",");
            that.insertFeedback(content, that.userInfo.numId, that.userInfo.MobilePhone);
        } else {
            wx.showToast({
                title: "请填写问题描述",
                icon: "none"
            });
        }
    },
    inputText: function inputText(e) {
        this.setData({
            description: e.detail.value
        });
    },
    showQuestion: function showQuestion() {
        this.selectComponent("#framequestion").showFrame();
    },
    questionTap: function questionTap(e) {
        var that = this;
        var id = e.currentTarget.id;
        this.selectComponent("#framequestion").hideFrame();
        that.setData({
            question: that.data.questionList[id]
        });
    },
    //framequestion
    insertFeedback: function insertFeedback(content, userId, contactTel) {
        var that = this;
        api.insertFeedback("AboutUs/Feedback/Insert", "POST", content, userId, contactTel).then(function(res) {
            wx.hideLoading();
            wx.showToast({
                title: "我们已收到您的反馈，感谢您的意见！",
                icon: "none",
                duration: 1500
            });
            setTimeout(function() {
                wx.navigateBack({
                    detal: 1
                });
            }, 1500);
        });
    },
    addPicture: function addPicture() {
        var that = this;
        var pictureList = that.data.pictureList;
        that.chooseCount = 3 - pictureList.length;
        wx.chooseImage({
            count: that.chooseCount,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                var tmpData = {
                    pictureList: pictureList
                };
                if (tmpData.pictureList.length < 3) {
                    //let addStatus
                    tmpData.pictureList.push(tempFilePaths);
                    if (tmpData.pictureList.length >= 3) {
                        tmpData.addStatus = false;
                    }
                    that.setData(tmpData);
                }
            }
        });
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {
        var that = this;
        that.userInfo = wx.getStorageSync("userInfo")[0];
        that.selectComponent("#navigationcustom").setNavigationAll("问题反馈", true);
    }
});