const { createTask  } = require('../../../models/task/Task');

async function createTaskController(req, res, next) {
  try {
    const newTask = await createTask(req.body.title, req.body.description, req.body.status);
    res.json(newTask);
  }catch (err){
    next(err);
  }
}

module.exports = createTaskController;