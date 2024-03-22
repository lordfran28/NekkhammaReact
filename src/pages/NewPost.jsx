import "./NewPost.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function NewPost({ setPosts, username }) {
  const [newPost, setNewPost] = useState({
    author: username,
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

  async function post() {
    setPosts((prevPosts) => {
      return [newPost, ...prevPosts];
    });

    // firebase firestore logic here for adding post to the DB
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        author: username,
        title: newPost.title,
        body: newPost.body,
        createdAt: Date.now(),
        comments: []
      });
      alert("Document written with ID: ", docRef.id);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  }

  return (
    <div className="newPost__container">
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          name ="title"
          className="newPost__titleInput"
          onChange={handleChange}
        />

        <textarea
          placeholder="post..."
          value={newPost.body}
          name="body"
          className="newPost__postInput"
          onChange={handleChange}
        />
      <Link to="/forum">
        <button className="newPost__button" onClick={post}>Post</button>
      </Link>
    </div>
  );
}
