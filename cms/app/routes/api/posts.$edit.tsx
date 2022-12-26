import type { LoaderFunction } from "@remix-run/node";
// module
import invariant from "tiny-invariant";
// utils
import { getPostEdit } from "~/utils/post";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.edit, "expected params.edit");
  return getPostEdit(params.edit);
};
