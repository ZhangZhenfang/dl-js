var weight;

var rate;

function randomWeight(l) {
    weight = new Array(l);
    for (var i = 0; i < weight.length; i++) {
        weight[i] = (Math.random() - 0.5) * 2;
    }
}

function train(rate, x, result, times) {
    randomWeight(x[0].length);
    for (var l = 0; l < times; l++) {
        var o = new Array(x.length);
        for (var i = 0; i < o.length; i++) {
            o[i] = sgn(x[i]);
        }
        for (var i = 0; i < o.length; i++) {
            for (var j = 0; j < weight.length; j++) {
                weight[j] += rate * (result[i] - o[i]) * x[i][j];
            }
        }

    }
    return weight;
}

function sgn(x) {
    var result = 0;
    for (var i = 0; i < x.length; i++) {
        result += x[i] * weight[i];
    }
    return result >= 0 ? 1 : -1;
}

function test() {
    var x = [[4, 3, 1], [5, 4, 1], [4, 5, 1], [1, 1, 1], [2, 1, 1], [3, 2, 1]];
    var result = [1, 1, 1, -1, -1, -1];
    console.log(x);
    console.log(result);
    train(0.1, x, result, 500);
    console.log(sgn([1, 3, 1]));
    console.log(sgn([3, 1, 1]));
}
test();

// randomWeight(5);
// console.log(weight);