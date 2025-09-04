const { getTaskById } = require('../../../models/task/Task');

async function getTaskByIdController (req, res, next) {
  try {
    const id = req.param.id;
    //id kontrol et
    const task = await getTaskById(id);
    res.json(task);
  } catch (err) {
    next (err);
  }
}

module.exports = getTaskByIdController;