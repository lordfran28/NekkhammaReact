import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { app } from "../firebase";
import logo1 from "../assets/logo1.png";

export default function Header() {
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

  function handleSignOut() {
    const auth = getAuth();
    if (username) {
      signOut(auth)
        .then(() => {
          setuserName("");
          console.log("Sign-out successful");
        })
        .catch((error) => {
          console.log("An error happened. while loggin out", error);
        });
    }
  }

  //if user is not logged in then set it to Guest, else their username
  let displayName = username ? username : "";

  // capitalizing their username if logged in
  if (username) {
    displayName = username.charAt(0).toUpperCase() + username.slice(1);
  }

  // user sign-in status
  let signInStatus = username ? "Sign Out" : "Sign In";
  return (
    <>
      <header>
        <img src={logo1} className="logo" alt="logo" />
      </header>
      <nav>
        <ul className="navText">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/forum">Forum</Link>
          </li>
          <li>
            <Link to="/essays">Essays</Link>
          </li>
          <li>
            <Link to="/paliCanon">Pali Canon</Link>
          </li>
          <li className="sign-in-out">
            <div>
              <p>{displayName}</p>
              <Link to={!username && "/signin"}>
                <p onClick={handleSignOut}>{signInStatus}</p>
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
