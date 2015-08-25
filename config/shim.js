// This file is not used anymore - "browser" entry in package.json is enough

// Removed from in package.json
// "browserify": {
// 	"transform": "browserify-shim"
// },
// "browserify-shim": {
// 	"md5": "md5"
// },
// "browserify-shim": "./config/shim.js"

module.exports = {
    '../front/libs/md5.js': { exports: 'md5' }
};
