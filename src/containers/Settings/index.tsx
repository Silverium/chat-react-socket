import React from 'react'
import { useTranslation } from 'react-i18next'
import upperFirst from 'lodash-es/upperFirst'

import { SettingsContext } from '@/context/settings'
import { settingsProps, themes, languages, timeFormats, sendEnterOptions } from '@/constants'
import SelectSetting from '@/components/SelectSetting'
import RadioSetting from '@/components/RadioSetting'
import Button from '@/components/Button'
const { LANGUAGE, THEME, TIME_FORMAT, USER_NAME, SEND_ENTER } = settingsProps

const Settings: React.FunctionComponent<{bodyHeight:number}> = ({ bodyHeight }) => {
  const { t } = useTranslation()
  const { settings, updateSettings } = React.useContext(SettingsContext)
  const timeFormatProps = {
    storageKey: TIME_FORMAT,
    label: upperFirst(t('clockDisplay')),
    value: settings[TIME_FORMAT],
    useChange: (value:string) => updateSettings[TIME_FORMAT](value),
    options: timeFormats.map(value => ({
      value,
      text: upperFirst(t(value))
    }))
  }
  const themeProps = {
    storageKey: THEME,
    label: upperFirst(t('interfaceTheme')),
    useChange: (value: string) => updateSettings[THEME](value),
    value: settings[THEME],
    options: themes.map(value => ({
      value,
      text: upperFirst(t(value))
    }))
  }
  const sendEnterProps = {
    storageKey: SEND_ENTER,
    label: upperFirst(t('sendEnter')),
    value: settings[SEND_ENTER],
    useChange: (value:string) => updateSettings[SEND_ENTER](value),
    options: sendEnterOptions.map(value => ({
      value,
      text: upperFirst(t(value))
    }))
  }
  const languageProps = {
    storageKey: LANGUAGE,
    label: upperFirst(t('language')),
    value: settings[LANGUAGE],
    useChange: (value:string) => updateSettings[LANGUAGE](value),

    options: languages.map(value => ({
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
  return (
    <SettingsContext.Consumer>
      {({ settings, updateSettings, resetSettings }) => (
        <section className='flex flex-column align-items-center'>
          <div style={{ height: preferencesHeight }} className='overflow-y-auto settings'>
            <div className='flex flex-column'>
              <label>{upperFirst(t('userName'))}</label>
              <input type='text' value={settings[USER_NAME]} onChange={(event) => updateSettings[USER_NAME](event.currentTarget.value)} />
            </div>
            <RadioSetting {...timeFormatProps} />
            <RadioSetting {...themeProps} />
            <RadioSetting {...sendEnterProps} />
            <SelectSetting {...languageProps} />
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
