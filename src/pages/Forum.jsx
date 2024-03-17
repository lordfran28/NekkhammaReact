import { Link } from "react-router-dom";
import "./Forum.css";

export default function Forum({ posts }) {
  console.log(posts);
  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  // const fetchPosts = async () => {
  //   try {
  //     const response = await fetch("https://dummyjson.com/posts");
  //     const postsData = await response.json();
  //     setPosts(postsData.posts);
  //   } catch (error) {
  //     console.error("Failed to fetch posts:", error);
  //   }
  // };

  return (
    <div className="forumContainer">
      <h1>Discussions</h1>
      <Link to="/newPost">
        <button className="startADiscussionButton">Start a discussion</button>
      </Link>
      <ul className="threadContainer">
        {posts.map((post) => (
          <Link to={`${post.id}`} key={post.id}>
            <li className="thread">
              <div>{post.title}</div>
              <div>{post.author}</div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

// import "./Forum.css";
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
