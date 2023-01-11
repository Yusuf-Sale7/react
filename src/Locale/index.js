import langs from "./langs";

const setLang = (lang) => {
  const elements = document.querySelectorAll('[data-lang]');
  elements.forEach(
    element => {
      const langKey = element.getAttribute('data-lang')
      element.textContent = langs[lang][langKey]
    }
  )

  localStorage.setItem('lang', lang)
  const langDir = document.getElementById('langs');

  // Switch Direction
  lang === 'ar' ? langDir.classList.add('rtl') : langDir.classList.remove('rtl')
}

export default setLang;
