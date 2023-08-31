import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoutes = ({otherDest}) => {
  let { user } = useContext(AuthContext)

  if (otherDest === "/login/" || otherDest === "/signup/") {
    return (
      user? <Outlet /> : <Navigate to="/login/" />
    )
  }
  else if (otherDest === "/home/") {
    return (
      (!user)? <Outlet /> : <Navigate to="/home/" />
    )
  }
}

export default PrivateRoutes