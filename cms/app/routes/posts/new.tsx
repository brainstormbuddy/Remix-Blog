import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { createPost } from "~/utils/post";
import { Form, useActionData, useTransition } from "@remix-run/react";
import React from "react";
// interface
import type { Post } from "~/interface/post.type";

type Errors = {
  title?: boolean;
  slug?: boolean;
  markdown?: boolean;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const slug = formData.get("slug")?.toString();
  const markdown = formData.get("markdown")?.toString();

  const errors: Errors = {};

  if (!title) {
    errors.title = true;
  }
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (!title || !slug || !markdown) {
    return errors;
  }

  const newPost: Post = {
    title,
    slug,
    markdown,
  };

  await createPost(newPost);

  return redirect("/posts");
};

export default function NewPostRoute() {
  // pull in errors from our action using the useActionData() hook
  const errors = useActionData<Errors>();
  // transition will allow us to create a better user experience by updating the text of the submit button while creating the blog post
  const transition = useTransition();
  // we are going to create the slug for the user
  let slug = "";

  // as the Title input is updated we will generate the slug automatically.
  // My First Post slug would equal 'my-first-post'. We will convert to lower case and we will strip spaces and replace with hyphens
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    // using regex and replace, let's convert spaces to dashes
    slug = text.replace(/\s/g, "-");
    // lets set the value of the slug text box to be our new slug in lowercase
    const slugElement = document.getElementById("slugInput") as HTMLFormElement;
    slugElement.value = slug.toLowerCase();
  };
  return (
    <Form method="post">
      <div className="p-10">
        <p>
          <label htmlFor="title" className="text-2xl">
            Post Title: {errors?.title && <em>Title is required</em>}{" "}
            <input
              onChange={handleChange}
              type="text"
              className="mt-2 w-full ring-1 ring-black outline-1"
              name="title"
            />
          </label>
        </p>
        <p>
          <label htmlFor="slug" className="text-2xl">
            Post Slug: {errors?.slug && <em>Slug is required</em>}
            <input
              placeholder={slug}
              id="slugInput"
              type="text"
              className="mt-2 w-full ring-1 ring-black outline-1"
              name="slug"
            />
          </label>
        </p>
        <p>
          <label htmlFor="markdown" className="text-2xl">
            Markdown:
          </label>
          {errors?.markdown && <em>Markdown is required</em>}
          <br />
          <textarea
            name="markdown"
            id="markdown"
            rows={15}
            className="mt-2 w-full ring-1 ring-black outline-1"
          />
        </p>
        <p>
          <button type="submit" className="bg-sky-400 p-2 rounded-md">
            {transition.submission ? "Creating..." : "Create Post"}
          </button>
        </p>
      </div>
    </Form>
  );
}
