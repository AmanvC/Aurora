const User = require('../models/user');
const Questions = require('../models/question');
const nodeMailer = require('../mailers/user_verification_mailer');

module.exports.login = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.render('login')
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/home');
    }
    return res.render('signup');
}

module.exports.createUser = async function(req, res){
    try{
        if(req.body.email != req.body.re_email){
            req.flash('error', 'Emails do not match!');
            console.log('Emails do not match!!');
            return res.redirect('back');
        }
        if(req.body.password != req.body.re_password){
            req.flash('error', 'Passwords do not match!');
            console.log('Passwords do not match!!');
            return res.redirect('back');
        }
        const user = await User.findOne({email: req.body.email});
        // console.log(user)
        if(user){
            req.flash('error', 'Email ID already exists, please login to continue!');
            console.log('User is already registered');
            return res.redirect('back');
        }

        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let token = '';
        for (let i = 0; i < 25; i++) {
            token += characters[Math.floor(Math.random() * characters.length )];
        }

        const newUser = await User.create({
            name: req.body.f_name + " " + req.body.l_name,
            email: req.body.email,
            password: req.body.password,
            confirmationCode: token
        })
        newUser.save((err) => {
            if(err){
                req.flash('error', 'Something went wrong!');
                console.log('Error in saving user: ', err);
                return;
            }
            req.flash('success', 'Check your mailbox for verification code.');
            nodeMailer.sendConfirmationEmail(newUser.name, newUser.email, newUser.confirmationCode);
        })
        return res.redirect('/verify');
    }catch(err){
        console.log(`Error in creating user: ${err}`);
        return;
    }
}

module.exports.createSession = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    return res.redirect('/')
    
}

module.exports.home = async function(req, res){
    let questions = await Questions.find({})
                                    .populate('user')
                                    .populate({
                                        path: 'comments',
                                        populate: {
                                            path: 'user'
                                        }
                                    }).sort({createdAt: 'desc'});
    // console.log(questions)
    const users_list = await User.find({});
    return res.render('home', {
        questions: questions,
        users_list: users_list
    })
}

module.exports.logout = function(req, res){
    if(req.isAuthenticated()){
        req.logout(function(user, err){
            if(err){
                console.log(`Error in logging out user: ${err}`);
                req.flash('error', 'Something went wrong, cannot logout!');
                return res.redirect('/');
            }
            req.flash('success', 'You have been logged out!');
            return res.redirect('/');
        })
    }
    
}

module.exports.verifyUser = async function(req, res){
    console.log('Verify User', req.params)
    let user = await User.findOne({confirmationCode: req.params.confirmationCode});
    if(user && user.status === 'Pending'){
        user.status = 'Active'
        user.save();
        console.log(user)
        return res.redirect('/verified');
    }else if(user && user.status === 'Active'){
        req.flash('error', 'Email is already verified!');
        return res.redirect('/home');
    }
}

module.exports.verified = function(req, res){
    return res.render('verified');
}

module.exports.verify = function(req, res){
    return res.render('verify');
}
