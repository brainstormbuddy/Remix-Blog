import type { ActionFunction } from "@remix-run/node";
import { Form, useParams, useActionData, useNavigate } from "@remix-run/react";
import React, { useEffect } from "react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const response = await fetch(
    `http://localhost:5000/api/verify-code/${username}`,
    {
      method: "post",
      body: formData,
    }
  );

  return response;
};

export default function Confirmation() {
  const params = useParams();
  const navigation = useNavigate();

  let data = useActionData();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return event.target.value;
  };

  useEffect(() => {
    if (data?.result?.msg === "success") navigation("/login");
  }, [data, navigation]);

  return (
    <Form method="post">
      <div className="p-10">
        {data?.result?.exceptionError?.code === "CodeMismatchException" ? (
          <h2>Invalid verification code provided, please try again.</h2>
        ) : null}
        <p>
          <input
            name="username"
            defaultValue={params.username}
            style={{ display: "none" }}
          />
          <label htmlFor="authCode" className="text-2xl">
            Cofirm Code :
            {data?.errors?.authCode && <em>AuthCode is required</em>}
            <br />
            <input
              type="number"
              name="authCode"
              className="w-full ring-1 ring-black mb-5"
              onChange={handleChange}
              placeholder="Confirmation Code"
            />
          </label>
        </p>

        <button type="submit" className="p-2 bg-sky-400 text-xl rounded-md text-white">
          Confirmation Sign Up
        </button>
      </div>
    </Form>
  );
}
