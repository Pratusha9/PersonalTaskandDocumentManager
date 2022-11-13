const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");


const ProfileSchema = new Schema({
    name: String,
    username: String,
    password: String,
    address: String
});

ProfileSchema.plugin(passportLocalMongoose);

const Profile = Mongoose.model('Profile', ProfileSchema);

passport.use(Profile.createStrategy());

passport.serializeUser(Profile.serializeUser());
passport.deserializeUser(Profile.deserializeUser());

module.exports = Profile;