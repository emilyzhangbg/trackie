import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
  let [authTokens, setAuthTokens] = useState(localStorage.getItem("authToken")? JSON.parse(localStorage.getItem("authToken")): null)
  let [user, setUser] = useState(localStorage.getItem("username"))
  let [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    console.log("first render false");
    setFirstRender(false)
  }, [firstRender])

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

  let authContextValue = {
    user: user,
    authTokens: authTokens,
    logIn: logIn,
    logOut: logOut
  }

  return(
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}