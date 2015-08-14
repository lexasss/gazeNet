// Created same object 'config' as defined in package.json

var env = process.env;

var config = { };

for (var prop in env) {
	if (prop.indexOf('npm_package_config_') === 0) {
		var parts = prop.split('_');
		var obj = config;
		for (var i = 3; i < parts.length; i++) {
			if (obj[parts[i]] === undefined) {
				obj[parts[i]] = i === (parts.length - 1) ? env[prop] : { };
			}
			obj = obj[parts[i]];
		}
	}
}

module.exports = config;
