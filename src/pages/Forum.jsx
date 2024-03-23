import { Link } from "react-router-dom";
import "./Forum.css";
import {collection, getDocs} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function Forum() {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    console.log("Forum component is mounted and state is empty", posts);
    // Whatver we do here, is done after the component is rendered
    getDocs(collection(db, 'posts')).then((querySnapshot) => {
      console.log("Firestore DB returned data:", querySnapshot.docs);
      const formatted = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("Formatted data that a normal person can understand:", formatted);
      setPosts(formatted);
    });
   
  }, []);

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
              <div>{new Date(post.createdAt).toLocaleDateString("en")}</div>
            </li>
          </Link>
        ))
        }
      </ul>
    </div>
  );
}

