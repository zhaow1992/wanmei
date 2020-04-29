Page({
    data: {
        url: ""
    },
    onLoad: function onLoad(options) {
        var url = "";
        var id = null;
        var isApp = false;
        if (options && options.url && options.id) {
            url = options.url;
            id = options.id;
            url = url.replace("http://", "https://");
            url += "?id=" + id;
        } else if (options && options.url && options.isApp) {
            url = options.url;
            isApp = options.isApp;
            url = url.replace("http://", "https://");
            url += "?isApp=" + isApp;
        } else {
            url = options.url;
        }
        this.setData({
            url: url
        });
    }
});