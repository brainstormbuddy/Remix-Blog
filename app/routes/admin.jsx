import { Outlet, Link, useLoaderData } from "@remix-run/react";
import { getUsers } from "~/utils/user";
// import adminStyles from "~/styles/admin.css";

//create a stylesheet ref for the admin.css file
// export let links = () => {
//   return [{ rel: "stylesheet", href: adminStyles }];
// };

export let loader = () => {
  return getUsers();
};

export default function Admin() {
  let users = useLoaderData();
  return (
    <div className="admin">
      <h1 className="adminTitle">Admin</h1>
      <nav>
        <p>Click on a username to edit the user's information</p>
        <ul>
          {users.map((user) => (
            <li key={user.slug}>
              <Link to={user.slug}>{user.username}</Link>
            </li>
          ))}
        </ul>
        <main>
          {/* Outlet renders the /admin/index.jsx */}
          <Outlet />
        </main>
      </nav>
    </div>
  );
}
