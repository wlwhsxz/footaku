import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/homePage/Home";
import Login from "./pages/userPage/Login";
import SignUp from "./pages/userPage/SignUp";
import Club from "./pages/clubPage/Club";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/:clubName" element={<Club />} />
      </Routes>
    </Router>
  );
};

export default App;
