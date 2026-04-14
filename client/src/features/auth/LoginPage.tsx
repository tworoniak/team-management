import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Zap } from 'lucide-react';
import { api } from '../../lib/api';
import { useAuthStore } from '../../stores/authStore';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const authSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(8, 'At least 8 characters'),
});

type AuthFormValues = z.infer<typeof authSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const setToken = useAuthStore((s) => s.setToken);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({ resolver: zodResolver(authSchema) });

  const onSubmit = async (values: AuthFormValues) => {
    setServerError('');
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const { data } = await api.post<{ token: string }>(endpoint, values);
      setToken(data.token);
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      const message =
        typeof err === 'object' &&
        err !== null &&
        'response' in err
          ? (err as { response?: { data?: { error?: string } } }).response?.data?.error
          : undefined;
      setServerError(message ?? 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-950 px-4'>
      <div className='w-full max-w-sm'>
        <div className='mb-8 flex flex-col items-center gap-3'>
          <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500'>
            <Zap className='h-6 w-6 text-white' />
          </div>
          <h1 className='text-2xl font-bold text-white'>DevFlow</h1>
        </div>

        <div className='rounded-2xl border border-white/10 bg-slate-900 p-8'>
          <div className='mb-6 flex rounded-xl border border-white/10 bg-white/5 p-1'>
            {(['login', 'register'] as const).map((tab) => (
              <button
                key={tab}
                type='button'
                onClick={() => setMode(tab)}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold capitalize transition ${
                  mode === tab
                    ? 'bg-indigo-500 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <Input
              label='Email'
              type='email'
              placeholder='you@example.com'
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label='Password'
              type='password'
              placeholder='••••••••'
              error={errors.password?.message}
              {...register('password')}
            />

            {serverError && (
              <p className='rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400'>
                {serverError}
              </p>
            )}

            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting
                ? mode === 'login'
                  ? 'Signing in…'
                  : 'Creating account…'
                : mode === 'login'
                  ? 'Sign in'
                  : 'Create account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
