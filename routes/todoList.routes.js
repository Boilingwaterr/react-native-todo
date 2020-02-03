const { Router }  = require('express');
const ToDoList = require('../models/ToDoList');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth.middleware');
const router = Router();

const error500 = "Oops, Something went wrong.";

router.get('/getTasks', auth, async(req, res) => {
    try {

        const tasks = await ToDoList.find({owner: req.user.userId});
        
        res.json(tasks);

    } catch (e) {
        res.status(500).json({message: error500});
    }
});

router.post('/addTask', [
    check('data.title', 'Enter Title of task.').exists(),
    check('data.task', 'Enter task.').exists()
], async(req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: 'Data is incorrect.'});
        }

        const { title, task, isImportant, isComplete } = req.body.data;
        const todoList = new ToDoList ({
            title, task, isImportant, isComplete, owner: req.body.userId
        });
       
        await todoList.save();

        res.status(201).json({message: 'Task has been created.'});
    } catch (e) {
        res.status(500).json({message: error500});
    }
});

router.put('/deleteTask', auth, async(req, res) => {
    try {
        const { id } = req.body;
        await ToDoList.findOneAndDelete({_id: id, owner: req.user.userId});
  
        res.status(200).json({message: "Task was removed."});
    } catch (e) {
        res.status(500).json({message: error500});
    }
});

router.post('/editTask', async(req, res) => {
    try {
        const { id, title, task, isImportant, isComplete } = req.body;

        await ToDoList.findByIdAndUpdate({_id:id}, {
            title, task, isImportant, isComplete
        });

        res.status(200).json({message: "Task was modified."})
    } catch (e) {
        res.status(500).json({message: error500});
    }
});

module.exports = router;