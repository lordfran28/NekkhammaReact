import "./NewPost.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function NewPost({ username, currentUserId }) {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState({
    userId: currentUserId,
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

  // view 1 - all posts (done)
  // view 2 - details of a post (done)
  // view 3 - new post form (home work)
  // -- send the new post to DB
  // -- wait for the DB to say okay, ive saved it
  // -- then redirect user the the forum path in router

  async function post() {
    if (!newPost.title && !newPost.body) {
      alert("Please fill in all fields");
      return;
    }
    // firebase firestore logic here for adding post to the DB
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        userId: currentUserId,
        author: username,
        title: newPost.title,
        body: newPost.body,
        createdAt: Date.now(),
        comments: [],
      });
      console.log("Document written with ID: ", docRef.id);
      navigate("/forum");
    } catch (e) {
      alert("Error adding document: ", e.message);
    }
  }

  return (
    <div className="newPost__container">
      <input
        type="text"
        placeholder="Title"
        value={newPost.title}
        name="title"
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

      <button className="newPost__button" onClick={post}>
        Post
      </button>
    </div>
  );
}
