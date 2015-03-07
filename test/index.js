var expect = require('chai').expect,
    sinon = require('sinon'),
    rewire = require('rewire');

describe('static-template', function (argument) {
    var ss = rewire('../index');

    beforeEach(function() {

    });

    it('should sendFile if .html', function() {
        var req = {
            originalUrl: 'someFile.html'
        };

        var res = {
            sendFile: sinon.spy(),
            render: sinon.spy()
        };

        var middleware = ss.staticTemplate('/path', { opts: 'opts' });
        middleware(req, res, function() { return; });

        expect(res.sendFile.calledWithExactly('a;sldfjk'));

    });

    it.only('should render if not html', function() {
        var req = {
            originalUrl: 'someFile'
        };

        var render = function(url, opts, callback) {
            callback(null, 'html');
        };

        var res = {
            sendFile: sinon.spy(),
            render: render,
            end: sinon.spy()
        };

        var middleware = ss.staticTemplate('/path', { opts: 'opts' });
        middleware(req, res, function() { return; });
    })

    // it('should render if a template file is found.', function() {
    //     var render = function(url, opts, callback) {
    //         expect(url).to.equal(path.normalize('/path/originalUrl'));
    //         callback(null, 'html here');
    //     }

    //     var req = {
    //         originalUrl: 'originalUrl'
    //     };

    //     var res = {
    //         render: render,
    //         end: sinon.spy()
    //     };

    //     var middleware = ss.staticTemplate('/path', { opts: 'opts' });

    //     middleware(req, res, function() { return; });

    //     expect(res.end.calledWith('html here')).to.be.true;
    // });
});