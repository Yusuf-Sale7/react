import React, { useRef, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import toastr from "toastr";
import 'toastr/build/toastr.min.css'
import './style.css'
import { userInLocal } from "../../Utils/common";

function Login () {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailRef = useRef()
  const passRef = useRef()

  const navigateTo = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.length === 0 && password.length === 0) {
      toastr.error('Missing Email & Password!', '', {timeOut: 1500})
      emailRef.current.focus()
    } else if (email.match(regEx) && password.length !== 0) {
      await axios.post('http://localhost:7000/api/users/login', {email, password})
      .then(res => {
        userInLocal(res.data.name, res.data.email)
        toastr.success('Logged in successfully!', '', {timeOut: 1500})
        navigateTo('/')
      })
      .catch(err => {
        toastr.error(err.response.data.message, '', {timeOut: 1500})
        if (err.response.status === 401) {
          passRef.current.focus()
        } else if (err.response.status === 404) {
          emailRef.current.focus()
        } else {
          return false
        }
      })
    } else if (email.match(regEx) && password.length === 0) {
      toastr.error('Missing Password!', '', {timeOut: 1500})
      passRef.current.focus()
    } else {
      toastr.error('Email in invalid!', '', {timeOut: 1500})
      emailRef.current.focus()
    }

  }

  return (
    <div className="login">
      <div className="auth">
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input ref={emailRef} id="email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input ref={passRef} type="password" id="password"
            onKeyDown={(e) => {
              if (e.key === ' ') e.preventDefault()
            }}
            onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button className="confirm">Login</button>
        </form>
        <div className="have-account">
          Don't have account?
          <NavLink to='/Register'>Register</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Login;