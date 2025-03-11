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
    <div className="w-full flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-4">Something wrong</h1>
      <p className="text-2xl font-bold mb-4">Sorry!</p>
      <a
        href="/"
        className="px-6 py-3 tracking-wider bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition duration-300"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default ErrorPage;
