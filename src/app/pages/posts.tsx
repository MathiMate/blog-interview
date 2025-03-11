'use client';
import { useEffect, useState } from 'react';
import Skeleton from '../components/Utils/Skeleton';
import Toastify from 'toastify-js';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  userName?: string;
}

interface User {
  id: number;
  name: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error('Error response:', errorData);
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        const postsWithUserNames = data.map((post: any) => ({
          ...post,
          userName: post.user?.name || 'Unknown User',
        }));
        setPosts(postsWithUserNames);
      } catch (err) {
        console.error('Error completo:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function deletePost(id: number) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to delete');
        setPosts(posts.filter((post) => post.id !== id));
        Toastify({
          text: 'Post deleted sucessfully',
          duration: 5000,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true,
          style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
          },
          className: 'toast',
        }).showToast();
      })
      .catch(() => setError('Failed to delete post'));
  }

  return (
    <div className="container mx-auto p-4 flex items-center justify-center flex-wrap w-full flex-col">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {error && <p className="text-red-500 font-bold text-4xl">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
        {loading && !posts.length ? (
          <Skeleton arrayLength={9} />
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col border p-6 rounded-xl shadow-lg bg-white hover:shadow-xl transition card"
            >
              <a
                href={`/posts/${post.id}`}
                className="hover:scale-105 transition"
              >
                <h2 className="font-bold text-gray-600 text-lg mb-2 textOverflow">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-2 max-h-80">{post.body}</p>
              </a>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-gray-500 text-sm">
                  By {post.userName}
                </span>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition z-20 hover:cursor-pointer hover:scale-105"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
