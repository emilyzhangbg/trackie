import './App.css';
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from './utils/PrivateRoutes'
import LandingPage from './pages/LandingPage';
import LogInPage from './pages/LogInPage';
import HomePage from './pages/HomePage';
import Header from './components/Header'
import {AuthProvider} from './context/AuthContext'

function App() {
  return (
    <div className="App">      
    <AuthProvider>
      {/* <Header /> */}
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/home/" element={<PrivateRoutes otherDest={"/login/"}/>}>
            <Route path="" element={<HomePage />}></Route>
          </Route>
          <Route path="/login/" element={<PrivateRoutes otherDest={"/home/"}/>}>
            <Route path="" element={<LogInPage />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
