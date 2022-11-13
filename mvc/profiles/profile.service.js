const { Profile, Task, Material } = require('../index');

async function getAllProfiles() {
    return await Profile.find({}).exec();
}

async function getProfileById(userId) {
    return await Profile.findById(userId).exec();
}

async function updateAddress(userId, address) {
    let profile = await Profile.findById(userId).exec();
    profile.address = address;
    profile.save();
    return profile;
}

module.exports = {
    getAllProfiles,
    getProfileById,
    updateAddress
}