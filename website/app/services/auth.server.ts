import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { GoogleStrategy, SocialsProvider } from "remix-auth-socials";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
// export const authenticator = new Authenticator(sessionStorage);
export let authenticator = new Authenticator(sessionStorage, { sessionKey: '_session' });

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret:  process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: `http://localhost:3000/auth/${SocialsProvider.GOOGLE}/callback`,
    },
    async ({ profile }) => {
      // here you would find or create a user in your database
      console.log("profile", profile);
      return profile;
    }
  )
);
