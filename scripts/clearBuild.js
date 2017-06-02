var fs = require('fs');
var remove = require('remove');
var paths = './paths';

if (fs.existsSync(paths.build)) {
  remove.removeSync(paths.build);
}
