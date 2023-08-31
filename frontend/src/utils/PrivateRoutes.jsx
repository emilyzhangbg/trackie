import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoutes = ({otherDest}) => {
  let { user } = useContext(AuthContext)

  if (otherDest === "/login/") {
    return (
      user? <Outlet /> : <Navigate to="/login/" />
    )
  }
  else {
    return (
      (!user)? <Outlet /> : <Navigate to="/posts/" />
    )
  }
}

export default PrivateRoutes