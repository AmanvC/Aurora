const User = require('../models/user');

module.exports.profile = async function(req, res){
    const user_profile = await User.findById(req.params.id);
    return res.render('_profile', {
        user_profile: user_profile 
    });
}

module.exports.update = async function(req, res){
    await User.findByIdAndUpdate(req.body.id, {name: req.body.name});
    req.flash('success', 'Profile updated successfully.');
    return res.redirect('back');
}