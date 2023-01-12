import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import toastr from "toastr";
import 'toastr/build/toastr.min.css'
import './style.css'
import { userInLocal } from "../../Utils/common";
import { useForm } from "react-hook-form";

function Register () {

  const navigateTo = useNavigate()

  const { register, formState: { errors }, handleSubmit } = useForm({mode: "onChange"})

  const handleRegister = async (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    await axios.post('http://localhost:7000/api/users/register', {name, email, password})
    .then(res => {
      toastr.success(res.data, '', {timeOut: 1500})
      userInLocal(name, email)
      navigateTo('/')
    })
    .catch(err => {
      toastr.error(err.response.data.message, '', {timeOut: 1500});
    })
  }

  return (
    <div className="register">
      <div className="auth">
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="form-input">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" {...register('name', {
              required: 'Name Required!',
              maxLength: {value: 15, message: 'Max Chars is 15'},
              pattern: {value: /^[a-z ,.'-]+$/i, message: 'Name Should Not Contains Numbers'}
              })}
              aria-invalid={errors.name ? "true" : "false"}
              />
            {errors.name && <span className="alert">* {errors.name?.message}</span>}
          </div>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" {...register('email',
            {
              required: 'Email Required!',
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Email is invalid!'
              }
            })}
            onKeyDown={ (e) => {
              if (e.key === ' ') e.preventDefault()
            }}
            aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <span className="alert">* {errors.email?.message}</span>}
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register('password',
            {
              required: 'Password Required!',
              minLength: {
                value: 6,
                message: 'Password must contains at least 6 chars!'
              }
            })}
            onKeyDown={(e) => {
              if (e.key === ' ') e.preventDefault()
            }}
            aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <span className="alert">* {errors.password?.message}</span>}
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