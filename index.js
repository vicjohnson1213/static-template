var path = require('path');

exports.staticTemplate = function(views, opts) {
    var opts = opts || {};
    return function(req, res, next) {
        url = path.join((views || 'views'), req.originalUrl);

        res.render(url, (opts.template || {}), function(err, html) {
            if (!err) {
                res.end(html);
            } else {
                res.render(path.join(url, 'index'), (opts.template || {}), function(indexErr, indexHtml) {
                    if (!indexErr) {
                        res.end(indexHtml);
                    } else {
                        next();
                    }
                });
            }
        });
    };
};