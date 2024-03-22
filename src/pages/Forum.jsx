import { Link } from "react-router-dom";
import "./Forum.css";

export default function Forum({ posts }) {
  return (
    <div className="forumContainer">
      <Link to="/newPost">
        <button className="startADiscussionButton">Start a discussion</button>
      </Link>
      <ul className="threadContainer">
        {
        posts.map((post) => (
          <Link to={`${post.id}`} key={post.id}>
            <li className="thread">
              <div>{post.title}</div>
              <div>{post.author}</div>
            </li>
          </Link>
        ))
        }
      </ul>
    </div>
  );
}

