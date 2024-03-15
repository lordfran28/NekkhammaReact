import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./pages/About";
import Home from "./pages/Home";
import Forum from "./pages/Forum";
import SignIn from "./pages/SignIn";
import "./App.css";
import Post from "./components/Post";
import Essays from "./pages/Essays";
import PaliCanon from "./pages/PaliCanon";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<Post />} />
          <Route path="/essays" element={<Essays />} />
          <Route path="/paliCanon" element={<PaliCanon />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
