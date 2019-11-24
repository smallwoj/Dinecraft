function cbc(p, i, cb) {
    return function() {
        return cb(p, i);
    }
}

//function to map a value from one range to another
function map(value, start1, stop1, start2, stop2)
{
    var slope = 1.0 * (stop2 - start2) / (stop1 - start1);
    return start2 + slope * (value - start1);
}
