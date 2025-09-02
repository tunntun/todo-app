const { updateTask , getTaskById  } = require('../../../models/task/Task');

async function updateTaskController(req, res, next) {
  try{
    data.id = parseInt(req.params.id);
    const task = await getTaskById(data.id);
    let data = {};
    data.title = req.body.title ? req.body.title : task.title ;
    data.description = req.body.description ? req.body.description : task.description;
    data.status = req.body.status ? req.body.status : task.status;

    const updatedTask = await updateTask(data.id, data.title, data.description, data.status);
    res.json(updatedTask);
  }catch(err){
    next(err);
  }
}

module.exports = updateTaskController;