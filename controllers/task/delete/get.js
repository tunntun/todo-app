const { deleteTaskById  } =require('../../../models/task/Task');

async function deleteTaskByIdController(req, res, next){
  try{
    const id = parseInt(req.params.id);
    await deleteTaskById(id);
    res.json();

  } catch (err) {
    next(err);
  }
}

module.exports = deleteTaskByIdController;