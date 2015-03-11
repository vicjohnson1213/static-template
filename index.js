var path = require('path');

exports.staticTemplate = function(views, opts) {
    var options = opts || {};
    return function(req, res, next) {
        url = path.join((views || 'views'), req.originalUrl);

        res.render(url, (options.templateOpts || {}), function(err, html) {
            if (!err) {
                res.end(html);
            } else {
                res.render(path.join(url, 'index'), (options.templateOpts || {}), function(indexErr, indexHtml) {
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