const { getAllTasks } = require('../../../models/task/Task');

async function listTasksController(req, res, next) {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

module.exports = listTasksController;