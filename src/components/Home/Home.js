import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import 'toastr/build/toastr.min.css'
import { logOut, userInfo } from "../../Utils/common";
import './style.css'

function Home () {

  const [posts, setPosts] = useState([])
  const user = userInfo()
  const navigateTo = useNavigate()

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => setPosts(res.data))
    .catch(err => toastr.error(err.message))
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