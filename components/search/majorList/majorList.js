// components/search/majorList/majorList.js
Component({
    /**
   * 组件的属性列表
   */
    properties: {
        majorList: {
            type: Array,
            value: []
        },
        majorListType: {
            type: String,
            value: ""
        }
    },
    /**
   * 组件的初始数据
   */
    data: {},
    /**
   * 组件的方法列表
   */
    methods: {
        choseMajor: function choseMajor(e) {
            var item = e.currentTarget.dataset.item;
            switch (this.data.majorListType) {
              case "choseSubject":
                wx.navigateTo({
                    url: "/packages/chooseSubjects/majorResult/majorResult?code=" + item.majorCode
                });
                break;

              case "firstMajor":
                wx.setStorageSync("zyyx", item.name);
                wx.navigateBack();
                break;
            }
        }
    }
});