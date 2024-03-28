import { useState } from "react";
import { app } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./SignIn.css";

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
    <div className="container sign-in-container" style={{ maxWidth: "500px" }}>
      <h1 style={{ marginBottom: "20px" }}>Welcome</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <div style={{ marginTop: "40px" }}>
          <Button
            variant="outline-dark"
            style={{ marginRight: "10px" }}
            onClick={signIn}
          >
            Sign in
          </Button>
          <Button variant="secondary" onClick={register}>
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}
