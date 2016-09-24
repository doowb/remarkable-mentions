'use strict';

var Remarkable = require('remarkable');
var mentions = require('./');

var md = new Remarkable();
md.use(mentions({url: 'https://twitter.com'}));

var doc = `
# document

> This is a document containing some markdown and links @doowb

## Authors

 - @doowb
 - @jonschlinkert

## LICENSE

MIT
`;

var html = md.render(doc);

console.log(html);
