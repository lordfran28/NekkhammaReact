import "./Forum.css"

export default function Forum() {
  return (
    <>
      <div className="forumContainer">
        <h1>Discussions</h1>
        <button className="startADiscussionButton">Start a discussion</button>
       <ul class= "threadContainer">
        <li className="thread">
          Going Forth: What Monastery do you guys recommend? Pabbajjā
        </li>
        <li className="thread">
          Seclusion: Should I give away my dog to live truly alone? 
        </li>
        <li className="thread">
        Good time to build my cabin with these wood prices? 
        </li>
        <li className= "thread">
          Is it easy to learn Pali?
        </li>
       </ul>
      </div>
    </>
  );
}