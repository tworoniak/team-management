import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import type { Skills } from '../../types/team';

type SkillsRadarChartProps = {
  skills: Skills;
};

export default function SkillsRadarChart({ skills }: SkillsRadarChartProps) {
  const data = [
    { subject: 'Content', value: skills.contentCreation, fullMark: 10 },
    { subject: 'Social', value: skills.socialMedia, fullMark: 10 },
    { subject: 'SEO', value: skills.seo, fullMark: 10 },
    { subject: 'PPC', value: skills.ppcAdvertising, fullMark: 10 },
    { subject: 'Design', value: skills.design, fullMark: 10 },
    { subject: 'Copy', value: skills.copywriting, fullMark: 10 },
    { subject: 'Analytics', value: skills.analytics, fullMark: 10 },
    { subject: 'Strategy', value: skills.strategy, fullMark: 10 },
    { subject: 'React', value: skills.react, fullMark: 10 },
    { subject: 'TS', value: skills.typescript, fullMark: 10 },
    { subject: 'CSS', value: skills.css, fullMark: 10 },
    { subject: 'Node', value: skills.nodejs, fullMark: 10 },
    { subject: 'PG', value: skills.postgres, fullMark: 10 },
    { subject: 'Jest', value: skills.jest, fullMark: 10 },
  ];

  return (
    <div className='h-64 w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <RadarChart data={data}>
          <PolarGrid stroke='rgba(255,255,255,0.12)' />
          <PolarAngleAxis
            dataKey='subject'
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          <Radar
            name='Skills'
            dataKey='value'
            stroke='#4f8cff'
            fill='#4f8cff'
            fillOpacity={0.35}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
