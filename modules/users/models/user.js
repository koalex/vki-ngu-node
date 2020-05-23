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
	password_hash: { type: String, required: true },
	salt: { type: String, required: true },
}, {
	id: false,
	versionKey: false,
});

userSchema.virtual('passwordConfirmation')
	.set(function(v) {
		this._passwordConfirmation = v;
	})
	.get(function() {
		return this._passwordConfirmation;
	});

userSchema.virtual('password')
	.set(function(password) {
		if (!password || !String(password).trim()) {
			return this.invalidate('password', 'Пустой пароль');
		}
		this._password = password;
		this.salt = crypto.randomBytes(256).toString('base64');
		this.password_hash = crypto.pbkdf2Sync(password, this.salt, 500, 512, 'sha512');
	})
	.get(function() {
		return this._password;
	});

userSchema.methods.checkPassword = function(password) {
	if (!password || !String(password).trim() || !this.password_hash) return false;
	return String( crypto.pbkdf2Sync(password, this.salt, 500, 512, 'sha512') ) === this.password_hash;
}

userSchema.virtual('full_name').get(function() {
	return `${this.first_name} ${this.last_name}`;
});

userSchema.methods.toJSON = function(opts) {
	const user = this.toObject(opts);
	delete user.salt;
	delete user.password_hash;
	return user;
}

module.exports = mongoose.model('User', userSchema);
