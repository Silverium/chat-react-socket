import React from 'react'
import each from 'lodash-es/each'
import { useTranslation } from 'react-i18next'

import './App.scss'
import { useLocal } from '@/effects/useLocal'
import NavBar from '@/components/NavBar'
import Settings from '../Settings'
import { SettingsContext } from '@/context/settings'
import { defaultSettings, settings as settingsConst, appTabs, getTimeFormatter } from '@/constants/'
import Chat from '../Chat'
export interface themeProps {
  foreground: string;
  background: string;
}
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
    i18n.changeLanguage(defaultSettings[settingsConst.LANGUAGE])
  }

  const [selected, setSelected] = React.useState(appTabs[0].name)
  const APP_CONTENT: { [key: string]: JSX.Element } = {
    settings: <Settings />,
    chat: <Chat />
  }
  const timeFormatter = getTimeFormatter(settings[settingsConst.TIME_FORMAT])

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
