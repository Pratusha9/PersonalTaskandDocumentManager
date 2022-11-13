const { Profile, Task, Material } = require('../index');

async function addTask (userId, title, description, status, dueDate) {
    let task = new Task({
        userId: userId,
        title: title,
        description: description,
        status: status,
        dueDate: dueDate
    });
    task.save();
    return task;
}

async function updateTitle (taskId, title) {
    let task = await Task.findById(taskId).exec();
    task.title = title;
    task.save();
    return task;
}

async function updateDescription (taskId, description) {
    let task = await Task.findById(taskId).exec();
    task.description = description;
    task.save();
    return task;
}

async function updateStatus (taskId, status) {
    let task = await Task.findById(taskId).exec();
    task.status = status;
    task.save();
    return task;
}

async function updateDueDate (taskId, dueDate) {
    let task = await Task.findById(taskId).exec();
    task.dueDate = dueDate;
    task.save();
    return task;
}

async function getTaskById (taskId) {
    return await Task.findById(taskId).exec();
}

async function getUserTasks (userId) {
    return await Task.find({userId: userId}).exec();
}

async function getTasksByStatus (userId, taskStatus) {
    return await Task.find({userId: userId, status: taskStatus}).exec();
}

async function removeTask (taskId) {
    let task = await Task.findByIdAndDelete(taskId).exec();
    return task;
}



module.exports = {
    addTask,
    updateTitle,
    updateDescription,
    updateStatus,
    updateDueDate,
    getTaskById,
    getTasksByStatus,
    getUserTasks,
    removeTask
}