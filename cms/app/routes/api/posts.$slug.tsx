import type { LoaderFunction } from "@remix-run/node";
// module
import invariant from "tiny-invariant";
// utils
import { getPost } from "~/utils/post";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};
