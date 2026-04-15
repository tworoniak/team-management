import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();
router.use(requireAuth);

const projectSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(''),
  status: z.enum(['Active', 'On Hold', 'Completed']),
  color: z.enum(['indigo', 'violet', 'blue', 'cyan', 'emerald', 'amber', 'rose', 'slate']),
});

const updateProjectSchema = projectSchema.partial();

// GET /api/projects
router.get('/', async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: 'desc' },
  });
  res.json(projects);
});

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  const project = await prisma.project.findFirst({
    where: { id: req.params['id'] as string, userId: req.userId },
    include: { tasks: true },
  });
  if (!project) { res.status(404).json({ error: 'Project not found' }); return; }
  res.json(project);
});

// POST /api/projects
router.post('/', validate(projectSchema), async (req, res) => {
  const data = req.body as z.infer<typeof projectSchema>;
  const project = await prisma.project.create({ data: { ...data, userId: req.userId } });
  res.status(201).json(project);
});

// PATCH /api/projects/:id
router.patch('/:id', validate(updateProjectSchema), async (req, res) => {
  const id = req.params['id'] as string;
  const data = req.body as z.infer<typeof updateProjectSchema>;
  const existing = await prisma.project.findFirst({ where: { id, userId: req.userId } });
  if (!existing) { res.status(404).json({ error: 'Project not found' }); return; }
  const project = await prisma.project.update({ where: { id }, data });
  res.json(project);
});

// DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
  const id = req.params['id'] as string;
  const deleted = await prisma.project.deleteMany({ where: { id, userId: req.userId } });
  if (deleted.count === 0) { res.status(404).json({ error: 'Project not found' }); return; }
  res.status(204).send();
});

export default router;
