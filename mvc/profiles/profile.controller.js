const express = require('express');
const passport = require('passport');
const router = express.Router();
const { Profile, Task, Material } = require('../index');
const profileService = require('./profile.service');



router.post('/register', registerProfile);
router.post('/login', loginUser);
router.get('/logout', logOutUser);
router.post('/update/profile', updateProfile);


router.get('/details', getProfileInfo);


module.exports = router;

function registerProfile (req, res) {
    Profile.register({username: req.body.username, name: req.body.name, address: req.body.address}, req.body.password, function(err, result) {
        if (err) {
            res.json({success: false, message: err});
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect('/tasks');
            });
        }
    });
}








function loginUser (req, res) {
    let newUser = new Profile({
        username: req.body.username,
        password: req.body.password
    });
    req.login(newUser, function(err, result){
    if (err) {
        res.json({success: false, message: 'not successful'});
    } else {
        passport.authenticate("local")(req, res, function(){
            res.redirect('/tasks');
        });
    }
    });
}

function logOutUser (req, res) {
    req.logout();
    res.redirect('/login');
}

async function updateProfile (req, res) {
    let profile = await profileService.updateAddress(req.user.id, req.body.address);
    res.json({success: true, data: profile});
}

async function getProfileInfo (req, res) {
    let profile = await profileService.getProfileById(req.user.id);
    res.json({success: true, data: profile});
}