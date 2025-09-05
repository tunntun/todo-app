const express = require('express');

const router = express.Router();

const getTasksController = require('../controllers/task/create/get');
const getTaskByIdController = require('../controllers/task/getById/get');
// const updateTaskGetController = require('../controllers/task/update/put');
const deleteTaskByIdController = require('../controllers/task/delete/get');

const createTaskPostController = require('../controllers/task/create/post');
const updateTaskPutController = require('../controllers/task/update/put');

router.get(
  '/',
  getTasksController
);

router.get(
  '/:id',
  getTaskByIdController
);

router.delete(
  '/:id',
  deleteTaskByIdController
);

router.post(
  '/',
  createTaskPostController
);

router.put(
  '/:id',
  updateTaskPutController
);

module.exports = router;