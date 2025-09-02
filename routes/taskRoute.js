const express = require('express');

const router = express.Router();

const createTaskGetController = require('../controllers/task/create/get');
const updateTaskGetController = require('../controllers/task/update/get');
const deleteTaskGetController = require('../controllers/task/update/delete/get');

const createTaskPostController = require('../controllers/task/create/post');
const updateTaskPostController = require('../controllers/task/update/post');

router.get(
  '/',
  createTaskGetController
);

router.get(
  'update',
  updateTaskGetController
);

router.get(
  'update/delete',
  deleteTaskGetController
);

router.post(
  'create',
  createTaskPostController
);

router.post(
  'update',
  updateTaskPostController
);

module.exports = router;