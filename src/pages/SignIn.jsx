import { useState } from "react";
import { app } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function register() {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        navigate("/forum");
        const user = userCredential.user;
        console.log("User was registerd successfully!", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  function signIn() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate("/forum");
        const user = userCredential.user;
        console.log("Logged In successfully: ", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("oops! ", errorCode, errorMessage);
      });
  }

  return (
    <div className="logInContainer">
      <h2>Registration</h2>
      <input
        type="email"
        placeholder="email"
        id="emailInput"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        id="passwordInput"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button id="signInBtn" onClick={signIn}>
        Sign in
      </button>
      <button id="enterBtn" onClick={register}>
        Register
      </button>
    </div>
  );
}
