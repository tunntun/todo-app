const { getTaskById } = require('../../../models/task/Task');

async function getTaskByIdController (req, res, next) {
  try {
    const id = parseInt(req.params.id);
    //id kontrol et
    const task = await getTaskById(id);
    res.json(task);
  } catch (err) {
    next (err);
  }
}

module.exports = getTaskByIdController;