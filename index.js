var path = require('path');

exports.staticTemplate = function(views, opts) {
    var options = opts || {};
    return function(req, res, next) {
        url = path.join((views || 'views'), req.originalUrl);

        res.render(url, (options.templateOpts || {}), function(err, html) {
            if (!err) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html);
            } else {
                res.render(path.join(url, 'index'), (options.templateOpts || {}), function(indexErr, indexHtml) {
                    if (!indexErr) {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(indexHtml);
                    } else {
                        next();
                    }
                });
            }
        });
    };
};