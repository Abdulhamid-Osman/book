const passport = require("passport");
require("./strategis/local.strategy")();

const passportConfig = (app) =>{
    app.use(passport.initialize());
    app.use(passport.session());
    //store user in session
    passport.serializeUser((user, done)=>{
        done(null, user)
    });
    //retrieve user from session
    passport.deserializeUser((user, done)=>{
        done(null, user);
    });
}

module.exports = passportConfig;