import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
