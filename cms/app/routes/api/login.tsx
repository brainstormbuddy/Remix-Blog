import type { ActionFunction } from "@remix-run/node";
// utils
import { createUserSession } from "~/utils/session.server";
import { signIn } from "~/utils/auth";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();
  let accessToken, idToken;

  type Errors = {
    username?: boolean;
    password?: boolean;
  };
  const errors: Errors = {};
  //   let result, exceptionError;

  if (!username) errors.username = true;
  if (!password) errors.password = true;

  if (Object.keys(errors).length) {
    return { errors };
  }

  return signIn(username, password)
    .then(async (result) => {
      accessToken = result.userId.accessToken;
      idToken = result.userId.idToken;

      await createUserSession({
        request,
        userInfo: {
          accessToken,
          idToken,
        },
      });
      return result;
    })
    .catch((error) => {
      return error;
    });
};
