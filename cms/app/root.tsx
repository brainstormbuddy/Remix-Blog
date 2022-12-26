import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
  LiveReload,
  Meta,
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

// layout
import Layout from "./layout";
// style
import styles from "./styles/app.css";
// amplify configure
import Amplify from "aws-amplify";
import config from "../src/aws-exports";

Amplify.configure(config);

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "CMS App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout />
        <div className="pt-20 w-full mx-auto md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
