var path = require('path');

function sendHtml(req, res, next, url) {
    console.log('sending:', url);
    res.sendfile(url, {}, function(err) {
        console.log(err);
        if (err) {
            next();
        }
    });
}

exports.staticTemplate = function(views, opts) {
    var opts = opts || {};
    return function(req, res, next) {
        url = path.join((views || 'views'), req.originalUrl);
        console.log(url);
        if (url.slice(-5) === '.html') {
            sendHtml(req, res, next, url);
            return;
        };

        res.render(url, {}, function(err, html) {
            if (!err) {
                console.log('rendering early:', html);
                res.end(html);
            } else {
                console.log('about to render:', path.join(url, 'index'));
                res.render(path.join(url, 'index'), function(indexErr, indexHtml) {
                    console.log('rendering:', path.join(url, 'index'));
                    if (!indexErr) {
                        res.end(indexHtml);
                    } else {
                        sendHtml(path.join(url, 'index.html'));
                    }
                });
            }
        });
    };
};