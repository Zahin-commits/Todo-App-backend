const express = require('express');
const router = express.Router();
const {getAllTask,createTask,deleteTask,completeTask} = require('../controller/taskController')

router.get('/',getAllTask);
router.post('/new',createTask);
router.get('/complete/:id',completeTask)
router.delete('/delete/:id',deleteTask)

module.exports = router;