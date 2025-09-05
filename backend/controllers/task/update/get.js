const { getTaskById } = require('../../../models/task/Task');

async function getTaskForUpdate(req, res, next) {
  try {
    const id = parseInt(req.params.id);

    const task = await getTaskById(id);
    res.json(task);
  } catch (err) {
    next(err);
  }
}

module.exports = getTaskForUpdate;