import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import Signup from "../Signup/Signup";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordError, setPasswordError] = useState({ state: false, msg: "" });

  const [emailError, setEmailError] = useState({ state: false, msg: "" });
  const toggleSignUp = () => {
    setLoading(true);
    //Wait 1second
    setTimeout(() => {
      setLoading(false);
      setShowSignUp(true);
    }, 1500);
  };
  const signIn = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmailError({ state: false, msg: "" });
        setPasswordError({ state: false, msg: "" });
      })
      .catch((err) => {
        setLoading(false);
        if (err.code === "auth/wrong-password") {
          setEmailError({
            state: false,
            msg: "",
          });
          setPasswordError({
            state: true,
            msg: "Incorrect Password",
          });
        } else if (
          err.code === "auth/user-not-found" ||
          err.code === "auth/invalid-email"
        ) {
          setEmailError({
            state: true,
            msg: "Email Doesn't exist",
          });
          setPasswordError({
            state: false,
            msg: "",
          });
        }
      });
  };
  return (
    <div className="login ">
      {showSignUp ? (
        <Signup setShowSignUp={setShowSignUp} />
      ) : (
        <div className="login__content">
          {loading && <div className="login__loading" />}
          <div className={`login__wrapper ${loading && "login__fade"}`}>
            <img
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
              alt="Google Logo"
              className="login__logo"
            />
            <p className="login__title">Sign in</p>
            <p className="login__subtitle">Continue to Gmail</p>
            <form action="" className="login__form">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="login__input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={emailError.state}
                helperText={emailError.msg}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                className="login__input"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                error={passwordError.state}
                helperText={passwordError.msg}
              />
              <div className="login__infoText">
                Not your Computer? Use guest mode to sign in privately{" "}
                <a href="/learnmore">Learn More</a>
              </div>
              <div className="login__buttons">
                <Button
                  className="login__button"
                  color="primary"
                  onClick={toggleSignUp}
                >
                  Create Account
                </Button>
                <Button
                  className="login__button"
                  color="primary"
                  variant="contained"
                  onClick={signIn}
                >
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
