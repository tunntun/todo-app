const express = require('express');

const router = express.Router();

const listTaskController = require('../controllers/task/create/get');
const getTaskByIdController = require('../controllers/task/getById/get');
const updateTaskGetController = require('../controllers/task/update/get');
const deleteTaskByIdGetController = require('../controllers/task/delete/get');

const createTaskPostController = require('../controllers/task/create/post');
const updateTaskPutController = require('../controllers/task/update/put');

router.get(
  '/',
  listTaskController
);

router.get(
  '/:id',
  getTaskByIdController
);

router.get(
  '/update/:id',
  updateTaskGetController
);

router.get(
  '/update/delete/:id',
  deleteTaskByIdGetController
);

router.post(
  '/create',
  createTaskPostController
);

router.put(
  '/update/:id',
  updateTaskPutController
);

module.exports = router;