const { promisePool } = require('../db/db.js');
const MAX_DATABASE_TITLE_FIELD_LENGTH = 1e2;
const MAX_DATABASE_TEXT_FIELD_LENGTH = 1e3;

async function getAllTasks() {
  const [rows, fields] = await promisePool.query('SELECT * FROM tasks');
  return rows;
}

async function getTaskById(id) {
  // Dön buraua
  // if(!id || !Number.isInteger(id))
  //   throw new Error('bad_request');

  const [rows] = await promisePool.query('SELECT * FROM tasks WHERE id = ?', [id]);

  if(rows.length === 0)
    throw new Error('document_not_found');

  return rows[0];
}

async function createTask(title, description, status) {
  if(!title || typeof title != 'string' || title.trim().length > MAX_DATABASE_TITLE_FIELD_LENGTH)
    throw new Error('bad_request');
  if(!description || typeof description !='string' || description.trim().length > MAX_DATABASE_TEXT_FIELD_LENGTH)
    throw new Error('bad_request');
  if(!status || typeof status != 'string' || status.trim().length > MAX_DATABASE_TEXT_FIELD_LENGTH)
    throw new Error('bad_request');

  const [result] = await promisePool.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [title, description, status]);

  return await getTaskById(result.insertId);
}

async function updateTask(id, title, description, status){
  if(!id || !Number.isInteger(id))
    throw new Error('bad_request');
  if(!title || typeof title != 'string' || title.trim().length > MAX_DATABASE_TITLE_FIELD_LENGTH)
    throw new Error('bad_request');
  if(!description || typeof description !='string' || description.trim().length > MAX_DATABASE_TEXT_FIELD_LENGTH)
    throw new Error('bad_request');
  if(!status || typeof status != 'string' || status.trim().length > MAX_DATABASE_TEXT_FIELD_LENGTH)
    throw new Error('bad_request');
  const [result] = await promisePool.query('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id]);

  return await getTaskById(id);
}

async function deleteTaskById(id) {
  if(!id || !Number.isInteger(id))
    throw new Error('bad_request');

  const task = await getTaskById(id);
  if (!task)
    throw new Error('document_not_found');


  await promisePool.query('DELETE FROM tasks WHERE id =?', [id]);
  return {  message: `task ${id} deleted` };
}

async function toggleTaskStatus(id) {
  if(!id || !Number.isInteger(id))
    throw new Error('bad_request');

  const task = await getTaskById(id);

  const newStatus = task.status === 'done' ? 'pending' : 'done';
  await updateTask(task.id, task.title, task.description, newStatus);

  return await getTaskById(id);
}


module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTaskById,
  toggleTaskStatus
};