var env = process.env.NODE_ENV;
var config;

console.log('Server mode:', env);

switch (env) {
	case "DEV":
		config = require("./env/development");
		break;
	case "QA":
		config = require("./env/qa");
		break;
	case "STAGE":
		config = require("./env/staging");
		break;
	case "PROD":
		config = require("./env/production");
		break;
	case "TEST":
		config = require("./env/test");
		break;
	case "TLV":
		config = require("./env/tlv");
		break;
	default:
		config = require("./env/local");
		break;
}

exports.config = config;