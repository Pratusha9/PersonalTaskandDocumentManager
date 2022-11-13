const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const taskSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    title: String,
    description: String,
    status: String,
    dueDate: String
});

module.exports = Mongoose.model('Task', taskSchema);