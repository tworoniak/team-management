import Card from '../ui/Card';
import Button from '../ui/Button';

export default function AllocationHeroCard() {
  return (
    <Card className='flex min-h-[320px] flex-col items-center justify-center p-10 text-center'>
      <div className='max-w-xl'>
        <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-4xl'>
          ✨
        </div>

        <h2 className='mb-3 text-4xl font-bold tracking-tight'>
          Generate Allocations
        </h2>
        <p className='mb-6 text-lg leading-8 text-muted'>
          Generate smart task assignment recommendations based on skill match,
          availability, and current workload.
        </p>

        <Button>Generate Smart Allocations</Button>
      </div>
    </Card>
  );
}
