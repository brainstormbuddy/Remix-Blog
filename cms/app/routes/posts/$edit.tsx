import { useEffect } from "react";
import {
  Form,
  useActionData,
  useTransition,
  useFetcher,
  useParams,
} from "@remix-run/react";

export default function EditPost() {
  let errors = useActionData();
  let transition = useTransition();

  const fetcher = useFetcher();
  const params = useParams();

  // load data here by calling the API route
  useEffect(() => {
    if (params?.edit !== undefined && fetcher.state !== "loading") {
      fetcher.load(`/api/posts/${params.edit}`);
    }
  }, [params.edit, fetcher]);

  return (
    // post the request to the api route not the default component route
    <Form method="post" action="/api/update-post">
      <div className="p-10">
        <input
          className="hiddenBlogID"
          name="id"
          defaultValue={fetcher.data?.id}
          style={{ display: "none" }}
        ></input>
        <p>
          <label htmlFor="title" className="text-2xl">
            Post Title: {errors?.title && <em>Title is required</em>}
            <input
              type="text"
              className="mt-2 w-full ring-1 ring-black outline-1"
              name="title"
              defaultValue={fetcher.data?.title}
            />
          </label>
        </p>
        <p>
          <label htmlFor="slug" className="text-2xl">
            Post Slug: {errors?.slug && <em>Slug is required</em>}
            <input
              defaultValue={fetcher.data?.slug}
              id="slugInput"
              className="mt-2 w-full ring-1 ring-black outline-1"
              type="text"
              name="slug"
            />
          </label>
        </p>
        <p>
          <label htmlFor="markdown"  className="text-2xl">Markdown:</label>{" "}
          {errors?.markdown && <em>Markdown is required</em>}
          <br />
          <textarea
            defaultValue={fetcher.data?.markdown}
            name="markdown"
            id="markdown"
            className="mt-2 w-full ring-1 ring-black outline-1"
            rows={15}
          />
        </p>
        <p>
          <button type="submit" className="bg-sky-400 p-2 rounded-md">
            {transition.submission ? "Updating..." : "Update Post"}
          </button>
        </p>
      </div>
    </Form>
  );
}
