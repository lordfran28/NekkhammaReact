import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ setIsUserLoggedIn, setuserName, username }) {
  return (
    <div className="site-wrapper">
      <Header
        setIsUserLoggedIn={setIsUserLoggedIn}
        setuserName={setuserName}
        username={username}
      />
      <Outlet />
      <Footer />
    </div>
  );
}
