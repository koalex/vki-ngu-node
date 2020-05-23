const path = require('path');

module.exports = {
	staticRoot: path.join(process.cwd(), 'static'),
	secret: 'secretWord',
	mongoose: {
		uri: 'mongodb://localhost:27017',
		options: {
			dbName: 'nodejs',
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		}
	}
};