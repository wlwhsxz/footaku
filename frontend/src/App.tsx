import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/homePage/Home";
import Login from "./pages/userPage/Login";
import SignUp from "./pages/userPage/SignUp";
import Club from "./pages/clubPage/Club";
import useAuthStore from "./store/useAuthStore";
import ClubNews from "./pages/clubPage/ClubNews";
import OnBoard from "./pages/userPage/OnBoard";

const App = () => {
  const isLoggedIn = useAuthStore((state) => !!state.user);
  const isFirstLoggedIn = useAuthStore((state) => state.user?.isFirstLogin);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              isFirstLoggedIn ? (
                <OnBoard />
              ) : (
                <Home />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              isFirstLoggedIn ? (
                <OnBoard />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? isFirstLoggedIn ? <OnBoard /> : <Home /> : <SignUp />
          }
        />
        <Route
          path="/onboard"
          element={
            isLoggedIn ? (
              isFirstLoggedIn ? (
                <OnBoard />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/club/:clubName"
          element={isLoggedIn ? <Club /> : <Navigate to="/login" />}
        />
        <Route
          path="/club/:clubName/news"
          element={isLoggedIn ? <ClubNews /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
