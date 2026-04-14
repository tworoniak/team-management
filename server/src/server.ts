import 'dotenv/config';
import { createApp } from './app';
import { prisma } from './lib/prisma';

const PORT = Number(process.env['PORT'] ?? 3001);

const app = createApp();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
