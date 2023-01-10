import React from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/login";
import Register from "./components/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import { PrivateRoute, PrivateAuth } from "./PrivateRoute";

function App () {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          }/>
          <Route path="/login" element={
            <PrivateAuth>
              <Login/>
            </PrivateAuth>
          }/>
          <Route path="/Register" element={
            <PrivateAuth>
              <Register/>
            </PrivateAuth>
          }/>
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;