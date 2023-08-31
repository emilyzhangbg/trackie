import './App.css';
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from './utils/PrivateRoutes'
import LandingPage from './pages/LandingPage';
import LogInPage from './pages/LogInPage';
import HomePage from './pages/HomePage';
import Header from './components/Header'
import SignUpPage from './pages/SignUpPage';
import {AuthProvider} from './context/AuthContext'
import ProfilePage from './pages/ProfilePage';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <div className="App">      
    <AuthProvider>
      {/* <Header /> */}
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/posts/" element={<PrivateRoutes otherDest={"/login/"}/>}>
            <Route path="" element={<HomePage />}></Route>
          </Route>
          <Route path="/profile/" element={<PrivateRoutes otherDest={"/login/"}/>}>
            <Route path="" element={<ProfilePage />}></Route>
          </Route>
          <Route path="/home/" element={<PrivateRoutes otherDest={"/login/"}/>}>
            <Route path="" element={<PlaceholderPage />}></Route>
          </Route>
          <Route path="/login/" element={<PrivateRoutes otherDest={"/posts/"}/>}>
            <Route path="" element={<LogInPage />}></Route>
          </Route>
          <Route path="/signup/" element={<PrivateRoutes otherDest={"/posts/"}/>}>
            <Route path="" element={<SignUpPage />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
