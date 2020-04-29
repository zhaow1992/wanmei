Page({
    data: {
        isBOrZ: 0,
        introduction: "",
        objective: "",
        requirement: "",
        subjectRequirement: "",
        loreAndAbility: "",
        internship: "",
        careerCredentials: "",
        famousScholar: ""
    },
    onLoad: function onLoad(options) {
        var that = this;
        var isBOrZ = options.isborz;
        var temData = {};
        switch (parseInt(isBOrZ)) {
          case 0:
            that.selectComponent("#navigationcustom").setNavigationAll("培养目标、培养要求、学科要求", true);
            temData.famousScholar = options.famousScholar;
            temData.introduction = options.introduction;
            temData.objective = options.objective;
            temData.requirement = options.requirement;
            temData.subjectRequirement = options.subjectRequirement;
            temData.loreAndAbility = options.loreAndAbility;
            temData.isBOrZ = isBOrZ;
            that.setData(temData);
            break;

          case 1:
            that.selectComponent("#navigationcustom").setNavigationAll("主要职能、实习实训、学科内容", true);
            temData.objective = options.objective;
            temData.loreAndAbility = options.loreAndAbility;
            temData.internship = options.internship;
            temData.careerCredentials = options.careerCredentials;
            temData.isBOrZ = isBOrZ;
            that.setData(temData);
            break;
        }
    }
});