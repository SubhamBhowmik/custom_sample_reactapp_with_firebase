import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signinwithgoogle } from "../firebaseConfig/firebaseConfig";
import Alert from "@mui/material/Alert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";
import { Dashboard } from "@mui/icons-material";
import App_bar from "./App_bar";
import { GoogleLogin } from "react-google-login";
import { Box, Button } from "@material-ui/core";
import { Google } from "@mui/icons-material";

const Demologin = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  console.log(loading);
  console.log(error);

  const [email, setEmail] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");

  const history = useHistory();

  const location = useLocation();
  const { search } = location;
  useEffect(() => {
    if (user) {
      // user is already signed in
      history.push("/dashboard");
    } else {
      // user is not signed in but the link is valid
      if (isSignInWithEmailLink(auth, window.location.href)) {
        // now in case user clicks the email link on a different device, we will ask for email confirmation
        let email = localStorage.getItem("email");
        if (!email) {
          email = window.prompt("Please provide your email");
        }
        // after that we will complete the login process
        setInitialLoading(true);
        signInWithEmailLink(
          auth,
          localStorage.getItem("email"),
          window.location.href
        )
          .then((result) => {
            // we can get the user from result.user but no need in this case
            console.log(result.user);
            localStorage.removeItem("email");
            setInitialLoading(false);
            console.log("user in then", user);

            history.push("/");
          })
          .catch((err) => {
            setInitialLoading(false);

            history.push("/login");
          });
      } else {
        console.log("enter email and sign in");
      }
    }
  }, [user, search, history]);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("login btn hitted");
    setLoginLoading(true);
    const currentUrl = window.location.href;
    console.log(currentUrl);
    sendSignInLinkToEmail(auth, email, {
      // this is the URL that we will redirect back to after clicking on the link in mailbox

      url: `${currentUrl}`,
      handleCodeInApp: true,
    })
      .then((result) => {
        setLoginLoading(false);
        localStorage.setItem("email", email);
        localStorage.setItem("user", user);
        setInfoMsg("We have sent you an email with a link to sign in");
        console.log(user);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [googlestate, setgooglestate] = useState(false);
  const googleSignIN = (e) => {
    e.preventDefault();
    signinwithgoogle();
    setgooglestate(true);
  };

  return (
    <>
      <App_bar />
      {loading ? (
        <div>loading....</div>
      ) : (
        <div>
          {user ? (
            <div className="container">Loading....</div>
          ) : (
            <div className="container">
              {/* enter email address */}
              <div className="card mt-3 p-3">
                <form className="form-group custom-form" onSubmit={handleLogin}>
                  <label>Email</label>
                  <input
                    type={"email"}
                    required
                    placeholder="Enter Email"
                    className="form-control mt-2 mb-2"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="btn btn-success btn-md mb-2">
                    {loginLoading ? (
                      <span>Logging you in</span>
                    ) : (
                      <span>Login</span>
                    )}
                  </button>
                  {/* show info msg */}
                  {infoMsg !== "" && (
                    <Alert severity="success">{infoMsg}</Alert>
                  )}

                  <Box display="flex" justifyContent="center">
                    <Button
                      startIcon={<Google />}
                      variant="contained"
                      onClick={googleSignIN}
                      disabled={googlestate}
                    >
                      Sign in with Google
                    </Button>
                  </Box>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Demologin;
