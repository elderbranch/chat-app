import React from "react";

import { auth } from "../../../utils/firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

import GoogleSignin from "../../assets/icons/googleicon.png";
import ReactLogo from "../../assets/react.svg";


const WelcomPage = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
};

  return (
    <main className="welcome">
      <h2>Welcome to React Chat.</h2>
      <img src={ReactLogo} alt="ReactJslogo" />
      <p>Welcom page</p>
      <button className="sign-in">
        {/* <img
          onClick={googleSignIn}
          src={GoogleSignin}
          alt="sign in with google"
          type="button"
        /> */}
      </button>
    </main>
  );
}

export default WelcomPage