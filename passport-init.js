var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user:',user._id);
        return done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
       User.findById(id, function(err, user) {
            console.log('deserializing user:',user.username);
            done(err, user);
        });
    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 

            User.findOne({ 'username' :  username }, function(err, user) {

                if(err){
                    return done(err, false);
                }

                if(!user){
                    return done('user not found', false);
                }

                if(!isValidPassword(user,password)){
                    return done('invalid password',false);
                }   

                return done(null, user);
            });
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            User.findOne({ 'username' :  username }, function(err, user) {

                if(err){
                    return done(err, false);
                }

                //check if user is already signed up
                if(user){
                    return done('username already taken', false);
                }

                //create new user
                var newUser = new User();

                newUser.username = username;
                newUser.password = createHash(password);

                newUser.save(function(err) {
                    if (err){
                        console.log('Error in Saving user: '+err);  
                        throw err;  
                    }
                    console.log(newUser.username + ' Registration succesful');    
                    return done(null, newUser);
                });
            });
        })
    );

    var isValidPassword = function(user, password){
        console.log("check");
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};