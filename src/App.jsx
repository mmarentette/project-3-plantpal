import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";

import FeedPage from './pages/FeedPage/FeedPage';
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from './pages/ProfilePage/ProfilePage';

import userService from "./utils/userService";

function App() {
  const [user, setUser] = useState(userService.getUser());

  function handleSignupOrLogin() {
    setUser(userService.getUser());
  }

  return (
    <Routes>
      <Route path="/" element={<FeedPage />} />
      <Route path="/signup" element={<SignupPage handleSignupOrLogin={handleSignupOrLogin} />} />
      <Route path="/login" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin} />} />
      <Route path="/:username" element={<ProfilePage />} />
      

    </Routes>
  );
}

export default App;
