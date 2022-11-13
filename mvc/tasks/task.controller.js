const express = require('express');
const router = express.Router();
const { Task, Profile } = require('../index');
const taskService = require('./task.service');



router.get('/tasks', getTasks);


router.post('/add/task', addTask);
router.post('/update/status', updateStatus);
router.post('/delete/task', deleteTask);

module.exports = router;


async function getTasks (req, res) {
    let profile = await Profile.findById(req.user.id).exec();
    let tasks = await Task.find({userId: req.user.id}).exec();
    res.render('dashboard', {profile: profile, tasks: tasks});
}

async function addTask (req, res) {
    await taskService.addTask(req.user.id, req.body.title, req.body.description, req.body.status, req.body.dueDate);
    res.redirect('/tasks');
}

async function deleteTask (req, res) {
    await taskService.removeTask(req.body.taskId);
    res.redirect('/tasks');
}

async function updateStatus (req, res) {
    await taskService.updateStatus(req.body.taskIdA, req.body.status);
    res.redirect('/tasks');
}

// async function goToMaterials (req, res) {
//     res.redirect('/materials');
// };

