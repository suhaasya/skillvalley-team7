import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookmarksPage from "./pages/BookmarksPage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WelcomePage from "./pages/WelcomePage";
import PageDoesNotExit from "./pages/PageDoesNotExit";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<PrivateRoute />}>
              <Route path="/home" element={<HomePage />} />
            </Route>

            <Route path="/bookmarks" element={<PrivateRoute />}>
              <Route path="/bookmarks" element={<BookmarksPage />} />
            </Route>

            <Route path="/messages" element={<PrivateRoute />}>
              <Route path="/messages" element={<MessagesPage />} />
            </Route>

            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            <Route path="/settings" element={<PrivateRoute />}>
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/*" element={<PageDoesNotExit />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer autoClose={1000} position="bottom-center" />
    </>
  );
}

export default App;
