import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch(
    `http://localhost:${process.env.SERVER_PORT}/api/posts/${params.slug}`
  );

  return json(await res.json());
};

export default function PostSlug() {
  const post = useLoaderData();

  return (
    <div
      className="postDisplay"
      dangerouslySetInnerHTML={{ __html: post?.markdown }}
    />
  );
}
