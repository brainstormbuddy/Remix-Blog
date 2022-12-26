import { Auth } from "aws-amplify";

export async function signIn(username: any, password: any) {
  type UserId = {
    accessToken?: string;
    idToken?: string;
  };

  let userId: UserId = {};
  let exceptionError = {};
  return await Auth.signIn(username, password)
    .then((user: any) => {
      userId.accessToken = user?.signInUserSession.accessToken?.jwtToken;
      userId.idToken = user?.signInUserSession?.idToken?.jwtToken;
      return {
        msg: "success",
        userId: userId,
      };
    })
    .catch((error: any) => {
      exceptionError = error;
      throw { msg: "fail", exceptionError };
    });
}

export async function signUp(username: any, password: any, email: any) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
      },
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true,
      },
    });
  } catch (error) {
    console.log("error signing up:", error);
  }
}

export async function confirmSignUp(username: any, authCode: any) {
  let exceptionError: any = {};
  try {
    await Auth.confirmSignUp(username, authCode);
    return {
      msg: "success",
    };
  } catch (error) {
    console.log("error confirming sign up", error);
    exceptionError = error;
    return { msg: "fail", exceptionError };
  }
}
