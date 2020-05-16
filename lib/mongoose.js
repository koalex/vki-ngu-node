const config = require('config');
const mongoose = require('mongoose');
const log = require('./logger').child({level: 'fatal'});

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoose.uri, config.mongoose.options).catch(err => {
	log.fatal(err);
});

mongoose.connection.on('connected', () => {
	console.info('ПОДКЛЮЧИЛИСЬ К БД');
});

mongoose.connection.on('error', err => {
	console.error(err);
});

module.exports = mongoose;