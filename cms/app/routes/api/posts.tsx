import type { LoaderFunction } from "@remix-run/node";
// utils
import { getPosts } from "~/utils/post";

export const loader: LoaderFunction = async() => {
  return getPosts();
};
