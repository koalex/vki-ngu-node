const config = require('config');
const mongoose = require('mongoose');
const log = require('./logger').child({level: 'fatal'});

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoose.uri, config.mongoose.options).catch(err => {
	console.error(err);
	log.fatal(err);
});

mongoose.connection.on('connected', () => {
	console.info('ПОДКЛЮЧЕНИЕ К БД УСТАНОВЛЕНО');
});

mongoose.connection.on('error', console.error);

module.exports = mongoose;