import { notFound } from "next/navigation";

export default function Blog({ params }) {
  const { id } = params;

  if (id >= "3") {
    notFound();
  }

  return <div className="mt-5">The blog id is: {id}</div>;
}
