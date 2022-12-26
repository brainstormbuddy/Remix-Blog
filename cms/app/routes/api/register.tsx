import type { ActionFunction } from "@remix-run/node";
// utils
import { signUp } from "~/utils/auth";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();
  const email = formData.get("email")?.toString();

  type Errors = {
    username?: boolean;
    password?: boolean;
    email?: boolean;
  };

  const errors: Errors = {};
  const redirectTo = `/verify-code/${username}`;
  if (!username) errors.username = true;
  if (!password) errors.password = true;
  if (!email) errors.email = true;

  if (!username || !password || !email) {
    return { errors };
  }

  await signUp(username, password, email);

  return { redirectTo };
};
