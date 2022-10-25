import invariant from "tiny-invariant";
import { getUserEdit, updateUser } from "~/utils/user";
import { redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useTransition,
  useLoaderData,
} from "@remix-run/react";

export let loader = async ({ params }) => {
  invariant(params.edit, "expected params.edit");
  return getUserEdit(params.edit);
};

export let action = async ({ request }) => {
  let formData = await request.formData();

  let username = formData.get("username");
  let slug = formData.get("slug");
  let fullname = formData.get("fullname");
  let id = formData.get("id");

  let errors = {};
  if (!username) errors.username = true;
  if (!slug) errors.slug = true;
  if (!fullname) errors.fullname = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  console.log(
    "calling updateUser with id, username, slug, fullname: ",
    id,
    username,
    slug,
    fullname
  );
  await updateUser({ id, username, slug, fullname });

  return redirect("/admin");
};

export default function UserSlug() {
  let errors = useActionData();
  let transition = useTransition();
  let user = useLoaderData();

  return (
    <Form method="post">
      <input className="hiddenBlogID" name="id" defaultValue={user.id} style={{display: "none"}}></input>
      <p>
        <label htmlFor="">
          Username: {errors?.title && <em>Title is required</em>}{" "}
          <input type="text" name="username" defaultValue={user.username} />
        </label>
      </p>
      <p>
        <label htmlFor="us">
          {" "}
          User Slug: {errors?.slug && <em>Slug is required</em>}
          <input
            defaultValue={user.slug}
            id="slugInput"
            type="text"
            name="slug"
          />
        </label>
      </p>
      <p>
        <label htmlFor="fullname">Fullname:</label>{" "}
        {errors?.fullname && <em>Fullname is required</em>}
        <br />
        <input
          defaultValue={user.fullname}
          id="fullname"
          type="text"
          name="fullname"
        />
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Updating..." : "Update User"}
        </button>
      </p>
    </Form>
  );
}
