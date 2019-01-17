
var weight;
var rate;
var inited = 0;
function randomWeight(l) {
    if (inited == 0) {
        weight = new Array(l);
        for (var i = 0; i < weight.length; i++) {
            weight[i] = (Math.random() - 0.5) * 2;
        }
        inited = 1;
    }
}

function train(rate, x, result, times) {
    randomWeight(x[0].length);
    for (var l = 0; l < times; l++) {
        var o;
        for (var i = 0; i < x.length; i++) {
            o = sgn(x[i]);
            for (var j = 0; j < weight.length; j++) {
                weight[j] += rate * (result[i] - o) * x[i][j];
            }
        }
    }
    return weight;
}
function oneTrain(rate, x, result) {
    if (inited == 0) {
        randomWeight(x[0].length);
    }
    var o;
    for (var i = 0; i < x.length; i++) {
        o = sgn(x[i]);
        for (var j = 0; j < weight.length; j++) {
            weight[j] += rate * (result[i] - o) * x[i][j];
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