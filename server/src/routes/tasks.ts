import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();
router.use(requireAuth);

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(''),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  status: z.enum(['Backlog', 'In Progress', 'Review', 'Completed']),
  assignedTo: z.string().optional(),
  dueDate: z.string().min(1),
  tags: z.array(z.string()).default([]),
  requiredSkills: z.array(z.string()).default([]),
  projectId: z.string().optional(),
});

const updateTaskSchema = taskSchema.partial();

// GET /api/tasks
router.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: 'desc' },
  });
  res.json(tasks);
});

// GET /api/tasks/:id
router.get('/:id', async (req, res) => {
  const task = await prisma.task.findFirst({
    where: { id: req.params['id'] as string, userId: req.userId },
  });
  if (!task) { res.status(404).json({ error: 'Task not found' }); return; }
  res.json(task);
});

// POST /api/tasks
router.post('/', validate(taskSchema), async (req, res) => {
  const data = req.body as z.infer<typeof taskSchema>;
  const task = await prisma.task.create({ data: { ...data, userId: req.userId } });
  res.status(201).json(task);
});

// PATCH /api/tasks/:id
router.patch('/:id', validate(updateTaskSchema), async (req, res) => {
  const id = req.params['id'] as string;
  const data = req.body as z.infer<typeof updateTaskSchema>;
  const existing = await prisma.task.findFirst({ where: { id, userId: req.userId } });
  if (!existing) { res.status(404).json({ error: 'Task not found' }); return; }
  const task = await prisma.task.update({ where: { id }, data });
  res.json(task);
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  const id = req.params['id'] as string;
  const deleted = await prisma.task.deleteMany({ where: { id, userId: req.userId } });
  if (deleted.count === 0) { res.status(404).json({ error: 'Task not found' }); return; }
  res.status(204).send();
});

export default router;
