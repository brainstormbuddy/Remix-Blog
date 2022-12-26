import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
// hooks
import useDebounce from "~/hooks/useDebounce";

export const loader: LoaderFunction = async () => {
  const res = await fetch(
    `http://localhost:${process.env.SERVER_PORT}/api/posts`
  );
  return json(await res.json());
};

export default function Posts() {
  const posts = useLoaderData();
  // Search term
  const [searchTerm, setSearchTerm] = useState("");
  // API search results
  const [results, setResults] = useState<any[]>(posts);
  // Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState<boolean>(false);
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  // search function
  function searchPosts(searchText: string) {
    if (searchText) {
      let res = posts.filter((item: any) => {
        return item.title.search(searchText) != -1;
      });
      setResults(res);
      setIsSearching(false);
      return res;
    }
  }

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchPosts(debouncedSearchTerm);
      } else {
        setResults(posts);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <div className="p-10">
      <h2 className="text-3xl mb-2">My Posts</h2>
      <input
        type="text"
        className="w-full text-xl ring-1 ring-black outline-1 mb-2"
        name="search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isSearching && <p>Searching ...</p>}
      <h3 className="text-2xl mb-5">Click on the post name to read the post</h3>
      <ul className="text-sky-400 text-xl">
        {results?.map((post: any) => (
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
