import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import toastr from "toastr";
import 'toastr/build/toastr.min.css'
import './style.css'
import { useDispatch } from "react-redux";
import { userInfo, userInLocal } from "../../redux/userSlice";

function Register () {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigateTo = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || name.trim().length === 0) {
      toastr.error('Name can not be empty!')
    } else if (!email) {
      toastr.error('Check your email!')
    } else if (!password || password.length < 6) {
      toastr.error('Note: Password must contains at least 6 chars!', 'Check your password!')
    } else {
      await axios.post('http://localhost:7000/api/users/register', {name, email, password})
      .then(res => {
        toastr.success(res.data, '', {timeOut: 1500})
        dispatch(userInfo({name, email}))
        dispatch(userInLocal({name, email}))
        navigateTo('/')
      })
      .catch(err => {
        toastr.error(err.response.data.message, '', {timeOut: 1500});
      })
    }
  }

  return (
    <div className="register">
      <div className="auth">
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required
            onKeyDown={ (e) => {
              if (e.key === ' ') e.preventDefault()
            }}
            onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required
            onKeyDown={(e) => {
              if (e.key === ' ') e.preventDefault()
            }}
            onChange={(e) => setPassword(e.target.value.trim())}/>
          </div>
          <button className="confirm">Register</button>
        </form>
        <div className="have-account">
          Already have account?
          <NavLink to='/login'>Login</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Register;