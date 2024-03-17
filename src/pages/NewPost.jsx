import { useState } from "react";

export default function NewPost() {
  const [newPost, setNewPost] = useState("");
  console.log(newPost);
  return (
    <div>
      <h1>Add new post</h1>
      <input type="text" placeholder="Title" />
      <textarea
        placeholder="post..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />
    </div>
  );
}
