var path = require('path');
var srcDir = path.join(__dirname, 'index.js');

require('blanket')({
  pattern: srcDir
});