import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import upperFirst from 'lodash-es/upperFirst'
interface SettingsProps {
  language?: string
}
const Settings: React.FunctionComponent<SettingsProps> = ({ language = 'en' }) => {
  const [lang, setLang] = useState(language)
  const { t, i18n } = useTranslation()
  const changeLanguage = (code: string) => {
    setLang(code)
    i18n.changeLanguage(code)
  }

  return (
    <div className='settings'>
      <h2>{upperFirst(t('language'))}</h2>
      <select value={lang} onChange={event => changeLanguage(event.currentTarget.value)}>
        <option value='en'>{upperFirst(t('en'))}</option>
        <option value='es'>{upperFirst(t('es'))}</option>
      </select>
    </div>
  )
}

export default Settings
