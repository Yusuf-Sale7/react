import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import toastr from "toastr";
import 'toastr/build/toastr.min.css'
import './style.css'
import { userInfo, userInLocal } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

function Login () {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigateTo = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:7000/api/users/login', {email, password})
    .then(res => {
      dispatch(userInfo({name: res.data.name, email: res.data.email}))
      dispatch(userInLocal({name: res.data.name, email: res.data.email}))
      toastr.success('Logged in successfully!', '', {timeOut: 1500})
      navigateTo('/')
    })
    .catch(err => {
      toastr.error(err.response.data.message, '', {timeOut: 1500})
    })
  }

  useEffect(() => {
    let userEmail = localStorage.getItem('email')

    if (userEmail) {
      navigateTo('/')
    }
  })

  return (
    <div className="login">
      <div className="auth">
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input type="password" id="password"
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