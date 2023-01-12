import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import 'toastr/build/toastr.min.css'
import { logOut, userInfo } from "../../Utils/common";
import './style.css'
import setLang from "../../Locale";

function Home () {

  const [posts, setPosts] = useState([])
  const user = userInfo()

  const currentLang = useRef()
  const navigateTo = useNavigate()

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => setPosts(res.data))
    .catch(err => toastr.error(err.message))

    // Set & Get Lang from locale storage
    const langFromStorage = localStorage.getItem('lang')
    if (langFromStorage === 'ar') {
      setLang(langFromStorage)
      currentLang.current.value = ('ar')
    } else if (langFromStorage === 'en') {
      setLang(langFromStorage)
      currentLang.current.value = ('en')
    } else {
      setLang(currentLang.current.value)
    }
  }, [])

  const handleLogout = (e) => {
    e.preventDefault()

    navigateTo('/login')
    logOut()
  }

  return (
    <div className="welcome">
      <header>
        <p>
          Welcome
          <span>{user.name}</span>
        </p>

        <button className="logout" onClick={handleLogout}>Logout</button>
      </header>

      <div className="langs" id="langs">
        <div className="switchLang">
          <span data-lang="viewIn"></span>
          <select ref={currentLang} onChange={(e) => setLang(e.target.value)}>
            <option value="en" data-lang="english"></option>
            <option value='ar' data-lang="arabic"></option>
          </select>
        </div>
        <div className="details">
          <p data-lang="quote"></p>
          -
          <span data-lang="quoteBy"></span>
        </div>
      </div>

      <div className="posts">
        <ul>
          {
            posts.map(
              post => {
                return (
                  <li key={post.id}>
                    <h5>{post.title}</h5>
                    <p>
                      {post.body}
                    </p>
                  </li>
                )
              }
            )
          }
        </ul>
      </div>

    </div>
  )
}

export default Home;