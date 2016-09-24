'use strict';

var extend = require('extend-shallow');
var toMention = require('to-mention-link');

/**
 * Remarkable plugin that will turn all @ mentions into a link.
 * This is done just after block tokenizing to ensure that the inline blocks are transformed before links are transformed.
 * This also ensures that @ mentions inside code blocks are not transformed.
 *
 * ```js
 * var md = new Remarkable();
 * md.use(mentions());
 * var html = md.render(markdown);
 * ```
 * @param  {Object} `options` Options to control how the @ mentions are transformed. See [to-mention-link][] for more options.
 * @param  {String} `options.url` Customize the url that is used in the links. Defaults to "https://github.com".
 * @return {Function} Remarkable plugin function that can be passed to the `.use` method.
 * @api public
 */

module.exports = function mentions(options) {
  var opts = extend({}, options);
  return function(md) {
    md.core.ruler.after('block', 'mentions', parser(md, opts), {alt: []})
  };
};

function parser(md, options) {
  return function(state) {
    var tokens = state.tokens;
    var len = tokens.length, i = -1;
    while(++i < len) {
      var token = tokens[i];
      if (token.type === 'inline' && token.content) {
        token.content = toMention(token.content, options);
      }
    }
  };
}
