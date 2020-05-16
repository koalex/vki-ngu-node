const bunyan = require('bunyan');

const logger = bunyan.createLogger({
	name: 'Имя нашего приложения',
	streams: [
		{
			level: 'fatal',
			path: __dirname + '/../logs/errors.log'
		},
		{
			level: 'error',
			path: __dirname + '/../logs/errors.log'
		}
	]
});

module.exports = logger;