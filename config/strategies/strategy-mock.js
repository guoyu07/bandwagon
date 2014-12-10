/**
 * Author: Michael Weibel <michael.weibel@gmail.com>
 * License: MIT
 */
'use strict';

var passport = require('passport')
    , util = require('util');
/*

function StrategyMock(options, verify) {
    this.name = 'mock';
    this.passAuthentication = options.passAuthentication || true;
    this.userId = options.userId || 1;
    this.verify = verify;
}

util.inherits(StrategyMock, passport.Strategy);

StrategyMock.prototype.authenticate = function authenticate(req) {
    if (this.passAuthentication) {
        var user = {
                id: this.userId
            }
            , self = this;
        this.verify(user, function(err, resident) {
            if(err) {
                self.fail(err);
            } else {
                self.success(resident);
            }
        });
    } else {
        this.fail('Unauthorized');
    }
};

module.exports = StrategyMock;
    */

module.exports = function() {
    'use strict';

    var _ = require('underscore');

    module.exports = function(passport, users) {

        var TestStrategy = require('./strategy')(passport).Strategy;

        function verify(id, done) {
            var user = _.findWhere(users, {id: Number(id)});
            var info = user ? null : 'User not found';
            done(null, user || false, info);
        }

        function PassportMock(app, options) {
            passport.use(new TestStrategy(options, verify));
            passport.serializeUser(function(user, done) { done(null, user.id); });
            passport.deserializeUser(function(id, done) { done(null, _.findWhere(users, {id: Number(id)})); });

            app.get('/login/test/:user', passport.authenticate('test'), function(req, res) {
                res.send(req.user);
            });
            return app;
        }

        return PassportMock;
    };

};