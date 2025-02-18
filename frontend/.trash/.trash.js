import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (user) {
    console.log("You are signed");
  } else {;
    console.log("You are not signed");
  };

  if (error) {
    console.error("Auth Error:", error);
  }

console.log({ user, loading, error });

  return (
    <div className="App">
      <LoginPage />
      {!user ? <WelcomPage /> : <ProfilePage />}
    </div>
  )
}

export default App