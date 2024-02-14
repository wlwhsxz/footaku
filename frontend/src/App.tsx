import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/homePage/Home';
import Login from './pages/userPage/Login';
import Signup from './pages/userPage/Sign-up';

const App = () => {
  return (
    <Router >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/sign-up' element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;