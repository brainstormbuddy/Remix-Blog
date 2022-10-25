import { Link } from "@remix-run/react";

export default function AdminIndex() {
  return (
    <div className="adminNewPostLink">
      <Link to="new">
        {" "}
        <button className="adminNewPostButton">Create a New Post</button>
      </Link>
    </div>
  );
}
