import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Login from "./pages/userPage/Login";
import SignUp from "./pages/userPage/SignUp";
import Club from "./pages/clubPage/Club";
import useAuthStore from "./store/useAuthStore";
import ClubNews from "./pages/clubPage/ClubNews";

const App = () => {
  const isLoggedIn = useAuthStore((state) => !!state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/signup" element={isLoggedIn ? <Home /> : <SignUp />} />
        <Route
          path="/club/:clubName"
          element={isLoggedIn ? <Club /> : <Login />}
        />
        <Route
          path="/club/:clubName/news"
          element={isLoggedIn ? <ClubNews /> : <Login />}
        />
      </Routes>
    </Router>
  );
};

export default App;
