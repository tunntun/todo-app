const express = require('express');

const router = express.Router();

const listTaskController = require('../controllers/task/create/get');
const updateTaskGetController = require('../controllers/task/update/get');
const deleteTaskGetController = require('../controllers/task/delete/get');

const createTaskPostController = require('../controllers/task/create/post');
const updateTaskPutController = require('../controllers/task/update/put');

router.get(
  '/',
  listTaskController
);

router.get(
  '/update',
  updateTaskGetController
);

router.get(
  '/update/delete',
  deleteTaskGetController
);

router.post(
  '/create',
  createTaskPostController
);

router.post(
  '/update',
  updateTaskPutController
);

module.exports = router;