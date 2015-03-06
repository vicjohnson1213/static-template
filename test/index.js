var expect = require('chai').expect,
    sinon = require('sinon'),
    path = require('path'),
    rewire = require('rewire');

describe('static-template', function (argument) {
    var ss = rewire('../index'),
        pathMock, fsMock;

    function configurePathMock() {
        pathMock = {
            join: path.join
        };

        return pathMock;
    }

    function configureFsMock() {
        fsMock = {
            stat: function(url, callback) {
                expect(url).to.equal('/pat/originalUrl');
                callack(null, {
                    isDirectory: sinon.spy()
                })
            }
        };

        return fsMock;
    }

    beforeEach(function() {
        ss.__set__('path', configurePathMock());
        ss.__set__('fs', configureFsMock());
    });

    it('should render if a template file is found.', function() {
        var render = function(url, opts, callback) {
            expect(url).to.equal(path.normalize('/path/originalUrl'));
            callback(null, 'html here');
        }

        var req = {
            originalUrl: 'originalUrl'
        };

        var res = {
            render: render,
            end: sinon.spy()
        };

        var middleware = ss.staticTemplate('/path', { opts: 'opts' });

        middleware(req, res, function() { return; });

        expect(res.end.calledWith('html here')).to.be.true;
    });
});