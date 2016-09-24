'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var Remarkable = require('remarkable');
var mentions = require('../');

var md;

describe('remarkable-mentions', function() {
  beforeEach(function() {
    md = new Remarkable();
  });

  it('should export a function', function() {
    assert.equal(typeof mentions, 'function');
  });

  it('should transform @ mentions into links', function() {
    md.use(mentions());
    assert.equal(md.render('@doowb'), '<p><a href="https://github.com/doowb">@doowb</a></p>\n');
  });

  it('should transform @ mentions into links using a custom url', function() {
    md.use(mentions({url: 'https://twitter.com'}));
    assert.equal(md.render('@doowb'), '<p><a href="https://twitter.com/doowb">@doowb</a></p>\n');
  });

  describe('integration', function() {
    beforeEach(function() {
      md = new Remarkable();
      md.use(mentions());
    });

    var fixtures = fs.readdirSync(path.join(__dirname, 'fixtures'));
    fixtures.forEach(function(filename) {
      filename = path.basename(filename, path.extname(filename));
      var name = filename;
      var not = '';
      if (name.indexOf('not-') === 0) {
        not = 'not ';
        name = name.slice(4);
      }

      it(`should ${not}transform @ mentions in ${name}`, function() {
        var input = fs.readFileSync(path.join(__dirname, 'fixtures', filename + '.md'), 'utf8');
        var expected = fs.readFileSync(path.join(__dirname, 'expected', filename + '.html'), 'utf8');
        assert.equal(md.render(input), expected);
      });
    });
  });
});
