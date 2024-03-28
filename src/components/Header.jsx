import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import DropdownUserMenu from "./DropdownUserMenu";

export default function Header({ setIsUserLoggedIn, setuserName, username }) {
  // const navigate = useNavigate();

  function handleSignOut() {
    const auth = getAuth();
    if (username) {
      signOut(auth)
        .then(() => {
          setuserName("");
          console.log("Sign-out successful");
          setIsUserLoggedIn(false);
          // navigate("/");
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
    <div>
      <header>
        <Link to="/">
          <img src={logo1} className="logo" alt="logo" />
        </Link>
      </header>
      <nav>
        <ul className="navText">
          <li>
            <Link className="navLink" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="navLink" to="/about">
              About
            </Link>
          </li>

          <li>
            <Link className="navLink" to="/essays">
              Essays
            </Link>
          </li>
          <li>
            <Link className="navLink" to="/paliCanon">
              Pali Canon
            </Link>
          </li>
          <li>
            <Link className="navLink" to="/forum">
              Forum
            </Link>
          </li>
          {/* <li className="sign-in-out navLink"></li> */}
        </ul>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            width: "150px",
          }}
        >
          <p>{displayName}</p>
          <Link to={!username && "/signin"}>
            <p onClick={handleSignOut}>{signInStatus}</p>
          </Link>
        </div>
        {/* <div className="dropdown-container">
          <DropdownUserMenu />
        </div> */}
      </nav>
    </div>
  );
}
