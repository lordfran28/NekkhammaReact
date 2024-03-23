import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Post.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { DocumentSnapshot, collection, query, where, getDocs, documentId } from "firebase/firestore";
import { db } from "../firebase";
import {Spinner } from "./Spinner";



export default function Post({ posts, setPosts }) {
  const [post, setPost] = useState();
  const params = useParams();


  useEffect(() => {
   const postsRef = collection(db, "posts");
  const q = query(postsRef, where(documentId(), "==", params.id));
 getDocs(q).then((querySnapshot)=>{
  const formattedPosts = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  setPost(formattedPosts[0]);
})  
  }, []);
  // const post = posts.find((post) => post.id == params.id);
  // const [comment, setComment] = useState("");
  // const [username, setuserName] = useState("");

  // const commentsEl = posts.map((p) => {
  //   if (p.id == post.id) {
  //     return p.comments.map((comment) => {
  //       return <li key={comment.id}>{comment.body}</li>;
  //     });
  //   }
  // });

  // useEffect(() => {
  //   const auth = getAuth(app);
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const username = user.email.split("@")[0];
  //       setuserName(username);
  //     } else {
  //       console.log("User is signed out");
  //     }
  //   });
  // }, []);

  // function addComment() {
  //   setPosts((prevPosts) => {
  //     const updatedPosts = prevPosts.map((p) => {
  //       if (p.id === post.id) {
  //         return {
  //           ...p,
  //           comments: [
  //             ...(p.comments || []),
  //             { id: uuidv4(), user: username, body: comment },
  //           ],
  //         };
  //       }
  //       return p;
  //     });

  //     return updatedPosts;
  //   });
  // }

  return (
    <>
    {post && <div className="post">
      <h2 className="postTitle">{post?.title}</h2>
      <p className="postBody">{post?.body}</p>
    </div>}
    {!post && <Spinner/>}
      {/* <div className="comments-section">
        <input
          type="text"
          placeholder="add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={addComment}>Enter</button>
        <ul>{commentsEl}</ul>
      </div> */}
    </>
  );
}
