const usersCtrl = {};

const passport = require('passport')

const User = require('../models/User');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup')
}

usersCtrl.signup = async (req, res) => {
    const errors = []
    const {name, email, password, confirm_password} = req.body;
    if (password != confirm_password) {
        errors.push({text: 'Passwords do not match.'});
    }
    if (password.length < 6){
        errors.push({text: 'Passwords must at least 6 characters.'});
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name, 
            email
        })
    } else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', 'The email is already in use.')
            res.redirect('/users/signup')
        } else {
            const newUser = new User({name, email, password})
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success_msg', 'You are Registered')
            res.redirect('/users/signin')
            
        }
    }
}

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin')
}

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
})


usersCtrl.logout = (req, res) => {
    
    req.logout( (err) => {

        if (err) { return next(err); }
        req.flash( "success_msg" , "Session cerrada" );
        res.redirect( "/users/signin" );

    });
}

module.exports = usersCtrl