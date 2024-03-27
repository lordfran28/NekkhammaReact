import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Post.css";
import {
  collection,
  query,
  where,
  getDocs,
  documentId,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Spinner } from "./Spinner";

export default function Post({ username }) {
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");

  const params = useParams();
  useEffect(() => getPost, []);

  async function getPost() {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where(documentId(), "==", params.id));
    const querySnapshot = await getDocs(q);
    const formattedPosts = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setPost(formattedPosts[0]);
  }

  async function addComment() {
    if (!comment) {
      alert("Please fill in all fields");
      return;
    }

    const postRef = doc(db, "posts", post.id);
    const newComment = {
      id: uuidv4(),
      author: username,
      body: comment,
      createdAt: Date.now(),
    };

    try {
      const postDoc = await getDoc(postRef);
      if (postDoc.exists()) {
        const postData = postDoc.data();
        const updatedComments = [...postData.comments, newComment];
        await updateDoc(postRef, { comments: updatedComments });
        console.log("Comment added");
        // for refreshing the page right after adding the comment
        getPost();
        // clear the comment box after adding the comment
        setComment("");
      } else {
        console.error("Document does not exist");
      }
    } catch (error) {
      console.error("Error adding comment: ", error.code, error.message);
    }
  }

  function getCommentsEl() {
    return post.comments.map((comment) => {
      return (
        <li key={comment.id}>
          <div
            className="comment-info"
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
              background: "#f2f2f2",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            <strong style={{ fontSize: "22px" }}>{comment.author}</strong>
            <div>{new Date(post.createdAt).toLocaleDateString("en")}</div>
          </div>
          <div style={{ padding: "10px" }}>{comment.body}</div>
        </li>
      );
    });
  }

  return (
    <>
      {!post && <Spinner />}
      {post && (
        <>
          <div className="post">
            <h2 className="postTitle">{post?.title}</h2>
            <p className="postBody">{post?.body}</p>
          </div>
          <div className="comments-section">
            <input
              type="text"
              placeholder="add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              onClick={addComment}
              style={{ marginBottom: "30px", marginTop: "10px" }}
            >
              Enter
            </button>
            <ul>{getCommentsEl()}</ul>
          </div>
        </>
      )}
    </>
  );
}
