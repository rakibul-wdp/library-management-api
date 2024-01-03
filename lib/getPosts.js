export default async function getPosts(id) {
  const result = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  return result.json();
}
