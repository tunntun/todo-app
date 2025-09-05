const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cluster = require('cluster');
const http = require('http');
const os = require('os');
const path = require('path');
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();
const { pool } = require('./models/db/db');

const numCPUs = process.env.WEB_CONCURRENCY || os.cpus().length;


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = express();
  const server = http.createServer(app);

  const PORT = process.env.PORT || 4000;

  const taskRouteController = require('./routes/taskRoute');

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  const sessionOptions = session({
    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({}, pool)
  });
  app.use(sessionOptions);

  app.use((req, res, next) => {
    if (!req.query || typeof req.query !== 'object')
      req.query = {};
    if (!req.body || typeof req.body !== 'object')
      req.body = {};
    next();
  });
  app.use('/', taskRouteController);


  server.listen(PORT, () => {
    console.log(
      `Server running at http://localhost:${PORT} as Worker ${cluster.worker.id}, PID ${process.pid}`
    );
  });
}