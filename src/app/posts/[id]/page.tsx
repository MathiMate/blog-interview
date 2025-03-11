'use client';
import Skeleton from '@/app/components/Utils/Skeleton';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  user?: User;
}

interface User {
  id: number;
  name: string;
  email: string;
}

export default function PostPage() {
  const params = useParams();
  const { id } = params;
  const [error, setError] = useState('');
  const [loading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const postRes = await fetch(`/api/posts/${id}`).then((res) =>
          res.json(),
        );
        setPost(postRes);
      } catch {
        setError('Failed to load post');
      }
    }

    if (id) fetchData();
  }, [id]);

  function deletePost(id: number | undefined) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to delete');
        setPost(post?.id === id ? null : post);
      })
      .then(() => {
        router.push('/');
      })
      .catch(() => setError('Failed to delete post'));
  }

  return (
    <div className="card w-full flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-[500px] gap-8 flex flex-col border p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition">
        {error && !post && (
          <p className="text-red-500 font-bold text-4xl">{error}</p>
        )}
        {loading && !post ? (
          <Skeleton arrayLength={1} />
        ) : (
          <>
            <h2 className="font-bold text-gray-600 text-lg mb-2">
              {post?.title}
            </h2>
            <p className="text-gray-600 mb-2 max-h-80">{post?.body}</p>
            <div className="flex justify-between items-center mt-8">
              <span className="text-gray-500 text-sm">
                By {post?.user?.name}
              </span>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition z-20 hover:cursor-pointer hover:scale-105"
                onClick={() => deletePost(post?.id)}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
      {post && (
        <a
          href="/"
          className="mt-8 px-6 py-3 tracking-wider bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition duration-300 hover:scale-105 hover:cursor-pointer"
        >
          Go Back Home
        </a>
      )}
    </div>
  );
}
