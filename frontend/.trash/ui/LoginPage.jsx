import { auth } from "../../../../firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";

import GoogleSignin from "../../../assets/icons/googleIcon.png";

const LoginPage = () => {
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Пользователь успешно вошёл:", result.user);
      })
      .catch((error) => {
        console.error("Ошибка при входе через Google:", error);
      });
  };

  console.log(auth);
  console.log(user);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <nav className="nav-bar">
      {/* <h1>React Chat</h1> */}
      {user ? (
        <button
          onClick={() => signOut()}
          className="sign-out" type="button">
          Sign Out
        </button>
      ) : (
        <button className="sign-in">
          <img
            onClick={() => googleSignIn()}
            src={GoogleSignin}
            alt="sign in with google"
            type="button"
          />
        </button>
      )}
    </nav>
  );
}

export default LoginPage;