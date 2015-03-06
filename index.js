var path = require('path'),
    fs = require('fs');

exports.staticTemplate = function(views, opts) {
    var opts = opts || {};
    return function(req, res, next) {
        var url = path.join((views || 'views'), req.originalUrl);
        res.render(url, {}, function(err, html) {
            if (!err) {
                res.end(html);
            } else {
                fs.stat(url, function(errStat, stats) {
                    if (stats && stats.isDirectory()) {
                        res.render(path.normalize(url + '/index'), {}, function(errIndex, index) {
                            if (!errIndex) {
                                res.end(index);
                            } else {
                                return next();
                            }
                        });
                    } else {
                        return next();
                    }
                });
            }
        });
    };
};