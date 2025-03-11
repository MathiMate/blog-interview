import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const usersRes = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await usersRes.json();

  const postsRes = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await postsRes.json();
  await prisma.user.deleteMany();

  for (const user of users) {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        posts: {
          create: posts
            .filter((post) => post.userId === user.id)
            .map((post) => ({
              title: post.title,
              body: post.body,
            })),
        },
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
