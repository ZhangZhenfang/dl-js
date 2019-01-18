class Perceptron {
    constructor(inputNum, activator) {
        this.activator = activator;
        this.weights = new Array(inputNum);
        for (var i = 0; i < this.weights.length; i++) {
            this.weights[i] = (Math.random() - 0.5) * 2;
        }
        console.log(this.weights);
    };

    train(rate, x, result, times) {
        for (var l = 0; l < times; l++) {
            var o;
            for (var i = 0; i < x.length; i++) {
                var tmp = 0;
                for (var j = 0; j < x[i].length; j++) {
                    tmp += x[i][j] * this.weights[j];
                }
                o = this.activator(tmp);
                for (var j = 0; j < this.weights.length; j++) {
                    this.weights[j] += rate * (result[i] - o) * x[i][j];
                }
            }
        }
        return this.weights;
    };
};