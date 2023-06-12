import express from 'express';
import { config as configEnvVariables } from 'dotenv';
import { env } from 'process';
import cors from 'cors';
import userRouter from './routes/user';
import subpageRouter from './routes/subpage';
import commentRouter from './routes/comment';
import labelRouter from './routes/label';
import taskRouter from './routes/task';

configEnvVariables();
const app = express();
const port = env['PORT'] ?? 3000;

// CORS middlware
app.use(cors());

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));

app.use(userRouter, subpageRouter, commentRouter, labelRouter, taskRouter);

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
  console.log(
    `[${new Date().toISOString()}] RESTful API for Nush is listening on port ${port}`,
  );
});
