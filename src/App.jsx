import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase";
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
  const [username, setuserName] = useState("");

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

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<Post username={username} />} />
          <Route path="/essays" element={<Essays />} />
          <Route path="/paliCanon" element={<PaliCanon />} />
          <Route path="/newPost" element={<NewPost username={username} />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
