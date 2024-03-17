import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Post.css";

export default function Post() {
  const params = useParams();
  const [post, setPost] = useState({});
  console.log(post);

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${params.id}`)
      .then((res) => res.json())
      .then((post) => setPost(post));
  }, []);
  return (
    <>
      <div className="post">
        <h2 className='postTitle'>{post.title}</h2>
        <p className='postBody'>{post.body}</p>
      </div>
      <div className="comments">
      <button className='replyButt'>Add a comment</button>
        <ul>
          <li>Comment 1</li>
          <li>Comment 2</li>
          <li>Comment 3</li>
        </ul>
        
      </div>
    </>
  );
}
