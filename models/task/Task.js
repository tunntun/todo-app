const db = require('../db/db.js');
const MAX_DATABASE_TITLE_FIELD_LENGTH = 1e2;
const MAX_DATABASE_TEXT_FIELD_LENGTH = 1e3;

async function getAllTasks() {
  const [rows, fields] = await db.query('SELECT * FROM tasks');
  return rows;
}

async function getTaskById(id) {
  if(!id || !Number.isInteger(id))
    throw new Error('bad_request');

  const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);

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

  const [result] = await db.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [title, description, status]);
  console.log(result);
  return;
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

  const [result] = await db.query('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id]);
  return result;
}

async function deleteTask(id) {
  if(!id || !Number.isInteger(id))
    throw new Error('bad_request');

  await db.query('DELETE FROM tasks WHERE id =?', [id]);
  return {  message: `task ${id} deleted` };
}

async function toggleTaskStatus(id) {
  if(!id || !Number.isInteger(id))
    throw new Error('bad_request');

  let task;
  try {
    task = await getTaskById(id);
  } catch (err) {
    console.log(err);
    return null;
  }
  const newStatus = task.status === 'completed' ? 'pending' : 'completed';

  const updatedTask = await updateTask(task.id, task.title, task.description, newStatus);
  return updatedTask;
}


module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus
};