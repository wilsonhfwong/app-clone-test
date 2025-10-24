import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { SignInButton, SignOutButton } from '@/components/AuthButtons';
import { authOptions } from '@/lib/auth';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-8 px-6 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white">Storyboard Studio</h1>
        <p className="text-lg text-slate-300">
          Build cinematic narratives with AI-assisted scene generation, collaborative feedback, and a workflow inspired by Boords.
        </p>
      </div>
      {session ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-slate-300">Signed in as {session.user.email ?? session.user.id}</p>
          <div className="flex items-center gap-3">
            <Link
              href="/storyboards/demo"
              className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-400"
            >
              Open demo storyboard
            </Link>
            <SignOutButton />
          </div>
        </div>
      ) : (
        <SignInButton />
      )}
    </main>
  );
}
