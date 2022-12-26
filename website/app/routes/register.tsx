import type { ActionFunction } from "@remix-run/node";
import {
  Link,
  Form,
  useTransition,
  useActionData,
  useNavigate,
} from "@remix-run/react";
import React, { useEffect } from "react";

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let response = await fetch(
    `http://localhost:${process.env.SERVER_PORT}/api/register`,
    {
      method: "post",
      body: formData,
    }
  );

  return response;
};

export default function Register() {
  const navigation = useNavigate();
  let data = useActionData();
  // transition will allow us to create a better user experience by updating the text of the submit button while registering the user.
  let transition = useTransition();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return event.target.value;
  };

  useEffect(() => {
    if (data?.redirectTo) navigation(data?.redirectTo);
  }, [data, navigation]);

  return (
    <Form method="post">
      <div className="p-10">
        <p>
          <label htmlFor="username" className="text-2xl">
            Username: {data?.errors?.username && <em>Username is required</em>}
            <br />
            <input
              name="username"
              type="text"
              className="w-full ring-1 ring-black mb-5"
              onChange={handleChange}
              placeholder="username"
            />
          </label>
        </p>
        <p>
          <label htmlFor="password" className="text-2xl">
            Password: {data?.errors?.password && <em>Password is required</em>}
            <br />
            <input
              name="password"
              type="password"
              className="w-full ring-1 ring-black mb-5"
              onChange={handleChange}
              placeholder="password"
            />
          </label>
        </p>
        <p>
          <label htmlFor="email" className="text-2xl">
            Email: {data?.errors?.email && <em>Email is required</em>}
            <br />
            <input
              name="email"
              type="email"
              className="w-full ring-1 ring-black mb-5"
              onChange={handleChange}
              placeholder="email"
            />
          </label>
        </p>
        <div className="flex items-center justify-center gap-10">
          <button
            type="submit"
            className="p-2 bg-sky-400 text-xl rounded-md text-white"
          >
            {transition.submission ? "Creating..." : "Register"}
          </button>
          <Link
            to="/login"
            className="p-2 bg-sky-400 text-xl rounded-md text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </Form>
  );
}
