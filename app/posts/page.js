import getAllPosts from "@/lib/getAllPosts";
import Link from "next/link";

export default async function Posts() {
  const posts = await getAllPosts();
  console.log(posts);

  return (
    <div className="mt-5">
      <h2 className="my-5 text-xl font-semibold">All Posts</h2>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
