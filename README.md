> [!NOTE]
>
> Here, I will list the steps I followed to create the project.
>
> I started with ESLint and Prettier for formatting because they're the best tools for a programmer.
> Inmediatly I dealeted caret ^ from dependencies cause' it's not a good pactice.
> After that, I created error and not-found components just in case. I think it's a good practice.
> And now we have the hardest task: creating the database. I had to read the documentation and ask AI for advice because I had never used Prisma before. Very cool, by the way.
> For the seed, it was very easy. I've applied web scraping techniques on my website a few times.
> In this step, I made the API and the connection to the database, reading more Prisma documentation to find methods like findUnique() and findMany().
> I wanted to improve the user experience, so I asked AI for something like an alert to confirm post deletions, and I found the confirm method. I honestly didn't know about it. Very useful for something so easy to apply.
> Well, for an EVEN BETTER user experience, I added pagination. Also if we click on a post, we'll see the unique post and a "Go back home" button.
> If we delete a post from the unique post view, it will be deleted, and we'll automatically return home.
> And if we enter a wrong URL, the not-found component will appear.
> Finally, I added a skeleton UI to make everything look prettier and Toastify dependencie to notify to the user that a post has been deleted.

> [!IMPORTANT]
>
> <h2>## Getting Started</h2>
> First, run the development server:
>
> ```bash
> npm run dev
> # or
> yarn dev
> # or
> pnpm dev
> # or
> bun dev
> ```
>
> Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> [!TIP]
>
> <h2>📄 APP Detail</h2>
> We would like to build a web app using TypeScript (TS) for the frontend and the backend. Because of that, we have decided that a technology like NextJS seems like a perfect match for our needs. It provides a lot of functionality for developers and is a “production-ready” framework.
> The application we are trying to build allows users to list posts from an API and allows the users to filter the posts by the userId of whoever wrote the post. The users of the application you are building usually travel a lot and are in places with bad or unstable internet connections and because of that we want to add some features that allow users to have a better experience.
>
> Step 1 - Setup
> Create an application using NextJS and upload it to a public repository in GitHub. If you prefer a private repository you need to request the usernames of the evaluation team. Ensure a file named assumptions.md is placed at the project's root to detail all presumed factors during development.
>
> Step 2 - Database
>
> We will need to use a database for this project. We suggest using Prisma ORM with SQLite.
>
> Create the necessary tables for a blog where several users can post several posts. You can use the data from these APIs to seed the tables https://jsonplaceholder.typicode.com/users https://jsonplaceholder.typicode.com/posts. The seeding script must be included in the solution.
>
> Important: Please put the database connection details in the .env file and push it to the repository. This is a bad practice but will make it easier for us to run the project locally
>
> Step 3 - Posts listing
>
> Create a /posts page that lists all the posts returned by the database. For the UI, use a list of “card” elements. You can see some examples at https://tailwindcss.com/ (but you don’t need to use TailwindCSS if you don’t want to)
>
> Step 4 - Post deletion
>
> Each post can be deleted. Add a button to each card to allow the posts to be deleted. When you click the “Delete” button a modal or dialog should appear asking for confirmation.
>
> Step 5 - Error handling
>
> When the endpoint fails to retrieve the posts or it fails to delete an error should be shown to the user.
