/*
 * static-template
 * An Express middleware to serve the contents a directory through a templating engine
 *
 * Copyright (c) Victor Johnson
 */

var path = require('path'),
    merge = require('merge');

exports.staticTemplate = function(views, opts) {
    var options = merge({
        serveDirs: true
    }, opts);
    
    return function(req, res, next) {
        url = path.join((views || 'views'), req.originalUrl);

        res.render(url, (options.templateOpts || {}), function(err, html) {
            if (!err) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html);
            } else {
                if (options.serveDirs) {
                    res.render(path.join(url, 'index'), (options.templateOpts || {}), function(indexErr, indexHtml) {
                        if (!indexErr) {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(indexHtml);
                        } else {
                            next();
                        }
                    });
                } else {
                    next();
                }
            }
        });
    };
};