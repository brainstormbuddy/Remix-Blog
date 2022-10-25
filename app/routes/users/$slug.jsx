import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getUser } from "~/utils/user";

export let loader = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getUser(params.slug);
};

export default function PostSlug() {
  let user = useLoaderData();

  return (
    <div
      className="postDisplay"
      dangerouslySetInnerHTML={{ __html: user.html }}
    />
  );
}
