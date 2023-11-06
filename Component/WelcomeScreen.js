import React from "react";
import App_bar from "./App_bar";
import LoginDialog from "./LoginDialog";
const WelcomeScreen = () => {
  return (
    <>
      <App_bar />
      <div>
        <div className="container mt-2">
          <center>
            <h1>Welcome to LotsWork Admin</h1>
            <LoginDialog />
          </center>
        </div>
      </div>
    </>
  );
};

export default WelcomeScreen;
