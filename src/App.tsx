import React from 'react'
import { useTranslation } from 'react-i18next'
import './App.scss'

const App: React.StatelessComponent<{}> = () => {
  const { t, i18n } = useTranslation()
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code)
  }
  return (
    <div className='container'>
      <h1>{t('welcome', 'Hello default')}, chatApp</h1>
      <button type='button' onClick={() => changeLanguage('es')}>
        {t('es')}
      </button>

      <button type='button' onClick={() => changeLanguage('en')}>
        {t('en')}
      </button>
    </div>
  )
}

export default App
