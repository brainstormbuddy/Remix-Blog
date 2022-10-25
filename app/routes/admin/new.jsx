import { redirect } from "@remix-run/node";
import { createUser } from "~/utils/user";
import { Form, useActionData, useTransition } from "@remix-run/react";

export let action = async ({ request }) => {
  let formData = await request.formData();
  let username = formData.get("username");
  let slug = formData.get("slug");
  let fullname = formData.get("fullname");

  let errors = {};
  if (!username) errors.username = true;
  if (!slug) errors.slug = true;
  if (!fullname) errors.fullname = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  await createUser({ username, slug, fullname });

  return redirect("/admin");
};

export default function NewUser() {
  // pull in errors from our action using the useActionData() hook
  let errors = useActionData();
  // transition will allow us to create a better user experience by updating the text of the submit button while creating the blog post
  let transition = useTransition();
  // we are going to create the slug for the user
  let slug = "";

  // as the Title input is updated we will generate the slug automatically.
  // My First Post slug would equal 'my-first-post'. We will convert to lower case and we will strip spaces and replace with hyphens
  const handleChange = (e) => {
    let text = e.target.value;
    // using regex and replace, let's convert spaces to dashes
    slug = text.replace(/\s/g, "-");
    // lets set the value of the slug text box to be our new slug in lowercase
    document.getElementById("slugInput").value = slug.toLowerCase();
  };
  return (
    <Form method="post">
      <p>
        <label htmlFor="">
          Username: {errors?.title && <em>Title is required</em>}{" "}
          <input onChange={handleChange} type="text" name="username" />
        </label>
      </p>
      <p>
        <label htmlFor="">
          {" "}
          User Slug: {errors?.slug && <em>Slug is required</em>}
          <input placeholder={slug} id="slugInput" type="text" name="slug" />
        </label>
      </p>
      <p>
        <label htmlFor="fullname">Fullname:</label>{" "}
        {errors?.fullname && <em>Fullname is required</em>}
        <br />
        <input id="fullname" type="text" name="fullname" />
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Creating..." : "Create User"}
        </button>
      </p>
    </Form>
  );
}
