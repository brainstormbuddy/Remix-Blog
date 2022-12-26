import type { ActionFunction } from '@remix-run/node';
import { authenticator } from "../services/auth.server";
import { SocialsProvider } from 'remix-auth-socials';

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: "/posts",
    failureRedirect: "/",
  });
};
