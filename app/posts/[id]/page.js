import getPosts from "@/lib/getPosts";

export async function generateMetadata({ params }) {
  const { id } = params;
  const post = await getPosts(id);

  return {
    title: post.title,
    description: post.body,
  };
}

export default async function PostPage({ params }) {
  const { id } = params;

  const post = await getPosts(id);

  return (
    <div className="mt-5">
      <h2 className="text-lg text-blue-500 font-medium my-2">{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
