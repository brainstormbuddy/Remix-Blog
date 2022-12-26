import { redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
// utils
import { updatePost } from "~/utils/post";

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
  const id = formData.get("id")?.toString();

  const errors: Errors = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (!title || !slug || !markdown) {
    return errors;
  }

  await updatePost({ id, title, slug, markdown });

  return redirect("/posts");
};
