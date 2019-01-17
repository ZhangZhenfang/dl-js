class twoDCoordinate {
    /**
     * 二维坐标系
     * @param {画布宽} width 
     * @param {画布高} height 
     * @param {*} x 
     * @param {*} y 
     */
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.canvas.setAttribute("height", height);
        this.canvas.setAttribute("width", width);
        this.rect = this.canvas.getBoundingClientRect();
        // 坐标轴距离画布上右下左的边距
        this.padding = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        };
        // 求坐标轴原点的坐标
        this.origin = {
            x: this.padding.left,
            y: this.canvas.height - this.padding.bottom
        };
    };

    /**
     * 获取DOM元素
     */
    getDomElement() {
        this.drawXY();
        return this.canvas;
    };
    
    /**
     * 将坐标系里的xy坐标转换为在画布里的坐标
     * @param {坐标系里的x坐标} x 
     * @param {坐标系里的y坐标} y 
     */
    convertToCanvas(x, y) {
        return {x : x + this.padding.left, y : this.origin.y - y};
    };

    /**
     * 将画布里的坐标转换为坐标系里的坐标
     * @param {画布里的x坐标} x 
     * @param {画布里的y坐标} y 
     */
    convertToXY(x, y) {
        return {x : x - this.padding.left, y : this.origin.y - y};
    };

    /**
     * 获取鼠标点击在坐标系里的xy坐标
     * @param {鼠标点击事件} event 
     */
    getMouseXY(event) {
        var rect = this.canvas.getBoundingClientRect();
        var point = {x : event.clientX - rect.left, y : event.clientY - rect.top};
        return this.convertToXY(point.x, point.y);
    };

    /**
     * 在坐标系里画线，从start到end
     * @param {起点} start 
     * @param {终点} end 
     */
    drawLine(start, end) {
        console.log(start, end);
        var startPoint = this.convertToCanvas(start.x, start.y);
        var endPoint = this.convertToCanvas(end.x, end.y);
        console.log(startPoint, endPoint);
        this.ctx.beginPath();
        this.ctx.moveTo( startPoint.x, startPoint.y );
        this.ctx.lineTo( endPoint.x, endPoint.y );
        this.ctx.stroke();
    };

    /**
     * 在坐标系里画点
     * @param {x坐标} x 
     * @param {y坐标} y 
     * @param {颜色，1对应红色，-1对应蓝色} color 
     */
    drawPoint(x, y, color) {
        var ctx = this.canvas.getContext('2d');
        var point = this.convertToCanvas(x, y);
        ctx.fillStyle = color == 1 ? "red" : "blue";
        ctx.fillRect(point.x - 2, point.y - 2, 4, 4);
        ctx.font = "10px bold 宋体";
        ctx.fillText("(" + x + ", " + y + ")", point.x, point.y);
    };

    /**
     * 画X轴和Y轴以及箭头
     */
    drawXY() {
        // 坐标轴中箭头的宽和高
        var arrow = {
            width: 12,
            height: 12
        }
        // 求坐标轴y轴上顶点的坐标
        var vertexTop = {
            x: this.padding.left,
            y: this.padding.top
        }
        // 求坐标轴x轴右顶点的坐标
        var vertexRight = {
            x: this.canvas.width - this.padding.right,
            y: this.canvas.height - this.padding.bottom
        }
        // 画坐标轴中的两条线
        this.ctx.beginPath();
        this.ctx.moveTo( vertexTop.x, vertexTop.y );
        this.ctx.lineTo( this.origin.x, this.origin.y );
        this.ctx.lineTo( vertexRight.x, vertexRight.y );
        this.ctx.stroke();
        // 画上顶点箭头
        this.ctx.beginPath();
        this.ctx.moveTo( vertexTop.x, vertexTop.y );
        this.ctx.lineTo( vertexTop.x - arrow.width / 2, vertexTop.y + arrow.height );
        this.ctx.moveTo( vertexTop.x, vertexTop.y );
        this.ctx.lineTo( vertexTop.x + arrow.width / 2, vertexTop.y + arrow.height );
        this.ctx.stroke();
        // 画右顶点箭头
        this.ctx.beginPath();
        this.ctx.moveTo( vertexRight.x, vertexRight.y );
        this.ctx.lineTo( vertexRight.x - arrow.height, vertexRight.y - arrow.width / 2 );
        this.ctx.moveTo( vertexRight.x, vertexRight.y );
        this.ctx.lineTo( vertexRight.x - arrow.height, vertexRight.y + arrow.width / 2 );
        this.ctx.stroke();
    };
};