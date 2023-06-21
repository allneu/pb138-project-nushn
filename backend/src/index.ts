import express from 'express';
import { config as configEnvVariables } from 'dotenv';
import { env } from 'process';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import morgan from 'morgan';
import userRouter from './routes/user';
import subpageRouter from './routes/subpage';
import labelRouter from './routes/label';
import taskRouter from './routes/task';
import session from './middleware/sessionMiddleware';

declare module 'express-session' {
  interface SessionData {user: { id:string }}
}

configEnvVariables();
const app = express();
const port = env['PORT'] ?? 3000;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../logs/access.log'),
  { flags: 'a' },
);

app.use(morgan('combined', { stream: accessLogStream }));

app.use(session());

// CORS middleware
// localhost:5173 is address on which Vite apps run defaultly
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));

app.use(userRouter, subpageRouter, labelRouter, taskRouter);

// No route was taken - 404 - Resource (API endpoint) not found.
app.use((_req, res) => {
  const response = {
    status: 'failure',
    data: {},
    error: 'No matching endpoint was found.',
  };

  return res.status(404).send(response);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `[${new Date().toISOString()}] RESTful API for Nush is listening on port ${port}`,
  );
});
