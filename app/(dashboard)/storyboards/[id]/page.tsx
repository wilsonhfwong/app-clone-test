import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import StoryboardWorkspace from '@/components/storyboard/StoryboardWorkspace';
import { authOptions } from '@/lib/auth';

interface StoryboardPageProps {
  params: {
    id: string;
  };
}

export default async function StoryboardPage({ params }: StoryboardPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-wide text-slate-400">Storyboard</p>
        <h1 className="text-3xl font-bold text-white">{params.id.replace('-', ' ')}</h1>
        <p className="text-sm text-slate-400">Craft and iterate on scenes, frames, and prompts collaboratively.</p>
      </header>
      <StoryboardWorkspace />
    </main>
  );
}
