import { getAuth, signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
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

  const activeStyles = {
    fontWeight: "bold",
  };
  return (
    <div>
      <header>
        <NavLink to="/">
          <img src={logo1} className="logo" alt="logo" />
        </NavLink>
      </header>
      <nav>
        <ul className="navText">
          <li>
            <NavLink
              className="navLink"
              to="/"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navLink"
              to="/about"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              className="navLink"
              to="/essays"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Essays
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navLink"
              to="/paliCanon"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Pali Canon
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navLink"
              to="/forum"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Forum
            </NavLink>
          </li>
          {/* <li className="sign-in-out navLink"></li> */}
        </ul>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            width: "150px",
            marginRight: "20px",
          }}
        >
          <p>{displayName}</p>
          <NavLink to={!username && "/signin"}>
            <p onClick={handleSignOut}>{signInStatus}</p>
          </NavLink>
        </div>
        {/* <div className="dropdown-container">
          <DropdownUserMenu />
        </div> */}
      </nav>
    </div>
  );
}
