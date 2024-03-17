import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./pages/About";
import Home from "./pages/Home";
import Forum from "./pages/Forum";
import SignIn from "./pages/SignIn";
import Post from "./components/Post";
import Essays from "./pages/Essays";
import PaliCanon from "./pages/PaliCanon";
import NewPost from "./pages/NewPost";
import "./App.css";

export default function App() {
  const [posts, setPosts] = useState([
    {
      id: 0,
      title: "His mother had always taught him",
      body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
      createdAt: Date.now(),
      comments: [{ id: 0, user: "Aaron", body: "Hello world!" }],
    },
    {
      id: 1,
      title: "He was an expert but not in a discipline",
      body: "He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.",
      createdAt: Date.now(),
      comments: [{ id: 1, user: "Rakesh", body: "Hello React!" }],
    },
  ]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/forum" element={<Forum posts={posts} />} />
          <Route
            path="/forum/:id"
            element={<Post posts={posts} setPosts={setPosts} />}
          />
          <Route path="/essays" element={<Essays />} />
          <Route path="/paliCanon" element={<PaliCanon />} />
          <Route path="/newPost" element={<NewPost setPosts={setPosts} />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
