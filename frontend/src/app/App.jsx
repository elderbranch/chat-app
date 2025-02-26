import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "lucide-react"
import { useEffect } from "react";
import { Toaster } from "react-hot-toast"

import HomePage from "../pages/homePage/HomePage";
import SignUpPage from "../pages/signUpPage/signUpPage";
import LoginPage from "../pages/loginPage/loginPage";
import ProfilePage from "../pages/profilePage/ProfilePage";
import SettingsPage from "../pages/settingsPage/settingsPage";
import { NavBar } from "../features/navbar";
import { useAuthStore } from "../entities/authStore/useAuthStore";
import { useThemeStore } from "../entities/themeStore/useThemeStore";
import AnotherUserPage from "../pages/AnotherUser/AnotherUser";


const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const {theme} = useThemeStore();

  console.log({onlineUsers});
  

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  
  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-20 animate-spin" />
    </div>
  )
  
  return (
    <div data-theme={theme}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/signUp" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/logIn" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/profile/:id" element={authUser ? <AnotherUserPage /> : <Navigate to="/login" />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        <Toaster
          position="top-right"
        />
      </BrowserRouter>
    </div>
  )
}

export default App;
