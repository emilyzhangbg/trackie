import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
  let [authTokens, setAuthTokens] = useState(localStorage.getItem("authTokens")? JSON.parse(localStorage.getItem("authTokens")): null)
  let [user, setUser] = useState(localStorage.getItem("username"))

  let logIn = async (username, password) => {   
    let response = await fetch("/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"username": username, "password": password})
    })

    if (response.status === 200) {
      let data = await response.json()

      setAuthTokens(data)
      setUser(username)
      localStorage.setItem("authTokens", JSON.stringify(data))
      localStorage.setItem("username", username)
    } else {
      alert("Failed to log in")
    }
  }

  let logOut = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem("authTokens")
    localStorage.removeItem("username")
  }

  let signUp = async (userInfo) => {
    let response = await fetch("/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })

    if (response.status === 200) {
      console.log("successfully registered");
      logIn(userInfo.username, userInfo.password)
    }
    else {
      console.log("fail");
    }
  }

  let authContextValue = {
    user: user,
    authTokens: authTokens,
    logIn: logIn,
    logOut: logOut,
    signUp: signUp
  }

  return(
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}