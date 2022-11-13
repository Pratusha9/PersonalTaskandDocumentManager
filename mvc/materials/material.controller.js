const express = require('express');
const router = express.Router();
const { Profile, Task, Material} = require('../index');
const materialService = require('./material.service');
// const path = require('path');
// const uuid = require('uuid').v4;
// const multer = require('multer');
// const Aws = require("@aws-sdk/client-s3");
// const multerS3 = require("multer-s3");

// const s3 = new Aws.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//     region: process.env.S3_BUCKET_REGION,
// });


router.get('/materials', getMaterials);
router.post('/delete/material', deleteMaterial);

module.exports = router;


async function getMaterials (req, res) {
    let documents = [];
    let images = [];
    let audios = [];
    let videos = [];

    let profile = await Profile.findById(req.user.id).exec();
    let material = await materialService.getByUserId(req.user.id);
    console.log(material);
    for (val of material) {
        if (val.contentType === 'image') {
            images.push(val);
        }
        if (val.contentType === 'document') {
            documents.push(val);
        }
        if (val.contentType === 'audio') {
            audios.push(val);
        }
        if (val.contentType === 'video') {
            videos.push(val);
        }
    }
    res.render('materials', {profile: profile, material: material, documents: documents, images: images, audios: audios, videos: videos});
}

async function deleteMaterial (req, res) {
    await materialService.deleteMaterial(req.body.materialId);
    res.redirect('/materials');
}