import { getUsers } from "~/utils/user"
import { Link, useLoaderData } from "@remix-run/react";

export let loader = () => {
    return getUsers();
}

export default function Users() {
    let users = useLoaderData();

    return (
        <div>
            <h1>Users</h1>
            <p>Click on the username to read the full name</p>
            <ul>
                {users.map(user => (
                    <li className="postList" key={user.slug}>
                        <Link className="postTitle" to={user.slug}>{user.username}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}