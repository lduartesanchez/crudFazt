const usersCtrl = {};

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
            req.flash('error-msg', 'The email is already in use.')
            res.redirect('/users/signup')
        } else {
            const newUser = new User({name, email, password})
            await newUser.save()
            res.redirect('/users/signin')
            
        }
    }
}

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin')
}

usersCtrl.signin = (req, res) => {
    res.send('Signin')
}


usersCtrl.logout = (req, res) => {
    res.send('logout')
}

module.exports = usersCtrl