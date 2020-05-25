import React from 'react'
import { useTranslation } from 'react-i18next'
import upperFirst from 'lodash-es/upperFirst'

import { SettingsContext } from '../../context/settings'
import { settings, themes, languages, timeFormats } from '../../constants'
import SelectSetting from '../../components/SelectSetting'
const { LANGUAGE, THEME, TIME_FORMAT, USER_NAME } = settings

const Settings: React.FunctionComponent<{}> = () => {
  const { t, i18n } = useTranslation()

  const selectLanguageProps = {
    storageKey: LANGUAGE,
    label: upperFirst(t('language')),
    onChange: (code: string) => i18n.changeLanguage(code),
    options: languages.map(value => ({
      value,
      text: upperFirst(t(value))
    }))
  }
  const selectThemeProps = {
    storageKey: THEME,
    label: upperFirst(t('interfaceTheme')),
    options: themes.map(value => ({
      value,
      text: upperFirst(t(value))
    }))
  }
  const selectTimeFormatProps = {
    storageKey: TIME_FORMAT,
    label: upperFirst(t('clockDisplay')),
    options: timeFormats.map(value => ({
      value,
      text: upperFirst(t(value))
    }))
  }

  return (
    <SettingsContext.Consumer>
      {({ settings, updateSettings, resetSettings }) => (
        <div className='settings'>
          <input type='text' value={settings[USER_NAME]} onChange={(event) => updateSettings[USER_NAME](event.currentTarget.value)} />
          <SelectSetting {...selectTimeFormatProps} value={settings[TIME_FORMAT]} onChange={(value) => updateSettings[TIME_FORMAT](value)} />
          <SelectSetting {...selectThemeProps} value={settings[THEME]} onChange={(value) => updateSettings[THEME](value)} />
          <SelectSetting {...selectLanguageProps} value={settings[LANGUAGE]} />
          <button onClick={resetSettings}>{upperFirst(t('reset'))}</button>
        </div>
      )}
    </SettingsContext.Consumer>
  )
}

export default Settings
