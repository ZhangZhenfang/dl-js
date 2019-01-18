function sgn(x, weights) {
    var result = 0;
    for (var i = 0; i < x.length; i++) {
        result += x[i] * weights[i];
    }
    return result >= 0 ? 1 : -1;
}
function linerActivator(x) {
    return x;
}