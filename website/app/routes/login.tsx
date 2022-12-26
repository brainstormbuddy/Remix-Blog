import type { ActionFunction } from "@remix-run/node";
import { Link, Form, useActionData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { SocialsProvider } from "remix-auth-socials";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const response = await fetch(
    `http://localhost:${process.env.SERVER_PORT}/api/login`,
    {
      method: "post",
      body: formData,
    }
  );

  return response;
};

export default function Login() {
  const navigation = useNavigate();
  const data = useActionData();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return event.target.value;
  };

  interface SocialButtonProps {
    provider: SocialsProvider;
    label: string;
  }

  useEffect(() => {
    if (data?.msg === "success") navigation("/");
  }, [data, navigation]);

  const SocialButton: React.FC<SocialButtonProps> = ({ provider, label }) => (
    <Form action={`/auth/${provider}`} method="post">
      <button className="p-2 bg-sky-400 text-xl rounded-md text-white">
        {label}
      </button>
    </Form>
  );

  return (
    <div className="p-10">
      <Form method="post">
        {data?.exceptionError?.code === "UserNotFoundException" ? (
          <h2 className="text-2xl">User does not exist.</h2>
        ) : null}

        {data?.exceptionError?.code === "NotAuthorizedException" ? (
          <h2 className="text-2xl">Incorrect username or password.</h2>
        ) : null}

        <p>
          <label htmlFor="username" className="text-2xl">
            Username: {data?.errors?.username && <em>Username is required</em>}
            <br />
            <input
              type="text"
              name="username"
              className="w-full ring-black ring-1 mb-5"
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
              type="password"
              name="password"
              className="w-full ring-black ring-1 mb-5"
              onChange={handleChange}
              placeholder="password"
            />
          </label>
        </p>
        <div className="flex items-center justify-center gap-10">
          <button
            type="submit"
            className="p-2 bg-sky-400 text-xl rounded-md text-white"
          >
            Login
          </button>
          <Link
            to="/register"
            className="p-2 bg-sky-400 text-xl rounded-md text-white"
          >
            Register
          </Link>
        </div>
      </Form>
      <SocialButton
        provider={SocialsProvider.GOOGLE}
        label="Login with Google"
      />
    </div>
  );
}
