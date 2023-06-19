import express from 'express';
import { config as configEnvVariables } from 'dotenv';
import { env } from 'process';
import cors from 'cors';
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-unused-vars
import bodyParser from 'body-parser';
// eslint-disable-next-line import/no-extraneous-dependencies
import cookieParser from 'cookie-parser';
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

app.use(session());

// CORS middlware
app.use(cors({
  origin: 'http://localhost:3000',
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
