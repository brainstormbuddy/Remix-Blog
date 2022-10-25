import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getPost } from "~/utils/post";

export let loader = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};

export default function PostSlug() {
  let post = useLoaderData();
  
  return (
    <div
      className="postDisplay"
      dangerouslySetInnerHTML={{ __html: post.html }}
    />
  );
}
