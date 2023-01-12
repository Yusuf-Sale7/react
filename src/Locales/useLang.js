import ar from "./ar";
import en from "./en";

const TRANSLATIONS = { ar, en }

const useLang = (lang) => {

  const langFromStorage = localStorage.getItem('lang')

  if (lang === 'ar' || lang === 'en') {
    localStorage.setItem('lang', lang)
  } else if (!lang && langFromStorage === null) {
    lang = 'en'
    localStorage.setItem('lang', lang)
  } else if (langFromStorage === 'ar' || langFromStorage === 'en') {
    lang = langFromStorage
  } else {
    lang = 'en'
    localStorage.setItem('lang', lang)
  }

  const t = (keyString) => TRANSLATIONS[lang][keyString]

  // Handle Style
  const dir = document.getElementById('root')
  lang === 'ar' ? dir.classList.add('rtl') : dir.classList.remove('rtl')


  return t
}

export default useLang;