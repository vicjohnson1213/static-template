var expect = require('chai').expect,
    sinon = require('sinon'),
    path = require('path'),
    ss = require('../index.js');

describe('static-template', function (argument) {
    it('should render on first try if no error', function(done) {
        var req = {
            originalUrl: 'someFile'
        };

        var render = function(url, opts, callback) {
            expect(url).to.equal(path.join('/path', 'someFile'));
            expect(opts).to.be.empty;
            callback(null, 'html');
        };

        var res = {
            render: render,
            end: function(text) {
                expect(text).to.equal('html');
                done();
            },
            writeHead: sinon.spy()
        };

        var middleware = ss.staticTemplate('/path', { otherOpts: 'opts' });
        middleware(req, res, function() { return; });
    });

    it('should render from template dir', function(done) {
        var req = {
            originalUrl: 'someFile'
        };

        var render = function(url, opts, callback) {
            expect(url).to.equal(path.join('/path', 'someFile'));
            expect(opts).to.equal('opts template');
            callback(null, 'html');
        };

        var res = {
            render: render,
            end: function(text) {
                expect(text).to.equal('html');
                done();
            },
            writeHead: sinon.spy()
        };

        var middleware = ss.staticTemplate('/path', { templateOpts: 'opts template' });
        middleware(req, res, function() { return; });


    });

    it('should try to render an index file if first render failed', function(done) {
        var req = {
            originalUrl: 'someDir'
        };

        var res = {
            render: function() {},
            end: function(text) {
                expect(text).to.equal('html render 2');
                done();
            },
            writeHead: sinon.spy()
        };

        sinon.stub(res, "render")
            .onFirstCall().callsArgWith(2, 'was a dir', null)
            .onSecondCall().callsArgWith(2, null, 'html render 2');

        var middleware = ss.staticTemplate('/path', { templateOpts: 'opts template' });
        middleware(req, res, function() { return; });
    });

    it('should call next if no file or dir', function(done) {
        var req = {
            originalUrl: 'someDir'
        };

        var res = {
            render: function() {},
            writeHead: sinon.spy()
        };

        sinon.stub(res, "render")
            .onFirstCall().callsArgWith(2, 'was a dir', null)
            .onSecondCall().callsArgWith(2, 'doesn\'t exist');

        var middleware = ss.staticTemplate('/path', { templateOpts: 'opts template' });
        middleware(req, res, function() { return done(); });
    });
});