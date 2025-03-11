'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ErrorPageProps {
  error: any;
}

const ErrorPage = ({ error }: ErrorPageProps) => {
  const router = useRouter();

  useEffect(() => {
    if (error?.message !== 'CriticalError') {
      router.push('/');
    }
  }, [error, router]);

  useEffect(() => {
    router.push('/');
  }, [router]);

  return (
    <div>
      <h1>Something wrong</h1>
      <p>Sorry!</p>
    </div>
  );
};

export default ErrorPage;
