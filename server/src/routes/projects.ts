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
router.get('/', async (_req, res) => {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(projects);
});

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: req.params['id'] as string },
    include: { tasks: true },
  });
  if (!project) { res.status(404).json({ error: 'Project not found' }); return; }
  res.json(project);
});

// POST /api/projects
router.post('/', validate(projectSchema), async (req, res) => {
  const data = req.body as z.infer<typeof projectSchema>;
  const project = await prisma.project.create({ data });
  res.status(201).json(project);
});

// PATCH /api/projects/:id
router.patch('/:id', validate(updateProjectSchema), async (req, res) => {
  const data = req.body as z.infer<typeof updateProjectSchema>;
  const project = await prisma.project.update({ where: { id: req.params['id'] as string }, data });
  res.json(project);
});

// DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
  await prisma.project.delete({ where: { id: req.params['id'] as string } });
  res.status(204).send();
});

export default router;
