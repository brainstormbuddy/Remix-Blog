import type { ActionFunction } from "@remix-run/node";
// utils
import { confirmSignUp } from "~/utils/auth";

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const username = params.username;
  const authCode = formData.get("authCode");

  type Errors = {
    username?: boolean;
    authCode?: boolean;
  };

  const errors: Errors = {};
  let result = {};
  if (!username) errors.username = true;
  if (!authCode) errors.authCode = true;

  if (!username || !authCode) {
    return { errors };
  }

  result = await confirmSignUp(username, authCode);

  return { result };
};
