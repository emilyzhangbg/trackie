import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
  console.log(AuthContext)
  let [name, setName] = useContext(AuthContext)

  setName("bob")

  return (
    <></>
    // <ResponsiveAppBar/>
  )
}

export default Header
