const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const admin = require('./model/admin');
const db = require('../database/mongoose');

module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(),
        opts.secretOrKey = db.secret
    passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
        admin.getUserById(jwt_payload.user._id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
                return done({
                    user: user,
                    jwtToken: token
                });
            } else {
                return done(null, false);
            }

        })
    }))

}