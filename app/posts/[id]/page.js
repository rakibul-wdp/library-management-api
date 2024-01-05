import Comments from "@/app/components/Comments";
import getAllPosts from "@/lib/getAllPosts";
import getPostComments from "@/lib/getPostComments";
import getPosts from "@/lib/getPosts";
import { Suspense } from "react";

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

  const postPromise = await getPosts(id);
  const commentsPromise = await getPostComments(id);

  const post = await postPromise;

  // const [post, comments] = await Promise.all([postPromise, commentsPromise]);

  return (
    <div className="mt-5">
      <h2 className="text-lg text-blue-500 font-medium my-2">{post.title}</h2>
      <p>{post.body}</p>
      <hr />
      <Suspense fallback="<h2>Loading comments...</h2>">
        <Comments promise={commentsPromise} />
      </Suspense>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}
