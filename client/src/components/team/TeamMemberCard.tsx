import { Pencil, Trash2 } from 'lucide-react';
import type { TeamMember } from '../../types/team';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import SkillsRadarChart from './SkillsRadarChart';

type TeamMemberCardProps = {
  member: TeamMember;
  onEdit?: (member: TeamMember) => void;
  onDelete?: (member: TeamMember) => void;
};

export default function TeamMemberCard({
  member,
  onEdit,
  onDelete,
}: TeamMemberCardProps) {
  return (
    <Card className='p-5'>
      <div className='mb-4 flex items-start justify-between gap-3'>
        <div>
          <h3 className='text-2xl font-bold tracking-tight text-white'>
            {member.fullName}
          </h3>
          <p className='mt-1 text-sm text-slate-400'>{member.email}</p>
        </div>

        <Badge tone='role'>{member.role}</Badge>
      </div>

      <div className='mb-5 grid grid-cols-2 gap-3'>
        <div className='rounded-xl border border-white/10 bg-white/3 p-4'>
          <p className='text-xs uppercase tracking-wide text-slate-400'>
            Availability
          </p>
          <p className='mt-2 text-3xl font-bold text-emerald-300'>
            {member.availability}%
          </p>
        </div>

        <div className='rounded-xl border border-white/10 bg-white/3 p-4'>
          <p className='text-xs uppercase tracking-wide text-slate-400'>
            Workload
          </p>
          <p className='mt-2 text-3xl font-bold text-slate-200'>
            {member.currentWorkload}%
          </p>
        </div>
      </div>

      <div className='mb-5 rounded-2xl border border-white/10 bg-white/3 p-3'>
        <SkillsRadarChart skills={member.skills} />
      </div>

      <div className='mb-5'>
        <p className='mb-3 text-sm font-semibold text-slate-200'>Top Skills</p>
        <div className='flex flex-wrap gap-2'>
          <Badge tone='medium'>Design {member.skills.design}/10</Badge>
          <Badge tone='medium'>
            Content {member.skills.contentCreation}/10
          </Badge>
          <Badge tone='medium'>SEO {member.skills.seo}/10</Badge>
          <Badge tone='medium'>Strategy {member.skills.strategy}/10</Badge>
        </div>
      </div>

      <div className='flex gap-2'>
        <Button
          type='button'
          variant='ghost'
          className='flex-1'
          onClick={() => onEdit?.(member)}
        >
          <Pencil className='mr-2 h-4 w-4' />
          Edit
        </Button>

        <Button
          type='button'
          variant='ghost'
          className='flex-1'
          onClick={() => onDelete?.(member)}
        >
          <Trash2 className='mr-2 h-4 w-4' />
          Delete
        </Button>
      </div>
    </Card>
  );
}
