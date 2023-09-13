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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/messages" element={<MessagesPage />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/users/:id" element={<ProfilePage />} />

            <Route path="/settings" element={<SettingsPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            {/* <Route path="/:id" element={<ProfilePage />} /> */}
            <Route path="/*" element={<PageDoesNotExit />} />
          </Routes>
        </div>
        <ToastContainer autoClose={1000} position="bottom-center" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
