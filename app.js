require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const path = require('path');
const uuid = require('uuid').v4;
const multer = require('multer');
const Aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cors(), express.json());

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());

app.use(passport.session());

const s3 = new Aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.S3_BUCKET_REGION,
});

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on("error", err => {
    console.log("err", err)
});
  
mongoose.connection.on("connected", () => {
  console.log("mongoose is connected...")
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoose is disconnected...")
});
const { Material } = require('./mvc/index');

const upload = multer({
    storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: 'personaltaskanddocumentmanager',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${uuid()}${ext}`);
        }
    })
});

const materialService = require('./mvc/materials/material.service');

app.get("/", async (req, res) => {
    res.render('register');
});

app.get("/login", async (req, res) => {
    res.render('login');
});

app.post('/upload/material', upload.single('material'), async (req, res) => {
    let uploadedFile = req.file.location;
    let material = new Material({
        userId: req.user.id,
        title: req.body.title,
        description: req.body.description,
        contentType: req.body.contentType,
        file: uploadedFile
    });
    material.save();
    res.redirect('/materials');
});



const profileRouter = require('./mvc/profiles/profile.controller');
const taskRouter = require('./mvc/tasks/task.controller');
const materialRouter = require('./mvc/materials/material.controller');

app.use(profileRouter);
app.use(taskRouter);
app.use(materialRouter);





  
app.listen(process.env.PORT || 3000, function(){
    console.log("Server started successfully");
});
  
module.exports = app;