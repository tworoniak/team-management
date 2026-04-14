import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import authRouter from './routes/auth';
import tasksRouter from './routes/tasks';
import teamRouter from './routes/team';
import projectsRouter from './routes/projects';

export function createApp() {
  const app = express();

  app.use(cors({
    origin: process.env['CLIENT_ORIGIN'] ?? 'http://localhost:5173',
    credentials: true,
  }));
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  app.use('/api/auth', authRouter);
  app.use('/api/tasks', tasksRouter);
  app.use('/api/team', teamRouter);
  app.use('/api/projects', projectsRouter);

  app.use(errorHandler);

  return app;
}
