import ar from "./ar";
import en from "./en";

const TRANSLATIONS = { ar, en }

const setLang = (lang) => {
  const elements = document.querySelectorAll('[data-lang]');
  elements.forEach(
    element => {
      const langKey = element.getAttribute('data-lang')
      element.textContent = TRANSLATIONS[lang][langKey]
    }
  )

  localStorage.setItem('lang', lang)
  const langDir = document.getElementById('langs');

  // Switch Direction
  lang === 'ar' ? langDir.classList.add('rtl') : langDir.classList.remove('rtl')
}

export default setLang;
