Component({
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
                wx.setStorageSync("zyyx", {
                    name: item.name,
                    majorcode: item.majorCode
                });
                wx.navigateBack();
                break;
            }
        }
    }
});