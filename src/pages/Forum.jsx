import "./Forum.css";

// export default function Forum() {
//   return (
//     <>
//       <div className="forumContainer">
//         <h1>Discussions</h1>
//         <button className="startADiscussionButton">Start a discussion</button>
//         <ul className="threadContainer">
//           <li className="thread">
//             Going Forth: What Monastery do you guys recommend? Pabbajjā
//           </li>
//           <li className="thread">
//             Seclusion: Should I give away my dog to live truly alone?
//           </li>
//           <li className="thread">
//             Good time to build my cabin with these wood prices?
//           </li>
//           <li className="thread">Is it easy to learn Pali?</li>
//         </ul>
//       </div>
//     </>
//   );
// }

import { useState, useEffect } from "react";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    // Fetch initial list of posts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // const response = await axios.get("https://your-api-url/posts");
      const response = await fetch("https://dummyjson.com/posts");
      const postsData = await response.json();
      setPosts(postsData.posts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const addPost = async (postData) => {
    // try {
    //   const response = await axios.post("https://your-api-url/posts", postData);
    //   setPosts([...posts, response.data]);
    // } catch (error) {
    //   console.error("Failed to add post:", error);
    // }
  };

  return (
    <div className="forumContainer">
      <h1>Discussions</h1>
      <button className="startADiscussionButton">Start a discussion</button>
      <ul className="threadContainer">
        {posts.map((post) => (
          <li key={post.id} className="thread">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
