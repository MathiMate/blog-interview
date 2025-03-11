import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { user: true }, //Lo agrego para que se vea más bonito y porque ya hice el html
      take: 24,
    });

    if (!posts || posts.length === 0) {
      return NextResponse.json({ message: 'No posts found' }, { status: 404 });
    }

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching posts' },
      { status: 500 },
    );
  }
}
