import { useState } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import FeedPage from './pages/FeedPage/FeedPage';
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PlantShowPage from './pages/PlantShowPage/PlantShowPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

import userService from "./utils/userService";

function App() {
  const [user, setUser] = useState(userService.getUser());

  function handleSignupOrLogin() {
    setUser(userService.getUser());
  }

  function logout() {
    userService.logout();
    setUser(null);
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/signup" element={<SignupPage rhandleSignupOrLogin={handleSignupOrLogin} />} />
        <Route path="/login" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<FeedPage />} />
      <Route path="/signup" element={<SignupPage handleSignupOrLogin={handleSignupOrLogin} />} />
      <Route path="/login" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin} />} />
      <Route path="/plants/:plantId" element={<PlantShowPage />} />
      <Route path="/:username" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
