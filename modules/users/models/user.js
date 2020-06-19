const mongoose = require('../../../lib/mongoose');
const crypto = require('crypto');

const emailValidator = {
	validator: email => {
		const emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return Promise.resolve(emailRE.test(email));
	},
	message: 'Невалидный email'
};

const userSchema = new mongoose.Schema({
	active: { type: Boolean, default: false },
	first_name: { type: String, required: [true, 'Укажите имя'], trim: true },
	last_name: { type: String, required: [true, 'Укажите фамилию'], trim: true },
	age: { type: Number, min: 18, max: 120 },
	email: {
		type: String,
		unique: true,
		required: [true, 'Укажите email'],
		trim: true,
		lowercase: true, // TEST@MAIL.COM -> test@mail.com
		validate: emailValidator
	},
	role: {},
	password_hash: { type: String, required: true },
	salt: { type: String, required: true },
	email_validation_token: { type: String },
}, {
	id: false,
	versionKey: false,
});

userSchema.virtual('password')
	.set(function(password) {
		if (!password || !String(password).trim()) {
			this.invalidate('password', 'Пустой пароль');
			return;
		}
		if (String(password).trim().length < 5) {
			this.invalidate('password', 'Пароль должен содержать минимум 3 символа');
			return;
		}
		this._password = password;
		this.salt = crypto.randomBytes(256).toString('base64');
		this.password_hash = crypto.pbkdf2Sync(password, this.salt, 100, 100, 'sha512');
	})
	.get(function() {
		return this._password;
	});

userSchema.methods.checkPassword = function(password) {
	if (!password || !String(password).trim() || !this.password_hash) return false;
	return String( crypto.pbkdf2Sync(password, this.salt, 100, 100, 'sha512') ) === this.password_hash;
}

userSchema.virtual('full_name').get(function() {
	return `${this.first_name} ${this.last_name}`;
});

userSchema.methods.toJSON = function(opts) {
	const user = this.toObject(opts);
	delete user.salt;
	delete user.password_hash;
	delete user.email_validation_token;
	return user;
}

module.exports = mongoose.model('User', userSchema);
