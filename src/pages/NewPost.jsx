import { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function NewPost({ setPosts }) {
  const [newPost, setNewPost] = useState({
    id: uuidv4(),
    title: "",
    body: "",
    createdAt: Date.now(),
    // comments: [{ id: 1, user: "Rakesh", body: "Hello React!" }],
    comments: [],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNewPost((prevNewPost) => {
      return {
        ...prevNewPost,
        [name]: value,
      };
    });
  }

  function post() {
    setPosts((prevPosts) => {
      return [newPost, ...prevPosts];
    });
  }

  return (
    <div>
      <h1>Add new post</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          name="title"
          onChange={handleChange}
        />
      </div>

      <div>
        <textarea
          placeholder="post..."
          value={newPost.body}
          name="body"
          onChange={handleChange}
        />
      </div>
      <Link to="/forum">
        <button onClick={post}>Post</button>
      </Link>
    </div>
  );
}
