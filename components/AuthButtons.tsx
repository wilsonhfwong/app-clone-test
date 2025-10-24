'use client';

import { signIn, signOut } from 'next-auth/react';
import classNames from 'classcat';

export function SignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn('google')}
      className={classNames([
        'rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow',
        'transition hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
      ])}
    >
      Sign in with Google
    </button>
  );
}

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/' })}
      className={classNames([
        'rounded-md border border-slate-500 px-4 py-2 text-sm font-semibold text-slate-200',
        'transition hover:border-slate-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-200'
      ])}
    >
      Sign out
    </button>
  );
}
