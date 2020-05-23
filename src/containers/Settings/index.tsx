import React from 'react'
import { useTranslation } from 'react-i18next'
import upperFirst from 'lodash-es/upperFirst'

import { SettingsContext } from '../../context/settings'
import { settings, themes, languages } from '../../constants'
import SelectSetting from '../../components/SelectSetting'
const { LANGUAGE, THEME } = settings

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

  return (
    <div className='settings'>
      <SettingsContext.Consumer>
        {({ updateSetting }) => (
          <SelectSetting {...selectThemeProps} onChange={(value) => updateSetting(THEME, value)} />
        )}
      </SettingsContext.Consumer>
      <SelectSetting {...selectLanguageProps} />
    </div>
  )
}

export default Settings
