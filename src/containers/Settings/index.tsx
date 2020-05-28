import React from 'react'
import { useTranslation } from 'react-i18next'
import upperFirst from 'lodash-es/upperFirst'

import { SettingsContext } from '@/context/settings'
import { settingsProps, themes, languages, timeFormats, sendEnterOptions } from '@/constants'
import SelectSetting from '@/components/SelectSetting'
import Button from '@/components/Button'
const { LANGUAGE, THEME, TIME_FORMAT, USER_NAME, SEND_ENTER } = settingsProps

const Settings: React.FunctionComponent<{bodyHeight:number}> = ({ bodyHeight }) => {
  const { t } = useTranslation()

  const selectLanguageProps = {
    storagekey: LANGUAGE,
    label: upperFirst(t('language')),
    options: languages.map(value => ({
      value,
      text: upperFirst(t(value))
    }))
  }
  const selectThemeProps = {
    storagekey: THEME,
    label: upperFirst(t('interfaceTheme')),
    options: themes.map(value => ({
      value,
      text: upperFirst(t(value))
    }))
  }
  const selectTimeFormatProps = {
    storagekey: TIME_FORMAT,
    label: upperFirst(t('clockDisplay')),
    options: timeFormats.map(value => ({
      value,
      text: upperFirst(t(value))
    }))
  }
  const sendCtrlEnterProps = {
    storagekey: SEND_ENTER,
    label: upperFirst(t('sendEnter')),
    options: sendEnterOptions.map(value => ({
      value,
      text: upperFirst(t(value))
    }))
  }
  const [preferencesHeight, setPreferencesHeight] = React.useState(0)

  const footerRef = React.useRef(null)
  React.useEffect(() => {
    setPreferencesHeight(bodyHeight - footerRef.current.clientHeight)
  })
  // TODO: create input text for userName
  // TODO: transform some SelectSetting into radio buttons
  // TODO: refactor Props objects so we dont add html attributes
  return (
    <SettingsContext.Consumer>
      {({ settings, updateSettings, resetSettings }) => (
        <section className='flex flex-column align-items-center'>
          <div style={{ height: preferencesHeight }} className='overflow-y-auto settings'>
            <div className='flex flex-column'>
              <label>{upperFirst(t('userName'))}</label>
              <input type='text' value={settings[USER_NAME]} onChange={(event) => updateSettings[USER_NAME](event.currentTarget.value)} />
            </div>
            <SelectSetting {...selectTimeFormatProps} value={settings[TIME_FORMAT]} usechange={(value) => updateSettings[TIME_FORMAT](value)} />
            <SelectSetting {...selectThemeProps} value={settings[THEME]} usechange={(value) => updateSettings[THEME](value)} />
            <SelectSetting {...sendCtrlEnterProps} value={settings[SEND_ENTER]} usechange={(value) => updateSettings[SEND_ENTER](value)} />
            <SelectSetting {...selectLanguageProps} value={settings[LANGUAGE]} usechange={(value) => updateSettings[LANGUAGE](value)} />
          </div>
          <footer ref={footerRef} className='sticky sticky-bottom centered'>
            <Button color='danger' onClick={resetSettings}>{upperFirst(t('reset'))}</Button>
          </footer>
        </section>
      )}
    </SettingsContext.Consumer>
  )
}

export default Settings
