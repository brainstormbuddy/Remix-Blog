import { useEffect } from "react";
import { Link, useFetcher } from "@remix-run/react";
// interface
import type { Post } from "~/interface/post.type";

export default function PostsIndexRoute() {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load("/api/posts");
    }
  }, [fetcher]);

  return (
    <div className="p-10">
      <h2 className="text-3xl mb-2">My Posts</h2>
      <h3 className="text-2xl mb-5">Click on the post name to read the post</h3>
      <ul className="text-sky-400 text-xl">
        {fetcher.data?.map((post: Post) => (
          <li className="postList" key={post.slug}>
            <Link className="postTitle" to={post.slug}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
