import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoutes = ({otherDest}) => {
  let { user } = useContext(AuthContext)

  console.log(otherDest)
  console.log(user);

  if (otherDest === "/login/") {
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