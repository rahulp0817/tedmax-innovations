import Signin from '@/components/Signin'
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const SigninPage = async () => {
  const session = await auth();
  if (session?.user) {
    redirect('/');
  }
  return <Signin />;
};

export default SigninPage;
