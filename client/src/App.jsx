import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile"
import Chat from "./pages/Chat";

function NavbarWrapper() {
  const location = useLocation();
  const hideNavbarOn = ["/","/login", "/register", "/forgot-password",];

  if (hideNavbarOn.includes(location.pathname) ||
    location.pathname.startsWith("/reset-password")) {
    return null;
  }

  return <Navbar />;
}

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <NavbarWrapper />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;