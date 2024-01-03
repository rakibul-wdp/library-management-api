export default async function Comments({ promise }) {
  const comments = await promise;

  return (
    <div className="mt-5">
      <h2>Comments:</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </div>
  );
}
