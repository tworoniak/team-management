import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();
router.use(requireAuth);

const teamMemberSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  role: z.enum([
    'Designer',
    'Frontend Developer',
    'Backend Developer',
    'SEO Specialist',
    'PPC Specialist',
    'Social Media Manager',
  ]),
  availability: z.number().int().min(0).max(100),
  currentWorkload: z.number().int().min(0).max(100),
  skills: z.record(z.string(), z.number().min(0).max(10)).default({}),
});

const updateTeamMemberSchema = teamMemberSchema.partial();

// GET /api/team
router.get('/', async (_req, res) => {
  const members = await prisma.teamMember.findMany({ orderBy: { fullName: 'asc' } });
  res.json(members);
});

// GET /api/team/:id
router.get('/:id', async (req, res) => {
  const id = req.params['id'] as string;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) { res.status(404).json({ error: 'Team member not found' }); return; }
  res.json(member);
});

// POST /api/team
router.post('/', validate(teamMemberSchema), async (req, res) => {
  const data = req.body as z.infer<typeof teamMemberSchema>;
  const member = await prisma.teamMember.create({ data });
  res.status(201).json(member);
});

// PATCH /api/team/:id
router.patch('/:id', validate(updateTeamMemberSchema), async (req, res) => {
  const id = req.params['id'] as string;
  const data = req.body as z.infer<typeof updateTeamMemberSchema>;
  const member = await prisma.teamMember.update({ where: { id }, data });
  res.json(member);
});

// DELETE /api/team/:id
router.delete('/:id', async (req, res) => {
  const id = req.params['id'] as string;
  await prisma.teamMember.delete({ where: { id } });
  res.status(204).send();
});

export default router;
