const { deleteTaskById  } =require('../../../models/task/Task');

async function deleteTaskByIdController(req, res, next){
  try{
    const id = req.param.id;
    deleteTaskById(id);
  } catch (err) {
    next(err);
  }
}

module.exports = deleteTaskByIdController;