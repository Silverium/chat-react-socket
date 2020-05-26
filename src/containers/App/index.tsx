import React from 'react'
import each from 'lodash-es/each'
import { useTranslation } from 'react-i18next'

import './App.scss'
import { useLocal } from '@/effects'
import NavBar from '@/components/NavBar'
import Settings from '@/containers/Settings'
import { SettingsContext } from '@/context/settings'
import { defaultSettings, settingsProps, appTabs } from '@/constants'
import { getTimeFormatter } from '@/helpers'
import Chat from '../Chat'

const App: React.FunctionComponent<{}> = function () {
  const updateSettings: { [key: string]: React.Dispatch<React.SetStateAction<string>> } = {}
  const settings: { [key: string]: string } = {}
  each(defaultSettings, (_value: string, key: string) => {
    const [settingValue, updateValue] = useLocal(key)
    settings[key] = settingValue
    updateSettings[key] = (toUpdate: string) => {
      settings[key] = toUpdate
      updateValue(toUpdate)
    }
  })
  const { i18n } = useTranslation()
  const resetSettings = () => {
    each(defaultSettings, (value: string, key: string) => {
      updateSettings[key](value)
    })
    i18n.changeLanguage(defaultSettings[settingsProps.LANGUAGE])
  }

  const [selected, setSelected] = React.useState(appTabs[0].name)
  const APP_CONTENT: { [key: string]: JSX.Element } = {
    settings: <Settings />,
    chat: <Chat />
  }
  const timeFormatter = getTimeFormatter(settings[settingsProps.TIME_FORMAT])

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings, timeFormatter }}>
      <NavBar tabs={appTabs} {...{ selected, setSelected }} />
      <section className={`container themes-${settings.theme}`}>
        {APP_CONTENT[selected]}
      </section>
    </SettingsContext.Provider>
  )
}

export default App
