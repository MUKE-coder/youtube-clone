import { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import "./Signup.css";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../lib/firebase";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Signup = ({ setShowSignUp }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const [passwordError, setPasswordError] = useState({ state: false, msg: "" });

  const [emailError, setEmailError] = useState({ state: false, msg: "" });
  const toggleSignUp = () => {
    setLoading(true);
    //Wait 1second
    setTimeout(() => {
      setLoading(false);
      setShowSignUp(false);
    }, 1500);
  };

  const createAccount = (e) => {
    e.preventDefault();
    setLoading(true);
    const error = formData.password === formData.confirmPassword;

    if (!error) {
      setPasswordError({ state: true, msg: "Passwords do not Match" });
      setFormData({ ...formData, confirmPassword: "" });
      setLoading(false);
      return;
    } else {
      setPasswordError({ state: false, msg: "" });
      setEmailError({ state: false, msg: "" });
    }

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: `${formData.firstName} ${formData.lastName}`,
        }).then(() => {
          setLoading(false);
          setPasswordError({ state: false, msg: "" });
          setEmailError({ state: false, msg: "" });
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setEmailError({ state: true, msg: "Email is already in use" });
          setLoading(false);
          setFormData({ ...formData, email: "" });
        }
        if (error.code === "auth/invalid-email") {
          setEmailError({
            state: true,
            msg: "Email addess is not properly formated",
          });
          setLoading(false);
          setFormData({ ...formData, email: "" });
        } else if (error.code === "auth/weak-password") {
          setPasswordError({
            state: true,
            msg: "Password should be atleast 6 characters",
          });
          setLoading(false);
          setFormData({ ...formData, password: "" });
        }
      });
  };

  const disabled =
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword ||
    !formData.firstName ||
    !formData.lastName;

  return (
    <div className="signup__container">
      <div className={`signup ${loading && "login__fade"}`}>
        {loading && <div className="login__loading signup__loading" />}

        <div className="signup__container">
          <div className="signup__left">
            <img
              className="login__logo"
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
              alt="Google"
            />

            <h1 className="signup__heading">Create your Google Account</h1>
            <p className="signup__subheading">Continue to Gmail</p>

            <div className="signup__inputs">
              <div className="signup__nameInputs">
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  type="name"
                  className="signup__nameInput"
                  variant="outlined"
                  value={formData.firstName}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      firstName: e.target.value,
                    });
                  }}
                />

                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  type="name"
                  className="signup__nameInput"
                  variant="outlined"
                  value={formData.lastName}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      lastName: e.target.value,
                    });
                  }}
                />
              </div>

              <TextField
                id="outlined-basic"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  });
                }}
                helperText={
                  emailError.state
                    ? emailError.msg
                    : "You can use letters, numbers and periods"
                }
                error={emailError.state}
              />
              <div className="signup__passwordInputs">
                <div className="signup__passwordWrapper">
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    type={checked ? "text" : "password"}
                    variant="outlined"
                    className="signup__passwordInput"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      });
                    }}
                    error={passwordError.state}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Confirm Password"
                    variant="outlined"
                    className="signup__passwordInput"
                    type={checked ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      });
                    }}
                    error={passwordError.state}
                  />
                </div>
                <p
                  className={`signup__helpertext ${
                    passwordError.state && "signin__error"
                  }`}
                >
                  {passwordError.state
                    ? passwordError.msg
                    : "Use 8 or more characters of letters, numbers and symbols"}
                </p>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      color="primary"
                      onClick={() => {
                        setChecked(!checked);
                      }}
                    />
                  }
                  label="Show Password"
                />
              </div>

              <div className="signup__buttons">
                <Button
                  className="signup__button"
                  variant="text"
                  color="primary"
                  onClick={toggleSignUp}
                >
                  Sign in instead
                </Button>

                <Button
                  className="signup__button"
                  variant="contained"
                  color="primary"
                  onClick={createAccount}
                  disabled={disabled}
                >
                  Create
                </Button>
              </div>
            </div>
          </div>

          <figure className="signup__figure">
            <img
              className="signup__figureImg"
              src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
              alt="account"
            />
            <figcaption className="signup__figcaption">
              One account. All of google working for you
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Signup;
