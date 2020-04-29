Component({
    options: {
        multipleSlots: true
    },
    properties: {
        size: {
            //圆环宽高-直径
            type: Number,
            value: 164
        },
        borderWidth: {
            //圆环粗细
            type: Number,
            value: 4
        },
        bgColorFrom: {
            //进度渐变色-起始色
            type: String,
            value: "#FF7573"
        },
        bgColorTo: {
            //进度渐变色-终止色
            type: String,
            value: "#FFBE9B"
        },
        progress: {
            //进度0-100
            type: Number,
            value: 30
        }
    },
    data: {
        circlePath: "",
        progressNum: 0
    },
    ready: function ready() {
        this.drawCircle();
    },
    methods: {
        //绘制圆环进度
        drawCircle: function drawCircle() {
            var that = this;
            var step = .02 * this.data.progress;
            var w = parseInt(this.data.borderWidth);
            var x = this.data.size / 750 * wx.getSystemInfoSync().windowWidth / 2;
            var context = wx.createCanvasContext("circle", this);
            context.setLineWidth(w);
            context.setStrokeStyle("#d8d8d8");
            context.setLineCap("round");
            context.beginPath();
            context.arc(x, x, x - w, 0, 2 * Math.PI, false);
            context.stroke();
            // 设置渐变
                        var gradient = context.createLinearGradient(2 * x, x, 0);
            gradient.addColorStop("0", this.data.bgColorFrom);
            gradient.addColorStop("1", this.data.bgColorTo);
            context.setLineWidth(w);
            context.setStrokeStyle(gradient);
            context.setLineCap("round");
            context.beginPath();
            var end = 1.5 * Math.PI;
            var progressNum = 0;
            loop(end, progressNum);
            function loop(end, progressNum) {
                if (end < step * Math.PI + 1.5 * Math.PI) {
                    end += step * Math.PI / 50;
                    progressNum += that.data.progress / 50;
                    that.setData({
                        progressNum: Math.floor(progressNum)
                    });
                    if (end > step * Math.PI + 1.5 * Math.PI) {
                        end = step * Math.PI + 1.5 * Math.PI;
                        that.setData({
                            progressNum: Math.floor(that.data.progress)
                        });
                    }
                    setTimeout(function() {
                        context.arc(x, x, x - w, 1.5 * Math.PI, end, false);
                        context.stroke();
                        context.draw(true);
                        loop(end, progressNum);
                    }, 20);
                } else {
                    return;
                }
            }
        }
    }
});