import { Link } from "@remix-run/react";

export default function AdminIndex() {
  return (
    <div className="adminNewPostLink">
      <Link to="new">
        {" "}
        <button className="adminNewPostButton">Create a New User</button>
      </Link>
    </div>
  );
}
