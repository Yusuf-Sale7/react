import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const userEmail = localStorage.getItem('email')

  if (userEmail === '' || userEmail === null) {
    return <Navigate to='/login'/>
  } else {
    return children
  }
}

export const PrivateAuth = ({ children }) => {
  const userEmail = localStorage.getItem('email')

  if (userEmail) {
    return <Navigate to='/'/>
  } else {
    return children
  }
}