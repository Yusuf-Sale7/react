import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut, userInfo } from "../../Utils/common";
import './style.css'
import useLang from "../../Locales/useLang";
import { useApi } from "../../APIs/useApi";

function Home () {

  const user = userInfo()

  const data = useApi('https://jsonplaceholder.typicode.com/posts')

  const [locale, setLocale] = useState()
  const { t, localeLang } = useLang(locale)

  const navigateTo = useNavigate()

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
          <span>{t('viewIn')}</span>
          <select value={localeLang} onChange={(e) => setLocale(e.target.value)}>
            <option value="en">{t('english')}</option>
            <option value="ar">{t('arabic')}</option>
          </select>
        </div>
        <div className="details">
          <p>{t('quote')}</p>
          -
          <span>{t('quoteBy')}</span>
        </div>
      </div>

      <div className="posts">
        <ul>
          {
            data.map(
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