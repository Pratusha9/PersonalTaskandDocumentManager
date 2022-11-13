const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const materialSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    title: String,
    description: String,
    contentType: String,
    file: String,
    createdDate: String,
    dueDate: String
});

module.exports = Mongoose.model('Material', materialSchema);