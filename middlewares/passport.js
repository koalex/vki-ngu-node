const passport = require('koa-passport');
passport.use('local', require('../strategies/local'));

module.exports = passport;