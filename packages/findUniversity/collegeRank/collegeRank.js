var _api = require("../api.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

// packages/findUniversity/collegeRank/collegeRank.js
var app = getApp();

Page({
    data: {
        rankName: [ "校友会", "武书连", "软科", "QS", "U.S.News" ],
        latestYear: 2019,
        currentTab: 0,
        xyhPn: 1,
        wslPn: 1,
        rkPn: 1,
        qsPn: 1,
        usPn: 1,
        XYHCollegeRankList: [],
        WSLCollegeRankList: [],
        MSCollegeRankList: [],
        QSCollegeRankList: [],
        USNCollegeRankList: [],
        collegeRankList: [],
        xyhFlag: false,
        wslFlag: false,
        rkFlag: false,
        qsFlag: false,
        usFlag: false
    },
    change: function change(e) {
        if (e.detail.source == "touch") {
            this.setData({
                currentTab: e.detail.current
            });
            switch (e.detail.current) {
              case 0:
                if (this.data.XYHCollegeRankList.length == 0) {
                    this.RankingsQuery(3);
                }
                ;
                break;

              case 1:
                if (this.data.WSLCollegeRankList.length == 0) {
                    this.RankingsQuery(1);
                }
                ;
                break;

              case 2:
                if (this.data.MSCollegeRankList.length == 0) {
                    this.RankingsQuery(2);
                }
                ;
                break;

              case 3:
                if (this.data.QSCollegeRankList.length == 0) {
                    this.RankingsQuery(5);
                }
                ;
                break;

              case 4:
                if (this.data.USNCollegeRankList.length == 0) {
                    this.RankingsQuery(4);
                }
                ;
                break;
            }
        }
    },
    rankTap: function rankTap(e) {
        var that = this;
        var currentTab = e.currentTarget.dataset.id;
        switch (currentTab) {
          case 0:
            if (this.data.XYHCollegeRankList.length == 0) {
                this.RankingsQuery(3);
            }
            ;
            break;

          case 1:
            if (this.data.WSLCollegeRankList.length == 0) {
                this.RankingsQuery(1);
            }
            ;
            break;

          case 2:
            if (this.data.MSCollegeRankList.length == 0) {
                this.RankingsQuery(2);
            }
            ;
            break;

          case 3:
            if (this.data.QSCollegeRankList.length == 0) {
                this.RankingsQuery(5);
            }
            ;
            break;

          case 4:
            if (this.data.USNCollegeRankList.length == 0) {
                this.RankingsQuery(4);
            }
            ;
            break;
        }
        that.setData({
            currentTab: currentTab
        });
    },
    RankingsQuery: function RankingsQuery(type) {
        var that = this;
        var pn = 1;
        var loadFlag = false;
        switch (type) {
          case 3:
            pn = that.data.xyhPn;
            loadFlag = that.data.xyhFlag;
            break;

          case 1:
            pn = that.data.wslPn;
            loadFlag = that.data.wslFlag;
            break;

          case 2:
            pn = that.data.rkPn;
            loadFlag = that.data.rkFlag;
            break;

          case 5:
            pn = that.data.qsPn;
            loadFlag = that.data.qsFlag;
            break;

          case 4:
            pn = that.data.usPn;
            loadFlag = that.data.usFlag;
            break;
        }
        if (loadFlag == false) {
            _api2.default.RankingsQuery("Colleges/Rankings/Query", "POST", type, pn).then(function(res) {
                if (res.result.items.length > 0) {
                    switch (type) {
                      case 3:
                        that.setData({
                            XYHCollegeRankList: that.data.XYHCollegeRankList.concat(res.result.items)
                        });
                        break;

                      case 1:
                        that.setData({
                            WSLCollegeRankList: that.data.WSLCollegeRankList.concat(res.result.items)
                        });
                        break;

                      case 2:
                        that.setData({
                            MSCollegeRankList: that.data.MSCollegeRankList.concat(res.result.items)
                        });
                        break;

                      case 5:
                        that.setData({
                            QSCollegeRankList: that.data.QSCollegeRankList.concat(res.result.items)
                        });
                        break;

                      case 4:
                        that.setData({
                            USNCollegeRankList: that.data.USNCollegeRankList.concat(res.result.items)
                        });
                        break;
                    }
                } else {
                    switch (type) {
                      case 3:
                        that.setData({
                            xyhFlag: true
                        });
                        break;

                      case 1:
                        that.setData({
                            wslFlag: true
                        });
                        break;

                      case 2:
                        that.setData({
                            rkFlag: true
                        });
                        break;

                      case 5:
                        that.setData({
                            qsFlag: true
                        });
                        break;

                      case 4:
                        that.setData({
                            usFlag: true
                        });
                        break;
                    }
                }
            });
        }
    },
    // 校友会下拉加载
    scrolltolower: function scrolltolower(e) {
        var that = this;
        var currentTab = that.data.currentTab;
        switch (currentTab) {
          case 0:
            that.setData({
                xyhPn: that.data.xyhPn + 1
            });
            that.RankingsQuery(3);
            break;

          case 1:
            that.setData({
                wslPn: that.data.wslPn + 1
            });
            that.RankingsQuery(1);
            break;

          case 2:
            that.setData({
                rkPn: that.data.rkPn + 1
            });
            that.RankingsQuery(2);
            break;

          case 3:
            that.setData({
                qsPn: that.data.qsPn + 1
            });
            that.RankingsQuery(5);
            break;

          case 4:
            that.setData({
                usPn: that.data.usPn + 1
            });
            that.RankingsQuery(4);
            break;
        }
    },
    onLoad: function onLoad(options) {
        var that = this;
        that.selectComponent("#navigationcustom").setNavigationAll("大学排名", true);
        that.RankingsQuery(3);
    }
});