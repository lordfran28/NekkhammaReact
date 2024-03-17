import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Post.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";

export default function Post({ posts, setPosts }) {
  const params = useParams();
  const post = posts.find((post) => post.id == params.id);
  const [comment, setComment] = useState("");
  const [username, setuserName] = useState("");

  const commentsEl = posts.map((p) => {
    if (p.id == post.id) {
      return p.comments.map((comment) => {
        return <li key={comment.id}>{comment.body}</li>;
      });
    }
  });

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const username = user.email.split("@")[0];
        setuserName(username);
      } else {
        console.log("User is signed out");
      }
    });
  }, []);

  function addComment() {
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((p) => {
        if (p.id === post.id) {
          return {
            ...p,
            comments: [
              ...(p.comments || []),
              { id: uuidv4(), user: username, body: comment },
            ],
          };
        }
        return p;
      });

      return updatedPosts;
    });
  }

  return (
    <>
      <div className="post">
        <h2 className="postTitle">{post.title}</h2>
        <p className="postBody">{post.body}</p>
      </div>
      <div className="comments-section">
        <input
          type="text"
          placeholder="add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={addComment}>Enter</button>
        <ul>{commentsEl}</ul>
      </div>
    </>
  );
}
