import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/homePage/Home';
import Login from './pages/userPage/Login';
import Signup from './pages/userPage/Sign-up';
import News from './pages/newsPage/News';
import Instagram from './pages/instagramPage/Instagram';
import Likes from './pages/likesPage/Likes';

const App = () => {
  return (
    <Router >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/news' element={<News />} />
        <Route path='/instagram' element={<Instagram />} />
        <Route path='/me/likes' element={<Likes />} />
      </Routes>
    </Router>
  );
}

export default App;