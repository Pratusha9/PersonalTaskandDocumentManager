const { Profile, Task, Material } = require('../index');



async function uploadMaterial (userId, title, description, contentType, fileName) {
    let material = new Material({
        userId: userId,
        title: title,
        description: description,
        contentType: contentType,
        file: fileName
    });
    material.save();
    return material;
}


async function getMaterialById (materialId) {
    return await Material.findById(materialId).exec();
}

async function getByContentType (userId, contentType) {
    return await Material.find({userId: userId, contentType: contentType}).exec();
}

async function getByUserId (userId) {
    return await Material.find({userId: userId}).exec();
}

async function deleteMaterial (materialId) {
    await Material.findByIdAndDelete(materialId).exec();
}


module.exports = {
    uploadMaterial,
    getMaterialById,
    getByContentType,
    getByUserId,
    deleteMaterial
}




