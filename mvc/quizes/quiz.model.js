const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");


const quizSchema = new Schema({
    question: String,
    options: Array,
    answer: Array
});



const Quiz = Mongoose.model('Quiz', quizSchema);



module.exports = Quiz;