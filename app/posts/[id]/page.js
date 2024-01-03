import getPosts from "@/lib/getPosts";

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
