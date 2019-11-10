function cbc(p, i, cb) {
    return function() {
        return cb(p, i);
    }
}


