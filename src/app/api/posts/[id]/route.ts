import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number((await params).id) },
      include: { user: true },
    });

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { message: `Error fetching post: ${error}` },
      { status: 500 },
    );
  }
}

// DELETE handler
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.post.delete({
      where: { id: Number((await params).id) },
    });

    return NextResponse.json({ message: 'Post deleted' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete post' },
      { status: 500 },
    );
  }
}
