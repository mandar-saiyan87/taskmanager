import express from "express";
import sql from '../db.js';

const router = express.Router()

router.get('/tasktest', async (req, res) => {
  try {
    res.status(200).json({ 'code': 200, 'status': 'OK' })
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error')
  }
})

// Route 1: Get all tasks
router.get('', async (req, res) => {
  try {
    const tasks = await sql`select * from tskmgr.tasks`
    if (tasks.length > 0) {
      res.status(200).json({ 'code': 200, 'taskList': tasks, 'msg': 'Fetched tasks successfully' })
    } else {
      res.status(200).json({ 'code': 200, 'taskList': [], 'msg': 'No task added' })
    }
  } catch (error) {
    res.status(500).send('Internal server error')
  }
})

// Route 2: Post new task
router.post('', async (req, res) => {
  try {
    const newtask = req.body
    const task = await sql`insert into tskmgr.tasks (title, description, start_date, due_date, status) 
        values (${newtask.title}, ${newtask.description}, ${newtask.start_date}, ${newtask.due_date}, ${newtask.status})
        returning id, title
        `
    if (task[0].id) {
      res.status(200).json({ 'code': 200, 'msg': 'New task created successfully' })
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})

// Route 3: Get task
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const getTask = await sql`select * from tskmgr.tasks where id=${id}`
    if (getTask.length > 0) {
      res.status(200).json({ 'code': 200, 'task': getTask, 'msg': 'Fetched task successfully' })
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})

// Route 4: Update Task
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const task = req.body
    const updateTask = await sql`update tskmgr.tasks set ${sql(task, 'title', 'description', 'start_date', 'due_date', 'status')}
    where id=${id}
    returning id
    `
    if (updateTask[0].id) {
      res.status(200).json({ 'code': 200, 'msg': 'Task updated successfully' })
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})

// Route 5: Delete Task
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deleteTask = await sql`delete from tskmgr.tasks where id=${id} returning id`
    if (deleteTask[0].id) {
      res.status(200).json({ 'code': 200, 'msg': 'Task deleted successfully' })
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error")
  }
})
export default router;